import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./login.scss";
import {
  Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validationSchema";
import { LoadingButton } from "@mui/lab";
import signIn from "../../utils/signIn";
import { Navigate, useNavigate } from "@remix-run/react";
import { IsLogedInContext } from "../../context/loginContext";
import { useTranslation } from "react-i18next";
interface IRegisterForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signInError, setSignInError] = useState(false);
  const [isLogedIn] = useContext(IsLogedInContext);
  const matches = useMediaQuery("(min-width:450px)");
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: IRegisterForm) => {
    setLoading(true);
    signIn(data.email, data.password).catch((error) => {
      setLoading(false);
      setSignInError(error.message);
    });
  };

  return (
    <div>
      {isLogedIn && <Navigate to="/" replace={true} />}
      {!isLogedIn && (
        <section className="login">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form"
            style={{ width: matches ? "400px" : "300px" }}
          >
            <h1 className="form__heading">{t("form.signInHeading")}</h1>
            <TextField
              id="outlined-uncontrolled"
              label="E-mail"
              {...register("email")}
              inputProps={{ "data-testid": "email-input" }}
            />
            <div
              style={{ height: "20px", marginTop: "-15px", marginLeft: "10px" }}
            >
              <FormHelperText id="outlined-weight-helper-text">
                {errors.email ? errors.email.message : null}
              </FormHelperText>
            </div>
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              style={{ width: "100%", margin: "0" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                {t("form.password")}
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ '&[data-testid="show-hide-button"]': {} }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{ "data-testid": "password-input" }}
                {...register("password")}
              />
              <div style={{ height: "20px" }}>
                <FormHelperText id="outlined-weight-helper-text">
                  {errors.password ? errors.password.message : null}
                </FormHelperText>
              </div>
            </FormControl>
            <LoadingButton
              size="small"
              loading={loading}
              variant="outlined"
              type="submit"
              data-testid="login-button"
            >
              <span>{t("form.signIn")}</span>
            </LoadingButton>
            <button
              type="button"
              onClick={() => navigate("/registration")}
              className="form__link"
            >
              {t("form.dontHaveAccount")}
              <span style={{ textDecoration: "underline" }}>
                {t("form.signUp")}
              </span>
            </button>
          </form>
          <div style={{ height: "40px" }}>
            {signInError && (
              <Alert
                variant="filled"
                severity="error"
                data-testid="alert-error"
              >
                {signInError}
              </Alert>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Login;
