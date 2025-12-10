-- Create enrollments table for ballet academy
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  address text not null,
  phone text not null,
  cpf text not null unique,
  date_of_birth date not null,
  enrollment_date timestamp with time zone default now(),
  -- Updated payment status to Portuguese
  payment_status text default 'aguardando_pagamento',
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (allow anyone to read for admin dashboard, anyone can insert)
alter table public.enrollments enable row level security;

-- Policy to allow anyone to view enrollments (for admin dashboard)
create policy "Allow anyone to view enrollments"
  on public.enrollments for select
  using (true);

-- Policy to allow anyone to insert new enrollments
create policy "Allow anyone to insert enrollments"
  on public.enrollments for insert
  with check (true);

-- Policy to allow updates to payment status
create policy "Allow anyone to update payment status"
  on public.enrollments for update
  using (true)
  with check (true);
