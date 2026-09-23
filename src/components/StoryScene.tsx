"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Açılış bölümünün arka planı: WebGL ile ışın yürütülerek (raymarching)
 * çizilen 3B sahne. Ortada bir çekirdek, çevresinde yörüngeye giren
 * düğümler; kaydırma ilerledikçe düğümler doğuyor, yörüngeleri genişliyor
 * ve çekirdekle kaynaşıp tek bir yapı oluşturuyor — "kur / iyileştir /
 * büyüt" anlatısının görsel karşılığı.
 *
 * Videonun yerini aldı: 1.6 MB'lık dosya yerine birkaç KB shader, rengi
 * tamamen CSS değişkenlerinden geliyor (açık/koyu mod otomatik uyuyor) ve
 * kaydırma karesi aramak zorunda olmadığı için takılma ihtimali yok.
 *
 * Geri düşme: WebGL yoksa ya da kullanıcı hareket azaltma istiyorsa tuval
 * hiç kurulmaz, altındaki CSS degradesi görünür kalır.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;

uniform vec2  uRes;
uniform float uProg;
uniform float uTime;
uniform vec2  uPtr;
uniform vec3  uBg;
uniform vec3  uTint;
uniform vec3  uC1;
uniform vec3  uC2;
uniform vec3  uC3;
uniform vec3  uGlow;
uniform float uDark;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

vec3 node(int i, float t) {
  float fi = float(i);
  float a = fi * 2.3999632 + t * (0.17 + fi * 0.022);
  float r = 0.78 + 0.40 * sin(fi * 1.7 + t * 0.21);
  float y = 0.60 * sin(fi * 2.1 + t * 0.29);
  return vec3(cos(a) * r, y, sin(a) * r);
}

float map(vec3 p) {
  float t = uTime;
  float d = length(p) - (0.30 + 0.02 * sin(t * 0.7));
  // Kaynaşma ilerlemeyle artıyor: başta ayrı ayrı düğümler, sonda tek yapı.
  float k = mix(0.16, 0.52, uProg);
  float spread = mix(0.92, 1.32, uProg);

  for (int i = 0; i < 7; i++) {
    float fi = float(i);
    // İlk iki düğüm en baştan var; gerisi kaydırmayla doğuyor.
    float born = smoothstep(fi * 0.125 - 0.28, fi * 0.125 + 0.18, uProg);
    if (born <= 0.001) continue;
    vec3 c = node(i, t) * spread * mix(0.40, 1.0, born);
    float rad = (0.135 + 0.045 * sin(fi * 3.1)) * born;
    d = smin(d, length(p - c) - rad, k);
  }
  return d;
}

vec3 normalAt(vec3 p) {
  vec2 e = vec2(0.0018, 0.0);
  return normalize(vec3(
    map(p + e.xyy) - map(p - e.xyy),
    map(p + e.yxy) - map(p - e.yxy),
    map(p + e.yyx) - map(p - e.yyx)
  ));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  // Yapı sağa kaydırılıyor: metin panelleri ekranın solunda duruyor, yoksa
  // başlık doğrudan en parlak bölgenin üstüne geliyor.
  uv.x -= 0.30;

  // Kamera: ilerledikçe geri çekilip yapının etrafında dönüyor.
  float ang = 0.55 + uProg * 1.25 + uPtr.x * 0.30;
  float dist = mix(2.95, 4.05, uProg);
  vec3 ro = vec3(sin(ang) * dist, 0.32 + uPtr.y * 0.45 - uProg * 0.12, cos(ang) * dist);
  vec3 fw = normalize(-ro);
  vec3 rt = normalize(cross(vec3(0.0, 1.0, 0.0), fw));
  vec3 up = cross(fw, rt);
  vec3 rd = normalize(uv.x * rt + uv.y * up + 1.55 * fw);

  float t = 0.0;
  float glow = 0.0;
  bool hit = false;

  for (int i = 0; i < 56; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    glow += 0.026 / (1.0 + 40.0 * d * d);
    if (d < 0.0016) { hit = true; break; }
    t += d * 0.92;
    if (t > 7.0) break;
  }

  vec3 col = uBg + uTint * smoothstep(-0.62, 0.55, uv.y);

  if (hit) {
    vec3 p = ro + rd * t;
    vec3 n = normalAt(p);
    vec3 l = normalize(vec3(-0.42, 0.78, 0.38));
    float dif = clamp(dot(n, l), 0.0, 1.0);
    float fres = pow(1.0 - clamp(dot(n, -rd), 0.0, 1.0), 2.6);
    float spec = pow(clamp(dot(reflect(-l, n), -rd), 0.0, 1.0), 26.0);

    // Karşıdan zayıf bir dolgu ışığı: gölge tarafı düz siyah kalmasın.
    vec3 l2 = normalize(vec3(0.62, -0.28, -0.45));
    float fill = clamp(dot(n, l2), 0.0, 1.0);

    vec3 body = mix(uC1, uC2, clamp(0.5 + 0.55 * p.y, 0.0, 1.0));
    vec3 sh = body * (0.10 + 0.74 * dif);
    sh += uC3 * fill * 0.22;
    sh += uC3 * fres * 0.85;
    sh += uC1 * spec * 0.45;
    col = mix(col, sh, 0.97);
  }

  col += uGlow * glow;
  col *= 1.0 - 0.32 * dot(uv, uv);

  // İnce kumlanma: degradelerdeki bantlanmayı kırar.
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.016;

  gl_FragColor = vec4(col, 1.0);
}
`;

type RGB = [number, number, number];

/** "#a1b2c3" → [0..1, 0..1, 0..1]. Beklenmedik biçimde siyaha düşer. */
function hexToRgb(value: string): RGB {
  const hex = value.trim().replace("#", "");
  if (hex.length !== 6) return [0, 0, 0];
  const n = parseInt(hex, 16);
  if (Number.isNaN(n)) return [0, 0, 0];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function StoryScene({
  progressRef,
}: {
  /** 0–1 arası kaydırma ilerlemesi; sahne buna doğru yumuşayarak gider. */
  progressRef: RefObject<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u("uRes");
    const uProg = u("uProg");
    const uTime = u("uTime");
    const uPtr = u("uPtr");
    const uBg = u("uBg");
    const uTint = u("uTint");
    const uC1 = u("uC1");
    const uC2 = u("uC2");
    const uC3 = u("uC3");
    const uGlow = u("uGlow");
    const uDark = u("uDark");

    /** Renkler CSS değişkenlerinden okunur; tema değişince yeniden alınır. */
    const readPalette = () => {
      const style = getComputedStyle(document.documentElement);
      const get = (name: string) => hexToRgb(style.getPropertyValue(name));
      const bg = get("--space");
      // Koyu modda zemin koyu olduğu için parıltı eklenir, açık modda
      // koyulaştırmak gerekir; aksi hâlde beyaz üstünde beyaz kalıyor.
      const dark = (bg[0] + bg[1] + bg[2]) / 3 < 0.5;
      const c1 = get("--accent");
      const c2 = get("--accent-2");
      const c3 = get("--accent-3");

      gl.uniform3fv(uBg, bg);
      gl.uniform3fv(uC1, c1);
      gl.uniform3fv(uC2, c2);
      gl.uniform3fv(uC3, c3);
      gl.uniform1f(uDark, dark ? 1 : 0);
      gl.uniform3fv(
        uTint,
        dark ? [0.030, 0.028, 0.058] : [-0.030, -0.034, -0.026],
      );
      gl.uniform3fv(
        uGlow,
        dark
          ? [c2[0] * 0.55 + c3[0] * 0.20, c2[1] * 0.45 + c3[1] * 0.18, c2[2] * 0.60]
          : [c1[0] * 0.10, c1[1] * 0.10, c1[2] * 0.14],
      );
    };

    /**
     * Çözünürlük bilinçli olarak sınırlı: ışın yürütme piksel başına pahalı,
     * retina ekranda tam DPR ile çizmek kare süresini üçe katlıyor. Sahne
     * yumuşak ve bulanık olduğu için düşük çözünürlük gözle ayırt edilmiyor.
     */
    // Telefonlarda GPU çok daha zayıf; orada sınır daha da aşağıda.
    const MAX_PIXELS = window.innerWidth < 768 ? 480_000 : 1_100_000;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      let scale = dpr;
      const raw = rect.width * rect.height * dpr * dpr;
      if (raw > MAX_PIXELS) scale = dpr * Math.sqrt(MAX_PIXELS / raw);
      const w = Math.max(1, Math.round(rect.width * scale));
      const h = Math.max(1, Math.round(rect.height * scale));
      if (w === width && h === height) return;
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    let ptrX = 0;
    let ptrY = 0;
    const onPointer = (event: PointerEvent) => {
      ptrX = event.clientX / window.innerWidth - 0.5;
      ptrY = event.clientY / window.innerHeight - 0.5;
    };

    let shown = progressRef.current ?? 0;
    let frame = 0;
    let running = false;
    const start = performance.now();

    const render = (now: number) => {
      frame = 0;
      const rect = canvas.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!visible || document.hidden) {
        running = false;
        return;
      }

      resize();

      const target = Math.min(1, Math.max(0, progressRef.current ?? 0));
      const diff = target - shown;
      shown += Math.abs(diff) > 0.25 ? diff : diff * 0.12;

      gl.uniform1f(uProg, shown);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform2f(uPtr, ptrX, ptrY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      frame = requestAnimationFrame(render);
    };

    const kick = () => {
      if (running || document.hidden) return;
      running = true;
      frame = requestAnimationFrame(render);
    };

    readPalette();
    resize();
    canvas.classList.add("is-live");
    kick();

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", readPalette);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", kick);

    return () => {
      scheme.removeEventListener("change", readPalette);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", kick);
      if (frame) cancelAnimationFrame(frame);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [progressRef]);

  return <canvas ref={canvasRef} className="story-canvas" aria-hidden="true" />;
}
