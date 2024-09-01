import React from 'react'

import bin from "../assets/bin.png";
import { Box, Button, Typography } from '@mui/material';

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
          minWidth: '0'
        }}
        onClick={onDelete}
      >
        <img width='15px' src={bin} alt="delete" />
      </Button>
    </Box>
  )
}

export default Task