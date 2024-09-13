import { Box, Button, Zoom, ListItem, SpeedDial, SpeedDialAction, Tooltip, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { KBColumnProps } from '../interfaces';
import { Delete, DragIndicator, Edit, Filter, KayakingSharp, Settings, Sort, SwapVert } from '@mui/icons-material';
import KanbanContext from '../contexts/KanbanContext';

const Column: React.FC<KBColumnProps> = React.memo(({ id, index, dragRef, handleRef, status, children }) => {


  const context = useContext(KanbanContext);
  if (!context) return <><Typography>Something went wrong</Typography></>

  const { hasMouse, hasTouch, isDragging, setIsDragging } = context;
  const [showActions, setShowActions] = useState(hasTouch);

  useEffect(() => {
    setIsDragging(prev => status === 'dragging' ? true : false);
  }, [status]);

  return (
    <ListItem
      ref={dragRef}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        id={id}
        sx={{
          bgcolor: 'rgba(13, 16, 19, 0.718)',
          color: 'white',
          borderRadius: '1em',
          padding: '.5em',
          width: '350px'
        }}
        onPointerEnter={hasTouch ? () => { return } : () => setShowActions(isDragging ? false : true)}
        onPointerLeave={hasTouch ? () => { return } : () => setShowActions(false)}
      >
        <Box
          sx={{
            padding: '1em .5em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1em'
          }}
        >
          <Box
            ref={handleRef}
            sx={{ cursor: 'grab' }}
          >
            <DragIndicator />
          </Box>
          <Typography variant='h6' sx={{ textAlign: 'center' }}>{id.charAt(0).toUpperCase() + id.slice(1)}</Typography>
          <Zoom in={showActions} timeout={200}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '.5em',
                padding: '.25em',
              }}
            >
              <Tooltip TransitionComponent={Zoom} TransitionProps={{timeout: 200}} placement='top-start' arrow title='Edit'>
                <Button sx={{ minWidth: '0', width: '35px' }}><Edit sx={{ color: 'darkorange' }} /></Button>
              </Tooltip>
              <Tooltip TransitionComponent={Zoom} TransitionProps={{timeout: 200}} placement='top-start' arrow title='Delete'>
                <Button sx={{ minWidth: '0', width: '35px' }}><Delete sx={{ color: 'maroon' }} /></Button>
              </Tooltip>
              <Tooltip TransitionComponent={Zoom} TransitionProps={{timeout: 200}} placement='top-start' arrow title='Sort'>
                <Button sx={{ minWidth: '0', width: '35px' }}><SwapVert /></Button>
              </Tooltip>
            </Box>
          </Zoom>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {children}
        </Box>
      </Box >
    </ListItem >)
});

export default Column