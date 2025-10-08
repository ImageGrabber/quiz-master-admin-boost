import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter10() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 10",
    subtitle: "Table of Nations",
    description: "The genealogy of Noah's sons and their descendants, showing the spread of nations after the flood.",
    keyPoints: [
      "Table of Nations; Japheth's descendants",
      "Ham's descendants; Canaan's sons",
      "Shem's descendants; Eber's line"
    ],
    detailedContent: [
      {
        title: "Japheth's Descendants",
        description: "The sons of Japheth and their descendants, who settled in the northern regions and coastlands.",
        verses: "Genesis 10:2-5",
        verseText: "The sons of Japheth: Gomer, Magog, Madai, Javan, Tubal, Meshech, and Tiras. The sons of Gomer: Ashkenaz, Riphath, and Togarmah. The sons of Javan: Elishah, Tarshish, Kittim, and Dodanim. From these the coastland peoples spread in their lands, each with his own language, by their clans, in their nations."
      },
      {
        title: "Ham's Descendants",
        description: "The sons of Ham and their descendants, including the Canaanites and other peoples who settled in various regions.",
        verses: "Genesis 10:6-20",
        verseText: "The sons of Ham: Cush, Egypt, Put, and Canaan. The sons of Cush: Seba, Havilah, Sabtah, Raamah, and Sabteca. The sons of Raamah: Sheba and Dedan. Cush fathered Nimrod; he was the first on earth to be a mighty man. He was a mighty hunter before the LORD. Therefore it is said, 'Like Nimrod a mighty hunter before the LORD.' The beginning of his kingdom was Babel, Erech, Accad, and Calneh, in the land of Shinar."
      },
      {
        title: "Shem's Descendants",
        description: "The sons of Shem and their descendants, including Eber, from whom the Hebrews would descend.",
        verses: "Genesis 10:21-32",
        verseText: "To Shem also, the father of all the children of Eber, the elder brother of Japheth, children were born. The sons of Shem: Elam, Asshur, Arpachshad, Lud, and Aram. The sons of Aram: Uz, Hul, Gether, and Mash. Arpachshad fathered Shelah, and Shelah fathered Eber. To Eber were born two sons: the name of the one was Peleg, for in his days the earth was divided, and his brother's name was Joktan."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 10 - Table of Nations | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 10 with detailed explanations about the Table of Nations, the descendants of Japheth, Ham, and Shem. Learn about the spread of nations after the flood." />
        <meta name="keywords" content="Genesis Chapter 10, Table of Nations, Bible study, Japheth descendants, Ham descendants, Shem descendants, Bible quiz, Genesis study guide, Noah's sons" />
        <meta property="og:title" content="Genesis Chapter 10 - Table of Nations | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 10 with detailed explanations about the Table of Nations, the descendants of Japheth, Ham, and Shem. Learn about the spread of nations after the flood." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-10" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 10 - Table of Nations | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 10 with detailed explanations about the Table of Nations, the descendants of Japheth, Ham, and Shem. Learn about the spread of nations after the flood." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 10 - Table of Nations',
          description: 'Study Genesis Chapter 10 with detailed explanations about the Table of Nations, the descendants of Japheth, Ham, and Shem. Learn about the spread of nations after the flood.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-10'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-10-full")}
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
          <span className="font-medium text-gray-900">Chapter 10</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 10</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch10-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 10</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch10-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 10</CardDescription>
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
