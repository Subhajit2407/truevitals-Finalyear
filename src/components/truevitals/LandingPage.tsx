import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity, ArrowLeft, ArrowRight, BarChart3, BrainCircuit, ChevronRight, CirclePlay,
  FileText, HeartPulse, Instagram, Linkedin, Menu, Search, ShieldCheck,
  Stethoscope, Upload, X, Youtube, Star, Check, Sparkles, Droplets, Thermometer,
  Users, TrendingUp, Play
} from "lucide-react";
import { ActionLink, TrueVitalsLogo } from "./Brand";
import { PhoneMockup, FloatingInsightsBadge } from "./PhoneMockup";
import { CinematicHero } from "./CinematicHero";

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { element.dataset["visible"] = "true"; observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "#home"],
    ["Features", "#features"],
    ["How It Works", "#how-it-works"],
    ["About", "#about"],
    ["Pricing", "#pricing"],
  ];

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl pointer-events-none transition-all">
      <nav
        className="pointer-events-auto relative w-full h-[50px] sm:h-[52px] rounded-full px-4 sm:px-6 flex items-center justify-between transition-all"
        style={{
          background: "rgba(255, 255, 255, 0.64)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          boxShadow:
            "0 12px 30px -8px rgba(3, 12, 30, 0.15), 0 2px 6px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)",
        }}
        aria-label="Primary navigation"
      >
        {/* Subtle Top Specular Sheen */}
        <div className="pointer-events-none absolute inset-x-10 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

        <TrueVitalsLogo compact />

        {/* Clean Modern Navigation Links */}
        <div className="hidden items-center gap-0.5 md:flex">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition-all duration-150 cursor-pointer ${
                label === "Home"
                  ? "bg-white/80 text-slate-900 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/40"
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {/* Search Icon Button */}
          <button
            type="button"
            aria-label="Search"
            className="grid size-8 place-items-center rounded-full text-slate-600 hover:text-slate-900 hover:bg-white/60 transition-colors cursor-pointer"
          >
            <Search size={15} />
          </button>

          {/* Sign In */}
          <a
            href="#signin"
            className="px-2.5 py-1 text-[13px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            Sign In
          </a>

          {/* Get Started Dark Navy Pill Button */}
          <ActionLink
            href="#final-cta"
            variant="dark"
            className="text-[13px] px-4 py-1.5 min-h-[34px] rounded-full bg-slate-950 hover:bg-slate-900 text-white font-semibold shadow-xs hover:shadow transition-all"
          >
            Get Started <ArrowRight size={13} />
          </ActionLink>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="size-8 rounded-full grid place-items-center md:hidden text-slate-700 bg-white/70 border border-white/50 cursor-pointer"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={16} /> : <Menu size={16} />}
        </button>

        {/* Mobile Floating Dropdown Sheet with 3D Border */}
        {open && (
          <div className="absolute top-[calc(100%+10px)] inset-x-2 macos-glass-card rounded-2xl p-4 shadow-xl md:hidden border border-white/80 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Navigation</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            </div>
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-600 transition-colors"
              >
                {label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-col gap-2">
              <a href="#signin" className="py-1.5 text-center text-xs font-semibold text-slate-700 hover:text-sky-600">
                Sign In
              </a>
              <ActionLink href="#final-cta" variant="primary" className="w-full text-xs">
                Get Started <ArrowRight size={13} />
              </ActionLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export function HeroSection() {
  return <CinematicHero />;
}

const features = [
  {
    title: "Understand Reports",
    text: "Turn complex medical reports into clear, visual insights.",
    icon: FileText,
  },
  {
    title: "AI-Powered Insights",
    text: "Get personalized health analysis powered by AI.",
    icon: BrainCircuit,
  },
  {
    title: "Connected Care",
    text: "Consult with expert doctors online or in-person.",
    icon: Stethoscope,
  },
  {
    title: "Your Data, Your Control",
    text: "Secure, private, and always in your hands.",
    icon: ShieldCheck,
  },
];

export function FeatureCard({
  title,
  text,
  icon: Icon,
  badge = "SMART CARE",
  index = 0,
}: (typeof features)[number] & { badge?: string; index?: number }) {
  const telemetryList = [
    "99.4% Extraction Precision",
    "Real-Time Neural Diagnostics",
    "24/7 Verified Doctor Sync",
    "Zero-Knowledge 256-Bit Vault",
  ];

  return (
    <article className="group relative flex flex-col justify-between rounded-[2.25rem] p-7 cursor-pointer transition-all duration-300 bg-gradient-to-b from-white via-white/95 to-slate-50/90 border-3d-layered border-3d-layered-hover overflow-hidden">
      {/* 3D Top Specular Bevel Line */}
      <div className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

      <div>
        <div className="flex items-center justify-between mb-5">
          {/* 3D Recessed Socket with Raised Squircle Icon */}
          <div className="recessed-socket size-16 rounded-[22px] grid place-items-center">
            <div className="squircle-3d size-12 rounded-[16px] grid place-items-center bg-gradient-to-tr from-sky-500 via-sky-600 to-cyan-400 text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2">
              <Icon size={22} strokeWidth={2.4} />
            </div>
          </div>

          {/* 3D Glass Pill Badge */}
          <span className="pill-3d inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-sky-700">
            <span className="size-1.5 rounded-full bg-sky-500 animate-pulse" />
            {badge}
          </span>
        </div>

        {/* Telemetry Micro-Badge */}
        <div className="mb-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50/90 border border-sky-200/60 text-[10px] font-bold text-sky-700">
          <Check size={11} className="text-sky-500" />
          <span>{telemetryList[index % telemetryList.length]}</span>
        </div>

        <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 font-medium">{text}</p>
      </div>

      <div className="mt-7 pt-4 border-t border-slate-200/70 flex items-center justify-between">
        <div className="btn-3d-light px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1.5 group-hover:border-sky-300">
          <span>Explore Insights</span>
          <ArrowRight size={13} className="text-sky-600 transition-transform group-hover:translate-x-1" />
        </div>
        <span className="text-[11px] font-mono font-bold text-slate-400">0{index + 1}</span>
      </div>
    </article>
  );
}

export function WhyTrueVitals() {
  const badgeMap = ["AI DIAGNOSTICS", "NEURAL INSIGHTS", "TELEHEALTH", "ZERO-KNOWLEDGE"];
  return (
    <section id="features" className="py-24 sm:py-32 bg-gradient-to-b from-sky-50/60 via-slate-50/80 to-sky-50/50 dot-grid-bg relative overflow-hidden">
      {/* 3D Ambient Glowing Light Wells */}
      <div className="pointer-events-none absolute -top-40 right-1/4 size-[500px] rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 size-[500px] rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="page-shell relative z-10">
        <Reveal className="text-center">
          <div className="pill-3d inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 shadow-md">
            <span className="text-xs leading-none">✨</span>
            <span>WHY TRUEVITALS</span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            More Than a Hospital — A Health Companion
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 font-medium sm:text-lg">
            From understanding your reports to personalized care, TrueVitals is with you at every step.
          </p>
        </Reveal>

        {/* 3D Elevated Stage Deck containing the 4 cards */}
        <Reveal className="mt-14">
          <div className="rounded-[3rem] p-3 sm:p-6 bg-slate-200/45 border-2 border-white/90 ring-1 ring-slate-300/40 shadow-inner backdrop-blur-xs">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, idx) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  badge={badgeMap[idx % badgeMap.length]}
                  index={idx}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const categories = ["All", "Facilities", "Technology", "Doctors", "Patients", "Innovation", "Care"];

export function ExploreCarousel() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselCards = [
    {
      title: "Advanced Diagnostics",
      image: "/images/carousel-diagnostics.jpg",
      featured: false,
    },
    {
      title: "A Healthier Tomorrow",
      subtitle: "Smarter care. Real possibilities.",
      image: "/images/carousel-hospital.jpg",
      featured: true,
    },
    {
      title: "AI Medical Technology",
      image: "/images/carousel-ai.jpg",
      featured: false,
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-gradient-to-b from-white via-sky-50/50 to-white relative overflow-hidden">
      {/* 3D Atmospheric Mesh Light Wells */}
      <div className="pointer-events-none absolute top-10 left-1/4 size-[460px] rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-1/4 size-[460px] rounded-full bg-sky-200/30 blur-3xl" />

      <div className="page-shell relative z-10">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 shadow-md backdrop-blur-md ring-1 ring-sky-300/40">
            <span className="text-xs leading-none">✨</span>
            <span>EXPLORE TRUEVITALS</span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            See Healthcare Differently
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 font-medium sm:text-lg">
            Step into a smarter, more connected healthcare experience with cinematic 3D telemetry.
          </p>

          {/* 3D Recessed Category Dock */}
          <div className="mt-9 inline-flex items-center gap-2 p-2 rounded-full recessed-socket max-w-full overflow-x-auto no-scrollbar shadow-inner">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 sm:px-5 py-2 text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === category
                    ? "btn-3d-dark text-white shadow-md scale-[1.03]"
                    : "pill-3d text-slate-700 hover:text-sky-600 hover:scale-[1.02]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        {/* 3D Perspective Carousel Container inside macOS Window Chassis */}
        <Reveal className="relative mt-14">
          <div className="macos-window border-3d-panel p-3 sm:p-6 bg-gradient-to-b from-slate-100/95 via-white/95 to-slate-100/90 backdrop-blur-2xl">
            {/* macOS Window Titlebar with Traffic Lights */}
            <div className="flex items-center justify-between px-4 py-3.5 mb-5 rounded-2xl recessed-socket">
              <div className="flex items-center gap-2">
                <span className="traffic-dot traffic-dot-red" />
                <span className="traffic-dot traffic-dot-yellow" />
                <span className="traffic-dot traffic-dot-green" />
              </div>
              <div className="flex items-center gap-2 px-4 py-1 rounded-full pill-3d text-xs font-bold text-slate-800">
                <ShieldCheck size={13} className="text-sky-500" />
                <span>TrueVitals Visual Explorer · 3D Telemetry Studio</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCarouselIndex((prev) => (prev > 0 ? prev - 1 : carouselCards.length - 1))}
                  className="btn-3d-light size-9 rounded-full grid place-items-center text-slate-700 hover:text-sky-600 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ArrowLeft size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => setCarouselIndex((prev) => (prev < carouselCards.length - 1 ? prev + 1 : 0))}
                  className="btn-3d-light size-9 rounded-full grid place-items-center text-slate-700 hover:text-sky-600 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Cards Grid with 3D Depth & Layered Borders */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-2">
              {carouselCards.map((card, i) => (
                <div
                  key={card.title}
                  className={`relative overflow-hidden rounded-[2.5rem] transition-all duration-500 group cursor-pointer ${
                    card.featured
                      ? "md:scale-105 z-20 h-[380px] sm:h-[440px] shadow-[0_30px_60px_-15px_rgba(14,165,233,0.35),0_0_0_2px_rgba(56,189,248,0.9),0_8px_0_0_rgba(2,132,199,0.85)] border-2 border-white"
                      : "h-[340px] sm:h-[390px] shadow-[0_20px_40px_-12px_rgba(15,23,42,0.15),0_0_0_1.5px_rgba(203,213,225,0.8),0_6px_0_0_rgba(203,213,225,0.8)] border-2 border-white hover:scale-[1.02]"
                  }`}
                >
                  {/* Top Specular Sheen */}
                  <div className="pointer-events-none absolute inset-x-8 top-0 z-20 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent" />

                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                  {/* 3D Glass Pill Tag */}
                  <div className="absolute top-5 left-5 z-20 pill-3d px-3.5 py-1.5 rounded-full text-[11px] font-bold text-slate-900 bg-white/95 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                    <span className="size-2 rounded-full bg-sky-500 animate-pulse" />
                    <span>{card.featured ? "Featured Clinical Hub" : "Innovation Wing"}</span>
                  </div>

                  {/* Bottom 3D Glass Plaque */}
                  <div className="absolute inset-x-4 bottom-4 z-20 rounded-2xl macos-glass-card p-4 sm:p-5 border border-white/80 shadow-xl backdrop-blur-xl">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">{card.title}</h3>
                    {card.subtitle && (
                      <p className="mt-1 text-xs text-sky-700 font-bold">{card.subtitle}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Indicators */}
            <div className="mt-8 flex justify-center gap-2 pb-2">
              <span className="h-2 w-8 rounded-full bg-sky-500 shadow-sm" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
              <span className="h-2 w-2 rounded-full bg-slate-300" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Upload Reports",
    text: "Securely upload your medical documents.",
    icon: Upload,
  },
  {
    number: "02",
    title: "AI Analysis",
    text: "Our AI extracts and analyzes key health data.",
    icon: Search,
  },
  {
    number: "03",
    title: "Get Insights",
    text: "View personalized insights and next steps.",
    icon: BarChart3,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-gradient-to-b from-white via-sky-50/50 to-slate-50/70 dot-grid-bg relative overflow-hidden">
      <div className="page-shell grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="pill-3d inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 shadow-md">
            <span className="text-xs leading-none">✨</span>
            <span>HOW IT WORKS</span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            From Reports to Real Insights<br />in 3 Simple Steps
          </h2>
          <p className="mt-4 text-base text-slate-600 font-medium sm:text-lg">
            Upload your medical reports and let TrueVitals AI do the rest with clinically calibrated precision.
          </p>

          <div className="relative mt-10 space-y-6">
            {/* 3D Vertical Conduit Cable connecting steps */}
            <div className="pointer-events-none absolute left-[31px] top-8 bottom-8 w-1 rounded-full bg-gradient-to-b from-sky-400 via-sky-500 to-cyan-400 shadow-[0_0_10px_rgba(14,165,233,0.6)] z-0" />

            {steps.map((step, idx) => {
              const stepBadges = ["DICOM & PDF v4", "NEURAL PARSER 4.0", "ACTIONABLE REPORT"];
              return (
                <div
                  key={step.number}
                  className="group relative z-10 flex items-start gap-5 p-6 rounded-[2.25rem] bg-gradient-to-b from-white via-white/95 to-slate-50/90 border-3d-layered border-3d-layered-hover cursor-pointer overflow-hidden"
                >
                  {/* 3D Top Specular Bevel Line */}
                  <div className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

                  {/* 3D Recessed Socket with Raised Number Badge */}
                  <div className="recessed-socket size-16 rounded-[22px] grid place-items-center shrink-0">
                    <div className="squircle-3d size-12 rounded-[16px] grid place-items-center bg-gradient-to-tr from-sky-500 via-sky-600 to-cyan-400 text-white font-display text-base font-bold shadow-md group-hover:scale-110 transition-transform">
                      {step.number}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <step.icon size={17} className="text-sky-600" />
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {step.title}
                        </h3>
                      </div>
                      <span className="pill-3d px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-sky-700 shadow-xs">
                        {stepBadges[idx]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 font-medium leading-relaxed">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10">
            <ActionLink href="#final-cta" variant="dark" className="px-8 py-3.5">
              Experience the Workflow <ArrowRight size={16} />
            </ActionLink>
          </div>
        </Reveal>

        {/* 3D Holographic Body Scanner in macOS Dark Pro Window */}
        <Reveal className="relative">
          <div className="macos-window border-3d-panel bg-slate-950 shadow-[0_36px_72px_-15px_rgba(0,0,0,0.85),0_0_0_1.5px_rgba(56,189,248,0.3),0_8px_0_0_#0f172a]">
            {/* macOS Pro Dark Titlebar */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-slate-900/95 border-b border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="traffic-dot traffic-dot-red" />
                <span className="traffic-dot traffic-dot-yellow" />
                <span className="traffic-dot traffic-dot-green" />
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-white/10 text-[11px] font-bold text-sky-300 shadow-inner">
                <BrainCircuit size={12} className="text-cyan-400" />
                <span>Biometric Neural Diagnostics · 3D Live Feed</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-cyan-400">
                <span className="size-2 rounded-full bg-cyan-400 animate-ping" />
                <span>3D HUD</span>
              </div>
            </div>

            <div className="relative overflow-hidden p-2.5">
              <img
                src="/images/holographic-body.jpg"
                alt="Holographic human body scan with glowing health metrics"
                className="h-[480px] sm:h-[550px] w-full object-cover rounded-2xl"
              />

              {/* Floating Organ Status Pills on the Left with 3D Depth */}
              <div className="absolute top-8 left-6 space-y-2.5">
                {[
                  { label: "Heart Health", status: "Stable", icon: HeartPulse, color: "text-rose-400" },
                  { label: "Lung Function", status: "Normal", icon: Activity, color: "text-cyan-400" },
                  { label: "Liver Health", status: "Normal", icon: ShieldCheck, color: "text-emerald-400" },
                  { label: "Bone Density", status: "Good", icon: Sparkles, color: "text-amber-400" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-full border border-white/25 bg-slate-950/80 px-4 py-2 text-xs text-white backdrop-blur-xl shadow-xl transition-transform hover:scale-105"
                  >
                    <item.icon size={14} className={item.color} />
                    <span className="font-bold">{item.label}</span>
                    <span className="text-cyan-300 font-semibold">{item.status}</span>
                  </div>
                ))}
              </div>

              {/* Floating Vitals Overview Card on the Right with 3D Sheen */}
              <div className="absolute top-8 right-6 w-48 rounded-2xl border border-white/25 bg-slate-950/85 p-4 text-white backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Biometrics</p>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Normal</span>
                </div>

                <div className="mt-2.5 flex items-baseline gap-1.5">
                  <HeartPulse size={15} className="text-rose-400" />
                  <strong className="font-display text-xl font-bold">72</strong>
                  <span className="text-[10px] text-slate-400 font-semibold">bpm</span>
                </div>
                {/* Mini pulse wave */}
                <svg className="my-2 h-4 w-full text-cyan-400" viewBox="0 0 100 20" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M0 10 L25 10 L35 2 L45 18 L55 6 L65 14 L75 10 L100 10" />
                </svg>

                <div className="mt-2 space-y-1.5 text-[11px] border-t border-white/10 pt-2.5">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1"><Droplets size={11} className="text-cyan-400" /> Serum Oxygen</span>
                    <strong className="text-white font-bold">98%</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1"><Thermometer size={11} className="text-amber-400" /> Body Temp</span>
                    <strong className="text-white font-bold">36.6°C</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function StatsStrip() {
  return (
    <section className="py-20 bg-gradient-to-b from-sky-50/50 via-slate-50/80 to-white dot-grid-bg relative overflow-hidden">
      <div className="page-shell">
        <Reveal>
          {/* 3D Elevated Control Center Chassis */}
          <div className="border-3d-panel rounded-[3.25rem] p-4 sm:p-7 bg-gradient-to-b from-white/90 via-sky-50/60 to-white/80 backdrop-blur-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {[
                { val: "1M+", label: "People Trust TrueVitals", icon: Users, status: "Active" },
                { val: "500+", label: "Expert Doctors", icon: Stethoscope, status: "Verified" },
                { val: "99%", label: "Secure & Private", icon: ShieldCheck, status: "Encrypted" },
                { val: "4.9/5", label: "User Satisfaction", icon: Star, status: "Top Rated" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group relative flex items-center gap-4 sm:gap-5 p-5 sm:p-6 rounded-[2.25rem] bg-gradient-to-b from-white via-white/95 to-slate-50/90 border-3d-layered border-3d-layered-hover cursor-pointer overflow-hidden"
                >
                  {/* Top Specular Reflection */}
                  <div className="pointer-events-none absolute inset-x-5 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

                  {/* Corner Status Dot */}
                  <span className="absolute top-3.5 right-4 size-2 rounded-full bg-emerald-500 animate-pulse shadow-xs" title={stat.status} />

                  {/* 3D Recessed Socket with Squircle Icon */}
                  <div className="recessed-socket size-15 rounded-2xl grid place-items-center shrink-0">
                    <div className="squircle-3d size-11 rounded-xl grid place-items-center bg-gradient-to-tr from-sky-500 via-sky-600 to-cyan-400 text-white shadow-md group-hover:scale-110 transition-transform">
                      <stat.icon size={20} strokeWidth={2.4} />
                    </div>
                  </div>
                  <div>
                    <strong className="font-display text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {stat.val}
                    </strong>
                    <span className="block text-xs text-slate-500 font-bold">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function MobileAppSection() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-sky-50/50 to-white dot-grid-bg relative">
      <div className="page-shell">
        <Reveal className="relative overflow-hidden rounded-[3.25rem] macos-glass-card border-3d-panel p-8 sm:p-14 shadow-2xl">
          {/* Ambient background glow */}
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-cyan-300/30 blur-3xl" />

          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="pill-3d inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 shadow-md">
                <span className="text-xs leading-none">✨</span>
                <span>ALWAYS WITH YOU</span>
              </div>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                TrueVitals on Your Phone
              </h2>
              <p className="mt-4 text-base text-slate-600 font-medium sm:text-lg leading-relaxed">
                Access your health data, book appointments, and get AI insights anytime, anywhere with seamless biometric encryption.
              </p>

              {/* 3D App Store / Google Play buttons */}
              <div className="mt-9 flex flex-wrap gap-4">
                {/* App Store Button */}
                <a
                  href="#app-store"
                  className="btn-3d-dark inline-flex items-center gap-3.5 rounded-2xl px-6 py-3.5 text-white cursor-pointer"
                >
                  <svg className="size-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.49 2.64-1.24Z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] leading-tight text-slate-300 font-semibold">Download on the</p>
                    <p className="text-sm font-bold leading-tight">App Store</p>
                  </div>
                </a>

                {/* Google Play Button */}
                <a
                  href="#google-play"
                  className="btn-3d-dark inline-flex items-center gap-3.5 rounded-2xl px-6 py-3.5 text-white cursor-pointer"
                >
                  <svg className="size-6" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M3.61 2.05L13.88 12.32 11.23 15 2.1 4.54c.43-.88 1.05-1.74 1.51-2.49z" />
                    <path fill="#4285F4" d="M21.2 10.98l-3.32-1.89-3.99 3.23 3.99 3.23 3.32-1.89c.98-.56.98-2.12 0-2.68z" />
                    <path fill="#FBBC04" d="M2.1 4.54L11.23 15l2.65-2.68L3.61 2.05C3.08 2.92 2.57 3.74 2.1 4.54z" />
                    <path fill="#34A853" d="M2.1 19.46c.47.8 1 1.62 1.51 2.49l10.27-10.27-2.65-2.68L2.1 19.46z" />
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] leading-tight text-slate-300 font-semibold">GET IT ON</p>
                    <p className="text-sm font-bold leading-tight">Google Play</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Phone Stage + Floating Badge with 3D Pedestal */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-6 pt-6 sm:pt-0">
              {/* 3D Glass Pedestal Base Shadow */}
              <div className="pointer-events-none absolute -bottom-6 inset-x-8 h-10 rounded-full bg-gradient-to-r from-sky-400/20 via-sky-500/30 to-cyan-400/20 blur-xl z-0" />
              <div className="pointer-events-none absolute bottom-0 inset-x-12 h-3 rounded-full bg-slate-400/25 blur-xs z-0" />

              <div className="relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                <PhoneMockup variant="overview" />
              </div>
              <div className="relative z-10 transition-transform duration-300 hover:scale-[1.02]">
                <PhoneMockup variant="insights" />
              </div>

              <div className="absolute -bottom-4 right-2 sm:right-6 z-20">
                <FloatingInsightsBadge />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Riya Sharma",
    role: "Verified User",
    quote: "TrueVitals helped me understand my reports so easily. The AI insights are incredibly helpful.",
    avatar: "/images/avatar-riya.jpg",
  },
  {
    name: "Arjun Mehta",
    role: "Verified User",
    quote: "Booking appointments and tracking my health has never been this simple. Amazing experience!",
    avatar: "/images/avatar-arjun.jpg",
  },
  {
    name: "Dr. Neha Kapoor",
    role: "Healthcare Professional",
    quote: "TrueVitals is a game-changer. It bridges the gap between technology and real patient care.",
    avatar: "/images/avatar-neha.jpg",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-sky-50/40 to-slate-50/60 dot-grid-bg relative">
      <div className="page-shell">
        <Reveal className="text-center">
          <div className="pill-3d inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-sky-700 shadow-md">
            <span className="text-xs leading-none">✨</span>
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Real People. Real Progress.
          </h2>
        </Reveal>

        <Reveal className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="border-3d-layered border-3d-layered-hover flex flex-col justify-between rounded-[2.25rem] p-7 relative overflow-hidden bg-gradient-to-b from-white via-white/95 to-slate-50/90 cursor-pointer"
            >
              {/* Top Specular Line */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-sky-300 to-transparent" />

              <div>
                <div className="flex items-center gap-4">
                  {/* Recessed Avatar Socket */}
                  <div className="recessed-socket size-14 rounded-full grid place-items-center shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="size-11 rounded-full object-cover ring-2 ring-white shadow-sm"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                    <p className="text-xs font-bold text-sky-600">{item.role}</p>
                  </div>
                </div>

                {/* 3D Star Rating Bar */}
                <div className="mt-5 pill-3d px-3 py-1 rounded-full inline-flex items-center gap-1 text-amber-400 w-fit" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="text-[11px] font-bold text-slate-700 ml-1">5.0</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-700 font-medium">
                  “{item.quote}”
                </p>
              </div>
            </article>
          ))}
        </Reveal>

        {/* Carousel Arrow Navigation */}
        <div className="mt-10 flex justify-center gap-3">
          <button
            type="button"
            className="btn-3d-light grid size-11 place-items-center rounded-full text-slate-700 hover:text-sky-600 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="btn-3d-light grid size-11 place-items-center rounded-full text-slate-700 hover:text-sky-600 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section id="final-cta" className="py-20 bg-gradient-to-b from-white via-slate-50/80 to-sky-50/60 relative">
      <div className="page-shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-[3.25rem] bg-gradient-to-r from-[#0C2340] via-[#004B87] to-[#0077B6] p-8 sm:p-14 text-white border-3d-panel shadow-[0_36px_72px_-14px_rgba(2,132,199,0.45),0_0_0_2px_rgba(255,255,255,0.4),0_8px_0_0_#071d36]">
            {/* Ambient cyan glow */}
            <div className="pointer-events-none absolute right-1/4 top-0 size-96 rounded-full bg-cyan-400/25 blur-3xl" />
            {/* Top specular edge reflection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Ready for a Healthier Tomorrow?
                </h2>
                <p className="mt-4 text-sm sm:text-base text-sky-100 font-medium leading-relaxed">
                  Join TrueVitals today and take control of your health with smarter insights and connected care.
                </p>
              </div>

              {/* 3D Glass Logo Emblem + Tactile Button */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                  <div className="recessed-socket p-2 rounded-3xl">
                    <div
                      className="size-20 sm:size-24 rounded-2xl overflow-hidden p-1 bg-white/20 backdrop-blur-md border-2 border-white/60 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        boxShadow: "0 12px 32px -4px rgba(14, 165, 233, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.9)",
                      }}
                    >
                      <img
                        src="/media/logo.png"
                        alt="TrueVitals 3D Glass Emblem"
                        className="size-full rounded-xl object-cover"
                      />
                    </div>
                  </div>
                </div>

                <a
                  href="#home"
                  className="btn-3d-light inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-slate-900 cursor-pointer shadow-2xl"
                >
                  Get Started <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const groups = [
    {
      title: "Product",
      links: ["Features", "How It Works", "Pricing", "Download App"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Contact"],
    },
    {
      title: "Resources",
      links: ["Help Center", "Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ];

  return (
    <footer className="mt-16 border-t border-slate-100 bg-white/70 backdrop-blur-xl">
      <div className="page-shell grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <TrueVitalsLogo />
          <p className="mt-4 text-sm text-slate-500 font-medium">
            Smarter Care. Healthier Tomorrows.
          </p>

          <div className="mt-6 flex gap-2.5">
            {[
              [Linkedin, "LinkedIn"],
              [Activity, "X"],
              [Instagram, "Instagram"],
              [Youtube, "YouTube"],
            ].map(([Icon, label]) => {
              const SocialIcon = Icon as typeof Linkedin;
              return (
                <a
                  href="#"
                  key={String(label)}
                  aria-label={String(label)}
                  className="btn-3d-light grid size-9 place-items-center rounded-full text-slate-600 hover:text-sky-600 transition-colors"
                >
                  <SocialIcon size={16} />
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 font-medium transition-colors hover:text-sky-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100/80">
        <div className="page-shell flex flex-col sm:flex-row items-center justify-between py-6 text-xs text-slate-400 font-medium gap-3">
          <div>© 2026 TrueVitals. All rights reserved.</div>
          <div className="flex items-center gap-2">
            <span>Your Health Matters</span>
            <span className="h-0.5 w-8 rounded-full bg-sky-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-clip bg-white text-slate-900 selection:bg-sky-500 selection:text-white">
      <Navbar />
      <main>
        <HeroSection />
        <WhyTrueVitals />
        <ExploreCarousel />
        <HowItWorks />
        <StatsStrip />
        <MobileAppSection />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}