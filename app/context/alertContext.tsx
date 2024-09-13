import { Alert, Button } from "@mui/material";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Close } from "@mui/icons-material";

export interface IAlertContext {
  message: string;
  setMessage: (v: string) => void;
}

export const AlertContext = createContext<IAlertContext>({
  message: "",
  setMessage: (_v: string) => {
    _v;
  },
});

export const useAlertContext = () => useContext(AlertContext);

const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [message]);
  return (
    <AlertContext.Provider value={{ message, setMessage }}>
      {children}
      {message && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            top: "2%",
            right: "50%",
            transform: "translate(50%, 0)",
            width: "80%",
            zIndex: 10000
          }}
          color="error"
          variant="filled"
        >
          {message}
          <Button sx={{ background: "black" }} onClick={(() => setMessage(""))}>
            <Close sx={{ color: "white" }} />
          </Button>
        </Alert>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
