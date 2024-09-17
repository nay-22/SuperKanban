import { Add, Menu } from '@mui/icons-material';
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { useContext } from 'react'
import KanbanContext from '../contexts/KanbanContext';
import { useColumnActions } from '../hooks/ColumnActions';

const Navbar = () => {
    const {columns, tasks} = useContext(KanbanContext)
    const {createColumn} = useColumnActions();

    const saveKanban = () => {
        localStorage.setItem('columns', JSON.stringify(columns));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

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
                    <Button onClick={saveKanban} variant='outlined' sx={{textTransform:'none', minWidth: '0px'}}>Save</Button>
                    <Button onClick={createColumn} variant='outlined' sx={{textTransform:'none', minWidth: '0px'}}><Add /></Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar