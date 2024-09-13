import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BodyEditor, {
  BodyEditorProps,
} from "../app/components/bodyEditor/BodyEditor";

const defaultProps: BodyEditorProps = {
  body: "Initial text",
  setBody: vi.fn(),
};

describe("BodyEditor Component", () => {
  it("renders the BodyEditor component", () => {
    render(<BodyEditor {...defaultProps} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
  });

  it("displays the initial body text", () => {
    render(<BodyEditor {...defaultProps} />);
    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe("Initial text");
  });

  it("calls setBody when text is changed", () => {
    render(<BodyEditor {...defaultProps} />);
    const textarea = screen.getByRole("textbox");

    fireEvent.input(textarea, { target: { value: "Updated text" } });

    expect(defaultProps.setBody).toHaveBeenCalledTimes(1);
    expect(defaultProps.setBody).toHaveBeenCalledWith("Updated text");
  });
});
