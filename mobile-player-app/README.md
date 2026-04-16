# Bible Quiz Player Mobile (Expo)

Mobile app for **users only** to attempt paid Bible competition quizzes from your Supabase backend with anti-cheat protections.

## What this app does

- Login and signup with Supabase Auth
- Google login with Supabase OAuth
- Shows only competitions where the current user has a paid entry
- Starts only active competitions
- One-way timed quiz flow (no backtracking)
- Auto-submit on timeout
- Auto-disqualify + submit when app focus is lost (background/inactive)
- Blocks Android hardware back during the quiz
- Attempts to block screen capture during quiz

## Supabase requirements

Run this migration first:

- `supabase/migrations/20260412010000-mobile-player-secure-competition-rpcs.sql`

It adds:

- `list_mobile_player_competitions()`
- `get_mobile_competition_quiz(p_competition_id uuid)`
- `submit_mobile_competition_quiz(...)`

And stores anti-cheat fields on `competition_results`.

## Setup

1. Install deps
```bash
cd mobile-player-app
npm install
```

2. Configure env
```bash
cp .env.example .env
```

Set:

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_APP_SCHEME` (default: `biblequizplayer`)

3. Start Expo
```bash
npm run start
```

## Notes

- Scoring is performed server-side in `submit_mobile_competition_quiz`, so correct answers are not exposed to the app payload.
- If your current web client still queries `quiz_questions.correct_index` directly, that web flow remains less secure than this mobile RPC flow.
- For Google login, enable Google provider in Supabase Auth and add this redirect URL:
  - `biblequizplayer://auth/callback`
