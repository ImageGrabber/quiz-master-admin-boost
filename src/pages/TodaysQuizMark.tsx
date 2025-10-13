import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trackQuizStart, trackQuizComplete, trackQuestionAnswer, trackQuizAbandon } from "@/utils/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, User, Calendar, CheckCircle, Globe, Home, Settings, Medal, Crown, Bolt, ArrowLeft, Book, Menu, Timer, Languages } from "lucide-react";
import { Helmet } from 'react-helmet';

// Mark-themed quiz questions
const markQuizQuestions = [
  {
    id: 1,
    question: "Who wrote the Gospel of Mark?",
    options: ["Peter", "Paul", "Mark", "John"],
    correct: 2,
    explanation: "Mark, also known as John Mark, wrote the Gospel of Mark. He was a companion of both Peter and Paul."
  },
  {
    id: 2,
    question: "What is the key theme of Mark's Gospel?",
    options: ["Jesus as a teacher", "Jesus as the suffering servant", "Jesus as a miracle worker only", "Jesus as a prophet only"],
    correct: 1,
    explanation: "Mark emphasizes Jesus as the suffering servant who came to serve and give his life as a ransom for many."
  },
  {
    id: 3,
    question: "What did Mark emphasize about Jesus' ministry?",
    options: ["Only teaching", "Action and service", "Only miracles", "Only parables"],
    correct: 1,
    explanation: "Mark's Gospel is action-packed, emphasizing Jesus' deeds and service rather than lengthy teachings."
  },
  {
    id: 4,
    question: "What is unique about Mark's Gospel structure?",
    options: ["It's the longest", "It's the shortest and most action-packed", "It has the most parables", "It focuses only on Jesus' birth"],
    correct: 1,
    explanation: "Mark's Gospel is the shortest and most action-packed, using 'immediately' frequently to show rapid movement."
  },
  {
    id: 5,
    question: "What did Mark emphasize about discipleship?",
    options: ["Easy following", "Costly following and service", "Only learning", "Only miracles"],
    correct: 1,
    explanation: "Mark emphasizes that true discipleship requires taking up one's cross and following Jesus in service."
  },
  {
    id: 6,
    question: "What is the 'Messianic Secret' in Mark's Gospel?",
    options: ["Jesus never revealed his identity", "Jesus told people not to reveal his identity", "Jesus was secretive about miracles", "Jesus hid from everyone"],
    correct: 1,
    explanation: "Mark shows Jesus often telling people not to reveal his identity, especially after miracles and healings."
  },
  {
    id: 7,
    question: "What did Mark emphasize about Jesus' compassion?",
    options: ["He was harsh", "He had great compassion for the crowds", "He was indifferent", "He was selective"],
    correct: 1,
    explanation: "Mark frequently shows Jesus having compassion on the crowds and healing many people."
  },
  {
    id: 8,
    question: "What did Mark emphasize about the Kingdom of God?",
    options: ["It was not important", "It was central to Jesus' message", "It was limited", "It was irrelevant"],
    correct: 1,
    explanation: "Mark shows Jesus frequently teaching about the Kingdom of God and its nearness."
  },
  {
    id: 9,
    question: "What did Mark emphasize about faith?",
    options: ["Faith was not important", "Faith was essential for miracles and healing", "Faith was limited", "Faith was irrelevant"],
    correct: 1,
    explanation: "Mark shows Jesus frequently saying 'Your faith has made you well' and emphasizing the power of faith."
  },
  {
    id: 10,
    question: "What is Mark's message about Jesus' mission?",
    options: ["He was just a teacher", "He came to serve and give his life as a ransom", "He was just a prophet", "He was just a miracle worker"],
    correct: 1,
    explanation: "Mark 10:45 states that 'the Son of Man came not to be served but to serve, and to give his life as a ransom for many.'"
  }
];

// Hindi translations
const markQuizQuestionsHindi = [
  {
    id: 1,
    question: "मरकुस का सुसमाचार किसने लिखा?",
    options: ["पतरस", "पौलुस", "मरकुस", "यूहन्ना"],
    correct: 2,
    explanation: "मरकुस, जिसे यूहन्ना मरकुस भी कहा जाता है, ने मरकुस का सुसमाचार लिखा। वह पतरस और पौलुस दोनों का साथी था।"
  },
  {
    id: 2,
    question: "मरकुस के सुसमाचार का मुख्य विषय क्या है?",
    options: ["यीशु एक शिक्षक के रूप में", "यीशु दुख उठाने वाले सेवक के रूप में", "यीशु केवल एक चमत्कारी के रूप में", "यीशु केवल एक भविष्यद्वक्ता के रूप में"],
    correct: 1,
    explanation: "मरकुस यीशु को दुख उठाने वाले सेवक के रूप में जोर देता है जो सेवा करने और बहुतों के लिए फिरौती के रूप में अपना जीवन देने आया।"
  },
  {
    id: 3,
    question: "मरकुस ने यीशु की सेवकाई के बारे में क्या जोर दिया?",
    options: ["केवल शिक्षा", "कर्म और सेवा", "केवल चमत्कार", "केवल दृष्टांत"],
    correct: 1,
    explanation: "मरकुस का सुसमाचार क्रिया-प्रधान है, जो यीशु के कर्मों और सेवा पर जोर देता है न कि लंबी शिक्षाओं पर।"
  },
  {
    id: 4,
    question: "मरकुस के सुसमाचार की संरचना में क्या विशेष है?",
    options: ["यह सबसे लंबा है", "यह सबसे छोटा और सबसे क्रिया-प्रधान है", "इसमें सबसे अधिक दृष्टांत हैं", "यह केवल यीशु के जन्म पर केंद्रित है"],
    correct: 1,
    explanation: "मरकुस का सुसमाचार सबसे छोटा और सबसे क्रिया-प्रधान है, तेजी से आगे बढ़ने को दिखाने के लिए 'तुरंत' शब्द का बार-बार उपयोग करता है।"
  },
  {
    id: 5,
    question: "मरकुस ने शिष्यत्व के बारे में क्या जोर दिया?",
    options: ["आसान अनुसरण", "महंगा अनुसरण और सेवा", "केवल सीखना", "केवल चमत्कार"],
    correct: 1,
    explanation: "मरकुस जोर देता है कि सच्चे शिष्यत्व के लिए अपना क्रूस उठाना और सेवा में यीशु का अनुसरण करना आवश्यक है।"
  },
  {
    id: 6,
    question: "मरकुस के सुसमाचार में 'मसीही रहस्य' क्या है?",
    options: ["यीशु ने कभी अपनी पहचान नहीं बताई", "यीशु ने लोगों से अपनी पहचान न बताने को कहा", "यीशु चमत्कारों के बारे में गुप्त था", "यीशु सभी से छुपता था"],
    correct: 1,
    explanation: "मरकुस दिखाता है कि यीशु अक्सर लोगों से अपनी पहचान न बताने को कहता था, विशेष रूप से चमत्कारों और चंगाई के बाद।"
  },
  {
    id: 7,
    question: "मरकुस ने यीशु की दया के बारे में क्या जोर दिया?",
    options: ["वह कठोर थे", "उन्हें भीड़ पर बहुत दया थी", "वे उदासीन थे", "वे चयनात्मक थे"],
    correct: 1,
    explanation: "मरकुस बार-बार दिखाता है कि यीशु को भीड़ पर दया आती थी और वे बहुत लोगों को चंगा करते थे।"
  },
  {
    id: 8,
    question: "मरकुस ने परमेश्वर के राज्य के बारे में क्या जोर दिया?",
    options: ["यह महत्वपूर्ण नहीं था", "यह यीशु के संदेश का केंद्र था", "यह सीमित था", "यह अप्रासंगिक था"],
    correct: 1,
    explanation: "मरकुस दिखाता है कि यीशु बार-बार परमेश्वर के राज्य के बारे में शिक्षा देते थे और इसकी निकटता के बारे में बताते थे।"
  },
  {
    id: 9,
    question: "मरकुस ने विश्वास के बारे में क्या जोर दिया?",
    options: ["विश्वास महत्वपूर्ण नहीं था", "विश्वास चमत्कारों और चंगाई के लिए आवश्यक था", "विश्वास सीमित था", "विश्वास अप्रासंगिक था"],
    correct: 1,
    explanation: "मरकुस दिखाता है कि यीशु बार-बार कहते थे 'तुम्हारे विश्वास ने तुम्हें चंगा किया है' और विश्वास की शक्ति पर जोर देते थे।"
  },
  {
    id: 10,
    question: "मरकुस का यीशु के मिशन के बारे में क्या संदेश है?",
    options: ["वे केवल एक शिक्षक थे", "वे सेवा करने और बहुतों के लिए फिरौती के रूप में अपना जीवन देने आए", "वे केवल एक भविष्यद्वक्ता थे", "वे केवल एक चमत्कारी थे"],
    correct: 1,
    explanation: "मरकुस 10:45 कहता है कि 'मनुष्य का पुत्र सेवा खाने नहीं, वरन सेवा करने और बहुतों के लिए अपना प्राण फिरौती में देने आया है।'"
  }
];

// Malayalam translations
const markQuizQuestionsMalayalam = [
  {
    id: 1,
    question: "മാർക്കിന്റെ സുവിശേഷം ആരാണ് എഴുതിയത്?",
    options: ["പത്രോസ്", "പൗലോസ്", "മാർക്കോസ്", "യോഹന്നാൻ"],
    correct: 2,
    explanation: "മാർക്കോസ്, ജോൺ മാർക്കോസ് എന്നും അറിയപ്പെടുന്നു, മാർക്കിന്റെ സുവിശേഷം എഴുതി. അദ്ദേഹം പത്രോസിന്റെയും പൗലോസിന്റെയും കൂട്ടാളിയായിരുന്നു."
  },
  {
    id: 2,
    question: "മാർക്കിന്റെ സുവിശേഷത്തിന്റെ പ്രധാന വിഷയം എന്താണ്?",
    options: ["യേശു ഒരു ഗുരുവായി", "യേശു കഷ്ടപ്പെടുന്ന സേവകനായി", "യേശു ഒരു അത്ഭുതപ്രവർത്തകനായി മാത്രം", "യേശു ഒരു പ്രവാചകനായി മാത്രം"],
    correct: 1,
    explanation: "മാർക്കോസ് യേശുവിനെ കഷ്ടപ്പെടുന്ന സേവകനായി ഊന്നിപ്പറയുന്നു, അദ്ദേഹം സേവിക്കാനും ബഹുജനങ്ങൾക്ക് വേണ്ടി രക്ഷാവിലയായി തന്റെ ജീവൻ കൊടുക്കാനും വന്നു."
  },
  {
    id: 3,
    question: "മാർക്കോസ് യേശുവിന്റെ സേവനത്തെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["ഉപദേശം മാത്രം", "പ്രവർത്തനവും സേവനവും", "അത്ഭുതങ്ങൾ മാത്രം", "ഉപമകൾ മാത്രം"],
    correct: 1,
    explanation: "മാർക്കിന്റെ സുവിശേഷം പ്രവർത്തന-പ്രധാനമാണ്, ദീർഘമായ ഉപദേശങ്ങളേക്കാൾ യേശുവിന്റെ പ്രവർത്തനങ്ങളും സേവനവും ഊന്നിപ്പറയുന്നു."
  },
  {
    id: 4,
    question: "മാർക്കിന്റെ സുവിശേഷത്തിന്റെ ഘടനയിൽ എന്താണ് അദ്വിതീയം?",
    options: ["അത് ഏറ്റവും നീളമുള്ളതാണ്", "അത് ഏറ്റവും ചെറുതും പ്രവർത്തന-പ്രധാനവുമാണ്", "അതിൽ ഏറ്റവും കൂടുതൽ ഉപമകൾ ഉണ്ട്", "അത് യേശുവിന്റെ ജനനത്തിൽ മാത്രം കേന്ദ്രീകരിച്ചിരിക്കുന്നു"],
    correct: 1,
    explanation: "മാർക്കിന്റെ സുവിശേഷം ഏറ്റവും ചെറുതും പ്രവർത്തന-പ്രധാനവുമാണ്, വേഗത്തിൽ മുന്നോട്ട് പോകുന്നത് കാണിക്കാൻ 'ഉടനെ' എന്ന വാക്ക് പലപ്പോഴും ഉപയോഗിക്കുന്നു."
  },
  {
    id: 5,
    question: "മാർക്കോസ് ശിഷ്യത്വത്തെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["എളുപ്പമായ പിന്തുടരൽ", "വിലയേറിയ പിന്തുടരലും സേവനവും", "പഠനം മാത്രം", "അത്ഭുതങ്ങൾ മാത്രം"],
    correct: 1,
    explanation: "മാർക്കോസ് ഊന്നിപ്പറയുന്നത് യഥാർത്ഥ ശിഷ്യത്വത്തിന് തന്റെ കുരിശ് എടുക്കാനും സേവനത്തിൽ യേശുവിനെ പിന്തുടരാനും ആവശ്യമാണെന്നാണ്."
  },
  {
    id: 6,
    question: "മാർക്കിന്റെ സുവിശേഷത്തിൽ 'മെസ്സിയാനിക് രഹസ്യം' എന്താണ്?",
    options: ["യേശു തന്റെ ഐഡന്റിറ്റി ഒരിക്കലും വെളിപ്പെടുത്തിയില്ല", "യേശു ആളുകളോട് തന്റെ ഐഡന്റിറ്റി വെളിപ്പെടുത്തരുതെന്ന് പറഞ്ഞു", "യേശു അത്ഭുതങ്ങളെക്കുറിച്ച് രഹസ്യമായിരുന്നു", "യേശു എല്ലാവരിൽ നിന്നും മറഞ്ഞിരുന്നു"],
    correct: 1,
    explanation: "മാർക്കോസ് യേശു പലപ്പോഴും ആളുകളോട് തന്റെ ഐഡന്റിറ്റി വെളിപ്പെടുത്തരുതെന്ന് പറയുന്നത് കാണിക്കുന്നു, പ്രത്യേകിച്ച് അത്ഭുതങ്ങളുടെയും ചികിത്സയുടെയും ശേഷം."
  },
  {
    id: 7,
    question: "മാർക്കോസ് യേശുവിന്റെ കരുണയെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["അദ്ദേഹം കഠിനനായിരുന്നു", "അദ്ദേഹത്തിന് ജനക്കൂട്ടങ്ങളോട് വലിയ കരുണയുണ്ടായിരുന്നു", "അദ്ദേഹം ഉദാസീനനായിരുന്നു", "അദ്ദേഹം തിരഞ്ഞെടുപ്പുകാരനായിരുന്നു"],
    correct: 1,
    explanation: "മാർക്കോസ് യേശുവിന് ജനക്കൂട്ടങ്ങളോട് കരുണയുണ്ടായിരുന്നു, അദ്ദേഹം പല ആളുകളെയും ചികിത്സിച്ചിരുന്നു എന്ന് പലപ്പോഴും കാണിക്കുന്നു."
  },
  {
    id: 8,
    question: "മാർക്കോസ് ദൈവരാജ്യത്തെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["അത് പ്രധാനമല്ലായിരുന്നു", "അത് യേശുവിന്റെ സന്ദേശത്തിന്റെ കേന്ദ്രമായിരുന്നു", "അത് പരിമിതമായിരുന്നു", "അത് അപ്രസക്തമായിരുന്നു"],
    correct: 1,
    explanation: "മാർക്കോസ് യേശു പലപ്പോഴും ദൈവരാജ്യത്തെക്കുറിച്ച് ഉപദേശിക്കുന്നതും അതിന്റെ സമീപതയെക്കുറിച്ച് പറയുന്നതും കാണിക്കുന്നു."
  },
  {
    id: 9,
    question: "മാർക്കോസ് വിശ്വാസത്തെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["വിശ്വാസം പ്രധാനമല്ലായിരുന്നു", "വിശ്വാസം അത്ഭുതങ്ങൾക്കും ചികിത്സയ്ക്കും അത്യാവശ്യമായിരുന്നു", "വിശ്വാസം പരിമിതമായിരുന്നു", "വിശ്വാസം അപ്രസക്തമായിരുന്നു"],
    correct: 1,
    explanation: "മാർക്കോസ് യേശു പലപ്പോഴും 'നിന്റെ വിശ്വാസം നിന്നെ സുഖപ്പെടുത്തി' എന്ന് പറയുന്നതും വിശ്വാസത്തിന്റെ ശക്തിയെക്കുറിച്ച് ഊന്നിപ്പറയുന്നതും കാണിക്കുന്നു."
  },
  {
    id: 10,
    question: "മാർക്കോസിന്റെ യേശുവിന്റെ ദൗത്യത്തെക്കുറിച്ചുള്ള സന്ദേശം എന്താണ്?",
    options: ["അദ്ദേഹം ഒരു ഗുരുവായിരുന്നു മാത്രം", "അദ്ദേഹം സേവിക്കാനും ബഹുജനങ്ങൾക്ക് വേണ്ടി രക്ഷാവിലയായി തന്റെ ജീവൻ കൊടുക്കാനും വന്നു", "അദ്ദേഹം ഒരു പ്രവാചകനായിരുന്നു മാത്രം", "അദ്ദേഹം ഒരു അത്ഭുതപ്രവർത്തകനായിരുന്നു മാത്രം"],
    correct: 1,
    explanation: "മാർക്കോസ് 10:45 പറയുന്നത് 'മനുഷ്യപുത്രൻ സേവിക്കപ്പെടാനല്ല, സേവിക്കാനും ബഹുജനങ്ങൾക്ക് വേണ്ടി തന്റെ ജീവൻ രക്ഷാവിലയായി കൊടുക്കാനും വന്നു' എന്നാണ്."
  }
];

const TodaysQuizMark = () => {
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
      // Time's up - track abandonment and auto submit
      trackQuizAbandon('todays-quiz-mark', 'Today\'s Quiz - Mark', currentQuestion + 1);
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
      
      // Track question answer
      trackQuestionAnswer(
        'todays-quiz-mark',
        currentQuestions[currentQuestion].id.toString(),
        isCorrect,
        0 // Time spent on question (could be enhanced with actual timing)
      );
      
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
      
      // Track final question answer
      trackQuestionAnswer(
        'todays-quiz-mark',
        currentQuestions[currentQuestion].id.toString(),
        isCorrect,
        0 // Time spent on question (could be enhanced with actual timing)
      );
      
      if (isCorrect) {
        setScore(score + 1);
      }
      
      // Track quiz completion
      const timeSpent = 120 - timeLeft; // Calculate time spent
      trackQuizComplete(
        'todays-quiz-mark',
        'Today\'s Quiz - Mark',
        score + (isCorrect ? 1 : 0),
        currentQuestions.length,
        timeSpent,
        'mixed'
      );
      
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
      case 'hindi': return markQuizQuestionsHindi;
      case 'malayalam': return markQuizQuestionsMalayalam;
      default: return markQuizQuestions;
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / getCurrentQuestions().length) * 100;
    if (selectedLanguage === 'hindi') {
      if (percentage >= 90) return "उत्कृष्ट! आप मरकुस के विशेषज्ञ हैं!";
      if (percentage >= 80) return "बहुत बढ़िया! आप मरकुस को अच्छी तरह जानते हैं!";
      if (percentage >= 70) return "अच्छा काम! मरकुस का अध्ययन जारी रखें!";
      if (percentage >= 60) return "बुरा नहीं! मरकुस का और अध्ययन करें!";
      return "अध्ययन जारी रखें! मरकुस में बहुत कुछ है!";
    } else if (selectedLanguage === 'malayalam') {
      if (percentage >= 90) return "മികച്ചത്! നിങ്ങൾ മാർക്കോസിന്റെ വിദഗ്ധനാണ്!";
      if (percentage >= 80) return "വളരെ നല്ലത്! നിങ്ങൾ മാർക്കോസെ നന്നായി അറിയുന്നു!";
      if (percentage >= 70) return "നല്ല ജോലി! മാർക്കോസിന്റെ പഠനം തുടരുക!";
      if (percentage >= 60) return "മോശമല്ല! മാർക്കോസെ കൂടുതൽ പഠിക്കുക!";
      return "പഠനം തുടരുക! മാർക്കോസിൽ വളരെയധികം ഉണ്ട്!";
    } else {
      if (percentage >= 90) return "Excellent! You're a Mark expert!";
      if (percentage >= 80) return "Great job! You know Mark well!";
      if (percentage >= 70) return "Good work! Keep studying Mark!";
      if (percentage >= 60) return "Not bad! Review Mark more!";
      return "Keep studying! Mark has much to offer!";
    }
  };

  const handleLanguageSelect = (language: 'english' | 'hindi' | 'malayalam') => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
    
    // Track quiz start
    trackQuizStart('todays-quiz-mark', 'Today\'s Quiz - Mark', 'mixed');
  };

  // Language selection screen
  if (showLanguageSelection) {
    return (
      <>
        <Helmet>
          <title>Today's Quiz - Mark | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of the Gospel of Mark with today's special quiz." />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
          <div className="container mx-auto px-4 py-6 sm:py-12">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Today's Quiz - Mark
                </h1>
                <p className="text-base sm:text-lg text-gray-600">Choose your language</p>
              </div>

              {/* Language Selection */}
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => handleLanguageSelect('english')}
                  className="w-full p-4 sm:p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-semibold text-gray-900">English</div>
                      <div className="text-sm sm:text-base text-gray-600">Take the quiz in English</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleLanguageSelect('hindi')}
                  className="w-full p-4 sm:p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-semibold text-gray-900">हिंदी</div>
                      <div className="text-sm sm:text-base text-gray-600">हिंदी में क्विज लें</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleLanguageSelect('malayalam')}
                  className="w-full p-4 sm:p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-semibold text-gray-900">മലയാളം</div>
                      <div className="text-sm sm:text-base text-gray-600">മലയാളത്തിൽ ക്വിസ് എടുക്കുക</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Back to Home */}
              <div className="text-center mt-8 sm:mt-12">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
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
          <title>Today's Quiz - Mark | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of the Gospel of Mark with today's special quiz." />
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
                    Today's Quiz - Mark
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
                
                <CardContent className="px-4 sm:px-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 text-center">Question Review</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {answers.map((answer, index) => {
                      const question = getCurrentQuestions().find(q => q.id === answer.questionId);
                      return (
                        <div key={index} className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                          answer.correct 
                            ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-green-100' 
                            : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-300 shadow-red-100'
                        } shadow-lg`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-bold text-base sm:text-lg text-gray-800">Question {index + 1}</div>
                            {answer.correct ? (
                              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                            ) : (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs sm:text-sm font-bold">✕</span>
                              </div>
                            )}
                          </div>
                          <div className="text-gray-700 mb-3 sm:mb-4 font-medium text-sm sm:text-base leading-relaxed">{question?.question}</div>
                          <div className="space-y-2">
                            <div className="text-xs sm:text-sm">
                              <span className="font-semibold text-gray-600">Your answer: </span>
                              <span className={`font-medium ${answer.correct ? 'text-green-700' : 'text-red-700'}`}>
                                {question?.options[answer.selected]}
                              </span>
                            </div>
                            {!answer.correct && (
                              <div className="text-xs sm:text-sm">
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
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => navigate('/')}
                >
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Back to Home
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl border-3 border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={() => window.location.reload()}
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
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
        <title>Today's Quiz - Mark | Bible Quiz Competition</title>
        <meta name="description" content="Test your knowledge of the Gospel of Mark with today's special quiz." />
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
            <div className="text-center mb-8 sm:mb-12">
              {/* Enhanced Timer and Progress */}
              <div className="flex flex-row justify-center items-center gap-3 sm:gap-8 mb-8">
                <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur border-2 border-blue-200 rounded-2xl px-3 sm:px-6 py-2 sm:py-4 shadow-xl flex-1 max-w-xs sm:w-auto">
                  <div className="hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full items-center justify-center">
                    <Timer className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-blue-700">{formatTime(timeLeft)}</div>
                    <div className="text-xs sm:text-sm text-blue-600 font-medium">Time</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur border-2 border-green-200 rounded-2xl px-3 sm:px-6 py-2 sm:py-4 shadow-xl flex-1 max-w-xs sm:w-auto">
                  <div className="hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full items-center justify-center">
                    <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-bold text-green-700">
                      {currentQuestion + 1}/{getCurrentQuestions().length}
                    </div>
                    <div className="text-xs sm:text-sm text-green-600 font-medium">Questions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <Card className="mb-6 sm:mb-8">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl mb-3 sm:mb-4">
                  Question {currentQuestion + 1}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg leading-relaxed">
                  {getCurrentQuestions()[currentQuestion].question}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3">
                  {getCurrentQuestions()[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-50 text-blue-900'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswer === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswer === index && (
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          )}
                        </div>
                        <span className="text-sm sm:text-lg leading-relaxed">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Navigation */}
            <div className="flex justify-center items-center px-4">
              <Button
                onClick={currentQuestion === getCurrentQuestions().length - 1 ? handleSubmit : handleNext}
                disabled={selectedAnswer === null}
                className={`w-full max-w-xs sm:max-w-none px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-xl shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                  selectedAnswer === null
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                }`}
              >
                <span className="hidden sm:inline">
                  {currentQuestion === getCurrentQuestions().length - 1 ? 'Submit Quiz' : 'Next Question'}
                </span>
                <span className="sm:hidden">
                  {currentQuestion === getCurrentQuestions().length - 1 ? 'Submit' : 'Next'}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysQuizMark;
