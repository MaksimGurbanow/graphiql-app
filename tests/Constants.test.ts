import { defaultMethods } from "../lib/constants";
import { describe, it, expect } from "vitest";
describe("defaultMethods", () => {

    it("should contain all standard HTTP methods", () => {
        expect(defaultMethods).toEqual([
            "GET",
            "POST",
            "DELETE",
            "PUT",
            "PATCH",
            "HEAD",
            "OPTIONS",
        ]);
    });

    it("should have a length of 7", () => {
        expect(defaultMethods).toHaveLength(7);
    });
});
