import { Box, Button, Typography } from '@mui/material';
import React, { useContext } from 'react'

import KanbanContext from "../contexts/KanbanContext";

const Navbar = () => {
    const { columns, items } = useContext(KanbanContext);
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
                <Typography variant='h3' color='white'>Kanban Board</Typography>
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
                    }}
                >Clear State</Button>
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
                        localStorage.setItem('columns', JSON.stringify(columns));
                    }}
                >Save State</Button>
            </Box>
        </Box>
    )
}

export default Navbar