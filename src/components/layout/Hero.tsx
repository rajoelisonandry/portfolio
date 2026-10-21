import Image from "next/image";
import { AnimatedName } from "@/components/ui/AnimatedName";
import {
  ArrowRightIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/ui/icons";
import { Typewriter } from "@/components/ui/Typewriter";
import { HERO_NAME_ID } from "@/config/site";
import { toMailtoHref } from "@/lib/contact";
import type { Profile } from "@/types/content";

/** Left column: identity, pitch, key figures and social links (sticky on desktop). */
export function Hero({ profile }: { profile: Profile }) {
  const socials = [
    { href: profile.socials.github, label: "GitHub", Icon: GitHubIcon },
    { href: profile.socials.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: toMailtoHref(profile.email), label: "E-mail", Icon: MailIcon },
  ];

  return (
    // Height is driven by content (not the viewport) so nothing gets clipped;
    // on short screens the column is compacted via the `short` variant.
    <div className="pt-12 md:pt-20 lg:sticky lg:top-16 lg:w-[48%] lg:self-start lg:py-12 lg:short:py-8">
      <div>
        <Image
          src={profile.photo}
          alt={`Portrait de ${profile.name}`}
          sizes="(min-width: 640px) 160px, 128px"
          placeholder="blur"
          // Above the fold: fetch it early to improve LCP.
          preload
          className="mb-6 size-32 animate-fade-in rounded-full object-cover ring-2 ring-accent ring-offset-4 ring-offset-bg sm:size-40 lg:short:mb-4 lg:short:size-24"
        />
        <AnimatedName id={HERO_NAME_ID} name={profile.name} />
        <Typewriter words={profile.roles} />
        <p className="mt-4 max-w-xs leading-normal">{profile.tagline}</p>

        <dl className="mt-6 flex gap-8">
          {profile.stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse">
              <dt className="text-xs text-muted">{label}</dt>
              <dd className="text-2xl font-bold text-accent">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            Discutons de votre projet
            <ArrowRightIcon className="size-4" />
          </a>
          <a
            href={profile.cvUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-md border border-accent px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft"
          >
            <DownloadIcon className="size-4" />
            Télécharger mon CV
          </a>
        </div>
      </div>

      <ul
        className="mt-8 ml-1 flex items-center gap-5 lg:short:mt-6"
        aria-label="Réseaux sociaux"
      >
        {socials.map(({ href, label, Icon }) => (
          <li key={label}>
            <a
              href={href}
              {...(href.startsWith("http") && {
                target: "_blank",
                rel: "noreferrer noopener",
              })}
              aria-label={label}
              title={label}
              className="block transition-colors hover:text-accent"
            >
              <Icon className="size-6" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
