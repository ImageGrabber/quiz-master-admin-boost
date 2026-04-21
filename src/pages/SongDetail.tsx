import SEO from "@/components/SEO";
import { generateVideoSchema } from "@/utils/video-seo";
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

const SITE_URL = "https://biblequizcompetition.com";

const getYouTubeVideoId = (url: string): string => {
    try {
        if (url.includes("youtu.be/")) {
            return url.split("youtu.be/")[1]?.split("?")[0] || "";
        }
        if (url.includes("/embed/")) {
            return url.split("/embed/")[1]?.split("?")[0] || "";
        }
        if (url.includes("watch?v=")) {
            return url.split("watch?v=")[1]?.split("&")[0] || "";
        }
        return "";
    } catch {
        return "";
    }
};

const SongDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const song = songs.find((s) => s.slug === slug);
    const [selectedLang, setSelectedLang] = useState("malayalam");

    if (!song) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <SEO
                    title="Song Not Found | Bible Quiz Competition"
                    description="The song page you are looking for does not exist. Browse all Christian devotional songs on Bible Quiz Competition."
                    robots="noindex, nofollow"
                    url="/malayalam-songs"
                />
                <Navigation />
                <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Song Not Found</h1>
                    <Button onClick={() => navigate("/malayalam-songs")}>Back to Malayalam Songs</Button>
                </main>
                <Footer />
            </div>
        );
    }

    const availableTranslations = Object.keys(song.translations);
    const primaryLang = song.translations.malayalam ? "malayalam" : availableTranslations[0];
    const currentTranslation = song.translations[selectedLang] || song.translations[primaryLang];
    const primaryTranslation = song.translations[primaryLang];
    const languageNames = availableTranslations.map((lang) => song.translations[lang].lang);
    const videoId = getYouTubeVideoId(song.videoUrl);
    const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : song.videoUrl;
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : `${SITE_URL}/sword.png`;
    const canonicalUrl = `${SITE_URL}/malayalam-songs/${song.slug}`;

    const lyricsExcerpt = primaryTranslation?.lyrics
        .slice(0, 2)
        .map((section) => section.lines.join(" "))
        .join(" ")
        .slice(0, 700);

    const seoDescription = `Read lyrics and watch the video for ${song.title}. Available in ${languageNames.join(", ")}. ${song.description}`;
    const seoTitle = `${song.title} Lyrics | ${primaryTranslation?.lang || "Christian Song"} | Bible Quiz Competition`;
    const seoKeywords = [
        song.title,
        `${song.title} lyrics`,
        "Christian devotional song lyrics",
        "Malayalam Christian songs",
        "Bible Quiz Competition songs",
        ...availableTranslations.map((lang) => `${song.title} ${lang} lyrics`),
    ].join(", ");

    // Construct JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                    { "@type": "ListItem", "position": 2, "name": "Malayalam Songs", "item": `${SITE_URL}/malayalam-songs` },
                    { "@type": "ListItem", "position": 3, "name": song.title, "item": canonicalUrl }
                ]
            },
            {
                "@type": "MusicComposition",
                "name": song.title,
                "description": song.description,
                "url": canonicalUrl,
                "inLanguage": languageNames,
                "lyrics": lyricsExcerpt
                    ? {
                        "@type": "CreativeWork",
                        "text": lyricsExcerpt
                    }
                    : undefined
            },
            generateVideoSchema({
                title: `${song.title} - Christian Song Video and Lyrics`,
                description: seoDescription,
                videoUrl: song.videoUrl,
                thumbnailUrl: thumbnailUrl
            }),
            {
                "@type": "WebPage",
                "name": `${song.title} Lyrics`,
                "url": canonicalUrl,
                "description": seoDescription,
                "isPartOf": {
                    "@type": "WebSite",
                    "name": "Bible Quiz Competition",
                    "url": SITE_URL
                }
            }
        ]
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
            <SEO
                title={seoTitle}
                description={seoDescription}
                keywords={seoKeywords}
                author="Bible Quiz Competition"
                url={`/malayalam-songs/${song.slug}`}
                image={thumbnailUrl}
                structuredData={jsonLd}
            />

            <Navigation />

            <main className="flex-grow w-full py-8 px-4 md:px-8 lg:px-12">
                <div className="flex justify-between items-center max-w-7xl mx-auto mb-6">
                    <Button
                        variant="ghost"
                        className="pl-0 hover:bg-transparent hover:text-blue-600"
                        onClick={() => navigate("/malayalam-songs")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Malayalam Songs
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
