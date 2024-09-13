import { Add, Menu, MenuBook, PlusOne } from '@mui/icons-material'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'

const Navbar = () => {

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'left',
                alignItems: 'center',
                height: '10vh',
                padding: '0 2em',
                backgroundColor: 'rgba(13, 16, 19, 0.718)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '1em',
                    alignItems: 'center'
                }}
            >
                <Menu sx={{color: 'white', fontSize: '1.8em'}} />
                <Typography variant={isSmallScreen ? 'h5' : 'h4'} sx={{ color: 'white' }}>Super Kanban</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    gap: '1em',
                    marginLeft: 'auto'
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
                >
                    Save
                </Button>
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
                >
                    Clear
                </Button>
                <Button
                    variant='outlined'
                    sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        minWidth: '0',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                        transition: 'transform 0.1s ease-in-out'
                    }}
                >
                    <Add />
                </Button>
            </Box>
        </Box>
    )
}

export default Navbar