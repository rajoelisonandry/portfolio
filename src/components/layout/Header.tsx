"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { HeaderIdentity } from "@/components/layout/HeaderIdentity";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { navigation, sectionIds, type SectionId } from "@/config/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";

const MOBILE_MENU_ID = "mobile-menu";

interface NavLinksProps {
  active: SectionId;
  onNavigate?: () => void;
  className?: string;
  linkClassName?: string;
}

function NavLinks({
  active,
  onNavigate,
  className,
  linkClassName,
}: NavLinksProps) {
  return (
    <ul className={className}>
      {navigation.map(({ id, label }) => {
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
              {label}
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
}

export function Header({ name, photo }: HeaderProps) {
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
        <HeaderIdentity name={name} photo={photo} />

        <nav
          aria-label="Navigation principale"
          className="ml-auto hidden md:block"
        >
          <NavLinks active={active} className="mr-4 flex items-center gap-8" />
        </nav>

        <ThemeToggle className="ml-auto md:ml-0" />

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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

      {menuOpen && (
        <nav
          id={MOBILE_MENU_ID}
          aria-label="Navigation mobile"
          className="border-t border-line/60 md:hidden"
        >
          <NavLinks
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
