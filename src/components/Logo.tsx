type LogoProps = {
  /** Marka adı — dile göre "Gudia Dijital" / "Gudia Digital". */
  siteName: string;
  className?: string;
  /** Sadece işaret; wordmark gizlenir (favicon / dar alanlar için). */
  markOnly?: boolean;
};

/**
 * Marka işareti: katlanmış şerit G, içinde D (kurucuların baş harfleri).
 * Koyu ve açık mod için iki ayrı PNG var; tarayıcı `prefers-color-scheme`
 * ile doğru olanı seçer. Dosyalar public/brand/ altında.
 */
export function Logo({ siteName, className = "", markOnly = false }: LogoProps) {
  const [first, ...rest] = siteName.split(" ");
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <picture className="shrink-0">
        <source
          srcSet="/brand/mark-light.png"
          media="(prefers-color-scheme: light)"
        />
        <img
          src="/brand/mark-dark.png"
          alt=""
          width={30}
          height={30}
          decoding="async"
          className="block h-[30px] w-[30px]"
        />
      </picture>
      {!markOnly && (
        <span className="font-display text-[1.0625rem] font-semibold tracking-tight">
          {first}
          {rest.length > 0 && (
            <span className="text-accent"> {rest.join(" ")}</span>
          )}
        </span>
      )}
    </span>
  );
}
