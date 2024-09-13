import { render, screen } from "@testing-library/react";
import Response from "../app/components/response/Response";
import { describe, it, expect } from "vitest";

describe("Response Component", () => {
    it("renders the Response component", () => {
        render(<Response />);
        expect(screen.getByText(/response/i)).toBeInTheDocument();
    });
});
