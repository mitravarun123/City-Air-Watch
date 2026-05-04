import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Reading } from "@/lib/pollution-sim";
import { forecast } from "@/lib/forecast";

export function TimeSeriesChart({ history }: { history: Reading[] }) {
  const fc = forecast(history, 2, 6);
  const nowT = history[history.length - 1].t;
  const merged = [
    ...history.map((r) => ({ t: r.t, actual: r.pm25 })),
    ...fc.map((r) => ({ t: r.t, predicted: r.pm25 })),
  ];
  // bridge: include last actual as predicted start
  const last = history[history.length - 1];
  const bridgeIdx = merged.findIndex((m) => m.t === last.t);
  if (bridgeIdx >= 0) (merged[bridgeIdx] as any).predicted = last.pm25;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={merged} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="t"
            tickFormatter={(v) =>
              new Date(v).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            }
            stroke="var(--muted-foreground)"
            fontSize={11}
          />
          <YAxis stroke="var(--muted-foreground)" fontSize={11} />
          <Tooltip
            contentStyle={{
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 12,
            }}
            labelFormatter={(v) => new Date(v as number).toLocaleString()}
          />
          <ReferenceLine x={nowT} stroke="var(--muted-foreground)" strokeDasharray="4 4" label={{ value: "now", fill: "var(--muted-foreground)", fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
