export interface DetailedSection {
  title: string;
  description: string;
  verses: string;
  verseText: string;
  day?: string; // Optional field for creation days or similar markers
}

export interface TheologicalTheme {
  title: string;
  points: string[];
}

export interface Verse {
  verse: string;
  text: string;
}

export interface BibleChapter {
  title: string;
  subtitle?: string;
  description: string;
  keyPoints: string[];
  fullText?: Verse[];
  detailedContent?: DetailedSection[];
  theologicalThemes?: TheologicalTheme[];
}

export const bibleData: Record<string, Record<number, BibleChapter>> = {
  genesis: {
    1: {
      title: "Genesis Chapter 1",
      subtitle: "Creation & Sabbath",
      description: "The account of God's creation of the heavens and earth in six days, culminating in the Sabbath rest.",
      keyPoints: [
        "Creation days 1–6 and Sabbath pattern",
        "Heavens and earth; light vs darkness", 
        "Image of God; mandate to rule and fill"
      ],
      detailedContent: [
        {
          day: "Day 1",
          title: "Light and Darkness",
          description: "God created light and separated it from darkness, calling the light 'day' and the darkness 'night'.",
          verses: "Genesis 1:1-5",
          verseText: "In the beginning, God created the heavens and the earth. The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters. And God said, 'Let there be light,' and there was light."
        },
        {
          day: "Day 2", 
          title: "Sky and Waters",
          description: "God separated the waters above from the waters below, creating the expanse called 'sky'.",
          verses: "Genesis 1:6-8",
          verseText: "And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse."
        },
        {
          day: "Day 3",
          title: "Land and Vegetation", 
          description: "God gathered the waters to form seas and created dry land, then made vegetation and plants.",
          verses: "Genesis 1:9-13",
          verseText: "And God said, 'Let the waters under the heavens be gathered together into one place, and let the dry land appear.' And it was so. God called the dry land Earth, and the waters that were gathered together he called Seas."
        },
        {
          day: "Day 4",
          title: "Sun, Moon, and Stars",
          description: "God created the sun to rule the day and the moon to rule the night, along with the stars.",
          verses: "Genesis 1:14-19",
          verseText: "And God said, 'Let there be lights in the expanse of the heavens to separate the day from the night. And let them be for signs and for seasons, and for days and years.'"
        },
        {
          day: "Day 5",
          title: "Sea and Air Creatures",
          description: "God created all living creatures in the seas and birds to fly in the sky.",
          verses: "Genesis 1:20-23",
          verseText: "And God said, 'Let the waters swarm with swarms of living creatures, and let birds fly above the earth across the expanse of the heavens.' So God created the great sea creatures."
        },
        {
          day: "Day 6",
          title: "Land Animals and Humans",
          description: "God created land animals and finally made humans in His image to rule over creation.",
          verses: "Genesis 1:24-31",
          verseText: "Then God said, 'Let us make man in our image, after our likeness. And let them have dominion over the fish of the sea and over the birds of the heavens and over the livestock and over all the earth.'"
        }
      ],
      fullText: [
        { verse: "1", text: "In the beginning, God created the heavens and the earth." },
        { verse: "2", text: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters." },
        { verse: "3", text: "And God said, 'Let there be light,' and there was light." },
        { verse: "4", text: "And God saw that the light was good. And God separated the light from the darkness." },
        { verse: "5", text: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day." },
        { verse: "6", text: "And God said, 'Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.'" },
        { verse: "7", text: "And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so." },
        { verse: "8", text: "And God called the expanse Heaven. And there was evening and there was morning, the second day." },
        { verse: "9", text: "And God said, 'Let the waters under the heavens be gathered together into one place, and let the dry land appear.' And it was so." },
        { verse: "10", text: "God called the dry land Earth, and the waters that were gathered together he called Seas. And God saw that it was good." }
      ]
    },
    2: {
      title: "Genesis Chapter 2",
      subtitle: "Garden of Eden",
      description: "The detailed account of the creation of man, the Garden of Eden, and the establishment of marriage.",
      keyPoints: [
        "Garden of Eden; rivers and Havilah gold",
        "Tree of life vs tree of knowledge",
        "Formation of woman; one flesh design"
      ],
      theologicalThemes: [
        {
          title: "God's Provision",
          points: [
            "Garden planted with every good tree",
            "Rivers flowing with precious metals",
            "Perfect environment for humanity",
            "Tree of life in the midst"
          ]
        },
        {
          title: "Human Responsibility",
          points: [
            "Man placed to work and keep the garden",
            "Naming authority over animals",
            "Stewardship of God's creation",
            "Obedience to God's command"
          ]
        },
        {
          title: "Marriage Design",
          points: [
            "Woman created from man's rib",
            "Helper fit for him",
            "One flesh union",
            "Leave and cleave principle"
          ]
        }
      ],
      detailedContent: [
        {
          title: "The Garden of Eden",
          description: "God planted a garden in Eden with every tree that is pleasant to the sight and good for food, including the tree of life and the tree of knowledge of good and evil.",
          verses: "Genesis 2:8-9",
          verseText: "And the Lord God planted a garden in Eden, in the east, and there he put the man whom he had formed. And out of the ground the Lord God made to spring up every tree that is pleasant to the sight and good for food. The tree of life was in the midst of the garden, and the tree of the knowledge of good and evil."
        },
        {
          title: "The Rivers",
          description: "A river flowed out of Eden and divided into four rivers: Pishon, Gihon, Tigris, and Euphrates, with the land of Havilah containing gold.",
          verses: "Genesis 2:10-14",
          verseText: "A river flowed out of Eden to water the garden, and there it divided and became four rivers. The name of the first is the Pishon. It is the one that flowed around the whole land of Havilah, where there is gold. And the gold of that land is good; bdellium and onyx stone are there. The name of the second river is the Gihon. It is the one that flowed around the whole land of Cush. And the name of the third river is the Tigris, which flows east of Assyria. And the fourth river is the Euphrates."
        },
        {
          title: "Man's Purpose",
          description: "God placed man in the garden to work it and keep it, giving him the command not to eat from the tree of knowledge of good and evil.",
          verses: "Genesis 2:15-17",
          verseText: "The Lord God took the man and put him in the garden of Eden to work it and keep it. And the Lord God commanded the man, saying, 'You may surely eat of every tree of the garden, but of the tree of the knowledge of good and evil you shall not eat, for in the day that you eat of it you shall surely die.'"
        }
      ]
    },
    3: { title: "Genesis Chapter 3", subtitle: "The Fall", description: "The accounts of the temptation, the fall of man, and the first promise of redemption.", keyPoints: ["Temptation and the Fall; consequences", "Protoevangelium (3:15) promise", "Garments of skin; expulsion and cherubim"] },
    4: { title: "Genesis Chapter 4", subtitle: "Cain & Abel", description: "The story of the first siblings, the first murder, and the divergence of human lineages.", keyPoints: ["Cain and Abel offerings; murder and mark", "City of Enoch; Lamech's poem", "Birth of Seth; people begin to call on the Lord"] },
    5: { title: "Genesis Chapter 5", subtitle: "Genealogy", description: "The record of Adam's descendants through Seth, highlighting the long lifespans of the patriarchs.", keyPoints: ["Genealogy of Adam through Seth", "Long lifespans; refrain 'and he died'", "Enoch walks with God; Methuselah & Lamech; Noah named"] },
    6: {
      title: "Genesis Chapter 6",
      subtitle: "Noah & the Flood",
      description: "The corruption of humanity, God's decision to send the flood, and Noah's preparation for the survival of life on earth.",
      keyPoints: [
        "Human wickedness and violence fills the earth",
        "The Nephilim mentioned as mighty men of old",
        "Noah finds favor; God's instructions for the Ark"
      ],
      detailedContent: [
        {
          title: "The Corruption",
          description: "The Lord saw that the wickedness of man was great in the earth, and that every intention of the thoughts of his heart was only evil continually.",
          verses: "Genesis 6:5",
          verseText: "The LORD saw that the wickedness of man was great in the earth, and that every intention of the thoughts of his heart was only evil continually."
        },
        {
          title: "The Ark Instructions",
          description: "God gave Noah detailed instructions to build an ark of gopher wood, with specific dimensions and rooms for the animals.",
          verses: "Genesis 6:14-16",
          verseText: "This is how you are to make it: the length of the ark 300 cubits, its breadth 50 cubits, and its height 30 cubits."
        }
      ],
      fullText: [
        { verse: "1", text: "When man began to multiply on the face of the land and daughters were born to them," },
        { verse: "2", text: "the sons of God saw that the daughters of man were attractive. And they took as their wives any they chose." },
        { verse: "3", text: "Then the Lord said, 'My Spirit shall not abide in man forever, for he is flesh: his days shall be 120 years.'" }
      ]
    },
    7: { title: "Genesis Chapter 7", subtitle: "The Flood", description: "The entry into the Ark and the prevailing of the floodwaters over the entire earth.", keyPoints: ["Noah, family, and animals enter the ark", "Seven pairs of clean animals; 40 days and nights of rain", "Waters prevail; 150 days"] },
    8: { title: "Genesis Chapter 8", subtitle: "After the Flood", description: "The waters recede, the Ark rests, and Noah builds an altar to the Lord.", keyPoints: ["Waters recede; ark rests; raven and dove sent out", "Altar built; pleasing aroma", "Covenant promise: never again a worldwide flood"] },
    9: { title: "Genesis Chapter 9", subtitle: "Noah's Covenant", description: "God's covenant with Noah and the sign of the rainbow.", keyPoints: ["Noah plants vineyard; gets drunk", "Ham sees father's nakedness; cursed", "Shem and Japheth blessed; Canaan cursed"] },
    10: { title: "Genesis Chapter 10", subtitle: "Table of Nations", description: "The genealogy of the descendants of Noah's sons: Shem, Ham, and Japheth.", keyPoints: ["Table of Nations; Japheth's descendants", "Ham's descendants; Canaan's sons", "Shem's descendants; Eber's line"] },
    11: { title: "Genesis Chapter 11", subtitle: "Tower of Babel", description: "The confusion of languages at Babel and the genealogy of Shem to Abram.", keyPoints: ["Tower of Babel; language confusion", "Shem's genealogy to Terah", "Terah's family; Abram, Nahor, Haran"] },
    12: { title: "Genesis Chapter 12", subtitle: "Abram's Call", description: "God's call to Abram to leave his country and the promises made to him.", keyPoints: ["God call Abram; leaves Haran", "Abram in Canaan; builds altars", "Famine; goes to Egypt; Sarai taken"] },
    13: { title: "Genesis Chapter 13", subtitle: "Abram & Lot Separate", description: "Abram and Lot divide their herds and land, with Lot choosing the Jordan plain.", keyPoints: ["Abram and Lot separate; Lot chooses Jordan plain", "Abram settles at Hebron; builds altar", "God renews promises to Abram"] },
    14: { title: "Genesis Chapter 14", subtitle: "War of the Kings", description: "Abram rescues Lot and meets the priest-king Melchizedek.", keyPoints: ["War of the kings; Lot taken captive", "Abram rescues Lot with 318 men", "Melchizedek blesses Abram; tithe given"] },
    15: { title: "Genesis Chapter 15", subtitle: "God's Covenant", description: "God confirms His covenant with Abram and promises an heir.", keyPoints: ["God's covenant with Abram; stars promise", "Abram's faith counted as righteousness", "Covenant ceremony; future slavery foretold"] },
    16: { title: "Genesis Chapter 16", subtitle: "Hagar & Ishmael", description: "The birth of Ishmael through Hagar, Sarai's maidservant.", keyPoints: ["Sarai gives Hagar to Abram; Ishmael born", "Hagar flees; angel meets her at spring", "Promise of Ishmael's descendants"] },
    17: { title: "Genesis Chapter 17", subtitle: "Covenant of Circumcision", description: "Abram is renamed Abraham, and the sign of circumcision is instituted.", keyPoints: ["Covenant of circumcision; Abram becomes Abraham", "Sarai becomes Sarah; Isaac promised", "Ishmael blessed; covenant established"] },
    18: { title: "Genesis Chapter 18", subtitle: "Abraham Intercedes", description: "Abraham intercedes for Sodom and Gomorrah before the Lord.", keyPoints: ["Three visitors at Mamre; Sarah laughs", "Abraham intercedes for Sodom", "Bargaining for righteous people"] },
    19: { title: "Genesis Chapter 19", subtitle: "Sodom's Destruction", description: "The destruction of Sodom and Gomorrah and the escape of Lot.", keyPoints: ["Angels visit Lot; Sodom's destruction", "Lot's wife becomes pillar of salt", "Lot and daughters in Zoar"] },
    20: { title: "Genesis Chapter 20", subtitle: "Abraham & Abimelech", description: "Abraham and Sarah's encounter with Abimelech, king of Gerar.", keyPoints: ["Abraham in Gerar; Sarah taken", "Abimelech's dream; God's warning", "Abraham prays; Abimelech healed"] },
    21: { title: "Genesis Chapter 21", subtitle: "Birth of Isaac", description: "The miraculous birth of Isaac and the departure of Hagar and Ishmael.", keyPoints: ["Isaac born to Abraham and Sarah", "Hagar and Ishmael sent away", "Treaty at Beersheba with Abimelech"] },
    22: { title: "Genesis Chapter 22", subtitle: "Abraham Tested", description: "God commands Abraham to sacrifice Isaac as a test of faith.", keyPoints: ["God tests Abraham with Isaac", "Abraham's faith and obedience", "The Lord provides a ram as substitute"] },
    23: { title: "Genesis Chapter 23", subtitle: "Sarah's Death", description: "Abraham purchases the cave of Machpelah for Sarah's burial.", keyPoints: ["Sarah dies at age 127", "Abraham purchases cave of Machpelah", "First land ownership in Canaan"] },
    24: { title: "Genesis Chapter 24", subtitle: "Isaac & Rebekah", description: "Abraham's servant finds a wife for Isaac among his kinsmen.", keyPoints: ["Abraham sends servant to find Isaac a wife", "Servant's prayer and divine guidance", "Isaac marries Rebekah"] },
    25: { title: "Genesis Chapter 25", subtitle: "Abraham's Death", description: "The death of Abraham and the birth of Jacob and Esau.", keyPoints: ["Death of Abraham", "Ishmael's genealogy", "Birth of Jacob and Esau"] },
    26: { title: "Genesis Chapter 26", subtitle: "Isaac in Gerar", description: "God renews the covenant with Isaac during a famine.", keyPoints: ["Isaac in Gerar", "Covenant with Abimelech", "Esau's wives"] },
    27: { title: "Genesis Chapter 27", subtitle: "Jacob Steals Blessing", description: "Jacob deceives Isaac to obtain the blessing intended for Esau.", keyPoints: ["Jacob steals Esau's blessing", "Esau's anger", "Jacob flees to Laban"] },
    28: { title: "Genesis Chapter 28", subtitle: "Jacob's Ladder", description: "Jacob's vision of a ladder reaching to heaven at Bethel.", keyPoints: ["Jacob's ladder dream", "God's promise at Bethel", "Jacob's vow"] },
    29: { title: "Genesis Chapter 29", subtitle: "Jacob in Haran", description: "Jacob meets Rachel and serves Laban for his daughters.", keyPoints: ["Jacob meets Rachel", "Jacob serves Laban", "Marriage to Leah and Rachel"] },
    30: { title: "Genesis Chapter 30", subtitle: "Jacob's Prosperity", description: "Jacob becomes the father of many sons and his flocks increase.", keyPoints: ["Jacob's children", "Jacob's flocks increase", "Prosperity in Haran"] },
    31: { title: "Genesis Chapter 31", subtitle: "Flight from Laban", description: "Jacob leaves Laban's household and returns to the land of Canaan.", keyPoints: ["Jacob flees from Laban", "Laban pursues Jacob", "Covenant at Mizpah"] },
    32: { title: "Genesis Chapter 32", subtitle: "Jacob Wrestles God", description: "Jacob wrestles with a man until daybreak and his name is changed to Israel.", keyPoints: ["Jacob prepares to meet Esau", "Jacob wrestles with God", "Name changed to Israel"] },
    33: { title: "Genesis Chapter 33", subtitle: "Jacob & Esau Meet", description: "Jacob and Esau are reconciled after years of separation.", keyPoints: ["Jacob and Esau reconcile", "Jacob settles in Shechem", "Building an altar"] },
    34: { title: "Genesis Chapter 34", subtitle: "Dinah & the Shechemites", description: "The defilement of Dinah and the revenge of her brothers.", keyPoints: ["The defilement of Dinah", "Revenge of Simeon and Levi", "Trouble in Shechem"] },
    35: { title: "Genesis Chapter 35", subtitle: "Return to Bethel", description: "God commands Jacob to return to Bethel and build an altar.", keyPoints: ["Return to Bethel", "Death of Rachel and Isaac", "Benjamin's birth"] },
    36: { title: "Genesis Chapter 36", subtitle: "Esau's Lineage", description: "The record of Esau's descendants and the chiefs of Edom.", keyPoints: ["Esau's genealogy", "Chiefs of Edom", "The land of Seir"] },
    37: { title: "Genesis Chapter 37", subtitle: "Joseph's Dreams", description: "Joseph's dreams and his brothers selling him into slavery in Egypt.", keyPoints: ["Joseph's dreams", "Sold into slavery", "Jacob's mourning"] },
    38: { title: "Genesis Chapter 38", subtitle: "Judah & Tamar", description: "The account of Judah and his daughter-in-law Tamar.", keyPoints: ["Judah and Tamar", "Birth of Perez and Zerah", "Family lineage"] },
    39: { title: "Genesis Chapter 39", subtitle: "Joseph in Egypt", description: "Joseph's success in Potiphar's house and his imprisonment.", keyPoints: ["Joseph in Potiphar's house", "Potiphar's wife's accusation", "Joseph in prison"] },
    40: { title: "Genesis Chapter 40", subtitle: "The Prison Dreams", description: "Joseph interprets the dreams of Pharaoh's cupbearer and baker.", keyPoints: ["The cupbearer and baker", "Joseph interprets dreams", "Forgotten in prison"] },
    41: { title: "Genesis Chapter 41", subtitle: "Pharaoh's Dreams", description: "Joseph interprets Pharaoh's dreams and is appointed ruler of Egypt.", keyPoints: ["Pharaoh's dreams", "Joseph becomes ruler", "The gathering of grain"] },
    42: { title: "Genesis Chapter 42", subtitle: "Brothers in Egypt", description: "Joseph's brothers come to Egypt to buy grain during the famine.", keyPoints: ["Joseph's brothers in Egypt", "First meeting in Egypt", "The return for Benjamin"] },
    43: { title: "Genesis Chapter 43", subtitle: "The Second Journey", description: "The brothers return to Egypt with Benjamin to buy more grain.", keyPoints: ["Return with Benjamin", "Feast at Joseph's house", "Brotherly recognition"] },
    44: { title: "Genesis Chapter 44", subtitle: "The Silver Cup", description: "Joseph tests his brothers' character with a planted silver cup.", keyPoints: ["The silver cup test", "Judah's plea for Benjamin", "Sacrificial love"] },
    45: { title: "Genesis Chapter 45", subtitle: "Joseph revealed", description: "Joseph reveals his identity to his brothers and invites them to Egypt.", keyPoints: ["Joseph reveals himself", "Reunion with brothers", "Invitation to Jacob"] },
    46: { title: "Genesis Chapter 46", subtitle: "Jacob Moves to Egypt", description: "Jacob and his entire household settle in the land of Goshen.", keyPoints: ["Jacob moves to Egypt", "Meeting Joseph in Goshen", "God's promise at Beersheba"] },
    47: { title: "Genesis Chapter 47", subtitle: "Settling in Goshen", description: "Jacob meets Pharaoh and Israel prospers in Egypt.", keyPoints: ["Presentation to Pharaoh", "Famine management", "Jacob's request"] },
    48: { title: "Genesis Chapter 48", subtitle: "Jacob's Final Blessing", description: "Jacob blesses Joseph's sons, Ephraim and Manasseh.", keyPoints: ["Jacob blesses Ephraim and Manasseh", "Adopted grandsons", "Crossing hands"] },
    49: { title: "Genesis Chapter 49", subtitle: "Blessings on 12 Sons", description: "Jacob gives his final prophecies and blessings to his twelve sons.", keyPoints: ["Jacob's blessing on 12 sons", "Prophetic words", "Death of Jacob"] },
    50: { title: "Genesis Chapter 50", subtitle: "Joseph's Final Days", description: "The burial of Jacob and Joseph's reassurance to his brothers.", keyPoints: ["Mourning for Jacob", "Joseph's brothers' fear", "Joseph's death and hope"] }
  },
  exodus: {
    1: {
      title: "Exodus Chapter 1",
      subtitle: "Israel in Egypt",
      description: "The account of Israel's multiplication in Egypt, the rise of a new Pharaoh who did not know Joseph, and the oppression of the Hebrews.",
      keyPoints: [
        "Israel multiplies in Egypt",
        "New Pharaoh's oppression",
        "Midwives Shiphrah and Puah obey God"
      ],
      detailedContent: [
        {
          title: "The New Pharaoh",
          description: "Now there arose a new king over Egypt, who did not know Joseph. He feared the Israelites' growth and decided to deal shrewdly with them.",
          verses: "Exodus 1:8-10",
          verseText: "Now there arose a new king over Egypt, who did not know Joseph. And he said to his people, 'Behold, the people of Israel are too many and too mighty for us. Come, let us deal shrewdly with them, lest they multiply, and, if war breaks out, they join our enemies and fight against us and escape from the land.'"
        }
      ]
    },
    2: {
      title: "Exodus Chapter 2",
      subtitle: "Birth of Moses",
      description: "The birth and hiding of Moses, his rescue by Pharaoh's daughter, and his flight to Midian after killing an Egyptian.",
      keyPoints: [
        "Birth and hiding of Moses",
        "Pharaoh's daughter finds Moses",
        "Moses flees to Midian; marries Zipporah"
      ]
    },
    3: {
      title: "Exodus Chapter 3",
      subtitle: "The Burning Bush",
      description: "The divine encounter at Mount Horeb where God reveals His name and commissions Moses to lead Israel out of Egypt.",
      keyPoints: [
        "The Burning Bush at Horeb",
        "The Name of God: 'I AM WHO I AM'",
        "Moses commissioned to deliver Israel"
      ],
      detailedContent: [
        {
          title: "The Great Name",
          description: "God revealed His eternal name to Moses, identifying Himself as the God of their fathers and the self-existent One.",
          verses: "Exodus 3:14",
          verseText: "God said to Moses, 'I AM WHO I AM.' And he said, 'Say this to the people of Israel: \"I AM has sent me to you.\"' God also said to Moses, 'Say this to the people of Israel: \"The LORD, the God of your fathers, the God of Abraham, the God of Isaac, and the God of Jacob, has sent me to you.\" This is my name forever, and thus I am to be remembered throughout all generations.'"
        }
      ]
    },
    4: { title: "Exodus Chapter 4", subtitle: "Signs for Moses", description: "God gives Moses three signs to prove his commission and appoints Aaron as his spokesman.", keyPoints: ["Three signs for Moses (staff, hand, water)", "Aaron appointed as spokesman", "Return to Egypt; circumcision incident"] },
    5: { title: "Exodus Chapter 5", subtitle: "Moses and Pharaoh", description: "The first audience with Pharaoh ends in increased labor for the Israelites, who are now forced to make bricks without straw.", keyPoints: ["First audience with Pharaoh", "Bricks without straw decree", "Israelite officers' complaint"] },
    6: { title: "Exodus Chapter 6", subtitle: "Promises of God", description: "God renews His promise of deliverance and the genealogy of Moses and Aaron is established.", keyPoints: ["God's promise of deliverance renewed", "Genealogy of Reuben, Simeon, and Levi", "Moses and Aaron's charge"] },
    7: { title: "Exodus Chapter 7", subtitle: "The Nile to Blood", description: "The beginning of the plagues as Moses' staff becomes a serpent and the Nile is turned to blood.", keyPoints: ["Moses' staff becomes a serpent", "Plague 1: Nile turned to blood", "Egyptian magicians' imitation"] },
    8: { title: "Exodus Chapter 8", subtitle: "Frogs, Gnats, Flies", description: "The next cycle of plagues brings frogs, gnats, and swarms of flies upon the land of Egypt.", keyPoints: ["Plague 2: Frogs cover the land", "Plague 3: Gnats (Dust to lice)", "Plague 4: Swarms of flies"] },
    9: { title: "Exodus Chapter 9", subtitle: "Livestock, Boils, Hail", description: "Plagues continue with the death of livestock, boils on men and beasts, and a devastating hailstorm.", keyPoints: ["Plague 5: Egyptian livestock die", "Plague 6: Boils on man and beast", "Plague 7: Thunder and hail"] },
    10: { title: "Exodus Chapter 10", subtitle: "Locusts, Darkness", description: "Locusts consume the land and three days of darkness fall upon Egypt, yet Pharaoh's heart remains hardened.", keyPoints: ["Plague 8: Locusts consume the land", "Plague 9: Three days of darkness", "Pharaoh's heart remains hardened"] },
    11: { title: "Exodus Chapter 11", subtitle: "Final Warning", description: "Moses announces the final plague: the death of the firstborn in every Egyptian household.", keyPoints: ["Final plague announced: death of firstborn", "Israelites ask for silver and gold", "Pharaoh refuses to let the people go"] },
    12: { title: "Exodus Chapter 12", subtitle: "Passover", description: "The institution of the Passover and the eventual departure of Israel from Egypt.", keyPoints: ["Passover instructions; the blood sign", "Feast of Unleavened Bread instituted", "Death of firstborn; the Exodus begins"] },
    13: { title: "Exodus Chapter 13", subtitle: "Firstborn", description: "The consecration of the firstborn and God leading the people through pillars of cloud and fire.", keyPoints: ["Consecration of the firstborn", "God leads by pillars of cloud and fire", "Bones of Joseph carried out"] },
    14: { title: "Exodus Chapter 14", subtitle: "Red Sea", description: "The miraculous crossing of the Red Sea and the destruction of Pharaoh's pursuing army.", keyPoints: ["Crossing of the Red Sea", "Egyptians pursue and are drowned", "Israel fears and trusts the Lord"] },
    15: { title: "Exodus Chapter 15", subtitle: "Song & Marah", description: "The Song of Moses and Miriam, followed by the bitter waters of Marah made sweet.", keyPoints: ["The Song of Moses and Miriam", "Waters of Marah made sweet", "Arrival at Elim's springs and palms"] },
    16: { title: "Exodus Chapter 16", subtitle: "Manna", description: "God provides manna and quail for the Israelites in the desert of Sin.", keyPoints: ["Manna and quail provided in the desert", "Sabbath regulations for manna", "Pot of manna kept as a testimony"] },
    17: { title: "Exodus Chapter 17", subtitle: "Water & Amalek", description: "Water flows from the rock at Rephidim, and Israel gains victory over the Amalekites.", keyPoints: ["Water from the rock at Rephidim", "Victory over Amalek; Moses' hands held up", "The Lord is my Banner (Jehovah Nissi)"] },
    18: { title: "Exodus Chapter 18", subtitle: "Jethro", description: "Moses' father-in-law visits and advises him on delegating leadership and judgment.", keyPoints: ["Jethro (Moses' father-in-law) visits", "Advice on delegating judgment", "Appointment of capable leaders"] },
    19: { title: "Exodus Chapter 19", subtitle: "At Sinai", description: "Israel arrives at Mount Sinai and prepares to receive God's law.", keyPoints: ["Arrival at Mount Sinai", "Consecration of the people", "God's descent in fire and cloud"] },
    20: { title: "Exodus Chapter 20", subtitle: "Ten Commandments", description: "The Giving of the Ten Commandments and the people's fear of God's presence.", keyPoints: ["The Ten Commandments given", "People's fear of the divine voice", "Altar laws: unhewn stones"] },
    21: { title: "Exodus Chapter 21", subtitle: "Laws of Injuries", description: "Specific legislation regarding servants, personal injuries, and property rights.", keyPoints: ["Laws concerning Hebrew slaves", "Legislation on personal injuries", "Restitution and property rights"] },
    22: { title: "Exodus Chapter 22", subtitle: "Property Laws", description: "Regulations on theft, social responsibility, and property damages.", keyPoints: ["Laws on social responsibility", "Protection of widows and orphans", "Moral and religious regulations"] },
    23: { title: "Exodus Chapter 23", subtitle: "Justice & Feasts", description: "Laws of justice, Sabbath years, and the three annual feasts.", keyPoints: ["Justice for all; Sabbath years/days", "Three annual feasts commanded", "Promise of the Angel's guidance"] },
    24: { title: "Exodus Chapter 24", subtitle: "Covenant Confirmed", description: "The blood of the covenant and Moses entering the cloud on the mountain.", keyPoints: ["The Covenant confirmed with blood", "Moses and elders see God on the sapphire pavement", "Moses enters the cloud for forty days"] },
    25: { title: "Exodus Chapter 25", subtitle: "Ark of the Covenant", description: "Design for the Ark, Table, and Lampstand for the Tabernacle.", keyPoints: ["Offering for the Tabernacle", "Ark of the Covenant design", "Table for the Bread and Lampstand"] },
    26: { title: "Exodus Chapter 26", subtitle: "Curtains & Frames", description: "The construction of the Tabernacle's curtains, frames, and the inner Veil.", keyPoints: ["Curtains and frames of the Tabernacle", "The Veil and the Screen", "The Most Holy Place design"] },
    27: { title: "Exodus Chapter 27", subtitle: "Altar & Court", description: "Construction of the Bronze Altar and the outer Court of the Tabernacle.", keyPoints: ["The Bronze Altar construction", "The Court of the Tabernacle", "Oil for the lamp regulations"] },
    28: { title: "Exodus Chapter 28", subtitle: "Priestly Garments", description: "The design for the holy garments of the priesthood including the Ephod and Breastpiece.", keyPoints: ["Garments for the priesthood", "The Ephod and Breastpiece", "Urim and Thummim"] },
    29: { title: "Exodus Chapter 29", subtitle: "Consecration", description: "The ritual for the consecration of the priests and the daily offerings.", keyPoints: ["Consecration of the priests", "Daily offerings on the altar", "God's promise to dwell among Israel"] },
    30: { title: "Exodus Chapter 30", subtitle: "Incense & Ransom", description: "Instructions for the Altar of Incense, the Ransom Money, and the Bronze Basin.", keyPoints: ["Altar of Incense and Ransom Money", "The Bronze Basin for washing", "Anointing Oil and Incense formulas"] },
    31: { title: "Exodus Chapter 31", subtitle: "Artisans & Sabbath", description: "Bezalel and Oholiab are called to craftsmanship, and the Sabbath is emphasized as a sign.", keyPoints: ["Bezalel and Oholiab called", "Sabbath as a sign", "Moses receives the two tablets"] },
    32: { title: "Exodus Chapter 32", subtitle: "Golden Calf", description: "The Israelites' rebellion with the golden calf and Moses' intercession.", keyPoints: ["The Golden Calf rebellion", "Moses' intercession and anger", "The Levites' loyalty"] },
    33: { title: "Exodus Chapter 33", subtitle: "The Tent of Meeting", description: "Moses speaks with God face to face and asks to see His glory.", keyPoints: ["The Command to leave Sinai", "The Tent of Meeting", "Moses sees God's glory"] },
    34: { title: "Exodus Chapter 34", subtitle: "Covenant Renewed", description: "Moses returns with new tablets and his face shines with God's glory.", keyPoints: ["The New Tablets of Stone", "The Covenant renewed", "The radiant face of Moses"] },
    35: { title: "Exodus Chapter 35", subtitle: "Sabbath & Offerings", description: "The people bring Stirred-Heart offerings for the construction of the Tabernacle.", keyPoints: ["Sabbath laws and contributions", "The Tabernacle artisans begin", "Heart-stirred offerings from the people"] },
    36: { title: "Exodus Chapter 36", subtitle: "Construction Begins", description: "The artisans construct the curtains, boards, and veils of the Tabernacle.", keyPoints: ["Restraint of the offerings", "Curtains and boards constructed", "The Veil and Screen made"] },
    37: { title: "Exodus Chapter 37", subtitle: "Ark & Furniture", description: "The making of the Ark, Table, Lampstand, and Altars.", keyPoints: ["Making the Ark and Mercy Seat", "Making the Table and Lampstand", "Making the Altars and Anointing Oil"] },
    38: { title: "Exodus Chapter 38", subtitle: "Bronze Altar & Court", description: "The construction of the Bronze Altar, the Basin, and the inventory of materials.", keyPoints: ["Making the Bronze Altar and Basin", "Construction of the Court", "Inventory of materials used"] },
    39: { title: "Exodus Chapter 39", subtitle: "Vestments Finished", description: "The completion of the priestly garments and Moses' final inspection.", keyPoints: ["Making the Priestly garments", "Completion of the Tabernacle work", "Moses inspects and blesses the work"] },
    40: { title: "Exodus Chapter 40", subtitle: "Tabernacle Filled", description: "The Tabernacle is set up and the glory of the Lord fills the place.", keyPoints: ["Setting up the Tabernacle", "Consecration of priests", "The Glory of the Lord fills the Tabernacle"] }
  },
  nehemiah: {
    1: {
      title: "Nehemiah Chapter 1",
      subtitle: "Nehemiah's Prayer",
      description: "Nehemiah receives news about the state of Jerusalem's walls and is overcome with grief, leading to a profound prayer of confession and appeal to God.",
      keyPoints: [
        "Nehemiah's brother Hanani reports Jerusalem's walls are broken and gates burned.",
        "Nehemiah weeps, fasts, and prays for several days.",
        "A confession of Israel's sins and a plea for God's favor before King Artaxerxes."
      ],
      detailedContent: [
        {
          title: "Bad News from Jerusalem",
          description: "Hanani and others from Judah arrive at Susa. They reveal that the survivors are in great trouble and disgrace, and the city's defenses are non-existent.",
          verses: "Nehemiah 1:3",
          verseText: "They said to me, 'Those who survived the exile and are back in the province are in great trouble and disgrace. The wall of Jerusalem is broken down, and its gates have been burned with fire.'"
        },
        {
          title: "Nehemiah's Prayer",
          description: "Nehemiah acknowledges God's faithfulness and confesses the sins of his people. He reminds God of His promise to Moses about gathering the scattered people.",
          verses: "Nehemiah 1:5-11",
          verseText: "Then I said: 'LORD, the God of heaven, the great and awesome God, who keeps his covenant of love with those who love him and keep his commandments, let your ear be attentive and your eyes open to hear the prayer your servant is praying before you day and night for your servants, the people of Israel.'"
        }
      ]
    },
    2: {
      title: "Nehemiah Chapter 2",
      subtitle: "Nehemiah Sent to Jerusalem",
      description: "King Artaxerxes notices Nehemiah's sadness and grants him permission and resources to rebuild the walls of Jerusalem.",
      keyPoints: [
        "Nehemiah prays an 'arrow prayer' before answering the King.",
        "Artaxerxes provides letters for safe passage and timber.",
        "Nehemiah inspects the ruins of Jerusalem's walls by night."
      ],
      detailedContent: [
        {
          title: "Before the King",
          description: "As cupbearer, Nehemiah appears sad before the king. He expresses his grief for his ancestral city and asks for permission to go and rebuild it.",
          verses: "Nehemiah 2:4-5",
          verseText: "The king said to me, 'What is it you want?' Then I prayed to the God of heaven, and I answered the king, 'If it pleases the king and if your servant has found favor in his sight, let him send me to the city in Judah where my ancestors are buried so that I can rebuild it.'"
        }
      ]
    },
    3: {
      title: "Nehemiah Chapter 3",
      subtitle: "Builders of the Wall",
      description: "A detailed account of the various groups who each took responsibility for a specific section of the wall rebuilding.",
      keyPoints: [
        "Eliashib the high priest leads the rebuilding of the Sheep Gate.",
        "The work was decentralized: different groups worked 'next to' one another.",
        "Goldsmiths, perfume-makers, and rulers all joined the construction."
      ]
    },
    4: {
      title: "Nehemiah Chapter 4",
      subtitle: "Opposition to the Rebuilding",
      description: "Enemies mock the rebuilding efforts, leading Nehemiah to organize a defensive strategy while the work continues.",
      keyPoints: [
        "Sanballat and Tobiah ridicule the strength of the wall.",
        "Nehemiah prays for God to turn their insults back on their heads.",
        "Builders work with tools in one hand and weapons in the other."
      ]
    },
    5: {
      title: "Nehemiah Chapter 5",
      subtitle: "Nehemiah Helps the Poor",
      description: "Nehemiah addresses internal oppression where the wealthy were charging high interest to their brothers in a time of famine.",
      keyPoints: [
        "The poor were mortgaging fields and selling children into slavery for food.",
        "Nehemiah rebukes the nobles and makes them return the interest.",
        "Nehemiah refuses the governor's food allowance to avoid burdening the people."
      ]
    },
    6: {
      title: "Nehemiah Chapter 6",
      subtitle: "Completion of the Wall",
      description: "The walls are completed despite repeated attempts by enemies to trap or intimidate Nehemiah.",
      keyPoints: [
        "Nehemiah refuses to meet enemies in the Plain of Ono: 'I am doing a great work.'",
        "A false prophet is hired to lure Nehemiah into the temple.",
        "The wall is finished in just 52 days, awing the surrounding nations."
      ]
    },
    7: {
      title: "Nehemiah Chapter 7",
      subtitle: "The List of Exiles",
      description: "With the walls complete, Nehemiah appoints guards and records the list of exiles who had returned to Jerusalem.",
      keyPoints: [
        "Hanani and Hananiah are put in charge of Jerusalem's security.",
        "Strict gate-keeping rules are established.",
        "A genealogical record of those who returned with Zerubbabel is found."
      ]
    },
    8: {
      title: "Nehemiah Chapter 8",
      subtitle: "Ezra Reads the Law",
      description: "Ezra the scribe reads the Law of Moses to the people, leading to a spiritual awakening and celebration.",
      keyPoints: [
        "The people listen attentively from morning until midday.",
        "Ezra reads from a high wooden platform.",
        "Nehemiah tells the weeping people: 'The joy of the LORD is your strength.'"
      ]
    },
    9: {
      title: "Nehemiah Chapter 9",
      subtitle: "Israel Confesses Sins",
      description: "A national day of confession follows the reading of the Law, recounting God's faithfulness and Israel's rebellion.",
      keyPoints: [
        "The people fast, wear sackcloth, and separate from foreigners.",
        "A long prayer reviews God's history from Abraham to the exile.",
        "Israel acknowledges God's patience despite their stubbornness."
      ]
    },
    10: {
      title: "Nehemiah Chapter 10",
      subtitle: "The Agreement to the Law",
      description: "The leaders, Levites, and priests sign a covenant to keep God's Law and support the Temple.",
      keyPoints: [
        "Specific commitments: no intermarriage and keeping the Sabbath.",
        "Promises to bring the firstfruits and tithes to the storehouses.",
        "The decree: 'We will not neglect the house of our God.'"
      ]
    },
    11: {
      title: "Nehemiah Chapter 11",
      subtitle: "New Residents of Jerusalem",
      description: "Jerusalem is populated by casting lots to bring one out of every ten people to live in the holy city.",
      keyPoints: [
        "Leaders settle in Jerusalem first; others chosen by lot.",
        "Volunteers for Jerusalem residency are blessed.",
        "Lists of provincial leaders and priests in surrounding towns."
      ]
    },
    12: {
      title: "Nehemiah Chapter 12",
      subtitle: "Dedication of the Wall",
      description: "The records of priests and Levites are kept, and the wall of Jerusalem is dedicated with great joy.",
      keyPoints: [
        "Two large choirs march in opposite directions on top of the wall.",
        "Musicians with Davidic instruments lead the joyful procession.",
        "Rejoicing in Jerusalem is heard from far away."
      ]
    },
    13: {
      title: "Nehemiah Chapter 13",
      subtitle: "Nehemiah's Final Reforms",
      description: "Nehemiah returns to Jerusalem and enacts final reforms concerning the Temple, Sabbath, and intermarriage.",
      keyPoints: [
        "Tobiah's room is cleared out of the Temple courts.",
        "Gates are shut on the Sabbath to prevent trade.",
        "Nehemiah rebukes those who married women from Ashdod and Ammon."
      ]
    }
  }
};
