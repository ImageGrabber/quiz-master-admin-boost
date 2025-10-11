import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, User, Calendar, CheckCircle, Globe, Home, Settings, Medal, Crown, Bolt, ArrowLeft, Book, Menu, Timer, Languages } from "lucide-react";
import { Helmet } from 'react-helmet';

// Romans-themed quiz questions
const romansQuizQuestions = [
  {
    id: 1,
    question: "Who wrote the book of Romans?",
    options: ["Peter", "Paul", "John", "James"],
    correct: 1,
    explanation: "The Apostle Paul wrote the book of Romans. It is one of his most important epistles."
  },
  {
    id: 2,
    question: "What is the main theme of Romans 8:28?",
    options: ["God's wrath", "All things work together for good", "The law", "Circumcision"],
    correct: 1,
    explanation: "Romans 8:28 states that all things work together for good for those who love God and are called according to His purpose."
  },
  {
    id: 3,
    question: "According to Romans 3:23, what have all people done?",
    options: ["Been saved", "Sinned and fall short of God's glory", "Been perfect", "Never sinned"],
    correct: 1,
    explanation: "Romans 3:23 states that all have sinned and fall short of the glory of God."
  },
  {
    id: 4,
    question: "What is the 'wages of sin' according to Romans 6:23?",
    options: ["Life", "Death", "Blessings", "Prosperity"],
    correct: 1,
    explanation: "Romans 6:23 states that the wages of sin is death, but the gift of God is eternal life."
  },
  {
    id: 5,
    question: "In Romans 5:8, when did Christ die for us?",
    options: ["When we were righteous", "When we were still sinners", "When we were perfect", "When we were good"],
    correct: 1,
    explanation: "Romans 5:8 states that God demonstrates his own love for us in this: While we were still sinners, Christ died for us."
  },
  {
    id: 6,
    question: "What does Romans 10:9 say about salvation?",
    options: ["It's impossible", "If you confess with your mouth and believe in your heart", "Only for Jews", "Only for Gentiles"],
    correct: 1,
    explanation: "Romans 10:9 states that if you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved."
  },
  {
    id: 7,
    question: "According to Romans 12:2, what should we not conform to?",
    options: ["God's will", "The pattern of this world", "The Bible", "Christ's example"],
    correct: 1,
    explanation: "Romans 12:2 states that we should not conform to the pattern of this world, but be transformed by the renewing of our mind."
  },
  {
    id: 8,
    question: "What does Romans 8:1 say about those in Christ Jesus?",
    options: ["They are condemned", "There is no condemnation", "They are perfect", "They are sinners"],
    correct: 1,
    explanation: "Romans 8:1 states that there is now no condemnation for those who are in Christ Jesus."
  },
  {
    id: 9,
    question: "In Romans 1:16, what is the gospel?",
    options: ["The power of God for salvation", "A weakness", "Just a story", "A myth"],
    correct: 0,
    explanation: "Romans 1:16 states that the gospel is the power of God for the salvation of everyone who believes."
  },
  {
    id: 10,
    question: "What does Romans 8:38-39 say about what can separate us from God's love?",
    options: ["Nothing", "Sin", "Death", "Life"],
    correct: 0,
    explanation: "Romans 8:38-39 states that nothing can separate us from the love of God that is in Christ Jesus our Lord."
  }
];

// Hindi translations
const romansQuizQuestionsHindi = [
  {
    id: 1,
    question: "रोमियों की पुस्तक किसने लिखी?",
    options: ["पतरस", "पौलुस", "यूहन्ना", "याकूब"],
    correct: 1,
    explanation: "प्रेरित पौलुस ने रोमियों की पुस्तक लिखी। यह उनके सबसे महत्वपूर्ण पत्रों में से एक है।"
  },
  {
    id: 2,
    question: "रोमियों 8:28 का मुख्य विषय क्या है?",
    options: ["परमेश्वर का क्रोध", "सब बातें मिलकर भलाई को काम करती हैं", "व्यवस्था", "खतना"],
    correct: 1,
    explanation: "रोमियों 8:28 कहता है कि सब बातें मिलकर भलाई को काम करती हैं उनके लिए जो परमेश्वर से प्रेम करते हैं और उसकी इच्छा के अनुसार बुलाए गए हैं।"
  },
  {
    id: 3,
    question: "रोमियों 3:23 के अनुसार, सभी लोगों ने क्या किया है?",
    options: ["बचाए गए हैं", "पाप किया है और परमेश्वर की महिमा से कम हैं", "सिद्ध हैं", "कभी पाप नहीं किया"],
    correct: 1,
    explanation: "रोमियों 3:23 कहता है कि सब ने पाप किया है और परमेश्वर की महिमा से रहित हैं।"
  },
  {
    id: 4,
    question: "रोमियों 6:23 के अनुसार, 'पाप की मजदूरी' क्या है?",
    options: ["जीवन", "मृत्यु", "आशीषें", "समृद्धि"],
    correct: 1,
    explanation: "रोमियों 6:23 कहता है कि पाप की मजदूरी मृत्यु है, परन्तु परमेश्वर का वरदान हमारे प्रभु मसीह यीशु में अनन्त जीवन है।"
  },
  {
    id: 5,
    question: "रोमियों 5:8 में, मसीह हमारे लिए कब मरा?",
    options: ["जब हम धर्मी थे", "जब हम अभी भी पापी थे", "जब हम सिद्ध थे", "जब हम अच्छे थे"],
    correct: 1,
    explanation: "रोमियों 5:8 कहता है कि परमेश्वर अपना प्रेम हम पर इस रीति से प्रगट करता है कि जब हम अभी भी पापी थे, तब मसीह हमारे लिए मरा।"
  },
  {
    id: 6,
    question: "रोमियों 10:9 मुक्ति के बारे में क्या कहता है?",
    options: ["यह असंभव है", "यदि तू अपने मुंह से यीशु को प्रभु जानकर अंगीकार करे", "केवल यहूदियों के लिए", "केवल अन्यजातियों के लिए"],
    correct: 1,
    explanation: "रोमियों 10:9 कहता है कि यदि तू अपने मुंह से यीशु को प्रभु जानकर अंगीकार करे और अपने मन से विश्वास करे कि परमेश्वर ने उसे मरे हुओं में से जिलाया, तो तू निश्चय उद्धार पाएगा।"
  },
  {
    id: 7,
    question: "रोमियों 12:2 के अनुसार, हमें किसके अनुरूप नहीं होना चाहिए?",
    options: ["परमेश्वर की इच्छा", "इस संसार के ढंग के अनुसार", "बाइबल", "मसीह के उदाहरण"],
    correct: 1,
    explanation: "रोमियों 12:2 कहता है कि इस संसार के ढंग के अनुसार न बनो, परन्तु अपने मन के नए हो जाने से तुम्हारा चालचलन बदलता जाए।"
  },
  {
    id: 8,
    question: "रोमियों 8:1 मसीह यीशु में रहने वालों के बारे में क्या कहता है?",
    options: ["वे दोषी हैं", "अब कोई दोष नहीं", "वे सिद्ध हैं", "वे पापी हैं"],
    correct: 1,
    explanation: "रोमियों 8:1 कहता है कि अब मसीह यीशु में रहने वालों पर कोई दोष नहीं।"
  },
  {
    id: 9,
    question: "रोमियों 1:16 में, सुसमाचार क्या है?",
    options: ["मुक्ति के लिए परमेश्वर की सामर्थ्य", "एक कमजोरी", "केवल एक कहानी", "एक कल्पना"],
    correct: 0,
    explanation: "रोमियों 1:16 कहता है कि सुसमाचार हर एक विश्वास करने वाले के लिए पहले यहूदी की, फिर यूनानी की भलाई के लिए परमेश्वर की सामर्थ्य है।"
  },
  {
    id: 10,
    question: "रोमियों 8:38-39 कहता है कि क्या हमें परमेश्वर के प्रेम से अलग कर सकता है?",
    options: ["कुछ नहीं", "पाप", "मृत्यु", "जीवन"],
    correct: 0,
    explanation: "रोमियों 8:38-39 कहता है कि मृत्यु, न जीवन, न स्वर्गदूत, न प्रधानताएं, न वर्तमान, न भविष्य, न कोई सामर्थ्य, न ऊंचाई, न गहराई, और न कोई और सृष्टि हमें परमेश्वर के प्रेम से अलग कर सकेगी जो हमारे प्रभु मसीह यीशु में है।"
  }
];

// Malayalam translations
const romansQuizQuestionsMalayalam = [
  {
    id: 1,
    question: "റോമാക്കാരുടെ പുസ്തകം ആരാണ് എഴുതിയത്?",
    options: ["പത്രോസ്", "പൗലോസ്", "യോഹന്നാൻ", "യാക്കോബ്"],
    correct: 1,
    explanation: "അപ്പോസ്തലനായ പൗലോസാണ് റോമാക്കാരുടെ പുസ്തകം എഴുതിയത്. ഇത് അദ്ദേഹത്തിന്റെ ഏറ്റവും പ്രധാനപ്പെട്ട ലേഖനങ്ങളിലൊന്നാണ്."
  },
  {
    id: 2,
    question: "റോമാക്കാർ 8:28-ന്റെ പ്രധാന വിഷയം എന്താണ്?",
    options: ["ദൈവത്തിന്റെ കോപം", "എല്ലാം ഒരുമിച്ച് നന്മയ്ക്ക് പ്രവർത്തിക്കുന്നു", "നിയമം", "ചർമ്മഛേദന"],
    correct: 1,
    explanation: "റോമാക്കാർ 8:28 പറയുന്നത് ദൈവത്തെ സ്നേഹിക്കുന്നവർക്കും അവന്റെ ഉദ്ദേശ്യപ്രകാരം വിളിക്കപ്പെട്ടവർക്കും എല്ലാം ഒരുമിച്ച് നന്മയ്ക്ക് പ്രവർത്തിക്കുന്നു എന്നാണ്."
  },
  {
    id: 3,
    question: "റോമാക്കാർ 3:23 അനുസരിച്ച്, എല്ലാ ആളുകളും എന്ത് ചെയ്തിരിക്കുന്നു?",
    options: ["രക്ഷിക്കപ്പെട്ടിരിക്കുന്നു", "പാപം ചെയ്ത് ദൈവത്തിന്റെ മഹത്വത്തിൽ നിന്ന് കുറവാണ്", "പൂർണ്ണമാണ്", "ഒരിക്കലും പാപം ചെയ്തിട്ടില്ല"],
    correct: 1,
    explanation: "റോമാക്കാർ 3:23 പറയുന്നത് എല്ലാവരും പാപം ചെയ്ത് ദൈവത്തിന്റെ മഹത്വത്തിൽ നിന്ന് കുറവാണ് എന്നാണ്."
  },
  {
    id: 4,
    question: "റോമാക്കാർ 6:23 അനുസരിച്ച്, 'പാപത്തിന്റെ കൂലി' എന്താണ്?",
    options: ["ജീവൻ", "മരണം", "ആശീർവാദങ്ങൾ", "സമൃദ്ധി"],
    correct: 1,
    explanation: "റോമാക്കാർ 6:23 പറയുന്നത് പാപത്തിന്റെ കൂലി മരണമാണ്, എന്നാൽ ദൈവത്തിന്റെ കാഴ്ച ക്രിസ്തു യേശുവിൽ നിത്യജീവനാണ് എന്നാണ്."
  },
  {
    id: 5,
    question: "റോമാക്കാർ 5:8-ൽ, ക്രിസ്തു നമുക്ക് വേണ്ടി എപ്പോൾ മരിച്ചു?",
    options: ["നാം നീതിമാന്മാരായിരിക്കുമ്പോൾ", "നാം ഇപ്പോഴും പാപികളായിരിക്കുമ്പോൾ", "നാം പൂർണ്ണമായിരിക്കുമ്പോൾ", "നാം നല്ലവരായിരിക്കുമ്പോൾ"],
    correct: 1,
    explanation: "റോമാക്കാർ 5:8 പറയുന്നത് ദൈവം തന്റെ സ്നേഹം നമ്മിൽ ഇങ്ങനെ പ്രകടിപ്പിക്കുന്നു: നാം ഇപ്പോഴും പാപികളായിരിക്കുമ്പോൾ ക്രിസ്തു നമുക്ക് വേണ്ടി മരിച്ചു എന്നാണ്."
  },
  {
    id: 6,
    question: "റോമാക്കാർ 10:9 രക്ഷയെക്കുറിച്ച് എന്ത് പറയുന്നു?",
    options: ["ഇത് അസാധ്യമാണ്", "നിങ്ങൾ നിങ്ങളുടെ വായ കൊണ്ട് യേശുവിനെ കർത്താവായി സ്വീകരിച്ച്", "യഹൂദന്മാർക്ക് മാത്രം", "അന്യജാതികൾക്ക് മാത്രം"],
    correct: 1,
    explanation: "റോമാക്കാർ 10:9 പറയുന്നത് നിങ്ങൾ നിങ്ങളുടെ വായ കൊണ്ട് യേശുവിനെ കർത്താവായി സ്വീകരിച്ച് നിങ്ങളുടെ ഹൃദയത്തിൽ ദൈവം അവനെ മരിച്ചവരിൽ നിന്ന് ഉയിർപ്പിച്ചു എന്ന് വിശ്വസിച്ചാൽ നിങ്ങൾ രക്ഷിക്കപ്പെടും എന്നാണ്."
  },
  {
    id: 7,
    question: "റോമാക്കാർ 12:2 അനുസരിച്ച്, നാം എന്തിനെ അനുസരിച്ച് രൂപപ്പെടരുത്?",
    options: ["ദൈവത്തിന്റെ ഇച്ഛ", "ഈ ലോകത്തിന്റെ രീതി", "ബൈബിൾ", "ക്രിസ്തുവിന്റെ ഉദാഹരണം"],
    correct: 1,
    explanation: "റോമാക്കാർ 12:2 പറയുന്നത് ഈ ലോകത്തിന്റെ രീതിയിൽ രൂപപ്പെടരുത്, എന്നാൽ നിങ്ങളുടെ മനസ്സ് പുതുക്കപ്പെട്ട് രൂപാന്തരപ്പെടുക എന്നാണ്."
  },
  {
    id: 8,
    question: "റോമാക്കാർ 8:1 ക്രിസ്തു യേശുവിൽ ഉള്ളവരെക്കുറിച്ച് എന്ത് പറയുന്നു?",
    options: ["അവർ കുറ്റക്കാരാണ്", "ഇനി ഒരു കുറ്റവും ഇല്ല", "അവർ പൂർണ്ണമാണ്", "അവർ പാപികളാണ്"],
    correct: 1,
    explanation: "റോമാക്കാർ 8:1 പറയുന്നത് ഇനി ക്രിസ്തു യേശുവിൽ ഉള്ളവർക്ക് ഒരു കുറ്റവും ഇല്ല എന്നാണ്."
  },
  {
    id: 9,
    question: "റോമാക്കാർ 1:16-ൽ, സുവിശേഷം എന്താണ്?",
    options: ["രക്ഷയ്ക്ക് ദൈവത്തിന്റെ ശക്തി", "ഒരു ബലഹീനത", "ഒരു കഥ മാത്രം", "ഒരു കല്പന"],
    correct: 0,
    explanation: "റോമാക്കാർ 1:16 പറയുന്നത് സുവിശേഷം എല്ലാ വിശ്വസിക്കുന്നവർക്കും ആദ്യം യഹൂദന്മാർക്ക്, പിന്നെ ഗ്രീക്കന്മാർക്കും രക്ഷയ്ക്ക് ദൈവത്തിന്റെ ശക്തിയാണ് എന്നാണ്."
  },
  {
    id: 10,
    question: "റോമാക്കാർ 8:38-39 പറയുന്നത് എന്താണ് നമ്മെ ദൈവത്തിന്റെ സ്നേഹത്തിൽ നിന്ന് വേർതിരിക്കാൻ കഴിയുമെന്ന്?",
    options: ["ഒന്നുമില്ല", "പാപം", "മരണം", "ജീവൻ"],
    correct: 0,
    explanation: "റോമാക്കാർ 8:38-39 പറയുന്നത് മരണം, ജീവൻ, ദൂതന്മാർ, അധികാരങ്ങൾ, വർത്തമാനം, ഭാവി, ശക്തികൾ, ഉയരം, ആഴം, അല്ലെങ്കിൽ മറ്റേതെങ്കിലും സൃഷ്ടി നമ്മെ ക്രിസ്തു യേശുവിൽ ഉള്ള ദൈവത്തിന്റെ സ്നേഹത്തിൽ നിന്ന് വേർതിരിക്കാൻ കഴിയില്ല എന്നാണ്."
  }
];

const TodaysQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<Array<{questionId: number, selected: number, correct: boolean}>>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi' | 'malayalam'>('english');
  const [showLanguageSelection, setShowLanguageSelection] = useState(true);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      // Time's up - auto submit
      handleSubmit();
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const currentQuestions = getCurrentQuestions();
      const isCorrect = selectedAnswer === currentQuestions[currentQuestion].correct;
      const newAnswers = [...answers, {
        questionId: currentQuestions[currentQuestion].id,
        selected: selectedAnswer,
        correct: isCorrect
      }];
      setAnswers(newAnswers);
      
      if (isCorrect) {
        setScore(score + 1);
      }

      if (currentQuestion < currentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      const currentQuestions = getCurrentQuestions();
      const isCorrect = selectedAnswer === currentQuestions[currentQuestion].correct;
      const newAnswers = [...answers, {
        questionId: currentQuestions[currentQuestion].id,
        selected: selectedAnswer,
        correct: isCorrect
      }];
      setAnswers(newAnswers);
      
      if (isCorrect) {
        setScore(score + 1);
      }
      setQuizCompleted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentQuestions = () => {
    switch (selectedLanguage) {
      case 'hindi': return romansQuizQuestionsHindi;
      case 'malayalam': return romansQuizQuestionsMalayalam;
      default: return romansQuizQuestions;
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / getCurrentQuestions().length) * 100;
    if (selectedLanguage === 'hindi') {
      if (percentage >= 90) return "उत्कृष्ट! आप रोमियों के विशेषज्ञ हैं!";
      if (percentage >= 80) return "बहुत बढ़िया! आप रोमियों को अच्छी तरह जानते हैं!";
      if (percentage >= 70) return "अच्छा काम! रोमियों का अध्ययन जारी रखें!";
      if (percentage >= 60) return "बुरा नहीं! रोमियों का और अध्ययन करें!";
      return "अध्ययन जारी रखें! रोमियों में बहुत कुछ है!";
    } else if (selectedLanguage === 'malayalam') {
      if (percentage >= 90) return "മികച്ചത്! നിങ്ങൾ റോമാക്കാരുടെ വിദഗ്ധനാണ്!";
      if (percentage >= 80) return "വളരെ നല്ലത്! നിങ്ങൾ റോമാക്കാരെ നന്നായി അറിയുന്നു!";
      if (percentage >= 70) return "നല്ല ജോലി! റോമാക്കാരുടെ പഠനം തുടരുക!";
      if (percentage >= 60) return "മോശമല്ല! റോമാക്കാരെ കൂടുതൽ പഠിക്കുക!";
      return "പഠനം തുടരുക! റോമാക്കാരിൽ വളരെയധികം ഉണ്ട്!";
    } else {
      if (percentage >= 90) return "Excellent! You're a Romans expert!";
      if (percentage >= 80) return "Great job! You know Romans well!";
      if (percentage >= 70) return "Good work! Keep studying Romans!";
      if (percentage >= 60) return "Not bad! Review Romans more!";
      return "Keep studying! Romans has much to offer!";
    }
  };

  const handleLanguageSelect = (language: 'english' | 'hindi' | 'malayalam') => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
  };

  // Language selection screen
  if (showLanguageSelection) {
    return (
      <>
        <Helmet>
          <title>Today's Quiz - Romans | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of the book of Romans with today's special quiz." />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 py-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-12 h-12 mr-3" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Today's Quiz - Romans
                  </h1>
                </div>
                <p className="text-xl text-gray-600 mb-8">Choose your preferred language to begin the quiz</p>
              </div>

              {/* Language Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-blue-500"
                  onClick={() => handleLanguageSelect('english')}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Languages className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">English</CardTitle>
                    <CardDescription>Take the quiz in English</CardDescription>
                  </CardHeader>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-green-500"
                  onClick={() => handleLanguageSelect('hindi')}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Languages className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">हिंदी</CardTitle>
                    <CardDescription>हिंदी में क्विज लें</CardDescription>
                  </CardHeader>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-purple-500"
                  onClick={() => handleLanguageSelect('malayalam')}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Languages className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">മലയാളം</CardTitle>
                    <CardDescription>മലയാളത്തിൽ ക്വിസ് എടുക്കുക</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Back to Home */}
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="px-8 py-3 text-lg"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / getCurrentQuestions().length) * 100);
    const getScoreColor = () => {
      if (percentage >= 90) return 'from-green-500 to-emerald-600';
      if (percentage >= 80) return 'from-blue-500 to-cyan-600';
      if (percentage >= 70) return 'from-yellow-500 to-orange-600';
      if (percentage >= 60) return 'from-orange-500 to-red-600';
      return 'from-red-500 to-pink-600';
    };

    return (
      <>
        <Helmet>
          <title>Today's Quiz - Romans | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of the book of Romans with today's special quiz." />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 py-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Header with celebration */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <div className="relative">
                    <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-12 h-12 mr-3" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Today's Quiz - Romans
                  </h1>
                </div>
                <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur border border-green-200 rounded-full shadow-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  <span className="text-lg font-semibold text-green-700">Quiz Completed!</span>
                </div>
              </div>

              {/* Results Card with enhanced design */}
              <Card className="mb-8 border-0 shadow-2xl bg-white/90 backdrop-blur">
                <CardHeader className="text-center pb-8">
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${getScoreColor()} flex items-center justify-center shadow-2xl`}>
                      <div className="text-white text-4xl font-bold">{percentage}%</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-3xl mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Your Results
                  </CardTitle>
                  
                  <div className="flex justify-center items-center gap-6 mb-6">
                    <div className="text-6xl font-bold text-blue-600">{score}</div>
                    <div className="text-3xl text-gray-400">/</div>
                    <div className="text-3xl text-gray-600">{getCurrentQuestions().length}</div>
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-800 mb-3">
                    {getScoreMessage()}
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-full max-w-md bg-gray-100 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor()} transition-all duration-1000 ease-out`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Question Review</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {answers.map((answer, index) => {
                      const question = getCurrentQuestions().find(q => q.id === answer.questionId);
                      return (
                        <div key={index} className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                          answer.correct 
                            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-green-100' 
                            : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300 shadow-red-100'
                        } shadow-lg`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-bold text-lg text-gray-800">Question {index + 1}</div>
                            {answer.correct ? (
                              <CheckCircle className="w-6 h-6 text-green-500" />
                            ) : (
                              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">✕</span>
                              </div>
                            )}
                          </div>
                          <div className="text-gray-700 mb-4 font-medium">{question?.question}</div>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <span className="font-semibold text-gray-600">Your answer: </span>
                              <span className={`font-medium ${answer.correct ? 'text-green-700' : 'text-red-700'}`}>
                                {question?.options[answer.selected]}
                              </span>
                            </div>
                            {!answer.correct && (
                              <div className="text-sm">
                                <span className="font-semibold text-gray-600">Correct answer: </span>
                                <span className="font-medium text-green-700">
                                  {question?.options[question.correct]}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Action buttons with enhanced design */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate('/')}
                >
                  <Home className="w-6 h-6 mr-3" />
                  Back to Home
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-10 py-4 text-lg font-bold rounded-xl border-3 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => window.location.reload()}
                >
                  <Play className="w-6 h-6 mr-3" />
                  Take Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Today's Quiz - Romans | Bible Quiz Competition</title>
        <meta name="description" content="Test your knowledge of the book of Romans with today's special quiz." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-12 h-12 mr-3" />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Today's Quiz - Romans
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-8">Test your knowledge of the book of Romans</p>
              
              {/* Enhanced Timer and Progress */}
              <div className="flex justify-center items-center gap-8 mb-8">
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur border-2 border-blue-200 rounded-2xl px-6 py-4 shadow-xl">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <Timer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-700">{formatTime(timeLeft)}</div>
                    <div className="text-sm text-blue-600 font-medium">Time Remaining</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur border-2 border-green-200 rounded-2xl px-6 py-4 shadow-xl">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">
                      {currentQuestion + 1} / {getCurrentQuestions().length}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Questions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl mb-4">
                  Question {currentQuestion + 1}
                </CardTitle>
                <CardDescription className="text-lg">
                  {getCurrentQuestions()[currentQuestion].question}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {getCurrentQuestions()[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                          selectedAnswer === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswer === index && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-lg">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-6 h-6 mr-2" />
                Back to Home
              </Button>
              
              <Button
                onClick={currentQuestion === getCurrentQuestions().length - 1 ? handleSubmit : handleNext}
                disabled={selectedAnswer === null}
                className={`px-10 py-4 text-lg font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedAnswer === null
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                {currentQuestion === getCurrentQuestions().length - 1 ? 'Submit Quiz' : 'Next Question'}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysQuiz;
