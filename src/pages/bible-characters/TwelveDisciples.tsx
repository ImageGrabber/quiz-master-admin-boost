import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ChevronRight, 
  ShieldCheck, 
  Anchor, 
  BookOpen, 
  Quote,
  Flame,
  Star,
  User,
  Key,
  Compass
} from 'lucide-react';
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import RelatedContentWidget from "@/components/RelatedContentWidget";

const DISCIPLES = [
  {
    name: "Simon Peter",
    fact: "The spokesman for the group and a pillar of the early church. He was a fisherman from Bethsaida.",
    symbol: "Cross & Keys",
    legacy: "Considered the leader of the apostles; wrote 1 & 2 Peter.",
    icon: Key,
    color: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    name: "Andrew",
    fact: "The first disciple called by Jesus. He was Peter's brother and a fisherman.",
    symbol: "X-shaped Cross",
    legacy: "Known for bringing people to Jesus, including his own brother.",
    icon: Anchor,
    color: "bg-indigo-50",
    textColor: "text-indigo-600"
  },
  {
    name: "James the Great",
    fact: "The son of Zebedee and brother of John. Part of the 'inner circle' with Peter and John.",
    symbol: "Shells / Sword",
    legacy: "The first apostle to be martyred (Acts 12:2).",
    icon: User,
    color: "bg-amber-50",
    textColor: "text-amber-600"
  },
  {
    name: "John",
    fact: "The 'disciple whom Jesus loved.' He was the only apostle at the cross.",
    symbol: "Eagle / Chalice",
    legacy: "Author of the Gospel of John, three epistles, and Revelation.",
    icon: Flame,
    color: "bg-rose-50",
    textColor: "text-rose-600"
  },
  {
    name: "Philip",
    fact: "Immediately brought Nathanael to Jesus. He was from Bethsaida as well.",
    symbol: "Cross & Loaves",
    legacy: "Ministered in Phrygia and was known for his evangelistic zeal.",
    icon: Users,
    color: "bg-emerald-50",
    textColor: "text-emerald-600"
  },
  {
    name: "Bartholomew (Nathanael)",
    fact: "Jesus called him 'an Israelite in whom there is no deceit.'",
    symbol: "Knives",
    legacy: "Tradition says he preached the Gospel in India and Armenia.",
    icon: ShieldCheck,
    color: "bg-slate-50",
    textColor: "text-slate-600"
  },
  {
    name: "Matthew (Levi)",
    fact: "A tax collector who left everything to follow Jesus.",
    symbol: "Money Bags / Angels",
    legacy: "Author of the First Gospel, writing primarily to a Jewish audience.",
    icon: BookOpen,
    color: "bg-sky-50",
    textColor: "text-sky-600"
  },
  {
    name: "Thomas",
    fact: "Famous for doubting the Resurrection until he saw Jesus personally.",
    symbol: "Spear",
    legacy: "Known as 'Didymus' (The Twin); carried the Gospel to India.",
    icon: Compass,
    color: "bg-teal-50",
    textColor: "text-teal-600"
  }
];

export default function TwelveDisciples() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-urbanist selection:bg-indigo-100/50 selection:text-indigo-900">
      <SEO 
        title="12 Disciples of Jesus Names and Facts | The Apostles Directory"
        description="Comprehensive list of the 12 apostles of Jesus. Explore their backgrounds, callings, symbols, and legacies with fascinating facts for your Bible study."
        keywords="12 disciples names, facts about the apostles, who were the 12 disciples, simon peter bible story, james and john apostles"
        url="/12-disciples"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Directory of the Twelve Apostles",
          "description": "A detailed resource detailing the lives and ministries of the original twelve disciples chosen by Jesus Christ.",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": DISCIPLES.map((d, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": d.name,
              "description": d.fact
            }))
          }
        }}
      />
      <Navigation />

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-indigo-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1540324155974-7523202daa3f?auto=format&fit=crop&q=80&w=2000" 
            alt="Disciples of Jesus Cinematic" 
            className="w-full h-full object-cover brightness-[0.4] scale-105 transition-transform duration-[20000ms] hover:scale-100"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/50 to-transparent z-20" />
        </div>
        
        <div className="relative z-30 max-w-6xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10">
            <Users className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-white/80">Commissioned Witnesses</span>
          </div>
          <h1 className="text-4xl sm:text-7xl font-black mb-8 leading-[0.9] tracking-tighter italic">
            The Twelve <span className="text-indigo-400 not-italic block mt-2">Disciples</span>
          </h1>
          <p className="text-lg sm:text-2xl font-light text-white/70 mb-16 max-w-3xl mx-auto leading-relaxed">
            They were ordinary men who answered an extraordinary call. Discover the diverse backgrounds and powerful legacies of the founders of the early church.
          </p>
        </div>
      </section>

      <div className="w-full max-w-7xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light text-gray-400 mb-20 px-2 tracking-widest uppercase">
          <button className="hover:text-black transition-colors" onClick={() => navigate("/")}>Home</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <button className="hover:text-black transition-colors" onClick={() => navigate("/bible-characters")}>Characters</button>
          <ChevronRight className="w-3 h-3 mx-4 opacity-30" />
          <span className="text-black font-semibold">12 Disciples</span>
        </div>

        {/* Introduction */}
        <section className="mb-40 text-center max-w-3xl mx-auto">
          <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-gray-400 mb-8 tracking-widest">— Ordinary Men, Extraordinary God —</h2>
          <p className="text-2xl font-light text-gray-600 leading-relaxed italic">
            "Follow me, and I will make you fishers of men." — The transformation of these twelve men changed the course of world history.
          </p>
          <div className="h-px w-24 bg-gray-200 mx-auto mt-12" />
        </section>

        {/* Disciples Grid */}
        <section className="mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {DISCIPLES.map((d, i) => (
              <Card 
                key={i} 
                className="group border border-gray-100/60 hover:border-indigo-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2rem] overflow-hidden cursor-pointer bg-white"
                onClick={() => navigate("/bible-questions-and-answers-hub/matthew")}
              >
                <CardHeader className="pt-10 px-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${d.color} flex items-center justify-center mb-6 mx-auto transition-transform group-hover:rotate-6`}>
                    <d.icon className={`w-8 h-8 ${d.textColor}`} />
                  </div>
                  <CardTitle className="text-2xl font-bold group-hover:text-indigo-600 transition-colors mb-2 tracking-tight">{d.name}</CardTitle>
                  <CardDescription className="text-xs font-bold text-gray-400 uppercase tracking-widest">{d.symbol}</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-10 space-y-6 text-center">
                  <p className="text-base font-light text-gray-500 leading-relaxed">
                    {d.fact}
                  </p>
                  <div className="pt-4 border-t border-gray-50">
                    <span className="text-[10px] font-bold text-indigo-600/50 uppercase tracking-widest block mb-2">Legacy</span>
                    <p className="text-sm italic font-medium text-gray-600">{d.legacy}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm italic italic">More disciples including James (son of Alphaeus), Thaddaeus, Simon the Zealot, and Matthias coming soon.</p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-40 py-24 bg-indigo-600 rounded-[4rem] text-white px-10 lg:px-20 overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] rounded-full translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-white/5 blur-[120px] rounded-full -translate-x-1/2" />
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h2 className="text-sm font-semibold uppercase tracking-[0.5em] text-white/30 mb-8">Follow Their Journey</h2>
            <h3 className="text-4xl sm:text-6xl font-black leading-tight mb-12 italic">"Go into all the world and preach the Gospel."</h3>
            <p className="text-xl font-light text-white/80 leading-relaxed mb-12">
              Ready to test your knowledge about the life of Christ and His closest companions? Take our specialized Matthew and Acts quizzes.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-gray-100 px-10 py-8 text-sm sm:text-lg rounded-2xl font-bold transition-all active:scale-95" onClick={() => navigate("/public-quiz/matthew")}>
                Begin Matthew Quiz
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-indigo-700 transition-all px-10 py-8 text-sm sm:text-lg rounded-2xl font-light active:scale-95" onClick={() => navigate("/")}>
                Back Home
              </Button>
            </div>
          </div>
        </section>

        <RelatedContentWidget />
      </div>

      <Footer />
    </div>
  );
}
