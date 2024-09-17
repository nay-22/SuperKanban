import { Add, Menu, Search, ViewColumn } from '@mui/icons-material';
import { AppBar, Button, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import { useColumnActions } from '../hooks/ColumnActions';

const Navbar = () => {
    const { createColumn } = useColumnActions();

    const clearKanban = () => {
        localStorage.setItem('columns', JSON.stringify([]));
        localStorage.setItem('tasks', JSON.stringify([]));
    }

    return (
        <AppBar sx={{ bgcolor: 'transparent' }} position='sticky'>
            <Toolbar className='bg-mainBackgroundColor' sx={{ gap: '1em', justifyContent: 'space-between' }}>
                <Button>
                    <Menu />
                </Button>
                <Typography variant='h5'>
                    SuperKanban
                </Typography>
                <TextField
                    size="small"
                    placeholder="Search Projects, Boards..."
                    sx={{
                        width: '80%',
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
                />


                <div className='flex items-center justify-between gap-5'>
                    <Button onClick={clearKanban} variant='outlined' sx={{ textTransform: 'none', minWidth: '0px' }}>Clear</Button>
                    <Button onClick={createColumn} variant='outlined' sx={{ textTransform: 'none', minWidth: '0px' }}><ViewColumn /><Add /></Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar