import { Button, Chip, Divider, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import arrayMutators from "final-form-arrays";
import { MinusCircleOutline, Plus } from "mdi-material-ui";
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
        console.log(d,"dddddddd")
      return undefined;
    } catch (e: any) {
      if (e.response?.status === 400) {
        const response = await e.response.json();
        const errors = "FormatErrors(response)"

        return errors;
      } else {
        throw e;
      }
    }
  };
  return (
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
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="title"
                  type="text"
                  label="Başlık"
                  fullWidth
                  required
                  disabled={disabled}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider light />
              </Grid>

              <Grid item xs={12} container justifyContent="flex-start">
                <Grid item>
                  <Button
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
                </Grid>
              </Grid>

              <Grid item container>
                <FieldArray name="anketQuestions">
                  {({ fields, meta: { error, submitFailed } }) =>
                    fields.map((anketQuestionName, anketQuestionIndex) => (
                      <Grid item container key={anketQuestionName}>
                        <Grid item xs={12}>
                          <Divider sx={{mb:2}} >
                            <Chip
                              color="success"
                              label={`${anketQuestionIndex + 1}.Soru`}
                            />
                          </Divider>
                        </Grid>
                        <Grid
                          item
                          xs
                          container
                          justifyContent="flex-end"
                          spacing={2}
                        >
                          <Grid item xs={12}>
                            <TextField
                              name={`${anketQuestionName}.title`}
                              type="text"
                              label={"Soru"}
                              fullWidth
                              required
                              disabled={disabled }
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs="auto" sx={{ margin: "auto" }}>
                        <IconButton
                              sx={{ margin: "15px" }}
                              size="small"
                              onClick={() => fields.remove(anketQuestionIndex)}
                            >
                              <MinusCircleOutline />
                            </IconButton>
                        </Grid>
                       
                          <Grid
                            item
                            xs={12}
                            container
                            justifyContent="flex-start"
                          >
                            <Grid item>
                              <Button
                              type="button"
                                variant="text"
                                onClick={() =>
                                  push(
                                    `${anketQuestionName}.anketQuestionOptions`
                                  )
                                }
                                color="primary"
                                startIcon={<Plus />}
                              >
                                {"Seçenek Ekle"}
                              </Button>
                            </Grid>
                          </Grid>
                       
                        {fields.value[anketQuestionIndex].anketQuestionOptions
                          .length > 0 && (
                          <Grid item xs={12}>
                            <Divider>
                              <Chip label="Cevaplar" />
                            </Divider>
                          </Grid>
                        )}
                        <Grid item container>
                          <FieldArray
                            name={`${anketQuestionName}.anketQuestionOptions`}
                          >
                            {({ fields, meta: { error, submitFailed } }) =>
                              fields.map(
                                (
                                  anketQuestionOptionName,
                                  anketQuestionOptionIndex
                                ) => (
                                  <Grid
                                    item
                                    xs={12}
                                    justifyContent="flex-end"
                                    container
                                    key={anketQuestionOptionName}
                                  >
                                    <Grid item xs={9}>
                                      <TextField
                                        name={`${anketQuestionOptionName}.title`}
                                        type="text"
                                        label={`${ anketQuestionOptionIndex + 1 }.Soru`}
                                        fullWidth
                                        required
                                        disabled={disabled }
                                      />
                                    </Grid>

                                    <Grid item>
                                    <IconButton
                                          sx={{ margin: "15px" }}
                                          size="small"
                                          onClick={() =>
                                            fields.remove(
                                              anketQuestionOptionIndex
                                            )
                                          }
                                        >
                                          <MinusCircleOutline />
                                        </IconButton>
                                    </Grid>
                                  </Grid>
                                )
                              )
                            }
                          </FieldArray>
                        </Grid>
                      </Grid>
                    ))
                  }
                </FieldArray>
              </Grid>
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
                  color="primary"
                  size="small"
                  type="submit"
                >
                  Kaydet
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default SurveyForm;
