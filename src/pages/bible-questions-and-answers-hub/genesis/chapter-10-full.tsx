import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter10Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "These are the generations of the sons of Noah, Shem, Ham, and Japheth. Sons were born to them after the flood."
    },
    {
      verse: "2", 
      text: "The sons of Japheth: Gomer, Magog, Madai, Javan, Tubal, Meshech, and Tiras."
    },
    {
      verse: "3",
      text: "The sons of Gomer: Ashkenaz, Riphath, and Togarmah."
    },
    {
      verse: "4",
      text: "The sons of Javan: Elishah, Tarshish, Kittim, and Dodanim."
    },
    {
      verse: "5",
      text: "From these the coastland peoples spread in their lands, each with his own language, by their clans, in their nations."
    },
    {
      verse: "6",
      text: "The sons of Ham: Cush, Egypt, Put, and Canaan."
    },
    {
      verse: "7",
      text: "The sons of Cush: Seba, Havilah, Sabtah, Raamah, and Sabteca. The sons of Raamah: Sheba and Dedan."
    },
    {
      verse: "8",
      text: "Cush fathered Nimrod; he was the first on earth to be a mighty man."
    },
    {
      verse: "9",
      text: "He was a mighty hunter before the Lord. Therefore it is said, \"Like Nimrod a mighty hunter before the Lord.\""
    },
    {
      verse: "10",
      text: "The beginning of his kingdom was Babel, Erech, Accad, and Calneh, in the land of Shinar."
    },
    {
      verse: "11",
      text: "From that land he went into Assyria and built Nineveh, Rehoboth-Ir, Calah, and"
    },
    {
      verse: "12",
      text: "Resen between Nineveh and Calah; that is the great city."
    },
    {
      verse: "13",
      text: "Egypt fathered Ludim, Anamim, Lehabim, Naphtuhim,"
    },
    {
      verse: "14",
      text: "Pathrusim, Casluhim (from whom the Philistines came), and Caphtorim."
    },
    {
      verse: "15",
      text: "Canaan fathered Sidon his firstborn and Heth,"
    },
    {
      verse: "16",
      text: "and the Jebusites, the Amorites, the Girgashites,"
    },
    {
      verse: "17",
      text: "the Hivites, the Arkites, the Sinites,"
    },
    {
      verse: "18",
      text: "the Arvadites, the Zemarites, and the Hamathites. Afterward the clans of the Canaanites dispersed."
    },
    {
      verse: "19",
      text: "And the territory of the Canaanites extended from Sidon in the direction of Gerar as far as Gaza, and in the direction of Sodom, Gomorrah, Admah, and Zeboiim, as far as Lasha."
    },
    {
      verse: "20",
      text: "These are the sons of Ham, by their clans, their languages, their lands, and their nations."
    },
    {
      verse: "21",
      text: "To Shem also, the father of all the children of Eber, the elder brother of Japheth, children were born."
    },
    {
      verse: "22",
      text: "The sons of Shem: Elam, Asshur, Arpachshad, Lud, and Aram."
    },
    {
      verse: "23",
      text: "The sons of Aram: Uz, Hul, Gether, and Mash."
    },
    {
      verse: "24",
      text: "Arpachshad fathered Shelah; and Shelah fathered Eber."
    },
    {
      verse: "25",
      text: "To Eber were born two sons: the name of the one was Peleg, for in his days the earth was divided, and his brother's name was Joktan."
    },
    {
      verse: "26",
      text: "Joktan fathered Almodad, Sheleph, Hazarmaveth, Jerah,"
    },
    {
      verse: "27",
      text: "Hadoram, Uzal, Diklah,"
    },
    {
      verse: "28",
      text: "Obal, Abimael, Sheba,"
    },
    {
      verse: "29",
      text: "Ophir, Havilah, and Jobab; all these were the sons of Joktan."
    },
    {
      verse: "30",
      text: "The territory in which they lived extended from Mesha in the direction of Sephar to the hill country of the east."
    },
    {
      verse: "31",
      text: "These are the sons of Shem, by their clans, their languages, their lands, and their nations."
    },
    {
      verse: "32",
      text: "These are the clans of the sons of Noah, according to their genealogies, in their nations, and from these the nations spread abroad on the earth after the flood."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 10 Full Text - Nations Descended from Noah | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 10 text verse by verse. Full ESV translation of the Table of Nations, descendants of Shem, Ham, and Japheth, including Nimrod and the Canaanites." />
        <meta name="keywords" content="Genesis Chapter 10 full text, Bible reading, ESV translation, Table of Nations, Nimrod, Canaanites, Shem Ham Japheth, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 10 Full Text - Nations Descended from Noah | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 10 text verse by verse. Full ESV translation of the Table of Nations, descendants of Shem, Ham, and Japheth, including Nimrod and the Canaanites." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-10-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 10 Full Text - Nations Descended from Noah | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 10 text verse by verse. Full ESV translation of the Table of Nations, descendants of Shem, Ham, and Japheth, including Nimrod and the Canaanites." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 10 Full Text - Nations Descended from Noah',
          description: 'Read the complete Genesis Chapter 10 text verse by verse. Full ESV translation of the Table of Nations, descendants of Shem, Ham, and Japheth, including Nimrod and the Canaanites.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-10-full'
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
              Genesis Chapter 10 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              Nations Descended from Noah
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 10, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 10 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-10")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 10 - Complete Text
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-10")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch10-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch10-advanced")}
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
