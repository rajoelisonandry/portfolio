import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import { identity } from "@/content/shared";
import { defaultLocale, hasLocale, locales } from "@/i18n/config";

export const alt = identity.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

/** Social preview card (LinkedIn, Slack, X…), generated per language at build time. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { profile } = getContent(hasLocale(lang) ? lang : defaultLocale);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 96,
        background: "#0e1412",
        color: "#e6ebe8",
      }}
    >
      <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
        {profile.name}
      </div>
      <div style={{ marginTop: 16, fontSize: 40, color: "#6ee7b7" }}>
        {profile.title}
      </div>
      <div
        style={{ marginTop: 40, fontSize: 30, color: "#a0aaa5", maxWidth: 900 }}
      >
        {profile.tagline}
      </div>
    </div>,
    size,
  );
}
