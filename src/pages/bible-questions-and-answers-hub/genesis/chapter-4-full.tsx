import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter4Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: 1,
      text: "Now Adam knew Eve his wife, and she conceived and bore Cain, saying, \"I have gotten a man with the help of the Lord.\""
    },
    {
      verse: 2,
      text: "And again, she bore his brother Abel. Now Abel was a keeper of sheep, and Cain a worker of the ground."
    },
    {
      verse: 3,
      text: "In the course of time Cain brought to the Lord an offering of the fruit of the ground,"
    },
    {
      verse: 4,
      text: "and Abel also brought of the firstborn of his flock and of their fat portions. And the Lord had regard for Abel and his offering,"
    },
    {
      verse: 5,
      text: "but for Cain and his offering he had no regard. So Cain was very angry, and his face fell."
    },
    {
      verse: 6,
      text: "The Lord said to Cain, \"Why are you angry, and why has your face fallen?"
    },
    {
      verse: 7,
      text: "If you do well, will you not be accepted? And if you do not do well, sin is crouching at the door. Its desire is for you, and you must rule over it.\""
    },
    {
      verse: 8,
      text: "Cain spoke to Abel his brother. And when they were in the field, Cain rose up against his brother Abel and killed him."
    },
    {
      verse: 9,
      text: "Then the Lord said to Cain, \"Where is Abel your brother?\" He said, \"I do not know; am I my brother's keeper?\""
    },
    {
      verse: 10,
      text: "And the Lord said, \"What have you done? The voice of your brother's blood is crying to me from the ground."
    },
    {
      verse: 11,
      text: "And now you are cursed from the ground, which has opened its mouth to receive your brother's blood from your hand."
    },
    {
      verse: 12,
      text: "When you work the ground, it shall no longer yield to you its strength. You shall be a fugitive and a wanderer on the earth.\""
    },
    {
      verse: 13,
      text: "Cain said to the Lord, \"My punishment is greater than I can bear."
    },
    {
      verse: 14,
      text: "Behold, you have driven me today away from the ground, and from your face I shall be hidden. I shall be a fugitive and a wanderer on the earth, and whoever finds me will kill me.\""
    },
    {
      verse: 15,
      text: "Then the Lord said to him, \"Not so! If anyone kills Cain, vengeance shall be taken on him sevenfold.\" And the Lord put a mark on Cain, lest any who found him should attack him."
    },
    {
      verse: 16,
      text: "Then Cain went away from the presence of the Lord and settled in the land of Nod, east of Eden."
    },
    {
      verse: 17,
      text: "Cain knew his wife, and she conceived and bore Enoch. When he built a city, he called the name of the city after the name of his son, Enoch."
    },
    {
      verse: 18,
      text: "To Enoch was born Irad, and Irad fathered Mehujael, and Mehujael fathered Methushael, and Methushael fathered Lamech."
    },
    {
      verse: 19,
      text: "And Lamech took two wives. The name of the one was Adah, and the name of the other Zillah."
    },
    {
      verse: 20,
      text: "Adah bore Jabal; he was the father of those who dwell in tents and have livestock."
    },
    {
      verse: 21,
      text: "His brother's name was Jubal; he was the father of all those who play the lyre and pipe."
    },
    {
      verse: 22,
      text: "Zillah also bore Tubal-cain; he was the forger of all instruments of bronze and iron. The sister of Tubal-cain was Naamah."
    },
    {
      verse: 23,
      text: "Lamech said to his wives: \"Adah and Zillah, hear my voice; you wives of Lamech, listen to what I say: I have killed a man for wounding me, a young man for striking me."
    },
    {
      verse: 24,
      text: "If Cain's revenge is sevenfold, then Lamech's is seventy-sevenfold.\""
    },
    {
      verse: 25,
      text: "And Adam knew his wife again, and she bore a son and called his name Seth, for she said, \"God has appointed for me another offspring instead of Abel, for Cain killed him.\""
    },
    {
      verse: 26,
      text: "To Seth also a son was born, and he called his name Enosh. At that time people began to call upon the name of the Lord."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 4 - Cain and Abel | Full Text | Bible Quiz Study Guide</title>
        <meta name="description" content="Read the complete text of Genesis Chapter 4 - Cain and Abel. The story of the first murder, Cain's curse, and the birth of Seth." />
        <meta name="keywords" content="Genesis Chapter 4 full text, Cain and Abel, Bible study, first murder, Cain's curse, Seth birth, Bible quiz, Genesis study guide, complete chapter" />
        <meta property="og:title" content="Genesis Chapter 4 - Cain and Abel | Full Text | Bible Quiz Study Guide" />
        <meta property="og:description" content="Read the complete text of Genesis Chapter 4 - Cain and Abel. The story of the first murder, Cain's curse, and the birth of Seth." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-4-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 4 - Cain and Abel | Full Text | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Read the complete text of Genesis Chapter 4 - Cain and Abel. The story of the first murder, Cain's curse, and the birth of Seth." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 4 - Cain and Abel | Full Text',
          description: 'Read the complete text of Genesis Chapter 4 - Cain and Abel. The story of the first murder, Cain\'s curse, and the birth of Seth.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-4-full'
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
              Genesis Chapter 4
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              Cain and Abel
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              The complete text of Genesis Chapter 4 - the story of Cain and Abel, the first murder, Cain's curse, and the birth of Seth.
            </p>
            <div className="mt-6 flex gap-4">
              <Button 
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-4")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Study Guide
              </Button>
              <Button 
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-4")}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Take Quiz
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
          <span className="font-medium text-gray-900">Chapter 4 Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Genesis Hub
          </Button>
        </div>

        {/* Chapter Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 4 - Cain and Abel
            </CardTitle>
            <CardDescription>English Standard Version (ESV)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fullChapterText.map((verse, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 text-right">
                    <span className="text-sm font-medium text-blue-600">{verse.verse}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{verse.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Study Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Study This Chapter</CardTitle>
            <CardDescription>Explore Genesis Chapter 4 with our study tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-4")}>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">Study Guide</CardTitle>
                  <CardDescription>Detailed explanations and key points</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">View Study Guide</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-4")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Take Quiz</CardTitle>
                  <CardDescription>Test your knowledge of this chapter</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Quiz</Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
