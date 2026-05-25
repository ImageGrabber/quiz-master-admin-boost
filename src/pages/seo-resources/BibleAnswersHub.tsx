import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { bibleAnswers, getAnswerCategories } from "@/data/bible-answers";
import { Search, ChevronRight, BookOpen, MessageCircleQuestion } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function BibleAnswersHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = getAnswerCategories();

  const filteredAnswers = bibleAnswers.filter((answer) => {
    const matchesSearch = answer.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          answer.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || answer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-urbanist">
      <SEO
        title="Bible Questions Answered | Theological Q&A Knowledge Base"
        description="Explore our comprehensive database of Bible questions and answers. Get biblical, theological, and practical answers to your most pressing questions about God, Jesus, and the Bible."
        keywords="bible questions answered, got questions, bible q&a, theological questions, bible answers, christian knowledge base"
        url="/bible-questions-answered"
      />
      
      <Navigation />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 pt-24 pb-16 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" 
             style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
             
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6">
            <MessageCircleQuestion className="w-4 h-4" />
            Got Questions?
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Bible Questions <span className="text-blue-600">Answered</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-light mb-10 max-w-2xl mx-auto">
            Search our extensive knowledge base for biblical, theological, and practical answers to the most common questions about the Christian faith.
          </p>

          <div className="relative max-w-2xl mx-auto shadow-xl shadow-blue-900/5 rounded-2xl overflow-hidden">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a question... (e.g. 'Who wrote the Bible?')"
              className="pl-16 pr-6 py-8 text-lg bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-2xl"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <div className="bg-blue-600 rounded-2xl p-6 text-white mb-8 shadow-lg shadow-blue-600/20">
              <h3 className="text-xl font-bold mb-2">Have a specific question?</h3>
              <p className="text-blue-100 font-light text-sm mb-4">Submit your theological questions to our team.</p>
              <Link to="/bible-questions-answered/ask" className="block text-center bg-white text-blue-600 font-bold uppercase tracking-widest text-xs py-3 rounded-xl hover:bg-blue-50 transition-colors">
                Ask a Question
              </Link>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-left px-5 py-3 rounded-xl transition-all duration-200 ${
                    selectedCategory === category 
                      ? "bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/20" 
                      : "bg-white text-slate-600 hover:bg-slate-100 font-medium border border-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="lg:col-span-3">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedCategory === "All" ? "All Questions" : selectedCategory}
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
              {filteredAnswers.length} Results
            </span>
          </div>

          {filteredAnswers.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredAnswers.map((answer) => (
                <Link 
                  key={answer.id} 
                  to={`/bible-questions-answered/${answer.id}`}
                  className="group block bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                          {answer.category}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-3">
                        {answer.question}
                      </h3>
                      <p className="text-slate-600 font-light leading-relaxed line-clamp-2">
                        {answer.excerpt}
                      </p>
                    </div>
                    <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 group-hover:bg-blue-600 group-hover:text-white text-slate-400 transition-colors shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center bg-white border border-slate-200 rounded-3xl py-20 px-6">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No questions found</h3>
              <p className="text-slate-500 font-light">Try adjusting your search or category filter.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="mt-6 text-blue-600 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
