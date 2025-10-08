import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter19() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 19",
    subtitle: "Sodom's Destruction",
    description: "The angels visit Lot in Sodom, the city's destruction, and Lot's escape with his daughters.",
    keyPoints: [
      "Angels visit Lot; Sodom's destruction",
      "Lot's wife becomes pillar of salt",
      "Lot and daughters in Zoar"
    ],
    detailedContent: [
      {
        title: "The Angels Arrive",
        description: "The two angels came to Sodom in the evening, and Lot was sitting in the gate of Sodom. When Lot saw them, he rose to meet them and bowed himself with his face to the earth.",
        verses: "Genesis 19:1",
        verseText: "The two angels came to Sodom in the evening, and Lot was sitting in the gate of Sodom. When Lot saw them, he rose to meet them and bowed himself with his face to the earth."
      },
      {
        title: "Lot's Hospitality",
        description: "Lot said, 'My lords, please turn aside to your servant's house and spend the night and wash your feet. Then you may rise up early and go on your way.'",
        verses: "Genesis 19:2",
        verseText: "And said, 'My lords, please turn aside to your servant's house and spend the night and wash your feet. Then you may rise up early and go on your way.' They said, 'No; we will spend the night in the town square.'"
      },
      {
        title: "The Men of Sodom",
        description: "But he pressed them strongly; so they turned aside to him and entered his house. And he made them a feast and baked unleavened bread, and they ate.",
        verses: "Genesis 19:3",
        verseText: "But he pressed them strongly; so they turned aside to him and entered his house. And he made them a feast and baked unleavened bread, and they ate."
      },
      {
        title: "The Mob at the Door",
        description: "But before they lay down, the men of the city, the men of Sodom, both young and old, all the people to the last man, surrounded the house.",
        verses: "Genesis 19:4",
        verseText: "But before they lay down, the men of the city, the men of Sodom, both young and old, all the people to the last man, surrounded the house."
      },
      {
        title: "The Demand",
        description: "And they called to Lot, 'Where are the men who came to you tonight? Bring them out to us, that we may know them.'",
        verses: "Genesis 19:5",
        verseText: "And they called to Lot, 'Where are the men who came to you tonight? Bring them out to us, that we may know them.'"
      },
      {
        title: "Lot's Response",
        description: "Lot went out to the men at the entrance, shut the door after him, and said, 'I beg you, my brothers, do not act so wickedly.'",
        verses: "Genesis 19:6-7",
        verseText: "Lot went out to the men at the entrance, shut the door after him, and said, 'I beg you, my brothers, do not act so wickedly.'"
      },
      {
        title: "Lot's Offer",
        description: "Lot said, 'Behold, I have two daughters who have not known any man. Let me bring them out to you, and do to them as you please. Only do nothing to these men, for they have come under the shelter of my roof.'",
        verses: "Genesis 19:8",
        verseText: "Behold, I have two daughters who have not known any man. Let me bring them out to you, and do to them as you please. Only do nothing to these men, for they have come under the shelter of my roof."
      },
      {
        title: "The Angels' Intervention",
        description: "But the men reached out their hands and brought Lot into the house with them and shut the door. And they struck with blindness the men who were at the entrance of the house, both small and great, so that they wore themselves out groping for the door.",
        verses: "Genesis 19:10-11",
        verseText: "But the men reached out their hands and brought Lot into the house with them and shut the door. And they struck with blindness the men who were at the entrance of the house, both small and great, so that they wore themselves out groping for the door."
      },
      {
        title: "The Warning to Flee",
        description: "Then the men said to Lot, 'Have you anyone else here? Sons-in-law, sons, daughters, or anyone you have in the city, bring them out of the place. For we are about to destroy this place, because the outcry against its people has become great before the Lord, and the Lord has sent us to destroy it.'",
        verses: "Genesis 19:12-13",
        verseText: "Then the men said to Lot, 'Have you anyone else here? Sons-in-law, sons, daughters, or anyone you have in the city, bring them out of the place. For we are about to destroy this place, because the outcry against its people has become great before the Lord, and the Lord has sent us to destroy it.'"
      },
      {
        title: "Lot's Hesitation",
        description: "So Lot went out and said to his sons-in-law, who were to marry his daughters, 'Up! Get out of this place, for the Lord is about to destroy the city.' But he seemed to his sons-in-law to be jesting.",
        verses: "Genesis 19:14",
        verseText: "So Lot went out and said to his sons-in-law, who were to marry his daughters, 'Up! Get out of this place, for the Lord is about to destroy the city.' But he seemed to his sons-in-law to be jesting."
      },
      {
        title: "The Destruction",
        description: "As morning dawned, the angels urged Lot, saying, 'Up! Take your wife and your two daughters who are here, lest you be swept away in the punishment of the city.'",
        verses: "Genesis 19:15",
        verseText: "As morning dawned, the angels urged Lot, saying, 'Up! Take your wife and your two daughters who are here, lest you be swept away in the punishment of the city.'"
      },
      {
        title: "Lot's Wife",
        description: "But Lot's wife, behind him, looked back, and she became a pillar of salt.",
        verses: "Genesis 19:26",
        verseText: "But Lot's wife, behind him, looked back, and she became a pillar of salt."
      },
      {
        title: "The Destruction of Sodom",
        description: "Then the Lord rained on Sodom and Gomorrah sulfur and fire from the Lord out of heaven. And he overthrew those cities, and all the valley, and all the inhabitants of the cities, and what grew on the ground.",
        verses: "Genesis 19:24-25",
        verseText: "Then the Lord rained on Sodom and Gomorrah sulfur and fire from the Lord out of heaven. And he overthrew those cities, and all the valley, and all the inhabitants of the cities, and what grew on the ground."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 19 - Sodom's Destruction | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 19 with detailed explanations about the angels visiting Lot, Sodom's destruction, and Lot's escape with his daughters." />
        <meta name="keywords" content="Genesis Chapter 19, Sodom destruction, Bible study, Lot's escape, pillar of salt, Bible quiz, Genesis study guide, angels visit Lot" />
        <meta property="og:title" content="Genesis Chapter 19 - Sodom's Destruction | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 19 with detailed explanations about the angels visiting Lot, Sodom's destruction, and Lot's escape with his daughters." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-19" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 19 - Sodom's Destruction | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 19 with detailed explanations about the angels visiting Lot, Sodom's destruction, and Lot's escape with his daughters." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 19 - Sodom\'s Destruction',
          description: 'Study Genesis Chapter 19 with detailed explanations about the angels visiting Lot, Sodom\'s destruction, and Lot\'s escape with his daughters.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-19'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-19-full")}
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
          <span className="font-medium text-gray-900">Chapter 19</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 19</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch19-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 19</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch19-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 19</CardDescription>
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
