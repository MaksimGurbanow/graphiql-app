import { render, screen, fireEvent } from "@testing-library/react";
import MethodSelector from "../app/components/methodSelector/MethodSelector";
import { useRequestContext } from "../app/context/RequestContext";
import { vi } from "vitest";

vi.mock("../app/context/RequestContext", () => ({
  useRequestContext: vi.fn(),
}));

const setRestMock = vi.fn();
const mockContextValue = {
  rest: { method: "GET" },
  setRest: setRestMock,
};

describe("MethodSelector", () => {
  beforeEach(() => {
    (useRequestContext as vi.Mock).mockReturnValue(mockContextValue);
    setRestMock.mockClear();
  });

  it("renders the MethodSelector component", () => {
    render(<MethodSelector />);

    const input = screen.getByRole("textbox", { name: "" });
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("GET");
  });

  it("selects an option from the dropdown", () => {
    render(<MethodSelector />);

    const input = screen.getByRole("textbox", { name: "" });
    fireEvent.focus(input);

    const optionButton = screen.getByRole("button", { name: /POST/i });
    fireEvent.mouseDown(optionButton);

    expect(setRestMock).toHaveBeenCalledWith(expect.any(Function));

    const setRestFunction = setRestMock.mock.calls[0][0];

    const prevState = { method: "GET" };
    const updatedState = setRestFunction(prevState);

    expect(updatedState).toEqual({ method: "POST" });
  });
});
