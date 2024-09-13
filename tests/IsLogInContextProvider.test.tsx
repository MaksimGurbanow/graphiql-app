import { render, screen, act } from "@testing-library/react";
import { IsLogInContextProvider } from "../app/context/loginContext";
import { describe, it, expect } from "vitest";

describe("IsLogInContextProvider", () => {
  it("should render children when not loading", async () => {
    await act(async () => {
      render(
        <IsLogInContextProvider>
          <div data-testid="child">Content</div>
        </IsLogInContextProvider>
      );
    });

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });
});
