import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NotFoundPage from "../app/routes/$";
import { useNavigate } from "@remix-run/react";

vi.mock("@remix-run/react", () => ({
  useNavigate: vi.fn(),
}));

describe("NotFoundPage Component", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("navigates to the main page on button click", () => {
    render(<NotFoundPage />);

    const goToMainButton = screen.getByRole("button", { name: /Go to main/i });
    fireEvent.click(goToMainButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
