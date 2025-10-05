-- Create user_created_quizzes table for custom quizzes
CREATE TABLE user_created_quizzes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  creator_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  share_code VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_quiz_questions table for custom quiz questions
CREATE TABLE user_quiz_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES user_created_quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create live_quiz_sessions table for active quiz sessions
CREATE TABLE live_quiz_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quiz_id UUID REFERENCES user_created_quizzes(id) ON DELETE CASCADE,
  host_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_code VARCHAR(8) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'active', 'finished', 'cancelled')),
  max_participants INTEGER DEFAULT 50,
  time_limit INTEGER DEFAULT 30, -- in minutes
  current_question INTEGER DEFAULT 0,
  total_questions INTEGER NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create live_quiz_participants table for session participants
CREATE TABLE live_quiz_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES live_quiz_sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name VARCHAR(100) NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_ready BOOLEAN DEFAULT false,
  UNIQUE(session_id, user_id)
);

-- Create live_quiz_answers table for participant answers
CREATE TABLE live_quiz_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES live_quiz_sessions(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES live_quiz_participants(id) ON DELETE CASCADE,
  question_id UUID REFERENCES user_quiz_questions(id) ON DELETE CASCADE,
  answer_index INTEGER NOT NULL CHECK (answer_index >= 0 AND answer_index <= 3),
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  response_time INTEGER, -- in milliseconds
  UNIQUE(session_id, participant_id, question_id)
);

-- Create live_quiz_results table for final scores
CREATE TABLE live_quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES live_quiz_sessions(id) ON DELETE CASCADE,
  participant_id UUID REFERENCES live_quiz_participants(id) ON DELETE CASCADE,
  total_score INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  average_response_time INTEGER, -- in milliseconds
  rank INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_user_created_quizzes_creator ON user_created_quizzes(creator_id);
CREATE INDEX idx_user_created_quizzes_share_code ON user_created_quizzes(share_code);
CREATE INDEX idx_user_quiz_questions_quiz ON user_quiz_questions(quiz_id);
CREATE INDEX idx_user_quiz_questions_order ON user_quiz_questions(quiz_id, order_index);
CREATE INDEX idx_live_quiz_sessions_code ON live_quiz_sessions(session_code);
CREATE INDEX idx_live_quiz_sessions_status ON live_quiz_sessions(status);
CREATE INDEX idx_live_quiz_participants_session ON live_quiz_participants(session_id);
CREATE INDEX idx_live_quiz_participants_user ON live_quiz_participants(user_id);
CREATE INDEX idx_live_quiz_answers_session ON live_quiz_answers(session_id);
CREATE INDEX idx_live_quiz_answers_participant ON live_quiz_answers(participant_id);
CREATE INDEX idx_live_quiz_results_session ON live_quiz_results(session_id);
CREATE INDEX idx_live_quiz_results_rank ON live_quiz_results(session_id, rank);

-- Enable RLS on all tables
ALTER TABLE user_created_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_quiz_results ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_created_quizzes
CREATE POLICY "Users can view their own quizzes" ON user_created_quizzes
  FOR SELECT USING (auth.uid() = creator_id);

CREATE POLICY "Users can view public quizzes" ON user_created_quizzes
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can create their own quizzes" ON user_created_quizzes
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own quizzes" ON user_created_quizzes
  FOR UPDATE USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own quizzes" ON user_created_quizzes
  FOR DELETE USING (auth.uid() = creator_id);

-- RLS Policies for user_quiz_questions
CREATE POLICY "Users can view questions from their quizzes" ON user_quiz_questions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_created_quizzes 
      WHERE user_created_quizzes.id = user_quiz_questions.quiz_id 
      AND (user_created_quizzes.creator_id = auth.uid() OR user_created_quizzes.is_public = true)
    )
  );

CREATE POLICY "Users can create questions for their quizzes" ON user_quiz_questions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_created_quizzes 
      WHERE user_created_quizzes.id = user_quiz_questions.quiz_id 
      AND user_created_quizzes.creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can update questions in their quizzes" ON user_quiz_questions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM user_created_quizzes 
      WHERE user_created_quizzes.id = user_quiz_questions.quiz_id 
      AND user_created_quizzes.creator_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete questions from their quizzes" ON user_quiz_questions
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM user_created_quizzes 
      WHERE user_created_quizzes.id = user_quiz_questions.quiz_id 
      AND user_created_quizzes.creator_id = auth.uid()
    )
  );

-- RLS Policies for live_quiz_sessions
CREATE POLICY "Users can view sessions they created or joined" ON live_quiz_sessions
  FOR SELECT USING (
    auth.uid() = host_id OR 
    EXISTS (
      SELECT 1 FROM live_quiz_participants 
      WHERE live_quiz_participants.session_id = live_quiz_sessions.id 
      AND live_quiz_participants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create sessions" ON live_quiz_sessions
  FOR INSERT WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update their sessions" ON live_quiz_sessions
  FOR UPDATE USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete their sessions" ON live_quiz_sessions
  FOR DELETE USING (auth.uid() = host_id);

-- RLS Policies for live_quiz_participants
CREATE POLICY "Users can view participants in their sessions" ON live_quiz_participants
  FOR SELECT USING (
    auth.uid() = user_id OR 
    EXISTS (
      SELECT 1 FROM live_quiz_sessions 
      WHERE live_quiz_sessions.id = live_quiz_participants.session_id 
      AND live_quiz_sessions.host_id = auth.uid()
    )
  );

CREATE POLICY "Users can join sessions" ON live_quiz_participants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation" ON live_quiz_participants
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can leave sessions" ON live_quiz_participants
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for live_quiz_answers
CREATE POLICY "Users can view answers in their sessions" ON live_quiz_answers
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM live_quiz_participants 
      WHERE live_quiz_participants.id = live_quiz_answers.participant_id 
      AND live_quiz_participants.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM live_quiz_sessions 
      JOIN live_quiz_participants ON live_quiz_participants.session_id = live_quiz_sessions.id
      WHERE live_quiz_sessions.id = live_quiz_answers.session_id 
      AND live_quiz_sessions.host_id = auth.uid()
    )
  );

CREATE POLICY "Users can submit their own answers" ON live_quiz_answers
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM live_quiz_participants 
      WHERE live_quiz_participants.id = live_quiz_answers.participant_id 
      AND live_quiz_participants.user_id = auth.uid()
    )
  );

-- RLS Policies for live_quiz_results
CREATE POLICY "Users can view results from their sessions" ON live_quiz_results
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM live_quiz_participants 
      WHERE live_quiz_participants.id = live_quiz_results.participant_id 
      AND live_quiz_participants.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM live_quiz_sessions 
      JOIN live_quiz_participants ON live_quiz_participants.session_id = live_quiz_sessions.id
      WHERE live_quiz_sessions.id = live_quiz_results.session_id 
      AND live_quiz_sessions.host_id = auth.uid()
    )
  );

-- Function to generate unique share codes
CREATE OR REPLACE FUNCTION generate_share_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    code := upper(substring(md5(random()::text) from 1 for 10));
    SELECT EXISTS(SELECT 1 FROM user_created_quizzes WHERE share_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique session codes
CREATE OR REPLACE FUNCTION generate_session_code()
RETURNS TEXT AS $$
DECLARE
  code TEXT;
  exists BOOLEAN;
BEGIN
  LOOP
    code := upper(substring(md5(random()::text) from 1 for 8));
    SELECT EXISTS(SELECT 1 FROM live_quiz_sessions WHERE session_code = code) INTO exists;
    EXIT WHEN NOT exists;
  END LOOP;
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate share codes
CREATE OR REPLACE FUNCTION set_share_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.share_code IS NULL OR NEW.share_code = '' THEN
    NEW.share_code := generate_share_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_share_code
  BEFORE INSERT ON user_created_quizzes
  FOR EACH ROW
  EXECUTE FUNCTION set_share_code();

-- Trigger to auto-generate session codes
CREATE OR REPLACE FUNCTION set_session_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.session_code IS NULL OR NEW.session_code = '' THEN
    NEW.session_code := generate_session_code();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_session_code
  BEFORE INSERT ON live_quiz_sessions
  FOR EACH ROW
  EXECUTE FUNCTION set_session_code();

-- Function to calculate quiz results
CREATE OR REPLACE FUNCTION calculate_quiz_results(session_uuid UUID)
RETURNS VOID AS $$
DECLARE
  participant_record RECORD;
  total_questions INTEGER;
  correct_count INTEGER;
  total_time INTEGER;
BEGIN
  -- Get total questions for the session
  SELECT COUNT(*) INTO total_questions
  FROM user_quiz_questions uqq
  JOIN user_created_quizzes ucq ON ucq.id = uqq.quiz_id
  JOIN live_quiz_sessions lqs ON lqs.quiz_id = ucq.id
  WHERE lqs.id = session_uuid;

  -- Calculate results for each participant
  FOR participant_record IN
    SELECT 
      lp.id as participant_id,
      lp.session_id,
      COUNT(lqa.id) as total_answers,
      COUNT(CASE WHEN lqa.is_correct THEN 1 END) as correct_answers,
      AVG(lqa.response_time) as avg_response_time
    FROM live_quiz_participants lp
    LEFT JOIN live_quiz_answers lqa ON lqa.participant_id = lp.id
    WHERE lp.session_id = session_uuid
    GROUP BY lp.id, lp.session_id
  LOOP
    -- Insert or update results
    INSERT INTO live_quiz_results (
      session_id,
      participant_id,
      total_score,
      correct_answers,
      total_questions,
      average_response_time,
      rank
    ) VALUES (
      participant_record.session_id,
      participant_record.participant_id,
      participant_record.correct_answers,
      participant_record.correct_answers,
      total_questions,
      COALESCE(participant_record.avg_response_time, 0),
      0 -- Will be updated with ranking
    )
    ON CONFLICT (session_id, participant_id) 
    DO UPDATE SET
      total_score = participant_record.correct_answers,
      correct_answers = participant_record.correct_answers,
      total_questions = total_questions,
      average_response_time = COALESCE(participant_record.avg_response_time, 0);

    -- Update ranking
    UPDATE live_quiz_results 
    SET rank = subquery.rank
    FROM (
      SELECT 
        id,
        ROW_NUMBER() OVER (
          ORDER BY total_score DESC, average_response_time ASC
        ) as rank
      FROM live_quiz_results 
      WHERE session_id = session_uuid
    ) subquery
    WHERE live_quiz_results.id = subquery.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
