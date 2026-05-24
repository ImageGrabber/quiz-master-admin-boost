const fs = require('fs');
const path = require('path');

const SONGS_DIR = path.join(__dirname, '..', 'src', 'data', 'hindi-songs');

function getFirstLetter(song) {
  let text = song.slug || song.id || song.title || "";
  text = text.trim();
  if (!text) return "other";
  const char = text[0].toLowerCase();
  if (char >= 'a' && char <= 'z') return char;
  return "other";
}

function readHindiSongs() {
  if (!fs.existsSync(SONGS_DIR)) {
    return [];
  }
  
  const files = fs.readdirSync(SONGS_DIR).filter(f => f.endsWith('.json'));
  let allSongs = [];
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(SONGS_DIR, file), 'utf-8');
    try {
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        allSongs = allSongs.concat(parsed);
      }
    } catch (e) {
      console.error(`Error parsing ${file}:`, e);
    }
  }
  
  return allSongs;
}

function writeHindiSongs(songs) {
  if (!fs.existsSync(SONGS_DIR)) {
    fs.mkdirSync(SONGS_DIR, { recursive: true });
  }
  
  const groups = {};
  for (const song of songs) {
    const letter = getFirstLetter(song);
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(song);
  }
  
  for (const letter in groups) {
    const fileName = `${letter}.json`;
    const filePath = path.join(SONGS_DIR, fileName);
    fs.writeFileSync(filePath, JSON.stringify(groups[letter], null, 2));
  }
}

module.exports = { readHindiSongs, writeHindiSongs, SONGS_DIR };
