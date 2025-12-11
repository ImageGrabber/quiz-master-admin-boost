import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
    Trophy,
    Users,
    Copy,
    Settings,
    LogOut,
    ArrowLeft,
    Calendar,
    Medal,
    Crown
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

interface GroupDetails {
    id: number;
    name: string;
    description: string;
    invite_code: string;
    created_by: string;
    created_at: string;
}

interface Member {
    user_id: string;
    role: 'admin' | 'member';
    joined_at: string;
    profile: {
        full_name: string;
        avatar_url: string;
    };
    total_score?: number; // Calculated
}

const StudyGroupDetail = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const navigate = useNavigate();
    const [group, setGroup] = useState<GroupDetails | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (groupId) {
            fetchGroupDetails();
        }
    }, [groupId]);

    const fetchGroupDetails = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);

            if (!user || !groupId) return;

            // 1. Fetch Group Info
            const { data: groupData, error: groupError } = await supabase
                .from('study_groups')
                .select('*')
                .eq('id', groupId)
                .single();

            if (groupError) throw groupError;
            setGroup(groupData);

            // 2. Fetch Members
            const { data: memberData, error: memberError } = await supabase
                .from('study_group_members')
                .select(`
          user_id,
          role,
          joined_at,
          profile:profiles!study_group_members_user_id_profiles_fkey(full_name, avatar_url)
        `)
                .eq('group_id', groupId);

            if (memberError) throw memberError;

            // 3. Fetch Scores for Leaderboard
            // We'll manually aggregate attempts for these users
            const userIds = memberData.map((m: any) => m.user_id);

            const { data: scoresData } = await supabase
                .from('attempts')
                .select('user_id, score')
                .in('user_id', userIds)
                .eq('completed', true);

            // Calculate total score per user
            const scoreMap = new Map<string, number>();
            scoresData?.forEach((attempt: any) => {
                const current = scoreMap.get(attempt.user_id) || 0;
                scoreMap.set(attempt.user_id, current + attempt.score);
            });

            const formattedMembers: Member[] = memberData.map((m: any) => ({
                ...m,
                total_score: scoreMap.get(m.user_id) || 0
            })).sort((a: any, b: any) => b.total_score - a.total_score);

            setMembers(formattedMembers);

        } catch (error: any) {
            console.error("Error fetching group details:", error);
            toast.error("Failed to load group");
            navigate("/study-groups");
        } finally {
            setLoading(false);
        }
    };

    const copyInviteCode = () => {
        if (group) {
            navigator.clipboard.writeText(group.invite_code);
            toast.success("Invite code copied!");
        }
    };

    const handleLeaveGroup = async () => {
        if (!confirm("Are you sure you want to leave this group?")) return;

        try {
            const { error } = await supabase
                .from('study_group_members')
                .delete()
                .eq('group_id', groupId)
                .eq('user_id', currentUser.id);

            if (error) throw error;

            toast.success("Left group successfully");
            navigate("/study-groups");
        } catch (error) {
            console.error("Error leaving group:", error);
            toast.error("Failed to leave group");
        }
    };

    if (loading) {
        return (
            <DashboardLayout title="Loading..." subtitle="Fetching group details">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    if (!group) return null;

    return (
        <DashboardLayout
            title={group.name}
            subtitle="Group Dashboard"
            rightContent={
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate("/study-groups")}>
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyInviteCode}>
                        <Copy className="w-4 h-4 mr-2" />
                        Code: {group.invite_code}
                    </Button>
                </div>
            }
        >
            <div className="max-w-[1600px] mx-auto px-4 space-y-6">

                {/* Hero Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-16 translate-x-16"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
                            <p className="text-blue-100 max-w-xl text-lg mb-4">{group.description || "No description provided."}</p>
                            <div className="flex items-center gap-4 text-sm text-blue-200">
                                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {members.length} Members</span>
                                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Created {format(new Date(group.created_at), 'MMM yyyy')}</span>
                            </div>
                        </div>

                        {currentUser && group.created_by !== currentUser.id && (
                            <Button
                                variant="destructive"
                                className="bg-red-500/20 hover:bg-red-500/40 border-0 backdrop-blur-sm"
                                onClick={handleLeaveGroup}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Leave Group
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Main Content: Leaderboard */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-yellow-500" />
                                    Group Leaderboard
                                </CardTitle>
                                <CardDescription>Rankings based on total quiz points</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y divide-slate-100">
                                    {members.map((member, index) => (
                                        <div key={member.user_id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                            <div className="w-8 flex justify-center flex-shrink-0">
                                                {index === 0 ? (
                                                    <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                                ) : index === 1 ? (
                                                    <Medal className="w-6 h-6 text-slate-400" />
                                                ) : index === 2 ? (
                                                    <Medal className="w-6 h-6 text-amber-600" />
                                                ) : (
                                                    <span className="text-lg font-bold text-slate-400">#{index + 1}</span>
                                                )}
                                            </div>

                                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                                <AvatarImage src={member.profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.profile?.full_name}`} />
                                                <AvatarFallback>{member.profile?.full_name?.[0]}</AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-slate-900 truncate">
                                                        {member.profile?.full_name || "Unknown User"}
                                                    </h4>
                                                    {member.role === 'admin' && (
                                                        <Badge variant="secondary" className="text-[10px] h-5 bg-blue-100 text-blue-700">Admin</Badge>
                                                    )}
                                                    {member.user_id === currentUser?.id && (
                                                        <Badge variant="outline" className="text-[10px] h-5 text-slate-500">You</Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-slate-500">Joined {format(new Date(member.joined_at), 'MMM d, yyyy')}</p>
                                            </div>

                                            <div className="text-right">
                                                <div className="font-bold text-slate-900">{member.total_score?.toLocaleString()}</div>
                                                <div className="text-xs text-slate-500">pts</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-slate-200">
                            <CardHeader>
                                <CardTitle className="text-lg">Invite Members</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-slate-600">Share this code with friends to let them join your group.</p>
                                <div
                                    className="bg-slate-100 p-4 rounded-xl flex items-center justify-between cursor-pointer hover:bg-slate-200 transition-colors group"
                                    onClick={copyInviteCode}
                                >
                                    <code className="text-2xl font-mono font-bold text-slate-800 tracking-widest">{group.invite_code}</code>
                                    <Copy className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                                </div>
                                <Button className="w-full" variant="secondary" onClick={copyInviteCode}>
                                    Copy Code
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudyGroupDetail;
