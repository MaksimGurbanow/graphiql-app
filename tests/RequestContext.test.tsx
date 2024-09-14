import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import {
  RequestProvider,
  useRequestContext,
} from "../app/context/RequestContext";

describe("RequestContext", () => {
  it("should throw an error when useRequestContext is used outside of a provider", () => {
    const TestComponent = () => {
      try {
        useRequestContext();
      } catch (error) {
        expect(error.message).toBe(
          "setRest or setGraphql should be used within a provider"
        );
      }
      return null;
    };

    render(<TestComponent />);
  });

  it("should provide default values for rest and graphQL", () => {
    const TestComponent = () => {
      const { rest, graphQL } = useRequestContext();
      return (
        <div>
          <div data-testid="rest-url">{rest.url}</div>
          <div data-testid="graphql-url">{graphQL.url}</div>
        </div>
      );
    };

    render(
      <RequestProvider>
        <TestComponent />
      </RequestProvider>
    );

    expect(screen.getByTestId("rest-url")).toHaveTextContent("");
    expect(screen.getByTestId("graphql-url")).toHaveTextContent("");
  });

  it("should update rest state correctly", () => {
    const TestComponent = () => {
      const { rest, setRest } = useRequestContext();

      return (
        <div>
          <button
            onClick={() =>
              setRest((prev) => ({ ...prev, url: "https://example.com" }))
            }
          >
            Update Rest
          </button>
          <div data-testid="rest-url">{rest.url}</div>
        </div>
      );
    };

    render(
      <RequestProvider>
        <TestComponent />
      </RequestProvider>
    );

    act(() => {
      screen.getByText("Update Rest").click();
    });

    expect(screen.getByTestId("rest-url")).toHaveTextContent(
      "https://example.com"
    );
  });

  it("should update graphQL state correctly", () => {
    const TestComponent = () => {
      const { graphQL, setGraphql } = useRequestContext();

      return (
        <div>
          <button
            onClick={() =>
              setGraphql((prev) => ({ ...prev, url: "https://graphql.com" }))
            }
          >
            Update GraphQL
          </button>
          <div data-testid="graphql-url">{graphQL.url}</div>
        </div>
      );
    };

    render(
      <RequestProvider>
        <TestComponent />
      </RequestProvider>
    );

    act(() => {
      screen.getByText("Update GraphQL").click();
    });

    expect(screen.getByTestId("graphql-url")).toHaveTextContent(
      "https://graphql.com"
    );
  });
});
