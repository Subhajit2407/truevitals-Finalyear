export function TrueVitalsLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="inline-flex shrink-0 items-center gap-3 group select-none" aria-label="TrueVitals home">
      {/* 3D Glass Squircle Logo Container */}
      <div className="relative">
        <div
          className={`relative overflow-hidden rounded-[14px] sm:rounded-[16px] transition-all duration-300 group-hover:scale-105 group-hover:shadow-sky-400/30 ${
            compact ? "size-9 sm:size-10" : "size-11 sm:size-12"
          }`}
          style={{
            boxShadow:
              "0 8px 20px -4px rgba(14, 165, 233, 0.25), 0 2px 6px rgba(15, 23, 42, 0.08), inset 0 1px 1.5px rgba(255, 255, 255, 0.9)",
          }}
        >
          <img
            src="/media/logo.png"
            alt="TrueVitals Logo"
            className="h-full w-full object-cover rounded-[14px] sm:rounded-[16px]"
          />
          {/* Glass specular sheen overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-[14px] sm:rounded-[16px] border border-white/40 bg-gradient-to-tr from-white/0 via-white/20 to-white/40" />
        </div>
      </div>

      <span
        className={
          compact
            ? "font-display text-lg font-extrabold tracking-tight text-slate-900 drop-shadow-xs"
            : "font-display text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 drop-shadow-xs"
        }
      >
        True<span className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 bg-clip-text text-transparent">Vitals</span>
      </span>
    </a>
  );
}

type ActionLinkProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "dark" | "light";
  className?: string;
};

export function ActionLink({ children, href = "#", variant = "dark", className = "" }: ActionLinkProps) {
  const variants = {
    dark: "btn-3d-dark text-white",
    primary: "btn-3d-primary text-white",
    secondary: "btn-3d-light text-slate-800",
    light: "btn-3d-light text-slate-900",
  };

  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 sm:px-6 py-2.5 text-sm font-bold tracking-tight cursor-pointer ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}