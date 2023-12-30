import {
  Paper,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
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
  const { handleEdit, id, title,date } = props;
  
  return (
    <Paper
      onClick={() => handleEdit(id)}
      sx={{
        p: 3,
        "&:hover": {
          backgroundColor: "#f0f0f0",
          cursor: "pointer",
        },
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          variant="h6"
        >
          {title}
        </Typography>
        <Typography>{"01.01.2023"}</Typography>
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

  const { data = [], isLoading, isError } = useGetSurveyList();
  console.log(data, "data");

  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Button onClick={handleClickOpen} variant="outlined" color="success">
        Anket Ekle
      </Button>
      <Stack spacing={2} sx={{ marginTop: 2 }}>
        {data.map((t: any) => (
          <SurveyItem date={t.createDate} id={t.id} title={t.title} key={t.id} handleEdit={handleEdit} />
        ))}
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
