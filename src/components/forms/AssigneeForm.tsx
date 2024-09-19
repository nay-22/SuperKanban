import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { AddComment } from '@mui/icons-material';
import KanbanContext from '../../contexts/KanbanContext';
import { FormProps, Id } from '../../types';
import { useTaskActions } from '../../hooks/TaskActions';

interface AssigneeFormProps extends FormProps {
    taskId: Id;
}

const AssigneeForm: React.FC<AssigneeFormProps> = ({ taskId, callback }) => {
    const [assignees, setAssignees] = useState<string[]>([]);
    const [comment, setComment] = useState('');
    const titleRef = useRef<HTMLFormElement>(null);

    const { currentUser, projects, projectId, boardId } = useContext(KanbanContext);
    const { assignTask } = useTaskActions();

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        assignTask(taskId, assignees, comment);
        callback();
    };

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        setAssignees(event.target.value as string[]);
    };

    return (
        <>
            <Typography variant='h5' sx={{ color: 'white' }}>Assign Task To:</Typography>
            <form className='w-[500px] my-5 flex flex-col gap-4' onSubmit={handleSubmit}>
                <FormControl
                    required
                    sx={{
                        width: '100%',
                        '.MuiInputLabel-root': {
                            color: 'white',
                        },
                        '.MuiInputLabel-root.Mui-focused': {
                            color: 'white',
                        },
                        '.MuiSelect-icon': {
                            color: 'white',
                        },
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            borderRadius: '.5em',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                        },
                    }}
                    variant='filled'
                >
                    <InputLabel id="assignee-select-label" shrink>
                        Select Assignees
                    </InputLabel>

                    <Select
                        labelId="assignee-select-label"
                        multiple
                        required
                        size="small"
                        value={assignees}
                        onChange={handleChange}
                        renderValue={(selected) => (
                            <div className="flex flex-wrap gap-2">
                                {(selected as string[]).map((value) => (
                                    <Typography key={value}>{projects[projectId]?.members[value]?.name}</Typography>
                                ))}
                            </div>
                        )}
                        sx={{
                            color: 'white',
                            width: '100%',
                            '.MuiSelect-select': {
                                paddingTop: '1.7em',
                            },
                        }}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    backgroundColor: '#444',
                                    color: 'white',
                                },
                            },
                        }}
                    >
                        {Object.entries(projects[projectId]?.members).map(([id, member]) => (
                            id !== currentUser?.id &&
                            !projects[projectId]?.boards[boardId]?.tasks.find(task => task.id === taskId)?.assignedTo.find(assignee => assignee.id === id) &&
                            <MenuItem
                                key={id}
                                value={id}
                                sx={{
                                    backgroundColor: '#444',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: '#555',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#666',
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: '#777',
                                    },
                                }}
                            >
                                {member.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>


                <TextField
                    variant='filled'
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
                        disabled={assignees.length === 0}
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
                        Assign
                    </Button>
                </div>
            </form>
        </>
    );
};

export default AssigneeForm;
