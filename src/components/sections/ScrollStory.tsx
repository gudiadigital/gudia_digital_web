"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "../Container";
import { serviceGroups, servicesByGroup, type Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Kaydırdıkça arka plandaki video ilerler, üzerindeki paneller sırayla
 * devreye girer.
 *
 * İki ayrı mekanizma bilinçli olarak ayrıldı:
 *  - Panel görünürlüğü doğrudan scroll olayında hesaplanır. Böylece içerik
 *    hiçbir koşulda görünmez kalmaz.
 *  - Videonun zamanı rAF içinde hedefe yumuşatılarak taşınır; bu yalnızca
 *    görsel bir süsleme olduğu için sekme arka plandayken durması sorun değil.
 *
 * Dar ekranlarda video kaydırmaya bağlanmaz, normal döngüde oynar — mobil
 * cihazlarda kare kare arama (seek) tutukluk yapıyor.
 */
export function ScrollStory({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const panels = panelsRef.current;
    if (!section || !video || !panels) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 768px)");
    const items = Array.from(
      panels.querySelectorAll<HTMLElement>("[data-panel]"),
    );
    const total = items.length;

    let scrubbing = !narrow.matches && !reduced.matches;
    let targetTime = 0;
    let frame = 0;
    let timer = 0;

    const applyProgress = () => {
      timer = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / span));
      section.style.setProperty("--story", progress.toFixed(4));

      // Hangi panel aktif: ilerleme eşit dilimlere bölünür
      const active = Math.min(total - 1, Math.floor(progress * total));
      items.forEach((item, index) => {
        item.classList.toggle("is-active", index === active);
      });

      if (scrubbing && video.duration) {
        targetTime = progress * (video.duration - 0.05);
        // Büyük sıçramalarda (hızlı kaydırma, sayfa açılışı, rAF'ın kısıldığı
        // durumlar) doğrudan konumlan; küçük farkları rAF yumuşatsın.
        if (Math.abs(targetTime - video.currentTime) > 0.4) {
          video.currentTime = targetTime;
        } else if (!frame) {
          frame = requestAnimationFrame(smooth);
        }
      }
    };

    // Videoyu hedefe yumuşatarak taşı — doğrudan atama titriyor
    const smooth = () => {
      frame = 0;
      if (!video.duration) return;
      const diff = targetTime - video.currentTime;
      if (Math.abs(diff) < 0.02) return;
      video.currentTime += diff * 0.18;
      frame = requestAnimationFrame(smooth);
    };

    const schedule = () => {
      if (!timer) timer = window.setTimeout(applyProgress, 40);
    };

    const setMode = () => {
      scrubbing = !narrow.matches && !reduced.matches;
      if (scrubbing) {
        video.pause();
      } else {
        video.loop = true;
        void video.play().catch(() => {});
      }
    };

    setMode();
    applyProgress();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    narrow.addEventListener("change", setMode);
    video.addEventListener("loadedmetadata", applyProgress);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      narrow.removeEventListener("change", setMode);
      video.removeEventListener("loadedmetadata", applyProgress);
      if (frame) cancelAnimationFrame(frame);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section ref={sectionRef} className="story relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src="/video/story.mp4"
          poster="/video/story-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="story-veil" aria-hidden="true" />

        <Container className="relative z-10 flex h-full items-center">
          <div ref={panelsRef} className="grid w-full">
            <p className="text-accent font-display mb-6 text-xs font-semibold uppercase tracking-[0.18em]">
              {dict.approach.eyebrow}
            </p>

            {serviceGroups.map((group, index) => {
              const content = dict.approach.groups[group];
              return (
                <div
                  key={group}
                  data-panel
                  className="story-panel max-w-2xl"
                >
                  <span className="text-muted font-display text-sm font-semibold tabular-nums">
                    {String(index + 1).padStart(2, "0")} / 0{serviceGroups.length}
                  </span>
                  <h2 className="mt-4 text-4xl font-semibold sm:text-5xl lg:text-6xl">
                    {content.title}
                  </h2>
                  <p className="text-muted mt-5 text-base leading-relaxed sm:text-lg">
                    {content.text}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-2.5">
                    {servicesByGroup[group].map((slug) => (
                      <li key={slug}>
                        <Link
                          href={pathFor(locale, "services", slug)}
                          className="border-line-strong bg-space/40 text-ink hover:border-accent rounded-full border px-4 py-2 text-sm backdrop-blur-sm transition-colors"
                        >
                          {dict.services.items[slug].title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>

        <div className="story-rail" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
