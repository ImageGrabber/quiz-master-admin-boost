import React from 'react';
import SEO from '@/components/SEO';
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
    
    const intentFaq = [
        {
            q: "Can I use these Bible quiz questions and answers for Sunday school?",
            a: "Yes. These Bible quiz questions and answers are suitable for Sunday school warm-ups, youth fellowship rounds, and church group practice."
        },
        {
            q: "Is there a free Bible quiz with no signup?",
            a: "Yes. You can start practice instantly using our free public quiz pages without registration."
        },
        {
            q: "Do you have hard Bible quiz questions for adults?",
            a: "Yes. Use the hard trivia section on this page, then continue to our advanced quiz collections for deeper scripture challenges."
        },
        {
            q: "Can I print Bible quiz questions and answers as PDF?",
            a: "Yes. Use the print/download button on this page to generate printable quiz practice sheets for class or church use."
        },
    ];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO
                title="Bible Quiz Questions and Answers | 2026 Edition | PDF & Multiple Choice"
                description="The ultimate collection of Bible quiz questions and answers for 2026. Includes general knowledge, hard trivia, and youth quizzes. Play online or download as PDF."
                keywords="bible quiz with answers, bible quiz questions and answers pdf, multiple choice bible quiz, bible trivia for youth, hard bible questions, scripture knowledge test"
                author="Bible Quiz Competition"
                url="/bible-quiz-questions-and-answers"
                structuredData={{
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    "mainEntity": [
                        ...generalKnowledgeQA, ...hardTriviaQA, ...youthQA, ...intentFaq
                    ].map(item => ({
                        "@type": "Question",
                        "name": item.q,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": item.a
                        }
                    }))
                }}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-8 pt-24">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
                        Bible Quiz Questions and Answers (2026 Edition)
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-urbanist">
                        Bible quiz questions and answers for kids, youth, and adults in one place.
                        Practice easy, multiple-choice, and hard Bible trivia, then move into chapter-wise challenge routes.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/daily-bible-quiz')}>
                            <Play className="mr-2 h-5 w-5" /> Play Interactive Quiz
                        </Button>
                        <Button size="lg" variant="outline" onClick={handlePrint}>
                            <FileText className="mr-2 h-5 w-5" /> Download / Print PDF
                        </Button>
                    </div>
                </header>
                
                <section className="mb-12 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 md:p-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-3">Quick Answer: How to Practice Bible Quiz Questions and Answers</h2>
                    <p className="text-slate-700 leading-relaxed mb-4">
                        Start with 10 general Bible quiz questions and answers, move to hard trivia, and finish with youth or chapter-wise sets. This format improves recall, speed, and scripture confidence for church competitions.
                    </p>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <Button variant="outline" className="justify-start" onClick={() => navigate('/bible-questions-and-answers-hub')}>Bible Q&A Hub</Button>
                        <Button variant="outline" className="justify-start" onClick={() => navigate('/bible-quiz-for-sunday-school')}>Sunday School Quiz</Button>
                        <Button variant="outline" className="justify-start" onClick={() => navigate('/free-bible-quiz-no-signup')}>No Signup Quiz</Button>
                        <Button variant="outline" className="justify-start" onClick={() => navigate('/public-quiz')}>Public Quiz Hub</Button>
                    </div>
                </section>

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
                
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                    <Card className="bg-white shadow-sm border-slate-200">
                        <CardContent className="pt-6">
                            <Accordion type="single" collapsible className="w-full">
                                {intentFaq.map((item, idx) => (
                                    <AccordionItem key={idx} value={`faq-${idx}`}>
                                        <AccordionTrigger className="text-left font-medium text-slate-900">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-slate-700">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </section>

                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-800 mb-6">Related Bible Quiz Resources</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { label: "Bible Questions Hub", path: "/bible-questions" },
                            { label: "Bible Q&A Book Hubs", path: "/bible-questions-and-answers-hub" },
                            { label: "Top 100 Bible Questions", path: "/top-100-bible-quiz-questions" },
                            { label: "Old Testament Quiz", path: "/old-testament-quiz" },
                            { label: "New Testament Quiz", path: "/new-testament-quiz" },
                            { label: "Bible Quiz for Kids, Teens, Adults", path: "/bible-quiz-for-kids-teens-adults" },
                            { label: "Bible Quiz for Youth", path: "/bible-quiz-with-answers-for-youth" },
                            { label: "Sunday School Quiz", path: "/bible-quiz-for-sunday-school" },
                            { label: "Printable Bible Quiz PDF", path: "/bible-quiz-printable-pdf" },
                        ].map((item) => (
                            <Button key={item.path} variant="outline" className="justify-start h-auto py-3" onClick={() => navigate(item.path)}>
                                {item.label}
                            </Button>
                        ))}
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
