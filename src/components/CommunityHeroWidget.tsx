import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface Post {
    id: number;
    content: string;
    created_at: string;
    profiles: {
        full_name: string | null;
        avatar_url?: string | null;
    } | null;
    likes: { count: number }[];
    comments: { count: number }[];
}

const CommunityHeroWidget = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLatestPosts();
    }, []);

    const fetchLatestPosts = async () => {
        try {
            const { data, error } = await (supabase as any)
                .from('posts')
                .select(`
                    id,
                    content,
                    created_at,
                    profiles!posts_user_id_profiles_fkey(full_name, avatar_url),
                    likes(count),
                    comments(count)
                `)
                .order('created_at', { ascending: false })
                .limit(6);

            if (error) throw error;

            const formattedPosts = (data || []).map((post: any) => ({
                ...post,
                likes: post.likes || [],
                comments: post.comments || []
            }));

            setPosts(formattedPosts);
        } catch (error) {
            console.error("Error fetching hero community posts:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="h-full bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl overflow-hidden flex flex-col">
            <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <CardTitle className="text-lg font-bold flex items-center justify-between text-slate-800">
                    <span>Community Pulse</span>
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
                {loading ? (
                    <div className="p-6 space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex gap-3 animate-pulse">
                                <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group"
                                onClick={() => navigate('/dashboard/community')}
                            >
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8 border border-slate-100">
                                        <AvatarImage src={post.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.profiles?.full_name || 'User'}`} />
                                        <AvatarFallback>{post.profiles?.full_name?.[0] || 'U'}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-semibold text-slate-900 truncate">
                                                {post.profiles?.full_name || "User"}
                                            </span>
                                            <span className="text-[10px] text-slate-400">
                                                {formatDistanceToNow(new Date(post.created_at), { addSuffix: false }).replace('about ', '')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 line-clamp-2 leading-snug mb-2">
                                            {post.content}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <div className="flex items-center gap-1 group-hover:text-pink-500 transition-colors">
                                                <Heart className="w-3 h-3" />
                                                <span>{post.likes.length || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1 group-hover:text-blue-500 transition-colors">
                                                <MessageSquare className="w-3 h-3" />
                                                <span>{post.comments.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
            <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                <Button
                    variant="ghost"
                    className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-sm h-9"
                    onClick={() => navigate('/dashboard/community')}
                >
                    Join the Conversation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </Card>
    );
};

export default CommunityHeroWidget;
