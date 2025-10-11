import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter21() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 21",
    subtitle: "The Birth of Isaac",
    description: "The birth of Isaac, Hagar and Ishmael sent away, and the treaty at Beersheba.",
    keyPoints: [
      "Isaac born to Abraham and Sarah",
      "Hagar and Ishmael sent away",
      "Treaty at Beersheba with Abimelech"
    ],
    detailedContent: [
      {
        title: "The Birth of Isaac",
        description: "Now the Lord was gracious to Sarah as he had said, and the Lord did for Sarah what he had promised. Sarah became pregnant and bore a son to Abraham in his old age, at the very time God had promised him.",
        verses: "Genesis 21:1-2",
        verseText: "Now the Lord was gracious to Sarah as he had said, and the Lord did for Sarah what he had promised. Sarah became pregnant and bore a son to Abraham in his old age, at the very time God had promised him."
      },
      {
        title: "Isaac Named and Circumcised",
        description: "Abraham gave the name Isaac to the son Sarah bore him. When his son Isaac was eight days old, Abraham circumcised him, as God commanded him. Abraham was a hundred years old when his son Isaac was born to him.",
        verses: "Genesis 21:3-5",
        verseText: "Abraham gave the name Isaac to the son Sarah bore him. When his son Isaac was eight days old, Abraham circumcised him, as God commanded him. Abraham was a hundred years old when his son Isaac was born to him."
      },
      {
        title: "Sarah's Joy",
        description: "Sarah said, 'God has brought me laughter, and everyone who hears about this will laugh with me.' And she added, 'Who would have said to Abraham that Sarah would nurse children? Yet I have borne him a son in his old age.'",
        verses: "Genesis 21:6-7",
        verseText: "Sarah said, 'God has brought me laughter, and everyone who hears about this will laugh with me.' And she added, 'Who would have said to Abraham that Sarah would nurse children? Yet I have borne him a son in his old age.'"
      },
      {
        title: "Isaac Weaned",
        description: "The child grew and was weaned, and on the day Isaac was weaned Abraham held a great feast.",
        verses: "Genesis 21:8",
        verseText: "The child grew and was weaned, and on the day Isaac was weaned Abraham held a great feast."
      },
      {
        title: "Sarah's Demand",
        description: "But Sarah saw that the son whom Hagar the Egyptian had borne to Abraham was mocking, and she said to Abraham, 'Get rid of that slave woman and her son, for that woman's son will never share in the inheritance with my son Isaac.'",
        verses: "Genesis 21:9-10",
        verseText: "But Sarah saw that the son whom Hagar the Egyptian had borne to Abraham was mocking, and she said to Abraham, 'Get rid of that slave woman and her son, for that woman's son will never share in the inheritance with my son Isaac.'"
      },
      {
        title: "Abraham's Distress",
        description: "The matter distressed Abraham greatly because it concerned his son. But God said to him, 'Do not be so distressed about the boy and your slave woman. Listen to whatever Sarah tells you, because it is through Isaac that your offspring will be reckoned.'",
        verses: "Genesis 21:11-12",
        verseText: "The matter distressed Abraham greatly because it concerned his son. But God said to him, 'Do not be so distressed about the boy and your slave woman. Listen to whatever Sarah tells you, because it is through Isaac that your offspring will be reckoned.'"
      },
      {
        title: "God's Promise to Ishmael",
        description: "I will make the son of the slave into a nation also, because he is your offspring.",
        verses: "Genesis 21:13",
        verseText: "I will make the son of the slave into a nation also, because he is your offspring."
      },
      {
        title: "Hagar and Ishmael Sent Away",
        description: "Early the next morning Abraham took some food and a skin of water and gave them to Hagar. He set them on her shoulders and then sent her off with the boy. She went on her way and wandered in the Desert of Beersheba.",
        verses: "Genesis 21:14",
        verseText: "Early the next morning Abraham took some food and a skin of water and gave them to Hagar. He set them on her shoulders and then sent her off with the boy. She went on her way and wandered in the Desert of Beersheba."
      },
      {
        title: "Hagar's Despair",
        description: "When the water in the skin was gone, she put the boy under one of the bushes. Then she went off and sat down about a bowshot away, for she thought, 'I cannot watch the boy die.' And as she sat there, she began to sob.",
        verses: "Genesis 21:15-16",
        verseText: "When the water in the skin was gone, she put the boy under one of the bushes. Then she went off and sat down about a bowshot away, for she thought, 'I cannot watch the boy die.' And as she sat there, she began to sob."
      },
      {
        title: "God's Intervention",
        description: "God heard the boy crying, and the angel of God called to Hagar from heaven and said to her, 'What is the matter, Hagar? Do not be afraid; God has heard the boy crying as he lies there. Lift the boy up and take him by the hand, for I will make him into a great nation.'",
        verses: "Genesis 21:17-18",
        verseText: "God heard the boy crying, and the angel of God called to Hagar from heaven and said to her, 'What is the matter, Hagar? Do not be afraid; God has heard the boy crying as he lies there. Lift the boy up and take him by the hand, for I will make him into a great nation.'"
      },
      {
        title: "The Well of Water",
        description: "Then God opened her eyes and she saw a well of water. So she went and filled the skin with water and gave the boy a drink.",
        verses: "Genesis 21:19",
        verseText: "Then God opened her eyes and she saw a well of water. So she went and filled the skin with water and gave the boy a drink."
      },
      {
        title: "Ishmael Grows Up",
        description: "God was with the boy as he grew up. He lived in the desert and became an archer. While he was living in the Desert of Paran, his mother got a wife for him from Egypt.",
        verses: "Genesis 21:20-21",
        verseText: "God was with the boy as he grew up. He lived in the desert and became an archer. While he was living in the Desert of Paran, his mother got a wife for him from Egypt."
      },
      {
        title: "Abimelech's Request",
        description: "At that time Abimelek and Phicol the commander of his forces said to Abraham, 'God is with you in everything you do. Now swear to me here before God that you will not deal falsely with me or my children or my descendants. Show to me and the country where you now reside as a foreigner the same kindness I have shown to you.'",
        verses: "Genesis 21:22-23",
        verseText: "At that time Abimelek and Phicol the commander of his forces said to Abraham, 'God is with you in everything you do. Now swear to me here before God that you will not deal falsely with me or my children or my descendants. Show to me and the country where you now reside as a foreigner the same kindness I have shown to you.'"
      },
      {
        title: "The Treaty",
        description: "Abraham said, 'I swear it.' Then Abraham complained to Abimelek about a well of water that Abimelek's servants had seized. But Abimelek said, 'I don't know who has done this. You did not tell me, and I heard about it only today.'",
        verses: "Genesis 21:24-26",
        verseText: "Abraham said, 'I swear it.' Then Abraham complained to Abimelek about a well of water that Abimelek's servants had seized. But Abimelek said, 'I don't know who has done this. You did not tell me, and I heard about it only today.'"
      },
      {
        title: "The Seven Ewe Lambs",
        description: "So Abraham brought sheep and cattle and gave them to Abimelek, and the two men made a treaty. Abraham set apart seven ewe lambs from the flock, and Abimelek asked Abraham, 'What is the meaning of these seven ewe lambs you have set apart by themselves?'",
        verses: "Genesis 21:27-29",
        verseText: "So Abraham brought sheep and cattle and gave them to Abimelek, and the two men made a treaty. Abraham set apart seven ewe lambs from the flock, and Abimelek asked Abraham, 'What is the meaning of these seven ewe lambs you have set apart by themselves?'"
      },
      {
        title: "Beersheba Named",
        description: "He replied, 'Accept these seven lambs from my hand as a witness that I dug this well.' So that place was called Beersheba, because the two men swore an oath there.",
        verses: "Genesis 21:30-31",
        verseText: "He replied, 'Accept these seven lambs from my hand as a witness that I dug this well.' So that place was called Beersheba, because the two men swore an oath there."
      },
      {
        title: "Abraham's Worship",
        description: "After the treaty had been made at Beersheba, Abimelek and Phicol the commander of his forces returned to the land of the Philistines. Abraham planted a tamarisk tree in Beersheba, and there he called on the name of the Lord, the Eternal God. And Abraham stayed in the land of the Philistines for a long time.",
        verses: "Genesis 21:32-34",
        verseText: "After the treaty had been made at Beersheba, Abimelek and Phicol the commander of his forces returned to the land of the Philistines. Abraham planted a tamarisk tree in Beersheba, and there he called on the name of the Lord, the Eternal God. And Abraham stayed in the land of the Philistines for a long time."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 21 - The Birth of Isaac | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 21 with detailed explanations about the birth of Isaac, Hagar and Ishmael sent away, and the treaty at Beersheba." />
        <meta name="keywords" content="Genesis Chapter 21, Isaac birth, Sarah, Hagar, Ishmael, Beersheba treaty, Bible study, Bible quiz, Genesis study guide, Abraham" />
        <meta property="og:title" content="Genesis Chapter 21 - The Birth of Isaac | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 21 with detailed explanations about the birth of Isaac, Hagar and Ishmael sent away, and the treaty at Beersheba." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-21" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 21 - The Birth of Isaac | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 21 with detailed explanations about the birth of Isaac, Hagar and Ishmael sent away, and the treaty at Beersheba." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 21 - The Birth of Isaac',
          description: 'Study Genesis Chapter 21 with detailed explanations about the birth of Isaac, Hagar and Ishmael sent away, and the treaty at Beersheba.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-21'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-21-full")}
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
          <span className="font-medium text-gray-900">Chapter 21</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 21</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch21-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 21</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch21-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 21</CardDescription>
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
