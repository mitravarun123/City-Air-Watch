import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { Reading } from "@/lib/pollution-sim";
import { pmToCategory } from "@/lib/pollution-sim";
import { forecast, trendDirection } from "@/lib/forecast";

export function PredictionPanel({ history }: { history: Reading[] }) {
  const fc = forecast(history, 2, 6);
  const dir = trendDirection(history);
  const current = history[history.length - 1].pm25;
  const Icon = dir === "rising" ? TrendingUp : dir === "falling" ? TrendingDown : Minus;
  const color =
    dir === "rising" ? "text-red-400" : dir === "falling" ? "text-emerald-400" : "text-muted-foreground";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Next 2 hours</div>
        <div className={`flex items-center gap-1 text-xs font-medium ${color}`}>
          <Icon className="h-3.5 w-3.5" />
          {dir}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Now" pm={current} />
        {fc.map((r, i) => (
          <Stat key={r.t} label={`+${i + 1}h`} pm={r.pm25} />
        ))}
      </div>
    </div>
  );
}

function Stat({ label, pm }: { label: string; pm: number }) {
  const cat = pmToCategory(pm);
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-3 text-center">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums" style={{ color: cat.color }}>
        {pm}
      </div>
      <div className="text-[10px] text-muted-foreground">µg/m³</div>
    </div>
  );
}
