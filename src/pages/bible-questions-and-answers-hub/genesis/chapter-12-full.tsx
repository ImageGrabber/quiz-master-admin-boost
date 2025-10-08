import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter12Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "Now the Lord said to Abram, \"Go from your country and your kindred and your father's house to the land that I will show you."
    },
    {
      verse: "2", 
      text: "And I will make of you a great nation, and I will bless you and make your name great, so that you will be a blessing."
    },
    {
      verse: "3",
      text: "I will bless those who bless you, and him who dishonors you I will curse, and in you all the families of the earth shall be blessed.\""
    },
    {
      verse: "4",
      text: "So Abram went, as the Lord had told him, and Lot went with him. Abram was seventy-five years old when he departed from Haran."
    },
    {
      verse: "5",
      text: "And Abram took Sarai his wife, and Lot his brother's son, and all their possessions that they had gathered, and the people that they had acquired in Haran, and they set out to go to the land of Canaan. When they came to the land of Canaan,"
    },
    {
      verse: "6",
      text: "Abram passed through the land to the place at Shechem, to the oak of Moreh. At that time the Canaanites were in the land."
    },
    {
      verse: "7",
      text: "Then the Lord appeared to Abram and said, \"To your offspring I will give this land.\" So he built there an altar to the Lord, who had appeared to him."
    },
    {
      verse: "8",
      text: "From there he moved to the hill country on the east of Bethel and pitched his tent, with Bethel on the west and Ai on the east. And there he built an altar to the Lord and called upon the name of the Lord."
    },
    {
      verse: "9",
      text: "And Abram journeyed on, still going toward the Negeb."
    },
    {
      verse: "10",
      text: "Now there was a famine in the land. So Abram went down to Egypt to sojourn there, for the famine was severe in the land."
    },
    {
      verse: "11",
      text: "When he was about to enter Egypt, he said to Sarai his wife, \"I know that you are a woman beautiful in appearance,"
    },
    {
      verse: "12",
      text: "and when the Egyptians see you, they will say, 'This is his wife.' Then they will kill me, but they will let you live."
    },
    {
      verse: "13",
      text: "Say you are my sister, that it may go well with me because of you, and that my life may be spared for your sake.\""
    },
    {
      verse: "14",
      text: "When Abram entered Egypt, the Egyptians saw that the woman was very beautiful."
    },
    {
      verse: "15",
      text: "And when the princes of Pharaoh saw her, they praised her to Pharaoh. And the woman was taken into Pharaoh's house."
    },
    {
      verse: "16",
      text: "And for her sake he dealt well with Abram; and he had sheep, oxen, male donkeys, male servants, female servants, female donkeys, and camels."
    },
    {
      verse: "17",
      text: "But the Lord afflicted Pharaoh and his house with great plagues because of Sarai, Abram's wife."
    },
    {
      verse: "18",
      text: "So Pharaoh called Abram and said, \"What is this you have done to me? Why did you not tell me that she was your wife?"
    },
    {
      verse: "19",
      text: "Why did you say, 'She is my sister,' so that I took her for my wife? Now then, here is your wife; take her, and go.\""
    },
    {
      verse: "20",
      text: "And Pharaoh gave men orders concerning him, and they sent him away with his wife and all that he had."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 12 Full Text - The Call of Abram | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 12 text verse by verse. Full ESV translation of God's call to Abram, the promise of blessing, and Abram's journey to Canaan and Egypt." />
        <meta name="keywords" content="Genesis Chapter 12 full text, Bible reading, ESV translation, Abram's call, God's promise, Canaan, Egypt, Sarai, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 12 Full Text - The Call of Abram | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 12 text verse by verse. Full ESV translation of God's call to Abram, the promise of blessing, and Abram's journey to Canaan and Egypt." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-12-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 12 Full Text - The Call of Abram | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 12 text verse by verse. Full ESV translation of God's call to Abram, the promise of blessing, and Abram's journey to Canaan and Egypt." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 12 Full Text - The Call of Abram',
          description: 'Read the complete Genesis Chapter 12 text verse by verse. Full ESV translation of God\'s call to Abram, the promise of blessing, and Abram\'s journey to Canaan and Egypt.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-12-full'
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
              Genesis Chapter 12 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              The Call of Abram
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 12, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 12 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-12")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 12 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 20 verses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {fullChapterText.map((verse, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
                      {verse.verse}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{verse.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-12")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch12-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch12-advanced")}
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
