import { Alert, Button, Container, Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import { RadioData, Radios, TextField } from "mui-rff";
import { Field, Form } from "react-final-form";
import useAlertState from "../../components/alerts/useAlertState";
import { useAddSurveyResult, useGetSurvey, useGetSurveyResult } from "../../stores/SurveyStore";
import FillPart from "./FillPart";

interface IQuestionItemProps {
  question?: string;
  surveyQuestionOptionList?: any;
  questionId: number;
  index: number;
}
const QuestionItem = function QuestionItem(props: IQuestionItemProps) {
  const { question, surveyQuestionOptionList, questionId, index } = props;
  const options =
    surveyQuestionOptionList?.map(
      (t: any) =>
        ({
          label: t.title!,
          value: `${t.id!}`,
        } as RadioData)
    ) ?? [];

  return (
    <>
      <Radios
        label={`${index}) ${question}`}
        name={`q-${questionId}`}
        required={true}
        data={options}
      />

      <Field name={`q-${questionId}`} subscription={{ value: true }}>
        {({ input: { value } }) =>
          surveyQuestionOptionList.find(
            (t: any) => `${t.id!}` === value && t.expandSurveyBaseId !== null
          ) && (
            <FillPart
              partId={
                surveyQuestionOptionList.find(
                  (t: any) =>
                    `${t.id!}` === value && t.expandSurveyBaseId !== null
                ).expandSurveyBaseId
              }
            />
          )
        }
      </Field>
    </>
  );
};

interface IFillSurveyFormProps {
  disabled?: boolean;
  editId: number;
}
const FillSurveyForm = function FillSurveyForm(props: IFillSurveyFormProps) {
  const { disabled, editId } = props;
  const isEdit = !!editId;
  const { data = {} } = useGetSurvey(editId, isEdit);
  const validate = (values: any) => {
    const errors: any = {};

    return errors;
  };
  const answers = useGetSurveyResult(editId);
 
  const AddSurveyResult = useAddSurveyResult(editId)
  const { alertState, showAlert } = useAlertState({});
  const defaultOnSubmit = async (d: any) => {
    const questions = Object.keys(d).filter((t) => t.includes("q-"));

    const surveyResults = questions.map((question) => {
      const obj: any = {
        surveyBaseId: editId!,
        surveyQuestionId: +question.split("-")[1],
        surveyQuestionOptionId: d[question],
      };
      return obj;
    });

    try {
      if (editId) {
        await AddSurveyResult.mutateAsync(surveyResults)
        showAlert();
      }
      return undefined;
    } catch (e: any) {
      if (e.response?.status === 400) {
        const response = await e.response.json();
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
        initialValues={answers}
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
              {data.surveyQuestions?.map((t: any, index: any) => (
                <QuestionItem
                  key={t.id}
                  index={index + 1}
                  questionId={t.id!}
                  question={t.title!}
                  surveyQuestionOptionList={t.surveyQuestionOptions!}
                />
              ))}

              <Divider light />

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

export default FillSurveyForm;
