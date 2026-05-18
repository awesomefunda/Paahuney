'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/client';
import type { Place, PlaceCategory, MobilityLevel } from '@/types';
import { MapPin, Leaf, Accessibility, Clock, ExternalLink, Filter, LayoutList, Map } from 'lucide-react';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

const CATEGORIES: { value: PlaceCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '✨' },
  { value: 'temple', label: 'Temples', emoji: '🛕' },
  { value: 'nature', label: 'Nature & Parks', emoji: '🌿' },
  { value: 'senior_group', label: 'Senior Groups', emoji: '👴' },
  { value: 'cultural_event', label: 'Cultural', emoji: '🎭' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'restaurant', label: 'Restaurants', emoji: '🍛' },
  { value: 'healthcare', label: 'Healthcare', emoji: '🏥' },
];

const MOBILITY: { value: MobilityLevel | 'all'; label: string; color: string }[] = [
  { value: 'all', label: 'Any mobility', color: 'bg-gray-100 text-gray-700' },
  { value: 'easy', label: '🟢 Easy', color: 'bg-green-100 text-green-700' },
  { value: 'moderate', label: '🟡 Moderate', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'active', label: '🔴 Active', color: 'bg-red-100 text-red-700' },
];

const LANGUAGES = ['All languages', 'Hindi', 'Telugu', 'Punjabi', 'Tamil', 'Gujarati', 'Kannada', 'Marathi', 'Bengali'];

const MOBILITY_BADGE: Record<MobilityLevel, string> = {
  easy: 'bg-green-100 text-green-700',
  moderate: 'bg-yellow-100 text-yellow-700',
  active: 'bg-red-100 text-red-700',
};

// Fallback mock data — used when Supabase is not yet configured
const MOCK_PLACES: Place[] = [
  {
    id: '1', name: 'Fremont Hindu Temple (Shiva-Vishnu)', category: 'temple',
    description: 'One of the largest Hindu temples in the Bay Area with beautiful architecture and regular puja ceremonies.',
    address: '1232 Arrowhead Ave, Fremont, CA 94536', city: 'Fremont',
    lat: 37.5485, lng: -121.9886,
    google_maps_url: 'https://maps.google.com/?q=Fremont+Hindu+Temple',
    mobility_level: 'easy', vegetarian_friendly: true,
    best_time: 'Weekday mornings for fewer crowds',
    accessibility_notes: 'Paved parking, accessible entrance, seating available',
    languages_spoken: ['Hindi', 'Kannada', 'Telugu', 'Tamil'],
    is_verified: true, source_url: '', created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Lake Elizabeth (Central Park Fremont)', category: 'nature',
    description: 'Beautiful 72-acre lake with fully paved walking paths. Perfect for morning strolls with visiting parents.',
    address: '40204 Paseo Padre Pkwy, Fremont, CA 94538', city: 'Fremont',
    lat: 37.5537, lng: -121.9824,
    google_maps_url: 'https://maps.google.com/?q=Lake+Elizabeth+Fremont',
    mobility_level: 'easy', vegetarian_friendly: false,
    best_time: 'Morning 7–10am; avoid peak afternoon heat',
    accessibility_notes: 'Fully paved 3.3-mile loop, benches every 200m, wheelchair accessible',
    is_verified: true, source_url: '', created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'India Community Center – Senior Programs', category: 'senior_group',
    description: 'Senior yoga, cultural events, language classes, and social gatherings designed for Indian seniors.',
    address: '525 Los Coches St, Milpitas, CA 95035', city: 'Milpitas',
    lat: 37.4318, lng: -121.9129,
    google_maps_url: 'https://maps.google.com/?q=India+Community+Center+Milpitas',
    mobility_level: 'easy', vegetarian_friendly: true,
    best_time: 'Check ICC calendar for senior program days',
    accessibility_notes: 'Fully accessible facility, parking available, AC',
    languages_spoken: ['Hindi', 'Gujarati', 'Telugu', 'Tamil'],
    is_verified: true, source_url: '', created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'ISKCON Silicon Valley', category: 'temple',
    description: 'Hare Krishna temple with daily arati, delicious prasad, and a welcoming community for all ages.',
    address: '1235 Persian Dr, Sunnyvale, CA 94089', city: 'Sunnyvale',
    lat: 37.4089, lng: -122.0175,
    google_maps_url: 'https://maps.google.com/?q=ISKCON+Silicon+Valley',
    mobility_level: 'easy', vegetarian_friendly: true,
    best_time: 'Sunday feast at 5pm is especially lively',
    accessibility_notes: 'Flat terrain, wheelchair accessible, free parking',
    languages_spoken: ['Hindi', 'Gujarati', 'Telugu', 'Bengali'],
    is_verified: true, source_url: '', created_at: '', updated_at: '',
  },
  {
    id: '5', name: 'Udupi Palace', category: 'restaurant',
    description: 'Authentic South Indian vegetarian restaurant. Dosas, idlis, thalis — all familiar tastes from home.',
    address: '976 E El Camino Real, Sunnyvale, CA 94087', city: 'Sunnyvale',
    lat: 37.3689, lng: -122.0205,
    google_maps_url: 'https://maps.google.com/?q=Udupi+Palace+Sunnyvale',
    mobility_level: 'easy', vegetarian_friendly: true,
    best_time: 'Lunch 11:30am–3pm for best service',
    accessibility_notes: 'Accessible entrance, step-free, accommodates dietary restrictions',
    languages_spoken: ['Tamil', 'Telugu', 'Kannada', 'Hindi'],
    is_verified: true, source_url: '', created_at: '', updated_at: '',
  },
  {
    id: '6', name: 'Shoreline at Mountain View', category: 'nature',
    description: 'Flat paved trails around a beautiful lake. Excellent birdwatching and picnic spots.',
    address: '3070 N Shoreline Blvd, Mountain View, CA 94043', city: 'Mountain View',
    lat: 37.4268, lng: -122.0798,
    google_maps_url: 'https://maps.google.com/?q=Shoreline+Park+Mountain+View',
    mobility_level: 'easy', vegetarian_friendly: false,
    best_time: 'Early morning or late afternoon',
    accessibility_notes: 'Paved trails, accessible parking, restrooms, no steep hills',
    is_verified: true, source_url: '', created_at: '', updated_at: '',
  },
];

export default function ActivitiesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<PlaceCategory | 'all'>('all');
  const [mobility, setMobility] = useState<MobilityLevel | 'all'>('all');
  const [vegOnly, setVegOnly] = useState(false);
  const [language, setLanguage] = useState('All languages');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'map'>('list');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        let q = supabase.from('places').select('*').order('name');
        if (category !== 'all') q = q.eq('category', category);
        if (mobility !== 'all') q = q.eq('mobility_level', mobility);
        if (vegOnly) q = q.eq('vegetarian_friendly', true);
        const { data, error } = await q;
        if (error || !data?.length) {
          setPlaces(MOCK_PLACES);
        } else {
          setPlaces(data);
        }
      } catch {
        setPlaces(MOCK_PLACES);
      }
      setLoading(false);
    };
    load();
  }, [category, mobility, vegOnly]);

  const filtered = places.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) &&
        !p.description?.toLowerCase().includes(search.toLowerCase())) return false;
    if (language !== 'All languages' && !p.languages_spoken?.includes(language)) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">🗺️ Activities & Places</h1>
        <p className="text-gray-500">Curated for visiting parents — filter by mobility, diet, language, and more.</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <Filter size={16} /> Filters
          </div>
          {/* List / Map toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                view === 'list' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutList size={15} /> List
            </button>
            <button
              onClick={() => setView('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                view === 'map' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Map size={15} /> Map
            </button>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search places..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value as PlaceCategory | 'all')}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === c.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-orange-50'
              }`}
            >
              {c.emoji} {c.label}
            </button>
          ))}
        </div>

        {/* Mobility + Veg + Language row */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mobility */}
          <div className="flex gap-2">
            {MOBILITY.map(m => (
              <button
                key={m.value}
                onClick={() => setMobility(m.value as MobilityLevel | 'all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  mobility === m.value ? 'ring-2 ring-orange-400 ' + m.color : m.color
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Veg toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-600">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={e => setVegOnly(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <Leaf size={14} className="text-green-600" /> Veg only
          </label>

          {/* Language filter */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs text-gray-500">🗣️ Language:</span>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-orange-300 bg-white text-gray-700"
            >
              {LANGUAGES.map(l => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{filtered.length} places found</p>

          {view === 'map' ? (
            <MapView places={filtered} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(place => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>No places found for these filters. Try adjusting.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PlaceCard({ place }: { place: Place }) {
  const catEmoji: Record<string, string> = {
    temple: '🛕', nature: '🌿', senior_group: '👴',
    cultural_event: '🎭', shopping: '🛍️', restaurant: '🍛', healthcare: '🏥',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all p-5 flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{catEmoji[place.category] || '📍'}</span>
        <div className="flex gap-1.5 flex-wrap justify-end">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${MOBILITY_BADGE[place.mobility_level]}`}>
            {place.mobility_level}
          </span>
          {place.vegetarian_friendly && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
              🥬 Veg
            </span>
          )}
          {place.is_verified && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
              ✓ Verified
            </span>
          )}
        </div>
      </div>
      <h3 className="font-semibold text-gray-800 mb-1.5 leading-snug">{place.name}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-3">{place.description}</p>
      {place.languages_spoken && place.languages_spoken.length > 0 && (
        <p className="flex items-start gap-1.5 text-xs text-indigo-600 mb-2">
          🗣️ {place.languages_spoken.join(', ')}
        </p>
      )}
      {place.address && (
        <p className="flex items-start gap-1.5 text-xs text-gray-400 mb-2">
          <MapPin size={12} className="mt-0.5 flex-shrink-0" />
          {place.address}
        </p>
      )}
      {place.best_time && (
        <p className="flex items-start gap-1.5 text-xs text-amber-600 mb-2">
          <Clock size={12} className="mt-0.5 flex-shrink-0" />
          {place.best_time}
        </p>
      )}
      {place.accessibility_notes && (
        <p className="flex items-start gap-1.5 text-xs text-blue-600 mb-3">
          <Accessibility size={12} className="mt-0.5 flex-shrink-0" />
          {place.accessibility_notes}
        </p>
      )}
      {place.google_maps_url && (
        <a
          href={place.google_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 text-sm font-medium transition-colors mt-auto"
        >
          <ExternalLink size={14} /> Open in Maps
        </a>
      )}
    </div>
  );
}
