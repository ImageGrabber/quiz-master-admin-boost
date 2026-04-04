export type QA = { chapter: number; question: string; options: string[]; answer: number };

export const EX_1_12: QA[] = [
  // Beginner (0-9)
  { chapter: 1, question: "Who were the Hebrew midwives that feared God?", options: ["Shiphrah and Puah", "Miriam and Zipporah", "Sarah and Hagar", "Leah and Rachel"], answer: 0 },
  { chapter: 2, question: "Who found Moses in the basket among the reeds?", options: ["A Hebrew slave", "Pharaoh's daughter", "Miriam", "Zipporah"], answer: 1 },
  { chapter: 2, question: "Moses fled to Midian after killing an Egyptian. Who did he marry there?", options: ["Miriam", "Puah", "Zipporah", "Shiphrah"], answer: 2 },
  { chapter: 3, question: "Where did God appear to Moses in a burning bush?", options: ["Mount Moriah", "Mount Sinai (Horeb)", "Mount Nebo", "Mount Carmel"], answer: 1 },
  { chapter: 3, question: "What name did God reveal to Moses from the bush?", options: ["The Almighty", "Elohim", "I AM WHO I AM", "The God of Wonders"], answer: 2 },
  { chapter: 4, question: "What did Moses' staff turn into when he threw it on the ground?", options: ["A sword", "A serpent", "A river", "A cloud"], answer: 1 },
  { chapter: 5, question: "What was Pharaoh's reaction to Moses' first request to let Israel go?", options: ["He agreed immediately", "He increased their labor (no straw for bricks)", "He ignored them", "He doubled their food"], answer: 1 },
  { chapter: 7, question: "What was the first plague brought upon Egypt?", options: ["Frogs", "Gnats", "Water turned to blood", "Darkness"], answer: 2 },
  { chapter: 8, question: "Which plague could the Egyptian magicians NOT replicate?", options: ["Blood", "Frogs", "Gnats", "Locusts"], answer: 2 },
  { chapter: 10, question: "How long did the plague of darkness last in Egypt?", options: ["One day", "Three days", "Seven days", "Forty days"], answer: 1 },
  // Intermediate (10-19)
  { chapter: 1, question: "How many souls of the house of Jacob came into Egypt?", options: ["50", "60", "70", "100"], answer: 2 },
  { chapter: 2, question: "Moses was from which tribe of Israel?", options: ["Judah", "Levi", "Benjamin", "Reuben"], answer: 1 },
  { chapter: 4, question: "Who did God send with Moses to be his spokesman?", options: ["Joshua", "Aaron", "Caleb", "Hur"], answer: 1 },
  { chapter: 6, question: "God told Moses He appeared to Abraham, Isaac, and Jacob by what name?", options: ["Jehovah", "Almighty God (El Shaddai)", "The Lord", "I AM"], answer: 1 },
  { chapter: 7, question: "How old was Moses when he first spoke to Pharaoh?", options: ["40", "80", "120", "70"], answer: 1 },
  { chapter: 8, question: "In which land did the Israelites live that was spared from the swarms of flies?", options: ["Goshen", "Rameses", "Succoth", "Midian"], answer: 0 },
  { chapter: 9, question: "Which plague involved 'boils breaking out with sores'?", options: ["Third", "Fourth", "Fifth", "Sixth"], answer: 3 },
  { chapter: 9, question: "The plague of hail was so severe it had never been seen in Egypt since its ______.", options: ["Creation", "Foundation", "First King", "Drought"], answer: 1 },
  { chapter: 10, question: "What wind brought the locusts into Egypt?", options: ["North wind", "South wind", "East wind", "West wind"], answer: 2 },
  { chapter: 12, question: "How many years did the Israelites dwell in Egypt?", options: ["400", "430", "215", "480"], answer: 1 },
  // Advanced (20+)
  { chapter: 1, question: "What were the names of the two store cities the Israelites built for Pharaoh?", options: ["Pithom and Rameses", "Memphis and Thebes", "Ur and Haran", "Succoth and Etham"], answer: 0 },
  { chapter: 2, question: "What was the name of the priest of Midian, Moses' father-in-law, in Chapter 2?", options: ["Jethro", "Reuel", "Hobab", "Putiel"], answer: 1 },
  { chapter: 4, question: "What did Zipporah use to circumcise her son?", options: ["A bronze knife", "A sharp stone (flint)", "An iron blade", "A golden shear"], answer: 1 },
  { chapter: 6, question: "Who was the father of Aaron and Moses according to the genealogy in Chapter 6?", options: ["Kohath", "Amram", "Izhar", "Uzziel"], answer: 1 },
  { chapter: 12, question: "What was the requirement for the hyssop used in the Passover?", options: ["A bunch of hyssop", "A single branch", "Dried hyssop", "Flowering hyssop"], answer: 0 },
  { chapter: 11, question: "Moses told Pharaoh all the firstborn in Egypt shall die, from Pharaoh on the throne to the maidservant behind the ______.", options: ["Mill", "Curtain", "Oven", "Wall"], answer: 0 },
  { chapter: 8, question: "Pharaoh asked Moses to entreat the Lord to take away the frogs. Moses said, 'Be it according to your word, that you may know that there is ______.'", options: ["A God in Israel", "None like the Lord our God", "Judgment coming", "Power in my hand"], answer: 1 },
  { chapter: 7, question: "How many days passed after the Lord had struck the Nile (Plague 1)?", options: ["Three", "Five", "Seven", "Ten"], answer: 2 },
  { chapter: 4, question: "What did God say Moses' staff would be in his hand?", options: ["A rod of iron", "A sign of power", "The rod of God", "A comfort"], answer: 2 },
  { chapter: 12, question: "What was the total number of men on foot who departed Egypt, besides women and children?", options: ["300,000", "600,000", "1,000,000", "500,000"], answer: 1 },
];

export const EX_13_18: QA[] = [
  // Beginner (0-9)
  { chapter: 13, question: "How did God lead the Israelites by day?", options: ["A pillar of fire", "A pillar of cloud", "A flying eagle", "A loud voice"], answer: 1 },
  { chapter: 14, question: "What happened when Moses stretched out his hand over the Red Sea?", options: ["A bridge appeared", "The water turned to blood", "The sea parted", "It rained fire"], answer: 2 },
  { chapter: 15, question: "What was the name of the place where the water was too bitter to drink?", options: ["Elim", "Marah", "Rephidim", "Sinai"], answer: 1 },
  { chapter: 16, question: "What bread-like substance did God provide for the Israelites in the morning?", options: ["Manna", "Wafers", "Millet", "Barley"], answer: 0 },
  { chapter: 16, question: "What meat did God provide in the evening at the Desert of Sin?", options: ["Beef", "Sheep", "Quail", "Goat"], answer: 2 },
  { chapter: 17, question: "How did Moses get water for the people at Rephidim?", options: ["He dug a well", "He struck a rock", "He prayed for rain", "He found a spring"], answer: 1 },
  { chapter: 17, question: "Who held up Moses' hands during the battle against the Amalekites?", options: ["Aaron and Hur", "Joshua and Caleb", "Jethro and Aaron", "Eleazar and Ithamar"], answer: 0 },
  { chapter: 18, question: "Who was Moses' father-in-law who visited him in the wilderness?", options: ["Laban", "Jethro", "Melchizedek", "Potiphera"], answer: 1 },
  { chapter: 18, question: "What advice did Jethro give Moses regarding leadership?", options: ["To do everything himself", "To appoint judges over the people", "To move back to Midian", "To ask Pharaoh for help"], answer: 1 },
  { chapter: 13, question: "Which way did God NOT lead the people, though it was near?", options: ["Via the Red Sea", "Way of the Philistines", "Through the desert", "Towards Sinai"], answer: 1 },
  // Intermediate (10-19)
  { chapter: 13, question: "Whose bones did Moses take with him out of Egypt?", options: ["Abraham's", "Isaac's", "Jacob's", "Joseph's"], answer: 3 },
  { chapter: 15, question: "Who led the women in a song of praise with timbrels?", options: ["Zipporah", "Miriam", "Elisheba", "Hannah"], answer: 1 },
  { chapter: 16, question: "An 'omer' is what fraction of an 'ephah'?", options: ["One-fifth", "One-tenth", "One-twelfth", "One-half"], answer: 1 },
  { chapter: 17, question: "What did Moses name the place because the people tested the Lord?", options: ["Marah and Elim", "Massah and Meribah", "Taberah", "Hormah"], answer: 1 },
  { chapter: 18, question: "What were the names of Moses' two sons?", options: ["Gershom and Eliezer", "Aaron and Hur", "Eleazar and Ithamar", "Nadab and Abihu"], answer: 0 },
  { chapter: 14, question: "The Egyptians said, 'Let us flee from before Israel, for the Lord ______ for them.'", options: ["Provides", "Watches", "Fights", "Speaks"], answer: 2 },
  { chapter: 15, question: "After Marah, the Israelites came to ______, where there were twelve wells of water and seventy palm trees.", options: ["Sinai", "Elim", "Rephidim", "Midian"], answer: 1 },
  { chapter: 16, question: "How many days a week were the Israelites to gather manna?", options: ["Five", "Six", "Seven", "Three"], answer: 1 },
  { chapter: 13, question: "God led the people around by the way of the wilderness of the ______ Sea.", options: ["Salt", "Dead", "Red", "Great"], answer: 2 },
  { chapter: 14, question: "Moses said to the people, 'Fear not, stand firm, and see the ______ of the Lord.'", options: ["Glory", "Kingdom", "Salvation", "Hand"], answer: 2 },
  // Advanced (20+)
  { chapter: 15, question: "In the Song of Moses, it says 'The Lord is a ______: the Lord is his name.'", options: ["King", "Warrior", "Shepherd", "Father"], answer: 1 },
  { chapter: 16, question: "What happened to the manna if it was kept until the next morning on a normal day?", options: ["It melted", "It turned to stone", "It bred worms and stank", "It stayed fresh"], answer: 2 },
  { chapter: 17, question: "What was the name of the place where Joshua defeated Amalek?", options: ["Marah", "Elim", "Succoth", "Rephidim"], answer: 3 },
  { chapter: 18, question: "Jethro heard of all that God had done for Moses and for Israel his people, and that the Lord had brought Israel out of ______.", options: ["Bondage", "Egypt", "Slavery", "Darkness"], answer: 1 },
  { chapter: 13, question: "When Pharaoh let the people go, God did not lead them by the way of the land of the Philistines, lest the people ______ when they see war.", options: ["Cry", "Flee", "Change their minds", "Rebel"], answer: 2 },
  { chapter: 14, question: "The pillar of cloud moved from before them and stood ______ them.", options: ["Above", "Beside", "Behind", "Inside"], answer: 2 },
  { chapter: 15, question: "Pharaoh's chariots and his host He cast into the sea; and his ______ officers were sunk in the Red Sea.", options: ["Brave", "Chosen", "Vast", "Numerous"], answer: 1 },
  { chapter: 16, question: "The house of Israel called the name of the bread 'Manna'. It was like ______ seed, white, and the taste of it was like wafers made with honey.", options: ["Mustard", "Coriander", "Cumin", "Wheat"], answer: 1 },
  { chapter: 17, question: "Moses built an altar and called its name 'The Lord is my ______.'", options: ["Rock", "Banner", "Shield", "Provider"], answer: 1 },
  { chapter: 18, question: "Moses went out to meet his father-in-law and did ______ and kissed him.", options: ["Homage", "Obeisance", "A dance", "A bow"], answer: 1 },
];

export const EX_19_24: QA[] = [
  // Beginner (0-9)
  { chapter: 19, question: "On which mountain did God give the Ten Commandments?", options: ["Mount Nebo", "Mount Sinai", "Mount Zion", "Mount Hermon"], answer: 1 },
  { chapter: 20, question: "What is the first of the Ten Commandments?", options: ["Honor your father and mother", "You shall not steal", "You shall have no other gods before me", "Remember the Sabbath"], answer: 2 },
  { chapter: 20, question: "Which commandment is 'You shall not commit adultery'?", options: ["Fifth", "Sixth", "Seventh", "Eighth"], answer: 2 },
  { chapter: 24, question: "How many days and nights did Moses spend on the mountain with God?", options: ["Seven", "Twelve", "Forty", "Fifty"], answer: 2 },
  { chapter: 24, question: "What did the elders of Israel see beneath God's feet on the mountain?", options: ["Golden pavement", "Sapphire pavement", "Cloudy floor", "Emerald throne"], answer: 1 },
  { chapter: 19, question: "God told Israel they would be a 'kingdom of ______' and a holy nation.", options: ["Kings", "Priests", "Prophets", "Warriors"], answer: 1 },
  { chapter: 20, question: "Honor your father and your mother, that your ______ may be long in the land.", options: ["Life", "Days", "Years", "Legacy"], answer: 1 },
  { chapter: 20, question: "You shall not make for yourself a carved ______.", options: ["Statue", "Image", "Altar", "Idol"], answer: 1 },
  { chapter: 20, question: "You shall not take the ______ of the Lord your God in vain.", options: ["Word", "Name", "Oath", "Power"], answer: 1 },
  { chapter: 19, question: "The Lord said to Moses, 'Go to the people and ______ them today and tomorrow.'", options: ["Wash", "Bless", "Consecrate", "Warn"], answer: 2 },
  // Intermediate (10-19)
  { chapter: 21, question: "If a servant loves his master and stays, where is his ear pierced?", options: ["The doorpost", "The altar", "The gate", "The tent pole"], answer: 0 },
  { chapter: 22, question: "Who was specifically protected in the law along with the fatherless?", options: ["Soldiers", "Widows", "Priests", "Kings"], answer: 1 },
  { chapter: 23, question: "How many times a year were the men to appear before the Lord?", options: ["One", "Three", "Seven", "Twelve"], answer: 1 },
  { chapter: 24, question: "Who accompanied Moses partway up the mountain (the elders)?", options: ["70 elders", "12 elders", "40 elders", "The whole congregation"], answer: 0 },
  { chapter: 21, question: "He who strikes his father or his mother shall be put to ______.", options: ["Prison", "Exile", "Death", "Shame"], answer: 2 },
  { chapter: 22, question: "If a man steals an ox or a sheep and kills it or sells it, he shall repay ______ oxen for an ox.", options: ["Two", "Three", "Four", "Five"], answer: 3 },
  { chapter: 23, question: "Three times in the year you shall keep a ______ to me.", options: ["Fast", "Feast", "Sabbath", "Meeting"], answer: 1 },
  { chapter: 19, question: "Mount Sinai was wrapped in smoke because the Lord had descended on it in ______.", options: ["Power", "Cloud", "Fire", "Storm"], answer: 2 },
  { chapter: 20, question: "I am the Lord your God, who brought you out of the land of Egypt, out of the house of ______.", options: ["Pharaoh", "Slavery", "Darkness", "Bondage"], answer: 1 },
  { chapter: 24, question: "Moses took the blood and threw it on the people and said, 'Behold the ______ of the covenant.'", options: ["Sign", "Seal", "Blood", "Promise"], answer: 2 },
  // Advanced (20+)
  { chapter: 21, question: "If an ox gores a man or a woman to death, the ox shall be ______.", options: ["Killed", "Sold", "Stoned", "Banished"], answer: 2 },
  { chapter: 22, question: "You shall not permit a ______ to live.", options: ["Thief", "Murderer", "Sorceress", "Liar"], answer: 2 },
  { chapter: 23, question: "You shall not spread a ______ report.", options: ["Lying", "False", "Evil", "Gossip"], answer: 1 },
  { chapter: 19, question: "Moses went up to God, and the Lord ______ to him out of the mountain.", options: ["Spoke", "Appeared", "Called", "Signaled"], answer: 2 },
  { chapter: 20, question: "The people stood far off, while Moses drew near to the thick ______ where God was.", options: ["Smoke", "Cloud", "Darkness", "Fire"], answer: 2 },
  { chapter: 21, question: "Eye for eye, tooth for tooth, hand for hand, ______ for ______.", options: ["Life/Life", "Foot/Foot", "Wound/Wound", "Stripe/Stripe"], answer: 1 },
  { chapter: 22, question: "If you lend money to any of my people with you who is poor, you shall not be to him as a ______.", options: ["Stranger", "Master", "Moneylender", "Friend"], answer: 2 },
  { chapter: 23, question: "Behold, I send an ______ before you to guard you on the way.", options: ["Angel", "Spirit", "Army", "Sign"], answer: 0 },
  { chapter: 24, question: "The glory of the Lord dwelt on Mount Sinai, and the cloud covered it ______ days.", options: ["Three", "Six", "Seven", "Ten"], answer: 1 },
  { chapter: 24, question: "The appearance of the glory of the Lord was like a devouring ______ on the top of the mountain.", options: ["Storm", "Fire", "Beast", "Light"], answer: 1 },
];

export const EX_25_40: QA[] = [
  // Beginner (0-9)
  { chapter: 25, question: "What was placed inside the Ark of the Covenant?", options: ["The Ten Commandments", "Manna", "Aaron's rod", "All of the above"], answer: 0 },
  { chapter: 32, question: "What idol did Aaron make while Moses was on the mountain?", options: ["A golden lion", "A golden calf", "A silver snake", "A stone altar"], answer: 1 },
  { chapter: 32, question: "What did Moses do with the first two tablets of the law?", options: ["He put them in the Ark", "He broke them", "He gave them to Aaron", "He lost them"], answer: 1 },
  { chapter: 33, question: "Moses asked to see God's ______, but God said he could only see His back.", options: ["Face", "Glory", "Hands", "Kingdom"], answer: 1 },
  { chapter: 34, question: "What happened to Moses' face after being with God on the mountain?", options: ["It turned red", "It was radiant (shining)", "It was covered in dust", "It was scarred"], answer: 1 },
  { chapter: 40, question: "What filled the Tabernacle when it was finished?", options: ["Smoke", "A loud voice", "The glory of the LORD", "Golden light"], answer: 2 },
  { chapter: 25, question: "You shall make a ______ of pure gold for the Ark.", options: ["Cover", "Mercy Seat", "Lid", "Throne"], answer: 1 },
  { chapter: 32, question: "Moses' anger burned hot, and he threw the tablets out of his hands and ______ them.", options: ["Hid", "Buried", "Gave", "Broke"], answer: 3 },
  { chapter: 40, question: "So Moses finished the ______.", options: ["Task", "Work", "Tabernacle", "Offering"], answer: 1 },
  { chapter: 34, question: "The Lord passed before him and proclaimed, 'The Lord, the Lord, a God ______ and gracious.'", options: ["Mighty", "Holy", "Merciful", "Just"], answer: 2 },
  // Intermediate (10-19)
  { chapter: 25, question: "On the Mercy Seat, what were the two figures made of hammered gold?", options: ["Angels", "Cherubim", "Seraphim", "Lions"], answer: 1 },
  { chapter: 28, question: "What was engraved on the breastplate of judgment?", options: ["Ten Commandments", "Names of 12 tribes", "Holy, Holy, Holy", "The name of God"], answer: 1 },
  { chapter: 30, question: "What was everyone twenty years and older required to give as an offering?", options: ["A lamb", "Half a shekel", "A measures of grain", "A bull"], answer: 1 },
  { chapter: 31, question: "Who did God specifically fill with wisdom for the Tabernacle's craftsmanship?", options: ["Aaron and Joshua", "Bezalel and Oholiab", "Moses and Miriam", "Eleazar and Ithamar"], answer: 1 },
  { chapter: 32, question: "What tribe stood with Moses when he asked 'Who is on the LORD's side?'", options: ["Judah", "Levi", "Benjamin", "Joseph"], answer: 1 },
  { chapter: 26, question: "Moreover, you shall make the tabernacle with ______ curtains of fine twined linen.", options: ["Seven", "Ten", "Twelve", "Forty"], answer: 1 },
  { chapter: 27, question: "The altar was made of ______ wood.", options: ["Oak", "Cedar", "Acacia", "Olive"], answer: 2 },
  { chapter: 28, question: "These are the garments that they shall make: a breastpiece, an ______, a robe...", options: ["Apron", "Ephod", "Sash", "Tunic"], answer: 1 },
  { chapter: 30, question: "You shall make an altar on which to burn ______.", options: ["Offerings", "Sacrifices", "Incense", "Candles"], answer: 2 },
  { chapter: 33, question: "The Lord used to speak to Moses face to face, as a man speaks to his ______.", options: ["Brother", "King", "Friend", "Son"], answer: 2 },
  // Advanced (20+)
  { chapter: 25, question: "The Ark was to be overlaid with gold both ______ and ______.", options: ["Inside/Outside", "Top/Bottom", "Front/Back", "Left/Right"], answer: 0 },
  { chapter: 26, question: "The veil shall separate for you the Holy Place from the ______.", options: ["Outer Court", "Most Holy Place", "Altar", "Entrance"], answer: 1 },
  { chapter: 27, question: "The length of the court shall be a ______ cubits.", options: ["Fifty", "Hundred", "Two hundred", "Five hundred"], answer: 1 },
  { chapter: 28, question: "Upon the hem of the robe of the ephod, there were to be pomegranates of blue and purple and scarlet, and ______ of gold between them.", options: ["Beads", "Bells", "Flowers", "Rings"], answer: 1 },
  { chapter: 30, question: "You shall make a ______ of bronze, with its stand of bronze, for washing.", options: ["Basin", "Laver", "Bowl", "Cup"], answer: 1 },
  { chapter: 32, question: "The people sat down to eat and drink and rose up to ______.", options: ["Dance", "Play", "Sing", "Work"], answer: 1 },
  { chapter: 34, question: "Moses was there with the Lord ______ days and ______ nights.", options: ["Seven/Seven", "Twelve/Twelve", "Forty/Forty", "Fifty/Fifty"], answer: 2 },
  { chapter: 40, question: "Throughout all their journeys the ______ of the Lord was on the tabernacle by day.", options: ["Glory", "Cloud", "Fire", "Presence"], answer: 1 },
  { chapter: 25, question: "The table for the bread of the Presence was made of ______ wood.", options: ["Shittim", "Acacia", "Gopher", "Cedar"], answer: 1 },
  { chapter: 31, question: "Six days shall work be done, but the seventh day is a Sabbath of solemn ______.", options: ["Prayer", "Rest", "Worship", "Meeting"], answer: 1 },
];

export const EX_BOOK_WIDE: QA[] = [
  ...EX_1_12,
  ...EX_13_18,
  ...EX_19_24,
  ...EX_25_40,
];

export function pickDifficulty(pool: QA[], level: "beginner" | "intermediate" | "advanced"): QA[] {
  if (!pool || pool.length === 0) return [];
  
  if (level === "beginner") {
    return pool.slice(0, Math.min(pool.length, 10));
  }
  
  if (level === "intermediate") {
    // Try to take from 10-25, but fallback if pool is too small
    const start = Math.min(pool.length, 10);
    const end = Math.min(pool.length, 25);
    const subset = pool.slice(start, end);
    return subset.length >= 10 ? subset : pool.slice(0, Math.min(pool.length, 15));
  }
  
  // Advanced: Take from index 20 onward, or last 15 if pool is smaller but > 20
  if (pool.length > 20) {
    const start = Math.min(pool.length, 20);
    const end = Math.min(pool.length, 40); // Standardize at max 20 questions for advanced
    return pool.slice(start, end);
  }
  
  // Final fallback for small pools
  return pool.slice(Math.max(0, pool.length - 10));
}
