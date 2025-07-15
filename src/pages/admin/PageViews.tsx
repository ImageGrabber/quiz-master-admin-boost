import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface PageViewRow {
  page: string;
  count: number;
}

export default function PageViews() {
  const [data, setData] = useState<PageViewRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchViews() {
      const { data: rows, error } = await supabase
        .from("page_views")
        .select("page")
        .neq("page", "")
        .order("page");
      console.log("Fetched rows from Supabase:", rows, "Error:", error);
      if (error || !rows) return;
      const counts: Record<string, number> = {};
      (rows as { page: string }[]).forEach((row) => {
        counts[row.page] = (counts[row.page] || 0) + 1;
      });
      const result = Object.entries(counts).map(([page, count]) => ({ page, count }));
      console.log("Processed page view counts:", result);
      setData(result);
      setLoading(false);
    }
    fetchViews();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Page View Counts</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="min-w-full border">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left">Page</th>
                <th className="border px-4 py-2 text-left">Views</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.page}>
                  <td className="border px-4 py-2">{row.page}</td>
                  <td className="border px-4 py-2">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
} 