import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const nextQuizzes = [
  { title: "Daniel Quiz", description: "Discover the prophet of dreams.", link: "/bible-questions-and-answers-hub/daniel" },
  { title: "Isaiah Quiz", description: "Go back to the prince of prophets.", link: "/bible-questions-and-answers-hub/isaiah" },
  { title: "Lamentations Quiz", description: "Review the book of sorrows.", link: "/bible-questions-and-answers-hub/lamentations" },
  { title: "Jeremiah Quiz", description: "Continue to the weeping prophet.", link: "/bible-questions-and-answers-hub/jeremiah" }
];

const ezekielQuestions = [
  { chapter: 1, question: "When did Ezekiel see visions of God?", options: ["In the 30th year", "In the 20th year", "In the 40th year", "In the 50th year"], answer: 0 },
  { chapter: 1, question: "Where was Ezekiel when he saw the visions?", options: ["In Jerusalem", "By the Kebar River", "In Babylon", "In Egypt"], answer: 1 },
  { chapter: 1, question: "What came from the north?", options: ["A storm", "A wind", "A cloud", "All of these"], answer: 3 },
  { chapter: 1, question: "What was in the center of the cloud?", options: ["Fire", "Lightning", "Both", "Neither"], answer: 2 },
  { chapter: 1, question: "What were the four living creatures like?", options: ["Human form", "Animal form", "Both", "Neither"], answer: 2 },
  { chapter: 1, question: "What did each living creature have?", options: ["One face", "Two faces", "Three faces", "Four faces"], answer: 3 },
  { chapter: 1, question: "What were the four faces?", options: ["Human, lion, ox, eagle", "Human, lion, bear, eagle", "Human, tiger, ox, eagle", "Human, lion, ox, hawk"], answer: 0 },
  { chapter: 1, question: "What did the living creatures have?", options: ["Wings", "Hands", "Feet", "All of these"], answer: 3 },
  { chapter: 1, question: "What was above the living creatures?", options: ["A throne", "A platform", "A cloud", "A light"], answer: 0 },
  { chapter: 1, question: "What was on the throne?", options: ["A figure like a man", "A figure like an animal", "A figure like an angel", "A figure like a king"], answer: 0 },
  { chapter: 2, question: "What did God call Ezekiel?", options: ["Son of man", "Son of God", "Son of Israel", "Son of David"], answer: 0 },
  { chapter: 2, question: "What did God tell Ezekiel to do?", options: ["Stand up", "Sit down", "Kneel", "Lie down"], answer: 0 },
  { chapter: 2, question: "What did God say about the people?", options: ["They were righteous", "They were rebellious", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 2, question: "What did God say about the people?", options: ["They were faithful", "They were unfaithful", "They were obedient", "They were disobedient"], answer: 1 },
  { chapter: 2, question: "What did God tell Ezekiel not to be?", options: ["Afraid", "Angry", "Sad", "Happy"], answer: 0 },
  { chapter: 3, question: "What did God tell Ezekiel to eat?", options: ["A scroll", "Bread", "Meat", "Fruit"], answer: 0 },
  { chapter: 3, question: "What was written on the scroll?", options: ["Words of lament", "Words of mourning", "Words of woe", "All of these"], answer: 3 },
  { chapter: 3, question: "What did the scroll taste like?", options: ["Sweet as honey", "Bitter as wormwood", "Sour as vinegar", "Salty as salt"], answer: 0 },
  { chapter: 3, question: "What did God tell Ezekiel to do with the words?", options: ["Forget them", "Remember them", "Speak them", "Write them"], answer: 2 },
  { chapter: 3, question: "What did God make Ezekiel's forehead like?", options: ["Soft", "Hard", "Like flint", "Like stone"], answer: 2 },
  { chapter: 4, question: "What did God tell Ezekiel to do with a brick?", options: ["Build with it", "Draw on it", "Throw it", "Hide it"], answer: 1 },
  { chapter: 4, question: "What did Ezekiel draw on the brick?", options: ["Jerusalem", "Babylon", "Egypt", "Israel"], answer: 0 },
  { chapter: 4, question: "How long did Ezekiel lie on his right side?", options: ["30 days", "40 days", "50 days", "60 days"], answer: 1 },
  { chapter: 4, question: "How long did Ezekiel lie on his left side?", options: ["30 days", "40 days", "50 days", "60 days"], answer: 1 },
  { chapter: 4, question: "What did Ezekiel eat during this time?", options: ["Bread", "Barley cakes", "Meat", "Fruit"], answer: 1 },
  { chapter: 5, question: "What did God tell Ezekiel to do with a sword?", options: ["Fight with it", "Sharpen it", "Shave with it", "Hide it"], answer: 2 },
  { chapter: 5, question: "What did Ezekiel do with his hair?", options: ["Kept it", "Cut it", "Burned it", "Scattered it"], answer: 1 },
  { chapter: 5, question: "What did Ezekiel do with one-third of his hair?", options: ["Kept it", "Burned it", "Scattered it", "All of these"], answer: 3 },
  { chapter: 6, question: "What did God say about the mountains?", options: ["They would be blessed", "They would be destroyed", "They would be ignored", "They would be protected"], answer: 1 },
  { chapter: 6, question: "What did God say about the high places?", options: ["They would be blessed", "They would be destroyed", "They would be ignored", "They would be protected"], answer: 1 },
  { chapter: 6, question: "What did God say about the altars?", options: ["They would be blessed", "They would be destroyed", "They would be ignored", "They would be protected"], answer: 1 },
  { chapter: 7, question: "What did God say was coming?", options: ["Peace", "War", "Prosperity", "Destruction"], answer: 3 },
  { chapter: 7, question: "What did God say about the end?", options: ["It was near", "It was far", "It was delayed", "It was cancelled"], answer: 0 },
  { chapter: 7, question: "What did God say about the land?", options: ["It would prosper", "It would be destroyed", "It would be blessed", "It would be ignored"], answer: 1 },
  { chapter: 8, question: "What did Ezekiel see in the temple?", options: ["An idol", "A throne", "An altar", "A lamp"], answer: 0 },
  { chapter: 8, question: "What was the idol called?", options: ["The idol of jealousy", "The idol of love", "The idol of peace", "The idol of war"], answer: 0 },
  { chapter: 8, question: "What did Ezekiel see the elders doing?", options: ["Praying", "Worshiping idols", "Reading scripture", "Sacrificing"], answer: 1 },
  { chapter: 8, question: "What did Ezekiel see women doing?", options: ["Praying", "Weeping", "Worshiping Tammuz", "Singing"], answer: 2 },
  { chapter: 9, question: "What did God tell the man in linen to do?", options: ["Mark the righteous", "Kill the wicked", "Both", "Neither"], answer: 2 },
  { chapter: 9, question: "What did God tell the executioners to do?", options: ["Spare the righteous", "Kill the wicked", "Both", "Neither"], answer: 2 },
  { chapter: 9, question: "What did the man in linen mark?", options: ["The foreheads", "The hands", "The feet", "The hearts"], answer: 0 },
  { chapter: 10, question: "What did Ezekiel see above the cherubim?", options: ["A throne", "A platform", "A cloud", "A light"], answer: 0 },
  { chapter: 10, question: "What was on the throne?", options: ["A figure like a man", "A figure like an animal", "A figure like an angel", "A figure like a king"], answer: 0 },
  { chapter: 10, question: "What did the cherubim do?", options: ["Stood still", "Moved", "Flew", "All of these"], answer: 3 },
  { chapter: 11, question: "What did the leaders say about the city?", options: ["It was safe", "It was dangerous", "It was blessed", "It was cursed"], answer: 0 },
  { chapter: 11, question: "What did God say about the leaders?", options: ["They were wise", "They were foolish", "They were righteous", "They were wicked"], answer: 1 },
  { chapter: 11, question: "What did God promise to do?", options: ["Destroy them", "Save them", "Ignore them", "Bless them"], answer: 1 },
  { chapter: 12, question: "What did God tell Ezekiel to do?", options: ["Pack his bags", "Leave the city", "Both", "Neither"], answer: 2 },
  { chapter: 12, question: "What did Ezekiel do at night?", options: ["Slept", "Prayed", "Dug through the wall", "Watched"], answer: 2 },
  { chapter: 12, question: "What did Ezekiel do with his belongings?", options: ["Kept them", "Left them", "Carried them", "Sold them"], answer: 2 },
  { chapter: 13, question: "What did God say about the false prophets?", options: ["They were true", "They were false", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 13, question: "What did the false prophets say?", options: ["Peace", "War", "Destruction", "Salvation"], answer: 0 },
  { chapter: 13, question: "What did God say about their visions?", options: ["They were true", "They were false", "They were helpful", "They were harmful"], answer: 1 },
  { chapter: 14, question: "What did the elders do?", options: ["Came to Ezekiel", "Stayed away", "Ignored him", "Fought him"], answer: 0 },
  { chapter: 14, question: "What did God say about their hearts?", options: ["They were pure", "They were impure", "They were set on idols", "They were set on God"], answer: 2 },
  { chapter: 14, question: "What did God say about false prophets?", options: ["They would be blessed", "They would be punished", "They would be ignored", "They would be rewarded"], answer: 1 },
  { chapter: 16, question: "What did God compare Jerusalem to?", options: ["A queen", "A princess", "An abandoned baby", "A servant"], answer: 2 },
  { chapter: 16, question: "What did God do for Jerusalem?", options: ["Abandoned her", "Saved her", "Cursed her", "Ignored her"], answer: 1 },
  { chapter: 16, question: "What did Jerusalem become?", options: ["Beautiful", "Ugly", "Wise", "Foolish"], answer: 0 },
  { chapter: 16, question: "What did Jerusalem do with her beauty?", options: ["Used it for good", "Used it for evil", "Ignored it", "Shared it"], answer: 1 },
  { chapter: 16, question: "What did Jerusalem do?", options: ["Worshiped God", "Worshiped idols", "Both", "Neither"], answer: 1 },
  { chapter: 16, question: "What did God say about Jerusalem's lovers?", options: ["They were faithful", "They were unfaithful", "They were kind", "They were cruel"], answer: 1 },
  { chapter: 18, question: "What did God say about the soul that sins?", options: ["It will live", "It will die", "It will be blessed", "It will be cursed"], answer: 1 },
  { chapter: 18, question: "What did God say about the righteous?", options: ["They will die", "They will live", "They will be cursed", "They will be ignored"], answer: 1 },
  { chapter: 18, question: "What did God say about repentance?", options: ["It was useless", "It was helpful", "It was required", "It was optional"], answer: 1 },
  { chapter: 20, question: "What did God say about Israel's history?", options: ["It was perfect", "It was rebellious", "It was blessed", "It was cursed"], answer: 1 },
  { chapter: 20, question: "What did God say about the Sabbath?", options: ["It was unimportant", "It was important", "It was optional", "It was required"], answer: 1 },
  { chapter: 20, question: "What did God say about his name?", options: ["It was unimportant", "It was important", "It was optional", "It was required"], answer: 1 },
  { chapter: 22, question: "What did God call Jerusalem?", options: ["A city of blood", "A city of peace", "A city of joy", "A city of wisdom"], answer: 0 },
  { chapter: 22, question: "What did God say about the people?", options: ["They were righteous", "They were wicked", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 22, question: "What did God say about the leaders?", options: ["They were good", "They were bad", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 23, question: "What did God compare Israel to?", options: ["Two sisters", "Two brothers", "Two friends", "Two enemies"], answer: 0 },
  { chapter: 23, question: "What were the sisters' names?", options: ["Oholah and Oholibah", "Sarah and Rebecca", "Rachel and Leah", "Ruth and Naomi"], answer: 0 },
  { chapter: 23, question: "What did the sisters do?", options: ["Worshiped God", "Worshiped idols", "Both", "Neither"], answer: 1 },
  { chapter: 23, question: "What did God say about their lovers?", options: ["They were faithful", "They were unfaithful", "They were kind", "They were cruel"], answer: 1 },
  { chapter: 24, question: "What did God tell Ezekiel to do with a pot?", options: ["Cook in it", "Break it", "Clean it", "Fill it"], answer: 0 },
  { chapter: 24, question: "What did God put in the pot?", options: ["Water", "Meat", "Vegetables", "All of these"], answer: 3 },
  { chapter: 24, question: "What did God say about the pot?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be protected"], answer: 1 },
  { chapter: 24, question: "What happened to Ezekiel's wife?", options: ["She lived", "She died", "She left", "She stayed"], answer: 1 },
  { chapter: 24, question: "What did God tell Ezekiel not to do?", options: ["Mourn", "Rejoice", "Pray", "Speak"], answer: 0 },
  { chapter: 25, question: "What did God say about Ammon?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be protected"], answer: 1 },
  { chapter: 25, question: "What did God say about Moab?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be protected"], answer: 1 },
  { chapter: 25, question: "What did God say about Edom?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be protected"], answer: 1 },
  { chapter: 25, question: "What did God say about Philistia?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be protected"], answer: 1 },
  { chapter: 26, question: "What did God say about Tyre?", options: ["It would be blessed", "It would be destroyed", "It would be ignored", "It would be protected"], answer: 1 },
  { chapter: 26, question: "What did God say about Tyre's walls?", options: ["They would be built", "They would be destroyed", "They would be ignored", "They would be protected"], answer: 1 },
  { chapter: 26, question: "What did God say about Tyre's towers?", options: ["They would be built", "They would be destroyed", "They would be ignored", "They would be protected"], answer: 1 },
  { chapter: 27, question: "What did God compare Tyre to?", options: ["A ship", "A city", "A kingdom", "A people"], answer: 0 },
  { chapter: 27, question: "What did God say about Tyre's merchandise?", options: ["It would increase", "It would decrease", "It would stop", "It would continue"], answer: 2 },
  { chapter: 27, question: "What did God say about Tyre's sailors?", options: ["They would prosper", "They would suffer", "They would be saved", "They would be lost"], answer: 1 },
  { chapter: 28, question: "What did the king of Tyre say about himself?", options: ["I am a god", "I am a man", "I am a king", "I am a servant"], answer: 0 },
  { chapter: 28, question: "What did God say about the king of Tyre?", options: ["He was a god", "He was a man", "He was wise", "He was foolish"], answer: 1 },
  { chapter: 28, question: "What did God say about the king of Tyre?", options: ["He would prosper", "He would suffer", "He would be saved", "He would be lost"], answer: 1 },
  { chapter: 29, question: "What did God say about Pharaoh?", options: ["He was a great dragon", "He was a great king", "He was a great warrior", "He was a great leader"], answer: 0 },
  { chapter: 29, question: "What did God say about Egypt?", options: ["It would prosper", "It would be destroyed", "It would be ignored", "It would be protected"], answer: 1 },
  { chapter: 29, question: "What did God say about Egypt's rivers?", options: ["They would flow", "They would dry up", "They would flood", "They would be clean"], answer: 1 },
  { chapter: 30, question: "What did God say about the day of the Lord?", options: ["It would be good", "It would be bad", "It would be neutral", "It would be delayed"], answer: 1 },
  { chapter: 30, question: "What did God say about Egypt's allies?", options: ["They would help", "They would not help", "They would fight", "They would flee"], answer: 1 },
  { chapter: 30, question: "What did God say about Egypt's cities?", options: ["They would prosper", "They would be destroyed", "They would be ignored", "They would be protected"], answer: 1 },
  { chapter: 31, question: "What did God compare Egypt to?", options: ["A tree", "A mountain", "A river", "A city"], answer: 0 },
  { chapter: 31, question: "What did God say about the tree?", options: ["It would grow", "It would be cut down", "It would be ignored", "It would be protected"], answer: 1 },
  { chapter: 31, question: "What did God say about the tree's branches?", options: ["They would grow", "They would be cut off", "They would be ignored", "They would be protected"], answer: 1 },
  { chapter: 32, question: "What did God say about Pharaoh?", options: ["He would prosper", "He would suffer", "He would be saved", "He would be lost"], answer: 1 },
  { chapter: 32, question: "What did God say about Egypt's army?", options: ["It would be strong", "It would be weak", "It would be destroyed", "It would be blessed"], answer: 2 },
  { chapter: 32, question: "What did God say about Egypt's people?", options: ["They would prosper", "They would suffer", "They would be saved", "They would be lost"], answer: 1 },
  { chapter: 33, question: "What did God say about the watchman?", options: ["He was unimportant", "He was important", "He was optional", "He was required"], answer: 1 },
  { chapter: 33, question: "What did God say about the watchman's responsibility?", options: ["It was light", "It was heavy", "It was optional", "It was required"], answer: 1 },
  { chapter: 33, question: "What did God say about repentance?", options: ["It was useless", "It was helpful", "It was required", "It was optional"], answer: 1 },
  { chapter: 34, question: "What did God say about the shepherds?", options: ["They were good", "They were bad", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 34, question: "What did God say about the sheep?", options: ["They were cared for", "They were scattered", "They were blessed", "They were cursed"], answer: 1 },
  { chapter: 34, question: "What did God promise to do?", options: ["Scatter them", "Gather them", "Ignore them", "Curse them"], answer: 1 },
  { chapter: 34, question: "What did God promise to raise up?", options: ["A good shepherd", "A bad shepherd", "A wise shepherd", "A foolish shepherd"], answer: 0 },
  { chapter: 36, question: "What did God promise to do for Israel?", options: ["Destroy them", "Save them", "Ignore them", "Curse them"], answer: 1 },
  { chapter: 36, question: "What did God promise to do for the land?", options: ["Destroy it", "Restore it", "Ignore it", "Curse it"], answer: 1 },
  { chapter: 36, question: "What did God promise to do for the people?", options: ["Destroy them", "Save them", "Ignore them", "Curse them"], answer: 1 },
  { chapter: 36, question: "What did God promise to give them?", options: ["A new heart", "A new spirit", "Both", "Neither"], answer: 2 },
  { chapter: 37, question: "What did God show Ezekiel?", options: ["A valley of bones", "A valley of trees", "A valley of stones", "A valley of water"], answer: 0 },
  { chapter: 37, question: "What did God ask Ezekiel about the bones?", options: ["Can they live?", "Can they move?", "Can they speak?", "Can they see?"], answer: 0 },
  { chapter: 37, question: "What did Ezekiel say about the bones?", options: ["Yes", "No", "Maybe", "I don't know"], answer: 1 },
  { chapter: 37, question: "What did God tell Ezekiel to prophesy to the bones?", options: ["To be still", "To move", "To speak", "To see"], answer: 1 },
  { chapter: 37, question: "What happened to the bones?", options: ["They stayed dead", "They came to life", "They moved", "They spoke"], answer: 1 },
  { chapter: 37, question: "What did God say the bones represented?", options: ["The dead", "The living", "The house of Israel", "The house of Judah"], answer: 2 },
  { chapter: 37, question: "What did God promise to do?", options: ["Destroy them", "Save them", "Ignore them", "Curse them"], answer: 1 },
  { chapter: 37, question: "What did God promise to put in them?", options: ["A new heart", "A new spirit", "Both", "Neither"], answer: 2 },
  { chapter: 38, question: "What did God say about Gog?", options: ["He would be blessed", "He would be cursed", "He would attack", "He would be ignored"], answer: 2 },
  { chapter: 38, question: "What did God say about Gog's army?", options: ["It would be small", "It would be large", "It would be weak", "It would be strong"], answer: 1 },
  { chapter: 38, question: "What did God say about Gog's defeat?", options: ["It would be easy", "It would be hard", "It would be impossible", "It would be certain"], answer: 3 },
  { chapter: 39, question: "What did God say about Gog's destruction?", options: ["It would be partial", "It would be complete", "It would be temporary", "It would be delayed"], answer: 1 },
  { chapter: 39, question: "What did God say about Gog's weapons?", options: ["They would be preserved", "They would be destroyed", "They would be used", "They would be hidden"], answer: 1 },
  { chapter: 39, question: "What did God say about Gog's burial?", options: ["It would be honorable", "It would be dishonorable", "It would be quick", "It would be slow"], answer: 1 },
  { chapter: 40, question: "What did Ezekiel see?", options: ["A city", "A temple", "A palace", "A garden"], answer: 1 },
  { chapter: 40, question: "What did the man measure?", options: ["The walls", "The gates", "The rooms", "All of these"], answer: 3 },
  { chapter: 40, question: "What did the man use to measure?", options: ["A rod", "A line", "Both", "Neither"], answer: 2 },
  { chapter: 43, question: "What did Ezekiel see?", options: ["The glory of God", "The temple", "The altar", "All of these"], answer: 3 },
  { chapter: 43, question: "What did the glory of God do?", options: ["Left the temple", "Entered the temple", "Stayed outside", "Ignored the temple"], answer: 1 },
  { chapter: 43, question: "What did God say about his dwelling place?", options: ["It would be temporary", "It would be permanent", "It would be moved", "It would be destroyed"], answer: 1 },
  { chapter: 44, question: "What did God say about the temple?", options: ["It would be open", "It would be closed", "It would be destroyed", "It would be moved"], answer: 1 },
  { chapter: 44, question: "What did God say about the prince?", options: ["He could enter", "He could not enter", "He could enter sometimes", "He could enter rarely"], answer: 0 },
  { chapter: 44, question: "What did God say about the Levites?", options: ["They were faithful", "They were unfaithful", "They were wise", "They were foolish"], answer: 1 },
  { chapter: 47, question: "What did Ezekiel see?", options: ["Water", "Fire", "Wind", "Earth"], answer: 0 },
  { chapter: 47, question: "Where did the water come from?", options: ["The temple", "The river", "The sea", "The sky"], answer: 0 },
  { chapter: 47, question: "What did the water do?", options: ["Stayed still", "Flowed", "Dried up", "Flooded"], answer: 1 },
  { chapter: 47, question: "What did the water bring?", options: ["Life", "Death", "Destruction", "Desolation"], answer: 0 },
  { chapter: 48, question: "What did God show Ezekiel?", options: ["The land", "The temple", "The city", "All of these"], answer: 3 },
  { chapter: 48, question: "What did God say about the land?", options: ["It would be destroyed", "It would be restored", "It would be ignored", "It would be cursed"], answer: 1 },
  { chapter: 48, question: "What did God say about the city?", options: ["It would be destroyed", "It would be restored", "It would be ignored", "It would be cursed"], answer: 1 },
  { chapter: 48, question: "What did God say about the temple?", options: ["It would be destroyed", "It would be restored", "It would be ignored", "It would be cursed"], answer: 1 }
];

export default function EzekielQuiz() {
  const [selected, setSelected] = useState<(number | null)[]>(Array(ezekielQuestions.length).fill(null));
  const [showAnswer, setShowAnswer] = useState<boolean[]>(Array(ezekielQuestions.length).fill(false));
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

  const correctCount = selected.filter((sel, i) => sel !== null && sel === ezekielQuestions[i].answer).length;
  const wrongCount = selected.filter((sel, i) => sel !== null && sel !== ezekielQuestions[i].answer).length;
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
              <CardTitle>Ezekiel Quiz</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {ezekielQuestions.map((q, qIdx) => (
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