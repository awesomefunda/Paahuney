# 🙏 Paahuney

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)

> *Paahuney* (पाहुणे) — "guests" in Marathi/Hindi

**A free, open-source platform connecting immigrant families in the Bay Area with cultural and community resources for their visiting loved ones.**

Discover temples, parks, senior groups, visitor insurance information, healthcare resources, and connect with other families in your community.

**[Live Demo](https://paahuney.vercel.app)** · [Report Bug](https://github.com/awesomefunda/Paahuney/issues) · [Request Feature](https://github.com/awesomefunda/Paahuney/issues)

---

## ✨ Features

- 🏛️ **Temple & Cultural Venue Discovery** — Find nearby temples, cultural centers, and community spaces
- 👴 **Senior-Friendly Resources** — Curated activities and groups for older visitors
- 🏥 **Healthcare & Insurance Info** — Visitor insurance, healthcare provider listings, and health resources
- 💬 **Community Board** — Connect with other families, share experiences, and ask questions
- 🔍 **Intelligent Filtering** — Filter activities by category, location, and accessibility
- 📱 **Mobile-Responsive Design** — Works seamlessly on all devices
- 🔐 **Privacy-First** — Open source, no tracking, no ads

**Tech Stack:** Next.js 16 · React 19 · TypeScript · Supabase (PostgreSQL) · Tailwind CSS · Vercel

---

## 🚀 Quick Start (Local Development)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

**Option A: Supabase Cloud (easiest)**
1. Go to [supabase.com](https://supabase.com) → New project (free tier)
2. Once created, go to **Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (only for seeder)

**Option B: Supabase Local (Docker required)**
```bash
npm install -g supabase
supabase start
# → outputs local URL and anon key
```

### 3. Configure environment

```bash
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials
```

### 4. Run database migrations

Go to your Supabase project → **SQL Editor** and run both files:
- `supabase/migrations/20240101000000_init.sql` (schema + RLS)
- `supabase/migrations/20240101000001_seed.sql` (12 Bay Area places + resources)

Or with Supabase CLI (local):
```bash
supabase db reset
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌱 Seed More Data (Optional)

Run the Python scraper to pull additional places from public Bay Area websites:

```bash
# Install Python dependencies
pip install requests beautifulsoup4 groq supabase python-dotenv

# Get a free Groq API key at console.groq.com (for AI structuring)
# Add GROQ_API_KEY to .env.local

python scripts/scrape_seed_data.py
```

Even without Groq, the script seeds the 7 hardcoded verified places.

---

## 📁 Project Structure

```
paahuney/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage
│   │   ├── activities/       # Activity discovery + filters
│   │   ├── resources/        # Insurance, healthcare, checklists
│   │   ├── community/        # Community board (posts, upvotes)
│   │   └── auth/             # Sign in / Sign up
│   ├── components/
│   │   └── Navbar.tsx
│   ├── lib/supabase/
│   │   ├── client.ts         # Browser client
│   │   └── server.ts         # Server-side client
│   └── types/index.ts        # TypeScript types
├── supabase/migrations/
│   ├── 20240101000000_init.sql   # Schema + RLS policies
│   └── 20240101000001_seed.sql   # Seed data
├── scripts/
│   └── scrape_seed_data.py       # Web scraper + Supabase seeder
└── .env.local.example
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended — Free)

Vercel is optimized for Next.js and includes free preview deployments.

**Option 1: Via GitHub (Easiest)**
1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon key
5. Click **Deploy**

**Option 2: Via Vercel CLI**
```bash
npm install -g vercel
vercel
# Follow prompts, then set environment variables in dashboard
```

### Set Up Supabase Database

1. Create a free project on [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and paste both migration files:
   - `supabase/migrations/20240101000000_init.sql` (schema + security)
   - `supabase/migrations/20240101000001_seed.sql` (sample data)
3. Copy API credentials to Vercel environment variables

### Self-Host (Advanced)

For Docker/self-hosted deployment:
```bash
npm run build
npm run start
# Runs on port 3000
```

Requires Node.js 18+ and PostgreSQL database configured via environment variables.

---

## 🐙 Contributing

We welcome contributions! This is a community-driven project, and we'd love your help.

### Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/awesomefunda/Paahuney.git
   cd paahuney
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** and commit:
   ```bash
   git commit -m "Add your feature description"
   ```
5. **Push to your fork and create a Pull Request**

### Development Guidelines

- **Code Style:** Follow ESLint configuration (`npm run lint`)
- **TypeScript:** All components must be properly typed
- **Tailwind CSS:** Use existing utility classes; avoid inline styles
- **Database:** Never modify migrations directly; create new ones
- **Testing:** Add tests for new features when possible

### Ideas for Contributing

- 🐛 **Bug Fixes** — Report issues or submit fixes
- ✨ **Features** — New temples, resources, or functionality
- 📝 **Documentation** — Improve README, add guides
- 🎨 **UI/UX** — Design improvements, accessibility
- 🌍 **Localization** — Add support for other languages
- 🗺️ **Expansion** — Help bring Paahuney to other cities

### Reporting Issues

Found a bug? [Open an issue](https://github.com/awesomefunda/Paahuney/issues) with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Your environment (browser, OS, Node version)

---

## 🆘 Troubleshooting

**Issue: `Cannot find module '@supabase/supabase-js'`**
```bash
npm install
npm run dev
```

**Issue: Environment variables not loading**
- Restart dev server: `npm run dev`
- Check `.env.local` exists and has correct values
- Verify `NEXT_PUBLIC_` prefix for browser-visible variables
- Ensure no spaces around `=` in `.env.local`

**Issue: Database migrations failed**
- Go to Supabase → SQL Editor
- Check for errors in the SQL console
- Verify tables exist in the **Table Editor**
- Ensure both migration files ran in order

**Issue: Login not working**
- Check Supabase auth is enabled in your project
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
- Check RLS policies in Supabase dashboard (should allow public read)

**Issue: Deployed app shows blank page**
- Check Vercel build logs for errors
- Verify all environment variables are set in Vercel dashboard
- Confirm Supabase project is still active

Need more help? [Open a discussion](https://github.com/awesomefunda/Paahuney/discussions) or see [Supabase docs](https://supabase.com/docs).

---

## 📋 Project Structure

```
paahuney/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Homepage
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── activities/page.tsx   # Activity discovery
│   │   ├── resources/page.tsx    # Resources & guides
│   │   ├── community/page.tsx    # Community board
│   │   ├── auth/page.tsx         # Auth pages
│   │   └── api/upvote/           # API endpoints
│   ├── components/
│   │   └── Navbar.tsx            # Navigation
│   ├── lib/supabase/
│   │   ├── client.ts             # Browser client
│   │   └── server.ts             # Server client
│   └── types/index.ts            # TypeScript types
├── supabase/migrations/
│   ├── 20240101000000_init.sql   # Schema & RLS
│   └── 20240101000001_seed.sql   # Sample data
├── scripts/
│   └── scrape_seed_data.py       # Data scraper (optional)
├── public/                        # Static assets
├── .env.local.example            # Environment template
└── tsconfig.json                 # TypeScript config
```

---

## 🗄️ Database Schema

| Table | Purpose |
|-------|---------|
| `places` | Activities, temples, parks, restaurants |
| `profiles` | User profiles (extends Supabase auth) |
| `posts` | Community posts (tips, companion requests, events) |
| `post_upvotes` | Upvotes with duplicate prevention |
| `resources` | Static content (insurance guides, checklists) |

All tables have Row Level Security (RLS) enabled. Public read, authenticated write.

---

## 🗺️ Roadmap

| Phase | Status | Features |
|-------|--------|---------|
| 1 — Bay Area MVP | ✅ Ready | Activities, Resources, Community, Auth |
| 2 — Multi-city | 🔜 | Seattle, LA, NYC, Austin, Dallas |
| 3 — Monetization | 🔮 | Insurance affiliates, featured listings |

---

## 💛 Why Paahuney?

> "We just have a newborn and family is visiting. Is there any Indian WhatsApp group activity for older parents who they can meet and socialize?" — Real post on Blind

Thousands of immigrant families face this challenge every year. Parents come from India, feel isolated, and existing platforms don't serve their specific needs. Paahuney is built to change that.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details. You're free to use, modify, and distribute this software in personal and commercial projects.

---

## ✍️ Authors

- *[Harsh Kumar]]** — Creator & Lead Developer ([GitHub](https://github.com/awesomefunda))

---

## 🙌 Acknowledgments

- [Supabase](https://supabase.com) — Free, open-source PostgreSQL backend
- [Next.js](https://nextjs.org) — React framework
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Vercel](https://vercel.com) — Free hosting
- Community contributors and testers

---

## 💬 Support & Community

- **Discussions:** [GitHub Discussions](https://github.com/awesomefunda/Paahuney/discussions)
- **Issues:** [GitHub Issues](https://github.com/awesomefunda/Paahuney/issues)
- **Email:** [your-email@example.com]

---

<div align="center">

Built with ❤️ for immigrant families in the Bay Area

**[Star this repo](https://github.com/awesomefunda/Paahuney) if you find it helpful!** ⭐

</div>
