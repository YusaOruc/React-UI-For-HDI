import { Paper, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";

const SurveyItem = () => {
  const currentDate = new Date();

  // Tarih formatını düzenle (isteğe bağlı)
  const formattedDate = currentDate.toLocaleDateString();
  return (
    <Paper  sx={{
        p: 3,
        "&:hover": {
          backgroundColor: "#f0f0f0", 
          cursor: "pointer",
        },
      }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography  sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }} variant="h6">Anket Adı</Typography>
        <Typography>{formattedDate}</Typography>
      </Stack>
    </Paper>
  );
};
const Survey = () => {
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Button variant="outlined" color="success">
        Anket Ekle
      </Button>
      <Stack spacing={2} sx={{marginTop:2}}>
        <SurveyItem />
        <SurveyItem />
        <SurveyItem />
        <SurveyItem />
        <SurveyItem />
        <SurveyItem />
      </Stack>
    </Container>
  );
};

export default Survey;
