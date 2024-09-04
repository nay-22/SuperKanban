import React, { useContext } from 'react'
import { Box } from '@mui/material';

import KanbanContext from '../contexts/KanbanContext';
import DroppableArea from './DroppableArea';
import Draggable from './Draggable';
import Column from './Column';
import Task from './Task';


const Board = () => {
    const { columns, columnOrder, setColumnOrder, items, setItems, draggedItem, setDraggedItem, colDropRefs, containerRef } = useContext(KanbanContext);

    // IMPORTANT LOGIC (FIXED)
    const handleTaskDrop = (id, idx) => {
        if (draggedItem) {
            columnOrder.map(colId => {
                if (colId === draggedItem.column) {
                    if (id === draggedItem.column) {
                        let currentColumnItems = [...items[id]];
                        currentColumnItems = currentColumnItems.filter(item => item.id !== draggedItem.id);
                        if (idx < draggedItem.currIdx) idx++;
                        currentColumnItems.splice(idx, 0, draggedItem);
                        setItems(prev => ({ ...prev, [id]: currentColumnItems }));
                    } else {
                        let targetColumnItems = [...items[id] || []];
                        targetColumnItems.splice(idx + 1, 0, { ...draggedItem, column: id });
                        let currentColumnItems = [...items[draggedItem.column]].filter(item => item.id !== draggedItem.id);
                        setItems(prev => ({ ...prev, [id]: targetColumnItems, [draggedItem.column]: currentColumnItems }));
                    }
                }
            });
        }
    };

    const handleColumnDrop = (idx) => {
        if (draggedItem) {
            const { id, column } = draggedItem;
            console.log(id);
            console.log(columns.get(id));
            console.log(idx);
            console.log(column);

            let updatedColumns = [...columnOrder];
            updatedColumns.splice(column, 1);
            if (column > idx) idx++;
            updatedColumns.splice(idx, 0, id);
            setColumnOrder(updatedColumns);
        }
    }


    return (
        <Box
            ref={containerRef}
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'start',
                gap: '.5em',
                margin: '2em auto',
                overflowX: 'auto',
                maxWidth: '100vw',
                height: '100vh',
                width: 'fit-content',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
            <DroppableArea
                id='column_-1'
                allowedType='column'
                dropRef={colDropRefs['column_-1']}
                dragType={draggedItem !== null ? draggedItem.type : 'null'}
                onDrop={() => handleColumnDrop(-1)}
            />
            {columnOrder.map((colId, idx) => (
                <React.Fragment key={idx}>
                    <Column
                        type={'column'}
                        idx={idx}
                        id={colId}
                        column={idx}
                    >
                        <DroppableArea
                            id={`task_m_1`}
                            allowedType='task'
                            dragType={draggedItem !== null ? draggedItem.type : 'null'}
                            vertical
                            onDrop={() => handleTaskDrop(colId, -1)}
                        />
                        {items[colId] && items[colId].map((item, index) => (
                            <React.Fragment key={item.id}>
                                <Draggable
                                    id={item.id}
                                    currIdx={index}
                                    title={item.title}
                                    column={item.column}
                                    priority={item.priority}
                                    type={'task'}
                                    setDraggedItem={setDraggedItem}
                                >
                                    <Task
                                        id={item.id}
                                        title={item.title}
                                        colId={colId}
                                        priority={item.priority}
                                        onDelete={() => {
                                            setItems(prev => ({ ...prev, [colId]: prev[colId].filter(i => i.id !== item.id) }));
                                        }}
                                    />
                                </Draggable>
                                <DroppableArea
                                    id={`task_${index}`}
                                    allowedType='task'
                                    dragType={draggedItem !== null ? draggedItem.type : 'null'}
                                    vertical
                                    onDrop={() => handleTaskDrop(colId, index)}
                                />
                            </React.Fragment>
                        ))}
                    </Column>
                    <DroppableArea
                        id={`column_${idx}`}
                        dropRef={colDropRefs[`column_${idx}`]}
                        allowedType='column'
                        dragType={draggedItem !== null ? draggedItem.type : 'null'}
                        onDrop={() => handleColumnDrop(idx)}
                    />
                </React.Fragment>
            ))
            }
        </Box >
    )
}

export default Board