import { Box, Button, FormControl, FormGroup, FormLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext } from 'react';

import KanbanContext from '../contexts/KanbanContext';

const Form = () => {
    const { columns, setColumns, colName, setColName, itemDetails, setItemDetails, setItems } = useContext(KanbanContext);

    const addColumn = (e) => {
        e.preventDefault();
        setColumns(prev => [...prev, colName]);
        setItems(prev => ({ ...prev, [colName]: [] }));
        setColName();
    }

    const handleItem = (e) => {
        e.preventDefault();
        if (e.target.id === 'itemName') {
            setItemDetails(prev => ({ ...prev, itemName: e.target.value }));
        } else {
            setItemDetails(prev => ({ ...prev, column: e.target.value }));
        }
    }

    const addItem = (e) => {
        e.preventDefault();
        if (itemDetails && itemDetails.itemName && itemDetails.column) {
            const newItem = {
                id: new Date().toISOString(),
                column: itemDetails.column,
                title: itemDetails.itemName
            };
            setItems(prev => ({ ...prev, [itemDetails.column]: [...prev[itemDetails.column], newItem] }));
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
            <FormGroup
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1em',
                    padding: '1em',
                    border: '1px solid grey',
                    borderRadius: '.5em',
                    backgroundColor: 'lightgray'
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
                        label='Column Name'
                        placeholder='Enter Column Name'
                        onChange={(e) => setColName(e.target.value)}
                        value={colName ? colName : ""}
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
                        onClick={addColumn}
                    >
                        Add Column
                    </Button>
                </Box>
            </FormGroup>
            <FormGroup
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1em',
                    padding: '1em',
                    border: '1px solid grey',
                    borderRadius: '.5em',
                    backgroundColor: 'lightgray'
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
                            borderRadius: '.35em'
                        }}
                        label='Task Name'
                        placeholder='Enter Task Name'
                        onChange={handleItem}
                        type='text'
                        id="itemName"
                        value={itemDetails.itemName ? itemDetails.itemName : ""}
                    />
                    <FormControl
                        sx={{
                            width: '100px'
                        }}
                    >
                        <InputLabel id="col">Status</InputLabel>
                        <Select
                            labelId="col"
                            label="Status"
                            placeholder='Enter Status'
                            defaultValue=''
                            onChange={handleItem}
                            value={itemDetails ? itemDetails.column || "" : ""}
                            id="col"
                        >
                            {columns.map((col, idx) => (
                                <MenuItem key={idx} value={col}>{col}</MenuItem>
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
                        onClick={addItem}
                    >
                        Add Item
                    </Button>
                </Box>
            </FormGroup>
        </Box>
    )
}

export default Form