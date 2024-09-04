import { Box, Button, Modal, SpeedDial, SpeedDialAction, Tooltip, Typography } from '@mui/material';
import { AddRounded, Delete, DragIndicator, Edit, SwapVert, Tune } from '@mui/icons-material';
import React, { useContext, useEffect, useRef, useState } from 'react'

import ConfirmationModal from './modals/ConfirmationModal';
import KanbanContext from '../contexts/KanbanContext';
import ColumnForm from './forms/ColumnForm';
import nextFrame from '../utils/nextFrame';
import TaskForm from './forms/TaskForm';

const Column = ({ id, idx, type, column, children }) => {

    const {
        draggedItem, setDraggedItem,
        columns, setColumns,
        columnOrder, setColumnOrder,
        setItems,
        colDropBounding,
        dragItemInfoRef,
        colDropInfo, setColDropInfo,
        isTouching, setIsTouching,
        colBounds, setColBounds,
        containerRef
    } = useContext(KanbanContext);

    const [showUpdateColModal, setShowUpdateColModal] = useState(false);
    const [showDeleteColModal, setShowDeleteColModal] = useState(false);
    const [sortOrder, setSortOrder] = useState(columns.get(id).sortOrder);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);
    const [showColumn, setShowColumn] = useState(true);
    const [refInitialCoords, setRefInitialCoords] = useState({ x: 0, y: 0 });
    const colDropId = useRef(null);
    const dragRef = useRef(null);
    const dragIndicatorRef = useRef(null);
    const dragEleRef = useRef(null);


    const handleDragStart = async (e) => {
        setDraggedItem({ id, column, type });
        const dragElement = dragRef.current.cloneNode(true);
        dragElement.style.position = 'absolute';
        dragElement.style.top = '-9999px';
        dragElement.style.width = 'fit-content';
        dragElement.style.opacity = '1';
        document.body.appendChild(dragElement);
        e.dataTransfer.setDragImage(dragElement, 0, 0);
        await nextFrame();
        setShowColumn(false);
        setTimeout(() => {
            document.body.removeChild(dragElement);
        }, 0);
    }

    const handleDragEnd = () => {
        setShowColumn(true);
        setDraggedItem(null);
    }

    const handleTouchStart = (e) => {
        e.preventDefault();
        setIsTouching(true);
        setShowColumn(false);
        const touch = e.touches[0];

        const dragEle = dragRef.current.cloneNode(true);
        dragEle.style.position = 'absolute';
        dragEle.style.left = `${touch.clientX - 25}px`;
        dragEle.style.top = `${touch.clientY - 25}px`;
        dragEle.style.width = 'fit-content';
        dragEle.style.opacity = '0.3';
        dragEle.style.pointerEvents = 'none';
        document.body.appendChild(dragEle);
        dragEleRef.current = dragEle;
        dragItemInfoRef.current = { id, column, type };
    };

    const handleTouchMove = (e) => {
        e.preventDefault();
        const { colHeight, colWidth } = refInitialCoords;
        const touch = e.touches[0];

        if (dragEleRef.current) {
            // Calculate the offset of the touch point within the dragged element
            const rect = dragEleRef.current.getBoundingClientRect();
            const offsetX = touch.clientX - rect.left;
            const offsetY = touch.clientY - rect.top;

            // Translate the element by the touch position minus the offset
            dragEleRef.current.style.transform = `translate(${touch.clientX - offsetX}px, ${touch.clientY - offsetY}px)`;

            // Update the column bounds
            const colLeftBound = touch.clientX - rect.left;
            const colRightBound = touch.clientX - rect.left + colWidth;
            const colTopBound = touch.clientY - rect.top;
            const colBottomBound = touch.clientY - rect.top + colHeight;
            setColBounds({ colLeftBound, colRightBound, colTopBound, colBottomBound });
        }

        const container = containerRef.current;
        const scrollThreshold = 100;
        const scrollSpeed = 10;

        if (touch.clientX < container.getBoundingClientRect().left + scrollThreshold) {
            container.scrollLeft -= scrollSpeed;
        }

        if (touch.clientX > container.getBoundingClientRect().right - scrollThreshold) {
            container.scrollLeft += scrollSpeed;
        }
    };


    const handleTouchEnd = () => {
        setShowColumn(true);
        setIsTouching(false);
        if (dragEleRef.current) {
            document.body.removeChild(dragEleRef.current);
            dragEleRef.current = null;
        }
        if (colDropId.current) handleColumnDrop();
        dragItemInfoRef.current = null;
        setColDropInfo(prev => ({ ...prev, [colDropId.current]: { show: false } }));
    };

    const handleColumnDrop = () => {
        const { id, column } = dragItemInfoRef.current;
        let idx = parseInt(colDropId.current.split('_')[1]);

        const updatedColumns = [...columnOrder];
        updatedColumns.splice(column, 1);
        if (column > idx) idx++;
        updatedColumns.splice(idx, 0, id);
        setColumnOrder(updatedColumns);
    };

    useEffect(() => {
        Object.keys(colDropInfo).forEach(id => {
            const boundingRect = colDropBounding[id];
            if (boundingRect && colBounds.colLeftBound > boundingRect.left &&
                colBounds.colLeftBound < (boundingRect.left + boundingRect.width) &&
                colBounds.colTopBound > boundingRect.top &&
                colBounds.colTopBound < (boundingRect.top + boundingRect.height)) {
                setColDropInfo(prev => ({ ...prev, [id]: { show: true } }));                
                colDropId.current = id;
            } else {
                setColDropInfo(prev => ({ ...prev, [id]: { show: false } }));
            }
        });
    }, [colBounds]);

    useEffect(() => {
        if (dragIndicatorRef.current) {
            const colHeight = dragRef.current.clientHeight;
            const colWidth = dragRef.current.clientWidth;
            setRefInitialCoords({ colHeight, colWidth });

            dragIndicatorRef.current.addEventListener('touchstart', handleTouchStart);
            dragIndicatorRef.current.addEventListener('touchmove', handleTouchMove, { passive: false });
            dragIndicatorRef.current.addEventListener('touchend', handleTouchEnd);

            return () => {
                dragIndicatorRef.current.removeEventListener('touchstart', handleTouchStart);
                dragIndicatorRef.current.removeEventListener('touchmove', handleTouchMove);
                dragIndicatorRef.current.removeEventListener('touchend', handleTouchEnd);
            };
        }
        console.log('');

    }, [handleTouchStart, handleTouchMove, handleTouchEnd]);


    const deleteColumn = () => {
        const prevColIdx = (columns.size + idx - 1) % columns.size
        const prevCol = columnOrder[prevColIdx];

        setItems(prev => {
            const updatedState = { ...prev };
            const currColItems = updatedState[id];
            delete updatedState[id];
            (currColItems || []).map(item => {
                item.column = prevCol;
            });
            updatedState[prevCol] = [...updatedState[prevCol] || [], ...currColItems || []];
            return updatedState;
        });

        setColumns(prev => {
            const map = new Map(prev);
            map.delete(id);
            return map;
        });

        setColumnOrder(prev => {
            const updatedState = [...prev];
            updatedState.splice(idx, 1);
            return updatedState;
        });

        setShowDeleteColModal(false);
    }

    const sortItems = () => {
        const currSortOrder = sortOrder === 'high' ? 'low' : 'high';
        setSortOrder(currSortOrder);
        const order = {
            'High': 3,
            'Medium': 2,
            'Low': 1,
            'none': 0,
        };
        setItems(prev => ({ ...prev, [id]: prev[id].sort((a, b) => sortOrder === 'low' ? order[a.priority] - order[b.priority] : order[b.priority] - order[a.priority]) }));

    }

    return (
        <Box
            key={idx}
            style={{
                display: showColumn ? 'block' : 'none',
                width: 'fit-content',
                border: '1px solid grey',
                borderRadius: '.5em',
                minHeight: '100px',
                minWidth: '325px',
                maxWidth: '325px',
            }}
            ref={dragRef}
        >
            <Box
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '25px 1fr 100px 35px',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'default',
                    backgroundColor: showDeleteColModal ? 'rgb(208, 79, 79)' : 'rgb(23, 39, 55)',
                    margin: '0',
                    padding: '.5em',
                    borderRadius: '.55em .55em 0 0',
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'grab',
                    }}
                    draggable
                    ref={dragIndicatorRef}
                >
                    <DragIndicator sx={{ color: 'white' }} />
                </Box>
                <Typography
                    variant='h6'
                    color='white'
                    padding={'.5em'}
                >
                    {columns.get(id).colName}
                </Typography>
                <SpeedDial
                    direction='left'
                    ariaLabel='Column Actions'
                    icon={<Tooltip title="Settings">
                        <Tune sx={{
                            fontSize: '30px',
                            transition: 'transform 0.3s ease-in-out',
                        }} />
                    </Tooltip>}
                    sx={{
                        mr: '1em',
                        ml: '1em',
                    }}
                >
                    <SpeedDialAction
                        sx={{
                            bgcolor: 'white',
                            boxShadow: 'none',
                            padding: '0',
                        }}
                        icon={<Edit sx={{ fontSize: '30px', color: 'orange', bgcolor: 'transparent' }} />}
                        tooltipTitle='Edit'
                        onClick={() => setShowUpdateColModal(true)}
                    />
                    <SpeedDialAction
                        sx={{
                            bgcolor: 'white',
                            boxShadow: 'none',
                            padding: '0',
                        }}
                        icon={<Delete sx={{ fontSize: '30px', color: 'red', bgcolor: 'transparent' }} />}
                        tooltipTitle='Delete'
                        onClick={() => setShowDeleteColModal(true)}
                    />
                    <SpeedDialAction
                        sx={{
                            bgcolor: 'white',
                            boxShadow: 'none',
                            padding: '0',
                        }}
                        icon={<SwapVert sx={{ fontSize: '30px', color: 'royalblue', bgcolor: 'transparent' }} />}
                        tooltipTitle={`Sort By: ${sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)} Priority`}
                        onClick={sortItems}
                    />
                </SpeedDial>
                <Tooltip
                    title='Add Task'
                    arrow
                    placement='top-start'
                >
                    <Button
                        variant='outlined'
                        sx={{
                            minWidth: '0',
                            width: '30px',
                        }}
                        onClick={() => setShowAddTaskForm(true)}
                    >
                        <AddRounded />
                    </Button>
                </Tooltip>
                <Modal
                    open={showUpdateColModal}
                    onClose={() => setShowUpdateColModal(false)}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'rgb(56, 89, 121)',
                            borderRadius: '.5em',
                            padding: '.5em',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ColumnForm edit colId={id} callback={() => setShowUpdateColModal(false)} />
                    </Box>
                </Modal>
                <Modal
                    open={showAddTaskForm}
                    onClose={() => setShowAddTaskForm(false)}
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'rgb(56, 89, 121)',
                            borderRadius: '.5em',
                            padding: '.5em',
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: 'bold',
                                padding: '1em',
                                color: 'white'
                            }}
                            variant='h6'
                        >Add To: {columns.get(id).colName}
                        </Typography>
                        <TaskForm colId={id} callback={() => setShowAddTaskForm(false)} />
                    </Box>
                </Modal>
                <ConfirmationModal
                    onClose={() => setShowDeleteColModal(false)}
                    onConfirm={deleteColumn}
                    open={showDeleteColModal}
                    message='Do you want to delete this column?'
                />
            </Box>
            {children}
        </Box>
    )
}

export default Column