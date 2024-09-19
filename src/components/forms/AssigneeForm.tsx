import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { AddComment } from '@mui/icons-material';
import KanbanContext from '../../contexts/KanbanContext';
import { FormProps, Id } from '../../types';

interface AssigneeFormProps extends FormProps {
    taskId: Id;
}

const AssigneeForm: React.FC<AssigneeFormProps> = ({ callback }) => {
    const [title, setTitle] = useState<string[]>([]); // Update to handle multiple values
    const [comment, setComment] = useState('');
    const titleRef = useRef<HTMLFormElement>(null);

    const { projects, projectId, boardId } = useContext(KanbanContext);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        callback();
    };

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setTitle(event.target.value as string[]); // Ensure type is string[]
    };

    return (
        <>
            <Typography variant='h5' sx={{ color: 'white' }}>Assign Task To:</Typography>
            <form className='w-[500px] my-5 flex flex-col gap-4' onSubmit={handleSubmit}>
                <Select
                    inputRef={titleRef}
                    multiple // Allow multiple selections
                    required
                    size="small"
                    label="Project Name"
                    placeholder="Enter Project Name"
                    value={title}
                    onChange={handleChange}
                    renderValue={(selected) => (
                        <div className='flex flex-wrap gap-2'>
                            {(selected as string[]).map((value) => (
                                <Typography key={value}>{projects[projectId]?.members[value]?.name}</Typography>
                            ))}
                        </div>
                    )}
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'transparent',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiSelectLabel-root.Mui-focused': {
                            color: 'white',
                        },
                        input: {
                            color: 'white',
                        },
                    }}
                >
                    {Object.entries(projects[projectId]?.members).map(([id, member]) => (
                        <MenuItem key={id} value={id}>
                            {member.name}
                        </MenuItem>
                    ))}
                </Select>
                <TextField
                    size="small"
                    label="Task Comment"
                    placeholder="Enter Comments"
                    onChange={(e) => setComment(e.target.value)}
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'transparent',
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white',
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        },
                        input: {
                            color: 'white',
                        },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position='start'>
                                    <AddComment sx={{ color: 'white' }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <div className='flex items-center justify-between gap-4'>
                    <Button variant='outlined' sx={{ textTransform: 'none', width: '100%', height: '50px' }} onClick={callback}>Cancel</Button>
                    <Button
                        disabled={title.length === 0} // Update to check if no selection
                        type='submit'
                        variant='contained'
                        sx={{
                            textTransform: 'none',
                            width: '100%',
                            bgcolor: '',
                            height: '50px',
                            '&:disabled': {
                                bgcolor: 'rgba(255, 255, 255, 0.3)',
                                color: 'white',
                            },
                        }}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </>
    );
};

export default AssigneeForm;
