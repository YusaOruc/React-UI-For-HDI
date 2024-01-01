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
  );
};

export default ListNotFound;
