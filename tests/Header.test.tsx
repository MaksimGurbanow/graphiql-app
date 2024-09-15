import { render, screen, waitFor } from "@testing-library/react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import Header from "../app/components/header/Header";
import i18n from "../app/i18n";
import { describe, it, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "@remix-run/react";
import React from "react";

vi.mock("@remix-run/react", () => ({
  ...vi.importActual("@remix-run/react"),
  useNavigate: vi.fn(),
}));

const mockNavigate = vi.fn();

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  resources: {
    en: {
      translation: {},
    },
  },
});

describe("Header Component", () => {
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders Header component", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </I18nextProvider>,
    );

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /EN/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /RU/i })).toBeInTheDocument();
    expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();
  });

  it("changes language when a different language button is clicked", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </I18nextProvider>,
    );

    const langButtonEN = screen.getByRole("button", { name: /EN/i });
    const langButtonRU = screen.getByRole("button", { name: /RU/i });

    expect(langButtonEN).toHaveAttribute("aria-pressed", "true");
    expect(langButtonRU).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(langButtonRU);

    expect(langButtonEN).toHaveAttribute("aria-pressed", "false");
    expect(langButtonRU).toHaveAttribute("aria-pressed", "true");
  });

  it("opens and closes the menu when the MenuIcon is clicked", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </I18nextProvider>,
    );

    const menuIcon = screen.getByTestId("MenuIcon");

    await userEvent.click(menuIcon);

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    await userEvent.click(menuIcon);

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("handles menu list keyboard interactions", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </I18nextProvider>,
    );

    const menuIcon = screen.getByTestId("MenuIcon");
    await userEvent.click(menuIcon);

    const menu = screen.getByRole("menu");
    menu.focus();

    await userEvent.keyboard("{Tab}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("navigates to the homepage when the logo is clicked", async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </I18nextProvider>,
    );

    const logo = screen.getByAltText(/logo/i);
    await userEvent.click(logo);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
