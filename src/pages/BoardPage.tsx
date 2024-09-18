import { Link, useNavigate, useParams } from 'react-router-dom'
import { Breadcrumbs, Button, Typography } from '@mui/material'
import { Add, ViewColumn } from '@mui/icons-material';
import { useContext, useEffect } from 'react';

import { useColumnActions } from '../hooks/ColumnActions';
import KanbanContext from '../contexts/KanbanContext';
import Board from '../components/Board'

const BoardPage = () => {
    const { projectId, boardId } = useParams();
    const navigate = useNavigate();

    const { projects, setProjectId, setBoardId } = useContext(KanbanContext);
    const { createColumn } = useColumnActions();

    useEffect(() => {
        if (boardId && projectId) {
            setProjectId(projectId);
            setBoardId(boardId);
        } else {
            navigate('/')
        }
    }, []);

    return <>
        <div className='flex items-center justify-between py-4 px-10'>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb" sx={{ color: 'white' }}>
                    <Link to='/'>Home</Link>
                    <Link to='/projects'>Projects</Link>
                    <Typography className='text-indigo-300 font-bold'>{projects[projectId!]?.boards[boardId!]?.title}</Typography>
                </Breadcrumbs>
            </div>
            <Button
                onClick={() => {
                    if (boardId && projectId) createColumn(projectId, boardId);
                }}
                variant='outlined'
                sx={{
                    textTransform: 'none',
                    minWidth: '0px',
                    width: '60px'
                }}>
                <ViewColumn /><Add />
            </Button>
        </div>
        <Board />
    </>
}

export default BoardPage