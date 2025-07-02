import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "2 Timothy Quiz", description: "Continue to Paul's second letter to Timothy.", link: "/bible-questions-and-answers-hub/2-timothy" },
  { title: "2 Thessalonians Quiz", description: "Go back to Paul's second letter to the Thessalonians.", link: "/bible-questions-and-answers-hub/2-thessalonians" },
  { title: "Titus Quiz", description: "Explore Paul's letter to Titus.", link: "/bible-questions-and-answers-hub/titus" }
];

const firstTimothyQuestions = [
  { chapter: 1, question: "Who wrote the Book of 1 Timothy?", options: ["Peter", "Paul", "John", "Luke"], answer: 1 },
  { chapter: 1, question: "What does 1 Timothy 1:1 say about Paul being an apostle?", options: ["An apostle of Jesus Christ", "A prophet of Jesus Christ", "A teacher of Jesus Christ", "A disciple of Jesus Christ"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:2 say about Timothy?", options: ["To Timothy, my true son in the faith", "To Timothy, my friend", "To Timothy, my brother", "To Timothy, my student"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:3 say about staying in Ephesus?", options: ["That you may charge some that they teach no other doctrine", "That you may leave Ephesus", "That you may ignore the people", "That you may reject the people"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:4 say about fables?", options: ["Nor give heed to fables", "Give heed to fables", "Ignore fables", "Reject fables"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:5 say about the end of the commandment?", options: ["Now the end of the commandment is charity", "The end is confusion", "The end is fear", "The end is doubt"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:7 say about desiring to be teachers?", options: ["Desiring to be teachers of the law", "Desiring to be students", "Desiring to be prophets", "Desiring to be apostles"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:8 say about the law?", options: ["But we know that the law is good", "The law is bad", "The law is useless", "The law is harmful"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:9 say about the law being made for?", options: ["For the lawless and disobedient", "For the righteous", "For the holy", "For the perfect"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:10 say about sound doctrine?", options: ["According to the glorious gospel of the blessed God", "According to man's wisdom", "According to tradition", "According to philosophy"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:12 say about Christ Jesus?", options: ["I thank Christ Jesus our Lord", "I thank myself", "I thank others", "I thank no one"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:13 say about Paul being a blasphemer?", options: ["Who was before a blasphemer", "Who was always good", "Who was always holy", "Who was always righteous"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:14 say about grace?", options: ["And the grace of our Lord was exceedingly abundant", "Grace was scarce", "Grace was absent", "Grace was weak"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:15 say about Christ Jesus?", options: ["This is a faithful saying and worthy of all acceptance, that Christ Jesus came into the world to save sinners", "To condemn sinners", "To ignore sinners", "To reject sinners"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:16 say about Paul being a pattern?", options: ["For this reason I obtained mercy, that in me first Jesus Christ might show all longsuffering", "That I might be punished", "That I might be ignored", "That I might be rejected"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:17 say about the King?", options: ["Now to the King eternal, immortal, invisible, to God who alone is wise", "To the king of earth", "To the king of men", "To the king of angels"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:18 say about the prophecies?", options: ["This charge I commit to you, son Timothy, according to the prophecies", "According to my wisdom", "According to tradition", "According to philosophy"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:19 say about faith?", options: ["Having faith and a good conscience", "Having doubt", "Having fear", "Having confusion"], answer: 0 },
  { chapter: 1, question: "What does 1 Timothy 1:20 say about Hymenaeus and Alexander?", options: ["Whom I delivered to Satan", "Whom I praised", "Whom I helped", "Whom I accepted"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:1 say about supplications?", options: ["I exhort therefore, that, first of all, supplications, prayers, intercessions, and giving of thanks, be made for all men", "Be made for some men", "Be made for no men", "Be made for a few men"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:2 say about kings?", options: ["For kings, and for all that are in authority", "For no one", "For some people", "For a few people"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:3 say about God our Saviour?", options: ["For this is good and acceptable in the sight of God our Saviour", "This is bad", "This is wrong", "This is harmful"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:4 say about God's will?", options: ["Who will have all men to be saved", "Who will have some men to be saved", "Who will have no men to be saved", "Who will have a few men to be saved"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:5 say about mediators?", options: ["For there is one God, and one mediator between God and men", "There are many mediators", "There are no mediators", "There are some mediators"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:6 say about giving Himself?", options: ["Who gave Himself a ransom for all", "Who gave nothing", "Who gave little", "Who gave some"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:8 say about men praying?", options: ["I will therefore that men pray every where", "That men never pray", "That men pray sometimes", "That men pray rarely"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:9 say about women's apparel?", options: ["In like manner also, that women adorn themselves in modest apparel", "In expensive apparel", "In revealing apparel", "In no apparel"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:10 say about good works?", options: ["But (which becometh women professing godliness) with good works", "With bad works", "With no works", "With some works"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:11 say about women learning?", options: ["Let the woman learn in silence", "Let the woman speak loudly", "Let the woman teach", "Let the woman lead"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:12 say about women teaching?", options: ["But I suffer not a woman to teach", "I allow women to teach", "I encourage women to teach", "I require women to teach"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:13 say about Adam being formed first?", options: ["For Adam was first formed", "Eve was first formed", "Both were formed together", "Neither was formed"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:14 say about Adam not being deceived?", options: ["And Adam was not deceived", "Adam was deceived", "Adam was confused", "Adam was afraid"], answer: 0 },
  { chapter: 2, question: "What does 1 Timothy 2:15 say about women being saved?", options: ["Notwithstanding she shall be saved in childbearing", "She shall not be saved", "She shall be saved by works", "She shall be saved by faith alone"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:1 say about the office of a bishop?", options: ["This is a true saying, If a man desire the office of a bishop", "If a man avoid the office", "If a man ignore the office", "If a man reject the office"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:2 say about a bishop being blameless?", options: ["A bishop then must be blameless", "A bishop can be blameworthy", "A bishop should be blamed", "A bishop must be blamed"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:3 say about a bishop not being given to wine?", options: ["Not given to wine", "Given to wine", "Given to much wine", "Given to little wine"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:4 say about ruling his own house?", options: ["One that ruleth well his own house", "One that ignores his house", "One that rejects his house", "One that hates his house"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:5 say about taking care of the church?", options: ["For if a man know not how to rule his own house, how shall he take care of the church of God?", "He can take care of the church", "He should take care of the church", "He must take care of the church"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:6 say about a novice?", options: ["Not a novice", "A novice", "A beginner", "A student"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:7 say about a good report?", options: ["Moreover he must have a good report of them which are without", "A bad report", "No report", "Some report"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:8 say about deacons?", options: ["Likewise must the deacons be grave", "The deacons can be light", "The deacons should be funny", "The deacons must be silly"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:9 say about the mystery of the faith?", options: ["Holding the mystery of the faith in a pure conscience", "Ignoring the mystery", "Rejecting the mystery", "Hating the mystery"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:10 say about being proved?", options: ["And let these also first be proved", "Let them be ignored", "Let them be rejected", "Let them be hated"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:11 say about wives being grave?", options: ["Even so must their wives be grave", "Their wives can be light", "Their wives should be funny", "Their wives must be silly"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:12 say about deacons being husbands of one wife?", options: ["Let the deacons be the husbands of one wife", "Of many wives", "Of no wife", "Of some wives"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:13 say about a good degree?", options: ["For they that have used the office of a deacon well purchase to themselves a good degree", "A bad degree", "No degree", "Some degree"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:14 say about writing these things?", options: ["These things write I unto thee", "These things I ignore", "These things I reject", "These things I hate"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:15 say about the house of God?", options: ["But if I tarry long, that thou mayest know how thou oughtest to behave thyself in the house of God", "In the house of men", "In the house of angels", "In no house"], answer: 0 },
  { chapter: 3, question: "What does 1 Timothy 3:16 say about the mystery of godliness?", options: ["And without controversy great is the mystery of godliness", "Small is the mystery", "No mystery", "Some mystery"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:1 say about the Spirit speaking expressly?", options: ["Now the Spirit speaketh expressly", "The Spirit is silent", "The Spirit is quiet", "The Spirit is absent"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:2 say about speaking lies in hypocrisy?", options: ["Speaking lies in hypocrisy", "Speaking truth", "Speaking nothing", "Speaking some things"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:3 say about forbidding to marry?", options: ["Forbidding to marry", "Encouraging to marry", "Ignoring marriage", "Rejecting marriage"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:4 say about every creature of God being good?", options: ["For every creature of God is good", "Some creatures are bad", "No creatures are good", "Few creatures are good"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:5 say about being sanctified?", options: ["For it is sanctified by the word of God and prayer", "By works", "By tradition", "By philosophy"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:6 say about being a good minister?", options: ["If thou put the brethren in remembrance of these things, thou shalt be a good minister", "A bad minister", "No minister", "Some minister"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:7 say about profane and old wives' fables?", options: ["But refuse profane and old wives' fables", "Accept them", "Ignore them", "Reject them"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:8 say about bodily exercise?", options: ["For bodily exercise profiteth little", "Profiteth much", "Profiteth nothing", "Profiteth some"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:9 say about a faithful saying?", options: ["This is a faithful saying", "This is a false saying", "This is no saying", "This is some saying"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:10 say about the living God?", options: ["For therefore we both labour and suffer reproach, because we trust in the living God", "The dead God", "No God", "Some God"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:11 say about commanding and teaching?", options: ["These things command and teach", "These things ignore", "These things reject", "These things hate"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:12 say about being an example?", options: ["But be thou an example of the believers", "Be an example of unbelievers", "Be no example", "Be some example"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:13 say about reading?", options: ["Till I come, give attendance to reading", "Ignore reading", "Reject reading", "Hate reading"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:14 say about the gift that is in thee?", options: ["Neglect not the gift that is in thee", "Neglect the gift", "Ignore the gift", "Reject the gift"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:15 say about meditation?", options: ["Meditate upon these things", "Ignore these things", "Reject these things", "Hate these things"], answer: 0 },
  { chapter: 4, question: "What does 1 Timothy 4:16 say about taking heed unto thyself?", options: ["Take heed unto thyself", "Ignore thyself", "Reject thyself", "Hate thyself"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:1 say about rebuking an elder?", options: ["Rebuke not an elder", "Rebuke an elder", "Ignore an elder", "Reject an elder"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:2 say about elder women as mothers?", options: ["The elder women as mothers", "As sisters", "As friends", "As strangers"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:3 say about honouring widows?", options: ["Honour widows that are widows indeed", "Ignore widows", "Reject widows", "Hate widows"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:4 say about children learning?", options: ["But if any widow have children or nephews, let them learn first to shew piety at home", "To ignore piety", "To reject piety", "To hate piety"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:5 say about a widow indeed?", options: ["Now she that is a widow indeed, and desolate", "Not desolate", "Some desolate", "Few desolate"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:6 say about living in pleasure?", options: ["But she that liveth in pleasure is dead while she liveth", "Is alive", "Is well", "Is happy"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:7 say about these things?", options: ["And these things give in charge", "Ignore these things", "Reject these things", "Hate these things"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:8 say about providing for his own?", options: ["But if any provide not for his own, and specially for those of his own house, he hath denied the faith", "Hath accepted the faith", "Hath ignored the faith", "Hath rejected the faith"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:9 say about being taken into the number?", options: ["Let not a widow be taken into the number under threescore years old", "Under fifty", "Under forty", "Under thirty"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:10 say about well reported of for good works?", options: ["Well reported of for good works", "Bad works", "No works", "Some works"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:11 say about younger widows?", options: ["But the younger widows refuse", "Accept them", "Ignore them", "Reject them"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:12 say about having damnation?", options: ["Having damnation", "Having salvation", "Having nothing", "Having some"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:13 say about being idle?", options: ["And withal they learn to be idle", "To be busy", "To be active", "To be working"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:14 say about younger women marrying?", options: ["I will therefore that the younger women marry", "Not marry", "Ignore marriage", "Reject marriage"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:15 say about being turned aside?", options: ["For some are already turned aside after Satan", "After God", "After nothing", "After some"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:16 say about believing women?", options: ["If any man or woman that believeth have widows", "Have no widows", "Have some widows", "Have few widows"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:17 say about elders that rule well?", options: ["Let the elders that rule well be counted worthy of double honour", "Single honour", "No honour", "Some honour"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:18 say about the labourer being worthy of his reward?", options: ["For the scripture saith, Thou shalt not muzzle the ox that treadeth out the corn", "Shalt muzzle", "Shalt ignore", "Shalt reject"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:19 say about receiving an accusation?", options: ["Against an elder receive not an accusation", "Receive it", "Ignore it", "Reject it"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:20 say about them that sin?", options: ["Them that sin rebuke before all", "Before some", "Before none", "Before few"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:21 say about elect angels?", options: ["I charge thee before God, and the Lord Jesus Christ, and the elect angels", "Fallen angels", "No angels", "Some angels"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:22 say about laying hands suddenly?", options: ["Lay hands suddenly on no man", "On some men", "On all men", "On few men"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:23 say about drinking water?", options: ["Drink no longer water", "Drink only water", "Drink some water", "Drink little water"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:24 say about some men's sins being open beforehand?", options: ["Some men's sins are open beforehand", "All men's sins", "No men's sins", "Few men's sins"], answer: 0 },
  { chapter: 5, question: "What does 1 Timothy 5:25 say about good works being manifest?", options: ["Likewise also the good works of some are manifest beforehand", "All good works", "No good works", "Few good works"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:1 say about servants under the yoke?", options: ["Let as many servants as are under the yoke count their own masters worthy of all honour", "No honour", "Some honour", "Little honour"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:2 say about believing masters?", options: ["And they that have believing masters, let them not despise them", "Despise them", "Ignore them", "Reject them"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:3 say about wholesome words?", options: ["If any man teach otherwise, and consent not to wholesome words", "To bad words", "To no words", "To some words"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:4 say about being proud?", options: ["He is proud", "He is humble", "He is meek", "He is gentle"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:5 say about supposing that gain is godliness?", options: ["Supposing that gain is godliness", "That loss is godliness", "That nothing is godliness", "That some is godliness"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:6 say about godliness with contentment?", options: ["But godliness with contentment is great gain", "Little gain", "No gain", "Some gain"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:7 say about bringing nothing into this world?", options: ["For we brought nothing into this world", "Everything", "Something", "Little"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:8 say about having food and raiment?", options: ["And having food and raiment let us be therewith content", "Dissatisfied", "Angry", "Sad"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:9 say about them that will be rich?", options: ["But they that will be rich fall into temptation", "Rise above temptation", "Ignore temptation", "Reject temptation"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:10 say about the love of money?", options: ["For the love of money is the root of all evil", "Of some evil", "Of no evil", "Of little evil"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:11 say about following after righteousness?", options: ["But thou, O man of God, flee these things; and follow after righteousness", "Flee righteousness", "Ignore righteousness", "Reject righteousness"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:12 say about fighting the good fight?", options: ["Fight the good fight of faith", "The bad fight", "No fight", "Some fight"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:13 say about Christ Jesus?", options: ["I give thee charge in the sight of God, who quickeneth all things, and before Christ Jesus", "Before men", "Before angels", "Before nothing"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:14 say about keeping this commandment?", options: ["That thou keep this commandment without spot", "With spot", "With stain", "With blemish"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:15 say about the blessed and only Potentate?", options: ["Which in his times he shall shew, who is the blessed and only Potentate", "The cursed", "The weak", "The powerless"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:16 say about immortality?", options: ["Who only hath immortality", "Some have immortality", "All have immortality", "None have immortality"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:17 say about the rich in this world?", options: ["Charge them that are rich in this world", "Poor in this world", "Neither rich nor poor", "Some in this world"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:18 say about doing good?", options: ["That they do good", "Do evil", "Do nothing", "Do some"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:19 say about laying up in store?", options: ["Laying up in store for themselves a good foundation", "A bad foundation", "No foundation", "Some foundation"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:20 say about keeping that which is committed to thy trust?", options: ["O Timothy, keep that which is committed to thy trust", "Ignore it", "Reject it", "Hate it"], answer: 0 },
  { chapter: 6, question: "What does 1 Timothy 6:21 say about professing and erring?", options: ["Which some professing have erred concerning the faith", "Concerning truth", "Concerning nothing", "Concerning some"], answer: 0 }
];

export default function FirstTimothyQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(firstTimothyQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(firstTimothyQuestions.length).fill(false));
  const navigate = useNavigate();

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (showAnswer[qIdx]) return;
    const newSelected = [...selected];
    newSelected[qIdx] = oIdx;
    setSelected(newSelected);
    const newShow = [...showAnswer];
    newShow[qIdx] = true;
    setShowAnswer(newShow);
  };

  const correctCount = selected.filter((sel, i) => sel !== null && sel === firstTimothyQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== firstTimothyQuestions[i].answer).length;
  const notAttemptedCount = selected.filter((sel) => sel === null).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white flex flex-col">
      <header className="bg-white/70 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/bible-questions-and-answers-hub')}> 
            <img src="/sword.png" alt="BibleBattles Logo" className="w-7 h-7 mr-2 inline-block align-middle" />
            <span className="text-lg font-semibold text-gray-900">BibleBattles</span>
          </div>
          <nav className="flex items-center space-x-2">
            <a href="/" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Home</a>
            <a href="/bible-questions-and-answers-hub" className="text-blue-700 font-semibold px-3 py-2 rounded transition">Bible Q&amp;A</a>
            <a href="/public-leaderboard" className="text-gray-700 hover:text-blue-700 font-medium px-3 py-2 rounded transition">Leaderboard</a>
            <Button variant="ghost" onClick={() => navigate("/auth/register")}>Sign Up</Button>
            <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
        {/* Left: Quiz */}
        <div className="flex-1 min-w-0">
          {/* Summary Bar */}
          <div className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start">
            <div className="px-4 py-2 rounded-lg bg-green-100 text-green-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-2"></span>
              Correct: {correctCount}
            </div>
            <div className="px-4 py-2 rounded-lg bg-red-100 text-red-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-2"></span>
              Wrong: {wrongCount}
            </div>
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-semibold flex items-center">
              <span className="w-3 h-3 rounded-full bg-gray-400 inline-block mr-2"></span>
              Not Attempted: {notAttemptedCount}
            </div>
          </div>
          <Card className="mb-8 shadow-lg border-0">
            <CardHeader>
              <CardTitle>1 Timothy Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {firstTimothyQuestions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-white/80 rounded-xl p-6 shadow border border-blue-100">
                    <div className="mb-2 text-sm text-blue-600 font-semibold">Chapter {q.chapter}</div>
                    <div className="font-bold text-lg mb-4">{qIdx + 1}. {q.question}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selected[qIdx] === oIdx;
                        const isCorrect = q.answer === oIdx;
                        const show = showAnswer[qIdx];
                        return (
                          <button
                            key={oIdx}
                            className={`text-left px-4 py-3 rounded-lg border transition-all font-medium text-base
                              ${show
                                ? isCorrect
                                  ? 'bg-green-100 border-green-400 text-green-800'
                                  : isSelected
                                    ? 'bg-red-100 border-red-400 text-red-700'
                                    : 'bg-gray-100 border-gray-200 text-gray-700'
                                : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'}
                            `}
                            disabled={show}
                            onClick={() => handleSelect(qIdx, oIdx)}
                          >
                            {opt}
                            {show && isCorrect && (
                              <span className="ml-2 font-bold text-green-600">✓</span>
                            )}
                            {show && isSelected && !isCorrect && (
                              <span className="ml-2 font-bold text-red-600">✗</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {showAnswer[qIdx] && (
                      <div className="mt-3 text-sm font-semibold text-green-700">
                        Correct answer: {q.options[q.answer]}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right: Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 space-y-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Next Quizzes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {nextQuizzes.map((quiz) => (
                  <div key={quiz.title} className="bg-blue-50 rounded-lg p-4 flex flex-col gap-1 border border-blue-100 hover:shadow-md transition cursor-pointer" onClick={() => navigate(quiz.link)}>
                    <div className="font-semibold text-blue-800">{quiz.title}</div>
                    <div className="text-sm text-blue-600">{quiz.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-lg">Compete for Prizes!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-gray-700 text-sm">Sign in or sign up to join Bible quiz competitions, track your progress, and win exciting rewards.</div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => navigate('/auth/login')}>Sign In</Button>
                <Button className="flex-1" variant="outline" onClick={() => navigate('/auth/register')}>Sign Up</Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
} 