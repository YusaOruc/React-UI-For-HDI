import { Paper, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import React from "react";
import useTablePageState from "../../hooks/useTablePageState";
import PageModal from "../../components/PageModal";
import SurveyForm from "./SurveyForm";
import SurveyEditForm from "./SurveyForm";

interface ISurveyItemProps {
    handleEdit: (id: number) => void;
  }
const SurveyItem = (props:ISurveyItemProps) => {

    const {handleEdit}=props

  const currentDate = new Date();

  // Tarih formatını düzenle (isteğe bağlı)
  const formattedDate = currentDate.toLocaleDateString();
  return (
    <Paper onClick={()=>handleEdit(1)}  sx={{
        p: 3,
        "&:hover": {
          backgroundColor: "#f0f0f0", 
          cursor: "pointer",
        },
      }}>
      <Stack  direction="row" justifyContent="space-between">
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

    const {
        open,
        currentId,
        handleClickOpen,
        handleClose,
        handleEdit,
        isEdit,
        formCallback,
      } = useTablePageState();
      const theme = useTheme();
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Button onClick={handleClickOpen} variant="outlined" color="success">
        Anket Ekle
      </Button>
      <Stack spacing={2} sx={{marginTop:2}}>
        <SurveyItem   handleEdit={handleEdit}/>
        <SurveyItem  handleEdit={handleEdit}/>
        <SurveyItem  handleEdit={handleEdit}/>
        <SurveyItem  handleEdit={handleEdit}/>
        <SurveyItem  handleEdit={handleEdit}/>
        <SurveyItem  handleEdit={handleEdit}/>
      </Stack>
      <PageModal
        title="Anket"
        backgroundColor={theme.palette.grey[100]}
        fullScreen
        isOpen={open}
        handleClose={handleClose}
      >
       
       <SurveyForm editId={currentId!} />
      </PageModal>
    </Container>
  );
};

export default Survey;
