import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter1() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 1",
    subtitle: "Creation & Sabbath",
    description: "The account of God's creation of the heavens and earth in six days, culminating in the Sabbath rest.",
    keyPoints: [
      "Creation days 1–6 and Sabbath pattern",
      "Heavens and earth; light vs darkness", 
      "Image of God; mandate to rule and fill"
    ],
    detailedContent: [
      {
        day: "Day 1",
        title: "Light and Darkness",
        description: "God created light and separated it from darkness, calling the light 'day' and the darkness 'night'.",
        verses: "Genesis 1:1-5",
        verseText: "In the beginning, God created the heavens and the earth. The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters. And God said, 'Let there be light,' and there was light. And God saw that the light was good. And God separated the light from the darkness. God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day."
      },
      {
        day: "Day 2", 
        title: "Sky and Waters",
        description: "God separated the waters above from the waters below, creating the expanse called 'sky'.",
        verses: "Genesis 1:6-8",
        verseText: "And God said, 'Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.' And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so. And God called the expanse Heaven. And there was evening and there was morning, the second day."
      },
      {
        day: "Day 3",
        title: "Land and Vegetation", 
        description: "God gathered the waters to form seas and created dry land, then made vegetation and plants.",
        verses: "Genesis 1:9-13",
        verseText: "And God said, 'Let the waters under the heavens be gathered together into one place, and let the dry land appear.' And it was so. God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good. And God said, 'Let the earth sprout vegetation, plants yielding seed, and fruit trees bearing fruit in which is their seed, each according to its kind, on the earth.' And it was so. The earth brought forth vegetation, plants yielding seed according to their own kinds, and trees bearing fruit in which is their seed, each according to its kind. And God saw that it was good. And there was evening and there was morning, the third day."
      },
      {
        day: "Day 4",
        title: "Sun, Moon, and Stars",
        description: "God created the greater light (sun) to rule the day and lesser light (moon) to rule the night, plus stars.",
        verses: "Genesis 1:14-19",
        verseText: "And God said, 'Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years, and let them be lights in the expanse of the heavens to give light upon the earth.' And it was so. And God made the two great lights—the greater light to rule the day and the lesser light to rule the night—and the stars. And God set them in the expanse of the heavens to give light on the earth, to rule over the day and over the night, and to separate the light from the darkness. And God saw that it was good. And there was evening and there was morning, the fourth day."
      },
      {
        day: "Day 5",
        title: "Sea and Air Creatures",
        description: "God created sea creatures and birds, blessing them to be fruitful and multiply.",
        verses: "Genesis 1:20-23",
        verseText: "And God said, 'Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens.' So God created the great sea creatures and every living creature that moves, with which the waters swarm, according to their kinds, and every winged bird according to its kind. And God saw that it was good. And God blessed them, saying, 'Be fruitful and multiply and fill the waters in the seas, and let birds multiply on the earth.' And there was evening and there was morning, the fifth day."
      },
      {
        day: "Day 6",
        title: "Land Animals and Humans",
        description: "God created land animals, then made humans in His image to rule over all creation.",
        verses: "Genesis 1:24-31",
        verseText: "And God said, 'Let the earth bring forth living creatures according to their kinds—livestock and creeping things and beasts of the earth according to their kinds.' And it was so. And God made the beasts of the earth according to their kinds and the livestock according to their kinds, and everything that creeps on the ground according to its kind. And God saw that it was good. Then God said, 'Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth and over every creeping thing that creeps on the earth.' So God created man in his own image, in the image of God he created him; male and female he created them. And God blessed them. And God said to them, 'Be fruitful and multiply and fill the earth and subdue it, and have dominion over the fish of the sea and over the birds of the heavens and over every living thing that moves on the earth.' And God said, 'Behold, I have given you every plant yielding seed that is on the face of all the earth, and every tree with seed in its fruit. You shall have them for food. And to every beast of the earth and to every bird of the heavens and to everything that creeps on the earth, everything that has the breath of life, I have given every green plant for food.' And it was so. And God saw everything that he had made, and behold, it was very good. And there was evening and there was morning, the sixth day."
      },
      {
        day: "Day 7",
        title: "Sabbath Rest",
        description: "God rested from His work and blessed the seventh day, making it holy.",
        verses: "Genesis 2:1-3",
        verseText: "Thus the heavens and the earth were finished, and all the host of them. And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done. So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 1 - Creation & Sabbath | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 1 with detailed explanations, verses, and theological insights. Learn about the six days of creation, Sabbath rest, and God's image in humanity. Take quizzes to test your knowledge." />
        <meta name="keywords" content="Genesis Chapter 1, Creation, Bible study, Sabbath, God's image, creation days, Bible quiz, Genesis study guide" />
        <meta property="og:title" content="Genesis Chapter 1 - Creation & Sabbath | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 1 with detailed explanations, verses, and theological insights. Learn about the six days of creation, Sabbath rest, and God's image in humanity." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-1" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 1 - Creation & Sabbath | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 1 with detailed explanations, verses, and theological insights. Learn about the six days of creation, Sabbath rest, and God's image in humanity." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 1 - Creation & Sabbath',
          description: 'Study Genesis Chapter 1 with detailed explanations, verses, and theological insights. Learn about the six days of creation, Sabbath rest, and God\'s image in humanity.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-1'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-1-full")}
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
          <span className="font-medium text-gray-900">Chapter 1</span>
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

        {/* Theological Themes */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              Theological Themes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">God's Nature</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• God is eternal and pre-existent</li>
                  <li>• God speaks creation into existence</li>
                  <li>• God is purposeful and orderly</li>
                  <li>• God evaluates His work as "good"</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Human Dignity</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Created in God's image and likeness</li>
                  <li>• Given dominion over creation</li>
                  <li>• Blessed to be fruitful and multiply</li>
                  <li>• Provided with food and purpose</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Creation Pattern</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Six days of work, one day of rest</li>
                  <li>• Progressive development from simple to complex</li>
                  <li>• Each day builds on the previous</li>
                  <li>• Sabbath as the culmination</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">Trinity Hints</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• "Let us make man" (plural)</li>
                  <li>• Spirit hovering over waters</li>
                  <li>• God speaking creation into being</li>
                  <li>• Divine counsel and deliberation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {chapterDetails.detailedContent.map((content, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">{content.day}</CardTitle>
                <CardDescription className="font-semibold text-gray-800">{content.title}</CardDescription>
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
            <CardDescription>Test your knowledge of Genesis Chapter 1</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch1-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 1</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch1-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 1</CardDescription>
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
