/**
 * Alt sayfa başlıklarının arkasındaki ışık. Tek, büyük ve durağan bir
 * kaynak — daha önce üç ayrı renkli küre sürekli sürükleniyordu, bu her
 * şablonda görülen bir kalıp olduğu için kaldırıldı.
 */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden="true">
      <span />
    </div>
  );
}
