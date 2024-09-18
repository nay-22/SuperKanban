import { useContext } from "react";
import { v4 as uuid } from "uuid";

import KanbanContext from "../contexts/KanbanContext";
import { timestamp } from "../utils/ResourceUtils";
import { cacheItem } from "../utils/CacheUtils";
import { Id, KBTask } from "../types";

export const useTaskActions = () => {

    const { setNewItemId, setProjects, projectId, boardId } = useContext(KanbanContext);

    const createTask = (columnId: Id) => {
        const id = uuid();
        const task: KBTask = {
            id,
            columnId,
            createdAt: timestamp(),
            priority: 1,
            content: ''
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
                            tasks: [...prev[projectId].boards[boardId].tasks, task]
                        }
                    }
                }
            }
            cacheItem('projects', newState);
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
            cacheItem('projects', newState);
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
            cacheItem('projects', newState);
            return newState;
        });
    }

    return { createTask, updateTask, deleteTask };

}