import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { SourceMix } from "@/lib/pollution-sim";

const COLORS: Record<keyof SourceMix, string> = {
  traffic: "#60a5fa",
  industrial: "#f97316",
  residential: "#a78bfa",
  natural: "#34d399",
};

export function SourcePie({ sources }: { sources: SourceMix }) {
  const data = (Object.keys(sources) as (keyof SourceMix)[]).map((k) => ({
    name: k.charAt(0).toUpperCase() + k.slice(1),
    value: sources[k],
    key: k,
  }));
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={85}
            paddingAngle={2}
            isAnimationActive={false}
          >
            {data.map((d) => (
              <Cell key={d.key} fill={COLORS[d.key]} stroke="var(--background)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            formatter={(v) => `${v}%`}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
