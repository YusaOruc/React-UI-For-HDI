import {
  Paper,
  Button,
  Container,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  CircularProgress,
} from "@mui/material";
import useTablePageState from "../../hooks/useTablePageState";
import PageModal from "../../components/PageModal";
import { useGetSurveyList } from "../../stores/SurveyStore";
import UserForm from "./UserForm";
import { useGetUserList } from "../../stores/UserStore";
import PageCircularProgress from "../../components/PageCircularProgress";
import ListNotFound from "../../components/ListNotFound";

interface IUserItemProps {
  handleEdit: (id: number) => void;
  id: number;
  title: string;
}
const UserItem = (props: IUserItemProps) => {
  const { handleEdit, id, title } = props;

  return (
    <ListItem disablePadding onClick={() => handleEdit(id)}>
      <ListItemButton>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
};
const User = () => {
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

  const { data = [], isLoading, isError } = useGetUserList();
  if (isLoading) {
    return (
      <PageCircularProgress/>
    );
  }
  if (data.length===0) {
    return (
      <ListNotFound/>
    );
  }
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
      <Paper sx={{ p: 2 }}>
        <Button onClick={handleClickOpen} variant="outlined" color="success">
          Kullanıcı Ekle
        </Button>

        <List>
          {data.map((t: any, index: any) => (
            <UserItem
              key={t.id}
              id={t.id}
              title={t.userName}
              handleEdit={handleEdit}
            />
          ))}
        </List>
        <PageModal
          title="Kullanıcı"
          backgroundColor={theme.palette.grey[100]}
          isOpen={open}
          handleClose={handleClose}
        >
          <UserForm editId={currentId!} callback={formCallback} />
        </PageModal>
      </Paper>
    </Container>
  );
};

export default User;
