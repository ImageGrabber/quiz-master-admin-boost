import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Share2, Music2, Languages, Info } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { Song } from "@/data/songs";
import hindiSongsData from "@/data/hindi-songs.json";

const songs: Song[] = hindiSongsData as Song[];

const HindiSongDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const song = songs.find((s) => s.slug === slug);
    const [selectedLang] = useState("hindi");
    const [showChords, setShowChords] = useState(true);
    const [showTranslation, setShowTranslation] = useState(true);

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
    const englishTranslation = song.translations['english'];
    const videoId = song.videoUrl ? song.videoUrl.split('/').pop() : '';
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MusicComposition",
        "name": song.title,
        "description": song.description,
        ...(thumbnailUrl && { "thumbnailUrl": [thumbnailUrl] }),
        ...(song.videoUrl && { "embedUrl": song.videoUrl }),
        "lyrics": {
            "@type": "CreativeWork",
            "text": currentTranslation?.lyrics?.map(s => s.lines.join("\n")).join("\n\n") || ''
        }
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: song.title,
                text: `${song.title} - Hindi Christian Song Lyrics`,
                url: window.location.href,
            });
        } catch (error) {
            toast({
                title: "Sharing failed",
                description: "You can copy the URL to share instead.",
            });
        }
    };

    const hasChords = Object.values(song.translations).some(t => 
        t.lyrics.some(l => l.chords && l.chords.length > 0)
    );
    const hasEnglish = !!song.translations['english'];

    return (
        <div className="min-h-screen bg-gray-50/30">
            <Helmet>
                <title>{`${song.title} Lyrics${hasChords ? ' & Guitar Chords' : ''}${hasEnglish ? ' (English Translation)' : ''} | Hindi Christian Song`}</title>
                <meta name="description" content={`Get ${song.title} lyrics in Hindi${hasChords ? ' with guitar chords' : ''}${hasEnglish ? ' and English translation' : ''}. Free Hindi Christian worship song lyrics and video.`} />
                <meta name="keywords" content={`${song.title} lyrics, ${song.title} chords, hindi christian songs, jesus geet, worship songs hindi, christian devotional songs`} />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <Navigation />

            <div className="container mx-auto px-4 py-6">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/hindi-songs")}
                    className="mb-6 hover:bg-white text-gray-600 hover:text-orange-600 transition-all font-bold"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Songs
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Sidebar - Meta & Controls */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h1 className="text-3xl md:text-4xl font-bold font-urbanist text-gray-900 mb-2 leading-tight">
                                {song.title}
                            </h1>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded uppercase tracking-wider">Lyrics</span>
                                {hasChords && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">Guitar Chords</span>}
                                {hasEnglish && <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase tracking-wider">English Translation</span>}
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed mb-6 font-medium">
                                Full Hindi lyrics with guitar chords and English meaning.
                            </p>
                            
                            <div className="flex items-center gap-3 mb-8">
                                <Button
                                    variant="outline"
                                    onClick={handleShare}
                                    className="flex-grow rounded-xl bg-gray-50 border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all font-bold"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share Song
                                </Button>
                            </div>

                            <hr className="mb-8 border-gray-100" />

                            <div className="space-y-6">
                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2.5 bg-orange-100 rounded-xl group-hover:scale-110 transition-transform">
                                            <Music2 className="h-5 w-5 text-orange-600" />
                                        </div>
                                        <div className="flex flex-col">
                                            <Label htmlFor="sidebar-chords" className="text-sm font-bold text-gray-700">Guitar Chords</Label>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Show chords</span>
                                        </div>
                                    </div>
                                    <Switch
                                        id="sidebar-chords"
                                        checked={showChords}
                                        onCheckedChange={setShowChords}
                                        className="data-[state=checked]:bg-orange-600"
                                    />
                                </div>

                                <div className="flex items-center justify-between group">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2.5 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform">
                                            <Languages className="h-5 w-5 text-blue-600" />
                                        </div>
                                        <div className="flex flex-col">
                                            <Label htmlFor="sidebar-translation" className="text-sm font-bold text-gray-700">English Meaning</Label>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Show translation</span>
                                        </div>
                                    </div>
                                    <Switch
                                        id="sidebar-translation"
                                        checked={showTranslation}
                                        onCheckedChange={setShowTranslation}
                                        className="data-[state=checked]:bg-blue-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {videoId && (
                            <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-gray-100">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        className="w-full h-full"
                                        title={song.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        <div className="bg-orange-50/50 rounded-2xl p-6 border border-orange-100/50">
                            <div className="flex items-start gap-4">
                                <Info className="h-5 w-5 text-orange-600 mt-0.5" />
                                <div className="space-y-2">
                                    <h4 className="text-sm font-bold text-orange-900">Pro Tip</h4>
                                    <p className="text-xs text-orange-800/70 leading-relaxed">
                                        Use the toggles above to visualize guitar progressions and understand the deeper theological meaning of this song.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content - Lyrics */}
                    <div className="lg:col-span-8">
                        <Card className="rounded-[2.5rem] border-none shadow-xl shadow-gray-200/50 bg-white overflow-hidden min-h-[600px] relative">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />
                            
                            <CardContent className="p-8 md:p-16">
                                <div className="space-y-16">
                                    {currentTranslation?.lyrics?.map((section, index) => (
                                        <div key={index} className="relative">
                                            {section.verse && (
                                                <div className="absolute -left-6 md:-left-10 top-0 text-[10px] font-black text-orange-200 uppercase vertical-text h-full opacity-60">
                                                    Section {section.verse}
                                                </div>
                                            )}
                                            <div className="space-y-10">
                                                {section.lines.map((line, lineIndex) => (
                                                    <div key={lineIndex} className="flex flex-col items-center">
                                                        {showChords && section.chords && section.chords[lineIndex] && (
                                                            <p className="text-orange-600 font-mono text-sm md:text-lg font-black mb-1.5 tracking-[0.2em] bg-orange-50 px-3 py-0.5 rounded-lg border border-orange-100 shadow-sm">
                                                                {section.chords[lineIndex]}
                                                            </p>
                                                        )}
                                                        <p className="font-medium text-gray-900 text-xl md:text-2xl text-center leading-relaxed font-urbanist">
                                                            {line}
                                                        </p>
                                                        {showTranslation && englishTranslation?.lyrics?.[index]?.lines?.[lineIndex] && (
                                                            <p className="text-gray-400 text-sm md:text-base italic font-medium text-center mt-3 border-t border-gray-50 pt-3">
                                                                {englishTranslation.lyrics[index].lines[lineIndex]}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HindiSongDetail;
