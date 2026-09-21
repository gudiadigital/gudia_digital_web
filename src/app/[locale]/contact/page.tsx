import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";

type Params = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return { title: dict.nav.contact, description: dict.contact.subtitle };
}

export default async function ContactPage({ params }: Params) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const details = [
    {
      label: dict.contact.emailLabel,
      value: dict.contact.email,
      href: `mailto:${dict.contact.email}`,
    },
    { label: dict.contact.responseLabel, value: dict.contact.responseValue },
    { label: dict.contact.locationLabel, value: dict.contact.locationValue },
  ];

  return (
    <>
      <PageHeader
        eyebrow={dict.contact.eyebrow}
        title={dict.contact.title}
        subtitle={dict.contact.subtitle}
      />

      <Container className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="space-y-6">
            {details.map((detail) => (
              <div key={detail.label}>
                <p className="text-muted font-display text-xs font-semibold uppercase tracking-[0.18em]">
                  {detail.label}
                </p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-accent mt-1.5 block text-base font-medium transition-opacity hover:opacity-80"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="mt-1.5 text-base">{detail.value}</p>
                )}
              </div>
            ))}
          </div>

          <ContactForm dict={dict} />
        </div>
      </Container>
    </>
  );
}
