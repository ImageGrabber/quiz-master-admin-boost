import { bibleStructure } from './bible-structure.js';
import { articles } from './articles.js';
import { songs } from './songs.js';

export const sitemapData = {
    bibleStructure,
    articles: articles.map(a => ({ id: a.id, slug: a.slug || a.id })),
    songs: songs.map(s => ({ slug: s.slug }))
};
