import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter3() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 3",
    subtitle: "The Fall",
    description: "The account of humanity's fall into sin through the temptation of the serpent and the consequences that followed.",
    keyPoints: [
      "Temptation and the Fall; consequences",
      "Protoevangelium (3:15) promise",
      "Garments of skin; expulsion and cherubim"
    ],
    detailedContent: [
      {
        title: "The Serpent's Temptation",
        description: "The serpent, more crafty than any other beast, questioned God's command and tempted Eve to eat from the forbidden tree.",
        verses: "Genesis 3:1-5",
        verseText: "Now the serpent was more crafty than any other beast of the field that the LORD God had made. He said to the woman, 'Did God actually say, \"You shall not eat of any tree in the garden\"?' And the woman said to the serpent, 'We may eat of the fruit of the trees in the garden, but God said, \"You shall not eat of the fruit of the tree that is in the midst of the garden, neither shall you touch it, lest you die.\"' But the serpent said to the woman, 'You will not surely die. For God knows that when you eat of it your eyes will be opened, and you will be like God, knowing good and evil.'"
      },
      {
        title: "The Fall",
        description: "Eve took and ate the fruit, gave some to Adam, and both their eyes were opened, knowing good and evil.",
        verses: "Genesis 3:6-7",
        verseText: "So when the woman saw that the tree was good for food, and that it was a delight to the eyes, and that the tree was to be desired to make one wise, she took of its fruit and ate, and she also gave some to her husband who was with her, and he ate. Then the eyes of both were opened, and they knew that they were naked. And they sewed fig leaves together and made themselves loincloths."
      },
      {
        title: "The Consequences",
        description: "God pronounced curses on the serpent, the woman (pain in childbirth), and the man (toil and thorns).",
        verses: "Genesis 3:14-19",
        verseText: "The LORD God said to the serpent, 'Because you have done this, cursed are you above all livestock and above all beasts of the field; on your belly you shall go, and dust you shall eat all the days of your life. I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel.' To the woman he said, 'I will surely multiply your pain in childbearing; in pain you shall bring forth children. Your desire shall be for your husband, and he shall rule over you.' And to Adam he said, 'Because you have listened to the voice of your wife and have eaten of the tree of which I commanded you, \"You shall not eat of it,\" cursed is the ground because of you; in pain you shall eat of it all the days of your life; thorns and thistles it shall bring forth for you; and you shall eat the plants of the field. By the sweat of your face you shall eat bread, till you return to the ground, for out of it you were taken; for you are dust, and to dust you shall return.'"
      },
      {
        title: "The Protoevangelium",
        description: "God promised that the woman's offspring would bruise the serpent's head, while the serpent would bruise his heel.",
        verses: "Genesis 3:15",
        verseText: "I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel."
      },
      {
        title: "Expulsion from Eden",
        description: "God made garments of skin for Adam and Eve and expelled them from the garden, placing cherubim to guard the way to the tree of life.",
        verses: "Genesis 3:20-24",
        verseText: "The man called his wife's name Eve, because she was the mother of all living. And the LORD God made for Adam and for his wife garments of skins and clothed them. Then the LORD God said, 'Behold, the man has become like one of us in knowing good and evil. Now, lest he reach out his hand and take also of the tree of life and eat, and live forever—' therefore the LORD God sent him out from the garden of Eden to work the ground from which he was taken. He drove out the man, and at the east of the garden of Eden he placed the cherubim and a flaming sword that turned every way to guard the way to the tree of life."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 3 - The Fall | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 3 with detailed explanations about The Fall, the serpent's temptation, and the consequences of sin. Learn about the Protoevangelium and expulsion from Eden." />
        <meta name="keywords" content="Genesis Chapter 3, The Fall, Bible study, Adam and Eve, serpent temptation, sin, Protoevangelium, Bible quiz, Genesis study guide, Eden expulsion" />
        <meta property="og:title" content="Genesis Chapter 3 - The Fall | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 3 with detailed explanations about The Fall, the serpent's temptation, and the consequences of sin. Learn about the Protoevangelium and expulsion from Eden." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-3" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 3 - The Fall | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 3 with detailed explanations about The Fall, the serpent's temptation, and the consequences of sin. Learn about the Protoevangelium and expulsion from Eden." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 3 - The Fall',
          description: 'Study Genesis Chapter 3 with detailed explanations about The Fall, the serpent\'s temptation, and the consequences of sin. Learn about the Protoevangelium and expulsion from Eden.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-3'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-3-full")}
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
          <span className="font-medium text-gray-900">Chapter 3</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 3</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch3-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 3</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch3-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 3</CardDescription>
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
