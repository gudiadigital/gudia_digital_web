export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="text-accent mb-3 font-display text-xs font-semibold uppercase tracking-[0.18em]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className="text-muted mt-4 text-base leading-relaxed sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
