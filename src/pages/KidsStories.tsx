import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Star, Cloud, Heart, Umbrella, Sparkles, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import kidsStoriesData from "@/data/kids-stories.json";

export interface KidsStory {
  id: number;
  title: string;
  slug: string;
  content: string;
  moral: string;
  bibleReference: string;
  theme: string;
  imageAlt: string;
  color: string;
  icon: any;
}

const stories = kidsStoriesData.map(story => ({
  ...story,
  color: 
    story.theme === "Courage" ? "from-orange-400 to-yellow-500" :
    story.theme === "Obedience" ? "from-sky-400 to-cyan-500" :
    story.theme === "Generosity" ? "from-purple-400 to-pink-500" :
    story.theme === "Love" ? "from-pink-400 to-rose-500" :
    story.theme === "Forgiveness" ? "from-indigo-400 to-blue-500" :
    story.theme === "Kindness" ? "from-rose-400 to-pink-500" :
    story.theme === "Faith" ? "from-yellow-400 to-orange-500" :
    story.theme === "Faithfulness" ? "from-blue-400 to-indigo-500" :
    story.theme === "Diligence" ? "from-emerald-400 to-teal-500" :
    story.theme === "Purpose" ? "from-violet-400 to-purple-500" :
    "from-gray-400 to-gray-500",
  icon:
    story.theme === "Courage" ? Star :
    story.theme === "Obedience" ? Cloud : // Using cloud as a placeholder for rainbow style
    story.theme === "Love" ? Heart :
    story.theme === "Kindness" ? Heart :
    story.theme === "Generosity" ? Sparkles :
    Star
}));

const ITEMS_PER_PAGE = 6;

const KidsStories = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(stories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleStories = stories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex flex-col relative overflow-hidden font-urbanist">
      <Helmet>
        <title>Amazing Bible Stories for Kids | Bible Quiz Competition</title>
        <meta name="description" content="Play & Learn Amazing Bible Stories! Bible stories for children with moral lessons, colorful illustrations, and quizzes." />
        <link rel="canonical" href="https://biblequizcompetition.com/kids-stories" />
      </Helmet>

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 opacity-20 hidden lg:block animate-pulse duration-3000">
        <Cloud className="w-20 h-20 text-blue-300" />
      </div>
      <div className="absolute top-40 right-20 opacity-20 hidden lg:block animate-bounce duration-3000">
        <Star className="w-12 h-12 text-yellow-400 fill-yellow-400" />
      </div>
      <div className="absolute bottom-20 left-5 opacity-10 hidden lg:block rotate-12">
        <div className="w-32 h-32 bg-green-200 rounded-full blur-3xl" />
      </div>

      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-12 md:py-16 relative z-10 text-center">
        
        {/* Hero Section */}
        <div className="space-y-6 mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 animate-fade-in">
            Read <span className="text-[#EF4444]">Bible</span> <span className="text-[#3B82F6]">Stories</span> for Your <span className="text-[#F59E0B]">Kids</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900">
            and <span className="text-[#22C55E]">Play</span> Fun <span className="text-[#6366F1]">Quizzes</span> Together!
          </h2>
        </div>

        {/* Ribbon Banner */}
        <div className="relative inline-block mb-24">
          <div className="bg-[#FCD34D] text-[#1a1a1a] px-12 py-4 rounded-lg font-bold text-2xl md:text-3xl shadow-lg border-2 border-[#1a1a1a] relative z-10 transform -rotate-1">
             Explore Kids Bible Stories
             {/* Ribbon Tails */}
             <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-8 h-10 bg-[#B45309] -z-10 clip-path-ribbon-left" />
             <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-8 h-10 bg-[#B45309] -z-10 clip-path-ribbon-right" />
          </div>
          {/* Baby/Angel Illustration spot (lucide icon for now) */}
          <div className="absolute -right-12 -top-12 animate-bounce">
            <div className="bg-blue-100 p-3 rounded-full border-2 border-white shadow-md">
              <Sparkles className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 md:gap-6 mb-16 animate-fade-in relative z-20 px-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="w-12 h-12 md:w-16 md:h-16 bg-[#FCD34D] rounded-2xl border-4 border-[#1a1a1a] shadow-[0_6px_0_0_#1a1a1a] hover:translate-y-1 hover:shadow-[0_2px_0_0_#1a1a1a] active:translate-y-1.5 active:shadow-none transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed group shrink-0"
              title="Previous Page"
            >
              <ChevronLeft className="w-6 h-6 md:w-10 md:h-10 text-[#1a1a1a] group-hover:scale-110 transition-transform" />
            </button>
            
            <div className="flex gap-2 md:gap-3 flex-wrap justify-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl border-4 border-[#1a1a1a] font-urbanist font-black text-xl md:text-3xl transition-all flex items-center justify-center
                    ${currentPage === page 
                      ? "bg-[#7C3AED] text-white shadow-none translate-y-1.5" 
                      : "bg-white text-[#1a1a1a] shadow-[0_6px_0_0_#1a1a1a] hover:translate-y-1 hover:shadow-[0_2px_0_0_#1a1a1a] active:translate-y-1.5 active:shadow-none"
                    }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="w-12 h-12 md:w-16 md:h-16 bg-[#FCD34D] rounded-2xl border-4 border-[#1a1a1a] shadow-[0_6px_0_0_#1a1a1a] hover:translate-y-1 hover:shadow-[0_2px_0_0_#1a1a1a] active:translate-y-1.5 active:shadow-none transition-all flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed group shrink-0"
              title="Next Page"
            >
              <ChevronRight className="w-6 h-6 md:w-10 md:h-10 text-[#1a1a1a] group-hover:scale-110 transition-transform" />
            </button>
          </div>
        )}

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
          {visibleStories.map((story) => {
            const StoryIcon = story.icon;
            
            return (
              <Card 
                key={story.slug}
                className="group border-none shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-[40px] overflow-hidden bg-white hover:scale-[1.03] transition-all duration-500 cursor-pointer flex flex-col h-full"
                onClick={() => navigate(`/kids-stories/${story.slug}`)}
              >
                {/* Illustration Section */}
                <div className="aspect-[4/3] w-full bg-[#f8fafc] overflow-hidden relative border-b border-gray-100">
                     <img 
                       src={`/images/stories/${story.slug}.png`}
                       alt={story.imageAlt}
                       loading="lazy"
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       onError={(e) => {
                         // Fallback if image is missing
                         (e.target as HTMLImageElement).style.display = 'none';
                         const parent = (e.target as HTMLImageElement).parentElement;
                         if (parent) {
                           const fallback = document.createElement('div');
                           fallback.className = 'absolute inset-0 bg-blue-50/50 flex items-center justify-center';
                           fallback.innerHTML = '<svg class="w-16 h-16 text-blue-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a4 4 0 0 0-4-4H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a4 4 0 0 1 4-4h6z"></path></svg>';
                           parent.appendChild(fallback);
                         }
                       }}
                     />
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/10" />
                </div>

                {/* Content Section */}
                <div className="p-8 flex-grow flex flex-col items-center text-center space-y-4">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed font-medium">
                    {story.content}
                  </p>
                  
                  <div className="pt-4 flex justify-center w-full">
                    <button 
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-10 py-4 rounded-full font-bold text-xl shadow-[0_8px_0_0_#5B21B6] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/kids-stories/${story.slug}/quiz`);
                      }}
                    >
                      Quiz Now!
                    </button>
                  </div>
                </div>

                {/* Moral Footer Bar */}
                <div className={`mt-auto p-4 bg-gradient-to-r ${story.color} mx-6 mb-6 rounded-full flex items-center gap-4 border-2 border-white shadow-md`}>
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                     <StoryIcon className={`w-6 h-6 ${story.color.split(' ')[1].replace('to-', 'text-')}`} />
                   </div>
                   <div className="text-white text-left overflow-hidden">
                     <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 leading-tight">Moral of the Story:</p>
                     <p className="text-sm font-extrabold truncate leading-tight">{story.moral}</p>
                   </div>
                </div>
              </Card>
            );
          })}
        </div>
      </main>

      <Footer />
      
      {/* Custom Styles for Ribbon Tails (inline for simplicity or move to CSS) */}
      <style>{`
        .clip-path-ribbon-left {
          clip-path: polygon(100% 0, 0 50%, 100% 100%);
        }
        .clip-path-ribbon-right {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default KidsStories;
