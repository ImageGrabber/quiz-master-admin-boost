import { supabase } from "@/integrations/supabase/client";

export type ArenaQuestion = {
  question: string;
  options: string[];
  answer: string;
};

export type ArenaDifficulty = "Easy" | "Medium" | "Hard";

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export async function loadArenaQuestions(
  limit = 10,
  difficulty?: ArenaDifficulty
): Promise<ArenaQuestion[]> {
  const fetchSize = Math.max(limit * 5, 100);

  let query = supabase
    .from("public_competition_questions")
    .select("question, options, answer")
    .not("question", "is", null);

  if (difficulty) {
    query = query.eq("difficulty", difficulty);
  }

  const { data, error } = await query.limit(fetchSize);

  if (error || !data) {
    throw error ?? new Error("Failed to load arena questions");
  }

  const normalized = data
    .map((row) => ({
      question: typeof row.question === "string" ? row.question.trim() : "",
      options: Array.isArray(row.options) ? row.options.filter((o) => typeof o === "string") : [],
      answer: typeof row.answer === "string" ? row.answer.trim() : "",
    }))
    .filter((q) => q.question && q.options.length >= 2 && q.options.includes(q.answer));

  return shuffle(normalized).slice(0, limit);
}
