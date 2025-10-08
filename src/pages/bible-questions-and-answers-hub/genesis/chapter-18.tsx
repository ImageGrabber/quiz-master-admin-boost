import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter18() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 18",
    subtitle: "Three Visitors",
    description: "Three visitors come to Abraham at Mamre, Sarah laughs at the promise of a son, and Abraham intercedes for Sodom.",
    keyPoints: [
      "Three visitors at Mamre; Sarah laughs",
      "Abraham intercedes for Sodom",
      "Bargaining for righteous people"
    ],
    detailedContent: [
      {
        title: "The Three Visitors",
        description: "The Lord appeared to Abraham by the oaks of Mamre, as he sat at the door of his tent in the heat of the day.",
        verses: "Genesis 18:1-2",
        verseText: "And the LORD appeared to him by the oaks of Mamre, as he sat at the door of his tent in the heat of the day. He lifted up his eyes and looked, and behold, three men were standing in front of him. When he saw them, he ran from the tent door to meet them and bowed himself to the earth."
      },
      {
        title: "Abraham's Hospitality",
        description: "Abraham said, 'O Lord, if I have found favor in your sight, do not pass by your servant. Let a little water be brought, and wash your feet, and rest yourselves under the tree.'",
        verses: "Genesis 18:3-5",
        verseText: "And said, 'O Lord, if I have found favor in your sight, do not pass by your servant. Let a little water be brought, and wash your feet, and rest yourselves under the tree, while I bring a morsel of bread, that you may refresh yourselves, and after that you may pass on—since you have come to your servant.' So they said, 'Do as you have said.'"
      },
      {
        title: "The Meal Preparation",
        description: "Abraham hastened into the tent to Sarah and said, 'Quick! Three seahs of fine flour! Knead it, and make cakes.' And Abraham ran to the herd and took a calf, tender and good, and gave it to a young man, who prepared it quickly.",
        verses: "Genesis 18:6-7",
        verseText: "And Abraham went quickly into the tent to Sarah and said, 'Quick! Three seahs of fine flour! Knead it, and make cakes.' And Abraham ran to the herd and took a calf, tender and good, and gave it to a young man, who prepared it quickly."
      },
      {
        title: "The Promise of a Son",
        description: "They said to him, 'Where is Sarah your wife?' And he said, 'She is in the tent.' The Lord said, 'I will surely return to you about this time next year, and Sarah your wife shall have a son.'",
        verses: "Genesis 18:9-10",
        verseText: "They said to him, 'Where is Sarah your wife?' And he said, 'She is in the tent.' The Lord said, 'I will surely return to you about this time next year, and Sarah your wife shall have a son.' And Sarah was listening at the tent door behind him."
      },
      {
        title: "Sarah's Laughter",
        description: "Sarah laughed to herself, saying, 'After I am worn out, and my lord is old, shall I have pleasure?'",
        verses: "Genesis 18:12",
        verseText: "So Sarah laughed to herself, saying, 'After I am worn out, and my lord is old, shall I have pleasure?'"
      },
      {
        title: "The Lord's Response",
        description: "The Lord said to Abraham, 'Why did Sarah laugh and say, \"Shall I indeed bear a child, now that I am old?\" Is anything too hard for the Lord? At the appointed time I will return to you, about this time next year, and Sarah shall have a son.'",
        verses: "Genesis 18:13-14",
        verseText: "The Lord said to Abraham, 'Why did Sarah laugh and say, \"Shall I indeed bear a child, now that I am old?\" Is anything too hard for the Lord? At the appointed time I will return to you, about this time next year, and Sarah shall have a son.'"
      },
      {
        title: "Sarah's Denial",
        description: "Sarah denied it, saying, 'I did not laugh,' for she was afraid. He said, 'No, but you did laugh.'",
        verses: "Genesis 18:15",
        verseText: "But Sarah denied it, saying, 'I did not laugh,' for she was afraid. He said, 'No, but you did laugh.'"
      },
      {
        title: "The Mission to Sodom",
        description: "The men set out from there, and Abraham went with them to set them on their way. The Lord said, 'Shall I hide from Abraham what I am about to do?'",
        verses: "Genesis 18:16-17",
        verseText: "Then the men set out from there, and Abraham went with them to set them on their way. The Lord said, 'Shall I hide from Abraham what I am about to do, seeing that Abraham shall surely become a great and mighty nation, and all the nations of the earth shall be blessed in him?'"
      },
      {
        title: "Abraham's Intercession",
        description: "Abraham drew near and said, 'Will you indeed sweep away the righteous with the wicked? Suppose there are fifty righteous within the city. Will you then sweep away the place and not spare it for the fifty righteous who are in it?'",
        verses: "Genesis 18:23-24",
        verseText: "Then Abraham drew near and said, 'Will you indeed sweep away the righteous with the wicked? Suppose there are fifty righteous within the city. Will you then sweep away the place and not spare it for the fifty righteous who are in it?'"
      },
      {
        title: "The Bargaining",
        description: "Abraham continued to bargain with the Lord, reducing the number from fifty to forty-five, then forty, thirty, twenty, and finally ten righteous people.",
        verses: "Genesis 18:32",
        verseText: "Then he said, 'Oh let not the Lord be angry, and I will speak again but this once. Suppose ten are found there.' He answered, 'For the sake of ten I will not destroy it.'"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 18 - Three Visitors | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 18 with detailed explanations about the three visitors at Mamre, Sarah's laughter, and Abraham's intercession for Sodom." />
        <meta name="keywords" content="Genesis Chapter 18, Three visitors, Bible study, Sarah laughs, Abraham intercession, Sodom bargaining, Bible quiz, Genesis study guide, Mamre hospitality" />
        <meta property="og:title" content="Genesis Chapter 18 - Three Visitors | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 18 with detailed explanations about the three visitors at Mamre, Sarah's laughter, and Abraham's intercession for Sodom." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-18" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 18 - Three Visitors | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 18 with detailed explanations about the three visitors at Mamre, Sarah's laughter, and Abraham's intercession for Sodom." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 18 - Three Visitors',
          description: 'Study Genesis Chapter 18 with detailed explanations about the three visitors at Mamre, Sarah\'s laughter, and Abraham\'s intercession for Sodom.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-18'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-18-full")}
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
          <span className="font-medium text-gray-900">Chapter 18</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 18</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch18-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 18</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch18-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 18</CardDescription>
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
