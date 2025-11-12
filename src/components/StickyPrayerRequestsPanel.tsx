import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Users, Award, Star, TrendingUp, HelpCircle, Shield, ArrowRight, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function StickyPrayerRequestsPanel() {
  const [prayerRequests, setPrayerRequests] = useState<any[]>([]);
  const [displayedRequests, setDisplayedRequests] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);
  const [showAnonymous, setShowAnonymous] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPrayerRequests();
    
    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      fetchPrayerRequests();
    }, 30000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  // Continuous loop effect
  useEffect(() => {
    if (prayerRequests.length === 0) return;

    const filteredRequests = prayerRequests.filter(request => showAnonymous || !request.isAnonymous);
    
    // Set initial displayed requests
    setDisplayedRequests(filteredRequests.slice(0, 8));
    
    // Start continuous loop
    const loopInterval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % filteredRequests.length;
        const newDisplayedRequests = [];
        
        // Get 8 consecutive requests starting from nextIndex
        for (let i = 0; i < 8; i++) {
          const requestIndex = (nextIndex + i) % filteredRequests.length;
          newDisplayedRequests.push(filteredRequests[requestIndex]);
        }
        
        setDisplayedRequests(newDisplayedRequests);
        return nextIndex;
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(loopInterval);
  }, [prayerRequests, showAnonymous]);

  const fetchPrayerRequests = async () => {
    try {
      setLoading(true);
      
      // Fetch real prayer requests from Supabase (auto-approved)
      const { data: realPrayerRequests, error } = await supabase
        .from('prayer_requests' as any)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) {
        console.error('Error fetching prayer requests:', error);
        setPrayerRequests([]);
      } else {
        setPrayerRequests(realPrayerRequests || []);
      }
    } catch (error) {
      console.error('Error fetching prayer requests:', error);
      setPrayerRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'healing': return <Heart className="w-4 h-4 text-red-500" />;
      case 'family': return <Users className="w-4 h-4 text-green-500" />;
      case 'work': return <Award className="w-4 h-4 text-blue-500" />;
      case 'spiritual': return <Star className="w-4 h-4 text-purple-500" />;
      case 'financial': return <TrendingUp className="w-4 h-4 text-yellow-500" />;
      case 'guidance': return <HelpCircle className="w-4 h-4 text-indigo-500" />;
      case 'protection': return <Shield className="w-4 h-4 text-orange-500" />;
      default: return <Heart className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className={`hidden md:flex flex-col fixed right-0 z-40 transition-all duration-300 ${open ? 'w-80' : 'w-14'}`} style={{ top: 'calc(50% - 10px)' }}>
      <div className={`h-[350px] ${open ? 'bg-white/80 p-4 border-l border-red-100 shadow-xl' : 'bg-white/60 p-1 border-l border-red-100 shadow'} rounded-l-2xl backdrop-blur-md flex flex-col items-stretch relative`}>
        <button
          onClick={() => setOpen(!open)}
          className={`absolute ${open ? 'top-4 left-[-25px]' : 'top-1/2 left-[-25px] -translate-y-1/2'} bg-red-600 text-white rounded-l-lg px-2 py-1 shadow-lg focus:outline-none`}
        >
          {open ? <span>&#10095;</span> : <span>&#10094;</span>}
        </button>
        {open ? (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-600" />
              <span className="font-bold text-red-700">Prayer Requests</span>
              <div className="ml-auto flex gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-600">Live</span>
                </div>
                <button
                  onClick={() => fetchPrayerRequests()}
                  className="p-1 hover:bg-red-50 rounded"
                  title="Refresh prayer requests"
                >
                  <ArrowRight className="w-4 h-4 text-red-600 rotate-90" />
                </button>
                <button
                  onClick={() => setShowAnonymous(!showAnonymous)}
                  className="p-1 hover:bg-red-50 rounded"
                  title={showAnonymous ? "Hide anonymous requests" : "Show anonymous requests"}
                >
                  {showAnonymous ? <Eye className="w-4 h-4 text-red-600" /> : <EyeOff className="w-4 h-4 text-red-600" />}
                </button>
              </div>
            </div>
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto space-y-2">
                  {displayedRequests.map((request, index) => (
                    <li key={`${request.id}-${currentIndex}-${index}`} className="p-2 bg-red-50 rounded-lg border border-red-100 transition-all duration-500 ease-in-out">
                      <div className="flex items-start gap-2 mb-1">
                        {getCategoryIcon(request.category)}
                        <span className="text-xs text-red-600 font-medium">
                          {formatTimeAgo(request.created_at || request.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {request.request}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        {request.isAnonymous ? (
                          <span className="text-xs text-gray-500 italic">Anonymous</span>
                        ) : request.name ? (
                          <span className="text-xs text-gray-600 font-medium">— {request.name}</span>
                        ) : null}
                        <span className="text-xs text-gray-400">
                          {request.category?.charAt(0).toUpperCase() + request.category?.slice(1)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => navigate('/prayer-requests')} 
                  className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white font-semibold hover:from-red-700 hover:to-pink-700 transition-all"
                >
                  Submit a request
                </button>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <Heart className="w-6 h-6 text-red-600 mb-10" />
            <span className="text-sm text-red-600 font-bold rotate-90 whitespace-nowrap">Prayers</span>
          </div>
        )}
      </div>
    </div>
  );
}

