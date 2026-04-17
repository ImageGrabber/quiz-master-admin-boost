import PublicQuiz from "../PublicQuiz";
import SEO from "@/components/SEO";

const kidsQuestions = [
    {
        id: "1",
        question: "Who built the big ark to save the animals from the flood?",
        options: [
            "Moses",
            "Noah",
            "David",
            "Abraham"
        ],
        answer: 1
    },
    {
        id: "2",
        question: "Who fought the giant Goliath?",
        options: [
            "Samson",
            "Saul",
            "David",
            "Solomon"
        ],
        answer: 2
    },
    {
        id: "3",
        question: "What is the very first book of the Bible?",
        options: [
            "Exodus",
            "Genesis",
            "Matthew",
            "Psalms"
        ],
        answer: 1
    },
    {
        id: "4",
        question: "Who was swallowed by a giant fish (or whale)?",
        options: [
            "Jonah",
            "Peter",
            "Paul",
            "Daniel"
        ],
        answer: 0
    },
    {
        id: "5",
        question: "Where was Jesus born?",
        options: [
            "Nazareth",
            "Jerusalem",
            "Bethlehem",
            "Egypt"
        ],
        answer: 2
    },
    {
        id: "6",
        question: "Who is the mother of Jesus?",
        options: [
            "Martha",
            "Mary",
            "Eve",
            "Sarah"
        ],
        answer: 1
    },
    {
        id: "7",
        question: "How many disciples did Jesus have?",
        options: [
            "3",
            "10",
            "12",
            "7"
        ],
        answer: 2
    },
    {
        id: "8",
        question: "Who was the strongest man in the Bible?",
        options: [
            "Goliath",
            "Samson",
            "David",
            "Moses"
        ],
        answer: 1
    },
    {
        id: "9",
        question: "How many days did it take God to create the world?",
        options: [
            "6",
            "7",
            "10",
            "3"
        ],
        answer: 0
    },
    {
        id: "10",
        question: "What animal tempted Eve in the Garden of Eden?",
        options: [
            "Lion",
            "Bear",
            "Snake",
            "Wolf"
        ],
        answer: 2
    }
];

export default function BibleTriviaForKids() {
    return (
        <>
            <SEO 
                title="Fun Bible Trivia for Kids under 10 | Free Bible Stories Quiz"
                description="Engaging and fun Bible trivia questions for kids! Test their knowledge of famous Bible stories like Noah's Ark, David and Goliath, and more. Perfect for Sunday school."
                keywords="bible trivia for kids, easy bible quiz for children, sunday school quizzes, fun bible questions, bible stories quiz"
                author="Bible Quiz Competition"
                url="/bible-trivia-for-kids"
            />
            <PublicQuiz
                title="Bible Trivia for Kids under 10"
                questions={kidsQuestions}
                bookName="Bible Stories"
                isKidsStory={true}
            />
        </>
    );
}
