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
} from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "~/utils/validationSchema";
import { LoadingButton } from "@mui/lab";
import signIn from "~/utils/signIn";
import { Navigate } from "@remix-run/react";
import { IsLogedInContext } from "~/context/loginContext";
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
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
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
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <h1 className="form__heading">{t("form.signInHeading")}</h1>
            <TextField
              id="outlined-uncontrolled"
              label="E-mail"
              {...register("email")}
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
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
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
            >
              <span>{t("form.signIn")}</span>
            </LoadingButton>
            <a href="/registration" className="form__link">
              {t("form.dontHaveAccount")}
              <span style={{ textDecoration: "underline" }}>
                {t("form.signUp")}
              </span>
            </a>
          </form>
          <div style={{ height: "40px" }}>
            {signInError && (
              <Alert variant="filled" severity="error">
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
