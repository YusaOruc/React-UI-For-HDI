import {
  Container,
  Box,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Cancel } from "mdi-material-ui";
import React from "react";

const ListNotFound = () => {
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
          <Box sx={{ textAlign: "center" }}>
            <Cancel fontSize="large" />
            <Typography>Kayıt Bulunamadı</Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ListNotFound;
