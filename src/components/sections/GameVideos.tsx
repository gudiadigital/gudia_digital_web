import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { gameVideoKind, gameVideos } from "@/data/gameVideos";

/**
 * Oyun videoları galerisi. Videolar `preload="none"`: sayfa açılırken yalnızca
 * kapak karesi iniyor, video oynat'a basılınca yükleniyor.
 */
export function GameVideos({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const copy = dict.gameVideos;

  return (
    <section className="border-line mt-20 border-t pt-12">
      <div className="max-w-2xl" data-reveal>
        <p className="text-accent font-display mb-3 text-xs font-semibold uppercase tracking-[0.18em]">
          {copy.eyebrow}
        </p>
        <h2 className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
          {copy.title}
        </h2>
        <p className="text-muted mt-4 leading-relaxed">{copy.subtitle}</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {gameVideos.map((video, index) => {
          const wide = video.w > video.h;
          return (
            <figure
              key={video.slug}
              data-reveal
              data-reveal-delay={(index % 4) * 90}
              className={`card flex flex-col overflow-hidden rounded-2xl ${
                wide ? "col-span-2" : ""
              }`}
            >
              <video
                controls
                playsInline
                preload="none"
                poster={`/oyun-videolari/${video.slug}.webp`}
                width={video.w}
                height={video.h}
                aria-label={`${video.title} — ${gameVideoKind[video.kind][locale]}`}
                className="block h-auto w-full bg-black"
              >
                <source src={`/oyun-videolari/${video.slug}.mp4`} type="video/mp4" />
              </video>
              <figcaption className="px-4 py-3">
                <span className="font-display block text-sm font-semibold leading-snug">
                  {video.title}
                </span>
                <span className="text-muted block text-xs">
                  {gameVideoKind[video.kind][locale]}
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
