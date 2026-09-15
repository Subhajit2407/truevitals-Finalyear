import { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight,
  Play,
  Pause,
  Activity,
  ChevronDown,
} from "lucide-react";

const TOTAL_FRAMES = 380;
const DURATION_SECONDS = 38;

function getFrameUrl(index: number) {
  const pad = String(index).padStart(4, "0");
  return `/media/frames/frame_${pad}.webp`;
}

interface ChapterInfo {
  id: number;
  label: string;
  subhead: string;
  progress: number;
  hudTitle: string;
  hudValue: string;
  hudMetric: string;
}

const CHAPTERS: ChapterInfo[] = [
  {
    id: 1,
    label: "01 Hospital",
    subhead: "Futuristic Clinical Facility",
    progress: 0.01,
    hudTitle: "AI Health Analysis",
    hudValue: "24 Vital Signals",
    hudMetric: "ACTIVE SCANNING",
  },
  {
    id: 2,
    label: "02 Health Scan",
    subhead: "Holographic Biometrics & Cardiac Flow",
    progress: 0.28,
    hudTitle: "Cardiac Efficiency",
    hudValue: "72 bpm · Sinus",
    hudMetric: "99.4% PRECISION",
  },
  {
    id: 3,
    label: "03 Neural Intelligence",
    subhead: "Deep Neural & Anatomical Mapping",
    progress: 0.54,
    hudTitle: "Synaptic Mapping",
    hudValue: "Optimal Synapse",
    hudMetric: "PREDICTIVE INDEX",
  },
  {
    id: 4,
    label: "04 Connected Care",
    subhead: "Physician & Patient Consultation",
    progress: 0.81,
    hudTitle: "Connected Care",
    hudValue: "Specialist Sync",
    hudMetric: "TELEMETRY LIVE",
  },
];

export function CinematicHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High performance scroll & RAF interpolation
  const targetProgress = useRef<number>(0);
  const currentProgress = useRef<number>(0);
  const rafId = useRef<number | null>(null);
  const lastRenderedFrame = useRef<number>(1);

  // Frame image cache for zero-latency 60fps scrub
  const frameCache = useRef<Map<number, HTMLImageElement>>(new Map());
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlayingFilm, setIsPlayingFilm] = useState<boolean>(false);
  const isPlayingFilmRef = useRef<boolean>(false);
  const playStartTimeRef = useRef<number>(0);
  const playStartProgressRef = useRef<number>(0);

  // Throttled UI state
  const [uiState, setUiState] = useState({
    progress: 0,
    timecode: "00:00",
    chapterIndex: 0,
  });

  // Draw frame to canvas maintaining full-bleed cinematic cover
  const drawImageToCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    if (cw === 0 || ch === 0) return;

    const iw = img.naturalWidth || 1920;
    const ih = img.naturalHeight || 1080;
    const canvasRatio = cw / ch;
    const imageRatio = iw / ih;

    let dw = cw;
    let dh = ch;
    let dx = 0;
    let dy = 0;

    if (canvasRatio > imageRatio) {
      dh = Math.round(cw / imageRatio);
      dy = Math.round((ch - dh) / 2);
    } else {
      dw = Math.round(ch * imageRatio);
      dx = Math.round((cw - dw) / 2);
    }

    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Render a specific frame index with instant nearest-frame fallback (never black)
  const renderFrameIndex = useCallback(
    (targetIndex: number) => {
      const cache = frameCache.current;
      if (cache.size === 0) return;

      let frameToDraw = cache.get(targetIndex);
      if (!frameToDraw) {
        let minDistance = Infinity;
        let closestIdx = 1;
        for (const idx of cache.keys()) {
          const dist = Math.abs(idx - targetIndex);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
        frameToDraw = cache.get(closestIdx);
      }

      if (frameToDraw && frameToDraw.complete && frameToDraw.naturalWidth > 0) {
        drawImageToCanvas(frameToDraw);
        lastRenderedFrame.current = targetIndex;
      }
    },
    [drawImageToCanvas]
  );

  // Resize canvas to match display viewport with device pixel ratio
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.floor(rect.width * dpr);
    const h = Math.floor(rect.height * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      renderFrameIndex(lastRenderedFrame.current);
    }
  }, [renderFrameIndex]);

  // Progressive frame loader: Frame 1 immediately, milestones next, then remaining in idle batches
  useEffect(() => {
    let isCancelled = false;

    const onImageLoaded = (idx: number, img: HTMLImageElement) => {
      if (isCancelled) return;
      frameCache.current.set(idx, img);

      if (idx === 1) {
        setIsReady(true);
        drawImageToCanvas(img);
      }
    };

    // 1. Immediately load frame 1 (instant visual, zero delay)
    const frame1 = new Image();
    frame1.src = getFrameUrl(1);
    frame1.onload = () => onImageLoaded(1, frame1);

    // 2. Load priority milestone frames
    const milestones = [1, 15, 30, 60, 95, 140, 185, 235, 285, 335, 380];
    milestones.forEach((idx) => {
      if (idx === 1) return;
      const img = new Image();
      img.src = getFrameUrl(idx);
      img.onload = () => onImageLoaded(idx, img);
    });

    // 3. Load remaining frames sequentially
    let currentIdx = 2;
    const BATCH_SIZE = 16;

    const loadNextBatch = () => {
      if (isCancelled || currentIdx > TOTAL_FRAMES) return;
      const end = Math.min(currentIdx + BATCH_SIZE, TOTAL_FRAMES + 1);

      for (let i = currentIdx; i < end; i++) {
        if (!frameCache.current.has(i)) {
          const img = new Image();
          img.src = getFrameUrl(i);
          img.onload = () => onImageLoaded(i, img);
        }
      }
      currentIdx = end;

      if (currentIdx <= TOTAL_FRAMES) {
        if ("requestIdleCallback" in window) {
          (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(loadNextBatch);
        } else {
          setTimeout(loadNextBatch, 35);
        }
      }
    };

    setTimeout(loadNextBatch, 80);

    return () => {
      isCancelled = true;
    };
  }, [drawImageToCanvas]);

  // Handle window resize
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Scroll physics & RAF interpolation
  useEffect(() => {
    const handleScroll = () => {
      // If user was watching continuous film, pause and return to scroll control
      if (isPlayingFilmRef.current) {
        isPlayingFilmRef.current = false;
        setIsPlayingFilm(false);
      }

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      if (scrollDistance <= 0) return;

      const currentScrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScrolled / scrollDistance));
      targetProgress.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let lastUiTimestamp = 0;

    const renderLoop = (timestamp: number) => {
      if (isPlayingFilmRef.current) {
        // Continuous smooth frame playback advancing at real-time video pace
        const elapsedSec = (timestamp - playStartTimeRef.current) / 1000;
        let p = playStartProgressRef.current + elapsedSec / DURATION_SECONDS;
        if (p >= 1) {
          p = 1;
          isPlayingFilmRef.current = false;
          setIsPlayingFilm(false);
        }
        targetProgress.current = p;
        currentProgress.current = p;
      } else {
        // Continuous smooth spring lerp
        const diff = targetProgress.current - currentProgress.current;
        if (Math.abs(diff) > 0.00005) {
          currentProgress.current += diff * 0.12;
        } else {
          currentProgress.current = targetProgress.current;
        }
      }

      const p = currentProgress.current;
      const frameIdx = Math.min(
        TOTAL_FRAMES,
        Math.max(1, Math.round(p * (TOTAL_FRAMES - 1)) + 1)
      );

      renderFrameIndex(frameIdx);

      // Throttle UI React state updates to ~25fps
      if (timestamp - lastUiTimestamp > 40) {
        lastUiTimestamp = timestamp;

        const currentTime = p * DURATION_SECONDS;
        const secs = Math.floor(currentTime);
        const mins = Math.floor(secs / 60);
        const remSecs = secs % 60;
        const timecode = `${String(mins).padStart(2, "0")}:${String(remSecs).padStart(2, "0")}`;

        let chapterIndex = 0;
        if (p >= 0.72) chapterIndex = 3;
        else if (p >= 0.46) chapterIndex = 2;
        else if (p >= 0.22) chapterIndex = 1;

        setUiState({
          progress: p,
          timecode,
          chapterIndex,
        });
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [renderFrameIndex]);

  // Click to seek to a specific cinematic chapter
  const seekToChapter = (chapterIndex: number) => {
    const container = containerRef.current;
    if (!container) return;

    if (isPlayingFilmRef.current) {
      isPlayingFilmRef.current = false;
      setIsPlayingFilm(false);
    }

    const chapter = CHAPTERS[chapterIndex];
    if (!chapter) return;

    const containerTop = container.offsetTop;
    const scrollDistance = container.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + chapter.progress * scrollDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  // Toggle "Watch Film" frame-driven continuous playback
  const togglePlayFilm = () => {
    if (isPlayingFilm) {
      isPlayingFilmRef.current = false;
      setIsPlayingFilm(false);
    } else {
      playStartTimeRef.current = performance.now();
      const startP = currentProgress.current >= 0.99 ? 0 : currentProgress.current;
      playStartProgressRef.current = startP;
      targetProgress.current = startP;
      currentProgress.current = startP;
      isPlayingFilmRef.current = true;
      setIsPlayingFilm(true);
    }
  };

  const p = uiState.progress;
  const currentChapter = CHAPTERS[uiState.chapterIndex];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-[380vh] bg-slate-950 text-white font-sans"
    >
      {/* 100vh Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">

        {/* 1. FULL-BLEED HIGH-PRECISION CINEMATIC HEALTHCARE CANVAS */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{
            opacity: isReady ? 1 : 0,
            imageRendering: "auto",
          }}
        />

        {/* 2. REFINED LIGHTER CINEMATIC SHADE (Fades away as user scrubs so the video is 100% visible) */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-full sm:w-[55%] md:w-[48%] lg:w-[42%] z-10 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to right, rgba(2, 6, 23, 0.45) 0%, rgba(2, 6, 23, 0.22) 55%, transparent 100%)",
            opacity: Math.max(0, 1 - (p - 0.04) / 0.16),
          }}
        />

        {/* Minimal hairline bottom fade for digital timecode legibility */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(2, 6, 23, 0.50) 0%, rgba(2, 6, 23, 0.08) 60%, transparent 100%)",
          }}
        />

        {/* 3. FLOATING MEDICAL HUD (Compact, tucked high and out of the way of video subjects) */}
        <div className="absolute right-4 sm:right-8 top-16 hidden md:flex flex-col items-end gap-2 z-20 pointer-events-none scale-90 origin-top-right opacity-85">
          {/* Telemetry Badge 1 */}
          <div className="flex items-center gap-2.5 rounded-full border border-white/20 bg-slate-950/30 px-3 py-1 backdrop-blur-md shadow-lg transition-all">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full size-2 bg-cyan-400" />
            </span>
            <div className="text-right">
              <div className="text-[11px] font-semibold text-white leading-tight">
                {currentChapter.hudTitle}
              </div>
              <div className="text-[10px] font-medium text-cyan-300 leading-tight">
                {currentChapter.hudValue}
              </div>
            </div>
            <span className="text-[9px] font-bold tracking-wider text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30">
              {currentChapter.hudMetric}
            </span>
          </div>

          {/* Telemetry Badge 2 */}
          <div className="rounded-full border border-white/15 bg-slate-950/25 px-2.5 py-0.5 backdrop-blur-sm flex items-center gap-1.5 text-[10px] font-mono text-slate-200 shadow-sm">
            <Activity size={10} className="text-cyan-400 animate-pulse" />
            <span>Telemetry: SYNCHRONIZED</span>
          </div>
        </div>

        {/* 4. EDITORIAL HERO CONTENT (Pure crisp white typography matching high-end editorial reference) */}
        <div className="relative z-20 flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-16 pt-16 sm:pt-20 pb-4 sm:pb-6 pointer-events-none">
          {/* Main Hero Header: Fades out gently as user scrolls past Chapter 1 so the entire video is visible */}
          <div
            className="w-full max-w-[540px] transition-all duration-300"
            style={{
              opacity: Math.max(0, Math.min(1, 1 - (p - 0.05) / 0.15)),
              transform: `translateY(${Math.min(0, -(p - 0.05) * 40)}px)`,
              pointerEvents: p > 0.16 ? "none" : "auto",
              display: p > 0.22 ? "none" : "block",
            }}
          >
            {/* Eyebrow: Pure, refined white badge with subtle glow */}
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.16em] text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              <span className="relative flex size-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-1.5 bg-cyan-400" />
              </span>
              <span>AI-POWERED CLINICAL INTELLIGENCE</span>
            </div>

            {/* Main Headline: Trustworthy, compact, medical typography */}
            <h1 className="mt-2.5 text-[30px] sm:text-[38px] md:text-[46px] lg:text-[52px] font-bold leading-[1.06] tracking-[-0.03em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
              Smarter Care.<br />
              Healthier<br />
              Tomorrow.
            </h1>

            {/* Supporting Copy: Clean pure white text, compact to maximize video visibility */}
            <p className="mt-2.5 sm:mt-3 max-w-[400px] text-[13px] sm:text-[14px] leading-[1.5] text-white/90 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              TrueVitals translates complex diagnostics into clear, verified clinical insights, personalized health roadmaps, and continuous specialist care.
            </p>

            {/* CTA Buttons */}
            <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-center gap-2.5">
              {/* Primary: Get Started → Crisp White Pill */}
              <a
                href="#features"
                className="inline-flex min-h-[38px] sm:min-h-[40px] items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-100 text-slate-950 px-5 py-1.5 text-[13px] font-semibold tracking-tight shadow-[0_12px_28px_rgba(0,0,0,0.35)] transition-all hover:scale-[1.02] cursor-pointer"
              >
                Explore Platform <ArrowRight size={13} />
              </a>

              {/* Secondary: Watch Film → Translucent Glass Pill */}
              <button
                type="button"
                onClick={togglePlayFilm}
                className="inline-flex min-h-[38px] sm:min-h-[40px] items-center justify-center gap-2 rounded-full bg-white/12 hover:bg-white/20 border border-white/30 text-white px-4 py-1.5 text-[13px] font-medium backdrop-blur-md transition-all hover:border-white/50 cursor-pointer shadow-sm"
              >
                {isPlayingFilm ? (
                  <Pause size={11} className="fill-current" />
                ) : (
                  <Play size={11} className="fill-current ml-0.5" />
                )}
                <span>{isPlayingFilm ? "Pause Film" : "Watch Film"}</span>
              </button>
            </div>

            {/* Statistics Metadata: Compact pure white stats */}
            <div className="mt-4 sm:mt-5 grid grid-cols-3 divide-x divide-white/20 border-t border-white/20 pt-3 max-w-[400px]">
              {[
                ["1M+", "Patients Served"],
                ["99.4%", "Extraction Accuracy"],
                ["24/7", "Clinical Sync"],
              ].map(([value, label]) => (
                <div key={value} className="px-3 sm:px-3.5 first:pl-0">
                  <div className="text-[18px] sm:text-[22px] lg:text-[24px] font-bold text-white leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    {value}
                  </div>
                  <span className="mt-1 block text-[10px] sm:text-[11px] font-medium text-white/80 leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. MINIMAL CINEMATIC VIDEO PROGRESS / SCROLL INDICATOR */}
        <div className="relative z-30 pb-4 pt-1 flex flex-col items-center pointer-events-auto">
          {/* Active Chapter Label + Subhead: Ultra-compact glass pill docked in bottom player */}
          {p > 0.15 && (
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/40 px-3.5 py-1 backdrop-blur-md text-[11px] sm:text-[12px] text-white/90 drop-shadow-sm animate-in fade-in slide-in-from-bottom-1">
              <span className="text-[9px] font-bold tracking-wider text-cyan-300 uppercase px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30">
                {currentChapter.label}
              </span>
              <span className="text-white/40">•</span>
              <span className="font-semibold text-white">
                {currentChapter.subhead}
              </span>
            </div>
          )}

          {/* Monospace Digital Timecode */}
          <div className="font-mono text-[12px] sm:text-[13px] font-semibold tracking-wider text-cyan-300 mb-2 drop-shadow-sm">
            {uiState.timecode} <span className="text-slate-400 font-normal">/ 00:38</span>
          </div>

          {/* Ultra-Thin Video Progress Line */}
          <div className="relative w-64 sm:w-80 h-[2px] rounded-full bg-white/20 overflow-hidden mb-2.5">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_8px_rgba(6,182,212,0.9)]"
              style={{ width: `${Math.round(p * 100)}%` }}
            />
          </div>

          {/* Minimal Chapter Selectors */}
          <div className="flex items-center gap-1 sm:gap-2 mb-1.5">
            {CHAPTERS.map((chapter, idx) => {
              const isActive = uiState.chapterIndex === idx;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => seekToChapter(idx)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(6,182,212,0.3)] font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/10 border border-transparent"
                  }`}
                >
                  {chapter.label}
                </button>
              );
            })}
          </div>

          {/* Subtle "SCROLL TO EXPLORE ↓" Indicator */}
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 animate-pulse">
            <span>Scroll to explore</span>
            <ChevronDown size={12} className="animate-bounce" />
          </div>

        </div>

      </div>
    </section>
  );
}
