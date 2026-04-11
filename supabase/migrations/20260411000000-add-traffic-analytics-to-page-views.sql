-- Extend page_views so admin can inspect traffic quality and location trends.
ALTER TABLE public.page_views
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS country_code TEXT,
  ADD COLUMN IF NOT EXISTS region TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS user_agent TEXT,
  ADD COLUMN IF NOT EXISTS referrer TEXT,
  ADD COLUMN IF NOT EXISTS device_type TEXT,
  ADD COLUMN IF NOT EXISTS browser TEXT,
  ADD COLUMN IF NOT EXISTS is_bot BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS bot_score SMALLINT DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'page_views_bot_score_range'
      AND conrelid = 'public.page_views'::regclass
  ) THEN
    ALTER TABLE public.page_views
      ADD CONSTRAINT page_views_bot_score_range
      CHECK (bot_score >= 0 AND bot_score <= 100);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_page_views_is_bot ON public.page_views(is_bot);
CREATE INDEX IF NOT EXISTS idx_page_views_country ON public.page_views(country);
CREATE INDEX IF NOT EXISTS idx_page_views_viewed_at_desc ON public.page_views(viewed_at DESC);
