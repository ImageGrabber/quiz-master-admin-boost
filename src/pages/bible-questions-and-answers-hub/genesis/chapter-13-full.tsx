import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter13Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "So Abram went up from Egypt, he and his wife and all that he had, and Lot with him, into the Negeb."
    },
    {
      verse: "2", 
      text: "Now Abram was very rich in livestock, in silver, and in gold."
    },
    {
      verse: "3",
      text: "And he journeyed on from the Negeb as far as Bethel to the place where his tent had been at the beginning, between Bethel and Ai,"
    },
    {
      verse: "4",
      text: "to the place where he had made an altar at the first. And there Abram called upon the name of the Lord."
    },
    {
      verse: "5",
      text: "And Lot, who went with Abram, also had flocks and herds and tents,"
    },
    {
      verse: "6",
      text: "so that the land could not support both of them dwelling together; for their possessions were so great that they could not dwell together,"
    },
    {
      verse: "7",
      text: "and there was strife between the herdsmen of Abram's livestock and the herdsmen of Lot's livestock. At that time the Canaanites and the Perizzites were dwelling in the land."
    },
    {
      verse: "8",
      text: "Then Abram said to Lot, \"Let there be no strife between you and me, and between your herdsmen and my herdsmen, for we are kinsmen."
    },
    {
      verse: "9",
      text: "Is not the whole land before you? Separate yourself from me. If you take the left hand, then I will go to the right, or if you take the right hand, then I will go to the left.\""
    },
    {
      verse: "10",
      text: "And Lot lifted up his eyes and saw that the Jordan Valley was well watered everywhere like the garden of the Lord, like the land of Egypt, in the direction of Zoar. (This was before the Lord destroyed Sodom and Gomorrah.)"
    },
    {
      verse: "11",
      text: "So Lot chose for himself all the Jordan Valley, and Lot journeyed east. Thus they separated from each other."
    },
    {
      verse: "12",
      text: "Abram settled in the land of Canaan, while Lot settled among the cities of the valley and moved his tent as far as Sodom."
    },
    {
      verse: "13",
      text: "Now the men of Sodom were wicked, great sinners against the Lord."
    },
    {
      verse: "14",
      text: "The Lord said to Abram, after Lot had separated from him, \"Lift up your eyes and look from the place where you are, northward and southward and eastward and westward,"
    },
    {
      verse: "15",
      text: "for all the land that you see I will give to you and to your offspring forever."
    },
    {
      verse: "16",
      text: "I will make your offspring as the dust of the earth, so that if one can count the dust of the earth, your offspring also can be counted."
    },
    {
      verse: "17",
      text: "Arise, walk through the length and the breadth of the land, for I will give it to you.\""
    },
    {
      verse: "18",
      text: "So Abram moved his tent and came and settled by the oaks of Mamre, which are at Hebron, and there he built an altar to the Lord."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 13 Full Text - Abram and Lot Separate | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 13 text verse by verse. Full ESV translation of Abram and Lot's separation, Lot's choice of the Jordan Valley, and God's promise to Abram." />
        <meta name="keywords" content="Genesis Chapter 13 full text, Bible reading, ESV translation, Abram Lot separation, Jordan Valley, Sodom, God's promise, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 13 Full Text - Abram and Lot Separate | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 13 text verse by verse. Full ESV translation of Abram and Lot's separation, Lot's choice of the Jordan Valley, and God's promise to Abram." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-13-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 13 Full Text - Abram and Lot Separate | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 13 text verse by verse. Full ESV translation of Abram and Lot's separation, Lot's choice of the Jordan Valley, and God's promise to Abram." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 13 Full Text - Abram and Lot Separate',
          description: 'Read the complete Genesis Chapter 13 text verse by verse. Full ESV translation of Abram and Lot\'s separation, Lot\'s choice of the Jordan Valley, and God\'s promise to Abram.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-13-full'
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
              Genesis Chapter 13 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              Abram and Lot Separate
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 13, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 13 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-13")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 13 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 18 verses</CardDescription>
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-13")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch13-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch13-advanced")}
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
