import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import { Add, ViewColumn } from '@mui/icons-material';
import { useContext, useEffect } from 'react';

import { useColumnActions } from '../hooks/ColumnActions';
import KanbanContext from '../contexts/KanbanContext';
import Board from '../components/Board'
import TrailLinks from '../components/TrailLinks';

const BoardPage = () => {
    const { projectId, boardId } = useParams();
    const navigate = useNavigate();

    const { setProjectId, setBoardId } = useContext(KanbanContext);
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
        <TrailLinks>
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
        </TrailLinks>
        <Board />
    </>
}

export default BoardPage