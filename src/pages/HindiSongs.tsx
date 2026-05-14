import { Helmet } from "react-helmet-async";
import AdSenseTag from "@/components/AdSenseTag";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Music, PlayCircle, Search, Guitar } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import type { Song } from "@/data/songs";
import { Badge } from "@/components/ui/badge";
import hindiSongsData from "@/data/hindi-songs.json";
import { resolveSongThumbnail } from "@/utils/song-thumbnails";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const songs: Song[] = hindiSongsData as Song[];
const ITEMS_PER_PAGE = 24;
const HINDI_SONGS_SCROLL_KEY = "hindiSongsScrollRestore";

const HindiSongs = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeLetter, setActiveLetter] = useState<string | null>(searchParams.get("letter") || null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [chordsOnly, setChordsOnly] = useState(searchParams.get("chords") === "1");
    
    useEffect(() => {
        const restoreScrollY = (location.state as { restoreScrollY?: number } | null)?.restoreScrollY;
        if (typeof restoreScrollY === "number" && restoreScrollY > 0) {
            requestAnimationFrame(() => {
                window.scrollTo({ top: restoreScrollY, behavior: "auto" });
            });
            navigate(location.pathname + location.search, { replace: true, state: null });
            return;
        }

        // Fallback for browser back/forward where route state is not present.
        const raw = sessionStorage.getItem(HINDI_SONGS_SCROLL_KEY);
        if (!raw) return;
        try {
            const saved = JSON.parse(raw) as { path: string; y: number };
            const currentPath = `${location.pathname}${location.search}`;
            if (saved.path === currentPath && typeof saved.y === "number" && saved.y > 0) {
                requestAnimationFrame(() => {
                    window.scrollTo({ top: saved.y, behavior: "auto" });
                });
            }
        } catch {
            // ignore malformed session value
        } finally {
            sessionStorage.removeItem(HINDI_SONGS_SCROLL_KEY);
        }
    }, [location.pathname, location.search, location.state, navigate]);

    const updateParams = (next: { letter?: string | null; q?: string; chords?: boolean; page?: number }) => {
        const params = new URLSearchParams(searchParams);
        if (next.letter !== undefined) {
            if (next.letter) params.set("letter", next.letter);
            else params.delete("letter");
        }
        if (next.q !== undefined) {
            if (next.q.trim()) params.set("q", next.q.trim());
            else params.delete("q");
        }
        if (next.chords !== undefined) {
            if (next.chords) params.set("chords", "1");
            else params.delete("chords");
        }
        if (next.page !== undefined) {
            const page = Number(next.page);
            if (Number.isFinite(page) && page > 1) params.set("page", String(page));
            else params.delete("page");
        }
        setSearchParams(params, { replace: true });
    };

    const { filteredSongs, counts, totalVisible } = useMemo(() => {
        const counts: Record<string, number> = {};
        ALPHABET.forEach(l => counts[l] = 0);
        const normalizedSearch = searchQuery.trim().toLowerCase();

        const sorted = [...songs].sort((a, b) =>
            a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
        );

        const filtered = sorted.filter(song => {
            const matchesSearch = !normalizedSearch || 
                song.title.toLowerCase().includes(normalizedSearch) ||
                song.description.toLowerCase().includes(normalizedSearch);
            
            const matchesLetter = !activeLetter || 
                song.title.charAt(0).toUpperCase() === activeLetter;

            const hasChords = chordsOnly ? Object.values(song.translations).some(t => 
                t.lyrics.some(l => l.chords && l.chords.length > 0)
            ) : true;

            return matchesSearch && matchesLetter && hasChords;
        });

        // Update counts based on CURRENT search/chords filter but NOT the letter filter
        sorted.forEach(song => {
            const matchesSearch = !normalizedSearch || 
                song.title.toLowerCase().includes(normalizedSearch) ||
                song.description.toLowerCase().includes(normalizedSearch);
            
            const hasChords = chordsOnly ? Object.values(song.translations).some(t => 
                t.lyrics.some(l => l.chords && l.chords.length > 0)
            ) : true;

            if (matchesSearch && hasChords) {
                const firstChar = song.title.charAt(0).toUpperCase();
                if (counts[firstChar] !== undefined) counts[firstChar]++;
            }
        });

        return { 
            filteredSongs: filtered, 
            counts, 
            totalVisible: sorted.filter(s => {
                const matchesSearch = !normalizedSearch || 
                    s.title.toLowerCase().includes(normalizedSearch);
                const hasChords = chordsOnly ? Object.values(s.translations).some(t => 
                    t.lyrics.some(l => l.chords && l.chords.length > 0)
                ) : true;
                return matchesSearch && hasChords;
            }).length
        };
    }, [activeLetter, searchQuery, chordsOnly]);

    const totalPages = Math.max(1, Math.ceil(filteredSongs.length / ITEMS_PER_PAGE));
    const currentPageRaw = Number(searchParams.get("page") || "1");
    const currentPage = Number.isFinite(currentPageRaw)
        ? Math.min(Math.max(1, Math.floor(currentPageRaw)), totalPages)
        : 1;
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedSongs = filteredSongs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const pageNumbers = useMemo(() => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
        if (currentPage <= 4) return [1, 2, 3, 4, 5, -1, totalPages];
        if (currentPage >= totalPages - 3) return [1, -1, totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
    }, [currentPage, totalPages]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Helmet>
                <title>Hindi Christian Songs Lyrics & Guitar Chords | Bible Quiz Competition</title>
                <meta
                    name="description"
                    content="Browse detailed Hindi Christian song lyrics with guitar chords, English meaning, and worship-ready formatting. Find Masih Geet and Yeshu Ke Geet with search-friendly pages."
                />
                <meta
                    name="keywords"
                    content="hindi christian songs lyrics, yeshu ke geet, masih geet lyrics, hindi worship songs lyrics, christian song chords hindi"
                />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <link rel="canonical" href="https://biblequizcompetition.com/hindi-songs" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "CollectionPage",
                                "name": "Hindi Christian Songs Lyrics",
                                "url": "https://biblequizcompetition.com/hindi-songs",
                                "description": "A collection of Hindi Christian song lyrics, chords, and worship resources.",
                                "inLanguage": "hi"
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "Do these Hindi Christian songs include chords?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Many songs include guitar chord lines. You can use the chords filter to show songs with chords."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Can I find Hindi lyrics and English meaning on this site?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. Song detail pages provide Hindi lyrics and, where available, English meaning lines."
                                        }
                                    }
                                ]
                            }
                        ]
                    })}
                </script>
            </Helmet>
            <AdSenseTag />

            <Navigation />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold font-urbanist text-gray-900 mb-4">
                        Hindi Christian Songs
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Browse detailed Hindi Christian devotional songs and Masih Geet. Read lyrics, view chords, and use search-focused song pages for worship and study.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSearchQuery(value);
                                updateParams({ q: value, page: 1 });
                            }}
                            placeholder="Search songs by title or description..."
                            className="pl-10 h-11 bg-white border-gray-200 focus-visible:ring-orange-200"
                        />
                    </div>
                    
                    <button
                        onClick={() => {
                            const next = !chordsOnly;
                            setChordsOnly(next);
                            updateParams({ chords: next, page: 1 });
                        }}
                        className={`flex items-center gap-2 px-4 h-11 rounded-xl font-bold transition-all duration-200 border whitespace-nowrap
                            ${chordsOnly 
                                ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-100' 
                                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
                            }`}
                    >
                        <Guitar className={`w-4 h-4 ${chordsOnly ? 'text-white' : 'text-gray-400'}`} />
                        Guitar Chords
                    </button>
                </div>

                {/* A-Z Filter Bar */}
                <div className="max-w-5xl mx-auto mb-8">
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        <button
                            onClick={() => {
                                setActiveLetter(null);
                                updateParams({ letter: null, page: 1 });
                            }}
                            className={`flex flex-col items-center px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200
                                ${!activeLetter
                                    ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 scale-105'
                                    : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200'
                                }`}
                        >
                            <span>All</span>
                            <span className={`text-[10px] font-medium mt-0.5 ${!activeLetter ? 'text-orange-100' : 'text-gray-400'}`}>
                                {totalVisible}
                            </span>
                        </button>

                        {ALPHABET.map(letter => {
                            const count = counts[letter];
                            const isActive = activeLetter === letter;
                            const hasItems = count > 0;

                            return (
                                <button
                                    key={letter}
                                    onClick={() => {
                                        if (!hasItems) return;
                                        setActiveLetter(letter);
                                        updateParams({ letter, page: 1 });
                                    }}
                                    disabled={!hasItems}
                                    className={`flex flex-col items-center min-w-[36px] px-2 py-2 rounded-xl text-sm font-bold transition-all duration-200
                                        ${isActive
                                            ? 'bg-orange-600 text-white shadow-lg shadow-orange-200 scale-105'
                                            : hasItems
                                                ? 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200 cursor-pointer'
                                                : 'bg-gray-100 text-gray-300 border border-gray-100 cursor-not-allowed'
                                        }`}
                                >
                                    <span>{letter}</span>
                                    <span className={`text-[10px] font-medium mt-0.5 ${
                                        isActive ? 'text-orange-100' : hasItems ? 'text-gray-400' : 'text-gray-300'
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mb-6">
                    <p className="text-sm text-gray-500 font-medium">
                        {chordsOnly && <span className="mr-2 inline-flex items-center text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Chords Only</span>}
                        {activeLetter && (
                            <>Showing <span className="text-orange-600 font-bold">{filteredSongs.length}</span> songs starting with "{activeLetter}"</>
                        )}
                        {!activeLetter && (
                            <>Showing all <span className="text-orange-600 font-bold">{filteredSongs.length}</span> songs</>
                        )}
                        {searchQuery && <> matching "{searchQuery.trim()}"</>}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Page {currentPage} of {totalPages}
                        {" · "}
                        Showing {filteredSongs.length === 0 ? 0 : startIndex + 1}-
                        {Math.min(startIndex + ITEMS_PER_PAGE, filteredSongs.length)} of {filteredSongs.length}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {paginatedSongs.map((song) => {
                        const hasChords = Object.values(song.translations).some(t => 
                            t.lyrics.some(l => l.chords && l.chords.length > 0)
                        );

                        return (
                            <Card
                                key={song.slug}
                                className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-none bg-white overflow-hidden flex flex-col"
                                onClick={() => {
                                    sessionStorage.setItem(
                                        HINDI_SONGS_SCROLL_KEY,
                                        JSON.stringify({
                                            path: `${location.pathname}${location.search}`,
                                            y: window.scrollY,
                                        })
                                    );
                                    navigate(`/hindi-songs/${song.slug}`, {
                                        state: {
                                            from: `${location.pathname}${location.search}`,
                                            returnScrollY: window.scrollY,
                                        },
                                    });
                                }}
                            >
                                <div className="relative h-48 bg-gradient-to-br from-orange-900 to-amber-800 flex items-center justify-center overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                    {song.videoUrl || song.thumbnailUrl ? (
                                        <img
                                            src={resolveSongThumbnail(song)}
                                            alt={song.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                        />
                                    ) : null}
                                    <PlayCircle className="w-12 h-12 text-white/90 absolute z-20 group-hover:scale-110 transition-transform" />
                                    
                                    {hasChords && (
                                        <div className="absolute top-4 right-4 z-20">
                                            <Badge className="bg-orange-600/90 text-white border-none backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-lg">
                                                <Guitar className="w-3 h-3" />
                                                <span className="text-[10px] font-bold uppercase tracking-wider">Chords</span>
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-6 flex-grow flex flex-col">
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="p-1.5 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                                            <Music className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <h3 className="text-xl font-bold font-urbanist text-gray-900 leading-tight group-hover:text-orange-600 transition-colors">
                                            {song.title}
                                        </h3>
                                    </div>
                                    <p className="text-sm text-gray-500 line-clamp-2 pl-10 mb-4 flex-grow">
                                        {song.description}
                                    </p>
                                    <div className="pl-10 flex items-center gap-2">
                                        <div className="h-0.5 w-8 bg-orange-100 rounded-full group-hover:w-12 transition-all duration-300" />
                                        <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Read Lyrics</span>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {totalPages > 1 && (
                    <div className="max-w-7xl mx-auto mt-8 flex flex-wrap items-center justify-center gap-2">
                        <button
                            onClick={() => updateParams({ page: currentPage - 1 })}
                            disabled={currentPage === 1}
                            className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange-300 hover:text-orange-600"
                        >
                            Previous
                        </button>
                        {pageNumbers.map((p, idx) =>
                            p === -1 ? (
                                <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">…</span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => updateParams({ page: p })}
                                    className={`px-3 py-2 text-sm rounded-lg border ${
                                        p === currentPage
                                            ? "bg-orange-600 text-white border-orange-600"
                                            : "bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:text-orange-600"
                                    }`}
                                >
                                    {p}
                                </button>
                            )
                        )}
                        <button
                            onClick={() => updateParams({ page: currentPage + 1 })}
                            disabled={currentPage === totalPages}
                            className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-orange-300 hover:text-orange-600"
                        >
                            Next
                        </button>
                    </div>
                )}

                <section className="max-w-5xl mx-auto mt-12 grid md:grid-cols-2 gap-6">
                    <Card className="border-gray-100">
                        <CardContent className="p-6 space-y-3">
                            <h2 className="text-xl font-bold text-gray-900">Why These Hindi Song Pages Rank Better</h2>
                            <p className="text-sm text-gray-600">
                                Each song page is optimized with exact-match lyric intent, structured layout, optional guitar chords, and internal linking to related Hindi worship songs.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-gray-100">
                        <CardContent className="p-6 space-y-3">
                            <h2 className="text-xl font-bold text-gray-900">Common Searches</h2>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <Badge variant="secondary">hindi christian songs lyrics</Badge>
                                <Badge variant="secondary">yeshu ke geet lyrics</Badge>
                                <Badge variant="secondary">masih geet hindi</Badge>
                                <Badge variant="secondary">hindi worship songs chords</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default HindiSongs;
