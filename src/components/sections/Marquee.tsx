import { projects } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * Hero'nun hemen altındaki kayan şerit: yayında olan işlerin adları.
 *
 * Önceden hizmet başlıklarını kaydırıyordu; hemen altındaki Hizmetler
 * bölümü zaten aynı altı başlığı sayıyordu, yani şerit bir şey eklemiyordu.
 * Gerçek ürün adları hem tekrar değil hem de kanıt.
 */
export function Marquee({ dict }: { dict: Dictionary }) {
  const items = projects.map((project) => project.title);

  return (
    <section
      className="marquee border-line overflow-hidden border-y py-5"
      aria-label={dict.projects.featuredEyebrow}
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
                className="text-muted font-display flex shrink-0 items-center gap-8 pr-8 text-sm font-medium tracking-wide sm:text-base"
              >
                {item}
                <span
                  className="bg-line-strong h-3.5 w-px shrink-0"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
