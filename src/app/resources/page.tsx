'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Resource, ResourceCategory } from '@/types';
import { Shield, Heart, Phone, Building2, CheckSquare, Bus, Plane, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const CATEGORIES: { value: ResourceCategory; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'insurance', label: 'Visitor Insurance', icon: <Shield size={18}/>, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { value: 'flight_companion', label: 'Flight Companion', icon: <Plane size={18}/>, color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { value: 'healthcare', label: 'Healthcare', icon: <Heart size={18}/>, color: 'bg-red-50 text-red-700 border-red-200' },
  { value: 'emergency', label: 'Emergency Contacts', icon: <Phone size={18}/>, color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { value: 'consulate', label: 'Consulate Services', icon: <Building2 size={18}/>, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { value: 'checklist', label: 'Checklists', icon: <CheckSquare size={18}/>, color: 'bg-green-50 text-green-700 border-green-200' },
  { value: 'transportation', label: 'Transportation', icon: <Bus size={18}/>, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
];

const MOCK_RESOURCES: Resource[] = [
  {
    id: '1', category: 'insurance', order_index: 1, created_at: '',
    title: 'Visitor Health Insurance Guide',
    content: 'Most B-2 visa visitors are NOT covered by US health insurance or Medicare. Visitor insurance is essential. Plans typically cost $100–500/month depending on age, coverage amount, and deductible. Always get coverage BEFORE departure from India.',
    links: [
      { label: 'Compare on Insubuy', url: 'https://www.insubuy.com' },
      { label: 'WorldTrips Atlas America', url: 'https://www.worldtrips.com' },
      { label: 'OnshoreKare', url: 'https://www.onshorekare.com' },
    ],
  },
  {
    id: '2', category: 'insurance', order_index: 2, created_at: '',
    title: 'Pre-existing Condition Coverage',
    content: 'If your parent has diabetes, heart disease, or other pre-existing conditions, look for plans with "acute onset of pre-existing conditions" coverage. This covers sudden flare-ups but not ongoing treatment. Compare: Patriot America Plus, Atlas America, Safe Travels USA.',
    links: [{ label: 'Safe Travels USA', url: 'https://www.travelexinsurance.com' }],
  },
  {
    id: '3', category: 'emergency', order_index: 1, created_at: '',
    title: 'Emergency Contacts — Bay Area',
    content: 'Save these: 911 (Emergency), 811 (Non-emergency nurse advice line), Fremont Police Non-Emergency: (510) 790-6800, San Jose Police: (408) 277-8900. For hospitals: UCSF, Stanford, and Regional Medical Centers are the top options.',
    links: [
      { label: 'UCSF Medical Center', url: 'https://www.ucsfhealth.org' },
      { label: 'Stanford Health Care', url: 'https://stanfordhealthcare.org' },
    ],
  },
  {
    id: '4', category: 'consulate', order_index: 1, created_at: '',
    title: 'Indian Consulate San Francisco',
    content: 'For passport renewals, OCI services, and emergency travel documents. Book appointments online — walk-ins are not accepted. Processing can take 4–6 weeks. Located at 540 Arguello Blvd, San Francisco.',
    links: [
      { label: 'Consulate General of India SF', url: 'https://www.cgisf.gov.in' },
      { label: 'Book Appointment', url: 'https://www.cgisf.gov.in/page/appointment/' },
    ],
  },
  {
    id: '5', category: 'checklist', order_index: 1, created_at: '',
    title: 'Pre-Arrival Checklist for Parents',
    content: 'Before they land: ✅ Visitor insurance purchased ✅ Travel adapter (India uses Type C/D, US uses Type A/B) ✅ Copy of all prescriptions with generic names ✅ 3-month supply of medications ✅ Comfortable walking shoes ✅ US SIM or international plan ✅ Emergency contacts saved ✅ Consulate contact saved ✅ Insurance card printed',
    links: [],
  },
  {
    id: '6', category: 'healthcare', order_index: 1, created_at: '',
    title: 'Finding Doctors Who Accept Visitor Insurance',
    content: 'Not all doctors accept visitor/travel insurance — always call ahead and confirm before booking. When calling, say: "I have visitor health insurance from [plan name]. Do you accept it as out-of-network?" Most visitor insurance plans work on a reimbursement basis: you pay upfront, then submit a claim. Keep all receipts and itemized bills.\n\nFor urgent but non-emergency situations, Urgent Care centers (not ERs) are far cheaper. Urgent Care visits typically cost $100–200 vs. $3,000+ at an ER.\n\nTip: Your insurance provider\'s member portal or 24/7 helpline can recommend in-network providers near you.',
    links: [
      { label: 'Find Urgent Care – Solv Health', url: 'https://www.solvhealth.com' },
      { label: 'Zocdoc – Filter by Insurance', url: 'https://www.zocdoc.com' },
      { label: 'Insubuy – Claim Filing Help', url: 'https://www.insubuy.com/visitors-insurance-claims/' },
    ],
  },
  {
    id: '7', category: 'flight_companion', order_index: 1, created_at: '',
    title: 'Why Parents Need a Travel Companion',
    content: 'Long-haul flights from India to the US (typically 18–22 hours with a layover) are overwhelming for elderly parents — especially first-timers. Common challenges:\n\n• Navigating large connecting airports (Dubai, London Heathrow, Frankfurt, Doha) alone\n• Filling immigration/customs forms in English\n• Finding the right gate during a tight layover\n• Communicating with airline staff who don\'t speak Hindi/Telugu/Punjabi\n• Boarding the right connecting flight without missing it\n\nA co-traveler on the same or similar itinerary — even a fellow passenger willing to help — can make an enormous difference.',
    links: [],
  },
  {
    id: '8', category: 'flight_companion', order_index: 2, created_at: '',
    title: 'Where to Find a Travel Companion',
    content: 'These platforms connect families looking for co-travelers on India–USA routes:\n\n• ImmiHelp TravBuddy — post your parent\'s travel dates and route; matched with travelers on the same legs\n• Path2USA Travel Companion — free listings, large Indian diaspora community\n• Facebook Groups — search "India to USA travel companion [year]", "Bay Area desi parents", or city-specific NRI groups\n• r/ABCDesis and r/India on Reddit — post your parent\'s route and dates\n• Local temple WhatsApp groups — often the fastest way; someone in your community is likely flying the same route\n\nAlways verify the companion\'s identity before travel. Share details only with people vouched for by your community.',
    links: [
      { label: 'ImmiHelp TravBuddy', url: 'https://www.immihelp.com/travel-companion/' },
      { label: 'Path2USA Travel Companion', url: 'https://www.path2usa.com/travel-companion/' },
    ],
  },
  {
    id: '9', category: 'flight_companion', order_index: 3, created_at: '',
    title: 'Airline Assistance Services (Free)',
    content: 'All major airlines offer free assistance for elderly and mobility-limited passengers — but you must request it at booking or at least 48 hours before departure.\n\n✈️ Wheelchair service — door-to-gate, gate-to-gate, and gate-to-baggage claim\n✈️ Meet & Assist — airline staff escorts your parent through connections, immigration, and customs\n✈️ UM/Adult assist (varies by airline) — some carriers extend unaccompanied minor-style escort to elderly adults for a fee\n\nCall the airline directly after booking to add these. Air India, Emirates, Etihad, Qatar Airways, and United all offer these services on India–USA routes.\n\nAlso ask the travel agent or ticketing office in India to add "WCHR" (wheelchair ramp) or "WCHC" (wheelchair cabin) to the booking.',
    links: [
      { label: 'Air India Special Assistance', url: 'https://www.airindia.in/special-assistance.htm' },
      { label: 'Emirates Special Assistance', url: 'https://www.emirates.com/us/english/before-you-fly/special-needs/' },
      { label: 'United Airlines Special Needs', url: 'https://www.united.com/en/us/fly/travel/special-needs.html' },
    ],
  },
  {
    id: '10', category: 'flight_companion', order_index: 4, created_at: '',
    title: 'Tips for a Smooth Transit',
    content: 'Prepare these before your parent boards:\n\n📄 Print a one-page cheat sheet with: their name, your phone number, connecting flight number, gate info, and "I need help, please call my son/daughter" in English\n📱 Set up WhatsApp with location sharing so you can track them during transit\n🏷️ Attach a luggage tag with your US address and phone number\n⏰ Book layovers of at least 2–3 hours — elderly passengers take longer to deplane and transit\n🛂 CBP (US customs) has translators available — your parent can ask for one\n💊 Keep all medications in carry-on, labeled in English with prescription info\n\nFor parents who don\'t speak English, write their destination city, your address, and your phone number on a card they can show to airline staff.',
    links: [
      { label: 'CBP Traveler Information', url: 'https://www.cbp.gov/travel/international-visitors' },
    ],
  },
];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<ResourceCategory>('insurance');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .order('order_index');
        if (error || !data?.length) {
          setResources(MOCK_RESOURCES);
        } else {
          setResources(data);
        }
      } catch {
        setResources(MOCK_RESOURCES);
      }
      setLoading(false);
    };
    load();
  }, []);

  const filtered = resources.filter(r => r.category === activeCategory);
  const cat = CATEGORIES.find(c => c.value === activeCategory)!;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 Resource Hub</h1>
        <p className="text-gray-500">Everything you need to prepare for your parents' visit — insurance, flight companions, healthcare, emergency contacts, and more.</p>
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => setActiveCategory(c.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
              activeCategory === c.value ? c.color + ' shadow-sm' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'
            }`}
          >
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      {/* Resources */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
              <div className="h-3 bg-gray-100 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(resource => (
            <div key={resource.id} className="bg-white rounded-2xl border border-gray-100 hover:border-orange-100 transition-all overflow-hidden">
              <button
                className="w-full text-left p-5 flex items-center justify-between"
                onClick={() => setExpanded(expanded === resource.id ? null : resource.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}>
                    {cat.icon}
                  </span>
                  <h3 className="font-semibold text-gray-800">{resource.title}</h3>
                </div>
                {expanded === resource.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </button>
              {expanded === resource.id && (
                <div className="px-5 pb-5 border-t border-gray-50">
                  <p className="text-gray-600 text-sm leading-relaxed mt-3 whitespace-pre-line">{resource.content}</p>
                  {resource.links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {resource.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-medium rounded-lg transition-colors"
                        >
                          <ExternalLink size={12} /> {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No resources yet for this category. Coming soon!</p>
            </div>
          )}
        </div>
      )}

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-gray-400 text-center">
        Resources are curated for informational purposes only. Always verify insurance terms and consulate requirements directly.
      </p>
    </div>
  );
}
