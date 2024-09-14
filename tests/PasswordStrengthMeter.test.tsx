import { render, screen } from "@testing-library/react";
import PasswordStrengthMeter from "../app/components/passwordStrength/PasswordStrength";
import { describe, it, expect } from "vitest";

describe("PasswordStrengthMeter Component", () => {
  it("renders the PasswordStrengthMeter component", () => {
    render(<PasswordStrengthMeter password="" />);
    expect(screen.getByText(/password strength/i)).toBeInTheDocument();
  });
});
