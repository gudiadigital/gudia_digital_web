"use client";

import { useEffect, useRef, useState } from "react";
import { serviceSlugs } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

type Draft = { subject: string; body: string };

/**
 * Form mesajı hazırlar, ziyaretçi nereden göndereceğini seçer.
 *
 * Önceden Gönder doğrudan mailto açıyordu. Mac'te Mail hazır olduğu için
 * çalışıyordu ama Windows'ta çoğu zaman varsayılan e-posta uygulaması
 * kurulu değil ve bağlantı hiçbir şey açmıyordu. Şimdi hazır mesaj için
 * Gmail, Outlook, e-posta uygulaması ve kopyalama seçenekleri sunuluyor;
 * hepsi sunucu gerektirmiyor, site yine hiçbir veri toplamıyor.
 */
export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<Draft | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = t.required;
    if (!email) nextErrors.email = t.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = t.invalidEmail;
    if (!message) nextErrors.message = t.required;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = [`${t.name}: ${name}`, `${t.email}: ${email}`, "", message].join(
      "\n",
    );
    setDraft({ subject: subject || dict.meta.siteName, body });
  }

  /* Ücretsiz inceleme başta ve varsayılan: sayfanın asıl çağrısı bu. */
  const subjects = [
    t.subjectReview,
    ...serviceSlugs.map((slug) => dict.services.items[slug].title),
    t.subjectOther,
  ];

  const fieldClass =
    "border-line bg-surface-soft text-ink placeholder:text-muted/70 w-full rounded-xl border px-4 py-3 text-sm transition-colors focus:border-[var(--accent)]";

  return (
    <form
      onSubmit={handleSubmit}
      /* Mesaj değişince hazır taslak eskiyor; panel kapanır, Gönder'e
         yeniden basılınca güncel haliyle açılır. */
      onChange={() => setDraft(null)}
      noValidate
      className="card rounded-2xl p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t.name} htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            className={fieldClass}
          />
        </Field>

        <Field label={t.email} htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            className={fieldClass}
          />
        </Field>
      </div>

      {/*
        Konu seçimi native <select> değil, radyo düğmelerinden oluşan bir
        seçim ızgarası. Native açılır liste işletim sisteminin kendi
        penceresi olarak çiziliyor; Windows'ta gri sistem kutusu çıkıp
        sayfanın tasarımıyla hiç uyuşmuyordu. Radyo düğmeleri her yerde
        aynı görünüyor ve klavyeyle ok tuşlarıyla gezilebiliyor.
      */}
      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-medium">{t.subject}</legend>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {subjects.map((subject, index) => (
            <label
              key={subject}
              /* İlk ve son seçenek tam genişlikte: aradaki altı hizmet
                 iki sütuna tam oturuyor, kenarda boş hücre kalmıyor. */
              className={`choice ${
                index === 0 || index === subjects.length - 1
                  ? "sm:col-span-2"
                  : ""
              }`}
            >
              <input
                type="radio"
                name="subject"
                value={subject}
                defaultChecked={index === 0}
              />
              <span>{subject}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5">
        <Field label={t.message} htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={6}
            placeholder={t.messagePlaceholder}
            className={`${fieldClass} resize-y`}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="bg-accent mt-7 w-full rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-button)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:w-auto sm:px-8"
      >
        {t.submit}
      </button>

      {draft && <SendPanel dict={dict} draft={draft} />}
    </form>
  );
}

function SendPanel({ dict, draft }: { dict: Dictionary; draft: Draft }) {
  const t = dict.contact.form.send;
  const to = dict.contact.email;
  const [copy, setCopy] = useState<"idle" | "done" | "failed">("idle");
  const titleRef = useRef<HTMLHeadingElement>(null);

  // Panel açılınca ekran okuyucu ve klavye kullanıcısı oraya taşınsın.
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const subject = encodeURIComponent(draft.subject);
  const body = encodeURIComponent(draft.body);
  const options = [
    {
      label: t.gmail,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      external: true,
    },
    {
      label: t.outlook,
      href: `https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}&body=${body}`,
      external: true,
    },
    {
      label: t.app,
      href: `mailto:${to}?subject=${subject}&body=${body}`,
      external: false,
    },
  ];

  async function copyMessage() {
    const text = `${t.to}: ${to}\n${dict.contact.form.subject}: ${draft.subject}\n\n${draft.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopy("done");
    } catch {
      setCopy("failed");
    }
  }

  const optionClass =
    "border-line hover:border-accent hover:text-accent text-ink flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors";

  return (
    <div className="border-line mt-7 border-t pt-7" aria-live="polite">
      <h3
        ref={titleRef}
        tabIndex={-1}
        className="font-display text-lg font-semibold outline-none"
      >
        {t.title}
      </h3>
      <p className="text-muted mt-2 max-w-[60ch] text-sm leading-relaxed">
        {t.hint}{" "}
        <a href={`mailto:${to}`} className="mail-link">
          {to}
        </a>
      </p>

      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {options.map((option) => (
          <li key={option.label}>
            <a
              href={option.href}
              {...(option.external
                ? { target: "_blank", rel: "noreferrer noopener" }
                : {})}
              className={optionClass}
            >
              {option.label}
              <ArrowIcon />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={copyMessage}
            className={`${optionClass} w-full text-left`}
          >
            {copy === "done" ? t.copied : t.copy}
            <CopyIcon done={copy === "done"} />
          </button>
        </li>
      </ul>

      {copy === "failed" && (
        <p role="alert" className="mt-3 text-xs text-[#ff8a8a]">
          {t.copyFailed}
        </p>
      )}
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M6 3h7v7M13 3L4 12" />
    </svg>
  );
}

function CopyIcon({ done }: { done: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      {done ? (
        <path d="M3 8.5l3 3 7-7" />
      ) : (
        <>
          <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
          <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" />
        </>
      )}
    </svg>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-[#ff8a8a]">
          {error}
        </p>
      )}
    </div>
  );
}
