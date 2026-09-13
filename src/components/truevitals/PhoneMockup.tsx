import { Activity, Footprints, HeartPulse, Moon, Sparkles } from "lucide-react";

export function PhoneMockup({ variant }: { variant: "overview" | "insights" }) {
  const overview = variant === "overview";
  return (
    <div
      data-placeholder={overview ? "app-phone-image-1" : "app-phone-image-2"}
      className={`phone-shell ${overview ? "rotate-[-5deg]" : "translate-y-8 rotate-[5deg]"}`}
      aria-label={overview ? "Phone health overview placeholder" : "Phone health insights placeholder"}
    >
      <div className="mx-auto mb-5 h-5 w-24 rounded-full bg-foreground" />
      <p className="text-xs font-semibold text-muted-foreground">{overview ? "Good Morning," : "Your weekly"}</p>
      <h3 className="mt-1 font-display text-2xl font-bold">{overview ? "Alex" : "Health Insights"}</h3>
      {overview ? (
        <>
          <div className="mt-6 rounded-2xl bg-secondary p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold">Your health today</span>
              <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground"><Sparkles size={15} /></span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2">
              {[
                [HeartPulse, "Heart rate", "72 bpm"],
                [Moon, "Sleep", "7h 30m"],
                [Activity, "Activity", "Active"],
                [Footprints, "Steps", "8,432"],
              ].map(([Icon, label, value]) => {
                const ItemIcon = Icon as typeof HeartPulse;
                return <div key={String(label)} className="rounded-xl bg-surface p-2.5"><ItemIcon size={16} className="text-primary" /><span className="mt-2 block text-[10px] text-muted-foreground">{String(label)}</span><strong className="text-xs">{String(value)}</strong></div>;
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-6 rounded-2xl bg-secondary p-4">
            <div className="flex h-28 items-end gap-2" aria-label="Decorative health trend graph">
              {[35, 55, 44, 78, 64, 90, 76].map((height, index) => <span key={index} className="graph-bar flex-1 rounded-full" style={{ height: `${height}%` }} />)}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs"><span className="text-muted-foreground">Overall health</span><strong className="text-success">Improving</strong></div>
          </div>
          <div className="mt-3 rounded-2xl border border-border bg-surface p-3 text-xs"><Sparkles size={15} className="mb-2 text-primary" />Your sleep consistency improved this week.</div>
        </>
      )}
    </div>
  );
}