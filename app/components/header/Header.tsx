import "./header.scss";
import logo from "../../assets/logo-svg.svg";
import { useContext, useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { IsLogedInContext } from "~/context/loginContext";
import { useNavigate } from "@remix-run/react";
import { signOut } from "~/utils/signOut";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogedIn] = useContext(IsLogedInContext);
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language.toUpperCase());

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string
  ) => {
    setLang(newLang);
    i18n.changeLanguage(newLang.toLowerCase());
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
          {isLogin ? t("header.signOut") : t("header.signIn")}
        </Button>
        {!isLogin && (
          <Button onClick={() => navigate("/registration")} variant="outlined">
            {t("header.signUp")}
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
