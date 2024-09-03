import { Box, Button, Modal, Tooltip, Typography, useMediaQuery, useScrollTrigger, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react'

import ColumnForm from "../components/forms/ColumnForm";

import KanbanContext from "../contexts/KanbanContext";
import { AddOutlined, ViewColumn } from '@mui/icons-material';

const Navbar = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const { columns, columnOrder, items } = useContext(KanbanContext);
    const [showColumnFormModal, setShowColumnFormModal] = useState(false);
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1em',
                backgroundColor: 'rgb(23, 39, 55)'
            }}
        >
            <Box>
                <Typography variant={isSmallScreen ? 'h6' : 'h3'} color='white'>Kanban Board</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: '1em'
                }}
            >
                <Button
                    sx={{
                        textTransform: 'none',
                        backgroundColor: 'rgb(20, 77, 112)',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.1s ease-in-out'
                    }}
                    onClick={() => {
                        localStorage.setItem('items', JSON.stringify({}));
                        localStorage.setItem('columns', JSON.stringify([]));
                        localStorage.setItem('columnOrder', JSON.stringify([]));
                    }}
                >Clear</Button>
                <Button
                    sx={{
                        textTransform: 'none',
                        backgroundColor: 'rgb(20, 77, 112)',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.1s ease-in-out'
                    }}
                    onClick={() => {
                        localStorage.setItem('items', JSON.stringify(items));
                        localStorage.setItem('columnOrder', JSON.stringify(columnOrder));
                        localStorage.setItem('columns', JSON.stringify(Array.from(columns.entries())));
                    }}
                >Save</Button>
                <Tooltip
                    title="Add Column"
                    arrow
                    placement='bottom-start'
                >
                    <Button
                        variant='outlined'
                        sx={{
                            width: '40px'
                        }}
                        onClick={() => setShowColumnFormModal(true)}
                    >
                        <AddOutlined /> <ViewColumn />
                    </Button>
                </Tooltip>
                <Modal
                    open={showColumnFormModal}
                    onClose={() => setShowColumnFormModal(false)}
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
                        >Add Column
                        </Typography>
                        <ColumnForm callback={() => setShowColumnFormModal(false)} />
                    </Box>
                </Modal>
            </Box>
        </Box>
    )
}

export default Navbar