import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

type ConfirmationModalProps = {
    message?: string;
    onConfirm: (...args: any) => void;
    open: boolean;
    onClose: (...args: any) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message = 'Do you confirm?', onConfirm, open, onClose }) => {
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
                    backdropFilter: 'blur(20px)',
                    border: '1px solid grey',
                    borderRadius: '1em',
                    padding: '2em',
                    minWidth: '350px',
                }}
            >
                <Typography variant='h5' fontWeight={'bold'}>{message}</Typography>
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
                            backgroundColor: 'royalblue',
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
                            textTransform: 'none',
                            bgcolor: 'maroon',
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