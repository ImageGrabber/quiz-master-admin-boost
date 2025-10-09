-- ADD MISSING COLUMNS TO CHALLENGE_SESSIONS
-- The frontend expects a current_question column that doesn't exist

-- 1. Add current_question column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenge_sessions' 
    AND column_name = 'current_question'
  ) THEN
    ALTER TABLE challenge_sessions ADD COLUMN current_question INTEGER DEFAULT 0;
    RAISE NOTICE 'Added current_question column';
  ELSE
    RAISE NOTICE 'current_question column already exists';
  END IF;
END $$;

-- 2. Add time_limit column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenge_sessions' 
    AND column_name = 'time_limit'
  ) THEN
    ALTER TABLE challenge_sessions ADD COLUMN time_limit INTEGER DEFAULT 30;
    RAISE NOTICE 'Added time_limit column';
  ELSE
    RAISE NOTICE 'time_limit column already exists';
  END IF;
END $$;

-- 3. Add started_at and ended_at columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenge_sessions' 
    AND column_name = 'started_at'
  ) THEN
    ALTER TABLE challenge_sessions ADD COLUMN started_at TIMESTAMP WITH TIME ZONE;
    RAISE NOTICE 'Added started_at column';
  ELSE
    RAISE NOTICE 'started_at column already exists';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'challenge_sessions' 
    AND column_name = 'ended_at'
  ) THEN
    ALTER TABLE challenge_sessions ADD COLUMN ended_at TIMESTAMP WITH TIME ZONE;
    RAISE NOTICE 'Added ended_at column';
  ELSE
    RAISE NOTICE 'ended_at column already exists';
  END IF;
END $$;

-- 4. Update the session with proper values
UPDATE challenge_sessions 
SET 
  current_question = 0,
  time_limit = 30,
  status = 'waiting'
WHERE id = '563b49b8-69a3-465e-9a61-1995241da7e3';

-- 5. Show the updated session structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'challenge_sessions' 
AND table_schema = 'public'
ORDER BY ordinal_position;

SELECT 'Missing columns added successfully!' as result;
