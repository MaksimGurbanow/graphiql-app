import "./header.scss";
import logo from "../../assets/logo-svg.svg";
import { useContext, useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { IsLogedInContext } from "~/context/loginContext";
import { useNavigate } from "@remix-run/react";
import { signOut } from "~/utils/signOut";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogedIn] = useContext(IsLogedInContext);
  const [lang, setLang] = useState("EN");
  const handleChange = (event: React.MouseEvent<HTMLElement>, lang: string) => {
    setLang(lang);
  };

  const signInHandler = () => {
    if (isLogin) {
      setIsLogedIn(false);
      localStorage.removeItem("token");
      signOut();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="header">
      <a href="/">
        <img src={logo} alt="logo" className="logo" />
      </a>
      <div className="header__button-container">
        <ToggleButtonGroup
          color="primary"
          value={lang}
          exclusive
          onChange={handleChange}
          aria-label="Language"
          style={{ border: "1px solid #1976d2" }}
          size="small"
        >
          <ToggleButton value="EN" aria-label="EN">
            <span>EN</span>
          </ToggleButton>
          <ToggleButton value="RU" aria-label="RU">
            <span>RU</span>
          </ToggleButton>
        </ToggleButtonGroup>
        <Button onClick={signInHandler} variant="outlined">
          {isLogin ? "Sign Out" : "Sign In"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
