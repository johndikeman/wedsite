create table if not exists rsvp_responses (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  attending boolean not null,
  adults integer not null default 0,
  kids integer not null default 0,
  message text
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

-- Create indexes for performance
create index rsvp_responses_email_idx on rsvp_responses(email);
create index rsvp_responses_created_at_idx on rsvp_responses(created_at desc);
create index rsvp_responses_attending_idx on rsvp_responses(attending);

-- Add comment for documentation
comment on table rsvp_responses is 'RSVP responses for wedding website, submitted by guests';
