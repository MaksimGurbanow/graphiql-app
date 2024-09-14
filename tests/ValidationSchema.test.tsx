import { describe, it, expect } from "vitest";
import { validationSchema } from "../app/utils/validationSchema";

describe("Validation Schema", () => {
  it("should validate correct email and password", async () => {
    const validData = {
      email: "test@example.com",
      password: "Password1!",
    };

    await expect(validationSchema.validate(validData)).resolves.toBe(validData);
  });

  it("should show error for invalid email", async () => {
    const invalidEmail = {
      email: "invalid-email",
      password: "Password1!",
    };

    await expect(validationSchema.validate(invalidEmail)).rejects.toThrow(
      'E-mail must be in format "example@example.com"'
    );
  });

  it("should show error when email is missing", async () => {
    const missingEmail = {
      password: "Password1!",
    };

    await expect(validationSchema.validate(missingEmail)).rejects.toThrow(
      "E-mail is required"
    );
  });

  it("should show error when password is missing", async () => {
    const missingPassword = {
      email: "test@example.com",
    };

    await expect(validationSchema.validate(missingPassword)).rejects.toThrow(
      "Password is required"
    );
  });

  it("should show error when password is too short", async () => {
    const shortPassword = {
      email: "test@example.com",
      password: "Pass1!",
    };

    await expect(validationSchema.validate(shortPassword)).rejects.toThrow(
      "Password should be 8 charachters"
    );
  });

  it("should show error when password does not contain uppercase letter", async () => {
    const noUppercase = {
      email: "test@example.com",
      password: "password1!",
    };

    await expect(validationSchema.validate(noUppercase)).rejects.toThrow(
      "Must contain 1 uppercase"
    );
  });

  it("should show error when password does not contain lowercase letter", async () => {
    const noLowercase = {
      email: "test@example.com",
      password: "PASSWORD1!",
    };

    await expect(validationSchema.validate(noLowercase)).rejects.toThrow(
      "Must contain 1 lowercase"
    );
  });

  it("should show error when password does not contain number", async () => {
    const noNumber = {
      email: "test@example.com",
      password: "Password!",
    };

    await expect(validationSchema.validate(noNumber)).rejects.toThrow(
      "Must contain 1 number"
    );
  });

  it("should show error when password does not contain special character", async () => {
    const noSpecialChar = {
      email: "test@example.com",
      password: "Password1",
    };

    await expect(validationSchema.validate(noSpecialChar)).rejects.toThrow(
      "Must contain 1 special character"
    );
  });
});
