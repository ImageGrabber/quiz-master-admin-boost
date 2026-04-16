import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Guitar, Music, BookOpen } from 'lucide-react';

const ApnaBojhPrabhuChords = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Apna Bojh Prabhu Par Daal Lyrics & Chords | Hindi Christian Song</title>
        <meta name="description" content="Get full lyrics and guitar chords for 'Apna Bojh Prabhu Par Daal'. Hindi Christian worship song with easy G major chords and English transliteration." />
        <meta name="keywords" content="apna bhoj prabhu par daal chords, apna bojh prabhu par daal lyrics chords, hindi christian song chords, masih geet chords" />
        <link rel="canonical" href="https://biblequizcompetition.com/apna-bojh-prabhu-par-daal-lyrics-chords" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicComposition",
            "name": "Apna Bojh Prabhu Par Daal",
            "genre": "Christian Worship",
            "inLanguage": "hi",
            "lyrics": {
              "@type": "CreativeWork",
              "text": "Apna bojh Prabhu par daal, kabhi na ghabarana. Tera aadarman karega, aashchary karm karega..."
            }
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
              Apna Bojh Prabhu Par Daal
            </h1>
            <p className="text-xl text-slate-600 font-urbanist">
              Lyrics & Guitar Chords
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="w-5 h-5 text-blue-600" /> Lyrics (Hindi)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg text-slate-800 leading-relaxed whitespace-pre-line">
                  {`अपना बोझ प्रभु पर डाल, कभी ना घबराना
                  तेरा आदरमान करेगा, आश्चर्य कर्म करेगा (2)

                  1. भक्तों को वह भूलेगा नहीं, 
                     हमेशा उनको सम्भालेगा।

                  2. तारणहारा हमारी शरण, 
                     साये में लेकर चलता है।

                  3. माता पिता यदि छोड़ देवें, 
                     वो तो गले लगायेगा।

                  4. प्रभु हमारे साथ रहे, 
                     सामना कौन कर पाएगा।

                  5. पूरा समर्पण उसको करें, 
                     वो ही सब कुछ देखेगा।`}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Guitar className="w-5 h-5 text-orange-400" /> Guitar Chords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 font-mono">
                  <div>
                    <p className="text-orange-400 font-bold mb-2">Scale: G Major</p>
                    <p className="text-slate-400 text-sm italic">Recommended Rhythm: 4/4 Beat</p>
                  </div>
                  
                  <div className="bg-slate-800 p-4 rounded-lg space-y-4">
                    <p><strong>(G)</strong> Apna <strong>(C)</strong> bojh <strong>(G)</strong> Prabhu <strong>(D)</strong> par daal,</p>
                    <p><strong>(G)</strong> kabhi <strong>(C)</strong> na <strong>(D)</strong> ghabarana</p>
                    <p><strong>(G)</strong> Tera <strong>(C)</strong> aadarman <strong>(G)</strong> karega,</p>
                    <p><strong>(G)</strong> aashchary <strong>(D)</strong> karm <strong>(G)</strong> karega</p>
                  </div>

                  <div className="text-sm text-slate-400">
                    <p>Tips: Keep the strumming light and consistent. Transition from G to C smoothly during the chorus.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border-blue-100 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <BookOpen className="w-5 h-5" /> English Transliteration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-slate-700 leading-relaxed whitespace-pre-line italic">
                {`Apna bojh Prabhu par daal, kabhi na ghabarana
                Tera aadarman karega, aashchary karm karega

                1. Bhakton ko vah bhoolega nahin, hameisha unko sambhalega.
                2. Taaranahaara hamari sharan, saaye mein lekar chalta hai.
                3. Maata pita yadi chhod deven, vo to gale lagayega.
                4. Prabhu hamare saath rahe, saamna kaun kar payega.`}
              </div>
            </CardContent>
          </Card>

           <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6 font-urbanist">Play More Christian Quizzes</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              Knowledge of the Word is as important as worship. Join our community of believers today.
            </p>
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors">
              Start Quiz Now
            </button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApnaBojhPrabhuChords;
