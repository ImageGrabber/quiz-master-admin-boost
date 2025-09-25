import { supabase } from "@/integrations/supabase/client";

export type BadgeSlug =
  | "first-quiz"
  | "score-100"
  | "streak-3"
  | "five-quizzes"
  | "ten-quizzes"
  | "fast-finisher";

export interface AwardContext {
  userId: string;
  score?: number;
  timeUsedSeconds?: number;
  quizTitle?: string;
}

export async function ensureSeedBadges(): Promise<void> {
  const badges = [
    { slug: "first-quiz", name: "First Quiz!", description: "Completed your first quiz", icon: "Award" },
    { slug: "score-100", name: "Perfect Score", description: "Scored 100 points", icon: "Crown" },
    { slug: "streak-3", name: "Consistency", description: "3-day devotional streak", icon: "Flame" },
    { slug: "five-quizzes", name: "Quiz Enthusiast", description: "Completed 5 quizzes", icon: "Star" },
    { slug: "ten-quizzes", name: "Dedicated", description: "Completed 10 quizzes", icon: "Star" },
    { slug: "fast-finisher", name: "Speed Runner", description: "Finished in under 3 minutes", icon: "Bolt" }
  ];
  for (const b of badges) {
    await supabase.from("badges").upsert({ slug: b.slug, name: b.name, description: b.description, icon: b.icon }, { onConflict: "slug" });
  }
}

export async function awardBadgeIfNotHas(userId: string, slug: BadgeSlug, metadata?: Record<string, unknown>) {
  const { data: badge } = await supabase.from("badges").select("id").eq("slug", slug).single();
  if (!badge) return;
  const { data: existing } = await supabase
    .from("user_badges")
    .select("id")
    .eq("user_id", userId)
    .eq("badge_id", badge.id)
    .maybeSingle();
  if (existing) return;
  await supabase.from("user_badges").insert({ user_id: userId, badge_id: badge.id, metadata });
}

export async function evaluateBadgesOnQuizComplete(ctx: AwardContext) {
  const { userId, score = 0, timeUsedSeconds = 0, quizTitle } = ctx;

  // First quiz badge
  const { data: attempts } = await supabase
    .from("attempts")
    .select("id")
    .eq("user_id", userId);
  if ((attempts?.length || 0) === 1) {
    await awardBadgeIfNotHas(userId, "first-quiz");
  }
  if ((attempts?.length || 0) >= 5) {
    await awardBadgeIfNotHas(userId, "five-quizzes", { totalAttempts: attempts?.length || 0 });
  }

  // Perfect score badge
  if (score >= 100) {
    await awardBadgeIfNotHas(userId, "score-100", { score, quizTitle });
  }

  // Ten quizzes badge
  if ((attempts?.length || 0) >= 10) {
    await awardBadgeIfNotHas(userId, "ten-quizzes", { totalAttempts: attempts?.length || 0 });
  }

  // Fast finisher
  if (timeUsedSeconds > 0 && timeUsedSeconds <= 180) {
    await awardBadgeIfNotHas(userId, "fast-finisher", { timeUsedSeconds, quizTitle });
  }
}

export async function evaluateBadgesForUserHistory(userId: string) {
  // Look across all attempts to backfill badges
  const { data: attempts } = await supabase
    .from("attempts")
    .select("score, seconds_used, quiz_id")
    .eq("user_id", userId);

  const count = attempts?.length || 0;
  if (count >= 1) await awardBadgeIfNotHas(userId, "first-quiz");
  if (count >= 5) await awardBadgeIfNotHas(userId, "five-quizzes", { totalAttempts: count });
  if (count >= 10) await awardBadgeIfNotHas(userId, "ten-quizzes", { totalAttempts: count });

  const maxScoreAttempt = (attempts || []).reduce((best, a) => (a.score || 0) > (best?.score || 0) ? a : best, null as any);
  if (maxScoreAttempt && (maxScoreAttempt.score || 0) >= 100) {
    let quizTitle: string | undefined;
    if (maxScoreAttempt.quiz_id) {
      const { data: quiz } = await supabase.from("quizzes").select("title").eq("id", maxScoreAttempt.quiz_id).single();
      quizTitle = quiz?.title;
    }
    await awardBadgeIfNotHas(userId, "score-100", { score: maxScoreAttempt.score, quizTitle });
  }

  const minTimeAttempt = (attempts || []).reduce((best, a) => ((a.seconds_used || 999999) < (best?.seconds_used || 999999)) ? a : best, null as any);
  const minTime = minTimeAttempt?.seconds_used;
  if (minTime !== undefined && isFinite(minTime) && minTime <= 180) {
    let quizTitle: string | undefined;
    if (minTimeAttempt.quiz_id) {
      const { data: quiz } = await supabase.from("quizzes").select("title").eq("id", minTimeAttempt.quiz_id).single();
      quizTitle = quiz?.title;
    }
    await awardBadgeIfNotHas(userId, "fast-finisher", { timeUsedSeconds: minTime, quizTitle });
  }
}


