import { render, screen, act } from "@testing-library/react";
import { Layout } from "../app/root";
import { vi } from "vitest";

vi.mock("../app/components/header/Header", () => ({
  __esModule: true,
  default: () => <header>Mock Header</header>,
}));

vi.mock("../app/components/footer/Footer", () => ({
  __esModule: true,
  default: () => <footer>Mock Footer</footer>,
}));

vi.mock("@remix-run/react", () => ({
  ...vi.importActual("@remix-run/react"),
  Meta: () => <meta name="description" content="Mock Meta" />,
  Links: () => <link rel="stylesheet" href="mock" />,
  ScrollRestoration: () => <div>Mock ScrollRestoration</div>,
  Scripts: () => <div>Mock Scripts</div>,
}));

describe("Layout Component", () => {
  it("renders Layout with Header, Footer, and child content", async () => {
    await act(async () => {
      render(
        <Layout>
          <main>Test Child Content</main>
        </Layout>,
      );
    });

    expect(screen.getByText("Mock Header")).toBeInTheDocument();
    expect(screen.getByText("Mock Footer")).toBeInTheDocument();
    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
    expect(screen.getByText("Mock ScrollRestoration")).toBeInTheDocument();
    expect(screen.getByText("Mock Scripts")).toBeInTheDocument();
  });
});
