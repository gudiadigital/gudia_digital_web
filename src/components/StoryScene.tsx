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
 * Geri düşme: WebGL yoksa, sürücü yazılımla çiziyorsa, kareler
 * yetişmiyorsa ya da kullanıcı hareket azaltma istiyorsa tuval hiç
 * görünmez, arkasındaki CSS degradesi kalır.
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

  /*
   * Yapının yeri ekranın oranına göre değişiyor.
   *
   * Geniş ekranda metin panelleri solda durduğu için yapı sağa kaydırılıyor.
   * Telefonda ise metin tüm genişliği kaplıyor; sağa kaydırmak işe yaramıyor,
   * yapı başlığın üstüne biniyor ve kenardan taşıyordu. Orada yapı aşağı
   * iniyor, kamera da geri çekilip küçültüyor.
   */
  float en = uRes.x / uRes.y;
  float dar = 1.0 - smoothstep(0.75, 1.25, en);
  uv.x -= mix(0.30, 0.04, dar);
  uv.y += dar * 0.44;

  // Kamera: ilerledikçe geri çekilip yapının etrafında dönüyor.
  float ang = 0.55 + uProg * 1.25 + uPtr.x * 0.30;
  float dist = mix(2.95, 4.05, uProg) * mix(1.0, 1.5, dar);
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

/*
 * Derleme durumu burada okunmuyor: KHR_parallel_shader_compile varken
 * COMPILE_STATUS sormak derleme bitene kadar ana iş parçacığını bekletir.
 * Derlenemeyen shader bağlamayı da bozduğu için LINK_STATUS ikisini de
 * yakalıyor.
 */
function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return shader;
}

/** Yazılımla çizen WebGL sürücüleri (SwiftShader, Mesa llvmpipe, Windows'un temel sürücüsü). */
const SOFTWARE_GL = /swiftshader|llvmpipe|software|basic render/i;

/*
 * Sürücü önce ayrı bir iş parçacığında, 1×1'lik bir OffscreenCanvas
 * bağlamıyla yoklanıyor. Tarayıcıdaki ilk WebGL bağlamı yazılım sürücüsünü
 * ayağa kaldırırken çağıranı bekletiyor: SwiftShader'da bu, ana iş
 * parçacığında 1,4–3 sn'lik tek bir uzun görev demekti. Worker'da aynı
 * bekleme sayfayı dondurmuyor; donanım GPU'sunda yoklama ~10 ms sürüyor.
 * Worker ayrı bir betik olarak çalıştığı için kodu metin hâlinde duruyor;
 * paketleyiciden geçmiyor.
 *
 * Bayraklı bağlam alınamadığında bayraksız bir kez daha deneniyor: o
 * zaman bağlam geliyorsa sürücü yazılımla çiziyor demek (false). İkisi de
 * gelmiyorsa worker'da WebGL yok (null) ve karar ana iş parçacığına
 * kalıyor: Safari 16.4–16.7 OffscreenCanvas'ta yalnızca 2B bağlam veriyor,
 * bunu "GPU yok" saymak güçlü cihazlarda da sahneyi kapatıyordu.
 */
const PROBE_WORKER = `onmessage = function () {
  var result = null;
  try {
    var gl = new OffscreenCanvas(1, 1).getContext("webgl", { failIfMajorPerformanceCaveat: true });
    if (gl) {
      var info = gl.getExtension("WEBGL_debug_renderer_info");
      result = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    } else {
      gl = new OffscreenCanvas(1, 1).getContext("webgl");
      if (gl) result = false;
    }
    if (gl) {
      var lose = gl.getExtension("WEBGL_lose_context");
      if (lose) lose.loseContext();
    }
  } catch (error) {}
  postMessage(result);
};`;

/** Yoklama bu süreyi aşarsa GPU sahneyi taşıyacak durumda sayılmıyor. */
const PROBE_TIMEOUT_MS = 5000;

/**
 * Sonucu `onResult`a verir: false ise sürücü yazılımla çiziyor. Worker
 * kurulamıyorsa ya da worker'da WebGL yoksa true döner; karar
 * startScene'deki aynı denetimlere kalır. Yoklamayı iptal eden fonksiyonu
 * döndürür.
 */
function probeGpu(onResult: (usable: boolean) => void): () => void {
  if (typeof Worker !== "function" || typeof OffscreenCanvas !== "function") {
    onResult(true);
    return () => {};
  }

  let url = "";
  let worker: Worker;
  try {
    url = URL.createObjectURL(
      new Blob([PROBE_WORKER], { type: "text/javascript" }),
    );
    worker = new Worker(url);
  } catch {
    if (url) URL.revokeObjectURL(url);
    onResult(true);
    return () => {};
  }

  const end = () => {
    window.clearTimeout(timer);
    worker.terminate();
    URL.revokeObjectURL(url);
  };
  const finish = (usable: boolean) => {
    end();
    onResult(usable);
  };
  const timer = window.setTimeout(() => finish(false), PROBE_TIMEOUT_MS);
  worker.onmessage = (event: MessageEvent<unknown>) => {
    const result = event.data;
    finish(
      result === null ||
        (typeof result === "string" && !SOFTWARE_GL.test(result)),
    );
  };
  worker.onerror = () => finish(true);
  worker.postMessage(0);
  return end;
}

/*
 * Kare bekçisi. Sahne açıldıktan sonraki ilk anlar shader'ın ilk
 * çizimde tamamlanması yüzünden takılabiliyor; bu yüzden kısa bir
 * ısınmadan sonra ~20 kare aralığı ölçülüyor. Ortanca ~30 fps'in altına
 * inerse ya da iki kare 120 ms'yi aşarsa cihaz sahneyi taşıyamıyor
 * demektir: döngü durur, degrade zemine dönülür.
 *
 * Tek bir uzun aralık sahneyi kapatmıyor, ikincisi kapatıyor. Tek
 * takılma çoğu zaman sahneden değil başka bir işten geliyor (çöp
 * toplama, başka bir betiğin uzun görevi) ve güçlü bir GPU'da da
 * olabiliyor; gerçekten yetişemeyen bir cihazda ikinci uzun kare hemen
 * ardından geliyor.
 */
const WATCH_WARMUP_MS = 300;
const WATCH_FRAMES = 20;
const WATCH_MEDIAN_MS = 34;
const WATCH_GAP_MS = 120;
const WATCH_STALLS = 2;

/*
 * Sınırda kalan cihaz (ortanca ~50 fps'in altında ama 30 fps'in üstünde)
 * sahneyi kapatmıyor, piksel bütçesi %40'a iniyor (telefonda ~200 bin).
 * Bütçe herkes için düşürülseydi küre kenarları güçlü GPU'da da
 * basamaklı görünecekti; böylece yalnızca yetişemeyen cihaz bedel ödüyor.
 */
const WATCH_SLOW_MS = 20;
const SLOW_PIXEL_SHARE = 0.4;

/*
 * iOS Düşük Güç Modu ve Chrome'un enerji tasarrufu rAF'ı 30 fps'e
 * sınırlıyor. Bekçi bunu bilmeden ortancayı ~33 ms görünce güçlü GPU'da
 * da piksel bütçesini düşürüyordu (küre kenarları basamaklanıyor); 34 ms
 * eşiğine bu kadar yakınken küçük bir oynama sahneyi kapatabiliyordu.
 * Bu yüzden sahne kurulmadan önce birkaç boş karenin hızı ölçülüyor ve
 * bekçinin eşikleri bu hızın altına inmiyor: sınıra yetişen sahne yavaş
 * sayılmıyor. Yalnızca 30 fps'e kadarki sınır hesaba katılıyor; ölçüm
 * uzun bir göreve denk gelirse eşikler bundan fazla gevşemiyor.
 */
const PACE_FRAMES = 8;
const PACE_MAX_MS = 1000 / 30;
// Kare zamanları biraz oynuyor; sınırın hemen üstü de "yetişiyor" sayılıyor.
const PACE_SLACK = 1.15;

/*
 * Girdi yokken sahne 30 fps'e iniyor; hareket yavaş olduğu için fark
 * görünmüyor. Bir süre hiç girdi gelmezse son 1,5 sn'de yavaşlayıp duruyor,
 * kaydırma ya da imleç hareketiyle kaldığı yerden devam ediyor.
 */
const CALM_AFTER_MS = 600;
const STOP_AFTER_MS = 7000;
const SLOWDOWN_MS = 1500;

function median(values: readonly number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[sorted.length >> 1];
}

/**
 * Tarayıcının boştayken verdiği kare aralığını (ms, ortanca) `onResult`a
 * verir. Ölçümü iptal eden fonksiyonu döndürür.
 */
function measurePace(onResult: (ms: number) => void): () => void {
  const gaps: number[] = [];
  let last = 0;
  let frame = 0;
  const tick = (now: number) => {
    if (last) gaps.push(now - last);
    last = now;
    if (gaps.length < PACE_FRAMES) {
      frame = requestAnimationFrame(tick);
    } else {
      frame = 0;
      onResult(median(gaps));
    }
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}

/**
 * Sahneyi kurar ve döngüyü başlatır; kapatan fonksiyonu döndürür. Sahne
 * hiç başlamazsa ya da sonradan geri düşerse tuval görünmez kalır.
 */
function startScene(
  canvas: HTMLCanvasElement,
  progressRef: RefObject<number>,
  /** Tarayıcının boştaki kare aralığı (ms); bkz. measurePace. */
  pace: number,
): () => void {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    // GPU kapalı ya da kara listedeyse tarayıcı yazılımla çizecek bir
    // bağlam vermek yerine null döner.
    failIfMajorPerformanceCaveat: true,
  });
  if (!gl) return () => {};

  const lose = () => gl.getExtension("WEBGL_lose_context")?.loseContext();

  /*
   * SwiftShader açıkça seçildiğinde yukarıdaki bayrak yine bağlam veriyor.
   * Yazılım sürücüsünde sahne 21 fps'e düşüyor, dokunmalar 350–520 ms
   * gecikiyordu; PageSpeed Insights ölçümleri bu yüzden zaman aşımına
   * uğruyordu. Worker yoklaması yapılamadıysa karar burada veriliyor.
   */
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const renderer = String(
    gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER) ?? "",
  );
  if (SOFTWARE_GL.test(renderer)) {
    lose();
    return () => {};
  }

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram();
  if (!vs || !fs || !program) {
    lose();
    return () => {};
  }
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  // Destekleniyorsa derleme arka planda sürüyor; bitene kadar karelerle yoklanır.
  const parallel = gl.getExtension("KHR_parallel_shader_compile");

  let frame = 0;
  let dead = false;
  let detach = () => {};

  /*
   * Kapatma ve geri düşme aynı yol. Tuval .is-live olmadan görünmüyor:
   * alpha:false bir bağlam kurulduğu anda tuval çizim olmasa da siyah,
   * bağlam kaybından sonra beyaz boyanıyor; degradeyi arkadaki kap veriyor.
   */
  const stop = () => {
    if (dead) return;
    dead = true;
    canvas.removeEventListener("webglcontextlost", stop);
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    detach();
    canvas.classList.remove("is-live");
    lose();
  };
  // Tarayıcı bağlamı kendisi düşürürse (GPU sıfırlanması, arka plan) de degradeye dön.
  canvas.addEventListener("webglcontextlost", stop);

  const play = () => {
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
    let maxPixels = window.innerWidth < 768 ? 480_000 : 1_100_000;
    let width = 0;
    let height = 0;

    const resize = (rect: DOMRect) => {
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      let scale = dpr;
      const raw = rect.width * rect.height * dpr * dpr;
      if (raw > maxPixels) scale = dpr * Math.sqrt(maxPixels / raw);
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
    let shown = progressRef.current ?? 0;
    let running = false;
    let live = false;

    // Son girdinin (kaydırma, imleç, boyut), son karenin ve son çizimin zamanı.
    let lastInput = performance.now();
    let lastFrame = 0;
    let lastDraw = 0;
    // Sahne saati (sn): döngü dururken ilerlemiyor, devam edince zıplamıyor.
    let clock = 0;
    let speed = 1;

    let watching = true;
    let warmUntil = 0;
    let stalls = 0;
    const gaps: number[] = [];
    const paced = Math.min(pace, PACE_MAX_MS) * PACE_SLACK;
    const stopAbove = Math.max(WATCH_MEDIAN_MS, paced);
    const slowAbove = Math.max(WATCH_SLOW_MS, paced);

    const render = (now: number) => {
      frame = 0;
      const rect = canvas.getBoundingClientRect();
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      const quiet = now - lastInput;
      if (!visible || document.hidden || quiet > STOP_AFTER_MS) {
        running = false;
        lastFrame = 0;
        lastDraw = 0;
        return;
      }

      /*
       * Bekçi rAF'ın verdiği zamanı değil, geri çağrının gerçekten çalıştığı
       * anı ölçüyor: rAF zamanı karenin başladığı an; ana iş parçacığı kare
       * başladıktan sonra tıkanırsa o gecikme rAF zamanında hiç görünmüyor.
       */
      const at = performance.now();
      if (watching) {
        if (!warmUntil) {
          warmUntil = at + WATCH_WARMUP_MS;
        } else if (lastFrame && at > warmUntil) {
          const gap = at - lastFrame;
          gaps.push(gap);
          if (gap > WATCH_GAP_MS) stalls++;
          if (
            stalls >= WATCH_STALLS ||
            (gaps.length >= WATCH_FRAMES && median(gaps) > stopAbove)
          ) {
            stop();
            return;
          }
          if (gaps.length >= WATCH_FRAMES) {
            watching = false;
            if (median(gaps) > slowAbove) maxPixels *= SLOW_PIXEL_SHARE;
          }
        }
      }
      lastFrame = at;

      const target = Math.min(1, Math.max(0, progressRef.current ?? 0));
      const diff = target - shown;
      // Bekçi ölçerken her kare çiziliyor; atlanan kareler ölçümü yumuşatırdı.
      const calm = !watching && quiet > CALM_AFTER_MS && Math.abs(diff) < 0.001;
      if (calm && now - lastDraw < 30) {
        frame = requestAnimationFrame(render);
        return;
      }

      resize(rect);
      shown += Math.abs(diff) > 0.25 ? diff : diff * 0.12;

      const step = lastDraw ? Math.min(now - lastDraw, 100) : 0;
      lastDraw = now;
      const want = Math.min(1, Math.max(0, (STOP_AFTER_MS - quiet) / SLOWDOWN_MS));
      speed = want < speed ? want : Math.min(want, speed + step / 500);
      clock += (step / 1000) * speed;

      gl.uniform1f(uProg, shown);
      gl.uniform1f(uTime, clock);
      gl.uniform2f(uPtr, ptrX, ptrY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Tuval ancak içi dolu olduğu karede görünür oluyor; öncesinde siyah.
      if (!live) {
        live = true;
        canvas.classList.add("is-live");
      }

      frame = requestAnimationFrame(render);
    };

    const kick = () => {
      if (running || dead || document.hidden) return;
      running = true;
      if (watching) warmUntil = 0;
      frame = requestAnimationFrame(render);
    };

    const onInput = () => {
      lastInput = performance.now();
      kick();
    };

    const onPointer = (event: PointerEvent) => {
      ptrX = event.clientX / window.innerWidth - 0.5;
      ptrY = event.clientY / window.innerHeight - 0.5;
      onInput();
    };

    const onScheme = () => {
      readPalette();
      onInput();
    };

    // Sekme arka plandayken rAF duruyor; dönüşteki uzun boşluk ölçülmesin.
    const onVisibility = () => {
      lastFrame = 0;
      lastDraw = 0;
      warmUntil = 0;
      if (!document.hidden) onInput();
    };

    readPalette();

    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", onScheme);
    window.addEventListener("scroll", onInput, { passive: true });
    window.addEventListener("resize", onInput);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    detach = () => {
      scheme.removeEventListener("change", onScheme);
      window.removeEventListener("scroll", onInput);
      window.removeEventListener("resize", onInput);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
    };

    kick();
  };

  const waitForLink = () => {
    frame = 0;
    if (gl.isContextLost()) {
      stop();
      return;
    }
    if (
      parallel &&
      !gl.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)
    ) {
      frame = requestAnimationFrame(waitForLink);
      return;
    }
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      stop();
      return;
    }
    play();
  };

  waitForLink();
  return stop;
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

    /*
     * Kurulum sayfa yüklendikten sonra, tarayıcı boşa çıktığında başlıyor:
     * shader derlemesi ve ilk kareler hidrasyonla ve LCP ile yarışmasın.
     * O ana kadar degrade zemin görünüyor.
     */
    let stop: (() => void) | undefined;
    let cancel: (() => void) | undefined;
    let idle = 0;
    let timer = 0;
    const begin = () => {
      cancel = probeGpu((usable) => {
        cancel = undefined;
        if (!usable) return;
        cancel = measurePace((pace) => {
          cancel = undefined;
          stop = startScene(canvas, progressRef, pace);
        });
      });
    };
    const whenIdle = () => {
      // Safari'de requestIdleCallback yok
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(begin, { timeout: 2000 });
      } else {
        timer = window.setTimeout(begin, 200);
      }
    };
    if (document.readyState === "complete") whenIdle();
    else window.addEventListener("load", whenIdle, { once: true });

    return () => {
      window.removeEventListener("load", whenIdle);
      if (idle) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
      cancel?.();
      stop?.();
    };
  }, [progressRef]);

  return (
    <div className="story-scene" aria-hidden="true">
      <canvas ref={canvasRef} className="story-canvas" />
    </div>
  );
}
