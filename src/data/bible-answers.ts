export interface BibleAnswer {
  id: string;
  question: string;
  category: string;
  answerHtml: string;
  excerpt: string;
  publishDate: string;
  relatedQuestions: string[];
}

export const bibleAnswers: BibleAnswer[] = [
  {
    id: "who-wrote-the-bible",
    question: "Who wrote the Bible?",
    category: "The Bible",
    publishDate: "2024-05-24",
    excerpt: "The Bible was written by approximately 40 different human authors over a period of about 1,500 years, but it was ultimately inspired by the Holy Spirit.",
    answerHtml: `
      <p>The Bible is a unique book because it has both human authors and a divine Author. The Bible was written by approximately 40 different men over a period of about 1,500 years. These authors came from various backgrounds—there were kings, fishermen, prophets, shepherds, a doctor, and a tax collector.</p>
      
      <p>However, while humans held the pen, God is the ultimate author of the Bible. 2 Timothy 3:16 states, <em>"All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness."</em> This means that God the Holy Spirit superintended the human authors so that, using their own personalities and writing styles, they recorded exactly what God wanted written, without error.</p>
      
      <h3>The Process of Inspiration</h3>
      <p>Peter describes this process in 2 Peter 1:21: <em>"For prophecy never had its origin in the human will, but prophets, though human, spoke from God as they were carried along by the Holy Spirit."</em></p>
      
      <p>Because God is the ultimate author of the Bible, it is a unified book. Despite having 40 different writers over 15 centuries, the Bible has one consistent storyline from Genesis to Revelation: the redemption of humanity through Jesus Christ.</p>
    `,
    relatedQuestions: ["is-the-bible-trustworthy", "what-is-the-pentateuch"]
  },
  {
    id: "did-jesus-have-siblings",
    question: "Did Jesus have siblings?",
    category: "Jesus Christ",
    publishDate: "2024-05-24",
    excerpt: "Yes, the Bible explicitly mentions that Jesus had brothers and sisters, who were the children of Mary and Joseph born after Jesus.",
    answerHtml: `
      <p>Yes, the Bible indicates that Jesus had half-brothers and half-sisters. Since Jesus was conceived by the Holy Spirit and born of the virgin Mary, Joseph was His earthly adoptive father, not His biological father. However, after Jesus' birth, Mary and Joseph had other children together.</p>
      
      <h3>Biblical Evidence</h3>
      <p>Matthew 13:55-56 names His brothers: <em>"Isn’t this the carpenter’s son? Isn’t his mother’s name Mary, and aren’t his brothers James, Joseph, Simon and Judas? Aren’t all his sisters with us?"</em></p>
      
      <p>Mark 6:3 also corroborates this list of names and mentions His sisters. Additionally, Paul refers to James as "the Lord's brother" in Galatians 1:19.</p>
      
      <h3>Did His Siblings Believe in Him?</h3>
      <p>During Jesus' earthly ministry, His brothers did not believe in Him (John 7:5). However, after His resurrection, Jesus appeared to James (1 Corinthians 15:7), which profoundly changed him. James went on to become a key leader in the early church in Jerusalem and authored the Book of James. His brother Jude also became a believer and authored the Book of Jude.</p>
    `,
    relatedQuestions: ["was-jesus-married", "how-could-jesus-be-god-and-man"]
  },
  {
    id: "what-is-the-gospel",
    question: "What is the Gospel?",
    category: "Salvation",
    publishDate: "2024-05-24",
    excerpt: "The word 'Gospel' means 'good news.' It is the message that Jesus Christ died for our sins, was buried, and rose again to offer us eternal life.",
    answerHtml: `
      <p>The word "gospel" literally translates to "good news." In Christianity, it refers to the central message of the Bible regarding how humans can be saved from sin and reconciled to God through Jesus Christ.</p>
      
      <h3>The Core Message</h3>
      <p>The Apostle Paul concisely defines the gospel in 1 Corinthians 15:3-4: <em>"For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures."</em></p>
      
      <p>The gospel consists of several key truths:</p>
      <ul>
        <li><strong>God is holy:</strong> God is perfectly good and just, and He cannot tolerate sin.</li>
        <li><strong>Humanity is sinful:</strong> Every human has broken God's law (Romans 3:23), and the penalty for sin is eternal separation from God (Romans 6:23).</li>
        <li><strong>Jesus is the Savior:</strong> Jesus Christ, who is fully God and fully man, lived a sinless life and died on the cross, taking the punishment we deserved upon Himself.</li>
        <li><strong>The Resurrection:</strong> Jesus conquered death by rising from the grave three days later, proving He is God and His sacrifice was accepted.</li>
        <li><strong>Our Response:</strong> Salvation is a free gift received not by our own good works, but by faith. We must repent of our sins and trust entirely in Jesus for our salvation (Ephesians 2:8-9).</li>
      </ul>
      
      <p>The gospel is the most important message in the world because it offers hope, forgiveness, and eternal life to anyone who believes.</p>
    `,
    relatedQuestions: ["how-can-i-be-saved", "what-is-repentance"]
  },
  {
    id: "how-should-i-pray",
    question: "How should I pray? What is the right way to pray?",
    category: "Christian Living",
    publishDate: "2024-05-24",
    excerpt: "Prayer is simply talking to God. Jesus gave us the Lord's Prayer as a model, teaching us to focus on worship, surrender, requests, and forgiveness.",
    answerHtml: `
      <p>Prayer is simply communicating with God. Many people feel intimidated by prayer, thinking they need to use special, religious-sounding words. However, God desires honest, heartfelt conversation from His children.</p>
      
      <h3>The Lord's Prayer as a Model</h3>
      <p>When Jesus' disciples asked Him how to pray, He gave them what is commonly known as "The Lord's Prayer" (Matthew 6:9-13). This prayer is not necessarily meant to be repeated word-for-word as a magic formula, but rather it serves as a powerful outline for our own prayers.</p>
      
      <p>Based on this model, a healthy prayer life often includes:</p>
      <ul>
        <li><strong>Adoration:</strong> Praising God for who He is ("Our Father in heaven, hallowed be your name").</li>
        <li><strong>Surrender:</strong> Submitting to God's will ("Your kingdom come, your will be done").</li>
        <li><strong>Supplication:</strong> Asking God to meet our daily needs ("Give us today our daily bread").</li>
        <li><strong>Confession:</strong> Asking for forgiveness and forgiving others ("And forgive us our debts, as we also have forgiven our debtors").</li>
        <li><strong>Protection:</strong> Seeking help against temptation and evil ("And lead us not into temptation, but deliver us from the evil one").</li>
      </ul>
      
      <h3>Other Tips for Prayer</h3>
      <p>We are told to "pray without ceasing" (1 Thessalonians 5:17), which means maintaining an attitude of prayer throughout the day. You can pray out loud, silently, on your knees, or while driving your car. The most important aspect of prayer is that it comes from a sincere heart seeking God.</p>
    `,
    relatedQuestions: ["does-god-answer-every-prayer", "why-should-we-pray-if-god-knows-everything"]
  },
  {
    id: "what-is-the-trinity",
    question: "What is the Trinity?",
    category: "God & Jesus",
    publishDate: "2024-05-24",
    excerpt: "The Trinity is the Christian doctrine that God is one in essence but exists eternally in three distinct persons: the Father, the Son, and the Holy Spirit.",
    answerHtml: `
      <p>The concept of the Trinity is one of the most profound and complex doctrines in Christianity. The word "Trinity" itself is not found in the Bible, but the concept is woven throughout both the Old and New Testaments.</p>
      
      <h3>The Definition</h3>
      <p>The doctrine of the Trinity states that there is only one true God, but this one God eternally exists as three distinct persons: the Father, the Son (Jesus Christ), and the Holy Spirit. These three are co-equal and co-eternal, meaning none was created by the others, and none is "more God" than the others. They are distinct in their roles but undivided in their essence.</p>
      
      <h3>Biblical Evidence</h3>
      <ul>
        <li><strong>There is One God:</strong> Deuteronomy 6:4 states, "Hear, O Israel: The Lord our God, the Lord is one."</li>
        <li><strong>The Father is God:</strong> 1 Corinthians 8:6 says, "yet for us there is but one God, the Father, from whom all things came and for whom we live..."</li>
        <li><strong>The Son is God:</strong> John 1:1, 14 declares, "In the beginning was the Word, and the Word was with God, and the Word was God... The Word became flesh and made his dwelling among us."</li>
        <li><strong>The Holy Spirit is God:</strong> In Acts 5:3-4, Peter tells Ananias that lying to the Holy Spirit is the same as lying to God.</li>
      </ul>
      
      <p>We see all three members of the Trinity working together at Jesus' baptism (Matthew 3:16-17)—the Son is baptized, the Spirit descends like a dove, and the Father speaks from heaven.</p>
      
      <p>While the Trinity is a mystery that our human minds cannot fully comprehend, it is essential for understanding how God can be perfectly loving in Himself from all eternity, and how our salvation was accomplished by the Father sending the Son, who offered Himself through the Spirit.</p>
    `,
    relatedQuestions: ["is-jesus-god", "who-is-the-holy-spirit"]
  }
];

// Helper functions to get unique categories
export const getAnswerCategories = () => {
  const categories = new Set(bibleAnswers.map(a => a.category));
  return ["All", ...Array.from(categories)].sort();
};
