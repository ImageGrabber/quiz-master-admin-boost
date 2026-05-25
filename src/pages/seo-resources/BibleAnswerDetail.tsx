import { useParams, Link, Navigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { bibleAnswers } from "@/data/bible-answers";
import { ChevronRight, ArrowLeft, Tag, Calendar, MessageCircleQuestion } from "lucide-react";

export default function BibleAnswerDetail() {
  const { id } = useParams();
  const answer = bibleAnswers.find(a => a.id === id);

  if (!answer) {
    return <Navigate to="/bible-questions-answered" replace />;
  }

  const relatedAnswers = bibleAnswers.filter(a => answer.relatedQuestions.includes(a.id));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": answer.question,
    "description": answer.excerpt,
    "datePublished": answer.publishDate,
    "author": {
      "@type": "Organization",
      "name": "Bible Quiz Competition"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Bible Quiz Competition",
      "logo": {
        "@type": "ImageObject",
        "url": "https://biblequizcompetition.com/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-urbanist selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title={`${answer.question} | Bible Questions Answered`}
        description={answer.excerpt}
        keywords={`${answer.category.toLowerCase()}, bible questions, theological answers, christianity explained`}
        url={`/bible-questions-answered/${answer.id}`}
        structuredData={structuredData}
      />
      
      <Navigation />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-4 px-6 md:px-12">
        <div className="max-w-4xl mx-auto flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/bible-questions-answered" className="hover:text-blue-600 transition-colors">Answers</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 truncate max-w-[150px] sm:max-w-xs">{answer.category}</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Link to="/bible-questions-answered" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all questions
        </Link>

        <article className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200 mb-16">
          <div className="p-8 md:p-14">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-md">
                <Tag className="w-3.5 h-3.5" />
                {answer.category}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(answer.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 leading-[1.15] tracking-tight">
              {answer.question}
            </h1>

            <div className="prose prose-lg prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-p:leading-relaxed prose-p:font-light prose-li:font-light">
              <div dangerouslySetInnerHTML={{ __html: answer.answerHtml }} />
            </div>
          </div>
          
          <div className="bg-slate-50 p-8 md:p-14 border-t border-slate-200">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <MessageCircleQuestion className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Got More Questions?</h3>
                <p className="text-slate-600 font-light mb-6">Explore our database for more biblical answers to life's biggest questions.</p>
                <Link to="/bible-questions-answered" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-bold tracking-widest uppercase hover:bg-blue-600 transition-colors">
                  Search Database
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Related Questions */}
        {relatedAnswers.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">Related Questions</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedAnswers.map(related => (
                <Link 
                  key={related.id} 
                  to={`/bible-questions-answered/${related.id}`}
                  className="group block bg-white border border-slate-200 hover:border-blue-300 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 block">
                    {related.category}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {related.question}
                  </h4>
                  <p className="text-slate-500 font-light text-sm line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
