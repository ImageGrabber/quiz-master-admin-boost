import type { Song } from "@/data/songs";

const GENERIC_SONG_THUMBNAILS = new Set([
    "/assets/songs/hindi_card.png",
    "/assets/songs/english_card.png",
    "/assets/songs/malayalam_card.png",
]);

const AI_ADDED_NATURE_THUMBNAILS = new Set([
    "https://images.pexels.com/photos/7640496/pexels-photo-7640496.jpeg",
    "https://images.pexels.com/photos/897817/pexels-photo-897817.jpeg",
    "https://images.pexels.com/photos/3601097/pexels-photo-3601097.jpeg",
    "https://images.pexels.com/photos/6532612/pexels-photo-6532612.jpeg",
    "https://images.pexels.com/photos/1194196/pexels-photo-1194196.jpeg",
    "https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg",
    "https://images.pexels.com/photos/2927676/pexels-photo-2927676.jpeg",
]);

const CARD_THEMES = [
    { start: "#7c2d12", end: "#ea580c", accent: "#fdba74" },
    { start: "#1e3a8a", end: "#2563eb", accent: "#93c5fd" },
    { start: "#14532d", end: "#16a34a", accent: "#86efac" },
    { start: "#581c87", end: "#a21caf", accent: "#f0abfc" },
    { start: "#78350f", end: "#d97706", accent: "#fde68a" },
    { start: "#0f766e", end: "#14b8a6", accent: "#99f6e4" },
];

const hashString = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
        hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
    }
    return hash;
};

const getSongInitials = (title: string) =>
    title
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join("") || "SG";

const escapeSvg = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

const createGeneratedCard = (song: Song) => {
    const theme = CARD_THEMES[hashString(song.slug || song.id || song.title) % CARD_THEMES.length];
    const initials = getSongInitials(song.title);
    const title = escapeSvg(song.title);
    const subtitle = escapeSvg("Christian Song Lyrics");
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
            <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="${theme.start}" />
                    <stop offset="100%" stop-color="${theme.end}" />
                </linearGradient>
            </defs>
            <rect width="1200" height="675" fill="url(#bg)" />
            <circle cx="980" cy="120" r="180" fill="${theme.accent}" opacity="0.15" />
            <circle cx="180" cy="560" r="220" fill="${theme.accent}" opacity="0.12" />
            <rect x="72" y="72" width="1056" height="531" rx="36" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.18)" />
            <text x="96" y="138" fill="white" font-family="Georgia, serif" font-size="28" letter-spacing="6">BIBLE QUIZ COMPETITION</text>
            <text x="96" y="330" fill="white" font-family="Georgia, serif" font-size="180" font-weight="700" opacity="0.16">${initials}</text>
            <text x="96" y="430" fill="white" font-family="Arial, sans-serif" font-size="64" font-weight="700">${title}</text>
            <text x="96" y="492" fill="rgba(255,255,255,0.88)" font-family="Arial, sans-serif" font-size="30">${subtitle}</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};

export const resolveSongThumbnail = (song: Song) => {
    if (
        song.thumbnailUrl &&
        !GENERIC_SONG_THUMBNAILS.has(song.thumbnailUrl) &&
        !AI_ADDED_NATURE_THUMBNAILS.has(song.thumbnailUrl)
    ) {
        return song.thumbnailUrl;
    }

    if (song.videoUrl) {
        const videoId = song.videoUrl.split("/").pop();
        if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

    return createGeneratedCard(song);
};
