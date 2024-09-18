import { useContext } from "react";
import { v4 as uuid } from "uuid";

import { Id, KBTask } from "../types";
import KanbanContext from "../contexts/KanbanContext";
import { cacheItem } from "../utils/CacheUtils";

export const useTaskActions = () => {

    const { setTasks, setNewItemId } = useContext(KanbanContext);

    const createTask = (columnId: Id) => {
        const date = new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        setTasks(prev => {
            const id = uuid();
            setNewItemId(id);
            const task: KBTask = {
                id,
                columnId,
                createdAt: date.split(','),
                priority: 1,
                content: ''
            }
            const newState = [task, ...prev];
            cacheItem('tasks', newState);
            return newState;
        });
    }

    const deleteTask = (id: Id) => {
        setTasks(prev => {
            const newState = prev.filter(task => task.id !== id);
            cacheItem('tasks', newState);
            return newState;
        });
    }

    const updateTask = (id: Id, content: string, priority: number) => {
        setTasks(prev => {
            const newState = prev.map(task => {
                if (task.id === id) {
                    return { ...task, content, priority };
                }
                return task;
            });
            cacheItem('tasks', newState);
            return newState;
        });
    }

    return { createTask, updateTask, deleteTask };

}