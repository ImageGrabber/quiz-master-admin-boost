import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter2Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "Thus the heavens and the earth were finished, and all the host of them."
    },
    {
      verse: "2", 
      text: "And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done."
    },
    {
      verse: "3",
      text: "So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation."
    },
    {
      verse: "4",
      text: "These are the generations of the heavens and the earth when they were created, in the day that the LORD God made the earth and the heavens."
    },
    {
      verse: "5",
      text: "When no bush of the field was yet in the land and no small plant of the field had yet sprung up—for the LORD God had not caused it to rain on the land, and there was no man to work the ground,"
    },
    {
      verse: "6",
      text: "and a mist was going up from the land and was watering the whole face of the ground—"
    },
    {
      verse: "7",
      text: "then the LORD God formed the man of dust from the ground and breathed into his nostrils the breath of life, and the man became a living creature."
    },
    {
      verse: "8",
      text: "And the LORD God planted a garden in Eden, in the east, and there he put the man whom he had formed."
    },
    {
      verse: "9",
      text: "And out of the ground the LORD God made to spring up every tree that is pleasant to the sight and good for food. The tree of life was in the midst of the garden, and the tree of the knowledge of good and evil."
    },
    {
      verse: "10",
      text: "A river flowed out of Eden to water the garden, and there it divided and became four rivers."
    },
    {
      verse: "11",
      text: "The name of the first is the Pishon. It is the one that flowed around the whole land of Havilah, where there is gold."
    },
    {
      verse: "12",
      text: "And the gold of that land is good; bdellium and onyx stone are there."
    },
    {
      verse: "13",
      text: "The name of the second river is the Gihon. It is the one that flowed around the whole land of Cush."
    },
    {
      verse: "14",
      text: "And the name of the third river is the Tigris, which flows east of Assyria. And the fourth river is the Euphrates."
    },
    {
      verse: "15",
      text: "The LORD God took the man and put him in the garden of Eden to work it and keep it."
    },
    {
      verse: "16",
      text: "And the LORD God commanded the man, saying, 'You may surely eat of every tree of the garden,"
    },
    {
      verse: "17",
      text: "but of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall surely die.'"
    },
    {
      verse: "18",
      text: "Then the LORD God said, 'It is not good that the man should be alone; I will make him a helper fit for him.'"
    },
    {
      verse: "19",
      text: "Now out of the ground the LORD God had formed every beast of the field and every bird of the heavens and brought them to the man to see what he would call them. And whatever the man called every living creature, that was its name."
    },
    {
      verse: "20",
      text: "The man gave names to all livestock and to the birds of the heavens and to every beast of the field. But for Adam there was not found a helper fit for him."
    },
    {
      verse: "21",
      text: "So the LORD God caused a deep sleep to fall upon the man, and while he slept took one of his ribs and closed up its place with flesh."
    },
    {
      verse: "22",
      text: "And the rib that the LORD God had taken from the man he made into a woman and brought her to the man."
    },
    {
      verse: "23",
      text: "Then the man said, 'This at last is bone of my bones and flesh of my flesh; she shall be called Woman, because she was taken out of Man.'"
    },
    {
      verse: "24",
      text: "Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh."
    },
    {
      verse: "25",
      text: "And the man and his wife were both naked and were not ashamed."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 2 Full Text - Complete Bible Reading | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 2 text verse by verse. Full ESV translation of the Garden of Eden, creation of man and woman, and the institution of marriage. Perfect for Bible study and reference." />
        <meta name="keywords" content="Genesis Chapter 2 full text, Bible reading, ESV translation, Garden of Eden, creation of man and woman, Genesis 2 complete, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 2 Full Text - Complete Bible Reading | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 2 text verse by verse. Full ESV translation of the Garden of Eden, creation of man and woman, and the institution of marriage." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-2-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 2 Full Text - Complete Bible Reading | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 2 text verse by verse. Full ESV translation of the Garden of Eden, creation of man and woman, and the institution of marriage." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 2 Full Text - Complete Bible Reading',
          description: 'Read the complete Genesis Chapter 2 text verse by verse. Full ESV translation of the Garden of Eden, creation of man and woman, and the institution of marriage.',
          author: {
            '@type': 'Organization',
            name: 'Bible Quiz Competition'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Bible Quiz Competition',
            logo: {
              '@type': 'ImageObject',
              url: 'https://biblequizcompetition.com/sword.png'
            }
          },
          datePublished: '2024-01-01',
          dateModified: new Date().toISOString().split('T')[0],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-2-full'
          }
        })}</script>
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-white via-white/70 to-blue-50 shadow-sm">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Genesis Chapter 2 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              The Garden of Eden & Creation of Man and Woman
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 2, verse by verse, as it appears in the Bible.
            </p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/bible-questions-and-answers-hub")}>
            Bible Q&A Hub
          </Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/bible-questions-and-answers-hub/genesis")}>
            Genesis
          </Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="font-medium text-gray-900">Chapter 2 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-2")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 2 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 25 verses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Section Header: The Seventh Day, God Rests */}
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">The Seventh Day, God Rests</h3>
                <div className="space-y-4">
                  {fullChapterText.slice(0, 3).map((verse, idx) => (
                    <div key={idx} className="flex gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
                          {verse.verse}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed">{verse.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section Header: The Creation of Man and Woman */}
              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                <h3 className="text-lg font-semibold text-green-800 mb-2">The Creation of Man and Woman</h3>
                <div className="space-y-4">
                  {fullChapterText.slice(3).map((verse, idx) => (
                    <div key={idx + 3} className="flex gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 text-sm font-semibold rounded-full">
                          {verse.verse}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed">{verse.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-2")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch2-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch2-advanced")}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Advanced Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
