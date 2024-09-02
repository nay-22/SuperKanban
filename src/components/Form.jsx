import { Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext } from 'react';

import KanbanContext from '../contexts/KanbanContext';
import { v4 as uuid } from 'uuid';
import ColumnForm from './forms/ColumnForm';

const Form = () => {
    const { columns, setColumns, setColumnOrder, colName, setColName, itemDetails, setItemDetails, setItems } = useContext(KanbanContext);

    const addColumn = (e) => {
        e.preventDefault();
        const colId = uuid();
        setColumns(prev => prev.set(colId, colName));
        setColumnOrder(prev => [...prev, colId]);
        setColName();
        console.log([...columns.entries()]);

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
        if (itemDetails && itemDetails.itemName && itemDetails.column) {
            const newItem = {
                id: new Date().toISOString(),
                column: itemDetails.column,
                title: itemDetails.itemName,
                priority: itemDetails.priority || undefined
            };
            setItems(prev => ({ ...prev, [itemDetails.column]: [...prev[itemDetails.column] || [], newItem] }));
            setItemDetails({});
        }
    }
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
            <FormGroup
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1em',
                    padding: '1em',
                    border: '1px solid grey',
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
                        onChange={handleItemName}
                        type='text'
                        id="itemName"
                        value={itemDetails.itemName ? itemDetails.itemName : ""}
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
                        <InputLabel id="col">Status</InputLabel>
                        <Select
                            labelId="col"
                            label="Status"
                            placeholder="Enter Status"
                            defaultValue=""
                            onChange={handleColumnSelect}
                            value={itemDetails ? itemDetails.column || "" : ""}
                            id="col"
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
                            {[...columns.entries()].map(([key, value]) => (
                                <MenuItem
                                    key={key}
                                    value={key}
                                    sx={{
                                        color: 'white',
                                        bgcolor: 'rgb(56, 89, 121)',
                                        '&.Mui-selected': {
                                            color: 'black',
                                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        },
                                        '&.Mui-selected:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                                        },
                                        '&:hover': {
                                            bgcolor: 'rgba(56, 89, 121, 0.8)',
                                        },
                                    }}
                                >
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                            onChange={handlePrioritySelect}
                            value={itemDetails ? itemDetails.priority || "" : ""}
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
                            height: '55px',
                            '&:disabled': {
                                backgroundColor: 'grey',
                                color: 'wheat'
                            }
                        }}
                        variant='contained'
                        onClick={addItem}
                        disabled={!(itemDetails && itemDetails.itemName && itemDetails.column)}
                    >
                        Add Item
                    </Button>
                </Box>
            </FormGroup>
        </Box>
    )
}

export default Form