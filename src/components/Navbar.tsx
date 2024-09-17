import { Add, Menu, ViewColumn } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useColumnActions } from '../hooks/ColumnActions';

const Navbar = () => {
    const {createColumn} = useColumnActions();

    const clearKanban = () => {
        localStorage.setItem('columns', JSON.stringify([]));
        localStorage.setItem('tasks', JSON.stringify([]));
    }

    return (
        <AppBar sx={{bgcolor: 'transparent'}} position='sticky'>
            <Toolbar className='bg-mainBackgroundColor'>
                <Button>
                    <Menu />
                </Button>
                <Typography sx={{ flexGrow: 1 }} variant='h5'>
                    SuperKanban
                </Typography>
                <div className='flex items-center justify-between gap-5'>
                    <Button onClick={clearKanban} variant='outlined' sx={{textTransform:'none', minWidth: '0px'}}>Clear</Button>
                    <Button onClick={createColumn} variant='outlined' sx={{textTransform:'none', minWidth: '0px'}}><ViewColumn /><Add /></Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar