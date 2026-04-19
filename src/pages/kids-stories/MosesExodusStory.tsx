import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
    Waves, 
    Mountain, 
    Zap, 
    Sparkles, 
    Heart, 
    CheckCircle2,
    Play,
    ArrowRight,
    Star,
    Quote,
    Sunrise
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const MosesExodusStory = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How did Moses part the Red Sea?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "God told Moses to raise his staff and stretch out his hand over the sea. A strong wind blew all night, and the water divided, creating a dry path for the Israelites."
                }
            },
            {
                "@type": "Question",
                "name": "Who was chasing the Israelites?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Pharaoh and the Egyptian army were chasing the Israelites with horses and chariots."
                }
            },
            {
                "@type": "Question",
                "name": "What happened when the Israelites reached the other side?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Once they were safely on the other side, Moses stretched out his hand again, and the waters came crashing back down, keeping them safe from the army."
                }
            }
        ]
    };

    const storyParagraphs = [
      "The Israelites had been in Egypt for a very long time, and they were finally free! But as they traveled toward the land God had promised them, they reached a giant body of water called the Red Sea. Behind them, they heard the thundering of horses and the clatter of chariots. The King of Egypt had changed his mind and was coming after them with his whole army!",
      "The people were terrified. 'Where can we go?' they cried. 'The sea is in front of us, and the army is behind us! We are trapped!' But Moses stood tall and told the people, 'Do not be afraid. Stand firm and you will see the deliverance the Lord will bring you today!'",
      "God told Moses, 'Raise your staff and stretch out your hand over the sea to divide the water.' Moses obeyed. He raised his wooden staff high in the air and stretched his hand over the crashing waves. Suddenly, a strong wind began to blow from the east. It blew all night long, and a miracle happened—the water began to pull back!",
      "The Red Sea parted right in the middle, creating two giant walls of water on each side. Between the walls was a wide path of dry ground. Not muddy, not wet, but perfectly dry! Thousands of people, along with their families and their animals, began to walk right through the middle of the sea. Can you imagine looking to your left and your right and seeing fish swimming inside a wall of water?",
      "Once everyone was safe on the other side, the Egyptian army tried to follow them. But God told Moses to stretch his hand over the sea once more. As he did, the water came crashing back down, and the army could no longer follow. The Israelites were safe! They sang songs of joy and danced, thanking God for his amazing power. Moses’ story teaches us that even when we feel trapped or scared, God can make a way where there seems to be no way."
    ];

    return (
        <div className="min-h-screen bg-[#F0FDFA]">
            <SEO 
                title="Moses and the Parting of the Red Sea Story for Kids"
                description="The amazing story of Moses for children. Learn how God parted the Red Sea to save His people. Free Bible story, moral, and fun quiz for kids."
                keywords="moses part the red sea story for kids, story of the exodus for children, bible stories about moses, kids bible lessons moses"
                url="/kids-stories/moses-and-the-exodus"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] rounded-2xl mb-8 font-urbanist font-black text-sm uppercase tracking-widest">
                        <Sunrise className="w-6 h-6 text-teal-500" />
                        <span>Escape to Freedom</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] font-urbanist leading-none tracking-tight mb-8">
                        The Great <br/><span className="text-teal-600">Parting Sea</span>
                    </h1>
                    <p className="text-2xl text-slate-600 font-urbanist max-w-2xl mx-auto italic leading-relaxed">
                        An incredible miracle about how God made a dry path in the middle of a deep ocean to save His friends.
                    </p>
                </header>

                <div className="max-w-5xl mx-auto">
                    {/* Story Card */}
                    <Card className="border-[6px] border-[#1a1a1a] shadow-[15px_15px_0_0_#1a1a1a] rounded-[3rem] bg-white overflow-hidden mb-20">
                        <div className="relative aspect-video bg-teal-100 flex items-center justify-center overflow-hidden border-b-[6px] border-[#1a1a1a]">
                            <img 
                                src="/images/stories/moses-and-the-parting-sea.png" 
                                alt="Moses holding his staff as the Red Sea parts"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <span className="bg-teal-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider">Exodus 14</span>
                            </div>
                        </div>
                        
                        <div className="p-8 md:p-16 relative">
                            <div className="absolute top-10 right-10 opacity-5">
                                <Waves className="w-40 h-40 text-teal-500" />
                            </div>
                            
                            <div className="relative z-10 space-y-10">
                                <Quote className="w-12 h-12 text-teal-200" />
                                <div className="prose prose-lg md:prose-2xl max-w-none font-urbanist text-slate-700">
                                    {storyParagraphs.map((para, idx) => (
                                        <p key={idx} className="mb-8 last:mb-0 leading-[1.6]">
                                            {idx === 0 ? (
                                                <span className="text-7xl font-black text-teal-600 float-left mr-4 mt-2 leading-[0.8]">{para.charAt(0)}</span>
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
                        <div className="bg-[#F0FDFA] border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-teal-500 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Star className="w-8 h-8 text-white fill-current" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist text-[#1a1a1a]">The Lessons</h3>
                            </div>
                            <p className="text-2xl font-black text-teal-800 italic leading-tight">
                                "God can make a way where there seems to be no way. He is powerful enough to handle any challenge we face!"
                            </p>
                            <div className="space-y-4 pt-4 border-t-2 border-teal-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-[#1a1a1a]">God is our protector.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-[#1a1a1a]">Nothing is too hard for God.</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4 text-[#1a1a1a]">
                                <div className="p-3 bg-teal-400 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Mountain className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist">Miracle Map</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { title: "The Tool", desc: "Moses' wooden staff." },
                                    { title: "The Wind", desc: "A strong wind from the east." },
                                    { title: "The Path", desc: "Solid, dry ground in the sea!" },
                                    { title: "The Victory", desc: "Free from the chase at last." }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex flex-col">
                                        <span className="font-black text-teal-600">{item.title}</span>
                                        <span className="text-slate-500">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-[#1a1a1a] rounded-[3rem] p-12 text-center text-white mb-20">
                        <Zap className="w-16 h-16 text-teal-400 mx-auto mb-6 fill-current" />
                        <h2 className="text-4xl md:text-5xl font-black font-urbanist mb-6">Ready to Cross the Quiz?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-xl font-medium">
                            Join the Israelites on their journey! Test your knowledge of the Red Sea miracle and win your Freedom Badge.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Button 
                                size="lg" 
                                className="bg-teal-500 hover:bg-teal-600 text-white rounded-full px-12 h-20 text-2xl font-black border-[4px] border-white shadow-[0_8px_0_0_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                                onClick={() => navigate('/kids-stories/moses-and-the-parting-sea/quiz')}
                            >
                                Take the Quiz! <ArrowRight className="ml-2 h-8 w-8" />
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

export default MosesExodusStory;
