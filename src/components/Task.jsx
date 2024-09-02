import React, { useContext, useEffect, useState } from 'react'

import { Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Modal, Select, SpeedDial, SpeedDialAction, TextField, Tooltip, Typography } from '@mui/material';
import { Delete, DragIndicator, Edit, Settings } from '@mui/icons-material';
import KanbanContext from '../contexts/KanbanContext';
import ConfirmationModal from './modals/ConfirmationModal';

const Task = ({ id, title, priority, onDelete, colId }) => {
  const { items, setItems } = useContext(KanbanContext);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [task, setTask] = useState({title, priority});

  const handleUpdate = () => {
    console.log(task);
    
    setItems(prev => ({ ...prev, [colId]: prev[colId].map(item => item.id === id ? { ...item, title: task.title, priority: task.priority } : item) }));
    setShowUpdateModal(false);
  }

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
        {priority &&
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
                  borderRadius: '.35em',
                  '& .MuiInputBase-input': {
                      color: 'white',

                  },
                  '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                          borderColor: 'white',
                      },
                      '&:hover fieldset': {
                          borderColor: 'orange',
                      },
                      '&.Mui-focused fieldset': {
                          borderColor: 'white',
                      },
                  },
                  '& .MuiInputLabel-root': {
                      color: 'white',
                      opacity: '1'
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                      color: 'white',

                  },
              }}
                label='Task Name'
                placeholder='Enter Task Name'
                onChange={(e) => setTask(prev => ({...prev, name: e.target.value}))}
                value={task.title || ''}
                type="text"
                id="colName"
              />
              <FormControl
                sx={{
                  width: '100px',
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                  '&.Mui-focused .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
              >
                <InputLabel id="priority">Priority</InputLabel>
                <Select
                  labelId="priority"
                  label="Priority"
                  placeholder="Enter Priority"
                  defaultValue=""
                  onChange={(e) => setTask(prev => ({...prev, priority: e.target.value}))}
                  value={task.priority || ""}
                  id="priority"
                  sx={{
                    color: 'white',
                    borderRadius: '.35em',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'orange',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'orange',
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    '& .MuiSvgIcon-root': {
                      color: 'white',
                    },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        padding: 0,
                        '& .MuiList-root': {
                          paddingTop: 0,
                          paddingBottom: 0,
                        },
                      },
                    },
                  }}
                >
                  {['High', 'Medium', 'Low'].map(item => (
                    <MenuItem
                      key={item}
                      value={item}
                      sx={{
                        color: 'white',
                        bgcolor: 'rgb(56, 89, 121)',
                        '&.Mui-selected': {
                          color: 'black',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&.Mui-selected:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.2)'
                        },
                        '&:hover': {
                          bgcolor: 'rgba(56, 89, 121, 0.8)',
                        },
                      }}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
      <Box
        sx={{ padding: '.5em', }}
      >
        <Typography style={{ width: '100%', textAlign: 'left' }}>{title}</Typography>
      </Box>
    </Box>
  )
}

export default Task