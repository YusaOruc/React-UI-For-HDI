import { AppBar, Container, Stack, Typography } from "@mui/material";

const Footer = () => {
  return (
    <AppBar
      position="static"
      sx={(theme) => ({
        backgroundColor: "#14142F",
        bottom:0,
        position:"relative"
      })}
    >
      <Container>
        <Stack
          sx={{ height: "70px",mt:0.7 }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography >
            © 2023 All rights reserved.
          </Typography>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default Footer;
