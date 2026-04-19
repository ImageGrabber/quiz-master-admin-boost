import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, Database, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface TableStatus {
  name: string;
  exists: boolean;
  error?: string;
}

const LiveQuizHealthCheck = () => {
  const [tables, setTables] = useState<TableStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [overallStatus, setOverallStatus] = useState<'unknown' | 'healthy' | 'unhealthy'>('unknown');
  const { toast } = useToast();

  const requiredTables = [
    'user_created_quizzes',
    'user_quiz_questions',
    'live_quiz_sessions',
    'live_quiz_participants',
    'live_quiz_answers',
    'live_quiz_results'
  ];

  const checkTables = async () => {
    setIsChecking(true);
    const tableStatuses: TableStatus[] = [];

    for (const tableName of requiredTables) {
      try {
        // Try to query the table to see if it exists
        const { error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);

        if (error) {
          if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
            tableStatuses.push({
              name: tableName,
              exists: false,
              error: 'Table does not exist'
            });
          } else if (error.message?.includes('infinite recursion detected in policy')) {
            tableStatuses.push({
              name: tableName,
              exists: true,
              error: 'RLS policy recursion - needs fix'
            });
          } else {
            tableStatuses.push({
              name: tableName,
              exists: true,
              error: error.message
            });
          }
        } else {
          tableStatuses.push({
            name: tableName,
            exists: true
          });
        }
      } catch (err) {
        tableStatuses.push({
          name: tableName,
          exists: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }

    setTables(tableStatuses);
    
    // Determine overall status
    const allExist = tableStatuses.every(table => table.exists);
    setOverallStatus(allExist ? 'healthy' : 'unhealthy');
    
    if (allExist) {
      toast({
        title: "Database Health Check Passed",
        description: "All live quiz tables are properly configured",
      });
    } else {
      toast({
        title: "Database Setup Required",
        description: "Some tables are missing. Please run the database migration.",
        variant: "destructive",
      });
    }
    
    setIsChecking(false);
  };

  useEffect(() => {
    checkTables();
  }, []);

  const getStatusIcon = (exists: boolean) => {
    return exists ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <XCircle className="w-5 h-5 text-red-500" />
    );
  };

  const getStatusBadge = (exists: boolean) => {
    return exists ? (
      <Badge variant="default" className="bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        OK
      </Badge>
    ) : (
      <Badge variant="destructive">
        <XCircle className="w-3 h-3 mr-1" />
        Missing
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Quiz Database Health Check</h1>
            <p className="text-gray-600">Verify that all required database tables are properly set up</p>
          </div>

          {/* Overall Status */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Overall Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {overallStatus === 'healthy' && (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">All Systems Operational</span>
                  </div>
                )}
                {overallStatus === 'unhealthy' && (
                  <div className="flex items-center gap-2 text-red-600">
                    <XCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">Setup Required</span>
                  </div>
                )}
                {overallStatus === 'unknown' && (
                  <div className="flex items-center gap-2 text-yellow-600">
                    <AlertCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">Checking...</span>
                  </div>
                )}
                <Button 
                  onClick={checkTables} 
                  disabled={isChecking}
                  variant="outline"
                  size="sm"
                >
                  {isChecking ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  {isChecking ? 'Checking...' : 'Refresh'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Table Status */}
          <Card>
            <CardHeader>
              <CardTitle>Database Tables Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tables.map((table) => (
                  <div key={table.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(table.exists)}
                      <div>
                        <div className="font-medium">{table.name}</div>
                        {table.error && (
                          <div className="text-sm text-red-600">{table.error}</div>
                        )}
                      </div>
                    </div>
                    {getStatusBadge(table.exists)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* RLS Policy Issues */}
          {tables.some(table => table.error?.includes('RLS policy recursion')) && (
            <Card className="mt-6 border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="text-orange-800">RLS Policy Issues Detected</CardTitle>
              </CardHeader>
              <CardContent className="text-orange-700">
                <p className="mb-3">Some tables have infinite recursion in their Row Level Security policies.</p>
                <h4 className="font-semibold mb-2">To fix this:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Open your Supabase Dashboard</li>
                  <li>Go to the SQL Editor</li>
                  <li>Copy and run the fix from: <code>fix-rls-policies.sql</code></li>
                  <li>Click "Refresh" above to verify the fix</li>
                </ol>
                <p className="mt-3 text-sm">
                  <strong>Note:</strong> This will replace the problematic RLS policies with simpler, non-recursive ones.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Setup Instructions */}
          {overallStatus === 'unhealthy' && !tables.some(table => table.error?.includes('RLS policy recursion')) && (
            <Card className="mt-6 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="text-yellow-800">Setup Required</CardTitle>
              </CardHeader>
              <CardContent className="text-yellow-700">
                <h4 className="font-semibold mb-2">To fix this issue:</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Open your Supabase Dashboard</li>
                  <li>Go to the SQL Editor</li>
                  <li>Copy and run the migration from: <code>supabase/migrations/20260108000000-add-live-quiz-system.sql</code></li>
                  <li>Click "Refresh" above to verify the setup</li>
                </ol>
                <p className="mt-3 text-sm">
                  <strong>Note:</strong> The live quiz feature requires these database tables to function properly.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Success Message */}
          {overallStatus === 'healthy' && (
            <Card className="mt-6 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Setup Complete!</CardTitle>
              </CardHeader>
              <CardContent className="text-green-700">
                <p>All required database tables are properly configured. The live quiz feature is ready to use!</p>
                <div className="mt-4">
                  <Button 
                    onClick={() => window.location.href = '/create-quiz'}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Create Your First Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveQuizHealthCheck;
