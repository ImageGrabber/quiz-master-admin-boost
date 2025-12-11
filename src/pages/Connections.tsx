import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    UserPlus,
    Users,
    Search,
    Check,
    X,
    Clock,
    MessageCircle,
    Shield
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Connections = () => {
    const [activeTab, setActiveTab] = useState("my-connections");
    const [connections, setConnections] = useState<any[]>([]);
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);
            if (user) {
                fetchConnections(user.id);
                fetchSuggestions(user.id);
            }
        };
        init();
    }, []);

    const fetchConnections = async (userId: string) => {
        // Fetch rows where user is requester OR receiver
        const { data, error } = await supabase
            .from('connections')
            .select(`
                *,
                requester:profiles!connections_requester_id_profiles_fkey(id, full_name),
                receiver:profiles!connections_receiver_id_profiles_fkey(id, full_name)
            `)
            .or(`requester_id.eq.${userId},receiver_id.eq.${userId}`);

        if (error) {
            console.error("Error fetching connections:", error);
            return;
        }
        setConnections(data || []);
        setLoading(false);
    };

    const fetchSuggestions = async (userId: string) => {
        // Fetch all profiles except self (simplified for now - ideally exclude existing connections)
        // This is a naive implementation; in prod use a dedicated RPC or smarter query
        const { data: profiles } = await supabase
            .from('profiles')
            .select('*')
            .neq('id', userId)
            .limit(20);

        setSuggestedUsers(profiles || []);
    };

    const handleConnect = async (targetUserId: string) => {
        if (!currentUser) return;
        try {
            const { error } = await supabase.from('connections').insert({
                requester_id: currentUser.id,
                receiver_id: targetUserId,
                status: 'pending'
            });
            if (error) throw error;
            toast.success("Request sent!");
            fetchConnections(currentUser.id); // Refresh
        } catch (e) {
            console.error(e);
            toast.error("Failed to send request");
        }
    };

    const handleAccept = async (connectionId: number) => {
        try {
            const { error } = await supabase.from('connections').update({ status: 'accepted' }).eq('id', connectionId);
            if (error) throw error;
            toast.success("Connected!");
            fetchConnections(currentUser?.id);
        } catch (e) {
            console.error(e);
            toast.error("Failed to accept");
        }
    };

    const getOtherUser = (connection: any) => {
        if (!currentUser) return {};
        return connection.requester_id === currentUser.id ? connection.receiver : connection.requester;
    };

    // Derived lists
    const pendingRequests = connections.filter(c => c.status === 'pending' && c.receiver_id === currentUser?.id);
    const myFriends = connections.filter(c => c.status === 'accepted');

    return (
        <DashboardLayout
            title="Connections"
            subtitle="Manage your network and find new friends."
        >
            <div className="max-w-[1600px] mx-auto px-4 space-y-6">

                {/* Header removed */}

                <Tabs defaultValue="my-connections" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-white border border-slate-200 p-1 h-12 rounded-xl">
                        <TabsTrigger value="my-connections" className="rounded-lg px-6 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                            My Connections
                            <Badge variant="secondary" className="ml-2 bg-slate-100 text-slate-600">{myFriends.length}</Badge>
                        </TabsTrigger>
                        <TabsTrigger value="pending" className="rounded-lg px-6 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                            Requests
                            {pendingRequests.length > 0 && (
                                <Badge variant="destructive" className="ml-2">{pendingRequests.length}</Badge>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="find" className="rounded-lg px-6 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                            Find People
                        </TabsTrigger>
                    </TabsList>

                    {/* My Connections Tab */}
                    <TabsContent value="my-connections" className="space-y-6">
                        {myFriends.length === 0 ? (
                            <Card className="border-slate-200 shadow-sm">
                                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Users className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900">No connections yet</h3>
                                    <p className="text-slate-500 max-w-sm mb-6">Start building your network by finding people with similar interests.</p>
                                    <Button onClick={() => setActiveTab("find")}>Find People</Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {myFriends.map(conn => {
                                    const friend = getOtherUser(conn);
                                    return (
                                        <Card key={conn.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                            <CardContent className="p-6 flex items-center gap-4">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${friend?.full_name}`} />
                                                    <AvatarFallback>{friend?.full_name?.[0]}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-slate-900 truncate">{friend?.full_name}</h4>
                                                    <p className="text-xs text-slate-500">Connected {new Date(conn.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <Button variant="ghost" size="icon">
                                                    <MessageCircle className="w-5 h-5 text-slate-400" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </TabsContent>

                    {/* Pending Requests Tab */}
                    <TabsContent value="pending" className="space-y-6">
                        {pendingRequests.length === 0 ? (
                            <div className="text-center py-12 text-slate-500">No pending requests</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {pendingRequests.map(conn => {
                                    const sender = conn.requester;
                                    return (
                                        <Card key={conn.id} className="border-slate-200 shadow-sm">
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${sender?.full_name}`} />
                                                        <AvatarFallback>{sender?.full_name?.[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <h4 className="font-semibold text-slate-900">{sender?.full_name}</h4>
                                                        <p className="text-xs text-slate-500">Wants to connect</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => handleAccept(conn.id)}>
                                                        <Check className="w-4 h-4 mr-2" /> Accept
                                                    </Button>
                                                    <Button variant="outline" className="flex-1">
                                                        <X className="w-4 h-4 mr-2" /> Ignore
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        )}
                    </TabsContent>

                    {/* Find People Tab */}
                    <TabsContent value="find" className="space-y-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search by name..."
                                className="pl-10 h-12 bg-white border-slate-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {suggestedUsers
                                .filter(u => u.full_name?.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map(user => {
                                    const isConnected = connections.some(c =>
                                        (c.requester_id === user.id || c.receiver_id === user.id)
                                    );

                                    if (isConnected) return null; // Don't show existing connections

                                    return (
                                        <Card key={user.id} className="border-slate-200 shadow-sm">
                                            <CardContent className="p-6 flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name}`} />
                                                        <AvatarFallback>{user.full_name?.[0]}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="min-w-0">
                                                        <h4 className="font-semibold text-slate-900 truncate">{user.full_name}</h4>
                                                        <p className="text-xs text-slate-500">Bible Quizzer</p>
                                                    </div>
                                                </div>
                                                <Button size="sm" variant="outline" className="shrink-0" onClick={() => handleConnect(user.id)}>
                                                    <UserPlus className="w-4 h-4" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Connections;
