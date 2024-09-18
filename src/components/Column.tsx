import React, { isValidElement, useContext, useEffect, useState } from 'react'
import { KBColumn } from '../types'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import { Badge, Button, Tooltip } from '@mui/material';
import { Add, DeleteOutline, DragIndicator, SwapVert } from '@mui/icons-material';
import { useTaskActions } from '../hooks/TaskActions';
import { useColumnActions } from '../hooks/ColumnActions';
import KanbanContext from '../contexts/KanbanContext';
import ConfirmationModal from './modals/ConfirmationModal';

interface ColumnProps {
    column: KBColumn;
    children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ column, children }) => {

    const { hasTouch, newItemId, setNewItemId } = useContext(KanbanContext);
    const { updateColumn, deleteColumn } = useColumnActions();
    const { createTask } = useTaskActions();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [editMode, setEditMode] = useState(false);
    const [isPointerIn, setIsPointerIn] = useState(false);
    const [title, setTitle] = useState(column.title);

    useEffect(() => {
        if (column.id === newItemId) {
            setEditMode(true);
            setNewItemId(null);
        }
    }, []);

    let sortableContextArrayLen = 0;
    if (isValidElement(children)) {
        sortableContextArrayLen = children.props.items.length
    }

    const { setNodeRef, isDragging, attributes, listeners, transform, transition } = useSortable({
        id: column.id,
        data: {
            type: 'column',
            column
        },
        disabled: editMode
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`
            touch-none
            bg-columnBackgroundColor
            w-[350px]
            h-[76vh]
            rounded-md
            flex
            flex-col
            ${isDragging && 'opacity-35'}
            `}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    setEditMode(true);
                }
            }}
        >
            <div
                className='
                flex
                items-center
                justify-between
                bg-mainBackgroundColor 
                text-md h-[60px] 
                rounded-md 
                rounded-b-none 
                p-4'
                onClick={() => setEditMode(true)}
            >
                <div className='flex gap-2'>
                    <div {...listeners} className='cursor-move'>
                        <DragIndicator />
                    </div>
                    <div
                        className='
                    flex 
                    justify-center 
                    items-center 
                    bg-taskBackgroundSecondary 
                    px-2 py-1 
                    text-sm 
                    rounded-full'
                    >
                        {sortableContextArrayLen}
                    </div>
                    {editMode
                        ? <input
                            autoFocus
                            type="text"
                            placeholder='Enter column name'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onBlur={() => {
                                setEditMode(false);
                                updateColumn(column.id, title, column.sortOrder);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setEditMode(false);
                                    updateColumn(column.id, title, column.sortOrder);
                                } else if (e.key === 'Escape') {
                                    setEditMode(false);
                                    setTitle(column.title);
                                }
                                e.stopPropagation();
                            }}
                            className='bg-transparent 
                            outline-none w-[90%]
                            focus:outline-indigo-400 rounded-sm'
                        />
                        : <Tooltip title='Click To Edit' placement='top' arrow enterDelay={1000} leaveDelay={500}>
                            <p className='flex items-center justify-center'>
                                {column.title ? column.title : <span className='text-slate-500'>Edit Column</span>}
                            </p>
                        </Tooltip>
                    }
                </div>
                <div
                    className='flex items-center justify-end gap-1 cursor-pointer'
                >
                    <Tooltip
                        title={`Sorted By: ${column.sortOrder.toUpperCase()}`}
                        placement='top'
                        arrow
                    >
                        <Badge
                            badgeContent={column.sortOrder.charAt(0).toUpperCase()}
                            sx={{
                                '& .MuiBadge-badge': {
                                    bgcolor: 'rgba(40, 56, 71)',
                                    color: 'white',
                                },
                            }}
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const sortOrders = ['none', 'low', 'high'];
                                    const currIndex = sortOrders.indexOf(column.sortOrder);
                                    const nextIndex = (currIndex + 1) % sortOrders.length;
                                    updateColumn(column.id, column.title, sortOrders[nextIndex]);
                                }}
                                className='flex items-center justify-center text-blue-300 rounded-sm px-2 py-1'>
                                <SwapVert />
                            </button>
                        </Badge>
                    </Tooltip>
                    <Tooltip
                        title={`Delete ${column.title}`}
                        placement='top'
                        arrow
                        enterDelay={2000}
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteModal(true);
                            }}
                            className='flex items-center justify-center text-red-400 rounded-sm px-2 py-1'>
                            <DeleteOutline />
                        </button>
                    </Tooltip>
                    <Tooltip
                        title={`Add Task`}
                        placement='top'
                        arrow
                        enterDelay={2000}
                    >
                        <Button
                            sx={{ minWidth: 0, width: '40px' }}
                            variant='outlined'
                            onClick={(e) => {
                                e.stopPropagation();
                                createTask(column.id);
                            }}
                            className='text-indigo-400 rounded-sm px-2 py-1'>
                            <Add />
                        </Button>
                    </Tooltip>
                </div>
            </div>
            <div
                onPointerEnter={() => setIsPointerIn(true)}
                onPointerLeave={() => setIsPointerIn(false)}
                className={`
                flex 
                flex-grow 
                p-4 
                flex-col 
                gap-4 
                overflow-x-hidden 
                overflow-y-auto 
                cursor-auto
                ${isDragging || isPointerIn || hasTouch ? 'scrollbar-thin' : 'scrollbar-none'}
                scrollbar-thumb-red-400
                scrollbar-track-transparent`
                }
            >
                {sortableContextArrayLen === 0 ?
                    <div
                        className='
                        flex 
                        items-center 
                        justify-center 
                        w-full 
                        h-full
                        border-2
                        border-dashed
                        rounded-xl
                        border-slate-600'
                    >
                        Add or Drop Tasks
                    </div> :
                    children
                }
            </div>
            <ConfirmationModal message={`Confirm Deletion of "${column.title}"?`} onConfirm={() => deleteColumn(column.id)} open={showDeleteModal} onClose={() => setShowDeleteModal(false)} />
        </div>
    );
}

export default Column