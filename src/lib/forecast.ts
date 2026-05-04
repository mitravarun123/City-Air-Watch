import type { Reading } from "./pollution-sim";

// Linear regression on last N readings; project k hours ahead.
export function forecast(readings: Reading[], hoursAhead = 2, lookback = 6): Reading[] {
  const series = readings.slice(-lookback);
  if (series.length < 2) return [];
  const n = series.length;
  const xs = series.map((_, i) => i);
  const ys = series.map((r) => r.pm25);
  const meanX = xs.reduce((a, b) => a + b, 0) / n;
  const meanY = ys.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i++) {
    num += (xs[i] - meanX) * (ys[i] - meanY);
    den += (xs[i] - meanX) ** 2;
  }
  const slope = den === 0 ? 0 : num / den;
  const intercept = meanY - slope * meanX;
  const lastT = series[series.length - 1].t;
  const out: Reading[] = [];
  for (let h = 1; h <= hoursAhead; h++) {
    const x = n - 1 + h;
    const y = Math.max(5, Math.min(400, slope * x + intercept));
    out.push({ t: lastT + h * 60 * 60 * 1000, pm25: Math.round(y) });
  }
  return out;
}

export function trendDirection(readings: Reading[]): "rising" | "falling" | "stable" {
  if (readings.length < 3) return "stable";
  const last = readings[readings.length - 1].pm25;
  const prev = readings[readings.length - 3].pm25;
  const diff = last - prev;
  if (diff > 4) return "rising";
  if (diff < -4) return "falling";
  return "stable";
}
