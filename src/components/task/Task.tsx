import React, { useContext, useEffect, useRef, useState } from 'react';
import { KBTask } from '../../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tooltip } from '@mui/material';
import { DeleteOutline, DragIndicator } from '@mui/icons-material';
import { useTaskActions } from '../../hooks/TaskActions';
import ConfirmationModal from '../modals/ConfirmationModal';
import KanbanContext from '../../contexts/KanbanContext';
import AssigneeView from './AssigneeView';

interface TaskProps {
    task: KBTask;
    readonly?: boolean;
}

const Task: React.FC<TaskProps> = React.memo(({ task, readonly=false }) => {
    const { updateTask, deleteTask } = useTaskActions();
    const { newItemId, setNewItemId } = useContext(KanbanContext);

    const [showConfirmation, setShowConfirmation] = useState(false);
    const [editPriority, setEditPriority] = useState(false);
    const [editContent, setEditContent] = useState(false);
    const [content, setContent] = useState(task.content);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const priorityRef = useRef<HTMLDivElement>(null);


    const { isDragging, setNodeRef, attributes, listeners, transform, transition } = useSortable({
        id: task.id,
        data: {
            type: 'task',
            task
        },
        disabled: editContent || editPriority
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                priorityRef.current && !priorityRef.current.contains(event.target as Node)) {
                setEditPriority(false);
            }
        };

        document.addEventListener('pointerdown', handleClickOutside);
        return () => {
            document.removeEventListener('pointerdown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (newItemId === task.id) {
            setEditContent(true);
            setNewItemId(null);
        }
    }, []);

    return (
        <div
            ref={setNodeRef}
            style={{ ...style }}
            {...attributes}
            className={`cursor-auto bg-taskBackgroundPrimary rounded-md ${isDragging && 'opacity-10'}`}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    setEditContent(true);
                }
            }}
        >
            <div className='flex align-center justify-between p-3'>
                <div className={`flex justify-items-center gap-2`}>
                    {!readonly && <div {...listeners} className={`touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-move'}`}>
                        <DragIndicator />
                    </div>}
                    <div>
                        <div className='text-sm text-slate-100'>{`${task.createdAt.date}, ${task.createdAt.year}`}</div>
                        <div className='text-xs text-slate-400'>{task.createdAt.time}</div>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2 cursor-pointer'>
                    {!readonly && <button
                        className={`hover:bg-slate-700 rounded-full flex items-center justify-center text-red-400 px-1 py-1`}
                        onClick={() => setShowConfirmation(true)}
                    >
                        <DeleteOutline />
                    </button>}
                    <div
                        ref={priorityRef}
                        className='relative'
                    >
                        <Tooltip
                            title={`Priority: ${task.priority === 1 ? 'Low' : task.priority === 2 ? 'Medium' : 'High'}`}
                            placement='top-start'
                            enterDelay={500}
                            arrow
                        >
                            <div
                                onClick={() => !readonly && setEditPriority(!editPriority)}
                                className={`w-5 h-5 ${task.priority === 1 ? 'bg-green-500' : task.priority === 2 ? 'bg-orange-400' : 'bg-red-500'} rounded-full cursor-pointer`}
                            />
                        </Tooltip>
                        {editPriority && (
                            <div
                                ref={dropdownRef}
                                className='absolute top-6 right-0 z-50 flex flex-col items-start bg-gray-800 border border-gray-600 rounded-lg p-1'
                            >
                                <div
                                    onClick={() => {
                                        updateTask(task.id, task.content, 1);
                                        setEditPriority(false);
                                    }}
                                    className="w-full cursor-pointer p-1 rounded-lg hover:bg-green-500 hover:text-black text-green-500"
                                >
                                    Low
                                </div>
                                <div
                                    onClick={() => {
                                        updateTask(task.id, task.content, 2);
                                        setEditPriority(false);
                                    }}
                                    className="w-full cursor-pointer p-1 rounded-lg hover:bg-orange-400 hover:text-white text-orange-400"
                                >
                                    Medium
                                </div>
                                <div
                                    onClick={() => {
                                        updateTask(task.id, task.content, 3);
                                        setEditPriority(false);
                                    }}
                                    className="w-full cursor-pointer p-1 rounded-lg hover:bg-red-500 hover:text-white text-red-500"
                                >
                                    High
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='bg-taskBackgroundSecondary rounded-b-lg'>
                {!readonly && editContent ? (
                    <div className='flex items-center justify-between gap-2 p-3'>
                        <input
                            autoFocus
                            type='text'
                            placeholder='Enter task content'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            onBlur={() => {
                                setEditContent(false);
                                updateTask(task.id, content, task.priority);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setEditContent(false);
                                    updateTask(task.id, content, task.priority);
                                } else if (e.key === 'Escape') {
                                    setEditContent(false);
                                    setContent(task.content);
                                }
                                e.stopPropagation();
                            }}
                            className='bg-transparent outline-none w-full focus:outline-indigo-400 rounded-sm'
                        />
                    </div>
                ) : (
                    <Tooltip disableHoverListener={readonly} className={readonly ? 'cursor-default' : 'cursor-pointer'} title='Click To Edit' placement='left' arrow enterDelay={2000} leaveDelay={0}>
                        <div
                            onClick={() => {
                                setEditContent(true);
                            }}
                            className='bg-taskBackgroundSecondary p-3 rounded-b-lg overflow-y-auto scrollbar-thin text-white'
                        >
                            {task.content ? task.content : <p className='text-slate-500'>Empty, click to enter task content</p>}
                        </div>
                    </Tooltip>
                )}
                <AssigneeView readOnly={readonly} task={task} />
            </div>
            <ConfirmationModal onConfirm={() => deleteTask(task.id)} open={showConfirmation} onClose={() => setShowConfirmation(false)} />
        </div>
    );
})

export default Task;
