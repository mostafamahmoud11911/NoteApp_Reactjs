import styled from '@emotion/styled'
import { Box } from '@mui/material'
import React from 'react'

const NotFound = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    margin: '0 2rem',
    height: '90vh',
    fontSize: '60px',
})

export default function Notfound() {
  return (
    <NotFound>Not found 4O4</NotFound>
  )
}
