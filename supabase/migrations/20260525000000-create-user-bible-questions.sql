CREATE TABLE public.user_bible_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    question TEXT NOT NULL,
    context TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    answered_at TIMESTAMPTZ
);

-- Enable Row Level Security
ALTER TABLE public.user_bible_questions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit a question (Insert)
CREATE POLICY "Allow anonymous users to insert questions" 
ON public.user_bible_questions
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow authenticated users (admins) to view all questions
CREATE POLICY "Allow authenticated users to view questions" 
ON public.user_bible_questions
FOR SELECT 
TO authenticated
USING (true);
