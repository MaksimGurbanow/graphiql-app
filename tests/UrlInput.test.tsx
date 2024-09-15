import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UrlInput from "../app/components/UrlInput/UrlInput";
import { useRequestContext } from "../app/context/RequestContext";
import { useSchemaContext } from "../app/context/SchemaContext";

vi.mock("../app/context/RequestContext", () => ({
  useRequestContext: vi.fn(),
}));

vi.mock("../app/context/SchemaContext", () => ({
  useSchemaContext: vi.fn(),
}));

describe("UrlInput", () => {
  const setRest = vi.fn();
  const setGraphql = vi.fn();
  const setSdl = vi.fn();
  const setIsChanged = vi.fn();

  beforeEach(() => {
    (useRequestContext as vi.Mock).mockReturnValue({
      rest: { url: "http://example.com" },
      setRest,
      graphQL: { url: "http://graphql.com" },
      setGraphql,
    });

    (useSchemaContext as vi.Mock).mockReturnValue({
      sdl: "schema",
      setSdl,
      setIsChanged,
    });
  });

  it("renders input with correct value based on mode", () => {
    render(<UrlInput mode="rest" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("http://example.com");
  });

  it("updates state on input change for graphQlSdl mode", () => {
    render(<UrlInput mode="graphQlSdl" />);

    const input = screen.getByRole("textbox");
    fireEvent.input(input, { target: { value: "new SDL schema" } });

    expect(setSdl).toHaveBeenCalledWith("new SDL schema");
    expect(setIsChanged).toHaveBeenCalledWith(true);
  });

  it("handles paste event correctly", () => {
    render(<UrlInput mode="rest" />);

    const input = screen.getByRole("textbox");
    fireEvent.paste(input, {
      clipboardData: { getData: () => "http://pastedurl.com" },
    });

    expect(setRest).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = (setRest as jest.Mock).mock.calls[0][0];

    const prevState = { url: "http://example.com" };

    expect(updateFunction(prevState)).toEqual({
      url: "http://pastedurl.com",
    });
  });
});
