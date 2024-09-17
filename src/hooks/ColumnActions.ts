import { v4 as uuid } from "uuid";
import { Id, KBColumn } from "../types";
import { useContext } from "react";
import KanbanContext from "../contexts/KanbanContext";

export const useColumnActions = () => {
    const { setColumns } = useContext(KanbanContext);

    const createColumn = () => {
        const column: KBColumn = {
            id: uuid(),
            title: 'Column',
            sortOrder: 'none',
        };
        setColumns(prev => [...prev, column]);
    };

    const deleteColumn = (id: Id) => {
        setColumns(prev => prev.filter(col => col.id !== id));
    };

    const updateColumn = (id: Id, title: string, sortOrder: string) => {
        setColumns(prev => prev.map(col => {
            if (col.id === id) {
                return { ...col, title, sortOrder };
            }
            return col;
        }));
    };

    return { createColumn, updateColumn, deleteColumn };

};
