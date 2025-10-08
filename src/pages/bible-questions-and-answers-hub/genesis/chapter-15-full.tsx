import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter15Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "After these things the word of the Lord came to Abram in a vision: \"Fear not, Abram, I am your shield; your reward shall be very great.\""
    },
    {
      verse: "2", 
      text: "But Abram said, \"O Lord God, what will you give me, for I continue childless, and the heir of my house is Eliezer of Damascus?\""
    },
    {
      verse: "3",
      text: "And Abram said, \"Behold, you have given me no offspring, and a member of my household will be my heir.\""
    },
    {
      verse: "4",
      text: "And behold, the word of the Lord came to him: \"This man shall not be your heir; your very own son shall be your heir.\""
    },
    {
      verse: "5",
      text: "And he brought him outside and said, \"Look toward heaven, and number the stars, if you are able to number them.\" Then he said to him, \"So shall your offspring be.\""
    },
    {
      verse: "6",
      text: "And he believed the Lord, and he counted it to him as righteousness."
    },
    {
      verse: "7",
      text: "And he said to him, \"I am the Lord who brought you out from Ur of the Chaldeans to give you this land to possess.\""
    },
    {
      verse: "8",
      text: "But he said, \"O Lord God, how am I to know that I shall possess it?\""
    },
    {
      verse: "9",
      text: "He said to him, \"Bring me a heifer three years old, a female goat three years old, a ram three years old, a turtledove, and a young pigeon.\""
    },
    {
      verse: "10",
      text: "And he brought him all these, cut them in half, and laid each half over against the other. But he did not cut the birds in half."
    },
    {
      verse: "11",
      text: "And when birds of prey came down on the carcasses, Abram drove them away."
    },
    {
      verse: "12",
      text: "As the sun was going down, a deep sleep fell on Abram. And behold, dreadful and great darkness fell upon him."
    },
    {
      verse: "13",
      text: "Then the Lord said to Abram, \"Know for certain that your offspring will be sojourners in a land that is not theirs and will be servants there, and they will be afflicted for four hundred years.\""
    },
    {
      verse: "14",
      text: "But I will bring judgment on the nation that they serve, and afterward they shall come out with great possessions."
    },
    {
      verse: "15",
      text: "As for you, you shall go to your fathers in peace; you shall be buried in a good old age."
    },
    {
      verse: "16",
      text: "And they shall come back here in the fourth generation, for the iniquity of the Amorites is not yet complete.\""
    },
    {
      verse: "17",
      text: "When the sun had gone down and it was dark, behold, a smoking fire pot and a flaming torch passed between these pieces."
    },
    {
      verse: "18",
      text: "On that day the Lord made a covenant with Abram, saying, \"To your offspring I give this land, from the river of Egypt to the great river, the river Euphrates,"
    },
    {
      verse: "19",
      text: "the land of the Kenites, the Kenizzites, the Kadmonites,"
    },
    {
      verse: "20",
      text: "the Hittites, the Perizzites, the Rephaim,"
    },
    {
      verse: "21",
      text: "the Amorites, the Canaanites, the Girgashites and the Jebusites.\""
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 15 Full Text - God's Covenant with Abram | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 15 text verse by verse. Full ESV translation of God's covenant with Abram, the promise of descendants, and the covenant ceremony. Perfect for Bible study and reference." />
        <meta name="keywords" content="Genesis Chapter 15 full text, Bible reading, ESV translation, God's covenant with Abram, Genesis 15 complete, Bible study, scripture reading, Abraham covenant" />
        <meta property="og:title" content="Genesis Chapter 15 Full Text - God's Covenant with Abram | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 15 text verse by verse. Full ESV translation of God's covenant with Abram, the promise of descendants, and the covenant ceremony." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-15-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 15 Full Text - God's Covenant with Abram | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 15 text verse by verse. Full ESV translation of God's covenant with Abram, the promise of descendants, and the covenant ceremony." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 15 Full Text - God\'s Covenant with Abram',
          description: 'Read the complete Genesis Chapter 15 text verse by verse. Full ESV translation of God\'s covenant with Abram, the promise of descendants, and the covenant ceremony.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-15-full'
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
              Genesis Chapter 15 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              God's Covenant with Abram
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 15, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 15 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-15")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 15 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 21 verses</CardDescription>
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-15")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch15-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch15-advanced")}
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
