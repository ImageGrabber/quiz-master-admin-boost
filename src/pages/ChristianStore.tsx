import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ShoppingBag, 
  BookOpen, 
  GraduationCap, 
  ExternalLink, 
  Star, 
  Heart,
  Search,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const storeItems = [
  {
    category: "Bibles & Devotionals",
    items: [
      {
        title: "Study Bibles",
        desc: "Deepen your understanding with curated study Bibles from Amazon & Christianbook.",
        icon: BookOpen,
        link: "https://www.amazon.com/s?k=study+bible",
        color: "blue"
      },
      {
        title: "Daily Devotionals",
        desc: "Morning and evening inspiration to keep you grounded in the Word.",
        icon: Heart,
        link: "https://www.christianbook.com/Christian/Books/cms_content?page=1422703&sp=1003",
        color: "rose"
      }
    ]
  },
  {
    category: "Education & Growth",
    items: [
      {
        title: "Theology Courses",
        desc: "Master Biblical studies with world-class instructors on Udemy.",
        icon: GraduationCap,
        link: "https://www.udemy.com/courses/search/?q=bible+study",
        color: "indigo"
      },
      {
        title: "RightNow Media",
        desc: "The 'Netflix of Bible Studies' for your personal and family growth.",
        icon: Star,
        link: "https://www.rightnowmedia.org/",
        color: "amber"
      }
    ]
  }
];

const ChristianStore = () => {
  return (
    <DashboardLayout 
      title="Christian Store" 
      subtitle="Curated resources to grow your faith and knowledge."
    >
      <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
        
        {/* Featured Hero */}
        <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 text-white p-12 lg:p-20 shadow-2xl shadow-slate-900/20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent" />
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-black uppercase tracking-widest">
              <ShoppingBag className="h-3.5 w-3.5" /> Curated Collection
            </div>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter leading-none">
              EQUIP YOUR <br /><span className="text-blue-400">SPIRITUAL JOURNEY.</span>
            </h2>
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              We've partnered with the world's leading Christian retailers to bring you the best Bibles, books, and courses to help you master the Word.
            </p>
            <div className="pt-4">
              <Button className="h-14 px-10 bg-blue-600 hover:bg-blue-500 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
                Explore All Products <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories */}
        {storeItems.map((section, idx) => (
          <div key={idx} className="space-y-8">
            <div className="flex items-center gap-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{section.category}</h3>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {section.items.map((item, i) => (
                <Card key={i} className="border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2.5rem] overflow-hidden group border-2 hover:border-blue-100">
                  <CardHeader className="p-8 lg:p-10">
                    <div className="flex justify-between items-start mb-8">
                      <div className={`h-16 w-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner`}>
                        <item.icon className="h-8 w-8" />
                      </div>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    <CardTitle className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mb-4">{item.title}</CardTitle>
                    <CardDescription className="text-slate-500 text-base font-medium leading-relaxed mb-8">
                      {item.desc}
                    </CardDescription>
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black text-blue-600 uppercase tracking-widest hover:gap-4 transition-all"
                    >
                      Shop on Partner Site <ArrowRight className="h-3 w-3" />
                    </a>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* AdSense Placeholder Banner */}
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-12 text-center space-y-4">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Sponsored Content</p>
          <div className="h-32 flex items-center justify-center italic text-slate-400 font-medium">
            Google AdSense Placeholder - Top Performing Faith Ads
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ChristianStore;
