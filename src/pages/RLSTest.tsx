import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RLSTest = () => {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string>("");
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
        setRole(profile?.role || "");
      }
    };
    fetchUser();
  }, []);

  // Only allow tables that are present in the Supabase types
  const tables = ["profiles", "attempts", "quizzes"] as const;
  type TableName = typeof tables[number];
  const actions = ["SELECT", "INSERT", "UPDATE", "DELETE"] as const;

  const runTest = async (table: TableName, action: string) => {
    setLoading(true);
    let res;
    try {
      if (action === "SELECT") {
        res = await supabase.from(table).select("*").limit(3);
      } else if (action === "INSERT") {
        if (table === "attempts") {
          res = await supabase.from(table).insert({ user_id: user.id, quiz_id: 1, score: 1, seconds_used: 1, answers: [] });
        } else if (table === "quizzes") {
          res = await supabase.from(table).insert({ title: "Test Quiz", description: "Test", created_at: new Date().toISOString() });
        } else if (table === "profiles") {
          res = { error: { message: "Insert not allowed for profiles (managed by auth)" } };
        }
      } else if (action === "UPDATE") {
        if (table === "profiles") {
          res = await supabase.from(table).update({ full_name: "Test User" }).eq("id", user.id);
        } else if (table === "attempts") {
          // Try to update the first attempt
          const { data } = await supabase.from(table).select("id").eq("user_id", user.id).limit(1);
          if (data && data[0]) {
            res = await supabase.from(table).update({ score: 99 }).eq("id", data[0].id);
          } else {
            res = { error: { message: "No attempt to update" } };
          }
        } else if (table === "quizzes") {
          // Try to update the first row
          const { data } = await supabase.from(table).select("id").limit(1);
          if (data && data[0]) {
            res = await supabase.from(table).update({ title: "Updated Title" }).eq("id", data[0].id);
          } else {
            res = { error: { message: "No row to update" } };
          }
        }
      } else if (action === "DELETE") {
        if (table === "attempts") {
          const { data } = await supabase.from(table).select("id").eq("user_id", user.id).limit(1);
          if (data && data[0]) {
            res = await supabase.from(table).delete().eq("id", data[0].id);
          } else {
            res = { error: { message: "No attempt to delete" } };
          }
        } else if (table === "quizzes") {
          const { data } = await supabase.from(table).select("id").limit(1);
          if (data && data[0]) {
            res = await supabase.from(table).delete().eq("id", data[0].id);
          } else {
            res = { error: { message: "No row to delete" } };
          }
        } else if (table === "profiles") {
          res = { error: { message: "Delete not allowed for profiles (managed by auth)" } };
        }
      }
      setResults((prev: any) => ({ ...prev, [`${table}_${action}`]: res }));
    } catch (error) {
      setResults((prev: any) => ({ ...prev, [`${table}_${action}`]: { error } }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="p-6 max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>RLS Policy Tester</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-sm text-gray-700">
              <div><b>User ID:</b> {user?.id}</div>
              <div><b>Role:</b> {role}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tables.map((table) => (
                <div key={table} className="border rounded-lg p-4">
                  <div className="font-semibold mb-2">{table}</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {actions.map((action) => (
                      <Button key={action} size="sm" disabled={loading} onClick={() => runTest(table, action)}>
                        {action}
                      </Button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-600 break-all">
                    {actions.map((action) => (
                      <div key={action} className="mb-1">
                        <b>{action}:</b> {results[`${table}_${action}`]?.error ? (
                          <span className="text-red-600">{results[`${table}_${action}`].error.message}</span>
                        ) : results[`${table}_${action}`]?.data ? (
                          <span className="text-green-700">Success</span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default RLSTest; 