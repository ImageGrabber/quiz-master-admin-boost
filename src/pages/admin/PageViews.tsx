import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { supabase } from "@/integrations/supabase/client";

interface PageViewRow {
  page: string;
  count: number;
  ip_addresses: { ip: string; count: number; is_yours: boolean; visits: { viewed_at: string }[] }[];
}

export default function PageViews() {
  const [data, setData] = useState<PageViewRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchViews() {
      const { data: rows, error } = await supabase
        .from("page_views")
        .select("page, ip_address, viewed_at")
        .neq("page", "")
        .order("viewed_at", { ascending: false });
      console.log("Fetched rows from Supabase:", rows, "Error:", error);
      if (error || !rows) return;
      
      const pageData: Record<string, { count: number; ips: Record<string, { count: number; visits: { viewed_at: string }[] }> }> = {};
      
      (rows as { page: string; ip_address: string | null; viewed_at: string }[]).forEach((row) => {
        if (!pageData[row.page]) {
          pageData[row.page] = { count: 0, ips: {} };
        }
        pageData[row.page].count++;
        
        const ip = row.ip_address || 'Unknown';
        if (!pageData[row.page].ips[ip]) {
          pageData[row.page].ips[ip] = { count: 0, visits: [] };
        }
        pageData[row.page].ips[ip].count++;
        pageData[row.page].ips[ip].visits.push({ viewed_at: row.viewed_at });
      });
      
      const result = Object.entries(pageData).map(([page, data]) => ({
        page,
        count: data.count,
        ip_addresses: Object.entries(data.ips).map(([ip, ipData]) => ({
          ip,
          count: ipData.count,
          is_yours: ip === '99.227.50.157',
          visits: ipData.visits
        }))
      }));
      
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
          <div className="space-y-4">
            {data.map((row) => (
              <div key={row.page} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{row.page}</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                    Total: {row.count} views
                  </span>
                </div>
                <div className="space-y-2">
                  {row.ip_addresses.map((ipData, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${
                        ipData.is_yours 
                          ? 'bg-green-100 border border-green-300' 
                          : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-mono text-sm ${
                          ipData.is_yours ? 'text-green-800 font-semibold' : 'text-gray-700'
                        }`}>
                          {ipData.ip}
                          {ipData.is_yours && ' (You)'}
                        </span>
                        <span className={`text-sm ${
                          ipData.is_yours ? 'text-green-700 font-semibold' : 'text-gray-600'
                        }`}>
                          {ipData.count} {ipData.count === 1 ? 'visit' : 'visits'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500 mb-1">Visit times:</div>
                        {ipData.visits.slice(0, 5).map((visit, visitIndex) => (
                          <div key={visitIndex} className="text-xs text-gray-600 bg-white/50 px-2 py-1 rounded">
                            {new Date(visit.viewed_at).toLocaleString()}
                          </div>
                        ))}
                        {ipData.visits.length > 5 && (
                          <div className="text-xs text-gray-500 italic">
                            ... and {ipData.visits.length - 5} more visits
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 