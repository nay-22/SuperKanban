import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';

import KanbanContext from '../contexts/KanbanContext';
import Column from './Column';
import Task from './Task';
import { useDragHandles } from '../hooks/DragHandles';


const Board = () => {

    const { handleDragStart, handleDragOver, handleDragEnd } = useDragHandles();
    const { columns, tasks, activeItem } = useContext(KanbanContext);

    const columnsId = useMemo(() => columns.map(col => col.id), [columns]);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 10 }
    }), useSensor(KeyboardSensor));

    return (

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
                                    <SortableContext items={tasks.filter(task => task.columnId === col.id).sort((a, b) => col.sortOrder === 'low' ? a.priority - b.priority : col.sortOrder === 'high' ? b.priority - a.priority : 0)}>
                                        {tasks.filter(task => task.columnId === col.id).sort((a, b) => col.sortOrder === 'low' ? a.priority - b.priority : col.sortOrder === 'high' ? b.priority - a.priority : 0).map(task => (
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

    );
};

export default Board;

