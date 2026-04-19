import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Sunrise, 
    Cross, 
    Sparkles, 
    Play, 
    ArrowRight, 
    Heart,
    Users,
    Sun
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const EasterQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are some good Easter Bible quiz questions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Common Easter questions include: 'On which day did Jesus rise from the dead?', 'Who was the first person to see the empty tomb?', and 'What did Jesus say to the disciples on the road to Emmaus?'"
                }
            },
            {
                "@type": "Question",
                "name": "Why do we celebrate Easter in the Bible?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Easter celebrates the resurrection of Jesus Christ, which is the cornerstone of the Christian faith and the victory over death."
                }
            },
            {
                "@type": "Question",
                "name": "Is there a printable version of the Easter quiz?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide a high-quality printable PDF for all our Easter trivia questions, perfect for Sunday school classes."
                }
            }
        ]
    };

    const categories = [
      { title: "The Last Supper", desc: "The final meal with the disciples.", icon: Heart, color: "text-red-500 bg-red-50" },
      { title: "The Resurrection", desc: "The miracle of the empty tomb.", icon: Sunrise, color: "text-amber-500 bg-amber-50" },
      { title: "The Road to Emmaus", desc: "Jesus appearing to His followers.", icon: Sun, color: "text-blue-500 bg-blue-50" },
      { title: "Passion Week", desc: "The events leading up to the cross.", icon: Cross, color: "text-purple-500 bg-purple-50" }
    ];

    return (
        <div className="min-h-screen bg-[#F0FDF4]">
            <SEO 
                title="Easter Bible Quiz: Resurrection Questions & Answers"
                description="Test your knowledge of the Easter story. Fun and educational Bible trivia about Jesus' resurrection, the empty tomb, and the Last Supper. Free online quiz."
                keywords="easter bible quiz, resurrection trivia questions, easter bible games, bible questions about jesus resurrection, spring bible trivia"
                url="/easter-bible-quiz"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] rounded-2xl mb-8 font-urbanist font-black text-sm uppercase tracking-widest text-emerald-600">
                        <Sunrise className="w-6 h-6" />
                        <span>He Is Risen!</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] font-urbanist leading-none tracking-tight mb-8">
                        Easter <br/><span className="text-emerald-600">Bible Quiz</span>
                    </h1>
                    <p className="text-2xl text-slate-600 font-urbanist max-w-2xl mx-auto italic leading-relaxed">
                        Celebrate the victory of life over death. Test your knowledge of the most important week in history.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mt-10">
                        <Button size="lg" className="rounded-full px-12 h-20 text-2xl font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-200" onClick={() => navigate('/public-quizzes')}>
                            Play Easter Quiz <Play className="ml-2 h-8 w-8 fill-current" />
                        </Button>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
                    {categories.map((cat, idx) => {
                        const Icon = cat.icon;
                        return (
                            <Card key={idx} className="border-[4px] border-[#1a1a1a] shadow-[8px_8px_0_0_#1a1a1a] rounded-[2rem] bg-white p-8 hover:-translate-y-2 transition-all">
                                <div className={`w-14 h-14 ${cat.color} rounded-2xl flex items-center justify-center mb-6 border-2 border-[#1a1a1a]`}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black font-urbanist text-[#1a1a1a] mb-2">{cat.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{cat.desc}</p>
                            </Card>
                        );
                    })}
                </div>

                <div className="max-w-5xl mx-auto bg-white border-[6px] border-[#1a1a1a] shadow-[15px_15px_0_0_#1a1a1a] rounded-[3rem] p-10 md:p-16 mb-20 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <Sunrise className="w-64 h-64 text-emerald-500" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black font-urbanist text-[#1a1a1a]">Easter Sunday Spectacular!</h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
                                "Perfect for your Easter breakfast or church service. Host a live resurrection trivia competition and see who knows the story the best."
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Chronological story tracking",
                                    "Interactive Gospel references",
                                    "Spring-themed visuals and animations",
                                    "Easy-to-use classroom mode"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 font-bold text-[#1a1a1a]">
                                        <div className="w-2 h-2 rounded-full bg-emerald-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="shrink-0">
                            <div className="p-8 bg-emerald-50 border-4 border-dashed border-emerald-200 rounded-[2rem] text-center">
                                <Sparkles className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                                <h4 className="text-xl font-black mb-4">Print Resources</h4>
                                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold px-8" onClick={() => navigate('/bible-quiz-printable-pdf')}>
                                    Get Easter PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto text-center mb-20">
                    <h2 className="text-3xl font-black font-urbanist text-[#1a1a1a] mb-12">Expand Your Journey</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Button variant="outline" className="h-20 rounded-2xl border-2 border-[#1a1a1a] text-lg font-black bg-white hover:bg-slate-50 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-none" onClick={() => navigate('/bible-verses-for-strength')}>
                            Strength Verses
                        </Button>
                        <Button variant="outline" className="h-20 rounded-2xl border-2 border-[#1a1a1a] text-lg font-black bg-white hover:bg-slate-50 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-none" onClick={() => navigate('/christmas-bible-quiz')}>
                            Christmas Quiz
                        </Button>
                        <Button variant="outline" className="h-20 rounded-2xl border-2 border-[#1a1a1a] text-lg font-black bg-white hover:bg-slate-50 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-none" onClick={() => navigate('/old-testament-quiz')}>
                            The Law & Prophets
                        </Button>
                    </div>
                </div>

                <RelatedContentWidget />
            </main>

            <Footer />
        </div>
    );
};

export default EasterQuiz;
