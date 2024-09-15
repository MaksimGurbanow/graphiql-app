import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  IsLogedInContext,
  IsLogInContextProvider,
  IsLoginContextType,
} from "../app/context/loginContext";
import Login from "../app/routes/login/route";
import RequestProvider from "../app/context/RequestContext";
import AlertProvider from "../app/context/alertContext";
import userEvent from "@testing-library/user-event";

describe("Login Component", () => {
  it("renders without crashing", () => {
    const isLoggedIn = [false, () => {}];

    render(
      <MemoryRouter>
        <IsLogedInContext.Provider value={isLoggedIn as IsLoginContextType}>
          <Login />
        </IsLogedInContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText("form.signInHeading")).toBeDefined();
  });
  it("Should show and hide password on mouse down and mouse up", async () => {
    const isLoggedIn = [false, () => {}];
    render(
      <MemoryRouter>
        <IsLogedInContext.Provider value={isLoggedIn as IsLoginContextType}>
          <Login />
        </IsLogedInContext.Provider>
      </MemoryRouter>,
    );
    const showHide = await screen.findByTestId("VisibilityIcon");
    fireEvent.click(showHide);
  });
  it("Should display error if firebase throws an error", async () => {
    render(
      <MemoryRouter>
        <AlertProvider>
          <IsLogInContextProvider>
            <RequestProvider>
              <Login />
            </RequestProvider>
          </IsLogInContextProvider>
        </AlertProvider>
      </MemoryRouter>,
    );
    const email = await screen.findByTestId("email-input");
    const password = await screen.findByTestId("password-input");
    const sendButton = await screen.findByTestId("login-button");
    await act(async () => {
      await userEvent.type(email, "linqek1929@gmail.com");
      await userEvent.type(password, "Z@q1aq1xasasa");
      await userEvent.click(sendButton);
    });
    expect(screen.queryByTestId("alert-error")).toBeDefined();
  });
});
