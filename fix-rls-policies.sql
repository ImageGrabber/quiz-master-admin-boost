-- Fix infinite recursion in RLS policies
-- Run this in your Supabase SQL Editor

-- Drop ALL existing policies on these tables to ensure clean slate
DROP POLICY IF EXISTS "Users can view sessions they created or joined" ON live_quiz_sessions;
DROP POLICY IF EXISTS "Users can view sessions they created" ON live_quiz_sessions;
DROP POLICY IF EXISTS "Users can view sessions they joined" ON live_quiz_sessions;
DROP POLICY IF EXISTS "Users can create sessions" ON live_quiz_sessions;
DROP POLICY IF EXISTS "Hosts can update their sessions" ON live_quiz_sessions;
DROP POLICY IF EXISTS "Hosts can delete their sessions" ON live_quiz_sessions;

DROP POLICY IF EXISTS "Users can view participants in their sessions" ON live_quiz_participants;
DROP POLICY IF EXISTS "Users can view participants in sessions they created" ON live_quiz_participants;
DROP POLICY IF EXISTS "Users can view their own participation" ON live_quiz_participants;
DROP POLICY IF EXISTS "Users can join sessions" ON live_quiz_participants;
DROP POLICY IF EXISTS "Users can update their own participation" ON live_quiz_participants;
DROP POLICY IF EXISTS "Users can leave sessions" ON live_quiz_participants;

DROP POLICY IF EXISTS "Users can view answers in their sessions" ON live_quiz_answers;
DROP POLICY IF EXISTS "Users can view answers in sessions they created" ON live_quiz_answers;
DROP POLICY IF EXISTS "Users can view their own answers" ON live_quiz_answers;
DROP POLICY IF EXISTS "Users can submit their own answers" ON live_quiz_answers;

DROP POLICY IF EXISTS "Users can view results from their sessions" ON live_quiz_results;
DROP POLICY IF EXISTS "Users can view results in sessions they created" ON live_quiz_results;
DROP POLICY IF EXISTS "Users can view their own results" ON live_quiz_results;

-- Temporarily disable RLS to clear any cached policies
ALTER TABLE live_quiz_sessions DISABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_participants DISABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_answers DISABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_results DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE live_quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_results ENABLE ROW LEVEL SECURITY;

-- Create simplified, non-recursive policies for live_quiz_sessions
CREATE POLICY "Users can view sessions they created" ON live_quiz_sessions
  FOR SELECT USING (auth.uid() = host_id);

CREATE POLICY "Users can view sessions they joined" ON live_quiz_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM live_quiz_participants 
      WHERE live_quiz_participants.session_id = live_quiz_sessions.id 
      AND live_quiz_participants.user_id = auth.uid()
    )
  );

-- Create simplified policies for live_quiz_participants
CREATE POLICY "Users can view participants in sessions they created" ON live_quiz_participants
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM live_quiz_sessions 
      WHERE live_quiz_sessions.id = live_quiz_participants.session_id 
      AND live_quiz_sessions.host_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own participation" ON live_quiz_participants
  FOR SELECT USING (auth.uid() = user_id);

-- Create simplified policies for live_quiz_answers
CREATE POLICY "Users can view answers in sessions they created" ON live_quiz_answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM live_quiz_sessions 
      WHERE live_quiz_sessions.id = live_quiz_answers.session_id 
      AND live_quiz_sessions.host_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own answers" ON live_quiz_answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM live_quiz_participants 
      WHERE live_quiz_participants.id = live_quiz_answers.participant_id 
      AND live_quiz_participants.user_id = auth.uid()
    )
  );

-- Create simplified policies for live_quiz_results
CREATE POLICY "Users can view results in sessions they created" ON live_quiz_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM live_quiz_sessions 
      WHERE live_quiz_sessions.id = live_quiz_results.session_id 
      AND live_quiz_sessions.host_id = auth.uid()
    )
  );

CREATE POLICY "Users can view their own results" ON live_quiz_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM live_quiz_participants 
      WHERE live_quiz_participants.id = live_quiz_results.participant_id 
      AND live_quiz_participants.user_id = auth.uid()
    )
  );

-- Add additional policies for full functionality
CREATE POLICY "Users can create sessions" ON live_quiz_sessions
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their sessions" ON live_quiz_sessions
  FOR UPDATE USING (auth.uid() = host_id);

CREATE POLICY "Users can join sessions" ON live_quiz_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation" ON live_quiz_participants
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can submit their own answers" ON live_quiz_answers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM live_quiz_participants 
      WHERE live_quiz_participants.id = live_quiz_answers.participant_id 
      AND live_quiz_participants.user_id = auth.uid()
    )
  );

-- Verify the policies were created successfully
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('live_quiz_sessions', 'live_quiz_participants', 'live_quiz_answers', 'live_quiz_results')
ORDER BY tablename, policyname;
