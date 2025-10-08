import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter14Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "In the days of Amraphel king of Shinar, Arioch king of Ellasar, Chedorlaomer king of Elam, and Tidal king of Goiim,"
    },
    {
      verse: "2", 
      text: "these kings made war with Bera king of Sodom, Birsha king of Gomorrah, Shinab king of Admah, Shemeber king of Zeboiim, and the king of Bela (that is, Zoar)."
    },
    {
      verse: "3",
      text: "And all these joined forces in the Valley of Siddim (that is, the Salt Sea)."
    },
    {
      verse: "4",
      text: "Twelve years they had served Chedorlaomer, but in the thirteenth year they rebelled."
    },
    {
      verse: "5",
      text: "In the fourteenth year Chedorlaomer and the kings who were with him came and defeated the Rephaim in Ashteroth-karnaim, the Zuzim in Ham, the Emim in Shaveh-kiriathaim,"
    },
    {
      verse: "6",
      text: "and the Horites in their hill country of Seir as far as El-paran on the border of the wilderness."
    },
    {
      verse: "7",
      text: "Then they turned back and came to En-mishpat (that is, Kadesh) and defeated all the country of the Amalekites, and also the Amorites who were dwelling in Hazazon-tamar."
    },
    {
      verse: "8",
      text: "Then the king of Sodom, the king of Gomorrah, the king of Admah, the king of Zeboiim, and the king of Bela (that is, Zoar) went out, and they joined battle in the Valley of Siddim"
    },
    {
      verse: "9",
      text: "with Chedorlaomer king of Elam, Tidal king of Goiim, Amraphel king of Shinar, and Arioch king of Ellasar, four kings against five."
    },
    {
      verse: "10",
      text: "Now the Valley of Siddim was full of bitumen pits, and as the kings of Sodom and Gomorrah fled, some fell into them, and the rest fled to the hill country."
    },
    {
      verse: "11",
      text: "So the enemy took all the possessions of Sodom and Gomorrah, and all their provisions, and went their way."
    },
    {
      verse: "12",
      text: "They also took Lot, the son of Abram's brother, who was dwelling in Sodom, and his possessions, and went their way."
    },
    {
      verse: "13",
      text: "Then one who had escaped came and told Abram the Hebrew, who was living by the oaks of Mamre the Amorite, brother of Eshcol and of Aner. These were allies of Abram."
    },
    {
      verse: "14",
      text: "When Abram heard that his kinsman had been taken captive, he led forth his trained men, born in his house, 318 of them, and went in pursuit as far as Dan."
    },
    {
      verse: "15",
      text: "And he divided his forces against them by night, he and his servants, and defeated them and pursued them to Hobah, north of Damascus."
    },
    {
      verse: "16",
      text: "Then he brought back all the possessions, and also brought back his kinsman Lot with his possessions, and the women and the people."
    },
    {
      verse: "17",
      text: "After his return from the defeat of Chedorlaomer and the kings who were with him, the king of Sodom went out to meet him at the Valley of Shaveh (that is, the King's Valley)."
    },
    {
      verse: "18",
      text: "And Melchizedek king of Salem brought out bread and wine. (He was priest of God Most High.)"
    },
    {
      verse: "19",
      text: "And he blessed him and said, \"Blessed be Abram by God Most High, Possessor of heaven and earth;"
    },
    {
      verse: "20",
      text: "and blessed be God Most High, who has delivered your enemies into your hand!\""
    },
    {
      verse: "21",
      text: "And Abram gave him a tenth of everything. And the king of Sodom said to Abram, \"Give me the persons, but take the goods for yourself.\""
    },
    {
      verse: "22",
      text: "But Abram said to the king of Sodom, \"I have lifted my hand to the Lord, God Most High, Possessor of heaven and earth,"
    },
    {
      verse: "23",
      text: "that I would not take a thread or a sandal strap or anything that is yours, lest you should say, 'I have made Abram rich.'"
    },
    {
      verse: "24",
      text: "I will take nothing but what the young men have eaten, and the share of the men who went with me. Let Aner, Eshcol, and Mamre take their share.\""
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 14 Full Text - Abram Rescues Lot & Melchizedek | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 14 text verse by verse. Full ESV translation of the war of the kings, Abram's rescue of Lot, and Melchizedek's blessing." />
        <meta name="keywords" content="Genesis Chapter 14 full text, Bible reading, ESV translation, war of kings, Abram rescues Lot, Melchizedek, tithe, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 14 Full Text - Abram Rescues Lot & Melchizedek | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 14 text verse by verse. Full ESV translation of the war of the kings, Abram's rescue of Lot, and Melchizedek's blessing." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-14-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 14 Full Text - Abram Rescues Lot & Melchizedek | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 14 text verse by verse. Full ESV translation of the war of the kings, Abram's rescue of Lot, and Melchizedek's blessing." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 14 Full Text - Abram Rescues Lot & Melchizedek',
          description: 'Read the complete Genesis Chapter 14 text verse by verse. Full ESV translation of the war of the kings, Abram\'s rescue of Lot, and Melchizedek\'s blessing.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-14-full'
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
              Genesis Chapter 14 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              Abram Rescues Lot & Melchizedek
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 14, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 14 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-14")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 14 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 24 verses</CardDescription>
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-14")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch14-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch14-advanced")}
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
