import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, BookOpen, Quote, Star, Sparkles, Share2, Heart, CheckCircle2 } from "lucide-react";
import kidsStoriesData from "@/data/kids-stories.json";

export interface KidsStory {
  id: number;
  title: string;
  slug: string;
  content: string;
  fullStory: string;
  bibleVerses: string[];
  moral: string;
  bibleReference: string;
  theme: string;
  imageAlt: string;
  keyTakeaways: string[];
  biblicalMeaning?: string;
  lifeLesson?: string;
  discussionQuestions?: string[];
}

const StoryDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const story = (kidsStoriesData as KidsStory[]).find((s) => s.slug === slug);

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Story Not Found</h1>
          <Button onClick={() => navigate("/kids-stories")}>Back to Stories</Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${story.title} - Bible Story for Kids`,
          text: `Read the story of ${story.title} and its moral lesson on Bible Quiz Competition!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex flex-col">
      <Helmet>
        <title>{story.title} - Bible Story for Kids | Bible Quiz Competition</title>
        <meta name="description" content={`Read the story of ${story.title}. Moral: ${story.moral}. Biblical reference: ${story.bibleReference}. ${story.content}`} />
        <meta name="keywords" content={`bible stories for kids, ${story.title}, ${story.theme}, christian stories for children, moral stories, ${story.bibleReference}`} />
        <link rel="canonical" href={`https://biblequizcompetition.com/kids-stories/${story.slug}`} />
      </Helmet>

      <Navigation />

      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <Button
              variant="ghost"
              className="w-fit pl-0 hover:bg-transparent text-gray-600 hover:text-orange-500 transition-colors"
              onClick={() => navigate("/kids-stories")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Stories
            </Button>
            <Button 
              variant="outline" 
              className="w-fit rounded-full border-gray-200 hover:bg-gray-50 flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
              Share this Story
            </Button>
          </div>

          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-sm border border-orange-100 text-orange-600 rounded-full font-urbanist font-medium text-sm">
              <BookOpen className="w-4 h-4" />
              <span>Biblical Reference: {story.bibleReference}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-urbanist text-gray-900 tracking-tight leading-tight">
              {story.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-500 italic font-urbanist max-w-2xl mx-auto">
              {story.content}
            </p>
          </div>

          {/* Featured Image Section (with SEO Alt Text) */}
          <div className="aspect-video w-full bg-orange-100 rounded-[40px] flex items-center justify-center overflow-hidden shadow-inner border-4 border-white relative group">
               <img 
                 src={`/images/stories/${story.slug}.png`}
                 alt={story.imageAlt}
                 className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                 onError={(e) => {
                    // Fallback if image is missing
                    (e.target as HTMLImageElement).style.display = 'none';
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'absolute inset-0 bg-orange-100 flex flex-col items-center justify-center text-center p-6';
                      fallback.innerHTML = `
                        <div class="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-lg">
                          <svg class="w-10 h-10 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>
                        </div>
                        <p class="text-orange-800 font-bold text-xl mt-4">${story.imageAlt}</p>
                      `;
                      parent.appendChild(fallback);
                    }
                 }}
               />
          </div>

          {/* Story Content */}
          <div className="bg-white rounded-[40px] shadow-sm border border-orange-50 p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-32 h-32 text-orange-500" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <Quote className="w-12 h-12 text-orange-200" />
              <div className="space-y-10">
                <section>
                  <h2 className="text-3xl font-bold font-urbanist text-gray-900 mb-6 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-orange-400" />
                    The Story of {story.title} for Kids
                  </h2>
                  <div className="prose prose-lg md:prose-xl max-w-none font-urbanist font-light text-gray-800 leading-relaxed text-left">
                    {story.fullStory.split('\n\n').map((para, i) => (
                        <p key={i} className="mb-6 last:mb-0">
                          {i === 0 ? (
                            <span className="text-6xl font-bold text-orange-500 float-left mr-3 mt-1 leading-[0.8]">{para.charAt(0)}</span>
                          ) : null}
                          {i === 0 ? para.substring(1) : para}
                        </p>
                    ))}
                  </div>
                </section>

                {story.biblicalMeaning && (
                  <section className="pt-8 border-t border-orange-50">
                    <h2 className="text-3xl font-bold font-urbanist text-gray-900 mb-6 flex items-center gap-3">
                      <BookOpen className="w-7 h-7 text-blue-500" />
                      What Does This Bible Story Mean?
                    </h2>
                    <div className="prose prose-lg md:prose-xl max-w-none font-urbanist font-light text-gray-700 leading-relaxed text-left">
                      {story.biblicalMeaning}
                    </div>
                  </section>
                )}

                {story.lifeLesson && (
                  <section className="pt-8 border-t border-orange-50">
                    <h2 className="text-3xl font-bold font-urbanist text-gray-900 mb-6 flex items-center gap-3">
                      <Heart className="w-7 h-7 text-red-500" />
                      Life Lessons for Young Hearts
                    </h2>
                    <div className="prose prose-lg md:prose-xl max-w-none font-urbanist font-light text-gray-700 leading-relaxed text-left italic bg-orange-50/30 p-8 rounded-3xl border border-orange-100">
                      {story.lifeLesson}
                    </div>
                  </section>
                )}

                {story.discussionQuestions && story.discussionQuestions.length > 0 && (
                  <section className="pt-8 border-t border-orange-50">
                    <h3 className="text-2xl font-bold font-urbanist text-gray-900 mb-6 flex items-center gap-3">
                      <Star className="w-6 h-6 text-yellow-500" />
                      Let's Talk About It: Questions for Kids
                    </h3>
                    <div className="grid gap-4">
                      {story.discussionQuestions.map((q, idx) => (
                        <div key={idx} className="bg-white border border-orange-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex gap-4 items-start">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </span>
                          <p className="font-urbanist font-medium text-gray-700 pt-1">{q}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>

          {/* Bible Verses Section */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-orange-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-orange-600">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-urbanist">Bible Verses to Remember</h3>
              </div>
              <div className="space-y-4">
                {story.bibleVerses.map((verse, idx) => (
                  <div key={idx} className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 italic text-gray-700 font-urbanist leading-relaxed">
                    "{verse}"
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-green-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3 text-green-600">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-urbanist">Key Takeaways</h3>
              </div>
              <ul className="space-y-4">
                {story.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-gray-700 font-urbanist">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Moral Section */}
          <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-[32px] p-1 shadow-xl">
            <div className="bg-white rounded-[31px] p-8 md:p-12 text-center space-y-4">
              <div className="inline-flex items-center justify-center p-4 bg-orange-100 rounded-2xl mb-2">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-urbanist text-gray-900">
                The Moral of the Story
              </h2>
              <p className="text-xl md:text-2xl font-medium font-urbanist text-orange-600 italic leading-relaxed">
                "{story.moral}"
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center py-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <Button 
              size="lg" 
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white rounded-full px-12 py-8 text-xl font-bold font-urbanist transition-all hover:scale-105 shadow-[0_8px_0_0_#5B21B6] active:translate-y-1 active:shadow-none"
              onClick={() => navigate(`/kids-stories/${story.slug}/quiz`)}
            >
              Take the Story Quiz!
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white hover:bg-gray-50 text-black border-2 border-black rounded-full px-12 py-8 text-xl font-bold font-urbanist transition-all hover:scale-105"
              onClick={() => navigate("/kids-stories")}
            >
              Explore More Stories
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoryDetail;
