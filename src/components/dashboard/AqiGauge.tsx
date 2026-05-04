import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { pmToAqi, pmToCategory } from "@/lib/pollution-sim";

export function AqiGauge({ pm25, zoneName }: { pm25: number; zoneName: string }) {
  const aqi = pmToAqi(pm25);
  const cat = pmToCategory(pm25);
  const data = [{ name: "aqi", value: Math.min(aqi, 500), fill: cat.color }];
  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{zoneName}</div>
      <div className="relative h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            innerRadius="75%"
            outerRadius="100%"
            data={data}
            startAngle={210}
            endAngle={-30}
          >
            <PolarAngleAxis type="number" domain={[0, 500]} tick={false} />
            <RadialBar dataKey="value" background={{ fill: "var(--muted)" }} cornerRadius={12} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold tabular-nums" style={{ color: cat.color }}>
            {aqi}
          </div>
          <div className="text-xs text-muted-foreground">AQI · PM2.5 {pm25}</div>
        </div>
      </div>
      <div
        className="rounded-full px-3 py-1 text-xs font-semibold"
        style={{ backgroundColor: `${cat.color}22`, color: cat.color }}
      >
        {cat.label}
      </div>
    </div>
  );
}
