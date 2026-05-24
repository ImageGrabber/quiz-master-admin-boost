/**
 * Batch-fixes corrupted Hindi lyrics and adds missing English/Malayalam translations.
 * 
 * Usage:
 *   node scripts/fix-corrupted-lyrics.cjs
 *   MAX_LOOKUPS=5 node scripts/fix-corrupted-lyrics.cjs
 */

const fs = require("fs");
const path = require("path");

// Load .env if it exists
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let key = match[1];
      let value = match[2] || "";
      value = value.trim();
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const { readHindiSongs, writeHindiSongs } = require('./hindi-songs-util.cjs');
const DELAY_MS = Number(process.env.DELAY_MS || 2000);
const MAX_LOOKUPS = Number(process.env.MAX_LOOKUPS || 0); // 0 means all
const GEMINI_API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.GEMINI;

if (!GEMINI_API_KEY) {
  console.error("Please set VITE_GEMINI_API_KEY, GEMINI_API_KEY or GEMINI in your .env file or environment.");
  process.exit(1);
}

console.log("Using API Key of length:", GEMINI_API_KEY.length);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Check if lyrics contain very few Devanagari characters
function isCorruptedHindi(lyricsArray) {
  if (!lyricsArray || !lyricsArray.length) return false;
  let totalChars = 0;
  let devanagariChars = 0;
  
  for (const block of lyricsArray) {
    if (block.lines) {
      for (const line of block.lines) {
        totalChars += line.length;
        const matches = line.match(/[\u0900-\u097F]/g);
        if (matches) {
          devanagariChars += matches.length;
        }
      }
    }
  }
  
  if (totalChars > 0 && devanagariChars / totalChars < 0.1) {
    return true;
  }
  return false;
}

function getLyricsText(lyricsArray) {
  if (!lyricsArray || !lyricsArray.length) return "";
  return lyricsArray.map(b => {
    let text = "";
    if (b.verse) text += `[${b.verse}]\n`;
    if (b.lines) text += b.lines.join("\n");
    return text;
  }).join("\n\n");
}

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    })
  });
  
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API error: ${response.status} ${err}`);
  }
  
  const data = await response.json();
  let content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) throw new Error("No content returned");
  
  // Strip markdown backticks if present
  if (content.startsWith("```json")) {
    content = content.replace(/^```json\n/, "").replace(/\n```$/, "");
  } else if (content.startsWith("```")) {
    content = content.replace(/^```\n/, "").replace(/\n```$/, "");
  }
  
  return JSON.parse(content);
}

async function main() {
  const songs = readHindiSongs();
  
  const targets = [];
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const trans = song.translations || {};
    
    const needsHindiFix = trans.hindi && isCorruptedHindi(trans.hindi.lyrics);
    const needsEnglish = !trans.english || !trans.english.lyrics || trans.english.lyrics.length === 0;
    const needsMalayalam = !trans.malayalam || !trans.malayalam.lyrics || trans.malayalam.lyrics.length === 0;
    
    if (needsHindiFix || needsEnglish || needsMalayalam) {
      targets.push({ index: i, needsHindiFix, needsEnglish, needsMalayalam });
    }
  }
  
  const toProcess = MAX_LOOKUPS > 0 ? targets.slice(0, MAX_LOOKUPS) : targets;
  console.log(`Total songs: ${songs.length}`);
  console.log(`Songs needing fixes/translations: ${targets.length}`);
  console.log(`Processing now: ${toProcess.length}`);
  
  let processed = 0;
  
  for (const target of toProcess) {
    const song = songs[target.index];
    console.log(`[${processed + 1}/${toProcess.length}] Processing "${song.title}" (Hindi Fix: ${!!target.needsHindiFix}, English: ${!!target.needsEnglish}, Malayalam: ${!!target.needsMalayalam})`);
    
    const currentHindi = getLyricsText(song.translations?.hindi?.lyrics);
    
    const prompt = `
You are an expert at translating and recovering corrupted Hindi text.
We have a Hindi Christian song named "${song.title}".

Here is the current Hindi text:
"""
${currentHindi}
"""

Tasks based on needs:
1. Hindi Fix (${!!target.needsHindiFix}): The text might be corrupted (e.g. Kruti Dev encoded text displayed as ASCII). If so, convert it to proper Devanagari Hindi Unicode.
2. English (${!!target.needsEnglish}): Provide an English translation of the lyrics.
3. Malayalam (${!!target.needsMalayalam}): Provide a Malayalam translation of the lyrics.

Format your response STRICTLY as a JSON object with the following schema:
{
  "hindi": [
    { "verse": "Verse name (optional)", "lines": ["line 1", "line 2"] }
  ],
  "english": [
    { "verse": "Verse name (optional)", "lines": ["line 1", "line 2"] }
  ],
  "malayalam": [
    { "verse": "Verse name (optional)", "lines": ["line 1", "line 2"] }
  ]
}

Return ONLY the JSON. Do not include any markdown backticks.
`;

    try {
      const result = await callGemini(prompt);
      
      if (!song.translations) song.translations = {};
      
      if (target.needsHindiFix && result.hindi) {
        song.translations.hindi = {
          lang: "Hindi",
          lyrics: result.hindi
        };
      }
      
      if (target.needsEnglish && result.english) {
        song.translations.english = {
          lang: "English",
          lyrics: result.english
        };
      }
      
      if (target.needsMalayalam && result.malayalam) {
        song.translations.malayalam = {
          lang: "Malayalam",
          lyrics: result.malayalam
        };
      }
      
      processed++;
      
      // Save every song immediately to avoid losing progress
      writeHindiSongs(songs);
      console.log(`Saved "${song.title}"`);
      
    } catch (err) {
      console.error(`Failed to process "${song.title}":`, err.message);
    }
    
    await sleep(DELAY_MS);
  }
  
  console.log("Done.");
}

main().catch(console.error);
