import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Heart, Lightbulb, Share2, ArrowLeft, Menu, Globe } from "lucide-react";
import { Helmet } from 'react-helmet';
import { supabase } from "@/integrations/supabase/client";

interface DailyVerse {
  id: string;
  verse_reference: string;
  verse_text: string;
  verse_text_hindi?: string;
  explanation?: string;
  explanation_hindi?: string;
  application?: string;
  application_hindi?: string;
  prayer?: string;
  prayer_hindi?: string;
  image_url?: string;
  image_alt_text?: string;
}

export default function DailyVerse() {
  const navigate = useNavigate();
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

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

  // Fetch today's daily verse from database
  useEffect(() => {
    const fetchTodaysVerse = async () => {
      try {
        setLoading(true);
        // For now, use a fallback until the migration is run
        const fallbackVerse: DailyVerse = {
          id: 'fallback',
          verse_reference: 'John 3:16',
          verse_text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
          verse_text_hindi: 'क्योंकि परमेश्वर ने जगत से ऐसा प्रेम किया कि उसने अपना एकलौता पुत्र दे दिया, कि जो कोई उस पर विश्वास करे, वह नाश न हो, परन्तु अनन्त जीवन पाए।',
          explanation: 'This is perhaps the most well-known verse in the Bible, often called "the gospel in a nutshell." It reveals God\'s incredible love for humanity - so great that He was willing to sacrifice His only Son for our salvation.',
          explanation_hindi: 'यह शायद बाइबल में सबसे प्रसिद्ध पद है, जिसे अक्सर \'सुसमाचार का सार\' कहा जाता है। यह मानवता के लिए परमेश्वर के अविश्वसनीय प्रेम को प्रकट करता है।',
          application: 'Remember that God\'s love is unconditional and available to you right now. If you haven\'t already, consider accepting this gift of eternal life through faith in Jesus Christ.',
          application_hindi: 'याद रखें कि परमेश्वर का प्रेम बिना शर्त है और आपके लिए अभी उपलब्ध है।',
          prayer: 'Thank you, God, for your incredible love that sent Jesus to save us. Help me to share this love with others today.',
          prayer_hindi: 'हे परमेश्वर, हमें बचाने के लिए यीशु को भेजने वाले आपके अविश्वसनीय प्रेम के लिए धन्यवाद।',
          image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
          image_alt_text: 'Cross and light representing God\'s love and salvation'
        };
        
        setVerse(fallbackVerse);
      } catch (error) {
        console.error('Error fetching daily verse:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodaysVerse();
  }, []);

  const handleShare = async () => {
    if (!verse) return;
    
    const currentText = language === 'hindi' ? (verse.verse_text_hindi || verse.verse_text) : verse.verse_text;
    const shareText = language === 'hindi' 
      ? `आज का दैनिक पद: ${verse.verse_reference}\n\n"${currentText}"\n\nBible Quiz Competition पर और पढ़ें`
      : `Today's Daily Verse: ${verse.verse_reference}\n\n"${currentText}"\n\nRead more at Bible Quiz Competition`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'hindi' ? "दैनिक बाइबल पद" : "Daily Bible Verse",
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert(language === 'hindi' ? 'पद क्लिपबोर्ड में कॉपी हो गया!' : 'Verse copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };


  return (
    <>
      <Helmet>
        <title>{verse ? (language === 'hindi' ? `दैनिक बाइबल पद - ${verse.verse_reference}` : `Daily Bible Verse - ${verse.verse_reference}`) : 'Daily Bible Verse'} | Bible Quiz Competition</title>
        <meta name="description" content={verse ? (language === 'hindi' 
          ? `आज का दैनिक बाइबल पद: ${verse.verse_reference} - "${verse.verse_text_hindi || verse.verse_text}" व्याख्या और अनुप्रयोग के साथ।`
          : `Today's daily Bible verse: ${verse.verse_reference} - "${verse.verse_text}" with explanation and application.`) : 'Daily Bible verse with explanation and application.'} />
        <meta name="keywords" content={language === 'hindi' 
          ? "दैनिक बाइबल पद, शास्त्र, भक्ति, ईसाई, बाइबल अध्ययन"
          : "daily bible verse, scripture, devotion, christian, bible study"} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
        {/* Navbar */}
        <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-row justify-between items-center relative">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
              <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-6 h-6 sm:w-7 sm:h-7 mr-2 inline-block align-middle" />
              <span className="text-base sm:text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
            </div>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
            </button>
            {/* Nav links for desktop */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/bible-questions-and-answers-hub")}>
                <span className="hidden lg:inline">Bible Q&A Hub</span>
                <span className="lg:hidden">Q&A Hub</span>
              </button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/articles")}>Articles</button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/prayer-requests")}>
                <span className="hidden lg:inline">Prayer Requests</span>
                <span className="lg:hidden">Prayers</span>
              </button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/help")}>Help</button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/login")}>Sign In</button>
              <Button variant="ghost" className="bg-black text-white font-semibold px-2 md:px-3 lg:px-4 py-2 rounded hover:bg-gray-800 transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            </nav>
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-xl border border-blue-100 z-50 flex flex-col items-stretch overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/prayer-requests"); }}>Prayer Requests</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
                <button className="bg-black text-white font-semibold px-4 py-4 text-left hover:bg-gray-900 active:bg-gray-800 transition-colors duration-200 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Loading today's verse...</div>
            </div>
          ) : !verse ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg text-gray-500">No verse available today</div>
            </div>
          ) : (
            <>
              {/* Back Button */}
              <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>

          {/* Daily Verse Card */}
          <Card className="shadow-xl border-0 mb-8">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">{language === 'hindi' ? 'दैनिक बाइबल पद' : 'Daily Bible Verse'}</h1>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
                  className="flex items-center space-x-1"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'english' ? 'हिंदी' : 'English'}</span>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Verse with Image Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Image Section */}
                <div className="order-2 lg:order-1">
                  {verse.image_url ? (
                    <div className="relative">
                      <img
                        src={verse.image_url}
                        alt={verse.image_alt_text || 'Daily verse image'}
                        className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      {verse.image_alt_text && (
                        <p className="text-sm text-gray-500 mt-2 text-center italic">{verse.image_alt_text}</p>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg shadow-lg flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-blue-400" />
                    </div>
                  )}
                </div>

                {/* Text Section */}
                <div className="order-1 lg:order-2">
                  <div className="text-center lg:text-left">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">{verse.verse_reference}</h2>
                    <blockquote className="text-xl md:text-2xl text-gray-800 italic leading-relaxed">
                      "{language === 'hindi' ? (verse.verse_text_hindi || verse.verse_text) : verse.verse_text}"
                    </blockquote>
                  </div>
                </div>
              </div>

              {/* Share Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{language === 'hindi' ? 'इस पद को साझा करें' : 'Share This Verse'}</span>
                </Button>
              </div>

              {/* Explanation Section */}
              {verse.explanation && (
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Lightbulb className="w-6 h-6 text-blue-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">{language === 'hindi' ? 'व्याख्या' : 'Explanation'}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{language === 'hindi' ? (verse.explanation_hindi || verse.explanation) : verse.explanation}</p>
                </div>
              )}

              {/* Application Section */}
              {verse.application && (
                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">{language === 'hindi' ? 'अनुप्रयोग' : 'Application'}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{language === 'hindi' ? (verse.application_hindi || verse.application) : verse.application}</p>
                </div>
              )}

              {/* Prayer Section */}
              {verse.prayer && (
                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">{language === 'hindi' ? 'प्रार्थना' : 'Prayer'}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{language === 'hindi' ? (verse.prayer_hindi || verse.prayer) : verse.prayer}"</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  Bible Study Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Explore our comprehensive Bible study materials and quiz questions.</p>
                <Button 
                  onClick={() => navigate("/bible-questions-and-answers-hub")}
                  className="w-full"
                >
                  Visit Bible Q&A Hub
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-green-600" />
                  Daily Devotionals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Join our community for daily Bible study and spiritual growth.</p>
                <Button 
                  onClick={() => navigate("/auth/register")}
                  variant="outline"
                  className="w-full"
                >
                  Join Our Community
                </Button>
              </CardContent>
            </Card>
          </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
