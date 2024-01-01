import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { RadioData, Radios, TextField } from "mui-rff";
import { Field, Form } from "react-final-form";
import useAlertState from "../../components/alerts/useAlertState";
import {
  useAddSurveyResult,
  useGetSurvey,
  useGetSurveyResult,
} from "../../stores/SurveyStore";
import ShowPart from "./ShowPart";
import { Cancel, Check, Cross } from "mdi-material-ui";
import { useGetUser } from "../../stores/UserStore";

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
      (t: any, i: any) =>
        ({
          label: `${i + 1}-${t.title}`,
          value: `${t.id!}`,
        } as RadioData)
    ) ?? [];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Radios
          label={`${index}) ${question}`}
          name={`q-${questionId}`}
          required={true}
          data={options}
        />
        <Field name={`${questionId}-isCorrect`} subscription={{ value: true }}>
          {({ input: { value } }) =>
            value ? <Check color="success" /> : <Cancel color="error" />
          }
        </Field>
      </Box>

      <Field
        name={`${questionId}-correctQuestionIndex`}
        subscription={{ value: true }}
      >
        {({ input: { value } }) => (
          <Typography variant="caption">Doğru cevap {value}</Typography>
        )}
      </Field>

      <Field name={`q-${questionId}`} subscription={{ value: true }}>
        {({ input: { value } }) =>
          surveyQuestionOptionList.find(
            (t: any) => `${t.id!}` === value && t.expandSurveyBaseId !== null
          ) && (
            <ShowPart
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

interface IShowResultProps {
  disabled?: boolean;
  surveyId: number;
  userId: number;
}
const ShowResult = function ShowResult(props: IShowResultProps) {
  const { disabled, surveyId, userId } = props;
  const isEdit = !!surveyId;
  const { data = {} } = useGetSurvey(surveyId);
  const { data:user= {} } = useGetUser(userId);
  const validate = (values: any) => {
    const errors: any = {};

    return errors;
  };
  const answers = useGetSurveyResult(surveyId, userId);
  const defaultOnSubmit = async (d: any) => {};
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
              <Typography>{data.title} - {user.userName}</Typography>
              <Divider />
              {data.surveyQuestions?.map((t: any, index: any) => (
                <QuestionItem
                  key={t.id}
                  index={index + 1}
                  questionId={t.id!}
                  question={t.title!}
                  surveyQuestionOptionList={t.surveyQuestionOptions!}
                />
              ))}
            </Stack>
          </form>
        )}
      />
    </Container>
  );
};

export default ShowResult;
