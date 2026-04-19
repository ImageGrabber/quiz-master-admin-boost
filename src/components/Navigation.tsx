import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X, Brain, ChevronDown, Music } from "lucide-react";
import { publicPages } from "@/data/indexData";

export function Navigation({ transparent = false }: { transparent?: boolean }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [songsDropdownOpen, setSongsDropdownOpen] = useState(false);
  const songsDropdownRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof publicPages>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

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
      const filtered = publicPages.filter(page =>
        page.title.toLowerCase().includes(query) ||
        page.category.toLowerCase().includes(query) ||
        page.path.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
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

        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigate("/bible-questions-and-answers-hub")} className={navItemClass}>Bible Q&A</button>

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
              <div className="absolute top-full mt-2 left-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 min-w-[200px] py-1">
                <button
                  onClick={() => { setSongsDropdownOpen(false); navigate('/malayalam-songs'); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 font-urbanist font-light text-base text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Malayalam Songs
                </button>
                <button
                  onClick={() => { setSongsDropdownOpen(false); navigate('/english-songs'); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 font-urbanist font-light text-base text-gray-700 hover:text-gray-900 transition-colors"
                >
                  English Hymns
                </button>
                <button
                  onClick={() => { setSongsDropdownOpen(false); navigate('/hindi-songs'); }}
                  className="w-full text-left px-4 py-2.5 hover:bg-gray-50 font-urbanist font-light text-base text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Hindi Songs
                </button>
              </div>
            )}
          </div>

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

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div ref={searchRef} className="hidden md:block relative">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${transparent && !isScrolled ? 'text-white/60' : 'text-gray-400'}`} />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
              className={`
                pl-10 pr-10 w-80 md:w-96 h-10 md:h-11 text-base font-urbanist font-light transition-all backdrop-blur-md
                ${transparent && !isScrolled 
                  ? 'bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-gray-400'}
              `}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors ${transparent && !isScrolled ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
              {searchResults.map((page, index) => (
                <button
                  key={index}
                  onClick={() => handleSearchSelect(page.path)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
                >
                  <div className="font-urbanist font-medium text-base text-gray-900">{page.title}</div>
                  <div className="font-urbanist font-light text-sm md:text-base text-gray-600">{page.category}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          className={`
            font-urbanist font-light text-base md:text-lg px-4 md:px-6 py-2 md:py-2.5 transition-all
            ${transparent && !isScrolled 
              ? 'bg-white text-black hover:bg-gray-200' 
              : 'bg-black text-white hover:bg-gray-800'}
          `}
          onClick={() => navigate("/auth/register")}
        >
          Get Started
        </Button>
        <button className={`md:hidden transition-colors ${transparent && !isScrolled ? 'text-white' : 'text-gray-900'}`} onClick={() => setMobileMenuOpen((open) => !open)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-6 right-6 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-b border-gray-50" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A</button>
          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-b border-gray-50" onClick={() => { setMobileMenuOpen(false); navigate("/malayalam-songs"); }}>Malayalam Songs</button>
          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-b border-gray-50" onClick={() => { setMobileMenuOpen(false); navigate("/english-songs"); }}>English Hymns</button>
          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-b border-gray-50" onClick={() => { setMobileMenuOpen(false); navigate("/hindi-songs"); }}>Hindi Songs</button>
          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-b border-gray-50" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
          <button className="text-base text-orange-600 hover:text-orange-700 px-4 py-3 text-left font-urbanist font-medium border-b border-gray-50" onClick={() => { setMobileMenuOpen(false); navigate("/kids-stories"); }}>Kids Stories</button>
          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>

          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
          <Button className="bg-black text-white text-base px-4 py-3 mx-4 mb-4 font-urbanist font-light rounded-xl" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</Button>
        </div>
      )}
    </header>
  );
}
