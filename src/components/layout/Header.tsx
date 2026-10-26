"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { HeaderIdentity } from "@/components/layout/HeaderIdentity";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { sectionIds, type SectionId } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

const MOBILE_MENU_ID = "mobile-menu";

type NavLabels = Dictionary["nav"];

interface NavLinksProps {
  labels: NavLabels;
  active: SectionId;
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
}

function NavLinks({
  labels,
  active,
  onNavigate,
  className,
  linkClassName,
}: NavLinksProps) {
  return (
    <ul className={className}>
      {sectionIds.map((id) => {
        const isActive = id === active;
        return (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={onNavigate}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "text-xs font-bold tracking-widest uppercase transition-colors hover:text-accent",
                isActive ? "text-accent" : "text-muted",
                linkClassName,
              )}
            >
              {labels[id]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

interface HeaderProps {
  name: string;
  photo: StaticImageData;
  locale: Locale;
  labels: Pick<Dictionary, "nav" | "theme">;
}

export function Header({ name, photo, locale, labels }: HeaderProps) {
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-2 px-6 md:px-12 lg:px-24">
        <HeaderIdentity
          name={name}
          photo={photo}
          backToTopLabel={labels.nav.backToTop}
        />

        <nav aria-label={labels.nav.main} className="ml-auto hidden md:block">
          <NavLinks
            labels={labels.nav}
            active={active}
            className="mr-4 flex items-center gap-8"
          />
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <LanguageSwitcher current={locale} label={labels.nav.language} />
          <ThemeToggle label={labels.theme.toggle} title={labels.theme.title} />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? labels.nav.closeMenu : labels.nav.openMenu}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            className="rounded-full p-2 transition-colors hover:bg-accent-soft hover:text-accent md:hidden"
          >
            {menuOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id={MOBILE_MENU_ID}
          aria-label={labels.nav.mobile}
          className="border-t border-line/60 md:hidden"
        >
          <NavLinks
            labels={labels.nav}
            active={active}
            onNavigate={closeMenu}
            className="flex flex-col px-6 py-2"
            linkClassName="block py-3"
          />
        </nav>
      )}
    </header>
  );
}
