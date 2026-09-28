"use client";

import { useEffect } from "react";

/**
 * Sayfa kaydırmasına atalet ekler.
 *
 * Fare tekerleği sayfayı ~100 piksellik sert adımlarla ilerletiyor; kaydırmaya
 * bağlı her şey (paneller, HUD, video) bu sertliği devralıyordu. Lenis hedef
 * konuma yumuşayarak gidiyor ve gerçek scroll konumunu güncellediği için
 * mevcut scroll dinleyicileri olduğu gibi çalışmaya devam ediyor.
 *
 * `prefers-reduced-motion` seçiliyse hiç devreye girmez; tarayıcının kendi
 * kaydırması kullanılır.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
      isScrolling: boolean | "native" | "smooth";
    } | null = null;
    let frame = 0;
    let cancelled = false;

    /*
     * Lenis'in karesi yalnızca tekerlekle başlayan yumuşak kaydırma
     * sürerken dönüyor. Sürekli dönen döngü sayfa boştayken de her karede
     * ana iş parçacığını uyandırıyordu; dokunmatikte ve klavyede Lenis
     * zaten devreye girmiyor, tarayıcının kendi kaydırması çalışıyor.
     *
     * Lenis'e kendi saatimiz veriliyor: döngü dururken saat de duruyor.
     * Gerçek zaman verilseydi uyandığı ilk karede aradaki süreyi tek adımda
     * işleyip hedefe zıplardı. Uyandığı kare bir kare süresi sayılıyor:
     * sıfır sayılsaydı kaydırma tekerleğin geldiği karede değil, bir sonraki
     * karede başlardı (sürekli dönen döngüde bu karede başlıyordu).
     */
    let clock = performance.now();
    let last = 0;
    const loop = (time: number) => {
      clock += last ? time - last : 1000 / 60;
      last = time;
      lenis?.raf(clock);
      if (lenis?.isScrolling === "smooth") {
        frame = requestAnimationFrame(loop);
      } else {
        frame = 0;
        last = 0;
      }
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        /*
         * Süre yerine lerp kullanılıyor: süre tabanlı yumuşatma her tekerlek
         * hareketini sabit bir animasyona bağlıyor ve sayfa "sürükleniyor" gibi
         * hissettiriyordu. lerp her karede hedefe belli bir oranda yaklaşır;
         * hareket hemen başlar, hızlıca oturur.
         */
        lerp: 0.14,
        // Dokunmatikte tarayıcının kendi kaydırması daha iyi
        syncTouch: false,
        touchMultiplier: 1.5,
        wheelMultiplier: 1,
      });
      // Lenis ilk raf çağrısındaki süreyi sıfır sayıyor; saat şimdiden
      // tanıtılıyor ki sayfadaki ilk tekerlek hareketi de hemen başlasın.
      lenis.raf(clock);

      // Lenis kendi tekerlek dinleyicisini kurucuda ekliyor; bu ondan sonra
      // çalışıyor, yani uyandığımızda kaydırma hedefi çoktan ayarlanmış oluyor.
      window.addEventListener("wheel", wake, { passive: true });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("wheel", wake);
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
