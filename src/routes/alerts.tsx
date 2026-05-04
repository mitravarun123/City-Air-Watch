import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { HotspotAlerts } from "@/components/dashboard/HotspotAlerts";
import { AiSuggestions } from "@/components/dashboard/AiSuggestions";
import { useDashboard, currentPm } from "@/store/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/alerts")({
  head: () => ({ meta: [{ title: "Alerts — AeroSense" }, { name: "description", content: "Active pollution hotspots and AI-recommended actions." }] }),
  component: AlertsPage,
});

function AlertsPage() {
  const { stations, history, selectedId } = useDashboard();
  const s = stations.find((x) => x.id === selectedId) ?? stations[0];
  const pm = s ? currentPm(history[s.id] ?? []) : 0;
  if (!s) {
    return (
      <DashboardLayout>
        <div className="text-sm text-muted-foreground">Loading…</div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card><CardHeader className="pb-2"><CardTitle className="text-base">Hotspot Alerts</CardTitle></CardHeader><CardContent><HotspotAlerts /></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-base">AI Suggestions</CardTitle></CardHeader><CardContent><AiSuggestions station={s} pm={pm} /></CardContent></Card>
      </div>
    </DashboardLayout>
  );
}
