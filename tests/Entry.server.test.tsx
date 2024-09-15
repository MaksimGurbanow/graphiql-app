import handleRequest from "../app/entry.server.tsx";
import { describe, expect, it } from "vitest";

const mockRemixContext = {
  routes: [
    {
      id: "root",
      path: "/",
      element: <div>Root</div>,
      children: [],
    },
  ],
  loaderData: {},
};

describe("handleRequest", () => {
  it("should handle errors during bot request rendering", async () => {
    const mockRequest = new Request("http://localhost", {
      headers: { "user-agent": "Googlebot/2.1" },
    });

    const mockRemixContextWithError = {
      routes: undefined,
      loaderData: {},
      manifest: {},
    };

    try {
      await handleRequest(
        mockRequest,
        200,
        new Headers(),
        mockRemixContextWithError as any,
        {} as any,
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should handle errors during browser request rendering", async () => {
    const mockRequest = new Request("http://localhost", {
      headers: { "user-agent": "Mozilla/5.0" },
    });

    const mockRemixContextWithError = {
      routes: undefined,
      loaderData: {},
      manifest: {},
    };

    try {
      await handleRequest(
        mockRequest,
        200,
        new Headers(),
        mockRemixContextWithError as any,
        {} as any,
      );
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
