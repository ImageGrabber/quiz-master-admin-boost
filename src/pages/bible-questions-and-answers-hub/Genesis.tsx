import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Layers, Swords, ListOrdered, Brain, Home, ChevronRight, Search } from "lucide-react";
import Header from "@/components/Header";

export default function GenesisHub() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const chapterNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const filteredChapters = useMemo(() => {
    if (!query.trim()) return chapterNumbers;
    const q = query.replace(/[^0-9]/g, "");
    if (!q) return chapterNumbers;
    return chapterNumbers.filter((n) => String(n).startsWith(q));
  }, [query]);
  // Show 4 at a time (e.g., 1–4) with simple paging controls
  const pageSize = 4;
  const [chapterPage, setChapterPage] = useState(0);
  const totalChapterPages = Math.max(1, Math.ceil(filteredChapters.length / pageSize));
  useEffect(() => { setChapterPage(0); }, [query]);
  const startIdx = chapterPage * pageSize;
  const endIdx = Math.min(startIdx + pageSize, filteredChapters.length);
  const visibleChapters = filteredChapters.slice(startIdx, endIdx);

  // Detailed bullet points for chapters 1–8
  const chapterPoints: Record<number, string[]> = {
    1: [
      "Creation days 1–6 and Sabbath pattern",
      "Heavens and earth; light vs darkness",
      "Image of God; mandate to rule and fill",
    ],
    2: [
      "Garden of Eden; rivers and Havilah gold",
      "Tree of life vs tree of knowledge",
      "Formation of woman; one flesh design",
    ],
    3: [
      "Temptation and the Fall; consequences",
      "Protoevangelium (3:15) promise",
      "Garments of skin; expulsion and cherubim",
    ],
    4: [
      "Cain and Abel offerings; murder and mark",
      "City of Enoch; Lamech's poem",
      "Birth of Seth; people begin to call on the Lord",
    ],
    5: [
      "Genealogy of Adam through Seth",
      "Long lifespans; refrain 'and he died'",
      "Enoch walks with God; Methuselah & Lamech; Noah named",
    ],
    6: [
      "Human wickedness; violence fills the earth",
      "Nephilim mentioned; God resolves to send the flood",
      "Noah finds favor; ark instructions and dimensions",
    ],
    7: [
      "Noah, family, and animals enter the ark",
      "Seven pairs of clean animals; 40 days and nights of rain",
      "Waters prevail; 150 days",
    ],
    8: [
      "Waters recede; ark rests; raven and dove sent out",
      "Altar built; pleasing aroma",
      "Covenant promise: never again a worldwide flood",
    ],
  };

  // Detailed bullet points for chapters 9–12
  const chapterPoints9to12: Record<number, string[]> = {
    9: [
      "Noah plants vineyard; gets drunk",
      "Ham sees father's nakedness; cursed",
      "Shem and Japheth blessed; Canaan cursed",
    ],
    10: [
      "Table of Nations; Japheth's descendants",
      "Ham's descendants; Canaan's sons",
      "Shem's descendants; Eber's line",
    ],
    11: [
      "Tower of Babel; language confusion",
      "Shem's genealogy to Terah",
      "Terah's family; Abram, Nahor, Haran",
    ],
    12: [
      "God calls Abram; leaves Haran",
      "Abram in Canaan; builds altars",
      "Famine; goes to Egypt; Sarai taken",
    ],
  };

  // Detailed bullet points for chapters 13–16
  const chapterPoints13to16: Record<number, string[]> = {
    13: [
      "Abram and Lot separate; Lot chooses Jordan plain",
      "Abram settles at Hebron; builds altar",
      "God renews promises to Abram",
    ],
    14: [
      "War of the kings; Lot taken captive",
      "Abram rescues Lot with 318 men",
      "Melchizedek blesses Abram; tithe given",
    ],
    15: [
      "God's covenant with Abram; stars promise",
      "Abram's faith counted as righteousness",
      "Covenant ceremony; future slavery foretold",
    ],
    16: [
      "Sarai gives Hagar to Abram; Ishmael born",
      "Hagar flees; angel meets her at spring",
      "Promise of Ishmael's descendants",
    ],
  };

  // Detailed bullet points for chapters 17–20
  const chapterPoints17to20: Record<number, string[]> = {
    17: [
      "Covenant of circumcision; Abram becomes Abraham",
      "Sarai becomes Sarah; Isaac promised",
      "Ishmael blessed; covenant established",
    ],
    18: [
      "Three visitors at Mamre; Sarah laughs",
      "Abraham intercedes for Sodom",
      "Bargaining for righteous people",
    ],
    19: [
      "Angels visit Lot; Sodom's destruction",
      "Lot's wife becomes pillar of salt",
      "Lot and daughters in Zoar",
    ],
    20: [
      "Abraham in Gerar; Sarah taken",
      "Abimelech's dream; God's warning",
      "Abraham prays; Abimelech healed",
    ],
  };

  // Full text content for Genesis Chapter 5
  const chapter5FullText = `Adam's Descendants to Noah

5 This is the book of the generations of Adam. When God created man, he made him in the likeness of God. 2 Male and female he created them, and he blessed them and named them Man[a] when they were created. 3 When Adam had lived 130 years, he fathered a son in his own likeness, after his image, and named him Seth. 4 The days of Adam after he fathered Seth were 800 years; and he had other sons and daughters. 5 Thus all the days that Adam lived were 930 years, and he died.

6 When Seth had lived 105 years, he fathered Enosh. 7 Seth lived after he fathered Enosh 807 years and had other sons and daughters. 8 Thus all the days of Seth were 912 years, and he died.

9 When Enosh had lived 90 years, he fathered Kenan. 10 Enosh lived after he fathered Kenan 815 years and had other sons and daughters. 11 Thus all the days of Enosh were 905 years, and he died.

12 When Kenan had lived 70 years, he fathered Mahalalel. 13 Kenan lived after he fathered Mahalalel 840 years and had other sons and daughters. 14 Thus all the days of Kenan were 910 years, and he died.

15 When Mahalalel had lived 65 years, he fathered Jared. 16 Mahalalel lived after he fathered Jared 830 years and had other sons and daughters. 17 Thus all the days of Mahalalel were 895 years, and he died.

18 When Jared had lived 162 years, he fathered Enoch. 19 Jared lived after he fathered Enoch 800 years and had other sons and daughters. 20 Thus all the days of Jared were 962 years, and he died.

21 When Enoch had lived 65 years, he fathered Methuselah. 22 Enoch walked with God[b] after he fathered Methuselah 300 years and had other sons and daughters. 23 Thus all the days of Enoch were 365 years. 24 Enoch walked with God, and he was not,[c] for God took him.

25 When Methuselah had lived 187 years, he fathered Lamech. 26 Methuselah lived after he fathered Lamech 782 years and had other sons and daughters. 27 Thus all the days of Methuselah were 969 years, and he died.

28 When Lamech had lived 182 years, he fathered a son 29 and called his name Noah, saying, "Out of the ground that the Lord has cursed, this one shall bring us relief[d] from our work and from the painful toil of our hands." 30 Lamech lived after he fathered Noah 595 years and had other sons and daughters. 31 Thus all the days of Lamech were 777 years, and he died.

32 After Noah was 500 years old, Noah fathered Shem, Ham, and Japheth.`;
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-white">
      <Header />
      {/* Full-width hero */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-gradient-to-br from-white via-white/70 to-blue-50 shadow-sm">
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">Genesis Quiz Hub</h1>
            <p className="text-lg lg:text-xl text-gray-700 mt-2">Pick a difficulty, jump to a chapter, or try special types.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Quick search chapters 1–8"
                className="w-full pl-9 pr-3 py-3 rounded-xl border-2 border-blue-200 focus:border-blue-500 bg-white shadow-sm"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <a href="#difficulty" className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold shadow">Difficulty</a>
              <a href="#ranges" className="px-3 py-2 rounded-lg bg-purple-600 text-white text-sm font-semibold shadow">Ranges</a>
              {/* <a href="#chapters" className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow">Chapters</a> */}
              <a href="#genesis-chapter-wise" className="px-3 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow">Chapter Wise</a>
              <a href="#chapters-13-16" className="px-3 py-2 rounded-lg bg-orange-600 text-white text-sm font-semibold shadow" style={{display: 'none'}}>Ch 13-16</a>
              <a href="#chapters-17-20" className="px-3 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold shadow" style={{display: 'none'}}>Ch 17-20</a>
              <a href="#types" className="px-3 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold shadow">Types</a>
              <a href="#genesis-chapter-5-text" className="px-3 py-2 rounded-lg bg-amber-600 text-white text-sm font-semibold shadow">Ch 5 Text</a>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/")}> <Home className="w-4 h-4 mr-1" /> Home</Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <Button variant="ghost" size="sm" className="px-2 h-8" onClick={() => navigate("/bible-questions-and-answers-hub")}>Bible Q&A Hub</Button>
          <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
          <span className="font-medium text-gray-900">Genesis</span>
        </div>

        {/* Difficulty section */}
        <section id="difficulty" className="mb-10 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">By Difficulty</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/beginner")}> 
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <CardTitle>Beginner</CardTitle>
                <CardDescription>10 questions from core stories</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Creation, Fall, Noah, Abraham & Joseph highlights</li>
                  <li>Clear phrasing; one-correct-choice questions</li>
                  <li>Great for first-timers and kids</li>
                </ul>
              </CardContent>
              <CardContent className="mt-auto">
                <Button variant="outline" className="w-full">Start Beginner</Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/intermediate")}> 
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <CardTitle>Intermediate</CardTitle>
                <CardDescription>15 questions across the book</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Mix of people, places, and covenant moments</li>
                  <li>Chapter references included for review</li>
                  <li>Ideal for youth groups and small studies</li>
                </ul>
              </CardContent>
              <CardContent className="mt-auto">
                <Button variant="outline" className="w-full">Start Intermediate</Button>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/advanced")}> 
              <CardHeader>
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center">
                  <Swords className="w-5 h-5 text-white" />
                </div>
                <CardTitle>Advanced</CardTitle>
                <CardDescription>25 challenging questions</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Deeper details: Hebrew terms, locations, numbers</li>
                  <li>Edge cases and less-common characters</li>
                  <li>Perfect for quiz bowls or seasoned readers</li>
                </ul>
              </CardContent>
              <CardContent className="mt-auto">
                <Button className="w-full">Start Advanced</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Chapters section */}
        <section id="ranges" className="scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <ListOrdered className="w-5 h-5 text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-900">By Chapter Range</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col h-full" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapters-1-11")}>
              <CardHeader>
                <CardTitle>Genesis 1–11</CardTitle>
                <CardDescription>Creation to Babel • Creation days, Fall, Flood, Nations</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">Chs 1–11</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Beginner 10Q</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Advanced 25Q</span>
                </div>
                <div className="text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Creation week details and image of God</li>
                    <li>The Fall, Cain/Abel, and long lifespans</li>
                    <li>Ark specs, flood timeline, rainbow covenant</li>
                    <li>Table of Nations and Tower of Babel</li>
                  </ul>
                </div>
              </CardContent>
              <CardContent className="mt-auto pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/genesis/1-11/beginner"); }}>Beginner</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/genesis/1-11/advanced"); }}>Advanced</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col h-full" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapters-12-25")}>
              <CardHeader>
                <CardTitle>Genesis 12–25</CardTitle>
                <CardDescription>Abraham cycle • Call, covenant, Isaac, Mount Moriah</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700">Chs 12–25</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Beginner 10Q</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Advanced 25Q</span>
                </div>
                <div className="text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Call of Abram and promises/covenants</li>
                    <li>Hagar & Ishmael; birth of Isaac; name changes</li>
                    <li>Mount Moriah, faith counted as righteousness</li>
                    <li>Sarah’s death, Rebekah found, Esau & Jacob</li>
                  </ul>
                </div>
              </CardContent>
              <CardContent className="mt-auto pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/genesis/12-25/beginner"); }}>Beginner</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/genesis/12-25/advanced"); }}>Advanced</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col h-full" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapters-26-36")}>
              <CardHeader>
                <CardTitle>Genesis 26–36</CardTitle>
                <CardDescription>Isaac, Jacob & Esau • Birthright, ladder, Leah/Rachel, wrestling</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">Chs 26–36</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Beginner 10Q</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Advanced 25Q</span>
                </div>
                <div className="text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Isaac in Gerar; Esek, Sitnah, Rehoboth wells</li>
                    <li>Birthright/blessing, Jacob’s ladder at Bethel</li>
                    <li>Leah/Rachel, mandrakes, speckled flocks</li>
                    <li>Wrestling at Peniel; name changed to Israel</li>
                  </ul>
                </div>
              </CardContent>
              <CardContent className="mt-auto pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/genesis/26-36/beginner"); }}>Beginner</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/genesis/26-36/advanced"); }}>Advanced</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col h-full" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/chapters-37-50")}>
              <CardHeader>
                <CardTitle>Genesis 37–50</CardTitle>
                <CardDescription>Joseph narrative • Dreams, Egypt, famine, forgiveness</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-wrap gap-2 mb-2 text-xs">
                  <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700">Chs 37–50</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Beginner 10Q</span>
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">Advanced 25Q</span>
                </div>
                <div className="text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Joseph’s dreams, pit and sale to traders</li>
                    <li>Potiphar’s house, prison, and cupbearer</li>
                    <li>Pharaoh’s dreams; seven years plenty/famine</li>
                    <li>Family reunion, Goshen, forgiveness theme</li>
                  </ul>
                </div>
              </CardContent>
              <CardContent className="mt-auto pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/genesis/37-50/beginner"); }}>Beginner</Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); navigate("/bible-questions-and-answers-hub/genesis/37-50/advanced"); }}>Advanced</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Per-Chapter quick access (1–5) */}
          <div id="chapters" className="mt-10 scroll-mt-24" style={{display: 'none'}}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold text-gray-900">By Chapter (1–8)</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Showing {visibleChapters[0]}–{visibleChapters[visibleChapters.length - 1]}</span>
                <Button size="sm" variant="outline" disabled={chapterPage === 0} onClick={() => setChapterPage((p) => Math.max(0, p - 1))}>Prev</Button>
                <Button size="sm" variant="outline" disabled={chapterPage >= totalChapterPages - 1} onClick={() => setChapterPage((p) => Math.min(totalChapterPages - 1, p + 1))}>Next</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {visibleChapters.map((ch) => (
                <Card key={ch} className="p-3 flex flex-col h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Chapter {ch}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {chapterPoints[ch] && (
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-2">
                        {chapterPoints[ch].map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardContent className="mt-auto">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${ch}-beginner`)}>Beginner</Button>
                      <Button size="sm" className="flex-1" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${ch}-advanced`)}>Advanced</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Per-Chapter quick access (9–12) */}
        <section id="chapters-9-12" className="mt-10 scroll-mt-24" style={{display: 'none'}}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900">By Chapter (9–12)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[9,10,11,12].map((ch) => (
              <Card key={ch} className="p-3 flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Chapter {ch}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-2">
                    {ch === 9 && (<>
                      <li>God's covenant with Noah</li>
                      <li>Rainbow sign; no eating blood</li>
                      <li>Noah's sons and Canaan</li>
                    </>)}
                    {ch === 10 && (<>
                      <li>Table of Nations</li>
                      <li>Nimrod's kingdom beginnings</li>
                      <li>Peoples spread after the flood</li>
                    </>)}
                    {ch === 11 && (<>
                      <li>Tower of Babel and scattered languages</li>
                      <li>Genealogy down to Abram</li>
                      <li>Move from Ur to Haran</li>
                    </>)}
                    {ch === 12 && (<>
                      <li>Call of Abram and promises</li>
                      <li>Journey to Canaan and altar</li>
                      <li>Sojourn in Egypt</li>
                    </>)}
                  </ul>
                </CardContent>
                <CardContent className="mt-auto">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${ch}-beginner`)}>Beginner</Button>
                    <Button size="sm" className="flex-1" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${ch}-advanced`)}>Advanced</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Per-Chapter quick access (13–16) */}
        <section id="chapters-13-16" className="mt-10 scroll-mt-24" style={{display: 'none'}}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900">By Chapter (13–16)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[13,14,15,16].map((ch) => (
              <Card key={ch} className="p-3 flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Chapter {ch}</CardTitle>
                </CardHeader>
                <CardContent>
                  {chapterPoints13to16[ch] && (
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-2">
                      {chapterPoints13to16[ch].map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardContent className="mt-auto">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${ch}-beginner`)}>Beginner</Button>
                    <Button size="sm" className="flex-1" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${ch}-advanced`)}>Advanced</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Per-Chapter quick access (17–20) */}
        <section id="chapters-17-20" className="mt-10 scroll-mt-24" style={{display: 'none'}}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900">By Chapter (17–20)</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[17,18,19,20].map((ch) => (
              <Card key={ch} className="p-3 flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Chapter {ch}</CardTitle>
                </CardHeader>
                <CardContent>
                  {chapterPoints17to20[ch] && (
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-2">
                      {chapterPoints17to20[ch].map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                <CardContent className="mt-auto">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${ch}-beginner`)}>Beginner</Button>
                    <Button size="sm" className="flex-1" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/ch${ch}-advanced`)}>Advanced</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Genesis Quiz Chapter Wise */}
        <section id="genesis-chapter-wise" className="mt-10 scroll-mt-24">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900">Genesis Quiz Chapter Wise</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((ch) => {
              // Get the appropriate chapter points based on chapter number
              let currentChapterPoints = null;
              if (ch >= 1 && ch <= 8) {
                currentChapterPoints = chapterPoints[ch];
              } else if (ch >= 9 && ch <= 12) {
                currentChapterPoints = chapterPoints9to12[ch];
              } else if (ch >= 13 && ch <= 16) {
                currentChapterPoints = chapterPoints13to16[ch];
              } else if (ch >= 17 && ch <= 20) {
                currentChapterPoints = chapterPoints17to20[ch];
              }

              return (
                <Card key={ch} className="p-4 flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/bible-questions-and-answers-hub/genesis/chapter-${ch}`)}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-blue-600">Chapter {ch}</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      {ch === 1 && "Creation & Sabbath"}
                      {ch === 2 && "Garden of Eden"}
                      {ch === 3 && "The Fall"}
                      {ch === 4 && "Cain & Abel"}
                      {ch === 5 && "Genealogy"}
                      {ch === 6 && "Noah & the Flood"}
                      {ch === 7 && "The Flood"}
                      {ch === 8 && "After the Flood"}
                      {ch === 9 && "Noah's Drunkenness"}
                      {ch === 10 && "Table of Nations"}
                      {ch === 11 && "Tower of Babel"}
                      {ch === 12 && "Abram's Call"}
                      {ch === 13 && "Abram & Lot Separate"}
                      {ch === 14 && "War of the Kings"}
                      {ch === 15 && "God's Covenant"}
                      {ch === 16 && "Hagar & Ishmael"}
                      {ch === 17 && "Covenant of Circumcision"}
                      {ch === 18 && "Three Visitors"}
                      {ch === 19 && "Sodom's Destruction"}
                      {ch === 20 && "Abraham in Gerar"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    {currentChapterPoints && (
                      <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-3">
                        {currentChapterPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardContent className="mt-auto pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); navigate(`/bible-questions-and-answers-hub/genesis/chapter-${ch}`); }}>
                        View Chapter Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Types section */}
        <section id="types" className="mt-12 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h2 className="text-2xl font-semibold text-gray-900">By Type</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/fill-in-the-blanks")}> 
              <CardHeader>
                <CardTitle>Fill in the Blanks</CardTitle>
                <CardDescription>Complete key verses and phrases</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">Master memory verses from Genesis—choose the correct word/phrase to complete the sentence.</CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/true-false")}> 
              <CardHeader>
                <CardTitle>True / False</CardTitle>
                <CardDescription>Quick facts from Genesis</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">Rapid-fire statements testing overall comprehension—great warm-up for teams and classes.</CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/characters")}> 
              <CardHeader>
                <CardTitle>Characters</CardTitle>
                <CardDescription>People and their roles</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">Identify key figures, family lines, and roles—from Adam to Joseph’s brothers.</CardContent>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition flex flex-col" onClick={() => navigate("/bible-questions-and-answers-hub/genesis/match-the-following")}> 
              <CardHeader>
                <CardTitle>Match the Following</CardTitle>
                <CardDescription>Pair people, places, and ideas</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-gray-700">Strengthen associations—match names with events, places, and symbols found in Genesis.</CardContent>
            </Card>
          </div>
        </section>

        {/* Genesis Chapter 5 Full Text */}
        <section id="genesis-chapter-5-text" className="mt-12 scroll-mt-24">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Genesis Chapter 5 - Full Text</h2>
          </div>
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-indigo-700">Adam's Descendants to Noah</CardTitle>
              <CardDescription>Complete text of Genesis Chapter 5</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <pre className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed text-sm">
                  {chapter5FullText}
                </pre>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer (same as homepage) */}
      <footer className="bg-[#181c3a] text-gray-200 pt-16 pb-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-12">
          <div className="flex-1 min-w-[220px] flex flex-col items-start mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Bible Quiz Competition</span>
            </div>
            <p className="mb-4 text-gray-300 max-w-xs">Empower your faith with fun, challenging Bible quizzes for all ages. Compete, learn, and grow in your knowledge of Scripture!</p>
            <p className="text-gray-400 text-sm">Need help? Email <a href="mailto:info@biblequizcompetition.com" className="underline">info@biblequizcompetition.com</a></p>
          </div>
          <div className="flex flex-1 flex-col sm:flex-row justify-end gap-12">
            <div>
              <h4 className="font-bold text-white mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:underline text-gray-300">About</a></li>
                <li><a href="#features" className="hover:underline text-gray-300">Features</a></li>
                <li><a href="/public-leaderboard" className="hover:underline text-gray-300">Leaderboard</a></li>
                <li><a href="#faq" className="hover:underline text-gray-300">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#privacy" className="hover:underline text-gray-300">Privacy</a></li>
                <li><a href="#terms" className="hover:underline text-gray-300">Terms</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 border-t border-blue-900 pt-6 text-center text-white text-sm">
          © 2024 QuizMaster. All rights reserved.
        </div>
      </footer>
    </div>
  );
}