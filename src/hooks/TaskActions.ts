import { useContext } from "react";
import { v4 as uuid } from "uuid";

import KanbanContext from "../contexts/KanbanContext";
import { timestamp } from "../utils/ResourceUtils";
import { Id, KBMember, KBTask, TaskActionBroadcast, TaskActionType } from "../types";
import { cacheItem } from "../utils/CacheUtils";

export const useTaskActions = () => {

    const { currentUser, setNewItemId, setProjects, projectId, boardId, taskChannel: broadcast } = useContext(KanbanContext);

    const createTask = (columnId: Id) => {
        if (currentUser === null) return;
        const id = uuid();
        const task: KBTask = {
            id,
            columnId,
            createdAt: timestamp(),
            priority: 1,
            content: '',
            createdBy: currentUser,
            assignedTo: []
        }
        setProjects(prev => {
            setNewItemId(id);
            const newState = {
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: [task, ...prev[projectId].boards[boardId].tasks]
                        }
                    }
                }
            }
            const action: TaskActionBroadcast = {
                oldImage: null,
                newImage: task,
                resourceIds: [id],
                action: TaskActionType.CREATE
            }
            broadcast.postMessage(action);
            return newState;
        });
    }

    const deleteTask = (id: Id) => {
        setProjects(prev => {
            const newState = {
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: prev[projectId].boards[boardId].tasks.filter(task => task.id !== id)
                        }
                    }
                }
            }
            const action: TaskActionBroadcast = {
                oldImage: prev[projectId].boards[boardId].tasks.find(t => t.id === id)!,
                newImage: null,
                resourceIds: [id],
                action: TaskActionType.DELETE
            }
            broadcast.postMessage(action);
            return newState;
        });
    }

    const updateTask = (id: Id, content: string, priority: number) => {
        setProjects(prev => {
            const newState = {
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: prev[projectId].boards[boardId].tasks.map(task => {
                                if (task.id === id) {
                                    return { ...task, content, priority };
                                }
                                return task;
                            })
                        }
                    }
                }
            }
            const action: TaskActionBroadcast = {
                oldImage: prev[projectId].boards[boardId].tasks.find(t => t.id === id)!,
                newImage: newState[projectId].boards[boardId].tasks.find(t => t.id === id)!,
                resourceIds: [id],
                action: TaskActionType.UPDATE
            }
            broadcast.postMessage(action);
            return newState;
        });
    }

    const assignTask = (taskId: Id, memberIds: Id[]) => {
        setProjects(prev => {
            const newState = {
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: prev[projectId].boards[boardId].tasks.map(task => {
                                if (task.id === taskId) {
                                    return { ...task, assignedTo: [...task.assignedTo, ...getAssignees(memberIds)] }
                                }
                                return task;
                            })
                        }
                    }
                }
            }
            const action: TaskActionBroadcast = {
                oldImage: prev[projectId].boards[boardId].tasks.find(t => t.id === taskId)!,
                newImage: newState[projectId].boards[boardId].tasks.find(t => t.id === taskId)!,
                resourceIds: memberIds,
                action: TaskActionType.UPDATE
            }
            broadcast.postMessage(action);
            return newState;
        });

        const users: KBMember[] = JSON.parse(localStorage.getItem('users')!);
        if (!users || users === null) return;
        const updatedUsers = users.map(user => {
            if (memberIds.includes(user.id)) {
                if (!user.assignedTasks) user.assignedTasks = [taskId];
                else user.assignedTasks.push(taskId);
            }
            return user
        });
        cacheItem('users', updatedUsers);
    }

    const revokeTask = (taskId: Id, memberIds: Id[]) => {
        setProjects(prev => {
            const newState = {
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            tasks: prev[projectId].boards[boardId].tasks.map(task => {
                                if (task.id === taskId) {
                                    return { ...task, assignedTo: task.assignedTo.filter(user => !memberIds.includes(user.id)) }
                                }
                                return task;
                            })
                        }
                    }
                }
            }
            const action: TaskActionBroadcast = {
                oldImage: prev[projectId].boards[boardId].tasks.find(t => t.id === taskId)!,
                newImage: newState[projectId].boards[boardId].tasks.find(t => t.id === taskId)!,
                resourceIds: memberIds,
                action: TaskActionType.UPDATE
            }
            broadcast.postMessage(action);
            return newState;
        });

        const users: KBMember[] = JSON.parse(localStorage.getItem('users')!);
        if (!users || users === null) return;
        const updatedUsers = users.map(user => {
            if (memberIds.includes(user.id)) {
                if (user.assignedTasks) user.assignedTasks = user.assignedTasks.filter(id => id !== taskId);
            }
            return user
        });
        cacheItem('users', updatedUsers);
    }

    const getAssignees = (memberIds: Id[]): KBMember[] => {
        const users: KBMember[] = JSON.parse(localStorage.getItem('users')!);
        if (!users || users === null) return [];
        return users.filter(user => memberIds.includes(user.id));
    }

    return { createTask, updateTask, deleteTask, assignTask, revokeTask };

}