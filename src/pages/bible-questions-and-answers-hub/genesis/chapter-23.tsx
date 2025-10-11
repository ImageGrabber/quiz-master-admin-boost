import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter23() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 23",
    subtitle: "The Death of Sarah",
    description: "Sarah's death, Abraham's purchase of the cave of Machpelah for her burial, and the first land ownership in Canaan.",
    keyPoints: [
      "Sarah dies at age 127",
      "Abraham purchases cave of Machpelah",
      "First land ownership in Canaan"
    ],
    detailedContent: [
      {
        title: "Sarah's Death",
        description: "Sarah lived to be a hundred and twenty-seven years old. She died at Kiriath Arba (that is, Hebron) in the land of Canaan, and Abraham went to mourn for Sarah and to weep over her.",
        verses: "Genesis 23:1-2",
        verseText: "Sarah lived to be a hundred and twenty-seven years old. She died at Kiriath Arba (that is, Hebron) in the land of Canaan, and Abraham went to mourn for Sarah and to weep over her."
      },
      {
        title: "Abraham's Request",
        description: "Then Abraham rose from beside his dead wife and spoke to the Hittites. He said, 'I am a foreigner and stranger among you. Sell me some property for a burial site here so I can bury my dead.'",
        verses: "Genesis 23:3-4",
        verseText: "Then Abraham rose from beside his dead wife and spoke to the Hittites. He said, 'I am a foreigner and stranger among you. Sell me some property for a burial site here so I can bury my dead.'"
      },
      {
        title: "The Hittites' Response",
        description: "The Hittites replied to Abraham, 'Sir, listen to us. You are a mighty prince among us. Bury your dead in the choicest of our tombs. None of us will refuse you his tomb for burying your dead.'",
        verses: "Genesis 23:5-6",
        verseText: "The Hittites replied to Abraham, 'Sir, listen to us. You are a mighty prince among us. Bury your dead in the choicest of our tombs. None of us will refuse you his tomb for burying your dead.'"
      },
      {
        title: "Abraham's Bow",
        description: "Then Abraham rose and bowed down before the people of the land, the Hittites.",
        verses: "Genesis 23:7",
        verseText: "Then Abraham rose and bowed down before the people of the land, the Hittites."
      },
      {
        title: "Abraham's Specific Request",
        description: "He said to them, 'If you are willing to let me bury my dead, then listen to me and intercede with Ephron son of Zohar on my behalf so he will sell me the cave of Machpelah, which belongs to him and is at the end of his field. Ask him to sell it to me for the full price as a burial site among you.'",
        verses: "Genesis 23:8-9",
        verseText: "He said to them, 'If you are willing to let me bury my dead, then listen to me and intercede with Ephron son of Zohar on my behalf so he will sell me the cave of Machpelah, which belongs to him and is at the end of his field. Ask him to sell it to me for the full price as a burial site among you.'"
      },
      {
        title: "Ephron's Offer",
        description: "Ephron the Hittite was sitting among his people and he replied to Abraham in the hearing of all the Hittites who had come to the gate of his city. 'No, my lord,' he said. 'Listen to me; I give you the field, and I give you the cave that is in it. I give it to you in the presence of my people. Bury your dead.'",
        verses: "Genesis 23:10-11",
        verseText: "Ephron the Hittite was sitting among his people and he replied to Abraham in the hearing of all the Hittites who had come to the gate of his city. 'No, my lord,' he said. 'Listen to me; I give you the field, and I give you the cave that is in it. I give it to you in the presence of my people. Bury your dead.'"
      },
      {
        title: "Abraham's Insistence on Payment",
        description: "Again Abraham bowed down before the people of the land and he said to Ephron in their hearing, 'Listen to me, if you will. I will pay the price of the field. Accept it from me so I can bury my dead there.'",
        verses: "Genesis 23:12-13",
        verseText: "Again Abraham bowed down before the people of the land and he said to Ephron in their hearing, 'Listen to me, if you will. I will pay the price of the field. Accept it from me so I can bury my dead there.'"
      },
      {
        title: "Ephron's Price",
        description: "Ephron answered Abraham, 'Listen to me, my lord; the land is worth four hundred shekels of silver, but what is that between you and me? Bury your dead.'",
        verses: "Genesis 23:14-15",
        verseText: "Ephron answered Abraham, 'Listen to me, my lord; the land is worth four hundred shekels of silver, but what is that between you and me? Bury your dead.'"
      },
      {
        title: "The Purchase",
        description: "Abraham agreed to Ephron's terms and weighed out for him the price he had named in the hearing of the Hittites: four hundred shekels of silver, according to the weight current among the merchants.",
        verses: "Genesis 23:16",
        verseText: "Abraham agreed to Ephron's terms and weighed out for him the price he had named in the hearing of the Hittites: four hundred shekels of silver, according to the weight current among the merchants."
      },
      {
        title: "The Deed",
        description: "So Ephron's field in Machpelah near Mamre—both the field and the cave in it, and all the trees within the borders of the field—was deeded to Abraham as his property in the presence of all the Hittites who had come to the gate of the city.",
        verses: "Genesis 23:17-18",
        verseText: "So Ephron's field in Machpelah near Mamre—both the field and the cave in it, and all the trees within the borders of the field—was deeded to Abraham as his property in the presence of all the Hittites who had come to the gate of the city."
      },
      {
        title: "Sarah's Burial",
        description: "Afterward Abraham buried his wife Sarah in the cave in the field of Machpelah near Mamre (which is at Hebron) in the land of Canaan.",
        verses: "Genesis 23:19",
        verseText: "Afterward Abraham buried his wife Sarah in the cave in the field of Machpelah near Mamre (which is at Hebron) in the land of Canaan."
      },
      {
        title: "The Final Result",
        description: "So the field and the cave in it were deeded to Abraham by the Hittites as a burial site.",
        verses: "Genesis 23:20",
        verseText: "So the field and the cave in it were deeded to Abraham by the Hittites as a burial site."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 23 - The Death of Sarah | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 23 with detailed explanations about Sarah's death, Abraham's purchase of the cave of Machpelah, and the first land ownership in Canaan." />
        <meta name="keywords" content="Genesis Chapter 23, Sarah death, Abraham, cave of Machpelah, Hebron, Bible study, Bible quiz, Genesis study guide, land purchase" />
        <meta property="og:title" content="Genesis Chapter 23 - The Death of Sarah | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 23 with detailed explanations about Sarah's death, Abraham's purchase of the cave of Machpelah, and the first land ownership in Canaan." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-23" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 23 - The Death of Sarah | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 23 with detailed explanations about Sarah's death, Abraham's purchase of the cave of Machpelah, and the first land ownership in Canaan." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 23 - The Death of Sarah',
          description: 'Study Genesis Chapter 23 with detailed explanations about Sarah\'s death, Abraham\'s purchase of the cave of Machpelah, and the first land ownership in Canaan.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-23'
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
              {chapterDetails.title}
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              {chapterDetails.subtitle}
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              {chapterDetails.description}
            </p>
            <div className="mt-6 flex gap-4">
              <Button 
                onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Take Quiz
              </Button>
              <Button 
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-23-full")}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Read Full Chapter
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
          <span className="font-medium text-gray-900">Chapter 23</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Genesis Hub
          </Button>
        </div>

        {/* Key Points */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Key Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {chapterDetails.keyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Detailed Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {chapterDetails.detailedContent.map((content, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">{content.title}</CardTitle>
                <div className="text-xs text-blue-500 font-medium mt-1">{content.verses}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-700">{content.description}</p>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-200">
                  <p className="text-sm text-gray-800 italic leading-relaxed">{content.verseText}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz Section */}
        <Card id="quiz-section" className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Take a Quiz</CardTitle>
            <CardDescription>Test your knowledge of Genesis Chapter 23</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch23-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 23</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch23-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 23</CardDescription>
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
