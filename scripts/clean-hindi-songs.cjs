const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'hindi-songs.json');
if (!fs.existsSync(filePath)) {
  console.log('File not found:', filePath);
  process.exit(1);
}

const songs = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const englishBlacklist = [
  'A MIGHTY FORTRESS',
  'ABIDE WITH ME',
  'SILENT NIGHT',
  'JOY TO THE WORLD',
  'HARK THE HERALD',
  'JINGLE BELLS',
  'O COME ALL YE FAITHFUL',
  'ONCE IN ROYAL DAVID\'S CITY',
  'DECK THE HALLS',
  'STAY BY OUR SIDE',
  'JESUS IS HERE NOW',
  'JOY TO THE WORLD',
  'AMAZING GRACE',
  'HOW GREAT THOU ART',
  'WHAT A FRIEND WE HAVE IN JESUS'
];

const filteredSongs = songs.filter(song => {
  const title = song.title.toUpperCase();
  
  // 1. Check blacklist
  if (englishBlacklist.some(item => title.includes(item))) {
    console.log('Removing blacklisted:', song.title);
    return false;
  }
  
  // 2. Heuristic check: If it's all uppercase Latin and doesn't contain common Hindi/Urdu keywords
  const isAllLatinTitle = /^[A-Z0-9\s\-\.\!\,\(\)\']+$/.test(title);
  const hindiKeywords = [
    'YESHU', 'MASIH', 'AARADHNA', 'KHUDA', 'YAHOVA', 'PRABHU', 'MERA', 'MAHIMA', 'STUTI', 'JAI', 'PITAAJI', 
    'KRIST', 'TUJHE', 'TERI', 'DHANYAWAD', 'RAJA', 'DUNIYA', 'ROOH', 'BACHA', 'CHARNI', 'SITARA', 'GEET',
    'MAA', 'BOLO', 'HAMARE', 'PAAS', 'ZINDA', 'KURBAAN', 'KHAZANA', 'MASIHA', 'HUMD', 'JALAL'
  ];
  
  if (isAllLatinTitle) {
    const hasHindiWord = hindiKeywords.some(kw => title.includes(kw));
    if (!hasHindiWord && title.split(' ').length > 2) {
       console.log('Removing potential English song:', song.title);
       return false;
    }
  }

  return true;
});

console.log(`Original: ${songs.length} | Filtered: ${filteredSongs.length} | Removed: ${songs.length - filteredSongs.length}`);
fs.writeFileSync(filePath, JSON.stringify(filteredSongs, null, 2));
console.log('Cleaned JSON saved.');
