import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  Tag,
  BookOpen,
  Trophy,
  Share2,
  Heart
} from "lucide-react";
import Header from "@/components/Header";

// Sample article data - in a real app, this would come from an API
const articlesData = {
  "complete-quiz-guide": {
    id: "complete-quiz-guide",
    title: "The Complete Guide to Bible Quiz Competition: How to Master Every Quiz",
    excerpt: "Learn everything you need to know about using our Bible quiz platform effectively. From registration to advanced strategies, this comprehensive guide will help you excel.",
    content: `
      <h1>Getting Started with Bible Quiz Competition</h1>
      <p>Welcome to the most comprehensive Bible quiz platform available! Whether you're a beginner or an experienced Bible scholar, this guide will help you make the most of your quiz experience. Our platform combines cutting-edge technology with timeless biblical knowledge to create an engaging learning environment.</p>
      
      <h1>Creating Your Account</h1>
      <p>The first step to mastering our platform is creating your account. Simply click "Sign Up" in the top navigation and provide your basic information. The registration process is quick and secure, taking less than two minutes to complete.</p>
      
      <h2><strong>Account Benefits</strong></h2>
      <p>Once registered, you'll have access to:</p>
      <ul>
        <li>Personalized quiz recommendations based on your interests</li>
        <li>Progress tracking and detailed analytics</li>
        <li>Leaderboard participation and competition entry</li>
        <li>Study guides and educational resources</li>
        <li>Community features and discussion forums</li>
      </ul>
      
      <h1>Understanding Quiz Types</h1>
      <p>Our platform offers several types of quizzes designed to meet different learning objectives and skill levels. Each quiz type serves a specific purpose in your biblical education journey.</p>
      
      <h2><strong>Public Quizzes</strong></h2>
      <p>These free quizzes cover all 66 books of the Bible and are perfect for beginners. They include detailed explanations for each answer, helping you learn as you go. Start with our <a href="/public-quiz/genesis">Genesis Quiz</a> to test your knowledge of the first book of the Bible.</p>
      
      <h2><strong>Competition Quizzes</strong></h2>
      <p>Timed competitions with prizes and leaderboard rankings. These quizzes are designed for more experienced users who want to challenge themselves and compete with others. Check out our <a href="/public-leaderboard">leaderboard</a> to see current top performers.</p>
      
      <h2><strong>Study Quizzes</strong></h2>
      <p>Educational quizzes with detailed explanations and study materials. These are perfect for deep learning and understanding biblical concepts in context.</p>
      
      <h2><strong>Character Quizzes</strong></h2>
      <p>Focus on specific biblical figures like David, Moses, or Esther. These quizzes help you understand the lives and lessons of key biblical characters.</p>
      
      <h1>Understanding the Scoring System</h1>
      <p>Our scoring system is designed to reward both knowledge and efficiency. Understanding how points are calculated will help you maximize your scores and climb the leaderboards.</p>
      
      <h2><strong>Point Calculation</strong></h2>
      <ul>
        <li><strong>Base Points:</strong> Correct answers earn points based on difficulty level</li>
        <li><strong>Time Bonuses:</strong> Quick answers receive additional points</li>
        <li><strong>Streak Bonuses:</strong> Consecutive correct answers multiply your score</li>
        <li><strong>Perfect Score Bonus:</strong> 100% accuracy earns extra points</li>
      </ul>
      
      <h1>Advanced Strategies for Success</h1>
      <p>To consistently achieve high scores and improve your biblical knowledge, follow these proven strategies used by top performers.</p>
      
      <h2><strong>1. Question Analysis</strong></h2>
      <p>Read questions carefully and completely before looking at answer choices. Look for keywords and context clues that can help you eliminate incorrect options.</p>
      
      <h2><strong>2. Process of Elimination</strong></h2>
      <p>Use the process of elimination for multiple choice questions. Even if you don't know the exact answer, you can often eliminate obviously wrong options.</p>
      
      <h2><strong>3. Time Management</strong></h2>
      <p>Don't spend too long on difficult questions. Trust your first instinct and move on. You can always return to challenging questions if time permits.</p>
      
      <h2><strong>4. Review and Double-Check</strong></h2>
      <p>Always review your answers before submitting. Look for any obvious mistakes or questions you might have missed.</p>
      
      <h1>Study Resources and Preparation</h1>
      <p>Success on our platform comes from both quiz-taking skills and solid biblical knowledge. Here are some resources to help you prepare:</p>
      
      <h2><strong>Recommended Study Materials</strong></h2>
      <ul>
        <li>Read our <a href="/articles/quiz-strategies">5 Proven Strategies</a> article for advanced techniques</li>
        <li>Explore our <a href="/articles/david-king-israel">Bible character studies</a> for deeper understanding</li>
        <li>Use our study guides for each biblical book</li>
        <li>Join our community discussions for peer learning</li>
      </ul>
      
      <h1>Conclusion</h1>
      <p>Our platform is designed to help you grow in your biblical knowledge while having fun. Regular practice, combined with our study resources and community features, will help you become a Bible quiz champion. Remember, the goal isn't just high scores—it's deepening your understanding of God's Word and connecting with a community of learners.</p>
      
      <p>Ready to get started? <a href="/public-quiz/genesis">Take your first quiz</a> or <a href="/articles">explore our study articles</a> to begin your journey toward biblical mastery!</p>
    `,
    author: "Quiz Master Team",
    publishDate: "2024-12-20",
    readTime: "12 min read",
    category: "Quiz Guide",
    tags: ["Quiz Guide", "Tutorial", "Getting Started", "Platform"],
    featured: true
  },
  "quiz-strategies": {
    id: "quiz-strategies",
    title: "5 Proven Strategies to Improve Your Bible Quiz Scores",
    excerpt: "Discover expert techniques used by top performers to consistently achieve high scores in Bible quizzes. Learn time management, study methods, and test-taking strategies.",
    content: `
      <h2>Mastering Bible Quiz Performance</h2>
      <p>Scoring high on Bible quizzes isn't just about knowing the content—it's about applying the right strategies. After analyzing thousands of quiz attempts and interviewing top performers, we've identified five proven techniques that consistently lead to success.</p>
      
      <h2>1. The 3-Second Rule</h2>
      <p>One of the most effective strategies is the 3-second rule. Give yourself exactly 3 seconds to answer each question. If you don't know it immediately, make your best guess and move on.</p>
      
      <h3>Why This Works</h3>
      <p>This prevents you from getting stuck on difficult questions and ensures you complete the quiz. Most quiz questions are designed to be answerable within 3 seconds if you know the material. Spending more time usually doesn't improve your chances of getting it right.</p>
      
      <h3>Implementation Tips</h3>
      <ul>
        <li>Trust your first instinct - it's usually correct</li>
        <li>Don't second-guess yourself unless you're absolutely certain</li>
        <li>Use the remaining time to review your answers</li>
      </ul>
      
      <h2>2. Context Clue Strategy</h2>
      <p>Even if you don't know the exact answer, look for context clues in the question. Biblical stories often have distinctive elements that can help you eliminate wrong answers.</p>
      
      <h3>Common Context Clues</h3>
      <ul>
        <li>Geographic locations (Bethlehem, Jerusalem, Egypt)</li>
        <li>Character relationships (father-son, husband-wife, teacher-student)</li>
        <li>Time periods (before/after certain events)</li>
        <li>Specific numbers or quantities</li>
      </ul>
      
      <h3>Practice Exercise</h3>
      <p>Try identifying context clues in our <a href="/public-quiz/genesis">Genesis Quiz</a>. Look for location names, character relationships, and sequence of events to help narrow down your choices.</p>
      
      <h2>3. Systematic Study Approach</h2>
      <p>Don't try to memorize everything at once. Focus on one book or topic per week, using our study guides and taking practice quizzes regularly.</p>
      
      <h3>Weekly Study Plan</h3>
      <ul>
        <li><strong>Monday:</strong> Read the biblical book or study topic</li>
        <li><strong>Tuesday-Thursday:</strong> Take practice quizzes and review mistakes</li>
        <li><strong>Friday:</strong> Take the official quiz for that topic</li>
        <li><strong>Weekend:</strong> Review and prepare for next week's topic</li>
      </ul>
      
      <h3>Recommended Starting Points</h3>
      <p>Begin with foundational books like <a href="/public-quiz/genesis">Genesis</a>, <a href="/public-quiz/exodus">Exodus</a>, and the Gospels. These provide essential context for understanding the rest of the Bible.</p>
      
      <h2>4. Pattern Recognition</h2>
      <p>Many Bible quiz questions follow similar patterns. Learn to recognize common question types and their typical answer structures.</p>
      
      <h3>Common Question Patterns</h3>
      <ul>
        <li><strong>"Who said...":</strong> Usually asks about direct quotes from biblical characters</li>
        <li><strong>"What happened when...":</strong> Focuses on specific events or miracles</li>
        <li><strong>"How many...":</strong> Tests knowledge of specific numbers or quantities</li>
        <li><strong>"Where did...":</strong> Geographic knowledge questions</li>
      </ul>
      
      <h3>Pattern Practice</h3>
      <p>Take multiple quizzes and note the patterns. Our <a href="/public-leaderboard">leaderboard</a> shows which users have mastered these patterns effectively.</p>
      
      <h2>5. Mental Preparation</h2>
      <p>Before starting any quiz, take a moment to clear your mind, review key facts, and set a positive intention. Mental preparation is just as important as factual knowledge.</p>
      
      <h3>Pre-Quiz Routine</h3>
      <ul>
        <li>Take 3 deep breaths to calm your mind</li>
        <li>Review 2-3 key facts about the topic</li>
        <li>Set a positive intention (e.g., "I will do my best")</li>
        <li>Eliminate distractions from your environment</li>
      </ul>
      
      <h3>During the Quiz</h3>
      <p>Stay focused and confident. If you encounter a difficult question, don't panic. Use the context clue strategy and move on. Remember, you can always learn from your mistakes.</p>
      
      <h2>Advanced Techniques</h2>
      <p>Once you've mastered the basic strategies, try these advanced techniques used by top performers.</p>
      
      <h3>Cross-Reference Strategy</h3>
      <p>Use knowledge from one biblical book to answer questions about another. For example, understanding the Exodus story helps with questions about the Promised Land in Joshua.</p>
      
      <h3>Elimination Mastery</h3>
      <p>Learn to quickly eliminate obviously wrong answers. This is especially useful for questions about specific details or numbers.</p>
      
      <h2>Conclusion</h2>
      <p>Mastering Bible quiz performance requires both knowledge and strategy. By implementing these five proven techniques, you'll see significant improvement in your scores and overall biblical understanding.</p>
      
      <p>Remember, the goal isn't just high scores—it's deepening your knowledge of God's Word. Use these strategies as tools to enhance your learning journey.</p>
      
      <p>Ready to put these strategies into practice? Start with our <a href="/public-quiz/genesis">Genesis Quiz</a> or explore our <a href="/articles">complete guide to Bible quiz competition</a> for more comprehensive strategies.</p>
    `,
    author: "Dr. Sarah Johnson",
    publishDate: "2024-12-18",
    readTime: "8 min read",
    category: "Quiz Strategy",
    tags: ["Strategy", "Scoring", "Performance", "Tips"],
    featured: true
  },
  "david-king-israel": {
    id: "david-king-israel",
    title: "King David: The Shepherd Who Became Israel's Greatest King",
    excerpt: "Explore the life of David, from shepherd boy to king of Israel. Discover his victories, struggles, and the lessons we can learn from his relationship with God.",
    content: `
      <h1>Introduction: The Shepherd Who Became King</h1>
      <p>David's story is one of the most compelling narratives in the Bible, showcasing how God can use anyone—even a young shepherd boy—to accomplish His purposes. From the fields of Bethlehem to the throne of Israel, David's journey teaches us about faith, leadership, and the heart of God.</p>
      
      <h1>The Early Years: From Shepherd to Anointed</h1>
      <p>David's story begins in Bethlehem, where he was the youngest of Jesse's eight sons. As a shepherd boy, he learned to trust God while protecting his flock from lions and bears. This early faith would sustain him throughout his remarkable life and prepare him for the challenges ahead.</p>
      
      <h2><strong>The Anointing by Samuel</strong></h2>
      <p>When the prophet Samuel came to Bethlehem looking for a new king, God directed him to David. Despite his youth and humble appearance, David was chosen because God looks at the heart, not outward appearance. This anointing marked the beginning of David's journey toward kingship.</p>
      
      <h2><strong>Lessons from the Pasture</strong></h2>
      <p>David's time as a shepherd taught him valuable lessons that would serve him well as king:</p>
      <ul>
        <li><strong>Courage:</strong> Facing lions and bears prepared him for Goliath</li>
        <li><strong>Faithfulness:</strong> Caring for his father's sheep taught him responsibility</li>
        <li><strong>Trust in God:</strong> Daily dependence on God's protection</li>
        <li><strong>Leadership:</strong> Guiding and protecting the flock</li>
      </ul>
      
      <h1>The Giant Slayer: David and Goliath</h1>
      <p>David's first great victory came against the Philistine giant Goliath. Armed only with a sling and five smooth stones, David defeated the champion who had terrified the entire Israelite army. His victory demonstrated that with God, nothing is impossible.</p>
      
      <h2><strong>The Battle Preparation</strong></h2>
      <p>Before facing Goliath, David refused Saul's armor, choosing instead to rely on his faith and his proven weapons. This decision shows his confidence in God's protection and his understanding that victory comes from the Lord, not from human strength or equipment.</p>
      
      <h2><strong>The Victory Speech</strong></h2>
      <p>David's words to Goliath reveal his heart: "You come against me with sword and spear and javelin, but I come against you in the name of the Lord Almighty." This declaration of faith became a defining moment in Israel's history.</p>
      
      <h1>Friendship and Loyalty: David and Jonathan</h1>
      <p>One of the most beautiful friendships in the Bible was between David and Jonathan, Saul's son. Their covenant of friendship, despite Saul's jealousy, shows the power of true friendship and loyalty.</p>
      
      <h2><strong>The Covenant of Friendship</strong></h2>
      <p>Jonathan and David made a covenant that extended beyond their lifetimes, promising to care for each other's families. This selfless love demonstrates the kind of loyalty that should characterize all our relationships.</p>
      
      <h2><strong>Lessons in Loyalty</strong></h2>
      <p>Their friendship teaches us about:</p>
      <ul>
        <li>Loyalty that transcends difficult circumstances</li>
        <li>Selfless love that puts others first</li>
        <li>Faithfulness that endures through trials</li>
        <li>The power of godly friendship</li>
      </ul>
      
      <h1>David as King: Establishing the Kingdom</h1>
      <p>After Saul's death, David became king of Judah and later of all Israel. His reign was marked by military victories, the establishment of Jerusalem as the capital, and his desire to build a temple for God.</p>
      
      <h2><strong>Military Victories</strong></h2>
      <p>David's military prowess was legendary, but he always attributed his victories to God. His conquests expanded Israel's territory and established peace throughout the region.</p>
      
      <h2><strong>Jerusalem: The City of David</strong></h2>
      <p>David's choice of Jerusalem as the capital was strategic and symbolic. It became the center of worship and the future site of the temple, establishing the city's importance in biblical history.</p>
      
      <h2><strong>The Temple Vision</strong></h2>
      <p>Though David was not allowed to build the temple himself, he prepared extensively for its construction, gathering materials and making plans. His heart for God's house demonstrates his deep spiritual commitment.</p>
      
      <h1>David's Struggles and Repentance</h1>
      <p>David's life wasn't without sin and failure. His affair with Bathsheba and the murder of Uriah represent some of the darkest moments in his story. However, his response to Nathan's confrontation shows the heart of a true man of God.</p>
      
      <h2><strong>The Path to Repentance</strong></h2>
      <p>When confronted with his sin, David didn't make excuses or blame others. Instead, he acknowledged his wrongdoing and sought God's forgiveness. His prayer in Psalm 51 reveals a heart broken by sin and desperate for restoration.</p>
      
      <h2><strong>Consequences and Grace</strong></h2>
      <p>While God forgave David, the consequences of his sin affected his family and kingdom. This teaches us that forgiveness doesn't eliminate consequences, but it does restore our relationship with God.</p>
      
      <h1>David's Legacy: A Man After God's Own Heart</h1>
      <p>Despite his failures, David is remembered as "a man after God's own heart." This description reveals what God values most: a heart that seeks Him, repents when wrong, and loves Him above all else.</p>
      
      <h2><strong>Spiritual Leadership</strong></h2>
      <p>David's leadership was characterized by his relationship with God. His psalms reveal a heart that was honest, worshipful, and dependent on God. This spiritual depth made him an effective leader.</p>
      
      <h2><strong>Preparation for the Messiah</strong></h2>
      <p>David's lineage became the royal line through which the Messiah would come. Jesus is often called "Son of David," connecting His ministry to David's legacy and fulfilling God's promises to David's descendants.</p>
      
      <h1>Lessons from David's Life</h1>
      <p>David's life teaches us valuable lessons about faith, leadership, and relationship with God:</p>
      
      <h2><strong>Spiritual Lessons</strong></h2>
      <ul>
        <li><strong>Heart over Appearance:</strong> God values character over external qualities</li>
        <li><strong>Faith in Action:</strong> Trusting God in impossible situations</li>
        <li><strong>Repentance and Restoration:</strong> The power of genuine repentance</li>
        <li><strong>Worship and Praise:</strong> Maintaining a heart of worship</li>
      </ul>
      
      <h2><strong>Leadership Principles</strong></h2>
      <ul>
        <li><strong>Servant Leadership:</strong> Leading by serving others</li>
        <li><strong>Dependence on God:</strong> Seeking God's guidance in decisions</li>
        <li><strong>Honest Communication:</strong> Being transparent about struggles</li>
        <li><strong>Legacy Building:</strong> Preparing for future generations</li>
      </ul>
      
      <h1>David's Psalms: A Window into His Heart</h1>
      <p>Many of the psalms attributed to David reveal the depth of his relationship with God. These prayers and songs show us how to worship, how to pray in difficult times, and how to maintain faith through trials.</p>
      
      <h2><strong>Worship and Praise</strong></h2>
      <p>David's psalms of praise teach us how to worship God with our whole heart. His expressions of joy and gratitude set an example for authentic worship.</p>
      
      <h2><strong>Prayer in Difficult Times</strong></h2>
      <p>David's psalms of lament show us how to be honest with God about our struggles while maintaining faith in His goodness and faithfulness.</p>
      
      <h1>Conclusion: A Life Worth Studying</h1>
      <p>David's life offers us a complete picture of what it means to follow God—the victories and the failures, the faith and the doubt, the leadership and the humility. His story encourages us that God can use anyone who has a heart for Him.</p>
      
      <p>Whether you're facing your own "Goliath" or dealing with the consequences of poor choices, David's example shows us that God's grace is sufficient and His love is unfailing. His legacy reminds us that true greatness comes not from perfection, but from a heart that seeks God above all else.</p>
      
      <p>Ready to test your knowledge of David's life? Take our <a href="/public-quiz/1-samuel">1 Samuel Quiz</a> or <a href="/public-quiz/2-samuel">2 Samuel Quiz</a> to see how well you know this remarkable biblical figure. For more character studies, explore our <a href="/articles">complete collection of Bible articles</a>.</p>
    `,
    author: "Dr. David Thompson",
    publishDate: "2024-12-12",
    readTime: "10 min read",
    category: "Bible Characters",
    tags: ["David", "King", "Israel", "Leadership", "Faith"],
    featured: false
  }
};

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const article = articlesData[id as keyof typeof articlesData];

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
              <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
              <Button asChild>
                <Link to="/articles">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Articles
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Helmet>
        <title>{article.title} | Bible Quiz Competition</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags.join(", ")} />
        <meta name="author" content={article.author} />
        <link rel="canonical" href={`https://biblequizcompetition.com/articles/${article.id}`} />
        
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={`https://biblequizcompetition.com/articles/${article.id}`} />
        <meta property="og:site_name" content="Bible Quiz Competition" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button variant="outline" asChild>
              <Link to="/articles">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3">{article.category}</Badge>
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                    {article.title}
                  </CardTitle>
                  <p className="text-xl text-gray-600 mb-6">
                    {article.excerpt}
                  </p>
                </div>
                {article.featured && (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    Featured
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {article.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {article.publishDate}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Article Content */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:text-gray-900 [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mb-4 [&>h2]:mt-6 [&>h2]:text-gray-800 [&>p]:mb-6 [&>p]:leading-relaxed [&>p]:text-gray-700 [&>ul]:mb-6 [&>li]:mb-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Test Your Knowledge?</h3>
              <p className="text-gray-600 mb-6">
                Put what you've learned into practice with our Bible quizzes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/public-quiz/genesis">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Take a Quiz
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/public-leaderboard">
                    <Trophy className="w-5 h-5 mr-2" />
                    View Leaderboard
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
