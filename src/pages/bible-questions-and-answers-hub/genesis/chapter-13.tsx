import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter13() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 13",
    subtitle: "Abram & Lot Separate",
    description: "The separation of Abram and Lot due to their growing wealth, and God's renewed promises to Abram.",
    keyPoints: [
      "Abram and Lot separate; Lot chooses Jordan plain",
      "Abram settles at Hebron; builds altar",
      "God renews promises to Abram"
    ],
    detailedContent: [
      {
        title: "Abram's Return from Egypt",
        description: "Abram went up from Egypt to the Negeb with his wife and all that he had, and Lot with him.",
        verses: "Genesis 13:1-2",
        verseText: "So Abram went up from Egypt, he and his wife and all that he had, and Lot with him, into the Negeb. Now Abram was very rich in livestock, in silver, and in gold."
      },
      {
        title: "The Journey to Bethel",
        description: "Abram journeyed on by stages from the Negeb as far as Bethel, to the place where his tent had been at the beginning.",
        verses: "Genesis 13:3-4",
        verseText: "And he journeyed on by stages from the Negeb as far as Bethel, to the place where his tent had been at the beginning, between Bethel and Ai, to the place where he had made an altar at the first. And there Abram called upon the name of the LORD."
      },
      {
        title: "Conflict Between Herdsmen",
        description: "The land could not support both Abram and Lot dwelling together, for their possessions were so great that they could not dwell together.",
        verses: "Genesis 13:5-7",
        verseText: "And Lot, who went with Abram, also had flocks and herds and tents, so that the land could not support both of them dwelling together; for their possessions were so great that they could not dwell together, and there was strife between the herdsmen of Abram's livestock and the herdsmen of Lot's livestock. At that time the Canaanites and the Perizzites were dwelling in the land."
      },
      {
        title: "Abram's Proposal",
        description: "Abram suggested they separate, giving Lot the choice of which direction to go, showing his generosity and wisdom.",
        verses: "Genesis 13:8-9",
        verseText: "Then Abram said to Lot, 'Let there be no strife between you and me, and between your herdsmen and my herdsmen, for we are kinsmen. Is not the whole land before you? Separate yourself from me. If you take the left hand, then I will go to the right, or if you take the right hand, then I will go to the left.'"
      },
      {
        title: "Lot's Choice",
        description: "Lot chose the Jordan Valley, which was well-watered like the garden of the Lord, and journeyed east.",
        verses: "Genesis 13:10-11",
        verseText: "And Lot lifted up his eyes and saw that the Jordan Valley was well watered everywhere like the garden of the LORD, like the land of Egypt, in the direction of Zoar. (This was before the LORD destroyed Sodom and Gomorrah.) So Lot chose for himself all the Jordan Valley, and Lot journeyed east. Thus they separated from each other."
      },
      {
        title: "Abram in Canaan",
        description: "Abram settled in the land of Canaan, while Lot settled among the cities of the valley and moved his tent as far as Sodom.",
        verses: "Genesis 13:12",
        verseText: "Abram settled in the land of Canaan, while Lot settled among the cities of the valley and moved his tent as far as Sodom."
      },
      {
        title: "God's Renewed Promise",
        description: "After Lot had separated from him, the Lord told Abram to lift up his eyes and look, for all the land he could see would be given to him and his offspring forever.",
        verses: "Genesis 13:14-17",
        verseText: "The LORD said to Abram, after Lot had separated from him, 'Lift up your eyes and look from the place where you are, northward and southward and eastward and westward, for all the land that you see I will give to you and to your offspring forever. I will make your offspring as the dust of the earth, so that if one can count the dust of the earth, your offspring also can be counted. Arise, walk through the length and the breadth of the land, for I will give it to you.'"
      },
      {
        title: "Abram at Hebron",
        description: "Abram moved his tent and came and settled by the oaks of Mamre, which are at Hebron, and there he built an altar to the Lord.",
        verses: "Genesis 13:18",
        verseText: "So Abram moved his tent and came and settled by the oaks of Mamre, which are at Hebron, and there he built an altar to the LORD."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 13 - Abram & Lot Separate | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 13 with detailed explanations about Abram and Lot's separation, Lot's choice of the Jordan Valley, and God's renewed promises to Abram." />
        <meta name="keywords" content="Genesis Chapter 13, Abram and Lot separate, Bible study, Jordan Valley choice, God's promises, Bible quiz, Genesis study guide, Lot's choice" />
        <meta property="og:title" content="Genesis Chapter 13 - Abram & Lot Separate | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 13 with detailed explanations about Abram and Lot's separation, Lot's choice of the Jordan Valley, and God's renewed promises to Abram." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-13" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 13 - Abram & Lot Separate | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 13 with detailed explanations about Abram and Lot's separation, Lot's choice of the Jordan Valley, and God's renewed promises to Abram." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 13 - Abram & Lot Separate',
          description: 'Study Genesis Chapter 13 with detailed explanations about Abram and Lot\'s separation, Lot\'s choice of the Jordan Valley, and God\'s renewed promises to Abram.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-13'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-13-full")}
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
          <span className="font-medium text-gray-900">Chapter 13</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 13</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch13-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 13</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch13-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 13</CardDescription>
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
