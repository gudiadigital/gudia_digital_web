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

    let lenis: { raf: (time: number) => void; destroy: () => void } | null =
      null;
    let frame = 0;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        // Yüksek değer = daha uzun süren, daha akışkan yavaşlama
        duration: 1.15,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        // Dokunmatik cihazlarda tarayıcının kendi kaydırması daha iyi
        syncTouch: false,
        touchMultiplier: 1.6,
        wheelMultiplier: 1,
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
