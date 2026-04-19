import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Scroll, 
    Mountain, 
    CheckCircle2, 
    Play, 
    ArrowRight, 
    ListCircle,
    BookOpen
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const TenCommandmentsQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Where can I find the Ten Commandments in the Bible?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Ten Commandments (the Decalogue) are primarily found in two places: Exodus 20:1–17 and Deuteronomy 5:4–21."
                }
            },
            {
                "@type": "Question",
                "name": "What is the first commandment?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The first commandment is: 'You shall have no other gods before me.' (Exodus 20:3)"
                }
            },
            {
                "@type": "Question",
                "name": "Why is it important to learn the Ten Commandments?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Ten Commandments are the foundation of biblical morality and serve as a guide for our relationship with God and our neighbors."
                }
            }
        ]
    };

    const commandmentsSummary = [
        "1. No other gods before Me",
        "2. No idols or graven images",
        "3. Do not take God's name in vain",
        "4. Remember the Sabbath day",
        "5. Honor your father and mother",
        "6. Do not murder",
        "7. Do not commit adultery",
        "8. Do not steal",
        "9. No false testimony",
        "10. Do not covet"
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO 
                title="Ten Commandments Bible Quiz: Test Your Knowledge of the Decalogue"
                description="Test your knowledge of the Ten Commandments with our free Bible quiz. Questions and answers on the Decalogue, Moses, and Mount Sinai. Online and printable."
                keywords="10 commandments quiz, ten commandments bible trivia, exodus 20 quiz, deuteronomy 5 trivia, moses mount sinai quiz"
                url="/10-commandments-quiz"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold mb-6">
                        <Mountain className="w-4 h-4" />
                        <span>The Foundation of Morality</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-urbanist leading-tight">
                        The <span className="text-amber-600">Ten Commandments</span> Quiz
                    </h1>
                    <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto mb-10 leading-relaxed">
                        Do you know the Decalogue in order? Test your memory and understanding of the laws God gave to Moses on Mount Sinai.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="rounded-full px-12 h-16 text-xl font-bold bg-slate-900 hover:bg-black shadow-xl" onClick={() => navigate('/public-quiz/exodus')}>
                            Take the Quiz <Play className="ml-2 h-6 w-6 fill-current" />
                        </Button>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2.5rem] bg-white p-10 md:p-14">
                        <h2 className="text-3xl font-black text-slate-900 mb-8 font-urbanist flex items-center gap-3">
                            <Scroll className="w-8 h-8 text-amber-600" />
                            Study the List
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {commandmentsSummary.map((item, idx) => (
                                <div key={idx} className="flex gap-3 text-slate-700 font-medium p-3 bg-slate-50 rounded-xl border border-slate-100 italic">
                                    <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">{idx + 1}</div>
                                    <span>{item.split('. ')[1]}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <div className="flex flex-col gap-6">
                        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[2rem] bg-amber-600 p-8 text-white relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-xl group-hover:scale-110 transition-transform"></div>
                           <h3 className="text-2xl font-bold mb-4">Printable Study Card</h3>
                           <p className="text-amber-100 mb-6 leading-relaxed">
                               Need to memorize these for your Sunday school class or personal study? Download our clean, formatted version.
                           </p>
                           <Button className="bg-white text-amber-700 hover:bg-amber-50 rounded-full font-bold w-full" onClick={() => navigate('/bible-quiz-printable-pdf')}>
                               Download PDF Version
                           </Button>
                        </Card>

                        <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex-grow flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-slate-900 mb-4 font-urbanist flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                                Biblical Meaning
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-sm mb-4">
                                The Ten Commandments are not just a list of 'don'ts'. They are a revelation of God's character and a framework for a thriving society built on love for God and love for neighbor.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span>Relationship with God (Cmds 1-4)</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    <span>Relationship with Others (Cmds 5-10)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-12 text-center text-white mb-20">
                    <h2 className="text-3xl font-black mb-6 font-urbanist">Explore More of Exodus</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                        The Ten Commandments are just one piece of the incredible story of the Exodus. Discover the burning bush, the plagues of Egypt, and the parting of the Red Sea.
                    </p>
                    <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white rounded-full font-bold px-10" onClick={() => navigate('/bible-questions-and-answers-hub/exodus')}>
                        Exodus Chapter Hub <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>

                <div className="max-w-5xl mx-auto">
                    <RelatedContentWidget />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TenCommandmentsQuiz;
