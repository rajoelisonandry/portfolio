import { ChatWidget } from "@/components/chat/ChatWidget";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { Spotlight } from "@/components/layout/Spotlight";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import {
  about,
  chatSuggestions,
  education,
  experiences,
  languages,
  profile,
  skillGroups,
} from "@/content";
import { buildPersonJsonLd, serializeJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  const jsonLd = buildPersonJsonLd(profile, skillGroups);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <Spotlight />
      <Header name={profile.name} photo={profile.photo} />

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 pt-16 md:px-12 lg:px-24">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Hero profile={profile} />

          <main id="main-content" className="pt-16 lg:w-[52%] lg:py-20">
            <AboutSection
              paragraphs={about}
              skillGroups={skillGroups}
              languages={languages}
            />
            <ExperienceSection experiences={experiences} />
            <EducationSection education={education} />
            <ContactSection profile={profile} />
          </main>
        </div>
      </div>

      <ChatWidget firstName={profile.firstName} suggestions={chatSuggestions} />
    </>
  );
}
