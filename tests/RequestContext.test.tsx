import { render, screen, act, waitFor } from "@testing-library/react";
import { useRequestContext } from "../app/context/RequestContext";
import RequestProvider from "../app/context/RequestContext";
import { vi } from "vitest";

const TestComponent = () => {
  const { rest, graphQL, setRest, setGraphql } = useRequestContext();

  return (
    <div>
      <div data-testid="rest-url">{rest.url}</div>
      <div data-testid="graphQL-url">{graphQL.url}</div>
      <button
        onClick={() =>
          setRest({
            url: "new-rest-url",
            method: "POST",
            headers: [],
            body: "",
            variables: [],
            params: [],
          })
        }
      >
        Set REST URL
      </button>
      <button
        onClick={() =>
          setGraphql({
            url: "new-graphql-url",
            query: "query { ... }",
            response: "",
            headers: [],
            variables: {},
          })
        }
      >
        Set GraphQL URL
      </button>
    </div>
  );
};

describe("RequestProvider", () => {
  beforeAll(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    );
  });

  it("provides context values and updates correctly", async () => {
    render(
      <RequestProvider>
        <TestComponent />
      </RequestProvider>
    );

    expect(screen.getByTestId("rest-url")).toHaveTextContent("");
    expect(screen.getByTestId("graphQL-url")).toHaveTextContent("");

    act(() => {
      screen.getByText("Set REST URL").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("rest-url")).toHaveTextContent("new-rest-url");
    });

    act(() => {
      screen.getByText("Set GraphQL URL").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("graphQL-url")).toHaveTextContent(
        "new-graphql-url"
      );
    });
  });

  it("updates the URL in the history state for REST requests", async () => {
    render(
      <RequestProvider>
        <TestComponent />
      </RequestProvider>
    );

    act(() => {
      screen.getByText("Set REST URL").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("rest-url")).toHaveTextContent("new-rest-url");
    });
  });
});
