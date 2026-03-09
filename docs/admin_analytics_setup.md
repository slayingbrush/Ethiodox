# Admin CMS + Analytics Setup (Supabase)

This project now includes:

- `/admin`: create/delete live blog posts and site updates
- `/admin/analytics`: page views, sessions, top pages, top referrers
- `/updates`: public feed of admin site updates
- `/blog/live?id=...`: public reader for live admin posts

## 1) Environment Variables

Add these variables in your deployment settings and local `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=hhttps://uixodlavfjjjwwasyjdd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpeG9kbGF2Zmpqand3YXN5amRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzM3MDcsImV4cCI6MjA4ODY0OTcwN30.ZIlSfgXZmkDQNwoq629XbMPgFuuxJ5CZk2X52TmPI8g
NEXT_PUBLIC_ADMIN_PASSCODE=choose-a-strong-passcode
```

## 2) Supabase SQL Schema

Run in Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text not null,
  content text not null,
  author text not null,
  tags text[] not null default '{}',
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.site_updates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  section text not null default 'General',
  content text not null,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.page_events (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  session_id text not null,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists page_events_created_at_idx on public.page_events (created_at desc);
create index if not exists page_events_path_idx on public.page_events (path);
```

## 3) RLS Policies (Simple Mode)

Enable RLS and add basic policies:

```sql
alter table public.blog_posts enable row level security;
alter table public.site_updates enable row level security;
alter table public.page_events enable row level security;

drop policy if exists "blog_select_published" on public.blog_posts;
create policy "blog_select_published"
on public.blog_posts
for select
using (published = true);

drop policy if exists "blog_insert_all" on public.blog_posts;
create policy "blog_insert_all"
on public.blog_posts
for insert
with check (true);

drop policy if exists "blog_delete_all" on public.blog_posts;
create policy "blog_delete_all"
on public.blog_posts
for delete
using (true);

drop policy if exists "updates_select_published" on public.site_updates;
create policy "updates_select_published"
on public.site_updates
for select
using (published = true);

drop policy if exists "updates_insert_all" on public.site_updates;
create policy "updates_insert_all"
on public.site_updates
for insert
with check (true);

drop policy if exists "updates_delete_all" on public.site_updates;
create policy "updates_delete_all"
on public.site_updates
for delete
using (true);

drop policy if exists "events_insert_all" on public.page_events;
create policy "events_insert_all"
on public.page_events
for insert
with check (true);

drop policy if exists "events_select_all" on public.page_events;
create policy "events_select_all"
on public.page_events
for select
using (true);
```

## 4) Important Security Note

Current admin login uses a client-side passcode (`NEXT_PUBLIC_ADMIN_PASSCODE`) and simple anon-key policies.

That is acceptable for a fast MVP, but not strong security. For production-grade admin:

- move admin writes to a trusted backend (server/API/edge function),
- use real auth (Supabase Auth or your own auth),
- tighten RLS so anonymous users cannot write/delete data.
