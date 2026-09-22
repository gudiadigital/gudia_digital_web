import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { serviceSlugs, type Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="border-line mt-24 border-t">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo siteName={dict.meta.siteName} />
            <p className="text-muted mt-4 max-w-xs text-sm leading-relaxed">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="font-display mb-4 text-sm font-semibold">
              {dict.footer.servicesTitle}
            </h3>
            <ul className="space-y-2.5">
              {serviceSlugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={pathFor(locale, "services", slug)}
                    className="text-muted hover:text-ink text-sm transition-colors"
                  >
                    {dict.services.items[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-sm font-semibold">
              {dict.footer.companyTitle}
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={pathFor(locale, "about")}
                  className="text-muted hover:text-ink text-sm transition-colors"
                >
                  {dict.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href={pathFor(locale, "projects")}
                  className="text-muted hover:text-ink text-sm transition-colors"
                >
                  {dict.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  href={pathFor(locale, "contact")}
                  className="text-muted hover:text-ink text-sm transition-colors"
                >
                  {dict.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display mb-4 text-sm font-semibold">
              {dict.footer.contactTitle}
            </h3>
            <a
              href={`mailto:${dict.contact.email}`}
              className="text-accent text-sm transition-opacity hover:opacity-80"
            >
              {dict.contact.email}
            </a>
            <p className="text-muted mt-2 text-sm">
              {dict.contact.locationValue}
            </p>
          </div>
        </div>

        <div className="border-line text-muted mt-12 flex flex-col gap-2 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {dict.meta.siteName}. {dict.footer.rights}
          </p>
          <p className="max-w-md">
            <span className="text-ink/70">{dict.footer.privacyTitle}:</span>{" "}
            {dict.footer.privacyNote}
          </p>
        </div>
      </Container>
    </footer>
  );
}
