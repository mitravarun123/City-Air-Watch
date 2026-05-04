import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDashboard, currentPm } from "@/store/dashboard";
import { pmToCategory } from "@/lib/pollution-sim";

function FlyTo({ lat, lng, zoom }: { lat: number; lng: number; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], zoom ?? map.getZoom(), { duration: 0.7 });
  }, [lat, lng, zoom, map]);
  return null;
}

export default function CityMapInner() {
  const { stations, history, selectedId, select, cities, cityId } = useDashboard();
  const city = cities.find((c) => c.id === cityId) ?? cities[0];
  const selected = stations.find((s) => s.id === selectedId) ?? stations[0];

  if (!selected) {
    return <div className="h-[460px] w-full rounded-lg border border-border bg-muted/30" />;
  }

  return (
    <div className="h-[460px] w-full overflow-hidden rounded-lg border border-border">
      <MapContainer
        key={city.id}
        center={[city.lat, city.lng]}
        zoom={city.zoom}
        scrollWheelZoom
        className="h-full w-full"
        style={{ background: "var(--muted)" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FlyTo lat={selected.lat} lng={selected.lng} />
        {stations.map((s) => {
          const pm = currentPm(history[s.id]);
          const cat = pmToCategory(pm);
          const isSel = s.id === selectedId;
          return (
            <CircleMarker
              key={s.id}
              center={[s.lat, s.lng]}
              radius={isSel ? 16 : 11}
              pathOptions={{
                color: isSel ? "#fff" : cat.color,
                weight: isSel ? 3 : 2,
                fillColor: cat.color,
                fillOpacity: 0.85,
              }}
              eventHandlers={{ click: () => select(s.id) }}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold">{s.name}</div>
                  <div>PM2.5: {pm} µg/m³</div>
                  <div style={{ color: cat.color }}>{cat.label}</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
