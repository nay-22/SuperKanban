import { Box, Button, Chip, Tooltip, Typography, Modal, SpeedDial, SpeedDialAction } from '@mui/material';
import { Delete, DragIndicator, Edit, Tune } from '@mui/icons-material';
import React, { useState } from 'react'

import ConfirmationModal from './modals/ConfirmationModal';
import TaskForm from './forms/TaskForm';

const Task = ({ id, title, priority, onDelete, colId }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const formatDateTime = () => {
    const date = new Date(id).toUTCString().split(new Date().getFullYear())[0];
    const time = new Date(id).toLocaleTimeString();
    return { date, time };
  }


  const { date, time } = formatDateTime();

  return (
    <Box
      sx={{
        bgcolor: '#484848',
        borderRadius: '.35em',
        border: '1px solid #656565',
        color: 'white',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `25px 1fr ${priority === 'none' ? '' : '1fr'} 30px`,
          alignItems: 'center',
          gap: '1em',
          bgcolor: showDeleteModal ? 'rgb(208, 79, 79)' : 'grey',
          padding: '0 .5em',
          borderRadius: '.35em .35em 0 0'
        }}
      >
        <Box
          draggable
          sx={{
            cursor: 'grab',
          }}
        >
          <DragIndicator />
        </Box>
        <Box>
          <Tooltip title={'Created At Date'} placement="top" arrow>
            <Typography fontWeight={'bold'} sx={{ width: '100%', textAlign: 'left' }}>{date}</Typography>
          </Tooltip>
          <Tooltip title={'Created At Time'} placement="top" arrow>
            <Typography sx={{fontWeight: 'bold', fontSize: '.8em', width: '100%', textAlign: 'left', color: '#484848' }}>{time}</Typography>
          </Tooltip>
        </Box>
        {priority !== 'none' &&
          <Chip
            label={priority}
            sx={{
              justifySelf: 'right',
              width: 'fit-content',
              bgcolor: priority === 'Medium' ? 'orange' : priority === 'Low' ? 'rgb(31, 107, 31)' : 'rgb(181, 19, 19)',
              fontWeight: 'bold',
              color: 'white'
            }}
          />}
        <SpeedDial
          direction='left'
          ariaLabel='Task Actions'
          icon={<Tooltip title="Settings">
            <Tune sx={{
              fontSize: '25px',
              transition: 'transform 0.3s ease-in-out',
            }} />
          </Tooltip>}
          sx={{
            mr: '1em',
            ml: '1em',
          }}
        >
          <SpeedDialAction
            sx={{
              bgcolor: 'white',
              boxShadow: 'none',
              padding: '0',
            }}
            icon={<Edit sx={{ fontSize: '30px', color: 'orange', bgcolor: 'transparent' }} />}
            tooltipTitle='Edit'
            onClick={() => setShowUpdateModal(true)}
          />
          <SpeedDialAction
            sx={{
              bgcolor: 'white',
              boxShadow: 'none',
              padding: '0',
            }}
            icon={<Delete sx={{ fontSize: '30px', color: 'red', bgcolor: 'transparent' }} />}
            tooltipTitle='Delete'
            onClick={() => setShowDeleteModal(true)}
          />
        </SpeedDial>
      </Box>
      <Modal
        open={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'rgb(56, 89, 121)',
            borderRadius: '.5em',
            padding: '.5em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TaskForm
            edit
            taskId={id}
            colId={colId}
            title={title}
            priority={priority}
            callback={() => setShowUpdateModal(false)}
          />

        </Box>
      </Modal>
      <ConfirmationModal
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onDelete}
        open={showDeleteModal}
        message='Do you want to delete this task?'
      />
      <Box
        sx={{ padding: '.5em', }}
      >
        <Typography style={{ width: '100%', textAlign: 'left' }}>{title}</Typography>
      </Box>
    </Box>
  )
}

export default Task