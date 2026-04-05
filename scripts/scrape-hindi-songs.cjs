/**
 * Hindi Christian Songs Scraper - yeshukegeet.com
 * Extracts: title, Hindi lyrics
 * Then finds YouTube videos
 * Outputs to: src/data/hindi-songs.json
 */

const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'hindi-songs.json');
const DELAY_MS = 2000;
const MAX_SONGS = 500;

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const loc = res.headers.location.startsWith('/') ? 'https://www.yeshukegeet.com' + res.headers.location : res.headers.location;
        return httpGet(loc).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) return reject(new Error('Status ' + res.statusCode));
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

// Step 1: Collect song URLs from A-Z index pages
async function getSongUrls() {
  console.log('Fetching A-Z index pages...');
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const specialLetters = { 'g': 'gao-gao-aur-lalkaaro-c1w9h' };
  const allUrls = new Set();

  // Skip page patterns
  const skipPatterns = [
    'hindi-lyrics', 'piano', 'guitar', 'blog', 'about', 'contact', 'course',
    'tutorial', 'dholak', 'drum', 'garageband', 'tambourine', 'congo',
    'christian-songs', 'christian-music', 'rules', 'one-to-one', 'udemy',
    'youtube.com', 'push.fm', 'pianocourse', 'pianobasic', 'guitarbasic'
  ];

  for (const letter of letters) {
    const url = 'https://www.yeshukegeet.com/hindi-lyrics-' + letter;
    try {
      const html = await httpGet(url);
      const $ = cheerio.load(html);

      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (href && href.startsWith('https://www.yeshukegeet.com/') && href !== 'https://www.yeshukegeet.com') {
          const path = href.replace('https://www.yeshukegeet.com/', '');
          if (path && !skipPatterns.some(p => path.includes(p))) {
            allUrls.add(href);
          }
        }
      });
      process.stdout.write(letter.toUpperCase() + '(' + allUrls.size + ') ');
      await sleep(500);
    } catch (e) {
      process.stdout.write(letter.toUpperCase() + '(err) ');
    }
  }

  // Also try the special G page
  try {
    const html = await httpGet('https://www.yeshukegeet.com/' + specialLetters['g']);
    const $ = cheerio.load(html);
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && href.startsWith('https://www.yeshukegeet.com/') && href !== 'https://www.yeshukegeet.com') {
        const p = href.replace('https://www.yeshukegeet.com/', '');
        if (p && !skipPatterns.some(sk => p.includes(sk))) allUrls.add(href);
      }
    });
    process.stdout.write('G(' + allUrls.size + ') ');
  } catch (e) {}

  console.log('\nFound ' + allUrls.size + ' potential song URLs');
  return [...allUrls].slice(0, MAX_SONGS);
}

// Step 2: Scrape a single song page
async function scrapeSong(url) {
  const html = await httpGet(url);
  const $ = cheerio.load(html);

  // Title from the page - usually h1 or h2 or title tag
  let title = '';
  const pageTitle = $('title').text().trim();
  if (pageTitle) {
    title = pageTitle
      .replace(/\s*\|\s*Yeshu Ke Geet/i, '')
      .replace(/\s*-\s*Yeshu Ke Geet/i, '')
      .replace(/\s*Hindi Christian.*$/i, '')
      .replace(/\s*Lyrics.*$/i, '')
      .trim();
  }
  if (!title) {
    title = $('h1').first().text().trim() || $('h2').first().text().trim();
  }
  if (!title || title.length < 3) return null;

  // Extract lyrics - look for verse/lyrics content areas
  const verses = [];
  let foundLyrics = false;

  // Method 1: Look for main content sections with lyrics text
  // YeshuKeGeet typically has lyrics in paragraphs/divs within the main content
  const contentSelectors = [
    '.sqs-block-content p',
    '.html-block p',
    'article p',
    '.entry-content p',
    '.blog-item-content p',
    'main p',
    '.page-section p'
  ];

  for (const selector of contentSelectors) {
    $(selector).each((_, el) => {
      const text = $(el).text().trim();
      // Filter out non-lyrics content
      if (text.length > 10 && text.length < 2000 &&
          !text.includes('Subscribe') && !text.includes('Copyright') &&
          !text.includes('cookie') && !text.includes('Privacy') &&
          !text.includes('YouTube') && !text.includes('tutorial') &&
          !text.includes('instrument') && !text.includes('lesson')) {
        
        const lines = text.split('\n').map(l => l.trim()).filter(l => l && l.length > 2);
        if (lines.length > 0) {
          verses.push({ lines });
          foundLyrics = true;
        }
      }
    });
    if (foundLyrics) break;
  }

  // Method 2: Look for pre/code blocks that sometimes contain lyrics
  if (!foundLyrics) {
    $('pre, .preFade').each((_, el) => {
      const text = $(el).text().trim();
      if (text.length > 20) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length > 1) {
          verses.push({ lines });
          foundLyrics = true;
        }
      }
    });
  }

  if (!foundLyrics || verses.length === 0) return null;

  const slug = slugify(title);
  if (!slug) return null;

  return {
    id: slug.replace(/-/g, '_').substring(0, 50),
    slug,
    title,
    videoUrl: '',
    description: title + ' - Hindi Christian Devotional Song Lyrics',
    translations: {
      hindi: {
        lang: 'Hindi',
        lyrics: verses.map((v, i) => ({
          verse: i > 0 ? String(i) : undefined,
          lines: v.lines
        }))
      }
    }
  };
}

// Step 3: Find YouTube video
async function searchYouTube(songTitle) {
  const query = encodeURIComponent(songTitle + ' hindi christian song lyrics');
  const searchUrl = 'https://www.youtube.com/results?search_query=' + query;
  try {
    const html = await httpGet(searchUrl);
    const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    if (match) return 'https://www.youtube.com/embed/' + match[1];
  } catch (e) {}
  return '';
}

// Main
async function main() {
  const urls = await getSongUrls();
  const songs = [];
  let success = 0, fail = 0;

  console.log('\nScraping lyrics for ' + urls.length + ' songs...\n');

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const slug = url.split('/').pop();
    process.stdout.write('[' + (i+1) + '/' + urls.length + '] ' + slug + '... ');

    try {
      const song = await scrapeSong(url);
      if (song) {
        songs.push(song);
        success++;
        console.log('OK "' + song.title + '" (' + song.translations.hindi.lyrics.length + ' sections)');
      } else {
        fail++;
        console.log('SKIP (no lyrics)');
      }
    } catch (e) {
      fail++;
      console.log('ERR ' + e.message);
    }

    if ((i+1) % 50 === 0) {
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(songs, null, 2));
      console.log('\nSaved: ' + songs.length + ' songs\n');
    }
    await sleep(DELAY_MS);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(songs, null, 2));
  console.log('\nLyrics done: ' + success + ' scraped, ' + fail + ' skipped');
  console.log('\nFinding YouTube videos...\n');

  // YouTube phase
  let ytFound = 0;
  for (let i = 0; i < songs.length; i++) {
    process.stdout.write('[' + (i+1) + '/' + songs.length + '] "' + songs[i].title + '"... ');
    const embedUrl = await searchYouTube(songs[i].title);
    if (embedUrl) {
      songs[i].videoUrl = embedUrl;
      ytFound++;
      console.log('YT ' + embedUrl.split('/').pop());
    } else {
      console.log('no video');
    }
    if ((i+1) % 50 === 0) {
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(songs, null, 2));
      console.log('\nYT progress: ' + ytFound + ' found\n');
    }
    await sleep(DELAY_MS);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(songs, null, 2));
  console.log('\n===================================');
  console.log('Total songs: ' + songs.length);
  console.log('YouTube links: ' + ytFound);
  console.log('===================================');
  console.log('Saved to: ' + OUTPUT_FILE);
}

main().catch(console.error);
