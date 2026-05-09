import { Helmet } from "react-helmet-async";
import AdSenseTag from "@/components/AdSenseTag";
import { generateVideoSchema } from "@/utils/video-seo";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Share2, Music2, Languages, Info } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { Song } from "@/data/songs";
import hindiSongsData from "@/data/hindi-songs.json";

const songs: Song[] = hindiSongsData as Song[];

const toQuerySlug = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const dedupe = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

const normalizeForMatch = (value: string) =>
    String(value || "")
        .toLowerCase()
        .replace(/[“”"']/g, "")
        .replace(/\s+/g, " ")
        .trim();

const decodeHexSlug = (value: string) => {
    const tokens = String(value || "")
        .toLowerCase()
        .split("-")
        .filter((t) => /^[0-9a-f]{2}$/.test(t));
    if (tokens.length < 6) return "";
    try {
        return decodeURIComponent(tokens.map((t) => `%${t}`).join(""));
    } catch {
        return "";
    }
};

type LyricSection = {
    verse?: string;
    lines: string[];
    chords?: string[];
};

const HindiSongDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const slugParam = decodeURIComponent(slug || "");
    const decodedLegacySlug = decodeHexSlug(slugParam);

    const song = songs.find((s) => {
        if (s.slug === slugParam) return true;
        if (decodedLegacySlug && normalizeForMatch(s.title) === normalizeForMatch(decodedLegacySlug)) return true;
        return false;
    });
    const [selectedLang] = useState("hindi");
    const [showChords, setShowChords] = useState(true);
    const [showTranslation, setShowTranslation] = useState(true);

    useEffect(() => {
        if (song && slugParam && song.slug !== slugParam) {
            navigate(`/hindi-songs/${song.slug}`, { replace: true });
        }
    }, [navigate, slugParam, song]);

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
    const canonicalUrl = `https://biblequizcompetition.com/hindi-songs/${song.slug}`;

    const plainTitle = toQuerySlug(song.title);

    const titleVariants = useMemo(() => {
        const variants = new Set<string>();
        variants.add(`${plainTitle} lyrics`);
        variants.add(`${plainTitle} hindi lyrics`);
        variants.add(`${plainTitle} lyrics in hindi`);
        variants.add(`${plainTitle} song lyrics`);
        variants.add(`${plainTitle} chords`);
        variants.add(`${plainTitle} meaning`);
        variants.add(`${plainTitle} hindi christian song`);
        variants.add(`${plainTitle} yeshu ke geet`);

        // Common Hindi transliteration variants (mai/main/mein, aaradhana/aradhna)
        variants.add(plainTitle.replace(/\bmai\b/g, "mein"));
        variants.add(plainTitle.replace(/\bmai\b/g, "main"));
        variants.add(plainTitle.replace(/\bmein\b/g, "main"));
        variants.add(plainTitle.replace(/aaradhana/g, "aradhna"));
        variants.add(plainTitle.replace(/prabhu/g, "yeshu"));

        return Array.from(variants)
            .map((v) => v.replace(/\s+/g, " ").trim())
            .filter((v) => v.length > 0)
            .slice(0, 12);
    }, [plainTitle]);

    const stats = useMemo(() => {
        const sections = currentTranslation?.lyrics?.length || 0;
        const lines = currentTranslation?.lyrics?.reduce((sum, section) => sum + (section.lines?.length || 0), 0) || 0;
        return { sections, lines };
    }, [currentTranslation]);

    const relatedSongs = useMemo(() => {
        const stopWords = new Set(["hai", "ho", "ki", "ke", "mein", "main", "mai", "hum", "tera", "teri"]);
        const tokens = plainTitle
            .split(/[^a-z0-9]+/)
            .filter((w) => w.length > 2 && !stopWords.has(w));

        if (tokens.length === 0) return [];

        const ranked = songs
            .filter((s) => s.slug !== song.slug)
            .map((s) => {
                const haystack = `${s.title} ${s.slug} ${s.description}`.toLowerCase();
                let score = 0;
                tokens.forEach((token) => {
                    if (haystack.includes(token)) score += 1;
                });
                return { song: s, score };
            })
            .filter((entry) => entry.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 4)
            .map((entry) => entry.song);

        return ranked;
    }, [plainTitle, song.slug]);

    const allLyricsText = useMemo(() => {
        const hindiText = currentTranslation?.lyrics?.flatMap((section) => section.lines || []).join("\n") || "";
        const englishText = englishTranslation?.lyrics?.flatMap((section) => section.lines || []).join("\n") || "";
        return { hindiText, englishText };
    }, [currentTranslation, englishTranslation]);

    const displaySections = useMemo<LyricSection[]>(() => {
        const sections = currentTranslation?.lyrics || [];
        if (sections.length !== 1) return sections as LyricSection[];

        const only = sections[0];
        const lines = (only?.lines || []).filter(Boolean);
        const looksLikeFlatBlock = lines.length >= 10 && lines.every((l) => l.length <= 48);
        if (!looksLikeFlatBlock) return sections as LyricSection[];

        const grouped: LyricSection[] = [];
        for (let i = 0; i < lines.length; i += 4) {
            grouped.push({
                verse: String(grouped.length + 1),
                lines: lines.slice(i, i + 4),
            });
        }
        return grouped;
    }, [currentTranslation]);

    const songAliases = useMemo(() => {
        const base = plainTitle;
        return dedupe([
            base,
            base.replace(/\bmein\b/g, "main"),
            base.replace(/\bmain\b/g, "mein"),
            base.replace(/\bmai\b/g, "main"),
            base.replace(/yeshu/g, "jesus"),
            base.replace(/stuti/g, "stutiya"),
            `${base} lyrics`,
            `${base} lyrics in hindi`,
            `${base} chords`,
        ]).slice(0, 10);
    }, [plainTitle]);

    const hasChords = Object.values(song.translations).some(t =>
        t.lyrics.some(l => l.chords && l.chords.length > 0)
    );
    const hasEnglish = !!song.translations['english'];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": `${song.title} Lyrics in Hindi`,
                "url": canonicalUrl,
                "description": `Hindi Christian song lyrics, chords, and meaning for ${song.title}.`,
                "inLanguage": ["hi", "en"]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://biblequizcompetition.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Hindi Songs",
                        "item": "https://biblequizcompetition.com/hindi-songs"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": song.title,
                        "item": canonicalUrl
                    }
                ]
            },
            {
                "@type": "MusicComposition",
                "name": song.title,
                "description": song.description,
                "lyrics": {
                    "@type": "CreativeWork",
                    "text": allLyricsText.hindiText
                },
                "alternateName": songAliases,
                "inLanguage": "hi"
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `${song.title} lyrics कहाँ मिलेंगी?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `इस पेज पर ${song.title} के full Hindi lyrics और worship-friendly format उपलब्ध है।`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Is ${song.title} available with chords?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": hasChords
                                ? "Yes, available chord lines are displayed above the corresponding lyric lines."
                                : "Chords are being added progressively as verified patterns become available."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Can I read ${song.title} meaning in English?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": hasEnglish
                                ? "Yes, English meaning lines are available. Toggle the English meaning switch."
                                : "English meaning is being expanded and may be added soon for this song."
                        }
                    }
                ]
            },
            ...(song.videoUrl ? [generateVideoSchema({
                title: `${song.title} - Hindi Christian Song Lyrics & Video`,
                description: `Watch video and read lyrics for the Hindi Christian song "${song.title}".`,
                videoUrl: song.videoUrl,
                thumbnailUrl: thumbnailUrl
            })] : [])
        ]
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

    return (
        <div className="min-h-screen bg-gray-50/30">
            <Helmet>
                <title>{`${song.title} Lyrics, Meaning${hasChords ? ' & Guitar Chords' : ''} | Hindi Christian Song`}</title>
                <meta
                    name="description"
                    content={`Read full ${song.title} lyrics in Hindi, understand the meaning line by line, and practice worship with${hasChords ? ' guitar chords,' : ''} transliteration, and Bible-based reflection.`}
                />
                <meta
                    name="keywords"
                    content={dedupe([
                        `${song.title} lyrics`,
                        `${song.title} lyrics in hindi`,
                        `${song.title} meaning`,
                        `${song.title} chords`,
                        "hindi christian songs lyrics",
                        "yeshu ke geet",
                        "worship songs hindi",
                        ...songAliases.slice(0, 4),
                    ]).join(", ")}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="music.song" />
                <meta property="og:title" content={`${song.title} Lyrics in Hindi, Meaning${hasChords ? " & Chords" : ""}`} />
                <meta property="og:description" content={`Explore line-by-line lyrics, meaning, and worship notes for ${song.title}.`} />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>
            <AdSenseTag />

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
                                Full Hindi lyrics with worship-friendly structure, guitar chords, English meaning, and search variants.
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
                                <div className="space-y-10">
                                    {displaySections.map((section, index) => (
                                        <div key={index} className="relative">
                                            <div className="space-y-3">
                                                {section.lines.map((line, lineIndex) => (
                                                    <div key={lineIndex} className="flex flex-col items-start">
                                                        {showChords && section.chords && section.chords[lineIndex] && (
                                                            <p className="text-orange-600 font-mono text-sm md:text-base font-black mb-1 tracking-[0.1em] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100 shadow-sm">
                                                                {section.chords[lineIndex]}
                                                            </p>
                                                        )}
                                                        <p className="font-medium text-gray-900 text-2xl md:text-3xl text-left leading-tight font-urbanist">
                                                            {line}
                                                        </p>
                                                        {showTranslation && englishTranslation?.lyrics?.[index]?.lines?.[lineIndex] && (
                                                            <p className="text-gray-500 text-sm md:text-base italic font-medium text-left mt-1">
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

                        <div className="mt-8 grid grid-cols-1 gap-6">
                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">About This Song</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>{song.title}</strong> is a popular Hindi Christian worship song used in personal devotion,
                                        church prayer meetings, and youth fellowship gatherings. On this page you can study the lyrics deeply,
                                        sing with confidence, and reflect on the spiritual message behind each section.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        This page currently contains <strong>{stats.sections}</strong> lyric sections and <strong>{stats.lines}</strong> lyric lines.
                                        {hasChords ? " Chords are included for worship leaders and guitar players." : " Chords are being added as they become available."}
                                        {hasEnglish ? " English meaning is also available for bilingual worship preparation." : " English meaning support is being expanded."}
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Quick Song Facts</h2>
                                    <ul className="text-gray-700 text-sm space-y-2">
                                        <li><strong>Primary Language:</strong> Hindi</li>
                                        <li><strong>Total Sections:</strong> {stats.sections}</li>
                                        <li><strong>Total Lines:</strong> {stats.lines}</li>
                                        <li><strong>Chords Available:</strong> {hasChords ? "Yes" : "Not yet"}</li>
                                        <li><strong>English Meaning:</strong> {hasEnglish ? "Yes" : "Not yet"}</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Search Variations People Use</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {titleVariants.map((variant) => (
                                            <span
                                                key={variant}
                                                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold"
                                            >
                                                {variant}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Also Searched As</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {songAliases.map((alias) => (
                                            <span
                                                key={alias}
                                                className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold"
                                            >
                                                {alias}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
                                    <div className="space-y-4 text-gray-700">
                                        <div>
                                            <h3 className="font-bold text-gray-900">Can I use this song in church worship?</h3>
                                            <p className="text-sm mt-1">Yes. This song is commonly used for congregational worship, prayer meetings, and devotion time.</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Do you provide guitar chords for this song?</h3>
                                            <p className="text-sm mt-1">{hasChords ? "Yes, available chord lines are shown with the lyrics." : "Not fully yet. We are progressively adding verified chord patterns."}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Is English meaning available?</h3>
                                            <p className="text-sm mt-1">{hasEnglish ? "Yes, enable “English Meaning” using the toggle in the sidebar." : "Meaning notes are being expanded; check this page again for updates."}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {relatedSongs.length > 0 && (
                                <Card className="rounded-3xl border-gray-100">
                                    <CardContent className="p-8 space-y-4">
                                        <h2 className="text-2xl font-bold text-gray-900">Related Hindi Worship Songs</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {relatedSongs.map((related) => (
                                                <Button
                                                    key={related.slug}
                                                    variant="outline"
                                                    className="justify-start h-auto py-3 px-4 font-semibold"
                                                    onClick={() => navigate(`/hindi-songs/${related.slug}`)}
                                                >
                                                    {related.title}
                                                </Button>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HindiSongDetail;
