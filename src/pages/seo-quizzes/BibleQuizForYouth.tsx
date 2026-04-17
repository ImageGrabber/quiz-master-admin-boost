import React from 'react';
import PublicQuiz from '../PublicQuiz';
import SEO from '@/components/SEO';

const youthQuestions = [
    {
        id: 1,
        question: "Who was the young shepherd boy who defeated a giant?",
        options: ["Daniel", "David", "Joseph", "Samuel"],
        answer: 1,
        explanation: "David, a young shepherd, defeated the giant Goliath with a sling and a stone (1 Samuel 17)."
    },
    {
        id: 2,
        question: "Which young man was sold into slavery by his brothers but later became a ruler in Egypt?",
        options: ["Moses", "Jacob", "Joseph", "Benjamin"],
        answer: 2,
        explanation: "Joseph's brothers sold him into slavery out of jealousy, but God used him to save many lives in Egypt (Genesis 37)."
    },
    {
        id: 3,
        question: "Who was the strongest man in the Bible, known for his long hair?",
        options: ["Samson", "Goliath", "Absalom", "Solomon"],
        answer: 0,
        explanation: "Samson had supernatural strength given by God, but his strength left him when his hair was cut (Judges 16)."
    },
    {
        id: 4,
        question: "What teenage girl became Queen of Persia and saved her people?",
        options: ["Ruth", "Naomi", "Esther", "Mary"],
        answer: 2,
        explanation: "Esther was chosen as queen and courageously approached the king to save the Jewish people (Esther 4-5)."
    },
    {
        id: 5,
        question: "Who was the young prophet called by God while he was sleeping in the temple?",
        options: ["Samuel", "Jeremiah", "Isaiah", "Elijah"],
        answer: 0,
        explanation: "The LORD called Samuel three times while he was sleeping in the temple, and Eli taught him how to respond (1 Samuel 3)."
    },
    {
        id: 6,
        question: "Who refused to eat the king's rich food and vegetables instead?",
        options: ["Shadrach", "Daniel", "Meshach", "Abednego"],
        answer: 1,
        explanation: "Daniel resolved not to defile himself with the royal food and wine, choosing vegetables and water instead (Daniel 1:8)."
    },
    {
        id: 7,
        question: "How many disciples did Jesus choose to be his closest followers?",
        options: ["7", "10", "12", "40"],
        answer: 2,
        explanation: "Jesus called 12 disciples to follow him and later sent them out as apostles (Matthew 10:1)."
    },
    {
        id: 8,
        question: "What gift did the father give to the Prodigal Son when he returned home?",
        options: ["A gold coin", "A robe, ring, and sandals", "A new house", "A flock of sheep"],
        answer: 1,
        explanation: "The father said, 'Bring the best robe... put a ring on his finger and sandals on his feet' (Luke 15:22)."
    },
    {
        id: 9,
        question: "Who actually climbed a tree to see Jesus because he was too short?",
        options: ["Peter", "Zacchaeus", "Matthew", "John"],
        answer: 1,
        explanation: "Zacchaeus, a tax collector, climbed a sycamore-fig tree to see Jesus passing by (Luke 19:4)."
    },
    {
        id: 10,
        question: "What is the 'Golden Rule' taught by Jesus?",
        options: ["Love money", "Do unto others as you would have them do unto you", "An eye for an eye", "Survival of the fittest"],
        answer: 1,
        explanation: "Jesus taught, 'So in everything, do to others what you would have them do to you' (Matthew 7:12)."
    }
];

export default function BibleQuizForYouth() {
    return (
        <>
            <SEO 
                title="Bible Quiz for Youth with Answers | Fun & Educational Teen Trivia"
                description="Engaging Bible quiz questions for youth and teenagers. Test your knowledge of Bible stories, heroes, and teachings in a fun, interactive format."
                keywords="bible quiz for youth, youth bible trivia, bible questions for teens, sunday school quiz, christian youth group activities"
                author="Bible Quiz Competition"
                url="/bible-quiz-with-answers-for-youth"
            />
            <PublicQuiz
                title="Bible Quiz for Youth"
                questions={youthQuestions}
                bookName="Youth Bible Challenge"
                isKidsStory={true}
            />
        </>
    );
}
