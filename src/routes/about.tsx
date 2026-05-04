import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — AeroSense" }, { name: "description", content: "About the AeroSense smart city air quality dashboard." }] }),
  component: () => (
    <DashboardLayout>
      <Card className="max-w-3xl">
        <CardHeader><CardTitle>About AeroSense</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>AeroSense is a demo Smart City Air Pollution Monitoring & Prediction dashboard. It simulates real-time PM2.5 readings across 10 stations in New Delhi, predicts short-term trends with linear regression, and surfaces hotspot alerts with AI-style recommendations.</p>
          <p>Built with TanStack Start, React, Tailwind, shadcn/ui, React-Leaflet, and Recharts. All data is generated client-side for demonstration.</p>
        </CardContent>
      </Card>
    </DashboardLayout>
  ),
});
