import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { SourcePie } from "@/components/dashboard/SourcePie";
import { StationList } from "@/components/dashboard/StationList";
import { useDashboard } from "@/store/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/sources")({
  head: () => ({ meta: [{ title: "Pollution Sources — AeroSense" }, { name: "description", content: "Breakdown of pollution sources by zone." }] }),
  component: SourcesPage,
});

function SourcesPage() {
  const { stations, selectedId } = useDashboard();
  const s = stations.find((x) => x.id === selectedId) ?? stations[0];
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
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Source Breakdown · {s.name}</CardTitle></CardHeader>
          <CardContent><SourcePie sources={s.sources} /></CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
