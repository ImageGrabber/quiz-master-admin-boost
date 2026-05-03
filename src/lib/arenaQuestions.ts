import { supabase } from "@/integrations/supabase/client";

export type ArenaQuestion = {
  question: string;
  options: string[];
  answer: string;
};

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

export async function loadArenaQuestions(limit = 10): Promise<ArenaQuestion[]> {
  const fetchSize = Math.max(limit * 5, 100);

  const { data, error } = await supabase
    .from("public_competition_questions")
    .select("question, options, answer")
    .not("question", "is", null)
    .limit(fetchSize);

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
