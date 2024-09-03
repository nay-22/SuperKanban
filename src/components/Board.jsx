import React, { useContext } from 'react'
import KanbanContext from '../contexts/KanbanContext';
import DroppableArea from './DroppableArea';
import Draggable from './Draggable';
import Column from './Column';
import Task from './Task';
import { Box } from '@mui/material';
import drag from '../assets/drag-white.png';
import { DragIndicator } from '@mui/icons-material';

const Board = () => {
    const { columnOrder, setColumnOrder, items, setItems, draggedItem, setDraggedItem, } = useContext(KanbanContext);

    // IMPORTANT LOGIC (FIXED)
    const onDrop = (id, idx) => {
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
            let updatedColumns = [...columnOrder];
            updatedColumns.splice(column, 1);
            if (column > idx) idx++;
            updatedColumns.splice(idx, 0, id);
            setColumnOrder(updatedColumns);
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'start',
                gap: '.5em',
                margin: '1em',
                overflowX: 'auto',
            }}
        >
            <DroppableArea
                allowedType='column'
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
                        setDraggedItem={setDraggedItem}
                    >
                        <DroppableArea
                            allowedType='task'
                            dragType={draggedItem !== null ? draggedItem.type : 'null'}
                            vertical
                            onDrop={() => onDrop(colId, -1)}
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
                                    allowedType='task'
                                    dragType={draggedItem !== null ? draggedItem.type : 'null'}
                                    vertical
                                    onDrop={() => onDrop(colId, index)}
                                />
                            </React.Fragment>
                        ))}
                    </Column>
                    <DroppableArea
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