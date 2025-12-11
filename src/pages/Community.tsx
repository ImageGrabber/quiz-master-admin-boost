import React, { useState, useEffect, useRef, useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Heart,
    Share2,
    MoreHorizontal,
    Send,
    Trophy,
    Brain,
    Users,
    Flame,
    Trash2,
    Flag // Added Flag icon
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Interfaces
interface Post {
    id: number;
    user_id: string;
    content: string;
    image_url?: string;
    created_at: string;
    type: 'post' | 'achievement';
    achievement_data?: any;
    likes: { count: number };
    comments: { count: number };
    profiles: {
        full_name: string | null;
        avatar_url?: string | null;
    } | null;
    user_has_liked?: boolean;
}

const Community = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Calculate trending topics from posts
    const trendingTopics = useMemo(() => {
        const tagCounts: { [key: string]: number } = {};

        posts.forEach(post => {
            // Find all hashtags in the post content
            // Matches #tag, #Tag123, etc.
            const matches = post.content.match(/#[a-zA-Z0-9_]+/g);
            if (matches) {
                matches.forEach(tag => {
                    // We'll count exact matches to preserve casing preference
                    // e.g. #DailyBread vs #dailybread
                    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
                });
            }
        });

        // Convert to array, sort by count desc, take top 5
        return Object.entries(tagCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .slice(0, 5)
            .map(([tag]) => tag);
    }, [posts]);

    useEffect(() => {
        fetchUser();
        fetchPosts();

        // Realtime Subscription
        const channel = supabase
            .channel('public:posts')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, (payload) => {
                fetchPosts();
            })
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'posts' }, (payload) => {
                // Use optimistic update, ensure ID types match (string vs number)
                setPosts(current => current.filter(p => String(p.id) !== String(payload.old.id)));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            setCurrentUser({ ...user, profile });
        }
    };

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    *,
                    profiles!posts_user_id_profiles_fkey(full_name, avatar_url),
                    likes(id, user_id),
                    comments(id)
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching posts:", error);
                toast.error("Error loading feed: " + error.message);
                return;
            }

            const formattedPosts: Post[] = (data || []).map((post: any) => ({
                ...post,
                likes: { count: post.likes?.length || 0 },
                comments: { count: post.comments?.length || 0 },
                user_has_liked: post.likes?.some((like: any) => like.user_id === currentUser?.id) || false
            }));

            setPosts(formattedPosts);

        } catch (e: any) {
            console.error("Exception fetching posts", e);
            toast.error("Something went wrong: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePost = async () => {
        if (!newPost.trim() || !currentUser) return;

        const tempId = Date.now();
        const tempPost: Post = {
            id: tempId,
            user_id: currentUser.id,
            content: newPost,
            type: 'post',
            created_at: new Date().toISOString(),
            likes: { count: 0 },
            comments: { count: 0 },
            profiles: {
                full_name: currentUser.profile?.full_name || 'User',
                avatar_url: currentUser.profile?.avatar_url
            },
            user_has_liked: false
        };

        // Optimistic update
        setPosts(prev => [tempPost, ...prev]);
        setNewPost("");
        toast.success("Post shared!");

        try {
            const { error } = await supabase
                .from('posts')
                .insert({
                    user_id: currentUser.id,
                    content: tempPost.content,
                    type: 'post'
                });

            if (error) throw error;
            // The subscription will trigger fetchPosts and replace our temp post with the real one
        } catch (error: any) {
            console.error("Error creating post:", error);
            toast.error("Failed to share post: " + error.message);
            // Revert optimistic update
            setPosts(prev => prev.filter(p => p.id !== tempId));
            setNewPost(tempPost.content); // Restore content so user can try again
        }
    };

    const handleDeletePost = async (postId: number) => {
        // Optimistic update immediately
        const previousPosts = [...posts];
        setPosts(prev => prev.filter(p => p.id !== postId));
        toast.success("Post deleted");

        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;
        } catch (error: any) {
            console.error("Error deleting post:", error);
            toast.error("Failed to delete post");
            // Revert optimistic update
            setPosts(previousPosts);
        }
    };

    const handleFlagPost = async (postId: number) => {
        try {
            const { error } = await supabase
                .from('flagged_posts')
                .insert({
                    post_id: postId,
                    user_id: currentUser.id,
                    reason: 'inappropriate' // Default reason for now
                });

            if (error) {
                if (error.code === '23505') { // Unique violation
                    toast.error("You have already flagged this post.");
                } else {
                    throw error;
                }
                return;
            }

            toast.success("Post flagged for review.");
        } catch (error: any) {
            console.error("Error flagging post:", error);
            toast.error("Failed to flag post.");
        }
    };

    const handleLike = async (postId: number) => {
        if (!currentUser) {
            toast.error("You need to be logged in to like posts.");
            return;
        }

        // Optimistic UI update
        setPosts(prevPosts => prevPosts.map(p => {
            if (p.id === postId) {
                const newLikesCount = p.user_has_liked ? p.likes.count - 1 : p.likes.count + 1;
                return {
                    ...p,
                    likes: { count: newLikesCount },
                    user_has_liked: !p.user_has_liked
                };
            }
            return p;
        }));

        try {
            const { data: existingLike } = await supabase
                .from('likes')
                .select('id')
                .eq('post_id', postId)
                .eq('user_id', currentUser.id)
                .single();

            if (existingLike) {
                await supabase.from('likes').delete().eq('id', existingLike.id);
            } else {
                await supabase.from('likes').insert({ post_id: postId, user_id: currentUser.id });
            }
        } catch (error) {
            console.error("Error handling like:", error);
            toast.error("Failed to update like status.");
            // Revert optimistic update if error
            setPosts(prevPosts => prevPosts.map(p => {
                if (p.id === postId) {
                    const newLikesCount = p.user_has_liked ? p.likes.count - 1 : p.likes.count + 1;
                    return {
                        ...p,
                        likes: { count: newLikesCount },
                        user_has_liked: !p.user_has_liked
                    };
                }
                return p;
            }));
        }
    };

    // Helper to render content with clickable hashtags
    const renderContentWithHashtags = (content: string) => {
        const parts = content.split(/(#[a-zA-Z0-9_]+)/g);
        return parts.map((part, index) => {
            if (part.startsWith('#') && part.length > 1) {
                return (
                    <span
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(part);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer font-medium"
                    >
                        {part}
                    </span>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    // Filter posts based on selected tag
    const filteredPosts = selectedTag
        ? posts.filter(post => post.content.toLowerCase().includes(selectedTag.toLowerCase()))
        : posts;

    return (
        <DashboardLayout
            title="Community"
            subtitle="Connect with fellow believers."
        >
            <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 px-2 lg:px-4">

                {/* Main Feed Column */}
                <div className="flex-1 space-y-6">

                    {/* Create Post Widget */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                        <div className="flex gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={currentUser?.profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.profile?.full_name || 'User'}`} />
                                <AvatarFallback>{currentUser?.profile?.full_name?.[0] || 'U'}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-4">
                                <Input
                                    placeholder="Share your thoughts or a verse (use #hashtags)..."
                                    className="bg-slate-50 border-none h-12 text-base focus-visible:ring-1 focus-visible:ring-blue-500/20"
                                    value={newPost}
                                    onChange={(e) => setNewPost(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handlePost()}
                                />

                                <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                    <div className="flex gap-2">
                                        {/* Simplified: No buttons here for now as per "only text" request */}
                                    </div>
                                    <Button
                                        size="sm"
                                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6"
                                        onClick={handlePost}
                                        disabled={!newPost.trim()}
                                    >
                                        Post <Send className="w-3 h-3 ml-2" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Filter Banner */}
                    {selectedTag && (
                        <div className="bg-blue-50 border border-blue-100 text-blue-800 px-4 py-3 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                            <div className="flex items-center gap-2">
                                <Flame className="w-4 h-4 text-blue-600" />
                                <span className="font-medium">Showing posts for <span className="font-bold">{selectedTag}</span></span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedTag(null)}
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                            >
                                Clear Filter
                            </Button>
                        </div>
                    )}

                    {/* Posts Feed */}
                    <div className="space-y-4">
                        {filteredPosts.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed">
                                <p className="text-slate-500">No posts found {selectedTag ? `for ${selectedTag}` : 'yet'}.</p>
                                {selectedTag && (
                                    <Button variant="link" onClick={() => setSelectedTag(null)} className="mt-2">
                                        View all posts
                                    </Button>
                                )}
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                                <div key={post.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Post Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 cursor-pointer">
                                                <AvatarImage src={post.profiles?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.profiles?.full_name || 'User'}`} />
                                                <AvatarFallback>{post.profiles?.full_name?.[0] || 'U'}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 leading-none cursor-pointer hover:underline">{post.profiles?.full_name || "Unknown User"}</h3>
                                                <p className="text-xs text-slate-500 mt-1">{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</p>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 -mr-2">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                {currentUser && currentUser.id === post.user_id ? (
                                                    <DropdownMenuItem onClick={() => handleDeletePost(post.id)} className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer">
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete Post
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem onClick={() => handleFlagPost(post.id)} className="text-orange-600 focus:text-orange-700 focus:bg-orange-50 cursor-pointer">
                                                        <Flag className="w-4 h-4 mr-2" />
                                                        Flag Content
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Post Content */}
                                    <div className="mb-4">
                                        <p className="text-slate-700 leading-relaxed mb-4">
                                            {renderContentWithHashtags(post.content)}
                                        </p>

                                        {post.image_url && (
                                            <div className="mb-4 rounded-xl overflow-hidden border border-slate-100">
                                                <img
                                                    src={post.image_url}
                                                    alt="Post content"
                                                    className="w-full h-auto max-h-[500px] object-cover"
                                                />
                                            </div>
                                        )}

                                        {/* Achievement Card */}
                                        {post.type === 'achievement' && post.achievement_data && (
                                            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                                                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                                    <Trophy className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{post.achievement_data.title}</h4>
                                                    <p className="text-sm text-slate-500">Result: <span className="font-medium text-slate-900">{post.achievement_data.score}</span></p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Interaction Bar */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className={`text-slate-500 hover:text-red-500 hover:bg-red-50 group px-2 ${post.user_has_liked ? 'text-red-500 bg-red-50' : ''}`}
                                                onClick={() => handleLike(post.id)}
                                            >
                                                <Heart className={`w-5 h-5 mr-1.5 group-hover:scale-110 transition-transform ${post.user_has_liked ? 'fill-current' : ''}`} />
                                                <span className="font-medium">{post.likes.count}</span>
                                            </Button>
                                        </div>
                                        {/* Share button removed */}
                                    </div>
                                </div>
                            )))}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="w-full lg:w-80 space-y-6 hidden lg:block">

                    {/* Topic Cloud */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                            <Flame className="w-4 h-4 text-orange-500 mr-2" />
                            Trending Topics
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {trendingTopics.length > 0 ? (
                                trendingTopics.map(tag => (
                                    <Badge
                                        key={tag}
                                        onClick={() => setSelectedTag(tag)}
                                        variant="secondary"
                                        className={`cursor-pointer px-3 py-1 font-normal transition-colors
                                            ${selectedTag === tag
                                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 ring-1 ring-blue-300'
                                                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                            }`}
                                    >
                                        {tag}
                                    </Badge>
                                ))
                            ) : (
                                <p className="text-sm text-slate-400">No trending topics yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Top Contributors */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-in fade-in slide-in-from-right-4 delay-150">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                            <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                            Top Contributors
                        </h3>
                        <div className="space-y-4">
                            {Object.values(
                                posts.reduce((acc: any, post) => {
                                    const userId = post.user_id;
                                    if (!acc[userId]) {
                                        acc[userId] = {
                                            id: userId,
                                            name: post.profiles?.full_name || "Unknown",
                                            avatar: post.profiles?.avatar_url,
                                            count: 0
                                        };
                                    }
                                    acc[userId].count++;
                                    return acc;
                                }, {})
                            )
                                .sort((a: any, b: any) => b.count - a.count)
                                .slice(0, 5)
                                .map((contributor: any, index) => (
                                    <div key={contributor.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={contributor.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${contributor.name}`} />
                                                    <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                                                </Avatar>
                                                {index === 0 && (
                                                    <div className="absolute -top-1 -right-1 bg-yellow-400 text-[10px] rounded-full w-4 h-4 flex items-center justify-center text-yellow-900 font-bold border border-white">
                                                        1
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]">
                                                {contributor.name}
                                            </span>
                                        </div>
                                        <Badge variant="secondary" className="bg-slate-50 text-slate-600 text-xs font-normal">
                                            {contributor.count} posts
                                        </Badge>
                                    </div>
                                ))}
                        </div>
                        {posts.length === 0 && (
                            <p className="text-sm text-slate-400 text-center py-2">No contributors yet.</p>
                        )}
                    </div>

                </div>

            </div>
        </DashboardLayout>
    );
};

export default Community;
