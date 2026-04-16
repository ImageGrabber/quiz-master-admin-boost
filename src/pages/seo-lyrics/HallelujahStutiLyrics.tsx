import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Mic2, Star } from 'lucide-react';

const HallelujahStutiLyrics = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Hallelujah Stuti Gaye Hum Lyrics | Hindi Christian Song</title>
        <meta name="description" content="Read full lyrics for 'Hallelujah Stuti Gaye Hum' in Hindi and Romanized script. Popular Christian worship song lyrics for church and personal devotions." />
        <meta name="keywords" content="hallelujah stuti gaye hum lyrics, hallelujah stuti gaye hum hindi lyrics, masih geet 2026, jesus song lyrics hindi" />
        <link rel="canonical" href="https://biblequizcompetition.com/hallelujah-stuti-gaye-hum-lyrics" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicComposition",
            "name": "Hallelujah Stuti Gaye Hum",
            "genre": "Christian Worship",
            "inLanguage": "hi",
            "lyrics": {
              "@type": "CreativeWork",
              "text": "Hallelujah stuti gaye hum, Yeshu ki stuti gaye hum. Kroos par bali dwaaraa, apana lahu bahaayaa..."
            }
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <Mic2 className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
              Hallelujah Stuti Gaye Hum
            </h1>
            <p className="text-xl text-slate-600 font-urbanist flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" /> Hindi Worship Song Lyrics
            </p>
          </header>

          <Card className="shadow-lg border-none overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="p-8 md:p-12 bg-white">
                  <h2 className="text-xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                    <Music className="w-5 h-5" /> Devanagari
                  </h2>
                  <div className="text-lg text-slate-800 leading-relaxed whitespace-pre-line font-urbanist">
                    {`हालेलुयाह स्तुति गायें हम, 
                    यीशु की स्तुति गायें हम (2)
                    हा – हालेलुयाह, हालेलुयाह, हालेलुयाह (2)

                    1. क्रूस पर बलि द्वारा, 
                       अपना लहू बहाया (2)
                       पाप को हटा कर, साफ़ है किया, 
                       हमको बचा लिया (2)

                    2. इस जीवन भर मैं, 
                       सदा तुझको ध्यान करूँगा (2)
                       तेरी आत्मा पाके, तेरी इच्छा जानके, 
                       आगे को बढ़ता रहूँगा (2)

                    3. यीशु के पास आओ, 
                       और मुक्ति को अपनाओ (2)
                       आशीष वो देगा, साथ अपने लेगा, 
                       कभी नही छोड़ेगा (2)`}
                  </div>
                </div>

                <div className="p-8 md:p-12 bg-slate-50">
                  <h2 className="text-xl font-bold text-slate-600 mb-6 flex items-center gap-2">
                    <Languages className="w-5 h-5" /> Romanized
                  </h2>
                  <div className="text-lg text-slate-700 leading-relaxed whitespace-pre-line italic font-urbanist">
                    {`Hallelujah stuti gaye hum, 
                    Yeshu ki stuti gaye hum (2)
                    Haa – Hallelujah, Hallelujah, Hallelujah (2)

                    1. Kroos par bali dwaaraa, 
                       apana lahu bahaayaa (2)
                       Paap ko haṭaa kar, saaf hai kiya, 
                       humko bachaa liya (2)

                    2. Is jeevan bhar main, 
                       sadaa tujhko dhyaan karoongaa (2)
                       Teri aatmaa paake, teri ichchhaa jaanke, 
                       aage ko baḍhtaa rahoongaa (2)

                    3. Yeshu ke paas aao, 
                       aur mukti ko apnaao (2)
                       Aashish vo degaa, saath apne legaa, 
                       kabhi nahi chhodegaa (2)`}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center text-slate-500">
            <p>Looking for more Hindi Christian Song Lyrics? Explore our collection or join the Quiz!</p>
          </div>

          <section className="mt-16 bg-white border border-slate-200 rounded-3xl p-8 md:p-12 text-center shadow-sm">
            <h2 className="text-3xl font-bold mb-6 text-slate-900 font-urbanist">Bible Quiz Competition</h2>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
              Test your biblical knowledge today and see your name on the leaderboard.
            </p>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md">
              Start Your Quiz
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Helper for icon since Languages isn't imported from lucide-react in this block (ah wait, Languages IS available)
import { Languages } from 'lucide-react';

export default HallelujahStutiLyrics;
