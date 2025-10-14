import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Heart, Lightbulb, Share2, ArrowLeft, Menu, Globe } from "lucide-react";
import { Helmet } from 'react-helmet';

// Expanded daily Bible verses with explanations in English and Hindi
const dailyVerses = [
  {
    ref: "John 3:16",
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    textHindi: "क्योंकि परमेश्वर ने जगत से ऐसा प्रेम किया कि उसने अपना एकलौता पुत्र दे दिया, कि जो कोई उस पर विश्वास करे, वह नाश न हो, परन्तु अनन्त जीवन पाए।",
    explanation: "This is perhaps the most well-known verse in the Bible, often called 'the gospel in a nutshell.' It reveals God's incredible love for humanity - so great that He was willing to sacrifice His only Son for our salvation. The verse emphasizes that salvation is available to anyone who believes, regardless of their background or past mistakes.",
    explanationHindi: "यह शायद बाइबल में सबसे प्रसिद्ध पद है, जिसे अक्सर 'सुसमाचार का सार' कहा जाता है। यह मानवता के लिए परमेश्वर के अविश्वसनीय प्रेम को प्रकट करता है - इतना महान कि वह हमारे उद्धार के लिए अपने एकमात्र पुत्र को बलिदान करने को तैयार था। यह पद इस बात पर जोर देता है कि उद्धार किसी भी व्यक्ति के लिए उपलब्ध है जो विश्वास करता है, चाहे उसकी पृष्ठभूमि या अतीत की गलतियां कुछ भी हों।",
    application: "Remember that God's love is unconditional and available to you right now. If you haven't already, consider accepting this gift of eternal life through faith in Jesus Christ.",
    applicationHindi: "याद रखें कि परमेश्वर का प्रेम बिना शर्त है और आपके लिए अभी उपलब्ध है। यदि आपने अभी तक नहीं किया है, तो यीशु मसीह में विश्वास के द्वारा अनन्त जीवन के इस उपहार को स्वीकार करने पर विचार करें।",
    prayer: "Thank you, God, for your incredible love that sent Jesus to save us. Help me to share this love with others today.",
    prayerHindi: "हे परमेश्वर, हमें बचाने के लिए यीशु को भेजने वाले आपके अविश्वसनीय प्रेम के लिए धन्यवाद। मुझे आज दूसरों के साथ इस प्रेम को साझा करने में मदद करें।"
  },
  {
    ref: "Psalm 119:105",
    text: "Your word is a lamp to my feet and a light to my path.",
    textHindi: "तेरा वचन मेरे पांव के लिए दीपक, और मेरे मार्ग के लिए उजियाला है।",
    explanation: "This verse beautifully illustrates how God's Word (the Bible) guides us through life. Just as a lamp helps us see in the darkness, Scripture illuminates our way, showing us the right path to take and helping us avoid pitfalls and dangers.",
    explanationHindi: "यह पद सुंदर रूप से दिखाता है कि परमेश्वर का वचन (बाइबल) जीवन में हमारा मार्गदर्शन कैसे करता है। जैसे एक दीपक अंधेरे में हमें देखने में मदद करता है, वैसे ही पवित्र शास्त्र हमारे मार्ग को प्रकाशित करता है, हमें सही रास्ता दिखाता है और खतरों से बचने में मदद करता है।",
    application: "Make time to read the Bible daily. Let it be your guide for decisions, relationships, and life choices. When you're uncertain about which direction to take, turn to God's Word for wisdom.",
    applicationHindi: "बाइबल को दैनिक पढ़ने के लिए समय निकालें। इसे अपने निर्णयों, रिश्तों और जीवन के विकल्पों के लिए अपना मार्गदर्शक बनने दें। जब आप अनिश्चित हों कि किस दिशा में जाना है, तो बुद्धि के लिए परमेश्वर के वचन की ओर मुड़ें।",
    prayer: "Lord, help me to treasure your Word and let it guide my steps each day. Illuminate my path with your truth.",
    prayerHindi: "हे प्रभु, मुझे आपके वचन को संजोने और इसे हर दिन अपने कदमों का मार्गदर्शन करने में मदद करें। अपनी सच्चाई से मेरे मार्ग को प्रकाशित करें।"
  },
  {
    ref: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    textHindi: "यहोवा पर भरोसा रखना, और अपनी बुद्धि का सहारा न लेना। उसी को स्मरण करके सब काम करना, तब वह तेरे लिये सीधा मार्ग निकालेगा।",
    explanation: "This passage teaches us about complete trust in God. It's not about ignoring our intelligence, but rather acknowledging that God's wisdom surpasses our limited human understanding. When we submit our plans to Him, He promises to guide us on the right path.",
    explanationHindi: "यह पद हमें परमेश्वर में पूर्ण भरोसे के बारे में सिखाता है। यह हमारी बुद्धि को नजरअंदाज करने के बारे में नहीं है, बल्कि यह स्वीकार करने के बारे में है कि परमेश्वर की बुद्धि हमारी सीमित मानवीय समझ से बढ़कर है। जब हम अपनी योजनाओं को उसके सामने रखते हैं, तो वह हमें सही मार्ग पर ले जाने का वादा करता है।",
    application: "When facing difficult decisions, pray for God's guidance and be willing to follow His direction, even when it doesn't make sense from a human perspective. Trust that He knows what's best for you.",
    applicationHindi: "जब कठिन निर्णयों का सामना करें, तो परमेश्वर से मार्गदर्शन के लिए प्रार्थना करें और उसकी दिशा का पालन करने के लिए तैयार रहें, भले ही यह मानवीय दृष्टिकोण से समझ में न आए। विश्वास रखें कि वह जानता है कि आपके लिए क्या सबसे अच्छा है।",
    prayer: "Father, help me to trust you completely and not rely on my own understanding. Guide my steps and make my paths straight.",
    prayerHindi: "हे पिता, मुझे आप पर पूरी तरह भरोसा करने और अपनी समझ पर निर्भर न रहने में मदद करें। मेरे कदमों का मार्गदर्शन करें और मेरे मार्गों को सीधा बनाएं।"
  },
  {
    ref: "Philippians 4:6-7",
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
    textHindi: "किसी भी बात की चिन्ता न करो, परन्तु हर एक बात में प्रार्थना और बिनती के द्वारा धन्यवाद के साथ अपनी बिनतियां परमेश्वर के सामने प्रगट करो। और परमेश्वर की शान्ति, जो सब समझ से बढ़कर है, तुम्हारे हृदय और तुम्हारे मन को मसीह यीशु में सुरक्षित रखेगी।",
    explanation: "Paul wrote this while in prison, showing that God's peace is available even in difficult circumstances. The key is bringing our worries to God in prayer with a thankful heart. God's peace isn't just the absence of problems - it's a deep, supernatural calm that guards our hearts and minds.",
    explanationHindi: "पौलुस ने इसे जेल में रहते हुए लिखा, यह दिखाते हुए कि परमेश्वर की शांति कठिन परिस्थितियों में भी उपलब्ध है। मुख्य बात यह है कि हम अपनी चिंताओं को धन्यवाद के साथ प्रार्थना में परमेश्वर के सामने लाएं। परमेश्वर की शांति केवल समस्याओं की अनुपस्थिति नहीं है - यह एक गहरी, अलौकिक शांति है जो हमारे हृदय और मन की रक्षा करती है।",
    application: "When anxiety strikes, stop and pray. Thank God for His goodness, present your concerns to Him, and trust that He will provide peace that goes beyond what we can understand.",
    applicationHindi: "जब चिंता आए, तो रुकें और प्रार्थना करें। उसकी भलाई के लिए परमेश्वर का धन्यवाद करें, अपनी चिंताओं को उसके सामने रखें, और विश्वास करें कि वह शांति प्रदान करेगा जो हमारी समझ से बढ़कर है।",
    prayer: "Lord, I bring my worries to you now. Help me to trust in your peace that surpasses all understanding. Guard my heart and mind in Christ Jesus.",
    prayerHindi: "हे प्रभु, मैं अब अपनी चिंताओं को आपके सामने लाता हूं। मुझे आपकी शांति में भरोसा करने में मदद करें जो सब समझ से बढ़कर है। मसीह यीशु में मेरे हृदय और मन की रक्षा करें।"
  },
  {
    ref: "Isaiah 40:31",
    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    textHindi: "परन्तु जो यहोवा की बाट जोहते हैं, वे नई सामर्थ्य पाएंगे; वे उकाबों के समान पंख लगाकर उड़ेंगे, वे दौड़ेंगे और शिथिल न होंगे, वे चलेंगे और थकेंगे नहीं।",
    explanation: "This verse uses the powerful imagery of eagles soaring to describe what happens when we place our hope in God. Eagles are known for their strength and ability to soar high above the earth. Similarly, when we hope in the Lord, He gives us supernatural strength to overcome life's challenges.",
    explanationHindi: "यह पद उकाबों के उड़ने की शक्तिशाली कल्पना का उपयोग करता है यह बताने के लिए कि जब हम परमेश्वर में अपनी आशा रखते हैं तो क्या होता है। उकाब अपनी ताकत और पृथ्वी से ऊपर उड़ने की क्षमता के लिए जाने जाते हैं। इसी तरह, जब हम प्रभु में आशा रखते हैं, तो वह हमें जीवन की चुनौतियों पर विजय पाने के लिए अलौकिक शक्ति देता है।",
    application: "When you feel weak or overwhelmed, remember that your strength comes from God. Place your hope in Him, and He will renew your energy and give you the ability to rise above your circumstances.",
    applicationHindi: "जब आप कमजोर या अभिभूत महसूस करें, तो याद रखें कि आपकी ताकत परमेश्वर से आती है। उसमें अपनी आशा रखें, और वह आपकी ऊर्जा को नवीनीकृत करेगा और आपको अपनी परिस्थितियों से ऊपर उठने की क्षमता देगा।",
    prayer: "Lord, I place my hope in you. Renew my strength today and help me to soar above my challenges like an eagle.",
    prayerHindi: "हे प्रभु, मैं आप में अपनी आशा रखता हूं। आज मेरी ताकत को नवीनीकृत करें और मुझे एक उकाब की तरह अपनी चुनौतियों से ऊपर उड़ने में मदद करें।"
  },
  {
    ref: "Romans 8:28",
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    textHindi: "और हम जानते हैं कि जो लोग परमेश्वर से प्रेम करते हैं, उनके लिए सब बातें मिलकर भलाई ही को उत्पन्न करती हैं, अर्थात् उन्हीं के लिए जो उसकी इच्छा के अनुसार बुलाए गए हैं।",
    explanation: "This verse doesn't say that all things are good, but that God can work through all things for good. Even in our darkest moments, God is at work, weaving together the threads of our lives to create something beautiful. This promise is specifically for those who love God and are called according to His purpose.",
    explanationHindi: "यह पद यह नहीं कहता कि सब बातें अच्छी हैं, बल्कि यह कि परमेश्वर सब बातों के द्वारा भलाई के लिए काम कर सकता है। हमारे सबसे अंधेरे क्षणों में भी, परमेश्वर काम कर रहा है, हमारे जीवन के धागों को एक साथ बुनकर कुछ सुंदर बनाने के लिए। यह वादा विशेष रूप से उन लोगों के लिए है जो परमेश्वर से प्रेम करते हैं और उसकी इच्छा के अनुसार बुलाए गए हैं।",
    application: "When facing trials, remember that God can use even the most difficult situations for your good and His glory. Trust that He is working behind the scenes, even when you can't see it.",
    applicationHindi: "जब परीक्षाओं का सामना करें, तो याद रखें कि परमेश्वर आपकी भलाई और उसकी महिमा के लिए सबसे कठिन परिस्थितियों का भी उपयोग कर सकता है। विश्वास करें कि वह पर्दे के पीछे काम कर रहा है, भले ही आप इसे न देख सकें।",
    prayer: "Father, help me to trust that you are working all things together for my good. Give me faith to see your hand at work in my life.",
    prayerHindi: "हे पिता, मुझे विश्वास करने में मदद करें कि आप सब बातों को मेरी भलाई के लिए एक साथ काम कर रहे हैं। मुझे मेरे जीवन में आपके हाथ को काम करते देखने के लिए विश्वास दें।"
  },
  {
    ref: "Joshua 1:9",
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
    textHindi: "क्या मैं तुझे आज्ञा नहीं दी है? हियाव बान्धकर दृढ़ हो, और भयभीत न हो, और न हतोत्साहित हो; क्योंकि तेरा परमेश्वर यहोवा जहां कहीं तू जाए वहां तेरे संग रहेगा।",
    explanation: "God spoke these words to Joshua as he was about to lead the Israelites into the Promised Land. Joshua was taking over from Moses, a daunting task. God's promise wasn't just about physical presence, but about His constant support, guidance, and protection in every situation.",
    explanationHindi: "परमेश्वर ने ये शब्द यहोशू से कहे जब वह इस्राएलियों को वादा किए गए देश में ले जाने वाला था। यहोशू मूसा से काम ले रहा था, एक भयानक कार्य। परमेश्वर का वादा केवल शारीरिक उपस्थिति के बारे में नहीं था, बल्कि हर स्थिति में उसकी निरंतर सहायता, मार्गदर्शन और सुरक्षा के बारे में था।",
    application: "When facing new challenges or stepping into unknown territory, remember that God is with you. His presence gives you the strength and courage to face whatever lies ahead.",
    applicationHindi: "जब नई चुनौतियों का सामना करें या अज्ञात क्षेत्र में कदम रखें, तो याद रखें कि परमेश्वर आपके साथ है। उसकी उपस्थिति आपको आगे जो कुछ भी है उसका सामना करने की ताकत और साहस देती है।",
    prayer: "Lord, help me to be strong and courageous, knowing that you are with me wherever I go. Remove my fear and discouragement with your presence.",
    prayerHindi: "हे प्रभु, मुझे मजबूत और साहसी बनने में मदद करें, यह जानते हुए कि आप जहां भी मैं जाऊं वहां मेरे साथ हैं। अपनी उपस्थिति से मेरे डर और निराशा को दूर करें।"
  },
  {
    ref: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    textHindi: "क्योंकि मैं जानता हूं कि मैं तेरे विषय में क्या विचार करता हूं, यहोवा की यह वाणी है, कि शान्ति के विचार, न कि बुराई के, कि तुझे आशीर्वाद दूं।",
    explanation: "This verse was spoken to the Israelites during their exile in Babylon, a time of great difficulty. God was reminding them that even in their darkest hour, He had good plans for them. His plans are always for our welfare, not our harm, and they always include hope and a future.",
    explanationHindi: "यह पद इस्राएलियों से बाबुल में उनके निर्वासन के दौरान कहा गया था, एक बहुत कठिन समय। परमेश्वर उन्हें याद दिला रहा था कि उनके सबसे अंधेरे घंटे में भी, उसके पास उनके लिए अच्छी योजनाएं थीं। उसकी योजनाएं हमेशा हमारे कल्याण के लिए हैं, हमारे नुकसान के लिए नहीं, और उनमें हमेशा आशा और भविष्य शामिल होता है।",
    application: "When life seems uncertain or difficult, remember that God has good plans for you. Trust in His timing and His purposes, even when you can't see the full picture.",
    applicationHindi: "जब जीवन अनिश्चित या कठिन लगे, तो याद रखें कि परमेश्वर के पास आपके लिए अच्छी योजनाएं हैं। उसके समय और उसके उद्देश्यों पर भरोसा करें, भले ही आप पूरी तस्वीर न देख सकें।",
    prayer: "Father, help me to trust in your good plans for my life. Give me hope for the future and faith in your perfect timing.",
    prayerHindi: "हे पिता, मुझे अपने जीवन के लिए आपकी अच्छी योजनाओं पर भरोसा करने में मदद करें। मुझे भविष्य के लिए आशा और आपके सही समय में विश्वास दें।"
  },
  {
    ref: "Matthew 11:28",
    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
    textHindi: "हे सब परिश्रम करने वालों और बोझ से दबे हुओं, मेरे पास आओ; मैं तुम्हें विश्राम दूंगा।",
    explanation: "Jesus spoke these words to people who were struggling under the heavy burden of religious legalism and life's difficulties. He offers a different kind of burden - one that is light and easy to bear. His rest isn't just physical, but spiritual and emotional peace.",
    explanationHindi: "यीशु ने ये शब्द उन लोगों से कहे जो धार्मिक कानूनवाद और जीवन की कठिनाइयों के भारी बोझ के तहत संघर्ष कर रहे थे। वह एक अलग तरह का बोझ प्रदान करता है - एक जो हल्का और सहन करने में आसान है। उसकी विश्राम केवल शारीरिक नहीं है, बल्कि आध्यात्मिक और भावनात्मक शांति है।",
    application: "When you feel overwhelmed by life's demands, come to Jesus. He offers rest for your soul and a lighter burden. Don't try to carry everything on your own - let Him help you.",
    applicationHindi: "जब आप जीवन की मांगों से अभिभूत महसूस करें, तो यीशु के पास आएं। वह आपकी आत्मा के लिए विश्राम और एक हल्का बोझ प्रदान करता है। सब कुछ अपने दम पर ले जाने की कोशिश न करें - उसे आपकी मदद करने दें।",
    prayer: "Jesus, I come to you weary and burdened. Please give me your rest and help me to trust you with my struggles.",
    prayerHindi: "हे यीशु, मैं थका हुआ और बोझ से दबा हुआ आपके पास आता हूं। कृपया मुझे अपना विश्राम दें और मुझे अपने संघर्षों के साथ आप पर भरोसा करने में मदद करें।"
  },
  {
    ref: "2 Corinthians 12:9",
    text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.",
    textHindi: "और उसने मुझसे कहा, 'मेरा अनुग्रह तेरे लिये बहुत है, क्योंकि मेरी सामर्थ्य निर्बलता में सिद्ध होती है।' इसलिये मैं अपनी निर्बलताओं पर और भी अधिक घमण्ड करूंगा, कि मसीह की सामर्थ्य मुझ पर छाया करे।",
    explanation: "Paul wrote this after asking God to remove a 'thorn in his flesh' three times. God's response was that His grace was enough. This teaches us that God's strength is most evident in our weakness, and His grace is sufficient for every situation we face.",
    explanationHindi: "पौलुस ने इसे परमेश्वर से तीन बार अपने 'शरीर के कांटे' को हटाने के लिए कहने के बाद लिखा। परमेश्वर का जवाब था कि उसका अनुग्रह पर्याप्त था। यह हमें सिखाता है कि परमेश्वर की ताकत हमारी कमजोरी में सबसे अधिक स्पष्ट है, और उसका अनुग्रह हमारे सामने आने वाली हर स्थिति के लिए पर्याप्त है।",
    application: "When you feel weak or inadequate, remember that God's grace is sufficient. His power works best in our weakness, so don't be ashamed of your limitations - let God work through them.",
    applicationHindi: "जब आप कमजोर या अपर्याप्त महसूस करें, तो याद रखें कि परमेश्वर का अनुग्रह पर्याप्त है। उसकी ताकत हमारी कमजोरी में सबसे अच्छी तरह काम करती है, इसलिए अपनी सीमाओं से शर्मिंदा न हों - परमेश्वर को उनके माध्यम से काम करने दें।",
    prayer: "Lord, thank you that your grace is sufficient for me. Help me to rely on your strength in my weakness and to boast in your power.",
    prayerHindi: "हे प्रभु, धन्यवाद कि आपका अनुग्रह मेरे लिए पर्याप्त है। मुझे अपनी कमजोरी में आपकी ताकत पर निर्भर रहने और आपकी शक्ति पर घमंड करने में मदद करें।"
  }
];

export default function DailyVerse() {
  const navigate = useNavigate();
  const [verse, setVerse] = useState(dailyVerses[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && !(event.target as Element).closest('header')) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mobileMenuOpen]);

  // Pick a daily verse deterministically based on today's date
  useEffect(() => {
    const today = new Date();
    const start = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const idx = dayOfYear % dailyVerses.length;
    setVerse(dailyVerses[idx]);
  }, []);

  const handleShare = async () => {
    const currentText = language === 'hindi' ? (verse.textHindi || verse.text) : verse.text;
    const shareText = language === 'hindi' 
      ? `आज का दैनिक पद: ${verse.ref}\n\n"${currentText}"\n\nBible Quiz Competition पर और पढ़ें`
      : `Today's Daily Verse: ${verse.ref}\n\n"${currentText}"\n\nRead more at Bible Quiz Competition`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === 'hindi' ? "दैनिक बाइबल पद" : "Daily Bible Verse",
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        alert(language === 'hindi' ? 'पद क्लिपबोर्ड में कॉपी हो गया!' : 'Verse copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };


  return (
    <>
      <Helmet>
        <title>{language === 'hindi' ? `दैनिक बाइबल पद - ${verse.ref}` : `Daily Bible Verse - ${verse.ref}`} | Bible Quiz Competition</title>
        <meta name="description" content={language === 'hindi' 
          ? `आज का दैनिक बाइबल पद: ${verse.ref} - "${verse.textHindi || verse.text}" व्याख्या और अनुप्रयोग के साथ।`
          : `Today's daily Bible verse: ${verse.ref} - "${verse.text}" with explanation and application.`} />
        <meta name="keywords" content={language === 'hindi' 
          ? "दैनिक बाइबल पद, शास्त्र, भक्ति, ईसाई, बाइबल अध्ययन"
          : "daily bible verse, scripture, devotion, christian, bible study"} />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
        {/* Navbar */}
        <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-row justify-between items-center relative">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}> 
              <img src="/sword.png" alt="Bible Quiz Competition Logo" className="w-6 h-6 sm:w-7 sm:h-7 mr-2 inline-block align-middle" />
              <span className="text-base sm:text-lg font-semibold text-gray-900">Bible Quiz Competition</span>
            </div>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-colors"
              aria-label="Open navigation menu"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-gray-900" />
            </button>
            {/* Nav links for desktop */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 xl:space-x-3">
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/bible-questions-and-answers-hub")}>
                <span className="hidden lg:inline">Bible Q&A Hub</span>
                <span className="lg:hidden">Q&A Hub</span>
              </button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/articles")}>Articles</button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/prayer-requests")}>
                <span className="hidden lg:inline">Prayer Requests</span>
                <span className="lg:hidden">Prayers</span>
              </button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/help")}>Help</button>
              <button className="text-black font-semibold px-2 md:px-3 lg:px-4 py-2 bg-transparent border-none shadow-none hover:underline transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/login")}>Sign In</button>
              <Button variant="ghost" className="bg-black text-white font-semibold px-2 md:px-3 lg:px-4 py-2 rounded hover:bg-gray-800 transition-all duration-200 text-sm lg:text-base" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            </nav>
            {/* Mobile dropdown menu */}
            {mobileMenuOpen && (
              <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-xl shadow-xl border border-blue-100 z-50 flex flex-col items-stretch overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/bible-questions-and-answers-hub"); }}>Bible Q&A Hub</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/articles"); }}>Articles</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/prayer-requests"); }}>Prayer Requests</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/help"); }}>Help</button>
                <button className="text-black font-semibold px-4 py-4 text-left hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200 border-b border-gray-100 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/login"); }}>Sign In</button>
                <button className="bg-black text-white font-semibold px-4 py-4 text-left hover:bg-gray-900 active:bg-gray-800 transition-colors duration-200 touch-manipulation" onClick={() => { setMobileMenuOpen(false); navigate("/auth/register"); }}>Sign Up</button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>

          {/* Daily Verse Card */}
          <Card className="shadow-xl border-0 mb-8">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">{language === 'hindi' ? 'दैनिक बाइबल पद' : 'Daily Bible Verse'}</h1>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLanguage(language === 'english' ? 'hindi' : 'english')}
                  className="flex items-center space-x-1"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === 'english' ? 'हिंदी' : 'English'}</span>
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Verse Reference */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">{verse.ref}</h2>
                <blockquote className="text-xl md:text-2xl text-gray-800 italic leading-relaxed">
                  "{language === 'hindi' ? (verse.textHindi || verse.text) : verse.text}"
                </blockquote>
              </div>

              {/* Share Button */}
              <div className="flex justify-center">
                <Button
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{language === 'hindi' ? 'इस पद को साझा करें' : 'Share This Verse'}</span>
                </Button>
              </div>

              {/* Explanation Section */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">{language === 'hindi' ? 'व्याख्या' : 'Explanation'}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{language === 'hindi' ? (verse.explanationHindi || verse.explanation) : verse.explanation}</p>
              </div>

              {/* Application Section */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Heart className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">{language === 'hindi' ? 'अनुप्रयोग' : 'Application'}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">{language === 'hindi' ? (verse.applicationHindi || verse.application) : verse.application}</p>
              </div>

              {/* Prayer Section */}
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">{language === 'hindi' ? 'प्रार्थना' : 'Prayer'}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{language === 'hindi' ? (verse.prayerHindi || verse.prayer) : verse.prayer}"</p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Resources */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                  Bible Study Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Explore our comprehensive Bible study materials and quiz questions.</p>
                <Button 
                  onClick={() => navigate("/bible-questions-and-answers-hub")}
                  className="w-full"
                >
                  Visit Bible Q&A Hub
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-green-600" />
                  Daily Devotionals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Join our community for daily Bible study and spiritual growth.</p>
                <Button 
                  onClick={() => navigate("/auth/register")}
                  variant="outline"
                  className="w-full"
                >
                  Join Our Community
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
