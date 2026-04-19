import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
    Sun, 
    Moon, 
    Wind, 
    Sparkles, 
    Heart, 
    CheckCircle2,
    Play,
    ArrowRight,
    Star,
    Quote,
    Cloud
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const CreationStory = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How many days did it take God to create the world?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "God created the world in six days and rested on the seventh day."
                }
            },
            {
                "@type": "Question",
                "name": "What was the first thing God created?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "On the first day, God created light and separated it from the darkness."
                }
            },
            {
                "@type": "Question",
                "name": "What did God say after He finished creating everything?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "After God looked at everything He had made, He said that it was 'very good'."
                }
            }
        ]
    };

    const daysOfCreation = [
        { day: 1, title: "Light", desc: "God said 'Let there be light!' and separated day from night." },
        { day: 2, title: "Sky & Water", desc: "God created the vast sky and the deep blue oceans." },
        { day: 3, title: "Land & Plants", desc: "Dry land appeared with mountains, trees, and colorful flowers." },
        { day: 4, title: "Sun, Moon & Stars", desc: "God filled the sky with the bright sun, glowing moon, and twinkling stars." },
        { day: 5, title: "Birds & Fish", desc: "The seas were filled with fish and the skies with flying birds." },
        { day: 6, title: "Animals & People", desc: "God created all the animals and finally, He created Adam and Eve." },
        { day: 7, title: "The Day of Rest", desc: "God rested and made this day special and holy." }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCF0]">
            <SEO 
                title="The Creation Story for Kids: How God Made Our Beautiful World"
                description="Read the Bible story of Creation for children. Day-by-day guide to how God made the sun, moon, stars, animals, and people. Genesis 1 for kids."
                keywords="creation story for kids, how god made the world for children, genesis 1 story for kids, bible stories about creation"
                url="/kids-stories/creation-story"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] rounded-2xl mb-8 font-urbanist font-black text-sm uppercase tracking-widest">
                        <Sun className="w-6 h-6 text-yellow-500" />
                        <span>In the Beginning...</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] font-urbanist leading-none tracking-tight mb-8">
                        The Story of <br/><span className="text-yellow-500">Creation</span>
                    </h1>
                    <p className="text-2xl text-slate-600 font-urbanist max-w-2xl mx-auto italic leading-relaxed">
                        A beautiful journey through the seven days when God spoke and the whole universe came to life.
                    </p>
                </header>

                <div className="max-w-5xl mx-auto">
                    {/* Story Intro Card */}
                    <Card className="border-[6px] border-[#1a1a1a] shadow-[15px_15px_0_0_#1a1a1a] rounded-[3rem] bg-white overflow-hidden mb-20">
                        <div className="p-8 md:p-16 relative">
                            <div className="absolute top-10 right-10 opacity-5">
                                <Sparkles className="w-40 h-40 text-yellow-500" />
                            </div>
                            
                            <div className="relative z-10 space-y-10">
                                <Quote className="w-12 h-12 text-yellow-200" />
                                <div className="prose prose-lg md:prose-2xl max-w-none font-urbanist text-slate-700">
                                    <p className="mb-8 leading-relaxed">
                                        <span className="text-7xl font-black text-yellow-500 float-left mr-4 mt-2 leading-[0.8]">L</span>
                                        ong ago, before there were any trees, animals, or even people, there was only God. The world was dark and empty, like a blank piece of paper waiting for a beautiful drawing. Then, God began to speak, and His words were so powerful that they created everything we see today!
                                    </p>
                                    <p className="leading-relaxed">
                                        Each day, God added something new and wonderful to the world. He didn't use hammers, nails, or paintbrushes—He just used His voice! Let's take a look at the amazing things God made during the very first week of the world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Day by Day Section */}
                    <div className="space-y-10 mb-20">
                        {daysOfCreation.map((item, idx) => (
                            <div key={idx} className="flex flex-col md:flex-row items-center gap-8 group">
                                <div className="w-24 h-24 rounded-[2rem] bg-white border-[4px] border-[#1a1a1a] shadow-[6px_6px_0_0_#1a1a1a] flex items-center justify-center shrink-0 group-hover:bg-yellow-400 group-hover:rotate-6 transition-all">
                                    <span className="text-3xl font-black font-urbanist">Day {item.day}</span>
                                </div>
                                <div className="flex-grow bg-white border-[4px] border-[#1a1a1a] shadow-[8px_8px_0_0_#1a1a1a] rounded-[2.5rem] p-8 md:p-10 hover:translate-y-[-4px] transition-transform">
                                    <h3 className="text-2xl md:text-3xl font-black font-urbanist text-[#1a1a1a] mb-2">{item.title}</h3>
                                    <p className="text-lg text-slate-600 font-medium italic">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Moral & Verses */}
                    <div className="grid md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-[#ECFDF5] border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-500 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Heart className="w-8 h-8 text-white fill-current" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist text-[#1a1a1a]">The Big News</h3>
                            </div>
                            <p className="text-2xl font-black text-green-700 italic leading-tight">
                                "God made you, me, and everything in the world because He is full of love and creativity!"
                            </p>
                            <div className="space-y-4 pt-4 border-t-2 border-green-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-[#1a1a1a]">Everything God makes is 'Very Good'.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-[#1a1a1a]">God wants us to enjoy His world.</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4 text-[#1a1a1a]">
                                <div className="p-3 bg-yellow-400 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Cloud className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist">Bible Words</h3>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 italic font-urbanist font-bold text-lg text-slate-600">
                                "In the beginning God created the heavens and the earth." - Genesis 1:1
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-[#1a1a1a] rounded-[3rem] p-12 text-center text-white mb-20">
                        <Play className="w-16 h-16 text-yellow-400 mx-auto mb-6 fill-current" />
                        <h2 className="text-4xl md:text-5xl font-black font-urbanist mb-6">Mastered the Seven Days?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-xl font-medium">
                            Think you can remember what God made on Day 4? Take the Creation Quiz and prove you're a world-building expert!
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Button 
                                size="lg" 
                                className="bg-yellow-500 hover:bg-yellow-600 text-[#1a1a1a] rounded-full px-12 h-20 text-2xl font-black border-[4px] border-white shadow-[0_8px_0_0_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                                onClick={() => navigate('/public-quiz/genesis')}
                            >
                                Start Creation Quiz! <ArrowRight className="ml-2 h-8 w-8" />
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

export default CreationStory;
