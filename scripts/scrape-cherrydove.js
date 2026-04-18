import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = [
  'https://cherrydove.blogspot.com/2010/12/all-to-jesus-i-surrenderchords-and.html',
  'https://cherrydove.blogspot.com/2010/12/here-i-am-to-worshipchords-and-lyrics.html',
  'https://cherrydove.blogspot.com/2010/12/hillsong-i-will-worship-you-for-who-you.html',
  'https://cherrydove.blogspot.com/2010/12/hum-gaaye-hossana.html',
  'https://cherrydove.blogspot.com/2010/12/my-jesus-my-saviour.html',
  'https://cherrydove.blogspot.com/2010/12/shine-jesus-shinechords-and-lyrics.html',
  'https://cherrydove.blogspot.com/2010/12/yeshua-aa-prabhu-yeshu-aa.html',
  'https://cherrydove.blogspot.com/2012/03/casting-crowns-jesus-friend-of-sinners.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-aaj-ka-din.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-apna-bojh-prabhu-par.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-aradhana-ho-aradhana.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-aradhana-me-hei.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-bolo-jai-milkar-jai.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-gin-gin-ke-stuti.html',
  'https://cherrydove.blogspot.com/2012/03/hindi-worship-song-halleluiyah-stuti.html',
  'https://cherrydove.blogspot.com/2013/08/hindi-version-innayolam-enne-nadathi.html',
  'https://cherrydove.blogspot.com/2013/09/basics-of-guitar.html',
  'https://cherrydove.blogspot.com/2013/09/le-chal-mujhelyrics-chords-strumming.html',
  'https://cherrydove.blogspot.com/2013/09/tuning-guitar.html',
  'https://cherrydove.blogspot.com/2013/10/easy-way-to-learn-major-and-minor-scales.html',
  'https://cherrydove.blogspot.com/2013/10/easy-way-to-learn-major-and-minor.html',
  'https://cherrydove.blogspot.com/2013/10/half-step-and-whole-step-half-step-in.html',
  'https://cherrydove.blogspot.com/2013/10/pitch.html',
  'https://cherrydove.blogspot.com/2013/10/scale.html',
  'https://cherrydove.blogspot.com/2013/10/the-elements-of-music.html',
  'https://cherrydove.blogspot.com/2013/10/types-of-scales.html',
  'https://cherrydove.blogspot.com/2013/12/skillet-awake-and-alive-lyrics-chords.html',
  'https://cherrydove.blogspot.com/2016/09/chahe-tumko-dil-se.html',
  'https://cherrydove.blogspot.com/2016/09/hindi-worship-song-param-pita-ki-hum.html',
  'https://cherrydove.blogspot.com/2016/09/ho-teri-stuti-aur-aradhanalyrics-and.html',
  'https://cherrydove.blogspot.com/2019/07/blog-post.html',
  'https://cherrydove.blogspot.com/2019/07/dhanyawad-ke-sath-stuti-gaoongalyrics.html',
  'https://cherrydove.blogspot.com/2019/07/hindi-worship-songs-senao-ka-yahowa.html',
  'https://cherrydove.blogspot.com/2019/07/tere-pass-yeshua-lyrics-chords-and-mp3.html',
  'https://cherrydove.blogspot.com/2019/07/yeshua-sabse-uncha-lyrics-chords-and-mp3.html',
  'https://cherrydove.blogspot.com/2019/07/yeshua-tumsa-koi-nahilyrics-chords-mp3.html',
  'https://cherrydove.blogspot.com/2021/01/aaswassatthin-uravidamam-kristthu.html',
  'https://cherrydove.blogspot.com/2021/01/anugrahathin-adhipathiye-malayalam.html',
  'https://cherrydove.blogspot.com/2021/01/aswasame-enikkere-thingeedunnu.html',
  'https://cherrydove.blogspot.com/2021/01/athyunnathante-maravinkal-christian.html',
  'https://cherrydove.blogspot.com/2021/01/azhalerum-jeevitha-maruvil.html',
  'https://cherrydove.blogspot.com/2021/01/ellam-ange-mahathwatthinay-christian.html',
  'https://cherrydove.blogspot.com/2021/01/en-sankadangal-sakalathum-stephen.html',
  'https://cherrydove.blogspot.com/2021/01/enikkai-karuthunnavan-christian.html',
  'https://cherrydove.blogspot.com/2021/01/ente-daivam-mahathwathil-christian.html',
  'https://cherrydove.blogspot.com/2021/01/ente-daivam-swarga-simhaassanam.html',
  'https://cherrydove.blogspot.com/2021/01/gin-gin-ke-stuthi-karu-hindi-christian.html',
  'https://cherrydove.blogspot.com/2021/01/ithratholam-yahova-sahayichu-christian.html',
  'https://cherrydove.blogspot.com/2021/01/kannin-manipol-enne-karuthum.html',
  'https://cherrydove.blogspot.com/2021/01/katte-kadale-vaa-daivathe-sthuthipin.html',
  'https://cherrydove.blogspot.com/2021/01/lokamam-gambhira-varidhiyil-christian.html',
  'https://cherrydove.blogspot.com/2021/01/loke-njanen-ottam-thikachu-swarga.html',
  'https://cherrydove.blogspot.com/2021/01/nanniyode-njan-sthuthi-paadidum.html',
  'https://cherrydove.blogspot.com/2021/01/nee-mathram-mathi-lyrics-and-chords.html',
  'https://cherrydove.blogspot.com/2021/01/neeyente-sarvavum-christian-malayalam.html',
  'https://cherrydove.blogspot.com/2021/01/onnumillaykayil-ninnenne-ninnude.html',
  'https://cherrydove.blogspot.com/2021/01/penthicostu-naalil-munmazha-peyaicha.html',
  'https://cherrydove.blogspot.com/2021/01/rakshitavine-kanka-paapi-chikku.html',
  'https://cherrydove.blogspot.com/2021/01/seeyon-sanchari-njan-malayalam.html',
  'https://cherrydove.blogspot.com/2021/01/you-are-all-in-all-christian-english.html'
];

async function scrapeSong(url) {
  try {
    console.log(`Scraping: ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.text();
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
