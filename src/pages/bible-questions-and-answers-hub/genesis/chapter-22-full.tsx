import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter22Full() {
  const navigate = useNavigate();

  const chapterText = [
    {
      verse: 1,
      text: "Some time later God tested Abraham. He said to him, \"Abraham!\" \"Here I am,\" he replied."
    },
    {
      verse: 2,
      text: "Then God said, \"Take your son, your only son, whom you love—Isaac—and go to the region of Moriah. Sacrifice him there as a burnt offering on a mountain I will show you.\""
    },
    {
      verse: 3,
      text: "Early the next morning Abraham got up and loaded his donkey. He took with him two of his servants and his son Isaac. When he had cut enough wood for the burnt offering, he set out for the place God had told him about."
    },
    {
      verse: 4,
      text: "On the third day Abraham looked up and saw the place in the distance."
    },
    {
      verse: 5,
      text: "He said to his servants, \"Stay here with the donkey while I and the boy go over there. We will worship and then we will come back to you.\""
    },
    {
      verse: 6,
      text: "Abraham took the wood for the burnt offering and placed it on his son Isaac, and he himself carried the fire and the knife. As the two of them went on together,"
    },
    {
      verse: 7,
      text: "Isaac spoke up and said to his father Abraham, \"Father?\" \"Yes, my son?\" Abraham replied. \"The fire and wood are here,\" Isaac said, \"but where is the lamb for the burnt offering?\""
    },
    {
      verse: 8,
      text: "Abraham answered, \"God himself will provide the lamb for the burnt offering, my son.\" And the two of them went on together."
    },
    {
      verse: 9,
      text: "When they reached the place God had told him about, Abraham built an altar there and arranged the wood on it. He bound his son Isaac and laid him on the altar, on top of the wood."
    },
    {
      verse: 10,
      text: "Then he reached out his hand and took the knife to slay his son."
    },
    {
      verse: 11,
      text: "But the angel of the Lord called out to him from heaven, \"Abraham! Abraham!\" \"Here I am,\" he replied."
    },
    {
      verse: 12,
      text: "\"Do not lay a hand on the boy,\" he said. \"Do not do anything to him. Now I know that you fear God, because you have not withheld from me your son, your only son.\""
    },
    {
      verse: 13,
      text: "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son."
    },
    {
      verse: 14,
      text: "So Abraham called that place The Lord Will Provide. And to this day it is said, \"On the mountain of the Lord it will be provided.\""
    },
    {
      verse: 15,
      text: "The angel of the Lord called to Abraham from heaven a second time"
    },
    {
      verse: 16,
      text: "and said, \"I swear by myself, declares the Lord, that because you have done this and have not withheld your son, your only son,"
    },
    {
      verse: 17,
      text: "I will surely bless you and make your descendants as numerous as the stars in the sky and as the sand on the seashore. Your descendants will take possession of the cities of their enemies,"
    },
    {
      verse: 18,
      text: "and through your offspring all nations on earth will be blessed, because you have obeyed me.\""
    },
    {
      verse: 19,
      text: "Then Abraham returned to his servants, and they set off together for Beersheba. And Abraham stayed in Beersheba."
    },
    {
      verse: 20,
      text: "Some time later Abraham was told, \"Milkah is also a mother; she has borne sons to your brother Nahor:"
    },
    {
      verse: 21,
      text: "Uz the firstborn, Buz his brother, Kemuel (the father of Aram),"
    },
    {
      verse: 22,
      text: "Kesed, Hazo, Pildash, Jidlaph and Bethuel.\""
    },
    {
      verse: 23,
      text: "Bethuel became the father of Rebekah. Milkah bore these eight sons to Abraham's brother Nahor."
    },
    {
      verse: 24,
      text: "His concubine, whose name was Reumah, also had sons: Tebah, Gaham, Tahash and Maakah."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 22 - Full Text | Bible Quiz Study Guide</title>
        <meta name="description" content="Read the complete text of Genesis Chapter 22 - Abraham Tested, the sacrifice of Isaac, and God's provision of a ram." />
        <meta name="keywords" content="Genesis Chapter 22 full text, Abraham tested, Isaac sacrifice, Mount Moriah, Bible reading, Genesis study" />
        <meta property="og:title" content="Genesis Chapter 22 - Full Text | Bible Quiz Study Guide" />
        <meta property="og:description" content="Read the complete text of Genesis Chapter 22 - Abraham Tested, the sacrifice of Isaac, and God's provision of a ram." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-22-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 22 - Full Text | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Read the complete text of Genesis Chapter 22 - Abraham Tested, the sacrifice of Isaac, and God's provision of a ram." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-white via-white/70 to-blue-50 shadow-sm">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Genesis Chapter 22
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              Abraham Tested
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Complete text of Genesis Chapter 22 with verse-by-verse reading.
            </p>
            <div className="mt-6 flex gap-4">
              <Button 
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-22")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Study Guide
              </Button>
              <Button 
                onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Take Quiz
              </Button>
            </div>
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
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-22")}>
            Chapter 22
          </Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="font-medium text-gray-900">Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-22")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter 22 Study Guide
          </Button>
        </div>

        {/* Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 22 - Abraham Tested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {chapterText.map((verse, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 text-right">
                    <span className="text-sm font-medium text-blue-600">{verse.verse}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{verse.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        <Card id="quiz-section" className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Test Your Knowledge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch22-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch22-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Advanced Quiz</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

