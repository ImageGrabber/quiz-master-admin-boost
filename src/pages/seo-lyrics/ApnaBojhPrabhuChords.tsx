import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Languages, Book, Guitar, Heart, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ApnaBojhPrabhuChords = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Apna Bojh Prabhu Par Daal Lyrics & Chords in Telugu, Malayalam & Kannada"
        description="Complete lyrics and guitar chords for 'Apna Bojh Prabhu Par Daal' with translations in Telugu, Malayalam, and Kannada. Easy G major chords and meaning."
        keywords="apna bojh prabhu par daal chords, apna bojh prabhu par daal lyrics, hindi christian song translations, telugu christian song chords"
        url="/apna-bojh-prabhu-par-daal-lyrics-chords"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MusicComposition",
          "name": "Apna Bojh Prabhu Par Daal",
          "genre": "Christian Worship",
          "inLanguage": ["hi", "te", "ml", "kn", "en"],
          "lyrics": {
            "@type": "CreativeWork",
            "text": "Apna bojh Prabhu par daal, kabhi na ghabarana. Tera aadarman karega, aashchary karm karega..."
          }
        }}
      />

      <Navigation />

      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
              Apna Bojh Prabhu Par Daal
            </h1>
            <p className="text-xl text-slate-600 font-urbanist">
              Lyrics & Guitar Chords with Multi-Language Translations
            </p>
          </header>

          <Tabs defaultValue="hindi" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8 h-auto p-1 bg-slate-200/50">
              <TabsTrigger value="hindi" className="py-2">Hindi</TabsTrigger>
              <TabsTrigger value="telugu" className="py-2">Telugu</TabsTrigger>
              <TabsTrigger value="malayalam" className="py-2">Malayalam</TabsTrigger>
              <TabsTrigger value="kannada" className="py-2">Kannada</TabsTrigger>
              <TabsTrigger value="english" className="py-2">English</TabsTrigger>
              <TabsTrigger value="chords" className="py-2 flex items-center gap-1">
                <Guitar className="w-4 h-4" /> Chords
              </TabsTrigger>
            </TabsList>

            {/* Hindi Content */}
            <TabsContent value="hindi">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Hindi (Devanagari)</h2>
                    <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist">
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Telugu Content */}
            <TabsContent value="telugu">
              <Card>
                <CardContent className="pt-8 text-center space-y-8 font-urbanist italic">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Telugu (భారము ప్రభువుపై)</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                    {`పల్లవి:
                    నీ భారము ప్రభువుపై మోపుము - ఎన్నడూ భయపడకుము
                    ఆయనే నిన్ను ఘనపరచును - అద్భుతములు చేయును

                    చరణం 1:
                    తన భక్తులను ఆయన మరువడు - నిరంతరం వారిని ఆదరించును

                    చరణం 2:
                    ఆయనే మన శరణాలయము - తన నీడలో మనలను నడిపించును

                    చరణం 3:
                    తల్లిదండ్రులు నిన్ను విడిచినను - ఆయన నిన్ను హత్తుకొనును

                    చరణం 4:
                    ప్రభువు మన పక్షమున ఉండగా - మనకు విరోధి ఎవరు?`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Malayalam Content */}
            <TabsContent value="malayalam">
              <Card>
                <CardContent className="pt-8 text-center space-y-8 font-urbanist italic">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Malayalam Meaning</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                    {`നിൻ്റെ ഭാരം കർത്താവിൽ സമർപ്പിക്കൂ - ഭയപ്പെടേണ്ട ഒരിയ്ക്കലും
                    അവൻ നിന്നെ മാനിക്കും - അത്ഭുതങ്ങൾ പ്രവർത്തിക്കും

                    തൻ്റെ ഭക്തരെ അവൻ മറക്കില്ല - എപ്പോഴും അവരെ കാത്തുസൂക്ഷിക്കും
                    രക്ഷകൻ നമ്മുടെ സങ്കേതമാണ് - അവൻ്റെ തണലിൽ നമ്മെ നടത്തുന്നു

                    മാതാപിതാക്കൾ നിന്നെ ഉപേക്ഷിച്ചാലും - അവൻ നിന്നെ ചേർത്തുപിടിക്കും
                    കർത്താവ് നമ്മുടെ കൂടെയുണ്ടെങ്കിൽ - ആര് നമുക്ക് വിരോധമായി നിൽക്കും?`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kannada Content */}
            <TabsContent value="kannada">
              <Card>
                <CardContent className="pt-8 text-center space-y-8 font-urbanist italic">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Kannada Meaning</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                    {`ನಿಮ್ಮ ಭಾರವನ್ನು ಕರ್ತನ ಮೇಲೆ ಹಾಕಿ - ಎಂದಿಗೂ ಭಯಪಡಬೇಡಿ
                    ಆತನು ನಿಮ್ಮನ್ನು ಘನಪಡಿಸುವನು - ಅದ್ಭುತಗಳನ್ನು ಮಾಡುವನು

                    ತನ್ನ ಭಕ್ತರನ್ನು ಆತನು ಎಂದಿಗೂ ಮರೆಯನು - ಯಾವಾಗಲೂ ಅವರನ್ನು ರಕ್ಷಿಸುವನು
                    ಕರ್ತನೇ ನಮ್ಮ ಆಶ್ರಯದುರ್ಗ - ತನ್ನ ನೆರಳಿನಲ್ಲಿ ನಮ್ಮನ್ನು ನಡೆಸುವನು

                    ತಂದೆ ತಾಯಿ ನಿನ್ನನ್ನು ಬಿಟ್ಟರೂ - ಆತನು ನಿನ್ನನ್ನು ಕೈ ಹಿಡಿವನು
                    ದೇವರು ನಮ್ಮ ಕಡೆ ಇರುವಾಗ - ನಮಗೆ ವಿರೋಧಿಯಾಗಿ ಯಾರು ಇರಬಲ್ಲರು?`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* English Content */}
            <TabsContent value="english">
              <Card>
                <CardContent className="pt-8 text-center space-y-8 font-urbanist">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">English Translation</h2>
                  <div className="text-lg md:text-sm text-slate-600 mb-4 italic">
                    {`Apna bojh Prabhu par daal, kabhi na ghabarana
                    Tera aadarman karega, aashchary karm karega`}
                  </div>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                    {`Chorus:
                    Cast your burden on the Lord, never be afraid.
                    He will honor you, He will perform miracles.

                    Verse 1:
                    He will not forget His devotees, He will always sustain them.

                    Verse 2:
                    The Savior is our refuge, He walks with us in His shadow.

                    Verse 3:
                    Even if mother and father forsake you, He will embrace you.

                    Verse 4:
                    If the Lord is with us, who can stand against us?

                    Verse 5:
                    Surrender everything to Him, as He is the one who watches over all.`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chords Content */}
            <TabsContent value="chords">
              <Card>
                <CardContent className="pt-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center justify-center gap-2">
                    <Guitar className="w-6 h-6" /> Guitar Chords (Scale: G Major)
                  </h2>
                  <div className="max-w-md mx-auto text-left font-mono bg-slate-900 text-white p-8 rounded-2xl shadow-xl border border-slate-700">
                    <p className="text-orange-400 font-bold mb-4">Rhythm: 4/4 Beat | Strumming: D DU UDU</p>
                    <div className="space-y-4">
                      <p><strong>(G)</strong> Apna <strong>(C)</strong> bojh <strong>(G)</strong> Prabhu <strong>(D)</strong> par daal,</p>
                      <p><strong>(G)</strong> kabhi <strong>(C)</strong> na <strong>(D)</strong> ghabarana</p>
                      <p><strong>(G)</strong> Tera <strong>(C)</strong> aadarman <strong>(G)</strong> karega,</p>
                      <p><strong>(G)</strong> aashchary <strong>(D)</strong> karm <strong>(G)</strong> karega</p>
                      
                      <div className="pt-4 border-t border-slate-700">
                        <p className="text-slate-400 text-sm italic">Verse Pattern:</p>
                        <p><strong>(G)</strong> Bhakton <strong>(C)</strong> ko vah <strong>(G)</strong> bhoolega <strong>(D)</strong> nahin,</p>
                        <p><strong>(G)</strong> hameisha <strong>(C)</strong> unko <strong>(D)</strong> sambhalega</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6 font-urbanist">Play More Christian Quizzes</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              Knowledge of the Word is as important as worship. Join our community of believers today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" onClick={() => navigate('/daily-bible-quiz')}>
                Start Quiz Now
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white" onClick={() => navigate('/public-leaderboard')}>
                Leaderboard
              </Button>
            </div>
          </section>

          {/* Related Songs Section */}
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 font-urbanist text-center italic">More Popular Worship Songs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-50" onClick={() => navigate('/ho-teri-stuti-aur-aradhana-lyrics-telugu-kannada-malayalam')}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Music className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Ho Teri Stuti Aur Aradhana</h3>
                      <p className="text-sm text-slate-500">Hindi, Telugu, Malayalam & Kannada</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-50" onClick={() => navigate('/hallelujah-stuti-gaye-hum-lyrics')}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Music className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Hallelujah Stuti Gaye Hum</h3>
                      <p className="text-sm text-slate-500">Hindi Original + Multi-language</p>
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

const Button = ({ children, className, variant, size, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  const variants: any = {
    default: "bg-blue-600 text-white shadow hover:bg-blue-700",
    outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  };
  const sizes: any = {
    default: "h-9 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-full px-8 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant || 'default']} ${sizes[size || 'default']} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ApnaBojhPrabhuChords;

