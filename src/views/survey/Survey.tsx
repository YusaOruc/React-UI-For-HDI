import {
  Paper,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Box,
  ListItemText,
} from "@mui/material";
import React from "react";
import useTablePageState from "../../hooks/useTablePageState";
import PageModal from "../../components/PageModal";
import SurveyForm from "./SurveyForm";
import SurveyEditForm from "./SurveyForm";
import { useGetSurveyList } from "../../stores/SurveyStore";
import { format } from 'date-fns';

interface ISurveyItemProps {
  handleEdit: (id: number) => void;
  id: number;
  title: string;
  date: Date
}
const SurveyItem = (props: ISurveyItemProps) => {
  const { handleEdit, id, title } = props;
   
  return (
   <ListItem disablePadding onClick={()=>handleEdit(id)}>
           <ListItemButton >
           <ListItemText primary={title} />
           </ListItemButton>
         </ListItem>
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
  
  const { data = [], isLoading, isError } = useGetSurveyList();


  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Paper sx={{p:2}}>
      <Button onClick={handleClickOpen} variant="outlined" color="success">
        Anket Ekle
      </Button>
    
        <List >
         
          {data.map((t: any) => (
           <SurveyItem date={t.createDate} id={t.id} title={t.title} key={t.id} handleEdit={handleEdit} />
        ))}
        </List>
      <PageModal
        title="Anket"
        backgroundColor={theme.palette.grey[100]}
        fullScreen
        isOpen={open}
        handleClose={handleClose}
      >
        <SurveyForm editId={currentId!} />
      </PageModal>
      </Paper>
    </Container>
  );
};

export default Survey;
