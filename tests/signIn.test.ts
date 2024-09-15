import { vi } from "vitest";
import signUp from "../app/utils/signIn";
import { signInWithEmailAndPassword } from "firebase/auth";

vi.mock("firebase/auth", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
    getAuth: vi.fn(() => ({})),
  };
});

describe("Firebase function", () => {
  it("Should run firrebase function", async () => {
    await signUp("linqek1029@gmail.com", "Z@q1aq1x");
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
});
