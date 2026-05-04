import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type LiveStation = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  pm25: number;
  updatedAt: number;
};

const Input = z.object({
  lat: z.number(),
  lng: z.number(),
  // size of the bounding box in degrees (roughly)
  span: z.number().min(0.05).max(2).default(0.45),
});

export const getCityAir = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => Input.parse(data))
  .handler(async ({ data }): Promise<{ stations: LiveStation[]; error: string | null }> => {
    const token = process.env.WAQI_TOKEN;
    if (!token) {
      return { stations: [], error: "WAQI_TOKEN not configured" };
    }
    const { lat, lng, span } = data;
    const lat1 = lat - span;
    const lat2 = lat + span;
    const lng1 = lng - span;
    const lng2 = lng + span;
    const url = `https://api.waqi.info/map/bounds/?latlng=${lat1},${lng1},${lat2},${lng2}&token=${encodeURIComponent(token)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return { stations: [], error: `WAQI HTTP ${res.status}` };
      }
      const json = (await res.json()) as {
        status: string;
        data?: Array<{
          uid: number;
          aqi: string;
          lat: number;
          lon: number;
          station: { name: string; time?: string };
        }>;
      };
      if (json.status !== "ok" || !Array.isArray(json.data)) {
        return { stations: [], error: `WAQI status ${json.status}` };
      }
      // Convert AQI (US-EPA scale) back to a PM2.5 µg/m³ estimate.
      const aqiToPm = (aqi: number): number => {
        const bp: [number, number, number, number][] = [
          [0, 50, 0, 12],
          [51, 100, 12.1, 35.4],
          [101, 150, 35.5, 55.4],
          [151, 200, 55.5, 150.4],
          [201, 300, 150.5, 250.4],
          [301, 500, 250.5, 500.4],
        ];
        for (const [il, ih, cl, ch] of bp) {
          if (aqi >= il && aqi <= ih) {
            return Math.round(((ch - cl) / (ih - il)) * (aqi - il) + cl);
          }
        }
        return aqi;
      };
      const stations: LiveStation[] = json.data
        .filter((d) => d.aqi !== "-" && !Number.isNaN(Number(d.aqi)))
        .map((d) => ({
          id: `waqi-${d.uid}`,
          name: d.station.name,
          lat: d.lat,
          lng: d.lon,
          pm25: aqiToPm(Number(d.aqi)),
          updatedAt: d.station.time ? new Date(d.station.time).getTime() : Date.now(),
        }))
        // Keep up to 12 closest to the city center.
        .map((s) => ({
          s,
          d: (s.lat - lat) ** 2 + (s.lng - lng) ** 2,
        }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 12)
        .map((x) => x.s);
      return { stations, error: null };
    } catch (err) {
      return { stations: [], error: err instanceof Error ? err.message : "fetch failed" };
    }
  });
