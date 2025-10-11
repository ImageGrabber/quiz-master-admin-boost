import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter23Full() {
  const navigate = useNavigate();

  const chapterText = [
    {
      verse: 1,
      text: "Sarah lived to be a hundred and twenty-seven years old."
    },
    {
      verse: 2,
      text: "She died at Kiriath Arba (that is, Hebron) in the land of Canaan, and Abraham went to mourn for Sarah and to weep over her."
    },
    {
      verse: 3,
      text: "Then Abraham rose from beside his dead wife and spoke to the Hittites. He said,"
    },
    {
      verse: 4,
      text: "\"I am a foreigner and stranger among you. Sell me some property for a burial site here so I can bury my dead.\""
    },
    {
      verse: 5,
      text: "The Hittites replied to Abraham,"
    },
    {
      verse: 6,
      text: "\"Sir, listen to us. You are a mighty prince among us. Bury your dead in the choicest of our tombs. None of us will refuse you his tomb for burying your dead.\""
    },
    {
      verse: 7,
      text: "Then Abraham rose and bowed down before the people of the land, the Hittites."
    },
    {
      verse: 8,
      text: "He said to them, \"If you are willing to let me bury my dead, then listen to me and intercede with Ephron son of Zohar on my behalf"
    },
    {
      verse: 9,
      text: "so he will sell me the cave of Machpelah, which belongs to him and is at the end of his field. Ask him to sell it to me for the full price as a burial site among you.\""
    },
    {
      verse: 10,
      text: "Ephron the Hittite was sitting among his people and he replied to Abraham in the hearing of all the Hittites who had come to the gate of his city."
    },
    {
      verse: 11,
      text: "\"No, my lord,\" he said. \"Listen to me; I give you the field, and I give you the cave that is in it. I give it to you in the presence of my people. Bury your dead.\""
    },
    {
      verse: 12,
      text: "Again Abraham bowed down before the people of the land"
    },
    {
      verse: 13,
      text: "and he said to Ephron in their hearing, \"Listen to me, if you will. I will pay the price of the field. Accept it from me so I can bury my dead there.\""
    },
    {
      verse: 14,
      text: "Ephron answered Abraham,"
    },
    {
      verse: 15,
      text: "\"Listen to me, my lord; the land is worth four hundred shekels of silver, but what is that between you and me? Bury your dead.\""
    },
    {
      verse: 16,
      text: "Abraham agreed to Ephron's terms and weighed out for him the price he had named in the hearing of the Hittites: four hundred shekels of silver, according to the weight current among the merchants."
    },
    {
      verse: 17,
      text: "So Ephron's field in Machpelah near Mamre—both the field and the cave in it, and all the trees within the borders of the field—was deeded"
    },
    {
      verse: 18,
      text: "to Abraham as his property in the presence of all the Hittites who had come to the gate of the city."
    },
    {
      verse: 19,
      text: "Afterward Abraham buried his wife Sarah in the cave in the field of Machpelah near Mamre (which is at Hebron) in the land of Canaan."
    },
    {
      verse: 20,
      text: "So the field and the cave in it were deeded to Abraham by the Hittites as a burial site."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 23 - Full Text | Bible Quiz Study Guide</title>
        <meta name="description" content="Read the complete text of Genesis Chapter 23 - The Death of Sarah, Abraham's purchase of the cave of Machpelah, and the first land ownership in Canaan." />
        <meta name="keywords" content="Genesis Chapter 23 full text, Sarah death, Abraham, cave of Machpelah, Hebron, Bible reading, Genesis study" />
        <meta property="og:title" content="Genesis Chapter 23 - Full Text | Bible Quiz Study Guide" />
        <meta property="og:description" content="Read the complete text of Genesis Chapter 23 - The Death of Sarah, Abraham's purchase of the cave of Machpelah, and the first land ownership in Canaan." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-23-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 23 - Full Text | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Read the complete text of Genesis Chapter 23 - The Death of Sarah, Abraham's purchase of the cave of Machpelah, and the first land ownership in Canaan." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-white via-white/70 to-blue-50 shadow-sm">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Genesis Chapter 23
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              The Death of Sarah
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Complete text of Genesis Chapter 23 with verse-by-verse reading.
            </p>
            <div className="mt-6 flex gap-4">
              <Button 
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-23")}
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
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-23")}>
            Chapter 23
          </Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="font-medium text-gray-900">Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-23")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter 23 Study Guide
          </Button>
        </div>

        {/* Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 23 - The Death of Sarah
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
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch23-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch23-advanced")}>
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
