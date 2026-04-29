import React from "react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Guitar, Mic2, ArrowRight, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HaathUthaakarGaoongaLyrics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Haath Uthaakar Gaoonga Lyrics | Hindi Christian Worship Song"
        description="Read complete Haath Uthaakar Gaoonga lyrics in Hindi with English meaning, worship use notes, and beginner-friendly guitar chords."
        keywords="haath uthaakar gaoonga lyrics, haath uthaakar gaunga lyrics, hindi christian worship songs lyrics, yeshu bhakti geet lyrics"
        url="/haath-uthaakar-gaoonga-lyrics"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MusicComposition",
          name: "Haath Uthaakar Gaoonga",
          genre: "Christian Worship",
          inLanguage: ["hi", "en"],
        }}
      />

      <Navigation />

      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <Mic2 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
              Haath Uthaakar Gaoonga
            </h1>
            <p className="text-xl text-slate-600 font-urbanist">Hindi Lyrics, English Meaning & Guitar Chords</p>
          </header>

          <Tabs defaultValue="hindi" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto p-1 bg-slate-200/50">
              <TabsTrigger value="hindi" className="py-2">Hindi</TabsTrigger>
              <TabsTrigger value="english" className="py-2">English</TabsTrigger>
              <TabsTrigger value="chords" className="py-2 flex items-center gap-1"><Guitar className="w-4 h-4" /> Chords</TabsTrigger>
            </TabsList>

            <TabsContent value="hindi">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Hindi Lyrics</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist">
{`हाथ उठाकर गाऊंगा,
यीशु तेरा नाम।
दिल से तुझको चाहूँगा,
तू ही मेरा प्राण।

तेरी दया से जीता हूँ,
तेरी कृपा से खड़ा।
तेरे ही चरणों में प्रभु,
मेरा जीवन पड़ा।`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="english">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">English Meaning</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist">
{`I will lift my hands and sing Your name, Jesus.
I will love You with all my heart, You are my life.

By Your mercy I stand, by Your grace I live.
At Your feet, Lord, I lay down my whole life.`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chords">
              <Card>
                <CardContent className="pt-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center justify-center gap-2">
                    <Guitar className="w-6 h-6" /> Guitar Chords (Scale: G Major)
                  </h2>
                  <div className="max-w-md mx-auto text-left font-mono bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-700">
                    <p className="text-orange-400 font-bold mb-4">Strumming: D DU UDU</p>
                    <div className="space-y-3">
                      <p><strong>(G)</strong> Haath uthaakar <strong>(C)</strong> gaoonga</p>
                      <p><strong>(D)</strong> Yeshu tera <strong>(G)</strong> naam</p>
                      <p><strong>(G)</strong> Dil se tujhko <strong>(C)</strong> chahoonga</p>
                      <p><strong>(D)</strong> Tu hi mera <strong>(G)</strong> praan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <section className="mt-12">
            <Card>
              <CardContent className="pt-8 space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 font-urbanist text-center">Meaning and Worship Use</h2>
                <p className="text-slate-700 leading-relaxed text-center max-w-3xl mx-auto">
                  This song is used for praise moments where the congregation responds with surrender, gratitude, and joyful worship.
                  It fits youth meetings, revival nights, and opening praise sessions.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mt-12 border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 font-urbanist text-center italic">More Popular Worship Songs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-50" onClick={() => navigate("/hallelujah-stuti-gaye-hum-lyrics")}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full"><Music className="w-6 h-6 text-blue-600" /></div>
                    <div>
                      <h3 className="font-bold text-slate-900">Hallelujah Stuti Gaye Hum</h3>
                      <p className="text-sm text-slate-500">Lyrics + Translations + Chords</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-50" onClick={() => navigate("/apna-bojh-prabhu-par-daal-lyrics-chords")}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 rounded-full"><Guitar className="w-6 h-6 text-indigo-600" /></div>
                    <div>
                      <h3 className="font-bold text-slate-900">Apna Bojh Prabhu Par Daal</h3>
                      <p className="text-sm text-slate-500">Devotional Chords</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HaathUthaakarGaoongaLyrics;

