const fs = require('fs');
const path = require('path');

const SONGS_FILE = path.join(__dirname, "..", "src", "data", "hindi-songs.json");
const OUTPUT_DIR = path.join(__dirname, "..", "src", "data", "hindi-songs");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function getFirstLetter(song) {
  let text = song.slug || song.id || song.title || "";
  text = text.trim();
  if (!text) return "other";
  const char = text[0].toLowerCase();
  if (char >= 'a' && char <= 'z') return char;
  return "other";
}

function main() {
  const rawData = fs.readFileSync(SONGS_FILE, "utf-8");
  const songs = JSON.parse(rawData);
  
  const groups = {};
  
  for (const song of songs) {
    const letter = getFirstLetter(song);
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(song);
  }
  
  const allFiles = [];
  
  // Create JSON files
  for (const letter in groups) {
    const fileName = `${letter}.json`;
    const filePath = path.join(OUTPUT_DIR, fileName);
    fs.writeFileSync(filePath, JSON.stringify(groups[letter], null, 2));
    allFiles.push(fileName);
    console.log(`Created ${fileName} with ${groups[letter].length} songs`);
  }
  
  // Create index.ts
  let indexTsContent = "";
  for (const letter in groups) {
    indexTsContent += `import ${letter} from './${letter}.json';\n`;
  }
  indexTsContent += `\nexport const hindiSongs = [\n`;
  for (const letter in groups) {
    indexTsContent += `  ...${letter},\n`;
  }
  indexTsContent += `];\n`;
  indexTsContent += `export default hindiSongs;\n`;
  
  fs.writeFileSync(path.join(OUTPUT_DIR, "index.ts"), indexTsContent);
  console.log("Created index.ts");
}

main();
