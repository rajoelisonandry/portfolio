import { MailIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { toMailtoHref, toTelHref, toWhatsAppHref } from "@/lib/contact";
import type { Profile } from "@/types/content";

const linkClass = "block transition-colors hover:text-accent";
const buttonClass =
  "inline-flex items-center gap-2 rounded-md border border-accent px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent-soft";

export function ContactSection({ profile }: { profile: Profile }) {
  const mailto = toMailtoHref(profile.email);
  const whatsapp = toWhatsAppHref(profile.whatsapp);

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

      <div className="mt-6 flex flex-wrap gap-3">
        <a href={mailto} className={buttonClass}>
          <MailIcon className="size-4" />
          Me contacter
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer noopener"
          className={buttonClass}
        >
          <WhatsAppIcon className="size-4" />
          WhatsApp
        </a>
      </div>

      <address className="mt-6 space-y-1 text-sm not-italic">
        <a href={mailto} className={linkClass}>
          {profile.email}
        </a>
        {profile.phones.map((phone) => (
          <a key={phone} href={toTelHref(phone)} className={linkClass}>
            {phone}
            {phone === profile.whatsapp && (
              <span className="ml-2 text-xs text-muted">(WhatsApp)</span>
            )}
          </a>
        ))}
      </address>
    </Section>
  );
}
