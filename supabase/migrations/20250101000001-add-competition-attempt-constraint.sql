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

-- Add unique constraint to prevent multiple attempts per user per competition
-- Only add if the table exists and constraint doesn't already exist
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'competition_results'
    ) THEN
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'unique_competition_user_attempt'
        ) THEN
            ALTER TABLE competition_results 
            ADD CONSTRAINT unique_competition_user_attempt 
            UNIQUE (competition_id, user_id);
        END IF;
    END IF;
END $$;

-- Add index for better performance on competition results queries (if table exists)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'competition_results'
    ) THEN
        IF NOT EXISTS (
            SELECT 1 FROM pg_indexes 
            WHERE indexname = 'idx_competition_results_competition_user'
        ) THEN
            CREATE INDEX idx_competition_results_competition_user ON competition_results(competition_id, user_id);
        END IF;
    END IF;
END $$;

-- Update RLS policy to allow users to insert their own results (for the first attempt only)
-- Only if the table exists
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'competition_results'
    ) THEN
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
    END IF;
END $$; 