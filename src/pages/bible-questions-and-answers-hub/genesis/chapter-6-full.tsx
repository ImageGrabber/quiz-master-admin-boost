import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft, Brain, Menu } from "lucide-react";
import SEO from "@/components/SEO";

export default function GenesisChapter6Full() {
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

  const fullChapterText = [
    { verse: "1", text: "When man began to multiply on the face of the land and daughters were born to them," },
    { verse: "2", text: "the sons of God saw that the daughters of man were attractive. And they took as their wives any they chose." },
    { verse: "3", text: "Then the Lord said, \"My Spirit shall not abide in man forever, for he is flesh: his days shall be 120 years.\"" },
    { verse: "4", text: "The Nephilim were on the earth in those days, and also afterward, when the sons of God came in to the daughters of man and they bore children to them. These were the mighty men who were of old, the men of renown." },
    { verse: "5", text: "The Lord saw that the wickedness of man was great in the earth, and that every intention of the thoughts of his heart was only evil continually." },
    { verse: "6", text: "And the Lord regretted that he had made man on the earth, and it grieved him to his heart." },
    { verse: "7", text: "So the Lord said, \"I will blot out man whom I have created from the face of the land, man and animals and creeping things and birds of the heavens, for I am sorry that I have made them.\"" },
    { verse: "8", text: "But Noah found favor in the eyes of the Lord." },
    { verse: "9", text: "These are the generations of Noah. Noah was a righteous man, blameless in his generation. Noah walked with God." },
    { verse: "10", text: "And Noah had three sons, Shem, Ham, and Japheth." },
    { verse: "11", text: "Now the earth was corrupt in God's sight, and the earth was filled with violence." },
    { verse: "12", text: "And God saw the earth, and behold, it was corrupt, for all flesh had corrupted their way on the earth." },
    { verse: "13", text: "And God said to Noah, \"I have determined to make an end of all flesh, for the earth is filled with violence through them. Behold, I will destroy them with the earth." },
    { verse: "14", text: "Make yourself an ark of gopher wood. Make rooms in the ark, and cover it inside and out with pitch." },
    { verse: "15", text: "This is how you are to make it: the length of the ark 300 cubits, its breadth 50 cubits, and its height 30 cubits." },
    { verse: "16", text: "Make a roof for the ark, and finish it to a cubit above, and set the door of the ark in its side. Make it with lower, second, and third decks." },
    { verse: "17", text: "For behold, I will bring a flood of waters upon the earth to destroy all flesh in which is the breath of life under heaven. Everything that is on the earth shall die." },
    { verse: "18", text: "But I will establish my covenant with you, and you shall come into the ark, you, your sons, your wife, and your sons' wives with you." },
    { verse: "19", text: "And of every living thing of all flesh, you shall bring two of every sort into the ark to keep them alive with you. They shall be male and female." },
    { verse: "20", text: "Of the birds according to their kinds, and of the animals according to their kinds, of every creeping thing of the ground, according to its kind, two of every sort shall come in to you to keep them alive." },
    { verse: "21", text: "Also take with you every sort of food that is eaten, and store it up. It shall serve as food for you and for them." },
    { verse: "22", text: "Noah did this; he did all that God commanded him." }
  ];

  return (
    <div className="min-h-screen bg-white font-urbanist">
      <SEO 
        title="Genesis Chapter 6 Full Text | Noah & the Flood"
        description="Read the complete Genesis Chapter 6 text verse by verse. ESV translation."
        url="/bible-questions-and-answers-hub/genesis/chapter-6-full"
      />
      
      {/* Header */}
      <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12 border-b border-gray-100">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => navigate("/bible-questions-and-answers-hub")} className="text-gray-600 hover:text-gray-900 font-light">Bible Q&A</button>
            <button onClick={() => navigate("/articles")} className="text-gray-600 hover:text-gray-900 font-light">Articles</button>
            <button onClick={() => navigate("/help")} className="text-gray-600 hover:text-gray-900 font-light">Help</button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            className="bg-black hover:bg-gray-800 font-light"
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
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-light" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-light" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-light" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
            <button className="text-gray-600 hover:text-gray-900 px-4 py-3 text-left font-light border-t border-gray-200" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
            <Button className="bg-black text-white px-4 py-3 mx-4 mb-4 font-light" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white text-center border-b border-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-normal text-gray-900 mb-6 leading-tight">
            Genesis Chapter 6
          </h1>
          <p className="text-2xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed italic">
            "Noah & the Flood" — Full ESV Translation
          </p>
        </div>
      </section>

      <div className="w-full max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-base font-light text-gray-500 mb-12 overflow-x-auto whitespace-nowrap pb-2">
          <button className="hover:text-gray-900" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <button className="hover:text-gray-900" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Hub</button>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <button className="hover:text-gray-900" onClick={() => navigate("/bible-questions-and-answers-hub/genesis")}>Genesis</button>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <button className="hover:text-gray-900" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-6")}>Chapter 6</button>
          <ChevronRight className="w-4 h-4 mx-2 flex-shrink-0" />
          <span className="font-medium text-gray-900">Scripture</span>
        </div>

        {/* Back Button */}
        <div className="mb-12">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-6")} 
            className="flex items-center gap-2 font-light text-gray-600 hover:text-black p-0"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Study Guide
          </Button>
        </div>

        {/* Scriptue Text Navigation */}
        <div className="space-y-12">
          <div className="prose prose-xl max-w-none">
            {fullChapterText.map((verse, idx) => (
              <div key={idx} className="flex gap-8 p-6 group hover:bg-gray-50/50 transition-all rounded-2xl">
                <div className="flex-shrink-0 pt-1">
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-black transition-colors tabular-nums tracking-tighter">
                    {verse.verse.padStart(2, '0')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xl md:text-2xl font-light text-gray-800 leading-relaxed translate-y-[-1px]">
                    {verse.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Bottom */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-6")}
            className="font-light text-gray-600 hover:text-black py-6 px-8 text-lg"
          >
            ← Back to Study Guide
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch6-beginner")}
            className="bg-black text-white hover:bg-gray-800 py-8 px-12 text-xl font-light rounded-full"
          >
            Test Your Knowledge →
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
            <span className="text-xl font-semibold text-gray-900">Bible Quiz Competition</span>
          </div>
          <p className="text-gray-400 font-light text-sm">© 2025 QuizMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
