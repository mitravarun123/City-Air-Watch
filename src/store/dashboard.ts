import { create } from "zustand";
import {
  INDIA_CITIES,
  generateHistory,
  inferSources,
  nextTick,
  type IndiaCity,
  type Reading,
  type Station,
} from "@/lib/pollution-sim";
import { getCityAir, type LiveStation } from "@/server/airquality.functions";

type State = {
  cities: IndiaCity[];
  cityId: string;
  stations: Station[];
  history: Record<string, Reading[]>;
  selectedId: string;
  lastUpdated: number;
  loading: boolean;
  liveError: string | null;
  select: (id: string) => void;
  setCity: (cityId: string) => Promise<void>;
  refresh: () => Promise<void>;
  tick: () => void;
};

const initialCity =
  INDIA_CITIES.find((c) => c.id === "delhi") ?? INDIA_CITIES[0];

function liveToStation(ls: LiveStation): Station {
  const { sources, zoneType } = inferSources(ls.name);
  return {
    id: ls.id,
    name: ls.name,
    lat: ls.lat,
    lng: ls.lng,
    zoneType,
    baseline: ls.pm25,
    sources,
  };
}

function fallbackStations(city: IndiaCity): Station[] {
  // Generate 6 placeholder stations around the city center as last-resort fallback.
  const baseNames = [
    "Central",
    "Industrial Area",
    "Residential Colony",
    "Highway Junction",
    "City Park",
    "Outskirts",
  ];
  return baseNames.map((label, i) => {
    const ang = (i / baseNames.length) * Math.PI * 2;
    const r = 0.04;
    const lat = city.lat + Math.cos(ang) * r;
    const lng = city.lng + Math.sin(ang) * r;
    const name = `${city.name} ${label}`;
    const { sources, zoneType } = inferSources(name);
    const baseline = 60 + Math.round(Math.random() * 80);
    return {
      id: `fb-${city.id}-${i}`,
      name,
      lat,
      lng,
      zoneType,
      baseline,
      sources,
    };
  });
}

function seedHistory(stations: Station[]): Record<string, Reading[]> {
  const h: Record<string, Reading[]> = {};
  for (const s of stations) h[s.id] = generateHistory(s);
  return h;
}

async function fetchStationsForCity(
  city: IndiaCity,
): Promise<{ stations: Station[]; error: string | null; live: boolean }> {
  try {
    const res = await getCityAir({ data: { lat: city.lat, lng: city.lng, span: 0.45 } });
    if (res.stations.length > 0) {
      return { stations: res.stations.map(liveToStation), error: res.error, live: true };
    }
    return {
      stations: fallbackStations(city),
      error: res.error ?? "No live stations found nearby",
      live: false,
    };
  } catch (err) {
    return {
      stations: fallbackStations(city),
      error: err instanceof Error ? err.message : "fetch failed",
      live: false,
    };
  }
}

export const useDashboard = create<State>((set, get) => ({
  cities: INDIA_CITIES,
  cityId: initialCity.id,
  stations: fallbackStations(initialCity),
  history: seedHistory(fallbackStations(initialCity)),
  selectedId: fallbackStations(initialCity)[0].id,
  lastUpdated: Date.now(),
  loading: true,
  liveError: null,
  select: (id) => set({ selectedId: id }),
  setCity: async (cityId) => {
    const city = INDIA_CITIES.find((c) => c.id === cityId);
    if (!city) return;
    set({ cityId: city.id, loading: true });
    const { stations, error, live } = await fetchStationsForCity(city);
    const history = seedHistory(stations);
    // Overwrite the latest seeded value with the actual live reading.
    if (live) {
      for (const s of stations) {
        const arr = history[s.id];
        if (arr && arr.length > 0) {
          arr[arr.length - 1] = { t: Date.now(), pm25: s.baseline };
        }
      }
    }
    set({
      stations,
      history,
      selectedId: stations[0]?.id ?? "",
      lastUpdated: Date.now(),
      loading: false,
      liveError: error,
    });
  },
  refresh: async () => {
    const { cityId } = get();
    const city = INDIA_CITIES.find((c) => c.id === cityId);
    if (!city) return;
    const { stations: liveStations, error, live } = await fetchStationsForCity(city);
    if (!live) {
      set({ liveError: error, lastUpdated: Date.now() });
      // Fallback simulator path
      get().tick();
      return;
    }
    const { history } = get();
    const next: Record<string, Reading[]> = { ...history };
    const now = Date.now();
    for (const s of liveStations) {
      const prev = next[s.id] ?? generateHistory(s);
      const updated = [...prev, { t: now, pm25: s.baseline }];
      // Keep last 30 hourly points
      while (updated.length > 30) updated.shift();
      next[s.id] = updated;
    }
    set({
      stations: liveStations,
      history: next,
      selectedId: get().selectedId && next[get().selectedId] ? get().selectedId : liveStations[0]?.id ?? "",
      lastUpdated: now,
      liveError: error,
    });
  },
  tick: () => {
    const { history, stations } = get();
    const now = Date.now();
    const next: Record<string, Reading[]> = {};
    for (const s of stations) {
      const h = history[s.id];
      if (!h) continue;
      const last = h[h.length - 1];
      const newPm = nextTick(last.pm25, s, now);
      const updated = [...h.slice(0, -1), { t: last.t, pm25: newPm }];
      if (now - h[0].t > 25 * 3600 * 1000) {
        updated.shift();
        updated.push({ t: now, pm25: newPm });
      }
      next[s.id] = updated;
    }
    set({ history: next, lastUpdated: now });
  },
}));

// Kick off the initial live fetch for the default city.
if (typeof window !== "undefined") {
  void useDashboard.getState().setCity(initialCity.id);
}

export function currentPm(history: Reading[]): number {
  if (!history || history.length === 0) return 0;
  return history[history.length - 1].pm25;
}
