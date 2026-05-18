-- ============================================================
-- Seed Data — Bay Area Places for Immigrant Parents
-- ============================================================

insert into places (name, category, description, address, city, lat, lng, google_maps_url, mobility_level, vegetarian_friendly, best_time, accessibility_notes) values

-- TEMPLES
('Fremont Hindu Temple (Shiva-Vishnu Temple)', 'temple',
 'One of the largest Hindu temples in the Bay Area, featuring beautiful architecture and regular puja ceremonies. Very welcoming to visiting parents.',
 '1232 Arrowhead Ave, Fremont, CA 94536', 'Fremont', 37.5530, -121.9886,
 'https://maps.google.com/?q=Fremont+Hindu+Temple',
 'easy', true, 'Weekday mornings for fewer crowds; weekends for festivals',
 'Paved parking lot, accessible entrance, seating available inside'),

('ISKCON Silicon Valley', 'temple',
 'Hare Krishna temple with daily arati, delicious prasad (vegetarian), and a welcoming community. Many devotees speak Hindi/Gujarati.',
 '1235 Persian Dr, Sunnyvale, CA 94089', 'Sunnyvale', 37.4019, -122.0186,
 'https://maps.google.com/?q=ISKCON+Silicon+Valley',
 'easy', true, 'Sunday feast at 5pm is especially lively',
 'Flat terrain, wheelchair accessible, free parking'),

('Chinmaya Mission San Jose', 'temple',
 'Vedanta center offering Gita classes, bhajans, and senior-friendly cultural programs. Great for spiritually inclined parents.',
 '55 Bhagavan Dr, San Jose, CA 95134', 'San Jose', 37.4089, -121.9578,
 'https://maps.google.com/?q=Chinmaya+Mission+San+Jose',
 'easy', true, 'Saturday/Sunday programs, check calendar',
 'Accessible parking, paved pathways'),

-- NATURE
('Lake Elizabeth (Central Park Fremont)', 'nature',
 'Beautiful 72-acre lake with paved walking paths perfect for morning strolls. Lots of Indian families visit on weekends. Ducks and geese!',
 '40204 Paseo Padre Pkwy, Fremont, CA 94538', 'Fremont', 37.5567, -121.9830,
 'https://maps.google.com/?q=Lake+Elizabeth+Fremont',
 'easy', false, 'Morning 7-10am; avoid peak afternoon heat',
 'Fully paved loop path (3.3 miles), benches every 200m, restrooms, wheelchair accessible'),

('Shoreline at Mountain View', 'nature',
 'Flat paved trails around a beautiful lake. Birdwatching is excellent. Very popular with South Asian seniors for morning walks.',
 '3070 N Shoreline Blvd, Mountain View, CA 94043', 'Mountain View', 37.4246, -122.0820,
 'https://maps.google.com/?q=Shoreline+Park+Mountain+View',
 'easy', false, 'Early morning or late afternoon',
 'Paved trails, accessible parking, restrooms, no steep hills'),

('Alum Rock Park', 'nature',
 'Scenic park with gentle trails, picnic areas, and natural mineral springs. Beautiful in spring when wildflowers bloom.',
 '16240 Alum Rock Ave, San Jose, CA 95127', 'San Jose', 37.3956, -121.8034,
 'https://maps.google.com/?q=Alum+Rock+Park+San+Jose',
 'moderate', false, 'Spring (March-May) for wildflowers; weekday mornings',
 'Some uneven terrain, easier trails near park entrance'),

-- SENIOR GROUPS
('India Community Center - Senior Programs', 'senior_group',
 'ICC Sunnyvale offers senior yoga, cultural events, language classes, and social gatherings specifically designed for Indian seniors.',
 '525 Los Coches St, Milpitas, CA 95035', 'Milpitas', 37.4323, -121.8996,
 'https://maps.google.com/?q=India+Community+Center+Milpitas',
 'easy', true, 'Check ICC calendar for senior program days',
 'Fully accessible facility, parking available, AC'),

('BAPS Swaminarayan Mandir Senior Satsang', 'senior_group',
 'Weekly spiritual gatherings specifically for seniors. Hindi/Gujarati spoken. Transportation sometimes available for seniors.',
 '795 Penitencia Creek Rd, San Jose, CA 95133', 'San Jose', 37.3989, -121.8456,
 'https://maps.google.com/?q=BAPS+San+Jose',
 'easy', true, 'Saturday mornings for senior satsang',
 'Fully accessible, no steps, plenty of seating'),

-- CULTURAL
('San Jose Museum of Art', 'cultural_event',
 'World-class art museum with senior discounts. The permanent collection has rotating exhibitions. Calm indoor environment, ideal for rainy days.',
 '110 S Market St, San Jose, CA 95113', 'San Jose', 37.3343, -121.8891,
 'https://maps.google.com/?q=San+Jose+Museum+of+Art',
 'easy', false, 'Weekday mornings (less crowded)',
 'Fully accessible, elevators, audio guides available, wheelchair available at entrance'),

('Great Mall Milpitas', 'shopping',
 'Large indoor mall with Indian restaurants, Desi grocery stores nearby. Air-conditioned, benches throughout. Popular with desi families.',
 '447 Great Mall Dr, Milpitas, CA 95035', 'Milpitas', 37.4155, -121.8929,
 'https://maps.google.com/?q=Great+Mall+Milpitas',
 'easy', true, 'Weekday mornings (11am-1pm) — less crowded, more seating available',
 'Fully accessible, plenty of seating throughout, accessible restrooms, food court with Indian options'),

-- RESTAURANTS / VEGETARIAN
('Udupi Palace', 'restaurant',
 'Authentic South Indian vegetarian restaurant. Dosas, idlis, thalis. Very popular with vegetarian parents. Moderate pricing.',
 '976 E El Camino Real, Sunnyvale, CA 94087', 'Sunnyvale', 37.3762, -122.0127,
 'https://maps.google.com/?q=Udupi+Palace+Sunnyvale',
 'easy', true, 'Lunch 11:30am-3pm for best service',
 'Accessible entrance, can accommodate dietary restrictions'),

('Amber India', 'restaurant',
 'Upscale North Indian restaurant with an extensive vegetarian menu. Great for a special family dinner with visiting parents.',
 '2290 W El Camino Real, Mountain View, CA 94040', 'Mountain View', 37.4011, -122.0818,
 'https://maps.google.com/?q=Amber+India+Mountain+View',
 'easy', true, 'Dinner reservations recommended on weekends',
 'Accessible entrance, spacious seating, quiet ambiance suitable for elderly');

-- ────────────────────────────────────────────────
-- Seed Resources
-- ────────────────────────────────────────────────
insert into resources (category, title, content, links, order_index) values

('insurance',
 'Visitor Health Insurance Guide',
 'Most B-2 visa visitors are NOT covered by US health insurance or Medicare. Visitor insurance is essential. Plans typically cost $100-500/month depending on age, coverage amount, and deductible. Always get coverage BEFORE departure.',
 '[{"label": "Compare on Insubuy", "url": "https://www.insubuy.com"}, {"label": "WorldTrips Atlas America", "url": "https://www.worldtrips.com"}, {"label": "OnshoreKare", "url": "https://www.onshorekare.com"}]',
 1),

('insurance',
 'Pre-existing Condition Coverage',
 'If your parent has a pre-existing condition (diabetes, heart disease, etc.), look for plans that offer "acute onset of pre-existing conditions" coverage. This covers sudden flare-ups but not ongoing treatment. Compare: Patriot America Plus, Atlas America, and Safe Travels USA.',
 '[{"label": "Safe Travels USA", "url": "https://www.travelexinsurance.com"}]',
 2),

('emergency',
 'Emergency Contacts Bay Area',
 'Always save these numbers: 911 (Emergency), 811 (Non-emergency nurse line), Fremont Police Non-Emergency: (510) 790-6800, San Jose Police Non-Emergency: (408) 277-8900',
 '[{"label": "UCSF Medical Center", "url": "https://www.ucsfhealth.org"}, {"label": "Stanford Health Care", "url": "https://stanfordhealthcare.org"}]',
 1),

('consulate',
 'Indian Consulate San Francisco',
 'For passport renewals, OCI services, and emergency travel documents. Book appointments online — walk-ins not accepted. Processing can take 4-6 weeks.',
 '[{"label": "Consulate General of India SF", "url": "https://www.cgisf.gov.in"}, {"label": "Book Appointment", "url": "https://www.cgisf.gov.in/page/appointment/"}]',
 1),

('checklist',
 'Pre-Arrival Checklist for Parents',
 'Before they land: ✅ Visitor insurance purchased ✅ Travel adapter (India uses Type C/D) ✅ Copy of all prescriptions + generic names ✅ 3-month supply of medications ✅ Comfortable walking shoes ✅ US SIM or international plan ✅ Emergency contacts saved to phone',
 '[]',
 1),

('healthcare',
 'Finding Indian Doctors in Bay Area',
 'Many South Asian parents prefer Indian doctors. Most accept walk-ins at Urgent Care. For primary care, look for physicians with Indian backgrounds in Fremont, Milpitas, Sunnyvale, and Santa Clara.',
 '[{"label": "Zocdoc - Find Indian Doctors", "url": "https://www.zocdoc.com"}, {"label": "WebMD Doctor Finder", "url": "https://doctor.webmd.com"}]',
 1);
