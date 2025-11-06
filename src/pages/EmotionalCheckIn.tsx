import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, ArrowRight, BookOpen, Smile, AlertTriangle, Flame, Cloud, Meh, Sun } from "lucide-react";
import { Helmet } from 'react-helmet';

interface EmotionOption {
  id: string;
  label: string;
  emoji: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  verses: {
    reference: string;
    text: string;
    encouragement: string;
  }[];
}

const emotionOptions: EmotionOption[] = [
  {
    id: "very-anxious",
    label: "Very Anxious",
    emoji: "😰",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50/80 border-red-200 hover:bg-red-100/80",
    verses: [
      {
        reference: "Philippians 4:6-7",
        text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
        encouragement: "God invites you to bring your worries to Him. His peace is available to you right now, even in this moment of anxiety."
      },
      {
        reference: "1 Peter 5:7",
        text: "Cast all your anxiety on him because he cares for you.",
        encouragement: "You don't have to carry this burden alone. God cares deeply about what you're going through."
      }
    ]
  },
  {
    id: "stressed",
    label: "Stressed/Overwhelmed",
    emoji: "😫",
    icon: Flame,
    color: "text-orange-600",
    bgColor: "bg-orange-50/80 border-orange-200 hover:bg-orange-100/80",
    verses: [
      {
        reference: "Matthew 11:28-30",
        text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls.",
        encouragement: "Jesus offers you rest. Take a deep breath and remember that you can find peace in Him, even when life feels overwhelming."
      },
      {
        reference: "Isaiah 41:10",
        text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        encouragement: "You are not alone in this. God is with you, ready to strengthen and support you through this difficult time."
      }
    ]
  },
  {
    id: "sad",
    label: "Sad/Depressed",
    emoji: "😔",
    icon: Cloud,
    color: "text-blue-600",
    bgColor: "bg-blue-50/80 border-blue-200 hover:bg-blue-100/80",
    verses: [
      {
        reference: "Psalm 34:18",
        text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
        encouragement: "God is near to you in your pain. He sees your tears and wants to bring you comfort and healing."
      },
      {
        reference: "Psalm 30:5",
        text: "For his anger lasts only a moment, but his favor lasts a lifetime; weeping may stay for the night, but rejoicing comes in the morning.",
        encouragement: "This difficult season will not last forever. There is hope, and joy will come again. Hold on to that promise."
      }
    ]
  },
  {
    id: "okay",
    label: "Okay/Neutral",
    emoji: "😐",
    icon: Meh,
    color: "text-gray-600",
    bgColor: "bg-gray-50/80 border-gray-200 hover:bg-gray-100/80",
    verses: [
      {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.",
        encouragement: "Even in neutral moments, God has wonderful plans for you. Take this time to draw closer to Him and discover His purpose for your life."
      },
      {
        reference: "Psalm 46:10",
        text: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
        encouragement: "This is a perfect time to pause and reflect on God's presence in your life. He is always with you."
      }
    ]
  },
  {
    id: "good",
    label: "Good/Calm",
    emoji: "😊",
    icon: Smile,
    color: "text-green-600",
    bgColor: "bg-green-50/80 border-green-200 hover:bg-green-100/80",
    verses: [
      {
        reference: "Psalm 28:7",
        text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me. My heart leaps for joy, and with my song I praise him.",
        encouragement: "It's wonderful that you're feeling good! Remember to give thanks to God for this peaceful moment and trust in His continued care."
      },
      {
        reference: "James 1:17",
        text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.",
        encouragement: "This peace you're experiencing is a gift from God. Cherish it and use this time to grow closer to Him."
      }
    ]
  },
  {
    id: "great",
    label: "Great/Peaceful",
    emoji: "😌",
    icon: Sun,
    color: "text-purple-600",
    bgColor: "bg-purple-50/80 border-purple-200 hover:bg-purple-100/80",
    verses: [
      {
        reference: "Romans 15:13",
        text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
        encouragement: "This joy and peace you're experiencing comes from God! Let it overflow and share this blessing with others who may need encouragement."
      },
      {
        reference: "Philippians 4:4",
        text: "Rejoice in the Lord always. I will say it again: Rejoice!",
        encouragement: "This is a wonderful time to celebrate God's goodness! Use this positive energy to bless others and deepen your relationship with Him."
      }
    ]
  }
];

interface CBTQuestion {
  id: number;
  question: string;
  options: string[];
  thinkingTraps: { [key: number]: string[] }; // Maps option index to thinking trap types
}

const cbtQuestions: CBTQuestion[] = [
  {
    id: 1,
    question: "When something goes wrong, what's your first thought?",
    options: [
      "It's all my fault",
      "This always happens to me",
      "Things will work out eventually",
      "I can handle this"
    ],
    thinkingTraps: {
      0: ["self-blame", "personalization"],
      1: ["overgeneralization", "catastrophizing"],
      2: ["neutral"],
      3: ["neutral"]
    }
  },
  {
    id: 2,
    question: "How do you typically interpret negative events?",
    options: [
      "They will ruin everything",
      "It's a sign that bad things are coming",
      "It's just one event, not everything",
      "I can learn from this"
    ],
    thinkingTraps: {
      0: ["catastrophizing", "fortune-telling"],
      1: ["fortune-telling", "mental-filter"],
      2: ["neutral"],
      3: ["neutral"]
    }
  },
  {
    id: 3,
    question: "When you make a mistake, what goes through your mind?",
    options: [
      "I'm a failure",
      "Everyone will think less of me",
      "Mistakes are part of learning",
      "I'll do better next time"
    ],
    thinkingTraps: {
      0: ["all-or-nothing", "labeling"],
      1: ["mind-reading", "jumping-to-conclusions"],
      2: ["neutral"],
      3: ["neutral"]
    }
  },
  {
    id: 4,
    question: "How do you feel when others succeed and you don't?",
    options: [
      "I'm not good enough",
      "They're just lucky, I never get breaks",
      "Good for them, I'll keep trying",
      "Everyone has their own journey"
    ],
    thinkingTraps: {
      0: ["comparison", "self-blame"],
      1: ["overgeneralization", "mental-filter"],
      2: ["neutral"],
      3: ["neutral"]
    }
  }
];

interface ThinkingTrapInfo {
  name: string;
  description: string;
  verses: {
    reference: string;
    text: string;
    quote: string;
  }[];
}

const thinkingTrapsInfo: { [key: string]: ThinkingTrapInfo } = {
  "self-blame": {
    name: "Self-Blame",
    description: "You tend to take responsibility for things outside your control or blame yourself excessively.",
    verses: [
      {
        reference: "Romans 8:1",
        text: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
        quote: "You are not defined by your mistakes. God's grace is greater than any failure."
      },
      {
        reference: "Psalm 103:12",
        text: "As far as the east is from the west, so far has he removed our transgressions from us.",
        quote: "God has already forgiven you. It's time to forgive yourself."
      }
    ]
  },
  "overgeneralization": {
    name: "Overgeneralization",
    description: "You see a single negative event as a never-ending pattern of defeat.",
    verses: [
      {
        reference: "Lamentations 3:22-23",
        text: "Because of the Lord's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
        quote: "Each day is a fresh start. God's mercies are renewed every morning."
      },
      {
        reference: "Philippians 3:13-14",
        text: "Forgetting what is behind and straining toward what is ahead, I press on toward the goal.",
        quote: "Don't let past failures define your future. Press on with hope."
      }
    ]
  },
  "catastrophizing": {
    name: "Catastrophizing",
    description: "You expect the worst possible outcome and imagine disaster scenarios.",
    verses: [
      {
        reference: "Matthew 6:34",
        text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
        quote: "God gives you strength for today. Don't borrow tomorrow's worries."
      },
      {
        reference: "Isaiah 41:10",
        text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.",
        quote: "God is with you in every situation. His strength is greater than any challenge."
      }
    ]
  },
  "fortune-telling": {
    name: "Fortune-Telling",
    description: "You predict negative outcomes as if they're facts, expecting things to go badly.",
    verses: [
      {
        reference: "Jeremiah 29:11",
        text: "For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.",
        quote: "God has good plans for you. Trust in His timing and purpose."
      },
      {
        reference: "Proverbs 3:5-6",
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        quote: "Your future is in God's hands. Trust Him instead of fearing the unknown."
      }
    ]
  },
  "all-or-nothing": {
    name: "All-or-Nothing Thinking",
    description: "You see things in black and white categories, with no middle ground.",
    verses: [
      {
        reference: "2 Corinthians 12:9",
        text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.'",
        quote: "You don't have to be perfect. God's grace covers your weaknesses."
      },
      {
        reference: "Romans 3:23",
        text: "For all have sinned and fall short of the glory of God, and all are justified freely by his grace.",
        quote: "Everyone falls short sometimes. That's why we need God's grace."
      }
    ]
  },
  "labeling": {
    name: "Labeling",
    description: "You attach negative labels to yourself based on mistakes or failures.",
    verses: [
      {
        reference: "1 John 3:1",
        text: "See what great love the Father has lavished on us, that we should be called children of God!",
        quote: "You are a child of God, not defined by your mistakes. You are loved and valued."
      },
      {
        reference: "Ephesians 2:10",
        text: "For we are God's handiwork, created in Christ Jesus to do good works.",
        quote: "You are God's masterpiece. You are not your failures—you are His creation."
      }
    ]
  },
  "mind-reading": {
    name: "Mind-Reading",
    description: "You assume you know what others are thinking about you, usually negatively.",
    verses: [
      {
        reference: "1 Samuel 16:7",
        text: "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart.",
        quote: "God sees your heart, not what others might think. Focus on His opinion of you."
      },
      {
        reference: "Galatians 1:10",
        text: "Am I now trying to win the approval of human beings, or of God?",
        quote: "Seek God's approval, not people's. His opinion matters most."
      }
    ]
  },
  "mental-filter": {
    name: "Mental Filter",
    description: "You focus exclusively on negative details while filtering out positive aspects.",
    verses: [
      {
        reference: "Philippians 4:8",
        text: "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.",
        quote: "Focus on what's good and true. God has given you many blessings."
      },
      {
        reference: "Psalm 34:8",
        text: "Taste and see that the Lord is good; blessed is the one who takes refuge in him.",
        quote: "Look for God's goodness in your life. He has blessed you in many ways."
      }
    ]
  },
  "comparison": {
    name: "Comparison Trap",
    description: "You constantly compare yourself to others, always falling short.",
    verses: [
      {
        reference: "2 Corinthians 10:12",
        text: "We do not dare to classify or compare ourselves with some who commend themselves. When they measure themselves by themselves and compare themselves with themselves, they are not wise.",
        quote: "Comparing yourself to others steals your joy. You are uniquely created by God."
      },
      {
        reference: "Psalm 139:14",
        text: "I praise you because I am fearfully and wonderfully made; your works are wonderful, I know that full well.",
        quote: "You are wonderfully made. Your worth doesn't come from comparison but from God."
      }
    ]
  },
  "jumping-to-conclusions": {
    name: "Jumping to Conclusions",
    description: "You make negative interpretations without definite facts to support your conclusion.",
    verses: [
      {
        reference: "Proverbs 18:13",
        text: "To answer before listening—that is folly and shame.",
        quote: "Take time to gather facts before making assumptions. Truth brings freedom."
      },
      {
        reference: "James 1:19",
        text: "My dear brothers and sisters, take note of this: Everyone should be quick to listen, slow to speak and slow to become angry.",
        quote: "Be slow to judge and quick to understand. Give situations time to unfold."
      }
    ]
  },
  "personalization": {
    name: "Personalization",
    description: "You believe that everything others do or say is a reaction to you.",
    verses: [
      {
        reference: "Romans 12:3",
        text: "Do not think of yourself more highly than you ought, but rather think of yourself with sober judgment.",
        quote: "Not everything is about you. Others have their own struggles and concerns."
      },
      {
        reference: "1 Peter 5:7",
        text: "Cast all your anxiety on him because he cares for you.",
        quote: "Release the burden of taking everything personally. God cares for you."
      }
    ]
  }
};

export default function EmotionalCheckIn() {
  const navigate = useNavigate();
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionOption | null>(null);
  const [showEncouragement, setShowEncouragement] = useState(false);
  const [selectedVerse, setSelectedVerse] = useState<{ reference: string; text: string; encouragement: string } | null>(null);
  const [sliderValue, setSliderValue] = useState(2.5); // Start in the middle (0-5 scale)
  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [thinkingTrap, setThinkingTrap] = useState<string | null>(null);

  const handleEmotionSelect = (emotion: EmotionOption) => {
    setSelectedEmotion(emotion);
    // Select a random verse for this emotion
    const randomVerse = emotion.verses[Math.floor(Math.random() * emotion.verses.length)];
    setSelectedVerse(randomVerse);
    setShowEncouragement(true);
    
    // Store check-in in localStorage
    const checkInData = {
      emotion: emotion.id,
      date: new Date().toISOString(),
      verse: randomVerse.reference
    };
    localStorage.setItem('emotionalCheckIn', JSON.stringify(checkInData));
    localStorage.setItem('emotionalCheckInDate', new Date().toDateString());
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
    // Map slider value (0-5) to emotion index (0-5)
    const emotionIndex = Math.round(value);
    const emotion = emotionOptions[emotionIndex];
    setSelectedEmotion(emotion);
  };

  const handleSliderConfirm = () => {
    if (selectedEmotion) {
      // Go to questions instead of showing encouragement immediately
      setShowQuestions(true);
    }
  };

  const handleQuestionAnswer = (questionId: number, optionIndex: number) => {
    const newAnswers = { ...answers, [questionId]: optionIndex };
    setAnswers(newAnswers);
    
    // Move to next question or analyze results
    if (currentQuestionIndex < cbtQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, analyze with all answers
      setTimeout(() => {
        analyzeThinkingTraps(newAnswers);
      }, 300);
    }
  };

  const analyzeThinkingTraps = (allAnswers: { [key: number]: number } = answers) => {
    // Count thinking traps from answers
    const trapCounts: { [key: string]: number } = {};
    
    cbtQuestions.forEach((question) => {
      const answerIndex = allAnswers[question.id];
      if (answerIndex !== undefined && question.thinkingTraps[answerIndex]) {
        question.thinkingTraps[answerIndex].forEach(trap => {
          if (trap !== 'neutral') {
            trapCounts[trap] = (trapCounts[trap] || 0) + 1;
          }
        });
      }
    });

    // Find the most common thinking trap
    const sortedTraps = Object.entries(trapCounts).sort((a, b) => b[1] - a[1]);
    const primaryTrap = sortedTraps.length > 0 ? sortedTraps[0][0] : 'self-blame';
    
    setThinkingTrap(primaryTrap);
    
    // Get personalized verse and quote
    const trapInfo = thinkingTrapsInfo[primaryTrap];
    const randomVerse = trapInfo.verses[Math.floor(Math.random() * trapInfo.verses.length)];
    setSelectedVerse({
      reference: randomVerse.reference,
      text: randomVerse.text,
      encouragement: randomVerse.quote
    });
    
    setShowEncouragement(true);
    
    // Store check-in data with thinking trap info
    const checkInData = {
      emotion: selectedEmotion?.id,
      thinkingTrap: primaryTrap,
      date: new Date().toISOString(),
      verse: randomVerse.reference
    };
    localStorage.setItem('emotionalCheckIn', JSON.stringify(checkInData));
    localStorage.setItem('emotionalCheckInDate', new Date().toDateString());
  };

  // Get current emotion based on slider value
  const currentEmotionIndex = Math.round(sliderValue);
  const currentEmotion = emotionOptions[currentEmotionIndex];
  const CurrentIcon = currentEmotion.icon;
  
  // Update selected emotion when slider changes
  useEffect(() => {
    const index = Math.round(sliderValue);
    setSelectedEmotion(emotionOptions[index]);
  }, [sliderValue]);
  
  // Map color classes to hex values for border
  const getBorderColor = (colorClass: string) => {
    const colorMap: { [key: string]: string } = {
      'text-red-600': '#dc2626',
      'text-orange-600': '#ea580c',
      'text-blue-600': '#2563eb',
      'text-gray-600': '#4b5563',
      'text-green-600': '#16a34a',
      'text-purple-600': '#9333ea'
    };
    return colorMap[colorClass] || '#9333ea';
  };

  const handleContinue = () => {
    navigate("/");
  };

  // Show questions after slider confirmation
  if (showQuestions && !showEncouragement) {
    const currentQuestion = cbtQuestions[currentQuestionIndex];
    
    return (
      <>
        <Helmet>
          <title>Understanding Your Thoughts | CBT Anxiety Support</title>
          <meta name="description" content="Take a brief assessment to identify thinking patterns and receive personalized support." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center p-3 md:p-6 bg-white" style={{ minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
          <Card className="max-w-2xl w-full shadow-lg border-0 overflow-hidden flex flex-col" style={{ backgroundColor: '#fef9f0', maxHeight: '100vh' }}>
            <div className="p-5 md:p-8 text-center text-white flex-shrink-0" style={{ backgroundColor: '#7b7ff0' }}>
              <div className="flex items-center justify-center mb-2">
                <h1 className="text-2xl md:text-3xl font-urbanist font-semibold">
                  Understanding Your Thoughts
                </h1>
              </div>
              <p className="text-sm md:text-base font-urbanist font-light text-purple-100">
                Question {currentQuestionIndex + 1} of {cbtQuestions.length}
              </p>
            </div>

            <CardContent className="p-6 md:p-8 flex-1 overflow-y-auto">
              <div className="flex flex-col justify-center h-full">
                <div className="mb-6">
                  <h2 className="text-xl md:text-2xl font-urbanist font-semibold text-gray-900 mb-6 text-center">
                    {currentQuestion.question}
                  </h2>
                  
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuestionAnswer(currentQuestion.id, index)}
                        className="w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50/50 transition-all duration-300 bg-white"
                      >
                        <p className="font-urbanist font-light text-gray-700">
                          {option}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-6">
                  <div className="flex justify-center gap-2">
                    {cbtQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index < currentQuestionIndex
                            ? 'bg-purple-600 w-8'
                            : index === currentQuestionIndex
                            ? 'bg-purple-400 w-8'
                            : 'bg-gray-200 w-2'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  if (showEncouragement && selectedVerse && selectedEmotion && thinkingTrap) {
    const trapInfo = thinkingTrapsInfo[thinkingTrap];
    return (
      <>
        <Helmet>
          <title>Words of Encouragement | CBT Anxiety Support</title>
          <meta name="description" content="Receive encouragement and Bible verses to help you through difficult moments." />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center p-6 bg-white">
          <Card className="max-w-2xl w-full shadow-lg border-0 overflow-hidden" style={{ backgroundColor: '#fef9f0' }}>
            <div className={`${selectedEmotion.bgColor} p-6 text-center border-b`}>
              <div className="flex justify-center mb-4 animate-bounce">
                <div className="text-6xl">{selectedEmotion.emoji}</div>
              </div>
              <h2 className="text-2xl font-urbanist font-semibold text-gray-900 mb-2">
                Personalized Support for You
              </h2>
              <div className="bg-white/80 rounded-lg p-4 mt-4 mx-auto max-w-md">
                <p className="text-sm font-urbanist font-medium text-purple-700 mb-1">
                  Thinking Pattern Identified:
                </p>
                <p className="text-lg font-urbanist font-semibold text-gray-900">
                  {trapInfo.name}
                </p>
                <p className="text-xs font-urbanist font-light text-gray-600 mt-2">
                  {trapInfo.description}
                </p>
              </div>
            </div>
            
            <CardContent className="p-8">
              <div className="space-y-6">
                {/* Bible Verse */}
                <div className="rounded-lg p-6 border border-amber-200 shadow-sm" style={{ backgroundColor: '#fffaf0' }}>
                  <div className="flex items-start gap-3 mb-4">
                    <BookOpen className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-urbanist font-medium text-purple-600 mb-2">
                        {selectedVerse.reference}
                      </p>
                      <p className="text-lg font-urbanist font-light text-gray-800 leading-relaxed italic">
                        "{selectedVerse.text}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Encouragement Message */}
                <div className="rounded-lg p-6 border border-amber-200" style={{ backgroundColor: '#fff8e7' }}>
                  <div className="flex items-start gap-3">
                    <Heart className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-base font-urbanist font-light text-gray-700 leading-relaxed">
                        {selectedVerse.encouragement}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Breathing Exercise */}
                <div className="rounded-lg p-6 border border-amber-200" style={{ backgroundColor: '#fffaf0' }}>
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <h3 className="text-lg font-urbanist font-semibold text-gray-900">
                      Quick Breathing Exercise
                    </h3>
                  </div>
                  <p className="text-sm font-urbanist font-light text-gray-600 mb-4">
                    Take a moment to breathe deeply and find your center:
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm font-urbanist font-light text-gray-700">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 animate-pulse" style={{ backgroundColor: '#fff5d6' }}>
                        <span className="text-xl">4</span>
                      </div>
                      <span>Breathe In</span>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: '#fff8e7' }}>
                        <span className="text-xl">4</span>
                      </div>
                      <span>Hold</span>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2 animate-pulse" style={{ backgroundColor: '#fff5d6', animationDelay: '0.5s' }}>
                        <span className="text-xl">4</span>
                      </div>
                      <span>Breathe Out</span>
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <Button
                  onClick={handleContinue}
                  className="w-full text-white font-urbanist font-light py-6 text-lg shadow-md hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: '#9b9ef5' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7b7ff0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9b9ef5'}
                >
                  Continue to Home
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>How Are You Feeling Today? | CBT Anxiety Support</title>
        <meta name="description" content="Take a moment to check in with your emotions and receive personalized encouragement." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center p-3 md:p-6 bg-white" style={{ minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
        <Card className="max-w-3xl w-full shadow-lg border-0 overflow-hidden flex flex-col" style={{ backgroundColor: '#fef9f0', maxHeight: '100vh' }}>
          <div className="p-5 md:p-8 text-center text-white flex-shrink-0" style={{ backgroundColor: '#7b7ff0' }}>
            <div className="flex items-center justify-center mb-2 md:mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-urbanist font-semibold">
                How Are You Feeling Today?
              </h1>
            </div>
            <p className="text-lg md:text-xl font-urbanist font-light text-purple-100">
              Take a moment to check in with yourself. We're here to support you.
            </p>
          </div>

          <CardContent className="p-4 md:p-8 flex-1 overflow-y-auto flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-center">
              {/* Current Emotion Display */}
              <div className="mb-4 md:mb-8">
                <div className={`${currentEmotion.bgColor} border-2 rounded-xl p-8 md:p-10 transition-all duration-300`} style={{ borderColor: getBorderColor(currentEmotion.color) }}>
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-3 md:mb-4 transition-all duration-300 transform hover:scale-110">
                      <div className="text-8xl md:text-7xl lg:text-8xl">{currentEmotion.emoji}</div>
                    </div>
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-urbanist font-semibold ${currentEmotion.color} mb-2 md:mb-2`}>
                      {currentEmotion.label}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Slider */}
              <div className="mb-4 md:mb-8">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={sliderValue}
                    onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                    className="w-full h-5 md:h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, 
                        #f97316 0%, 
                        #ef4444 25%, 
                        #6b7280 40%, 
                        #3b82f6 60%, 
                        #22c55e 85%, 
                        #22c55e 100%)`
                    }}
                  />
                  <style>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #7b7ff0;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    transition: all 0.2s;
                  }
                  .slider::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                  }
                  .slider::-moz-range-thumb {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    background: #7b7ff0;
                    cursor: pointer;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                    transition: all 0.2s;
                  }
                  .slider::-moz-range-thumb:hover {
                    transform: scale(1.1);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                  }
                  `}</style>
                </div>
                
                {/* Slider Labels */}
                <div className="flex justify-between mt-3 text-sm md:text-base font-urbanist font-light text-gray-500">
                  <span>Very Anxious</span>
                  <span>Great/Peaceful</span>
                </div>
                
                {/* Instruction text below slider */}
                <p className="text-sm md:text-base font-urbanist font-light text-gray-600 text-center mt-3 md:mt-4">
                  Move the slider above to adjust how you're feeling
                </p>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center mt-4 md:mt-6 flex-shrink-0">
              <Button
                onClick={handleSliderConfirm}
                className="px-6 md:px-8 py-4 md:py-6 text-base md:text-lg font-urbanist font-light text-white shadow-md hover:shadow-lg transition-all duration-300 w-full md:w-auto"
                style={{ backgroundColor: '#9b9ef5' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#7b7ff0'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#9b9ef5'}
              >
                Continue with This Feeling
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
              </Button>
            </div>

            <div className="mt-3 md:mt-6 text-center flex-shrink-0">
              <p className="text-xs md:text-sm font-urbanist font-light text-gray-500">
                Your response is private and helps us provide you with personalized encouragement
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

