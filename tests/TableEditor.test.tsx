import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { describe, it, expect, vi } from "vitest";
import TableEditor, { TableEditorProps } from "../app/components/headersEditor/TableEditor";
import i18n from "../app/i18n";
import { IRow } from "../app/types/types";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                tableEditor: {
                    key: "Key",
                    value: "Value",
                    addValue: "Add Value",
                },
            },
        },
    },
});

const mockRows: IRow[] = [{ key: "testKey", value: "testValue" }];
const setRowsMock = vi.fn();
const defaultProps: TableEditorProps = {
    rows: mockRows,
    setRows: setRowsMock,
    headerText: "tableEditor.header",
};

describe("TableEditor Component", () => {
    it('renders TableEditor component with correct headers and button', () => {
        render(
            <I18nextProvider i18n={i18n}>
                <TableEditor {...defaultProps} />
            </I18nextProvider>
        );

        const keyElements = screen.getAllByText(/Key/i);
        expect(keyElements[0]).toBeInTheDocument();

        const valueElements = screen.getAllByText(/Value/i);
        expect(valueElements[0]).toBeInTheDocument();

        expect(screen.getByRole('button', { name: /Add Value/i })).toBeInTheDocument();
    });

    it("calls setRows when Add Value button is clicked", () => {
        render(
            <I18nextProvider i18n={i18n}>
                <TableEditor {...defaultProps} />
            </I18nextProvider>
        );

        const addButton = screen.getByRole("button", { name: /Add Value/i });
        fireEvent.click(addButton);

        expect(setRowsMock).toHaveBeenCalledWith(true, mockRows.length, { key: "", value: "" });
    });

    it("renders rows correctly in the DataGrid", () => {
        render(
            <I18nextProvider i18n={i18n}>
                <TableEditor {...defaultProps} />
            </I18nextProvider>
        );

        expect(screen.getByText(/testKey/i)).toBeInTheDocument();
        expect(screen.getByText(/testValue/i)).toBeInTheDocument();
    });
});
