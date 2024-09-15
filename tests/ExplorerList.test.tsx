import { fireEvent, render, screen } from "@testing-library/react";
import ExplorerList from "../app/components/explorerList/ExplorerList";
import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

const mockTypes: (
  | {
      kind: string;
      name: string;
      fields: (
        | { name: string; type: { kind: string; name: string } }
        | {
            name: string;
            type: { kind: string; name: string };
          }
      )[];
    }
  | {
      kind: string;
      name: string;
      fields: { name: string; type: { kind: string; name: string } }[];
    }
  | {
      kind: string;
      name: string;
      description: string;
    }
)[] = [
  {
    name: "Query",
    kind: "OBJECT",
    fields: [
      { name: "field1", type: { kind: "SCALAR", name: "String" } },
      { name: "field2", type: { kind: "OBJECT", name: "NestedType" } },
    ],
  },
  {
    name: "Mutation",
    kind: "OBJECT",
    fields: [{ name: "mutate1", type: { kind: "SCALAR", name: "Boolean" } }],
  },
  {
    name: "String",
    kind: "SCALAR",
    description: "A scalar string type",
  },
];

const renderWithProps = (pathSegments = [{ name: "Root", type: "Root" }]) => {
  const setPathSegments = vi.fn();
  render(
    <ExplorerList
      pathSegments={pathSegments}
      setPathSegments={setPathSegments}
      types={mockTypes}
    />,
  );
  return { setPathSegments };
};

describe("ExplorerList Component", () => {
  it("renders Query and Mutation buttons when at root level", () => {
    renderWithProps();
    expect(screen.getByText(/query: Query/i)).toBeInTheDocument();
    expect(screen.getByText(/mutation: Mutation/i)).toBeInTheDocument();
  });

  it("renders fields of Query when Query is the last segment", () => {
    renderWithProps([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);
    expect(screen.getByText(/field1: String/i)).toBeInTheDocument();
    expect(screen.getByText(/field2: NestedType/i)).toBeInTheDocument();
  });

  it("renders fields of Mutation when Mutation is the last segment", () => {
    renderWithProps([
      { name: "Root", type: "Root" },
      { name: "mutation", type: "Mutation" },
    ]);
    expect(screen.getByText(/mutate1: Boolean/i)).toBeInTheDocument();
  });

  it("handles button click to navigate to the next segment", () => {
    const { setPathSegments } = renderWithProps([
      { name: "Root", type: "Root" },
    ]);
    const queryButton = screen.getByText(/query: Query/i);
    fireEvent.click(queryButton);
    expect(setPathSegments).toHaveBeenCalledWith(expect.any(Function));
  });

  it("updates path segments correctly when a Query button is clicked", () => {
    const { setPathSegments } = renderWithProps();

    const queryButton = screen.getByText(/query: Query/i);
    fireEvent.click(queryButton);

    expect(setPathSegments).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setPathSegments.mock.calls[0][0];
    const newPathSegments = updateFunction([{ name: "Root", type: "Root" }]);
    expect(newPathSegments).toEqual([
      { name: "Root", type: "Root" },
      { type: "Query", name: "query" },
    ]);
  });
  it("navigates correctly when clicking on a field of Mutation type", () => {
    const { setPathSegments } = renderWithProps([
      { name: "Root", type: "Root" },
      { name: "mutation", type: "Mutation" },
    ]);

    const mutate1Button = screen.getByText(/mutate1: Boolean/i);
    expect(mutate1Button).toBeInTheDocument();

    fireEvent.click(mutate1Button);

    expect(setPathSegments).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setPathSegments.mock.calls[0][0];
    const newPathSegments = updateFunction([
      { name: "Root", type: "Root" },
      { name: "mutation", type: "Mutation" },
    ]);
    expect(newPathSegments).toEqual([
      { name: "Root", type: "Root" },
      { name: "mutation", type: "Mutation" },
      { name: "mutate1", type: "Boolean" },
    ]);
  });
  it("handles navigation through nested object types correctly", () => {
    const { setPathSegments } = renderWithProps([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);

    const nestedFieldButton = screen.getByText(/field2: NestedType/i);
    expect(nestedFieldButton).toBeInTheDocument();

    fireEvent.click(nestedFieldButton);

    expect(setPathSegments).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setPathSegments.mock.calls[0][0];
    const newPathSegments = updateFunction([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);
    expect(newPathSegments).toEqual([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
      { name: "field2", type: "NestedType" },
    ]);
  });
  it("handles navigation through nested object types correctly", () => {
    const { setPathSegments } = renderWithProps([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);

    const nestedFieldButton = screen.getByText(/field2: NestedType/i);
    expect(nestedFieldButton).toBeInTheDocument();

    fireEvent.click(nestedFieldButton);

    expect(setPathSegments).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setPathSegments.mock.calls[0][0];
    const newPathSegments = updateFunction([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);
    expect(newPathSegments).toEqual([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
      { name: "field2", type: "NestedType" },
    ]);
  });
  it("handles list types correctly and navigates into nested list fields", () => {
    const { setPathSegments } = renderWithProps([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);

    const nestedFieldButton = screen.getByText(/field2: NestedType/i);
    expect(nestedFieldButton).toBeInTheDocument();

    fireEvent.click(nestedFieldButton);

    expect(setPathSegments).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setPathSegments.mock.calls[0][0];
    const newPathSegments = updateFunction([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);
    expect(newPathSegments).toEqual([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
      { name: "field2", type: "NestedType" },
    ]);
  });
  it("navigates correctly to a nested object field when Query is selected", () => {
    const { setPathSegments } = renderWithProps([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);

    const field2Button = screen.getByText(/field2: NestedType/i);
    expect(field2Button).toBeInTheDocument();

    fireEvent.click(field2Button);

    expect(setPathSegments).toHaveBeenCalledWith(expect.any(Function));

    const updateFunction = setPathSegments.mock.calls[0][0];
    const newPathSegments = updateFunction([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
    ]);
    expect(newPathSegments).toEqual([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
      { name: "field2", type: "NestedType" },
    ]);
  });
  it("displays scalar type description when navigating to a scalar type field", () => {
    const { setPathSegments } = renderWithProps([
      { name: "Root", type: "Root" },
      { name: "query", type: "Query" },
      { name: "field1", type: "String" },
    ]);

    expect(screen.getByText("A scalar string type")).toBeInTheDocument();

    expect(setPathSegments).not.toHaveBeenCalled();
  });
});
