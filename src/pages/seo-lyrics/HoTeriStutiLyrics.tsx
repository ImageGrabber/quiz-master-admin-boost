import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Languages, Book, Guitar } from 'lucide-react';

const HoTeriStutiLyrics = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Ho Teri Stuti Aur Aradhana Lyrics in Telugu, Kannada, Malayalam & English</title>
        <meta name="description" content="Complete lyrics for 'Ho Teri Stuti Aur Aradhana' Hindi Christian song with translations in Telugu, Kannada, Malayalam, and English. Include guitar chords and meaning." />
        <meta name="keywords" content="ho teri stuti aur aradhana lyrics in telugu, ho teri stuti aur aradhana lyrics in kannada, ho teri stuti aur aradhana malayalam, ho teri stuti aur aradhana lyrics in english, christian worship song chords" />
        <link rel="canonical" href="https://biblequizcompetition.com/ho-teri-stuti-aur-aradhana-lyrics-telugu-kannada-malayalam" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MusicComposition",
            "name": "Ho Teri Stuti Aur Aradhana",
            "composer": {
              "@type": "Person",
              "name": "Steve Joseph"
            },
            "genre": "Christian Worship",
            "inLanguage": ["hi", "te", "ml", "kn", "en"],
            "lyrics": {
              "@type": "CreativeWork",
              "text": "Ho teri stuti aur aradhana, Karta hun mein tujhse yeh prarthana..."
            }
          })}
        </script>
      </Helmet>

      <Navigation />

      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
              Ho Teri Stuti Aur Aradhana Lyrics
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
                    <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                      {`हो तेरी स्तुति और आराधना, 
                      करता हूँ मैं तुझसे यह प्रार्थना
                      महिमा से तेरी तू इस जगह को भर, 
                      जो भी तू चाहे तू यहाँ पर कर
                      
                      हाले-हालेलुयाह, हालेलुयाह, हालेलुयाह
                      हाले-हालेलुयाह, हालेलुयाह, हालेलुयाह
                      
                      करुणा से तेरी नया दिन दिखाता है
                      ढाल बनकर मेरी मुझे बचाता है
                      जब मैं पुकारूँ तू दौड़े आता है
                      जब मैं गिरूँ मुझे उठाता है
                      
                      सारे जहाँ में तुझसा कोई नहीं
                      तुझको छोड़ कोई प्रभु है ही नहीं
                      घुटने मैं टेकूँ बस तेरे सामने
                      तू है मेरा प्रभु, तू मेरा पिता`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Telugu Content */}
            <TabsContent value="telugu">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Telugu Lyrics (స్తుతి ఆరాధన)</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                    {`పల్లవి:
                    స్తుతి ఆరాధన నీకే ప్రభు - ప్రార్థించెదం నీ సన్నిధిలో
                    ఈ స్థలము నీ మహిమతో నింపుము - నీ చిత్తమే ఇలా నెరవేర్చుము
                    హల్లె.. హల్లెలూయా హల్లెలూయా హల్లెలూయా

                    చరణం 1:
                    నూతన దినమిచ్చితివి నీ కరుణతో - కాపాడుచుంటివి నా దుర్గమై
                    పిలిచినప్పుడు నా తోనుందువు - పడినప్పుడు నన్ను లేవనెత్తెదవు

                    చరణం 2:
                    లోకంలో నీవంటి వారెవరు లేరు - నీవు తప్ప వేరే ప్రభువెవ్వరూ?
                    నీ ఎదుట మాత్రమే మోకరింతును - నీవే నా తండ్రి, నీవే నా ప్రభు`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Malayalam Content */}
            <TabsContent value="malayalam">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Malayalam Lyrics (യേശുവിൻ നാമത്തിനാരാധനാ)</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                    {`യേശുവിൻ നാമത്തിനാരാധനാ
                    രാജാധി രാജാവിന്നാരാധനാ
                    എല്ലാ പ്രശംസക്കും യോഗ്യൻ നീയേ
                    പാടുന്നു ഞാൻ അങ്ങേക്കാരാധനാ

                    ഹാല്ലേ ഹാലേലുയ്യ ഹാലേലുയ്യ ഹാലേലുയ്യ

                    കരുണയിൻ കരത്താൽ നീ കാക്കുന്നവാൻ
                    പുതുവഴി ഒരുക്കി നീ കരുതുന്നവൻ
                    ദുഖത്തിൻ വേളയിൽ കൈവിടാത്തവൻ
                    വീഴാതെ എന്നെന്നും താങ്ങുന്നവൻ

                    ആദിയും അന്ധവും ആയവനെ
                    അങ്ങേക്ക് തുല്യനായ് ആരുമില്ല
                    വണങ്ങുന്നെ അങ്ങേ తిరు മുൻപിൽ ഞാൻ
                    അർപ്പിക്കുന്നെ അങ്ങേക്കാരാധന`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Kannada Content */}
            <TabsContent value="kannada">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">Kannada Transliteration</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                    {`Ho teri stuti aur aradhana,
                    Karta hun mein tujhse yeh prarthana
                    Mahima se teri tu is jagah ko bhar,
                    Jo bhi tu chahe tu yahan par kar

                    Hale-hallelujah, Hallelujah, Hallelujah

                    Karuna se teri naya din dhikata hai
                    Dhal banker meri mujhe bachata hai
                    Jab mein pukaru tu daude aata hai
                    Jab mein giru mujhe uthata hai

                    Sare jahan mein tujhsa koi nahi
                    Tujhko chod koyi prabhu hai hi nahi
                    Ghutne mein teku bas tere saamne
                    Tu hai mera prabhu, tu mera pita`}
                  </div>
                  <p className="text-sm text-slate-500 italic">Kannada congregations often sing the original Hindi lyrics or localized direct translations.</p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* English Content */}
            <TabsContent value="english">
              <Card>
                <CardContent className="pt-8 text-center space-y-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-4">English Translation</h2>
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line">
                    {`Verse 1:
                    Lord, may there be Your praise and adoration, 
                    this is my prayer to You. 
                    Fill this place with Your glory, 
                    and do whatever You desire here.

                    Chorus:
                    Hallelujah, Hallelujah, Hallelujah

                    Verse 2:
                    Through Your compassion, You show me a new day. 
                    You protect me by becoming my shield. 
                    When I call, You come running to me. 
                    When I fall, You lift me up.

                    Verse 3:
                    In the whole world, there is no one like You. 
                    There is no Lord besides You. 
                    I kneel only before You; 
                    You are my Lord, You are my Father.`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chords Content */}
            <TabsContent value="chords">
              <Card>
                <CardContent className="pt-8">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center justify-center gap-2">
                    <Guitar className="w-6 h-6" /> Guitar Chords (Scale: Am)
                  </h2>
                  <div className="max-w-md mx-auto text-left font-mono bg-slate-50 p-6 rounded-lg border border-slate-200">
                    <p className="mb-4"><strong>Intro:</strong> Am | F | G | E</p>
                    <p className="mb-2"><strong>(Am)</strong> Ho teri stuti aur <strong>(F)</strong> aradhana,</p>
                    <p className="mb-2"><strong>(G)</strong> Karta hun mein tujhse yeh <strong>(E)</strong> prarthana</p>
                    <p className="mb-2"><strong>(Am)</strong> Mahima se teri tu is <strong>(F)</strong> jagah ko bhar,</p>
                    <p className="mb-4"><strong>(G)</strong> Jo bhi tu chahe tu yahan <strong>(E)</strong> par kar</p>
                    
                    <p className="mb-2"><strong>(Am)</strong> Hale-hallelujah, <strong>(F)</strong> Hallelujah,</p>
                    <p className="mb-4"><strong>(G)</strong> Hallelujah <strong>(E)</strong> ...</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <section className="mt-16 bg-blue-900 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6 font-urbanist">Take the Bible Quiz</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg">
              Enjoyed the lyrics? Test your knowledge of the Bible in our daily competition and win exciting prizes!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                Join Competition
              </Button>
              <Button size="lg" variant="outline" className="border-blue-400 text-blue-100 hover:bg-blue-800 hover:text-white">
                View Leaderboard
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Simple Button component since I'm using it in the CTA
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

export default HoTeriStutiLyrics;
