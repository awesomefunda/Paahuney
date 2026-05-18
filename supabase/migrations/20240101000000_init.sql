-- ============================================================
-- Paahuney DB Schema — Run via Supabase CLI or Dashboard SQL
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────────
-- 1. PLACES / ACTIVITIES
-- ────────────────────────────────────────────────
create table if not exists places (
  id              uuid primary key default uuid_generate_v4(),
  name            text not null,
  category        text not null check (category in (
                    'temple', 'nature', 'cultural_event',
                    'senior_group', 'shopping', 'healthcare', 'restaurant'
                  )),
  description     text,
  address         text,
  city            text default 'Bay Area',
  lat             numeric(10, 7),
  lng             numeric(10, 7),
  google_maps_url text,
  mobility_level  text check (mobility_level in ('easy', 'moderate', 'active')) default 'easy',
  vegetarian_friendly boolean default false,
  best_time       text,
  accessibility_notes text,
  source_url      text,
  is_verified     boolean default false,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);

create index on places(category);
create index on places(city);
create index on places(mobility_level);

-- ────────────────────────────────────────────────
-- 2. PROFILES (extends Supabase auth.users)
-- ────────────────────────────────────────────────
create table if not exists profiles (
  id                    uuid primary key references auth.users(id) on delete cascade,
  display_name          text,
  city                  text,
  parent_visiting_from  date,
  parent_visiting_to    date,
  avatar_url            text,
  created_at            timestamptz default now()
);

-- Auto-create profile on user sign-up
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ────────────────────────────────────────────────
-- 3. COMMUNITY POSTS
-- ────────────────────────────────────────────────
create table if not exists posts (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid references auth.users(id) on delete cascade,
  type        text not null check (type in ('seeking_companion', 'tip', 'question', 'event')),
  title       text not null,
  content     text not null,
  city        text default 'Bay Area',
  upvotes     int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create index on posts(type);
create index on posts(city);
create index on posts(created_at desc);

-- Upvotes table (prevent duplicate voting)
create table if not exists post_upvotes (
  post_id    uuid references posts(id) on delete cascade,
  user_id    uuid references auth.users(id) on delete cascade,
  primary key (post_id, user_id)
);

-- ────────────────────────────────────────────────
-- 4. RESOURCES (admin-managed static content)
-- ────────────────────────────────────────────────
create table if not exists resources (
  id          uuid primary key default uuid_generate_v4(),
  category    text not null check (category in (
                'insurance', 'healthcare', 'emergency',
                'consulate', 'checklist', 'transportation'
              )),
  title       text not null,
  content     text,
  links       jsonb default '[]',  -- [{label, url}]
  order_index int default 0,
  created_at  timestamptz default now()
);

create index on resources(category);

-- ────────────────────────────────────────────────
-- 5. ROW LEVEL SECURITY
-- ────────────────────────────────────────────────

-- Places: public read, admin write
alter table places enable row level security;
create policy "Public can read places" on places for select using (true);

-- Profiles: users can read/update own profile
alter table profiles enable row level security;
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Posts: public read, authenticated write
alter table posts enable row level security;
create policy "Public can read posts" on posts for select using (true);
create policy "Authenticated users can insert posts" on posts for insert with check (auth.uid() = user_id);
create policy "Users can update own posts" on posts for update using (auth.uid() = user_id);
create policy "Users can delete own posts" on posts for delete using (auth.uid() = user_id);

-- Post upvotes
alter table post_upvotes enable row level security;
create policy "Public can read upvotes" on post_upvotes for select using (true);
create policy "Authenticated users can upvote" on post_upvotes for insert with check (auth.uid() = user_id);
create policy "Users can remove own upvote" on post_upvotes for delete using (auth.uid() = user_id);

-- Resources: public read
alter table resources enable row level security;
create policy "Public can read resources" on resources for select using (true);
