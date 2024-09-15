import { describe, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IsLogedInContext } from "../app/context/loginContext";
import RequestProvider from "../app/context/RequestContext";
import React from "react";
import RemixStub from "./remixStub";
import { stringToBase64 } from "../app/utils/encodeDecodeStrings";

vi.mock(import("react-i18next"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
    }),
  };
});

vi.mock(import("@remix-run/react"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("RestPage tests", () => {
  it("Should redirect if user is not logined", async () => {
    render(
      <RequestProvider>
        <IsLogedInContext.Provider value={[false, (_) => {}, false]}>
          <RemixStub initialEntries={["/GRAPHQL"]} />
        </IsLogedInContext.Provider>
      </RequestProvider>,
    );
    const page = await screen.findAllByTestId("welcome-page");
    expect(page).toBeDefined();
  });
  describe("Must have render several component properly", () => {
    beforeEach(() => {
      render(
        <RequestProvider>
          <IsLogedInContext.Provider value={[true, (_) => {}, false]}>
            <RemixStub initialEntries={["/GRAPHQL"]} />
          </IsLogedInContext.Provider>
        </RequestProvider>,
      );
    });

    it("Should not redirect if user is logined", async () => {
      const page = await screen.findAllByTestId("graphql-page");
      expect(page).toBeDefined();
    });
    it("Should have method, url input, tabs, params editor, headers editor, body editor components", async () => {
      const urlInput = await screen.findByTestId("url-input");
      const editorList = await screen.findByTestId("switch-editor-list");
      const editorItemHeaders = await screen.findByTestId("graphiql.headers");
      const editorItemBody = await screen.findByTestId("graphiql.query");
      const editorItemVariables =
        await screen.findByTestId("graphiql.variables");

      expect(await screen.findByTestId("header-editor")).toBeDefined();
      act(async () => {
        fireEvent.click(editorItemVariables);
        expect(await screen.findByTestId("variables-editor")).toBeDefined();
      });
      act(async () => {
        fireEvent.click(editorItemBody);
        expect(await screen.findByTestId("body-editor")).toBeDefined();
      });
      expect(urlInput).toBeDefined();
      expect(editorList).toBeDefined();
      expect(editorItemHeaders).toBeDefined();
      expect(editorItemBody).toBeDefined();
      expect(editorItemVariables).toBeDefined();
    });
    it("Shouldn't contain response if no response was provided", async () => {
      expect(screen.queryByTestId("response-block")).toBeNull();
    });
  });
  it("Should contain response if there is a response", async () => {
    <RequestProvider>
      <IsLogedInContext.Provider value={[true, (_) => {}, false]}>
        <RemixStub
          initialEntries={[
            `/GET/${stringToBase64(
              "https://jsonplaceholder.typicode.com/todos/1",
            )}`,
          ]}
        />
      </IsLogedInContext.Provider>
    </RequestProvider>;
    expect(screen.queryByTestId("response-block")).toBeDefined();
  });
  it("Should contain error message if there is an error", async () => {
    <RequestProvider>
      <IsLogedInContext.Provider value={[true, (_) => {}, false]}>
        <RemixStub
          initialEntries={[
            `/GET/${stringToBase64(
              "https://jsonplaceholder.typicode.com/ts/1",
            )}`,
          ]}
        />
      </IsLogedInContext.Provider>
    </RequestProvider>;
    expect(screen.queryByTestId("error-message")).toBeDefined();
  });
});
