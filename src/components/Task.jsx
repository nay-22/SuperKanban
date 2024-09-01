import React from 'react'

import bin from "../assets/bin.png";
import { Box, Button, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Task = ({ id, title, onDelete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
      }}
    >
      <Typography style={{ textAlign: 'left' }}>{title}</Typography>
      <Button
        sx={{
          backgroundColor: "white",
          border: "none",
          cursor: "pointer",
          outline: "none",
          minWidth: '0',
          width: '30px',
          height: '30px',
        }}
        onClick={onDelete}
      >
        <Delete
          sx={{
            color: 'red',
          }}
        />
      </Button>
    </Box>
  )
}

export default Task