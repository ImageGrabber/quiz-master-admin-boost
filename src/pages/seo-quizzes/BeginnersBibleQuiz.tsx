import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    CheckCircle2, 
    Compass, 
    Play, 
    Book, 
    Users, 
    Star,
    Sparkles,
    ArrowRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const BeginnersBibleQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "I don't know much about the Bible. Is this quiz for me?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! Our 'Beginner' and 'Easy' quizzes are designed specifically for newcomers. We focus on the most popular stories and characters so everyone can participate and learn."
                }
            },
            {
                "@type": "Question",
                "name": "Are there hints provided for beginner quizzes?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, many of our beginner-level quizzes include 'Selah Hints'—short scripture clues that help guide you to the correct answer if you get stuck."
                }
            },
            {
                "@type": "Question",
                "name": "How is a beginner quiz different from an intermediate one?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Beginner quizzes focus on the 'What' (who, where, when) of Bible stories, while intermediate and advanced levels focus on the 'How' and 'Why' (theology, historical context, and greek/hebrew meanings)."
                }
            }
        ]
    };

    const easyTopics = [
        { title: "Famous Characters", desc: "Adam, Noah, Moses, and David.", icon: Users, color: "bg-blue-50 text-blue-600" },
        { title: "Miracles of Jesus", desc: "Healing the sick and walking on water.", icon: Sparkles, color: "bg-amber-50 text-amber-600" },
        { title: "The Creation Story", desc: "How the world began in Genesis.", icon: Compass, color: "bg-green-50 text-green-600" },
        { title: "Bible Basics", desc: "How many books, who wrote them.", icon: Book, color: "bg-purple-50 text-purple-600" }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO 
                title="Easy Bible Quiz for Beginners | Free Online Trivia & Lessons"
                description="Start your journey into God's Word with our easy Bible quizzes for beginners. Simple questions, helpful hints, and fun learning for all ages."
                keywords="bible quiz for beginners easy, easy bible trivia for adults, simple bible questions, learn bible for beginners"
                url="/bible-quiz-for-beginners"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
                        <Compass className="w-4 h-4" />
                        <span>Perfect for New Believers</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-urbanist leading-tight">
                        Bible Quiz for <span className="text-blue-600">Beginners</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto mb-10">
                        New to the Bible? No problem! Our easy quizzes are designed to help you learn the most important stories and truths of scripture in a fun, pressure-free way.
                    </p>
                    <Button size="lg" className="rounded-full px-12 h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100" onClick={() => navigate('/public-quiz/genesis')}>
                        Start Learning Now <Play className="ml-2 h-6 w-6 fill-current" />
                    </Button>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
                    {easyTopics.map((topic, idx) => {
                        const Icon = topic.icon;
                        return (
                            <Card key={idx} className="border-none shadow-lg shadow-slate-200/50 rounded-3xl bg-white p-8 text-center hover:-translate-y-1 transition-transform group">
                                <div className={`w-14 h-14 ${topic.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300`}>
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2 font-urbanist">{topic.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {topic.desc}
                                </p>
                            </Card>
                        );
                    })}
                </div>

                <div className="max-w-5xl mx-auto mb-20">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="space-y-8">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 font-urbanist">A Friendly Introduction to Scripture</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Starting out with the Bible can feel overwhelming. With 66 books and thousands of years of history, it's hard to know where to begin. That's why we created the **Beginner Path**.
                            </p>
                            <ul className="space-y-5">
                                {[
                                    "No difficult theological jargon",
                                    "Focus on the 'Big Picture' stories",
                                    "Multiple choice answers to aid learning",
                                    "Instant feedback on every question"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 text-slate-800 font-bold">
                                        <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <Button variant="outline" className="rounded-full px-8 h-12" onClick={() => navigate('/bible-study')}>
                                    View Beginner Study Guide
                                </Button>
                            </div>
                        </div>
                        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden flex flex-col items-center text-center">
                            <Star className="w-16 h-16 text-amber-400 mb-6 fill-amber-400 animate-pulse" />
                            <h3 className="text-2xl font-bold mb-4">Earn Your First Badge</h3>
                            <p className="text-slate-400 mb-8 max-w-sm">
                                Complete any 10 beginner quizzes to earn the **'Seedling of Faith'** badge. It's the perfect way to track your progress as you grow.
                            </p>
                            <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold px-10 h-12" onClick={() => navigate('/auth/register')}>
                                Claim Your Profile
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto bg-blue-50/50 rounded-[3rem] p-10 md:p-16 border border-blue-100 mb-20">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8 font-urbanist text-center">Recommended First Quizzes</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="p-6 border-none shadow-sm cursor-pointer hover:bg-blue-600 hover:text-white transition-all group" onClick={() => navigate('/public-quiz/genesis')}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Book className="w-5 h-5 text-blue-600 group-hover:text-white" />
                                    <span className="font-bold">Genesis: The Beginning</span>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                            </div>
                        </Card>
                        <Card className="p-6 border-none shadow-sm cursor-pointer hover:bg-amber-600 hover:text-white transition-all group" onClick={() => navigate('/public-quiz/matthew')}>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="w-5 h-5 text-amber-600 group-hover:text-white" />
                                    <span className="font-bold">Introduction to Jesus</span>
                                </div>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all" />
                            </div>
                        </Card>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <RelatedContentWidget />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BeginnersBibleQuiz;
