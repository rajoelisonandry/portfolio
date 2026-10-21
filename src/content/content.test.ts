import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { navigation } from "@/config/site";
import { experiences, profile, skillGroups } from "@/content";

/** Guards against content regressions that would only show up visually. */
describe("content integrity", () => {
  it("references skill icons that exist in /public", () => {
    const missing = skillGroups
      .flatMap((group) => group.skills)
      .filter((skill) => !existsSync(join(process.cwd(), "public", skill.icon)))
      .map((skill) => skill.icon);

    expect(missing).toEqual([]);
  });

  it("has unique skill names", () => {
    const names = skillGroups.flatMap((group) =>
      group.skills.map((skill) => skill.name),
    );
    expect(new Set(names).size).toBe(names.length);
  });

  it("has unique navigation anchors", () => {
    const ids = navigation.map(({ id }) => id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique experience titles (used as React keys)", () => {
    const titles = experiences.map(({ title }) => title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("provides at least one typewriter role", () => {
    expect(profile.roles.length).toBeGreaterThan(0);
  });
});
