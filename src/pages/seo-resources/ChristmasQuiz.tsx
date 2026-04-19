import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Gift, 
    Star, 
    Snowflake, 
    Play, 
    ArrowRight, 
    Music,
    Users,
    Sparkles
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const ChristmasQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What are some good Christmas Bible quiz questions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Popular questions include: 'Where was Jesus born?', 'Which angel appeared to Mary?', and 'What did the wise men bring to Jesus?' our quiz covers all these and more."
                }
            },
            {
                "@type": "Question",
                "name": "Is this Christmas quiz suitable for a church party?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our Christmas Bible quiz is designed for all ages and is perfect for church gatherings, family dinners, or Sunday school celebrations."
                }
            },
            {
                "@type": "Question",
                "name": "Can I play this quiz in multiplayer mode?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! You can host a live Christmas competition and have your friends join using a room code for festive fun."
                }
            }
        ]
    };

    const categories = [
      { title: "The Nativity", desc: "The birth of Jesus in Bethlehem.", icon: Star, color: "text-amber-500 bg-amber-50" },
      { title: "Angels & Shepherds", desc: "The heavenly host and the first witnesses.", icon: Snowflake, color: "text-blue-500 bg-blue-50" },
      { title: "The Wise Men", desc: "The journey of the Magi and their gifts.", icon: Gift, color: "text-red-500 bg-red-50" },
      { title: "Christmas Prophecies", desc: "Old Testament promises of the Savior.", icon: Sparkles, color: "text-purple-500 bg-purple-50" }
    ];

    return (
        <div className="min-h-screen bg-[#FDF2F2]">
            <SEO 
                title="Christmas Bible Quiz: Fun Questions & Answers for the Season"
                description="Celebrate the season with our Christmas Bible quiz. Test your knowledge of the Nativity, the Wise Men, and the true meaning of Christmas. Free and fun for all ages."
                keywords="christmas bible quiz, nativity trivia questions, christmas bible games, bible questions about jesus birth, festive bible trivia"
                url="/christmas-bible-quiz"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] rounded-2xl mb-8 font-urbanist font-black text-sm uppercase tracking-widest text-red-600">
                        <Gift className="w-6 h-6" />
                        <span>The Ultimate Holiday Trivia</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] font-urbanist leading-none tracking-tight mb-8">
                        Christmas <br/><span className="text-red-600">Bible Quiz</span>
                    </h1>
                    <p className="text-2xl text-slate-600 font-urbanist max-w-2xl mx-auto italic leading-relaxed">
                        Test your knowledge of the greatest story ever told. From the star of Bethlehem to the humble manger.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 mt-10">
                        <Button size="lg" className="rounded-full px-12 h-20 text-2xl font-black bg-red-600 hover:bg-red-700 text-white shadow-xl shadow-red-200" onClick={() => navigate('/public-quizzes')}>
                            Play Festive Quiz <Play className="ml-2 h-8 w-8 fill-current" />
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
                        <Star className="w-64 h-64 text-amber-500" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black font-urbanist text-[#1a1a1a]">Host a Christmas Bible Bowl!</h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium italic">
                                "Make your festive gathering unforgettable. Use our multiplayer mode to host a live competition during your Christmas dinner or youth group party."
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Customizable question difficulty",
                                    "Festive background music and effects",
                                    "Live leaderboard for extra excitement",
                                    "Playable on any mobile or desktop device"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 font-bold text-[#1a1a1a]">
                                        <div className="w-2 h-2 rounded-full bg-red-600" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="shrink-0">
                            <div className="p-8 bg-red-50 border-4 border-dashed border-red-200 rounded-[2rem] text-center">
                                <Users className="w-16 h-16 text-red-600 mx-auto mb-4" />
                                <h4 className="text-xl font-black mb-4">Multiplayer Mode</h4>
                                <Button className="bg-red-600 hover:bg-red-700 text-white rounded-full font-bold px-8" onClick={() => navigate('/bible-quiz-multiplayer')}>
                                    Create Room
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto text-center mb-20">
                    <h2 className="text-3xl font-black font-urbanist text-[#1a1a1a] mb-12">More Holiday Resources</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <Button variant="outline" className="h-20 rounded-2xl border-2 border-[#1a1a1a] text-lg font-black bg-white hover:bg-slate-50 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-none" onClick={() => navigate('/bible-verses-for-peace')}>
                            Peace Verses
                        </Button>
                        <Button variant="outline" className="h-20 rounded-2xl border-2 border-[#1a1a1a] text-lg font-black bg-white hover:bg-slate-50 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-none" onClick={() => navigate('/easter-bible-quiz')}>
                            Easter Quiz
                        </Button>
                        <Button variant="outline" className="h-20 rounded-2xl border-2 border-[#1a1a1a] text-lg font-black bg-white hover:bg-slate-50 shadow-[4px_4px_0_0_#1a1a1a] active:translate-y-1 active:shadow-none" onClick={() => navigate('/malayalam-songs')}>
                            Christmas Lyrics
                        </Button>
                    </div>
                </div>

                <RelatedContentWidget />
            </main>

            <Footer />
        </div>
    );
};

export default ChristmasQuiz;
