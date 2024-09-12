import React, { useContext } from 'react'
import { Box } from '@mui/material';

import KanbanContext from '../contexts/KanbanContext';
import DroppableArea from './DroppableArea';
import Draggable from './Draggable';
import Column from './Column';
import Task from './Task';
import Sortable from './Sortable';
import { CollisionPriority } from '@dnd-kit/abstract';
import { move } from '@dnd-kit/helpers';
import { rectIntersection } from '@dnd-kit/core';
import { rectSwappingStrategy } from '@dnd-kit/sortable';
import { DragDropProvider } from '@dnd-kit/react';


const Board = () => {
    const { items, setItems, columnOrder, setColumnOrder } = useContext(KanbanContext);


    return (
        <DragDropProvider
            onDragOver={(event) => {
                const { source, target } = event.operation;
                if (source.type === 'task' && target.type === 'task') {
                    setItems((items) => move(items, source, target));
                }
                else if (source.type === 'column' && target.type === 'column') {
                    setColumnOrder((columnOrder) => move(columnOrder, source, target));
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '2em',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    // width: 'min-content',
                    height: 'max-content',
                    padding: '4em 1em',
                    overflowX: 'auto',
                    margin: '0 auto',
                    // width: 'fit-content',
                    // scrollbarWidth: 'none',
                    // msOverflowStyle: 'none',
                    // '&::-webkit-scrollbar': {
                    //     display: 'none',
                    // },
                }}
            >
                {columnOrder.map((col, index) => (
                    <Sortable
                        key={col}
                        id={col}
                        index={index}
                        type={'column'}
                        accept={['task', 'column']}
                        collisionPriority={CollisionPriority.Low}
                    >
                        <Column
                            type={'column'}
                            idx={index}
                            id={col}
                            column={index}
                        >
                            {items[col].map((item, index) => (
                                <Sortable
                                    key={item.id}
                                    id={item.id}
                                    index={index}
                                    type={'task'}
                                    accept={'task'}
                                    group={col}
                                >
                                    <Task
                                        id={item.id}
                                        title={item.title}
                                        colId={col}
                                        priority={item.priority}
                                        onDelete={() => {
                                            setItems(prev => ({ ...prev, [col]: prev[col].filter(i => i.id !== item.id) }));
                                        }}
                                    />
                                </Sortable>
                            ))}
                        </Column>
                    </Sortable>
                ))}
            </Box >
        </DragDropProvider>
    )
}

export default Board