import { describe, it, expect } from "vitest";
import { SDKError, SchemaError, devThrowOrFalse } from "../src/errors";

describe("errors", () => {
  it("constructs SDKError with code and message", () => {
    const e = new SDKError("UNKNOWN_EVENT", "Oops");
    expect(e.name).toBe("SDKError");
    expect(e.code).toBe("UNKNOWN_EVENT");
    expect(e.message).toBe("Oops");
  });

  it("constructs SchemaError with SCHEMA_INVALID code", () => {
    const e = new SchemaError("Invalid props");
    expect(e.name).toBe("SchemaError");
    expect(e.code).toBe("SCHEMA_INVALID");
  });

  it("devThrowOrFalse throws in non-production", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "test";
    expect(() => devThrowOrFalse(new Error("boom"))).toThrowError("boom");
    process.env.NODE_ENV = prev;
  });

  it("devThrowOrFalse returns false in production", () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    expect(devThrowOrFalse(new Error("boom"))).toBe(false);
    process.env.NODE_ENV = prev;
  });
});
