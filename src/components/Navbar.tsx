import { AppBar, Button, Drawer, InputAdornment, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Menu, Search } from '@mui/icons-material';
import { useState } from 'react';

import Sidebar from './Sidebar';
import { clearCache } from '../utils/CacheUtils';
import { useLocation } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
    const [showDrawer, setShowDrawer] = useState(false);

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const location = useLocation();

    return (
        <AppBar sx={{ bgcolor: 'transparent' }} position='sticky'>
            <Toolbar disableGutters className='bg-mainBackgroundColor' sx={{ justifyContent: 'space-between' }}>
                <Toolbar>
                    {location.pathname !== '/' && <Button onClick={() => setShowDrawer(true)}>
                        <Menu />
                    </Button>}
                    <Typography variant='h5'>
                        SuperKanban
                    </Typography>
                </Toolbar>
                {!isSmallScreen && <TextField
                    size="small"
                    placeholder="Search Teams, Projects, Boards & more..."
                    sx={{
                        width: '60%',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'transparent',
                            },
                        },
                        input: {
                            color: 'white',
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <Search sx={{ color: 'white' }} />
                                </InputAdornment>
                            )
                        }
                    }}
                />}
                <Toolbar className='flex items-center justify-between gap-5'>
                    {isSmallScreen ? <Button><Search /></Button> : <Button onClick={clearCache} variant='outlined' sx={{ textTransform: 'none', minWidth: '0px' }}>Clear</Button>}
                </Toolbar>
            </Toolbar>
            <Drawer
                open={showDrawer}
                onClose={() => setShowDrawer(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: 'rgba(27, 33, 41)',
                    },
                }}
            >
                <div className='w-[225px]'>
                    <Sidebar callback={() => setShowDrawer(false)} />
                </div>
            </Drawer>
        </AppBar>
    )
}

export default React.memo(Navbar);