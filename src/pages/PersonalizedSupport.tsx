import { useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookOpen, Heart, Sparkles, TrendingUp, Brain, Search, X, Menu, Droplet } from 'lucide-react';

type Detail = {
  emotion?: string;
  trapId?: string;
  isWellness?: boolean;
  insightName?: string;
  insightDescription?: string;
  insightTask?: string;
  verseReference?: string;
  verseText?: string;
  verseQuote?: string;
};

export default function PersonalizedSupport() {
  const navigate = useNavigate();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waterIntake, setWaterIntake] = useState(1500); // ml
  const [isDragging, setIsDragging] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const glassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('emotionalCheckInDetail');
      if (raw) setDetail(JSON.parse(raw));
    } catch {
      setDetail(null);
    }
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Water intake drag handlers
  const maxWater = 3000; // ml
  const minWater = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const waterPercentage = (waterIntake / maxWater) * 100;

  // Drag handler with proper dependencies
  const handleMouseMoveRef = useRef<(e: MouseEvent | TouchEvent) => void>();
  handleMouseMoveRef.current = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !glassRef.current) return;
    
    const rect = glassRef.current.getBoundingClientRect();
    const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY;
    if (clientY === undefined) return;
    
    const y = clientY - rect.top;
    const height = rect.height;
    const percentage = Math.max(0, Math.min(1, 1 - (y / height)));
    const newWater = Math.round(percentage * maxWater);
    setWaterIntake(newWater);
  };

  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();
        handleMouseMoveRef.current?.(e);
      };
      const handleEnd = () => {
        setIsDragging(false);
      };
      
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      
      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging]);

  const theme = useMemo(() => {
    const wellness = detail?.isWellness;
    return wellness ? {
      tagText: 'Wellness Insight',
      tagClass: 'text-green-700',
      cardGradient: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      buttonFrom: 'from-green-600',
      buttonTo: 'to-emerald-700'
    } : {
      tagText: 'Thinking Pattern Identified',
      tagClass: 'text-purple-700',
      cardGradient: 'from-purple-50 to-indigo-50',
      border: 'border-purple-200',
      buttonFrom: 'from-purple-600',
      buttonTo: 'to-indigo-700'
    };
  }, [detail]);

  // Calculate a progress percentage based on completion
  const progressPercentage = 75; // Could be dynamic based on user data

  return (
    <main className="relative min-h-[100vh] w-full overflow-hidden bg-gray-50">
      {/* Light neutral background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />

      {/* Header - Same as homepage */}
      <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate("/bible-questions-and-answers-hub")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Bible Q&A</button>
            <button onClick={() => navigate("/articles")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Articles</button>
            <button onClick={() => navigate("/help")} className="text-gray-600 hover:text-gray-900 font-urbanist font-light">Help</button>
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
                className="pl-10 pr-10 w-80 md:w-96 h-9 text-sm font-urbanist font-light border-gray-300 focus:border-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          
          <Button 
            className="bg-black hover:bg-gray-800 font-urbanist font-light"
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
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-urbanist font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
            <Button className="bg-black text-white px-4 py-3 mx-4 mb-4 font-urbanist font-light" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</Button>
          </div>
        )}
      </header>

      <div className="relative z-10 px-4 md:px-6 lg:px-8 py-8 md:py-12 max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Personalized Support for You
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            We're more than a quiz platform. We're here to support you through your care, worries, anxiety, and every step of your journey toward peace through quizzes, CBT tools, and other things.
          </p>
        </div>

        {/* Grid Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Top-Left: Emotional Insight Card (Peach/Pink) - Enhanced */}
          <div className="relative bg-gradient-to-br from-pink-50 via-orange-50 to-amber-50 rounded-2xl p-6 md:p-8 shadow-lg border border-pink-200 overflow-hidden group">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-pink-200/30"
                  style={{
                    width: `${8 + i * 2}px`,
                    height: `${8 + i * 2}px`,
                    left: `${(i * 12) % 100}%`,
                    top: `${(i * 15) % 100}%`,
                    animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div className="relative z-10">
              {/* Header with icon */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center shadow-md">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg font-semibold text-pink-700 uppercase tracking-wider">
                      {detail?.isWellness ? 'Wellness Insight' : 'Thinking Pattern Identified'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Detailed description with answer breakdown */}
              <div className="mb-5">
                <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
                  {detail?.insightDescription || 'Your personalized insight based on your check-in.'}
                </p>
                
                {/* Answer breakdown visualization */}
                {detail?.insightDescription?.includes('balanced') && (
                  <div className="bg-white/70 rounded-xl p-4 border border-pink-200/50 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-gray-600">Your Responses</span>
                      <span className="text-xs text-gray-500">6 questions answered</span>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-gray-600">Yes</span>
                          <span className="text-xs font-bold text-gray-900 ml-auto">3</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-1000"
                            style={{ width: '50%' }}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="text-xs text-gray-600">No</span>
                          <span className="text-xs font-bold text-gray-900 ml-auto">3</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full transition-all duration-1000"
                            style={{ width: '50%' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-pink-200/50">
                      <p className="text-xs text-gray-600 italic">
                        ✨ Balanced responses show thoughtful self-reflection
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Mood/Emotion indicators with animations */}
              <div className="relative">
                <p className="text-xs font-semibold text-gray-600 mb-3 flex items-center gap-2">
                  <span>Your Emotional Spectrum</span>
                  <div className="flex-1 h-px bg-gradient-to-r from-pink-200 to-transparent"></div>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { emoji: '😊', label: 'Happy', color: 'from-yellow-400 to-amber-400' },
                    { emoji: '😌', label: 'Calm', color: 'from-green-400 to-emerald-400' },
                    { emoji: '😔', label: 'Reflective', color: 'from-blue-400 to-cyan-400' },
                    { emoji: '😰', label: 'Anxious', color: 'from-orange-400 to-red-400' },
                    { emoji: '😌', label: 'Peaceful', color: 'from-purple-400 to-pink-400' },
                    { emoji: '🙏', label: 'Grateful', color: 'from-indigo-400 to-blue-400' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="relative group/emoji"
                    >
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl cursor-pointer transition-all duration-300 ${
                          i === 2 
                            ? 'bg-gradient-to-br ' + item.color + ' shadow-lg scale-110 ring-2 ring-pink-300' 
                            : 'bg-white/80 hover:bg-white shadow-md hover:scale-110 hover:shadow-lg'
                        }`}
                        style={{
                          animation: i === 2 ? 'pulse 2s ease-in-out infinite' : undefined,
                        }}
                      >
                        <span className="relative z-10">{item.emoji}</span>
                        {/* Ripple effect on hover */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br opacity-0 group-hover/emoji:opacity-20 group-hover/emoji:animate-ping" />
                      </div>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover/emoji:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                          {item.label}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action suggestion */}
              <div className="mt-5 pt-4 border-t border-pink-200/50">
                <div className="flex items-start gap-3 bg-white/60 rounded-lg p-3 border border-pink-200/50">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-white rotate-[-45deg]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700 mb-1">Today's Focus</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Choose one small action that supports you today. Every step forward matters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CSS animations */}
            <style>{`
              @keyframes float {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                25% { transform: translateY(-10px) translateX(5px); opacity: 0.5; }
                50% { transform: translateY(-5px) translateX(-5px); opacity: 0.4; }
                75% { transform: translateY(-15px) translateX(3px); opacity: 0.6; }
              }
              @keyframes pulse {
                0%, 100% { transform: scale(1.1); }
                50% { transform: scale(1.15); }
              }
            `}</style>
          </div>

          {/* Top-Right: Empty space */}
          <div></div>
        </div>

        {/* Water Intake Tracker - Before Feature Cards */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  Water Intake
                </p>
                <p className="text-3xl md:text-4xl font-bold text-gray-900">{waterIntake}ml</p>
                <p className="text-xs text-gray-500 mt-1">{Math.round(waterIntake / 250)} cups</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            
            {/* Animated Water Glass */}
            <div className="flex justify-center items-center mb-4">
              <div 
                ref={glassRef}
                className="relative w-32 h-48 md:w-40 md:h-56 cursor-pointer select-none touch-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Glass outline */}
                <svg 
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 150"
                  preserveAspectRatio="none"
                >
                  {/* Glass shape */}
                  <path
                    d="M 20 10 L 20 140 Q 20 145 25 145 L 75 145 Q 80 145 80 140 L 80 10 Q 80 5 75 5 L 25 5 Q 20 5 20 10 Z"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="2"
                  />
                  {/* Glass rim */}
                  <ellipse cx="50" cy="10" rx="30" ry="3" fill="#e2e8f0" />
                </svg>

                {/* Water fill with animation */}
                <div 
                  className="absolute bottom-0 left-0 right-0 transition-all duration-500 ease-out"
                  style={{
                    height: `${waterPercentage}%`,
                    background: `linear-gradient(to top, 
                      rgba(59, 130, 246, 0.9) 0%,
                      rgba(96, 165, 250, 0.8) 50%,
                      rgba(147, 197, 253, 0.7) 100%
                    )`,
                    clipPath: 'inset(0 20% 0 20% round 0 0 8px 8px)',
                  }}
                >
                  {/* Animated water waves */}
                  <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 10px,
                        rgba(255, 255, 255, 0.3) 10px,
                        rgba(255, 255, 255, 0.3) 20px
                      )`,
                      animation: 'wave 3s linear infinite',
                    }}
                  />
                  {/* Bubbles */}
                  <div className="absolute inset-0">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="absolute rounded-full bg-white/40"
                        style={{
                          width: `${4 + (i * 0.8)}px`,
                          height: `${4 + (i * 0.8)}px`,
                          left: `${25 + (i * 12)}%`,
                          bottom: `${5 + (i * 5)}%`,
                          animation: `bubble ${2 + (i * 0.4)}s ease-in-out infinite`,
                          animationDelay: `${i * 0.5}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Drag indicator */}
                {isDragging && (
                  <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                    {waterIntake}ml
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${waterPercentage}%` }}
              />
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              {Math.round(waterPercentage)}% of daily goal (3000ml)
            </p>

            {/* CSS animations */}
            <style>{`
              @keyframes wave {
                0% { transform: translateX(0); }
                100% { transform: translateX(20px); }
              }
              @keyframes bubble {
                0%, 100% { transform: translateY(0) scale(1); opacity: 0.4; }
                50% { transform: translateY(-10px) scale(1.2); opacity: 0.8; }
              }
            `}</style>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {/* Bottom-Left: Feature Cards Grid (2x2 sub-cards) */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-200">
            <div className="grid grid-cols-2 gap-3 md:gap-4 h-full">
              {/* Sub-card 1: Scripture Study */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 md:p-5 relative group cursor-pointer hover:shadow-md transition-shadow">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-blue-600 mb-2" />
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                  Scripture Study
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  Daily verses
                </p>
                <ArrowRight className="w-4 h-4 absolute top-3 right-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>

              {/* Sub-card 2: Build Confidence */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 md:p-5 relative group cursor-pointer hover:shadow-md transition-shadow">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-yellow-600 mb-2" />
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                  Build Confidence
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  Growth tools
                </p>
                <ArrowRight className="w-4 h-4 absolute top-3 right-3 text-gray-400 group-hover:text-yellow-600 transition-colors" />
              </div>

              {/* Sub-card 3: Prayer Support */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 md:p-5 relative group cursor-pointer hover:shadow-md transition-shadow">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-green-600 mb-2" />
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                  Prayer Support
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  Community care
                </p>
                <ArrowRight className="w-4 h-4 absolute top-3 right-3 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>

              {/* Sub-card 4: Today's Task */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 md:p-5 relative group cursor-pointer hover:shadow-md transition-shadow">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-purple-600 mb-2" />
                <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1">
                  Today's Faith Step
                </h3>
                <p className="text-xs text-gray-600 line-clamp-2">
                  {detail?.insightTask || 'Read a Psalm and pray.'}
                </p>
                <ArrowRight className="w-4 h-4 absolute top-3 right-3 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </div>
          </div>

          {/* Bottom-Right: Scripture & Satisfaction (White with chart) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Scripture</h3>
                  <p className="text-xs text-gray-500">Based on your check-in</p>
                </div>
                <div className="flex gap-1">
                  <button className="px-2 py-1 text-xs font-medium text-gray-900 bg-gray-100 rounded">W</button>
                  <button className="px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 rounded">M</button>
                </div>
              </div>
            </div>

            {/* Verse Card */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 md:p-5 mb-4 border border-amber-200">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-2">
                {detail?.verseReference || 'Scripture'}
              </p>
              <p className="text-sm md:text-base font-light text-gray-800 italic mb-3 leading-relaxed">
                "{detail?.verseText || 'For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.'}"
              </p>
              <div className="bg-white/70 rounded-lg p-3 border border-amber-200/50">
                <p className="text-xs md:text-sm font-medium text-purple-700 leading-relaxed">
                  {detail?.verseQuote || 'God has wonderful plans for you. Keep taking care of yourself and trust in His guidance.'}
                </p>
              </div>
            </div>

            {/* Simple satisfaction bars */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                  <span className="text-xs text-gray-600">Peace</span>
                </div>
                <span className="text-xs font-semibold text-gray-900">72%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-600">Hope</span>
                </div>
                <span className="text-xs font-semibold text-gray-900">85%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-gray-600">Faith</span>
                </div>
                <span className="text-xs font-semibold text-gray-900">68%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="flex justify-center mt-6">
          <Button 
            onClick={() => navigate('/')} 
            className={`px-8 py-6 text-base font-medium text-white bg-gradient-to-r ${theme.buttonFrom} ${theme.buttonTo} rounded-xl shadow-md hover:shadow-lg transition-all`}
          >
            Continue Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </main>
  );
}
