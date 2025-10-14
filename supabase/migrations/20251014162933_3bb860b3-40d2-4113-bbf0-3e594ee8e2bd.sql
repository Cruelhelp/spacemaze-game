-- Create leaderboard table
CREATE TABLE public.leaderboard (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name text NOT NULL,
  completion_time integer NOT NULL, -- time in milliseconds
  comment text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS (public read, authenticated write)
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Allow everyone to view leaderboard
CREATE POLICY "Anyone can view leaderboard" 
ON public.leaderboard 
FOR SELECT 
USING (true);

-- Allow anyone to insert their score
CREATE POLICY "Anyone can insert scores" 
ON public.leaderboard 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster sorting by time
CREATE INDEX idx_leaderboard_time ON public.leaderboard(completion_time ASC);

-- Create index for recent entries
CREATE INDEX idx_leaderboard_created ON public.leaderboard(created_at DESC);