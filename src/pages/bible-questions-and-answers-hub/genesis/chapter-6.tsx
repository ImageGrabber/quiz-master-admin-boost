import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft, Brain, Menu } from "lucide-react";
import SEO from "@/components/SEO";

export default function GenesisChapter6() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const chapterDetails = {
    title: "Genesis Chapter 6",
    subtitle: "Noah & the Flood",
    description: "The corruption of humanity, God's decision to send the flood, and Noah's preparation for the survival of life on earth.",
    keyPoints: [
      "Human wickedness and violence fills the earth",
      "The Nephilim mentioned as mighty men of old",
      "Noah finds favor; God's instructions for the Ark"
    ],
    detailedContent: [
      {
        title: "The Corruption",
        description: "The Lord saw that the wickedness of man was great in the earth, and that every intention of the thoughts of his heart was only evil continually.",
        verses: "Genesis 6:5",
        verseText: "The LORD saw that the wickedness of man was great in the earth, and that every intention of the thoughts of his heart was only evil continually."
      },
      {
        title: "The Nephilim",
        description: "The sons of God came in to the daughters of man, and they bore children to them. These were the mighty men who were of old, the men of renown.",
        verses: "Genesis 6:4",
        verseText: "The Nephilim were on the earth in those days, and also afterward, when the sons of God came in to the daughters of man and they bore children to them. These were the mighty men who were of old, the men of renown."
      },
      {
        title: "God's Grief",
        description: "The Lord regretted that he had made man on the earth, and it grieved him to his heart.",
        verses: "Genesis 6:6",
        verseText: "And the LORD regretted that he had made man on the earth, and it grieved him to his heart."
      },
      {
        title: "Noah's Favor",
        description: "But Noah found favor in the eyes of the Lord. Noah was a righteous man, blameless in his generation. Noah walked with God.",
        verses: "Genesis 6:8-9",
        verseText: "But Noah found favor in the eyes of the LORD. These are the generations of Noah. Noah was a righteous man, blameless in his generation. Noah walked with God."
      },
      {
        title: "The Ark Instructions",
        description: "God gave Noah detailed instructions to build an ark of gopher wood, with specific dimensions and rooms for the animals.",
        verses: "Genesis 6:14-16",
        verseText: "Make yourself an ark of gopher wood. Make rooms in the ark, and cover it inside and out with pitch. This is how you are to make it: the length of the ark 300 cubits, its breadth 50 cubits, and its height 30 cubits."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Genesis Chapter 6 Study Guide | Noah & the Flood"
        description={chapterDetails.description}
        url="/bible-questions-and-answers-hub/genesis/chapter-6"
      />
      
      {/* Header */}
      <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12 border-b border-gray-100">
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

      {/* Hero Section */}
      <section className="py-20 bg-white text-center border-b border-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-urbanist font-normal text-gray-900 mb-6 leading-tight">
            {chapterDetails.title}
          </h1>
          <p className="text-2xl font-urbanist font-light text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {chapterDetails.description}
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              onClick={() => document.getElementById('study-content')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-lg font-urbanist font-light text-lg"
            >
              Start Studying
            </Button>
            <Button 
              onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-6-full")}
              variant="outline"
              className="border-gray-200 hover:bg-gray-50 px-8 py-6 rounded-lg font-urbanist font-light text-lg"
            >
              Read Full Chapter
            </Button>
          </div>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-6 py-12" id="study-content">
        {/* Breadcrumb */}
        <div className="flex items-center text-base font-urbanist font-light text-gray-500 mb-12">
          <button className="hover:text-gray-900" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <button className="hover:text-gray-900" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Q&A Hub</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <button className="hover:text-gray-900" onClick={() => navigate("/bible-questions-and-answers-hub/genesis")}>Genesis</button>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="font-medium text-gray-900 underline underline-offset-4 tracking-wide italic">Chapter 6</span>
        </div>

        {/* Back Button */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis")} 
            className="flex items-center gap-2 font-urbanist font-light text-gray-600 hover:text-black p-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Genesis Hub
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Key Points Column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-3xl font-urbanist font-semibold text-gray-900 mb-6">Key Highlights</h2>
              <div className="space-y-4">
                {chapterDetails.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/30">
                    <div className="w-2 h-2 rounded-full bg-black mt-2.5 flex-shrink-0" />
                    <p className="text-lg font-urbanist font-light text-gray-700 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              
              <Card className="mt-8 border border-gray-200 shadow-none bg-black text-white hover:bg-gray-900 transition-colors cursor-pointer group" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch6-beginner")}>
                <CardHeader>
                  <CardTitle className="text-2xl font-urbanist font-semibold">Test Your Knowledge</CardTitle>
                  <CardDescription className="text-gray-400 font-urbanist font-light">Take the Chapter 6 Quiz</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-white text-black hover:bg-gray-100 font-urbanist font-light py-6 text-lg">Start Quiz →</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-urbanist font-semibold text-gray-900 mb-6">In-Depth Study</h2>
            {chapterDetails.detailedContent.map((content, idx) => (
              <Card key={idx} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-none bg-white group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-urbanist font-light text-gray-400 uppercase tracking-widest">{content.verses}</span>
                  </div>
                  <CardTitle className="text-3xl font-urbanist font-semibold text-gray-900">{content.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-xl font-urbanist font-light text-gray-600 leading-relaxed">{content.description}</p>
                  <div className="p-8 rounded-2xl bg-gray-50 border-l-4 border-black italic">
                    <p className="text-xl font-urbanist font-light text-gray-800 leading-relaxed">"{content.verseText}"</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation Bottom */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-5")}
            className="font-urbanist font-light border-gray-200 py-6 px-8"
          >
            ← Previous Chapter
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-7")}
            className="font-urbanist font-light border-gray-200 py-6 px-8"
          >
            Next Chapter →
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-urbanist font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          <p className="text-gray-400 font-urbanist font-light text-sm">© 2025 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
