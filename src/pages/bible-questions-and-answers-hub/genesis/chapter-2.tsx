import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter2() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 2",
    subtitle: "Garden of Eden",
    description: "The detailed account of the creation of man, the Garden of Eden, and the establishment of marriage.",
    keyPoints: [
      "Garden of Eden; rivers and Havilah gold",
      "Tree of life vs tree of knowledge",
      "Formation of woman; one flesh design"
    ],
    detailedContent: [
      {
        title: "The Garden of Eden",
        description: "God planted a garden in Eden with every tree that is pleasant to the sight and good for food, including the tree of life and the tree of knowledge of good and evil.",
        verses: "Genesis 2:8-9",
        verseText: "And the Lord God planted a garden in Eden, in the east, and there he put the man whom he had formed. And out of the ground the Lord God made to spring up every tree that is pleasant to the sight and good for food. The tree of life was in the midst of the garden, and the tree of the knowledge of good and evil."
      },
      {
        title: "The Rivers",
        description: "A river flowed out of Eden and divided into four rivers: Pishon, Gihon, Tigris, and Euphrates, with the land of Havilah containing gold.",
        verses: "Genesis 2:10-14",
        verseText: "A river flowed out of Eden to water the garden, and there it divided and became four rivers. The name of the first is the Pishon. It is the one that flowed around the whole land of Havilah, where there is gold. And the gold of that land is good; bdellium and onyx stone are there. The name of the second river is the Gihon. It is the one that flowed around the whole land of Cush. And the name of the third river is the Tigris, which flows east of Assyria. And the fourth river is the Euphrates."
      },
      {
        title: "Man's Purpose",
        description: "God placed man in the garden to work it and keep it, giving him the command not to eat from the tree of knowledge of good and evil.",
        verses: "Genesis 2:15-17",
        verseText: "The Lord God took the man and put him in the garden of Eden to work it and keep it. And the Lord God commanded the man, saying, 'You may surely eat of every tree of the garden, but of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall surely die.'"
      },
      {
        title: "The Creation of Woman",
        description: "God saw that it was not good for man to be alone, so He created woman from man's rib to be his helper and companion.",
        verses: "Genesis 2:18-25",
        verseText: "Then the Lord God said, 'It is not good that the man should be alone; I will make him a helper fit for him.' Now out of the ground the Lord God had formed every beast of the field and every bird of the heavens and brought them to the man to see what he would call them. And whatever the man called every living creature, that was its name. The man gave names to all livestock and to the birds of the heavens and to every beast of the field. But for Adam there was not found a helper fit for him. So the Lord God caused a deep sleep to fall upon the man, and while he slept took one of his ribs and closed up its place with flesh. And the rib that the Lord God had taken from the man he made into a woman and brought her to the man. Then the man said, 'This at last is bone of my bones and flesh of my flesh; she shall be called Woman, because she was taken out of Man.' Therefore a man shall leave his father and his mother and hold fast to his wife, and they shall become one flesh. And the man and his wife were both naked and were not ashamed."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 2 - Garden of Eden | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 2 with detailed explanations about the Garden of Eden, creation of man and woman, and the institution of marriage. Learn about the rivers, trees, and God's design for humanity." />
        <meta name="keywords" content="Genesis Chapter 2, Garden of Eden, Bible study, Adam and Eve, marriage, creation of woman, Bible quiz, Genesis study guide, Eden rivers" />
        <meta property="og:title" content="Genesis Chapter 2 - Garden of Eden | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 2 with detailed explanations about the Garden of Eden, creation of man and woman, and the institution of marriage. Learn about the rivers, trees, and God's design for humanity." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-2" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 2 - Garden of Eden | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 2 with detailed explanations about the Garden of Eden, creation of man and woman, and the institution of marriage. Learn about the rivers, trees, and God's design for humanity." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 2 - Garden of Eden',
          description: 'Study Genesis Chapter 2 with detailed explanations about the Garden of Eden, creation of man and woman, and the institution of marriage. Learn about the rivers, trees, and God\'s design for humanity.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-2'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-2-full")}
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
          <span className="font-medium text-gray-900">Chapter 2</span>
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

        {/* Theological Themes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Theological Themes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">God's Provision</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Garden planted with every good tree</li>
                  <li>• Rivers flowing with precious metals</li>
                  <li>• Perfect environment for humanity</li>
                  <li>• Tree of life in the midst</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Human Responsibility</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Man placed to work and keep the garden</li>
                  <li>• Naming authority over animals</li>
                  <li>• Stewardship of God's creation</li>
                  <li>• Obedience to God's command</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Marriage Design</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Woman created from man's rib</li>
                  <li>• Helper fit for him</li>
                  <li>• One flesh union</li>
                  <li>• Leave and cleave principle</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Perfect Fellowship</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• No shame in nakedness</li>
                  <li>• Complete transparency</li>
                  <li>• Perfect relationship with God</li>
                  <li>• Ideal human community</li>
                </ul>
              </div>
            </div>
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
            <CardDescription>Test your knowledge of Genesis Chapter 2</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch2-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 2</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch2-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 2</CardDescription>
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
