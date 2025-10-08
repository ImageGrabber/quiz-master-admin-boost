import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter3Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "Now the serpent was more crafty than any other beast of the field that the LORD God had made. He said to the woman, 'Did God actually say, \"You shall not eat of any tree in the garden\"?'"
    },
    {
      verse: "2", 
      text: "And the woman said to the serpent, 'We may eat of the fruit of the trees in the garden,"
    },
    {
      verse: "3",
      text: "but God said, \"You shall not eat of the fruit of the tree that is in the midst of the garden, neither shall you touch it, lest you die.\"'"
    },
    {
      verse: "4",
      text: "But the serpent said to the woman, 'You will not surely die."
    },
    {
      verse: "5",
      text: "For God knows that when you eat of it your eyes will be opened, and you will be like God, knowing good and evil.'"
    },
    {
      verse: "6",
      text: "So when the woman saw that the tree was good for food, and that it was a delight to the eyes, and that the tree was to be desired to make one wise, she took of its fruit and ate, and she also gave some to her husband who was with her, and he ate."
    },
    {
      verse: "7",
      text: "Then the eyes of both were opened, and they knew that they were naked. And they sewed fig leaves together and made themselves loincloths."
    },
    {
      verse: "8",
      text: "And they heard the sound of the LORD God walking in the garden in the cool of the day, and the man and his wife hid themselves from the presence of the LORD God among the trees of the garden."
    },
    {
      verse: "9",
      text: "But the LORD God called to the man and said to him, 'Where are you?'"
    },
    {
      verse: "10",
      text: "And he said, 'I heard the sound of you in the garden, and I was afraid, because I was naked, and I hid myself.'"
    },
    {
      verse: "11",
      text: "He said, 'Who told you that you were naked? Have you eaten of the tree of which I commanded you not to eat?'"
    },
    {
      verse: "12",
      text: "The man said, 'The woman whom you gave to be with me, she gave me fruit of the tree, and I ate.'"
    },
    {
      verse: "13",
      text: "Then the LORD God said to the woman, 'What is this that you have done?' The woman said, 'The serpent deceived me, and I ate.'"
    },
    {
      verse: "14",
      text: "The LORD God said to the serpent, 'Because you have done this, cursed are you above all livestock and above all beasts of the field; on your belly you shall go, and dust you shall eat all the days of your life."
    },
    {
      verse: "15",
      text: "I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel.'"
    },
    {
      verse: "16",
      text: "To the woman he said, 'I will surely multiply your pain in childbearing; in pain you shall bring forth children. Your desire shall be for your husband, and he shall rule over you.'"
    },
    {
      verse: "17",
      text: "And to Adam he said, 'Because you have listened to the voice of your wife and have eaten of the tree of which I commanded you, \"You shall not eat of it,\" cursed is the ground because of you; in pain you shall eat of it all the days of your life;"
    },
    {
      verse: "18",
      text: "thorns and thistles it shall bring forth for you; and you shall eat the plants of the field."
    },
    {
      verse: "19",
      text: "By the sweat of your face you shall eat bread, till you return to the ground, for out of it you were taken; for you are dust, and to dust you shall return.'"
    },
    {
      verse: "20",
      text: "The man called his wife's name Eve, because she was the mother of all living."
    },
    {
      verse: "21",
      text: "And the LORD God made for Adam and for his wife garments of skins and clothed them."
    },
    {
      verse: "22",
      text: "Then the LORD God said, 'Behold, the man has become like one of us in knowing good and evil. Now, lest he reach out his hand and take also of the tree of life and eat, and live forever—'"
    },
    {
      verse: "23",
      text: "therefore the LORD God sent him out from the garden of Eden to work the ground from which he was taken."
    },
    {
      verse: "24",
      text: "He drove out the man, and at the east of the garden of Eden he placed the cherubim and a flaming sword that turned every way to guard the way to the tree of life."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 3 Full Text - Complete Bible Reading | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 3 text verse by verse. Full ESV translation of The Fall, the serpent's deception, and the expulsion from Eden. Perfect for Bible study and reference." />
        <meta name="keywords" content="Genesis Chapter 3 full text, Bible reading, ESV translation, The Fall, serpent deception, Adam and Eve, Genesis 3 complete, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 3 Full Text - Complete Bible Reading | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 3 text verse by verse. Full ESV translation of The Fall, the serpent's deception, and the expulsion from Eden." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-3-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 3 Full Text - Complete Bible Reading | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 3 text verse by verse. Full ESV translation of The Fall, the serpent's deception, and the expulsion from Eden." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 3 Full Text - Complete Bible Reading',
          description: 'Read the complete Genesis Chapter 3 text verse by verse. Full ESV translation of The Fall, the serpent\'s deception, and the expulsion from Eden.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-3-full'
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
              Genesis Chapter 3 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              The Fall & Expulsion from Eden
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 3, verse by verse, as it appears in the Bible.
            </p>
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
          <span className="font-medium text-gray-900">Chapter 3 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-3")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 3 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 24 verses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Section Header: The Fall */}
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h3 className="text-lg font-semibold text-red-800 mb-2">The Fall</h3>
                <div className="space-y-4">
                  {fullChapterText.map((verse, idx) => (
                    <div key={idx} className="flex gap-4 p-3 rounded-lg hover:bg-white/50 transition-colors">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                          {verse.verse}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 leading-relaxed">{verse.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-3")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch3-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch3-advanced")}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Advanced Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
