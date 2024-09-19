import { useContext } from "react";
import { v4 as uuid } from "uuid";

import KanbanContext from "../contexts/KanbanContext";
import { timestamp } from "../utils/ResourceUtils";
import { Id, KBMember, KBTask } from "../types";

export const useTaskActions = () => {

    const { currentUser, setNewItemId, setProjects, projectId, boardId } = useContext(KanbanContext);

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
                            tasks: [...prev[projectId].boards[boardId].tasks, task]
                        }
                    }
                }
            }
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
            return newState;
        });
    }

    

    return { createTask, updateTask, deleteTask };

}