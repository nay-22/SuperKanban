import { AppBar, Button, Drawer, InputAdornment, TextField, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Add, Menu, Search, ViewColumn } from '@mui/icons-material';
import { useColumnActions } from '../hooks/ColumnActions';
import { useState } from 'react';

import Sidebar from './Sidebar';
import { clearCache } from '../utils/CacheUtils';

const Navbar = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    const { createColumn } = useColumnActions();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar sx={{ bgcolor: 'transparent' }} position='sticky'>
            <Toolbar disableGutters className='bg-mainBackgroundColor' sx={{justifyContent: 'space-between'}}>
                <Toolbar>
                    <Button onClick={() => setShowDrawer(true)}>
                        <Menu />
                    </Button>
                    <Typography variant='h5'>
                        SuperKanban
                    </Typography>
                </Toolbar>
                {!isSmallScreen && <TextField
                    size="small"
                    placeholder="Search Projects, Boards..."
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
                    {isSmallScreen ? <Button><Search /></Button> :<Button onClick={clearCache} variant='outlined' sx={{ textTransform: 'none', minWidth: '0px' }}>Clear</Button>}
                    <Button onClick={createColumn} variant='outlined' sx={{ textTransform: 'none', minWidth: '0px', width: '60px' }}><ViewColumn /><Add /></Button>
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
                    <Sidebar />
                </div>
            </Drawer>
        </AppBar>
    )
}

export default Navbar