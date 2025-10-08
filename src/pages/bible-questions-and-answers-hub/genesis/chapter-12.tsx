import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter12() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 12",
    subtitle: "Abram's Call",
    description: "The call of Abram, his journey to Canaan, and his time in Egypt during a famine.",
    keyPoints: [
      "God calls Abram; leaves Haran",
      "Abram in Canaan; builds altars",
      "Famine; goes to Egypt; Sarai taken"
    ],
    detailedContent: [
      {
        title: "The Call of Abram",
        description: "The Lord called Abram to leave his country, people, and father's household to go to the land God would show him.",
        verses: "Genesis 12:1-3",
        verseText: "Now the LORD said to Abram, 'Go from your country and your kindred and your father's house to the land that I will show you. And I will make of you a great nation, and I will bless you and make your name great, so that you will be a blessing. I will bless those who bless you, and him who dishonors you I will curse, and in you all the families of the earth shall be blessed.'"
      },
      {
        title: "Abram's Journey",
        description: "Abram left Haran as the Lord had told him, taking his wife Sarai, his nephew Lot, and all their possessions.",
        verses: "Genesis 12:4-5",
        verseText: "So Abram went, as the LORD had told him, and Lot went with him. Abram was seventy-five years old when he departed from Haran. And Abram took Sarai his wife, and Lot his brother's son, and all their possessions that they had gathered, and the people that they had acquired in Haran, and they set out to go to the land of Canaan."
      },
      {
        title: "Arrival in Canaan",
        description: "Abram traveled through Canaan, and the Lord appeared to him, promising to give the land to his offspring.",
        verses: "Genesis 12:6-7",
        verseText: "Abram passed through the land to the place at Shechem, to the oak of Moreh. At that time the Canaanites were in the land. Then the LORD appeared to Abram and said, 'To your offspring I will give this land.' So he built there an altar to the LORD, who had appeared to him."
      },
      {
        title: "Building Altars",
        description: "Abram continued his journey, building altars to the Lord at Bethel and calling on the name of the Lord.",
        verses: "Genesis 12:8-9",
        verseText: "From there he moved to the hill country on the east of Bethel and pitched his tent, with Bethel on the west and Ai on the east. And there he built an altar to the LORD and called on the name of the LORD. And Abram journeyed on, still going toward the Negeb."
      },
      {
        title: "Famine and Egypt",
        description: "A famine came upon the land, so Abram went down to Egypt to sojourn there, fearing for his life because of Sarai's beauty.",
        verses: "Genesis 12:10-13",
        verseText: "Now there was a famine in the land. So Abram went down to Egypt to sojourn there, for the famine was severe in the land. When he was about to enter Egypt, he said to Sarai his wife, 'I know that you are a woman beautiful in appearance, and when the Egyptians see you, they will say, \"This is his wife.\" Then they will kill me, but they will let you live. Say you are my sister, that it may go well with me because of you, and that my life may be spared for your sake.'"
      },
      {
        title: "Sarai Taken by Pharaoh",
        description: "The Egyptians saw Sarai's beauty and took her into Pharaoh's house, while Abram was treated well because of her.",
        verses: "Genesis 12:14-16",
        verseText: "When Abram entered Egypt, the Egyptians saw that the woman was very beautiful. And when the princes of Pharaoh saw her, they praised her to Pharaoh. And the woman was taken into Pharaoh's house. And for her sake he dealt well with Abram; and he had sheep, oxen, male donkeys, male servants, female servants, female donkeys, and camels."
      },
      {
        title: "God's Intervention",
        description: "The Lord afflicted Pharaoh and his house with great plagues because of Sarai, and Pharaoh sent Abram away with all his possessions.",
        verses: "Genesis 12:17-20",
        verseText: "But the LORD afflicted Pharaoh and his house with great plagues because of Sarai, Abram's wife. So Pharaoh called Abram and said, 'What is this you have done to me? Why did you not tell me that she was your wife? Why did you say, \"She is my sister,\" so that I took her for my wife? Now then, here is your wife; take her, and go.' And Pharaoh gave men orders concerning him, and they sent him away with his wife and all that he had."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 12 - Abram's Call | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 12 with detailed explanations about Abram's call, his journey to Canaan, and his time in Egypt. Learn about God's promises to Abram and the covenant." />
        <meta name="keywords" content="Genesis Chapter 12, Abram's call, Bible study, Canaan journey, Egypt famine, Sarai taken, Bible quiz, Genesis study guide, Abraham's journey" />
        <meta property="og:title" content="Genesis Chapter 12 - Abram's Call | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 12 with detailed explanations about Abram's call, his journey to Canaan, and his time in Egypt. Learn about God's promises to Abram and the covenant." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-12" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 12 - Abram's Call | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 12 with detailed explanations about Abram's call, his journey to Canaan, and his time in Egypt. Learn about God's promises to Abram and the covenant." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 12 - Abram\'s Call',
          description: 'Study Genesis Chapter 12 with detailed explanations about Abram\'s call, his journey to Canaan, and his time in Egypt. Learn about God\'s promises to Abram and the covenant.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-12'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-12-full")}
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
          <span className="font-medium text-gray-900">Chapter 12</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 12</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch12-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 12</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch12-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 12</CardDescription>
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
