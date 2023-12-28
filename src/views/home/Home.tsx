import { Box, Container, Tab, Tabs } from "@mui/material";
import React from "react";

enum HomeTab {
  Users,
  Surveys,
  Reports,
}
const Home = () => {
  const [value, setValue] = React.useState(HomeTab.Surveys);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: HomeTab) => {
    setValue(newValue);
  };
  return (
    <Container maxWidth="md">
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
        sx={(theme)=>({color:theme.palette.success.main})}
          value={value}
          onChange={handleChangeTab}
          centered
        >
          <Tab  value={HomeTab.Surveys} label="Anketler" />
          <Tab value={HomeTab.Reports} label="Raporlar" />
          <Tab value={HomeTab.Users} label="Kullanıcılar" />
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
