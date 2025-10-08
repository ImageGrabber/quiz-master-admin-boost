import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter9Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "And God blessed Noah and his sons and said to them, \"Be fruitful and multiply and fill the earth."
    },
    {
      verse: "2", 
      text: "The fear of you and the dread of you shall be upon every beast of the earth and upon every bird of the heavens, upon everything that creeps on the ground and all the fish of the sea. Into your hand they are delivered."
    },
    {
      verse: "3",
      text: "Every moving thing that lives shall be food for you. And as I gave you the green plants, I give you everything."
    },
    {
      verse: "4",
      text: "But you shall not eat flesh with its life, that is, its blood."
    },
    {
      verse: "5",
      text: "And for your lifeblood I will require a reckoning: from every beast I will require it and from man. From his fellow man I will require a reckoning for the life of man."
    },
    {
      verse: "6",
      text: "\"Whoever sheds the blood of man, by man shall his blood be shed, for God made man in his own image."
    },
    {
      verse: "7",
      text: "And you, be fruitful and multiply, increase greatly on the earth and multiply in it.\""
    },
    {
      verse: "8",
      text: "Then God said to Noah and to his sons with him,"
    },
    {
      verse: "9",
      text: "\"Behold, I establish my covenant with you and your offspring after you,"
    },
    {
      verse: "10",
      text: "and with every living creature that is with you, the birds, the livestock, and every beast of the earth with you, as many as came out of the ark; it is for every beast of the earth."
    },
    {
      verse: "11",
      text: "I establish my covenant with you, that never again shall all flesh be cut off by the waters of the flood, and never again shall there be a flood to destroy the earth.\""
    },
    {
      verse: "12",
      text: "And God said, \"This is the sign of the covenant that I make between me and you and every living creature that is with you, for all future generations:"
    },
    {
      verse: "13",
      text: "I have set my bow in the cloud, and it shall be a sign of the covenant between me and the earth."
    },
    {
      verse: "14",
      text: "When I bring clouds over the earth and the bow is seen in the clouds,"
    },
    {
      verse: "15",
      text: "I will remember my covenant that is between me and you and every living creature of all flesh. And the waters shall never again become a flood to destroy all flesh."
    },
    {
      verse: "16",
      text: "When the bow is in the clouds, I will see it and remember the everlasting covenant between God and every living creature of all flesh that is on the earth.\""
    },
    {
      verse: "17",
      text: "God said to Noah, \"This is the sign of the covenant that I have established between me and all flesh that is on the earth.\""
    },
    {
      verse: "18",
      text: "The sons of Noah who went forth from the ark were Shem, Ham, and Japheth. (Ham was the father of Canaan.)"
    },
    {
      verse: "19",
      text: "These three were the sons of Noah, and from these the people of the whole earth were dispersed."
    },
    {
      verse: "20",
      text: "Noah began to be a man of the soil, and he planted a vineyard."
    },
    {
      verse: "21",
      text: "He drank of the wine and became drunk and lay uncovered in his tent."
    },
    {
      verse: "22",
      text: "And Ham, the father of Canaan, saw the nakedness of his father and told his two brothers outside."
    },
    {
      verse: "23",
      text: "Then Shem and Japheth took a garment, laid it on both their shoulders, and walked backward and covered the nakedness of their father. Their faces were turned backward, and they did not see their father's nakedness."
    },
    {
      verse: "24",
      text: "When Noah awoke from his wine and knew what his youngest son had done to him,"
    },
    {
      verse: "25",
      text: "he said, \"Cursed be Canaan; a servant of servants shall he be to his brothers.\""
    },
    {
      verse: "26",
      text: "He also said, \"Blessed be the Lord, the God of Shem; and let Canaan be his servant."
    },
    {
      verse: "27",
      text: "May God enlarge Japheth, and let him dwell in the tents of Shem, and let Canaan be his servant.\""
    },
    {
      verse: "28",
      text: "After the flood Noah lived 350 years."
    },
    {
      verse: "29",
      text: "All the days of Noah were 950 years, and he died."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 9 Full Text - God's Covenant & Noah's Descendants | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 9 text verse by verse. Full ESV translation of God's covenant with Noah, the rainbow sign, and Noah's drunkenness with his sons." />
        <meta name="keywords" content="Genesis Chapter 9 full text, Bible reading, ESV translation, God's covenant, rainbow, Noah's drunkenness, Shem Ham Japheth, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 9 Full Text - God's Covenant & Noah's Descendants | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 9 text verse by verse. Full ESV translation of God's covenant with Noah, the rainbow sign, and Noah's drunkenness with his sons." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-9-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 9 Full Text - God's Covenant & Noah's Descendants | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 9 text verse by verse. Full ESV translation of God's covenant with Noah, the rainbow sign, and Noah's drunkenness with his sons." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 9 Full Text - God\'s Covenant & Noah\'s Descendants',
          description: 'Read the complete Genesis Chapter 9 text verse by verse. Full ESV translation of God\'s covenant with Noah, the rainbow sign, and Noah\'s drunkenness with his sons.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-9-full'
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
              Genesis Chapter 9 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              God's Covenant & Noah's Descendants
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 9, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 9 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-9")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 9 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 29 verses</CardDescription>
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-9")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch9-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch9-advanced")}
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
