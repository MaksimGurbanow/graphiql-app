import "./header.scss";
import logo from "../../assets/logo-svg.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { SyntheticEvent, useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from "@mui/material";
import { IsLogedInContext } from "../../context/loginContext";
import { useNavigate } from "@remix-run/react";
import { signOut } from "../../utils/signOut";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogedIn] = useContext(IsLogedInContext);
  const { i18n, t } = useTranslation();
  const [lang, setLang] = useState(i18n.language.toUpperCase());
  const matches = useMediaQuery("(min-width:450px)");
  const [isFixed, setIsFixed] = useState(true);

  window.onscroll = () => {
    if (window.scrollY >= 106) {
      setIsFixed(false);
    } else if (window.scrollY < 100) {
      setIsFixed(true);
    }
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newLang: string
  ) => {
    if (newLang !== null) {
      setLang(newLang);
      i18n.changeLanguage(newLang.toLowerCase());
    }
  };

  const signInHandler = (event: Event | SyntheticEvent<Element, Event>) => {
    if (isLogin) {
      setIsLogedIn(false);
      localStorage.removeItem("token");
      signOut();
      handleClose(event);
      navigate("/");
    } else {
      handleClose(event);
      navigate("/login");
    }
  };

  const signUpHandler = (event: Event | SyntheticEvent<Element, Event>) => {
    handleClose(event);
    navigate("/registration");
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <header className={isFixed ? "header" : "header fixed"}>
      <IconButton onClick={() => navigate("/")}>
        <img src={logo} alt="logo" className="logo" />
      </IconButton>

      <div className="header__button-container">
        <ToggleButtonGroup
          color="primary"
          value={lang}
          exclusive={true}
          onChange={handleChange}
          aria-label="Language"
          style={{ border: "1px solid #1976d2" }}
          size="small"
          orientation={"horizontal"}
        >
          <ToggleButton value="EN" aria-label="EN" sx={{ color: "grey" }}>
            <span>EN</span>
          </ToggleButton>
          <ToggleButton value="RU" aria-label="RU" sx={{ color: "grey" }}>
            <span>RU</span>
          </ToggleButton>
        </ToggleButtonGroup>
        {matches && (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={signInHandler}
              variant="outlined"
              size={matches ? "medium" : "small"}
            >
              {isLogin ? t("header.signOut") : t("header.signIn")}
            </Button>
            {!isLogin && (
              <Button
                onClick={() => navigate("/registration")}
                variant="outlined"
                size={matches ? "medium" : "small"}
              >
                {t("header.signUp")}
              </Button>
            )}
          </div>
        )}
      </div>

      {!matches && (
        <Stack direction="row" spacing={2}>
          <div>
            <IconButton
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? "composition-menu" : undefined}
              aria-expanded={open ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              size="large"
            >
              <MenuIcon color="primary" />
            </IconButton>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={signInHandler}>
                          {isLogin ? t("header.signOut") : t("header.signIn")}
                        </MenuItem>
                        {!isLogin && (
                          <MenuItem onClick={signUpHandler}>
                            {t("header.signUp")}
                          </MenuItem>
                        )}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Stack>
      )}
    </header>
  );
};

export default Header;
