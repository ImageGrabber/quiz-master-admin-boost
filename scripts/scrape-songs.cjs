/**
 * Song Scraper for malayalamchristiannetwork.com
 * Uses Node 18 built-in https + cheerio (no axios)
 * Extracts: title, manglish lyrics, malayalam lyrics
 * Outputs to: src/data/migrated-songs.json
 */

const https = require('https');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'migrated-songs.json');
const PROGRESS_FILE = path.join(__dirname, '..', 'src', 'data', 'scrape-progress.json');
const SITEMAP_URL = 'https://www.malayalamchristiannetwork.com/post-sitemap.xml';
const MAX_SONGS = 500;
const DELAY_MS = 1500; // Be respectful to the server

// ─── Helpers ────────────────────────────────────────────────────────────────────

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : require('http');
    proto.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

function cleanTitle(raw) {
  return raw
    .replace(/\s*with lyrics.*$/i, '')
    .replace(/\s*&amp;.*$/i, '')
    .replace(/\s*Download MP3.*$/i, '')
    .replace(/\s*-\s*Malayalam Christian.*$/i, '')
    .trim();
}

// ─── Step 1: Get URLs from Sitemap ──────────────────────────────────────────────

async function getSongUrls() {
  console.log('📡 Fetching sitemap...');
  const xml = await httpGet(SITEMAP_URL);
  
  // Extract all <loc> URLs (wrapped in CDATA sections)
  const urls = [];
  const regex = /<loc>\s*(?:<!\[CDATA\[)?(https:\/\/www\.malayalamchristiannetwork\.com\/[^\]<\s]+?)(?:\]\]>)?\s*<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    const url = match[1].trim();
    // Skip non-song pages
    if (url.includes('/category/') || url.includes('/page/') ||
        url.includes('/all-songs') || url.includes('/contacts') ||
        url.includes('/prayer-request') || url.includes('/live-prayer') ||
        url.includes('/mcn-sing-off') || url.includes('/videos') ||
        url.includes('/post/a2z') || url.includes('/pray-for') ||
        url.includes('/please-pray') || url.includes('/prayer') ||
        url === 'https://www.malayalamchristiannetwork.com/') {
      continue;
    }
    urls.push(url);
  }
  
  console.log(`📋 Found ${urls.length} potential song URLs in sitemap`);
  return urls.slice(0, MAX_SONGS);
}

// ─── Step 2: Scrape a Single Song ───────────────────────────────────────────────

async function scrapeSong(url) {
  const html = await httpGet(url);
  const $ = cheerio.load(html);
  
  // Title: from h1.entry-title or the h2 inside entry-content
  let title = $('h1.entry-title').text().trim();
  if (!title) title = $('h2.entry-title').text().trim();
  if (!title) title = $('.entry-content h2').first().text().trim();
  if (!title) return null;
  
  title = cleanTitle(title);
  if (!title) return null;
  
  // Lyrics: Extract from the tab structure
  // Tab panes are in .ep_tab_item_wrapper divs
  const tabPanes = $('.ep_tab_item_wrapper');
  const tabLabels = $('.ep_label');
  
  let manglishLyrics = [];
  let malayalamLyrics = [];
  
  if (tabPanes.length >= 2) {
    // First tab = Manglish, Second tab = Malayalam
    const manglishPane = tabPanes.eq(0);
    const malayalamPane = tabPanes.eq(1);
    
    manglishPane.find('p').each((_, el) => {
      const text = $(el).html()
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#8230;/g, '…')
        .replace(/&nbsp;/g, ' ')
        .trim();
      if (text) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length > 0) manglishLyrics.push(lines);
      }
    });
    
    malayalamPane.find('p').each((_, el) => {
      const text = $(el).html()
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#8230;/g, '…')
        .replace(/&nbsp;/g, ' ')
        .trim();
      if (text) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length > 0) malayalamLyrics.push(lines);
      }
    });
  } else {
    // No tabs — try the entry-content paragraphs directly
    $('.entry-content p').each((_, el) => {
      const text = $(el).html()
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&amp;/g, '&')
        .replace(/&#8230;/g, '…')
        .replace(/&nbsp;/g, ' ')
        .trim();
      if (text) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length > 0) manglishLyrics.push(lines);
      }
    });
  }
  
  // Need at least some lyrics
  if (manglishLyrics.length === 0 && malayalamLyrics.length === 0) return null;
  
  const slug = slugify(title);
  const id = slug.replace(/-/g, '_').substring(0, 40);
  
  const song = {
    id,
    slug,
    title,
    videoUrl: '',
    description: `${title} - Malayalam Christian Devotional Song Lyrics`,
    translations: {}
  };
  
  // Manglish lyrics
  if (manglishLyrics.length > 0) {
    song.translations.malayalam = {
      lang: 'Manglish',
      lyrics: manglishLyrics.map((lines, i) => ({
        verse: i === 0 ? undefined : String(i),
        lines
      }))
    };
  }
  
  // Malayalam (unicode) lyrics
  if (malayalamLyrics.length > 0) {
    song.translations.malayalam_unicode = {
      lang: 'Malayalam',
      lyrics: malayalamLyrics.map((lines, i) => ({
        verse: i === 0 ? undefined : String(i),
        lines
      }))
    };
  }
  
  return song;
}

// ─── Step 3: Main Runner ────────────────────────────────────────────────────────

async function main() {
  // Load progress if it exists
  let existingSongs = [];
  let processedUrls = new Set();
  if (fs.existsSync(PROGRESS_FILE)) {
    const progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
    existingSongs = progress.songs || [];
    processedUrls = new Set(progress.processedUrls || []);
    console.log(`📂 Resuming from progress: ${existingSongs.length} songs already scraped`);
  }
  
  const urls = await getSongUrls();
  const remaining = urls.filter(u => !processedUrls.has(u));
  console.log(`🎵 Scraping ${remaining.length} remaining songs (${existingSongs.length} already done)...\n`);
  
  let successCount = existingSongs.length;
  let failCount = 0;
  
  for (let i = 0; i < remaining.length; i++) {
    const url = remaining[i];
    const total = i + 1;
    
    try {
      process.stdout.write(`[${successCount + failCount + 1}/${remaining.length}] ${url.split('/').filter(Boolean).pop()}... `);
      const song = await scrapeSong(url);
      
      if (song) {
        existingSongs.push(song);
        successCount++;
        const lyricsCount = Object.keys(song.translations).length;
        console.log(`✅ "${song.title}" (${lyricsCount} translation${lyricsCount > 1 ? 's' : ''})`);
      } else {
        failCount++;
        console.log('⏭️  Skipped (no lyrics found)');
      }
      
      processedUrls.add(url);
      
      // Save progress every 25 songs
      if (total % 25 === 0) {
        fs.writeFileSync(PROGRESS_FILE, JSON.stringify({
          songs: existingSongs,
          processedUrls: [...processedUrls]
        }));
        console.log(`\n💾 Progress saved: ${existingSongs.length} songs\n`);
      }
      
      await sleep(DELAY_MS);
    } catch (err) {
      failCount++;
      console.log(`❌ Error: ${err.message}`);
      processedUrls.add(url);
    }
  }
  
  // Final save
  console.log(`\n═══════════════════════════════════════════`);
  console.log(`✅ Scraped: ${successCount} songs`);
  console.log(`⏭️  Skipped/Failed: ${failCount}`);
  console.log(`═══════════════════════════════════════════\n`);
  
  // Save final output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existingSongs, null, 2));
  console.log(`📁 Saved to: ${OUTPUT_FILE}`);
  
  // Clean up progress file
  if (fs.existsSync(PROGRESS_FILE)) {
    fs.unlinkSync(PROGRESS_FILE);
  }
}

main().catch(console.error);
