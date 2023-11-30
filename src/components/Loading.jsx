import { Box } from '@mui/material'
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import React from 'react'

export default function Loading() {
  return (
    <Box sx={{display: 'flex', height: '90vh', alignItems: 'center',justifyContent: 'center'}}>
        <HourglassBottomIcon color='primary' sx={{fontSize: '80px'}}/>
    </Box>
  )
}
