import { RadioData, Radios } from "mui-rff";
import { useGetSurvey } from "../../stores/SurveyStore";
import { Box, Divider, Typography } from "@mui/material";
import { Field } from "react-final-form";
import { Cancel, Check } from "mdi-material-ui";

interface IShowPartProps {
  partId: number;
}
const ShowPart = function ShowPart(props: IShowPartProps) {
  const { partId } = props;
  const { data = {} } = useGetSurvey(partId);
  return (
    <>
    <Divider/>
    <Typography>
        {data.title}
    </Typography>
      {data.surveyQuestions?.map((t: any, index: any) => (
        <QuestionItem
          key={t.id}
          index={index + 1}
          questionId={t.id!}
          question={t.title!}
          surveyQuestionOptionList={t.surveyQuestionOptions!}
        />
      ))}
      <Divider/>
    </>
  );
};

export default ShowPart;

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
  <Box sx={{display:"flex"}}>
  <Radios
      label={`${index}) ${question}`}
      name={`q-${questionId}`}
      required={true}
      data={options}
      
    />
  <Field
      name={`q-${questionId}-isCorrect`}
      subscription={{ value: true }}
    >
      {({ input: { value } }) =>
        value  ?<Check color="success"/>:<Cancel color="error"/>
      }
    </Field>
  </Box>


    <Field
      name={`q-${questionId}-correctQuestionIndex`}
      subscription={{ value: true }}
    >
      {({ input: { value } }) =>
        
          <Typography variant="caption">Doğru cevap {value}</Typography>
      }
    </Field>
  </>
);
};
