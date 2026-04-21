import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Who was Joshua's father?",
    options: ["Nun", "Moses", "Aaron", "Caleb"],
    answer: 0,
    explanation: "Joshua 1:1 - After the death of Moses the servant of the Lord, the Lord said to Joshua son of Nun, Moses' aide."
  },
  {
    id: 2,
    question: "What was the name of the prostitute who helped the Israelite spies?",
    options: ["Rahab", "Deborah", "Miriam", "Hannah"],
    answer: 0,
    explanation: "Joshua 2:1 - Then Joshua son of Nun secretly sent two spies from Shittim. 'Go, look over the land,' he said, 'especially Jericho.' So they went and entered the house of a prostitute named Rahab and stayed there."
  },
  {
    id: 3,
    question: "How many times did the Israelites march around Jericho?",
    options: ["Six times", "Seven times", "Twelve times", "Forty times"],
    answer: 1,
    explanation: "Joshua 6:3-4 - March around the city once with all the armed men. Do this for six days. Have seven priests carry trumpets of rams' horns in front of the ark. On the seventh day, march around the city seven times, with the priests blowing the trumpets."
  },
  {
    id: 4,
    question: "What happened to the walls of Jericho?",
    options: ["They were destroyed by fire", "They fell down flat", "They were torn down by the Israelites", "They remained standing"],
    answer: 1,
    explanation: "Joshua 6:20 - When the trumpets sounded, the army shouted, and at the sound of the trumpet, when the men gave a loud shout, the wall collapsed; so everyone charged straight in, and they took the city."
  },
  {
    id: 5,
    question: "What was the name of the city that was completely destroyed except for Rahab and her family?",
    options: ["Ai", "Jericho", "Gibeon", "Hazor"],
    answer: 1,
    explanation: "Joshua 6:17 - The city and all that is in it are to be devoted to the Lord. Only Rahab the prostitute and all who are with her in her house shall be spared, because she hid the spies we sent."
  },
  {
    id: 6,
    question: "What happened to Achan and his family?",
    options: ["They were stoned to death", "They were burned with fire", "They were exiled", "They were forgiven"],
    answer: 1,
    explanation: "Joshua 7:25 - Joshua said, 'Why have you brought this trouble on us? The Lord will bring trouble on you today.' Then all Israel stoned him, and after they had stoned the rest, they burned them."
  },
  {
    id: 7,
    question: "What did Joshua do when the sun stood still?",
    options: ["He prayed for more time", "He commanded the sun to stand still", "He asked God to stop the sun", "All of the above"],
    answer: 1,
    explanation: "Joshua 10:12-13 - On the day the Lord gave the Amorites over to Israel, Joshua said to the Lord in the presence of Israel: 'Sun, stand still over Gibeon, and you, moon, over the Valley of Aijalon.' So the sun stood still, and the moon stopped, till the nation avenged itself on its enemies."
  },
  {
    id: 8,
    question: "How old was Joshua when he died?",
    options: ["100 years", "110 years", "120 years", "130 years"],
    answer: 1,
    explanation: "Joshua 24:29 - After these things, Joshua son of Nun, the servant of the Lord, died at the age of a hundred and ten."
  },
  {
    id: 9,
    question: "What did Joshua say to the people at the end of his life?",
    options: ["Choose this day whom you will serve", "As for me and my household, we will serve the Lord", "But if serving the Lord seems undesirable to you, then choose for yourselves this day whom you will serve", "All of the above"],
    answer: 3,
    explanation: "Joshua 24:15 - But if serving the Lord seems undesirable to you, then choose for yourselves this day whom you will serve, whether the gods your ancestors served beyond the Euphrates, or the gods of the Amorites, in whose land you are living. But as for me and my household, we will serve the Lord."
  },
  {
    id: 10,
    question: "What was the name of the mountain where Joshua built an altar?",
    options: ["Mount Sinai", "Mount Ebal", "Mount Gerizim", "Mount Carmel"],
    answer: 1,
    explanation: "Joshua 8:30 - Then Joshua built on Mount Ebal an altar to the Lord, the God of Israel."
  }
];

export default function JoshuaPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Joshua Quiz - Conquering the Promised Land"
      questions={questions}
      bookName="Joshua"
      canonicalPath={canonicalPath}
    />
  );
}
