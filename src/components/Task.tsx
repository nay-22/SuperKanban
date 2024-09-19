import React, { useContext, useEffect, useRef, useState } from 'react';
import { KBTask } from '../types';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Avatar, Button, Modal, Tooltip } from '@mui/material';
import { Add, DeleteOutline, DragIndicator, KeyboardArrowDown } from '@mui/icons-material';
import { useTaskActions } from '../hooks/TaskActions';
import ConfirmationModal from './modals/ConfirmationModal';
import KanbanContext from '../contexts/KanbanContext';
import AssigneeForm from './forms/AssigneeForm';

interface TaskProps {
    task: KBTask;
}

const Task: React.FC<TaskProps> = React.memo(({ task }) => {
    const { updateTask, deleteTask } = useTaskActions();
    const { newItemId, setNewItemId } = useContext(KanbanContext);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editPriority, setEditPriority] = useState(false);
    const [editContent, setEditContent] = useState(false);
    const [showAssigneeForm, setShowAssigneeForm] = useState(false)
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
                    <div {...listeners} className={`touch-none ${isDragging ? 'cursor-grabbing' : 'cursor-move'}`}>
                        <DragIndicator />
                    </div>
                    <div>
                        <div className='text-sm text-slate-100'>{`${task.createdAt.date}, ${task.createdAt.year}`}</div>
                        <div className='text-xs text-slate-400'>{task.createdAt.time}</div>
                    </div>
                </div>
                <div className='flex items-center justify-center gap-2 cursor-pointer'>
                    <button
                        className={`hover:bg-slate-700 rounded-full flex items-center justify-center text-red-400 px-1 py-1`}
                        onClick={() => setShowDeleteModal(true)}
                    >
                        <DeleteOutline />
                    </button>
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
                                onClick={() => setEditPriority(!editPriority)}
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
                {editContent ? (
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
                    <Tooltip className='cursor-pointer' title='Click To Edit' placement='bottom-start' arrow enterDelay={2000} leaveDelay={0}>
                        <div
                            onClick={() => {
                                setEditContent(true);
                            }}
                            className='bg-taskBackgroundSecondary p-3 rounded-b-lg overflow-y-auto scrollbar-thin'
                        >
                            {task.content ? task.content : <p className='text-slate-500'>Empty, click to enter task content</p>}
                        </div>
                    </Tooltip>
                )}
                <Accordion
                    disableGutters
                    sx={{
                        bgcolor: 'rgba(40, 56, 71)',
                        color: 'white',
                        borderRadius: '0 0 2em 2em'
                    }}
                >
                    <AccordionSummary
                        sx={{
                            height: '40px',
                            minHeight: '0px',
                            maxHeight: '40px',
                            alignItems: 'center',
                        }}
                        expandIcon={<KeyboardArrowDown sx={{ color: 'white' }} />}
                    >
                        <div className='px-1 py-1 flex items-center justify-left gap-2'>
                            <Avatar sx={{ width: '25px', height: '25px' }} src={task.createdBy.avatar} alt={task.createdBy.name} />
                            <span className='text-xs text-slate-400'>Created By {task.createdBy.name}</span>
                        </div>
                    </AccordionSummary>
                    <AccordionActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                        <p className='text-xs text-slate-400'>{task.assignedTo.length === 0 && 'Not Assigned'}</p>
                        <Button onClick={() => setShowAssigneeForm(true)} variant='outlined' sx={{ textTransform: 'none' }} startIcon={<Add />}>Assign</Button>
                    </AccordionActions>
                    {task.assignedTo.length !== 0 && <AccordionDetails>
                        {task.assignedTo?.map(person => (
                            <div className='px-1 py-1 flex items-center justify-left gap-2'>
                                <Avatar sx={{ width: '25px', height: '25px' }} src={person.avatar} alt={person.name} />
                                <span className='text-xs text-slate-400'>Created By {person.name}</span>
                            </div>
                        ))}
                    </AccordionDetails>}
                </Accordion>
            </div>
            <ConfirmationModal onConfirm={() => deleteTask(task.id)} open={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
            <Modal
                open={showAssigneeForm}
                onClose={() => setShowAssigneeForm(false)}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    className='bg-taskBackgroundPrimary p-10 rounded-lg'
                >
                    <AssigneeForm taskId={task.id} callback={() => setShowAssigneeForm(false)} />
                </div>
            </Modal>
        </div>
    );
})

export default Task;
