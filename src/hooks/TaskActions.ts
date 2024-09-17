import { useContext } from "react";
import { v4 as uuid } from "uuid";

import { Id, KBTask } from "../types";
import KanbanContext from "../contexts/KanbanContext";

export const useTaskActions = () => {

    const { activeItem, tasks, setTasks, setColumns } = useContext(KanbanContext);

    const createTask = (columnId: Id) => {
        const date = new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        const task: KBTask = {
            id: uuid(),
            columnId,
            createdAt: date.split(','),
            priority: 1,
            content: 'Task ' + (tasks?.length + 1)
        }
        setTasks(prev => [task, ...prev])
        setColumns(prev => prev.map(col => {
            if (col.id === columnId) {
                return { ...col, taskLen: col.taskLen + 1 }
            }
            return col;
        }));
    }

    const deleteTask = (id: Id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
        setColumns(prev => prev.map(col => {
            if (col.id === activeItem?.id) {
                return { ...col, taskLen: col.taskLen - 1 }
            }
            return col;
        }));
    }

    const updateTask = (id: Id, content: string, priority: number) => {
        setTasks(prev => prev.map(task => {
            if (task.id === id) {
                return { ...task, content, priority }
            }
            return task;
        }))
    }

    return { createTask, updateTask, deleteTask };

}