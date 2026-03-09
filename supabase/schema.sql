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
