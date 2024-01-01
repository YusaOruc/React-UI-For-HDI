import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { requiredCheck } from "../../utils/validation";
import { Form } from "react-final-form";
import { TextField } from "mui-rff";
import { useLoginUser } from "../../stores/LoginStore";
import { RoleEnum } from "../../layout/routes";

const getHomePath = (role: string): string => {
  let path = "/";
  switch (role) {
    case RoleEnum.Anketor: {
      path = "/survey";
      break;
    }
    case RoleEnum.StandardUser: {
      path = "/fillSurvey";
      break;
    }
    case RoleEnum.Reporting: {
      path = "/userSurveyResult";
      break;
    }
  }
  return path;
};

const Login = () => {
  const validate = (values: any) => {
    const errors: any = {};
    errors.email = requiredCheck(values.email);
    return errors;
  };

  const navigate = useNavigate();
  const loginMutation = useLoginUser();
  const defaultOnSubmit = async (d: any) => {
    try {
      const result = await loginMutation.mutateAsync({
        username: d.email,
        password: d.password,
      });
      if (result.token === null) {
        navigate("/login");
      } else {
        sessionStorage.setItem("token", result.token);
        sessionStorage.setItem("role", result.role);
        const path = getHomePath(result.role);
        navigate(path);
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
    <Container maxWidth="xs">
      <Stack sx={{ mt: 25 }} spacing={2}>
        <Typography
          variant="h4"
          noWrap
          sx={(theme) => ({
            alignSelf: "center",
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".2rem",
            textDecoration: "none",
            color: theme.palette.success.main,
          })}
        >
          HDI Sigorta
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Form
            subscription={{ submitting: true, pristine: true }}
            onSubmit={defaultOnSubmit}
            validate={validate}
            render={({
              handleSubmit,
              submitting,
              pristine,
              form: { reset },
            }) => (
              <form onSubmit={handleSubmit} noValidate>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    {/* Center horizontally */}
                    <Stack>
                      <Typography
                        variant="h6"
                        noWrap
                        sx={(theme) => ({
                          display: "flex",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          textDecoration: "none",
                        })}
                      >
                        Giriş Yap
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="email"
                      type="text"
                      label="Kullanıcı Adı veya E-posta"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      type="password"
                      label="Şifre"
                      fullWidth
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider light />
                  </Grid>

                  <Grid item xs={12} container justifyContent="center">
                    <Button
                      sx={{ minWidth: "150px", float: "right" }}
                      variant="contained"
                      color="success"
                      size="small"
                      type="submit"
                    >
                      Giriş Yap
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          />
        </Paper>
      </Stack>
    </Container>
  );
};

export default Login;

function useLogin() {
  throw new Error("Function not implemented.");
}
