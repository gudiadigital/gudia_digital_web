/** Hero arkasındaki canlı ışık katmanı. Tamamen CSS ile hareket eder. */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora aurora-parallax ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
