import { CollisionPriority, Data, Draggable, DragOperation, Droppable } from '@dnd-kit/abstract'
import { DragDropProvider } from '@dnd-kit/react'
import { List, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { move } from '@dnd-kit/helpers'

import KanbanContext from '../contexts/KanbanContext'
import Sortable from './Sortable'
import Column from './Column'
import Task from './Task'

const Board = () => {

    const context = useContext(KanbanContext);
    if (!context) return <><Typography>Something went wrong</Typography></>

    const { items, setItems } = context;

    return (
        <DragDropProvider
            onDragOver={(event) => {
                const { source, target } = event.operation;
                if (source && target) {
                    setItems((prev: any) => move(prev, source, target));
                }
            }}
        >
            <List
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '1rem',
                    padding: '1rem',
                    overflow: 'auto',
                }}
            >
                {Object.entries(items).map(([column, columnItems], columnIndex) => (
                    <Sortable
                        key={column}
                        id={column}
                        index={columnIndex}
                        type={'column'}
                        accept={['task', 'column']}
                        collisionPriority={CollisionPriority.Low}
                    >
                        <Column id={column} index={columnIndex}>
                            {columnItems.map((item, taskIndex) => (
                                <Sortable
                                    key={item.id}
                                    id={item.id}
                                    index={taskIndex}
                                    type={'task'}
                                    accept={'task'}
                                    group={column}
                                >
                                    <Task
                                        id={item.id}
                                        name={item.name}
                                        priority={item.priority}
                                        createdAt={item.createdAt}
                                        index={taskIndex}
                                    />
                                </Sortable>
                            ))}
                            {columnItems.length === 0 && <Typography sx={{ textAlign: 'center', padding: '2em', border: '1px dashed grey', borderRadius: '.5em' }}>Drop Tasks Here</Typography>}
                        </Column>
                    </Sortable>
                ))}
            </List>
        </DragDropProvider>
    )
}

export default Board;
