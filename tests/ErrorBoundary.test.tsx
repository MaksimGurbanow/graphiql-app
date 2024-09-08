import { render, screen } from "@testing-library/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { describe, it, vi, expect } from "vitest";
import { ErrorBoundary } from "../app/components/error boundary/ErrorBoundary";

// Mocking Remix functions
vi.mock("@remix-run/react", () => ({
  isRouteErrorResponse: vi.fn(),
  Links: () => <link />,
  Meta: () => <meta />,
  Scripts: () => <script />,
  useRouteError: vi.fn(),
}));

describe("ErrorBoundary Component", () => {
  it("renders status and status text for route error response", () => {
    const mockError = { status: 404, statusText: "Not Found" };
    (isRouteErrorResponse as jest.Mock).mockReturnValue(true);
    vi.mocked(useRouteError).mockReturnValue(mockError);

    render(<ErrorBoundary />);

    expect(screen.getByText("404 Not Found")).toBeInTheDocument();
  });

  it("renders error message for Error instance", () => {
    const mockError = new Error("Something went wrong");
    (isRouteErrorResponse as jest.Mock).mockReturnValue(false);
    vi.mocked(useRouteError).mockReturnValue(mockError);

    render(<ErrorBoundary />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders 'Unknown Error' for unknown error type", () => {
    const mockError = { message: "Unexpected error" };
    (isRouteErrorResponse as jest.Mock).mockReturnValue(false);
    vi.mocked(useRouteError).mockReturnValue(mockError);

    render(<ErrorBoundary />);

    expect(screen.getByText("Unknown Error")).toBeInTheDocument();
  });
});
