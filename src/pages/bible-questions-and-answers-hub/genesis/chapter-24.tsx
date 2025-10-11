import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronRight, Home, ArrowLeft } from "lucide-react";
import { Helmet } from 'react-helmet-async';
import Header from "@/components/Header";

export default function GenesisChapter24() {
  const navigate = useNavigate();

  const chapterDetails = {
    title: "Genesis Chapter 24",
    subtitle: "Isaac and Rebekah",
    description: "Abraham sends his servant to find a wife for Isaac, the servant's prayer and meeting with Rebekah, and Isaac's marriage to Rebekah.",
    keyPoints: [
      "Abraham sends servant to find Isaac a wife",
      "Servant's prayer and divine guidance",
      "Isaac marries Rebekah"
    ],
    detailedContent: [
      {
        title: "Abraham's Instructions",
        description: "Abraham was now very old, and the Lord had blessed him in every way. He said to the senior servant in his household, the one in charge of all that he had, 'Put your hand under my thigh. I want you to swear by the Lord, the God of heaven and the God of earth, that you will not get a wife for my son from the daughters of the Canaanites, among whom I am living, but will go to my country and my own relatives and get a wife for my son Isaac.'",
        verses: "Genesis 24:1-4",
        verseText: "Abraham was now very old, and the Lord had blessed him in every way. He said to the senior servant in his household, the one in charge of all that he had, 'Put your hand under my thigh. I want you to swear by the Lord, the God of heaven and the God of earth, that you will not get a wife for my son from the daughters of the Canaanites, among whom I am living, but will go to my country and my own relatives and get a wife for my son Isaac.'"
      },
      {
        title: "The Servant's Concern",
        description: "The servant asked him, 'What if the woman is unwilling to come back with me to this land? Shall I then take your son back to the country you came from?' 'Make sure that you do not take my son back there,' Abraham said.",
        verses: "Genesis 24:5-6",
        verseText: "The servant asked him, 'What if the woman is unwilling to come back with me to this land? Shall I then take your son back to the country you came from?' 'Make sure that you do not take my son back there,' Abraham said."
      },
      {
        title: "Abraham's Faith",
        description: "'The Lord, the God of heaven, who brought me out of my father's household and my native land and who spoke to me and promised me on oath, saying, 'To your offspring I will give this land'—he will send his angel before you so that you can get a wife for my son from there. If the woman is unwilling to come back with you, then you will be released from this oath of mine. Only do not take my son back there.'",
        verses: "Genesis 24:7-8",
        verseText: "'The Lord, the God of heaven, who brought me out of my father's household and my native land and who spoke to me and promised me on oath, saying, 'To your offspring I will give this land'—he will send his angel before you so that you can get a wife for my son from there. If the woman is unwilling to come back with you, then you will be released from this oath of mine. Only do not take my son back there.'"
      },
      {
        title: "The Oath",
        description: "So the servant put his hand under the thigh of his master Abraham and swore an oath to him concerning this matter.",
        verses: "Genesis 24:9",
        verseText: "So the servant put his hand under the thigh of his master Abraham and swore an oath to him concerning this matter."
      },
      {
        title: "The Journey",
        description: "Then the servant left, taking with him ten of his master's camels loaded with all kinds of good things from his master. He set out for Aram Naharaim and made his way to the town of Nahor. He had the camels kneel down near the well outside the town; it was toward evening, the time the women go out to draw water.",
        verses: "Genesis 24:10-11",
        verseText: "Then the servant left, taking with him ten of his master's camels loaded with all kinds of good things from his master. He set out for Aram Naharaim and made his way to the town of Nahor. He had the camels kneel down near the well outside the town; it was toward evening, the time the women go out to draw water."
      },
      {
        title: "The Servant's Prayer",
        description: "Then he prayed, 'Lord, God of my master Abraham, make me successful today, and show kindness to my master Abraham. See, I am standing beside this spring, and the daughters of the townspeople are coming out to draw water. May it be that when I say to a young woman, 'Please let down your jar that I may have a drink,' and she says, 'Drink, and I'll water your camels too'—let her be the one you have chosen for your servant Isaac. By this I will know that you have shown kindness to my master.'",
        verses: "Genesis 24:12-14",
        verseText: "Then he prayed, 'Lord, God of my master Abraham, make me successful today, and show kindness to my master Abraham. See, I am standing beside this spring, and the daughters of the townspeople are coming out to draw water. May it be that when I say to a young woman, 'Please let down your jar that I may have a drink,' and she says, 'Drink, and I'll water your camels too'—let her be the one you have chosen for your servant Isaac. By this I will know that you have shown kindness to my master.'"
      },
      {
        title: "Rebekah's Arrival",
        description: "Before he had finished praying, Rebekah came out with her jar on her shoulder. She was the daughter of Bethuel son of Milkah, who was the wife of Abraham's brother Nahor. The woman was very beautiful, a virgin; no man had ever slept with her. She went down to the spring, filled her jar and came up again.",
        verses: "Genesis 24:15-16",
        verseText: "Before he had finished praying, Rebekah came out with her jar on her shoulder. She was the daughter of Bethuel son of Milkah, who was the wife of Abraham's brother Nahor. The woman was very beautiful, a virgin; no man had ever slept with her. She went down to the spring, filled her jar and came up again."
      },
      {
        title: "The Test",
        description: "The servant hurried to meet her and said, 'Please give me a little water from your jar.' 'Drink, my lord,' she said, and quickly lowered the jar to her hands and gave him a drink. After she had given him a drink, she said, 'I'll draw water for your camels too, until they have had enough to drink.' So she quickly emptied her jar into the trough, ran back to the well to draw more water, and drew enough for all his camels.",
        verses: "Genesis 24:17-20",
        verseText: "The servant hurried to meet her and said, 'Please give me a little water from your jar.' 'Drink, my lord,' she said, and quickly lowered the jar to her hands and gave him a drink. After she had given him a drink, she said, 'I'll draw water for your camels too, until they have had enough to drink.' So she quickly emptied her jar into the trough, ran back to the well to draw more water, and drew enough for all his camels."
      },
      {
        title: "The Gifts",
        description: "When the camels had finished drinking, the man took out a gold nose ring weighing a beka and two gold bracelets weighing ten shekels. Then he asked, 'Whose daughter are you? Please tell me, is there room in your father's house for us to spend the night?'",
        verses: "Genesis 24:22-23",
        verseText: "When the camels had finished drinking, the man took out a gold nose ring weighing a beka and two gold bracelets weighing ten shekels. Then he asked, 'Whose daughter are you? Please tell me, is there room in your father's house for us to spend the night?'"
      },
      {
        title: "Rebekah's Response",
        description: "She answered him, 'I am the daughter of Bethuel, the son that Milkah bore to Nahor.' And she added, 'We have plenty of straw and fodder, as well as room for you to spend the night.'",
        verses: "Genesis 24:24-25",
        verseText: "She answered him, 'I am the daughter of Bethuel, the son that Milkah bore to Nahor.' And she added, 'We have plenty of straw and fodder, as well as room for you to spend the night.'"
      },
      {
        title: "The Servant's Worship",
        description: "Then the man bowed down and worshiped the Lord, saying, 'Praise be to the Lord, the God of my master Abraham, who has not abandoned his kindness and faithfulness to my master. As for me, the Lord has led me on the journey to the house of my master's relatives.'",
        verses: "Genesis 24:26-27",
        verseText: "Then the man bowed down and worshiped the Lord, saying, 'Praise be to the Lord, the God of my master Abraham, who has not abandoned his kindness and faithfulness to my master. As for me, the Lord has led me on the journey to the house of my master's relatives.'"
      },
      {
        title: "Laban's Welcome",
        description: "The young woman ran and told her mother's household about these things. Now Rebekah had a brother named Laban, and he hurried out to the man at the spring. As soon as he had seen the nose ring, and the bracelets on his sister's arms, and had heard Rebekah tell what the man said to her, he went out to the man and found him standing by the camels near the spring.",
        verses: "Genesis 24:28-30",
        verseText: "The young woman ran and told her mother's household about these things. Now Rebekah had a brother named Laban, and he hurried out to the man at the spring. As soon as he had seen the nose ring, and the bracelets on his sister's arms, and had heard Rebekah tell what the man said to her, he went out to the man and found him standing by the camels near the spring."
      },
      {
        title: "The Servant's Story",
        description: "So he said, 'I am Abraham's servant. The Lord has blessed my master abundantly, and he has become wealthy. He has given him sheep and cattle, silver and gold, male and female servants, and camels and donkeys. My master's wife Sarah has borne him a son in her old age, and he has given him everything he owns.'",
        verses: "Genesis 24:34-36",
        verseText: "So he said, 'I am Abraham's servant. The Lord has blessed my master abundantly, and he has become wealthy. He has given him sheep and cattle, silver and gold, male and female servants, and camels and donkeys. My master's wife Sarah has borne him a son in her old age, and he has given him everything he owns.'"
      },
      {
        title: "The Family's Consent",
        description: "Laban and Bethuel answered, 'This is from the Lord; we can say nothing to you one way or the other. Here is Rebekah; take her and go, and let her become the wife of your master's son, as the Lord has directed.'",
        verses: "Genesis 24:50-51",
        verseText: "Laban and Bethuel answered, 'This is from the Lord; we can say nothing to you one way or the other. Here is Rebekah; take her and go, and let her become the wife of your master's son, as the Lord has directed.'"
      },
      {
        title: "Rebekah's Decision",
        description: "So they called Rebekah and asked her, 'Will you go with this man?' 'I will go,' she said.",
        verses: "Genesis 24:57-58",
        verseText: "So they called Rebekah and asked her, 'Will you go with this man?' 'I will go,' she said."
      },
      {
        title: "The Meeting",
        description: "Now Isaac had come from Beer Lahai Roi, for he was living in the Negev. He went out to the field one evening to meditate, and as he looked up, he saw camels approaching. Rebekah also looked up and saw Isaac. She got down from her camel and asked the servant, 'Who is that man in the field coming to meet us?' 'He is my master,' the servant answered. So she took her veil and covered herself.",
        verses: "Genesis 24:62-65",
        verseText: "Now Isaac had come from Beer Lahai Roi, for he was living in the Negev. He went out to the field one evening to meditate, and as he looked up, he saw camels approaching. Rebekah also looked up and saw Isaac. She got down from her camel and asked the servant, 'Who is that man in the field coming to meet us?' 'He is my master,' the servant answered. So she took her veil and covered herself."
      },
      {
        title: "The Marriage",
        description: "Then the servant told Isaac all he had done. Isaac brought her into the tent of his mother Sarah, and he married Rebekah. So she became his wife, and he loved her; and Isaac was comforted after his mother's death.",
        verses: "Genesis 24:66-67",
        verseText: "Then the servant told Isaac all he had done. Isaac brought her into the tent of his mother Sarah, and he married Rebekah. So she became his wife, and he loved her; and Isaac was comforted after his mother's death."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>Genesis Chapter 24 - Isaac and Rebekah | Bible Quiz Study Guide</title>
        <meta name="description" content="Study Genesis Chapter 24 with detailed explanations about Abraham's servant finding a wife for Isaac, the meeting with Rebekah, and their marriage." />
        <meta name="keywords" content="Genesis Chapter 24, Isaac and Rebekah, Abraham's servant, marriage, Bible study, Bible quiz, Genesis study guide, divine guidance" />
        <meta property="og:title" content="Genesis Chapter 24 - Isaac and Rebekah | Bible Quiz Study Guide" />
        <meta property="og:description" content="Study Genesis Chapter 24 with detailed explanations about Abraham's servant finding a wife for Isaac, the meeting with Rebekah, and their marriage." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-24" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Genesis Chapter 24 - Isaac and Rebekah | Bible Quiz Study Guide" />
        <meta name="twitter:description" content="Study Genesis Chapter 24 with detailed explanations about Abraham's servant finding a wife for Isaac, the meeting with Rebekah, and their marriage." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Genesis Chapter 24 - Isaac and Rebekah',
          description: 'Study Genesis Chapter 24 with detailed explanations about Abraham\'s servant finding a wife for Isaac, the meeting with Rebekah, and their marriage.',
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
            '@id': 'https://biblequizcompetition.com/bible-questions-and-answers-hub/genesis/chapter-24'
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
                onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapter-24-full")}
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
          <span className="font-medium text-gray-900">Chapter 24</span>
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
            <CardDescription>Test your knowledge of Genesis Chapter 24</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch24-beginner")}>
                <CardHeader>
                  <CardTitle className="text-lg text-green-600">Beginner Quiz</CardTitle>
                  <CardDescription>10 basic questions about Genesis Chapter 24</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Beginner Quiz</Button>
                </CardContent>
              </Card>
              
              <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/ch24-advanced")}>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">Advanced Quiz</CardTitle>
                  <CardDescription>10 challenging questions about Genesis Chapter 24</CardDescription>
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
