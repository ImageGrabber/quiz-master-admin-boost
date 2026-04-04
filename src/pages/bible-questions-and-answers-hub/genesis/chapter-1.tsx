import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft, Brain, Menu } from "lucide-react";
import SEO from "@/components/SEO";

export default function GenesisChapter1() {
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
    title: "Genesis Chapter 1",
    subtitle: "Creation & Sabbath",
    description: "The account of God's creation of the heavens and earth in six days, culminating in the Sabbath rest.",
    keyPoints: [
      "Creation days 1–6 and Sabbath pattern",
      "Heavens and earth; light vs darkness", 
      "Image of God; mandate to rule and fill"
    ],
    detailedContent: [
      {
        day: "Day 1",
        title: "Light and Darkness",
        description: "God created light and separated it from darkness, calling the light 'day' and the darkness 'night'.",
        verses: "Genesis 1:1-5",
        verseText: "In the beginning, God created the heavens and the earth. The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters. And God said, 'Let there be light,' and there was light."
      },
      {
        day: "Day 2", 
        title: "Sky and Waters",
        description: "God separated the waters above from the waters below, creating the expanse called 'sky'.",
        verses: "Genesis 1:6-8",
        verseText: "And God said, 'Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.' And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse."
      },
      {
        day: "Day 3",
        title: "Land and Vegetation", 
        description: "God gathered the waters to form seas and created dry land, then made vegetation and plants.",
        verses: "Genesis 1:9-13",
        verseText: "And God said, 'Let the waters under the heavens be gathered together into one place, and let the dry land appear.' And it was so. God called the dry land Earth, and the waters that were gathered together he called Seas."
      },
      {
        day: "Day 4",
        title: "Sun, Moon, and Stars",
        description: "God created the sun to rule the day and the moon to rule the night, along with the stars.",
        verses: "Genesis 1:14-19",
        verseText: "And God said, 'Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years.'"
      },
      {
        day: "Day 5",
        title: "Sea and Air Creatures",
        description: "God created all living creatures in the seas and birds to fly in the sky.",
        verses: "Genesis 1:20-23",
        verseText: "And God said, 'Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens.' So God created the great sea creatures."
      },
      {
        day: "Day 6",
        title: "Land Animals and Humans",
        description: "God created land animals and finally made humans in His image to rule over creation.",
        verses: "Genesis 1:24-31",
        verseText: "Then God said, 'Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth.'"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <SEO 
        title="Genesis Chapter 1 Study Guide | Creation & Sabbath"
        description={chapterDetails.description}
        url="/bible-questions-and-answers-hub/genesis/chapter-1"
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
              onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-1-full")}
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
          <span className="font-medium text-gray-900 underline underline-offset-4 tracking-wide italic">Chapter 1</span>
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
              
              <Card className="mt-8 border border-gray-200 shadow-none bg-black text-white hover:bg-gray-900 transition-colors cursor-pointer group" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch1-beginner")}>
                <CardHeader>
                  <CardTitle className="text-2xl font-urbanist font-semibold">Test Your Knowledge</CardTitle>
                  <CardDescription className="text-gray-400 font-urbanist font-light">Take the Chapter 1 Quiz</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-white text-black hover:bg-gray-100 font-urbanist font-light py-6 text-lg">Start Quiz →</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Detailed Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-urbanist font-semibold text-gray-900 mb-6">Creation Days</h2>
            {chapterDetails.detailedContent.map((content, idx) => (
              <Card key={idx} className="border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-none bg-white group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-urbanist font-light text-gray-400 uppercase tracking-widest">{content.day} | {content.verses}</span>
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
          <div className="w-1/3" />
          <Button 
            variant="outline" 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-2")}
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
