import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./registration.css";
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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "~/utils/validationSchema";
import { LoadingButton } from "@mui/lab";
import signUp from "~/utils/signUp";
import PasswordStrengthMeter from "~/components/passwordStrength/PasswordStrength";
import { useNavigate } from "@remix-run/react";

interface IRegisterForm {
  email: string;
  password: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterForm>({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordStrength, setShowPasswordStrength] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit = (data: IRegisterForm) => {
    setLoading(true);
    console.log(data);
    signUp(data.email, data.password)
      .then((data) => {
        data.user.getIdToken().then((token) => {
          setLoading(false);
          setSignUpError(false);
          localStorage.setItem("token", JSON.stringify(token));
          navigate("/");
        });
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.message;
        setSignUpError(errorMessage);
      });
  };
  return (
    <div>
      {/* <Header /> */}
      <section className="register">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h1 className="form__heading">Sign Up</h1>
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
              Password
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
            <span>Sign Up</span>
          </LoadingButton>
          <a href="/login" className="form__link">
            Have an account?{" "}
            <span style={{ textDecoration: "underline" }}>Sign In</span>
          </a>
        </form>
        <div style={{ height: "40px" }}>
          {signUpError && (
            <Alert variant="filled" severity="error">
              {signUpError}
            </Alert>
          )}
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Registration;
