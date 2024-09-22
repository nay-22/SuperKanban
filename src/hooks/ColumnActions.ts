import { v4 as uuid } from "uuid";
import { ColumnActionBroadcast, ColumnActionType, Id, KBColumn } from "../types";
import { useContext } from "react";
import KanbanContext from "../contexts/KanbanContext";

export const useColumnActions = () => {
    const { setNewItemId, setProjects, projectId, boardId, columnChannel: broadcast } = useContext(KanbanContext);

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
                        ...prev[projectId]?.boards,
                        [boardId]: {
                            ...prev[projectId]?.boards[boardId],
                            columns: [...prev[projectId]?.boards[boardId].columns, column]
                        }
                    }
                }
            };
            const action: ColumnActionBroadcast = {
                oldImage: null,
                newImage: column,
                resourceIds: [id],
                action: ColumnActionType.CREATE
            }
            broadcast.postMessage(action);
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
            const action: ColumnActionBroadcast = {
                oldImage: prev[projectId].boards[boardId].columns.find(c => c.id === id) || null,
                newImage: null,
                resourceIds: [id],
                action: ColumnActionType.DELETE
            }
            broadcast.postMessage(action);
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
            const action: ColumnActionBroadcast = {
                oldImage: prev[projectId].boards[boardId].columns.find(c => c.id === id) || null,
                newImage: newState[projectId].boards[boardId].columns.find(c => c.id === id) || null,
                resourceIds: [id],
                action: ColumnActionType.UPDATE
            }
            broadcast.postMessage(action);
            return newState;
        });
        
    };

    return { createColumn, updateColumn, deleteColumn };

};
