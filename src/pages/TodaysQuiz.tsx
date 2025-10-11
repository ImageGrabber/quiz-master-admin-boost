import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { trackQuizStart, trackQuizComplete, trackQuestionAnswer, trackQuizAbandon } from "@/utils/analytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Users, Brain, ArrowRight, Play, BookOpen, Star, Award, User, Calendar, CheckCircle, Globe, Home, Settings, Medal, Crown, Bolt, ArrowLeft, Book, Menu, Timer, Languages } from "lucide-react";
import { Helmet } from 'react-helmet';

// Luke-themed quiz questions
const lukeQuizQuestions = [
  {
    id: 1,
    question: "Who wrote the Gospel of Luke?",
    options: ["Peter", "Paul", "Luke", "John"],
    correct: 2,
    explanation: "Luke, a physician and companion of Paul, wrote the Gospel of Luke and the book of Acts."
  },
  {
    id: 2,
    question: "What was Luke's profession?",
    options: ["Fisherman", "Physician", "Tax collector", "Scribe"],
    correct: 1,
    explanation: "Luke was a physician, which is why he often includes medical details in his Gospel."
  },
  {
    id: 3,
    question: "What did Luke emphasize about Jesus?",
    options: ["Jesus as a teacher only", "Jesus as the Savior of all people, including Gentiles", "Jesus as a miracle worker only", "Jesus as a prophet only"],
    correct: 1,
    explanation: "Luke emphasized Jesus as the universal Savior who came for all people, including Gentiles, the poor, and outcasts."
  },
  {
    id: 4,
    question: "What did Luke record about Jesus' birth?",
    options: ["He was born in Nazareth", "He was born in Bethlehem and visited by shepherds", "He was born in Jerusalem", "He was born in Egypt"],
    correct: 1,
    explanation: "Luke records that Jesus was born in Bethlehem and was visited by shepherds, emphasizing God's care for the humble."
  },
  {
    id: 5,
    question: "What famous parable is unique to Luke's Gospel?",
    options: ["The Good Shepherd", "The Good Samaritan", "The Sower", "The Mustard Seed"],
    correct: 1,
    explanation: "The Good Samaritan parable is unique to Luke's Gospel and teaches about loving one's neighbor regardless of background."
  },
  {
    id: 6,
    question: "What did Luke emphasize about Jesus' ministry?",
    options: ["Only to Jews", "To all people, including the poor and outcasts", "Only to the rich", "Only to the religious"],
    correct: 1,
    explanation: "Luke emphasized Jesus' ministry to all people, especially the poor, outcasts, women, and Gentiles."
  },
  {
    id: 7,
    question: "What did Luke record about Jesus' compassion?",
    options: ["He was harsh", "He showed compassion to all, especially the marginalized", "He was indifferent", "He was selective"],
    correct: 1,
    explanation: "Luke emphasized Jesus' great compassion, especially toward women, children, the poor, and social outcasts."
  },
  {
    id: 8,
    question: "What did Luke emphasize about the Holy Spirit?",
    options: ["The Spirit was not important", "The Spirit was central to Jesus' ministry and the church", "The Spirit was limited", "The Spirit was irrelevant"],
    correct: 1,
    explanation: "Luke emphasized the Holy Spirit's role throughout Jesus' life and ministry, and in the early church."
  },
  {
    id: 9,
    question: "What was Luke's message about Jesus' mission?",
    options: ["He was just a teacher", "He came to seek and save the lost", "He was just a prophet", "He was just a miracle worker"],
    correct: 1,
    explanation: "Luke 19:10 states that 'the Son of Man came to seek and to save the lost,' summarizing Jesus' mission."
  },
  {
    id: 10,
    question: "What did Luke emphasize about prayer?",
    options: ["Prayer was not important", "Jesus prayed frequently and taught about prayer", "Prayer was limited", "Prayer was irrelevant"],
    correct: 1,
    explanation: "Luke emphasized Jesus' prayer life, showing him praying at key moments and teaching about persistent prayer."
  }
];

// Hindi translations
const lukeQuizQuestionsHindi = [
  {
    id: 1,
    question: "लूका का सुसमाचार किसने लिखा?",
    options: ["पतरस", "पौलुस", "लूका", "यूहन्ना"],
    correct: 2,
    explanation: "लूका, जो एक चिकित्सक और पौलुस का साथी था, ने लूका का सुसमाचार और प्रेरितों के काम की पुस्तक लिखी।"
  },
  {
    id: 2,
    question: "लूका का व्यवसाय क्या था?",
    options: ["मछुआरा", "चिकित्सक", "कर संग्राहक", "लिपिक"],
    correct: 1,
    explanation: "लूका एक चिकित्सक था, इसीलिए वह अपने सुसमाचार में अक्सर चिकित्सा विवरण शामिल करता है।"
  },
  {
    id: 3,
    question: "लूका ने यीशु के बारे में क्या जोर दिया?",
    options: ["यीशु केवल एक शिक्षक थे", "यीशु सभी लोगों के उद्धारकर्ता थे, जिसमें अन्यजाति भी शामिल हैं", "यीशु केवल एक चमत्कारी थे", "यीशु केवल एक भविष्यद्वक्ता थे"],
    correct: 1,
    explanation: "लूका ने यीशु को सार्वभौमिक उद्धारकर्ता के रूप में जोर दिया जो सभी लोगों के लिए आए, जिसमें अन्यजाति, गरीब और समाज से बाहर किए गए लोग भी शामिल हैं।"
  },
  {
    id: 4,
    question: "लूका ने यीशु के जन्म के बारे में क्या लिखा?",
    options: ["वह नासरत में पैदा हुए", "वह बैतलहम में पैदा हुए और चरवाहों ने उन्हें देखा", "वह यरूशलेम में पैदा हुए", "वह मिस्र में पैदा हुए"],
    correct: 1,
    explanation: "लूका लिखता है कि यीशु बैतलहम में पैदा हुए और चरवाहों ने उन्हें देखा, जो विनम्र लोगों के लिए परमेश्वर की देखभाल पर जोर देता है।"
  },
  {
    id: 5,
    question: "कौन सा प्रसिद्ध दृष्टांत लूका के सुसमाचार में अद्वितीय है?",
    options: ["अच्छा चरवाहा", "अच्छा सामरी", "बोने वाला", "सरसों का दाना"],
    correct: 1,
    explanation: "अच्छा सामरी का दृष्टांत लूका के सुसमाचार में अद्वितीय है और पृष्ठभूमि की परवाह किए बिना अपने पड़ोसी से प्रेम करने के बारे में सिखाता है।"
  },
  {
    id: 6,
    question: "लूका ने यीशु की सेवकाई के बारे में क्या जोर दिया?",
    options: ["केवल यहूदियों के लिए", "सभी लोगों के लिए, जिसमें गरीब और समाज से बाहर किए गए लोग भी शामिल हैं", "केवल अमीरों के लिए", "केवल धार्मिक लोगों के लिए"],
    correct: 1,
    explanation: "लूका ने यीशु की सेवकाई को सभी लोगों के लिए जोर दिया, विशेष रूप से गरीबों, समाज से बाहर किए गए लोगों, महिलाओं और अन्यजातियों के लिए।"
  },
  {
    id: 7,
    question: "लूका ने यीशु की दया के बारे में क्या लिखा?",
    options: ["वह कठोर थे", "उन्होंने सभी के प्रति दया दिखाई, विशेष रूप से हाशिए पर रहने वालों के प्रति", "वे उदासीन थे", "वे चयनात्मक थे"],
    correct: 1,
    explanation: "लूका ने यीशु की महान दया पर जोर दिया, विशेष रूप से महिलाओं, बच्चों, गरीबों और सामाजिक रूप से हाशिए पर रहने वाले लोगों के प्रति।"
  },
  {
    id: 8,
    question: "लूका ने पवित्र आत्मा के बारे में क्या जोर दिया?",
    options: ["आत्मा महत्वपूर्ण नहीं था", "आत्मा यीशु की सेवकाई और कलीसिया के लिए केंद्रीय था", "आत्मा सीमित था", "आत्मा अप्रासंगिक था"],
    correct: 1,
    explanation: "लूका ने पवित्र आत्मा की भूमिका पर जोर दिया जो यीशु के जीवन और सेवकाई के दौरान और प्रारंभिक कलीसिया में थी।"
  },
  {
    id: 9,
    question: "लूका का यीशु के मिशन के बारे में क्या संदेश था?",
    options: ["वे केवल एक शिक्षक थे", "वे खोए हुओं को खोजने और बचाने आए", "वे केवल एक भविष्यद्वक्ता थे", "वे केवल एक चमत्कारी थे"],
    correct: 1,
    explanation: "लूका 19:10 कहता है कि 'मनुष्य का पुत्र खोए हुओं को खोजने और बचाने आया है,' जो यीशु के मिशन को संक्षेप में बताता है।"
  },
  {
    id: 10,
    question: "लूका ने प्रार्थना के बारे में क्या जोर दिया?",
    options: ["प्रार्थना महत्वपूर्ण नहीं थी", "यीशु ने बार-बार प्रार्थना की और प्रार्थना के बारे में सिखाया", "प्रार्थना सीमित थी", "प्रार्थना अप्रासंगिक थी"],
    correct: 1,
    explanation: "लूका ने यीशु की प्रार्थना जीवन पर जोर दिया, उन्हें महत्वपूर्ण क्षणों में प्रार्थना करते हुए दिखाया और लगातार प्रार्थना के बारे में सिखाते हुए।"
  }
];

// Malayalam translations
const lukeQuizQuestionsMalayalam = [
  {
    id: 1,
    question: "ലൂക്കായുടെ സുവിശേഷം ആരാണ് എഴുതിയത്?",
    options: ["പത്രോസ്", "പൗലോസ്", "ലൂക്കാസ്", "യോഹന്നാൻ"],
    correct: 2,
    explanation: "ലൂക്കാസ്, ഒരു വൈദ്യനും പൗലോസിന്റെ കൂട്ടാളിയുമായിരുന്നു, ലൂക്കായുടെ സുവിശേഷവും പ്രേഷിതന്മാരുടെ പ്രവൃത്തികളുടെ പുസ്തകവും എഴുതി."
  },
  {
    id: 2,
    question: "ലൂക്കാസിന്റെ തൊഴിൽ എന്തായിരുന്നു?",
    options: ["മീൻപിടുത്തക്കാരൻ", "വൈദ്യൻ", "നികുതി ശേഖരിക്കുന്നവൻ", "ലിപികൻ"],
    correct: 1,
    explanation: "ലൂക്കാസ് ഒരു വൈദ്യനായിരുന്നു, അതുകൊണ്ടാണ് അദ്ദേഹം തന്റെ സുവിശേഷത്തിൽ പലപ്പോഴും വൈദ്യശാസ്ത്ര വിവരങ്ങൾ ഉൾപ്പെടുത്തിയിരിക്കുന്നത്."
  },
  {
    id: 3,
    question: "ലൂക്കാസ് യേശുവിനെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["യേശു ഒരു ഗുരുവായിരുന്നു മാത്രം", "യേശു എല്ലാവരുടെയും രക്ഷകനായിരുന്നു, അന്യജാതികളും ഉൾപ്പെടെ", "യേശു ഒരു അത്ഭുതപ്രവർത്തകനായിരുന്നു മാത്രം", "യേശു ഒരു പ്രവാചകനായിരുന്നു മാത്രം"],
    correct: 1,
    explanation: "ലൂക്കാസ് യേശുവിനെ സാർവത്രിക രക്ഷകനായി ഊന്നിപ്പറഞ്ഞു, അദ്ദേഹം എല്ലാവർക്കും വേണ്ടി വന്നു, അന്യജാതികൾ, ദരിദ്രർ, ഒഴിഞ്ഞുകിടക്കുന്നവർ എന്നിവരും ഉൾപ്പെടെ."
  },
  {
    id: 4,
    question: "ലൂക്കാസ് യേശുവിന്റെ ജനനത്തെക്കുറിച്ച് എന്ത് രേഖപ്പെടുത്തി?",
    options: ["അദ്ദേഹം നാസറത്തിൽ ജനിച്ചു", "അദ്ദേഹം ബെത്ലഹേമിൽ ജനിച്ചു, ഇടയന്മാർ അദ്ദേഹത്തെ കണ്ടു", "അദ്ദേഹം യെരൂശലേമിൽ ജനിച്ചു", "അദ്ദേഹം ഈജിപ്തിൽ ജനിച്ചു"],
    correct: 1,
    explanation: "ലൂക്കാസ് യേശു ബെത്ലഹേമിൽ ജനിച്ചുവെന്നും ഇടയന്മാർ അദ്ദേഹത്തെ കണ്ടുവെന്നും രേഖപ്പെടുത്തുന്നു, ഇത് വിനീതരായവരുടെ പരിചരണത്തിൽ ദൈവത്തിന്റെ ശ്രദ്ധയെ ഊന്നിപ്പറയുന്നു."
  },
  {
    id: 5,
    question: "ലൂക്കാസിന്റെ സുവിശേഷത്തിൽ അദ്വിതീയമായ പ്രസിദ്ധമായ ഉപമ ഏതാണ്?",
    options: ["നല്ല ഇടയൻ", "നല്ല ശമറ്യൻ", "വിതക്കുന്നവൻ", "കടുകുമണി"],
    correct: 1,
    explanation: "നല്ല ശമറ്യന്റെ ഉപമ ലൂക്കാസിന്റെ സുവിശേഷത്തിൽ അദ്വിതീയമാണ്, ഇത് പശ്ചാത്തലം പരിഗണിക്കാതെ അയൽവാസിയെ സ്നേഹിക്കുന്നതിനെക്കുറിച്ച് പഠിപ്പിക്കുന്നു."
  },
  {
    id: 6,
    question: "ലൂക്കാസ് യേശുവിന്റെ സേവനത്തെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["യഹൂദന്മാർക്ക് മാത്രം", "എല്ലാവർക്കും, ദരിദ്രരും ഒഴിഞ്ഞുകിടക്കുന്നവരും ഉൾപ്പെടെ", "പണക്കാരായവർക്ക് മാത്രം", "മതവിശ്വാസികൾക്ക് മാത്രം"],
    correct: 1,
    explanation: "ലൂക്കാസ് യേശുവിന്റെ സേവനത്തെ എല്ലാവർക്കും ഊന്നിപ്പറഞ്ഞു, പ്രത്യേകിച്ച് ദരിദ്രർ, ഒഴിഞ്ഞുകിടക്കുന്നവർ, സ്ത്രീകൾ, അന്യജാതികൾ എന്നിവർക്ക്."
  },
  {
    id: 7,
    question: "ലൂക്കാസ് യേശുവിന്റെ കരുണയെക്കുറിച്ച് എന്ത് രേഖപ്പെടുത്തി?",
    options: ["അദ്ദേഹം കഠിനനായിരുന്നു", "അദ്ദേഹം എല്ലാവരോടും കരുണ കാണിച്ചു, പ്രത്യേകിച്ച് അരികുവാസികളോട്", "അദ്ദേഹം ഉദാസീനനായിരുന്നു", "അദ്ദേഹം തിരഞ്ഞെടുപ്പുകാരനായിരുന്നു"],
    correct: 1,
    explanation: "ലൂക്കാസ് യേശുവിന്റെ മഹത്തായ കരുണയെ ഊന്നിപ്പറഞ്ഞു, പ്രത്യേകിച്ച് സ്ത്രീകൾ, കുട്ടികൾ, ദരിദ്രർ, സാമൂഹികമായി ഒഴിഞ്ഞുകിടക്കുന്നവർ എന്നിവരോട്."
  },
  {
    id: 8,
    question: "ലൂക്കാസ് പരിശുദ്ധാത്മാവിനെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["ആത്മാവ് പ്രധാനമല്ലായിരുന്നു", "ആത്മാവ് യേശുവിന്റെ സേവനത്തിനും സഭയ്ക്കും കേന്ദ്രമായിരുന്നു", "ആത്മാവ് പരിമിതമായിരുന്നു", "ആത്മാവ് അപ്രസക്തമായിരുന്നു"],
    correct: 1,
    explanation: "ലൂക്കാസ് യേശുവിന്റെ ജീവിതത്തിലും സേവനത്തിലും, പ്രാരംഭ സഭയിലും പരിശുദ്ധാത്മാവിന്റെ പങ്കിനെ ഊന്നിപ്പറഞ്ഞു."
  },
  {
    id: 9,
    question: "ലൂക്കാസിന്റെ യേശുവിന്റെ ദൗത്യത്തെക്കുറിച്ചുള്ള സന്ദേശം എന്തായിരുന്നു?",
    options: ["അദ്ദേഹം ഒരു ഗുരുവായിരുന്നു മാത്രം", "അദ്ദേഹം നഷ്ടപ്പെട്ടവരെ തിരയാനും രക്ഷിക്കാനും വന്നു", "അദ്ദേഹം ഒരു പ്രവാചകനായിരുന്നു മാത്രം", "അദ്ദേഹം ഒരു അത്ഭുതപ്രവർത്തകനായിരുന്നു മാത്രം"],
    correct: 1,
    explanation: "ലൂക്കാസ് 19:10 പറയുന്നത് 'മനുഷ്യപുത്രൻ നഷ്ടപ്പെട്ടവരെ തിരയാനും രക്ഷിക്കാനും വന്നു' എന്നാണ്, ഇത് യേശുവിന്റെ ദൗത്യത്തെ സംഗ്രഹിക്കുന്നു."
  },
  {
    id: 10,
    question: "ലൂക്കാസ് പ്രാർത്ഥനയെക്കുറിച്ച് എന്ത് ഊന്നിപ്പറഞ്ഞു?",
    options: ["പ്രാർത്ഥന പ്രധാനമല്ലായിരുന്നു", "യേശു പലപ്പോഴും പ്രാർത്ഥിച്ചു, പ്രാർത്ഥനയെക്കുറിച്ച് പഠിപ്പിച്ചു", "പ്രാർത്ഥന പരിമിതമായിരുന്നു", "പ്രാർത്ഥന അപ്രസക്തമായിരുന്നു"],
    correct: 1,
    explanation: "ലൂക്കാസ് യേശുവിന്റെ പ്രാർത്ഥനാ ജീവിതത്തെ ഊന്നിപ്പറഞ്ഞു, അദ്ദേഹത്തെ പ്രധാന നിമിഷങ്ങളിൽ പ്രാർത്ഥിക്കുന്നതായി കാണിച്ചു, സ്ഥിരമായ പ്രാർത്ഥനയെക്കുറിച്ച് പഠിപ്പിച്ചു."
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
      trackQuizAbandon('todays-quiz-luke', 'Today\'s Quiz - Luke', currentQuestion + 1);
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
        'todays-quiz-luke',
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
        'todays-quiz-luke',
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
        'todays-quiz-luke',
        'Today\'s Quiz - Luke',
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
      if (percentage >= 90) return "उत्कृष्ट! आप लूका के विशेषज्ञ हैं!";
      if (percentage >= 80) return "बहुत बढ़िया! आप लूका को अच्छी तरह जानते हैं!";
      if (percentage >= 70) return "अच्छा काम! लूका का अध्ययन जारी रखें!";
      if (percentage >= 60) return "बुरा नहीं! लूका का और अध्ययन करें!";
      return "अध्ययन जारी रखें! लूका में बहुत कुछ है!";
    } else if (selectedLanguage === 'malayalam') {
      if (percentage >= 90) return "മികച്ചത്! നിങ്ങൾ ലൂക്കാസിന്റെ വിദഗ്ധനാണ്!";
      if (percentage >= 80) return "വളരെ നല്ലത്! നിങ്ങൾ ലൂക്കാസെ നന്നായി അറിയുന്നു!";
      if (percentage >= 70) return "നല്ല ജോലി! ലൂക്കാസിന്റെ പഠനം തുടരുക!";
      if (percentage >= 60) return "മോശമല്ല! ലൂക്കാസെ കൂടുതൽ പഠിക്കുക!";
      return "പഠനം തുടരുക! ലൂക്കാസിൽ വളരെയധികം ഉണ്ട്!";
    } else {
      if (percentage >= 90) return "Excellent! You're a Luke expert!";
      if (percentage >= 80) return "Great job! You know Luke well!";
      if (percentage >= 70) return "Good work! Keep studying Luke!";
      if (percentage >= 60) return "Not bad! Review Luke more!";
      return "Keep studying! Luke has much to offer!";
    }
  };

  const handleLanguageSelect = (language: 'english' | 'hindi' | 'malayalam') => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
    
    // Track quiz start
    trackQuizStart('todays-quiz-luke', 'Today\'s Quiz - Luke', 'mixed');
  };

  // Language selection screen
  if (showLanguageSelection) {
    return (
      <>
        <Helmet>
          <title>Today's Quiz - Luke | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of the Gospel of Luke with today's special quiz." />
        </Helmet>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white">
          <div className="container mx-auto px-4 py-6 sm:py-12">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                  Today's Quiz - Luke
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
          <title>Today's Quiz - Luke | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of the Gospel of Luke with today's special quiz." />
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
                    Today's Quiz - Luke
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
