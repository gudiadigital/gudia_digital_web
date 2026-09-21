import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import type { PageContentProps } from "./types";

export function ContactContent({ dict }: PageContentProps) {

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