import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter8Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "But God remembered Noah and all the beasts and all the livestock that were with him in the ark. And God made a wind blow over the earth, and the waters subsided."
    },
    {
      verse: "2", 
      text: "The fountains of the deep and the windows of the heavens were closed, the rain from the heavens was restrained,"
    },
    {
      verse: "3",
      text: "and the waters receded from the earth continually. At the end of 150 days the waters had abated,"
    },
    {
      verse: "4",
      text: "and in the seventh month, on the seventeenth day of the month, the ark came to rest on the mountains of Ararat."
    },
    {
      verse: "5",
      text: "And the waters continued to abate until the tenth month; in the tenth month, on the first day of the month, the tops of the mountains were seen."
    },
    {
      verse: "6",
      text: "At the end of forty days Noah opened the window of the ark that he had made"
    },
    {
      verse: "7",
      text: "and sent forth a raven. It went to and fro until the waters were dried up from the earth."
    },
    {
      verse: "8",
      text: "Then he sent forth a dove from him, to see if the waters had subsided from the face of the ground."
    },
    {
      verse: "9",
      text: "But the dove found no place to set her foot, and she returned to him to the ark, for the waters were still on the face of the whole earth. So he put out his hand and took her and brought her into the ark with him."
    },
    {
      verse: "10",
      text: "He waited another seven days, and again he sent forth the dove out of the ark."
    },
    {
      verse: "11",
      text: "And the dove came back to him in the evening, and behold, in her mouth was a freshly plucked olive leaf. So Noah knew that the waters had subsided from the earth."
    },
    {
      verse: "12",
      text: "Then he waited another seven days and sent forth the dove, and she did not return to him anymore."
    },
    {
      verse: "13",
      text: "In the six hundred and first year, in the first month, the first day of the month, the waters were dried from off the earth. And Noah removed the covering of the ark and looked, and behold, the face of the ground was dry."
    },
    {
      verse: "14",
      text: "In the second month, on the twenty-seventh day of the month, the earth had dried out."
    },
    {
      verse: "15",
      text: "Then God said to Noah,"
    },
    {
      verse: "16",
      text: "\"Go out from the ark, you and your wife, and your sons and your sons' wives with you."
    },
    {
      verse: "17",
      text: "Bring out with you every living thing that is with you of all flesh—birds and animals and every creeping thing that creeps on the earth—that they may swarm on the earth, and be fruitful and multiply on the earth.\""
    },
    {
      verse: "18",
      text: "So Noah went out, and his sons and his wife and his sons' wives with him."
    },
    {
      verse: "19",
      text: "Every beast, every creeping thing, and every bird, everything that moves on the earth, went out by families from the ark."
    },
    {
      verse: "20",
      text: "Then Noah built an altar to the Lord and took some of every clean animal and some of every clean bird and offered burnt offerings on the altar."
    },
    {
      verse: "21",
      text: "And when the Lord smelled the pleasing aroma, the Lord said in his heart, \"I will never again curse the ground because of man, for the intention of man's heart is evil from his youth. Neither will I ever again strike down every living creature as I have done."
    },
    {
      verse: "22",
      text: "While the earth remains, seedtime and harvest, cold and heat, summer and winter, day and night, shall not cease.\""
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 8 Full Text - After the Flood & God's Covenant | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 8 text verse by verse. Full ESV translation of the waters receding, Noah's exit from the ark, and God's covenant promise." />
        <meta name="keywords" content="Genesis Chapter 8 full text, Bible reading, ESV translation, Noah's exit, ark, dove, olive leaf, God's covenant, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 8 Full Text - After the Flood & God's Covenant | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 8 text verse by verse. Full ESV translation of the waters receding, Noah's exit from the ark, and God's covenant promise." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-8-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 8 Full Text - After the Flood & God's Covenant | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 8 text verse by verse. Full ESV translation of the waters receding, Noah's exit from the ark, and God's covenant promise." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 8 Full Text - After the Flood & God\'s Covenant',
          description: 'Read the complete Genesis Chapter 8 text verse by verse. Full ESV translation of the waters receding, Noah\'s exit from the ark, and God\'s covenant promise.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-8-full'
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
              Genesis Chapter 8 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              After the Flood & God's Covenant
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 8, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 8 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-8")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 8 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 22 verses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fullChapterText.map((verse, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
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
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-8")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch8-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch8-advanced")}
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
