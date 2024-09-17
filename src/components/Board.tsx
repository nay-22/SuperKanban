import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useContext, useMemo } from 'react';
import { Add } from '@mui/icons-material';
import { createPortal } from 'react-dom';

import KanbanContext from '../contexts/KanbanContext';
import Column from './Column';
import Task from './Task';
import { useColumnActions } from '../hooks/ColumnActions';
import { useDragHandles } from '../hooks/DragHandles';


const Board = () => {

    const { handleDragStart, handleDragOver, handleDragEnd } = useDragHandles();
    const { columns, tasks, activeItem } = useContext(KanbanContext);
    const { createColumn } = useColumnActions();

    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 10 }
    }), useSensor(KeyboardSensor));

    return (
        <>
            <div className='flex items-center justify-between gap-5'>
                <button
                    onClick={() => createColumn()}
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
                    <Add />
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
                                    <Column key={col.id} column={col}>
                                        <SortableContext items={tasks.filter(task => task.columnId === col.id)}>
                                            {tasks.filter(task => task.columnId === col.id).map(task => (
                                                <Task key={task.id} task={task} />
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
                                    <Task task={activeItem} /> :
                                    <Column column={activeItem}>
                                        <SortableContext items={tasks.filter(task => task.columnId === activeItem.id)}>
                                            {tasks.filter(task => task.columnId === activeItem.id).map(task => (
                                                <Task key={task.id} task={task} />
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

