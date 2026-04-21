import PublicQuiz from "../PublicQuiz";

const questions = [
  {
    id: 1,
    question: "Who wrote the book of Acts?",
    options: ["Peter", "Paul", "Luke", "John"],
    answer: 2,
    explanation: "Luke is the author of both the Gospel of Luke and the book of Acts."
  },
  {
    id: 2,
    question: "What happened on the Day of Pentecost?",
    options: ["Jesus was crucified", "The Holy Spirit came upon the disciples", "Paul was converted", "The temple was destroyed"],
    answer: 1,
    explanation: "Acts 2:1-4 - When the day of Pentecost came, they were all together in one place. Suddenly a sound like the blowing of a violent wind came from heaven and filled the whole house where they were sitting."
  },
  {
    id: 3,
    question: "How many people were added to the church on the Day of Pentecost?",
    options: ["About 1,000", "About 2,000", "About 3,000", "About 5,000"],
    answer: 2,
    explanation: "Acts 2:41 - Those who accepted his message were baptized, and about three thousand were added to their number that day."
  },
  {
    id: 4,
    question: "What was the name of the first Christian martyr?",
    options: ["Peter", "Paul", "Stephen", "James"],
    answer: 2,
    explanation: "Acts 7:54-60 - Stephen was stoned to death for his faith, making him the first Christian martyr."
  },
  {
    id: 5,
    question: "Who was the first Gentile to be baptized?",
    options: ["Cornelius", "Lydia", "The Ethiopian eunuch", "The Philippian jailer"],
    answer: 0,
    explanation: "Acts 10:44-48 - Cornelius and his household were the first Gentiles to receive the Holy Spirit and be baptized."
  },
  {
    id: 6,
    question: "What was Paul's original name?",
    options: ["Simon", "Saul", "Stephen", "Silas"],
    answer: 1,
    explanation: "Acts 13:9 - Saul, who was also called Paul, was filled with the Holy Spirit."
  },
  {
    id: 7,
    question: "Where was Paul when he was converted?",
    options: ["Jerusalem", "Damascus", "Antioch", "Rome"],
    answer: 1,
    explanation: "Acts 9:3-6 - As he neared Damascus on his journey, suddenly a light from heaven flashed around him. He fell to the ground and heard a voice say to him, 'Saul, Saul, why do you persecute me?'"
  },
  {
    id: 8,
    question: "What was the name of the sorcerer who opposed Paul and Barnabas?",
    options: ["Simon Magus", "Elymas", "Bar-Jesus", "Both B and C"],
    answer: 3,
    explanation: "Acts 13:6-8 - They met a Jewish sorcerer and false prophet named Bar-Jesus, who was an attendant of the proconsul, Sergius Paulus. The proconsul, an intelligent man, sent for Barnabas and Saul because he wanted to hear the word of God. But Elymas the sorcerer (for that is what his name means) opposed them and tried to turn the proconsul from the faith."
  },
  {
    id: 9,
    question: "In which city did Paul and Silas sing hymns in prison?",
    options: ["Jerusalem", "Antioch", "Philippi", "Corinth"],
    answer: 2,
    explanation: "Acts 16:25 - About midnight Paul and Silas were praying and singing hymns to God, and the other prisoners were listening to them."
  },
  {
    id: 10,
    question: "How did Paul travel to Rome?",
    options: ["By land", "By sea", "By air", "He never went to Rome"],
    answer: 1,
    explanation: "Acts 27-28 - Paul traveled to Rome by ship as a prisoner, experiencing a shipwreck on the way."
  }
];

export default function ActsPublicQuiz({ canonicalPath }: { canonicalPath?: string }) {
  return (
    <PublicQuiz 
      title="Acts Quiz - The Birth of the Church"
      questions={questions}
      bookName="Acts"
      canonicalPath={canonicalPath}
    />
  );
}
