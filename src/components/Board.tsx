import { useMemo, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import { Id, KBColumn, KBTask } from '../types';

import { v4 as uuid } from 'uuid';
import Column from './Column';
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import Task from './Task';


const Board = () => {
    const [columns, setColumns] = useState<KBColumn[]>(JSON.parse(localStorage.getItem('columns')!) || []);
    const [tasks, setTasks] = useState<KBTask[]>(JSON.parse(localStorage.getItem('tasks')!) || []);
    const [activeItem, setActiveItem] = useState<KBColumn | KBTask | null>(null);
    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 10 }
    }), useSensor(KeyboardSensor));

    const createColumn = () => {
        const column: KBColumn = {
            id: uuid(),
            title: 'Column ' + (columns.length + 1),
            taskLen: 0,
        };
        setColumns(prev => [...prev, column])
    }

    const deleteColumn = (id: KBColumn['id']) => {
        setColumns(prev => prev.filter(col => col.id !== id))
    }

    const updateColumn = (id: KBColumn['id'], title: KBColumn['title']) => {
        setColumns(prev => prev.map(col => {
            if (col.id === id) {
                return { ...col, title }
            }
            return col;
        }))
    }

    const createTask = (columnId: KBColumn['id']) => {
        const date = new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' });
        console.log(date);

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

        const currentColumn = active.data.current?.task.columnId;
        if (!isActiveATask) return;
        else if (isActiveATask && isOverATask) { // FIXED
            const targetColumn = over.data.current?.task.columnId;
            if (currentColumn === targetColumn) return;
            else {
                setTasks(prev => prev.map(task => task.id === active.id ? { ...task, columnId: targetColumn } : task));
                setColumns(prev => prev.map(column => (
                    column.id === currentColumn ? { ...column, taskLen: (column.taskLen - 1) >= 0 ? column.taskLen - 1 : 0 } : (
                        column.id === targetColumn ? { ...column, taskLen: column.taskLen + 1 } : column
                    )))
                );
            }
        }
        else if (isActiveATask && isOverAColumn) {
            if (active.data.current?.task.columnId === overId) {
                return;
            }
            setTasks(prev => {
                const activeIndex = prev.findIndex(task => task.id === activeId);
                prev[activeIndex].columnId = overId;
                return arrayMove(prev, activeIndex, activeIndex);
            });
            setColumns(prev => prev.map(column => (
                column.id === currentColumn ? { ...column, taskLen: (column.taskLen - 1) >= 0 ? column.taskLen - 1 : 0 } : (
                    column.id === over.id ? { ...column, taskLen: column.taskLen + 1 } : column
                )))
            );
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
                tasks[activeIndex].columnId = tasks[overIndex].columnId;
                return arrayMove(prev, activeIndex, overIndex);
            });
        }

        setColumns(prev => {
            const activeColumnIndex = prev.findIndex(col => col.id === activeColumnId);
            const overColumnIndex = prev.findIndex(col => col.id === overColumnId);
            return arrayMove(prev, activeColumnIndex, overColumnIndex);
        });
    }

    return (
        <>
            <div className='flex items-center justify-between gap-5'>
                <button
                    onClick={createColumn}
                    className="
                    flex
                    items-center
                    justify-center
                    // h-16
                    w-48
                    cursor-pointer
                    rounded-lg
                    bg-mainBackgroundColor
                    border-2
                    border-columnBackgroundColor
                    p-4
                    mx-auto
                    mt-10
                    hover:ring-2
                    hover:ring-rose-500
                    transition-all
                    duration-200
                    "
                >
                    Add Column
                    <PlusIcon />
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem('columns', JSON.stringify(columns));
                        localStorage.setItem('tasks', JSON.stringify(tasks));
                    }}
                    className="
                    flex
                    items-center
                    justify-center
                    h-16
                    w-48
                    cursor-pointer
                    rounded-lg
                    bg-mainBackgroundColor
                    border-2
                    border-columnBackgroundColor
                    p-4
                    mx-auto
                    mt-10
                    hover:ring-2
                    hover:ring-rose-500
                    transition-all
                    duration-200
                    "
                >
                    Save Items
                </button>
                <button
                    onClick={() => {
                        localStorage.setItem('columns', JSON.stringify([]));
                        localStorage.setItem('tasks', JSON.stringify([]));
                    }}
                    className="
                    flex
                    items-center
                    justify-center
                    h-16
                    w-48
                    cursor-pointer
                    rounded-lg
                    bg-mainBackgroundColor
                    border-2
                    border-columnBackgroundColor
                    p-4
                    mx-auto
                    mt-10
                    hover:ring-2
                    hover:ring-rose-500
                    transition-all
                    duration-200
                    "
                >
                    Clear Items
                </button>
            </div>
            <div className="flex mt-10 items-start justify-center">
                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragMove={handleDragOver}
                >
                    <div className="m-auto flex gap-4 p-4 overflow-x-auto overflow-y-hidden scrollbar-thumb-red-400
                scrollbar-track-transparent scrollbar-thin">
                        <div className='flex flex-grow gap-4 '>
                            <SortableContext items={columnsId}>
                                {columns.map(col => (
                                    <Column key={col.id} column={col} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask}>
                                        <SortableContext items={tasks.filter(task => task.columnId === col.id)}>
                                            {tasks.filter(task => task.columnId === col.id).map(task => (
                                                <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                                            ))}
                                        </SortableContext>
                                    </Column>
                                ))}
                            </SortableContext>
                        </div>
                    </div>
                    {createPortal(
                        <DragOverlay >
                            {activeItem && (
                                "content" in activeItem ?
                                    <Task task={activeItem} deleteTask={deleteTask} updateTask={updateTask} /> :
                                    <Column column={activeItem} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask}>
                                        <SortableContext items={tasks.filter(task => task.columnId === activeItem.id)}>
                                            {tasks.filter(task => task.columnId === activeItem.id).map(task => (
                                                <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                                            ))}
                                        </SortableContext>
                                    </Column>
                            )}
                        </DragOverlay>,
                        document.body
                    )}
                </DndContext>
            </div>
        </>
    );
};

export default Board;
