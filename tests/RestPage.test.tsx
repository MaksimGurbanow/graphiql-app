import { describe, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { IsLogedInContext } from "../app/context/loginContext";
import RequestProvider from "../app/context/RequestContext";
import React from "react";
import RemixStub from "./remixStub";
import {
  base64ToString,
  stringToBase64,
} from "../app/utils/encodeDecodeStrings";
import { loader } from "../app/routes/($method).($requestUrl).($body)/route";
import { LoaderFunctionArgs } from "@remix-run/node";
import format from "html-format";
import userEvent from "@testing-library/user-event";

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

vi.mock(
  import("html-format", async (importOriginal) => {
    const actual = await importOriginal();
    return {
      ...actual,
      format: vi.fn(),
    } as ImportCallOptions;
  }),
);

describe("RestPage tests", () => {
  /*it("Should redirect if user is not logined", async () => {
    render(
      <RequestProvider>
        <IsLogedInContext.Provider value={[false, (_) => {}, false]}>
          <RemixStub initialEntries={["/GET"]} />
        </IsLogedInContext.Provider>
      </RequestProvider>,
    );
    const page = await screen.findAllByTestId("welcome-page");
    expect(page).toBeDefined();
  });*/
  describe("Must have render several component properly", () => {
    beforeEach(() => {
      render(
        <RequestProvider>
          <IsLogedInContext.Provider value={[true, (_) => {}, false]}>
            <RemixStub initialEntries={["/GET"]} />
          </IsLogedInContext.Provider>
        </RequestProvider>,
      );
    });

    it("Should not redirect if user is logined", async () => {
      const page = await screen.findAllByTestId("rest-page");
      expect(page).toBeDefined();
    });
    it("Should have method, url input, tabs, params editor, headers editor, body editor components", async () => {
      const urlInput = await screen.findByTestId("url-input");
      const editorList = await screen.findByTestId("switch-editor-list");
      const editorItemHeaders = await screen.findByTestId("rest.headers");
      const editorItemParams = await screen.findByTestId("rest.params");
      const editorItemBody = await screen.findByTestId("rest.body");
      const editorItemVariables = await screen.findByTestId("rest.variables");

      expect(await screen.findByTestId("header-editor")).toBeDefined();
      await act(async () => {
        fireEvent.click(editorItemParams);
        expect(screen.queryByTestId("params-editor")).toBeDefined();
      });
      await act(async () => {
        fireEvent.click(editorItemVariables);
        expect(screen.queryByTestId("variables-editor")).toBeDefined();
      });
      await act(async () => {
        fireEvent.click(editorItemBody);
        expect(screen.queryByTestId("body-editor")).toBeDefined();
      });
      expect(screen.queryByTestId("header-editor")).toBeNull();
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
    render(
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
      </RequestProvider>,
    );
    expect(screen.queryByTestId("response-block")).toBeDefined();
  });
  it("Should contain error message if there is an error", async () => {
    render(
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
      </RequestProvider>,
    );
    expect(screen.queryByTestId("error-message")).toBeDefined();
  });
  it("Should type into input field", async () => {
    render(
      <RequestProvider>
        <IsLogedInContext.Provider value={[true, (_) => {}, false]}>
          <RemixStub initialEntries={["/GET"]} />
        </IsLogedInContext.Provider>
      </RequestProvider>,
    );
    const urlInput = await screen.findByTestId("url-input");
    await act(async () => {
      await userEvent.type(
        urlInput,
        "https://jsonplaceholder.typicode.com/todos/1",
      );
      expect((urlInput as HTMLInputElement).value).toBe(
        "https://jsonplaceholder.typicode.com/todos/1",
      );
    });
  });
  it("Should navigate if send button was clicked", async () => {
    render(
      <RequestProvider>
        <IsLogedInContext.Provider value={[true, (_) => {}, false]}>
          <RemixStub initialEntries={["/GET"]} />
        </IsLogedInContext.Provider>
      </RequestProvider>,
    );
    const sendButton = await screen.findByText("rest.sendButton");
    const urlInput = await screen.findByTestId("url-input");
    await act(async () => {
      await userEvent.type(
        urlInput,
        "https://jsonplaceholder.typicode.com/todos/1",
      );
      expect((urlInput as HTMLInputElement).value).toBe(
        "https://jsonplaceholder.typicode.com/todos/1",
      );
    });
    await act(async () => {
      fireEvent.click(sendButton);
    });
  });
});

describe("Test loader function", () => {
  it("Should return appropriate data", async () => {
    const response = await (
      await loader({
        params: {
          method: "GET",
          requestUrl: stringToBase64(
            "https://jsonplaceholder.typicode.com/todos/1",
          ),
          body: stringToBase64(JSON.stringify({ body: "", variables: [] })),
        },
        context: {},
        request: {
          url: "http://localhost:4000?content-type=application/json",
        } as LoaderFunctionArgs["request"],
      })
    ).json();
    expect(response).toBeDefined();
    expect(response).toHaveProperty("url");
    expect(response).toHaveProperty("body");
    expect(response).toHaveProperty("variables");
    expect(response).toHaveProperty("headers");
    expect(response).toHaveProperty("response");
  });
  it("Should return data with error message if fetch failed", async () => {
    const response = await (
      await loader({
        params: {
          method: "GET",
          requestUrl: stringToBase64("asasasas"),
          body: stringToBase64(JSON.stringify({ body: "", variables: [] })),
        },
        context: {},
        request: {
          url: "http://localhost:4000?content-type=application/json",
        } as LoaderFunctionArgs["request"],
      })
    ).json();
    expect(response).toHaveProperty("error");
    expect(response.error).toBe("Some error happened");
  });
  it("Should return body in text format if it's not possible to parse", async () => {
    await (
      await loader({
        params: {
          method: "POST",
          requestUrl: stringToBase64("https://dummyjson.com/products"),
        },
        context: {},
        request: {
          url: "http://localhost:4000?content-type=application/json",
        } as LoaderFunctionArgs["request"],
      })
    ).json();
    expect(format).toHaveBeenCalled();
  });
});

describe("Base 64 to string", () => {
  it("Should convert to string", () => {
    const base64 = stringToBase64("local");
    const str = base64ToString(base64);
    expect(str).toBe("local");
  });
});
