import { supabase } from "@/integrations/supabase/client";

export type BadgeSlug =
  | "first-quiz"
  | "score-100"
  | "streak-3"
  | "five-quizzes"
  | "ten-quizzes"
  | "fast-finisher"
  | "accuracy-90"
  | "accuracy-80"
  | "streak-7"
  | "streak-30"
  | "attempts-25"
  | "attempts-50"
  | "attempts-100"
  | "avg-80"
  | "avg-90"
  | "weekly-participation"
  | "monthly-participation"
  | "category-old-testament"
  | "category-new-testament"
  | "early-bird"
  | "night-owl"
  | "comeback"
  | "share-result"
  | "first-competition"
  | "competition-top3"
  | "speed-120"
  | "speed-60";

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
    { slug: "fast-finisher", name: "Speed Runner", description: "Finished in under 3 minutes", icon: "Bolt" },
    { slug: "accuracy-90", name: "Sharp Shooter", description: "90%+ accuracy", icon: "Target" },
    { slug: "accuracy-80", name: "On Point", description: "80%+ accuracy", icon: "Target" },
    { slug: "streak-7", name: "Weekly Streak", description: "7-day devotional streak", icon: "Flame" },
    { slug: "streak-30", name: "Monthly Streak", description: "30-day devotional streak", icon: "Flame" },
    { slug: "attempts-25", name: "Quarter Century", description: "25 total attempts", icon: "Award" },
    { slug: "attempts-50", name: "Half Century", description: "50 total attempts", icon: "Award" },
    { slug: "attempts-100", name: "Century", description: "100 total attempts", icon: "Award" },
    { slug: "avg-80", name: "Consistent 80", description: "Average score 80+", icon: "Star" },
    { slug: "avg-90", name: "Consistent 90", description: "Average score 90+", icon: "Star" },
    { slug: "weekly-participation", name: "Weekly Faithful", description: "Participated this week", icon: "Calendar" },
    { slug: "monthly-participation", name: "Monthly Faithful", description: "Participated this month", icon: "Calendar" },
    { slug: "category-old-testament", name: "OT Explorer", description: "Completed an Old Testament quiz", icon: "Book" },
    { slug: "category-new-testament", name: "NT Explorer", description: "Completed a New Testament quiz", icon: "Book" },
    { slug: "early-bird", name: "Early Bird", description: "Completed a quiz before 8AM", icon: "Sun" },
    { slug: "night-owl", name: "Night Owl", description: "Completed a quiz after 10PM", icon: "Moon" },
    { slug: "comeback", name: "Comeback", description: "Improved score by 20+ over previous", icon: "TrendingUp" },
    { slug: "share-result", name: "Witness", description: "Shared a result", icon: "Share" },
    { slug: "first-competition", name: "Competitor", description: "Entered your first competition", icon: "Award" },
    { slug: "competition-top3", name: "Podium", description: "Placed top 3 in competition", icon: "Trophy" },
    { slug: "speed-120", name: "Lightning", description: "Finished in under 2 minutes", icon: "Bolt" },
    { slug: "speed-60", name: "Flash", description: "Finished in under 1 minute", icon: "Bolt" }
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

async function updateBadgeMetadata(userId: string, slug: BadgeSlug, metadata: Record<string, unknown>) {
  const { data: badge } = await supabase.from("badges").select("id").eq("slug", slug).single();
  if (!badge) return;
  const { data: existing } = await supabase
    .from("user_badges")
    .select("id, metadata")
    .eq("user_id", userId)
    .eq("badge_id", badge.id)
    .maybeSingle();
  if (!existing) return;
  const merged = { ...(existing.metadata || {}), ...metadata };
  await supabase.from("user_badges").update({ metadata: merged }).eq("id", existing.id);
}

export async function evaluateBadgesOnQuizComplete(ctx: AwardContext) {
  const { userId, score = 0, timeUsedSeconds = 0, quizTitle } = ctx;

  // First quiz badge
  const { data: attempts } = await supabase
    .from("attempts")
    .select("id, quiz_id, created_at")
    .eq("user_id", userId);
  if ((attempts?.length || 0) === 1) {
    await awardBadgeIfNotHas(userId, "first-quiz", { firstQuizTitle: quizTitle });
  }
  if ((attempts?.length || 0) >= 5) {
    // Collect earliest 5 distinct quizzes
    const byQuiz: Record<string, any> = {};
    (attempts || [])
      .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .forEach((a: any) => { if (!byQuiz[a.quiz_id]) byQuiz[a.quiz_id] = a; });
    const firstFiveIds = Object.keys(byQuiz).slice(0, 5).map((k) => Number(k));
    let quizzes: string[] = [];
    if (firstFiveIds.length > 0) {
      const { data: quizDefs } = await supabase.from("quizzes").select("id, title").in("id", firstFiveIds);
      const map = new Map((quizDefs || []).map((q: any) => [q.id, q.title]));
      quizzes = firstFiveIds.map((id) => map.get(id)).filter(Boolean) as string[];
    }
    await awardBadgeIfNotHas(userId, "five-quizzes", { totalAttempts: attempts?.length || 0, quizzes });
    if (quizzes.length) await updateBadgeMetadata(userId, "five-quizzes", { quizzes });
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
  if (timeUsedSeconds > 0 && timeUsedSeconds <= 120) {
    await awardBadgeIfNotHas(userId, "speed-120", { timeUsedSeconds, quizTitle });
  }
  if (timeUsedSeconds > 0 && timeUsedSeconds <= 60) {
    await awardBadgeIfNotHas(userId, "speed-60", { timeUsedSeconds, quizTitle });
  }

  // Accuracy-based
  const accuracy = score; // score already computed as points; if you track accuracy separately, pass it in
  if (accuracy >= 90) await awardBadgeIfNotHas(userId, "accuracy-90", { score, quizTitle });
  if (accuracy >= 80) await awardBadgeIfNotHas(userId, "accuracy-80", { score, quizTitle });
}

export async function evaluateBadgesForUserHistory(userId: string) {
  // Look across all attempts to backfill badges
  const { data: attempts } = await supabase
    .from("attempts")
    .select("score, seconds_used, quiz_id, created_at")
    .eq("user_id", userId);

  const count = attempts?.length || 0;
  if (count >= 1) {
    const firstAttempt = (attempts || []).sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())[0];
    let firstQuizTitle: string | undefined;
    if (firstAttempt?.quiz_id) {
      const { data: q } = await supabase.from("quizzes").select("title").eq("id", firstAttempt.quiz_id).single();
      firstQuizTitle = q?.title;
    }
    await awardBadgeIfNotHas(userId, "first-quiz", { firstQuizTitle });
    if (firstQuizTitle) await updateBadgeMetadata(userId, "first-quiz", { firstQuizTitle });
  }
  if (count >= 5) {
    const byQuiz: Record<string, any> = {};
    (attempts || [])
      .sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      .forEach((a: any) => { if (!byQuiz[a.quiz_id]) byQuiz[a.quiz_id] = a; });
    const firstFiveIds = Object.keys(byQuiz).slice(0, 5).map((k) => Number(k));
    let quizzes: string[] = [];
    if (firstFiveIds.length > 0) {
      const { data: quizDefs } = await supabase.from("quizzes").select("id, title").in("id", firstFiveIds);
      const map = new Map((quizDefs || []).map((q: any) => [q.id, q.title]));
      quizzes = firstFiveIds.map((id) => map.get(id)).filter(Boolean) as string[];
    }
    await awardBadgeIfNotHas(userId, "five-quizzes", { totalAttempts: count, quizzes });
    if (quizzes.length) await updateBadgeMetadata(userId, "five-quizzes", { quizzes });
  }
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


