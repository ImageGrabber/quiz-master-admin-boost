import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter7Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "Then the Lord said to Noah, \"Go into the ark, you and all your household, for I have seen that you are righteous before me in this generation."
    },
    {
      verse: "2", 
      text: "Take with you seven pairs of all clean animals, the male and his mate, and a pair of the animals that are not clean, the male and his mate,"
    },
    {
      verse: "3",
      text: "and seven pairs of the birds of the heavens also, male and female, to keep their offspring alive on the face of all the earth."
    },
    {
      verse: "4",
      text: "For in seven days I will send rain on the earth forty days and forty nights, and every living thing that I have made I will blot out from the face of the ground.\""
    },
    {
      verse: "5",
      text: "And Noah did all that the Lord had commanded him."
    },
    {
      verse: "6",
      text: "Noah was six hundred years old when the flood of waters came upon the earth."
    },
    {
      verse: "7",
      text: "And Noah and his sons and his wife and his sons' wives with him went into the ark to escape the waters of the flood."
    },
    {
      verse: "8",
      text: "Of clean animals, and of animals that are not clean, and of birds, and of everything that creeps on the ground,"
    },
    {
      verse: "9",
      text: "two and two, male and female, went into the ark with Noah, as God had commanded Noah."
    },
    {
      verse: "10",
      text: "And after seven days the waters of the flood came upon the earth."
    },
    {
      verse: "11",
      text: "In the six hundredth year of Noah's life, in the second month, on the seventeenth day of the month, on that day all the fountains of the great deep burst forth, and the windows of the heavens were opened."
    },
    {
      verse: "12",
      text: "And rain fell upon the earth forty days and forty nights."
    },
    {
      verse: "13",
      text: "On the very same day Noah and his sons, Shem and Ham and Japheth, and Noah's wife and the three wives of his sons with them entered the ark,"
    },
    {
      verse: "14",
      text: "they and every beast, according to its kind, and all the livestock according to their kinds, and every creeping thing that creeps on the earth, according to its kind, and every bird, according to its kind, every winged creature."
    },
    {
      verse: "15",
      text: "They went into the ark with Noah, two and two of all flesh in which there was the breath of life."
    },
    {
      verse: "16",
      text: "And those that entered, male and female of all flesh, went in as God had commanded him. And the Lord shut him in."
    },
    {
      verse: "17",
      text: "The flood continued forty days on the earth. The waters increased and bore up the ark, and it rose high above the earth."
    },
    {
      verse: "18",
      text: "The waters prevailed and increased greatly on the earth, and the ark floated on the face of the waters."
    },
    {
      verse: "19",
      text: "And the waters prevailed so mightily on the earth that all the high mountains under the whole heaven were covered."
    },
    {
      verse: "20",
      text: "The waters prevailed above the mountains, covering them fifteen cubits deep."
    },
    {
      verse: "21",
      text: "And all flesh died that moved on the earth, birds, livestock, beasts, all swarming creatures that swarm on the earth, and all mankind."
    },
    {
      verse: "22",
      text: "Everything on the dry land in whose nostrils was the breath of life died."
    },
    {
      verse: "23",
      text: "He blotted out every living thing that was on the face of the ground, man and animals and creeping things and birds of the heavens. They were blotted out from the earth. Only Noah was left, and those who were with him in the ark."
    },
    {
      verse: "24",
      text: "And the waters prevailed on the earth 150 days."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 7 Full Text - The Flood | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 7 text verse by verse. Full ESV translation of Noah entering the ark, the flood beginning, and the destruction of all life on earth." />
        <meta name="keywords" content="Genesis Chapter 7 full text, Bible reading, ESV translation, Noah's flood, the flood, ark, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 7 Full Text - The Flood | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 7 text verse by verse. Full ESV translation of Noah entering the ark, the flood beginning, and the destruction of all life on earth." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-7-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 7 Full Text - The Flood | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 7 text verse by verse. Full ESV translation of Noah entering the ark, the flood beginning, and the destruction of all life on earth." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 7 Full Text - The Flood',
          description: 'Read the complete Genesis Chapter 7 text verse by verse. Full ESV translation of Noah entering the ark, the flood beginning, and the destruction of all life on earth.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-7-full'
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
              Genesis Chapter 7 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              The Flood
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 7, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 7 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-7")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 7 - Complete Text
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-7")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch7-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch7-advanced")}
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
