import { Plus } from "lucide-react";

export function TrueVitalsLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#home" className="inline-flex shrink-0 items-center gap-2" aria-label="TrueVitals home">
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-brand">
        <Plus size={22} strokeWidth={3} aria-hidden="true" />
      </span>
      <span className={compact ? "font-display text-lg font-bold" : "font-display text-xl font-bold"}>
        True<span className="text-primary">Vitals</span>
      </span>
    </a>
  );
}

type ActionLinkProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

export function ActionLink({ children, href = "#", variant = "primary", className = "" }: ActionLinkProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground shadow-brand hover:bg-primary-strong",
    secondary: "border border-border bg-surface/80 text-foreground hover:bg-secondary",
    light: "bg-primary-foreground text-primary-strong shadow-soft hover:bg-secondary",
  };

  return (
    <a
      href={href}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}