import { Helmet } from "react-helmet-async";
import AdSenseTag from "@/components/AdSenseTag";
import { generateVideoSchema } from "@/utils/video-seo";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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

const isMostlyRoman = (line: string) => /[a-zA-Z]/.test(line) && !/[\u0900-\u097f]/.test(line);
const normalizeLineKey = (line: string) =>
    line.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
const looksCorruptedLegacyEncoding = (line: string) => {
    const text = String(line || "");
    if (!text) return false;
    if (/[%^~`{}[\]|\\<>]/.test(text)) return true;
    if (/[;ÊÅÆ]/.test(text)) return true;
    const internalCaps = (text.match(/[a-z][A-Z]/g) || []).length;
    if (internalCaps >= 2) return true;
    if (/(AaraQ|yaIS|prao|sva|ipta|raoTI|sahayak|jaIvana|maora|maoM|Aayaa)/i.test(text)) return true;
    if (/;h'kq|eq>|n;k|rw\s+viuh|cjlk|vk-+/.test(text)) return true;
    if (!/[\u0900-\u097f]/.test(text) && /[a-z]/i.test(text)) {
        const tinyTokens = text.split(/\s+/).filter((t) => /^[a-z]{1,3}$/i.test(t)).length;
        if (tinyTokens >= 4) return true;
    }
    return false;
};

const DEVANAGARI_TO_LATIN: Record<string, string> = {
    "अ": "a", "आ": "aa", "इ": "i", "ई": "ee", "उ": "u", "ऊ": "oo", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",
    "ऋ": "ri", "ं": "n", "ँ": "n", "ः": "h", "्": "", "़": "",
    "ा": "aa", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo", "े": "e", "ै": "ai", "ो": "o", "ौ": "au",
    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "n",
    "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "n",
    "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "व": "v",
    "श": "sh", "ष": "sh", "स": "s", "ह": "h",
    "ळ": "l", "क्ष": "ksh", "ज्ञ": "gy",
};

const transliterateHindiToHinglish = (text: string) => {
    const chars = Array.from(text);
    let out = "";
    for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        if (ch === " " || ch === "," || ch === "." || ch === "!" || ch === "?" || ch === "।" || ch === "-") {
            out += ch === "।" ? "." : ch;
            continue;
        }
        const two = `${ch}${chars[i + 1] || ""}`;
        if (DEVANAGARI_TO_LATIN[two]) {
            out += DEVANAGARI_TO_LATIN[two];
            i += 1;
            continue;
        }
        out += DEVANAGARI_TO_LATIN[ch] ?? ch;
    }
    return out
        .replace(/\s+/g, " ")
        .replace(/\b([a-z])/g, (m) => m.toUpperCase())
        .trim();
};

const HindiSongDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const slugParam = decodeURIComponent(slug || "");
    const decodedLegacySlug = decodeHexSlug(slugParam);

    const song = songs.find((s) => {
        if (s.slug === slugParam) return true;
        if (decodedLegacySlug && normalizeForMatch(s.title) === normalizeForMatch(decodedLegacySlug)) return true;
        return false;
    });
    const [selectedLang, setSelectedLang] = useState("hindi");
    const [showChords, setShowChords] = useState(true);

    const backState = (location.state as { from?: string; returnScrollY?: number } | null) || null;
    const backHref = backState?.from || "/hindi-songs";

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

    const currentTranslation =
        selectedLang === "hinglish"
            ? (song.translations.hinglish || (song.translations.hindi
                ? {
                    lang: "Hinglish",
                    lyrics: (song.translations.hindi.lyrics || []).map((section) => ({
                        ...section,
                        lines: (section.lines || []).map(transliterateHindiToHinglish),
                    })),
                }
                : undefined))
            : song.translations[selectedLang];
    const englishTranslation = song.translations["english"];
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

    const languageTabs = useMemo(
        () => [
            { key: "hindi", label: "Hindi" },
            { key: "hinglish", label: "Hinglish" },
            { key: "english", label: "English" },
            { key: "malayalam", label: "Malayalam" },
        ],
        []
    );

    const availableLanguageLabels = useMemo(
        () =>
            languageTabs
                .filter((tab) => song.translations[tab.key]?.lyrics?.length)
                .map((tab) => tab.label),
        [languageTabs, song.translations]
    );
    const languagesText = availableLanguageLabels.join(", ");
    const seoLanguageText = useMemo(() => {
        if (availableLanguageLabels.length === 0) return "Hindi";
        if (availableLanguageLabels.length === 1) return availableLanguageLabels[0];
        if (availableLanguageLabels.length === 2) return `${availableLanguageLabels[0]} & ${availableLanguageLabels[1]}`;
        if (availableLanguageLabels.length === 3) {
            return `${availableLanguageLabels[0]}, ${availableLanguageLabels[1]} & ${availableLanguageLabels[2]}`;
        }
        return `${availableLanguageLabels[0]}, ${availableLanguageLabels[1]} & more`;
    }, [availableLanguageLabels]);
    const seoTitle = `${song.title} Lyrics | ${seoLanguageText}`;

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
        const sections = (currentTranslation?.lyrics || []) as LyricSection[];
        const hasDevanagari = sections.some((s) => (s.lines || []).some((l) => /[\u0900-\u097f]/.test(l)));

        // 1) Remove Romanized duplicates from Hindi block when Devanagari text exists
        const shouldRunCorruptionFilter = selectedLang === "hindi";

        const cleaned = sections
            .map((section) => ({
                ...section,
                lines: (section.lines || []).filter((line) => {
                    if (shouldRunCorruptionFilter && looksCorruptedLegacyEncoding(line)) return false;
                    if (hasDevanagari && isMostlyRoman(line)) return false;
                    return true;
                }),
            }))
            .filter((section) => section.lines.length > 0);

        // 2) Collapse immediately repeated sections
        const deduped: LyricSection[] = [];
        for (const section of cleaned) {
            const key = (section.lines || []).map(normalizeLineKey).join("|");
            const prev = deduped[deduped.length - 1];
            const prevKey = prev ? (prev.lines || []).map(normalizeLineKey).join("|") : "";
            if (key && key === prevKey) continue;
            deduped.push(section);
        }

        // 3) If a song is fragmented into many single-line sections, merge them into compact stanzas.
        const oneLineCount = deduped.filter((s) => (s.lines || []).length === 1).length;
        const mostlySingleLine = deduped.length >= 8 && oneLineCount / deduped.length >= 0.7;
        if (mostlySingleLine) {
            const mergedSingles: LyricSection[] = [];
            let buffer: string[] = [];

            const flushBuffer = () => {
                if (buffer.length === 0) return;
                mergedSingles.push({ lines: [...buffer] });
                buffer = [];
            };

            for (const section of deduped) {
                const lines = section.lines || [];
                if (lines.length === 1) {
                    buffer.push(lines[0]);
                    if (buffer.length >= 2) flushBuffer();
                } else {
                    flushBuffer();
                    mergedSingles.push(section);
                }
            }
            flushBuffer();
            return mergedSingles;
        }

        if (deduped.length !== 1) return deduped;

        const only = deduped[0];
        const lines = (only?.lines || []).filter(Boolean);
        const looksLikeFlatBlock = lines.length >= 10 && lines.every((l) => l.length <= 48);
        if (!looksLikeFlatBlock) return deduped;

        const grouped: LyricSection[] = [];
        for (let i = 0; i < lines.length; i += 4) {
            grouped.push({
                verse: String(grouped.length + 1),
                lines: lines.slice(i, i + 4),
            });
        }
        return grouped;
    }, [currentTranslation, selectedLang]);

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
                <title>{seoTitle}</title>
                <meta
                    name="description"
                    content={`Read full ${song.title} lyrics in ${languagesText || "Hindi"}, understand meaning line by line, and practice worship with${hasChords ? " guitar chords," : ""} transliteration, and Bible-based reflection.`}
                />
                <meta
                    name="keywords"
                    content={dedupe([
                        `${song.title} lyrics`,
                        `${song.title} lyrics in hindi`,
                        `${song.title} lyrics in hinglish`,
                        `${song.title} lyrics in english`,
                        `${song.title} lyrics in malayalam`,
                        `${song.title} meaning`,
                        `${song.title} chords`,
                        "hindi christian songs lyrics",
                        "hinglish christian songs lyrics",
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
                    onClick={() =>
                        navigate(backHref, {
                            state: {
                                restoreScrollY: backState?.returnScrollY ?? 0,
                            },
                        })
                    }
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
                                Full lyrics in {languagesText || "Hindi"} with worship-friendly structure, guitar chords, and search variants.
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
                                            <Label className="text-sm font-bold text-gray-700">Language</Label>
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Use tabs in lyrics area</span>
                                        </div>
                                    </div>
                                    <div className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">Tabs</div>
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
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {languageTabs.map((tab) => (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() => setSelectedLang(tab.key)}
                                            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                                                selectedLang === tab.key
                                                    ? "bg-orange-100 text-orange-700"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {displaySections.length === 0 ? (
                                    <div className="max-w-2xl mx-auto text-left mt-2">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-urbanist">
                                            Lyrics unavailable
                                        </h2>
                                        {song.translations[selectedLang]?.lyrics?.length ? (
                                            <p className="text-gray-600 leading-relaxed">
                                                This song entry has corrupted source text. We are re-verifying and will update it with proper Unicode lyrics.
                                            </p>
                                        ) : (
                                            <p className="text-gray-600 leading-relaxed">
                                                This song is not yet available in {selectedLang.charAt(0).toUpperCase() + selectedLang.slice(1)}.
                                                Please switch to another language tab.
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                <div className="space-y-10 mt-2">
                                    {displaySections.map((section, index) => (
                                        <div key={index} className="relative">
                                            <div className="space-y-3">
                                                {section.lines.map((line, lineIndex) => (
                                                    <div
                                                        key={lineIndex}
                                                        className={`flex flex-col items-start ${lineIndex > 0 && lineIndex % 2 === 0 ? "mt-5" : ""}`}
                                                    >
                                                        {showChords && section.chords && section.chords[lineIndex] && (
                                                            <p className="text-orange-600 font-mono text-sm md:text-base font-black mb-1 tracking-[0.1em] bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100 shadow-sm">
                                                                {section.chords[lineIndex]}
                                                            </p>
                                                        )}
                                                        <p className="font-medium text-gray-900 text-xl md:text-2xl text-left leading-tight font-urbanist">
                                                            {line}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
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
                                    <p className="text-gray-700 leading-relaxed">
                                        You can switch between <strong>Hindi</strong>, <strong>Hinglish</strong>, <strong>English</strong>, and <strong>Malayalam</strong> tabs (where available)
                                        to read lyrics in your preferred format. This makes it easier for worship teams, youth fellowships, and family prayer groups to sing together
                                        with better understanding and pronunciation support.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        If you are searching for Christian song lyrics for church service, devotion time, or Bible study music practice, this page is designed to provide
                                        readable verse flow, chord-friendly lines, and language options in one place.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Related Resources</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Explore more Christian resources on Bible Quiz Competition including Hindi worship songs, English songs, Malayalam songs, and Bible stories for kids.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a href="/hindi-songs" className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold hover:bg-orange-100">Hindi Songs</a>
                                        <a href="/english-songs" className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100">English Songs</a>
                                        <a href="/malayalam-songs" className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold hover:bg-emerald-100">Malayalam Songs</a>
                                        <a href="/kids-stories" className="px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 text-sm font-semibold hover:bg-violet-100">Kids Stories</a>
                                    </div>
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
