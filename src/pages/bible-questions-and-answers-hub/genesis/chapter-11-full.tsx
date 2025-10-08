import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter11Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "Now the whole earth had one language and the same words."
    },
    {
      verse: "2", 
      text: "And as people migrated from the east, they found a plain in the land of Shinar and settled there."
    },
    {
      verse: "3",
      text: "And they said to one another, \"Come, let us make bricks, and burn them thoroughly.\" And they had brick for stone, and bitumen for mortar."
    },
    {
      verse: "4",
      text: "Then they said, \"Come, let us build ourselves a city and a tower with its top in the heavens, and let us make a name for ourselves, lest we be dispersed over the face of the whole earth.\""
    },
    {
      verse: "5",
      text: "And the Lord came down to see the city and the tower, which the children of man had built."
    },
    {
      verse: "6",
      text: "And the Lord said, \"Behold, they are one people, and they have all one language, and this is only the beginning of what they will do. And nothing that they propose to do will now be impossible for them."
    },
    {
      verse: "7",
      text: "Come, let us go down and there confuse their language, so that they may not understand one another's speech.\""
    },
    {
      verse: "8",
      text: "So the Lord dispersed them from there over the face of all the earth, and they left off building the city."
    },
    {
      verse: "9",
      text: "Therefore its name was called Babel, because there the Lord confused the language of all the earth. And from there the Lord dispersed them over the face of all the earth."
    },
    {
      verse: "10",
      text: "These are the generations of Shem. When Shem was 100 years old, he fathered Arpachshad two years after the flood."
    },
    {
      verse: "11",
      text: "And Shem lived after he fathered Arpachshad 500 years and had other sons and daughters."
    },
    {
      verse: "12",
      text: "When Arpachshad had lived 35 years, he fathered Shelah."
    },
    {
      verse: "13",
      text: "And Arpachshad lived after he fathered Shelah 403 years and had other sons and daughters."
    },
    {
      verse: "14",
      text: "When Shelah had lived 30 years, he fathered Eber."
    },
    {
      verse: "15",
      text: "And Shelah lived after he fathered Eber 403 years and had other sons and daughters."
    },
    {
      verse: "16",
      text: "When Eber had lived 34 years, he fathered Peleg."
    },
    {
      verse: "17",
      text: "And Eber lived after he fathered Peleg 430 years and had other sons and daughters."
    },
    {
      verse: "18",
      text: "When Peleg had lived 30 years, he fathered Reu."
    },
    {
      verse: "19",
      text: "And Peleg lived after he fathered Reu 209 years and had other sons and daughters."
    },
    {
      verse: "20",
      text: "When Reu had lived 32 years, he fathered Serug."
    },
    {
      verse: "21",
      text: "And Reu lived after he fathered Serug 207 years and had other sons and daughters."
    },
    {
      verse: "22",
      text: "When Serug had lived 30 years, he fathered Nahor."
    },
    {
      verse: "23",
      text: "And Serug lived after he fathered Nahor 200 years and had other sons and daughters."
    },
    {
      verse: "24",
      text: "When Nahor had lived 29 years, he fathered Terah."
    },
    {
      verse: "25",
      text: "And Nahor lived after he fathered Terah 119 years and had other sons and daughters."
    },
    {
      verse: "26",
      text: "When Terah had lived 70 years, he fathered Abram, Nahor, and Haran."
    },
    {
      verse: "27",
      text: "Now these are the generations of Terah. Terah fathered Abram, Nahor, and Haran; and Haran fathered Lot."
    },
    {
      verse: "28",
      text: "Haran died in the presence of his father Terah in the land of his kindred, in Ur of the Chaldeans."
    },
    {
      verse: "29",
      text: "And Abram and Nahor took wives. The name of Abram's wife was Sarai, and the name of Nahor's wife, Milcah, the daughter of Haran the father of Milcah and Iscah."
    },
    {
      verse: "30",
      text: "Now Sarai was barren; she had no child."
    },
    {
      verse: "31",
      text: "Terah took Abram his son and Lot the son of Haran, his grandson, and Sarai his daughter-in-law, his son Abram's wife, and they went forth together from Ur of the Chaldeans to go into the land of Canaan, but when they came to Haran, they settled there."
    },
    {
      verse: "32",
      text: "The days of Terah were 205 years, and Terah died in Haran."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 11 Full Text - The Tower of Babel & Shem's Descendants | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 11 text verse by verse. Full ESV translation of the Tower of Babel, language confusion, and Shem's genealogy leading to Abram." />
        <meta name="keywords" content="Genesis Chapter 11 full text, Bible reading, ESV translation, Tower of Babel, language confusion, Shem's descendants, Abram, Terah, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 11 Full Text - The Tower of Babel & Shem's Descendants | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 11 text verse by verse. Full ESV translation of the Tower of Babel, language confusion, and Shem's genealogy leading to Abram." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-11-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 11 Full Text - The Tower of Babel & Shem's Descendants | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 11 text verse by verse. Full ESV translation of the Tower of Babel, language confusion, and Shem's genealogy leading to Abram." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 11 Full Text - The Tower of Babel & Shem\'s Descendants',
          description: 'Read the complete Genesis Chapter 11 text verse by verse. Full ESV translation of the Tower of Babel, language confusion, and Shem\'s genealogy leading to Abram.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-11-full'
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
              Genesis Chapter 11 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              The Tower of Babel & Shem's Descendants
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 11, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 11 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-11")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 11 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 32 verses</CardDescription>
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-11")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch11-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch11-advanced")}
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
