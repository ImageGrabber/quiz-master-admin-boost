import React from 'react';
import SEO from '@/components/SEO';
import { generateVideoSchema } from '@/utils/video-seo';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Music, Languages, Book, Guitar, Video, Star, Heart } from 'lucide-react';

const HoTeriStutiTeluguLyrics = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Ho Teri Stuti Aur Aradhana Lyrics in Telugu (స్తుతి ఆరాధన) - Chords & Video"
        description="Complete Telugu lyrics for 'Ho Teri Stuti Aur Aradhana' (Stuthi Aradhana) with transliteration, guitar chords, and video. Free Christian worship resources in Telugu."
        keywords="ho teri stuti aur aradhana lyrics in telugu, stuthi aradhana telugu lyrics, ho teri stuti telugu chords, telugu christian song lyrics, bible quiz telugu"
        url="/ho-teri-stuti-aur-aradhana-lyrics-telugu"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MusicComposition",
              "name": "Ho Teri Stuti Aur Aradhana (Telugu)",
              "alternateName": "Stuthi Aradhana",
              "composer": {
                "@type": "Person",
                "name": "Steve Joseph"
              },
              "genre": "Christian Worship",
              "inLanguage": "te",
              "lyrics": {
                "@type": "CreativeWork",
                "text": "స్తుతి ఆరాధన నీకే ప్రభు, ప్రాార్థించెదం నీ సన్నిధిలో..."
              }
            },
            generateVideoSchema({
              title: "Ho Teri Stuti Aur Aradhana Lyrics in Telugu (స్తుతి ఆరాధన) - Video",
              description: "Watch the Telugu version video and sing along with lyrics for 'Ho Teri Stuti Aur Aradhana'.",
              videoUrl: "https://www.youtube.com/embed/UvdKGzP6Yy0"
            }),
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the meaning of Ho Teri Stuti Aur Aradhana in Telugu?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "It means 'Lord, may there be Your praise and adoration'. In Telugu, it is commonly translated as 'Stuthi Aradhana Neeke Prabhu'."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Who is the original composer of this song?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The song was originally composed and popularized by Steve Joseph."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What are the guitar chords for Ho Teri Stuti Aur Aradhana?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The most common scale used is A Minor (Am). The primary chords are Am, F, G, and E (Major or 7th)."
                  }
                }
              ]
            }
          ]
        }}
      />

      <Navigation />

      <main className="container mx-auto px-4 py-12 pt-28">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <Languages className="w-4 h-4" /> Telugu Version
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
              Ho Teri Stuti Aur Aradhana <br/>
              <span className="text-blue-600">(స్తుతి ఆరాధన)</span>
            </h1>
            <p className="text-xl text-slate-600 font-urbanist max-w-2xl mx-auto">
              Complete Telugu Lyrics, Transliteration, Video, and Guitar Chords for this powerful worship song.
            </p>
          </header>

          <Tabs defaultValue="lyrics" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto p-1 bg-slate-200/50">
              <TabsTrigger value="lyrics" className="py-2 flex items-center gap-1">
                <Book className="w-4 h-4" /> Telugu Script
              </TabsTrigger>
              <TabsTrigger value="translit" className="py-2 flex items-center gap-1">
                <Music className="w-4 h-4" /> Romanized
              </TabsTrigger>
              <TabsTrigger value="video" className="py-2 flex items-center gap-1">
                <Video className="w-4 h-4" /> Video
              </TabsTrigger>
              <TabsTrigger value="chords" className="py-2 flex items-center gap-1">
                <Guitar className="w-4 h-4" /> Chords
              </TabsTrigger>
            </TabsList>

            {/* Telugu Script Content */}
            <TabsContent value="lyrics">
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2 italic">
                    <Heart className="w-5 h-5 fill-current" /> తెలుగు సాహిత్యం (Telugu Lyrics)
                  </h2>
                </div>
                <CardContent className="pt-8 text-center space-y-8 bg-white">
                  <div className="text-lg md:text-2xl text-slate-800 leading-[2.5rem] md:leading-[3rem] whitespace-pre-line font-medium italic">
                    {`పల్లవి:
                    స్తుతి ఆరాధన నీకే ప్రభు 
                    ప్రాార్థించెదం నీ సన్నిధిలో
                    ఈ స్థలము నీ మహిమతో నింపుము 
                    నీ చిత్తమే ఇలా నెరవేర్చుము
                    
                    హల్లె.. హల్లెలూయా 
                    హల్లెలూయా హల్లెలూయా

                    చరణం 1:
                    నూతన దినమిచ్చితివి నీ కరుణతో
                    కాపాడుచుంటివి నా దుర్గమై
                    పిలిచినప్పుడు నా తోనుందువు
                    పడినప్పుడు నన్ను లేవనెత్తెదవు

                    చరణం 2:
                    యేసయ్యా - నా దైవమా
                    నా విమోచకుడా - సర్వశక్తిమంతుడా
                    యేసయ్యా - నా దైవమా
                    నా స్నేహితుడా - నా మంచి కాపరి

                    చరణం 3:
                    లోకంలో నీవంటి వారెవరు లేరు
                    నీవు తప్ప వేరే ప్రభువెవ్వరూ?
                    నీ ఎదుట మాత్రమే మోకరింతును
                    నీవే నా తండ్రి, నీవే నా ప్రభు`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Transliteration Content */}
            <TabsContent value="translit">
              <Card className="border-none shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4">
                  <h2 className="text-xl font-bold text-white">Transliteration (English Script)</h2>
                </div>
                <CardContent className="pt-8 text-center space-y-8 bg-white">
                  <div className="text-lg md:text-xl text-slate-800 leading-relaxed whitespace-pre-line font-urbanist">
                    {`Chorus:
                    Stuthi aaradhana neeke Prabhu
                    Prardhimchedham nee sannidhilo
                    Ee sthalamu nee mahimatho nimpumu
                    Nee chithamae ila neraverchumu

                    Halle.. Hallelujah
                    Hallelujah Hallelujah

                    Verse 1:
                    Noothana dinamichithivi nee karunatho
                    Kapaaduchuntivi naa durgamai
                    Pilichinappudu naa thonunduvu
                    Padinappudu nannu levanethedhavu

                    Verse 2:
                    Yesayyaa - Naa daivamaa
                    Naa vimocha kudaa - Sarvashakthimanthudaa
                    Yesayyaa - Naa daivamaa
                    Naa snehithudaa - Naa manchi kaapari

                    Verse 3:
                    Lokamlo neevanti varevaru leru
                    Neevu thappa verae prabhuvevvaru?
                    Nee edhuta mathrame mokarinthunu
                    Neeve naa thandri, neeve naa Prabhu`}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Video Content */}
            <TabsContent value="video">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="aspect-video w-full rounded-xl overflow-hidden shadow-inner bg-black">
                    <iframe 
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/UvdKGzP6Yy0" 
                      title="Ho Teri Stuti Aur Aradhana Telugu Version"
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-slate-600 italic">Sing along with the Telugu cover of "Ho Teri Stuti Aur Aradhana"</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Chords Content */}
            <TabsContent value="chords">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-8">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
                        <Guitar className="w-6 h-6" /> Guitar Chords
                      </h2>
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 font-mono text-sm md:text-base leading-loose">
                        <p className="mb-4 text-blue-700 font-bold">Scale: A Minor (Am) | Strumming: D DU UDU</p>
                        
                        <p className="mb-2"><strong>[Am]</strong> Stuthi <strong>[F]</strong> aaradhana <strong>[G]</strong> neeke <strong>[E]</strong> Prabhu</p>
                        <p className="mb-2"><strong>[Am]</strong> Prardhimchedham <strong>[F]</strong> nee <strong>[G]</strong> sanni<strong>[E]</strong>dhilo</p>
                        <p className="mb-2"><strong>[Am]</strong> Ee sthalamu nee <strong>[F]</strong> mahimatho nimpumu</p>
                        <p className="mb-4"><strong>[G]</strong> Nee chithamae ila <strong>[E]</strong> neraverchumu</p>
                        
                        <p className="mb-2"><strong>[Am]</strong> Halle.. <strong>[F]</strong> Hallelujah</p>
                        <p className="mb-6"><strong>[G]</strong> Hallelujah <strong>[E]</strong> Hallelujah</p>

                        <p className="mb-2"><strong>[Am]</strong> Noothana dinamichithivi <strong>[F]</strong> nee karunatho</p>
                        <p className="mb-2"><strong>[G]</strong> Kapaaduchuntivi <strong>[E]</strong> naa durgamai</p>
                        <button className="text-xs text-blue-500 underline mt-4">View All Chord Patterns</button>
                      </div>
                    </div>
                    <div className="md:w-64 space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h3 className="font-bold text-blue-800 mb-2">Chord Charts</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {['Am', 'F', 'G', 'E', 'Dm'].map(chord => (
                            <div key={chord} className="bg-white p-2 text-center rounded border font-bold text-slate-700 shadow-sm">
                              {chord}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                        <h3 className="font-bold text-amber-800 mb-2 text-sm italic">Pro Tip</h3>
                        <p className="text-xs text-amber-700 leading-relaxed">
                          For a softer feel, use a capo on the 5th fret and play Em shape chords (Em, C, D, B7).
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Meaning Section */}
          <section className="mt-16 grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600">
                <Star className="w-5 h-5 fill-current" />
                <h2 className="text-2xl font-bold font-urbanist">Spiritual Significance</h2>
              </div>
              <p className="text-slate-700 leading-relaxed font-urbanist">
                "Ho Teri Stuti Aur Aradhana" is a prayer of surrender and petition for God's presence. In Telugu, this is beautifully translated as "Stuthi Aradhana", emphasizing our complete reliance on God's compassion (Karuna) and protection (Durga).
              </p>
              <ul className="space-y-2 text-slate-600 text-sm">
                <li className="flex gap-2"><span>•</span> <span>Praise for the new day given by His grace.</span></li>
                <li className="flex gap-2"><span>•</span> <span>Recognition of God as our shield and protector.</span></li>
                <li className="flex gap-2"><span>•</span> <span>Call for the Holy Spirit to fill the atmosphere.</span></li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 italic text-slate-500">
              "When you sing this song, focus on Verse 1 where we thank Him for the new day. It reminds us that His mercies are new every morning (Lamentations 3:22-23)."
            </div>
          </section>

          {/* FAQ Schema for SEO */}
          <section className="mt-16 border-t border-slate-200 pt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 font-urbanist">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "What is the meaning of Ho Teri Stuti Aur Aradhana in Telugu?",
                  a: "It means 'Lord, may there be Your praise and adoration'. In Telugu, it is commonly translated as 'Stuthi Aradhana Neeke Prabhu'."
                },
                {
                  q: "Who is the original composer of this song?",
                  a: "The song was originally composed and popularized by Steve Joseph."
                },
                {
                  q: "What are the guitar chords for Ho Teri Stuti Aur Aradhana?",
                  a: "The most common scale used is A Minor (Am). The primary chords are Am, F, G, and E (Major or 7th)."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600 italic leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="mt-16 bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            
            <h2 className="text-3xl font-bold mb-6 font-urbanist">Take the Telugu Bible Quiz</h2>
            <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-lg font-urbanist">
              Enjoyed the lyrics? Test your knowledge of the Bible in Telugu and compete for exciting prizes!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-xl">
                Start Quiz in Telugu
              </Button>
              <Button size="lg" variant="outline" className="border-blue-300/30 text-blue-100 hover:bg-white/10">
                View Telugu Leaderboard
              </Button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Reusable Button extension for consistency
const Button = ({ children, className, variant, size, ...props }: any) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50";
  const variants: any = {
    default: "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg",
    outline: "border border-slate-200 bg-transparent shadow-sm hover:bg-slate-50 hover:text-slate-900",
    secondary: "bg-slate-100 text-slate-900 shadow-sm hover:bg-slate-200",
  };
  const sizes: any = {
    default: "h-11 px-6 py-2",
    sm: "h-9 rounded-lg px-4 text-sm",
    lg: "h-14 rounded-2xl px-10 text-lg",
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

export default HoTeriStutiTeluguLyrics;
