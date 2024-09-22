import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useContext, useEffect, useMemo, useState } from 'react';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

import { ColumnActionBroadcast, DragActionBroadcast, TaskActionBroadcast } from '../types';
import { useDragHandles } from '../hooks/DragHandles';
import KanbanContext from '../contexts/KanbanContext';
import useSync from '../hooks/SyncActions';
import Task from './task/Task';
import Column from './Column';

const Board = () => {

    const { projects, activeItem, projectId, boardId, taskChannel, columnChannel, dragChannel } = useContext(KanbanContext);
    const { handleDragStart, handleDragOver, handleDragEnd } = useDragHandles();
    const { syncTask, syncColumn, syncDrag } = useSync();
    const [taskBroadCast, setTaskBroadcast] = useState<TaskActionBroadcast | null>(null);
    const [columnBroadCast, setColumnBroadcast] = useState<ColumnActionBroadcast | null>(null);
    const [dragBroadCast, setDragBroadcast] = useState<DragActionBroadcast | null>(null);

    useEffect(() => {
        const handleTaskActions = (e: MessageEvent) => {
            setTaskBroadcast(e.data);
        }

        const handleColumnActions = (e: MessageEvent) => {
            setColumnBroadcast(e.data);
        }

        const handleDragActions = (e: MessageEvent) => {
            setDragBroadcast(e.data);
        }

        taskChannel.addEventListener('message', handleTaskActions);
        columnChannel.addEventListener('message', handleColumnActions);
        dragChannel.addEventListener('message', handleDragActions);


        return () => {
            taskChannel.removeEventListener('message', handleTaskActions);
            columnChannel.removeEventListener('message', handleColumnActions);
            dragChannel.removeEventListener('message', handleDragActions);
        }
    }, [])

    useEffect(() => {
        if (taskBroadCast != null) {
            syncTask(projectId, boardId, taskBroadCast);
            setTaskBroadcast(null);
        }
    }, [taskBroadCast]);

    useEffect(() => {
        if (columnBroadCast != null) {
            syncColumn(projectId, boardId, columnBroadCast);
            setColumnBroadcast(null);
        }
    }, [columnBroadCast]);

    useEffect(() => {
        if (dragBroadCast != null) {
            syncDrag(projectId, boardId, dragBroadCast);
            setDragBroadcast(null);
        }
    }, [dragBroadCast]);

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

