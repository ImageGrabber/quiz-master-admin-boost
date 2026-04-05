import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Song } from "@/data/songs";
import hindiSongsData from "@/data/hindi-songs.json";

const songs: Song[] = hindiSongsData as Song[];

const HindiSongDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const song = songs.find((s) => s.slug === slug);
    const [selectedLang] = useState("hindi");

    if (!song) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navigation />
                <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Song Not Found</h1>
                    <Button onClick={() => navigate("/hindi-songs")}>Back to Hindi Songs</Button>
                </main>
                <Footer />
            </div>
        );
    }

    const currentTranslation = song.translations[selectedLang] || song.translations['hindi'];
    const videoId = song.videoUrl ? song.videoUrl.split('/').pop() : '';
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MusicComposition",
        "name": song.title,
        "description": song.description,
        ...(thumbnailUrl && { "thumbnailUrl": [thumbnailUrl] }),
        ...(song.videoUrl && { "embedUrl": song.videoUrl }),
        "inLanguage": "hi",
        "lyrics": {
            "@type": "CreativeWork",
            "text": currentTranslation?.lyrics.map(s => s.lines.join("\n")).join("\n\n") || ''
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${song.title} - Lyrics`,
                    text: `Check out lyrics for ${song.title}!`,
                    url: window.location.href,
                });
            } catch (error) { console.log('Error sharing:', error); }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast({ title: "Link copied!", description: "Song link has been copied to your clipboard." });
            } catch (err) {
                toast({ title: "Failed to copy", description: "Could not copy link to clipboard.", variant: "destructive" });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Helmet>
                <title>{song.title} | Hindi Christian Song Lyrics | Bible Quiz Competition</title>
                <meta name="description" content={`Read lyrics for "${song.title}" - Hindi Masih Geet. ${song.description}`} />
                <meta name="keywords" content={`Hindi Christian songs, ${song.title} lyrics, Masih Geet, Yeshu Ke Geet, Bible Quiz Competition`} />
                <link rel="canonical" href={`https://biblequizcompetition.com/hindi-songs/${song.slug}`} />
                <meta property="og:type" content="music.song" />
                <meta property="og:url" content={`https://biblequizcompetition.com/hindi-songs/${song.slug}`} />
                <meta property="og:title" content={`${song.title} - Hindi Christian Song Lyrics`} />
                <meta property="og:description" content={`Read lyrics for ${song.title}. ${song.description}`} />
                {thumbnailUrl && <meta property="og:image" content={thumbnailUrl} />}
                <meta property="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>

            <Navigation />

            <main className="flex-grow w-full py-8 px-4 md:px-8 lg:px-12">
                <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-orange-600" onClick={() => navigate("/hindi-songs")}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hindi Songs
                    </Button>
                    <Button onClick={handleShare} variant="outline" className="gap-2">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start h-full max-w-7xl mx-auto">
                    <div className="space-y-4 md:sticky md:top-24">
                        {song.videoUrl ? (
                            <Card className="overflow-hidden bg-white shadow-lg border-none animate-fade-in-up">
                                <CardContent className="p-0">
                                    <div className="aspect-w-16 aspect-h-9 w-full">
                                        <iframe
                                            className="w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
                                            src={song.videoUrl}
                                            title={song.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="bg-gradient-to-br from-orange-900 to-amber-800 rounded-2xl h-64 flex items-center justify-center">
                                <p className="text-white/60 text-lg">No video available</p>
                            </div>
                        )}
                        <h1 className="text-2xl md:text-4xl font-bold font-urbanist text-gray-900 mt-6">{song.title}</h1>
                        <p className="text-lg text-gray-500 italic">{song.description}</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-fade-in-up delay-100">
                        <h2 className="text-xl font-semibold text-orange-600/80 mb-6 flex items-center justify-center gap-2">
                            Song Lyrics
                        </h2>
                        <div className="text-gray-800 leading-relaxed font-urbanist text-lg md:text-xl text-center space-y-8">
                            {currentTranslation?.lyrics.map((section, index) => (
                                <div key={index} className="relative p-4 hover:bg-gray-50 rounded-xl transition-colors">
                                    {section.verse && (
                                        <span className="absolute top-2 left-4 md:left-8 font-bold text-gray-300 text-xs md:text-sm uppercase tracking-wider">
                                            {section.verse}
                                        </span>
                                    )}
                                    {section.lines.map((line, lineIndex) => (
                                        <p key={lineIndex} className="mb-2 last:mb-0">{line}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HindiSongDetail;
