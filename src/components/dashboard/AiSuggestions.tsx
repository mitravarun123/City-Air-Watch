import { Sparkles } from "lucide-react";
import type { Station } from "@/lib/pollution-sim";
import { pmToCategory } from "@/lib/pollution-sim";

function dominantSource(s: Station): string {
  const entries = Object.entries(s.sources) as [string, number][];
  entries.sort((a, b) => b[1] - a[1]);
  return entries[0][0];
}

export function AiSuggestions({ station, pm }: { station: Station; pm: number }) {
  const cat = pmToCategory(pm);
  const dom = dominantSource(station);
  const tips: string[] = [];

  if (cat.tone === "good") {
    tips.push(`${station.name} is clean — encourage outdoor events and cycling.`);
    tips.push("Maintain current monitoring cadence; no interventions required.");
  } else if (cat.tone === "moderate") {
    tips.push(`Sensitive groups near ${station.name} should limit prolonged outdoor exertion.`);
    tips.push(`Promote public transit to avoid worsening ${dom} contribution.`);
  } else if (cat.tone === "unhealthy") {
    if (dom === "traffic") tips.push("Activate odd/even vehicle policy in this corridor.");
    if (dom === "industrial") tips.push("Notify industrial operators to reduce emissions for 4 hours.");
    if (dom === "residential") tips.push("Discourage open burning; promote cleaner cookstoves.");
    tips.push("Recommend N95 masks for outdoor workers in this zone.");
  } else {
    tips.push(`Declare air-quality emergency around ${station.name}.`);
    tips.push("Halt construction and non-essential heavy traffic immediately.");
    tips.push("Open clean-air shelters for vulnerable populations.");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/15 text-primary">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <div className="text-sm font-semibold">AI Recommendations</div>
          <div className="text-xs text-muted-foreground">
            Based on {cat.label.toLowerCase()} air & dominant source: {dom}
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {tips.map((t, i) => (
          <li
            key={i}
            className="flex items-start gap-2 rounded-lg border border-border bg-muted/30 p-3 text-sm"
          >
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
