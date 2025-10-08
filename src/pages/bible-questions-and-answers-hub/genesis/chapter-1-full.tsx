import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter1Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "In the beginning, God created the heavens and the earth."
    },
    {
      verse: "2", 
      text: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters."
    },
    {
      verse: "3",
      text: "And God said, 'Let there be light,' and there was light."
    },
    {
      verse: "4",
      text: "And God saw that the light was good. And God separated the light from the darkness."
    },
    {
      verse: "5",
      text: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day."
    },
    {
      verse: "6",
      text: "And God said, 'Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.'"
    },
    {
      verse: "7",
      text: "And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so."
    },
    {
      verse: "8",
      text: "And God called the expanse Heaven. And there was evening and there was morning, the second day."
    },
    {
      verse: "9",
      text: "And God said, 'Let the waters under the heavens be gathered together into one place, and let the dry land appear.' And it was so."
    },
    {
      verse: "10",
      text: "God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good."
    },
    {
      verse: "11",
      text: "And God said, 'Let the earth sprout vegetation, plants yielding seed, and fruit trees bearing fruit in which is their seed, each according to its kind, on the earth.' And it was so."
    },
    {
      verse: "12",
      text: "The earth brought forth vegetation, plants yielding seed according to their own kinds, and trees bearing fruit in which is their seed, each according to its kind. And God saw that it was good."
    },
    {
      verse: "13",
      text: "And there was evening and there was morning, the third day."
    },
    {
      verse: "14",
      text: "And God said, 'Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years,"
    },
    {
      verse: "15",
      text: "and let them be lights in the expanse of the heavens to give light upon the earth.' And it was so."
    },
    {
      verse: "16",
      text: "And God made the two great lights—the greater light to rule the day and the lesser light to rule the night—and the stars."
    },
    {
      verse: "17",
      text: "And God set them in the expanse of the heavens to give light on the earth,"
    },
    {
      verse: "18",
      text: "to rule over the day and over the night, and to separate the light from the darkness. And God saw that it was good."
    },
    {
      verse: "19",
      text: "And there was evening and there was morning, the fourth day."
    },
    {
      verse: "20",
      text: "And God said, 'Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens.'"
    },
    {
      verse: "21",
      text: "So God created the great sea creatures and every living creature that moves, with which the waters swarm, according to their kinds, and every winged bird according to its kind. And God saw that it was good."
    },
    {
      verse: "22",
      text: "And God blessed them, saying, 'Be fruitful and multiply and fill the waters in the seas, and let birds multiply on the earth.'"
    },
    {
      verse: "23",
      text: "And there was evening and there was morning, the fifth day."
    },
    {
      verse: "24",
      text: "And God said, 'Let the earth bring forth living creatures according to their kinds—livestock and creeping things and beasts of the earth according to their kinds.' And it was so."
    },
    {
      verse: "25",
      text: "And God made the beasts of the earth according to their kinds and the livestock according to their kinds, and everything that creeps on the ground according to its kind. And God saw that it was good."
    },
    {
      verse: "26",
      text: "Then God said, 'Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.'"
    },
    {
      verse: "27",
      text: "So God created man in his own image, in the image of God he created him; male and female he created them."
    },
    {
      verse: "28",
      text: "And God blessed them. And God said to them, 'Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and over the birds of the heavens and over every living thing that moves on the earth.'"
    },
    {
      verse: "29",
      text: "And God said, 'Behold, I have given you every plant yielding seed that is on the face of all the earth, and every tree with seed in its fruit. You shall have them for food."
    },
    {
      verse: "30",
      text: "And to every beast of the earth and to every bird of the heavens and to everything that creeps on the earth, everything that has the breath of life, I have given every green plant for food.' And it was so."
    },
    {
      verse: "31",
      text: "And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 1 Full Text - Complete Bible Reading | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 1 text verse by verse. Full ESV translation of the creation account, six days of creation, and Sabbath rest. Perfect for Bible study and reference." />
        <meta name="keywords" content="Genesis Chapter 1 full text, Bible reading, ESV translation, creation account, Genesis 1 complete, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 1 Full Text - Complete Bible Reading | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 1 text verse by verse. Full ESV translation of the creation account, six days of creation, and Sabbath rest." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-1-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 1 Full Text - Complete Bible Reading | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 1 text verse by verse. Full ESV translation of the creation account, six days of creation, and Sabbath rest." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 1 Full Text - Complete Bible Reading',
          description: 'Read the complete Genesis Chapter 1 text verse by verse. Full ESV translation of the creation account, six days of creation, and Sabbath rest.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-1-full'
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
              Genesis Chapter 1 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              The Complete Creation Account
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 1, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 1 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-1")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 1 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 31 verses</CardDescription>
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-1")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch1-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch1-advanced")}
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
