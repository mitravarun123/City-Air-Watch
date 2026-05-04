import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CityMap } from "@/components/dashboard/CityMap";
import { AqiGauge } from "@/components/dashboard/AqiGauge";
import { PredictionPanel } from "@/components/dashboard/PredictionPanel";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { SourcePie } from "@/components/dashboard/SourcePie";
import { HotspotAlerts } from "@/components/dashboard/HotspotAlerts";
import { AiSuggestions } from "@/components/dashboard/AiSuggestions";
import { StationList } from "@/components/dashboard/StationList";
import { useDashboard, currentPm } from "@/store/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AeroSense — Smart City Air Quality Dashboard" },
      { name: "description", content: "Real-time PM2.5 monitoring, prediction, and AI-driven recommendations across the city." },
    ],
  }),
  component: () => (
    <DashboardLayout>
      <Overview />
    </DashboardLayout>
  ),
});

function Overview() {
  const { stations, history, selectedId } = useDashboard();
  const selected = stations.find((s) => s.id === selectedId) ?? stations[0];
  const hist = selected ? history[selected.id] ?? [] : [];
  const pm = hist.length ? currentPm(hist) : 0;

  if (!selected) {
    return <div className="text-sm text-muted-foreground">Loading air quality data…</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="sr-only">Smart City Air Pollution Dashboard</h1>
      <StationList />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">City Pollution Map</CardTitle>
          </CardHeader>
          <CardContent>
            <CityMap />
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Air Quality Index</CardTitle>
            </CardHeader>
            <CardContent>
              <AqiGauge pm25={pm} zoneName={selected.name} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <PredictionPanel history={hist} />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">PM2.5 — last 24h + 2h forecast · {selected.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <TimeSeriesChart history={hist} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Pollution Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <SourcePie sources={selected.sources} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Hotspot Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <HotspotAlerts />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <AiSuggestions station={selected} pm={pm} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
