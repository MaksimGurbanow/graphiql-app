import { render, screen, fireEvent } from "@testing-library/react";
import ExplorerList from "../app/components/explorerList/ExplorerList";
import { IntrospectionObjectType, IntrospectionScalarType } from "graphql";
import "@testing-library/jest-dom";

const mockTypes: (IntrospectionObjectType | IntrospectionScalarType)[] = [
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
    />
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
});
