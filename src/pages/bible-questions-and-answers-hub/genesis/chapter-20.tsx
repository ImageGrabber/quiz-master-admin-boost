import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter20() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 20",
    subtitle: "Abraham in Gerar",
    description: "Abraham and Sarah in Gerar, Abimelech's dream, and God's intervention to protect Sarah.",
    keyPoints: [
      "Abraham in Gerar; Sarah taken",
      "Abimelech's dream; God's warning",
      "Abraham prays; Abimelech healed"
    ],
    detailedContent: [
      {
        title: "Abraham in Gerar",
        description: "From there Abraham journeyed toward the territory of the Negeb and lived between Kadesh and Shur; and he sojourned in Gerar.",
        verses: "Genesis 20:1",
        verseText: "From there Abraham journeyed toward the territory of the Negeb and lived between Kadesh and Shur; and he sojourned in Gerar."
      },
      {
        title: "The Same Deception",
        description: "And Abraham said of Sarah his wife, 'She is my sister.' And Abimelech king of Gerar sent and took Sarah.",
        verses: "Genesis 20:2",
        verseText: "And Abraham said of Sarah his wife, 'She is my sister.' And Abimelech king of Gerar sent and took Sarah."
      },
      {
        title: "God's Intervention",
        description: "But God came to Abimelech in a dream by night and said to him, 'Behold, you are a dead man because of the woman whom you have taken, for she is a man's wife.'",
        verses: "Genesis 20:3",
        verseText: "But God came to Abimelech in a dream by night and said to him, 'Behold, you are a dead man because of the woman whom you have taken, for she is a man's wife.'"
      },
      {
        title: "Abimelech's Defense",
        description: "Now Abimelech had not approached her. So he said, 'Lord, will you kill an innocent people? Did he not himself say to me, \"She is my sister\"? And she herself said, \"He is my brother.\" In the integrity of my heart and the innocence of my hands I have done this.'",
        verses: "Genesis 20:4-5",
        verseText: "Now Abimelech had not approached her. So he said, 'Lord, will you kill an innocent people? Did he not himself say to me, \"She is my sister\"? And she herself said, \"He is my brother.\" In the integrity of my heart and the innocence of my hands I have done this.'"
      },
      {
        title: "God's Response",
        description: "Then God said to him in the dream, 'Yes, I know that you have done this in the integrity of your heart, and it was I who kept you from sinning against me. Therefore I did not let you touch her.'",
        verses: "Genesis 20:6",
        verseText: "Then God said to him in the dream, 'Yes, I know that you have done this in the integrity of your heart, and it was I who kept you from sinning against me. Therefore I did not let you touch her.'"
      },
      {
        title: "The Command to Return",
        description: "Now then, return the man's wife, for he is a prophet, so that he will pray for you, and you shall live. But if you do not return her, know that you shall surely die, you and all who are yours.",
        verses: "Genesis 20:7",
        verseText: "Now then, return the man's wife, for he is a prophet, so that he will pray for you, and you shall live. But if you do not return her, know that you shall surely die, you and all who are yours."
      },
      {
        title: "Abimelech's Actions",
        description: "So Abimelech rose early in the morning and called all his servants and told them all these things. And the men were very much afraid.",
        verses: "Genesis 20:8",
        verseText: "So Abimelech rose early in the morning and called all his servants and told them all these things. And the men were very much afraid."
      },
      {
        title: "Abimelech's Confrontation",
        description: "Then Abimelech called Abraham and said to him, 'What have you done to us? And how have I sinned against you, that you have brought on me and my kingdom a great sin? You have done to me things that ought not to be done.'",
        verses: "Genesis 20:9",
        verseText: "Then Abimelech called Abraham and said to him, 'What have you done to us? And how have I sinned against you, that you have brought on me and my kingdom a great sin? You have done to me things that ought not to be done.'"
      },
      {
        title: "Abraham's Explanation",
        description: "Abraham said, 'I did it because I thought, There is no fear of God at all in this place, and they will kill me because of my wife.'",
        verses: "Genesis 20:11",
        verseText: "Abraham said, 'I did it because I thought, There is no fear of God at all in this place, and they will kill me because of my wife.'"
      },
      {
        title: "The Half-Truth",
        description: "Besides, she is indeed my sister, the daughter of my father though not the daughter of my mother, and she became my wife.",
        verses: "Genesis 20:12",
        verseText: "Besides, she is indeed my sister, the daughter of my father though not the daughter of my mother, and she became my wife."
      },
      {
        title: "Abimelech's Gifts",
        description: "So Abimelech took sheep and oxen, and male servants and female servants, and gave them to Abraham, and returned Sarah his wife to him.",
        verses: "Genesis 20:14",
        verseText: "So Abimelech took sheep and oxen, and male servants and female servants, and gave them to Abraham, and returned Sarah his wife to him."
      },
      {
        title: "Abraham's Prayer",
        description: "Then Abraham prayed to God, and God healed Abimelech, and also healed his wife and female slaves so that they bore children.",
        verses: "Genesis 20:17",
        verseText: "Then Abraham prayed to God, and God healed Abimelech, and also healed his wife and female slaves so that they bore children."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 20 - Abraham in Gerar | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 20 with detailed explanations about Abraham in Gerar, Abimelech's dream, and God's intervention to protect Sarah." />
        <meta name="keywords" content="Genesis Chapter 20, Abraham in Gerar, Bible study, Abimelech dream, Sarah protection, Bible quiz, Genesis study guide, Abraham's prayer" />
        <meta property="og:title" content="Genesis Chapter 20 - Abraham in Gerar | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 20 with detailed explanations about Abraham in Gerar, Abimelech's dream, and God's intervention to protect Sarah." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-20" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 20 - Abraham in Gerar | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 20 with detailed explanations about Abraham in Gerar, Abimelech's dream, and God's intervention to protect Sarah." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 20 - Abraham in Gerar',
          description: 'Study Genesis Chapter 20 with detailed explanations about Abraham in Gerar, Abimelech\'s dream, and God\'s intervention to protect Sarah.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-20'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-20-full")}
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
          <span className="font-medium text-gray-900">Chapter 20</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 20</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch20-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 20</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch20-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 20</CardDescription>
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
