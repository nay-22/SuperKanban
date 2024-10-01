import { AlternateEmail, Password, TitleOutlined } from '@mui/icons-material'
import { TextField, InputAdornment, Button } from '@mui/material'
import { useState } from 'react';

const SignupForm = () => {
    const [form, setForm] = useState({ fname: '', lname: '', email: '', password: '', confirmPassword: '' });
    return (
        <form className="flex flex-col gap-5 p-10 bg-taskBackgroundSecondary rounded-lg">
            <TextField
                required
                size="small"
                label="First Name"
                placeholder="Enter First Name"
                value={form.fname}
                onChange={(e) => setForm(prev => ({ ...prev, fname: e.target.value }))}
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
                                <TitleOutlined sx={{ color: 'white' }} />
                            </InputAdornment>
                        )
                    }
                }}
            />
            <TextField
                size="small"
                label="Last Name"
                placeholder="Enter Last Name"
                value={form.lname}
                onChange={(e) => setForm(prev => ({ ...prev, lname: e.target.value }))}
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
                                <TitleOutlined sx={{ color: 'white' }} />
                            </InputAdornment>
                        )
                    }
                }}
            />
            <TextField
                required
                size="small"
                label="Email"
                placeholder="Enter Email"
                value={form.email}
                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
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
                size="small"
                type='password'
                label="Password"
                placeholder="Enter Password"
                value={form.password}
                onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
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
            <TextField
                required
                size="small"
                type='password'
                label="Confirm Password"
                placeholder="Re-enter Password"
                value={form.confirmPassword}
                onChange={(e) => setForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
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
                    '& .MuiSvgIcon-root': {
                        color: 'white', // Change the color of the visibility toggle icon
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
                disabled={form.fname === '' || form.email === '' || form.password === '' || form.confirmPassword === '' || form.password !== form.confirmPassword}
            >
                Signup
            </Button>
        </form>
    )
}

export default SignupForm