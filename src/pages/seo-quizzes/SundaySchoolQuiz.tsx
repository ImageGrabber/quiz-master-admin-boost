import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    BookOpen, 
    Trophy, 
    Users, 
    Play, 
    CheckCircle2, 
    Star, 
    GraduationCap,
    Download,
    Lightbulb
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const SundaySchoolQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Are these Sunday school quiz questions free to use?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, all our Bible quiz questions and answers for Sunday school are completely free for personal, classroom, and church use."
                }
            },
            {
                "@type": "Question",
                "name": "What age group is this Bible quiz for?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "These questions are designed for children aged 6 to 12, covering both beginner and intermediate biblical knowledge."
                }
            },
            {
                "@type": "Question",
                "name": "Can I download these Sunday school questions as a PDF?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide a printable version for teachers to use in their lessons. Simply click the download button at the bottom of the section."
                }
            }
        ]
    };

    const beginnerQA = [
        { q: "Who was the first man created by God?", a: "Adam" },
        { q: "How many days did it take God to create the world?", a: "Six days (He rested on the seventh)" },
        { q: "Who built an ark to save his family from the flood?", a: "Noah" },
        { q: "What was the name of Jesus' mother?", a: "Mary" },
        { q: "What is the very first book of the Bible?", a: "Genesis" }
    ];

    const intermediateQA = [
        { q: "Which young boy defeated a giant named Goliath?", a: "David" },
        { q: "How many disciples did Jesus choose?", a: "Twelve" },
        { q: "Who received the Ten Commandments from God on Mount Sinai?", a: "Moses" },
        { q: "What was the last book of the Bible?", a: "Revelation" },
        { q: "Who was swallowed by a great fish because he disobeyed God?", a: "Jonah" }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO 
                title="Bible Quiz for Sunday School: Free Questions & Answers for Kids"
                description="The ultimate collection of Sunday school Bible quiz questions and answers. Fun, educational, and free trivia for Sunday school teachers and children."
                keywords="bible quiz for sunday school, bible trivia for kids, sunday school teaching resources, christian quiz for children, free bible questions"
                url="/bible-quiz-for-sunday-school"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-16 pt-24 md:pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
                        <GraduationCap className="w-5 h-5" />
                        <span>Teacher Approved Resources</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-urbanist tracking-tight leading-tight">
                        Bible Quiz for <span className="text-blue-600">Sunday School</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto leading-relaxed">
                        Engage your students with fun and educational Bible questions. Perfect for warm-ups, group competitions, or review sessions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-10">
                        <Button size="lg" className="rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-blue-200" onClick={() => navigate('/public-quiz/genesis')}>
                            <Play className="mr-2 h-5 w-5 fill-current" /> Play Live Quiz
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg font-bold border-slate-200" onClick={() => window.print()}>
                            <Download className="mr-2 h-5 w-5" /> Print Questions
                        </Button>
                    </div>
                </header>

                <div className="max-w-5xl mx-auto">
                    {/* Beginner Section */}
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-green-100 rounded-2xl">
                                <Star className="w-8 h-8 text-green-600 fill-current" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 font-urbanist">Beginner Level (Ages 6-8)</h2>
                                <p className="text-slate-500">Foundation questions for younger children.</p>
                            </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-8">
                            <Card className="border-none shadow-xl shadow-slate-100 bg-white rounded-3xl overflow-hidden">
                                <CardHeader className="bg-slate-900 text-white">
                                    <CardTitle className="text-xl">Quick Review Questions</CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        {beginnerQA.map((item, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="mt-1">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{item.q}</p>
                                                    <p className="text-blue-600 mt-1 font-semibold">Answer: {item.a}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <div className="bg-blue-600 rounded-3xl p-10 text-white flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <Trophy className="w-64 h-64" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4">Host a Classroom Competition</h3>
                                    <p className="text-blue-100 mb-8 leading-relaxed">
                                        Use our multiplayer mode to let children compete against each other in real-time. Boosts engagement and makes learning scripture fun!
                                    </p>
                                    <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-full font-bold px-8" onClick={() => navigate('/auth/register')}>
                                        Get Started Free
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Intermediate Section */}
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-blue-100 rounded-2xl">
                                <Users className="w-8 h-8 text-blue-600 font-black" />
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 font-urbanist">Intermediate Level (Ages 9-12)</h2>
                                <p className="text-slate-500">Challenging questions for older Sunday school students.</p>
                            </div>
                        </div>

                        <Card className="border-none shadow-xl shadow-slate-100 rounded-3xl overflow-hidden">
                            <CardContent className="p-0">
                                <div className="grid md:grid-cols-2">
                                    <div className="p-10 bg-slate-50">
                                        <div className="space-y-4">
                                            {intermediateQA.map((item, idx) => (
                                                <Accordion type="single" collapsible key={idx}>
                                                    <AccordionItem value={`item-${idx}`} className="border-slate-200">
                                                        <AccordionTrigger className="text-left font-bold text-slate-800 hover:text-blue-600 transition-colors">
                                                            {item.q}
                                                        </AccordionTrigger>
                                                        <AccordionContent className="text-blue-600 font-black text-lg">
                                                            Answer: {item.a}
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                </Accordion>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-10 flex flex-col justify-center items-center text-center space-y-6 bg-white border-l border-slate-100">
                                        <Lightbulb className="w-16 h-16 text-amber-500 animate-pulse" />
                                        <h3 className="text-2xl font-bold text-slate-900">Teaching Tip</h3>
                                        <p className="text-slate-600 leading-relaxed italic">
                                            "Try asking the 'Why' after they get the answer right. For example, 'Why did David choose five smooth stones even though he only needed one?' This encourages deeper biblical discussion."
                                        </p>
                                        <Button variant="outline" className="rounded-full px-8" onClick={() => navigate('/bible-study')}>
                                            View Study Guides
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Content Section for SEO */}
                    <section className="prose prose-slate max-w-none mb-20 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-sm">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Use Bible Quizzes in Sunday School</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Sunday school teachers often struggle to keep children engaged while teaching deep spiritual truths. Incorporating interactive Bible quizzes into your lesson plan is one of the most effective ways to ensure children retain what they've learned.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <div>
                                <h4 className="font-bold text-slate-900 mb-2">1. Memory Reinforcement</h4>
                                <p className="text-sm text-slate-500">Quizzes help move stories from the 'Short-term memory' to the 'Heart'. When children answer correctly, it reinforces their confidence in the Word.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-2">2. Healthy Competition</h4>
                                <p className="text-sm text-slate-500">Group-based quizzes encourage teamwork. Divide your class into teams to foster cooperation and excitement for the next Sunday lesson.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-2">3. Identifying Gaps</h4>
                                <p className="text-sm text-slate-500">Answers provided by children give teachers insight into which parts of the Bible story need more explanation or emphasis in next week's session.</p>
                            </div>
                        </div>
                    </section>

                    <RelatedContentWidget />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default SundaySchoolQuiz;
