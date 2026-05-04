import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { TimeSeriesChart } from "@/components/dashboard/TimeSeriesChart";
import { PredictionPanel } from "@/components/dashboard/PredictionPanel";
import { AqiGauge } from "@/components/dashboard/AqiGauge";
import { StationList } from "@/components/dashboard/StationList";
import { useDashboard, currentPm } from "@/store/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/forecast")({
  head: () => ({ meta: [{ title: "Forecast — AeroSense" }, { name: "description", content: "PM2.5 history and 2-hour forecast." }] }),
  component: ForecastPage,
});

function ForecastPage() {
  const { stations, history, selectedId } = useDashboard();
  const s = stations.find((x) => x.id === selectedId) ?? stations[0];
  const h = s ? history[s.id] ?? [] : [];
  const pm = h.length ? currentPm(h) : 0;
  if (!s) {
    return (
      <DashboardLayout>
        <div className="text-sm text-muted-foreground">Loading…</div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <StationList />
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2"><CardTitle className="text-base">Trend & Forecast · {s.name}</CardTitle></CardHeader>
            <CardContent><TimeSeriesChart history={h} /></CardContent>
          </Card>
          <div className="space-y-4">
            <Card><CardHeader className="pb-2"><CardTitle className="text-base">AQI</CardTitle></CardHeader><CardContent><AqiGauge pm25={pm} zoneName={s.name} /></CardContent></Card>
            <Card><CardHeader className="pb-2"><CardTitle className="text-base">Next 2 hours</CardTitle></CardHeader><CardContent><PredictionPanel history={h} /></CardContent></Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
