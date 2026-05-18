'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Place } from '@/types';

// Fix broken default marker icons in webpack/Next.js
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const CATEGORY_STYLE: Record<string, { color: string; emoji: string }> = {
  temple:         { color: '#f97316', emoji: '🛕' },
  nature:         { color: '#22c55e', emoji: '🌿' },
  senior_group:   { color: '#8b5cf6', emoji: '👴' },
  cultural_event: { color: '#ec4899', emoji: '🎭' },
  shopping:       { color: '#eab308', emoji: '🛍️' },
  restaurant:     { color: '#ef4444', emoji: '🍛' },
  healthcare:     { color: '#3b82f6', emoji: '🏥' },
};

function createIcon(color: string, emoji: string) {
  return L.divIcon({
    className: '',
    html: `<div style="
      background:${color};
      width:40px;height:40px;border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      font-size:20px;box-shadow:0 2px 8px rgba(0,0,0,0.3);
      border:2px solid white;cursor:pointer;
    ">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -24],
  });
}

const MOBILITY_LABEL: Record<string, string> = {
  easy: '🟢 Easy access',
  moderate: '🟡 Moderate',
  active: '🔴 Active',
};

interface MapViewProps {
  places: Place[];
}

export default function MapView({ places }: MapViewProps) {
  const placesWithCoords = places.filter(p => p.lat && p.lng);

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      <MapContainer
        center={[37.45, -121.97]}
        zoom={11}
        style={{ height: '580px', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {placesWithCoords.map(place => {
          const style = CATEGORY_STYLE[place.category] ?? { color: '#64748b', emoji: '📍' };
          return (
            <Marker
              key={place.id}
              position={[place.lat!, place.lng!]}
              icon={createIcon(style.color, style.emoji)}
            >
              <Popup maxWidth={300} className="leaflet-popup-paahuney">
                <div style={{ fontFamily: 'sans-serif', fontSize: '13px' }}>
                  <p style={{ fontWeight: 700, color: '#1f2937', marginBottom: '6px', fontSize: '14px' }}>
                    {style.emoji} {place.name}
                  </p>

                  {/* Badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    <span style={{ background: '#f0fdf4', color: '#15803d', padding: '2px 8px', borderRadius: '9999px', fontSize: '11px' }}>
                      {MOBILITY_LABEL[place.mobility_level]}
                    </span>
                    {place.vegetarian_friendly && (
                      <span style={{ background: '#f0fdf4', color: '#15803d', padding: '2px 8px', borderRadius: '9999px', fontSize: '11px' }}>
                        🥬 Veg-friendly
                      </span>
                    )}
                    {place.is_verified && (
                      <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '9999px', fontSize: '11px' }}>
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  {/* Languages */}
                  {place.languages_spoken && place.languages_spoken.length > 0 && (
                    <p style={{ color: '#4338ca', marginBottom: '6px', fontSize: '12px' }}>
                      🗣️ <strong>Languages:</strong> {place.languages_spoken.join(', ')}
                    </p>
                  )}

                  {/* Best time */}
                  {place.best_time && (
                    <p style={{ color: '#92400e', marginBottom: '6px', fontSize: '12px' }}>
                      🕐 {place.best_time}
                    </p>
                  )}

                  {/* Address */}
                  {place.address && (
                    <p style={{ color: '#6b7280', marginBottom: '8px', fontSize: '12px' }}>
                      📍 {place.address}
                    </p>
                  )}

                  {/* Link */}
                  {place.google_maps_url && (
                    <a
                      href={place.google_maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#ea580c', fontWeight: 600, fontSize: '12px', textDecoration: 'none' }}
                    >
                      Open in Google Maps →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="bg-white px-4 py-3 flex flex-wrap gap-3 border-t border-gray-100 text-xs text-gray-600">
        {Object.entries(CATEGORY_STYLE).map(([key, val]) => (
          <span key={key} className="flex items-center gap-1">
            <span>{val.emoji}</span>
            <span className="capitalize">{key.replace('_', ' ')}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
