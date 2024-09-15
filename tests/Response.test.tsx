import { render, screen } from "@testing-library/react";
import Response from "../app/components/response/Response";
import { describe, it, expect } from "vitest";
import classes from "../app/components/response/response.module.scss";

describe("Response", () => {
  it("does not render status and statusText when not provided", () => {
    render(<Response data="{}" />);

    const statusElement = screen.queryByText("200");
    const statusTextElement = screen.queryByText("OK");

    expect(statusElement).not.toBeInTheDocument();
    expect(statusTextElement).not.toBeInTheDocument();
  });

  it("applies appropriate class based on status", () => {
    const { container } = render(
      <Response data="{}" status={500} statusText="Server Error" />,
    );

    const statusDiv = container.querySelector(`.${classes.responseStatus}`);

    expect(statusDiv).toBeInTheDocument();
    expect(statusDiv).toHaveClass(classes.error);
  });

  it("prints class names for debugging and checks class application", () => {
    const { container } = render(
      <Response data="{}" status={500} statusText="Server Error" />,
    );

    const statusDiv = container.querySelector(`.${classes.responseStatus}`);

    console.log(statusDiv?.className);

    expect(statusDiv).toBeInTheDocument();
    expect(statusDiv?.className).toMatch(/error/);
  });
  it("Shouldn't render status code if it's not provided", async () => {
    render(<Response data="{}" />);
    expect(screen.queryByTestId("response-status")).toBeNull();
    expect(screen.queryByTestId("response-code")).toBeNull();
    expect(screen.queryByTestId("response-text")).toBeNull();
  });
});
