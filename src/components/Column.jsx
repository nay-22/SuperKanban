import React, { useRef, useState } from 'react'
import drag from '../assets/drag-white.png'
import { Box, Typography } from '@mui/material';
import nextFrame from '../utils/nextFrame';
const Column = ({ id, idx, type, column, setDraggedItem, children }) => {

    const [showColumn, setShowColumn] = useState(true);

    const dragRef = useRef(null);

    const handleDragStart = async (e) => {
        setDraggedItem({ id, column, type });
        const dragElement = dragRef.current.cloneNode(true);

        dragElement.style.position = 'absolute';
        dragElement.style.top = '-9999px';
        dragElement.style.width = 'fit-content';
        dragElement.style.opacity = '1';
        document.body.appendChild(dragElement);

        e.dataTransfer.setDragImage(dragElement, 0, 0);

        await nextFrame();

        setShowColumn(false);

        setTimeout(() => {
            document.body.removeChild(dragElement);
        }, 0);
    }

    const handleDragEnd = (e) => {
        setShowColumn(true);
        setDraggedItem(null);
    }

    return (
        <Box
            id={col}
            key={idx}
            style={{
                display: showColumn ? 'block' : 'none',
                width: '100%',
                border: '1px solid grey',
                borderRadius: '.5em',
                minHeight: '100px',
                // flex: showColumn ? '1 1 auto' : '0 0 auto',
                // transition: 'flex 0.3s ease, opacity 0.3s ease',
                // opacity: showColumn ? 1 : 0,
            }}
            ref={dragRef}
        >
            <Box
                className='draggable'
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 100%',
                    justifyContent: 'space-between',
                    gap: '10px',
                    cursor: 'default',
                    backgroundColor: 'orange',
                    margin: '0',
                    borderRadius: '.34em .34em 0 0',
                }}
            >
                <Box
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <img
                        className='drag'
                        draggable
                        style={{
                            cursor: 'grab',
                        }}
                        width={'20px'}
                        src={drag}
                        alt="drag"
                    />
                </Box>
                <Typography
                    variant='h5'
                    color='white'
                    padding={'.5em'}
                >
                    {id}
                </Typography>
            </Box>
            {children}
        </Box>
    )
}

export default Column