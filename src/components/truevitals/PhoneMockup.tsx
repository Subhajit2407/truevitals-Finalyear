import { Activity, Footprints, HeartPulse, Moon, Sparkles, TrendingUp, Home, Calendar, User } from "lucide-react";

export function PhoneMockup({ variant }: { variant: "overview" | "insights" }) {
  const overview = variant === "overview";
  return (
    <div
      className={`relative w-[210px] sm:w-[240px] md:w-[260px] rounded-[42px] border-[7px] border-slate-900 bg-white p-4 shadow-2xl transition-transform duration-500 hover:scale-[1.02] ${
        overview ? "rotate-[-4deg] z-10" : "translate-y-6 rotate-[4deg] z-20"
      }`}
      aria-label={overview ? "Phone health overview" : "Phone health insights"}
    >
      {/* Dynamic Island / Notch */}
      <div className="mx-auto mb-4 h-4 w-20 rounded-full bg-slate-900" />

      {overview ? (
        <div className="flex flex-col h-full justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-400">Good Morning,</p>
            <h3 className="font-display text-xl font-bold text-slate-900">Alex</h3>

            <div className="mt-4 rounded-2xl bg-sky-50/70 p-3.5 border border-sky-100/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-800">Your Health Today</span>
                <span className="grid size-6 place-items-center rounded-full bg-sky-500 text-white shadow-xs text-[11px]">
                  ✨
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: HeartPulse, label: "Heart Rate", val: "72 bpm", color: "text-rose-500", bg: "bg-rose-50" },
                  { icon: Moon, label: "Sleep", val: "7h 30m", color: "text-indigo-500", bg: "bg-indigo-50" },
                  { icon: Activity, label: "Activity", val: "Active", color: "text-emerald-500", bg: "bg-emerald-50" },
                  { icon: Footprints, label: "Steps", val: "8,432", color: "text-sky-500", bg: "bg-sky-50" },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl bg-white p-2.5 shadow-xs border border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <item.icon size={13} className={item.color} />
                      <span className="text-[9px] text-slate-500 font-medium">{item.label}</span>
                    </div>
                    <strong className="mt-1 block text-xs font-bold text-slate-800">{item.val}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mini bottom nav */}
          <div className="mt-4 flex items-center justify-around border-t border-slate-100 pt-2 text-slate-400">
            <span className="text-sky-500"><Home size={15} /></span>
            <span><Activity size={15} /></span>
            <span><Calendar size={15} /></span>
            <span><User size={15} /></span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Health Insights</h3>
            
            {/* Filter tabs */}
            <div className="mt-2 flex gap-1 bg-slate-100 p-1 rounded-full text-[10px] font-semibold text-slate-600">
              <span className="flex-1 text-center py-0.5 rounded-full">Week</span>
              <span className="flex-1 text-center py-0.5 rounded-full bg-white shadow-xs text-sky-600">Month</span>
              <span className="flex-1 text-center py-0.5 rounded-full">Year</span>
            </div>

            <div className="mt-4 rounded-2xl bg-sky-50/60 p-3.5 border border-sky-100/60">
              <div className="flex h-24 items-end gap-1.5 px-1" aria-label="Health trend chart">
                {[40, 60, 52, 85, 70, 95, 82].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-1">
                    <span
                      className="w-full rounded-t-md bg-gradient-to-t from-sky-500 to-cyan-400 transition-all duration-300"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] border-t border-sky-100/80 pt-2">
                <span className="text-slate-500">Overall Health</span>
                <strong className="text-emerald-600 font-semibold flex items-center gap-1">
                  <TrendingUp size={12} /> Improving
                </strong>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-sky-100 bg-white p-3 text-[11px] text-slate-600 shadow-xs flex items-center gap-2">
              <span className="text-sm shrink-0">✨</span>
              <span>Your sleep consistency improved this week.</span>
            </div>
          </div>

          <div className="mt-4 text-center">
            <span className="inline-block h-1 w-16 rounded-full bg-slate-200" />
          </div>
        </div>
      )}
    </div>
  );
}

export function FloatingInsightsBadge() {
  return (
    <div className="hidden sm:flex items-center gap-3 rounded-2xl border border-sky-100 bg-white/95 px-4 py-3.5 shadow-xl backdrop-blur-md transition-transform hover:-translate-y-1">
      <div>
        <p className="text-xs font-bold text-slate-900">Smarter Insights.</p>
        <p className="text-xs font-medium text-sky-600">Brighter Tomorrows.</p>
      </div>
      <span className="grid size-9 place-items-center rounded-xl bg-sky-50 text-sky-600">
        <TrendingUp size={18} />
      </span>
    </div>
  );
}