import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Brain, Sparkles, ScrollText, HelpCircle, MessageCircleQuestion } from "lucide-react";
import React from "react";
import { VerseContextDialog } from "./VerseContextDialog";
import SEO from "@/components/SEO";
import { BibleChapter } from "@/data/bibleData";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface ChapterStudyLayoutProps {
  book: string;
  chapterId: number;
  content: BibleChapter;
  mode: 'study' | 'full';
  questions?: any[];
}

export default function ChapterStudyLayout({ book, chapterId, content, mode, questions = [] }: ChapterStudyLayoutProps) {
  const navigate = useNavigate();
  const [selectedVerse, setSelectedVerse] = React.useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleVerseClick = (verse: string) => {
    setSelectedVerse(verse);
    setIsDialogOpen(true);
  };

  const bookName = book.charAt(0).toUpperCase() + book.slice(1);

  return (
    <div className="min-h-screen bg-white font-urbanist">
      <SEO 
        title={`${content.title} Study Guide | ${bookName} Chapter ${chapterId}`}
        description={content.description}
        keywords={`${bookName} chapter ${chapterId}, ${bookName} study guide, ${bookName} summary, bible chapter study, ${content.title} questions and answers, scripture analysis`}
        author="Bible Quiz Competition"
        url={`/bible-questions-and-answers-hub/${book}/chapter-${chapterId}${mode === 'full' ? '-full' : ''}`}
      />
      <Navigation />
      <div className="w-full px-6 md:px-8 lg:px-12 py-4 border-b border-gray-50">
        <Button variant="ghost" onClick={() => navigate(`/bible-questions-and-answers-hub/${book}`)} className="text-gray-500 hover:text-black font-light">
          Back to {bookName}
        </Button>
      </div>

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

            {/* Questions & Answers Section */}
            {questions && questions.length > 0 && (
              <section className="pt-20 border-t border-gray-100">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center shadow-lg">
                    <MessageCircleQuestion className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-4xl font-semibold text-gray-900 tracking-tight">Questions & Answers</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {questions.map((q, idx) => (
                    <Card key={idx} className="border-stone-100 shadow-sm hover:shadow-xl hover:border-stone-200 transition-all duration-500 rounded-[2.5rem] overflow-hidden bg-white group">
                      <CardHeader className="p-8 pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Question {idx + 1}</span>
                          {q.referenceVerse && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleVerseClick(q.referenceVerse)}
                              className="text-[10px] font-black text-orange-600 bg-orange-50 hover:bg-orange-100 px-3 py-1 h-auto rounded-full transition-colors uppercase tracking-widest"
                            >
                              <BookOpen className="w-3 h-3 mr-1.5" />
                              {q.referenceVerse}
                            </Button>
                          )}
                        </div>
                        <CardTitle className="text-xl font-black text-stone-900 leading-tight tracking-tight">
                          {q.question}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 pt-4">
                        <div className="space-y-4">
                          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100">
                            <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest block mb-2">Answer</span>
                            <p className="text-stone-900 font-bold text-lg leading-snug">
                              {q.options[q.answer]}
                            </p>
                          </div>
                          {q.explanation && (
                            <div className="pl-5 border-l-2 border-orange-100">
                              <p className="text-sm text-stone-500 font-medium leading-relaxed italic">
                                {q.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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

      <VerseContextDialog 
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        book={bookName}
        chapterId={chapterId}
        highlightVerse={selectedVerse || ""}
      />

      <Footer />
    </div>
  );
}
