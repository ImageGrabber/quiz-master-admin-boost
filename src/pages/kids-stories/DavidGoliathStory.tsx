import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
    Trophy, 
    Shield, 
    Sword, 
    Sparkles, 
    Heart, 
    CheckCircle2,
    Play,
    ArrowRight,
    Star,
    Quote,
    Target
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const DavidGoliathStory = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How did David defeat Goliath?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "David defeated Goliath using a simple sling and a single smooth stone, trust in God, and courage. He hit the giant right in the forehead."
                }
            },
            {
                "@type": "Question",
                "name": "How many stones did David pick up?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "David picked up five smooth stones from a stream, though he only needed one to defeat Goliath."
                }
            },
            {
                "@type": "Question",
                "name": "Who was Goliath?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Goliath was a giant warrior from Gath who fought for the Philistines and challenged the army of Israel."
                }
            }
        ]
    };

    const storyParagraphs = [
      "Long ago, in a land called Bethlehem, lived a young boy named David. David spent his days watching over his father Jesse's sheep in the fields. While the sheep grazed on the green grass, David would play his harp and sing beautiful songs to God. He wasn't like the big, strong soldiers in the army; he was just a shepherd, but he had a secret strength: he knew that God was always with him.",
      "One day, David’s father asked him to take bread and cheese to his older brothers, who were soldiers in the King’s army. When David arrived at the army camp, he saw something scary. A giant man named Goliath, nearly ten feet tall and wearing heavy bronze armor, stood on a hill. He was shouting mean things at David’s people and making fun of them. He challenged anyone to fight him, but all the soldiers were shaking with fear. They thought Goliath was too big to defeat.",
      "But when David heard the giant, he wasn't afraid. He asked, 'Who is this man that he thinks he can make fun of the army of the living God?' David’s brothers were annoyed, but King Saul heard about the brave young boy and called for him. David told the King, 'Don’t worry about this giant. I will go and fight him!' The King looked at David’s small size and sighed, 'You are only a boy, and he is a warrior.' David replied, 'God helped me protect my sheep from lions and bears. He will help me against this giant too.'",
      "King Saul tried to give David his heavy armor and a giant sword, but David could barely move in them! 'I can't wear these,' he said. Instead, David went to a small stream and picked up five smooth stones. He put them in his shepherd's bag and took his simple sling. When Goliath saw the boy coming, he laughed and shouted, 'Am I a dog that you come at me with sticks?'",
      "David looked up at the giant and shouted back, 'You come against me with a sword and a spear, but I come against you in the name of the Lord of Heaven’s Armies!' David took a stone from his bag, put it in his sling, and swung it with all his might. The stone flew through the air and hit Goliath right in the forehead. The giant fell face-first onto the ground! David had defeated the giant without a sword, showing everyone that nothing is impossible with God."
    ];

    return (
        <div className="min-h-screen bg-[#FFF7ED]">
            <SEO 
                title="David and Goliath Story for Kids: Courage & Trust in God"
                description="The classic Bible story of David and Goliath for children. Learn how a small shepherd boy defeated a giant with faith. Moral lesson, verses, and quiz."
                keywords="david and goliath story for kids, brave shepherd boy story, David vs Goliath for children, bible stories about courage"
                url="/kids-stories/david-and-goliath"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] rounded-2xl mb-8">
                        <Target className="w-6 h-6 text-red-500" />
                        <span className="font-urbanist font-black text-sm tracking-widest uppercase">The Brave Shepherd</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] font-urbanist leading-none tracking-tight mb-8">
                        David & the <br/><span className="text-red-600">Great Giant</span>
                    </h1>
                    <p className="text-2xl text-slate-600 font-urbanist max-w-2xl mx-auto italic leading-relaxed">
                        A powerful story about how even the smallest person can do big things when they trust in God.
                    </p>
                </header>

                <div className="max-w-5xl mx-auto">
                    {/* Story Card */}
                    <Card className="border-[6px] border-[#1a1a1a] shadow-[15px_15px_0_0_#1a1a1a] rounded-[3rem] bg-white overflow-hidden mb-20">
                        <div className="relative aspect-video bg-orange-100 flex items-center justify-center overflow-hidden border-b-[6px] border-[#1a1a1a]">
                            <img 
                                src="/images/stories/david-goliath.png" 
                                alt="Young David standing with a sling before Goliath"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <span className="bg-red-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider">1 Samuel 17</span>
                            </div>
                        </div>
                        
                        <div className="p-8 md:p-16 relative">
                            <div className="absolute top-10 right-10 opacity-5">
                                <Shield className="w-40 h-40 text-red-500" />
                            </div>
                            
                            <div className="relative z-10 space-y-10">
                                <Quote className="w-12 h-12 text-red-200" />
                                <div className="prose prose-lg md:prose-2xl max-w-none font-urbanist prose-slate">
                                    {storyParagraphs.map((para, idx) => (
                                        <p key={idx} className="mb-8 last:mb-0 leading-[1.6]">
                                            {idx === 0 ? (
                                                <span className="text-7xl font-black text-red-600 float-left mr-4 mt-2 leading-[0.8]">{para.charAt(0)}</span>
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
                        <div className="bg-[#FEF2F2] border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-red-500 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Trophy className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist text-[#1a1a1a]">Story Gold</h3>
                            </div>
                            <p className="text-2xl font-black text-red-700 italic leading-tight">
                                "True courage comes from trusting that God is always with you, no matter how big the challenge."
                            </p>
                            <div className="space-y-4 pt-4 border-t-2 border-red-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    <span className="font-bold text-[#1a1a1a]">God can use small things for miracles.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    <span className="font-bold text-[#1a1a1a]">We don't need to fear 'giants'.</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-orange-400 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Sword className="w-8 h-8 text-[#1a1a1a]" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist text-[#1a1a1a]">Brave Basics</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { title: "The Hero", desc: "David, the shepherd boy." },
                                    { title: "The Giant", desc: "Goliath, a ten-foot tall warrior." },
                                    { title: "The Weapon", desc: "A simple sling and 5 smooth stones." },
                                    { title: "The Secret", desc: "God's name and power!" }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex flex-col">
                                        <span className="font-black text-red-600">{item.title}</span>
                                        <span className="text-slate-500">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-[#1a1a1a] rounded-[3rem] p-12 text-center text-white mb-20">
                        <Sparkles className="w-16 h-16 text-red-500 mx-auto mb-6 animate-pulse" />
                        <h2 className="text-4xl md:text-5xl font-black font-urbanist mb-6">Ready to Defeat the Quiz?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-xl font-medium">
                            Join David in the field! Test your memory of the story and earn your Courage Badge.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Button 
                                size="lg" 
                                className="bg-[#F59E0B] hover:bg-[#D97706] text-white rounded-full px-12 h-20 text-2xl font-black border-[4px] border-white shadow-[0_8px_0_0_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                                onClick={() => navigate('/kids-stories/the-brave-shepherd-boy/quiz')}
                            >
                                Quiz Time! <ArrowRight className="ml-2 h-8 w-8" />
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

export default DavidGoliathStory;
