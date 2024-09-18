import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useProjectActions } from '../../hooks/ProjectActions';
import { TitleOutlined } from '@mui/icons-material';
import { FormProps, KBProject } from '../../types';

interface BoardFormProps extends FormProps {
    project: KBProject;
}

const BoardForm: React.FC<BoardFormProps> = ({project, callback}) => {
    const [title, setTitle] = useState('');
    const titleRef = useRef<HTMLFormElement>(null);

    const { addBoard } = useProjectActions();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addBoard(project.id, title);
        callback();
    }

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    return <>
        <Typography variant='h5' sx={{ color: 'white' }}>Add Board: {project.name}</Typography>
        <form className='w-[500px] my-5 flex flex-col gap-4' onSubmit={handleSubmit}>
            <TextField
                inputRef={titleRef}
                required
                size="small"
                label="Board Name"
                placeholder="Enter Board Name"
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

export default BoardForm