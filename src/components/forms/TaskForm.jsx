import { Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'

import KanbanContext from '../../contexts/KanbanContext';

const TaskForm = ({ edit = false, title, priority, taskId, colId, callback }) => {

    const { columns, itemDetails, setItemDetails, setItems } = useContext(KanbanContext);
    const [task, setTask] = useState({ title, priority });

    const handleUpdate = () => {
        setItems(prev => ({ ...prev, [colId]: prev[colId].map(item => item.id === taskId ? { ...item, title: task.title, priority: task.priority } : item) }));
        callback();
    }
    const handleItemName = (e) => {
        e.preventDefault();
        setItemDetails(prev => ({ ...prev, itemName: e.target.value }));
    }

    const handleColumnSelect = (e) => {
        e.preventDefault();
        setItemDetails(prev => ({ ...prev, column: e.target.value }));
    }

    const handlePrioritySelect = (e) => {
        e.preventDefault();
        setItemDetails(prev => ({ ...prev, priority: e.target.value }));
    }

    const addItem = (e) => {
        e.preventDefault();        
        if (itemDetails && itemDetails.itemName) {
            const newItem = {
                id: new Date().toISOString(),
                column: colId,
                title: itemDetails.itemName,
                priority: itemDetails.priority || 'none'
            };            
            setItems(prev => ({ ...prev, [colId]: [...prev[colId] || [], newItem] }));
            setItemDetails({});
        }
        callback();
    }
    return (
        <form
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1em',
                padding: '1em',
                borderRadius: '.5em',
                backgroundColor: 'rgb(56, 89, 121)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    gap: '1em',
                }}
            >

                <TextField
                    autoFocus
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
                    onChange={(e) => edit ? setTask(prev => ({ ...prev, title: e.target.value })) : handleItemName(e)}
                    type='text'
                    id="itemName"
                    value={edit ? task.title : itemDetails.itemName ? itemDetails.itemName : ""}
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
                        onChange={(e) => edit ? setTask(prev => ({ ...prev, priority: e.target.value })) : handlePrioritySelect(e)}
                        value={edit ? task.priority || "" : itemDetails ? itemDetails.priority || "" : ""}
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
                    type='submit'
                    sx={{
                        backgroundColor: 'orange',
                        textTransform: 'none',
                        height: '55px',
                        '&:disabled': {
                            backgroundColor: 'grey',
                            color: 'wheat'
                        }
                    }}
                    variant='contained'
                    onClick={edit ? handleUpdate : addItem}
                    disabled={!edit && !(itemDetails && itemDetails.itemName)}
                >
                    {edit ? 'Confirm' : 'Add Item'}
                </Button>
            </Box>
        </form>
    )
}

export default TaskForm