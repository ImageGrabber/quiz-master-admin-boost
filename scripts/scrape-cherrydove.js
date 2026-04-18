import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = [
  'https://cherrydove.blogspot.com/2016/09/ho-teri-stuti-aur-aradhanalyrics-and.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-apna-bojh-prabhu-par.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-halleluiyah-stuti.html'
];

async function scrapeSong(url) {
  try {
    console.log(`Scraping: ${url}`);
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Blogger specific selectors
    const title = $('.post-title').text().trim() || $('title').text().trim();
    const content = $('.post-body').text().trim();
    
    // Attempt to extract structured sections if possible (e.g. lyrics vs chords)
    // Most Blogger posts are just a wall of text in .post-body
    
    return {
      url,
      title,
      content,
      slug: url.split('/').pop().replace('.html', '')
    };
  } catch (err) {
    console.error(`Error scraping ${url}:`, err.message);
    return null;
  }
}

async function run() {
  const results = [];
  for (const url of urls) {
    const song = await scrapeSong(url);
    if (song) results.push(song);
  }

  const outputPath = path.join(__dirname, '../src/data/scraped-blog-songs.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Successfully scraped ${results.length} songs and saved to ${outputPath}`);
}

run();
