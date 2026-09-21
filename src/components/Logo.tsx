type LogoProps = {
  /** Marka adı — dile göre "Gudia Dijital" / "Gudia Digital". */
  siteName: string;
  className?: string;
  /** Sadece işaret; wordmark gizlenir (favicon / dar alanlar için). */
  markOnly?: boolean;
};

/**
 * Geçici marka işareti. Kling AI ile üretilecek logo hazır olduğunda
 * yalnızca aşağıdaki <svg> bloğu değiştirilecek — kullanım yerleri aynı kalır.
 */
export function Logo({ siteName, className = "", markOnly = false }: LogoProps) {
  const [first, ...rest] = siteName.split(" ");
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        width="30"
        height="30"
        aria-hidden="true"
        className="shrink-0"
      >
        <defs>
          <linearGradient id="gudia-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <rect
          x="1.25"
          y="1.25"
          width="29.5"
          height="29.5"
          rx="9"
          fill="none"
          stroke="url(#gudia-mark)"
          strokeWidth="1.5"
          opacity="0.5"
        />
        <path
          d="M22.2 11.6a8 8 0 1 0 1.3 6.6h-6.4"
          fill="none"
          stroke="url(#gudia-mark)"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="23.6" cy="8.6" r="2" fill="var(--accent-2)" />
      </svg>
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
