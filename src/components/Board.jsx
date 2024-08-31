import React, { useContext } from 'react'
import KanbanContext from '../contexts/KanbanContext';
import DroppableArea from './DroppableArea';
import Draggable from './Draggable';
import Column from './Column';
import Task from './Task';
import { Box } from '@mui/material';

const Board = () => {
    const { columns, setColumns, items, setItems, draggedItem, setDraggedItem, } = useContext(KanbanContext);

    // VERY IMPORTANT LOGIC - REVISIT
    const onDrag = (id, idx) => {
        if (draggedItem) {
            columns.map(col => {
                if (col === draggedItem.column) {
                    if (id === draggedItem.column) {
                        const updatedItems = [...items[col]];
                        const itemIndex = updatedItems.findIndex(item => item.id === draggedItem.id);
                        const [movedItem] = updatedItems.splice(itemIndex, 1);
                        updatedItems.splice(idx, 0, movedItem);
                        setItems(prev => ({ ...prev, [col]: updatedItems }));
                    } else {
                        const toColumnItems = [...items[id]];
                        const fromColumnItems = [...items[col]].filter(item => item.id !== draggedItem.id);
                        toColumnItems.splice(idx, 0, { ...draggedItem, column: id });
                        setItems(prev => ({ ...prev, [id]: toColumnItems, [col]: fromColumnItems }));
                    }
                }
            });
        }
    };



    const handleColumnDrop = (idx) => {
        if (draggedItem) {
            const { id, column } = draggedItem;
            console.log("col idx = " + idx);
            let updatedColumns = [...columns];
            updatedColumns.splice(column, 1);
            console.log(updatedColumns);
            if (column > idx) idx++;
            updatedColumns.splice(idx, 0, id);
            setColumns(updatedColumns);

        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'start',
                justifyContent: 'center',
                gap: '1em',
                padding: '2em',
                overflowX: 'auto'
            }}
        >
            <DroppableArea allowedType='column' dragType={draggedItem !== null ? draggedItem.type : 'null'} onDrop={() => handleColumnDrop(-1)} />
            {columns.map((col, idx) => (
                <React.Fragment key={idx}>
                    <Column
                        type={'column'}
                        id={col}
                        column={idx}
                        setDraggedItem={setDraggedItem}
                    >
                        <DroppableArea allowedType='task' dragType={draggedItem !== null ? draggedItem.type : 'null'} vertical onDrop={() => onDrag(col, 0)} />
                        {items[col].map((item, index) => (
                            <React.Fragment key={item.id}>
                                <Draggable
                                    id={item.id}
                                    idx={idx}
                                    title={item.title}
                                    column={item.column}
                                    type={'task'}
                                    setDraggedItem={setDraggedItem}
                                >
                                    <Task id={item.id} title={item.title} onDelete={() => {
                                        setItems(prev => ({ ...prev, [col]: prev[col].filter(i => i.id !== item.id) }));
                                    }} />
                                </Draggable>
                                <DroppableArea allowedType='task' dragType={draggedItem !== null ? draggedItem.type : 'null'} vertical onDrop={() => onDrag(col, index + 1)} />
                            </React.Fragment>
                        ))}
                    </Column>
                    <DroppableArea allowedType='column' dragType={draggedItem !== null ? draggedItem.type : 'null'} onDrop={() => handleColumnDrop(idx)} />
                </React.Fragment>
            ))
            }
        </Box >
    )
}

export default Board