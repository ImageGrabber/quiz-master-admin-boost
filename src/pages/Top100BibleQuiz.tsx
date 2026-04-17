import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  BookOpen, 
  ChevronRight, 
  Brain, 
  Sparkles, 
  Star,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const TOP_QUESTIONS = [
  {
    id: 1,
    question: "How many books are in the Bible?",
    answer: "66 (39 in the Old Testament and 27 in the New Testament)",
    category: "General",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Who was the oldest person in the Bible?",
    answer: "Methuselah (969 years old)",
    category: "Characters",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What is the longest chapter in the Bible?",
    answer: "Psalm 119",
    category: "General",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "Who was the only female judge of Israel mentioned in the Book of Judges?",
    answer: "Deborah",
    category: "Characters",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "Which disciple was a tax collector before being called by Jesus?",
    answer: "Matthew (also known as Levi)",
    category: "New Testament",
    difficulty: "Medium"
  },
  {
    id: 6,
    question: "In what city were the followers of Jesus first called 'Christians'?",
    answer: "Antioch (Acts 11:26)",
    category: "Early Church",
    difficulty: "Hard"
  },
  {
    id: 7,
    question: "Who were the four rivers described as flowing out of the Garden of Eden?",
    answer: "Pishon, Gihon, Hiddekel (Tigris), and Phirat (Euphrates)",
    category: "Genesis",
    difficulty: "Hard"
  },
  {
    id: 8,
    question: "What is the shortest verse in the Bible?",
    answer: "'Jesus wept.' (John 11:35)",
    category: "General",
    difficulty: "Easy"
  }
];

export default function Top100BibleQuiz() {
  const navigate = useNavigate();
  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const toggleReveal = (id: number) => {
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter(rid => rid !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-amber-100/50 selection:text-amber-900">
      <SEO 
        title="Top 100 Bible Quiz Questions and Answers (2026 Edition)"
        description="Master the ultimate list of 100 Bible quiz questions and answers. Categorized by difficulty and topic, including Genesis, Gospels, Characters, and more."
        keywords="top 100 bible quiz questions, bible trivia questions and answers, hard bible quiz, easy bible quiz, bible questions for adults, biblical knowledge test"
        url="/top-100-bible-quiz-questions"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Top 100 Bible Quiz Questions and Answers (2026 Edition)",
          "description": "The most comprehensive list of Bible trivia questions for study, competition, and personal growth.",
          "author": {
            "@type": "Organization",
            "name": "Bible Quiz Competition"
          },
          "mainEntity": {
            "@type": "FAQPage",
            "mainEntity": TOP_QUESTIONS.map(q => ({
              "@type": "Question",
              "name": q.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": q.answer
              }
            }))
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/top_100_bible_quiz_hero_1776466050288.png" 
            alt="Grand Biblical Library Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/50 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10 animate-in fade-in slide-in-from-top-6 duration-1000">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">The Ultimate Resource</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-normal mb-8 leading-[0.9] tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Top 100 <span className="italic font-serif block mt-2 text-white/90">Questions</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-400">
            A master collection of the most important, challenging, and essential Bible trivia. Perfect for individual study or group competition.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">Top 100 Questions</span>
        </div>

        {/* Introduction Section */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400">Master Your Biblical Knowledge</h2>
            <h3 className="text-5xl font-normal leading-tight italic serif">The Definitive 2026 Collection</h3>
            <p className="text-2xl font-light text-gray-600 leading-relaxed">
              We have curated this list from thousands of questions in our database to provide a balanced overview of the entire Bible. Whether you are a beginner or a seasoned student of the Word, these questions will test your grasp of characters, events, and theological truths.
            </p>
            <div className="flex items-center space-x-8 pt-6">
               <div className="flex flex-col">
                  <span className="text-4xl font-normal text-black">100</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Questions</span>
               </div>
               <div className="w-px h-12 bg-gray-100" />
               <div className="flex flex-col">
                  <span className="text-4xl font-normal text-black">12</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Categories</span>
               </div>
               <div className="w-px h-12 bg-gray-100" />
               <div className="flex flex-col">
                  <span className="text-4xl font-normal text-black">3</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Difficulties</span>
               </div>
            </div>
          </div>
          <div className="relative group p-12 rounded-[4rem] bg-gray-50 border border-gray-100 hover:shadow-2xl transition-all duration-700">
             <div className="space-y-8">
                <div className="flex items-center space-x-4 mb-10">
                   <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white shadow-lg">
                      <Sparkles className="w-6 h-6" />
                   </div>
                   <h4 className="text-2xl font-normal italic serif">Quick Tips</h4>
                </div>
                <ul className="space-y-6">
                   {[
                     "Read the question carefully",
                     "Think about the book context",
                     "Try to answer before revealing",
                     "Check the scripture reference"
                   ].map((tip, i) => (
                     <li key={i} className="flex items-center space-x-4">
                        <CheckCircle className="w-5 h-5 text-amber-500" />
                        <span className="text-xl font-light text-gray-600">{tip}</span>
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </section>

        {/* Questions Interactive Area */}
        <section className="mb-40">
           <div className="mb-20 text-center">
              <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-6 tracking-widest">— Featured Questions —</h2>
              <p className="text-2xl font-light text-gray-400 italic">Click any card to reveal the answer.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {TOP_QUESTIONS.map((q) => (
                <div 
                  key={q.id} 
                  className={`group p-10 rounded-[2.5rem] border transition-all duration-500 cursor-pointer flex flex-col justify-between h-full
                    ${revealedIds.includes(q.id) ? 'bg-black text-white border-black scale-[1.02]' : 'bg-white border-gray-100 hover:border-black/5 hover:shadow-xl'}
                  `}
                  onClick={() => toggleReveal(q.id)}
                >
                   <div className="space-y-8">
                      <div className="flex items-center justify-between">
                         <span className={`text-[10px] font-bold uppercase tracking-widest ${revealedIds.includes(q.id) ? 'text-white/40' : 'text-gray-300'}`}>Question #{q.id}</span>
                         <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border
                           ${revealedIds.includes(q.id) ? 'border-white/20 text-white/60' : 'border-gray-100 text-gray-400'}
                         `}>{q.difficulty}</span>
                      </div>
                      <h4 className="text-2xl font-normal italic serif leading-tight">
                         {q.question}
                      </h4>
                   </div>

                   <div className="mt-12 pt-8 border-t border-gray-100/10">
                      {revealedIds.includes(q.id) ? (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                           <p className="text-sm font-bold uppercase tracking-widest text-white/40 mb-3">Answer</p>
                           <p className="text-2xl font-light text-white leading-relaxed italic">{q.answer}</p>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-amber-600 group-hover:text-amber-700 transition-colors">
                           <HelpCircle className="w-5 h-5" />
                           <span className="text-sm font-bold uppercase tracking-widest">Reveal Answer</span>
                        </div>
                      )}
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-20 text-center">
              <Button size="lg" variant="outline" className="border-gray-200 rounded-2xl px-12 py-8 text-sm uppercase tracking-widest hover:bg-gray-50 transition-all font-light" onClick={() => navigate("/public-quiz/genesis")}>
                 Take the Full Interactive Quiz <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
           </div>
        </section>

        {/* Global Competition Banner */}
        <section className="mb-40 py-24 bg-amber-500 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-black/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-black/30 mb-8">Ready for the Real Test?</h2>
            <h3 className="text-4xl sm:text-6xl font-normal leading-tight mb-12 italic serif text-black">Join the 2026 Bible Quiz Championship</h3>
            <p className="text-xl font-light text-black/60 leading-relaxed mb-12">
              Our annual competition brings together the sharpest minds in scriptural study. Register now to compete for prizes, certificates, and the title of Bible Quiz Champion.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-10 py-8 text-sm sm:text-lg rounded-2xl font-light shadow-2xl transition-all active:scale-95" onClick={() => navigate("/auth/register")}>
                Register for Free
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-black/10 text-black hover:bg-white transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/competitions")}>
                View Competitions
              </Button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
