import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import React, { ErrorInfo, useEffect, useRef, useState } from 'react'
import { useProjectActions } from '../../hooks/ProjectActions';
import { AlternateEmail } from '@mui/icons-material';
import { FormProps, KBProject } from '../../types';
import { useToast } from '../../hooks/ToastActions';

interface MemberFormProps extends FormProps {
    project: KBProject;
}

const MemberForm: React.FC<MemberFormProps> = ({ project, callback }) => {
    const [email, setEmail] = useState('');
    const emailRef = useRef<HTMLFormElement>(null);

    const { addMember } = useProjectActions();
    const { enqueue } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            addMember(project.id, email);
            enqueue('Member added successfully', 2000);
        } catch (error: any) {
            enqueue(error.message, 2000);
        }
        callback();
    }

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    return <>
        <Typography variant='h5' sx={{ color: 'white' }}>Add Member: {project.name}</Typography>
        <form className='w-[500px] my-5 flex flex-col gap-4' onSubmit={handleSubmit}>
            <TextField
                inputRef={emailRef}
                required
                size="small"
                label="Member Email"
                placeholder="Enter Member Email"
                onChange={(e) => setEmail(e.target.value)}
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
                                <AlternateEmail sx={{ color: 'white' }} />
                            </InputAdornment>
                        )
                    }
                }}
            />
            <div className='flex items-center justify-between gap-4'>
                <Button variant='outlined' sx={{ textTransform: 'none', width: '100%', height: '50px' }} onClick={callback}>Cancel</Button>
                <Button
                    disabled={!email}
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
                >Add
                </Button>
            </div>
        </form>
    </>;
}

export default MemberForm;