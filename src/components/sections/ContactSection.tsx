import { Section } from "@/components/ui/Section";
import { toMailtoHref, toTelHref } from "@/lib/contact";
import type { Profile } from "@/types/content";

const linkClass = "block transition-colors hover:text-accent";

export function ContactSection({ profile }: { profile: Profile }) {
  const mailto = toMailtoHref(profile.email);

  return (
    <Section
      id="contact"
      title="Contact"
      className="mb-0 pb-16 lg:min-h-[50vh]"
    >
      <p className="max-w-md">
        Envie d&apos;échanger sur un projet ou une opportunité ? N&apos;hésitez
        pas à me contacter.
      </p>

      <a
        href={mailto}
        className="mt-6 inline-block rounded-md border border-accent px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent-soft"
      >
        Me contacter
      </a>

      <address className="mt-6 space-y-1 text-sm not-italic">
        <a href={mailto} className={linkClass}>
          {profile.email}
        </a>
        {profile.phones.map((phone) => (
          <a key={phone} href={toTelHref(phone)} className={linkClass}>
            {phone}
          </a>
        ))}
      </address>
    </Section>
  );
}
