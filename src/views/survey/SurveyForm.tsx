import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import arrayMutators from "final-form-arrays";
import { Close, Plus } from "mdi-material-ui";
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
                <Button
                  sx={{ justifyContent: "flex-start" }}
                  type="button"
                  variant="text"
                  onClick={() =>
                    push("anketQuestions", {
                      anketQuestionOptions: [],
                    })
                  }
                  color="success"
                  disabled={disabled}
                  startIcon={<Plus />}
                >
                  {"Soru Ekle"}
                </Button>
                <Button
                  sx={{ justifyContent: "flex-start" }}
                  type="button"
                  variant="text"
                  onClick={() =>
                    push("anketPartQuestions", {
                      anketQuestionOptions: [],
                    })
                  }
                  color="success"
                  disabled={disabled}
                  startIcon={<Plus />}
                >
                  {"Bölüm Ekle"}
                </Button>
              </Box>

              <FieldArray name="anketQuestions">
                {({ fields, meta: { error, submitFailed } }) =>
                  fields.map((anketQuestionName, anketQuestionIndex) => (
                    <Paper sx={{ p: 2 }} key={anketQuestionName}>
                      <Stack spacing={2}>
                        <Divider sx={{ mb: 2 }}>
                          <Chip
                            color="success"
                            label={`${anketQuestionIndex + 1}.Soru`}
                          />
                        </Divider>
                        <Box sx={{ display: "flex" }}>
                          <TextField
                            name={`${anketQuestionName}.title`}
                            type="text"
                            label={"Soru"}
                            fullWidth
                            required
                            size="small"
                            disabled={disabled}
                          />
                          <IconButton
                            size="small"
                            onClick={() => fields.remove(anketQuestionIndex)}
                          >
                            <Close />
                          </IconButton>
                        </Box>

                        <Box>
                          <Button
                            size="small"
                            sx={{ justifyContent: "flex-start" }}
                            type="button"
                            variant="text"
                            onClick={() =>
                              push(`${anketQuestionName}.anketQuestionOptions`)
                            }
                            color="primary"
                            startIcon={<Plus />}
                          >
                            {"Seçenek Ekle"}
                          </Button>
                        </Box>

                        {fields.value[anketQuestionIndex].anketQuestionOptions
                          .length > 0 && (
                          <Divider>
                            <Chip label="Cevaplar" />
                          </Divider>
                        )}
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

              <FieldArray name="anketPartQuestions">
                {({ fields, meta: { error, submitFailed } }) =>
                  fields.map((anketPartName, anketQuestionIndex) => (
                    <Paper sx={(theme)=>({ p: 2,backgroundColor:theme.palette.grey[200] })} key={anketPartName}>
                      <Stack spacing={2}>
                        <Box sx={{ display: "flex" }}>
                          <TextField
                            name={`${anketPartName}.title`}
                            type="text"
                            label={"Bölüm Adı"}
                            fullWidth
                            required
                            size="small"
                            disabled={disabled}
                          />
                          <IconButton
                            size="small"
                            onClick={() => fields.remove(anketQuestionIndex)}
                          >
                            <Close />
                          </IconButton>
                        </Box>

                        <Button
                          sx={{ justifyContent: "flex-start" }}
                          type="button"
                          variant="text"
                          onClick={() =>
                            push(`${anketPartName}.anketPartQuestions`)
                          }
                          color="success"
                          disabled={disabled}
                          startIcon={<Plus />}
                        >
                          {"Soru Ekle"}
                        </Button>
                        <FieldArray name= {`${anketPartName}.anketPartQuestions`}>
                          {({ fields, meta: { error, submitFailed } }) =>
                            fields.map(
                              (anketPartQuestionName, anketQuestionIndex) => (
                                  <Stack spacing={2} key={anketPartQuestionName}>
                                    <Divider sx={{ mb: 2 }}>
                                      <Chip
                                        color="success"
                                        label={`${anketQuestionIndex + 1}.Soru`}
                                      />
                                    </Divider>
                                    <Box sx={{ display: "flex" }}>
                                      <TextField
                                        name={`${anketPartQuestionName}.title`}
                                        type="text"
                                        label={"Soru"}
                                        fullWidth
                                        required
                                        size="small"
                                        disabled={disabled}
                                      />
                                      <IconButton
                                        size="small"
                                        onClick={() =>
                                          fields.remove(anketQuestionIndex)
                                        }
                                      >
                                        <Close />
                                      </IconButton>
                                    </Box>

                                    <Box>
                                      <Button
                                        size="small"
                                        sx={{ justifyContent: "flex-start" }}
                                        type="button"
                                        variant="text"
                                        onClick={() =>
                                          push(
                                            `${anketPartQuestionName}.anketQuestionOptions`
                                          )
                                        }
                                        color="primary"
                                        startIcon={<Plus />}
                                      >
                                        {"Seçenek Ekle"}
                                      </Button>
                                    </Box>

                                    {fields.value[anketQuestionIndex]
                                      .anketQuestionOptions.length > 0 && (
                                      <Divider>
                                        <Chip label="Cevaplar" />
                                      </Divider>
                                    )}
                                    <FieldArray
                                      name={`${anketPartQuestionName}.anketQuestionOptions`}
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
