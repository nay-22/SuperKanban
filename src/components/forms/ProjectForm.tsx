import React, { useEffect, useRef, useState } from 'react'
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import { DescriptionOutlined, TitleOutlined } from '@mui/icons-material';
import { useProjectActions } from '../../hooks/ProjectActions';
import { FormProps } from '../../types';

const ProjectForm: React.FC<FormProps> = ({ callback }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const titleRef = useRef<HTMLFormElement>(null);

    const { createProject } = useProjectActions();

    useEffect(() => {
        titleRef.current?.focus();
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createProject(title, description);
        callback();
    }

    return <>
        <Typography variant='h5' sx={{ color: 'white' }}>Create New Project</Typography>
        <form className='w-[500px] my-5 flex flex-col gap-4' onSubmit={handleSubmit}>
            <TextField
                inputRef={titleRef}
                required
                size="small"
                label="Project Name"
                placeholder="Enter Project Name"
                onChange={(e) => setTitle(e.target.value)}
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
                                <TitleOutlined sx={{ color: 'white' }} />
                            </InputAdornment>
                        )
                    }
                }}
            />
            <TextField
                size="small"
                label="Project Description"
                placeholder="Enter Project Description"
                onChange={(e) => setDescription(e.target.value)}
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
                                <DescriptionOutlined sx={{ color: 'white' }} />
                            </InputAdornment>
                        )
                    }
                }}
            />
            <div className='flex items-center justify-between gap-4'>
                <Button variant='outlined' sx={{ textTransform: 'none', width: '100%', height: '50px' }} onClick={callback}>Cancel</Button>
                <Button
                    disabled={!title}
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
                        }
                    }}
                >Create
                </Button>
            </div>
        </form>
    </>;
}

export default ProjectForm