import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import {
  IsLogedInContext,
  IsLoginContextType,
} from "../app/context/loginContext";
import Registration from "../app/routes/registration/route";
import { vi } from "vitest";
import React from "react";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

vi.mock("../app/utils/signUp", () => ({
  default: vi.fn().mockResolvedValue(true),
}));

describe("Registration Component", () => {
  it("renders the form and allows user input", async () => {
    const isLoggedIn = [false];

    render(
      <MemoryRouter>
        <IsLogedInContext.Provider value={isLoggedIn as IsLoginContextType}>
          <Registration />
        </IsLogedInContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText("form.signUpHeading")).toBeDefined();

    const emailInput = screen.getByLabelText(/E-mail/i);
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    });
    expect(emailInput).toHaveValue("test@example.com");

    const passwordInput = screen.getByLabelText("form.password");
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "password123" } });
    });
    expect(passwordInput).toHaveValue("password123");

    expect(screen.getByRole("button", { name: /form.signUp/i })).toBeDefined();
  });

  it("toggles password visibility and shows password strength meter", async () => {
    const isLoggedIn = [false];

    render(
      <MemoryRouter>
        <IsLogedInContext.Provider value={isLoggedIn as IsLoginContextType}>
          <Registration />
        </IsLogedInContext.Provider>
      </MemoryRouter>,
    );

    const toggleButton = screen.getByLabelText("toggle password visibility");
    const passwordInput = screen.getByLabelText("form.password");

    expect(passwordInput).toHaveAttribute("type", "password");

    await act(async () => {
      fireEvent.click(toggleButton);
    });
    expect(passwordInput).toHaveAttribute("type", "text");

    await act(async () => {
      fireEvent.click(toggleButton);
    });
    expect(passwordInput).toHaveAttribute("type", "password");

    await act(async () => {
      fireEvent.focus(passwordInput);
    });
    expect(screen.getByText(/password strength/i)).toBeDefined();
  });
});
