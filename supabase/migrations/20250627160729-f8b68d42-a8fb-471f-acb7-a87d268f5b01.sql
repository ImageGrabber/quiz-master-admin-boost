
-- Create profiles table with role support
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questions table
CREATE TABLE public.questions (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_index INTEGER NOT NULL CHECK (correct_index >= 0 AND correct_index <= 3),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quiz_questions junction table
CREATE TABLE public.quiz_questions (
  quiz_id INTEGER REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES public.questions(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  PRIMARY KEY (quiz_id, question_id)
);

-- Create attempts table
CREATE TABLE public.attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  seconds_used INTEGER NOT NULL,
  answers JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attempts ENABLE ROW LEVEL SECURITY;

-- Create helper function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE SQL STABLE;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin());

-- RLS Policies for questions
CREATE POLICY "Anyone can view questions" ON public.questions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage questions" ON public.questions
  FOR ALL USING (public.is_admin());

-- RLS Policies for quizzes
CREATE POLICY "Anyone can view quizzes" ON public.quizzes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage quizzes" ON public.quizzes
  FOR ALL USING (public.is_admin());

-- RLS Policies for quiz_questions
CREATE POLICY "Anyone can view quiz questions" ON public.quiz_questions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage quiz questions" ON public.quiz_questions
  FOR ALL USING (public.is_admin());

-- RLS Policies for attempts
CREATE POLICY "Users can view own attempts" ON public.attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own attempts" ON public.attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all attempts" ON public.attempts
  FOR SELECT USING (public.is_admin());

-- Create trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample questions
INSERT INTO public.questions (question, option_a, option_b, option_c, option_d, correct_index) VALUES
('What is the capital of France?', 'London', 'Berlin', 'Paris', 'Madrid', 2),
('Which planet is known as the Red Planet?', 'Venus', 'Mars', 'Jupiter', 'Saturn', 1),
('What is 2 + 2?', '3', '4', '5', '6', 1),
('Who painted the Mona Lisa?', 'Van Gogh', 'Picasso', 'Da Vinci', 'Monet', 2),
('What is the largest ocean?', 'Atlantic', 'Indian', 'Arctic', 'Pacific', 3);
