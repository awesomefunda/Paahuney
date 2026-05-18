#!/usr/bin/env python3
"""
Paahuney Seed Data Scraper
Run: python scripts/scrape_seed_data.py
Requires: pip install requests beautifulsoup4 groq supabase python-dotenv
"""
import os, json, time, requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
load_dotenv()

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL","")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY","")
GROQ_API_KEY = os.getenv("GROQ_API_KEY","")
HEADERS = {"User-Agent":"Mozilla/5.0 (compatible; PaahuneyBot/1.0)"}

SOURCES = [
    {"url":"https://www.baymasala.com/events.html","category":"cultural_event","city":"Bay Area"},
    {"url":"https://fremonttemple.org/","category":"temple","city":"Fremont"},
    {"url":"https://www.indiancc.org/programs/seniors","category":"senior_group","city":"Milpitas"},
]

FALLBACK_PLACES = [
    {"name":"Fremont Hindu Temple (Shiva-Vishnu Temple)","category":"temple","description":"One of the largest Hindu temples in Bay Area with beautiful architecture and regular puja ceremonies.","address":"1232 Arrowhead Ave, Fremont, CA 94536","city":"Fremont","lat":37.5530,"lng":-121.9886,"google_maps_url":"https://maps.google.com/?q=Fremont+Hindu+Temple","mobility_level":"easy","vegetarian_friendly":True,"best_time":"Weekday mornings for fewer crowds; weekends for festivals","accessibility_notes":"Paved parking, accessible entrance, seating inside","is_verified":True},
    {"name":"ISKCON Silicon Valley","category":"temple","description":"Hare Krishna temple with daily arati, delicious prasad, and welcoming community.","address":"1235 Persian Dr, Sunnyvale, CA 94089","city":"Sunnyvale","lat":37.4019,"lng":-122.0186,"google_maps_url":"https://maps.google.com/?q=ISKCON+Silicon+Valley","mobility_level":"easy","vegetarian_friendly":True,"best_time":"Sunday feast at 5pm","accessibility_notes":"Wheelchair accessible, free parking","is_verified":True},
    {"name":"Lake Elizabeth (Central Park Fremont)","category":"nature","description":"72-acre lake with paved walking paths perfect for morning strolls.","address":"40204 Paseo Padre Pkwy, Fremont, CA 94538","city":"Fremont","lat":37.5567,"lng":-121.9830,"google_maps_url":"https://maps.google.com/?q=Lake+Elizabeth+Fremont","mobility_level":"easy","vegetarian_friendly":False,"best_time":"Morning 7-10am","accessibility_notes":"Fully paved 3.3-mile loop, benches every 200m, wheelchair accessible","is_verified":True},
    {"name":"India Community Center Senior Programs","category":"senior_group","description":"Senior yoga, cultural events, language classes for Indian seniors.","address":"525 Los Coches St, Milpitas, CA 95035","city":"Milpitas","lat":37.4323,"lng":-121.8996,"google_maps_url":"https://maps.google.com/?q=India+Community+Center+Milpitas","mobility_level":"easy","vegetarian_friendly":True,"best_time":"Check ICC calendar","accessibility_notes":"Fully accessible, AC, parking available","is_verified":True},
    {"name":"Shoreline at Mountain View","category":"nature","description":"Flat paved trails around a beautiful lake. Popular with South Asian seniors.","address":"3070 N Shoreline Blvd, Mountain View, CA 94043","city":"Mountain View","lat":37.4246,"lng":-122.0820,"google_maps_url":"https://maps.google.com/?q=Shoreline+Park+Mountain+View","mobility_level":"easy","vegetarian_friendly":False,"best_time":"Early morning or late afternoon","accessibility_notes":"Paved trails, no steep hills","is_verified":True},
    {"name":"Udupi Palace","category":"restaurant","description":"Authentic South Indian vegetarian restaurant. Dosas, idlis, thalis.","address":"976 E El Camino Real, Sunnyvale, CA 94087","city":"Sunnyvale","lat":37.3762,"lng":-122.0127,"google_maps_url":"https://maps.google.com/?q=Udupi+Palace+Sunnyvale","mobility_level":"easy","vegetarian_friendly":True,"best_time":"Lunch 11:30am-3pm","accessibility_notes":"Accessible entrance","is_verified":True},
    {"name":"Great Mall Milpitas","category":"shopping","description":"Large indoor mall with Indian restaurants nearby. AC, benches throughout.","address":"447 Great Mall Dr, Milpitas, CA 95035","city":"Milpitas","lat":37.4155,"lng":-121.8929,"google_maps_url":"https://maps.google.com/?q=Great+Mall+Milpitas","mobility_level":"easy","vegetarian_friendly":True,"best_time":"Weekday mornings 11am-1pm","accessibility_notes":"Fully accessible, benches throughout, accessible restrooms","is_verified":True},
]

def scrape(url):
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        r.raise_for_status()
        soup = BeautifulSoup(r.text, "html.parser")
        for t in soup(["script","style","nav","footer","header"]): t.decompose()
        lines = [l.strip() for l in soup.get_text("\n").splitlines() if l.strip()]
        return "\n".join(lines)
    except Exception as e:
        print(f"  Fetch error {url}: {e}"); return ""

def groq_extract(text, category, city):
    if not GROQ_API_KEY: return []
    try:
        from groq import Groq
        c = Groq(api_key=GROQ_API_KEY)
        prompt = f'Extract places from text. Return JSON array with: name, category("{category}"), description, address, city("{city}"), mobility_level(easy/moderate/active), vegetarian_friendly(bool), best_time, accessibility_notes. Return [] if none found.\n\nText:\n{text[:3000]}'
        r = c.chat.completions.create(model="llama3-8b-8192",messages=[{"role":"user","content":prompt}],temperature=0.2,max_tokens=2000)
        raw = r.choices[0].message.content.strip()
        s,e = raw.find("["), raw.rfind("]")+1
        return json.loads(raw[s:e]) if s!=-1 and e>0 else []
    except Exception as ex:
        print(f"  Groq error: {ex}"); return []

def upsert(places):
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("  No Supabase config — printing result:\n")
        print(json.dumps(places, indent=2, default=str)); return
    try:
        from supabase import create_client
        sb = create_client(SUPABASE_URL, SUPABASE_KEY)
        for p in places:
            ex = sb.table("places").select("id").eq("name",p["name"]).execute()
            if ex.data: print(f"  Skip (exists): {p['name']}"); continue
            sb.table("places").insert(p).execute()
            print(f"  Inserted: {p['name']}")
    except Exception as e:
        print(f"  Supabase error: {e}")

def main():
    print("\n Paahuney Seed Data Scraper")
    all_places = []
    for src in SOURCES:
        print(f"\nScraping: {src['url']}")
        text = scrape(src["url"])
        if text:
            places = groq_extract(text, src["category"], src["city"])
            print(f"  LLM found {len(places)} places")
            all_places.extend(places)
        time.sleep(1)
    all_places.extend(FALLBACK_PLACES)
    print(f"\nUpserting {len(all_places)} places to Supabase...")
    upsert(all_places)
    print("\nDone! Run: npm run dev")

if __name__ == "__main__":
    main()
