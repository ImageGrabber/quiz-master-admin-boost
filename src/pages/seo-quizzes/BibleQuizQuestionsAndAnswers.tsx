import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Play, FileText, Share2, BookOpen, Trophy, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';

const BibleQuizQuestionsAndAnswers = () => {
    const navigate = useNavigate();

    const generalKnowledgeQA = [
        { q: "What is the first book of the Bible?", a: "Genesis" },
        { q: "Who built the Ark?", a: "Noah" },
        { q: "How many commandments did God give Moses?", a: "10" },
        { q: "Who defeated Goliath?", a: "David" },
        { q: "Where was Jesus born?", a: "Bethlehem" },
        { q: "Who betrayed Jesus?", a: "Judas Iscariot" },
        { q: "What is the shortest verse in the Bible?", a: "Jesus wept (John 11:35)" },
        { q: "Who was swallowed by a great fish?", a: "Jonah" },
        { q: "Who led the Israelites out of Egypt?", a: "Moses" },
        { q: "What is the last book of the Bible?", a: "Revelation" },
    ];

    const hardTriviaQA = [
        { q: "Who was the father of Methuselah?", a: "Enoch" },
        { q: "What was the name of the copper snake Moses made?", a: "Nehushtan" },
        { q: "Who was the only female judge of Israel?", a: "Deborah" },
        { q: "Where did the contest between Elijah and the prophets of Baal take place?", a: "Mount Carmel" },
        { q: "What was the name of Abraham's second wife?", a: "Keturah" },
    ];

    const youthQA = [
        { q: "Who had a coat of many colors?", a: "Joseph" },
        { q: "Who was the strongest man in the Bible?", a: "Samson" },
        { q: "What did God create on the first day?", a: "Light" },
        { q: "Who was the 'father of faith'?", a: "Abraham" },
        { q: "Who denied Jesus three times?", a: "Peter" },
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Helmet>
                <title>Bible Quiz Questions and Answers | 2025 Edition | PDF & Multiple Choice</title>
                <meta name="description" content="The ultimate collection of Bible quiz questions and answers for 2025. Includes general knowledge, hard trivia, and youth quizzes. Play online or download as PDF." />
                <meta name="keywords" content="bible quiz with answers, bible quiz questions and answers pdf, multiple choice bible quiz, bible trivia for youth, hard bible questions" />
                <link rel="canonical" href="https://biblequizcompetition.com/bible-quiz-questions-and-answers" />

                {/* Structured Data for FAQPage */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            ...generalKnowledgeQA, ...hardTriviaQA, ...youthQA
                        ].map(item => ({
                            "@type": "Question",
                            "name": item.q,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": item.a
                            }
                        }))
                    })}
                </script>
            </Helmet>

            <Navigation />

            <main className="container mx-auto px-4 py-8 pt-24">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
                        Bible Quiz Questions and Answers (2025 Edition)
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-urbanist">
                        Test your knowledge with our comprehensive collection of Bible trivia.
                        From easy questions for kids to hard theology for adults, we have it all.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/todays-quiz')}>
                            <Play className="mr-2 h-5 w-5" /> Play Interactive Quiz
                        </Button>
                        <Button size="lg" variant="outline" onClick={handlePrint}>
                            <FileText className="mr-2 h-5 w-5" /> Download / Print PDF
                        </Button>
                    </div>
                </header>

                {/* General Knowledge Section */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <BookOpen className="h-8 w-8 text-blue-600" />
                        <h2 className="text-3xl font-bold text-slate-800">General Bible Knowledge</h2>
                    </div>
                    <p className="text-slate-600 mb-6">
                        These questions cover the basics of the Old and New Testaments. Perfect for Sunday school warm-ups or family game nights.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Card className="bg-white shadow-sm border-slate-200">
                            <CardHeader>
                                <CardTitle>Questions & Answers</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {generalKnowledgeQA.map((item, idx) => (
                                        <div key={idx} className="border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                                            <p className="font-medium text-slate-900 mb-1">Q: {item.q}</p>
                                            <p className="text-blue-600">A: {item.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <div className="flex flex-col justify-center items-center bg-blue-50 rounded-xl p-8 text-center">
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">Want to test yourself?</h3>
                            <p className="text-slate-600 mb-6">
                                Take our 20-question General Knowledge quiz and see where you rank on the global leaderboard.
                            </p>
                            <Button size="lg" className="w-full md:w-auto" onClick={() => navigate('/public-quiz/genesis')}>
                                Start General Quiz <Play className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Hard Trivia Section */}
                <section className="mb-16" id="hard-questions">
                    <div className="flex items-center gap-3 mb-6">
                        <Trophy className="h-8 w-8 text-amber-500" />
                        <h2 className="text-3xl font-bold text-slate-800">Hard Bible Trivia</h2>
                    </div>
                    <p className="text-slate-600 mb-6">
                        Think you're a Bible scholar? These difficult questions will challenge even the most dedicated students of the Word.
                    </p>
                    <Card className="bg-white shadow-sm border-amber-100">
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                {hardTriviaQA.map((item, idx) => (
                                    <AccordionItem key={idx} value={`item-${idx}`}>
                                        <AccordionTrigger className="text-left font-medium text-slate-900">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-amber-700 font-semibold">
                                            Answer: {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            <div className="mt-6 text-center">
                                <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50" onClick={() => navigate('/hardest-bible-trivia-questions')}>
                                    View All Hard Questions <Share2 className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Youth Section */}
                <section className="mb-16" id="youth-quiz">
                    <div className="flex items-center gap-3 mb-6">
                        <Users className="h-8 w-8 text-green-600" />
                        <h2 className="text-3xl font-bold text-slate-800">Bible Quiz for Youth</h2>
                    </div>
                    <p className="text-slate-600 mb-6">
                        Engaging questions designed for teenagers and youth groups. Mix of fun facts and important spiritual truths.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {youthQA.map((item, idx) => (
                            <Card key={idx} className="bg-green-50/50 border-green-100">
                                <CardContent className="pt-6">
                                    <p className="font-medium text-slate-900 mb-4 h-12">{item.q}</p>
                                    <div className="bg-white px-3 py-2 rounded border border-green-100 text-center text-green-700 font-bold">
                                        {item.a}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                        <Card className="bg-green-600 text-white flex flex-col justify-center items-center text-center p-6">
                            <h3 className="text-xl font-bold mb-2">Play Youth Mode</h3>
                            <p className="text-green-100 mb-4 text-sm">Interactive quiz with timers and power-ups!</p>
                            <Button variant="secondary" className="w-full bg-white text-green-700 hover:bg-green-50" onClick={() => navigate('/bible-quiz-with-answers-for-youth')}>
                                Play Now
                            </Button>
                        </Card>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="bg-blue-900 rounded-3xl p-8 md:p-16 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 font-urbanist">Ready to compete?</h2>
                    <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
                        Join thousands of other believers in the daily Bible Quiz Competition.
                        Track your progress, earn badges, and learn scripture daily.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" onClick={() => navigate('/auth/register')}>
                            Create Free Account
                        </Button>
                        <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white" onClick={() => navigate('/public-leaderboard')}>
                            View Leaderboard
                        </Button>
                    </div>
                </section>

            </main>
        </div>
    );
};

export default BibleQuizQuestionsAndAnswers;
