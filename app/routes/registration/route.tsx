import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./registration.scss";
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
import signUp from "../../utils/signUp";
import PasswordStrengthMeter from "../../components/passwordStrength/PasswordStrength";
import { Navigate, useNavigate } from "@remix-run/react";
import { IsLogedInContext } from "../../context/loginContext";
import { useTranslation } from "react-i18next";

interface IRegisterForm {
  email: string;
  password: string;
}

const Registration = () => {
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
  const [signUpError, setSignUpError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
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
    signUp(data.email, data.password).catch((error) => {
      setLoading(false);
      const errorMessage = error.message;
      setSignUpError(errorMessage);
    });
  };

  return (
    <div>
      {isLogedIn && <Navigate to="/" replace={true} />}
      {!isLogedIn && (
        <section className="register">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form"
            style={{ width: matches ? "400px" : "300px" }}
          >
            <h1 className="form__heading">{t("form.signUpHeading")}</h1>
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
                {...register("password", {
                  onChange: (e) => setPassword(e.target.value),
                })}
                onFocus={() => setShowPasswordStrength(true)}
              />
              <div style={{ height: "20px" }}>
                <FormHelperText id="outlined-weight-helper-text">
                  {errors.password ? errors.password.message : null}
                </FormHelperText>
              </div>
            </FormControl>
            <div style={{ height: "42px" }}>
              {showPasswordStrength && (
                <div
                  style={{
                    visibility: !showPasswordStrength ? "hidden" : "visible",
                  }}
                >
                  <PasswordStrengthMeter password={password} />
                </div>
              )}
            </div>
            <LoadingButton
              size="small"
              loading={loading}
              variant="outlined"
              type="submit"
            >
              <span>{t("form.signUp")}</span>
            </LoadingButton>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="form__link"
            >
              {t("form.haveAccount")}
              <span style={{ textDecoration: "underline" }}>
                {t("form.signIn")}
              </span>
            </button>
          </form>
          <div style={{ height: "40px" }}>
            {signUpError && (
              <Alert variant="filled" severity="error">
                {signUpError}
              </Alert>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Registration;
