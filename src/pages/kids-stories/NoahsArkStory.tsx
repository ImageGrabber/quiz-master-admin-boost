import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { 
    CloudRain, 
    Waves, 
    Umbrella, 
    Sparkles, 
    Heart, 
    CheckCircle2,
    Play,
    ArrowRight,
    Star,
    Quote
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import RelatedContentWidget from '@/components/RelatedContentWidget';

const NoahsArkStory = () => {
    const navigate = useNavigate();

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How long did it rain for Noah's Ark?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "According to the Bible, it rained for 40 days and 40 nights during the Great Flood."
                }
            },
            {
                "@type": "Question",
                "name": "How many animals did Noah take on the Ark?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Noah took two of every kind of animal, a male and a female, into the Ark to keep them alive."
                }
            },
            {
                "@type": "Question",
                "name": "What was the sign of God's promise after the flood?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "God placed a rainbow in the sky as a sign of His covenant that He would never again flood the entire earth."
                }
            }
        ]
    };

    const storyParagraphs = [
      "Noah was a man who walked with God during a time when many people had forgotten how to be kind. One afternoon, God spoke to Noah and told him that a very big rain was coming. God instructed Noah to build a massive boat, called an Ark. It needed to be long enough to fit many rooms and tall enough to carry thousands of animals. But there was one strange thing: there wasn't a raindrop in sight! Noah lived in a place where it hadn't rained like that for a very long time.",
      "Noah didn't argue. He and his three sons—Shem, Ham, and Japheth—began to gather cypress wood. They sawed and hammered day after day. People in the nearby town came to watch and laugh. 'Why are you building a boat in the desert, Noah?' they teased. 'There's no water for miles!' But Noah just kept working. He knew that if God said it would rain, it would rain. He chose to obey God rather than listen to the people making fun of him.",
      "As the Ark grew taller, Noah also gathered food for his family and for the animals that would soon arrive. Then, a miracle happened. From the forests and the plains, animals began to walk toward the Ark in pairs—two by two. Lions and lambs, elephants and ants, giraffes and even slow turtles climbed up the wooden ramp. Once everyone was safe inside, God himself shut the giant door.",
      "Suddenly, the sky turned dark, and the first drops of rain fell. Then it rained harder than anyone had ever seen! For forty days and forty nights, water poured from the clouds and bubbled up from the ground. The Ark lifted off the earth and floated safely on the rising water. For months, Noah and his family cared for the animals while they waited for the land to dry.",
      "One day, Noah sent out a dove. When it returned with a green olive leaf in its beak, Noah knew the trees were growing again. Finally, the Ark rested on a mountain. God told Noah to come out and see the new world. In the sky, God placed a magnificent rainbow—filled with red, orange, yellow, green, blue, and purple. God promised that he would never flood the whole earth again. Every time we see a rainbow, we can remember that Noah’s obedience saved his family and that God always keeps His promises."
    ];

    return (
        <div className="min-h-screen bg-[#F0F9FF]">
            <SEO 
                title="Noah’s Ark Story for Kids: A Beautiful Bible Story of Obedience"
                description="Read the amazing story of Noah's Ark for children. Learn about the flood, the animals two-by-two, and God's rainbow promise. Includes moral and quiz."
                keywords="noah's ark story for children, kids bible stories Noah, story of the flood for kids, bible stories for preschoolers"
                url="/kids-stories/noahs-ark"
                structuredData={faqSchema}
            />

            <Navigation />

            <main className="container mx-auto px-4 py-20 pt-32">
                <header className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] rounded-2xl mb-8">
                        <Waves className="w-6 h-6 text-blue-500" />
                        <span className="font-urbanist font-black text-sm tracking-widest uppercase">The Great Adventure</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-[#1a1a1a] font-urbanist leading-none tracking-tight mb-8">
                        Noah's Special<br/><span className="text-blue-600">Boat Voyage</span>
                    </h1>
                    <p className="text-2xl text-slate-600 font-urbanist max-w-2xl mx-auto italic leading-relaxed">
                        A wonderful story about trusting God's word, even when the sky is blue and the neighbors are laughing.
                    </p>
                </header>

                <div className="max-w-5xl mx-auto">
                    {/* Story Card */}
                    <Card className="border-[6px] border-[#1a1a1a] shadow-[15px_15px_0_0_#1a1a1a] rounded-[3rem] bg-white overflow-hidden mb-20">
                        <div className="relative aspect-video bg-blue-100 flex items-center justify-center overflow-hidden border-b-[6px] border-[#1a1a1a]">
                            <img 
                                src="/images/stories/noahs-special-boat.png" 
                                alt="Noah standing by the Ark with a rainbow in the background"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 text-white">
                                <span className="bg-blue-600 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-wider">Genesis 6-9</span>
                            </div>
                        </div>
                        
                        <div className="p-8 md:p-16 relative">
                            <div className="absolute top-10 right-10 opacity-5">
                                <Umbrella className="w-40 h-40 text-blue-500" />
                            </div>
                            
                            <div className="relative z-10 space-y-10">
                                <Quote className="w-12 h-12 text-blue-200" />
                                <div className="prose prose-lg md:prose-2xl max-w-none font-urbanist prose-slate">
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

                    {/* Fun Facts & Moral */}
                    <div className="grid md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-[#FFFBEB] border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-amber-400 rounded-2xl border-2 border-[#1a1a1a]">
                                    <Star className="w-8 h-8 text-[#1a1a1a] fill-current" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist text-[#1a1a1a]">The Moral</h3>
                            </div>
                            <p className="text-2xl font-black text-amber-700 italic leading-tight">
                                "Obeying God is always the right choice, even when others don't understand."
                            </p>
                            <div className="space-y-4 pt-4 border-t-2 border-amber-200">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    <span className="font-bold text-[#1a1a1a]">God's promises are true.</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    <span className="font-bold text-[#1a1a1a]">God takes care of His friends.</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] rounded-[2.5rem] p-10 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-500 rounded-2xl border-2 border-[#1a1a1a]">
                                    <CloudRain className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-3xl font-black font-urbanist text-[#1a1a1a]">Rainy Recap</h3>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { title: "The Ark", desc: "A massive cypress wood boat." },
                                    { title: "The Cargo", desc: "Two of every kind of animal!" },
                                    { title: "The Wait", desc: "40 days of rain, many months of waiting." },
                                    { title: "The Sign", desc: "A colorful rainbow promise." }
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
                        <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
                        <h2 className="text-4xl md:text-5xl font-black font-urbanist mb-6">Ready for the Ark Quiz?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-xl font-medium">
                            Think you know all about Noah's voyage? Test your knowledge and win your first story badge!
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <Button 
                                size="lg" 
                                className="bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full px-12 h-20 text-2xl font-black border-[4px] border-white shadow-[0_8px_0_0_rgba(255,255,255,0.2)] active:translate-y-1 active:shadow-none"
                                onClick={() => navigate('/kids-stories/noahs-special-boat/quiz')}
                            >
                                Start Quiz! <ArrowRight className="ml-2 h-8 w-8" />
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

export default NoahsArkStory;
