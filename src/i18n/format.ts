/**
 * Fills `{placeholders}` in a translated string.
 * format("Hello {name}", { name: "Andry" }) → "Hello Andry"
 */
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
