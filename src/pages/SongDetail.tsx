import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Share2 } from "lucide-react";
import { allSongs as songs } from "@/data/songs";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const SongDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const song = songs.find((s) => s.slug === slug);
    const [selectedLang, setSelectedLang] = useState("malayalam");

    if (!song) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navigation />
                <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Song Not Found</h1>
                    <Button onClick={() => navigate("/songs")}>Back to Songs</Button>
                </main>
                <Footer />
            </div>
        );
    }

    const availableTranslations = Object.keys(song.translations);
    const currentTranslation = song.translations[selectedLang] || song.translations['malayalam'];
    const videoId = song.videoUrl.split('/').pop();
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    // Construct JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "MusicVideoObject",
        "name": song.title,
        "description": song.description,
        "thumbnailUrl": [thumbnailUrl],
        "uploadDate": new Date().toISOString(), // In a real app, store this in data
        "embedUrl": song.videoUrl,
        "contentUrl": `https://www.youtube.com/watch?v=${videoId}`,
        "inLanguage": selectedLang,
        "lyrics": {
            "@type": "Lyrics",
            "text": currentTranslation.lyrics.map(s => s.lines.join("\n")).join("\n\n")
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${song.title} - Lyrics`,
                    text: `Check out lyrics for ${song.title} on Bible Quiz Competition!`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast({
                    title: "Link copied!",
                    description: "Song link has been copied to your clipboard.",
                });
            } catch (err) {
                toast({
                    title: "Failed to copy",
                    description: "Could not copy link to clipboard.",
                    variant: "destructive",
                });
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Helmet>
                <title>{song.title} | {currentTranslation.lang} Lyrics | Bible Quiz Competition</title>
                <meta
                    name="description"
                    content={`Read lyrics and watch the video for ${song.title} in ${currentTranslation.lang}. ${song.description}`}
                />
                <meta name="keywords" content={`Christian devotional songs, Malayalam Christian songs, ${song.title} lyrics, ${song.title} ${selectedLang}, Bible Quiz Competition songs`} />
                <link rel="canonical" href={`https://biblequizcompetition.com/songs/${song.slug}`} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="music.song" />
                <meta property="og:url" content={`https://biblequizcompetition.com/songs/${song.slug}`} />
                <meta property="og:title" content={`${song.title} - ${currentTranslation.lang} Lyrics`} />
                <meta property="og:description" content={`Watch the video and read lyrics for ${song.title}. ${song.description}`} />
                <meta property="og:image" content={thumbnailUrl} />
                <meta property="og:image:width" content="1280" />
                <meta property="og:image:height" content="720" />
                <meta property="og:site_name" content="Bible Quiz Competition" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={`https://biblequizcompetition.com/songs/${song.slug}`} />
                <meta property="twitter:title" content={`${song.title} - ${currentTranslation.lang} Lyrics`} />
                <meta property="twitter:description" content={`Watch the video and read lyrics for ${song.title}. ${song.description}`} />
                <meta property="twitter:image" content={thumbnailUrl} />

                {/* Schema Markup */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            <Navigation />

            <main className="flex-grow w-full py-8 px-4 md:px-8 lg:px-12">
                <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
                    <Button
                        variant="ghost"
                        className="pl-0 hover:bg-transparent hover:text-blue-600"
                        onClick={() => navigate("/songs")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to All Songs
                    </Button>

                    <Button onClick={handleShare} variant="outline" className="gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start h-full">
                    {/* Video Section - Full Height on Desktop */}
                    <div className="space-y-4 md:sticky md:top-24">
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
                        <h1 className="text-2xl md:text-4xl font-bold font-urbanist text-gray-900 mt-6">{song.title}</h1>
                        <p className="text-lg text-gray-500 italic">
                            {song.description}
                        </p>
                    </div>

                    {/* Lyrics Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 animate-fade-in-up delay-100">
                        <Tabs defaultValue="malayalam" value={selectedLang} onValueChange={setSelectedLang} className="w-full">
                            <div className="flex justify-center mb-8">
                                <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 h-auto gap-2 bg-gray-100/50 p-1 rounded-xl">
                                    {availableTranslations.map((lang) => (
                                        <TabsTrigger
                                            key={lang}
                                            value={lang}
                                            className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-lg capitalize px-4 py-2 text-sm font-medium transition-all"
                                        >
                                            {lang}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            {availableTranslations.map((lang) => (
                                <TabsContent key={lang} value={lang} className="mt-4 focus-visible:outline-none focus-visible:ring-0">
                                    <div className="text-gray-800 leading-relaxed font-urbanist text-lg md:text-xl text-center space-y-8">
                                        <h2 className="text-xl font-semibold text-blue-600/80 mb-6 flex items-center justify-center gap-2">
                                            {song.translations[lang].lang} Lyrics
                                        </h2>
                                        {song.translations[lang].lyrics.map((section, index) => (
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
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SongDetail;
