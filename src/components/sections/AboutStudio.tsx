import Link from "next/link";
import { Container } from "../Container";
import type { Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Ana sayfada stüdyonun kim olduğunu, nerede çalıştığını ve kurucularını
 * söyleyen tek bölüm. Metin Hakkımızda'daki kimlik paragrafının aynısı;
 * iki yerde farklı tanım olmasın diye sözlükte tek anahtardan okunuyor.
 *
 * Paragrafta açılış hareketi yok: sayfanın alıntılanacak tanımı bu, JS
 * çalışmasa ya da sayfa kaydırılmasa da görünür durmalı. Metin uzun ve
 * yoğun olduğu için gövde metni gibi soluk ve küçük; komşu bölümlerin
 * başlıklarını bastırmasın.
 */
export function AboutStudio({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section aria-labelledby="studio-about-title" className="py-20 sm:py-24">
      <Container>
        <h2
          id="studio-about-title"
          className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
        >
          {dict.home.aboutTitle}
        </h2>
        <p className="text-muted mt-6 max-w-[65ch] text-base leading-[1.75] sm:text-lg">
          {dict.about.entity}
        </p>
        <Link
          href={pathFor(locale, "about")}
          className="group text-accent mt-7 inline-flex items-center gap-1.5 text-sm font-medium"
        >
          {dict.home.aboutLink}
          <svg
            viewBox="0 0 16 16"
            width="14"
            height="14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </Link>
      </Container>
    </section>
  );
}
