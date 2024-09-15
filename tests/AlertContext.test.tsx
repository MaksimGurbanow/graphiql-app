import { render, screen } from "@testing-library/react";
import AlertProvider, { useAlertContext } from "../app/context/alertContext";
import { Close } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";

const TestComponent = () => {
  const { message, setMessage } = useAlertContext();
  return (
    <div>
      <button onClick={() => setMessage("Test message")}>Show Alert</button>
      {message && (
        <Alert
          severity="error"
          sx={{
            position: "fixed",
            top: "2%",
            right: "50%",
            transform: "translate(50%, 0)",
            width: "80%",
            zIndex: 10000,
          }}
          color="error"
          variant="filled"
        >
          {message}
          <Button sx={{ background: "black" }} onClick={() => setMessage("")}>
            <Close sx={{ color: "white" }} />
          </Button>
        </Alert>
      )}
    </div>
  );
};

describe("AlertProvider", () => {
  it("does not show alert message initially", () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>
    );

    expect(screen.queryByText("Test message")).toBeNull();
  });
});
