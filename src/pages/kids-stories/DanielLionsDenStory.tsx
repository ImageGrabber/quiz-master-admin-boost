import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
    Cat, 
    Moon, 
    Shield, 
    Sparkles, 
    Heart, 
    CheckCircle2,
    Play,
    ArrowRight,
    Star,
    Quote,
    Award
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const DanielLionsDenStory = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Why was Daniel thrown into the lions' den?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Daniel was thrown into the lions' den because he disobeyed a law that chose to forbid praying to anyone except the King. Daniel chose to stay faithful and pray to God three times a day."
                }
            },
            {
                "@type": "Question",
                "name": "How did Daniel survive the lions?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "God sent an angel who shut the mouths of the lions, so they did not hurt Daniel at all during the night."
                }
            },
            {
                "@type": "Question",
                "name": "Who was the King in the story of Daniel?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The King was King Darius. He liked Daniel very much and was very happy when Daniel was found safe the next morning."
                }
            }
        ]
    };

    const storyParagraphs = [
      "Daniel was a man who lived in a foreign land called Babylon. Even though he was far from home, he worked hard and was so honest that the King liked him very much. In fact, Daniel was one of the top leaders in the whole kingdom! But some of the other leaders were jealous of Daniel. They wanted to find something wrong with him so they could get him in trouble, but Daniel was so good at his job that they couldn't find anything to complain about.",
      "Finally, they realized the only way to catch Daniel was through his faith. They knew Daniel prayed to God three times every single day. So, they tricked the King into making a new law: for thirty days, anyone who prayed to anyone except the King would be thrown into a den full of hungry lions! The King signed the law, thinking it would make people respect him more.",
      "When Daniel heard about the new law, he had a choice. He could hide his prayers, or he could stop praying for a month. But Daniel loved God too much to stop. He went home, opened his windows toward Jerusalem just as he always did, and knelt down to pray. The jealous leaders saw him and immediately told the King. The King was very sad because he liked Daniel, but he had to follow the law he had signed.",
      "Daniel was led to a deep, dark pit filled with fierce, growling lions. As the guards lowered him inside and rolled a heavy stone over the opening, the King whispered, 'May your God, whom you serve so faithfully, rescue you!' The King was so worried he couldn't eat or sleep all night.",
      "At the very first light of dawn, the King ran to the lions' den and cried out in a worried voice, 'Daniel, was your God able to save you?' To his amazement, he heard a calm voice from inside the pit: 'O King, live forever! My God sent His angel, and He shut the mouths of the lions. They have not hurt me at all.' The King was overjoyed! He had Daniel pulled out and saw that there wasn't even a scratch on him."
    ];

    return (
        <div className="min-h-screen bg-[#FDF2F8]">
            <SEO 
                title="Daniel and the Lions' Den Story for Kids: Faith & Bravery"
                description="Read the famous Bible story of Daniel in the lions' den for children. Learn about Daniel's faithfulness, the jealous leaders, and God's miraculous protection."
                keywords="daniel and the lions den story for kids, bible stories about faithfulness, story of Daniel for children, kids bible lessons"
                url="/kids-stories/daniel-and-the-lions-den"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] rounded-2xl mb-8 font-urbanist font-black text-sm uppercase tracking-widest">
                        <Award className="w-6 h-6 text-pink-500" />
                        <span>Faithful & Unafraid</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] font-urbanist leading-none tracking-tight mb-8">
                        Daniel & the <br/><span className="text-pink-600">Sleepy Lions</span>
                    </h1>
                    <p className="text-2xl text-slate-600 font-urbanist max-w-2xl mx-auto italic leading-relaxed">
                        A story of incredible bravery and how God protected His friend in a dark pit full of hungry lions.
                    </p>
                </header>

                <div className="max-w-5xl mx-auto">
                    {/* Story Card */}
                    <Card className="border-[6px] border-[#1a1a1a] shadow-[15px_15px_0_0_#1a1a1a] rounded-[3rem] bg-white overflow-hidden mb-20">
                        <div className="relative aspect-video bg-pink-100 flex items-center justify-center overflow-hidden border-b-[6px] border-[#1a1a1a]">
                            <img 
                                src="/images/stories/daniel-and-the-sleepy-lions.png" 
                                alt="Daniel sitting calmly in a den of lions"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <span className="bg-pink-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider">Daniel 6</span>
                            </div>
                        </div>
                        
                        <div className="p-8 md:p-16 relative">
                            <div className="absolute top-10 right-10 opacity-5">
                                <Cat className="w-40 h-40 text-pink-500" />
                            </div>
                            
                            <div className="relative z-10 space-y-10">
                                <Quote className="w-12 h-12 text-pink-200" />
                                <div className="prose prose-lg md:prose-2xl max-w-none font-urbanist text-slate-700">
                                    {storyParagraphs.map((para, idx) => (
                                        <p key={idx} className="mb-8 last:mb-0 leading-[1.6]">
                                            {idx === 0 ? (
                                                <span className="text-7xl font-black text-pink-600 float-left mr-4 mt-2 leading-[0.8]">{para.charAt(0)}</span>
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
                        <div className="bg-[#FDF2F8] border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-pink-500 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Star className="w-8 h-8 text-white fill-current" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist text-[#1a1a1a]">The Big Truth</h3>
                            </div>
                            <p className="text-2xl font-black text-pink-700 italic leading-tight">
                                "Be brave and stand firm in what is right; God is your protector no matter what happens."
                            </p>
                            <div className="space-y-4 pt-4 border-t-2 border-pink-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-[#1a1a1a]">Prayer is powerful.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                                    <span className="font-bold text-[#1a1a1a]">God shuts the mouths of 'lions'.</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4 text-[#1a1a1a]">
                                <div className="p-3 bg-pink-400 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist">Hero History</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { title: "The Hero", desc: "Daniel, a faithful leader." },
                                    { title: "The Habit", desc: "Praying 3 times every day." },
                                    { title: "The Trap", desc: "A law against praying to God." },
                                    { title: "The Rescue", desc: "An angel from God!" }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex flex-col">
                                        <span className="font-black text-pink-600">{item.title}</span>
                                        <span className="text-slate-500">{item.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-[#1a1a1a] rounded-[3rem] p-12 text-center text-white mb-20">
                        <Moon className="w-16 h-16 text-pink-400 mx-auto mb-6 fill-current" />
                        <h2 className="text-4xl md:text-5xl font-black font-urbanist mb-6">Can You Spot the Truth?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-xl font-medium">
                            Don't be afraid! Take the Daniel Quiz now and see if you can answer all the questions correctly.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Button 
                                size="lg" 
                                className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-12 h-20 text-2xl font-black border-[4px] border-white shadow-[0_8px_0_0_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                                onClick={() => navigate('/kids-stories/daniel-and-the-sleepy-lions/quiz')}
                            >
                                Brave the Quiz! <ArrowRight className="ml-2 h-8 w-8" />
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

export default DanielLionsDenStory;
