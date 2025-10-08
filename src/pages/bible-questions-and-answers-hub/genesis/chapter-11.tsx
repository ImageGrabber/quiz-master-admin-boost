import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter11() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 11",
    subtitle: "Tower of Babel",
    description: "The account of the Tower of Babel, the confusion of languages, and the genealogy from Shem to Abram.",
    keyPoints: [
      "Tower of Babel; language confusion",
      "Shem's genealogy to Terah",
      "Terah's family; Abram, Nahor, Haran"
    ],
    detailedContent: [
      {
        title: "The Tower of Babel",
        description: "The people built a tower to make a name for themselves, but God confused their language and scattered them.",
        verses: "Genesis 11:1-9",
        verseText: "Now the whole earth had one language and the same words. And as people migrated from the east, they found a plain in the land of Shinar and settled there. And they said to one another, 'Come, let us make bricks, and burn them thoroughly.' And they had brick for stone, and bitumen for mortar. Then they said, 'Come, let us build ourselves a city and a tower with its top in the heavens, and let us make a name for ourselves, lest we be dispersed over the face of the whole earth.' And the LORD came down to see the city and the tower, which the children of man had built. And the LORD said, 'Behold, they are one people, and they have all one language, and this is only the beginning of what they will do. And nothing that they propose to do will now be impossible for them. Come, let us go down and there confuse their language, so that they may not understand one another's speech.' So the LORD dispersed them from there over the face of all the earth, and they left off building the city. Therefore its name was called Babel, because there the LORD confused the language of all the earth. And from there the LORD dispersed them over the face of all the earth."
      },
      {
        title: "Shem's Genealogy",
        description: "The genealogy from Shem to Terah, showing the line that would lead to Abram.",
        verses: "Genesis 11:10-26",
        verseText: "These are the generations of Shem. When Shem was 100 years old, he fathered Arpachshad two years after the flood. And Shem lived after he fathered Arpachshad 500 years and had other sons and daughters. When Arpachshad had lived 35 years, he fathered Shelah. And Arpachshad lived after he fathered Shelah 403 years and had other sons and daughters. When Shelah had lived 30 years, he fathered Eber. And Shelah lived after he fathered Eber 403 years and had other sons and daughters. When Eber had lived 34 years, he fathered Peleg. And Eber lived after he fathered Peleg 430 years and had other sons and daughters. When Peleg had lived 30 years, he fathered Reu. And Peleg lived after he fathered Reu 209 years and had other sons and daughters. When Reu had lived 32 years, he fathered Serug. And Reu lived after he fathered Serug 207 years and had other sons and daughters. When Serug had lived 30 years, he fathered Nahor. And Serug lived after he fathered Nahor 200 years and had other sons and daughters. When Nahor had lived 29 years, he fathered Terah. And Nahor lived after he fathered Terah 119 years and had other sons and daughters. When Terah had lived 70 years, he fathered Abram, Nahor, and Haran."
      },
      {
        title: "Terah's Family",
        description: "Terah's family and their journey from Ur to Haran, setting the stage for Abram's call.",
        verses: "Genesis 11:27-32",
        verseText: "Now these are the generations of Terah. Terah fathered Abram, Nahor, and Haran; and Haran fathered Lot. Haran died in the presence of his father Terah in the land of his kindred, in Ur of the Chaldeans. And Abram and Nahor took wives. The name of Abram's wife was Sarai, and the name of Nahor's wife, Milcah, the daughter of Haran the father of Milcah and Iscah. Now Sarai was barren; she had no child. Terah took Abram his son and Lot the son of Haran, his grandson, and Sarai his daughter-in-law, his son Abram's wife, and they went forth together from Ur of the Chaldeans to go into the land of Canaan, but when they came to Haran, they settled there. The days of Terah were 205 years, and Terah died in Haran."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 11 - Tower of Babel | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 11 with detailed explanations about the Tower of Babel, the confusion of languages, and the genealogy from Shem to Abram." />
        <meta name="keywords" content="Genesis Chapter 11, Tower of Babel, Bible study, language confusion, Shem genealogy, Terah family, Bible quiz, Genesis study guide, Abram's ancestors" />
        <meta property="og:title" content="Genesis Chapter 11 - Tower of Babel | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 11 with detailed explanations about the Tower of Babel, the confusion of languages, and the genealogy from Shem to Abram." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-11" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 11 - Tower of Babel | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 11 with detailed explanations about the Tower of Babel, the confusion of languages, and the genealogy from Shem to Abram." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 11 - Tower of Babel',
          description: 'Study Genesis Chapter 11 with detailed explanations about the Tower of Babel, the confusion of languages, and the genealogy from Shem to Abram.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-11'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-11-full")}
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
          <span className="font-medium text-gray-900">Chapter 11</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 11</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch11-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 11</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch11-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 11</CardDescription>
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
