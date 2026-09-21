import { serviceSlugs } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

/** Hizmetlerin sonsuz kayan şeridi. İki özdeş kopya kesintisiz döngü sağlar. */
export function Marquee({ dict }: { dict: Dictionary }) {
  const items = serviceSlugs.map((slug) => dict.services.items[slug].title);

  return (
    <section
      className="marquee border-line overflow-hidden border-y py-5"
      aria-label={dict.services.eyebrow}
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {items.map((item) => (
              <span
                key={item}
                className="text-muted font-display flex shrink-0 items-center gap-7 px-7 text-sm font-medium tracking-wide sm:text-base"
              >
                {item}
                <span className="text-accent/70 text-xs" aria-hidden="true">
                  &#10022;
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
