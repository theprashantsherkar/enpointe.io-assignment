import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

const AmountPopup = ({ open, onClose, onSubmit, balance, popupType, amount, setAmount }) => {

    const handleSubmit = () => {
        if (amount && !isNaN(amount)) {
            onSubmit(Number(amount));
            setAmount('');
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    Available Balance: ₹{balance}
                </Typography>
                <TextField
                    fullWidth
                    label="Enter Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
                />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={onClose} sx={{ mr: 1 }} >
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                        {popupType}
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default AmountPopup;
