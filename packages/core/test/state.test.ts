import { describe, it, expect } from "vitest";
import { getContext, initState, setUser, resetIdentity } from "../src/state";
import { configure, identify, reset } from "../src/api";

describe("state (internal) + identity (public)", () => {
  it("initState sets app info in context", () => {
    initState({ name: "demo", version: "0.0.1", env: "dev" });
    const ctx = getContext();
    expect(ctx.app?.name).toBe("demo");
    expect(ctx.app?.version).toBe("0.0.1");
    expect(ctx.app?.env).toBe("dev");
    expect(ctx.sessionId).toBeTruthy();
    expect(ctx.anonId).toBeTruthy();
  });

  it("setUser populates userId", () => {
    setUser("user_123", { plan: "pro" });
    const ctx = getContext();
    expect(ctx.userId).toBe("user_123");
  });

  it("resetIdentity clears userId and traits", () => {
    resetIdentity();
    const ctx = getContext();
    expect(ctx.userId).toBeUndefined();
  });

  it("public identify/reset affect context", () => {
    configure({ app: { name: "pubapp" } });
    identify("user_pub", { alpha: true });
    expect(getContext().userId).toBe("user_pub");
    reset();
    expect(getContext().userId).toBeUndefined();
  });
});
