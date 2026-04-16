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
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white border-[4px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] text-[#1a1a1a] rounded-2xl font-urbanist font-black text-sm uppercase tracking-widest">
              <BookOpen className="w-4 h-4 text-[#3B82F6]" />
              <span>Reference: {story.bibleReference}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black font-urbanist text-[#1a1a1a] tracking-tight leading-tight">
              {story.title}
            </h1>
            <p className="text-xl md:text-2xl text-[#1a1a1a]/60 font-medium font-urbanist max-w-2xl mx-auto italic">
              {story.content}
            </p>
          </div>

          {/* Featured Image Section (with SEO Alt Text) */}
          <div className="aspect-video w-full bg-white rounded-[3rem] flex items-center justify-center overflow-hidden border-[6px] border-[#1a1a1a] shadow-[12px_12px_0_0_#1a1a1a] relative group">
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
          <div className="bg-white rounded-[3rem] border-[6px] border-[#1a1a1a] shadow-[12px_12px_0_0_#1a1a1a] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-32 h-32 text-orange-500" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <Quote className="w-12 h-12 text-orange-200" />
              <div className="space-y-10">
                <section>
                  <h2 className="text-3xl md:text-4xl font-black font-urbanist text-[#1a1a1a] mb-8 flex items-center gap-4">
                    <Sparkles className="w-8 h-8 text-[#F59E0B]" />
                    The Story of {story.title}
                  </h2>
                  <div className="prose prose-lg md:prose-xl max-w-none font-urbanist font-light text-gray-800 leading-relaxed text-left">
                    {story.fullStory.split('\n\n').map((para, i) => (
                        <p key={i} className="mb-8 last:mb-0">
                          {i === 0 ? (
                            <span className="text-7xl font-black text-[#EF4444] float-left mr-4 mt-1 leading-[0.7]">{para.charAt(0)}</span>
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
                  <section className="pt-12 border-t-4 border-dashed border-[#1a1a1a]/10">
                    <h2 className="text-3xl font-black font-urbanist text-[#1a1a1a] mb-6 flex items-center gap-3">
                      <Heart className="w-8 h-8 text-[#EF4444]" />
                      Life Lessons
                    </h2>
                    <div className="prose prose-lg md:prose-xl max-w-none font-urbanist font-bold text-[#1a1a1a] leading-relaxed text-left italic bg-[#FFFBEB] p-8 rounded-[2rem] border-[4px] border-[#1a1a1a] shadow-[6px_6px_0_0_#1a1a1a]">
                      {story.lifeLesson}
                    </div>
                  </section>
                )}

                {story.discussionQuestions && story.discussionQuestions.length > 0 && (
                  <section className="pt-12 border-t-4 border-dashed border-[#1a1a1a]/10">
                    <h3 className="text-2xl font-black font-urbanist text-[#1a1a1a] mb-8 flex items-center gap-3">
                      <Star className="w-8 h-8 text-[#FFDE59]" />
                      Let's Talk About It!
                    </h3>
                    <div className="grid gap-6">
                      {story.discussionQuestions.map((q, idx) => (
                        <div key={idx} className="bg-white border-[4px] border-[#1a1a1a] p-6 rounded-2xl shadow-[6px_6px_0_0_#1a1a1a] flex gap-4 items-start hover:translate-y-[-2px] hover:translate-x-[-1px] hover:shadow-[8px_8px_0_0_#1a1a1a] transition-all cursor-default">
                          <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#3B82F6] text-white border-[3px] border-[#1a1a1a] flex items-center justify-center font-black text-lg">
                            {idx + 1}
                          </span>
                          <p className="font-urbanist font-black text-[#1a1a1a] text-lg pt-1">{q}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>

          {/* Bible Verses Section */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white rounded-[2.5rem] p-8 border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] space-y-6">
              <div className="flex items-center gap-4 text-[#1a1a1a]">
                <div className="p-3 bg-[#FFDE59] rounded-2xl border-2 border-[#1a1a1a]">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black font-urbanist">Verses to Remember</h3>
              </div>
              <div className="space-y-4">
                {story.bibleVerses.map((verse, idx) => (
                  <div key={idx} className="p-6 bg-gray-50 rounded-2xl border-[3px] border-[#1a1a1a] italic text-[#1a1a1a] font-urbanist font-bold text-lg leading-relaxed shadow-[4px_4px_0_0_#1a1a1a]">
                    "{verse}"
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] p-8 border-[6px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a] space-y-6">
              <div className="flex items-center gap-4 text-[#1a1a1a]">
                <div className="p-3 bg-[#7ED957] rounded-2xl border-2 border-[#1a1a1a]">
                  <Heart className="w-8 h-8 font-black" />
                </div>
                <h3 className="text-2xl font-black font-urbanist">Key Takeaways</h3>
              </div>
              <ul className="space-y-5">
                {story.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-[#1a1a1a] font-urbanist font-black text-lg">
                    <CheckCircle2 className="w-7 h-7 text-[#7ED957] shrink-0 stroke-[3px]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Moral Section */}
          <div className="bg-[#1a1a1a] rounded-[3rem] p-1.5 shadow-[12px_12px_0_0_#1a1a1a]">
            <div className="bg-white rounded-[2.8rem] p-10 md:p-14 text-center space-y-6">
              <div className="inline-flex items-center justify-center p-6 bg-[#FFDE59] border-[4px] border-[#1a1a1a] rounded-[2rem] shadow-[6px_6px_0_0_#1a1a1a]">
                <Star className="w-10 h-10 text-[#1a1a1a] fill-[#1a1a1a]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-urbanist text-[#1a1a1a]">
                The Moral of the Story
              </h2>
              <p className="text-2xl md:text-4xl font-black font-urbanist text-[#EF4444] italic leading-relaxed">
                "{story.moral}"
              </p>
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center py-12 flex flex-col md:flex-row items-center justify-center gap-8">
            <Button 
              size="lg" 
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full px-12 py-10 text-2xl font-black font-urbanist transition-all translate-y-[-4px] border-[6px] border-[#1a1a1a] shadow-[0_8px_0_0_#1a1a1a] active:translate-y-[2px] active:shadow-none h-auto"
              onClick={() => navigate(`/kids-stories/${story.slug}/quiz`)}
            >
              Take the Quiz!
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white hover:bg-gray-100 text-[#1a1a1a] border-[6px] border-[#1a1a1a] rounded-full px-12 py-10 text-2xl font-black font-urbanist transition-all translate-y-[-4px] shadow-[0_8px_0_0_#1a1a1a] active:translate-y-[2px] active:shadow-none h-auto"
              onClick={() => navigate("/kids-stories")}
            >
              More Stories
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoryDetail;
