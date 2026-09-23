import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import type { PageContentProps } from "./types";

export function ContactContent({ dict }: PageContentProps) {
  const { contact } = dict;

  return (
    <>
      <PageHeader title={contact.title} subtitle={contact.subtitle} />

      {/* E-posta sayfanın birincil eylemi: form doldurmadan da yazılabilsin
          diye adres etiketsiz ve başlık boyunda duruyor. */}
      <Container className="pt-4 pb-14">
        <a
          href={`mailto:${contact.email}`}
          className="mail-link font-display inline-block text-[clamp(1.5rem,4.6vw,3rem)] font-semibold tracking-[-0.035em]"
          data-reveal
        >
          {contact.email}
        </a>

        {/* Ayraç karakteri yok: dar ekranda alt alta düştüğünde satır
            sonunda asılı kalıyordu. Ayrımı boşluk yapıyor. */}
        <dl
          className="text-muted mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm"
          data-reveal
          data-reveal-delay={90}
        >
          {[
            { term: contact.responseLabel, detail: contact.responseValue },
            { term: contact.locationLabel, detail: contact.locationValue },
          ].map((entry) => (
            <div key={entry.term}>
              <dt className="inline">{entry.term}: </dt>
              <dd className="text-ink inline">{entry.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pb-24">
        <div className="border-line border-t pt-12" data-reveal>
          <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            {contact.formTitle}
          </h2>
          <div className="mt-8 max-w-3xl">
            <ContactForm dict={dict} />
          </div>
        </div>
      </Container>
    </>
  );
}
