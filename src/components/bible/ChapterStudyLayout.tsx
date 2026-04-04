import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, ChevronRight, Home, ArrowLeft, Brain, Sparkles, ScrollText } from "lucide-react";
import SEO from "@/components/SEO";
import { BibleChapter } from "@/data/bibleData";

interface ChapterStudyLayoutProps {
  book: string;
  chapterId: number;
  content: BibleChapter;
  mode: 'study' | 'full';
}

export default function ChapterStudyLayout({ book, chapterId, content, mode }: ChapterStudyLayoutProps) {
  const navigate = useNavigate();

  const bookName = book.charAt(0).toUpperCase() + book.slice(1);

  return (
    <div className="min-h-screen bg-white font-urbanist">
      <SEO 
        title={`${content.title} Study Guide | ${bookName}`}
        description={content.description}
        url={`/bible-questions-and-answers-hub/${book}/chapter-${chapterId}${mode === 'full' ? '-full' : ''}`}
      />
      
      {/* Premium Header */}
      <header className="relative flex items-center justify-between p-6 w-full px-6 md:px-8 lg:px-12 border-b border-gray-50">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">Bible Quiz Hub</span>
          </div>
        </div>
        <Button variant="ghost" onClick={() => navigate(`/bible-questions-and-answers-hub/${book}`)} className="text-gray-500 hover:text-black font-light">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {bookName}
        </Button>
      </header>

      {/* Hero Section */}
      <section className="py-24 bg-white text-center border-b border-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm font-light text-gray-500 mb-8 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            {bookName} • Chapter {chapterId}
          </div>
          <h1 className="text-6xl md:text-8xl font-normal text-gray-900 mb-8 leading-[1.1] tracking-tighter">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="text-3xl font-light text-gray-400 mb-10 italic">
              — {content.subtitle}
            </p>
          )}
          <p className="text-2xl font-light text-gray-500 max-w-3xl mx-auto leading-relaxed mb-12">
            {content.description}
          </p>
          <div className="flex justify-center gap-6">
            <Button 
              onClick={() => navigate(`/bible-questions-and-answers-hub/${book}/chapter-${chapterId}${mode === 'full' ? '' : '-full'}`)}
              variant="outline"
              className="border-gray-200 py-8 px-10 rounded-2xl font-light text-xl hover:bg-gray-50 transition-all flex items-center gap-3 shadow-none"
            >
              {mode === 'study' ? <ScrollText className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
              {mode === 'study' ? 'Read Full Text' : 'View Study Guide'}
            </Button>
            <Button 
              className="bg-black text-white py-8 px-12 rounded-2xl font-light text-xl hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
              onClick={() => navigate(`/bible-questions-and-answers-hub/${book}/ch${chapterId}-beginner`)}
            >
              Take the Quiz
            </Button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {mode === 'study' ? (
          <div className="space-y-32">
            {/* Key Highlights */}
            <section>
              <h2 className="text-4xl font-semibold text-gray-900 mb-12 tracking-tight">Key Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.keyPoints.map((point, idx) => (
                  <div key={idx} className="p-10 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm">
                      <span className="text-xl font-medium text-gray-900">{idx + 1}</span>
                    </div>
                    <p className="text-xl font-light text-gray-700 leading-relaxed italic">"{point}"</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Theological Themes (If any) */}
            {content.theologicalThemes && (
              <section>
                <h2 className="text-4xl font-semibold text-gray-900 mb-12 tracking-tight">Theological Themes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {content.theologicalThemes.map((theme, idx) => (
                    <Card key={idx} className="border-none shadow-none bg-white group">
                      <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-3xl font-semibold text-gray-900 group-hover:translate-x-2 transition-transform">{theme.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="space-y-4">
                          {theme.points.map((p, i) => (
                            <li key={i} className="flex items-start gap-4 text-xl font-light text-gray-500 leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-3 flex-shrink-0" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* Detailed Content */}
            {content.detailedContent && (
              <section className="space-y-16">
                <h2 className="text-4xl font-semibold text-gray-900 mb-12 tracking-tight">Deep Dive</h2>
                {content.detailedContent.map((section, idx) => (
                  <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 group">
                    <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
                      {section.day && <span className="text-sm font-light text-gray-400 uppercase tracking-widest block mb-2">{section.day}</span>}
                      <h3 className="text-3xl font-semibold text-gray-900 mb-4">{section.title}</h3>
                      <p className="text-gray-500 font-light text-lg leading-relaxed">{section.description}</p>
                    </div>
                    <div className="lg:col-span-8">
                      <div className="p-12 rounded-[3rem] bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:border-gray-200 group-hover:shadow-3xl group-hover:shadow-gray-100 transition-all duration-700">
                        <div className="flex items-center gap-4 mb-6">
                          <ScrollText className="w-5 h-5 text-gray-400" />
                          <span className="text-sm font-light text-gray-400 tracking-widest uppercase">{section.verses}</span>
                        </div>
                        <p className="text-2xl md:text-3xl font-light text-gray-800 leading-[1.6] italic">
                          "{section.verseText}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>
        ) : (
          /* Full Text View */
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="prose prose-2xl prose-gray font-light mx-auto leading-[1.8]">
              {content.fullText ? (
                content.fullText.map((v, idx) => (
                  <p key={idx} className="mb-10 text-gray-800 hover:text-black transition-colors">
                    <sup className="text-sm font-medium mr-4 text-gray-300">{v.verse}</sup>
                    {v.text}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic py-20 text-center">Full text for this chapter is being added soon.</p>
              )}
            </div>
            
            <div className="pt-20 border-t border-gray-100 flex flex-col items-center gap-10">
              <h3 className="text-3xl font-semibold text-gray-900">Finished Reading?</h3>
              <Button 
                className="bg-black text-white py-8 px-16 rounded-2xl font-light text-xl hover:bg-gray-800 transition-all"
                onClick={() => navigate(`/bible-questions-and-answers-hub/${book}/ch${chapterId}-beginner`)}
              >
                Test Your Memory with a Quiz
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Premium Infinite Footer */}
      <footer className="py-20 bg-white border-t border-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-2 mb-10">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-semibold text-gray-900 tracking-tight">Bible Quiz Competition</span>
          </div>
          <p className="text-gray-400 font-light text-lg mb-10 max-w-sm mx-auto leading-relaxed">
            Helping you master the Word of God through premium study guides and interactive challenges.
          </p>
          <div className="flex justify-center gap-10 text-gray-400 font-light tracking-wide text-sm mb-10">
            <button key="terms" className="hover:text-black transition-colors">Terms</button>
            <button key="privacy" className="hover:text-black transition-colors">Privacy</button>
            <button key="support" className="hover:text-black transition-colors">Support</button>
          </div>
          <div className="text-gray-300 font-light text-xs">
            © 2025 ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
    </div>
  );
}
