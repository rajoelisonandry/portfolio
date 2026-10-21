import { describe, expect, it } from "vitest";
import { cn } from "./cn";
import { toMailtoHref, toTelHref } from "./contact";
import { serializeJsonLd } from "./structured-data";

describe("cn", () => {
  it("joins truthy class names and skips falsy ones", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("contact links", () => {
  it("builds a dialable tel: URI from a formatted phone number", () => {
    expect(toTelHref("+261 34 39 244 86")).toBe("tel:+261343924486");
  });

  it("builds a mailto: URI", () => {
    expect(toMailtoHref("me@example.com")).toBe("mailto:me@example.com");
  });
});

describe("serializeJsonLd", () => {
  it("escapes `<` to prevent breaking out of the script tag", () => {
    const output = serializeJsonLd({ name: "</script><script>alert(1)" });
    expect(output).not.toContain("<");
    expect(JSON.parse(output)).toEqual({ name: "</script><script>alert(1)" });
  });
});
