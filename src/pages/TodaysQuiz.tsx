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
    question: "According to Hebrews 4:1, what should we be careful about regarding the promise of entering God's rest?",
    options: ["That we might miss the deadline", "That none of us be found to have fallen short of it", "That we need to work harder to earn it", "That it is only for certain people"],
    correct: 1,
    explanation: "Hebrews 4:1 warns us to be careful that none of us be found to have fallen short of the promise of entering God's rest."
  },
  {
    id: 2,
    question: "In Hebrews 4:2, why was the message they heard of no value to them?",
    options: ["Because it was delivered in a foreign language", "Because they did not share the faith of those who obeyed", "Because the message was too complex", "Because they were not listening"],
    correct: 1,
    explanation: "The message they heard was of no value because they did not share the faith of those who obeyed."
  },
  {
    id: 3,
    question: "What did God declare on oath in His anger according to Hebrews 4:3?",
    options: ["That He would destroy the earth", "That they shall never enter My rest", "That He would send a flood", "That He would abandon His people"],
    correct: 1,
    explanation: "God declared on oath in His anger, 'They shall never enter My rest.'"
  },
  {
    id: 4,
    question: "According to Hebrews 4:4, what happened on the seventh day?",
    options: ["God created the sun and moon", "God rested from all His works", "God created man and woman", "God blessed the animals"],
    correct: 1,
    explanation: "On the seventh day God rested from all His works."
  },
  {
    id: 5,
    question: "According to Hebrews 4:8, if Joshua had given them rest, what would God not have done?",
    options: ["Created a new covenant", "Spoken later about another day", "Sent His Son to earth", "Given them the Ten Commandments"],
    correct: 1,
    explanation: "If Joshua had given them rest, God would not have spoken later about another day."
  },
  {
    id: 6,
    question: "According to Hebrews 4:9, what remains for the people of God?",
    options: ["A weekly Sabbath day", "A Sabbath-rest", "A new law", "A different covenant"],
    correct: 1,
    explanation: "There remains a Sabbath-rest for the people of God."
  },
  {
    id: 7,
    question: "According to Hebrews 4:10, what happens when anyone enters God's rest?",
    options: ["They become perfect", "They also rest from their works, just as God did from His", "They receive special powers", "They are guaranteed salvation"],
    correct: 1,
    explanation: "Anyone who enters God's rest also rests from their works, just as God did from His."
  },
  {
    id: 8,
    question: "According to Hebrews 4:12, what is the Word of God described as?",
    options: ["A gentle whisper", "Alive and active, sharper than any double-edged sword", "A beautiful song", "A comforting blanket"],
    correct: 1,
    explanation: "The Word of God is alive and active, sharper than any double-edged sword."
  },
  {
    id: 9,
    question: "According to Hebrews 4:12, what does the Word of God penetrate?",
    options: ["Only the mind", "Even to dividing soul and spirit, joints and marrow", "Only the heart", "Only the body"],
    correct: 1,
    explanation: "The Word of God penetrates even to dividing soul and spirit, joints and marrow."
  },
  {
    id: 10,
    question: "According to Hebrews 4:13, what is NOT hidden from God's sight?",
    options: ["Some things in creation", "Nothing in all creation", "Only our good deeds", "Only our sins"],
    correct: 1,
    explanation: "Nothing in all creation is hidden from God's sight."
  },
  {
    id: 11,
    question: "According to Hebrews 4:14, who is our great high priest who has ascended into heaven?",
    options: ["Moses", "Aaron", "Jesus the Son of God", "Melchizedek"],
    correct: 2,
    explanation: "Jesus the Son of God is our great high priest who has ascended into heaven."
  },
  {
    id: 12,
    question: "According to Hebrews 4:15, why can Jesus empathize with our weaknesses?",
    options: ["Because He studied human nature", "Because He has been tempted in every way, just as we are—yet He did not sin", "Because He was once human", "Because He understands our struggles"],
    correct: 1,
    explanation: "Jesus can empathize with our weaknesses because He has been tempted in every way, just as we are—yet He did not sin."
  },
  {
    id: 13,
    question: "According to Hebrews 4:16, how should we approach God's throne of grace?",
    options: ["With fear and trembling", "With confidence", "With perfect righteousness", "With many sacrifices"],
    correct: 1,
    explanation: "We should approach God's throne of grace with confidence."
  },
  {
    id: 14,
    question: "According to Hebrews 4:16, what may we receive when we approach God's throne?",
    options: ["Only judgment", "Mercy and find grace to help us in our time of need", "Only blessings", "Only forgiveness"],
    correct: 1,
    explanation: "We may receive mercy and find grace to help us in our time of need."
  }
];

// Hindi translations
const lukeQuizQuestionsHindi = [
  {
    id: 1,
    question: "इब्रानियों 4:1 के अनुसार परमेश्वर के विश्राम में प्रवेश करने के वादे के बारे में हमें किस बात से सावधान रहना चाहिए?",
    options: ["कि हम समय सीमा चूक जाएँ", "कि हम में से कोई भी उस वादे से कम न पाए", "कि हमें इसे कमाने के लिए और कड़ी मेहनत करनी होगी", "कि यह केवल कुछ लोगों के लिए है"],
    correct: 1,
    explanation: "इब्रानियों 4:1 हमें चेतावनी देता है कि हम में से कोई भी परमेश्वर के विश्राम में प्रवेश करने के वादे से कम न पाए।"
  },
  {
    id: 2,
    question: "इब्रानियों 4:2 के अनुसार उनके लिए सुने गए संदेश का कोई मूल्य क्यों नहीं था?",
    options: ["क्योंकि यह विदेशी भाषा में दिया गया था", "क्योंकि उन्होंने आज्ञाकारी लोगों के विश्वास को साझा नहीं किया", "क्योंकि संदेश बहुत जटिल था", "क्योंकि वे सुन नहीं रहे थे"],
    correct: 1,
    explanation: "उनके लिए सुने गए संदेश का कोई मूल्य नहीं था क्योंकि उन्होंने आज्ञाकारी लोगों के विश्वास को साझा नहीं किया।"
  },
  {
    id: 3,
    question: "इब्रानियों 4:3 के अनुसार परमेश्वर ने अपने क्रोध में क्या शपथ ली?",
    options: ["कि वह पृथ्वी को नष्ट कर देगा", "कि वे कभी मेरे विश्राम में प्रवेश नहीं करेंगे", "कि वह बाढ़ भेजेगा", "कि वह अपने लोगों को छोड़ देगा"],
    correct: 1,
    explanation: "परमेश्वर ने अपने क्रोध में शपथ ली, 'वे कभी मेरे विश्राम में प्रवेश नहीं करेंगे।'"
  },
  {
    id: 4,
    question: "इब्रानियों 4:4 के अनुसार सातवें दिन क्या हुआ?",
    options: ["परमेश्वर ने सूर्य और चंद्रमा बनाए", "परमेश्वर ने अपने सभी कामों से विश्राम लिया", "परमेश्वर ने पुरुष और स्त्री बनाए", "परमेश्वर ने जानवरों को आशीर्वाद दिया"],
    correct: 1,
    explanation: "सातवें दिन परमेश्वर ने अपने सभी कामों से विश्राम लिया।"
  },
  {
    id: 5,
    question: "इब्रानियों 4:8 के अनुसार यदि यहोशू ने उन्हें विश्राम दिया होता, तो परमेश्वर क्या नहीं करता?",
    options: ["नई वाचा बनाता", "बाद में किसी और दिन के बारे में बात करता", "अपने पुत्र को पृथ्वी पर भेजता", "उन्हें दस आज्ञाएँ देता"],
    correct: 1,
    explanation: "यदि यहोशू ने उन्हें विश्राम दिया होता, तो परमेश्वर बाद में किसी और दिन के बारे में बात नहीं करता।"
  },
  {
    id: 6,
    question: "इब्रानियों 4:9 के अनुसार परमेश्वर के लोगों के लिए क्या बचा रहता है?",
    options: ["एक साप्ताहिक सब्त दिन", "एक सब्त-विश्राम", "एक नया नियम", "एक अलग वाचा"],
    correct: 1,
    explanation: "परमेश्वर के लोगों के लिए एक सब्त-विश्राम बचा रहता है।"
  },
  {
    id: 7,
    question: "इब्रानियों 4:10 के अनुसार जब कोई परमेश्वर के विश्राम में प्रवेश करता है तो क्या होता है?",
    options: ["वे सिद्ध हो जाते हैं", "वे भी अपने कामों से विश्राम लेते हैं, जैसे परमेश्वर ने अपने कामों से लिया", "उन्हें विशेष शक्तियाँ मिलती हैं", "उनकी मुक्ति की गारंटी हो जाती है"],
    correct: 1,
    explanation: "जो कोई परमेश्वर के विश्राम में प्रवेश करता है, वह भी अपने कामों से विश्राम लेता है, जैसे परमेश्वर ने अपने कामों से लिया।"
  },
  {
    id: 8,
    question: "इब्रानियों 4:12 के अनुसार परमेश्वर का वचन कैसे वर्णित है?",
    options: ["एक कोमल फुसफुसाहट", "जीवित और सक्रिय, किसी भी दोधारी तलवार से तेज", "एक सुंदर गीत", "एक आरामदायक कंबल"],
    correct: 1,
    explanation: "परमेश्वर का वचन जीवित और सक्रिय है, किसी भी दोधारी तलवार से तेज।"
  },
  {
    id: 9,
    question: "इब्रानियों 4:12 के अनुसार परमेश्वर का वचन क्या भेदता है?",
    options: ["केवल मन", "आत्मा और आत्मा, जोड़ों और मज्जा को भी अलग करने तक", "केवल हृदय", "केवल शरीर"],
    correct: 1,
    explanation: "परमेश्वर का वचन आत्मा और आत्मा, जोड़ों और मज्जा को भी अलग करने तक भेदता है।"
  },
  {
    id: 10,
    question: "इब्रानियों 4:13 के अनुसार परमेश्वर की दृष्टि से क्या छुपा नहीं है?",
    options: ["सृष्टि की कुछ चीजें", "सृष्टि में कुछ भी नहीं", "केवल हमारे अच्छे काम", "केवल हमारे पाप"],
    correct: 1,
    explanation: "सृष्टि में कुछ भी परमेश्वर की दृष्टि से छुपा नहीं है।"
  },
  {
    id: 11,
    question: "इब्रानियों 4:14 के अनुसार हमारा महान महायाजक कौन है जो स्वर्ग में चढ़ गया?",
    options: ["मूसा", "हारून", "यीशु परमेश्वर का पुत्र", "मल्कीसेदक"],
    correct: 2,
    explanation: "यीशु परमेश्वर का पुत्र हमारा महान महायाजक है जो स्वर्ग में चढ़ गया।"
  },
  {
    id: 12,
    question: "इब्रानियों 4:15 के अनुसार यीशु हमारी कमजोरियों के साथ सहानुभूति क्यों रख सकता है?",
    options: ["क्योंकि उसने मानव प्रकृति का अध्ययन किया", "क्योंकि वह हर तरह से परीक्षित हुआ, जैसे हम हैं—फिर भी उसने पाप नहीं किया", "क्योंकि वह एक बार मानव था", "क्योंकि वह हमारे संघर्षों को समझता है"],
    correct: 1,
    explanation: "यीशु हमारी कमजोरियों के साथ सहानुभूति रख सकता है क्योंकि वह हर तरह से परीक्षित हुआ, जैसे हम हैं—फिर भी उसने पाप नहीं किया।"
  },
  {
    id: 13,
    question: "इब्रानियों 4:16 के अनुसार हमें परमेश्वर के अनुग्रह के सिंहासन के पास कैसे जाना चाहिए?",
    options: ["भय और कंपकंपी के साथ", "आत्मविश्वास के साथ", "पूर्ण धार्मिकता के साथ", "कई बलिदानों के साथ"],
    correct: 1,
    explanation: "हमें आत्मविश्वास के साथ परमेश्वर के अनुग्रह के सिंहासन के पास जाना चाहिए।"
  },
  {
    id: 14,
    question: "इब्रानियों 4:16 के अनुसार जब हम परमेश्वर के सिंहासन के पास जाते हैं तो हम क्या प्राप्त कर सकते हैं?",
    options: ["केवल न्याय", "दया और हमारी आवश्यकता के समय में हमारी सहायता के लिए अनुग्रह", "केवल आशीर्वाद", "केवल क्षमा"],
    correct: 1,
    explanation: "हम दया और हमारी आवश्यकता के समय में हमारी सहायता के लिए अनुग्रह प्राप्त कर सकते हैं।"
  }
];

// Malayalam translations
const lukeQuizQuestionsMalayalam = [
  {
    id: 1,
    question: "എബ്രായർ 4:1 അനുസരിച്ച് ദൈവത്തിന്റെ വിശ്രമത്തിൽ പ്രവേശിക്കാനുള്ള വാഗ്ദാനത്തെക്കുറിച്ച് നാം എന്തിൽ ശ്രദ്ധാലുവായിരിക്കണം?",
    options: ["നാം സമയപരിധി നഷ്ടപ്പെടാനിടയുണ്ട്", "നമ്മിൽ ആരും ആ വാഗ്ദാനത്തിൽ നിന്ന് കുറഞ്ഞുപോകാതിരിക്കണം", "അത് നേടാൻ നമുക്ക് കൂടുതൽ കഠിനാധ്വാനം ചെയ്യേണ്ടി വരും", "ഇത് ചില ആളുകൾക്ക് മാത്രമാണ്"],
    correct: 1,
    explanation: "എബ്രായർ 4:1 നമ്മെ ദൈവത്തിന്റെ വിശ്രമത്തിൽ പ്രവേശിക്കാനുള്ള വാഗ്ദാനത്തിൽ നിന്ന് ആരും കുറഞ്ഞുപോകാതിരിക്കാൻ ശ്രദ്ധാലുവായിരിക്കാൻ ഉപദേശിക്കുന്നു."
  },
  {
    id: 2,
    question: "എബ്രായർ 4:2 അനുസരിച്ച് അവർ കേട്ട സന്ദേശത്തിന് എന്തുകൊണ്ട് മൂല്യമില്ലായിരുന്നു?",
    options: ["അത് വിദേശഭാഷയിൽ നൽകിയതുകൊണ്ട്", "അവർ അനുസരിച്ചവരുടെ വിശ്വാസം പങ്കിട്ടില്ല", "സന്ദേശം വളരെ സങ്കീർണ്ണമായിരുന്നു", "അവർ കേൾക്കാതിരുന്നു"],
    correct: 1,
    explanation: "അവർ കേട്ട സന്ദേശത്തിന് മൂല്യമില്ലായിരുന്നു കാരണം അവർ അനുസരിച്ചവരുടെ വിശ്വാസം പങ്കിട്ടില്ല."
  },
  {
    id: 3,
    question: "എബ്രായർ 4:3 അനുസരിച്ച് ദൈവം തന്റെ കോപത്തിൽ എന്ത് സത്യം ചെയ്തു?",
    options: ["അവൻ ഭൂമിയെ നശിപ്പിക്കും", "അവർ എന്നെന്നേക്കും എന്റെ വിശ്രമത്തിൽ പ്രവേശിക്കില്ല", "അവൻ വെള്ളപ്പൊക്കം അയയ്ക്കും", "അവൻ തന്റെ ജനത്തെ ഉപേക്ഷിക്കും"],
    correct: 1,
    explanation: "ദൈവം തന്റെ കോപത്തിൽ സത്യം ചെയ്തു, 'അവർ എന്നെന്നേക്കും എന്റെ വിശ്രമത്തിൽ പ്രവേശിക്കില്ല.'"
  },
  {
    id: 4,
    question: "എബ്രായർ 4:4 അനുസരിച്ച് ഏഴാം ദിവസം എന്ത് സംഭവിച്ചു?",
    options: ["ദൈവം സൂര്യനെയും ചന്ദ്രനെയും സൃഷ്ടിച്ചു", "ദൈവം തന്റെ എല്ലാ പ്രവൃത്തികളിൽ നിന്നും വിശ്രമിച്ചു", "ദൈവം പുരുഷനെയും സ്ത്രീയെയും സൃഷ്ടിച്ചു", "ദൈവം മൃഗങ്ങളെ അനുഗ്രഹിച്ചു"],
    correct: 1,
    explanation: "ഏഴാം ദിവസം ദൈവം തന്റെ എല്ലാ പ്രവൃത്തികളിൽ നിന്നും വിശ്രമിച്ചു."
  },
  {
    id: 5,
    question: "എബ്രായർ 4:8 അനുസരിച്ച് യോശുവ അവർക്ക് വിശ്രമം നൽകിയിരുന്നുവെങ്കിൽ ദൈവം എന്ത് ചെയ്യില്ലായിരുന്നു?",
    options: ["പുതിയ നിയമം സൃഷ്ടിക്കുക", "പിന്നീട് മറ്റൊരു ദിവസത്തെക്കുറിച്ച് സംസാരിക്കുക", "തന്റെ പുത്രനെ ഭൂമിയിൽ അയയ്ക്കുക", "അവർക്ക് പത്ത് കല്പനകൾ നൽകുക"],
    correct: 1,
    explanation: "യോശുവ അവർക്ക് വിശ്രമം നൽകിയിരുന്നുവെങ്കിൽ ദൈവം പിന്നീട് മറ്റൊരു ദിവസത്തെക്കുറിച്ച് സംസാരിക്കില്ലായിരുന്നു."
  },
  {
    id: 6,
    question: "എബ്രായർ 4:9 അനുസരിച്ച് ദൈവത്തിന്റെ ജനത്തിന് എന്ത് അവശേഷിക്കുന്നു?",
    options: ["ഒരു ആഴ്ചയിലെ ശബ്ബത്ത് ദിവസം", "ഒരു ശബ്ബത്ത്-വിശ്രമം", "ഒരു പുതിയ നിയമം", "ഒരു വ്യത്യസ്ത നിയമം"],
    correct: 1,
    explanation: "ദൈവത്തിന്റെ ജനത്തിന് ഒരു ശബ്ബത്ത്-വിശ്രമം അവശേഷിക്കുന്നു."
  },
  {
    id: 7,
    question: "എബ്രായർ 4:10 അനുസരിച്ച് ആരെങ്കിലും ദൈവത്തിന്റെ വിശ്രമത്തിൽ പ്രവേശിക്കുമ്പോൾ എന്ത് സംഭവിക്കുന്നു?",
    options: ["അവർ പരിപൂർണ്ണരാകുന്നു", "അവരും ദൈവം തന്റെ പ്രവൃത്തികളിൽ നിന്ന് വിശ്രമിച്ചതുപോലെ തങ്ങളുടെ പ്രവൃത്തികളിൽ നിന്ന് വിശ്രമിക്കുന്നു", "അവർക്ക് പ്രത്യേക ശക്തികൾ ലഭിക്കുന്നു", "അവരുടെ മോക്ഷം ഉറപ്പാക്കുന്നു"],
    correct: 1,
    explanation: "ആരെങ്കിലും ദൈവത്തിന്റെ വിശ്രമത്തിൽ പ്രവേശിക്കുമ്പോൾ അവരും ദൈവം തന്റെ പ്രവൃത്തികളിൽ നിന്ന് വിശ്രമിച്ചതുപോലെ തങ്ങളുടെ പ്രവൃത്തികളിൽ നിന്ന് വിശ്രമിക്കുന്നു."
  },
  {
    id: 8,
    question: "എബ്രായർ 4:12 അനുസരിച്ച് ദൈവത്തിന്റെ വചനം എങ്ങനെ വിവരിക്കപ്പെടുന്നു?",
    options: ["ഒരു മൃദുവായ ശബ്ദം", "ജീവനുള്ളതും സജീവവുമായ, ഏതെങ്കിലും ഇരുമുനവാൾക്കും കൂടുതൽ മൂർച്ചയുള്ളത്", "ഒരു മനോഹരമായ ഗാനം", "ഒരു ആശ്വാസകരമായ കമ്പിളി"],
    correct: 1,
    explanation: "ദൈവത്തിന്റെ വചനം ജീവനുള്ളതും സജീവവുമാണ്, ഏതെങ്കിലും ഇരുമുനവാൾക്കും കൂടുതൽ മൂർച്ചയുള്ളത്."
  },
  {
    id: 9,
    question: "എബ്രായർ 4:12 അനുസരിച്ച് ദൈവത്തിന്റെ വചനം എന്ത് തുളച്ചുകയറുന്നു?",
    options: ["മനസ്സ് മാത്രം", "ആത്മാവിനെയും ആത്മാവിനെയും, സന്ധികളെയും മജ്ജയെയും വേർതിരിക്കുന്നതുവരെ", "ഹൃദയം മാത്രം", "ശരീരം മാത്രം"],
    correct: 1,
    explanation: "ദൈവത്തിന്റെ വചനം ആത്മാവിനെയും ആത്മാവിനെയും, സന്ധികളെയും മജ്ജയെയും വേർതിരിക്കുന്നതുവരെ തുളച്ചുകയറുന്നു."
  },
  {
    id: 10,
    question: "എബ്രായർ 4:13 അനുസരിച്ച് ദൈവത്തിന്റെ കാഴ്ചയിൽ നിന്ന് എന്ത് മറഞ്ഞിരിക്കുന്നില്ല?",
    options: ["സൃഷ്ടിയിലെ ചില കാര്യങ്ങൾ", "സൃഷ്ടിയിൽ ഒന്നും", "ഞങ്ങളുടെ നല്ല പ്രവൃത്തികൾ മാത്രം", "ഞങ്ങളുടെ പാപങ്ങൾ മാത്രം"],
    correct: 1,
    explanation: "സൃഷ്ടിയിൽ ഒന്നും ദൈവത്തിന്റെ കാഴ്ചയിൽ നിന്ന് മറഞ്ഞിരിക്കുന്നില്ല."
  },
  {
    id: 11,
    question: "എബ്രായർ 4:14 അനുസരിച്ച് സ്വർഗ്ഗത്തിൽ കയറിയ ഞങ്ങളുടെ മഹാ മഹാപുരോഹിതൻ ആരാണ്?",
    options: ["മോശെ", "ആരോൺ", "യേശു ദൈവത്തിന്റെ പുത്രൻ", "മെൽഖീസെദെക്"],
    correct: 2,
    explanation: "യേശു ദൈവത്തിന്റെ പുത്രൻ സ്വർഗ്ഗത്തിൽ കയറിയ ഞങ്ങളുടെ മഹാ മഹാപുരോഹിതനാണ്."
  },
  {
    id: 12,
    question: "എബ്രായർ 4:15 അനുസരിച്ച് യേശു ഞങ്ങളുടെ ബലഹീനതകളോട് സഹാനുഭൂതി കാണിക്കാൻ കഴിയുന്നത് എന്തുകൊണ്ട്?",
    options: ["അവൻ മനുഷ്യസ്വഭാവം പഠിച്ചതുകൊണ്ട്", "അവൻ ഞങ്ങളെപ്പോലെ എല്ലാ വിധത്തിലും പരീക്ഷിക്കപ്പെട്ടു—എന്നാൽ അവൻ പാപം ചെയ്തില്ല", "അവൻ ഒരിക്കൽ മനുഷ്യനായിരുന്നതുകൊണ്ട്", "അവൻ ഞങ്ങളുടെ പോരാട്ടങ്ങൾ മനസ്സിലാക്കുന്നതുകൊണ്ട്"],
    correct: 1,
    explanation: "യേശു ഞങ്ങളുടെ ബലഹീനതകളോട് സഹാനുഭൂതി കാണിക്കാൻ കഴിയുന്നത് അവൻ ഞങ്ങളെപ്പോലെ എല്ലാ വിധത്തിലും പരീക്ഷിക്കപ്പെട്ടതുകൊണ്ടാണ്—എന്നാൽ അവൻ പാപം ചെയ്തില്ല."
  },
  {
    id: 13,
    question: "എബ്രായർ 4:16 അനുസരിച്ച് ഞങ്ങൾ ദൈവത്തിന്റെ കൃപയുടെ സിംഹാസനത്തിനടുത്ത് എങ്ങനെ പോകണം?",
    options: ["ഭയത്തോടും വിറയലോടും", "ആത്മവിശ്വാസത്തോടെ", "പൂർണ്ണ നീതിയോടെ", "നിരവധി യാഗങ്ങളോടെ"],
    correct: 1,
    explanation: "ഞങ്ങൾ ആത്മവിശ്വാസത്തോടെ ദൈവത്തിന്റെ കൃപയുടെ സിംഹാസനത്തിനടുത്ത് പോകണം."
  },
  {
    id: 14,
    question: "എബ്രായർ 4:16 അനുസരിച്ച് ഞങ്ങൾ ദൈവത്തിന്റെ സിംഹാസനത്തിനടുത്ത് പോകുമ്പോൾ എന്ത് ലഭിക്കാം?",
    options: ["ന്യായവിധി മാത്രം", "കരുണയും ഞങ്ങളുടെ ആവശ്യത്തിന് സഹായിക്കാൻ കൃപയും", "അനുഗ്രഹങ്ങൾ മാത്രം", "ക്ഷമ മാത്രം"],
    correct: 1,
    explanation: "ഞങ്ങൾ കരുണയും ഞങ്ങളുടെ ആവശ്യത്തിന് സഹായിക്കാൻ കൃപയും ലഭിക്കാം."
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
      trackQuizAbandon('todays-quiz-hebrews-4', 'Today\'s Quiz - Hebrews 4', currentQuestion + 1);
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
        'todays-quiz-hebrews-4',
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
        'todays-quiz-hebrews-4',
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
        'todays-quiz-hebrews-4',
        'Today\'s Quiz - Hebrews 4',
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
      if (percentage >= 90) return "उत्कृष्ट! आप इब्रानियों 4 के विशेषज्ञ हैं!";
      if (percentage >= 80) return "बहुत बढ़िया! आप इब्रानियों 4 को अच्छी तरह जानते हैं!";
      if (percentage >= 70) return "अच्छा काम! इब्रानियों 4 का अध्ययन जारी रखें!";
      if (percentage >= 60) return "बुरा नहीं! इब्रानियों 4 का और अध्ययन करें!";
      return "अध्ययन जारी रखें! इब्रानियों 4 में बहुत कुछ है!";
    } else if (selectedLanguage === 'malayalam') {
      if (percentage >= 90) return "മികച്ചത്! നിങ്ങൾ എബ്രായർ 4 നന്നായി അറിയുന്നു!";
      if (percentage >= 80) return "വളരെ നല്ലത്! നിങ്ങൾ എബ്രായർ 4 നന്നായി അറിയുന്നു!";
      if (percentage >= 70) return "നല്ല ജോലി! എബ്രായർ 4 പഠനം തുടരുക!";
      if (percentage >= 60) return "മോശമല്ല! എബ്രായർ 4 കൂടുതൽ പഠിക്കുക!";
      return "പഠനം തുടരുക! എബ്രായർ 4 ൽ വളരെയധികം ഉണ്ട്!";
    } else {
      if (percentage >= 90) return "Excellent! You're a Hebrews 4 expert!";
      if (percentage >= 80) return "Great job! You know Hebrews 4 well!";
      if (percentage >= 70) return "Good work! Keep studying Hebrews 4!";
      if (percentage >= 60) return "Not bad! Review Hebrews 4 more!";
      return "Keep studying! Hebrews 4 has much to offer!";
    }
  };

  const handleLanguageSelect = (language: 'english' | 'hindi' | 'malayalam') => {
    setSelectedLanguage(language);
    setShowLanguageSelection(false);
    
    // Track quiz start
    trackQuizStart('todays-quiz-hebrews-4', 'Today\'s Quiz - Hebrews 4', 'mixed');
  };

  // Language selection screen
  if (showLanguageSelection) {
    return (
      <>
        <Helmet>
          <title>Today's Quiz - Hebrews 4 | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of Hebrews 4 with today's special quiz." />
        </Helmet>
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-6 sm:py-12">
            <div className="max-w-2xl mx-auto">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-12">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-urbanist font-semibold text-gray-900 mb-4 sm:mb-6">
                  Today's Quiz - Hebrews 4
                </h1>
                <p className="text-base sm:text-lg font-urbanist font-light text-gray-600">Choose your language</p>
              </div>

              {/* Language Selection */}
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => handleLanguageSelect('english')}
                  className="w-full p-4 sm:p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center">
                    <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 mr-4 flex-shrink-0" strokeWidth={1} />
                    <div>
                      <div className="text-lg sm:text-xl font-urbanist font-medium text-gray-900">English</div>
                      <div className="text-sm sm:text-base font-urbanist font-light text-gray-600">Take the quiz in English</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleLanguageSelect('hindi')}
                  className="w-full p-4 sm:p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center">
                    <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 mr-4 flex-shrink-0" strokeWidth={1} />
                    <div>
                      <div className="text-lg sm:text-xl font-urbanist font-medium text-gray-900">हिंदी</div>
                      <div className="text-sm sm:text-base font-urbanist font-light text-gray-600">हिंदी में क्विज लें</div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleLanguageSelect('malayalam')}
                  className="w-full p-4 sm:p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center">
                    <Languages className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 mr-4 flex-shrink-0" strokeWidth={1} />
                    <div>
                      <div className="text-lg sm:text-xl font-urbanist font-medium text-gray-900">മലയാളം</div>
                      <div className="text-sm sm:text-base font-urbanist font-light text-gray-600">മലയാളത്തിൽ ക്വിസ് എടുക്കുക</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Back to Home */}
              <div className="text-center mt-8 sm:mt-12">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-urbanist font-light border-gray-300"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-gray-700" strokeWidth={1} />
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

    return (
      <>
        <Helmet>
          <title>Today's Quiz - Hebrews 4 | Bible Quiz Competition</title>
          <meta name="description" content="Test your knowledge of Hebrews 4 with today's special quiz." />
        </Helmet>
        <div className="min-h-screen bg-white">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-5xl mx-auto">
              {/* Header with celebration */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center mb-6">
                  <h1 className="text-4xl font-urbanist font-semibold text-gray-900">
                    Today's Quiz - Hebrews 4
                  </h1>
                </div>
                <div className="inline-flex items-center px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-gray-700 mr-2" strokeWidth={1} />
                  <span className="text-lg font-urbanist font-medium text-gray-900">Quiz Completed!</span>
                </div>
              </div>

              {/* Results Card with enhanced design */}
              <Card className="mb-8 border border-gray-200 bg-white">
                <CardHeader className="text-center pb-8">
                  <div className="relative mb-6">
                    <div className={`w-32 h-32 mx-auto rounded-full bg-gray-900 flex items-center justify-center`}>
                      <div className="text-white text-4xl font-urbanist font-semibold">{percentage}%</div>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" strokeWidth={1} />
                    </div>
                  </div>
                  
                  <CardTitle className="text-3xl mb-4 font-urbanist font-semibold text-gray-900">
                    Your Results
                  </CardTitle>
                  
                  <div className="flex justify-center items-center gap-6 mb-6">
                    <div className="text-6xl font-urbanist font-semibold text-gray-900">{score}</div>
                    <div className="text-3xl text-gray-400">/</div>
                    <div className="text-3xl font-urbanist font-light text-gray-600">{getCurrentQuestions().length}</div>
                  </div>
                  
                  <div className="text-2xl font-urbanist font-medium text-gray-900 mb-3">
                    {getScoreMessage()}
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-full max-w-md bg-gray-100 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gray-900 transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="px-4 sm:px-8">
                  <h3 className="text-lg sm:text-xl font-urbanist font-semibold text-gray-900 mb-4 sm:mb-6 text-center">Question Review</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {answers.map((answer, index) => {
                      const question = getCurrentQuestions().find(q => q.id === answer.questionId);
                      return (
                        <div key={index} className={`p-4 sm:p-6 rounded-lg border transition-all duration-200 ${
                          answer.correct 
                            ? 'bg-gray-50 border-gray-300' 
                            : 'bg-red-50 border-red-200'
                        }`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-urbanist font-semibold text-base sm:text-lg text-gray-900">Question {index + 1}</div>
                            {answer.correct ? (
                              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" strokeWidth={1} />
                            ) : (
                              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs sm:text-sm font-bold">✕</span>
                              </div>
                            )}
                          </div>
                          <div className="text-gray-700 mb-3 sm:mb-4 font-urbanist font-light text-sm sm:text-base leading-relaxed">{question?.question}</div>
                          <div className="space-y-2">
                            <div className="text-xs sm:text-sm">
                              <span className="font-urbanist font-medium text-gray-600">Your answer: </span>
                              <span className={`font-urbanist font-light ${answer.correct ? 'text-gray-900' : 'text-red-700'}`}>
                                {question?.options[answer.selected]}
                              </span>
                            </div>
                            {!answer.correct && (
                              <div className="text-xs sm:text-sm">
                                <span className="font-urbanist font-medium text-gray-600">Correct answer: </span>
                                <span className="font-urbanist font-light text-gray-900">
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
                  className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-urbanist font-light rounded-lg transition-all duration-300"
                  onClick={() => navigate('/')}
                >
                  <Home className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" strokeWidth={1} />
                  Back to Home
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-urbanist font-light rounded-lg border border-gray-300 text-gray-900 hover:bg-gray-50 transition-all duration-300"
                  onClick={() => window.location.reload()}
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" strokeWidth={1} />
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
        <title>Today's Quiz - Hebrews 4 | Bible Quiz Competition</title>
        <meta name="description" content="Test your knowledge of Hebrews 4 with today's special quiz." />
      </Helmet>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            {/* Enhanced Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h1 className="text-3xl sm:text-4xl font-urbanist font-semibold text-gray-900 mb-6">
                Today's Quiz - Hebrews 4
              </h1>
              
              {/* Enhanced Timer and Progress */}
              <div className="flex flex-row justify-center items-center gap-3 sm:gap-8 mb-8">
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-6 py-2 sm:py-4 flex-1 max-w-xs sm:w-auto">
                  <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" strokeWidth={1} />
                  <div>
                    <div className="text-lg sm:text-2xl font-urbanist font-semibold text-gray-900">{formatTime(timeLeft)}</div>
                    <div className="text-xs sm:text-sm font-urbanist font-light text-gray-600">Time</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 border border-gray-200 rounded-lg px-3 sm:px-6 py-2 sm:py-4 flex-1 max-w-xs sm:w-auto">
                  <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" strokeWidth={1} />
                  <div>
                    <div className="text-lg sm:text-2xl font-urbanist font-semibold text-gray-900">
                      {currentQuestion + 1}/{getCurrentQuestions().length}
                    </div>
                    <div className="text-xs sm:text-sm font-urbanist font-light text-gray-600">Questions</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question Card */}
            <Card className="mb-6 sm:mb-8 border border-gray-200">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl mb-3 sm:mb-4 font-urbanist font-semibold text-gray-900">
                  Question {currentQuestion + 1}
                </CardTitle>
                <CardDescription className="text-base sm:text-lg leading-relaxed font-urbanist font-light text-gray-700">
                  {getCurrentQuestions()[currentQuestion].question}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <div className="space-y-2 sm:space-y-3">
                  {getCurrentQuestions()[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-3 sm:p-4 text-left rounded-lg border transition-all duration-200 font-urbanist font-light ${
                        selectedAnswer === index
                          ? 'border-gray-900 bg-gray-50 text-gray-900'
                          : 'border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 flex items-center justify-center flex-shrink-0 ${
                          selectedAnswer === index
                            ? 'border-gray-900 bg-gray-900'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswer === index && (
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={1} />
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
                className={`w-full max-w-xs sm:max-w-none px-6 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-urbanist font-light rounded-lg transition-all duration-300 ${
                  selectedAnswer === null
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                    : 'bg-black hover:bg-gray-800 text-white'
                }`}
              >
                <span className="hidden sm:inline">
                  {currentQuestion === getCurrentQuestions().length - 1 ? 'Submit Quiz' : 'Next Question'}
                </span>
                <span className="sm:hidden">
                  {currentQuestion === getCurrentQuestions().length - 1 ? 'Submit' : 'Next'}
                </span>
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 ml-2" strokeWidth={1} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysQuiz;

