import React from 'react';
import SEO from '@/components/SEO';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Languages, Book, Guitar, Mic2, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HallelujahStutiLyrics = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Hallelujah Stuti Gaye Hum Lyrics in Telugu, Malayalam, Kannada & English"
        description="Complete lyrics for 'Hallelujah Stuti Gaye Hum' Hindi Christian song with translations in Telugu, Malayalam, Kannada, and English. Include guitar chords and meaning."
        keywords="hallelujah stuti gaye hum lyrics, hallelujah stuti gaye hum telugu, hallelujah stuti gaye hum malayalam, hallelujah stuti gaye hum kannada, christian worship song chords"
        url="/hallelujah-stuti-gaye-hum-lyrics"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "MusicComposition",
          "name": "Hallelujah Stuti Gaye Hum",
          "genre": "Christian Worship",
          "inLanguage": ["hi", "te", "ml", "kn", "en"],
          "lyrics": {
            "@type": "CreativeWork",
            "text": "Hallelujah stuti gaye hum, Yeshu ki stuti gaye hum. Kroos par bali dwaaraa, apana lahu bahaayaa..."
          }
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
              Hallelujah Stuti Gaye Hum
            </h1>
            <p className="text-xl text-slate-600 font-urbanist">
              Hindi Original with Telugu, Malayalam, Kannada & English Translations
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* Telugu Content */}
            <TabsContent value="telugu">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Telugu (హల్లెలూయ స్తుతి)</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist italic">
                    {`పల్లవి:
                    హల్లెలూయ స్తుతి పాడెదం - యేసుకే స్తుతి పాడెదం
                    హల్లెలూయ హల్లెలూయ హల్లెలూయ

                    చరణం 1:
                    కల్వరి సిలువలో తన రక్తము కార్చెను
                    పాపము కడిగి పరిశుద్ధ పరచెను - మనలను రక్షించెను

                    చరణం 2:
                    నీ ఆత్మను పొంది నీ చిత్తము నెరవేర్చి
                    ఈ జీవితమంతా నీ మార్గములో సాగెదం

                    చరణం 3:
                    యేసు నొద్దకు రా - రక్షణ పొందుము
                    ఆయనే నిన్ను బలపరచును - ఎన్నడూ నిన్ను విడువడు`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Malayalam Content */}
            <TabsContent value="malayalam">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Malayalam Translation</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist italic">
                    {`ഹല്ലേലൂയ സ്തുതി പാടാം - യേശുവിന് സ്തുതി പാടാം
                    ഹല്ലേലൂയ ഹല്ലേലൂയ ഹല്ലേലൂയ

                    ക്രൂശിലെ ബലിയാൽ തൻ രക്തം ചിന്തി
                    പാപങ്ങൾ നീക്കി നമ്മെ ശുദ്ധമാക്കി - നമ്മെ രക്ഷിച്ചു

                    ജീവിത കാലമൊക്കെയും നിന്നെ ഞാൻ ഓർത്തീടും
                    ആത്മാവിനാൽ നിറഞ്ഞു നിൻ ഇഷ്ടം ഞാൻ ചെയ്തിടും

                    യേശുവിൻ അരികിൽ വരൂ - രക്ഷയെ പ്രാപിക്കൂ
                    നിന്നെ അവൻ ആശീർവദിക്കും - കൈവിടില്ല ഒരിയ്ക്കലും`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kannada Content */}
            <TabsContent value="kannada">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Kannada Translation</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist italic">
                    {`ಹಲ್ಲೇಲೂಯ ಸ್ತುತಿ ಹಾಡೋಣ - ಯೇಸುವಿಗೆ ಸ್ತುತಿ ಹಾಡೋಣ
                    ಹಲ್ಲೇಲೂಯ ಹಲ್ಲೇಲೂಯ ಹಲ್ಲೇಲೂಯ

                    ಕ್ರೂಜೆಯ ಬಲಿಯಿಂದ ತನ್ನ ರಕ್ತ ಸುರಿಸಿದನು
                    ಪಾಪವನ್ನು ತೊಳೆದು ನಮ್ಮನ್ನು ಉಳಿಸಿದನು

                    ಈ ಜೀವನವಿಡೀ ನಿನ್ನನ್ನೇ ಧ್ಯಾನಿಸುವೆನು
                    ನಿನ್ನಾತ್ಮನು ಪಡೆದು ನಿನ್ನಿಷ್ಟದಂತೆ ನಡೆಯುವೆನು

                    ಯೇಸುವಿನ ಬಳಿ ಬನ್ನಿ - ಮುಕ್ತಿಯನ್ನು ಪಡೆಯಿರಿ
                    ಆತನು ನಿಮನ್ನು ಆಶೀರ್ವದಿಸುವನು - ಕೈ ಬಿಡನು ಎಂದಿಗೂ`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* English Content */}
            <TabsContent value="english">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">English Meaning</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist">
                    {`Chorus:
                    Let us sing Hallelujah, let us sing praise to Jesus.
                    Ha – Hallelujah, Hallelujah, Hallelujah.

                    Verse 1:
                    Through the sacrifice on the cross, He shed His blood.
                    By removing sin, He purified us and saved us.

                    Verse 2:
                    Throughout this life, I will always meditate on You.
                    Receiving Your Spirit and knowing Your will, I will keep moving forward.

                    Verse 3:
                    Come to Jesus and embrace salvation.
                    He will give blessings, take you with Him, and never leave you.`}
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
                    <p className="text-orange-400 font-bold mb-4">Strumming: D DU UDU</p>
                    <div className="space-y-4">
                      <p><strong>(G)</strong> Hallelujah stuti <strong>(C)</strong> gaye hum,</p>
                      <p><strong>(D)</strong> Yeshu ki stuti <strong>(G)</strong> gaye hum</p>
                      <p><strong>(G)</strong> Haa – <strong>(C)</strong> Hallelujah, <strong>(D)</strong> Hallelujah, <strong>(G)</strong> Hallelujah</p>
                      
                      <div className="pt-4 border-t border-slate-700">
                        <p><strong>(G)</strong> Kroos par bali <strong>(C)</strong> dwaaraa,</p>
                        <p><strong>(D)</strong> apana lahu <strong>(G)</strong> bahaayaa</p>
                        <p><strong>(G)</strong> Paap ko <strong>(C)</strong> haṭaa kar, <strong>(D)</strong> saaf hai <strong>(G)</strong> kiya</p>
                      </div>
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
                  "Hallelujah Stuti Gaye Hum" is a praise-centered Hindi Christian worship song focused on Jesus' sacrifice,
                  salvation, and lifelong devotion. It works well for opening worship, youth fellowship, prayer meetings,
                  and small group devotion.
                </p>
                <p className="text-slate-700 leading-relaxed text-center max-w-3xl mx-auto">
                  Use this page to practice pronunciation, compare regional language versions, and prepare guitar-led worship
                  with simple progression patterns.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="mt-16 bg-blue-900 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6 font-urbanist">Take the Bible Quiz</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              Enjoyed the lyrics? Test your knowledge of the Bible in our daily competition and win exciting prizes!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50" onClick={() => navigate('/daily-bible-quiz')}>
                Join Competition
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white" onClick={() => navigate('/public-leaderboard')}>
                View Leaderboard
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
              <Card className="hover:shadow-md transition-shadow cursor-pointer border-blue-50" onClick={() => navigate('/apna-bojh-prabhu-par-daal-lyrics-chords')}>
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-100 rounded-full">
                      <Guitar className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Apna Bojh Prabhu Par Daal</h3>
                      <p className="text-sm text-slate-500">Complete Chords & Multi-language</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-12">
            <Card>
              <CardContent className="pt-8 space-y-5">
                <h2 className="text-2xl font-bold text-slate-900 font-urbanist text-center">FAQ</h2>
                <div>
                  <h3 className="font-bold text-slate-900">Is this song available in multiple languages?</h3>
                  <p className="text-slate-700 text-sm mt-1">Yes, this page includes Hindi with Telugu, Malayalam, Kannada, and English meaning tabs.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Can beginners play this on guitar?</h3>
                  <p className="text-slate-700 text-sm mt-1">Yes. The listed G major progression and simple strumming pattern are beginner friendly.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Where can I find more Hindi Christian lyrics?</h3>
                  <p className="text-slate-700 text-sm mt-1">Visit the Hindi Songs section for more worship lyrics, chord pages, and devotional song resources.</p>
                </div>
              </CardContent>
            </Card>
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

export default HallelujahStutiLyrics;
