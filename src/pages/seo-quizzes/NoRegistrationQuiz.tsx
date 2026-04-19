import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Zap, 
    ShieldCheck, 
    Play, 
    ArrowRight, 
    Gamepad2,
    Clock,
    Lock
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const NoRegistrationQuiz = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Can I play the Bible quiz without creating an account?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely! We offer 'Guest Mode' for all our Bible quizzes, allowing you to test your knowledge immediately without any registration or email required."
                }
            },
            {
                "@type": "Question",
                "name": "Are my scores saved if I play as a guest?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Guest scores are shown on the session leaderboard but are not permanently saved to a profile. To track your historical progress and earn badges, we recommend creating a free account later."
                }
            },
            {
                "@type": "Question",
                "name": "Is there a limit to how many quizzes I can play for free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "There are no limits! You can play as many Bible quizzes as you like without ever signing up."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-white">
            <SEO 
                title="Free Online Bible Quiz: No Registration or Sign-Up Required"
                description="Play Bible quizzes online for free with no registration. Instant access to hundreds of Bible trivia questions in guest mode. No email required."
                keywords="free online bible quiz no registration, play bible quiz as guest, no sign up bible trivia, instant bible games"
                url="/free-bible-quiz-no-signup"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold mb-6">
                        <Zap className="w-4 h-4 fill-current" />
                        <span>Instant Access Mode</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 font-urbanist leading-tight">
                        Bible Quiz <span className="text-blue-600">No Registration</span>
                    </h1>
                    <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto mb-10">
                        Skip the forms and start playing immediately. Test your scripture knowledge in seconds with our high-speed guest mode.
                    </p>
                    <Button size="lg" className="rounded-full px-12 h-16 text-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-100" onClick={() => navigate('/public-quizzes')}>
                        Play Now as Guest <Play className="ml-2 h-6 w-6 fill-current" />
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
                    <Card className="border-2 border-slate-100 shadow-none hover:border-blue-200 transition-colors p-8 text-center bg-slate-50/50">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-sm">
                            <Lock className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 font-urbanist">No Email Required</h3>
                        <p className="text-slate-500 leading-relaxed">
                            We value your privacy. Play all our quizzes without ever giving us your personal information or email address.
                        </p>
                    </Card>

                    <Card className="border-2 border-slate-100 shadow-none hover:border-blue-200 transition-colors p-8 text-center">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-sm">
                            <Clock className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 font-urbanist">Zero Wait Time</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Click and play. Our platform is optimized for speed, ensuring you spend time learning the Word, not watching loaders.
                        </p>
                    </Card>

                    <Card className="border-2 border-slate-100 shadow-none hover:border-blue-200 transition-colors p-8 text-center bg-slate-50/50">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100 shadow-sm">
                            <Gamepad2 className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 font-urbanist">Full Catalog Access</h3>
                        <p className="text-slate-500 leading-relaxed">
                            Guests get access to all 66 books of the Bible, from Genesis to Revelation, with no features locked behind a paywall.
                        </p>
                    </Card>
                </div>

                <div className="max-w-4xl mx-auto mb-20">
                    <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full -mr-32 -mt-32"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6">
                                <h2 className="text-3xl md:text-4xl font-black font-urbanist tracking-tight">Why Play Without Sign-Up?</h2>
                                <p className="text-slate-400 text-lg leading-relaxed">
                                    Sometimes you just want a quick 5-minute break with the Word. Our 'No Registration' mode is perfect for:
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        "Quick scripture review during commutes",
                                        "Sharing a quick game with a friend",
                                        "Testing the platform before committing to a profile",
                                        "Use in classroom settings for temporary students"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3">
                                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                                            <span className="text-slate-200 font-medium">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-64">
                                <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 h-14 rounded-2xl font-bold" onClick={() => navigate('/public-quizzes')}>
                                    Start Guest Quiz <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <section className="prose prose-slate max-w-none mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 font-urbanist text-center">Frequently Asked Questions</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-900">Is this really free?</h4>
                                <p className="text-slate-500">Yes, the entire Bible Quiz Competition platform is free for users worldwide. We exist to help believers learn and grow in their knowledge of the Bible.</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-slate-900">What if I want to save my progress later?</h4>
                                <p className="text-slate-500">You can create an account at any time! Even if you start as a guest, you can register in seconds to begin building your historical leaderboard stats.</p>
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

export default NoRegistrationQuiz;
