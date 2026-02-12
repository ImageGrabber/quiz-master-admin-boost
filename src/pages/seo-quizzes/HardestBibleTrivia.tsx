import React from 'react';
import PublicQuiz from '../PublicQuiz';
import { Helmet } from 'react-helmet-async';

const hardestQuestions = [
    {
        id: 1,
        question: "What was the name of the man who fell out of a window while Paul was preaching?",
        options: ["Eutychus", "Tychicus", "Philemon", "Onesimus"],
        answer: 0,
        explanation: "Eutychus fell from a third-story window in Troas while Paul preached late into the night (Acts 20:9)."
    },
    {
        id: 2,
        question: "Who is the only woman mentioned in Paul's greetings in Romans 16 as a 'deacon' (or servant) of the church in Cenchreae?",
        options: ["Priscilla", "Phoebe", "Junia", "Lydia"],
        answer: 1,
        explanation: "Paul commends Phoebe to the Romans, calling her a servant (diakonos) of the church at Cenchreae (Romans 16:1)."
    },
    {
        id: 3,
        question: "In the book of Judges, who killed 600 Philistines with an oxgoad?",
        options: ["Samson", "Shamgar", "Gideon", "Jephthah"],
        answer: 1,
        explanation: "Shamgar son of Anath struck down six hundred Philistines with an oxgoad and saved Israel (Judges 3:31)."
    },
    {
        id: 4,
        question: "What is the longest name in the Bible?",
        options: ["Mahershalalhashbaz", "Nebuchadnezzar", "Zaphenathpaneah", "Hazzbebuni"],
        answer: 0,
        explanation: "Mahershalalhashbaz is the symbolic name given to Isaiah's son (Isaiah 8:3)."
    },
    {
        id: 5,
        question: "Who was the father of the apostles James and John?",
        options: ["Alphaeus", "Zebedee", "Jonas", "Cleopas"],
        answer: 1,
        explanation: "James and John were the sons of Zebedee (Matthew 4:21)."
    },
    {
        id: 6,
        question: "Which king of Judah was stricken with leprosy for trying to burn incense in the temple?",
        options: ["Uzziah", "Hezekiah", "Josiah", "Manasseh"],
        answer: 0,
        explanation: "King Uzziah became leprous after entering the temple to burn incense, a duty reserved for priests (2 Chronicles 26:19)."
    },
    {
        id: 7,
        question: "How many years did the cripple at the pool of Bethesda wait for healing?",
        options: ["12 years", "38 years", "40 years", "18 years"],
        answer: 1,
        explanation: "The man had been an invalid for 38 years before Jesus healed him (John 5:5)."
    },
    {
        id: 8,
        question: "Who was the high priest who ordered Paul to be struck on the mouth?",
        options: ["Caiaphas", "Annas", "Ananias", "Alexander"],
        answer: 2,
        explanation: "The high priest Ananias ordered those standing near Paul to strike him on the mouth (Acts 23:2)."
    },
    {
        id: 9,
        question: "What was the name of the place where Jacob wrestled with God?",
        options: ["Bethel", "Peniel", "Shechem", "Mahanaim"],
        answer: 1,
        explanation: "Jacob called the place Peniel, saying, 'It is because I saw God face to face, and yet my life was spared' (Genesis 32:30)."
    },
    {
        id: 10,
        question: "Who was the only person in the Bible to be buried by God Himself?",
        options: ["Enoch", "Elijah", "Moses", "Abraham"],
        answer: 2,
        explanation: "The Lord buried Moses in Moab, opposite Beth Peor, but to this day no one knows where his grave is (Deuteronomy 34:6)."
    }
];

export default function HardestBibleTrivia() {
    return (
        <>
            <Helmet>
                <title>Hardest Bible Trivia Questions and Answers | Expert Level Quiz</title>
                <meta name="description" content="Challenge yourself with the hardest Bible trivia questions. Explore obscure facts, deep theology, and difficult details from the Old and New Testaments." />
                <meta name="keywords" content="hardest bible trivia, difficult bible questions, advanced bible quiz, expert bible knowledge" />
                <link rel="canonical" href="https://biblequizcompetition.com/hardest-bible-trivia-questions" />
            </Helmet>
            <PublicQuiz
                title="Hardest Bible Trivia Questions"
                questions={hardestQuestions}
                bookName="Advanced Biblical Knowledge"
            />
        </>
    );
}
