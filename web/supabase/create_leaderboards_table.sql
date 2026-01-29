-- ============================================
-- Leaderboards Table Creation Script
-- ============================================
-- Copy and paste this entire script into Supabase SQL Editor
-- ============================================

-- Create the leaderboards table
CREATE TABLE IF NOT EXISTS leaderboards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leaderboards_score_desc 
  ON leaderboards(score DESC, created_at ASC);

CREATE INDEX IF NOT EXISTS idx_leaderboards_created_at 
  ON leaderboards(created_at ASC);

-- Enable Row Level Security
ALTER TABLE leaderboards ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read the leaderboard
CREATE POLICY "Allow public read access to leaderboards"
  ON leaderboards
  FOR SELECT
  USING (true);

-- Policy: Allow anyone to submit scores
CREATE POLICY "Allow public insert access to leaderboards"
  ON leaderboards
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow anyone to update scores (for updating existing user scores)
CREATE POLICY "Allow public update access to leaderboards"
  ON leaderboards
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Optional: If you want to allow users to delete their own scores
-- Uncomment the following policy:
-- ============================================
-- CREATE POLICY "Allow users to delete their own scores"
--   ON leaderboards
--   FOR DELETE
--   USING (true);

-- ============================================
-- Done! Your leaderboards table is ready.
-- ============================================
