import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trackQuizStart, trackQuizComplete, trackQuestionAnswer, trackQuizAbandon } from "@/utils/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, User, Calendar, CheckCircle, Globe, Home, Settings, Medal, Crown, Bolt, ArrowLeft, Book, Menu, Timer, Languages } from "lucide-react";
import { Helmet } from 'react-helmet';


const lukeQuizQuestions = [
  {
    id: 1,
    question: "To whom does Hebrews 3:1 address its message?",
    options: ["Sinners only", "Holy brothers and sisters who share in the heavenly calling", "Gentile believers only", "Priests and Levites"],
    correct: 1,
    explanation: "Hebrews 3:1 addresses 'holy brothers and sisters' who share in the heavenly calling."
  },
  {
    id: 2,
    question: "According to Hebrews 3:1, on whom should we fix our thoughts?",
    options: ["Moses", "Angels", "Jesus", "Abraham"],
    correct: 2,
    explanation: "The verse urges believers to fix their thoughts on Jesus."
  },
  {
    id: 3,
    question: "What two titles are given to Jesus in Hebrews 3:1?",
    options: ["Prophet and King", "Apostle and High Priest", "Teacher and Shepherd", "Judge and Counselor"],
    correct: 1,
    explanation: "Jesus is called our Apostle and High Priest in Hebrews 3:1."
  },
  {
    id: 4,
    question: "How is Jesus compared to Moses in Hebrews 3:3?",
    options: ["Jesus is less faithful than Moses", "Jesus has greater honor than Moses", "They are equal in honor", "Moses is builder; Jesus is house"],
    correct: 1,
    explanation: "Jesus is found worthy of greater honor than Moses."
  },
  {
    id: 5,
    question: "Who is the builder of everything according to Hebrews 3:4?",
    options: ["Moses", "God", "Abraham", "No one is named"],
    correct: 1,
    explanation: "Hebrews 3:4 states that God is the builder of everything."
  },
  {
    id: 6,
    question: "In Hebrews 3:5-6, how are Moses and Christ contrasted?",
    options: ["Both are servants in God's house", "Moses is a servant; Christ is the Son over God's house", "Christ is a servant; Moses is the son", "Both are sons over the house"],
    correct: 1,
    explanation: "Moses was faithful as a servant in God's house, but Christ is faithful as the Son over God's house."
  },
  {
    id: 7,
    question: "According to Hebrews 3:6, we are God's house if we...",
    options: ["Offer daily sacrifices", "Keep the Sabbath perfectly", "Hold firmly to our confidence and the hope we boast", "Follow the law of Moses"],
    correct: 2,
    explanation: "We are His house if we hold firmly to our confidence and hope."
  },
  {
    id: 8,
    question: "What warning is repeated from Psalm 95 in Hebrews 3:7-8?",
    options: ["Do not neglect meeting together", "Do not harden your hearts when you hear His voice", "Do not love money", "Do not judge others"],
    correct: 1,
    explanation: "'Today, if you hear His voice, do not harden your hearts.'"
  },
  {
    id: 9,
    question: "Who were the ones who heard and rebelled, according to Hebrews 3:16?",
    options: ["The Canaanites", "All those Moses led out of Egypt", "Only the leaders", "Only the young"],
    correct: 1,
    explanation: "Those who came out of Egypt under Moses rebelled."
  },
  {
    id: 10,
    question: "Why were some unable to enter God's rest (Hebrews 3:19)?",
    options: ["Lack of knowledge", "Lack of sacrifices", "Because of their unbelief", "Because of their poverty"],
    correct: 2,
    explanation: "Hebrews 3:19 states they could not enter because of unbelief."
  }
];

// Hindi translations
const lukeQuizQuestionsHindi = [
  {
    id: 1,
    question: "इब्रानियों 3:1 का संदेश किसे संबोधित है?",
    options: ["केवल पापियों को", "पवित्र भाइयों और बहनों को जो स्वर्गीय बुलाहट में सहभागी हैं", "केवल अन्यजाति विश्वासियों को", "याजकों और लेवियों को"],
    correct: 1,
    explanation: "इब्रानियों 3:1 'पवित्र भाइयों और बहनों' को संबोधित करता है जो स्वर्गीय बुलाहट में सहभागी हैं।"
  },
  {
    id: 2,
    question: "इब्रानियों 3:1 के अनुसार हमें किस पर ध्यान लगाना चाहिए?",
    options: ["मूसा", "स्वर्गदूत", "यीशु", "अब्राहम"],
    correct: 2,
    explanation: "वचन विश्वासियों को यीशु पर अपने विचार स्थिर करने के लिए कहता है।"
  },
  {
    id: 3,
    question: "इब्रानियों 3:1 में यीशु के लिए कौन से दो उपाधियाँ दी गई हैं?",
    options: ["भविष्यद्वक्ता और राजा", "प्रेरित और महायाजक", "शिक्षक और चरवाहा", "न्यायी और सलाहकार"],
    correct: 1,
    explanation: "इब्रानियों 3:1 में यीशु को हमारा प्रेरित और महायाजक कहा गया है।"
  },
  {
    id: 4,
    question: "इब्रानियों 3:3 में यीशु की तुलना मूसा से कैसे की गई है?",
    options: ["यीशु मूसा से कम विश्वासी है", "यीशु को मूसा से अधिक महिमा मिली है", "दोनों समान महिमा वाले हैं", "मूसा घर का निर्माता है; यीशु घर है"],
    correct: 1,
    explanation: "यीशु मूसा से अधिक महिमा के योग्य ठहराया गया है।"
  },
  {
    id: 5,
    question: "इब्रानियों 3:4 के अनुसार सब कुछ का निर्माता कौन है?",
    options: ["मूसा", "परमेश्वर", "अब्राहम", "किसी का उल्लेख नहीं"],
    correct: 1,
    explanation: "इब्रानियों 3:4 कहता है कि परमेश्वर सब कुछ का निर्माता है।"
  },
  {
    id: 6,
    question: "इब्रानियों 3:5-6 में मूसा और मसीह का किस प्रकार विरोधाभास किया गया है?",
    options: ["दोनों परमेश्वर के घर में सेवक हैं", "मूसा सेवक है; मसीह परमेश्वर के घर पर पुत्र है", "मसीह सेवक है; मूसा पुत्र है", "दोनों घर पर पुत्र हैं"],
    correct: 1,
    explanation: "मूसा परमेश्वर के घर में सेवक के समान विश्वासयोग्य था, पर मसीह परमेश्वर के घर पर पुत्र के रूप में विश्वासयोग्य है।"
  },
  {
    id: 7,
    question: "इब्रानियों 3:6 के अनुसार हम परमेश्वर का घर हैं यदि हम...",
    options: ["दैनिक बलिदान चढ़ाएँ", "सब्त को पूरी तरह मानें", "अपने भरोसे और आशा को दृढ़ता से थामे रहें", "मूसा की व्यवस्था का पालन करें"],
    correct: 2,
    explanation: "यदि हम अपने भरोसे और जिस आशा का घमण्ड करते हैं उसे दृढ़ता से पकड़े रहें तो हम उसका घर हैं।"
  },
  {
    id: 8,
    question: "भजन 95 से लिया गया कौन-सा चेतावनी इब्रानियों 3:7-8 में दोहराया गया है?",
    options: ["सभाओं की उपेक्षा न करो", "आज यदि तुम उसकी आवाज़ सुनो तो अपने मन को कठोर न करो", "धन का प्रेम न करो", "दूसरों का न्याय न करो"],
    correct: 1,
    explanation: "'आज यदि तुम उसकी आवाज़ सुनो, तो अपने मन को कठोर न करो।'"
  },
  {
    id: 9,
    question: "इब्रानियों 3:16 के अनुसार किसने सुना और फिर भी विरोध किया?",
    options: ["कनानी", "वे सब जो मूसा के द्वारा मिस्र से निकाले गए थे", "केवल सरदार", "केवल जवान"],
    correct: 1,
    explanation: "जो लोग मूसा के द्वारा मिस्र से निकले, उन्हीं ने विद्रोह किया।"
  },
  {
    id: 10,
    question: "इब्रानियों 3:19 के अनुसार वे परमेश्वर के विश्राम में क्यों न प्रवेश कर सके?",
    options: ["ज्ञान की कमी के कारण", "बलिदानों की कमी के कारण", "अपने अविश्वास के कारण", "दरिद्रता के कारण"],
    correct: 2,
    explanation: "इब्रानियों 3:19 कहता है कि वे अविश्वास के कारण प्रवेश न कर सके।"
  }
];

// Malayalam translations
const lukeQuizQuestionsMalayalam = [
  {
    id: 1,
    question: "എബ്രായർ 3:1 ലെ സന്ദേശം ആരെയാണ് അഭിസംബോധന ചെയ്യുന്നത്?",
    options: ["പാപികൾ മാത്രം", "സ്വർഗ്ഗീയ വിളിക്കു പങ്കാളികളായ വിശുദ്ധ സഹോദരന്മാരെയും സഹോദരിമാരെയും", "അന്യജാതി വിശ്വാസികൾ മാത്രം", "പുരോഹിതരും ലേവ്യരും"],
    correct: 1,
    explanation: "എബ്രായർ 3:1 സ്വർഗ്ഗീയ വിളിക്കു പങ്കാളികളായ 'വിശുദ്ധ സഹോദരന്മാരെയും സഹോദരിമാരെയും' അഭിസംബോധന ചെയ്യുന്നു."
  },
  {
    id: 2,
    question: "എബ്രായർ 3:1 അനുസരിച്ച്, നാം ആരിലേക്കാണ് നമ്മുടെ ചിന്തകൾ നിയോഗിക്കേണ്ടത്?",
    options: ["മോശെ", "ദൂതന്മാർ", "യേശു", "അബ്രാഹാം"],
    correct: 2,
    explanation: "വചനം വിശ്വാസികളെ യേശുവിൽ ചിന്ത നിശ്ചയിക്കുവാൻ വിളിക്കുന്നു."
  },
  {
    id: 3,
    question: "എബ്രായർ 3:1ൽ യേശുവിനെക്കുറിച്ച് ഏതു രണ്ടു പദവികൾ പറയുന്നു?",
    options: ["പ്രവാചകനും രാജാവും", "അപോസ്തലനും മഹാപുരോഹിതനും", "ഗുരുവും ഇടയനും", "ന്യായാധിപനും ഉപദേശകനും"],
    correct: 1,
    explanation: "എബ്രായർ 3:1 യേശുവിനെ നമ്മുടെ അപോസ്തലനും മഹാപുരോഹിതനും എന്നു വിളിക്കുന്നു."
  },
  {
    id: 4,
    question: "എബ്രായർ 3:3ൽ യേശുവിനെ മോശെയുമായി എങ്ങനെ താരതമ്യം ചെയ്യുന്നു?",
    options: ["യേശു മോശെയേക്കാൾ കുറച്ചേ വിശ്വസ്തനായുള്ളു", "യേശുവിന് മോശെയേക്കാൾ മഹത്വം ഉണ്ട്", "അവർ ഇരുവരും സമാന മഹത്വം ഉള്ളവർ", "മോശെ നിർമ്മാതാവാണ്; യേശു വീട് ആണ്"],
    correct: 1,
    explanation: "യേശു മോശെയേക്കാൾ മഹത്വത്തിന് യോഗ്യനാണ്."
  },
  {
    id: 5,
    question: "എബ്രായർ 3:4 അനുസരിച്ച് എല്ലാറ്റിന്റെയും നിർമ്മാതാവ് ആർ?",
    options: ["മോശെ", "ദൈവം", "അബ്രാഹാം", "ആരും പറഞ്ഞിട്ടില്ല"],
    correct: 1,
    explanation: "എബ്രായർ 3:4 പ്രകാരം എല്ലാറ്റിന്റെയും നിർമ്മാതാവ് ദൈവമാണ്."
  },
  {
    id: 6,
    question: "എബ്രായർ 3:5-6ൽ മോശെയും ക്രിസ്തുവും എങ്ങനെ വിരുദ്ധമായി കാണിക്കുന്നു?",
    options: ["ഇരുവരും ദൈവത്തിന്റെ വീട്ടിൽ ദാസന്മാരാണ്", "മോശെ ദാസൻ; ക്രിസ്തു ദൈവത്തിന്റെ വീട്ടിന്മേൽ പുത്രൻ", "ക്രിസ്തു ദാസൻ; മോശെ പുത്രൻ", "ഇരുവരും വീട്ടിന്മേൽ പുത്രന്മാർ"],
    correct: 1,
    explanation: "മോശെ ദൈവത്തിന്റെ വീട്ടിൽ ദാസനായി വിശ്വസ്തനായിരുന്നു; ക്രിസ്തു ദൈവത്തിന്റെ വീട്ടിന്മേൽ പുത്രനായിട്ടാണ് വിശ്വസ്തൻ."
  },
  {
    id: 7,
    question: "എബ്രായർ 3:6 പ്രകാരം, നാം ദൈവത്തിന്റെ വീട് ആകുന്നത് എപ്പോൾ?",
    options: ["ദൈനംദിന യാഗങ്ങൾ അർപ്പിക്കുമ്പോൾ", "ശബ്ബത്ത് പൂർണ്ണമായി ആചരിക്കുമ്പോൾ", "നമ്മുടെ ധൈര്യവും പ്രത്യാശയും ദൃഢമായി പിടിച്ചുനിറുത്തുമ്പോൾ", "മോശെയുടെ ന്യായപ്രമാണം പാലിക്കുമ്പോൾ"],
    correct: 2,
    explanation: "നമ്മുടെ ധൈര്യവും പ്രത്യാശയും ദൃഢമായി പിടിച്ചുനിൽക്കുകയാണെങ്കിൽ നാം അവന്റെ വീട് ആകുന്നു."
  },
  {
    id: 8,
    question: "എബ്രായർ 3:7-8ൽ സങ്കീർത്തനം 95ൽ നിന്നുള്ള ഏതു മുന്നറിയിപ്പാണ് ആവർത്തിക്കുന്നത്?",
    options: ["സംഗമങ്ങളെ ഉപേക്ഷിക്കരുത്", "ഇന്ന് നിങ്ങൾ അവന്റെ ശബ്ദം കേട്ടാൽ നിങ്ങളുടെ ഹൃദയം കടുപ്പിക്കരുത്", "ധനസ്നേഹം വിട്ടുകളയുക", "മറ്റുള്ളവരെ വിധിക്കരുത്"],
    correct: 1,
    explanation: "\"ഇന്ന് നിങ്ങൾ അവന്റെ ശബ്ദം കേട്ടാൽ, നിങ്ങളുടെ ഹൃദയങ്ങളെ കടുപ്പിക്കരുത്.\""
  },
  {
    id: 9,
    question: "എബ്രായർ 3:16 അനുസരിച്ച് കേട്ട് വിപ്ലവം ചെയ്തവർ ആരായിരുന്നു?",
    options: ["കനാന്യർ", "വെ സബ് ജോ മോശെയാൽ ഈജിപ്തിൽ നിന്ന് പുറപ്പെട്ട എല്ലാവരും", "മുഖ്യന്മാർ മാത്രം", "യുവാക്കളെ മാത്രം"],
    correct: 1,
    explanation: "മോശെയാൽ ഈജിപ്തിൽ നിന്നു പുറപ്പെട്ടവരാണ് വിപ്ലവം ചെയ്തത്."
  },
  {
    id: 10,
    question: "എബ്രായർ 3:19 പ്രകാരം ചിലർ ദൈവത്തിന്റെ വിശ്രമത്തിലേക്ക് പ്രവേശിക്കാനാകാതിരുന്നതെന്തുകൊണ്ട്?",
    options: ["അറിവില്ലായ്മ കാരണം", "യാഗങ്ങളുടെ കുറവ് കാരണം", "അവരുടെ അവിശ്വാസം മൂലം", "ദാരിദ്ര്യം കാരണം"],
    correct: 2,
    explanation: "അവരുടെ അവിശ്വാസം കാരണം അവർ പ്രവേശിക്കാനായില്ല എന്നു എബ്രായർ 3:19 പറയുന്നു."
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
      // Time's up - track abandonment and auto submit
      trackQuizAbandon('todays-quiz-hebrews-3', 'Today\'s Quiz - Hebrews 3', currentQuestion + 1);
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
        'todays-quiz-hebrews-3',
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
        'todays-quiz-hebrews-3',
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
        'todays-quiz-hebrews-3',
        'Today\'s Quiz - Hebrews 3',
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
      case 'hindi': return lukeQuizQuestionsHindi;
      case 'malayalam': return lukeQuizQuestionsMalayalam;
      default: return lukeQuizQuestions;
    }
  };

  const getScoreMessage = () => {
    const percentage = (score / getCurrentQuestions().length) * 100;
    if (selectedLanguage === 'hindi') {
      if (percentage >= 90) return "उत्कृष्ट! आप इब्रानियों 3 के विशेषज्ञ हैं!";
      if (percentage >= 80) return "बहुत बढ़िया! आप इब्रानियों 3 को अच्छी तरह जानते हैं!";
      if (percentage >= 70) return "अच्छा काम! इब्रानियों 3 का अध्ययन जारी रखें!";
      if (percentage >= 60) return "बुरा नहीं! इब्रानियों 3 का और अध्ययन करें!";
      return "अध्ययन जारी रखें! इब्रानियों 3 में बहुत कुछ है!";
    } else if (selectedLanguage === 'malayalam') {
      if (percentage >= 90) return "മികച്ചത്! നിങ്ങൾ എബ്രായർ 3 നന്നായി അറിയുന്നു!";
      if (percentage >= 80) return "വളരെ നല്ലത്! നിങ്ങൾ എബ്രായർ 3 നന്നായി അറിയുന്നു!";
      if (percentage >= 70) return "നല്ല ജോലി! എബ്രായർ 3 പഠനം തുടരുക!";
      if (percentage >= 60) return "മോശമല്ല! എബ്രായർ 3 കൂടുതൽ പഠിക്കുക!";
      return "പഠനം തുടരുക! എബ്രായർ 3 ൽ വളരെയധികം ഉണ്ട്!";
    } else {
      if (percentage >= 90) return "Excellent! You're a Hebrews 3 expert!";
      if (percentage >= 80) return "Great job! You know Hebrews 3 well!";
      if (percentage >= 70) return "Good work! Keep studying Hebrews 3!";
      if (percentage >= 60) return "Not bad! Review Hebrews 3 more!";
      return "Keep studying! Hebrews 3 has much to offer!";
    }
  };

  const handleLanguageSelect = (language: 'english' | 'hindi' | 'malayalam') => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
    
    // Track quiz start
    trackQuizStart('todays-quiz-hebrews-3', 'Today\'s Quiz - Hebrews 3', 'mixed');
  };

  // Language selection screen
  if (showLanguageSelection) {
    return (
      <>
        <Helmet>
          <title>Today's Quiz - Hebrews 3 | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of Hebrews 3 with today's special quiz." />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
          <div className="container mx-auto px-4 py-6 sm:py-12">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Today's Quiz - Hebrews 3
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
          <title>Today's Quiz - Hebrews 3 | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of Hebrews 3 with today's special quiz." />
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
                    Today's Quiz - Hebrews 3
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
        <title>Today's Quiz - Hebrews 3 | Bible Quiz Competition</title>
        <meta name="description" content="Test your knowledge of Hebrews 3 with today's special quiz." />
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
              {/* <div className="flex items-center justify-center mb-6">
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
              <p className="text-xl text-gray-600 mb-8">Test your knowledge of the book of Romans</p> */}
              
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

export default TodaysQuiz;
