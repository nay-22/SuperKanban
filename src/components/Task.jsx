import { Box, Button, Chip, Tooltip, Typography, Modal } from '@mui/material';
import { Delete, DragIndicator, Edit } from '@mui/icons-material';
import React, { useState } from 'react'

import ConfirmationModal from './modals/ConfirmationModal';
import TaskForm from './forms/TaskForm';

const Task = ({ id, title, priority, onDelete, colId }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: '1em',
          bgcolor: showDeleteModal ? 'rgb(208, 79, 79)' : 'grey',
          padding: '.5em',
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
        <Tooltip title={`${id.split('T')[1]}`} placement="top" arrow>
          <Typography style={{ width: '100%', textAlign: 'left' }}>Created: {id.split('T')[0]}</Typography>
        </Tooltip>
        {priority !== 'none' &&
          <Chip
            label={priority}
            sx={{
              bgcolor: priority === 'Medium' ? 'orange' : priority === 'Low' ? 'rgb(31, 107, 31)' : 'rgb(181, 19, 19)',
              fontWeight: 'bold',
              color: 'white'
            }}
          />}
        <Box
          sx={{
            display: "flex",
            gap: "1em",
            justifyContent: 'right',
            alignItems: 'center',
          }}
        >
          <Tooltip title={'Delete'} arrow placement='bottom-end'>
            <Button
              sx={{
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
                outline: "none",
                minWidth: '0',
                width: '30px',
                height: '30px',
              }}
              onClick={() => setShowDeleteModal(true)}
            >
              <Delete
                sx={{
                  color: 'red',
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip title={'Edit'} arrow placement='bottom-end'>
            <Button
              sx={{
                backgroundColor: "white",
                border: "none",
                cursor: "pointer",
                outline: "none",
                minWidth: '0',
                width: '30px',
                height: '30px',
              }}
              onClick={() => setShowUpdateModal(true)}
            >
              <Edit
                sx={{
                  color: 'orange',
                }}
              />
            </Button>
          </Tooltip>
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
      </Box>
      <Box
        sx={{ padding: '.5em', }}
      >
        <Typography style={{ width: '100%', textAlign: 'left' }}>{title}</Typography>
      </Box>
    </Box>
  )
}

export default Task