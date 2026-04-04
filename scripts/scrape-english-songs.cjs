/**
 * English Christian Hymns Scraper - hymnal.net
 * Extracts: title, lyrics (verses), category
 * Then finds YouTube videos
 * Outputs to: src/data/english-songs.json
 */

const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'english-songs.json');
const DELAY_MS = 1500;

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('/') ? 'https://www.hymnal.net' + res.headers.location : res.headers.location;
        return httpGet(loc).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').substring(0, 80);
}

// Step 1: Get all hymn URLs from the A-Z index
async function getHymnUrls() {
  console.log('📡 Fetching hymn index pages...');
  const letters = 'ABCDEFGHIJKLMNOPRSTUVWYZ'.split(''); // Q, X not in hymnal
  let allUrls = [];

  for (const letter of letters) {
    const indexUrl = `https://www.hymnal.net/en/song-index/h/${letter}`;
    try {
      const html = await httpGet(indexUrl);
      const $ = cheerio.load(html);
      // Links to hymns look like /en/hymn/h/313
      const regex = /\/en\/hymn\/h\/(\d+[a-z]?)/g;
      let match;
      while ((match = regex.exec(html)) !== null) {
        const hymnUrl = `https://www.hymnal.net/en/hymn/h/${match[1]}`;
        if (!allUrls.includes(hymnUrl)) allUrls.push(hymnUrl);
      }
      process.stdout.write(`${letter}(${allUrls.length}) `);
      await sleep(500);
    } catch (e) {
      console.log(`Error on ${letter}: ${e.message}`);
    }
  }
  console.log(`\n📋 Found ${allUrls.length} unique hymn URLs`);
  return allUrls.slice(0, 500); // Cap at 500
}

// Step 2: Scrape a single hymn
async function scrapeHymn(url) {
  const html = await httpGet(url);
  const $ = cheerio.load(html);

  // Title
  let title = $('title').text().replace('Hymn: ', '').replace(' - hymnal.net', '').trim();
  if (!title) return null;

  // Category from details
  let category = '';
  const detailLinks = $('a[href*="/search/all/category/"]');
  if (detailLinks.length > 0) category = detailLinks.first().text().trim();

  // Lyrics from stanza structure
  const verses = [];
  $('div[data-type="verse"], div[data-type="chorus"]').each((_, el) => {
    const type = $(el).attr('data-type');
    const verseNum = $(el).find('.verse-num span').text().trim();
    const textContainer = $(el).find('.text-container');
    
    if (textContainer.length) {
      const lyricsHtml = textContainer.html();
      const lines = lyricsHtml
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .split('\n')
        .map(l => l.trim())
        .filter(l => l);

      if (lines.length > 0) {
        verses.push({
          verse: type === 'chorus' ? 'Chorus' : (verseNum || undefined),
          lines
        });
      }
    }
  });

  if (verses.length === 0) return null;

  const slug = slugify(title);

  return {
    id: slug.replace(/-/g, '_').substring(0, 50),
    slug,
    title,
    category,
    videoUrl: '',
    description: `${title} - Christian Hymn Lyrics`,
    translations: {
      english: {
        lang: 'English',
        lyrics: verses
      }
    }
  };
}

// Step 3: Find YouTube video
async function searchYouTube(songTitle) {
  const query = encodeURIComponent(`${songTitle} hymn lyrics`);
  const searchUrl = `https://www.youtube.com/results?search_query=${query}`;
  try {
    const html = await httpGet(searchUrl);
    const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  } catch (e) {}
  return '';
}

// Main
async function main() {
  const urls = await getHymnUrls();
  const songs = [];
  let success = 0, fail = 0;

  console.log(`\n🎵 Scraping lyrics for ${urls.length} hymns...\n`);

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const hymnId = url.split('/').pop();
    process.stdout.write(`[${i+1}/${urls.length}] Hymn #${hymnId}... `);

    try {
      const song = await scrapeHymn(url);
      if (song) {
        songs.push(song);
        success++;
        console.log(`✅ "${song.title}" (${song.translations.english.lyrics.length} verses)`);
      } else {
        fail++;
        console.log('⏭️  Skipped');
      }
    } catch (e) {
      fail++;
      console.log(`❌ ${e.message}`);
    }

    if ((i+1) % 50 === 0) {
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(songs, null, 2));
      console.log(`\n💾 Progress: ${songs.length} songs saved\n`);
    }
    await sleep(DELAY_MS);
  }

  // Save before YouTube phase
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(songs, null, 2));
  console.log(`\n✅ Lyrics scraped: ${success} | Skipped: ${fail}`);
  console.log(`\n🔍 Now finding YouTube videos...\n`);

  // YouTube phase
  let ytFound = 0;
  for (let i = 0; i < songs.length; i++) {
    process.stdout.write(`[${i+1}/${songs.length}] "${songs[i].title}"... `);
    const embedUrl = await searchYouTube(songs[i].title);
    if (embedUrl) {
      songs[i].videoUrl = embedUrl;
      ytFound++;
      console.log(`✅ ${embedUrl.split('/').pop()}`);
    } else {
      console.log('⏭️  No result');
    }
    if ((i+1) % 50 === 0) {
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(songs, null, 2));
      console.log(`\n💾 YouTube progress: ${ytFound} found\n`);
    }
    await sleep(DELAY_MS);
  }

  // Final save
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(songs, null, 2));
  console.log(`\n═══════════════════════════════════════`);
  console.log(`✅ Total songs: ${songs.length}`);
  console.log(`🎬 YouTube links: ${ytFound}`);
  console.log(`═══════════════════════════════════════`);
  console.log(`📁 Saved to: ${OUTPUT_FILE}`);
}

main().catch(console.error);
