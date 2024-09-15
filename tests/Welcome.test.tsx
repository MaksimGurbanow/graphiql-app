import { render, screen } from "@testing-library/react";
import Welcome from "../app/components/welcome/Welcome";
import { IsLogedInContext } from "../app/context/loginContext";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock("@react-hook/resize-observer", () => ({
  default: vi.fn(),
}));

vi.mock("react-i18next", async () => {
  const actual = await vi.importActual("react-i18next");
  return {
    ...actual,
    useTranslation: vi.fn(() => ({
      t: (key) => key,
      i18n: { language: "en" },
    })),
  };
});

vi.mock("firebase/auth", () => ({
  getAuth: vi.fn().mockReturnValue({ currentUser: { email: "test@test.com" } }),
}));

describe("Welcome Component", () => {
  beforeEach(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it("renders welcome message and buttons when logged in", () => {
    render(
      <IsLogedInContext.Provider value={[true]}>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </IsLogedInContext.Provider>
    );

    expect(
      screen.getByText("welcome.welcomeBack test@test.com!")
    ).toBeInTheDocument();
    expect(screen.getByText("welcome.restClient")).toBeInTheDocument();
    expect(screen.getByText("welcome.graphiQlClient")).toBeInTheDocument();
    expect(screen.getByText("welcome.history")).toBeInTheDocument();
  });

  it("renders sign in and sign up buttons when not logged in", () => {
    render(
      <IsLogedInContext.Provider value={[false]}>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </IsLogedInContext.Provider>
    );

    expect(screen.getByText("welcome.welcome")).toBeInTheDocument();
    expect(screen.getByText("form.signIn")).toBeInTheDocument();
    expect(screen.getByText("form.signUp")).toBeInTheDocument();
  });

  it("displays team members correctly", () => {
    render(
      <IsLogedInContext.Provider value={[true]}>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </IsLogedInContext.Provider>
    );

    expect(screen.getByText("welcome.maksimName")).toBeInTheDocument();
    expect(screen.getByText("welcome.egorName")).toBeInTheDocument();
    expect(screen.getByText("welcome.dmitryName")).toBeInTheDocument();
  });
});
