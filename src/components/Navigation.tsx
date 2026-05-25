import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X, Brain, ChevronDown, Music, Trophy } from "lucide-react";
import { publicPages } from "@/data/indexData";

export function Navigation({ transparent = false }: { transparent?: boolean }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [songsDropdownOpen, setSongsDropdownOpen] = useState(false);
  const songsDropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof publicPages>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dedupedSearchPages = useMemo(
    () => Array.from(new Map(publicPages.map((page) => [page.path, page])).values()),
    []
  );

  // Handle scroll for glassmorphism effect if transparent
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('header')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // Close songs dropdown when clicking outside
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (songsDropdownRef.current && !songsDropdownRef.current.contains(event.target as Node)) {
        setSongsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      const scored = dedupedSearchPages
        .map((page) => {
          const title = page.title.toLowerCase();
          const category = page.category.toLowerCase();
          const path = page.path.toLowerCase();
          const titleStartsWith = title.startsWith(query);
          const titleIncludes = title.includes(query);
          const categoryIncludes = category.includes(query);
          const pathIncludes = path.includes(query);

          if (!titleIncludes && !categoryIncludes && !pathIncludes) return null;

          let score = 0;
          if (titleStartsWith) score += 60;
          if (titleIncludes) score += 30;
          if (categoryIncludes) score += 10;
          if (pathIncludes) score += 8;
          if (page.category.toLowerCase().includes("song")) score += 6;

          return { page, score };
        })
        .filter((item): item is { page: (typeof publicPages)[number]; score: number } => Boolean(item))
        .sort((a, b) => b.score - a.score)
        .map((item) => item.page);

      setSearchResults(scored);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, dedupedSearchPages]);

  // Open/close search overlay side effects
  useEffect(() => {
    if (!isSearchOpen) return;

    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(timer);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isSearchOpen]);

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setIsSearchOpen(false);
  };

  const navItemClass = transparent && !isScrolled 
    ? "text-base md:text-lg text-white/80 hover:text-white font-urbanist font-light transition-colors"
    : "text-base md:text-lg text-gray-600 hover:text-gray-900 font-urbanist font-light transition-colors";

  return (
    <header className={`
      ${transparent ? 'fixed' : 'relative'} 
      top-0 left-0 right-0 z-[100] transition-all duration-500 flex items-center justify-between p-6 px-6 md:px-8 lg:px-12
      ${transparent && isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-4 shadow-sm' : ''}
      ${transparent && !isScrolled ? 'bg-transparent py-8' : (!transparent ? 'bg-white' : '')}
    `}>
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors shadow-sm ${transparent && !isScrolled ? 'bg-white' : 'bg-black'}`}>
            <Brain className={`w-3 h-3 ${transparent && !isScrolled ? 'text-black' : 'text-white'}`} />
          </div>
          <span className={`text-xl md:text-2xl font-urbanist font-bold transition-all ${transparent && !isScrolled ? 'text-white drop-shadow-sm' : 'text-gray-900'}`}>Bible Quiz Competition</span>
        </div>

        <nav className="hidden md:flex items-center space-x-7">
          <button onClick={() => navigate("/bible-questions-and-answers-hub")} className={navItemClass}>Bible Q&A</button>

          {/* Competitions - Prominent CTA */}
          <button
            onClick={() => navigate("/quiz-arena/name")}
            className={`flex items-center gap-1.5 text-base md:text-lg font-urbanist font-semibold transition-all duration-300 rounded-full px-4 py-1.5 ${
              transparent && !isScrolled
                ? "bg-gradient-to-r from-amber-400/90 to-orange-500/90 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105"
                : "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-105"
            }`}
          >
            <Trophy className="w-4 h-4" />
            Competitions
          </button>

          {/* Songs Dropdown */}
          <div ref={songsDropdownRef} className="relative">
            <button
              onClick={() => setSongsDropdownOpen(o => !o)}
              className={`flex items-center gap-1 ${navItemClass}`}
            >
              <Music className="w-4 h-4" />
              Songs
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${songsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {songsDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl border border-gray-200/80 z-50 min-w-[220px] py-2 backdrop-blur-lg">
                <button
                  onClick={() => { setSongsDropdownOpen(false); navigate('/malayalam-songs'); }}
                  className="w-full text-left px-5 py-3 hover:bg-gray-50 font-urbanist font-light text-base text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Malayalam Songs
                </button>
                <button
                  onClick={() => { setSongsDropdownOpen(false); navigate('/english-songs'); }}
                  className="w-full text-left px-5 py-3 hover:bg-gray-50 font-urbanist font-light text-base text-gray-700 hover:text-gray-900 transition-colors"
                >
                  English Hymns
                </button>
                <button
                  onClick={() => { setSongsDropdownOpen(false); navigate('/hindi-songs'); }}
                  className="w-full text-left px-5 py-3 hover:bg-gray-50 font-urbanist font-light text-base text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Hindi Songs
                </button>
              </div>
            )}
          </div>

          <button onClick={() => navigate("/bible-questions-answered")} className={navItemClass}>Bible Answers</button>
          <button onClick={() => navigate("/articles")} className={navItemClass}>Articles</button>
          <button
            onClick={() => navigate("/kids-stories")}
            className={`text-base md:text-lg font-urbanist font-light transition-colors ${
              transparent && !isScrolled
                ? "text-white/80 hover:text-white"
                : "text-orange-600 hover:text-orange-700"
            }`}
          >
            Kids Stories
          </button>
          <button onClick={() => navigate("/help")} className={navItemClass}>Help</button>

        </nav>
      </div>

      <div className="flex items-center space-x-3">
        {/* Search Icon */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(true)}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
            ${transparent && !isScrolled
              ? "text-white/80 hover:text-white hover:bg-white/15"
              : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"}
          `}
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        <button className={`md:hidden transition-colors ${transparent && !isScrolled ? 'text-white' : 'text-gray-900'}`} onClick={() => setMobileMenuOpen((open) => !open)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200/80 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 backdrop-blur-xl">
          <button className="text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-3.5 text-left font-urbanist font-light border-b border-gray-100" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A</button>

          {/* Competitions - Prominent mobile link */}
          <button
            className="flex items-center gap-2 px-5 py-3.5 text-left font-urbanist font-semibold border-b border-gray-100 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 hover:from-amber-100 hover:to-orange-100 transition-colors"
            onClick={() => { setMobileMenuOpen(false); navigate("/quiz-arena/name"); }}
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            Competitions
            <span className="ml-auto text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full">Live</span>
          </button>

          <button className="text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-3.5 text-left font-urbanist font-light border-b border-gray-100" onClick={() => { setMobileMenuOpen(false); navigate("/malayalam-songs"); }}>Malayalam Songs</button>
          <button className="text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-3.5 text-left font-urbanist font-light border-b border-gray-100" onClick={() => { setMobileMenuOpen(false); navigate("/english-songs"); }}>English Hymns</button>
          <button className="text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-3.5 text-left font-urbanist font-light border-b border-gray-100" onClick={() => { setMobileMenuOpen(false); navigate("/hindi-songs"); }}>Hindi Songs</button>
          <button className="text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-3.5 text-left font-urbanist font-light border-b border-gray-100" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-answered"); }}>Bible Answers</button>
          <button className="text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-3.5 text-left font-urbanist font-light border-b border-gray-100" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
          <button className="text-base text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-5 py-3.5 text-left font-urbanist font-medium border-b border-gray-100" onClick={() => { setMobileMenuOpen(false); navigate("/kids-stories"); }}>Kids Stories</button>
          <button className="text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-5 py-3.5 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>

          <div className="border-t border-gray-200 px-4 py-3 flex flex-col gap-2">
            <button className="text-base text-gray-600 hover:text-gray-900 px-1 py-2 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
            <Button className="bg-black text-white text-base px-4 py-3 font-urbanist font-light rounded-xl w-full" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</Button>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 z-[200] bg-white">
          <div className="h-full flex flex-col">
            <div className="px-6 md:px-10 py-5 border-b border-gray-100">
              <div className="max-w-5xl mx-auto flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search pages, songs, articles, stories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 pl-12 pr-12 text-base md:text-lg font-urbanist font-light border-gray-300"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                      aria-label="Clear search"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  className="text-base font-urbanist font-light"
                  onClick={() => setIsSearchOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 md:px-10 py-5">
              <div className="max-w-5xl mx-auto">
                {!searchQuery.trim() ? (
                  <div className="text-gray-500 font-urbanist font-light text-base">
                    Start typing to search the whole site, including Malayalam, English, and Hindi songs.
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="text-gray-500 font-urbanist font-light text-base">
                    No results found for "{searchQuery}".
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-500 font-urbanist font-light px-2 pb-2">
                      {searchResults.length} result{searchResults.length === 1 ? "" : "s"}
                    </div>
                    {searchResults.map((page, index) => (
                      <button
                        key={`${page.path}-${index}`}
                        onClick={() => handleSearchSelect(page.path)}
                        className="w-full text-left rounded-xl border border-gray-100 hover:border-gray-300 hover:bg-gray-50 transition-colors px-4 py-3"
                      >
                        <div className="font-urbanist font-medium text-base md:text-lg text-gray-900">{page.title}</div>
                        <div className="font-urbanist font-light text-sm text-gray-600">{page.category}</div>
                        <div className="font-urbanist font-light text-xs text-gray-400 mt-1">{page.path}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
