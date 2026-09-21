"use client";

import { useEffect, useRef } from "react";

/**
 * Hero arkasındaki canlı parçacık alanı.
 *
 * Akış alanı (flow field) üzerinde sürüklenen ışıklı noktalar; imleç
 * yaklaştığında yörüngeleri bükülüyor. Renkler CSS değişkenlerinden okunuyor,
 * böylece açık/koyu mod otomatik uyuyor.
 *
 * Maliyet kontrolü: sekme gizliyken rAF zaten durur; ayrıca hero görünür
 * alandan çıkınca çizim durdurulur. prefers-reduced-motion açıksa tek bir
 * durağan kare çizilir.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parent = canvas.parentElement ?? canvas;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = true;
    let time = 0;

    // --- imleç ---
    const pointer = { x: -9999, y: -9999, active: false };

    // --- renk paleti (CSS değişkenlerinden) ---
    let tints: string[] = [];
    const readTints = () => {
      const style = getComputedStyle(document.documentElement);
      const a = style.getPropertyValue("--accent").trim() || "#7c93ff";
      const b = style.getPropertyValue("--accent-2").trim() || "#a78bfa";
      tints = [a, b, a];
      sprites = tints.map(makeSprite);
    };

    // Her renk için önceden çizilmiş yumuşak nokta (gölge/blur'dan çok daha hızlı)
    let sprites: HTMLCanvasElement[] = [];
    function makeSprite(color: string) {
      const size = 64;
      const s = document.createElement("canvas");
      s.width = s.height = size;
      const sctx = s.getContext("2d")!;
      const gradient = sctx.createRadialGradient(
        size / 2, size / 2, 0,
        size / 2, size / 2, size / 2,
      );
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.35, color);
      gradient.addColorStop(1, "transparent");
      sctx.globalAlpha = 1;
      sctx.fillStyle = gradient;
      sctx.fillRect(0, 0, size, size);
      return s;
    }

    // --- parçacıklar ---
    type P = { x: number; y: number; vx: number; vy: number; r: number; t: number; a: number };
    let particles: P[] = [];

    const seed = () => {
      const target = Math.min(
        520,
        Math.max(140, Math.round((width * height) / 5200)),
      );
      particles = Array.from({ length: target }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        r: 0.6 + Math.random() * 2.1,
        t: Math.floor(Math.random() * 3),
        a: 0.18 + Math.random() * 0.5,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const box = parent.getBoundingClientRect();
      width = Math.max(1, box.width);
      height = Math.max(1, box.height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    // Ucuz sözde-gürültü: kütüphane eklemeden akış alanı açısı üretir
    const angleAt = (x: number, y: number, t: number) =>
      Math.sin(x * 0.0016 + t) * 1.7 +
      Math.cos(y * 0.0021 - t * 0.8) * 1.7 +
      Math.sin((x + y) * 0.0009 + t * 0.4) * 1.2;

    const step = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      for (const p of particles) {
        const angle = angleAt(p.x, p.y, time);
        p.vx += Math.cos(angle) * 0.045;
        p.vy += Math.sin(angle) * 0.045;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 42000 && dist2 > 1) {
            const force = (1 - dist2 / 42000) * 0.9;
            const dist = Math.sqrt(dist2);
            // imlecin etrafında hafif girdap
            p.vx += (-dy / dist) * force * 0.7 + (dx / dist) * force * 0.25;
            p.vy += (dx / dist) * force * 0.7 + (dy / dist) * force * 0.25;
          }
        }

        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;

        const sprite = sprites[p.t];
        if (!sprite) continue;
        const size = p.r * 7;
        ctx.globalAlpha = p.a;
        ctx.drawImage(sprite, p.x - size / 2, p.y - size / 2, size, size);
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const loop = () => {
      time += 0.0016;
      step();
      if (running) frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (event: PointerEvent) => {
      const box = canvas.getBoundingClientRect();
      pointer.x = event.clientX - box.left;
      pointer.y = event.clientY - box.top;
      pointer.active =
        pointer.x > -120 &&
        pointer.y > -120 &&
        pointer.x < box.width + 120 &&
        pointer.y < box.height + 120;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };

    readTints();
    resize();

    if (reduced.matches) {
      // Tek durağan kare: doku var, hareket yok
      for (let i = 0; i < 90; i += 1) step();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry?.isIntersecting ?? true;
        if (visible && !running) {
          running = true;
          frame = requestAnimationFrame(loop);
        } else if (!visible && running) {
          running = false;
          if (frame) cancelAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    observer.observe(parent);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", readTints);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    frame = requestAnimationFrame(loop);

    return () => {
      running = false;
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      scheme.removeEventListener("change", readTints);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70 mix-blend-screen"
    />
  );
}
