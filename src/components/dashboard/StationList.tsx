import { useDashboard, currentPm } from "@/store/dashboard";
import { pmToCategory } from "@/lib/pollution-sim";

export function StationList() {
  const { stations, history, selectedId, select } = useDashboard();
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {stations.map((s) => {
        const pm = currentPm(history[s.id]);
        const cat = pmToCategory(pm);
        const sel = s.id === selectedId;
        return (
          <button
            key={s.id}
            onClick={() => select(s.id)}
            className={`rounded-lg border p-3 text-left transition ${
              sel ? "border-primary bg-primary/5" : "border-border bg-muted/20 hover:bg-muted/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium truncate">{s.name}</span>
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: cat.color, boxShadow: `0 0 8px ${cat.color}` }}
              />
            </div>
            <div className="mt-1 text-xl font-bold tabular-nums" style={{ color: cat.color }}>
              {pm}
            </div>
            <div className="text-[10px] text-muted-foreground">{cat.label}</div>
          </button>
        );
      })}
    </div>
  );
}
