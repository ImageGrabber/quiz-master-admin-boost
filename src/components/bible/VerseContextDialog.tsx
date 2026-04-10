import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { bibleData } from "@/data/bibleData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

interface VerseContextDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  book: string;
  chapterId: number;
  highlightVerse?: string; // e.g. "Genesis 1:3" or "3" or "3-5"
}

export function VerseContextDialog({
  open,
  onOpenChange,
  book,
  chapterId,
  highlightVerse,
}: VerseContextDialogProps) {
  const bookSlug = book.toLowerCase();
  const chapterData = (bibleData as any)[bookSlug]?.[chapterId];
  const verses = chapterData?.fullText || [];

  // Parse highlighted verse numbers
  const getHighlightedVerseNumbers = () => {
    if (!highlightVerse) return [];
    
    // Extract numbers after the colon if present (e.g., "Genesis 1:3-5" -> "3-5")
    const match = highlightVerse.match(/:(\d+(-?\d+)?)$/);
    const versesStr = match ? match[1] : highlightVerse;

    if (versesStr.includes("-")) {
      const [start, end] = versesStr.split("-").map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    
    // Check if it's a single number or lists
    const singleNum = parseInt(versesStr.replace(/\D/g, ""), 10);
    return isNaN(singleNum) ? [] : [singleNum];
  };

  const highlightedNumbers = getHighlightedVerseNumbers();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col p-0 overflow-hidden border-stone-200 rounded-3xl shadow-2xl">
        <div className="h-1.5 bg-stone-900 w-full shrink-0" />
        <DialogHeader className="p-6 pb-2 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-stone-500 border-stone-200 bg-stone-50">
              Scripture Context
            </Badge>
          </div>
          <DialogTitle className="text-3xl font-black text-stone-900 tracking-tight flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-stone-400" />
            {book} {chapterId}
          </DialogTitle>
          <DialogDescription className="text-sm font-medium text-stone-500 italic mt-1">
            {chapterData?.subtitle || "Study Guide Content"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow p-6 pt-2">
          {verses.length > 0 ? (
            <div className="space-y-4">
              {verses.map((v: any) => {
                const isHighlighted = highlightedNumbers.includes(parseInt(v.verse, 10));
                return (
                  <div
                    key={v.verse}
                    className={`p-4 rounded-2xl transition-all duration-500 ${
                      isHighlighted
                        ? "bg-orange-50 border border-orange-100 shadow-sm scale-[1.01]"
                        : "hover:bg-stone-50/50"
                    }`}
                  >
                    <div className="flex gap-4 items-start">
                      <span className={`text-xs font-black shrink-0 mt-1 ${
                        isHighlighted ? "text-orange-600" : "text-stone-300"
                      }`}>
                        {v.verse}
                      </span>
                      <p className={`text-base leading-relaxed ${
                        isHighlighted ? "text-stone-900 font-bold" : "text-stone-600 font-medium"
                      }`}>
                        {v.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center px-10">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-stone-200" />
              </div>
              <p className="text-stone-500 font-bold tracking-tight leading-relaxed">
                The full text for this chapter is being prepared. <br />
                Please check back soon!
              </p>
            </div>
          )}
        </ScrollArea>
        
        <div className="p-6 pt-2 shrink-0 border-t border-stone-50 bg-stone-50/30">
          <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] text-center">
            Bible Quiz Competition • Scripture Study Hub
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
