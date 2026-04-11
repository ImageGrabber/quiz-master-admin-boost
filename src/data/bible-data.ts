import { BookOpen, Shield, BookMarked, Target, Crown, Trophy, Globe, Heart, Lightbulb, Award, Star, Zap, Users, Calendar } from "lucide-react";

import { bibleStructure } from './bible-structure';

export const bibleBooks = {
    oldTestament: {
        Pentateuch: ["Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy"],
        Historical: [
            "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra", "Nehemiah", "Esther"
        ],
        Wisdom: ["Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon"],
        MajorProphets: ["Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel"],
        MinorProphets: [
            "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
        ]
    },
    newTestament: {
        Gospels: ["Matthew", "Mark", "Luke", "John"],
        Historical: ["Acts"],
        PaulineEpistles: [
            "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon"
        ],
        GeneralEpistles: [
            "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude"
        ],
        Apocalyptic: ["Revelation"]
    }
};

const allBooks = [
    ...bibleBooks.oldTestament.Pentateuch,
    ...bibleBooks.oldTestament.Historical,
    ...bibleBooks.oldTestament.Wisdom,
    ...bibleBooks.oldTestament.MajorProphets,
    ...bibleBooks.oldTestament.MinorProphets,
    ...bibleBooks.newTestament.Gospels,
    ...bibleBooks.newTestament.Historical,
    ...bibleBooks.newTestament.PaulineEpistles,
    ...bibleBooks.newTestament.GeneralEpistles,
    ...bibleBooks.newTestament.Apocalyptic
];

export const bookNames = allBooks.reduce((acc, book) => {
    acc[book.toLowerCase()] = book;
    acc[book.toLowerCase().replace(/\s+/g, '-')] = book;
    return acc;
}, {} as Record<string, string>);

export { bibleStructure };

export const featuredQuizzes = [
    // Pentateuch (Genesis to Deuteronomy) - All 5 books with 10 questions each
    { title: "Genesis Quiz", description: "The beginning of everything - Creation, Adam & Eve, Noah's Ark, Abraham's journey", difficulty: "Beginner", questions: 10, icon: BookOpen, color: "bg-blue-500", link: "/public-quiz/genesis", category: "Pentateuch", seoTitle: "Genesis Bible Quiz - Test Your Knowledge of the First Book" },
    { title: "Exodus Quiz", description: "The great deliverance - Moses, the Ten Commandments, the Red Sea crossing", difficulty: "Beginner", questions: 10, icon: Shield, color: "bg-green-500", link: "/public-quiz/exodus", category: "Pentateuch", seoTitle: "Exodus Bible Quiz - Moses and the Ten Commandments" },
    { title: "Leviticus Quiz", description: "Laws and sacrifices - Priestly duties, offerings, and holiness codes", difficulty: "Intermediate", questions: 10, icon: BookMarked, color: "bg-orange-500", link: "/public-quiz/leviticus", category: "Pentateuch", seoTitle: "Leviticus Bible Quiz - Laws, Sacrifices, and Holiness" },
    { title: "Numbers Quiz", description: "Wilderness wanderings - Israel's journey, the census, and God's provision", difficulty: "Intermediate", questions: 10, icon: Target, color: "bg-purple-500", link: "/public-quiz/numbers", category: "Pentateuch", seoTitle: "Numbers Bible Quiz - Wilderness Journey and God's Faithfulness" },
    { title: "Deuteronomy Quiz", description: "Moses' final words - Laws restated, blessings and curses, entering the Promised Land", difficulty: "Intermediate", questions: 10, icon: Crown, color: "bg-red-500", link: "/public-quiz/deuteronomy", category: "Pentateuch", seoTitle: "Deuteronomy Bible Quiz - Moses' Final Words and Laws" },

    // Historical Books (Joshua to Esther) - All 12 books with 10 questions each
    { title: "Joshua Quiz", description: "Conquering the promised land - Entering Canaan, Jericho, and dividing the land", difficulty: "Beginner", questions: 10, icon: Target, color: "bg-teal-500", link: "/public-quiz/joshua", category: "Historical Books", seoTitle: "Joshua Bible Quiz - Conquest of the Promised Land" },
    { title: "Judges Quiz", description: "Cycle of deliverance - Othniel, Deborah, Gideon, Samson and the judges", difficulty: "Beginner", questions: 10, icon: Shield, color: "bg-green-500", link: "/public-quiz/judges", category: "Historical Books", seoTitle: "Judges Bible Quiz - Period of Judges and Deliverers" },
    { title: "Ruth Quiz", description: "Loyalty and redemption - Naomi, Boaz, and the lineage of David", difficulty: "Beginner", questions: 10, icon: Star, color: "bg-pink-500", link: "/public-quiz/ruth", category: "Historical Books", seoTitle: "Ruth Bible Quiz - Loyalty, Love, and Redemption" },
    { title: "1 Samuel Quiz", description: "Transition to kingship - Samuel, Saul, and the rise of David", difficulty: "Beginner", questions: 10, icon: Crown, color: "bg-purple-500", link: "/public-quiz/1-samuel", category: "Historical Books", seoTitle: "1 Samuel Bible Quiz - Samuel, Saul, and David" },
    { title: "2 Samuel Quiz", description: "David's reign as king - His victories, sins, and the promise of an eternal kingdom", difficulty: "Intermediate", questions: 10, icon: Trophy, color: "bg-orange-500", link: "/public-quiz/2-samuel", category: "Historical Books", seoTitle: "2 Samuel Bible Quiz - David's Reign and Kingdom" },
    { title: "1 Kings Quiz", description: "Solomon's wisdom and temple - The divided kingdom and Elijah's ministry", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-blue-500", link: "/public-quiz/1-kings", category: "Historical Books", seoTitle: "1 Kings Bible Quiz - Solomon's Temple and Divided Kingdom" },
    { title: "2 Kings Quiz", description: "Fall of Israel and Judah - Elisha's miracles and the exile to Babylon", difficulty: "Intermediate", questions: 10, icon: Globe, color: "bg-red-500", link: "/public-quiz/2-kings", category: "Historical Books", seoTitle: "2 Kings Bible Quiz - Fall of Israel and Judah" },
    { title: "1 Chronicles Quiz", description: "Genealogies and David's reign - The priestly perspective on Israel's history", difficulty: "Intermediate", questions: 10, icon: BookMarked, color: "bg-indigo-500", link: "/public-quiz/1-chronicles", category: "Historical Books", seoTitle: "1 Chronicles Bible Quiz - Genealogies and David's Reign" },
    { title: "2 Chronicles Quiz", description: "Temple and Judah's kings - Solomon's temple and the importance of worship", difficulty: "Intermediate", questions: 10, icon: Heart, color: "bg-pink-500", link: "/public-quiz/2-chronicles", category: "Historical Books", seoTitle: "2 Chronicles Bible Quiz - Temple and Judah's History" },
    { title: "Ezra Quiz", description: "Return from exile - Rebuilding the temple and restoring worship", difficulty: "Intermediate", questions: 10, icon: Lightbulb, color: "bg-yellow-500", link: "/public-quiz/ezra", category: "Historical Books", seoTitle: "Ezra Bible Quiz - Return from Exile and Temple Rebuilding" },
    { title: "Nehemiah Quiz", description: "Rebuilding Jerusalem's walls - Leadership, opposition, and spiritual renewal", difficulty: "Intermediate", questions: 15, icon: Award, color: "bg-teal-500", link: "/public-quiz/nehemiah", category: "Historical Books", seoTitle: "Nehemiah Bible Quiz - Rebuilding Jerusalem's Walls" },
    { title: "Esther Quiz", description: "Courage and deliverance - Queen Esther saves her people from destruction", difficulty: "Beginner", questions: 10, icon: Star, color: "bg-rose-500", link: "/public-quiz/esther", category: "Historical Books", seoTitle: "Esther Bible Quiz - Queen Esther's Courage and Deliverance" },

    // Wisdom Literature (Job to Song of Solomon)
    { title: "Job Quiz", description: "Suffering and faith", difficulty: "Intermediate", questions: 10, icon: Award, color: "bg-indigo-500", link: "/public-quiz/job", category: "Wisdom Literature" },
    { title: "Psalms Quiz", description: "Songs of the heart", difficulty: "Beginner", questions: 10, icon: Heart, color: "bg-purple-500", link: "/public-quiz/psalms", category: "Wisdom Literature" },
    { title: "Proverbs Quiz", description: "Wisdom for daily living", difficulty: "Beginner", questions: 10, icon: Lightbulb, color: "bg-yellow-500", link: "/public-quiz/proverbs", category: "Wisdom Literature" },

    // Major Prophets (Isaiah to Daniel)
    { title: "Isaiah Quiz", description: "The major prophet", difficulty: "Intermediate", questions: 10, icon: Crown, color: "bg-red-500", link: "/public-quiz/isaiah", category: "Major Prophets" },
    { title: "Daniel Quiz", description: "Faith in the lion's den", difficulty: "Intermediate", questions: 10, icon: Globe, color: "bg-orange-500", link: "/public-quiz/daniel", category: "Major Prophets" },

    // Minor Prophets (Hosea to Malachi) - All 12 books with 10 questions each
    { title: "Hosea Quiz", description: "God's love despite unfaithfulness - Marriage metaphor and divine love", difficulty: "Intermediate", questions: 10, icon: Heart, color: "bg-pink-500", link: "/public-quiz/hosea", category: "Minor Prophets", seoTitle: "Hosea Bible Quiz - God's Love and Israel's Unfaithfulness" },
    { title: "Joel Quiz", description: "Day of the Lord and God's Spirit - Locust plague and future outpouring", difficulty: "Intermediate", questions: 10, icon: Zap, color: "bg-yellow-500", link: "/public-quiz/joel", category: "Minor Prophets", seoTitle: "Joel Bible Quiz - Day of the Lord and God's Spirit" },
    { title: "Amos Quiz", description: "Social justice and God's judgment - Shepherd prophet and social reform", difficulty: "Intermediate", questions: 10, icon: Shield, color: "bg-green-500", link: "/public-quiz/amos", category: "Minor Prophets", seoTitle: "Amos Bible Quiz - Social Justice and God's Judgment" },
    { title: "Obadiah Quiz", description: "Edom's judgment and pride - Brother's betrayal and divine justice", difficulty: "Intermediate", questions: 10, icon: Target, color: "bg-red-500", link: "/public-quiz/obadiah", category: "Minor Prophets", seoTitle: "Obadiah Bible Quiz - Edom's Judgment and Pride" },
    { title: "Jonah Quiz", description: "God's mercy to Nineveh - Reluctant prophet and divine compassion", difficulty: "Beginner", questions: 10, icon: Globe, color: "bg-blue-500", link: "/public-quiz/jonah", category: "Minor Prophets", seoTitle: "Jonah Bible Quiz - God's Mercy and the Great Fish" },
    { title: "Micah Quiz", description: "Social justice and the coming Messiah - Bethlehem prophecy and divine requirements", difficulty: "Intermediate", questions: 10, icon: Star, color: "bg-purple-500", link: "/public-quiz/micah", category: "Minor Prophets", seoTitle: "Micah Bible Quiz - Social Justice and the Coming Messiah" },
    { title: "Nahum Quiz", description: "Nineveh's judgment and fall - Assyrian capital's destruction and divine justice", difficulty: "Intermediate", questions: 10, icon: Trophy, color: "bg-orange-500", link: "/public-quiz/nahum", category: "Minor Prophets", seoTitle: "Nahum Bible Quiz - Nineveh's Judgment and Fall" },
    { title: "Habakkuk Quiz", description: "Faith and God's justice - Questioning prophet and divine answers", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-indigo-500", link: "/public-quiz/habakkuk", category: "Minor Prophets", seoTitle: "Habakkuk Bible Quiz - Faith and God's Justice" },
    { title: "Zephaniah Quiz", description: "Day of the Lord and restoration - Judgment and hope for the future", difficulty: "Intermediate", questions: 10, icon: Crown, color: "bg-teal-500", link: "/public-quiz/zephaniah", category: "Minor Prophets", seoTitle: "Zephaniah Bible Quiz - Day of the Lord and Restoration" },
    { title: "Haggai Quiz", description: "Rebuilding the temple - Post-exile prophet and temple reconstruction", difficulty: "Intermediate", questions: 10, icon: BookMarked, color: "bg-green-500", link: "/public-quiz/haggai", category: "Minor Prophets", seoTitle: "Haggai Bible Quiz - Rebuilding the Temple" },
    { title: "Zechariah Quiz", description: "Visions and the coming Messiah - Apocalyptic prophet and future hope", difficulty: "Intermediate", questions: 10, icon: Lightbulb, color: "bg-yellow-500", link: "/public-quiz/zechariah", category: "Minor Prophets", seoTitle: "Zechariah Bible Quiz - Visions and the Coming Messiah" },
    { title: "Malachi Quiz", description: "Last prophet and the coming Messiah - Final words and future hope", difficulty: "Intermediate", questions: 10, icon: Award, color: "bg-red-500", link: "/public-quiz/malachi", category: "Minor Prophets", seoTitle: "Malachi Bible Quiz - Last Prophet and the Coming Messiah" },

    // Gospels (Matthew to John) - All 4 books with 10 questions each
    { title: "Matthew Quiz", description: "Jesus as the promised Messiah - King of the Jews and fulfillment of prophecy", difficulty: "Beginner", questions: 10, icon: Crown, color: "bg-blue-500", link: "/public-quiz/matthew", category: "Gospels", seoTitle: "Matthew Bible Quiz - Jesus as the Promised Messiah" },
    { title: "Mark Quiz", description: "Jesus as the suffering servant - Son of God who came to serve and save", difficulty: "Beginner", questions: 10, icon: Shield, color: "bg-green-500", link: "/public-quiz/mark", category: "Gospels", seoTitle: "Mark Bible Quiz - Jesus as the Suffering Servant" },
    { title: "Luke Quiz", description: "Jesus as the universal Savior - Compassionate healer and friend of sinners", difficulty: "Beginner", questions: 10, icon: Heart, color: "bg-purple-500", link: "/public-quiz/luke", category: "Gospels", seoTitle: "Luke Bible Quiz - Jesus as the Universal Savior" },
    { title: "John Quiz", description: "Jesus as the divine Son of God - Word made flesh and giver of eternal life", difficulty: "Intermediate", questions: 10, icon: Star, color: "bg-yellow-500", link: "/public-quiz/john", category: "Gospels", seoTitle: "John Bible Quiz - Jesus as the Divine Son of God" },

    // Pauline Epistles (Romans to Philemon) - All 13 books with 10 questions each
    { title: "Romans Quiz", description: "The gospel of God's righteousness - Justification by faith, sin and grace, God's plan for Israel", difficulty: "Advanced", questions: 10, icon: BookOpen, color: "bg-blue-500", link: "/public-quiz/romans", category: "Pauline Epistles", seoTitle: "Romans Bible Quiz - The Gospel of God's Righteousness" },
    { title: "1 Corinthians Quiz", description: "Addressing church problems - Love, spiritual gifts, resurrection, Christian conduct", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-green-500", link: "/public-quiz/1-corinthians", category: "Pauline Epistles", seoTitle: "1 Corinthians Bible Quiz - Addressing Church Problems" },
    { title: "2 Corinthians Quiz", description: "Paul's defense and ministry - Apostolic authority, suffering, giving, reconciliation", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-purple-500", link: "/public-quiz/2-corinthians", category: "Pauline Epistles", seoTitle: "2 Corinthians Bible Quiz - Paul's Defense and Ministry" },
    { title: "Galatians Quiz", description: "Freedom in Christ - Justification by faith alone, law vs. grace, Christian liberty", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-orange-500", link: "/public-quiz/galatians", category: "Pauline Epistles", seoTitle: "Galatians Bible Quiz - Freedom in Christ" },
    { title: "Ephesians Quiz", description: "The church as Christ's body - Unity, spiritual warfare, Christian living, God's eternal plan", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-pink-500", link: "/public-quiz/ephesians", category: "Pauline Epistles", seoTitle: "Ephesians Bible Quiz - The Church as Christ's Body" },
    { title: "Philippians Quiz", description: "Joy in Christ - Paul's gratitude, Christ's humility, pressing toward the goal", difficulty: "Beginner", questions: 10, icon: BookOpen, color: "bg-yellow-500", link: "/public-quiz/philippians", category: "Pauline Epistles", seoTitle: "Philippians Bible Quiz - Joy in Christ" },
    { title: "Colossians Quiz", description: "The supremacy of Christ - Christ's preeminence, Christian conduct, false teachings", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-teal-500", link: "/public-quiz/colossians", category: "Pauline Epistles", seoTitle: "Colossians Bible Quiz - The Supremacy of Christ" },
    { title: "1 Thessalonians Quiz", description: "The Lord's return - Paul's ministry, Christian living, the rapture, end times", difficulty: "Beginner", questions: 10, icon: BookOpen, color: "bg-indigo-500", link: "/public-quiz/1-thessalonians", category: "Pauline Epistles", seoTitle: "1 Thessalonians Bible Quiz - The Lord's Return" },
    { title: "2 Thessalonians Quiz", description: "The day of the Lord - End times, the man of lawlessness, Christian discipline", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-red-500", link: "/public-quiz/2-thessalonians", category: "Pauline Epistles", seoTitle: "2 Thessalonians Bible Quiz - The Day of the Lord" },
    { title: "1 Timothy Quiz", description: "Pastoral leadership - Church order, qualifications for leaders, false teachings", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-cyan-500", link: "/public-quiz/1-timothy", category: "Pauline Epistles", seoTitle: "1 Timothy Bible Quiz - Pastoral Leadership" },
    { title: "2 Timothy Quiz", description: "Paul's final words - Endurance, sound doctrine, finishing the race, God's faithfulness", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-lime-500", link: "/public-quiz/2-timothy", category: "Pauline Epistles", seoTitle: "2 Timothy Bible Quiz - Paul's Final Words" },
    { title: "Titus Quiz", description: "Church organization - Qualifications for elders, sound doctrine, good works", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-emerald-500", link: "/public-quiz/titus", category: "Pauline Epistles", seoTitle: "Titus Bible Quiz - Church Organization" },
    { title: "Philemon Quiz", description: "A personal appeal - Forgiveness, Christian brotherhood, Paul's intercession", difficulty: "Beginner", questions: 10, icon: BookOpen, color: "bg-violet-500", link: "/public-quiz/philemon", category: "Pauline Epistles", seoTitle: "Philemon Bible Quiz - A Personal Appeal" },

    // General Epistles (Hebrews to Jude) - All 8 books with 10 questions each
    { title: "Hebrews Quiz", description: "The superiority of Christ - New covenant, faith, and perseverance", difficulty: "Advanced", questions: 10, icon: Star, color: "bg-blue-500", link: "/public-quiz/hebrews", category: "General Epistles", seoTitle: "Hebrews Bible Quiz - The Superiority of Christ" },
    { title: "James Quiz", description: "Faith and works - Practical Christian living, wisdom, and trials", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-green-500", link: "/public-quiz/james", category: "General Epistles", seoTitle: "James Bible Quiz - Faith and Works" },
    { title: "1 Peter Quiz", description: "Suffering and hope - Living as exiles, standing firm in trials", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-purple-500", link: "/public-quiz/1-peter", category: "General Epistles", seoTitle: "1 Peter Bible Quiz - Suffering and Hope" },
    { title: "2 Peter Quiz", description: "False teachers and the day of the Lord - End times, knowledge, and godliness", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-orange-500", link: "/public-quiz/2-peter", category: "General Epistles", seoTitle: "2 Peter Bible Quiz - False Teachers and End Times" },
    { title: "1 John Quiz", description: "Love and fellowship - Walking in the light, abiding in Christ", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-pink-500", link: "/public-quiz/1-john", category: "General Epistles", seoTitle: "1 John Bible Quiz - Love and Fellowship" },
    { title: "2 John Quiz", description: "Walking in truth and love - Warning against false teachers", difficulty: "Beginner", questions: 10, icon: BookOpen, color: "bg-yellow-500", link: "/public-quiz/2-john", category: "General Epistles", seoTitle: "2 John Bible Quiz - Walking in Truth and Love" },
    { title: "3 John Quiz", description: "Hospitality and support - Encouraging traveling teachers", difficulty: "Beginner", questions: 10, icon: BookOpen, color: "bg-teal-500", link: "/public-quiz/3-john", category: "General Epistles", seoTitle: "3 John Bible Quiz - Hospitality and Support" },
    { title: "Jude Quiz", description: "Contending for the faith - Warning against false teachers and apostasy", difficulty: "Intermediate", questions: 10, icon: BookOpen, color: "bg-indigo-500", link: "/public-quiz/jude", category: "General Epistles", seoTitle: "Jude Bible Quiz - Contending for the Faith" },

    // Apocalyptic (Revelation) - 1 book with 10 questions
    { title: "Revelation Quiz", description: "The end times and final victory - Christ's return, judgment, and new creation", difficulty: "Advanced", questions: 10, icon: Shield, color: "bg-red-500", link: "/public-quiz/revelation", category: "Apocalyptic", seoTitle: "Revelation Bible Quiz - The End Times and Final Victory" }
];

export const categories = [
    { name: "Pentateuch", description: "The first five books", count: 5, icon: BookOpen, color: "bg-blue-100 text-blue-700" },
    { name: "Historical Books", description: "Israel's history", count: 12, icon: BookMarked, color: "bg-green-100 text-green-700" },
    { name: "Wisdom Literature", description: "Poetry and wisdom", count: 5, icon: Lightbulb, color: "bg-yellow-100 text-yellow-700" },
    { name: "Major Prophets", description: "Major prophetic books", count: 5, icon: Target, color: "bg-purple-100 text-purple-700" },
    { name: "Minor Prophets", description: "Minor prophetic books", count: 12, icon: Zap, color: "bg-orange-100 text-orange-700" },
    { name: "Gospels", description: "The life of Jesus", count: 4, icon: Crown, color: "bg-red-100 text-red-700" },
    { name: "Pauline Epistles", description: "Paul's letters", count: 13, icon: Users, color: "bg-indigo-100 text-indigo-700" },
    { name: "General Epistles", description: "Other letters", count: 8, icon: Star, color: "bg-pink-100 text-pink-700" },
    { name: "Apocalyptic", description: "End times and prophecy", count: 1, icon: Shield, color: "bg-red-100 text-red-700" }
];
