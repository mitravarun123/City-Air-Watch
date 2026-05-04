## Goal

Make the dashboard **India-only** with a single flat **City dropdown** (no state grouping, no state label) containing **5 popular cities from each Indian state**, powered by **live air quality data** instead of the current simulator. Keep the existing dark UI, sidebar, map, charts, gauge, alerts and AI suggestions visually unchanged.

## 1. Live data source

Use **WAQI (aqicn.org) public API** — best free option for India (covers all CPCB stations, returns real PM2.5, station names, lat/lng, last-updated time).

- Requires one free token from https://aqicn.org/data-platform/token (30-second signup).
- I'll prompt you to add it as runtime secret `WAQI_TOKEN` so it stays server-side.
- Endpoints used:
  - `https://api.waqi.info/feed/geo:{lat};{lng}/?token=...` — nearest station to a city center
  - `https://api.waqi.info/map/bounds/?latlng=...&token=...` — all stations in a bounding box (for plotting multiple markers per city)

Alternative if you don't want a token: **OpenAQ v3** (no key, slightly thinner Indian coverage). Tell me which.

## 2. India city catalog — flat list, 5 per state, alphabetical

A single `INDIA_CITIES` array. No state grouping in the UI — just a long alphabetized dropdown of cities. State info is kept internally only for completeness, never displayed.

5 cities × ~28 states = **~140 cities**. Initial set:

Agartala, Agra, Ahmedabad, Aizawl, Ajmer, Allahabad/Prayagraj, Amravati, Amritsar, Asansol, Aurangabad, Bathinda, Belagavi, Bengaluru, Bhavnagar, Bhilai, Bhopal, Bhubaneswar, Bilaspur, Bokaro, Chandigarh, Chennai, Cochin/Kochi, Coimbatore, Cuttack, Davangere, Dehradun, Delhi (New Delhi), Dhanbad, Dharamshala, Dimapur, Dispur, Durgapur, Faridabad, Gandhinagar, Gangtok, Ghaziabad, Goa (Panaji), Gulbarga, Guntur, Gurugram, Guwahati, Gwalior, Haldwani, Haridwar, Hisar, Howrah, Hubballi, Hyderabad, Imphal, Indore, Itanagar, Jabalpur, Jaipur, Jalandhar, Jammu, Jamshedpur, Jodhpur, Jorhat, Kakinada, Kanpur, Karimnagar, Khammam, Kohima, Kolhapur, Kolkata, Kollam, Kota, Kozhikode, Kurnool, Leh, Lucknow, Ludhiana, Madurai, Mangaluru, Margao, Margherita, Meerut, Mumbai, Mysuru, Nagpur, Nainital, Nashik, Nellore, Nizamabad, Noida, Panaji, Patiala, Patna, Port Blair, Puducherry, Pune, Raipur, Rajkot, Ranchi, Rourkela, Salem, Sambalpur, Shillong, Shimla, Siliguri, Silvassa, Solapur, Srinagar, Surat, Tezpur, Thane, Thiruvananthapuram, Thrissur, Tiruchirappalli, Tirunelveli, Tirupati, Udaipur, Udhampur, Ujjain, Vadodara, Varanasi, Vasai, Vellore, Vijayawada, Visakhapatnam, Warangal, Yamunanagar, …

Each city has accurate `lat`, `lng`, `zoom`. Other countries (London, NYC, Beijing) and the old multi-city objects are removed.

## 3. UI changes (design preserved)

The header keeps the **same single city dropdown** that already exists — same position, same styling. Only the contents change: ~140 Indian cities, alphabetical, no state headers.

```text
[ City ▼ ]              Live · updated HH:MM:SS
```

Sidebar, cards, map markers, time-series chart, AQI gauge, source pie, hotspot alerts, AI suggestions — all visually unchanged.

(With ~140 cities, the existing shadcn `Select` becomes scrollable. If you'd like a search box on top, I can swap to a `Combobox` later — just say the word.)

## 4. Live data flow

- New file `src/server/airquality.functions.ts` exports a `getCityAir({ lat, lng })` server function calling WAQI's `map/bounds` for a small box around the city. Returns `[{ id, name, lat, lng, pm25, updatedAt }]` (typically 4–10 stations).
- `src/store/dashboard.ts` keeps the same shape (`stations`, `history`, `selectedId`) but:
  - `setCity` becomes async → fetches live stations.
  - History seeded from latest reading, grows as new ticks arrive.
  - Polling: 5 s simulated → **every 2 minutes** live (WAQI updates ~hourly).
- Forecast (`src/lib/forecast.ts` linear regression) and source pie heuristic remain untouched.

## 5. Failure handling

- Token missing / API fails / city has no live stations → small inline "Live data unavailable, showing simulated values" notice and the existing simulator fills in for that city. Dashboard never breaks.
- Loading skeletons on map and chart while the first fetch resolves.

## 6. Files touched

- `src/lib/pollution-sim.ts` → replace `CITIES` with flat `INDIA_CITIES`. Keep `pmToCategory`, `pmToAqi`, simulator as fallback.
- `src/store/dashboard.ts` → async `setCity`, 2-minute live polling.
- `src/components/dashboard/DashboardLayout.tsx` → same `<Select>`, alphabetical flat list of Indian cities.
- `src/server/airquality.functions.ts` → **new**, WAQI server function reading `process.env.WAQI_TOKEN`.
- All other dashboard components — untouched.

## What I need from you

1. Confirm **WAQI** (I'll then prompt you to add the free `WAQI_TOKEN` secret) — or say "OpenAQ" for no-key.
2. Approve the city list (or say "go ahead, add/remove later").
