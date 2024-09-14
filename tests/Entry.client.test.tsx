import { describe, expect, it, vi } from "vitest";

vi.mock("@remix-run/react", () => ({
  RemixBrowser: () => <div>RemixBrowser Mock</div>,
}));

const hydrateRootMock = vi.fn();

vi.mock("react-dom/client", () => ({
  hydrateRoot: hydrateRootMock,
}));

describe("entry.client.tsx", () => {
  it("should call hydrateRoot with the correct arguments", async () => {
    await import("../app/entry.client.tsx");
    expect(hydrateRootMock).toHaveBeenCalledWith(document, expect.anything());
  });
});
