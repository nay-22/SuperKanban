import { Box } from '@mui/material';
import React from 'react';

import ColumnForm from './forms/ColumnForm';
import TaskForm from './forms/TaskForm';

const Form = () => {
    
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '2em',
                padding: '1em',
                margin: 'auto',
            }}
        >
            <ColumnForm />
            <TaskForm />
        </Box>
    )
}

export default Form