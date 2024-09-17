import { v4 as uuid } from "uuid";
import { Id, KBColumn } from "../types";
import { useContext } from "react";
import KanbanContext from "../contexts/KanbanContext";
import { cacheItem } from "../utils/CacheUtils";

export const useColumnActions = () => {
    const { setColumns } = useContext(KanbanContext);

    const createColumn = () => {
        const column: KBColumn = {
            id: uuid(),
            title: 'Column',
            sortOrder: 'none',
        };
        setColumns(prev => {
            const newState = [...prev, column];
            cacheItem('columns', newState);
            return newState;
        });
    };

    const deleteColumn = (id: Id) => {
        setColumns(prev => {
            const newState = prev.filter(col => col.id !== id);
            cacheItem('columns', newState);
            return newState;
        });
    };

    const updateColumn = (id: Id, title: string, sortOrder: string) => {
        setColumns(prev => {
            const newState = prev.map(col => {
                if (col.id === id) {
                    return { ...col, title, sortOrder };
                }
                return col;
            });
            cacheItem('columns', newState);
            return newState;
        });
    };

    return { createColumn, updateColumn, deleteColumn };

};
