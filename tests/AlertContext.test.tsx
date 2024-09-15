import { render, screen, fireEvent } from "@testing-library/react";
import AlertProvider, { useAlertContext } from "../app/context/alertContext";
import { Close } from "@mui/icons-material";
import { Alert, Button } from "@mui/material";
import React from "react";

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
          <Button
            data-testid="close-button"
            sx={{ background: "black" }}
            onClick={() => setMessage("")}
          >
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
      </AlertProvider>,
    );

    expect(screen.queryByText("Test message")).toBeNull();
  });

  it("shows alert message when setMessage is called", () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>,
    );

    fireEvent.click(screen.getByText("Show Alert"));
    expect(screen.queryAllByText("Test message")).toBeDefined();
  });

  it("hides alert message when close button is clicked", () => {
    render(
      <AlertProvider>
        <TestComponent />
      </AlertProvider>,
    );

    fireEvent.click(screen.getByText("Show Alert"));
    expect(screen.queryAllByText("Test message")).toBeDefined();

    fireEvent.click(screen.getByTestId("close-button"));
    expect(screen.queryByText("Test message")).toBeNull();
  });
});
