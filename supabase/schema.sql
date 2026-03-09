create extension if not exists pgcrypto;

drop table if exists public.newsletter_subscribers;

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

-- ============================================================
-- Editors (authors who can write articles)
-- ============================================================
create table if not exists public.editors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  bio text not null default '',
  photo_url text,
  links jsonb not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.editors drop column if exists email;

alter table public.editors enable row level security;

drop policy if exists "editors_select_active" on public.editors;
create policy "editors_select_active"
on public.editors for select using (active = true);

drop policy if exists "editors_insert_all" on public.editors;
create policy "editors_insert_all"
on public.editors for insert with check (true);

drop policy if exists "editors_update_all" on public.editors;
create policy "editors_update_all"
on public.editors for update using (true);

drop policy if exists "editors_delete_all" on public.editors;
create policy "editors_delete_all"
on public.editors for delete using (true);

-- ============================================================
-- CMS Articles (replaces static article data)
-- ============================================================
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text not null,
  content text not null,
  editor_id uuid references public.editors(id) on delete set null,
  tags text[] not null default '{}',
  cover_image_url text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_editor_id_idx on public.articles (editor_id);
create index if not exists articles_category_idx on public.articles (category);
create index if not exists articles_created_at_idx on public.articles (created_at desc);

alter table public.articles enable row level security;

drop policy if exists "articles_select_published" on public.articles;
create policy "articles_select_published"
on public.articles for select using (published = true);

drop policy if exists "articles_insert_all" on public.articles;
create policy "articles_insert_all"
on public.articles for insert with check (true);

drop policy if exists "articles_update_all" on public.articles;
create policy "articles_update_all"
on public.articles for update using (true);

drop policy if exists "articles_delete_all" on public.articles;
create policy "articles_delete_all"
on public.articles for delete using (true);

-- ============================================================
-- Contributor access (editor logins for Sanctuary blog mode)
-- ============================================================
create table if not exists public.article_contributors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  editor_id uuid not null references public.editors(id) on delete cascade,
  passcode_hash text not null,
  can_publish boolean not null default true,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists article_contributors_editor_id_idx on public.article_contributors (editor_id);

alter table public.article_contributors enable row level security;

drop policy if exists "contributors_select_all" on public.article_contributors;
create policy "contributors_select_all"
on public.article_contributors for select using (true);

drop policy if exists "contributors_insert_all" on public.article_contributors;
create policy "contributors_insert_all"
on public.article_contributors for insert with check (true);

drop policy if exists "contributors_update_all" on public.article_contributors;
create policy "contributors_update_all"
on public.article_contributors for update using (true);

drop policy if exists "contributors_delete_all" on public.article_contributors;
create policy "contributors_delete_all"
on public.article_contributors for delete using (true);

-- ============================================================
-- Editable site pages (About, etc.)
-- ============================================================
create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  page_key text not null unique,
  title text not null,
  content text not null,
  updated_at timestamptz not null default now()
);

alter table public.site_pages enable row level security;

drop policy if exists "site_pages_select_all" on public.site_pages;
create policy "site_pages_select_all"
on public.site_pages for select using (true);

drop policy if exists "site_pages_upsert_all" on public.site_pages;
create policy "site_pages_upsert_all"
on public.site_pages for insert with check (true);

drop policy if exists "site_pages_update_all" on public.site_pages;
create policy "site_pages_update_all"
on public.site_pages for update using (true);
