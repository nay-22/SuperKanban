import React, { useContext, useEffect, useState } from 'react'

import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { Delete, DragIndicator, Edit } from '@mui/icons-material';
import KanbanContext from '../contexts/KanbanContext';
import ConfirmationModal from './modals/ConfirmationModal';

const Task = ({ id, title, onDelete, colId }) => {
  const { items, setItems } = useContext(KanbanContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [task, setTask] = useState(title);

  const handleUpdate = () => {
    setItems(prev => ({ ...prev, [colId]: prev[colId].map(item => item.id === id ? { ...item, title: task } : item) }));    
    setShowUpdateModal(false);
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: '1em',
        width: '100%',
        bgcolor: showDeleteModal ? 'rgb(208, 79, 79)' : '#484848',
        padding: '.5em',
        borderRadius: '.35em',
        border: '1px solid #656565',
        color: 'white',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
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
      <Typography style={{ width: '100%', textAlign: 'left' }}>{title}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: "1em",
          justifyContent: 'right',
          alignItems: 'center',
        }}
      >
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
            bgcolor: 'lightgray',
            borderRadius: '.5em',
            padding: '2em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1em',
            }}
          >
            <TextField
              sx={{
                color: 'white',
                borderRadius: '.35em'
              }}
              label='Task Name'
              placeholder='Enter Task Name'
              onChange={(e) => setTask(e.target.value)}
              value={task || ''}
              type="text"
              id="colName"
            />
            <Button
              sx={{
                backgroundColor: 'orange',
                textTransform: 'none',
                height: '55px'
              }}
              variant='contained'
              onClick={handleUpdate}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
      <ConfirmationModal
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onDelete}
        open={showDeleteModal}
        message='Do you want to delete this task?'
      />
    </Box>
  )
}

export default Task