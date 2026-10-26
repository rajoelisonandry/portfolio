import { describe, expect, it } from "vitest";
import { hasLocale } from "./config";
import { getDictionary } from "./dictionaries";
import { format } from "./format";
import { negotiateLocale, parseAcceptLanguage } from "./negotiate";

describe("parseAcceptLanguage", () => {
  it("orders languages by quality and drops regions", () => {
    expect(parseAcceptLanguage("fr;q=0.5,en-US,en;q=0.9")).toEqual([
      "en",
      "en",
      "fr",
    ]);
  });

  it("handles a missing header", () => {
    expect(parseAcceptLanguage(null)).toEqual([]);
  });
});

describe("negotiateLocale", () => {
  it("honours the visitor's explicit choice first", () => {
    expect(negotiateLocale({ cookie: "en", acceptLanguage: "fr" })).toBe("en");
  });

  it("falls back to the browser preference", () => {
    expect(negotiateLocale({ acceptLanguage: "de,en;q=0.8,fr;q=0.5" })).toBe(
      "en",
    );
  });

  it("defaults to French for unsupported languages", () => {
    expect(negotiateLocale({ cookie: "xx", acceptLanguage: "de" })).toBe("fr");
  });
});

describe("hasLocale", () => {
  it("accepts only supported locales", () => {
    expect(hasLocale("fr")).toBe(true);
    expect(hasLocale("de")).toBe(false);
    expect(hasLocale(undefined)).toBe(false);
  });
});

describe("format", () => {
  it("fills placeholders and keeps unknown ones", () => {
    expect(format("{a} et {b}", { a: 1 })).toBe("1 et {b}");
  });
});

describe("dictionaries", () => {
  /** Collects every leaf path of a nested dictionary. */
  const keys = (value: unknown, prefix = ""): string[] =>
    typeof value === "object" && value !== null
      ? Object.entries(value).flatMap(([key, child]) =>
          keys(child, prefix ? `${prefix}.${key}` : key),
        )
      : [prefix];

  it("has the same keys in every language", () => {
    expect(keys(getDictionary("en")).sort()).toEqual(
      keys(getDictionary("fr")).sort(),
    );
  });
});
