import { AlternateEmail, Password } from '@mui/icons-material'
import { TextField, InputAdornment, Button } from '@mui/material'
import { useState } from 'react'

const LoginForm = () => {
    const [form, setForm] = useState({ email: '', password: '' });

    return (
        <form className="flex flex-col gap-5 p-10 bg-taskBackgroundSecondary rounded-lg">
            <TextField
                required
                size="small"
                label="Email"
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) => setForm(prev => ({...prev, email: e.target.value}))}
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
                        height: '40px',
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
            <TextField
                required
                type='password'
                size="small"
                label="Password"
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) => setForm(prev => ({...prev, password: e.target.value}))}
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
                        height: '40px',
                    },
                }}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Password sx={{ color: 'white' }} />
                            </InputAdornment>
                        )
                    }
                }}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{
                    width: '100%',
                    textTransform: 'none',
                    fontSize: '1em',
                    height: '50px',
                    ':disabled': {
                        color: 'grey'
                    }
                }}
                onClick={(e) => {
                    e.preventDefault();
                    alert(form);
                }}
                disabled={form.email === '' || form.password === ''}
            >
                Login
            </Button>
        </form>
    )
}

export default LoginForm