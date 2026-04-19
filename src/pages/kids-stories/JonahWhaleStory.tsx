import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
    Waves, 
    Ship, 
    Wind, 
    Sparkles, 
    Heart, 
    CheckCircle2,
    Play,
    ArrowRight,
    Star,
    Quote,
    Anchor
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const JonahWhaleStory = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How many days was Jonah in the whale?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Jonah was in the belly of the giant fish for three days and three nights."
                }
            },
            {
                "@type": "Question",
                "name": "Why did Jonah run away from God?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Jonah Ran away because he didn't want to go to Nineveh and tell the people there to be kind. He tried to hide on a ship going to Tarshish."
                }
            },
            {
                "@type": "Question",
                "name": "What happened to the storm when the sailors threw Jonah into the sea?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "As soon as Jonah was thrown into the sea, the wind stopped and the storm became completely calm."
                }
            }
        ]
    };

    const storyParagraphs = [
      "Once, long ago, God spoke to a man named Jonah. He had a special job for him. God said, 'Jonah, I want you to go to the big city of Nineveh and tell the people there to stop being mean and start being kind.' But Jonah didn't want to go to Nineveh. He thought the people there were too grumpy and he didn't want to help them. So, instead of going east toward Nineveh, Jonah ran west! He hopped on a big wooden ship headed for a place called Tarshish, thinking he could hide from God.",
      "But you can't really hide from God, can you? While the ship was out in the middle of the deep blue sea, a massive storm began to blow. The waves grew as tall as mountains, and the wind howled like a hungry wolf. The sailors were terrified! They started throwing their boxes and supplies overboard to make the ship lighter. Jonah realized the storm was because he had disobeyed God. He told the sailors, 'It's my fault. If you throw me into the water, the storm will stop.'",
      "Suddenly, the wind stopped, and the sea became as smooth as glass. But Jonah was sinking down, down, down into the cold water. Just then, a miracle happened! God sent a giant fish—some say it was a massive whale—and it opened its mouth wide and swallowed Jonah whole! Jonah wasn't hurt, but it was very dark and very wiggly inside the fish's belly. For three days and three nights, Jonah stayed there. He had a lot of time to think and pray.",
      "Jonah told God, 'I am so sorry I didn't listen. If you give me another chance, I will go to Nineveh.' God heard Jonah’s prayer. He spoke to the big fish, and the fish swam to the shore and 'Bleh!'—it spit Jonah right onto the dry sand! Jonah blinked in the bright sunshine, thanked God, and immediately started walking toward Nineveh.",
      "When he arrived, he told the people about God’s message. To Jonah’s surprise, everyone listened! They said sorry for being mean and promised to be good. Jonah learned that God is full of second chances, not just for him, but for everyone. God’s love is bigger than any ocean and even bigger than the biggest fish!"
    ];

    return (
        <div className="min-h-screen bg-[#F0F9FF]">
            <SEO 
                title="Jonah and the Big Fish Story for Kids: Mercy & Second Chances"
                description="Read the amazing story of Jonah and the Whale for children. Learn how Jonah tried to run but found God's mercy in the belly of a big fish. Story, moral, and quiz."
                keywords="jonah and the whale story for kids, story of jonah for children, bible stories about second chances, kids bible lessons"
                url="/kids-stories/jonah-and-the-big-fish"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] rounded-2xl mb-8 font-urbanist font-black text-sm uppercase tracking-widest">
                        <Anchor className="w-6 h-6 text-blue-500" />
                        <span>A Deep Sea Voyage</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] font-urbanist leading-none tracking-tight mb-8">
                        Jonah & the <br/><span className="text-blue-600">Giant Whale</span>
                    </h1>
                    <p className="text-2xl text-slate-600 font-urbanist max-w-2xl mx-auto italic leading-relaxed">
                        A wonderful story about how you can't run away from God's love, and how He always gives second chances.
                    </p>
                </header>

                <div className="max-w-5xl mx-auto">
                    {/* Story Card */}
                    <Card className="border-[6px] border-[#1a1a1a] shadow-[15px_15px_0_0_#1a1a1a] rounded-[3rem] bg-white overflow-hidden mb-20">
                        <div className="relative aspect-video bg-blue-100 flex items-center justify-center overflow-hidden border-b-[6px] border-[#1a1a1a]">
                            <img 
                                src="/images/stories/jonah-and-the-big-fish.png" 
                                alt="Jonah waving from the whale's mouth"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <span className="bg-blue-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider">Jonah 1-3</span>
                            </div>
                        </div>
                        
                        <div className="p-8 md:p-16 relative">
                            <div className="absolute top-10 right-10 opacity-5">
                                <Waves className="w-40 h-40 text-blue-500" />
                            </div>
                            
                            <div className="relative z-10 space-y-10">
                                <Quote className="w-12 h-12 text-blue-200" />
                                <div className="prose prose-lg md:prose-2xl max-w-none font-urbanist text-slate-700">
                                    {storyParagraphs.map((para, idx) => (
                                        <p key={idx} className="mb-8 last:mb-0 leading-[1.6]">
                                            {idx === 0 ? (
                                                <span className="text-7xl font-black text-blue-600 float-left mr-4 mt-2 leading-[0.8]">{para.charAt(0)}</span>
                                            ) : null}
                                            {idx === 0 ? para.substring(1) : para}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Moral & Facts */}
                    <div className="grid md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-[#EFF6FF] border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-600 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Star className="w-8 h-8 text-white fill-current" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist text-[#1a1a1a]">Deep Thoughts</h3>
                            </div>
                            <p className="text-2xl font-black text-blue-800 italic leading-tight">
                                "You can never run away from God's love, and He is always ready to give you a second chance."
                            </p>
                            <div className="space-y-4 pt-4 border-t-2 border-blue-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-[#1a1a1a]">Obedience is better than running.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-[#1a1a1a]">God's mercy is for everyone.</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4 text-[#1a1a1a]">
                                <div className="p-3 bg-blue-400 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Ship className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist">Ocean Facts</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { title: "The Mission", desc: "Go to Nineveh and preach kindness." },
                                    { title: "The Mistake", desc: "Running to Tarshish on a ship." },
                                    { title: "The Miracle", desc: "The giant fish rescue!" },
                                    { title: "The Lesson", desc: "God's love is everywhere." }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex flex-col">
                                        <span className="font-black text-blue-600">{item.title}</span>
                                        <span className="text-slate-500">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-[#1a1a1a] rounded-[3rem] p-12 text-center text-white mb-20">
                        <Wind className="w-16 h-16 text-blue-400 mx-auto mb-6 fill-current" />
                        <h2 className="text-4xl md:text-5xl font-black font-urbanist mb-6">Ready to Dive into the Quiz?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-xl font-medium">
                            Don't run away! Test your knowledge of Jonah's story and earn your Mercy Badge.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Button 
                                size="lg" 
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-12 h-20 text-2xl font-black border-[4px] border-white shadow-[0_8px_0_0_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                                onClick={() => navigate('/kids-stories/jonah-and-the-big-fish/quiz')}
                            >
                                Start the Quiz! <ArrowRight className="ml-2 h-8 w-8" />
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

export default JonahWhaleStory;
