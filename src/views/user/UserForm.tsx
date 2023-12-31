import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import arrayMutators from "final-form-arrays";
import { Close, PlaylistPlus, Plus } from "mdi-material-ui";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import {
  useAddSurvey,
  useGetSurvey,
  useUpdateSurvey,
} from "../../stores/SurveyStore";
import SurveySelect from "../../components/formInputs/SurveySelect";
import useAlertState from "../../components/alerts/useAlertState";
import { useAddUser, useGetUser } from "../../stores/UserStore";
import { requiredCheck } from "../../utils/validation";
import ArraySelect from "../../components/formInputs/ArraySelect";

interface IUserFormFormProps {
  disabled?: boolean;
  editId: number;
  callback?: ((errors?: any) => void) | undefined;
}

const UserForm = function UserForm(props: IUserFormFormProps) {
  const { disabled = false, editId, callback } = props;

  const validate = (values: any) => {
    const errors: any = {};
    errors.userName = requiredCheck(values.userName);
    errors.password = requiredCheck(values.password);
    errors.role = requiredCheck(values.role);
    return errors;
  };
  const isEdit = !!editId;
  const { data } = useGetUser(editId, isEdit);
  const initialValues= data?? {}
  const AddUser = useAddUser();
  const { alertState, showAlert } = useAlertState({});
  const defaultOnSubmit = async (d: any) => {
    try {
      await AddUser.mutateAsync(d);
      
      if (callback) {
        callback();
      }
      return undefined;
    } catch (e: any) {
      if (e.response?.status === 400) {
        const response = await e.response.json();
        const errors = "FormatErrors(response)";

        return errors;
      } else {
        throw e;
      }
    }
  };
  return (
    <Container maxWidth="md">
      <Form
        subscription={{ submitting: true, pristine: true }}
        onSubmit={defaultOnSubmit}
        validate={validate}
        initialValues={initialValues}
        render={({
          handleSubmit,
          submitting,
          pristine,
          form: {
            reset,
            mutators: { push, pop },
          },
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Stack spacing={2}>
              {alertState && (
                <Alert severity="success">{"Bilgiler güncellenmiştir."}</Alert>
              )}
              <TextField
                name="userName"
                type="text"
                label="Kullanıcı Adı"
                fullWidth
                required
                disabled={disabled || isEdit}
              />
              {!isEdit && (
                <TextField
                  name="password"
                  type="password"
                  label="Şifresi"
                  fullWidth
                  required
                  disabled={disabled || isEdit}
                />
              )}
               <ArraySelect
                  name="role"
                  label="Rol"
                  options={["Anketor", "StandardUser", "Reporting"]}
                  required
                  disabled={disabled || isEdit}
                />
              <Divider light />
              <Grid item xs={12}>
                <Divider light />
              </Grid>

              {!isEdit && (
                <Grid item xs={12} container justifyContent="flex-end">
                  <Button
                    sx={{ minWidth: "150px", float: "right", mr: 2 }}
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => {
                      reset();
                    }}
                  >
                    İptal
                  </Button>
                  <Button
                    sx={{ minWidth: "150px", float: "right" }}
                    variant="contained"
                    color="success"
                    size="small"
                    type="submit"
                    disabled={submitting}
                  >
                    Kaydet
                  </Button>
                </Grid>
              )}
            </Stack>
          </form>
        )}
      />
    </Container>
  );
};

export default UserForm;
