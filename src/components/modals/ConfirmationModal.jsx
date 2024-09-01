import { Box, Button, Divider, Modal, TextField, Typography } from '@mui/material';
import React from 'react'

const ConfirmationModal = ({ message = 'Do you confirm?', onConfirm, open, onClose }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'lightgray',
                    borderRadius: '.5em',
                    padding: '2em',
                    width: '400px',
                    // display: 'flex',
                    // alignItems: 'center',
                    // justifyContent: 'center',
                }}
            >
                <Typography variant='h5' fontWeight={'bold'}>{message}</Typography>
                <Divider />
                <Box
                    sx={{
                        mt: '2em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        gap: '1em',
                        width: '100%',
                    }}
                >
                    <Button
                        sx={{
                            backgroundColor: 'grey',
                            textTransform: 'none',
                            height: '55px',
                            width: '100%',
                            fontSize: '1em',
                        }}
                        variant='contained'
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'royalblue',
                            textTransform: 'none',
                            height: '55px',
                            width: '100%',
                            fontSize: '1em',
                        }}
                        variant='contained'
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
