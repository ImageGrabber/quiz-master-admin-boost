import React from "react";
import SEO from "@/components/SEO";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Guitar, Mic2, ArrowRight, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AaradhnaHoAaradhnaLyrics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Aaradhna Ho Aaradhna Lyrics | Hindi Christian Song with Chords"
        description="Complete Aaradhna Ho Aaradhna lyrics in Hindi with English translation, guitar chord progression, and worship practice notes."
        keywords="aaradhna ho aaradhna lyrics, aradhna ho aradhna lyrics, hindi christian worship songs, aaradhana song chords"
        url="/aaradhna-ho-aaradhna-lyrics"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MusicComposition",
          name: "Aaradhna Ho Aaradhna",
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
              Aaradhna Ho Aaradhna
            </h1>
            <p className="text-xl text-slate-600 font-urbanist">Hindi Lyrics, Meaning & Guitar Chords</p>
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
{`आराधना हो आराधना,
खुदावंद यीशु की आराधना।
मन, वचन और जीवन से,
तेरी ही महिमा हो प्रभु।

तेरी दया अनंत है,
तेरा प्रेम महान।
तेरे बिना मैं कुछ भी नहीं,
तू ही मेरी पहचान।`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="english">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">English Meaning</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist">
{`Let there be worship, worship of Lord Jesus.
With my mind, words, and life, may Your glory be seen.

Your mercy is endless, Your love is great.
Without You I am nothing, You are my identity.`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chords">
              <Card>
                <CardContent className="pt-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center justify-center gap-2">
                    <Guitar className="w-6 h-6" /> Guitar Chords (Scale: C Major)
                  </h2>
                  <div className="max-w-md mx-auto text-left font-mono bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-700">
                    <p className="text-orange-400 font-bold mb-4">Strumming: D D U UDU</p>
                    <div className="space-y-3">
                      <p><strong>(C)</strong> Aaradhna ho <strong>(F)</strong> aaradhna</p>
                      <p><strong>(G)</strong> Khudawand Yeshu ki <strong>(C)</strong> aaradhna</p>
                      <p><strong>(C)</strong> Man vachan aur <strong>(F)</strong> jeevan se</p>
                      <p><strong>(G)</strong> Teri hi mahima ho <strong>(C)</strong> Prabhu</p>
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
                  This worship classic centers on devotion and reverence. It is commonly sung during altar calls,
                  prayer gatherings, and reflective worship moments.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mt-12 border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 font-urbanist text-center italic">More Popular Worship Songs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-50" onClick={() => navigate("/haath-uthaakar-gaoonga-lyrics")}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full"><Music className="w-6 h-6 text-blue-600" /></div>
                    <div>
                      <h3 className="font-bold text-slate-900">Haath Uthaakar Gaoonga</h3>
                      <p className="text-sm text-slate-500">Hindi Lyrics + Chords</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-50" onClick={() => navigate("/hallelujah-stuti-gaye-hum-lyrics")}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 rounded-full"><Music className="w-6 h-6 text-indigo-600" /></div>
                    <div>
                      <h3 className="font-bold text-slate-900">Hallelujah Stuti Gaye Hum</h3>
                      <p className="text-sm text-slate-500">Multi-language Page</p>
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

export default AaradhnaHoAaradhnaLyrics;

