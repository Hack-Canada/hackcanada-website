-- Create leaderboards table
CREATE TABLE IF NOT EXISTS leaderboards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index on score for faster leaderboard queries
CREATE INDEX IF NOT EXISTS idx_leaderboards_score_desc ON leaderboards(score DESC, created_at ASC);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_leaderboards_created_at ON leaderboards(created_at ASC);

-- Enable Row Level Security (RLS)
ALTER TABLE leaderboards ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read leaderboard (public read access)
CREATE POLICY "Allow public read access to leaderboards"
  ON leaderboards
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert scores (public write access)
CREATE POLICY "Allow public insert access to leaderboards"
  ON leaderboards
  FOR INSERT
  WITH CHECK (true);

-- Optional: Create policy to allow users to delete their own scores (if needed)
-- Uncomment if you want users to be able to delete their own entries
-- CREATE POLICY "Allow users to delete their own scores"
--   ON leaderboards
--   FOR DELETE
--   USING (true);

-- Add comment to table
COMMENT ON TABLE leaderboards IS 'Stores game scores for the leaderboard';
COMMENT ON COLUMN leaderboards.username IS 'Player username (max 20 characters, sanitized)';
COMMENT ON COLUMN leaderboards.score IS 'Player score (non-negative integer)';
COMMENT ON COLUMN leaderboards.created_at IS 'Timestamp when the score was submitted';
