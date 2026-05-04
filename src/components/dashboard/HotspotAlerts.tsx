import { AlertTriangle } from "lucide-react";
import { useDashboard, currentPm } from "@/store/dashboard";
import { pmToCategory } from "@/lib/pollution-sim";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function recommendation(pm: number, zone: string): string {
  if (pm > 200) return `Halt outdoor activities in ${zone}; deploy emergency response.`;
  if (pm > 150) return `Issue mask advisory and restrict heavy vehicles in ${zone}.`;
  if (pm > 120) return `Limit outdoor activity for sensitive groups near ${zone}.`;
  return "";
}

export function HotspotAlerts() {
  const { stations, history, select } = useDashboard();
  const hotspots = stations
    .map((s) => ({ s, pm: currentPm(history[s.id]) }))
    .filter((x) => x.pm > 120)
    .sort((a, b) => b.pm - a.pm);

  if (hotspots.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center text-sm text-muted-foreground">
        <AlertTriangle className="mb-2 h-6 w-6 opacity-40" />
        No active hotspots. Air quality is within manageable range.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {hotspots.map(({ s, pm }) => {
        const cat = pmToCategory(pm);
        return (
          <button
            key={s.id}
            onClick={() => select(s.id)}
            className="w-full rounded-lg border border-border bg-muted/30 p-3 text-left transition hover:bg-muted/60"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 12px ${cat.color}` }}
                />
                <span className="font-medium">{s.name}</span>
              </div>
              <Badge variant="secondary" style={{ backgroundColor: `${cat.color}22`, color: cat.color }}>
                {pm} µg/m³
              </Badge>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">{recommendation(pm, s.name)}</div>
          </button>
        );
      })}
    </div>
  );
}
