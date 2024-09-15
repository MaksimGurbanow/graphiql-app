import { render, screen } from "@testing-library/react";
import Index, { meta } from "../app/routes/_index";
import { vi } from "vitest";
import React from "react";

vi.mock("../app/components/welcome/Welcome", () => ({
  __esModule: true,
  default: () => <div>Welcome Component</div>,
}));

describe("Index Component", () => {
  it("should render the Welcome component", () => {
    render(<Index />);
    expect(screen.getByText("Welcome Component")).toBeInTheDocument();
  });

  it("should return correct meta tags", () => {
    const result = meta();

    expect(result).toContainEqual({ title: "GraphQl/Rest client" });
    expect(result).toContainEqual({
      name: "description",
      content: "Welcome to GrpahQl/Rest application!",
    });
  });
});
