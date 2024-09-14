import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import TableEditor, {
  TableEditorProps,
} from "../app/components/headersEditor/TableEditor";

describe("TableEditor Component", () => {
  const mockSetRows = vi.fn();

  const defaultProps: TableEditorProps = {
    rows: [
      { key: "Key1", value: "Value1" },
      { key: "Key2", value: "Value2" },
    ],
    setRows: mockSetRows,
    headerText: "Test Header",
    onValueChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders TableEditor with header text and rows", () => {
    render(<TableEditor {...defaultProps} />);

    expect(screen.getByText("Test Header")).toBeInTheDocument();
    expect(screen.getByText("Key1")).toBeInTheDocument();
    expect(screen.getByText("Value1")).toBeInTheDocument();
    expect(screen.getByText("Description1")).toBeInTheDocument();
  });

  it("calls setRows when 'Add value' button is clicked", async () => {
    render(<TableEditor {...defaultProps} />);
    const button = screen.getByRole("button", { name: /add value/i });

    await userEvent.click(button);

    expect(mockSetRows).toHaveBeenCalledWith(true);
  });
});
