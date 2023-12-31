import { RadioData, Radios } from "mui-rff";
import { useGetSurvey } from "../../stores/SurveyStore";
import { Divider, Typography } from "@mui/material";

interface IFillPartProps {
  partId: number;
}
const FillPart = function FillPart(props: IFillPartProps) {
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

export default FillPart;

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
    <Radios
      label={`${index}) ${question}`}
      name={`q-${questionId}`}
      required={true}
      data={options}
    />
  );
};
