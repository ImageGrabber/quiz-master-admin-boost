import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    FileText, 
    Printer, 
    Download, 
    CheckCircle2, 
    Music, 
    BookOpen,
    ClipboardCheck,
    ArrowRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const PrintablePdfQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How can I download the Bible quiz as a PDF?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Simply scroll to the desired quiz section on this page and click the 'Download PDF' button. Most browsers will also allow you to save any of our quiz pages as a PDF by using the 'Print' function (Ctrl+P or Cmd+P) and selecting 'Save as PDF' as the destination."
                }
            },
            {
                "@type": "Question",
                "name": "Are the answer keys included in the PDF?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all our printable Bible quizzes come with a separate answer key page at the end of the document for easy grading."
                }
            },
            {
                "@type": "Question",
                "name": "Can I use these for my church's weekly newsletter?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! We encourage churches and study groups to use our printable resources in their physical materials. A small credit back to biblequizcompetition.com is appreciated but not required."
                }
            }
        ]
    };

    const printableResources = [
        {
            title: "Genesis Chapter 1 Quiz",
            desc: "15 questions covering the creation of the world. Includes primary and intermediate levels.",
            difficulty: "Beginner"
        },
        {
            title: "The Ten Commandments",
            desc: "A matching quiz for students to learn the Decalogue in order and meaning.",
            difficulty: "Intermediate"
        },
        {
            title: "Life of Jesus Trivia",
            desc: "25 questions spanning the Gospels. Perfect for Easter or year-round study.",
            difficulty: "All Ages"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO 
                title="Printable Bible Quiz with Answers PDF | Free Study Resources"
                description="Download and print high-quality Bible quiz questions and answers in PDF format. Free resources for Sunday school, family trivia nights, and personal study."
                keywords="bible quiz with answers pdf printable, printable bible trivia questions, bible quiz for sunday school pdf, free bible study printables"
                url="/bible-quiz-printable-pdf"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold mb-6">
                        <FileText className="w-4 h-4" />
                        <span>Ready for Print & Download</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-urbanist leading-tight">
                        Bible Quiz <span className="text-indigo-600">Printable PDFs</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto mb-10">
                        Take the Word offline. Our high-quality printable quizzes are designed for Sunday school teachers, study groups, and families who prefer the feel of pen and paper.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="rounded-full px-10 h-14 bg-indigo-600 hover:bg-indigo-700" onClick={() => window.print()}>
                            <Printer className="mr-2 h-5 w-5" /> Print This Page
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-10 h-14 border-indigo-200 text-indigo-700" onClick={() => navigate('/bible-questions-and-answers-hub')}>
                            <BookOpen className="mr-2 h-5 w-5" /> Browse Interactive Hub
                        </Button>
                    </div>
                </header>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    {printableResources.map((res, idx) => (
                        <Card key={idx} className="border-none shadow-xl shadow-indigo-100/50 rounded-[2rem] bg-white overflow-hidden group">
                           <div className="aspect-video bg-indigo-50 flex items-center justify-center border-b border-indigo-100 relative overflow-hidden">
                               <FileText className="w-16 h-16 text-indigo-200 group-hover:scale-110 transition-transform duration-500" />
                               <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-600 border border-indigo-100 italic">
                                   {res.difficulty}
                               </div>
                           </div>
                           <CardContent className="p-8">
                               <h3 className="text-xl font-bold text-slate-900 mb-2 font-urbanist">{res.title}</h3>
                               <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                   {res.desc}
                               </p>
                               <Button variant="secondary" className="w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold flex items-center justify-center gap-2">
                                   <Download className="w-4 h-4" /> Download PDF
                               </Button>
                           </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="max-w-4xl mx-auto mb-20">
                    <section className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-sm">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 font-urbanist flex items-center gap-3">
                            <ClipboardCheck className="w-8 h-8 text-indigo-600" />
                            How to Print Our Quizzes
                        </h2>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 text-indigo-600 font-black text-xl">1</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">Select Your Difficulty</h4>
                                    <p className="text-slate-600 leading-relaxed">Choose from Beginner, Intermediate, or Advanced categories depending on your audience. All levels come with formatted questions and spacing for written answers.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 text-indigo-600 font-black text-xl">2</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">Toggle Answer Key</h4>
                                    <p className="text-slate-600 leading-relaxed">By default, answers are hidden for student printouts. You can toggle the 'Show Answer Key' setting before generating the PDF if you are a teacher preparing a grading sheet.</p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 text-indigo-600 font-black text-xl">3</div>
                                <div>
                                    <h4 className="font-bold text-slate-900 mb-2">Print and Share</h4>
                                    <p className="text-slate-600 leading-relaxed">Our PDFs are pre-formatted for US Letter and A4 paper sizes, ensuring perfect margins and clear typography for easy reading in church or classroom settings.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-indigo-900 rounded-[3rem] p-12 text-center text-white mb-20">
                        <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-3xl mb-6">
                            <Music className="w-10 h-10 text-indigo-200" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 font-urbanist tracking-tight">Need Song Lyrics & Chords?</h2>
                        <p className="text-indigo-200 mb-8 max-w-2xl mx-auto">
                            We also provide printable chords and lyrics for hundreds of Hindi and English Christian worship songs. Perfect for your worship team's binder.
                        </p>
                        <Button size="lg" className="bg-white text-indigo-900 hover:bg-slate-100 font-bold px-10 rounded-full" onClick={() => navigate('/malayalam-songs')}>
                            Browse Worship Songs <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>

                    <RelatedContentWidget />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrintablePdfQuiz;
