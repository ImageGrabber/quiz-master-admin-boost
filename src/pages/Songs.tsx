import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { allSongs as songs } from "@/data/songs";
import { Music, PlayCircle, Search } from "lucide-react";
import { useState, useMemo } from "react";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const Songs = () => {
    const navigate = useNavigate();
    const [activeLetter, setActiveLetter] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Pre-compute letter counts and sorted/filtered songs
    const { letterCounts, filteredSongs, totalCount, hasSearchQuery } = useMemo(() => {
        const counts: Record<string, number> = {};
        ALPHABET.forEach(l => counts[l] = 0);
        const normalizedSearch = searchQuery.trim().toLowerCase();

        const sorted = [...songs].sort((a, b) =>
            a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
        );

        sorted.forEach(song => {
            const firstChar = song.title.charAt(0).toUpperCase();
            if (counts[firstChar] !== undefined) {
                counts[firstChar]++;
            }
        });

        const filteredByLetter = activeLetter
            ? sorted.filter(s => s.title.charAt(0).toUpperCase() === activeLetter)
            : sorted;
        const filtered = normalizedSearch
            ? filteredByLetter.filter(s =>
                s.title.toLowerCase().includes(normalizedSearch) ||
                s.description.toLowerCase().includes(normalizedSearch)
            )
            : filteredByLetter;

        return {
            letterCounts: counts,
            filteredSongs: filtered,
            totalCount: songs.length,
            hasSearchQuery: normalizedSearch.length > 0
        };
    }, [activeLetter, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Helmet>
                <title>Christian Devotional Songs | Bible Quiz Competition</title>
                <meta
                    name="description"
                    content="Listen to and read lyrics of popular Christian Malayalam devotional songs. Worship with our curated collection."
                />
                <link rel="canonical" href="https://biblequizcompetition.com/songs" />
            </Helmet>

            <Navigation />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold font-urbanist text-gray-900 mb-4">
                        Devotional Songs
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Worship along with our collection of beautiful Christian devotional songs. Read lyrics, watch videos, and lift your spirit.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search songs by title or description..."
                            className="pl-10 h-11 bg-white border-gray-200 focus-visible:ring-blue-200"
                        />
                    </div>
                </div>

                {/* A-Z Filter Bar */}
                <div className="max-w-5xl mx-auto mb-8">
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        {/* "All" button */}
                        <button
                            onClick={() => setActiveLetter(null)}
                            className={`
                                flex flex-col items-center px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200
                                ${!activeLetter
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                                }
                            `}
                        >
                            <span>All</span>
                            <span className={`text-[10px] font-medium mt-0.5 ${!activeLetter ? 'text-blue-100' : 'text-gray-400'}`}>
                                {totalCount}
                            </span>
                        </button>

                        {ALPHABET.map(letter => {
                            const count = letterCounts[letter];
                            const isActive = activeLetter === letter;
                            const hasItems = count > 0;

                            return (
                                <button
                                    key={letter}
                                    onClick={() => hasItems && setActiveLetter(letter)}
                                    disabled={!hasItems}
                                    className={`
                                        flex flex-col items-center min-w-[36px] px-2 py-2 rounded-xl text-sm font-bold transition-all duration-200
                                        ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                                            : hasItems
                                                ? 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 cursor-pointer'
                                                : 'bg-gray-100 text-gray-300 border border-gray-100 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    <span>{letter}</span>
                                    <span className={`text-[10px] font-medium mt-0.5 ${
                                        isActive ? 'text-blue-100' : hasItems ? 'text-gray-400' : 'text-gray-300'
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Results count */}
                <div className="max-w-7xl mx-auto mb-6">
                    <p className="text-sm text-gray-500 font-medium">
                        {activeLetter && hasSearchQuery && (
                            <>Showing <span className="text-blue-600 font-bold">{filteredSongs.length}</span> songs starting with "{activeLetter}" matching "{searchQuery.trim()}"</>
                        )}
                        {activeLetter && !hasSearchQuery && (
                            <>Showing <span className="text-blue-600 font-bold">{filteredSongs.length}</span> songs starting with "{activeLetter}"</>
                        )}
                        {!activeLetter && hasSearchQuery && (
                            <>Showing <span className="text-blue-600 font-bold">{filteredSongs.length}</span> songs matching "{searchQuery.trim()}"</>
                        )}
                        {!activeLetter && !hasSearchQuery && (
                            <>Showing all <span className="text-blue-600 font-bold">{totalCount}</span> songs</>
                        )}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {filteredSongs.map((song) => (
                        <Card
                            key={song.slug}
                            className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-none bg-white overflow-hidden"
                            onClick={() => navigate(`/songs/${song.slug}`)}
                        >
                            <div className="relative h-48 bg-gray-900 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img
                                    src={`https://img.youtube.com/vi/${song.videoUrl.split('/').pop()}/hqdefault.jpg`}
                                    alt={song.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80"
                                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                                />
                                <PlayCircle className="w-12 h-12 text-white/90 absolute z-20 group-hover:scale-110 transition-transform" />
                            </div>

                            <CardContent className="p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <Music className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                                    <h3 className="text-xl font-bold font-urbanist text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                                        {song.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 pl-8">
                                    {song.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Songs;
