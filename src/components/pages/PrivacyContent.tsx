import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import type { PageContentProps } from "./types";

/**
 * KVKK aydınlatma metni. Metin sözlükte; burada yalnızca okunur bir ölçüde
 * başlık, paragraf ve madde listesi olarak diziliyor. Hareket yok: yasal
 * metin kaydırırken belirmek yerine hemen okunabilir olmalı.
 */
export function PrivacyContent({ dict }: PageContentProps) {
  const { privacy, contact } = dict;

  return (
    <>
      <PageHeader title={privacy.title} subtitle={privacy.lead} />

      <Container className="pt-2 pb-24">
        <div className="max-w-[70ch]">
          <p className="text-muted text-sm">{privacy.updated}</p>

          {privacy.sections.map((section) => (
            <section
              key={section.title}
              className="border-line mt-10 border-t pt-8"
            >
              <h2 className="font-display text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                {section.title}
              </h2>
              {section.body?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-muted mt-4 text-base leading-[1.75]"
                >
                  {paragraph}
                </p>
              ))}
              {section.items && (
                <ul className="text-muted mt-4 list-disc space-y-2 pl-5 text-base leading-[1.7] marker:text-[var(--accent)]">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.after?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-muted mt-4 text-base leading-[1.75]"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <p className="mt-10">
            <a
              href={`mailto:${contact.email}`}
              className="mail-link font-display text-xl font-semibold tracking-[-0.02em]"
            >
              {contact.email}
            </a>
          </p>
        </div>
      </Container>
    </>
  );
}
