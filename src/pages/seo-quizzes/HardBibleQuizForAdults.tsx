import PublicQuiz from "../PublicQuiz";

const adultQuestions = [
    {
        id: "1",
        question: "Who was the father of Maher-Shalal-Hash-Baz?",
        options: ["Jeremiah", "Isaiah", "Ezekiel", "Hosea"],
        answer: 1,
        explanation: "Isaiah 8:3 - The prophet Isaiah had a son named Maher-Shalal-Hash-Baz, whose name means 'quick to the plunder, swift to the spoil.'"
    },
    {
        id: "2",
        question: "Which king of Israel built the city of Samaria?",
        options: ["Ahab", "Jeroboam", "Omri", "Jehu"],
        answer: 2,
        explanation: "1 Kings 16:24 - Omri bought the hill of Samaria from Shemer for two talents of silver and built a city on the hill."
    },
    {
        id: "3",
        question: "Who is the only person in the Bible described as naturally bald?",
        options: ["Elisha", "Paul", "Peter", "Samson"],
        answer: 0,
        explanation: "2 Kings 2:23 - Elisha was mocked by youths who called him 'baldy'."
    },
    {
        id: "4",
        question: "What was the name of Moses' Midianite father-in-law?",
        options: ["Jethro (Reuel)", "Laban", "Potiphera", "Melchizedek"],
        answer: 0,
        explanation: "Exodus 2:18 and 3:1 - Moses' father-in-law is called Reuel and also Jethro, the priest of Midian."
    },
    {
        id: "5",
        question: "In the book of Revelation, what is the weight of the hailstones that fall from the sky during the seventh bowl judgment?",
        options: ["About 50 pounds", "About 100 pounds", "About 200 pounds", "About 500 pounds"],
        answer: 1,
        explanation: "Revelation 16:21 - 'From the sky huge hailstones, each weighing about a hundred pounds, fell on people.'"
    },
    {
        id: "6",
        question: "Who was the left-handed judge of Israel who assassinated the obese King Eglon?",
        options: ["Othniel", "Ehud", "Shamgar", "Gideon"],
        answer: 1,
        explanation: "Judges 3:15-22 - Ehud, a left-handed man, used a double-edged sword to kill Eglon."
    },
    {
        id: "7",
        question: "Who was the High Priest when the Ark of the Covenant was captured by the Philistines?",
        options: ["Eli", "Samuel", "Phinehas", "Abiathar"],
        answer: 0,
        explanation: "1 Samuel 4:18 - Eli fell backward off his chair and died when he heard the news that the Ark had been captured."
    },
    {
        id: "8",
        question: "Which prophet predicted the exact duration (70 years) of the Babylonian exile?",
        options: ["Isaiah", "Ezekiel", "Daniel", "Jeremiah"],
        answer: 3,
        explanation: "Jeremiah 25:11 - 'This whole country will become a desolate wasteland, and these nations will serve the king of Babylon seventy years.'"
    },
    {
        id: "9",
        question: "During Paul's shipwreck journey to Rome, what was the name of the wind of hurricane force that caught the ship?",
        options: ["Sirocco", "Euroquilo (Northeaster)", "Zephyrus", "Levanter"],
        answer: 1,
        explanation: "Acts 27:14 - A wind of hurricane force, called the 'Northeaster' (Euroquilo in some translations), swept down."
    },
    {
        id: "10",
        question: "Who killed the giant Lahmi, the brother of Goliath?",
        options: ["David", "Jonathan", "Elhanan", "Abishai"],
        answer: 2,
        explanation: "1 Chronicles 20:5 - Elhanan son of Jair killed Lahmi the brother of Goliath."
    }
];

export default function HardBibleQuizForAdults() {
    return (
        <PublicQuiz
            title="Hard Bible Quiz for Adults"
            questions={adultQuestions}
            bookName="Advanced Bible Trivia"
            seoDescription="Looking for a real challenge? Try this extremely hard Bible quiz designed specifically for adults, covering advanced biblical trivia, prophecy, and deep theology."
        />
    );
}
