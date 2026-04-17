import PublicQuiz from "../PublicQuiz";
import SEO from "@/components/SEO";

const hardQuestions = [
    {
        id: "1",
        question: "Who was the first Christian martyr described in the Book of Acts?",
        options: [
            "Peter",
            "Stephen",
            "James",
            "Paul"
        ],
        answer: 1
    },
    {
        id: "2",
        question: "Which judge of Israel was left-handed and killed King Eglon?",
        options: [
            "Gideon",
            "Samson",
            "Ehud",
            "Jephthah"
        ],
        answer: 2
    },
    {
        id: "3",
        question: "In the Book of Revelation, which church was neither hot nor cold?",
        options: [
            "Ephesus",
            "Laodicea",
            "Smyrna",
            "Philadelphia"
        ],
        answer: 1
    },
    {
        id: "4",
        question: "Who was the High Priest during the trial of Jesus?",
        options: [
            "Annas",
            "Caiaphas",
            "Gamaliel",
            "Nicodemus"
        ],
        answer: 1
    },
    {
        id: "5",
        question: "Which two Old Testament figures appeared with Jesus at the Transfiguration?",
        options: [
            "Abraham and Isaac",
            "Moses and Elijah",
            "David and Solomon",
            "Enoch and Elijah"
        ],
        answer: 1
    },
    {
        id: "6",
        question: "Where were the disciples first called 'Christians'?",
        options: [
            "Jerusalem",
            "Antioch",
            "Rome",
            "Ephesus"
        ],
        answer: 1
    },
    {
        id: "7",
        question: "Who hid the spies in Jericho?",
        options: [
            "Rahab",
            "Ruth",
            "Deborah",
            "Esther"
        ],
        answer: 0
    },
    {
        id: "8",
        question: "What was the name of the copper snake that Moses made, which King Hezekiah later destroyed?",
        options: [
            "Leviathan",
            "Nehushtan",
            "Behemoth",
            "Azazel"
        ],
        answer: 1
    },
    {
        id: "9",
        question: "Who warned Paul about a plot to kill him in Jerusalem?",
        options: [
            "His sister's son",
            "Oue of the guards",
            "Luke",
            "Barnabas"
        ],
        answer: 0
    },
    {
        id: "10",
        question: "In which book of the Bible is the story of the Tower of Babel found?",
        options: [
            "Deuteronomy",
            "Exodus",
            "Numbers",
            "Genesis"
        ],
        answer: 3
    }
];

export default function HardBibleQuizForTeens() {
    return (
        <>
            <SEO 
                title="Hard Bible Quiz for Teens | Advanced Youth Scripture Challenge"
                description="Take the hard Bible quiz for teens! Challenge your knowledge with difficult questions about biblical history, prophecy, and the life of Jesus."
                keywords="hard bible quiz for teens, difficult bible questions for youth, advanced teen bible trivia, scripture challenge for teenagers"
                author="Bible Quiz Competition"
                url="/hard-bible-quiz-for-teens"
            />
            <PublicQuiz
                title="Hard Bible Quiz for Teens"
                questions={hardQuestions}
                bookName="General Bible Knowledge"
                isKidsStory={true}
            />
        </>
    );
}
