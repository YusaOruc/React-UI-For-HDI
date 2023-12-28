import { Button, Container, Divider, Grid, IconButton } from "@mui/material";
import { TextField } from "mui-rff";
import { requiredCheck } from "../../utils/validation";
import arrayMutators from "final-form-arrays";
import { MinusCircleOutline, Plus } from "mdi-material-ui";
import { Form } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

interface ISurveyFormProps {
  editId?: number;
}
const SurveyForm = (props: ISurveyFormProps) => {
  const { editId } = props;

  const validate = (values: any) => {
    const errors: any = {};
    errors.name = requiredCheck(values.name);
    return errors;
  };
  const defaultOnSubmit = async (d: any) => {
    try {
      if ((d as any).file && (d as any).file[0]) {
      }
      return undefined;
    } catch (e: any) {
      if (e.status === 400) {
        return undefined;
      } else {
        throw e;
      }
    }
  };
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
    <Form
      onSubmit={defaultOnSubmit}
      validate={validate}
      mutators={{
        ...arrayMutators,
      }}
      render={({
        handleSubmit,
        form: {
          reset,
          mutators: { push, pop, setField },
        },
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                type="text"
                label="Adı"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                type="text"
                label="Açıklama"
                fullWidth
                required
                multiline
                rows={5}
              />
            </Grid>
            <Grid item xs={12} container justifyContent="flex-end" spacing={2}>
                <Grid item>
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => push("unitWorkingHourParts", undefined)}
                    color="primary"
                    startIcon={<Plus />}
                  >
                    Şık Ekle
                  </Button>
                </Grid>
            </Grid>
            <FieldArray name="unitWorkingHourParts">
              {({ fields, meta: { error, submitFailed } }) =>
                fields.map((name, index) => (
                  <Grid item xs={12} spacing={2} container key={name}>
                    <Grid item xs={11}>
                      <TextField
                        name={`${name}.startMinute`}
                        type="text"
                        label={`${index + 1})`}
                        fullWidth
                        multiline
                        rows={2}
                        disabled={fields.value[index] && fields.value[index].id}
                      />
                    </Grid>
                    <Grid item xs="auto" style={{ margin: "auto" }}>
                      {fields.value[index] && fields.value[index].id ? (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => fields.remove(index)}
                        >
                          <MinusCircleOutline />
                        </IconButton>
                      ) : (
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => fields.remove(index)}
                        >
                          <MinusCircleOutline />
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                  </Grid>
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
                color="primary"
                size="small"
                type="submit"
              >
                Kaydet
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
    </Container>
  );
};

export default SurveyForm;
