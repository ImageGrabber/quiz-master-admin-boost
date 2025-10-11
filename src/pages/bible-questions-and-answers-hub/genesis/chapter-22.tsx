import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter22() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 22",
    subtitle: "Abraham Tested",
    description: "God tests Abraham by asking him to sacrifice Isaac, the angel intervenes, and Abraham's descendants are blessed.",
    keyPoints: [
      "God tests Abraham with Isaac",
      "Abraham's faith and obedience",
      "The Lord provides a ram as substitute"
    ],
    detailedContent: [
      {
        title: "God Tests Abraham",
        description: "Some time later God tested Abraham. He said to him, 'Abraham!' 'Here I am,' he replied.",
        verses: "Genesis 22:1",
        verseText: "Some time later God tested Abraham. He said to him, 'Abraham!' 'Here I am,' he replied."
      },
      {
        title: "The Command to Sacrifice Isaac",
        description: "Then God said, 'Take your son, your only son, whom you love—Isaac—and go to the region of Moriah. Sacrifice him there as a burnt offering on a mountain I will show you.'",
        verses: "Genesis 22:2",
        verseText: "Then God said, 'Take your son, your only son, whom you love—Isaac—and go to the region of Moriah. Sacrifice him there as a burnt offering on a mountain I will show you.'"
      },
      {
        title: "Abraham's Preparation",
        description: "Early the next morning Abraham got up and loaded his donkey. He took with him two of his servants and his son Isaac. When he had cut enough wood for the burnt offering, he set out for the place God had told him about.",
        verses: "Genesis 22:3",
        verseText: "Early the next morning Abraham got up and loaded his donkey. He took with him two of his servants and his son Isaac. When he had cut enough wood for the burnt offering, he set out for the place God had told him about."
      },
      {
        title: "The Third Day",
        description: "On the third day Abraham looked up and saw the place in the distance. He said to his servants, 'Stay here with the donkey while I and the boy go over there. We will worship and then we will come back to you.'",
        verses: "Genesis 22:4-5",
        verseText: "On the third day Abraham looked up and saw the place in the distance. He said to his servants, 'Stay here with the donkey while I and the boy go over there. We will worship and then we will come back to you.'"
      },
      {
        title: "Isaac Carries the Wood",
        description: "Abraham took the wood for the burnt offering and placed it on his son Isaac, and he himself carried the fire and the knife. As the two of them went on together, Isaac spoke up and said to his father Abraham, 'Father?' 'Yes, my son?' Abraham replied.",
        verses: "Genesis 22:6-7",
        verseText: "Abraham took the wood for the burnt offering and placed it on his son Isaac, and he himself carried the fire and the knife. As the two of them went on together, Isaac spoke up and said to his father Abraham, 'Father?' 'Yes, my son?' Abraham replied."
      },
      {
        title: "Isaac's Question",
        description: "'The fire and wood are here,' Isaac said, 'but where is the lamb for the burnt offering?' Abraham answered, 'God himself will provide the lamb for the burnt offering, my son.' And the two of them went on together.",
        verses: "Genesis 22:7-8",
        verseText: "'The fire and wood are here,' Isaac said, 'but where is the lamb for the burnt offering?' Abraham answered, 'God himself will provide the lamb for the burnt offering, my son.' And the two of them went on together."
      },
      {
        title: "Building the Altar",
        description: "When they reached the place God had told him about, Abraham built an altar there and arranged the wood on it. He bound his son Isaac and laid him on the altar, on top of the wood.",
        verses: "Genesis 22:9",
        verseText: "When they reached the place God had told him about, Abraham built an altar there and arranged the wood on it. He bound his son Isaac and laid him on the altar, on top of the wood."
      },
      {
        title: "Abraham Raises the Knife",
        description: "Then he reached out his hand and took the knife to slay his son. But the angel of the Lord called out to him from heaven, 'Abraham! Abraham!' 'Here I am,' he replied.",
        verses: "Genesis 22:10-11",
        verseText: "Then he reached out his hand and took the knife to slay his son. But the angel of the Lord called out to him from heaven, 'Abraham! Abraham!' 'Here I am,' he replied."
      },
      {
        title: "The Angel's Intervention",
        description: "'Do not lay a hand on the boy,' he said. 'Do not do anything to him. Now I know that you fear God, because you have not withheld from me your son, your only son.'",
        verses: "Genesis 22:12",
        verseText: "'Do not lay a hand on the boy,' he said. 'Do not do anything to him. Now I know that you fear God, because you have not withheld from me your son, your only son.'"
      },
      {
        title: "The Ram Provided",
        description: "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son.",
        verses: "Genesis 22:13",
        verseText: "Abraham looked up and there in a thicket he saw a ram caught by its horns. He went over and took the ram and sacrificed it as a burnt offering instead of his son."
      },
      {
        title: "The Lord Will Provide",
        description: "So Abraham called that place The Lord Will Provide. And to this day it is said, 'On the mountain of the Lord it will be provided.'",
        verses: "Genesis 22:14",
        verseText: "So Abraham called that place The Lord Will Provide. And to this day it is said, 'On the mountain of the Lord it will be provided.'"
      },
      {
        title: "God's Blessing",
        description: "The angel of the Lord called to Abraham from heaven a second time and said, 'I swear by myself, declares the Lord, that because you have done this and have not withheld your son, your only son, I will surely bless you and make your descendants as numerous as the stars in the sky and as the sand on the seashore.'",
        verses: "Genesis 22:15-17",
        verseText: "The angel of the Lord called to Abraham from heaven a second time and said, 'I swear by myself, declares the Lord, that because you have done this and have not withheld your son, your only son, I will surely bless you and make your descendants as numerous as the stars in the sky and as the sand on the seashore.'"
      },
      {
        title: "Promise of Victory",
        description: "Your descendants will take possession of the cities of their enemies, and through your offspring all nations on earth will be blessed, because you have obeyed me.",
        verses: "Genesis 22:17-18",
        verseText: "Your descendants will take possession of the cities of their enemies, and through your offspring all nations on earth will be blessed, because you have obeyed me."
      },
      {
        title: "Return to Beersheba",
        description: "Then Abraham returned to his servants, and they set off together for Beersheba. And Abraham stayed in Beersheba.",
        verses: "Genesis 22:19",
        verseText: "Then Abraham returned to his servants, and they set off together for Beersheba. And Abraham stayed in Beersheba."
      },
      {
        title: "Nahor's Sons",
        description: "Some time later Abraham was told, 'Milkah is also a mother; she has borne sons to your brother Nahor: Uz the firstborn, Buz his brother, Kemuel (the father of Aram), Kesed, Hazo, Pildash, Jidlaph and Bethuel.'",
        verses: "Genesis 22:20-22",
        verseText: "Some time later Abraham was told, 'Milkah is also a mother; she has borne sons to your brother Nahor: Uz the firstborn, Buz his brother, Kemuel (the father of Aram), Kesed, Hazo, Pildash, Jidlaph and Bethuel.'"
      },
      {
        title: "Rebekah's Birth",
        description: "Bethuel became the father of Rebekah. Milkah bore these eight sons to Abraham's brother Nahor. His concubine, whose name was Reumah, also had sons: Tebah, Gaham, Tahash and Maakah.",
        verses: "Genesis 22:23-24",
        verseText: "Bethuel became the father of Rebekah. Milkah bore these eight sons to Abraham's brother Nahor. His concubine, whose name was Reumah, also had sons: Tebah, Gaham, Tahash and Maakah."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 22 - Abraham Tested | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 22 with detailed explanations about Abraham's test, the sacrifice of Isaac, and God's provision of a ram." />
        <meta name="keywords" content="Genesis Chapter 22, Abraham tested, Isaac sacrifice, Mount Moriah, Bible study, Bible quiz, Genesis study guide, Abraham's faith" />
        <meta property="og:title" content="Genesis Chapter 22 - Abraham Tested | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 22 with detailed explanations about Abraham's test, the sacrifice of Isaac, and God's provision of a ram." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-22" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 22 - Abraham Tested | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 22 with detailed explanations about Abraham's test, the sacrifice of Isaac, and God's provision of a ram." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 22 - Abraham Tested',
          description: 'Study Genesis Chapter 22 with detailed explanations about Abraham\'s test, the sacrifice of Isaac, and God\'s provision of a ram.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-22'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-22-full")}
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
          <span className="font-medium text-gray-900">Chapter 22</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 22</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch22-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 22</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch22-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 22</CardDescription>
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
