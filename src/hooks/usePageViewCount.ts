import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function usePageViewCount(page: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      const { count } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .eq("page", page);
      setCount(count || 0);
    }
    fetchCount();
  }, [page]);

  return count;
} 