-- Fix for duplicate competition attempts
-- Run this in your Supabase SQL Editor

-- First, ensure the competition_results table exists and has the right structure
DO $$ 
BEGIN
    -- Create competition_results table if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'competition_results'
    ) THEN
        CREATE TABLE competition_results (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          competition_id UUID REFERENCES competitions(id) ON DELETE CASCADE,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          score INTEGER NOT NULL,
          time_taken INTEGER, -- in seconds
          rank INTEGER,
          prize_amount DECIMAL(10,2),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Add indexes
        CREATE INDEX idx_competition_results_competition ON competition_results(competition_id);
        CREATE INDEX idx_competition_results_user ON competition_results(user_id);
        CREATE INDEX idx_competition_results_rank ON competition_results(rank);
        
        -- Enable RLS
        ALTER TABLE competition_results ENABLE ROW LEVEL SECURITY;
        
        -- Add RLS policies
        CREATE POLICY "Users can view their own results" ON competition_results
          FOR SELECT USING (auth.uid() = user_id);

        CREATE POLICY "Admins can view all results" ON competition_results
          FOR SELECT USING (
            EXISTS (
              SELECT 1 FROM profiles 
              WHERE profiles.id = auth.uid() 
              AND profiles.role = 'admin'
            )
          );
    END IF;
END $$;

-- Add unique constraint to prevent multiple attempts per user per competition
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'unique_competition_user_attempt'
    ) THEN
        ALTER TABLE competition_results 
        ADD CONSTRAINT unique_competition_user_attempt 
        UNIQUE (competition_id, user_id);
    END IF;
END $$;

-- Update RLS policy to allow users to insert their own results (for the first attempt only)
DO $$ 
BEGIN
    -- Drop existing policy if it exists
    DROP POLICY IF EXISTS "Only admins can insert results" ON competition_results;
    
    -- Create new policy
    CREATE POLICY "Users can insert their own results once" ON competition_results
      FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        NOT EXISTS (
          SELECT 1 FROM competition_results 
          WHERE competition_id = competition_results.competition_id 
          AND user_id = auth.uid()
        )
      );
END $$;

-- Add paid field to competition_entries if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'competition_entries' 
        AND column_name = 'paid'
    ) THEN
        ALTER TABLE competition_entries ADD COLUMN paid BOOLEAN DEFAULT FALSE;
    END IF;
END $$;

-- Show current state
SELECT 
    'competition_results' as table_name,
    COUNT(*) as total_results,
    COUNT(DISTINCT competition_id) as unique_competitions,
    COUNT(DISTINCT user_id) as unique_users
FROM competition_results
UNION ALL
SELECT 
    'competition_entries' as table_name,
    COUNT(*) as total_entries,
    COUNT(DISTINCT competition_id) as unique_competitions,
    COUNT(DISTINCT user_id) as unique_users
FROM competition_entries; 