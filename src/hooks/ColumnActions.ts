import { v4 as uuid } from "uuid";
import { Id, KBColumn } from "../types";
import { useContext } from "react";
import KanbanContext from "../contexts/KanbanContext";

export const useColumnActions = () => {
    const { setNewItemId, setProjects, projectId, boardId } = useContext(KanbanContext);

    const createColumn = (projectId: Id, boardId: Id) => {
        const id = uuid();
        const column: KBColumn = {
            id,
            title: '',
            sortOrder: 'none',
        };

        setProjects(prev => {
            const newState = {
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            columns: [...prev[projectId].boards[boardId].columns, column]
                        }
                    }
                }
            };
            return newState;
        });

        setNewItemId(id);
    };

    const deleteColumn = (id: Id) => {
        setProjects(prev => {
            const newState = {
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            columns: prev[projectId].boards[boardId].columns.filter(col => col.id !== id)
                        }
                    }
                }
            };
            return newState;
        });
    };

    const updateColumn = (id: Id, title: string, sortOrder: string) => {
        setProjects(prev => {
            const newState = {
                ...prev,
                [projectId]: {
                    ...prev[projectId],
                    boards: {
                        ...prev[projectId].boards,
                        [boardId]: {
                            ...prev[projectId].boards[boardId],
                            columns: prev[projectId].boards[boardId].columns.map(col => {
                                if (col.id === id) {
                                    return { ...col, title, sortOrder };
                                }
                                return col;
                            })
                        }
                    }
                }
            };
            return newState;
        });
        
    };

    return { createColumn, updateColumn, deleteColumn };

};
