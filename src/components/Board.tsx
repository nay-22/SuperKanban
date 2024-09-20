import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { useContext, useMemo } from 'react';
import { createPortal } from 'react-dom';

import { useDragHandles } from '../hooks/DragHandles';
import KanbanContext from '../contexts/KanbanContext';
import Column from './Column';
import Task from './Task';

const Board = () => {

    const { handleDragStart, handleDragOver, handleDragEnd } = useDragHandles();
    const { projects, activeItem, projectId, boardId } = useContext(KanbanContext);

    const columnsId = useMemo(() => {
        if (projects[projectId]?.boards?.[boardId]?.columns) {
            return projects[projectId].boards[boardId].columns.map(col => col.id);
        }
        return [];
    }, [projects, projectId, boardId]);


    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: { distance: 10 }
    }), useSensor(KeyboardSensor));

    return <>

        {projects[projectId]?.boards[boardId]?.columns.length === 0 && <div className="h-[60vh] p-5 mx-10 flex items-center justify-center border-2 border-slate-400 border-dashed rounded-lg">
            Board Empty
        </div>}
        <div className="flex items-start justify-center">
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragOver}
            >
                <div className="m-auto flex gap-4 px-4 overflow-x-auto overflow-y-hidden scrollbar-thumb-indigo-400
                scrollbar-track-transparent scrollbar-thin">
                    <div className='flex flex-grow gap-4 '>
                        <SortableContext items={columnsId}>
                            {projects[projectId]?.boards?.[boardId]?.columns.map(col => {
                                const sortedItems = projects[projectId]?.boards?.[boardId]?.tasks
                                    .filter(task => task.columnId === col.id)
                                    .sort((a, b) => col.sortOrder === 'low' ?
                                        a.priority - b.priority :
                                        col.sortOrder === 'high' ?
                                            b.priority - a.priority :
                                            0
                                    );
                                return <Column key={col.id} column={col}>
                                    <SortableContext items={sortedItems}>
                                        {sortedItems.map(task => (
                                            <Task key={task.id} task={task} />
                                        ))}
                                    </SortableContext>
                                </Column>
                            })}
                        </SortableContext>
                    </div>
                </div>
                {createPortal(
                    <DragOverlay >
                        {activeItem && (
                            "content" in activeItem ?
                                <Task task={activeItem} /> :
                                <Column column={activeItem}>
                                    <SortableContext items={projects[projectId]?.boards?.[boardId]?.tasks.filter(task => task.columnId === activeItem.id)}>
                                        {projects[projectId]?.boards?.[boardId]?.tasks.filter(task => task.columnId === activeItem.id).map(task => (
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

    </>;
};

export default Board;

