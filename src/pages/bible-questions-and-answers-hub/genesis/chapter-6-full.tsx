import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter6Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "When man began to multiply on the face of the land and daughters were born to them,"
    },
    {
      verse: "2", 
      text: "the sons of God saw that the daughters of man were attractive. And they took as their wives any they chose."
    },
    {
      verse: "3",
      text: "Then the Lord said, \"My Spirit shall not abide in man forever, for he is flesh: his days shall be 120 years.\""
    },
    {
      verse: "4",
      text: "The Nephilim were on the earth in those days, and also afterward, when the sons of God came in to the daughters of man and they bore children to them. These were the mighty men who were of old, the men of renown."
    },
    {
      verse: "5",
      text: "The Lord saw that the wickedness of man was great in the earth, and that every intention of the thoughts of his heart was only evil continually."
    },
    {
      verse: "6",
      text: "And the Lord regretted that he had made man on the earth, and it grieved him to his heart."
    },
    {
      verse: "7",
      text: "So the Lord said, \"I will blot out man whom I have created from the face of the land, man and animals and creeping things and birds of the heavens, for I am sorry that I have made them.\""
    },
    {
      verse: "8",
      text: "But Noah found favor in the eyes of the Lord."
    },
    {
      verse: "9",
      text: "These are the generations of Noah. Noah was a righteous man, blameless in his generation. Noah walked with God."
    },
    {
      verse: "10",
      text: "And Noah had three sons, Shem, Ham, and Japheth."
    },
    {
      verse: "11",
      text: "Now the earth was corrupt in God's sight, and the earth was filled with violence."
    },
    {
      verse: "12",
      text: "And God saw the earth, and behold, it was corrupt, for all flesh had corrupted their way on the earth."
    },
    {
      verse: "13",
      text: "And God said to Noah, \"I have determined to make an end of all flesh, for the earth is filled with violence through them. Behold, I will destroy them with the earth."
    },
    {
      verse: "14",
      text: "Make yourself an ark of gopher wood. Make rooms in the ark, and cover it inside and out with pitch."
    },
    {
      verse: "15",
      text: "This is how you are to make it: the length of the ark 300 cubits, its breadth 50 cubits, and its height 30 cubits."
    },
    {
      verse: "16",
      text: "Make a roof for the ark, and finish it to a cubit above, and set the door of the ark in its side. Make it with lower, second, and third decks."
    },
    {
      verse: "17",
      text: "For behold, I will bring a flood of waters upon the earth to destroy all flesh in which is the breath of life under heaven. Everything that is on the earth shall die."
    },
    {
      verse: "18",
      text: "But I will establish my covenant with you, and you shall come into the ark, you, your sons, your wife, and your sons' wives with you."
    },
    {
      verse: "19",
      text: "And of every living thing of all flesh, you shall bring two of every sort into the ark to keep them alive with you. They shall be male and female."
    },
    {
      verse: "20",
      text: "Of the birds according to their kinds, and of the animals according to their kinds, of every creeping thing of the ground, according to its kind, two of every sort shall come in to you to keep them alive."
    },
    {
      verse: "21",
      text: "Also take with you every sort of food that is eaten, and store it up. It shall serve as food for you and for them."
    },
    {
      verse: "22",
      text: "Noah did this; he did all that God commanded him."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 6 Full Text - Increasing Corruption & Noah and the Flood | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 6 text verse by verse. Full ESV translation of increasing corruption on earth, the Nephilim, God's decision to send the flood, and Noah's ark instructions." />
        <meta name="keywords" content="Genesis Chapter 6 full text, Bible reading, ESV translation, Noah's ark, flood, corruption, Nephilim, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 6 Full Text - Increasing Corruption & Noah and the Flood | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 6 text verse by verse. Full ESV translation of increasing corruption on earth, the Nephilim, God's decision to send the flood, and Noah's ark instructions." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-6-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 6 Full Text - Increasing Corruption & Noah and the Flood | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 6 text verse by verse. Full ESV translation of increasing corruption on earth, the Nephilim, God's decision to send the flood, and Noah's ark instructions." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 6 Full Text - Increasing Corruption & Noah and the Flood',
          description: 'Read the complete Genesis Chapter 6 text verse by verse. Full ESV translation of increasing corruption on earth, the Nephilim, God\'s decision to send the flood, and Noah\'s ark instructions.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-6-full'
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
              Genesis Chapter 6 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              Increasing Corruption on Earth & Noah and the Flood
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 6, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 6 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-6")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 6 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 22 verses</CardDescription>
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-6")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch6-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch6-advanced")}
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
