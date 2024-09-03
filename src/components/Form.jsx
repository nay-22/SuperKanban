import { Box, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

import ColumnForm from './forms/ColumnForm';
import TaskForm from './forms/TaskForm';

const Form = () => {

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
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