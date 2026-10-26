import { notFound } from "next/navigation";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Spotlight } from "@/components/layout/Spotlight";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { siteConfig } from "@/config/site";
import { getContent } from "@/content";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { buildPersonJsonLd, serializeJsonLd } from "@/lib/structured-data";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const content = getContent(lang);
  const t = getDictionary(lang);
  const { profile } = content;
  const jsonLd = buildPersonJsonLd(
    profile,
    content.skillGroups,
    `${siteConfig.url}/${lang}`,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Spotlight />
      <Header
        name={profile.name}
        photo={profile.photo}
        locale={lang}
        labels={{ nav: t.nav, theme: t.theme }}
      />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 pt-16 md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Hero profile={profile} labels={t.hero} />

          <main id="main-content" className="pt-16 lg:w-[52%] lg:py-20">
            <AboutSection
              title={t.nav.about}
              languagesHeading={t.about.languages}
              paragraphs={content.about}
              skillGroups={content.skillGroups}
              languages={content.languages}
            />
            <ExperienceSection
              title={t.nav.experience}
              stackLabel={t.experience.stack}
              experiences={content.experiences}
            />
            <EducationSection
              title={t.nav.education}
              education={content.education}
            />
            <ContactSection
              title={t.nav.contact}
              labels={t.contact}
              profile={profile}
            />
          </main>
        </div>
      </div>

      <ChatWidget
        firstName={profile.firstName}
        suggestions={content.chatSuggestions}
        locale={lang}
        labels={t.chat}
      />
    </>
  );
}
