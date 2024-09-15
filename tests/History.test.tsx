import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import History from "../app/routes/history/route";
import { IsLogedInContext } from "../app/context/loginContext";
import "@testing-library/jest-dom";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

vi.mock("@remix-run/react", () => ({
  useNavigate: () => vi.fn(),
  Navigate: ({ to }) => <span>Navigate to {to}</span>,
}));

describe("History Component", () => {
  beforeEach(() => {
    localStorage.setItem("history", "");
  });
  it("should redirect to home if not logged in", () => {
    render(
      <MemoryRouter>
        <IsLogedInContext.Provider value={[false]}>
          <History />
        </IsLogedInContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText("Navigate to /")).toBeInTheDocument();
  });
});
