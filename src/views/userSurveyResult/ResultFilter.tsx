import Grid from "@mui/material/Grid";
import { Form } from "react-final-form";
import SurveySelect from "../../components/formInputs/SurveySelect";
import { requiredCheck } from "../../utils/validation";
import { Button } from "@mui/material";
import UserSelect from "../../components/formInputs/UserSelect";

export interface IResultFilter {
  surveyId: number;
  userId: number;
}
interface IResultFilterProps {
  initialValues?: IResultFilter;
  onSubmit: any;
  disabled?: boolean;
}
const ResultFilter = function ResultFilter(props: IResultFilterProps) {
  const { onSubmit, initialValues } = props;

  const validate = (values: any) => {
    const errors: any = {};
    errors.surveyId = requiredCheck(values.surveyId);
    errors.userId = requiredCheck(values.userId);
    return errors;
  };

  return (
    <Form
      subscription={{ submitting: true, pristine: true }}
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={12} sm={6}>
              <SurveySelect required isParent />
            </Grid>
            <Grid item xs={12} sm={6}>
              <UserSelect  required />
            </Grid>
            <Grid item xs={12}>
              <Button
                sx={{ minWidth: "150px", float: "right" }}
                variant="contained"
                color="success"
                size="small"
                type="submit"
              >
                Sonucu Göster
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
};

export default ResultFilter;
