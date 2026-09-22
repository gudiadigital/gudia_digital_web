"use client";

import { Fragment, useEffect, useRef } from "react";
import Link from "next/link";
import { Container } from "../Container";
import { serviceGroups, servicesByGroup, type Locale } from "@/i18n/config";
import { pathFor } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries";

type Segment = { text: string; accent: boolean };

/**
 * Başlık parçalarını kelimelere böler. Bir kelime birden fazla parçadan
 * oluşabilir ("büyütüyoruz" vurgulu + "." vurgusuz), bu yüzden her kelime
 * kendi içinde parça dizisi tutar.
 */
function toWords(segments: readonly Segment[]): Segment[][] {
  const words: Segment[][] = [];
  let current: Segment[] = [];

  for (const segment of segments) {
    for (const piece of segment.text.split(/(\s+)/)) {
      if (!piece) continue;
      if (/^\s+$/.test(piece)) {
        if (current.length) {
          words.push(current);
          current = [];
        }
      } else {
        current.push({ text: piece, accent: segment.accent });
      }
    }
  }
  if (current.length) words.push(current);
  return words;
}

/**
 * Sayfanın açılış bölümü: arka planda kaydırmayla ilerleyen video, üzerinde
 * sırayla devreye giren paneller. İlk panel karşılama (başlık + çağrı),
 * sonraki üçü çalışma modeli (kur / iyileştir / büyüt).
 *
 * İki mekanizma bilinçli olarak ayrı:
 *  - Panel görünürlüğü doğrudan scroll olayında hesaplanır; içerik hiçbir
 *    koşulda görünmez kalmaz. İlk panel sunucu çıktısında zaten açık gelir,
 *    böylece JS çalışmasa da sayfa anlamlı.
 *  - Videonun zamanı rAF ile yumuşatılır; büyük sıçramalarda doğrudan
 *    konumlanır, çünkü rAF arka plandaki sekmelerde duruyor.
 *
 * Dar ekranlarda video kaydırmaya bağlanmaz, normal döngüde oynar — mobilde
 * kare arama tutukluk yapıyor.
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
  const chapterRef = useRef<HTMLSpanElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const { hero } = dict;
  const words = toWords(hero.title);
  const afterTitle = 0.2 + words.length * 0.05;

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
    let inView = false;

    /**
     * Gösterilen an, videodan okunarak değil ayrı tutularak ilerletiliyor.
     * `video.currentTime`'a yazmak asenkron bir arama başlatıyor; hemen geri
     * okunduğunda hâlâ eski değer dönüyor. Kendi durumumuzu tutmazsak fark
     * hiç kapanmıyor, video kaydırma boyunca donuyor ve kaydırma durunca
     * biriken farkı tek hamlede atlıyor.
     */
    let displayTime = 0;

    const tick = () => {
      frame = 0;
      if (!scrubbing || !video.duration) return;

      const diff = targetTime - displayTime;
      if (Math.abs(diff) > 1.5) {
        // Sayfa açılışı ya da bağlantıyla atlama: doğrudan konumlan
        displayTime = targetTime;
      } else if (Math.abs(diff) > 0.004) {
        displayTime += diff * 0.34;
      }
      video.currentTime = displayTime;

      if (inView) frame = requestAnimationFrame(tick);
    };

    const applyProgress = () => {
      timer = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / span));
      section.style.setProperty("--story", progress.toFixed(4));

      // Paneller eşiklerle değil, ilerlemeye bağlı olarak sürekli hareket eder.
      // Her panelin bir çapası var (0, 1/3, 2/3, 1); ilerleme çapaya yaklaştıkça
      // panel netleşip yerine oturuyor, uzaklaştıkça yukarı kayıp bulanıklaşıyor.
      // Böylece kaydırmanın her pikselinde ekranda bir şey değişiyor.
      const spread = total - 1;
      let active = 0;
      let bestDistance = Infinity;

      items.forEach((item, index) => {
        const distance = progress * spread - index;
        // Çapanın etrafında bir "durma" payı: panel hemen solmaya başlamıyor,
        // önce yerinde net duruyor, sonra geçiş başlıyor.
        const away = Math.min(
          1,
          Math.max(0, (Math.abs(distance) - 0.22) / 0.62),
        );
        item.style.opacity = (1 - away).toFixed(3);
        item.style.transform = `translate3d(0, ${(-distance * 56).toFixed(1)}px, 0)`;
        item.style.filter = away > 0.02 ? `blur(${(away * 7).toFixed(1)}px)` : "none";
        item.style.pointerEvents = Math.abs(distance) < 0.4 ? "auto" : "none";

        if (Math.abs(distance) < bestDistance) {
          bestDistance = Math.abs(distance);
          active = index;
        }
      });

      // HUD sayaçları doğrudan burada güncelleniyor; rAF'a bağlı olsalardı
      // sekme arka plana alındığında donmuş sayılar görünürdü.
      const chapter = chapterRef.current;
      if (chapter) {
        chapter.textContent = `${String(active + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      }
      const percent = percentRef.current;
      if (percent) {
        percent.textContent = `${String(Math.round(progress * 100)).padStart(3, "0")}%`;
      }
      const clock = clockRef.current;
      if (clock && video.duration) {
        const at = progress * video.duration;
        const sec = Math.floor(at);
        const frames = Math.floor((at - sec) * 24);
        clock.textContent = `00:${String(sec).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;
      }

      inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (scrubbing && video.duration) {
        targetTime = progress * (video.duration - 0.05);
        if (inView && !frame) frame = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!timer) timer = window.setTimeout(applyProgress, 16);
    };

    // Döngü kipinde oynatma isteği reddedilebilir (video henüz hazır değilse
    // ya da tarayıcı otomatik oynatmayı engellemişse). Hazır olduğunda bir kez
    // daha denenir; yine olmazsa poster görseli kalır, sayfa bozulmaz.
    const tryPlay = () => {
      void video.play().catch(() => {});
    };

    const setMode = () => {
      scrubbing = !narrow.matches && !reduced.matches;
      if (scrubbing) {
        video.removeEventListener("canplay", tryPlay);
        video.pause();
      } else {
        video.loop = true;
        tryPlay();
        video.addEventListener("canplay", tryPlay);
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
      video.removeEventListener("canplay", tryPlay);
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
            {/* Panel 0 — karşılama */}
            <div data-panel className="story-panel max-w-4xl">
              <p
                className="border-line bg-space/40 text-muted fade-up inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-display text-[0.6875rem] font-semibold uppercase tracking-[0.18em] backdrop-blur-sm"
                style={{ animationDelay: "0.05s" }}
              >
                <span className="bg-accent inline-block h-1.5 w-1.5 rounded-full" />
                {hero.eyebrow}
              </p>

              <h1 className="mt-7 text-[2.5rem] font-semibold leading-[1.06] sm:text-6xl lg:text-7xl">
                {words.map((word, index) => (
                  <Fragment key={index}>
                    {index > 0 && " "}
                    <span className="word-mask">
                      <span
                        className="word-rise"
                        style={{ animationDelay: `${0.18 + index * 0.05}s` }}
                      >
                        {word.map((part, partIndex) =>
                          part.accent ? (
                            <span key={partIndex} className="text-gradient">
                              {part.text}
                            </span>
                          ) : (
                            <span key={partIndex}>{part.text}</span>
                          ),
                        )}
                      </span>
                    </span>
                  </Fragment>
                ))}
              </h1>

              <ul className="text-muted mt-8 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-display text-sm font-medium tracking-wide sm:text-base">
                {hero.pillars.map((pillar, index) => (
                  <li
                    key={pillar}
                    className="fade-up flex items-center gap-3"
                    style={{ animationDelay: `${afterTitle + index * 0.07}s` }}
                  >
                    {index > 0 && (
                      <span aria-hidden="true" className="text-accent/50">
                        &bull;
                      </span>
                    )}
                    {pillar}
                  </li>
                ))}
              </ul>

              <p
                className="text-muted fade-up mt-7 max-w-2xl text-base leading-relaxed sm:text-lg"
                style={{ animationDelay: `${afterTitle + 0.3}s` }}
              >
                {hero.subtitle}
              </p>

              <div
                className="fade-up mt-9 flex flex-wrap items-center gap-3"
                style={{ animationDelay: `${afterTitle + 0.42}s` }}
              >
                <Link
                  href={pathFor(locale, "contact")}
                  className="bg-accent rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_38px_-12px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  {hero.ctaPrimary}
                </Link>
                <Link
                  href={pathFor(locale, "services")}
                  className="border-line-strong bg-space/30 text-ink hover:bg-space/60 rounded-full border px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors"
                >
                  {hero.ctaSecondary}
                </Link>
              </div>
            </div>

            {/* Panel 1–3 — çalışma modeli */}
            {serviceGroups.map((group, index) => {
              const content = dict.approach.groups[group];
              return (
                <div key={group} data-panel className="story-panel max-w-2xl">
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

        <div className="story-cue scroll-cue text-muted" aria-hidden="true">
          <span>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </span>
        </div>

        <div className="story-hud" aria-hidden="true">
          <div className="hud-ruler">
            <span className="hud-ruler-mark" />
          </div>

          <div className="hud-readout">
            <div>
              <span className="hud-key">{dict.story.chapter}</span>
              <span ref={chapterRef} className="hud-val">
                01 / 04
              </span>
            </div>
            <div>
              <span className="hud-key">{dict.story.progress}</span>
              <span ref={percentRef} className="hud-val hud-big">
                000%
              </span>
            </div>
            <div>
              <span className="hud-key">{dict.story.time}</span>
              <span ref={clockRef} className="hud-val">
                00:00:00
              </span>
            </div>
          </div>

          <p className="hud-tag">{dict.story.tag}</p>

          <div className="hud-bar">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
