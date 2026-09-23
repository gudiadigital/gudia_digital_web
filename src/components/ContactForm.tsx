"use client";

import { useState } from "react";
import { serviceSlugs } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Form, ziyaretçinin e-posta uygulamasında hazır bir mesaj açar.
 * Sunucu tarafı gönderim (Resend / Formspree vb.) sağlayıcı seçilince
 * burada handleSubmit'in içi değiştirilerek eklenebilir.
 */
export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const [errors, setErrors] = useState<Errors>({});

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

    window.location.href = `mailto:${dict.contact.email}?subject=${encodeURIComponent(
      subject || dict.meta.siteName,
    )}&body=${encodeURIComponent(body)}`;
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
    <form onSubmit={handleSubmit} noValidate className="card rounded-2xl p-6 sm:p-8">
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
    </form>
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
