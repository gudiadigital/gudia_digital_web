"use client";

import { useEffect, useRef, useState } from "react";
import { serviceSlugs } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

type Errors = Partial<Record<"name" | "email" | "phone" | "contact" | "message", string>>;

type Draft = { subject: string; body: string };

type Status = "idle" | "sending" | "sent" | "failed";

/**
 * Web3Forms erişim anahtarı. Mesajlar anahtarın oluşturulduğu adrese
 * e-posta olarak gelir. Anahtar tarayıcıda çalışmak için tasarlandı,
 * gizli değil; Web3Forms panelinden yalnızca bu alan adına kısıtlanabilir.
 * Boş bırakılırsa form, gönderim seçenekleri paneline geri döner.
 */
const WEB3FORMS_KEY = "b1cf2142-424f-40cf-8fc1-c31cfbf8adb2";

/**
 * Mesaj Web3Forms üzerinden doğrudan contact adresine gönderilir.
 *
 * Gönderim başarısız olursa (ağ hatası, kota) ziyaretçi takılı kalmasın
 * diye Gmail, Outlook, e-posta uygulaması ve kopyalama seçenekleri
 * açılır. Yalnızca mailto kullanmak yetmiyordu: Windows'ta çoğu zaman
 * varsayılan e-posta uygulaması kurulu değil ve bağlantı hiçbir şey
 * açmıyor.
 */
export function ContactForm({ dict }: { dict: Dictionary }) {
  const t = dict.contact.form;
  const [errors, setErrors] = useState<Errors>({});
  const [draft, setDraft] = useState<Draft | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [thanks, setThanks] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim() || dict.meta.siteName;
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = t.required;
    // Dönüş için e-posta ya da telefondan biri yeterli.
    if (!email && !phone) nextErrors.contact = t.contactRequired;
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = t.invalidEmail;
    if (phone && !isPhone(phone)) nextErrors.phone = t.invalidPhone;
    if (!message) nextErrors.message = t.required;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const body = [
      `${t.name}: ${name}`,
      ...(email ? [`${t.email}: ${email}`] : []),
      ...(phone ? [`${t.phone}: ${phone}`] : []),
      "",
      message,
    ].join("\n");

    if (!WEB3FORMS_KEY) {
      setDraft({ subject, body });
      return;
    }

    setDraft(null);
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `${subject} · ${name}`,
          from_name: "gudiadigital.com",
          name,
          // Web3Forms bu alanı yanıt adresi yapar: gelen maile
          // "Yanıtla" denince doğrudan ziyaretçiye gider. Boşsa hiç
          // gönderilmiyor, yoksa boş yanıt adresi olarak kalıyor.
          ...(email ? { email } : {}),
          ...(phone ? { phone } : {}),
          message,
          botcheck: data.get("botcheck") === "on",
        }),
      });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("web3forms");
      form.reset();
      setStatus("sent");
      setThanks(true);
    } catch {
      setStatus("failed");
      setDraft({ subject, body });
    }
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
      /* Mesaj değişince hazır taslak ve durum mesajı eskiyor; Gönder'e
         yeniden basılınca güncel haliyle açılır. */
      onChange={() => {
        if (status === "sending") return;
        setDraft(null);
        setStatus("idle");
      }}
      noValidate
      className="card rounded-2xl p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
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
        </div>

        <div className="sm:col-span-2 grid gap-5 sm:grid-cols-2">
          <Field label={t.email} htmlFor="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              aria-describedby="contact-hint"
              aria-invalid={Boolean(errors.email || errors.contact)}
              className={fieldClass}
            />
          </Field>

          <Field label={t.phone} htmlFor="phone" error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={t.phonePlaceholder}
              aria-describedby="contact-hint"
              aria-invalid={Boolean(errors.phone || errors.contact)}
              className={fieldClass}
            />
          </Field>

          <p
            id="contact-hint"
            role={errors.contact ? "alert" : undefined}
            className={`-mt-2 text-xs sm:col-span-2 ${
              errors.contact ? "text-[#ff8a8a]" : "text-muted"
            }`}
          >
            {errors.contact ?? t.contactHint}
          </p>
        </div>
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

      {/* Bot tuzağı: insanlar görmüyor, formu otomatik dolduran botlar
          işaretliyor; Web3Forms işaretli gönderimi mail olarak iletmiyor. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <button
        ref={submitRef}
        type="submit"
        disabled={status === "sending"}
        className="bg-accent mt-7 w-full rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-button)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {status === "sending" ? t.submitting : t.submit}
      </button>

      {status === "failed" && (
        <p role="alert" className="mt-4 text-sm text-[#ff8a8a]">
          {t.error}
        </p>
      )}

      {draft && <SendPanel dict={dict} draft={draft} />}

      {thanks && (
        <SuccessDialog
          text={t.success}
          onClose={() => {
            setThanks(false);
            // Gönderim sırasında düğme devre dışı kaldığı için odak
            // kayboluyor; dialog kendiliğinden geri veremiyor.
            submitRef.current?.focus();
          }}
        />
      )}
    </form>
  );
}

/**
 * Telefon için gevşek kontrol: yalnızca rakam, boşluk, +, -, parantez ve
 * nokta; 7–15 rakam (uluslararası numaranın üst sınırı 15).
 */
function isPhone(value: string) {
  if (!/^\+?[\d\s().-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 7 && digits <= 15;
}

/**
 * Gönderim başarılı olunca açılan bildirim. Native <dialog> kullanılıyor:
 * odak içeride tutuluyor, Esc kapatıyor, kapanınca odak Gönder düğmesine
 * dönüyor. Kapanırken kısa bir çıkış animasyonu oynatılıp sonra kapatılıyor.
 */
function SuccessDialog({
  text,
  onClose,
}: {
  text: Dictionary["contact"]["form"]["success"];
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  useEffect(() => {
    if (!closing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => {
        ref.current?.close();
        onClose();
      },
      reduce ? 0 : 180,
    );
    return () => window.clearTimeout(timer);
  }, [closing, onClose]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="thanks-title"
      aria-describedby="thanks-text"
      className={`thanks-dialog ${closing ? "is-closing" : ""}`}
      data-lenis-prevent
      onCancel={(event) => {
        // Esc: native kapanış yerine animasyonlu kapanış.
        event.preventDefault();
        setClosing(true);
      }}
      onClick={(event) => {
        // Kartın dışına (arka plana) tıklamak kapatır.
        if (event.target === event.currentTarget) setClosing(true);
      }}
    >
      <div className="thanks-card">
        <span className="thanks-halo" aria-hidden="true" />
        <svg
          className="thanks-check"
          viewBox="0 0 56 56"
          width="56"
          height="56"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="28" cy="28" r="24" />
          <path d="M18 28.5l7 7 13-14" />
        </svg>
        <h2 id="thanks-title" className="font-display mt-5 text-xl font-semibold">
          {text.title}
        </h2>
        <p id="thanks-text" className="text-muted mt-2 text-sm leading-relaxed">
          {text.text}
        </p>
        <button
          type="button"
          autoFocus
          onClick={() => setClosing(true)}
          className="bg-accent mt-7 w-full rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-button)] transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
        >
          {text.close}
        </button>
      </div>
    </dialog>
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
