import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Sparkles, 
    Cross, 
    Play, 
    ArrowRight, 
    Church,
    Heart,
    MessageCircle
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const NewTestamentQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How many books are in the New Testament?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The New Testament consists of 27 books, starting with the Gospel of Matthew and ending with the Book of Revelation."
                }
            },
            {
                "@type": "Question",
                "name": "What are the four Gospels?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The four Gospels are Matthew, Mark, Luke, and John. They record the life, ministry, death, and resurrection of Jesus Christ."
                }
            },
            {
                "@type": "Question",
                "name": "Who wrote most of the letters in the New Testament?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Apostle Paul is the author of many of the epistles (letters) in the New Testament, including Romans, Corinthians, Galatians, and others."
                }
            }
        ]
    };

    const newTestamentSections = [
        { title: "The Gospels", items: ["Matthew", "Mark", "Luke", "John"], icon: Heart, color: "text-blue-600 bg-blue-50" },
        { title: "Early Church", items: ["Acts of the Apostles"], icon: Church, color: "text-purple-600 bg-purple-50" },
        { title: "Pauline Epistles", items: ["Romans", "Corinthians", "Galatians", "Ephesians"], icon: MessageCircle, color: "text-green-600 bg-green-50" },
        { title: "The Revelation", items: ["Book of Revelation"], icon: Sparkles, color: "text-amber-600 bg-amber-50" }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO 
                title="New Testament Bible Quiz Questions and Answers | Gospels & Letters"
                description="Test your knowledge of the New Testament. Hundreds of trivia questions and answers on Jesus, the Apostles, and the Early Church. Matthew to Revelation."
                keywords="new testament quiz, new testament trivia questions, bible quiz questions and answers new testament, gospel quizzes"
                url="/new-testament-quiz"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold mb-6">
                        <Cross className="w-4 h-4" />
                        <span>The Life & Message of Jesus</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-urbanist leading-tight">
                        The <span className="text-blue-600">New Testament</span> Quiz
                    </h1>
                    <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto mb-10 leading-relaxed">
                        Explore the revolutionary message of the Gospel. From the birth of Christ to the visionary promises of Revelation, challenge yourself with the 27 books of the New Testament.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="rounded-full px-12 h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200" onClick={() => navigate('/public-quiz/matthew')}>
                            Start New Testament Quiz <Play className="ml-2 h-6 w-6 fill-current" />
                        </Button>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
                    {newTestamentSections.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                            <Card key={idx} className="border-none shadow-xl shadow-slate-200/50 rounded-3xl bg-white p-8 group hover:-translate-y-2 transition-all duration-300">
                                <div className={`w-12 h-12 ${section.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 font-urbanist">{section.title}</h3>
                                <ul className="space-y-2">
                                    {section.items.map((book, i) => (
                                        <li key={i} className="text-slate-500 text-sm flex items-center gap-2 group/item cursor-pointer hover:text-blue-600 font-medium" onClick={() => navigate(`/public-quiz/${book.toLowerCase().split(' ')[0]}`)}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover/item:bg-blue-600" />
                                            {book}
                                        </li>
                                    ))}
                                </ul>
                            </Card>
                        );
                    })}
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-[3rem] border border-slate-100 p-10 md:p-16 shadow-sm mb-20">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 font-urbanist">Living Grace & Truth</h2>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                        <p>
                            The New Testament reveals the fulfillment of God's redemptive plan through Jesus Christ. It documents the establishment of the Church, the spread of the Gospel across the Roman Empire, and provides practical instruction for Christian living through the apostolic letters.
                        </p>
                        <p>
                            Whether you're a devoted student of the Word or just beginning to explore the teachings of Jesus, our New Testament quizzes offer a comprehensive look at:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                            {[
                                "The Parables of Jesus",
                                "The Miracles of the Apostles",
                                "The Life of the Apostle Paul",
                                "The Sermon on the Mount",
                                "Practical Living in James",
                                "The Seven Churches of Revelation"
                            ].map((topic, i) => (
                                <div key={i} className="flex items-center gap-3 font-bold text-slate-800">
                                    <Sparkles className="w-5 h-5 text-blue-500" />
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-[3rem] p-12 text-center text-white mb-20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 flex flex-wrap gap-12 pointer-events-none">
                            <Cross className="w-24 h-24" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black mb-4 font-urbanist">Mastered the New?</h2>
                            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                                Don't forget the foundations. Explore the history and prophecies of the Old Testament to see the beauty of God's complete message.
                            </p>
                            <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 rounded-full font-bold px-12" onClick={() => navigate('/old-testament-quiz')}>
                                Old Testament Quizzes <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <RelatedContentWidget />
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NewTestamentQuiz;
