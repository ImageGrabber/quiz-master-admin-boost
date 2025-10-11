import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter21Full() {
  const navigate = useNavigate();

  const chapterText = [
    {
      verse: 1,
      text: "Now the Lord was gracious to Sarah as he had said, and the Lord did for Sarah what he had promised."
    },
    {
      verse: 2,
      text: "Sarah became pregnant and bore a son to Abraham in his old age, at the very time God had promised him."
    },
    {
      verse: 3,
      text: "Abraham gave the name Isaac to the son Sarah bore him."
    },
    {
      verse: 4,
      text: "When his son Isaac was eight days old, Abraham circumcised him, as God commanded him."
    },
    {
      verse: 5,
      text: "Abraham was a hundred years old when his son Isaac was born to him."
    },
    {
      verse: 6,
      text: "Sarah said, \"God has brought me laughter, and everyone who hears about this will laugh with me.\""
    },
    {
      verse: 7,
      text: "And she added, \"Who would have said to Abraham that Sarah would nurse children? Yet I have borne him a son in his old age.\""
    },
    {
      verse: 8,
      text: "The child grew and was weaned, and on the day Isaac was weaned Abraham held a great feast."
    },
    {
      verse: 9,
      text: "But Sarah saw that the son whom Hagar the Egyptian had borne to Abraham was mocking,"
    },
    {
      verse: 10,
      text: "and she said to Abraham, \"Get rid of that slave woman and her son, for that woman's son will never share in the inheritance with my son Isaac.\""
    },
    {
      verse: 11,
      text: "The matter distressed Abraham greatly because it concerned his son."
    },
    {
      verse: 12,
      text: "But God said to him, \"Do not be so distressed about the boy and your slave woman. Listen to whatever Sarah tells you, because it is through Isaac that your offspring will be reckoned.\""
    },
    {
      verse: 13,
      text: "I will make the son of the slave into a nation also, because he is your offspring."
    },
    {
      verse: 14,
      text: "Early the next morning Abraham took some food and a skin of water and gave them to Hagar. He set them on her shoulders and then sent her off with the boy. She went on her way and wandered in the Desert of Beersheba."
    },
    {
      verse: 15,
      text: "When the water in the skin was gone, she put the boy under one of the bushes."
    },
    {
      verse: 16,
      text: "Then she went off and sat down about a bowshot away, for she thought, \"I cannot watch the boy die.\" And as she sat there, she began to sob."
    },
    {
      verse: 17,
      text: "God heard the boy crying, and the angel of God called to Hagar from heaven and said to her, \"What is the matter, Hagar? Do not be afraid; God has heard the boy crying as he lies there.\""
    },
    {
      verse: 18,
      text: "Lift the boy up and take him by the hand, for I will make him into a great nation."
    },
    {
      verse: 19,
      text: "Then God opened her eyes and she saw a well of water. So she went and filled the skin with water and gave the boy a drink."
    },
    {
      verse: 20,
      text: "God was with the boy as he grew up. He lived in the desert and became an archer."
    },
    {
      verse: 21,
      text: "While he was living in the Desert of Paran, his mother got a wife for him from Egypt."
    },
    {
      verse: 22,
      text: "At that time Abimelek and Phicol the commander of his forces said to Abraham, \"God is with you in everything you do.\""
    },
    {
      verse: 23,
      text: "Now swear to me here before God that you will not deal falsely with me or my children or my descendants. Show to me and the country where you now reside as a foreigner the same kindness I have shown to you."
    },
    {
      verse: 24,
      text: "Abraham said, \"I swear it.\""
    },
    {
      verse: 25,
      text: "Then Abraham complained to Abimelek about a well of water that Abimelek's servants had seized."
    },
    {
      verse: 26,
      text: "But Abimelek said, \"I don't know who has done this. You did not tell me, and I heard about it only today.\""
    },
    {
      verse: 27,
      text: "So Abraham brought sheep and cattle and gave them to Abimelek, and the two men made a treaty."
    },
    {
      verse: 28,
      text: "Abraham set apart seven ewe lambs from the flock,"
    },
    {
      verse: 29,
      text: "and Abimelek asked Abraham, \"What is the meaning of these seven ewe lambs you have set apart by themselves?\""
    },
    {
      verse: 30,
      text: "He replied, \"Accept these seven lambs from my hand as a witness that I dug this well.\""
    },
    {
      verse: 31,
      text: "So that place was called Beersheba, because the two men swore an oath there."
    },
    {
      verse: 32,
      text: "After the treaty had been made at Beersheba, Abimelek and Phicol the commander of his forces returned to the land of the Philistines."
    },
    {
      verse: 33,
      text: "Abraham planted a tamarisk tree in Beersheba, and there he called on the name of the Lord, the Eternal God."
    },
    {
      verse: 34,
      text: "And Abraham stayed in the land of the Philistines for a long time."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 21 - Full Text | Bible Quiz Study Guide</title>
        <meta name="description" content="Read the complete text of Genesis Chapter 21 - The Birth of Isaac, Hagar and Ishmael sent away, and the treaty at Beersheba." />
        <meta name="keywords" content="Genesis Chapter 21 full text, Isaac birth, Sarah, Hagar, Ishmael, Beersheba, Bible reading, Genesis study" />
        <meta property="og:title" content="Genesis Chapter 21 - Full Text | Bible Quiz Study Guide" />
        <meta property="og:description" content="Read the complete text of Genesis Chapter 21 - The Birth of Isaac, Hagar and Ishmael sent away, and the treaty at Beersheba." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-21-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 21 - Full Text | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Read the complete text of Genesis Chapter 21 - The Birth of Isaac, Hagar and Ishmael sent away, and the treaty at Beersheba." />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-white via-white/70 to-blue-50 shadow-sm">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
              Genesis Chapter 21
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              The Birth of Isaac
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Complete text of Genesis Chapter 21 with verse-by-verse reading.
            </p>
            <div className="mt-6 flex gap-4">
              <Button 
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-21")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                Study Guide
              </Button>
              <Button 
                onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}
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
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-21")}>
            Chapter 21
          </Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="font-medium text-gray-900">Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-21")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter 21 Study Guide
          </Button>
        </div>

        {/* Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 21 - The Birth of Isaac
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {chapterText.map((verse, idx) => (
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

        {/* Quiz Section */}
        <Card id="quiz-section" className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Test Your Knowledge</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch21-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch21-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
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
