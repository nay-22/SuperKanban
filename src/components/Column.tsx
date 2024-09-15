import React, { isValidElement, useState } from 'react'
import { Id, KBColumn } from '../types'
import DeleteIcon from '../icons/DeleteIcon';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities'
import PlusIcon from '../icons/PlusIcon';

interface ColumnProps {
    column: KBColumn;
    deleteColumn: (id: Id) => void;
    updateColumn: (id: Id, title: string) => void;
    createTask: (columnId: Id) => void;
    children?: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ column, deleteColumn, updateColumn, createTask, children }) => {

    let sortableContextArrayLen = 0;
    if (isValidElement(children)) {
        sortableContextArrayLen = children.props.items.length
    }
    
    

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(column.title);
    const [hasTouch] = useState(() => 'ontouchstart' in window);
    const [isPointerIn, setIsPointerIn] = useState(false);

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
            {...listeners}
            className={`
            touch-none
            bg-columnBackgroundColor
            backdrop-filter
            backdrop-blur-sm
            w-[350px]

            max-h-[500px]
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
            onPointerEnter={() => setIsPointerIn(true)}
            onPointerLeave={() => setIsPointerIn(false)}
        >
            <div
                className='
            flex
            items-center
            justify-between
            bg-mainBackgroundColor 
            text-md h-[60px] 
            cursor-grab 
            rounded-md 
            rounded-b-none 
            p-4'
                onClick={() => setEditMode(true)}
            >
                <div className='flex gap-2'>
                    <div
                        className='
                    flex 
                    justify-center 
                    items-center 
                    bg-columnBackgroundColor 
                    px-2 py-1 
                    text-sm 
                    rounded-full'
                    >
                        0
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
                                updateColumn(column.id, title);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setEditMode(false);
                                    updateColumn(column.id, title);
                                } else if (e.key === 'Escape') {
                                    setEditMode(false);
                                    setTitle(column.title);
                                }
                                e.stopPropagation();
                            }}
                            className='bg-transparent 
                            outline-none
                            focus:outline-red-400 rounded-sm'
                        />
                        : column.title
                    }
                </div>
                <div
                    className='flex items-center justify-end gap-2'
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteColumn(column.id)
                        }}
                        className='flex items-center justify-center stroke-red-400 ring-red-950 hover:ring-2 rounded-sm px-2 py-1'>
                        <DeleteIcon />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            createTask(column.id)
                        }}
                        className='flex items-center justify-center stroke-indigo-400 ring-indigo-400 hover:ring-2 rounded-sm px-2 py-1'>
                        <PlusIcon />
                    </button>
                </div>
            </div>
            <div className={`
                flex 
                flex-grow 
                p-4 
                flex-col 
                gap-4 
                overflow-x-hidden 
                overflow-y-auto 
                scrollbar-${hasTouch || isPointerIn ? 'thin' : 'hide'}
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
        </div>
    );
}

export default Column