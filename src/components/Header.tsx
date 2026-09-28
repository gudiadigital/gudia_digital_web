"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { locales, type Locale } from "@/i18n/config";
import {
  guidePath,
  pathFor,
  parsePath,
  projectPath,
  type RouteKey,
} from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

const navKeys: Array<{ key: RouteKey; label: keyof Dictionary["nav"] }> = [
  { key: "about", label: "about" },
  { key: "services", label: "services" },
  { key: "projects", label: "projects" },
  { key: "contact", label: "contact" },
];

export function Header({
  locale,
  nav,
  siteName,
  guideSlugs,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
  siteName: string;
  /**
   * Yayındaki rehberlerin iki dildeki slug'ları; dil değiştirici aynı
   * rehberin öbür dildekine gidebilsin diye. Rehber verisinin kendisi
   * istemciye gelmiyor (taslaklar tarayıcı paketine girmesin).
   */
  guideSlugs: Array<Record<Locale, string>>;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const current = parsePath(pathname);

  const isActive = (key: RouteKey) => current?.key === key;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-space/90 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        <Link
          href={pathFor(locale)}
          className="hover:opacity-85 transition-opacity"
          /* Erişilebilir ad görünen yazıyı (marka adı) içermeli; sesle
             "Gudia Dijital'e tıkla" diyen kullanıcı bağlantıyı bulabilsin. */
          aria-label={`${siteName} — ${nav.home}`}
        >
          <Logo siteName={siteName} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label={nav.menu}>
          {navKeys.map(({ key, label }) => (
            <Link
              key={key}
              href={pathFor(locale, key)}
              aria-current={isActive(key) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(key)
                  ? "text-ink bg-surface-soft"
                  : "text-muted hover:text-ink"
              }`}
            >
              {nav[label]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitch
            locale={locale}
            label={nav.langLabel}
            guideSlugs={guideSlugs}
          />

          <Link
            href={pathFor(locale, "contact")}
            className="bg-accent hidden rounded-full px-4 py-2 text-sm font-semibold text-on-accent shadow-[var(--shadow-button)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] sm:inline-flex"
          >
            {nav.cta}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? nav.close : nav.menu}
            className="border-line text-ink inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-line bg-space/95 border-t backdrop-blur-md md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navKeys.map(({ key, label }) => (
              <Link
                key={key}
                href={pathFor(locale, key)}
                onClick={() => setOpen(false)}
                aria-current={isActive(key) ? "page" : undefined}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  isActive(key) ? "text-ink bg-surface-soft" : "text-muted"
                }`}
              >
                {nav[label]}
              </Link>
            ))}
            <Link
              href={pathFor(locale, "contact")}
              onClick={() => setOpen(false)}
              className="bg-accent mt-2 rounded-full px-4 py-3 text-center text-sm font-semibold text-on-accent"
            >
              {nav.cta}
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}

function LocaleSwitch({
  locale,
  label,
  guideSlugs,
}: {
  locale: Locale;
  label: string;
  guideSlugs: Array<Record<Locale, string>>;
}) {
  const pathname = usePathname();
  const current = parsePath(pathname);
  // Rehber slug'ı dile göre değişiyor; bulunduğumuz rehberin öbür dildeki adı.
  const guide = current?.guide
    ? guideSlugs.find((slugs) => slugs[current.locale] === current.guide)
    : undefined;

  const hrefFor = (candidate: Locale) => {
    if (current?.project) return projectPath(candidate, current.project);
    if (guide) return guidePath(candidate, guide[candidate]);
    return pathFor(candidate, current?.key ?? "home", current?.service);
  };

  return (
    <div
      className="border-line bg-surface-soft flex items-center rounded-full border p-0.5"
      role="group"
      aria-label={label}
    >
      {locales.map((candidate) => (
        <Link
          key={candidate}
          /* Proje ya da rehber detayındayken dil değişince aynı sayfada kalınıyor. */
          href={hrefFor(candidate)}
          hrefLang={candidate}
          /*
           * Statik export'ta Next, dinamik segmentli rotalar için geçersiz bir
           * RSC yolu (__next.$d$locale.txt) isteyip 404 alıyor. Site zaten
           * tamamen statik, ön getirmenin kazancı yok; kapatınca konsol temiz.
           */
          prefetch={false}
          aria-current={candidate === locale ? "true" : undefined}
          /* Dokunma hedefi: telefonda 24px çok küçüktü, py ile 40px'e çıktı. */
          className={`rounded-full px-3 py-2.5 text-xs font-semibold uppercase leading-none transition-colors sm:px-2.5 sm:py-1 ${
            candidate === locale
              ? "bg-accent text-on-accent"
              : "text-muted hover:text-ink"
          }`}
        >
          {candidate}
        </Link>
      ))}
    </div>
  );
}
