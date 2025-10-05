-- Add a flag to control participant feedback visibility per session
alter table public.live_quiz_sessions
add column if not exists show_participant_feedback boolean not null default false;


