import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Users, Plus, LogIn, ArrowRight, Hash, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface StudyGroup {
    id: number;
    name: string;
    description: string;
    invite_code: string;
    created_by: string;
    member_count?: number; // Calculated field
}

const StudyGroups = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState<StudyGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);

    // Create form state
    const [newGroupName, setNewGroupName] = useState("");
    const [newGroupDesc, setNewGroupDesc] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    // Join form state
    const [inviteCode, setInviteCode] = useState("");
    const [isJoining, setIsJoining] = useState(false);
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            // Get groups where user is a member
            const { data: memberData, error } = await supabase
                .from('study_group_members')
                .select(`
          group_id,
          study_groups (
            id,
            name,
            description,
            invite_code,
            created_by
          )
        `)
                .eq('user_id', user.id);

            if (error) throw error;

            // Manually count members for each group (could be optimized with a view or RPC)
            const groupsWithCounts = await Promise.all(
                (memberData || []).map(async (item: any) => {
                    const group = item.study_groups;
                    const { count } = await supabase
                        .from('study_group_members')
                        .select('*', { count: 'exact', head: true })
                        .eq('group_id', group.id);

                    return {
                        ...group,
                        member_count: count || 1
                    };
                })
            );

            setGroups(groupsWithCounts);
        } catch (error: any) {
            console.error("Error fetching groups:", error);
            toast.error("Failed to load study groups");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGroup = async () => {
        if (!newGroupName.trim()) return;

        setIsCreating(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // Generate a simple 6-char code
            const code = Math.random().toString(36).substring(2, 8).toUpperCase();

            // 1. Create Group
            const { data: group, error: groupError } = await supabase
                .from('study_groups')
                .insert({
                    name: newGroupName,
                    description: newGroupDesc,
                    created_by: user.id,
                    invite_code: code
                })
                .select()
                .single();

            if (groupError) throw groupError;

            // 2. Add creator as admin member
            const { error: memberError } = await supabase
                .from('study_group_members')
                .insert({
                    group_id: group.id,
                    user_id: user.id,
                    role: 'admin'
                });

            if (memberError) throw memberError;

            toast.success("Study group created!");
            setCreateDialogOpen(false);
            setNewGroupName("");
            setNewGroupDesc("");
            fetchGroups(); // Refresh list

        } catch (error: any) {
            console.error("Error creating group:", error);
            toast.error("Failed to create group: " + error.message);
        } finally {
            setIsCreating(false);
        }
    };

    const handleJoinGroup = async () => {
        if (!inviteCode.trim()) return;

        setIsJoining(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Not authenticated");

            // 1. Find group by code
            const { data: group, error: searchError } = await supabase
                .from('study_groups')
                .select('id, name')
                .eq('invite_code', inviteCode.toUpperCase())
                .single();

            if (searchError || !group) {
                toast.error("Invalid invite code");
                return;
            }

            // 2. Check if already member
            const { data: existing } = await supabase
                .from('study_group_members')
                .select('id')
                .eq('group_id', group.id)
                .eq('user_id', user.id)
                .single();

            if (existing) {
                toast.info("You are already a member of this group");
                setJoinDialogOpen(false);
                return;
            }

            // 3. Join
            const { error: joinError } = await supabase
                .from('study_group_members')
                .insert({
                    group_id: group.id,
                    user_id: user.id,
                    role: 'member'
                });

            if (joinError) throw joinError;

            toast.success(`Joined ${group.name}!`);
            setJoinDialogOpen(false);
            setInviteCode("");
            fetchGroups();

        } catch (error: any) {
            console.error("Error joining group:", error);
            toast.error("Failed to join group");
        } finally {
            setIsJoining(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(text);
        toast.success("Invite code copied!");
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <DashboardLayout
            title="Study Groups"
            subtitle="Collaborate and compete with your friends and church group."
        >
            <div className="max-w-[1600px] mx-auto px-4 space-y-8">

                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900">Your Groups</h3>
                            <p className="text-sm text-slate-500">Manage your Bible study communities</p>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <Button variant="outline" className="flex-1 sm:flex-none" onClick={() => setJoinDialogOpen(true)}>
                            <LogIn className="w-4 h-4 mr-2" />
                            Join Group
                        </Button>
                        <Button className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700" onClick={() => setCreateDialogOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Group
                        </Button>
                    </div>
                </div>

                {/* Groups Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500 animate-pulse">Loading your groups...</p>
                    </div>
                ) : groups.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No groups yet</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">
                            Create a group for your church, youth group, or friends to track progress together.
                        </p>
                        <Button size="lg" onClick={() => setCreateDialogOpen(true)}>
                            Create First Group
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {groups.map((group) => (
                            <Card key={group.id} className="hover:shadow-md transition-all cursor-pointer group border-slate-200" onClick={() => navigate(`/study-groups/${group.id}`)}>
                                <CardHeader className="pb-4">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl font-bold text-slate-900 line-clamp-1">{group.name}</CardTitle>
                                        <div
                                            className="bg-slate-100 hover:bg-slate-200 p-2 rounded-lg transition-colors"
                                            onClick={(e) => { e.stopPropagation(); copyToClipboard(group.invite_code); }}
                                            title="Copy Invite Code"
                                        >
                                            {copiedCode === group.invite_code ? (
                                                <Check className="w-4 h-4 text-green-600" />
                                            ) : (
                                                <Hash className="w-4 h-4 text-slate-500" />
                                            )}
                                        </div>
                                    </div>
                                    <CardDescription className="line-clamp-2 min-h-[40px]">
                                        {group.description || "No description provided."}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-4">
                                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg">
                                        <Users className="w-4 h-4" />
                                        <span className="font-medium text-slate-700">{group.member_count}</span> members
                                    </div>
                                </CardContent>
                                <CardFooter className="pt-0">
                                    <Button variant="ghost" className="w-full justify-between group-hover:bg-blue-50 group-hover:text-blue-600">
                                        View Dashboard
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Create Dialog */}
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create Study Group</DialogTitle>
                            <DialogDescription>
                                Start a private group for your community. You will get an invite code to share.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Group Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Wednesday Night Bible Study"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc">Description (Optional)</Label>
                                <Input
                                    id="desc"
                                    placeholder="What is this group about?"
                                    value={newGroupDesc}
                                    onChange={(e) => setNewGroupDesc(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateGroup} disabled={isCreating || !newGroupName}>
                                {isCreating ? "Creating..." : "Create Group"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Join Dialog */}
                <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Join Study Group</DialogTitle>
                            <DialogDescription>
                                Enter the invite code shared by your group leader.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="code">Invite Code</Label>
                                <div className="relative">
                                    <Input
                                        id="code"
                                        placeholder="e.g. X7K9P2"
                                        className="uppercase tracking-widest font-mono text-center text-lg"
                                        maxLength={6}
                                        value={inviteCode}
                                        onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setJoinDialogOpen(false)}>Cancel</Button>
                            <Button onClick={handleJoinGroup} disabled={isJoining || !inviteCode}>
                                {isJoining ? "Joining..." : "Join Group"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </DashboardLayout>
    );
};

export default StudyGroups;
