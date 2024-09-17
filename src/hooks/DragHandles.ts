import { useContext } from "react";
import KanbanContext from "../contexts/KanbanContext";
import { arrayMove } from "@dnd-kit/sortable";
import { DragStartEvent, DragOverEvent, DragEndEvent } from "@dnd-kit/core";
import { Id } from "../types";

export const useDragHandles = () => {

    const { setActiveItem, setTasks, setColumns } = useContext(KanbanContext);

    const handleDragStart = (e: DragStartEvent) => {
        const { current } = e.active.data;
        if (!current) return;
        const { type } = current;
        if (type === 'column') setActiveItem(current.column);
        else if (type === 'task') setActiveItem(current.task);
    }

    const handleDragOver = (e: DragOverEvent) => {
        const { active, over } = e;
        if (!over) return;
        const activeId = active.id;
        const overId = over.id;
        if (activeId === overId) return;
        const isActiveATask = active.data.current?.type === 'task';
        const isOverATask = over.data.current?.type === 'task';
        const isOverAColumn = over.data.current?.type === 'column';
        let currentColumn: Id;

        if (!isActiveATask) return;
        else if (isActiveATask && isOverATask) { // FIXED
            const targetColumn = over.data.current?.task.columnId;
            currentColumn = active.data.current?.task.columnId
            if (currentColumn === targetColumn) return;
            else {
                setTasks(prev => prev.map(task => task.id === active.id ? { ...task, columnId: targetColumn } : task));
            }
        }
        else if (isActiveATask && isOverAColumn) {
            currentColumn = active.data.current?.task.columnId
            if (currentColumn === overId) {
                return;
            }
            setTasks(prev => {
                const activeIndex = prev.findIndex(task => task.id === activeId);
                prev[activeIndex].columnId = overId;
                return arrayMove(prev, activeIndex, activeIndex);
            });
        }

    }

    const handleDragEnd = (e: DragEndEvent) => {
        setActiveItem(null);
        const { active, over } = e;
        if (!over) return;
        const activeColumnId = active.id
        const overColumnId = over.id;
        if (activeColumnId === overColumnId) return;

        const isActiveATask = active.data.current?.type === 'task';
        const isOverATask = over.data.current?.type === 'task';

        if (isActiveATask && isOverATask) {
            setTasks(prev => {
                const activeIndex = prev.findIndex(task => task.id === active.id);
                const overIndex = prev.findIndex(task => task.id === over.id);
                if (activeIndex === overIndex) return prev;
                prev[activeIndex].columnId = prev[overIndex].columnId;
                return arrayMove(prev, activeIndex, overIndex);
            });
        }

        setColumns(prev => {
            const activeColumnIndex = prev.findIndex(col => col.id === activeColumnId);
            const overColumnIndex = prev.findIndex(col => col.id === overColumnId);
            return arrayMove(prev, activeColumnIndex, overColumnIndex);
        });
    }

    return { handleDragStart, handleDragOver, handleDragEnd };
}