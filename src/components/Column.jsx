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
        columns, setColumns,
        columnOrder, setColumnOrder,
        setItems,
    } = useContext(KanbanContext);

    const [showUpdateColModal, setShowUpdateColModal] = useState(false);
    const [showDeleteColModal, setShowDeleteColModal] = useState(false);
    const [sortOrder, setSortOrder] = useState(columns.get(id).sortOrder);
    const [showAddTaskForm, setShowAddTaskForm] = useState(false);

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
                width: 'fit-content',
                border: '1px solid grey',
                borderRadius: '.5em',
                minHeight: '150px',
                minWidth: '325px',
                maxWidth: '325px',
            }}
        >
            <Box
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 100px 35px',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'default',
                    backgroundColor: showDeleteColModal ? 'rgb(208, 79, 79)' : 'rgb(23, 39, 55)',
                    padding: '.5em',
                    borderRadius: '.55em .55em 0 0',
                }}
            >
                {/* <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'grab',
                    }}
                    draggable
                    ref={dragIndicatorRef}
                >
                    <DragIndicator sx={{ color: 'white' }} />
                </Box> */}
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
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1em',
                    padding: '.5em',
                }}
            >
                {children}
            </Box>
        </Box>
    )
}

export default Column