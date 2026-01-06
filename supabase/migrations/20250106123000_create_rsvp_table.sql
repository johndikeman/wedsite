-- Create RSVP responses table for wedding website
drop table if exists rsvp_responses;

create table if not exists rsvp_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  attending boolean not null,
  guests_count integer not null default 1,
  -- NULL for on_behalf_of means they responded for themselves
  on_behalf_of text,
  dietary_restrictions text,
  message text,
  -- Add constraint for at least one guest
  constraint guests_count_positive check (guests_count > 0)
);

-- Enable Row Level Security for safety
alter table rsvp_responses enable row level security;

-- Create policies:
-- Anyone can insert their own RSVP (no auth required)
create policy "Allow public insert for RSVP submissions"
  on rsvp_responses for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users can read data for admin purposes
create policy "Allow authenticated users to view RSVPs"
  on rsvp_responses for select
  to authenticated
  using (true);

-- Add email format validation constraint
alter table rsvp_responses add constraint email_format 
  check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Create indexes for performance
create index rsvp_responses_email_idx on rsvp_responses(email);
create index rsvp_responses_created_at_idx on rsvp_responses(created_at desc);
create index rsvp_responses_attending_idx on rsvp_responses(attending);

-- Add comment for documentation
comment on table rsvp_responses is 'RSVP responses for wedding website, submitted by guests';
comment on column rsvp_responses.on_behalf_of is 'If responding for someone else, their name. NULL means responding for themselves.';
comment on column rsvp_responses.dietary_restrictions is 'Dietary restrictions for the guests (if any)';
