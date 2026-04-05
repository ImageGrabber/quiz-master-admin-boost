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
             {["the-brave-shepherd-boy", "noahs-special-boat", "the-kind-neighbor"].includes(story.slug) ? (
               <img 
                 src={`/images/stories/${story.slug}.png`}
                 alt={story.imageAlt}
                 className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
               />
             ) : (
               <>
                 <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/50 to-yellow-100/50 opacity-50" />
                 <div className="z-10 text-center space-y-4 px-6">
                   <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                     <Sparkles className="w-10 h-10 text-orange-500" />
                   </div>
                   <p className="text-orange-800 font-urbanist font-bold text-xl">{story.imageAlt}</p>
                 </div>
               </>
             )}
          </div>

          {/* Story Content */}
          <div className="bg-white rounded-[40px] shadow-sm border border-orange-50 p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles className="w-32 h-32 text-orange-500" />
            </div>
            
            <div className="relative z-10 space-y-8">
              <Quote className="w-12 h-12 text-orange-200" />
              <div className="prose prose-lg md:prose-xl max-w-none font-urbanist font-light text-gray-800 leading-relaxed text-left">
                {story.fullStory.split('\n\n').map((para, i) => (
                    <p key={i} className="mb-8 last:mb-0">
                      {i === 0 ? (
                        <span className="text-6xl font-bold text-orange-500 float-left mr-3 mt-1 leading-[0.8]">{para.charAt(0)}</span>
                      ) : null}
                      {i === 0 ? para.substring(1) : para}
                    </p>
                ))}
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
          <div className="text-center py-12">
            <Button 
              size="lg" 
              className="bg-black hover:bg-gray-800 text-white rounded-full px-12 py-8 text-xl font-bold font-urbanist transition-all hover:scale-105"
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
