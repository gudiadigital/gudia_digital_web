import { Container } from "@/components/Container";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { fill, serviceTitles } from "@/i18n/dictionaries";
import { pathFor } from "@/i18n/routes";
import type { PageContentProps } from "./types";

export function ContactContent({ locale, dict }: PageContentProps) {
  const { contact } = dict;

  return (
    <>
      <PageHeader
        breadcrumb={{ locale, target: { kind: "page", key: "contact" } }}
        title={contact.title}
        subtitle={contact.subtitle}
      />

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

      {/* Ücretsiz inceleme sitenin ana çağrısı; nasıl işlediği formdan önce
          üç adımda. Metinler sözlükte zaten yazan bilgiden kuruldu. Adımlar
          açılış hareketi olmadan duruyor: sayfanın cevap verdiği soru bu. */}
      <Container className="pb-14">
        <section className="border-line border-t pt-12">
          <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            {contact.review.title}
          </h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {contact.review.steps.map((step, index, steps) => (
              <li key={step.title} className="card rounded-2xl p-6 sm:p-7">
                <span
                  className="text-muted font-mono text-xs tabular-nums tracking-[0.16em]"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(steps.length).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="text-muted mt-3 text-sm leading-relaxed sm:text-base">
                  {fill(step.text, { subject: contact.form.subjectReview })}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </Container>

      <Container className="pb-24">
        <div className="border-line border-t pt-12" data-reveal>
          <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
            {contact.formTitle}
          </h2>
          <div className="mt-8 max-w-3xl">
            <ContactForm
              form={contact.form}
              email={contact.email}
              siteName={dict.meta.siteName}
              serviceTitles={serviceTitles(dict)}
              privacyHref={pathFor(locale, "privacy")}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
