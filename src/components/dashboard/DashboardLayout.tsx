import { useEffect } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { useDashboard } from "@/store/dashboard";
import { Wind, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const refresh = useDashboard((s) => s.refresh);
  const lastUpdated = useDashboard((s) => s.lastUpdated);
  const cities = useDashboard((s) => s.cities);
  const cityId = useDashboard((s) => s.cityId);
  const setCity = useDashboard((s) => s.setCity);
  const loading = useDashboard((s) => s.loading);
  const liveError = useDashboard((s) => s.liveError);
  const currentCity = cities.find((c) => c.id === cityId) ?? cities[0];

  useEffect(() => {
    // Refresh live data every 2 minutes (WAQI updates ~hourly).
    const id = setInterval(() => {
      void refresh();
    }, 2 * 60 * 1000);
    return () => clearInterval(id);
  }, [refresh]);

  return (
    <div className="dark">
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background text-foreground">
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <header className="sticky top-0 z-10 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold hidden sm:inline">Air Quality · India</span>
              </div>
              <Select value={cityId} onValueChange={(v) => void setCity(v)}>
                <SelectTrigger className="h-8 w-[200px]">
                  <SelectValue>{currentCity.name}</SelectValue>
                </SelectTrigger>
                <SelectContent className="max-h-[60vh]">
                  {cities.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {liveError ? (
                <div className="hidden md:flex items-center gap-1 text-xs text-amber-400/90">
                  <AlertCircle className="h-3 w-3" />
                  <span>Live data unavailable — showing simulated values</span>
                </div>
              ) : null}
              <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    loading ? "animate-pulse bg-amber-400" : liveError ? "bg-amber-400" : "animate-pulse bg-emerald-500"
                  }`}
                />
                {loading ? "Loading…" : `Live · updated ${new Date(lastUpdated).toLocaleTimeString()}`}
              </div>
            </header>
            <main className="flex-1 p-4 lg:p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
