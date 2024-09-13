import React from 'react'

import { KBTaskProps } from '../interfaces'
import { Box, Typography } from '@mui/material'
import { DragIndicator } from '@mui/icons-material';

const Task: React.FC<KBTaskProps> = React.memo(({ id, name, priority, createdAt, index, dragRef, handleRef, status }) => {

    const formattedDateTime = () => {
        const date = createdAt.toUTCString().split(createdAt.getFullYear().toString())[0];
        const time = createdAt.toLocaleTimeString().split(' ')[0] + ' ' + createdAt.toLocaleTimeString().split(' ')[1].toUpperCase();
        return [date, time];
    }

    const [date, time] = formattedDateTime();

    return (
        <Box
            ref={dragRef}
            sx={{
                bgcolor: 'rgba(40, 56, 71, 0.619)',
                borderRadius: '.5em',
                // padding: '.5em'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    gap: '1em',
                    alignItems: 'center',
                    bgcolor: 'rgb(43, 57, 71)',
                    borderRadius: '.5em .5em 0 0',
                    padding: '.5em'
                }}
            >
                {/* <Box
                    sx={{
                        borderRadius: '.35em 0 0 0',
                        width: '10px',
                        // width: 'fit-content',
                        bgcolor: priority === 3 ? 'red' : priority === 2 ? 'orange' : 'green',
                        fontWeight: 'bold',
                        color: 'white'
                        }}
                        /> */}
                <Box
                    ref={handleRef}
                    sx={{
                        cursor: 'grab'
                    }}
                >
                    <DragIndicator />
                </Box>
                <Box
                    sx={{
                        bgcolor: priority === 3 ? 'red' : priority === 2 ? 'orange' : 'green',
                        width: '1em',
                        height: '1em',
                        borderRadius: '50%'
                    }}
                />
                <Box>
                    <Typography sx={{ fontSize: '.8em', color: 'rgb(133, 160, 186)' }}>{time}</Typography>
                    <Typography>{date}</Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    padding: '1em'
                }}
            >
                <Typography>
                    {name}
                </Typography>
            </Box>
        </Box>
    );
}, (prevProps, nextProps) => {
    return prevProps.id === nextProps.id && prevProps.name === nextProps.name;
});



export default Task