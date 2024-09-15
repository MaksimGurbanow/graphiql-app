import { describe, it, expect, vi } from "vitest";
import signUp from "../app/utils/signUp";
import { createUserWithEmailAndPassword } from "firebase/auth";

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    createUserWithEmailAndPassword: vi.fn(),
    getAuth: vi.fn(() => ({})),
  };
});

describe("signUp function", () => {
  it("should create a new user with valid email and password", async () => {
    const mockUserCredential = {
      user: {
        uid: "12345",
        email: "test@example.com",
      },
    };

    createUserWithEmailAndPassword.mockResolvedValue(mockUserCredential);

    const result = await signUp("test@example.com", "Password1!");

    expect(result).toEqual(mockUserCredential);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      "test@example.com",
      "Password1!",
    );
  });

  it("should throw an error with invalid email and password", async () => {
    const errorMessage = "Firebase: Error (auth/invalid-email).";
    createUserWithEmailAndPassword.mockRejectedValue(new Error(errorMessage));

    await expect(signUp("invalid-email", "short")).rejects.toThrow(
      errorMessage,
    );
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      "invalid-email",
      "short",
    );
  });
});
