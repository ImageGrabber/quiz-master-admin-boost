import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter16() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 16",
    subtitle: "Hagar & Ishmael",
    description: "Sarai gives Hagar to Abram, Hagar conceives and flees, and the angel of the Lord appears to her.",
    keyPoints: [
      "Sarai gives Hagar to Abram; Hagar conceives",
      "Hagar flees; angel appears to her",
      "Ishmael born; Abram is 86 years old"
    ],
    detailedContent: [
      {
        title: "Sarai's Plan",
        description: "Sarai, Abram's wife, had borne him no children. She had an Egyptian servant whose name was Hagar.",
        verses: "Genesis 16:1",
        verseText: "Now Sarai, Abram's wife, had borne him no children. She had an Egyptian servant whose name was Hagar."
      },
      {
        title: "Hagar Given to Abram",
        description: "Sarai said to Abram, 'Behold now, the Lord has prevented me from bearing children. Go in to my servant; it may be that I shall obtain children by her.'",
        verses: "Genesis 16:2",
        verseText: "And Sarai said to Abram, 'Behold now, the LORD has prevented me from bearing children. Go in to my servant; it may be that I shall obtain children by her.' And Abram listened to the voice of Sarai."
      },
      {
        title: "Hagar Conceives",
        description: "So, after Abram had lived ten years in the land of Canaan, Sarai, Abram's wife, took Hagar the Egyptian, her servant, and gave her to Abram her husband as a wife.",
        verses: "Genesis 16:3-4",
        verseText: "So, after Abram had lived ten years in the land of Canaan, Sarai, Abram's wife, took Hagar the Egyptian, her servant, and gave her to Abram her husband as a wife. And he went in to Hagar, and she conceived."
      },
      {
        title: "Hagar's Contempt",
        description: "When Hagar saw that she had conceived, she looked with contempt on her mistress.",
        verses: "Genesis 16:4",
        verseText: "And when she saw that she had conceived, she looked with contempt on her mistress."
      },
      {
        title: "Sarai's Complaint",
        description: "Sarai said to Abram, 'May the wrong done to me be on you! I gave my servant to your embrace, and when she saw that she had conceived, she looked on me with contempt.'",
        verses: "Genesis 16:5",
        verseText: "And Sarai said to Abram, 'May the wrong done to me be on you! I gave my servant to your embrace, and when she saw that she had conceived, she looked on me with contempt. May the LORD judge between you and me!'"
      },
      {
        title: "Abram's Response",
        description: "Abram said to Sarai, 'Behold, your servant is in your power; do to her as you please.' Then Sarai dealt harshly with her, and she fled from her.",
        verses: "Genesis 16:6",
        verseText: "But Abram said to Sarai, 'Behold, your servant is in your power; do to her as you please.' Then Sarai dealt harshly with her, and she fled from her."
      },
      {
        title: "The Angel's Appearance",
        description: "The angel of the Lord found her by a spring of water in the wilderness, the spring on the way to Shur.",
        verses: "Genesis 16:7",
        verseText: "The angel of the LORD found her by a spring of water in the wilderness, the spring on the way to Shur."
      },
      {
        title: "The Angel's Message",
        description: "The angel said, 'Hagar, servant of Sarai, where have you come from and where are you going?' She said, 'I am fleeing from my mistress Sarai.'",
        verses: "Genesis 16:8",
        verseText: "And he said, 'Hagar, servant of Sarai, where have you come from and where are you going?' She said, 'I am fleeing from my mistress Sarai.'"
      },
      {
        title: "Return and Promise",
        description: "The angel said, 'Return to your mistress and submit to her.' And the angel said, 'I will surely multiply your offspring so that they cannot be numbered for multitude.'",
        verses: "Genesis 16:9-10",
        verseText: "The angel of the LORD said to her, 'Return to your mistress and submit to her.' The angel of the LORD also said to her, 'I will surely multiply your offspring so that they cannot be numbered for multitude.'"
      },
      {
        title: "Ishmael's Birth",
        description: "Hagar bore Abram a son, and Abram called the name of his son, whom Hagar bore, Ishmael. Abram was eighty-six years old when Hagar bore Ishmael to Abram.",
        verses: "Genesis 16:15-16",
        verseText: "And Hagar bore Abram a son, and Abram called the name of his son, whom Hagar bore, Ishmael. Abram was eighty-six years old when Hagar bore Ishmael to Abram."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 16 - Hagar & Ishmael | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 16 with detailed explanations about Hagar and Ishmael, Sarai's plan, and the angel's appearance to Hagar." />
        <meta name="keywords" content="Genesis Chapter 16, Hagar and Ishmael, Bible study, Sarai's plan, angel appearance, Bible quiz, Genesis study guide, Ishmael birth" />
        <meta property="og:title" content="Genesis Chapter 16 - Hagar & Ishmael | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 16 with detailed explanations about Hagar and Ishmael, Sarai's plan, and the angel's appearance to Hagar." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-16" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 16 - Hagar & Ishmael | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 16 with detailed explanations about Hagar and Ishmael, Sarai's plan, and the angel's appearance to Hagar." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 16 - Hagar & Ishmael',
          description: 'Study Genesis Chapter 16 with detailed explanations about Hagar and Ishmael, Sarai\'s plan, and the angel\'s appearance to Hagar.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-16'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-16-full")}
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
          <span className="font-medium text-gray-900">Chapter 16</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 16</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch16-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 16</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch16-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 16</CardDescription>
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
