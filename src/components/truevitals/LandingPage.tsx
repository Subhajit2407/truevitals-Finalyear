import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity, ArrowLeft, ArrowRight, BarChart3, BrainCircuit, ChevronRight, CirclePlay,
  FileText, HeartPulse, Instagram, Linkedin, Menu, ShieldCheck,
  Stethoscope, Upload, X, Youtube,
} from "lucide-react";
import heroHospital from "@/assets/hero-hospital-image.png.asset.json";
import carouselDiagnostics from "@/assets/carousel-diagnostics-image.png.asset.json";
import carouselHospital from "@/assets/carousel-hospital-image.png.asset.json";
import carouselAi from "@/assets/carousel-ai-image.png.asset.json";
import medicalData from "@/assets/medical-data-image.png.asset.json";
import { ActionLink, TrueVitalsLogo } from "./Brand";
import { PhoneMockup } from "./PhoneMockup";

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
  const links = [["Home", "#home"], ["Features", "#features"], ["How It Works", "#how-it-works"], ["About", "#about"]];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <nav className="page-shell flex h-18 items-center justify-between" aria-label="Primary navigation">
        <TrueVitalsLogo compact />
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => <a key={label} href={href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
        </div>
        <div className="hidden items-center gap-3 md:flex"><ActionLink href="#" variant="secondary">Sign In</ActionLink><ActionLink href="#final-cta">Get Started</ActionLink></div>
        <button type="button" className="icon-button md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </nav>
      {open && <div className="border-t border-border bg-background px-5 py-5 md:hidden">{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="block border-b border-border py-3 text-sm font-semibold">{label}</a>)}<div className="mt-4 grid grid-cols-2 gap-3"><ActionLink variant="secondary">Sign In</ActionLink><ActionLink href="#final-cta">Get Started</ActionLink></div></div>}
    </header>
  );
}

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden pt-18">
      <div className="page-shell grid min-h-[760px] items-center gap-12 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:py-24">
        <Reveal>
          <p className="eyebrow">AI-powered healthcare</p>
          <h1 className="mt-5 max-w-2xl font-display text-5xl font-bold leading-[1.02] tracking-normal text-foreground sm:text-6xl lg:text-7xl">Smarter Care.<br /><span className="text-primary">Healthier Tomorrow.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">TrueVitals uses AI to turn your medical data into clear insights, personalized care, and a healthier you.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><ActionLink href="#features">Get Started <ArrowRight size={17} /></ActionLink><ActionLink variant="secondary"><CirclePlay size={18} /> Watch Video</ActionLink></div>
          <div className="mt-12 grid grid-cols-3 divide-x divide-border">
            {[ ["1M+", "People Trust Us"], ["99%", "Data Security"], ["24/7", "Health Support"] ].map(([value, label]) => <div key={value} className="px-3 first:pl-0 sm:px-6"><strong className="font-display text-xl sm:text-2xl">{value}</strong><span className="mt-1 block text-[10px] leading-4 text-muted-foreground sm:text-xs">{label}</span></div>)}
          </div>
        </Reveal>
        <Reveal className="relative lg:-mr-20">
          <div data-placeholder="hero-hospital-image" className="hero-visual group">
            <img src={heroHospital.url} alt="Futuristic TrueVitals hospital reception" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-overlay-border bg-overlay px-5 py-4 text-overlay-foreground backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-64">
              <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><Activity size={20} /></span><div><strong className="block text-sm">Your health, connected</strong><span className="text-xs text-overlay-muted">One clear picture of care</span></div></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const features = [
  { number: "01", title: "Understand Reports", text: "Turn complex medical reports into clear, visual insights.", icon: FileText },
  { number: "02", title: "AI-Powered Insights", text: "Get personalized health guidance powered by AI.", icon: BrainCircuit },
  { number: "03", title: "Connected Care", text: "Consult with expert doctors online or in-person.", icon: Stethoscope },
  { number: "04", title: "Your Data, Your Control", text: "Secure, private, and always in your hands.", icon: ShieldCheck },
];

export function FeatureCard({ number, title, text, icon: Icon }: (typeof features)[number]) {
  return <article className="feature-card group"><div className="flex items-start justify-between"><span className="grid size-11 place-items-center rounded-xl bg-secondary text-primary transition-transform group-hover:-translate-y-1"><Icon size={21} /></span><span className="text-xs font-semibold text-muted-foreground">{number}</span></div><h3 className="mt-8 font-display text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p><ChevronRight size={18} className="mt-6 text-primary" /></article>;
}

export function WhyTrueVitals() {
  return <section id="features" className="section-space"><div className="page-shell"><Reveal className="text-center"><p className="eyebrow">Why TrueVitals</p><h2 className="section-title mt-4">More Than a Hospital — A Health Companion</h2><p className="section-copy mx-auto mt-4">From understanding your reports to personalized care, TrueVitals is with you at every step.</p></Reveal><Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{features.map((feature) => <FeatureCard key={feature.number} {...feature} />)}</Reveal></div></section>;
}

export function CategoryPills() {
  return <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2 sm:justify-center">{["All", "Facilities", "Technology", "Doctors", "Patients", "Innovation", "Care"].map((category, index) => <button key={category} type="button" className={`pill ${index === 0 ? "pill-active" : ""}`}>{category}</button>)}</div>;
}

const carouselCards = [
  { title: "Advanced Diagnostics", image: carouselDiagnostics.url, placeholder: "carousel-diagnostics-image" },
  { title: "Healthier Tomorrow", image: carouselHospital.url, placeholder: "carousel-hospital-image", featured: true },
  { title: "AI Medical Technology", image: carouselAi.url, placeholder: "carousel-ai-image" },
];

export function ExploreCarousel() {
  return <section className="section-space"><div className="page-shell"><div className="explore-band"><Reveal className="text-center"><p className="eyebrow">Explore TrueVitals</p><h2 className="section-title mt-4">See Healthcare Differently</h2><p className="section-copy mx-auto mt-4">Step into a smarter, more connected healthcare experience.</p><CategoryPills /></Reveal><Reveal className="no-scrollbar mt-10 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-1 pb-4 lg:overflow-visible">{carouselCards.map((card) => <article key={card.title} data-placeholder={card.placeholder} className={`carousel-card group snap-center ${card.featured ? "lg:featured-card" : ""}`}><img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="image-scrim" /><div className="absolute inset-x-0 bottom-0 p-5 text-overlay-foreground"><h3 className="font-display text-xl font-bold">{card.title}</h3><p className="mt-1 text-xs text-overlay-muted">Discover connected care</p></div></article>)}</Reveal><div className="mt-6 flex justify-center gap-3"><button type="button" className="icon-button" aria-label="Previous slide"><ArrowLeft size={19} /></button><button type="button" className="icon-button" aria-label="Next slide"><ArrowRight size={19} /></button></div></div></div></section>;
}

const steps = [
  { number: "01", title: "Upload Reports", text: "Securely upload your medical documents.", icon: Upload },
  { number: "02", title: "AI Analysis", text: "Our AI extracts and analyzes key health data.", icon: BrainCircuit },
  { number: "03", title: "Get Insights", text: "View personalized insights and next steps.", icon: BarChart3 },
];

export function StepItem({ number, title, text, icon: Icon }: (typeof steps)[number]) {
  return <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-4"><span className="text-xs font-bold text-primary">{number}</span><div className="grid grid-cols-[auto_minmax(0,1fr)] gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-secondary text-primary"><Icon size={17} /></span><div className="min-w-0"><h3 className="text-sm font-bold">{title}</h3><p className="mt-1 text-sm leading-5 text-muted-foreground">{text}</p></div></div></div>;
}

export function HowItWorks() {
  return <section id="how-it-works" className="section-space"><div className="page-shell grid items-center gap-12 lg:grid-cols-2"><Reveal><p className="eyebrow">How it works</p><h2 className="section-title mt-4 max-w-xl">From Reports to Real Insights<br />in 3 Simple Steps</h2><p className="section-copy mt-4">Upload your medical reports and let TrueVitals do the rest.</p><div className="mt-9 space-y-7">{steps.map((step) => <StepItem key={step.number} {...step} />)}</div><ActionLink href="#" className="mt-9">Learn More <ArrowRight size={17} /></ActionLink></Reveal><Reveal><div data-placeholder="medical-data-image" className="medical-visual group"><img src={medicalData.url} alt="Medical data and connected care visualization" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-image-wash" /><div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-overlay-border bg-overlay p-5 text-overlay-foreground backdrop-blur-xl"><HeartPulse className="text-accent" /><p className="mt-3 text-sm font-semibold">Clear insights from your connected health data.</p></div></div></Reveal></div></section>;
}

export function StatsStrip() {
  return <section><Reveal className="page-shell"><div className="stats-strip">{[["1M+", "People Trust TrueVitals"], ["500+", "Expert Doctors"], ["99%", "Secure & Private"], ["4.9/5", "User Satisfaction"]].map(([value, label]) => <div key={value} className="px-4 py-5 text-center"><strong className="font-display text-3xl font-bold text-primary">{value}</strong><span className="mt-2 block text-xs text-muted-foreground">{label}</span></div>)}</div></Reveal></section>;
}

export function MobileAppSection() {
  return <section className="section-space"><div className="page-shell"><Reveal className="app-band"><div className="max-w-lg py-6 lg:py-10"><p className="eyebrow">Always with you</p><h2 className="section-title mt-4">TrueVitals on Your Phone</h2><p className="section-copy mt-4">Access your health data, book appointments, and get AI insights anytime, anywhere.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><ActionLink variant="secondary">Download on the App Store</ActionLink><ActionLink variant="secondary">Get it on Google Play</ActionLink></div></div><div className="phone-stage"><PhoneMockup variant="overview" /><PhoneMockup variant="insights" /></div></Reveal></div></section>;
}

const testimonials = [
  { name: "Riya Sharma", role: "Verified User", quote: "TrueVitals helped me understand my reports so easily. The AI insights are incredibly helpful.", initials: "RS" },
  { name: "Arjun Mehta", role: "Verified User", quote: "Booking appointments and tracking my health has never been this simple.", initials: "AM" },
  { name: "Dr. Neha Kapoor", role: "Healthcare Professional", quote: "TrueVitals bridges the gap between technology and real patient care.", initials: "NK" },
];

export function TestimonialCard({ name, role, quote, initials }: (typeof testimonials)[number]) {
  return <article className="testimonial-card snap-center"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-full bg-secondary text-sm font-bold text-primary">{initials}</span><div><h3 className="text-sm font-bold">{name}</h3><p className="text-xs text-muted-foreground">{role}</p></div></div><p className="mt-6 text-sm leading-6 text-muted-foreground">“{quote}”</p><div className="mt-5 text-sm text-rating" aria-label="5 out of 5 stars">★★★★★</div></article>;
}

export function Testimonials() {
  return <section id="about" className="section-space"><div className="page-shell"><Reveal className="text-center"><p className="eyebrow">Testimonials</p><h2 className="section-title mt-4">Real People. Real Progress.</h2></Reveal><Reveal className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">{testimonials.map((item) => <TestimonialCard key={item.name} {...item} />)}</Reveal><div className="mt-6 flex justify-center gap-3"><button type="button" className="icon-button" aria-label="Previous testimonial"><ArrowLeft size={19} /></button><button type="button" className="icon-button" aria-label="Next testimonial"><ArrowRight size={19} /></button></div></div></section>;
}

export function FinalCTA() {
  return <section id="final-cta"><Reveal className="page-shell"><div className="cta-band"><div><h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">Ready for a Healthier Tomorrow?</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-cta-muted">Join TrueVitals today and take control of your health with smarter insights and connected care.</p></div><ActionLink variant="light">Get Started <ArrowRight size={17} /></ActionLink></div></Reveal></section>;
}

export function Footer() {
  const groups = [
    ["Product", "Features", "How It Works", "Pricing", "Download App"],
    ["Company", "About Us", "Careers", "Blog", "Contact"],
    ["Resources", "Help Center", "Privacy Policy", "Terms of Service", "Cookie Policy"],
  ];
  return <footer className="mt-20 border-t border-border"><div className="page-shell grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr]"><div><TrueVitalsLogo /><p className="mt-4 text-sm text-muted-foreground">Smarter Care. Healthier Tomorrow.</p><div className="mt-6 flex gap-2">{[[Linkedin,"LinkedIn"],[X,"X"],[Instagram,"Instagram"],[Youtube,"YouTube"]].map(([Icon,label]) => { const SocialIcon = Icon as typeof Linkedin; return <a href="#" key={String(label)} aria-label={String(label)} className="icon-button"><SocialIcon size={17} /></a>; })}</div></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{groups.map(([heading, ...items]) => <div key={heading}><h3 className="text-xs font-bold uppercase text-foreground">{heading}</h3><ul className="mt-5 space-y-3">{items.map((item) => <li key={item}><a href="#" className="text-sm text-muted-foreground transition-colors hover:text-primary">{item}</a></li>)}</ul></div>)}</div></div><div className="border-t border-border"><div className="page-shell py-6 text-xs text-muted-foreground">© 2026 TrueVitals. All rights reserved.</div></div></footer>;
}

export default function LandingPage() {
  return <div className="min-h-screen overflow-x-hidden bg-background"><Navbar /><main><HeroSection /><WhyTrueVitals /><ExploreCarousel /><HowItWorks /><StatsStrip /><MobileAppSection /><Testimonials /><FinalCTA /></main><Footer /></div>;
}