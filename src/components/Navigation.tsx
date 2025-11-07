import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, X, Brain } from "lucide-react";
import { publicPages } from "@/data/indexData";

export function Navigation() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof publicPages>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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

  return (
    <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
            <Brain className="w-3 h-3 text-white" />
          </div>
          <span className="text-xl md:text-2xl font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button onClick={() => navigate("/help")} className="text-base md:text-lg text-gray-600 hover:text-gray-900 font-urbanist font-light">Help</button>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div ref={searchRef} className="hidden md:block relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
              className="pl-10 pr-10 w-80 md:w-96 h-10 md:h-11 text-base font-urbanist font-light border-gray-300 focus:border-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setShowSearchResults(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
          {showSearchResults && searchQuery.trim() && searchResults.length === 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
              <div className="font-urbanist font-light text-gray-600 text-base">No results found</div>
            </div>
          )}
        </div>
        
        <Button 
          className="bg-black hover:bg-gray-800 font-urbanist font-light text-base md:text-lg px-4 md:px-6 py-2 md:py-2.5"
          onClick={() => navigate("/auth/register")}
        >
          Get Started
        </Button>
        <button className="md:hidden" onClick={() => setMobileMenuOpen((open) => !open)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-6 right-6 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 flex flex-col">
          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
          <button className="text-base text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
          <Button className="bg-black text-white text-base px-4 py-3 mx-4 mb-4 font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</Button>
        </div>
      )}
    </header>
  );
}

