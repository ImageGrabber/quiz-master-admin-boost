import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    ScrollText, 
    Mountain, 
    Trophy, 
    Play, 
    ArrowRight, 
    Flame,
    Gem
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const OldTestamentQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How many books are in the Old Testament?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Protestant Bible includes 39 books in the Old Testament, ranging from Genesis to Malachi. These record the history of creation, the patriarchs, and the people of Israel."
                }
            },
            {
                "@type": "Question",
                "name": "What are the major sections of the Old Testament?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Old Testament is commonly divided into five sections: The Pentateuch (Books of Law), Historical Books, Wisdom/Poetical Books, Major Prophets, and Minor Prophets."
                }
            },
            {
                "@type": "Question",
                "name": "Are these quizzes based on the KJV or NIV?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our Old Testament quizzes are designed for cross-version compatibility, focusing on the historical and theological events that are consistent across major translations like NIV, ESV, and KJV."
                }
            }
        ]
    };

    const testamentSections = [
        { title: "The Law (Torah)", items: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"], icon: ScrollText, color: "text-amber-600 bg-amber-50" },
        { title: "Major Prophets", items: ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"], icon: Flame, color: "text-red-600 bg-red-50" },
        { title: "Wisdom & Poetry", items: ["Job", "Psalms", "Proverbs", "Ecclesiastes"], icon: Gem, color: "text-blue-600 bg-blue-50" },
        { title: "History", items: ["Joshua", "Judges", "Kings", "Ezra", "Nehemiah"], icon: Mountain, color: "text-green-600 bg-green-50" }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <SEO 
                title="Old Testament Bible Quiz Questions and Answers | Complete Trivia"
                description="Test your knowledge of the Old Testament with our free quizzes. Hundreds of questions on the Law, Prophets, and History of Israel. Genesis to Malachi."
                keywords="old testament quiz, old testament trivia questions, bible quiz questions and answers old testament, bible story quizzes"
                url="/old-testament-quiz"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold mb-6">
                        <ScrollText className="w-4 h-4" />
                        <span>Discover Ancient Truths</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-urbanist leading-tight">
                        The <span className="text-amber-600">Old Testament</span> Quiz
                    </h1>
                    <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto mb-10 leading-relaxed">
                        Journey through the foundations of faith. From the creation of the world to the prophecies of the coming Savior, test your knowledge of the first 39 books of the Bible.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="rounded-full px-12 h-16 text-xl font-bold bg-slate-900 hover:bg-black shadow-xl" onClick={() => navigate('/public-quiz/genesis')}>
                            Start Old Testament Quiz <Play className="ml-2 h-6 w-6 fill-current" />
                        </Button>
                    </div>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
                    {testamentSections.map((section, idx) => {
                        const Icon = section.icon;
                        return (
                            <Card key={idx} className="border-none shadow-xl shadow-slate-200/50 rounded-3xl bg-white p-8 group hover:-translate-y-2 transition-all duration-300">
                                <div className={`w-12 h-12 ${section.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 font-urbanist">{section.title}</h3>
                                <ul className="space-y-2">
                                    {section.items.map((book, i) => (
                                        <li key={i} className="text-slate-500 text-sm flex items-center gap-2 group/item cursor-pointer hover:text-blue-600 font-medium" onClick={() => navigate(`/public-quiz/${book.toLowerCase().replace(' ', '-')}`)}>
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
                    <h2 className="text-3xl font-black text-slate-900 mb-8 font-urbanist">Explore Original Scripture</h2>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
                        <p>
                            The Old Testament (often referred to as the Hebrew Bible) contains the foundational records of God's relationship with humanity. It covers approximately 4,000 years of history, from the dawn of creation to the return of the Exiles from Babylon.
                        </p>
                        <p>
                            Our comprehensive Old Testament trivia collection is designed for all skill levels. Whether you are studying for a Bible bowl, preparing a Sunday school lesson, or just refreshing your personal knowledge, you'll find categorized questions that challenge your memory of:
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 pt-4">
                            {[
                                "The Covenant with Abraham",
                                "The Exodus from Egypt",
                                "The Reign of King David",
                                "The Wisdom of Solomon",
                                "The Prophecies of Isaiah",
                                "The Story of Queen Esther"
                            ].map((topic, i) => (
                                <div key={i} className="flex items-center gap-3 font-bold text-slate-800">
                                    <Trophy className="w-5 h-5 text-amber-500" />
                                    {topic}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-[3rem] p-12 text-center text-white mb-20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 flex flex-wrap gap-12 pointer-events-none">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <ScrollText key={i} className="w-24 h-24 rotate-12" />
                            ))}
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black mb-4 font-urbanist">Ready for the New Testament?</h2>
                            <p className="text-amber-100 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
                                Once you've mastered the foundations of the Old Testament, move forward to the life of Christ and the growth of the early Church.
                            </p>
                            <Button size="lg" className="bg-white text-amber-700 hover:bg-amber-50 rounded-full font-bold px-12" onClick={() => navigate('/new-testament-quiz')}>
                                New Testament Quizzes <ArrowRight className="ml-2 h-5 w-5" />
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

export default OldTestamentQuiz;
