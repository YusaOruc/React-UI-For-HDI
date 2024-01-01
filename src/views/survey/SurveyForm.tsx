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
import ArraySelect, {
  ListSelect,
} from "../../components/formInputs/ArraySelect";

interface ISurveyEditFormProps {
  disabled?: boolean;
  editId: number;
  callback?: ((errors?: any) => void) | undefined;
}

const SurveyForm = function SurveyEditForm(props: ISurveyEditFormProps) {
  const { disabled = false, editId, callback } = props;

  const validate = (values: any) => {
    const errors: any = {};

    return errors;
  };
  const isEdit = !!editId;

  const { data: initialValues } = useGetSurvey(editId, isEdit);

  const AddSurvey = useAddSurvey();
  const UpdateSurvey = useUpdateSurvey();
  const { alertState, showAlert } = useAlertState({});
  const defaultOnSubmit = async (d: any) => {
    try {
      if (isEdit) {
        await UpdateSurvey.mutateAsync({ surveyId: editId, updatedSurvey: d });
        showAlert();
      } else {
        await AddSurvey.mutateAsync(d);
        if (callback) {
          callback();
        }
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
        mutators={{
          ...arrayMutators,
        }}
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
                name="title"
                type="text"
                label="Başlık"
                fullWidth
                required
                disabled={disabled}
              />
              <Divider light />
              <Box>
                <Tooltip title="Soru Ekle">
                  <IconButton
                    onClick={() =>
                      push("surveyQuestions", {
                        surveyQuestionOptions: [],
                      })
                    }
                    color="default"
                  >
                    <Plus />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bölüm Ekle">
                  <IconButton onClick={() => push("parts")} color="default">
                    <PlaylistPlus />
                  </IconButton>
                </Tooltip>
              </Box>

              <FieldArray name="surveyQuestions">
                {({ fields, meta: { error, submitFailed } }) =>
                  fields.map((surveyQuestionName, surveyQuestionIndex) => (
                    <Paper sx={{ p: 2 }} key={surveyQuestionName}>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>
                            {`${surveyQuestionIndex + 1}.Soru`}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => fields.remove(surveyQuestionIndex)}
                          >
                            <Close />
                          </IconButton>
                        </Box>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={10}>
                            <TextField
                              name={`${surveyQuestionName}.title`}
                              type="text"
                              label={"Soru"}
                              fullWidth
                              required
                              size="small"
                              disabled={disabled}
                            />
                          </Grid>
                          <Grid item xs={12} sm={2}>
                            <ListSelect
                              name={`${surveyQuestionName}.correctQuestionOptionIndex`}
                              label="Doğru Cevap"
                              options={[
                                { id: 1, name: "A" },
                                { id: 2, name: "B" },
                                { id: 3, name: "C" },
                                { id: 4, name: "D" },
                                { id: 5, name: "E" },
                              ]}
                              required
                              size="small"
                              disabled={disabled}
                            />
                          </Grid>
                        </Grid>
                        <Box>
                          <Button
                            size="small"
                            sx={{ justifyContent: "flex-start" }}
                            type="button"
                            variant="text"
                            onClick={() =>
                              push(
                                `${surveyQuestionName}.surveyQuestionOptions`
                              )
                            }
                            color="inherit"
                          >
                            {"Seçenek Ekle"}
                          </Button>
                        </Box>
                        <FieldArray
                          name={`${surveyQuestionName}.surveyQuestionOptions`}
                        >
                          {({ fields, meta: { error, submitFailed } }) =>
                            fields.map(
                              (
                                surveyQuestionOptionName,
                                surveyQuestionOptionIndex
                              ) => (
                                <Grid
                                  container
                                  spacing={1}
                                  key={surveyQuestionOptionIndex}
                                >
                                  <Grid item xs={12} sm={8}>
                                    <TextField
                                      size="small"
                                      name={`${surveyQuestionOptionName}.title`}
                                      type="text"
                                      label={`${
                                        surveyQuestionOptionIndex + 1
                                      }.Seçenek`}
                                      fullWidth
                                      required
                                      disabled={disabled}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={3}>
                                    <SurveySelect
                                      name={`${surveyQuestionOptionName}.expandSurveyBaseId`}
                                      parentId={editId}
                                      label="Bölüm"
                                      size="small"
                                    />
                                  </Grid>
                                  <Grid item xs="auto">
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        fields.remove(surveyQuestionOptionIndex)
                                      }
                                    >
                                      <Close />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              )
                            )
                          }
                        </FieldArray>
                      </Stack>
                    </Paper>
                  ))
                }
              </FieldArray>

              <FieldArray name="parts">
                {({ fields, meta: { error, submitFailed } }) =>
                  fields.map((partName, partIndex) => (
                    <Paper
                      sx={(theme) => ({
                        p: 2,
                        backgroundColor: theme.palette.grey[200],
                      })}
                      key={partName}
                    >
                      <Stack spacing={2}>
                        <Box sx={{ display: "flex" }}>
                          <TextField
                            name={`${partName}.title`}
                            type="text"
                            label={"Başlık"}
                            fullWidth
                            required
                            size="small"
                            disabled={disabled}
                          />
                          <IconButton
                            size="small"
                            onClick={() => fields.remove(partIndex)}
                          >
                            <Close />
                          </IconButton>
                        </Box>
                        <Box>
                          <Tooltip title="Soru Ekle">
                            <IconButton
                              onClick={() =>
                                push(`${partName}.surveyQuestions`, {
                                  surveyQuestionOptions: [],
                                })
                              }
                              color="default"
                            >
                              <Plus />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <FieldArray name={`${partName}.surveyQuestions`}>
                          {({ fields, meta: { error, submitFailed } }) =>
                            fields.map(
                              (surveyQuestionName, surveyQuestionIndex) => (
                                <Paper sx={{ p: 2 }} key={surveyQuestionName}>
                                  <Stack spacing={2}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                    >
                                      <Typography>
                                        {`${surveyQuestionIndex + 1}.Soru`}
                                      </Typography>
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          fields.remove(surveyQuestionIndex)
                                        }
                                      >
                                        <Close />
                                      </IconButton>
                                    </Box>
                                    <Grid container spacing={1}>
                                      <Grid item xs={12} sm={10}>
                                        <TextField
                                          name={`${surveyQuestionName}.title`}
                                          type="text"
                                          label={"Soru"}
                                          fullWidth
                                          required
                                          size="small"
                                          disabled={disabled}
                                        />
                                      </Grid>
                                      <Grid item xs={12} sm={2}>
                                        <ListSelect
                                          name={`${surveyQuestionName}.correctQuestionOptionIndex`}
                                          label="Doğru Cevap"
                                          options={[
                                            { id: 1, name: "A" },
                                            { id: 2, name: "B" },
                                            { id: 3, name: "C" },
                                            { id: 4, name: "D" },
                                            { id: 5, name: "E" },
                                          ]}
                                          required
                                          size="small"
                                          disabled={disabled}
                                        />
                                      </Grid>
                                    </Grid>
                                    <Box>
                                      <Button
                                        size="small"
                                        sx={{ justifyContent: "flex-start" }}
                                        type="button"
                                        variant="text"
                                        onClick={() =>
                                          push(
                                            `${surveyQuestionName}.surveyQuestionOptions`
                                          )
                                        }
                                        color="inherit"
                                      >
                                        {"Seçenek Ekle"}
                                      </Button>
                                    </Box>
                                    <FieldArray
                                      name={`${surveyQuestionName}.surveyQuestionOptions`}
                                    >
                                      {({
                                        fields,
                                        meta: { error, submitFailed },
                                      }) =>
                                        fields.map(
                                          (
                                            surveyQuestionOptionName,
                                            surveyQuestionOptionIndex
                                          ) => (
                                            <Box
                                              sx={{ display: "flex" }}
                                              key={surveyQuestionOptionName}
                                            >
                                              <TextField
                                                size="small"
                                                name={`${surveyQuestionOptionName}.title`}
                                                type="text"
                                                label={`${
                                                  surveyQuestionOptionIndex + 1
                                                }.Seçenek`}
                                                fullWidth
                                                required
                                                disabled={disabled}
                                              />
                                              <IconButton
                                                size="small"
                                                onClick={() =>
                                                  fields.remove(
                                                    surveyQuestionOptionIndex
                                                  )
                                                }
                                              >
                                                <Close />
                                              </IconButton>
                                            </Box>
                                          )
                                        )
                                      }
                                    </FieldArray>
                                  </Stack>
                                </Paper>
                              )
                            )
                          }
                        </FieldArray>
                      </Stack>
                    </Paper>
                  ))
                }
              </FieldArray>
              <Grid item xs={12}>
                <Divider light />
              </Grid>

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
            </Stack>
          </form>
        )}
      />
    </Container>
  );
};

export default SurveyForm;
