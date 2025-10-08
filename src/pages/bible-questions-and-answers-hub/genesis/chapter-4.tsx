import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter4() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 4",
    subtitle: "Cain & Abel",
    description: "The story of Cain and Abel, the first murder, and the consequences of sin.",
    keyPoints: [
      "Cain and Abel offerings; murder and mark",
      "City of Enoch; Lamech's poem",
      "Birth of Seth; people begin to call on the Lord"
    ],
    detailedContent: [
      {
        title: "The Offerings",
        description: "Cain brought an offering of the fruit of the ground, while Abel brought the firstborn of his flock and their fat portions.",
        verses: "Genesis 4:3-4",
        verseText: "In the course of time Cain brought to the LORD an offering of the fruit of the ground, and Abel also brought of the firstborn of his flock and of their fat portions. And the LORD had regard for Abel and his offering, but for Cain and his offering he had no regard."
      },
      {
        title: "God's Response",
        description: "The Lord had regard for Abel and his offering, but for Cain and his offering he had no regard.",
        verses: "Genesis 4:5-7",
        verseText: "So Cain was very angry, and his face fell. The LORD said to Cain, 'Why are you angry, and why has your face fallen? If you do well, will you not be accepted? And if you do not do well, sin is crouching at the door. Its desire is contrary to you, but you must rule over it.'"
      },
      {
        title: "The Murder",
        description: "Cain rose up against his brother Abel and killed him in the field.",
        verses: "Genesis 4:8",
        verseText: "Cain spoke to Abel his brother. And when they were in the field, Cain rose up against his brother Abel and killed him."
      },
      {
        title: "The Mark of Cain",
        description: "God put a mark on Cain to protect him from being killed, and Cain went away from the presence of the Lord.",
        verses: "Genesis 4:15-16",
        verseText: "Then the LORD said to him, 'Not so! If anyone kills Cain, vengeance shall be taken on him sevenfold.' And the LORD put a mark on Cain, lest any who found him should attack him. Then Cain went away from the presence of the LORD and settled in the land of Nod, east of Eden."
      },
      {
        title: "The Birth of Seth",
        description: "Adam knew his wife again, and she bore a son and called his name Seth, for she said, 'God has appointed for me another offspring instead of Abel.'",
        verses: "Genesis 4:25",
        verseText: "And Adam knew his wife again, and she bore a son and called his name Seth, for she said, 'God has appointed for me another offspring instead of Abel, for Cain killed him.'"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 4 - Cain & Abel | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 4 with detailed explanations about Cain and Abel, the first murder, and the consequences of sin. Learn about the city of Enoch and the birth of Seth." />
        <meta name="keywords" content="Genesis Chapter 4, Cain and Abel, Bible study, first murder, sin consequences, city of Enoch, Seth birth, Bible quiz, Genesis study guide, Cain's mark" />
        <meta property="og:title" content="Genesis Chapter 4 - Cain & Abel | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 4 with detailed explanations about Cain and Abel, the first murder, and the consequences of sin. Learn about the city of Enoch and the birth of Seth." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-4" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 4 - Cain & Abel | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 4 with detailed explanations about Cain and Abel, the first murder, and the consequences of sin. Learn about the city of Enoch and the birth of Seth." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 4 - Cain & Abel',
          description: 'Study Genesis Chapter 4 with detailed explanations about Cain and Abel, the first murder, and the consequences of sin. Learn about the city of Enoch and the birth of Seth.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-4'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-4-full")}
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
          <span className="font-medium text-gray-900">Chapter 4</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
            <CardDescription>Test your knowledge of Genesis Chapter 4</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch4-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 4</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch4-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 4</CardDescription>
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
