import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sectionIds } from "@/config/site";
import { getContent } from "@/content";
import { locales } from "@/i18n/config";

/** Guards against content regressions that would only show up visually. */
describe.each(locales)("content (%s)", (locale) => {
  const content = getContent(locale);

  it("references skill icons that exist in /public", () => {
    const missing = content.skillGroups
      .flatMap((group) => group.skills)
      .filter((skill) => !existsSync(join(process.cwd(), "public", skill.icon)))
      .map((skill) => skill.icon);

    expect(missing).toEqual([]);
  });

  it("has unique skill names", () => {
    const names = content.skillGroups.flatMap((group) =>
      group.skills.map((skill) => skill.name),
    );
    expect(new Set(names).size).toBe(names.length);
  });

  it("has unique experience titles (used as React keys)", () => {
    const titles = content.experiences.map(({ title }) => title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("provides at least one typewriter role", () => {
    expect(content.profile.roles.length).toBeGreaterThan(0);
  });

  it("has no empty text", () => {
    const texts = [
      content.profile.title,
      content.profile.tagline,
      ...content.about,
      ...content.experiences.flatMap((e) => [e.title, e.description]),
      ...content.education.map((e) => e.title),
    ];
    expect(texts.every((text) => text.trim().length > 0)).toBe(true);
  });
});

describe("translations", () => {
  const [fr, en] = locales.map(getContent);

  it("keep the same structure in every language", () => {
    expect(en.experiences.map((e) => e.stack)).toEqual(
      fr.experiences.map((e) => e.stack),
    );
    expect(en.skillGroups.length).toBe(fr.skillGroups.length);
    expect(en.education.map((e) => e.year)).toEqual(
      fr.education.map((e) => e.year),
    );
  });

  it("have unique navigation anchors", () => {
    expect(new Set(sectionIds).size).toBe(sectionIds.length);
  });
});
