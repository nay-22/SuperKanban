import { Box, Button, FormGroup, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import KanbanContext from '../../contexts/KanbanContext';

import { v4 as uuid } from 'uuid';

const ColumnForm = ({ colId, edit = false, callback }) => {
    const { columns, setColumns, setColumnOrder, colName, setColName } = useContext(KanbanContext);
    const [newColName, setNewColName] = useState(edit ? columns.get(colId) : undefined);

    useEffect(() => {
        if (edit) setNewColName(columns.get(colId).colName);
    }, [columns]);

    const addColumn = (e) => {
        e.preventDefault();
        const id = uuid();
        setColumns(prev => prev.set(id, {colName, sortOrder: 'low'}));
        setColumnOrder(prev => [...prev, id]);
        setColName();
        console.log(columns);
        callback();
    }

    const updateColName = (e) => {
        e.preventDefault();
        setColumns(prev => prev.set(colId, {...prev.get(colId), colName: newColName}));
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
                    alignItems: 'center',
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
                    label='Column Name'
                    placeholder='Enter Column Name'
                    onChange={(e) => edit ? setNewColName(e.target.value) : setColName(e.target.value)}
                    value={edit ? newColName : colName ? colName : ""}
                    type="text"
                    id="colName"
                />
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
                    disabled={!edit && !colName}
                    variant='contained'
                    onClick={edit ? updateColName : addColumn}
                >
                    {edit ? 'Confirm' : 'Add Column'}
                </Button>
            </Box>
        </form>
    )
}

export default ColumnForm