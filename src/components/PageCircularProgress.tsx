import { Container,Box, Paper, CircularProgress } from '@mui/material'
import React from 'react'

const PageCircularProgress = () => {
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
    <Paper sx={{ p: 2 }}>
      {" "}
      <Box
        sx={{
          display: "flex",
          minHeight: 200,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </Paper>
  </Container>
  )
}

export default PageCircularProgress