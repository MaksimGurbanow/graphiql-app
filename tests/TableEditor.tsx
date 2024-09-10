// TableEditor.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TableEditor, { TableEditorProps } from "../components/tableEditor/TableEditor"; // Убедитесь, что путь корректный
import { IRow } from "../app/types/types";
import "@testing-library/jest-dom";

const mockSetRows = vi.fn();

const mockProps: TableEditorProps = {
    rows: [
        { key: "key1", value: "value1", description: "description1" },
        { key: "key2", value: "value2", description: "description2" },
    ],
    setRows: mockSetRows,
    headerText: "Test Header",
};

describe("TableEditor Component", () => {
    it("renders with correct header text", () => {
        render(<TableEditor {...mockProps} />);

        expect(screen.getByText("Test Header")).toBeInTheDocument();
    });

    it("renders the correct number of rows", () => {
        render(<TableEditor {...mockProps} />);

        // Учитываем дополнительную строку заголовка
        expect(screen.getAllByRole("row").length).toBe(mockProps.rows.length + 1);
    });

    it("calls setRows when 'Add value' button is clicked", () => {
        render(<TableEditor {...mockProps} />);

        const addButton = screen.getByText(/Add value/i);
        fireEvent.click(addButton);

        expect(mockSetRows).toHaveBeenCalledWith(true);
    });

    it("handles key events in DataGrid cells", () => {
        render(<TableEditor {...mockProps} />);

        const cell = screen.getByText("key1");
        fireEvent.keyDown(cell, { key: "A", target: { value: "new value" } });

        expect(mockSetRows).toHaveBeenCalledWith(false, 0, {
            value: "value1",
            key: "key1",
            description: "description1",
            key: "new value",
        });
    });
});
