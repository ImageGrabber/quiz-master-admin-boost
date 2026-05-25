import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ChevronRight, ArrowLeft, Send, Mail, User, HelpCircle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AskBibleQuestion() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-urbanist selection:bg-blue-100 selection:text-blue-900">
      <SEO
        title="Ask a Bible Question | Theological Q&A"
        description="Have a question about the Bible, God, or Christianity? Submit your question to our biblical experts and we will provide a deep, theological answer."
        keywords="ask a bible question, submit theological question, bible q&a form, christian answers"
        url="/bible-questions-answered/ask"
      />
      
      <Navigation />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-4 px-6 md:px-12">
        <div className="max-w-3xl mx-auto flex items-center text-xs font-bold uppercase tracking-widest text-slate-400">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/bible-questions-answered" className="hover:text-blue-600 transition-colors">Answers</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900">Ask a Question</span>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <Link to="/bible-questions-answered" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to all questions
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-200">
          <div className="p-8 md:p-14 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <HelpCircle className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-300 bg-white/10 px-3 py-1.5 rounded-md mb-6 backdrop-blur-md">
                Submission Portal
              </span>
              <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                Ask a Bible Question
              </h1>
              <p className="text-slate-300 font-light text-lg max-w-lg">
                Can't find the answer you're looking for? Submit your theological or biblical question to our team of experts.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-14">
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Question Submitted!</h2>
                <p className="text-slate-600 font-light text-lg mb-8 max-w-md mx-auto">
                  Thank you for your curiosity! Our team is reviewing your question. We will notify you via email when the answer is published.
                </p>
                <Link to="/bible-questions-answered" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-slate-900 text-white font-bold tracking-widest uppercase hover:bg-blue-600 transition-colors">
                  Return to Hub
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input required placeholder="John Doe" className="pl-12 py-6 bg-slate-50 border-slate-200 focus:border-blue-500 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <Input required type="email" placeholder="john@example.com" className="pl-12 py-6 bg-slate-50 border-slate-200 focus:border-blue-500 rounded-xl" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Your Question</label>
                  <Input required placeholder="E.g., Why did Jesus have to die on the cross?" className="py-6 text-lg font-semibold bg-slate-50 border-slate-200 focus:border-blue-500 rounded-xl" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-900 uppercase tracking-widest">Additional Context (Optional)</label>
                  <Textarea placeholder="Share any specific verses you're wondering about, or why you're asking this question..." className="min-h-[150px] bg-slate-50 border-slate-200 focus:border-blue-500 rounded-xl resize-y p-4" />
                </div>

                <div className="pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-5 rounded-full bg-blue-600 text-white font-bold tracking-widest uppercase hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-1"
                  >
                    {isSubmitting ? "Submitting..." : (
                      <>
                        Submit Question <Send className="w-5 h-5 ml-3" />
                      </>
                    )}
                  </button>
                  <p className="mt-4 text-xs font-medium text-slate-400 uppercase tracking-widest text-center sm:text-left">
                    We value your privacy. Your email will only be used to notify you.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
