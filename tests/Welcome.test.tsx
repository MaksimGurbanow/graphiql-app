import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Welcome from "../app/components/welcome/Welcome";

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: { language: "en" },
    }),
}));

describe("Welcome Component", () => {
    it("renders the welcome title", () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        );
        expect(screen.getByText("welcome.reactGroup")).toBeInTheDocument();
    });

    it("renders team members", () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        );
        expect(screen.getByText("welcome.maksimName")).toBeInTheDocument();
        expect(screen.getByText("welcome.egorName")).toBeInTheDocument();
        expect(screen.getByText("welcome.dmitryName")).toBeInTheDocument();
    });

    it("renders GitHub profile buttons", () => {
        render(
            <MemoryRouter>
                <Welcome />
            </MemoryRouter>
        );
        expect(
            screen.getAllByRole("button", { name: "welcome.githubProfile" })
        ).toHaveLength(3);
    });
});
