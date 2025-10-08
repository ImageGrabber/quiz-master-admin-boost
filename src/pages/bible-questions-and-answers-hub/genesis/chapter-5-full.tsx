import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter5Full() {
  const navigate = useNavigate();

  const fullChapterText = [
    {
      verse: "1",
      text: "This is the book of the generations of Adam. When God created man, he made him in the likeness of God."
    },
    {
      verse: "2", 
      text: "Male and female he created them, and he blessed them and named them Man when they were created."
    },
    {
      verse: "3",
      text: "When Adam had lived 130 years, he fathered a son in his own likeness, after his image, and named him Seth."
    },
    {
      verse: "4",
      text: "The days of Adam after he fathered Seth were 800 years; and he had other sons and daughters."
    },
    {
      verse: "5",
      text: "Thus all the days that Adam lived were 930 years, and he died."
    },
    {
      verse: "6",
      text: "When Seth had lived 105 years, he fathered Enosh."
    },
    {
      verse: "7",
      text: "Seth lived after he fathered Enosh 807 years and had other sons and daughters."
    },
    {
      verse: "8",
      text: "Thus all the days of Seth were 912 years, and he died."
    },
    {
      verse: "9",
      text: "When Enosh had lived 90 years, he fathered Kenan."
    },
    {
      verse: "10",
      text: "Enosh lived after he fathered Kenan 815 years and had other sons and daughters."
    },
    {
      verse: "11",
      text: "Thus all the days of Enosh were 905 years, and he died."
    },
    {
      verse: "12",
      text: "When Kenan had lived 70 years, he fathered Mahalalel."
    },
    {
      verse: "13",
      text: "Kenan lived after he fathered Mahalalel 840 years and had other sons and daughters."
    },
    {
      verse: "14",
      text: "Thus all the days of Kenan were 910 years, and he died."
    },
    {
      verse: "15",
      text: "When Mahalalel had lived 65 years, he fathered Jared."
    },
    {
      verse: "16",
      text: "Mahalalel lived after he fathered Jared 830 years and had other sons and daughters."
    },
    {
      verse: "17",
      text: "Thus all the days of Mahalalel were 895 years, and he died."
    },
    {
      verse: "18",
      text: "When Jared had lived 162 years, he fathered Enoch."
    },
    {
      verse: "19",
      text: "Jared lived after he fathered Enoch 800 years and had other sons and daughters."
    },
    {
      verse: "20",
      text: "Thus all the days of Jared were 962 years, and he died."
    },
    {
      verse: "21",
      text: "When Enoch had lived 65 years, he fathered Methuselah."
    },
    {
      verse: "22",
      text: "Enoch walked with God after he fathered Methuselah 300 years and had other sons and daughters."
    },
    {
      verse: "23",
      text: "Thus all the days of Enoch were 365 years."
    },
    {
      verse: "24",
      text: "Enoch walked with God, and he was not, for God took him."
    },
    {
      verse: "25",
      text: "When Methuselah had lived 187 years, he fathered Lamech."
    },
    {
      verse: "26",
      text: "Methuselah lived after he fathered Lamech 782 years and had other sons and daughters."
    },
    {
      verse: "27",
      text: "Thus all the days of Methuselah were 969 years, and he died."
    },
    {
      verse: "28",
      text: "When Lamech had lived 182 years, he fathered a son"
    },
    {
      verse: "29",
      text: "and called his name Noah, saying, \"Out of the ground that the Lord has cursed, this one shall bring us relief from our work and from the painful toil of our hands.\""
    },
    {
      verse: "30",
      text: "Lamech lived after he fathered Noah 595 years and had other sons and daughters."
    },
    {
      verse: "31",
      text: "Thus all the days of Lamech were 777 years, and he died."
    },
    {
      verse: "32",
      text: "After Noah was 500 years old, Noah fathered Shem, Ham, and Japheth."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 5 Full Text - Adam's Descendants to Noah | ESV Translation</title>
        <meta name="description" content="Read the complete Genesis Chapter 5 text verse by verse. Full ESV translation of Adam's descendants through Noah, including the genealogy from Adam to Noah with ages and lifespans." />
        <meta name="keywords" content="Genesis Chapter 5 full text, Bible reading, ESV translation, Adam's descendants, genealogy, Noah, Bible study, scripture reading" />
        <meta property="og:title" content="Genesis Chapter 5 Full Text - Adam's Descendants to Noah | ESV Translation" />
        <meta property="og:description" content="Read the complete Genesis Chapter 5 text verse by verse. Full ESV translation of Adam's descendants through Noah, including the genealogy from Adam to Noah with ages and lifespans." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-5-full" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 5 Full Text - Adam's Descendants to Noah | ESV Translation" />
        <meta name="twitter:description" content="Read the complete Genesis Chapter 5 text verse by verse. Full ESV translation of Adam's descendants through Noah, including the genealogy from Adam to Noah with ages and lifespans." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 5 Full Text - Adam\'s Descendants to Noah',
          description: 'Read the complete Genesis Chapter 5 text verse by verse. Full ESV translation of Adam\'s descendants through Noah, including the genealogy from Adam to Noah with ages and lifespans.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-5-full'
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
              Genesis Chapter 5 - Full Text
            </h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">
              Adam's Descendants to Noah
            </p>
            <p className="text-base text-gray-600 mt-4 max-w-3xl">
              Read the complete text of Genesis Chapter 5, verse by verse, as it appears in the Bible.
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
          <span className="font-medium text-gray-900">Chapter 5 - Full Text</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-5")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Chapter Details
          </Button>
        </div>

        {/* Full Chapter Text */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Genesis Chapter 5 - Complete Text
            </CardTitle>
            <CardDescription>ESV Translation - All 32 verses</CardDescription>
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
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-5")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Chapter Details
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch5-beginner")}
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 rounded-lg font-semibold"
          >
            Take Beginner Quiz
          </Button>
          <Button 
            onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch5-advanced")}
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
