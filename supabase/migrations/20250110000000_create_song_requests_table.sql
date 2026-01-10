create table if not exists song_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  song_title text not null
);

-- Enable Row Level Security for safety
alter table song_requests enable row level security;

-- Create policies:
-- Anyone can insert song requests (no auth required)
create policy "Allow public insert for song requests"
  on song_requests for insert
  to anon, authenticated
  with check (true);

-- Only authenticated users can read data for admin purposes
create policy "Allow authenticated users to view song requests"
  on song_requests for select
  to authenticated
  using (true);

-- Create index for song title search performance
create index song_requests_created_at_idx on song_requests(created_at desc);

-- Add comment for documentation
comment on table song_requests is 'Song requests submitted by wedding guests';
