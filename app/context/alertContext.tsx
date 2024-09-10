import { Alert } from "@mui/material";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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
            top: "15%",
            right: "50%",
            transform: "translate(50%, 0)",
          }}
          color="error"
          variant="filled"
        >
          {message}
        </Alert>
      )}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
