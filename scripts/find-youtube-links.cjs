/**
 * YouTube Link Finder for migrated songs
 * Searches YouTube for each song title and adds the embed URL
 * Uses native https (no axios)
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const SONGS_FILE = path.join(__dirname, '..', 'src', 'data', 'migrated-songs.json');
const DELAY_MS = 2000; // Respectful delay between requests

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml'
      }
    };
    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpsGet(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function extractVideoId(html) {
  // YouTube embeds video IDs in multiple places in the initial HTML
  // Method 1: Look for "videoId":"XXXXX" in the ytInitialData JSON
  const patterns = [
    /"videoId":"([a-zA-Z0-9_-]{11})"/,
    /\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return match[1];
  }
  return null;
}

async function searchYouTube(songTitle) {
  const query = encodeURIComponent(`${songTitle} malayalam christian song lyrics`);
  const searchUrl = `https://www.youtube.com/results?search_query=${query}`;
  
  try {
    const html = await httpsGet(searchUrl);
    const videoId = extractVideoId(html);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (err) {
    // silently fail
  }
  return '';
}

async function main() {
  console.log('📂 Loading songs...');
  const songs = JSON.parse(fs.readFileSync(SONGS_FILE, 'utf-8'));
  
  const needsVideo = songs.filter(s => !s.videoUrl);
  const alreadyHas = songs.filter(s => s.videoUrl);
  console.log(`🎵 ${needsVideo.length} songs need YouTube links (${alreadyHas.length} already have one)\n`);

  let found = 0;
  let notFound = 0;

  for (let i = 0; i < needsVideo.length; i++) {
    const song = needsVideo[i];
    process.stdout.write(`[${i + 1}/${needsVideo.length}] "${song.title}"... `);

    const embedUrl = await searchYouTube(song.title);
    
    if (embedUrl) {
      song.videoUrl = embedUrl;
      found++;
      console.log(`✅ ${embedUrl.split('/').pop()}`);
    } else {
      notFound++;
      console.log('⏭️  No result');
    }

    // Save progress every 50 songs
    if ((i + 1) % 50 === 0) {
      fs.writeFileSync(SONGS_FILE, JSON.stringify(songs, null, 2));
      console.log(`\n💾 Progress saved (${found} found so far)\n`);
    }

    await sleep(DELAY_MS);
  }

  // Final save
  fs.writeFileSync(SONGS_FILE, JSON.stringify(songs, null, 2));

  console.log(`\n═══════════════════════════════════════════`);
  console.log(`✅ Found YouTube links: ${found}`);
  console.log(`⏭️  Not found: ${notFound}`);
  console.log(`═══════════════════════════════════════════`);
  console.log(`📁 Saved to: ${SONGS_FILE}`);
}

main().catch(console.error);
