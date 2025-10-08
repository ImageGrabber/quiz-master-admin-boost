import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter15() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 15",
    subtitle: "God's Covenant",
    description: "God's covenant with Abram, the promise of descendants as numerous as the stars, and the covenant ceremony.",
    keyPoints: [
      "God's promise to Abram; descendants as stars",
      "Abram's faith counted as righteousness",
      "Covenant ceremony; smoking fire pot and torch"
    ],
    detailedContent: [
      {
        title: "God's Promise",
        description: "The word of the Lord came to Abram in a vision, saying, 'Fear not, Abram, I am your shield; your reward shall be very great.'",
        verses: "Genesis 15:1",
        verseText: "After these things the word of the LORD came to Abram in a vision: 'Fear not, Abram, I am your shield; your reward shall be very great.'"
      },
      {
        title: "Abram's Concern",
        description: "Abram said, 'O Lord GOD, what will you give me, for I continue childless, and the heir of my house is Eliezer of Damascus?'",
        verses: "Genesis 15:2-3",
        verseText: "But Abram said, 'O Lord GOD, what will you give me, for I continue childless, and the heir of my house is Eliezer of Damascus?' And Abram said, 'Behold, you have given me no offspring, and a member of my household will be my heir.'"
      },
      {
        title: "The Promise of Offspring",
        description: "The Lord brought Abram outside and said, 'Look toward heaven, and number the stars, if you are able to number them.' Then he said, 'So shall your offspring be.'",
        verses: "Genesis 15:4-5",
        verseText: "And behold, the word of the LORD came to him: 'This man shall not be your heir; your very own son shall be your heir.' And he brought him outside and said, 'Look toward heaven, and number the stars, if you are able to number them.' Then he said to him, 'So shall your offspring be.'"
      },
      {
        title: "Abram's Faith",
        description: "Abram believed the Lord, and he counted it to him as righteousness.",
        verses: "Genesis 15:6",
        verseText: "And he believed the LORD, and he counted it to him as righteousness."
      },
      {
        title: "The Land Promise",
        description: "The Lord said to Abram, 'I am the Lord who brought you out from Ur of the Chaldeans to give you this land to possess.'",
        verses: "Genesis 15:7",
        verseText: "And he said to him, 'I am the LORD who brought you out from Ur of the Chaldeans to give you this land to possess.'"
      },
      {
        title: "The Covenant Ceremony",
        description: "The Lord told Abram to bring a heifer, a female goat, a ram, a turtledove, and a young pigeon for a covenant ceremony.",
        verses: "Genesis 15:9-10",
        verseText: "He said to him, 'Bring me a heifer three years old, a female goat three years old, a ram three years old, a turtledove, and a young pigeon.' And he brought him all these, cut them in half, and laid each half over against the other. But he did not cut the birds in half."
      },
      {
        title: "The Vision",
        description: "As the sun was going down, a deep sleep fell on Abram, and behold, dreadful and great darkness fell upon him.",
        verses: "Genesis 15:12",
        verseText: "As the sun was going down, a deep sleep fell on Abram. And behold, dreadful and great darkness fell upon him."
      },
      {
        title: "The Covenant Confirmed",
        description: "When the sun had gone down and it was dark, behold, a smoking fire pot and a flaming torch passed between these pieces.",
        verses: "Genesis 15:17",
        verseText: "When the sun had gone down and it was dark, behold, a smoking fire pot and a flaming torch passed between these pieces."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 15 - God's Covenant | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 15 with detailed explanations about God's covenant with Abram, the promise of descendants, and the covenant ceremony." />
        <meta name="keywords" content="Genesis Chapter 15, God's covenant, Bible study, Abram's faith, descendants promise, covenant ceremony, Bible quiz, Genesis study guide, righteousness" />
        <meta property="og:title" content="Genesis Chapter 15 - God's Covenant | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 15 with detailed explanations about God's covenant with Abram, the promise of descendants, and the covenant ceremony." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-15" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 15 - God's Covenant | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 15 with detailed explanations about God's covenant with Abram, the promise of descendants, and the covenant ceremony." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 15 - God\'s Covenant',
          description: 'Study Genesis Chapter 15 with detailed explanations about God\'s covenant with Abram, the promise of descendants, and the covenant ceremony.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-15'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-15-full")}
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
          <span className="font-medium text-gray-900">Chapter 15</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 15</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch15-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 15</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch15-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 15</CardDescription>
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
