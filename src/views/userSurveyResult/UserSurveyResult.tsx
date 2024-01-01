import { Container, Stack, Typography, useTheme } from '@mui/material'
import React from 'react'
import PageModal from '../../components/PageModal'
import useTablePageState from '../../hooks/useTablePageState';
import ShowResult from './ShowResult';
import ResultFilter, { IResultFilter } from './ResultFilter';

const UserSurveyResult = () => {
  const {
    open,
    currentId,
    handleClickOpen,
    handleClose,
    handleEdit,
    isEdit,
    formCallback,
  } = useTablePageState();
  const theme = useTheme();

  const [value, setValue] = React.useState<IResultFilter>()
  return (
    <Container maxWidth="md" sx={{ p: 5 }}>
        <ResultFilter onSubmit={setValue}/>
        {value?.surveyId && value?.userId && <ShowResult surveyId={value?.surveyId}  userId={value?.userId} />}
    </Container>
  )
}

export default UserSurveyResult