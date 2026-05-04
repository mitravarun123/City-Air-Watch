import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { CityMap } from "@/components/dashboard/CityMap";
import { StationList } from "@/components/dashboard/StationList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "City Map — AeroSense" }, { name: "description", content: "Interactive city map of PM2.5 monitoring stations." }] }),
  component: () => (
    <DashboardLayout>
      <div className="space-y-4">
        <StationList />
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">City Pollution Map</CardTitle></CardHeader>
          <CardContent><CityMap /></CardContent>
        </Card>
      </div>
    </DashboardLayout>
  ),
});
