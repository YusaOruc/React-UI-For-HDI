import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import arrayMutators from "final-form-arrays";
import { Close, ContentSave, PlaylistPlus, Plus } from "mdi-material-ui";
import { TextField } from "mui-rff";
import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

interface ISurveyEditFormProps {
  disabled?: boolean;
  editId: number;
}

const SurveyForm = function SurveyEditForm(props: ISurveyEditFormProps) {
  const { disabled = false, editId } = props;

  const validate = (values: any) => {
    const errors: any = {};

    return errors;
  };
  const defaultOnSubmit = async (d: any) => {
    try {
      console.log(d, "dddddddd");
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
        mutators={{
          ...arrayMutators,
        }}
        //initialValues={initialValues}
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
                      push("anketQuestions", {
                        anketQuestionOptions: [],
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

              <FieldArray name="anketQuestions">
                {({ fields, meta: { error, submitFailed } }) =>
                  fields.map((anketQuestionName, anketQuestionIndex) => (
                    <Paper sx={{ p: 2 }} key={anketQuestionName}>
                      <Stack spacing={2}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Chip
                            color="success"
                            label={`${anketQuestionIndex + 1}.Soru`}
                          />
                          <IconButton
                            size="small"
                            onClick={() => fields.remove(anketQuestionIndex)}
                          >
                            <Close />
                          </IconButton>
                        </Box>
                        <TextField
                          name={`${anketQuestionName}.title`}
                          type="text"
                          label={"Soru"}
                          fullWidth
                          required
                          size="small"
                          disabled={disabled}
                        />

                        <Box>
                          <Button
                            size="small"
                            sx={{ justifyContent: "flex-start" }}
                            type="button"
                            variant="text"
                            onClick={() =>
                              push(`${anketQuestionName}.anketQuestionOptions`)
                            }
                            color="inherit"
                          >
                            {"Seçenek Ekle"}
                          </Button>
                        </Box>
                        <FieldArray
                          name={`${anketQuestionName}.anketQuestionOptions`}
                        >
                          {({ fields, meta: { error, submitFailed } }) =>
                            fields.map(
                              (
                                anketQuestionOptionName,
                                anketQuestionOptionIndex
                              ) => (
                                <Box
                                  sx={{ display: "flex" }}
                                  key={anketQuestionOptionName}
                                >
                                  <TextField
                                    size="small"
                                    name={`${anketQuestionOptionName}.title`}
                                    type="text"
                                    label={`${
                                      anketQuestionOptionIndex + 1
                                    }.Seçenek`}
                                    fullWidth
                                    required
                                    disabled={disabled}
                                  />
                                  <IconButton
                                    size="small"
                                    onClick={() =>
                                      fields.remove(anketQuestionOptionIndex)
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
                            label={"Bölüm Adı"}
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
                                push(`${partName}.partQuestions`, {
                                  partQuestionOptions: [],
                                })
                              }
                              color="default"
                            >
                              <Plus />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <FieldArray name={`${partName}.partQuestions`}>
                          {({ fields, meta: { error, submitFailed } }) =>
                            fields.map(
                              (partQuestionName, partQuestionIndex) => (
                                <Stack spacing={2} key={partQuestionName}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Chip
                                      color="success"
                                      label={`${partQuestionIndex + 1}.Soru`}
                                    />
                                    <IconButton
                                      size="small"
                                      onClick={() =>
                                        fields.remove(partQuestionIndex)
                                      }
                                    >
                                      <Close />
                                    </IconButton>
                                  </Box>
                                  <TextField
                                    name={`${partQuestionName}.title`}
                                    type="text"
                                    label={"Soru"}
                                    fullWidth
                                    required
                                    size="small"
                                    disabled={disabled}
                                  />

                                  <Box>
                                    <Button
                                      size="small"
                                      sx={{ justifyContent: "flex-start" }}
                                      type="button"
                                      variant="text"
                                      onClick={() =>
                                        push(
                                          `${partQuestionName}.partQuestionOptions`
                                        )
                                      }
                                      color="inherit"
                                    >
                                      {"Seçenek Ekle"}
                                    </Button>
                                  </Box>
                                  <FieldArray
                                    name={`${partQuestionName}.partQuestionOptions`}
                                  >
                                    {({
                                      fields,
                                      meta: { error, submitFailed },
                                    }) =>
                                      fields.map(
                                        (
                                          anketQuestionOptionName,
                                          anketQuestionOptionIndex
                                        ) => (
                                          <Box
                                            sx={{ display: "flex" }}
                                            key={anketQuestionOptionName}
                                          >
                                            <TextField
                                              size="small"
                                              name={`${anketQuestionOptionName}.title`}
                                              type="text"
                                              label={`${
                                                anketQuestionOptionIndex + 1
                                              }.Seçenek`}
                                              fullWidth
                                              required
                                              disabled={disabled}
                                            />
                                            <IconButton
                                              size="small"
                                              onClick={() =>
                                                fields.remove(
                                                  anketQuestionOptionIndex
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
