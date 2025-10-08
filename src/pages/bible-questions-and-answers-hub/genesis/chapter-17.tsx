import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter17() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 17",
    subtitle: "Covenant of Circumcision",
    description: "God establishes the covenant of circumcision with Abram, changes his name to Abraham, and promises Isaac.",
    keyPoints: [
      "Covenant of circumcision; Abram becomes Abraham",
      "Sarai becomes Sarah; Isaac promised",
      "Ishmael blessed; covenant established"
    ],
    detailedContent: [
      {
        title: "God's Appearance",
        description: "When Abram was ninety-nine years old, the Lord appeared to Abram and said to him, 'I am God Almighty; walk before me, and be blameless.'",
        verses: "Genesis 17:1",
        verseText: "When Abram was ninety-nine years old the LORD appeared to Abram and said to him, 'I am God Almighty; walk before me, and be blameless.'"
      },
      {
        title: "The Covenant Promise",
        description: "God said, 'I will make my covenant between me and you, and will multiply you greatly.'",
        verses: "Genesis 17:2",
        verseText: "And I will make my covenant between me and you, and will multiply you greatly."
      },
      {
        title: "Name Change to Abraham",
        description: "God said, 'No longer shall your name be called Abram, but your name shall be Abraham, for I have made you the father of a multitude of nations.'",
        verses: "Genesis 17:5",
        verseText: "No longer shall your name be called Abram, but your name shall be Abraham, for I have made you the father of a multitude of nations."
      },
      {
        title: "The Covenant of Circumcision",
        description: "God said, 'This is my covenant, which you shall keep, between me and you and your offspring after you: Every male among you shall be circumcised.'",
        verses: "Genesis 17:10-11",
        verseText: "This is my covenant, which you shall keep, between me and you and your offspring after you: Every male among you shall be circumcised. You shall be circumcised in the flesh of your foreskins, and it shall be a sign of the covenant between me and you."
      },
      {
        title: "Sarai Becomes Sarah",
        description: "God said to Abraham, 'As for Sarai your wife, you shall not call her name Sarai, but Sarah shall be her name.'",
        verses: "Genesis 17:15",
        verseText: "And God said to Abraham, 'As for Sarai your wife, you shall not call her name Sarai, but Sarah shall be her name.'"
      },
      {
        title: "The Promise of Isaac",
        description: "God said, 'I will bless her, and moreover, I will give you a son by her. I will bless her, and she shall become nations; kings of peoples shall come from her.'",
        verses: "Genesis 17:16",
        verseText: "I will bless her, and moreover, I will give you a son by her. I will bless her, and she shall become nations; kings of peoples shall come from her."
      },
      {
        title: "Abraham's Laughter",
        description: "Abraham fell on his face and laughed and said to himself, 'Shall a child be born to a man who is a hundred years old? Shall Sarah, who is ninety years old, bear a child?'",
        verses: "Genesis 17:17",
        verseText: "Then Abraham fell on his face and laughed and said to himself, 'Shall a child be born to a man who is a hundred years old? Shall Sarah, who is ninety years old, bear a child?'"
      },
      {
        title: "Isaac Named",
        description: "God said, 'No, but Sarah your wife shall bear you a son, and you shall call his name Isaac. I will establish my covenant with him as an everlasting covenant for his offspring after him.'",
        verses: "Genesis 17:19",
        verseText: "God said, 'No, but Sarah your wife shall bear you a son, and you shall call his name Isaac. I will establish my covenant with him as an everlasting covenant for his offspring after him.'"
      },
      {
        title: "Ishmael Blessed",
        description: "God said, 'As for Ishmael, I have heard you; behold, I have blessed him and will make him fruitful and multiply him greatly. He shall father twelve princes, and I will make him into a great nation.'",
        verses: "Genesis 17:20",
        verseText: "As for Ishmael, I have heard you; behold, I have blessed him and will make him fruitful and multiply him greatly. He shall father twelve princes, and I will make him into a great nation."
      },
      {
        title: "Circumcision Performed",
        description: "That very day Abraham was circumcised, and all the men of his house, those born in the house and those bought with money from a foreigner, were circumcised with him.",
        verses: "Genesis 17:23-27",
        verseText: "Then Abraham took Ishmael his son and all those born in his house or bought with his money, every male among the men of Abraham's house, and he circumcised the flesh of their foreskins that very day, as God had said to him. Abraham was ninety-nine years old when he was circumcised in the flesh of his foreskin. And Ishmael his son was thirteen years old when he was circumcised in the flesh of his foreskin. That very day Abraham and his son Ishmael were circumcised. And all the men of his house, those born in the house and those bought with money from a foreigner, were circumcised with him."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 17 - Covenant of Circumcision | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 17 with detailed explanations about the covenant of circumcision, Abraham's name change, and the promise of Isaac." />
        <meta name="keywords" content="Genesis Chapter 17, Covenant of circumcision, Bible study, Abraham name change, Isaac promise, Bible quiz, Genesis study guide, Ishmael blessed" />
        <meta property="og:title" content="Genesis Chapter 17 - Covenant of Circumcision | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 17 with detailed explanations about the covenant of circumcision, Abraham's name change, and the promise of Isaac." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-17" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 17 - Covenant of Circumcision | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 17 with detailed explanations about the covenant of circumcision, Abraham's name change, and the promise of Isaac." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 17 - Covenant of Circumcision',
          description: 'Study Genesis Chapter 17 with detailed explanations about the covenant of circumcision, Abraham\'s name change, and the promise of Isaac.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-17'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-17-full")}
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
          <span className="font-medium text-gray-900">Chapter 17</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 17</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch17-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 17</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch17-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 17</CardDescription>
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
