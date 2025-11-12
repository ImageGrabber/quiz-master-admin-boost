// Bible Reading Plan Algorithm
// 365-day plan with Old Testament and New Testament readings each day

interface DailyReading {
  day: number;
  oldTestament: {
    book: string;
    chapters: string;
    reference: string;
  };
  newTestament: {
    book: string;
    chapters: string;
    reference: string;
  };
}

// Calculate day of year (1-365)
export function getDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Get today's Bible readings based on the 365-day plan
export function getTodaysReadings(day?: number): DailyReading {
  const dayOfYear = day || getDayOfYear();
  
  // Day 1-100: Genesis → Deuteronomy + Matthew → John
  if (dayOfYear >= 1 && dayOfYear <= 100) {
    return getReadingsDay1To100(dayOfYear);
  }
  // Day 101-200: Joshua → 2 Kings + Acts → Romans
  else if (dayOfYear >= 101 && dayOfYear <= 200) {
    return getReadingsDay101To200(dayOfYear);
  }
  // Day 201-300: 1 Chronicles → Song of Solomon + 1 Corinthians → Ephesians
  else if (dayOfYear >= 201 && dayOfYear <= 300) {
    return getReadingsDay201To300(dayOfYear);
  }
  // Day 301-365: Isaiah → Malachi + Philippians → Revelation
  else {
    return getReadingsDay301To365(dayOfYear);
  }
}

// Helper function to get reading for a book range
function getReadingForBookRange(
  dayInRange: number,
  books: Array<{ name: string; chapters: number; readingsPerChapter?: number }>,
  totalDays: number
): { book: string; chapters: string; reference: string } {
  // Calculate total chapters across all books
  let totalChapters = 0;
  const bookRanges: Array<{ book: string; startChapter: number; endChapter: number }> = [];
  
  for (const book of books) {
    const readingsPerChapter = book.readingsPerChapter || 1;
    const bookChapters = book.chapters * readingsPerChapter;
    const startChapter = totalChapters;
    const endChapter = totalChapters + bookChapters - 1;
    bookRanges.push({
      book: book.name,
      startChapter,
      endChapter,
    });
    totalChapters += bookChapters;
  }
  
  // Find which book and chapter for this day
  const chapterIndex = Math.floor((dayInRange - 1) * totalChapters / totalDays);
  
  for (const range of bookRanges) {
    if (chapterIndex >= range.startChapter && chapterIndex <= range.endChapter) {
      const relativeChapter = chapterIndex - range.startChapter;
      const actualChapter = Math.floor(relativeChapter / (books.find(b => b.name === range.book)?.readingsPerChapter || 1)) + 1;
      return {
        book: range.book,
        chapters: `${actualChapter}`,
        reference: `${range.book} ${actualChapter}`,
      };
    }
  }
  
  // Fallback
  return {
    book: books[0].name,
    chapters: "1",
    reference: `${books[0].name} 1`,
  };
}

// Day 1-100: Genesis → Deuteronomy + Matthew → John
function getReadingsDay1To100(day: number): DailyReading {
  // Old Testament: Genesis → Deuteronomy (Pentateuch)
  const otReadings = [
    // Genesis (50 chapters)
    { book: "Genesis", chapters: "1-2" },
    { book: "Genesis", chapters: "3-5" },
    { book: "Genesis", chapters: "6-8" },
    { book: "Genesis", chapters: "9-11" },
    { book: "Genesis", chapters: "12-14" },
    { book: "Genesis", chapters: "15-17" },
    { book: "Genesis", chapters: "18-19" },
    { book: "Genesis", chapters: "20-22" },
    { book: "Genesis", chapters: "23-24" },
    { book: "Genesis", chapters: "25-26" },
    { book: "Genesis", chapters: "27-28" },
    { book: "Genesis", chapters: "29-30" },
    { book: "Genesis", chapters: "31-32" },
    { book: "Genesis", chapters: "33-35" },
    { book: "Genesis", chapters: "36-37" },
    { book: "Genesis", chapters: "38-40" },
    { book: "Genesis", chapters: "41-42" },
    { book: "Genesis", chapters: "43-45" },
    { book: "Genesis", chapters: "46-47" },
    { book: "Genesis", chapters: "48-50" },
    // Exodus (40 chapters)
    { book: "Exodus", chapters: "1-3" },
    { book: "Exodus", chapters: "4-6" },
    { book: "Exodus", chapters: "7-9" },
    { book: "Exodus", chapters: "10-12" },
    { book: "Exodus", chapters: "13-15" },
    { book: "Exodus", chapters: "16-18" },
    { book: "Exodus", chapters: "19-21" },
    { book: "Exodus", chapters: "22-24" },
    { book: "Exodus", chapters: "25-27" },
    { book: "Exodus", chapters: "28-30" },
    { book: "Exodus", chapters: "31-33" },
    { book: "Exodus", chapters: "34-36" },
    { book: "Exodus", chapters: "37-40" },
    // Leviticus (27 chapters)
    { book: "Leviticus", chapters: "1-3" },
    { book: "Leviticus", chapters: "4-6" },
    { book: "Leviticus", chapters: "7-9" },
    { book: "Leviticus", chapters: "10-12" },
    { book: "Leviticus", chapters: "13-15" },
    { book: "Leviticus", chapters: "16-18" },
    { book: "Leviticus", chapters: "19-21" },
    { book: "Leviticus", chapters: "22-24" },
    { book: "Leviticus", chapters: "25-27" },
    // Numbers (36 chapters)
    { book: "Numbers", chapters: "1-3" },
    { book: "Numbers", chapters: "4-6" },
    { book: "Numbers", chapters: "7-9" },
    { book: "Numbers", chapters: "10-12" },
    { book: "Numbers", chapters: "13-15" },
    { book: "Numbers", chapters: "16-18" },
    { book: "Numbers", chapters: "19-21" },
    { book: "Numbers", chapters: "22-24" },
    { book: "Numbers", chapters: "25-27" },
    { book: "Numbers", chapters: "28-30" },
    { book: "Numbers", chapters: "31-33" },
    { book: "Numbers", chapters: "34-36" },
    // Deuteronomy (34 chapters)
    { book: "Deuteronomy", chapters: "1-3" },
    { book: "Deuteronomy", chapters: "4-6" },
    { book: "Deuteronomy", chapters: "7-9" },
    { book: "Deuteronomy", chapters: "10-12" },
    { book: "Deuteronomy", chapters: "13-15" },
    { book: "Deuteronomy", chapters: "16-18" },
    { book: "Deuteronomy", chapters: "19-21" },
    { book: "Deuteronomy", chapters: "22-24" },
    { book: "Deuteronomy", chapters: "25-27" },
    { book: "Deuteronomy", chapters: "28-30" },
    { book: "Deuteronomy", chapters: "31-34" },
  ];

  // New Testament: Matthew → John
  const ntReadings = [
    // Matthew (28 chapters)
    { book: "Matthew", chapters: "1" },
    { book: "Matthew", chapters: "2" },
    { book: "Matthew", chapters: "3" },
    { book: "Matthew", chapters: "4" },
    { book: "Matthew", chapters: "5:1-26" },
    { book: "Matthew", chapters: "5:27-48" },
    { book: "Matthew", chapters: "6:1-18" },
    { book: "Matthew", chapters: "6:19-34" },
    { book: "Matthew", chapters: "7" },
    { book: "Matthew", chapters: "8:1-17" },
    { book: "Matthew", chapters: "8:18-34" },
    { book: "Matthew", chapters: "9:1-17" },
    { book: "Matthew", chapters: "9:18-38" },
    { book: "Matthew", chapters: "10:1-23" },
    { book: "Matthew", chapters: "10:24-42" },
    { book: "Matthew", chapters: "11" },
    { book: "Matthew", chapters: "12:1-21" },
    { book: "Matthew", chapters: "12:22-50" },
    { book: "Matthew", chapters: "13:1-23" },
    { book: "Matthew", chapters: "13:24-58" },
    { book: "Matthew", chapters: "14" },
    { book: "Matthew", chapters: "15:1-20" },
    { book: "Matthew", chapters: "15:21-39" },
    { book: "Matthew", chapters: "16" },
    { book: "Matthew", chapters: "17" },
    { book: "Matthew", chapters: "18:1-20" },
    { book: "Matthew", chapters: "18:21-35" },
    { book: "Matthew", chapters: "19" },
    { book: "Matthew", chapters: "20" },
    { book: "Matthew", chapters: "21:1-22" },
    { book: "Matthew", chapters: "21:23-46" },
    { book: "Matthew", chapters: "22" },
    { book: "Matthew", chapters: "23" },
    { book: "Matthew", chapters: "24:1-28" },
    { book: "Matthew", chapters: "24:29-51" },
    { book: "Matthew", chapters: "25:1-30" },
    { book: "Matthew", chapters: "25:31-46" },
    { book: "Matthew", chapters: "26:1-30" },
    { book: "Matthew", chapters: "26:31-75" },
    { book: "Matthew", chapters: "27:1-31" },
    { book: "Matthew", chapters: "27:32-66" },
    { book: "Matthew", chapters: "28" },
    // Mark (16 chapters)
    { book: "Mark", chapters: "1" },
    { book: "Mark", chapters: "2" },
    { book: "Mark", chapters: "3" },
    { book: "Mark", chapters: "4" },
    { book: "Mark", chapters: "5" },
    { book: "Mark", chapters: "6:1-29" },
    { book: "Mark", chapters: "6:30-56" },
    { book: "Mark", chapters: "7" },
    { book: "Mark", chapters: "8" },
    { book: "Mark", chapters: "9:1-29" },
    { book: "Mark", chapters: "9:30-50" },
    { book: "Mark", chapters: "10:1-31" },
    { book: "Mark", chapters: "10:32-52" },
    { book: "Mark", chapters: "11" },
    { book: "Mark", chapters: "12" },
    { book: "Mark", chapters: "13" },
    { book: "Mark", chapters: "14:1-31" },
    { book: "Mark", chapters: "14:32-72" },
    { book: "Mark", chapters: "15" },
    { book: "Mark", chapters: "16" },
    // Luke (24 chapters)
    { book: "Luke", chapters: "1:1-38" },
    { book: "Luke", chapters: "1:39-80" },
    { book: "Luke", chapters: "2" },
    { book: "Luke", chapters: "3" },
    { book: "Luke", chapters: "4" },
    { book: "Luke", chapters: "5" },
    { book: "Luke", chapters: "6:1-26" },
    { book: "Luke", chapters: "6:27-49" },
    { book: "Luke", chapters: "7" },
    { book: "Luke", chapters: "8:1-25" },
    { book: "Luke", chapters: "8:26-56" },
    { book: "Luke", chapters: "9:1-27" },
    { book: "Luke", chapters: "9:28-62" },
    { book: "Luke", chapters: "10" },
    { book: "Luke", chapters: "11:1-28" },
    { book: "Luke", chapters: "11:29-54" },
    { book: "Luke", chapters: "12:1-34" },
    { book: "Luke", chapters: "12:35-59" },
    { book: "Luke", chapters: "13" },
    { book: "Luke", chapters: "14" },
    { book: "Luke", chapters: "15" },
    { book: "Luke", chapters: "16" },
    { book: "Luke", chapters: "17" },
    { book: "Luke", chapters: "18" },
    { book: "Luke", chapters: "19" },
    { book: "Luke", chapters: "20" },
    { book: "Luke", chapters: "21" },
    { book: "Luke", chapters: "22:1-38" },
    { book: "Luke", chapters: "22:39-71" },
    { book: "Luke", chapters: "23" },
    { book: "Luke", chapters: "24" },
    // John (21 chapters)
    { book: "John", chapters: "1" },
    { book: "John", chapters: "2" },
    { book: "John", chapters: "3" },
    { book: "John", chapters: "4:1-26" },
    { book: "John", chapters: "4:27-54" },
    { book: "John", chapters: "5" },
    { book: "John", chapters: "6:1-21" },
    { book: "John", chapters: "6:22-71" },
    { book: "John", chapters: "7" },
    { book: "John", chapters: "8:1-30" },
    { book: "John", chapters: "8:31-59" },
    { book: "John", chapters: "9" },
    { book: "John", chapters: "10" },
    { book: "John", chapters: "11" },
    { book: "John", chapters: "12" },
    { book: "John", chapters: "13" },
    { book: "John", chapters: "14" },
    { book: "John", chapters: "15" },
    { book: "John", chapters: "16" },
    { book: "John", chapters: "17" },
    { book: "John", chapters: "18" },
    { book: "John", chapters: "19" },
    { book: "John", chapters: "20" },
    { book: "John", chapters: "21" },
  ];

  const otIndex = (day - 1) % otReadings.length;
  const ntIndex = (day - 1) % ntReadings.length;

  return {
    day: day,
    oldTestament: {
      book: otReadings[otIndex].book,
      chapters: otReadings[otIndex].chapters,
      reference: `${otReadings[otIndex].book} ${otReadings[otIndex].chapters}`,
    },
    newTestament: {
      book: ntReadings[ntIndex].book,
      chapters: ntReadings[ntIndex].chapters,
      reference: `${ntReadings[ntIndex].book} ${ntReadings[ntIndex].chapters}`,
    },
  };
}

// Day 101-200: Joshua → 2 Kings + Acts → Romans
function getReadingsDay101To200(day: number): DailyReading {
  const dayInRange = day - 100;
  
  // Old Testament: Joshua → 2 Kings
  const otBooks = [
    { name: "Joshua", chapters: 24 },
    { name: "Judges", chapters: 21 },
    { name: "Ruth", chapters: 4 },
    { name: "1 Samuel", chapters: 31 },
    { name: "2 Samuel", chapters: 24 },
    { name: "1 Kings", chapters: 22 },
    { name: "2 Kings", chapters: 25 },
  ];
  
  // New Testament: Acts → Romans
  const ntBooks = [
    { name: "Acts", chapters: 28 },
    { name: "Romans", chapters: 16 },
  ];
  
  // Calculate readings (simplified - cycles through books)
  const otBookIndex = Math.floor((dayInRange - 1) / Math.ceil(100 / otBooks.length)) % otBooks.length;
  const otChapter = ((dayInRange - 1) % otBooks[otBookIndex].chapters) + 1;
  
  const ntBookIndex = Math.floor((dayInRange - 1) / Math.ceil(100 / ntBooks.length)) % ntBooks.length;
  const ntChapter = ((dayInRange - 1) % ntBooks[ntBookIndex].chapters) + 1;
  
  return {
    day: day,
    oldTestament: {
      book: otBooks[otBookIndex].name,
      chapters: `${otChapter}`,
      reference: `${otBooks[otBookIndex].name} ${otChapter}`,
    },
    newTestament: {
      book: ntBooks[ntBookIndex].name,
      chapters: `${ntChapter}`,
      reference: `${ntBooks[ntBookIndex].name} ${ntChapter}`,
    },
  };
}

// Day 201-300: 1 Chronicles → Song of Solomon + 1 Corinthians → Ephesians
function getReadingsDay201To300(day: number): DailyReading {
  const dayInRange = day - 200;
  
  // Old Testament: 1 Chronicles → Song of Solomon
  const otBooks = [
    { name: "1 Chronicles", chapters: 29 },
    { name: "2 Chronicles", chapters: 36 },
    { name: "Ezra", chapters: 10 },
    { name: "Nehemiah", chapters: 13 },
    { name: "Esther", chapters: 10 },
    { name: "Job", chapters: 42 },
    { name: "Psalms", chapters: 150 },
    { name: "Proverbs", chapters: 31 },
    { name: "Ecclesiastes", chapters: 12 },
    { name: "Song of Solomon", chapters: 8 },
  ];
  
  // New Testament: 1 Corinthians → Ephesians
  const ntBooks = [
    { name: "1 Corinthians", chapters: 16 },
    { name: "2 Corinthians", chapters: 13 },
    { name: "Galatians", chapters: 6 },
    { name: "Ephesians", chapters: 6 },
  ];
  
  // Calculate readings
  const otBookIndex = Math.floor((dayInRange - 1) / Math.ceil(100 / otBooks.length)) % otBooks.length;
  const otChapter = ((dayInRange - 1) % otBooks[otBookIndex].chapters) + 1;
  
  const ntBookIndex = Math.floor((dayInRange - 1) / Math.ceil(100 / ntBooks.length)) % ntBooks.length;
  const ntChapter = ((dayInRange - 1) % ntBooks[ntBookIndex].chapters) + 1;
  
  return {
    day: day,
    oldTestament: {
      book: otBooks[otBookIndex].name,
      chapters: `${otChapter}`,
      reference: `${otBooks[otBookIndex].name} ${otChapter}`,
    },
    newTestament: {
      book: ntBooks[ntBookIndex].name,
      chapters: `${ntChapter}`,
      reference: `${ntBooks[ntBookIndex].name} ${ntChapter}`,
    },
  };
}

// Day 301-365: Isaiah → Malachi + Philippians → Revelation
function getReadingsDay301To365(day: number): DailyReading {
  const dayInRange = day - 300;
  
  // Build sequential reading arrays for OT and NT
  // Old Testament: Isaiah → Malachi (Prophets)
  const otReadings: Array<{ book: string; chapter: number }> = [];
  const otBooks = [
    { name: "Isaiah", chapters: 66 },
    { name: "Jeremiah", chapters: 52 },
    { name: "Lamentations", chapters: 5 },
    { name: "Ezekiel", chapters: 48 },
    { name: "Daniel", chapters: 12 },
    { name: "Hosea", chapters: 14 },
    { name: "Joel", chapters: 3 },
    { name: "Amos", chapters: 9 },
    { name: "Obadiah", chapters: 1 },
    { name: "Jonah", chapters: 4 },
    { name: "Micah", chapters: 7 },
    { name: "Nahum", chapters: 3 },
    { name: "Habakkuk", chapters: 3 },
    { name: "Zephaniah", chapters: 3 },
    { name: "Haggai", chapters: 2 },
    { name: "Zechariah", chapters: 14 },
    { name: "Malachi", chapters: 4 },
  ];
  
  // Create sequential list of all OT chapters
  for (const book of otBooks) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      otReadings.push({ book: book.name, chapter: ch });
    }
  }
  
  // New Testament: Philippians → Revelation
  const ntReadings: Array<{ book: string; chapter: number }> = [];
  const ntBooks = [
    { name: "Philippians", chapters: 4 },
    { name: "Colossians", chapters: 4 },
    { name: "1 Thessalonians", chapters: 5 },
    { name: "2 Thessalonians", chapters: 3 },
    { name: "1 Timothy", chapters: 6 },
    { name: "2 Timothy", chapters: 4 },
    { name: "Titus", chapters: 3 },
    { name: "Philemon", chapters: 1 },
    { name: "Hebrews", chapters: 13 },
    { name: "James", chapters: 5 },
    { name: "1 Peter", chapters: 5 },
    { name: "2 Peter", chapters: 3 },
    { name: "1 John", chapters: 5 },
    { name: "2 John", chapters: 1 },
    { name: "3 John", chapters: 1 },
    { name: "Jude", chapters: 1 },
    { name: "Revelation", chapters: 22 },
  ];
  
  // Create sequential list of all NT chapters
  for (const book of ntBooks) {
    for (let ch = 1; ch <= book.chapters; ch++) {
      ntReadings.push({ book: book.name, chapter: ch });
    }
  }
  
  // Calculate which chapters to read based on day
  // Distribute OT chapters (250 total) over 65 days: ~3.85 chapters per day
  // Distribute NT chapters (85 total) over 65 days: ~1.31 chapters per day
  const otChaptersPerDay = otReadings.length / 65;
  const ntChaptersPerDay = ntReadings.length / 65;
  
  const otStartIndex = Math.floor((dayInRange - 1) * otChaptersPerDay);
  const otEndIndex = Math.min(otReadings.length - 1, Math.floor(dayInRange * otChaptersPerDay));
  const otReading = otReadings[otStartIndex];
  
  const ntStartIndex = Math.floor((dayInRange - 1) * ntChaptersPerDay);
  const ntEndIndex = Math.min(ntReadings.length - 1, Math.floor(dayInRange * ntChaptersPerDay));
  const ntReading = ntReadings[ntStartIndex];
  
  // Format chapter range if multiple chapters
  let otChapters = `${otReading.chapter}`;
  if (otEndIndex > otStartIndex && otReadings[otEndIndex].book === otReading.book) {
    otChapters = `${otReading.chapter}-${otReadings[otEndIndex].chapter}`;
  }
  
  let ntChapters = `${ntReading.chapter}`;
  if (ntEndIndex > ntStartIndex && ntReadings[ntEndIndex].book === ntReading.book) {
    ntChapters = `${ntReading.chapter}-${ntReadings[ntEndIndex].chapter}`;
  }
  
  return {
    day: day,
    oldTestament: {
      book: otReading.book,
      chapters: otChapters,
      reference: `${otReading.book} ${otChapters}`,
    },
    newTestament: {
      book: ntReading.book,
      chapters: ntChapters,
      reference: `${ntReading.book} ${ntChapters}`,
    },
  };
}
