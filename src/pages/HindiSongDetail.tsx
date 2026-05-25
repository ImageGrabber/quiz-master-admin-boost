import { Helmet } from "react-helmet-async";
import AdSenseTag from "@/components/AdSenseTag";
import { generateVideoSchema } from "@/utils/video-seo";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { Song } from "@/data/songs";
import hindiSongsData from "@/data/hindi-songs/index";
import { resolveSongThumbnail } from "@/utils/song-thumbnails";

const songs: Song[] = hindiSongsData as Song[];
const getTranslationByKey = (song: Song, langKey: string) => {
    const translations = (song?.translations || {}) as Record<string, { lang: string; lyrics: any[] }>;
    if (translations[langKey]) return translations[langKey];
    const matchedKey = Object.keys(translations).find((k) => k.toLowerCase() === langKey.toLowerCase());
    return matchedKey ? translations[matchedKey] : undefined;
};

const toQuerySlug = (value: string) =>
    value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

const dedupe = (items: string[]) => Array.from(new Set(items.filter(Boolean)));

const normalizeForMatch = (value: string) =>
    String(value || "")
        .toLowerCase()
        .replace(/[“”"']/g, "")
        .replace(/\s+/g, " ")
        .trim();

const decodeHexSlug = (value: string) => {
    const tokens = String(value || "")
        .toLowerCase()
        .split("-")
        .filter((t) => /^[0-9a-f]{2}$/.test(t));
    if (tokens.length < 6) return "";
    try {
        return decodeURIComponent(tokens.map((t) => `%${t}`).join(""));
    } catch {
        return "";
    }
};

type LyricSection = {
    verse?: string;
    lines: string[];
    chords?: string[];
};

const isMostlyRoman = (line: string) => /[a-zA-Z]/.test(line) && !/[\u0900-\u097f]/.test(line);
const normalizeLineKey = (line: string) =>
    line.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();
const stripInlineChords = (line: string) =>
    String(line || "").replace(/\[[^\]]+\]/g, "").replace(/\s+/g, " ").trim();
const looksCorruptedLegacyEncoding = (line: string) => {
    const text = stripInlineChords(line);
    if (!text) return false;
    if (/[%^~`{}[\]|\\<>]/.test(text)) return true;
    if (/[;ÊÅÆ]/.test(text)) return true;
    const internalCaps = (text.match(/[a-z][A-Z]/g) || []).length;
    if (internalCaps >= 2) return true;
    if (/(AaraQ|yaIS|prao|sva|ipta|raoTI|sahayak|jaIvana|maora|maoM|Aayaa)/i.test(text)) return true;
    if (/;h'kq|eq>|n;k|rw\s+viuh|cjlk|vk-+/.test(text)) return true;
    if (!/[\u0900-\u097f]/.test(text) && /[a-z]/i.test(text)) {
        const tinyTokens = text.split(/\s+/).filter((t) => /^[a-z]{1,3}$/i.test(t)).length;
        if (tinyTokens >= 4) return true;
    }
    return false;
};

const DEVANAGARI_TO_LATIN: Record<string, string> = {
    "अ": "a", "आ": "aa", "इ": "i", "ई": "ee", "उ": "u", "ऊ": "oo", "ए": "e", "ऐ": "ai", "ओ": "o", "औ": "au",
    "ऋ": "ri", "ं": "n", "ँ": "n", "ः": "h", "्": "", "़": "",
    "ा": "aa", "ि": "i", "ी": "ee", "ु": "u", "ू": "oo", "े": "e", "ै": "ai", "ो": "o", "ौ": "au",
    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "n",
    "च": "ch", "छ": "chh", "ज": "j", "झ": "jh", "ञ": "n",
    "ट": "t", "ठ": "th", "ड": "d", "ढ": "dh", "ण": "n",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "व": "v",
    "श": "sh", "ष": "sh", "स": "s", "ह": "h",
    "ळ": "l", "क्ष": "ksh", "ज्ञ": "gy",
    "ज़": "z", "फ़": "f", "क़": "q", "ख़": "kh", "ग़": "g", "ृ": "ri", "ड़": "d", "ढ़": "dh",
    "ज़": "z", "फ़": "f", "क़": "q", "ख़": "kh", "ग़": "g",
    "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9", "०": "0"
};

const transliterateHindiToHinglish = (text: string) => {
    const chars = Array.from(text);
    let out = "";
    for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        if (ch === " " || ch === "," || ch === "." || ch === "!" || ch === "?" || ch === "।" || ch === "-") {
            out += ch === "।" ? "." : ch;
            continue;
        }
        const two = `${ch}${chars[i + 1] || ""}`;
        if (DEVANAGARI_TO_LATIN[two]) {
            out += DEVANAGARI_TO_LATIN[two];
            i += 1;
            continue;
        }
        out += DEVANAGARI_TO_LATIN[ch] ?? ch;
    }
    let result = out
        .replace(/\s+/g, " ")
        .replace(/\b([a-z])/g, (m) => m.toUpperCase())
        .trim();

    // Post-process common awkward phonetic transliterations
    const commonFixes: Record<string, string> = {
        "Too": "Tu", "Achchhaa": "Acha", "Bhut": "Bahut", "Lie": "Liye",
        "Mraa": "Mara", "Jeevn": "Jeevan", "Chngaa": "Changa", "Shkti": "Shakti",
        "Paapo": "Paapon", "Kshmaa": "Kshama", "Khushiyaan": "Khushiyan",
        "Prbhu": "Prabhu", "Krta": "Karta", "Dilaayaa": "Dilaya", "Aayaa": "Aaya",
        "Jiyaa": "Jiya", "Kiyaa": "Kiya", "Diyaa": "Diya", "Uthaa": "Utha",
        "Mhaan": "Mahaan", "Teree": "Teri", "Jy": "Jay", "Jykaar": "Jaikaar",
        "Hlleluyaah": "Hallelujah", "Rchaa": "Racha", "Yh": "Yeh", "Saaree": "Saari",
        "Meraa": "Mera", "Mn": "Man", "Krtaa": "Karta", "Vh": "Voh", "Yhovaa": "Yehova",
        "Yeere": "Yireh", "Iphaazt": "Hifazat", "Gaae": "Gaaye", "Hm": "Hum",
        "Toone": "Tune", "Kitnee": "Kitni", "Sundr": "Sundar", "Pnchhee": "Panchhi",
        "Bhee": "Bhi", "Sirjnhaaraa": "Sirjanhara", "Paalnhaaraa": "Palanhara",
        "Detaa": "Deta", "Jl": "Jal", "Men": "Main", "Dhny": "Dhanya", "Khoon": "Kahun",
        "Raaphaa": "Rapha", "Shaalom": "Shalom", "Phchaan": "Pehchaan", "Eemaan": "Imaan",
        "Haalleloo": "Hallelu", "Haallelooyaah": "Hallelujah", "Snsaar": "Sansaar",
        "Sng": "Sang", "Bhr": "Bhar", "Vchnon": "Vachnon", "Chlaa": "Chala",
        "Brkton": "Barkaton", "Ghr": "Ghar", "Bn": "Ban", "Mhimaa": "Mahima",
        "Hotee": "Hoti", "Bdtaa": "Badhta", "Hr": "Har", "Sty": "Satya", "Aatmaa": "Aatma",
        "Kaa": "Ka", "Bl": "Bal", "Hee": "Hi", "Bdle": "Badle", "Saamrth": "Samarth",
        "Bhrosaa": "Bharosa", "Dee": "Di", "Jindgee": "Zindagi", "Pr": "Par",
        "Kripaa": "Kripa", "Kee": "Ki", "Dyaa": "Daya", "Aannd": "Aanand",
        "Dheerj": "Dheeraj", "Kitnaa": "Kitna", "Bhlaaee": "Bhalai", "He": "Hai", "Muje": "Mujhe",
        "Taarnhaare": "Taranhare", "Jg": "Jag", "Jhaan": "Jahan", "Krte": "Karte",
        "Svrg": "Swarg", "Raajaa": "Raja", "Dhrtee": "Dharti", "Vaasee": "Vaasi",
        "Hosnnaa": "Hosanna", "Apnaa": "Apna", "Tn": "Tan", "Dhn": "Dhan", "Sb": "Sab",
        "Lekr": "Lekar", "Kr": "Kar", "Hmaare": "Hamare", "Aaraadhnaa": "Aaradhana",
        "Rhenge": "Rahenge", "Jb": "Jab", "Tk": "Tak", "Vchn": "Vachan", "Dikhaa": "Dikha",
        "Chl": "Chal", "Yeshuaa": "Yeshua", "Teraa": "Tera", "Dhnyvaad": "Dhanyawad",
        "Sdaa": "Sada", "Oonchaaee": "Unchai", "Ghraaee": "Gehrai", "Chaudaaee": "Chaudai",
        "Vrnn": "Varnan", "Shtru": "Shatru", "Hraakr": "Harakar", "Vo": "Voh",
        "Vijy": "Vijay", "Meree": "Meri", "Ldaaee": "Ladai", "Ldtaa": "Ladta",
        "Atuly": "Atulya", "Pvitr": "Pavitra", "Drd": "Dard", "Mitaataa": "Mitata",
        "Hmen": "Hame", "Chhudaayaa": "Chudaya", "Bchaayaa": "Bachaya", "Gaao": "Gao",
        "Hmne": "Hamne", "Paaee": "Pai", "Naa": "Na", "Drenge": "Darenge",
        "Ldenge": "Ladenge", "Slaam": "Salaam", "Laae": "Laye", "Paigaam": "Paigham",
        "Klvaaree": "Kalvari", "Duhkh": "Dukh", "Sh": "Sah", "Liyaa": "Liya",
        "Paapee": "Paapi", "Kyaa": "Kya", "Dekhaa": "Dekha", "Thaa": "Tha",
        "Koee": "Koi", "Khoobee": "Khoobi", "Thee": "Thi", "Khoyaa": "Khoya",
        "Huaa": "Hua", "Tb": "Tab", "Njaat": "Najaat", "Bnaa": "Bana", "Azeezon": "Azizon",
        "Gyaa": "Gaya", "Duniyaa": "Duniya", "Dldl": "Daldal", "Doobaa": "Dooba",
        "Haamee": "Haami", "Bhaayaa": "Bahaya", "Zkhmon": "Zakhmon", "Apnaayaa": "Apnaya",
        "Hraayaa": "Haraya", "Klvree": "Kalvari", "Raastaa": "Raasta", "Kndhe": "Kandhe",
        "Lhoo": "Lahu", "Bhtaa": "Behta", "Shtaa": "Sehta", "Chltaa": "Chalta",
        "Khtaa": "Kehta", "Chhedaa": "Cheda", "Phnaayaa": "Pehnaya", "Chaahtaa": "Chahta",
        "Zkhm": "Zakhm", "Sbko": "Sabko", "Kuchh": "Kuch", "N": "Na",
        "Paapiyon": "Papiyon", "Pyaaraa": "Pyara", "Shaaraa": "Sahara", "Jaataa": "Jata",
        "Nhee": "Nahi", "Khaalee": "Khali", "Aakr": "Aakar", "Kaisee": "Kaisi",
        "Schche": "Sachche", "Upsthiti": "Upasthiti", "Maaphee": "Maafi", "Aataa": "Aata",
        "Khzaanaa": "Khazana", "Dvaar": "Dwar", "Prvesh": "Pravesh", "Rhegaa": "Rahega",
        "Saaraa": "Saara", "Uskee": "Uski", "Phriyaad": "Fariyad", "Degaa": "Dega",
        "Abdee": "Abdi", "Zindgee": "Zindagi", "Uskaa": "Uska", "Phrmaan": "Farmaan",
        "Mriym": "Mariyam", "Tnaav": "Tanaav", "Kthin": "Kathin", "Mgr": "Magar",
        "Ghbraaee": "Ghabrai", "Thaamaa": "Thaama", "Yoosuph": "Yusuf", "Jnm": "Janam",
        "Pnaah": "Panaah", "Dhoondhtee": "Dhoondhti", "Dfaa": "Dafa", "Khudaa": "Khuda",
        "Mseeh": "Masih", "Pyaaree": "Pyaari", "Hnsee": "Hansi", "Nnhee": "Nanhi",
        "See": "Si", "Bsee": "Basi", "Aayee": "Aayi", "Theen": "Thin", "Chmkaa": "Chamka",
        "Sitaaraa": "Sitara", "Pde": "Pade", "Hairt": "Hairat", "Mjoosee": "Majoosi",
        "Baalk": "Baalak", "Shhr": "Shahar", "Ghbraayaa": "Ghabraya", "Ske": "Sake",
        "Rhe": "Rahe", "Spne": "Sapne", "Btaayaa": "Bataya", "Yhaan": "Yahan",
        "Chrnee": "Charni", "Chmkeelaa": "Chamkila", "Taaraa": "Tara", "Jnmaa": "Janma",
        "Aazaad": "Aazad", "Anugrh": "Anugrah", "Sfr": "Safar", "Jgh": "Jagah",
        "Kdiyaan": "Kadiyan", "Todtaa": "Todta", "Chrvaahe": "Charvahe", "Bhtee": "Bahti",
        "Kbeelon": "Kabeelon", "Prkaar": "Prakaar", "Judtaa": "Judta", "Bndhn": "Bandhan",
        "Pribhaashit": "Paribhashit", "Vinmr": "Vinamra", "Shaask": "Shaasak",
        "Gddee": "Gaddi", "Unkaa": "Unka", "Uthaataa": "Uthaata", "Hraa": "Hara",
        "Sktaa": "Sakta", "Raip": "Rap", "Ghoshnaa": "Ghoshna", "Dhdkte": "Dhadakte",
        "Krne": "Karne", "Annt": "Anant", "Klaa": "Kala", "Sbhee": "Sabhi",
        "Raajaaon": "Rajaon", "Prbhuon": "Prabhuon", "Rhaa": "Raha", "Shhnshaah": "Shahenshah",
        "Baadshaah": "Baadshah", "Jhukkr": "Jhukkar", "Prnaam": "Pranaam", "Mujssm": "Mujassam",
        "Klaam": "Kalaam", "Amn": "Aman", "Bndhnon": "Bandhanon", "Jkdon": "Jakdon",
        "Phrishton": "Farishton", "Aaegee": "Aayegi", "Doolhaa": "Dulha", "Dulhn": "Dulhan",
        "Jaaegaa": "Jayega", "Aaegaa": "Aayega", "Kregaa": "Karega", "Tnaanaa": "Tanaana",
        "Tndaanaa": "Tandaana", "Bhgaa": "Bhaga", "Tkleeph": "Takleef", "Krj": "Karz",
        "Kshton": "Kashton", "Daalegaa": "Dalega", "Paaoongaa": "Paunga", "Doongaa": "Dunga",
        "Sleeb": "Saleeb", "Muaa": "Mua", "Kaisaa": "Kaisa", "Shaa": "Saha",
        "Dhaaraa": "Dhaara", "Khreest": "Khrist", "Bh": "Bah", "Rhee": "Rahi",
        "Gye": "Gaye", "Mitaa": "Mita", "Jaao": "Jao", "Saaph": "Saaf", "Mr": "Mar",
        "Bchaa": "Bacha", "Bcho": "Bacho", "Sjaaon": "Sajaon", "Ndiyaan": "Nadiyan",
        "Khreesht": "Khrist", "Gee": "Gayi", "Ge": "Gaye", "Maaraa": "Maara",
        "Szaaon": "Sazaon", "Daalo": "Dalo", "Nikaalo": "Nikalo",
        "Hmd": "Hamd", "Chlte": "Chalte", "Schchaaee": "Sachchai", "Daaood": "Daud",
        "Lgtee": "Lagti", "Jchtee": "Jachti", "Bs": "Bas", "Itnee": "Itni",
        "Aarjoo": "Aarzoo", "Roobroo": "Rubaru", "Jaayen": "Jayen", "Mnjil": "Manzil",
        "Jaaoon": "Jaun", "Alg": "Alag", "Phn": "Pehan", "Vaadaa": "Vaada",
        "Pooraa": "Poora", "Toohee": "Tuhi", "Bndgee": "Bandagi", "Dhdkn": "Dhadkan",
        "Khtaa": "Khata", "Ataa": "Ata", "Alphaa": "Alpha", "Omegaa": "Omega",
        "Phlaa": "Pehla", "Inthaa": "Inteha", "Kraa": "Kara", "Binaa": "Bina", "Mainne": "Maine",
        "Chaahen": "Chahen", "Gaayen": "Gayen", "Miltee": "Milti", "Shiphaa": "Shifa", "Duaa": "Dua",
        "Mainoon": "Mainu", "Deevaanaa": "Deewana", "Phnsyaa": "Phansya", "Nphrt": "Nafrat",
        "Nfrt": "Nafrat", "Laayaa": "Laya", "Taubaa": "Tauba", "Tussee": "Tussi",
        "Krlo": "Karlo", "Phrmaandaa": "Farmaanda", "Frmaandaa": "Farmaanda",
        "Noon": "Nu", "Bulaandaa": "Bulaanda", "Paapiyaan": "Papiyan", "Tainoon": "Tainu",
        "Lenaa": "Lena", "Aae": "Aaye", "Bhkaaye": "Behkaye", "Phuslaaye": "Phuslaye",
        "Staae": "Sataye", "Dhn": "Dhan", "Dault": "Daulat", "Maayaa": "Maya",
        "Dikhlaaye": "Dikhlaye", "Rng": "Rang", "Kre": "Kare", "Phnde": "Phande",
        "Phns": "Phans", "Nrk": "Narak", "Jee": "Ji", "Bintee": "Binti",
        "Krt": "Karat", "Bkshon": "Bakshon", "Apnee": "Apni",
        "Bulaataa": "Bulaata", "Hogaa": "Hoga", "Snbhaalegaa": "Sambhalega", "Khtron": "Khatron",
        "Jaae": "Jaye", "Raastaa": "Raasta", "Paa": "Pa", "Skegaa": "Sakega", "Dvaaraa": "Dwara",
        "Aabhaaree": "Aabhari", "Aamhee": "Aamhi", "Khaayaalaa": "Khayala",
        "Piyaalaa": "Piyala", "Raayaalaa": "Rayala", "Jaagaa": "Jaga",
        "Gunaachee": "Gunachi", "Maaphee": "Maafi", "Nvaa": "Nava", "Yeshulaa": "Yeshula",
        "Nyee": "Nai", "Nee": "Ni", "He": "Hey", "Kaaeer": "Kair", "Aprnpaar": "Aparampaar",
        "Paayke": "Payke", "Kaaraaboo": "Karabu", "Vipt": "Vipat", "Aadr": "Aadar",
        "Zmeen": "Zameen", "Nv": "Nav", "Chetnaa": "Chetna", "Jaagrti": "Jaagrati",
        "Mdhur": "Madhur", "Kshnon": "Kshanon", "Chltee": "Chalti",
        "Rhegee": "Rahegi", "Draane": "Darane", "Aashaa": "Aasha", "Aandhee": "Aandhi",
        "Toophaan": "Toofan", "Thm": "Tham", "Jaaenge": "Jayenge",
        "Aakaash": "Aakash", "Jnmaa": "Janma", "Immaanuel": "Immanuel",
        "Prithvee": "Prithvi", "Uddhaarkrtaa": "Uddharkarta", "Pitaa": "Pita",
        "Praakrmee": "Parakrami", "Prmeshvr": "Parmeshwar", "Anntkaal": "Anantkaal",
        "Krnevaalaa": "Karnevala", "Prbhutaa": "Prabhuta", "Bdhtee": "Badhti", "Raajy": "Rajya"
    };

    // Remove "Khoon" from commonFixes because "Khoon" means "Blood"
    delete commonFixes["Khoon"];

    for (const [bad, good] of Object.entries(commonFixes)) {
        result = result.replace(new RegExp(`\\b${bad}\\b`, "g"), good);
    }
    
    // Special phrase fixes
    result = result.replace(/Dhanya Khoon/gi, "Dhanya Kahun");

    return result;
};

const HindiSongDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const slugParam = decodeURIComponent(slug || "");
    const decodedLegacySlug = decodeHexSlug(slugParam);

    const song = songs.find((s) => {
        if (s.slug === slugParam) return true;
        if (decodedLegacySlug && normalizeForMatch(s.title) === normalizeForMatch(decodedLegacySlug)) return true;
        return false;
    });
    const [selectedLang, setSelectedLang] = useState("hindi");
    const backState = (location.state as { from?: string; returnScrollY?: number } | null) || null;
    const backHref = backState?.from || "/hindi-songs";

    useEffect(() => {
        if (song && slugParam && song.slug !== slugParam) {
            navigate(`/hindi-songs/${song.slug}`, { replace: true });
        }
    }, [navigate, slugParam, song]);

    if (!song) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navigation />
                <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Song Not Found</h1>
                    <Button onClick={() => navigate("/hindi-songs")}>Back to Hindi Songs</Button>
                </main>
                <Footer />
            </div>
        );
    }

    const currentTranslation =
        selectedLang === "hinglish"
            ? (getTranslationByKey(song, "hinglish") || (getTranslationByKey(song, "hindi")
                ? {
                    lang: "Hinglish",
                    lyrics: (getTranslationByKey(song, "hindi")?.lyrics || []).map((section) => ({
                        ...section,
                        lines: (section.lines || []).map(transliterateHindiToHinglish),
                    })),
                }
                : undefined))
            : getTranslationByKey(song, selectedLang);
    const englishTranslation = getTranslationByKey(song, "english");
    const videoId = song.videoUrl ? song.videoUrl.split('/').pop() : '';
    const thumbnailUrl = resolveSongThumbnail(song);
    const canonicalUrl = `https://biblequizcompetition.com/hindi-songs/${song.slug}`;

    const plainTitle = toQuerySlug(song.title);

    const titleVariants = useMemo(() => {
        const variants = new Set<string>();
        variants.add(`${plainTitle} lyrics`);
        variants.add(`${plainTitle} hindi lyrics`);
        variants.add(`${plainTitle} lyrics in hindi`);
        variants.add(`${plainTitle} song lyrics`);
        variants.add(`${plainTitle} chords`);
        variants.add(`${plainTitle} meaning`);
        variants.add(`${plainTitle} hindi christian song`);
        variants.add(`${plainTitle} yeshu ke geet`);

        // Common Hindi transliteration variants (mai/main/mein, aaradhana/aradhna)
        variants.add(plainTitle.replace(/\bmai\b/g, "mein"));
        variants.add(plainTitle.replace(/\bmai\b/g, "main"));
        variants.add(plainTitle.replace(/\bmein\b/g, "main"));
        variants.add(plainTitle.replace(/aaradhana/g, "aradhna"));
        variants.add(plainTitle.replace(/prabhu/g, "yeshu"));
        variants.add(plainTitle.replace(/prarthna/g, "prarthana"));
        variants.add(plainTitle.replace(/\bme\b/g, "mein"));

        if (/pavitr/.test(plainTitle)) {
            variants.add(plainTitle.replace(/pavitr/g, "pavitra"));
            variants.add(`${plainTitle.replace(/pavitr/g, "pavitra")} lyrics`);
            variants.add("pavitr aatma song lyrics");
            variants.add("holy spirit worship song hindi lyrics");
        }

        if (/aatma/.test(plainTitle) && /prarthn/.test(plainTitle)) {
            variants.add("aatma me prarthna lyrics");
            variants.add("aatma mein prarthna lyrics");
            variants.add("aatma me prarthana lyrics");
            variants.add("prayer in the spirit song lyrics");
        }

        return Array.from(variants)
            .map((v) => v.replace(/\s+/g, " ").trim())
            .filter((v) => v.length > 0)
            .slice(0, 12);
    }, [plainTitle]);

    const stats = useMemo(() => {
        const sections = currentTranslation?.lyrics?.length || 0;
        const lines = currentTranslation?.lyrics?.reduce((sum, section) => sum + (section.lines?.length || 0), 0) || 0;
        return { sections, lines };
    }, [currentTranslation]);

    const languageTabs = useMemo(
        () => [
            { key: "hindi", label: "Hindi" },
            { key: "hinglish", label: "Hinglish" },
            { key: "english", label: "English" },
            { key: "malayalam", label: "Malayalam" },
        ],
        []
    );

    const availableLanguageTabs = useMemo(() => {
        return languageTabs.filter(tab => {
            if (tab.key === 'hinglish') {
                return !!song.translations['hindi'] || !!song.translations['hinglish'];
            }
            return !!song.translations[tab.key]?.lyrics?.length;
        });
    }, [languageTabs, song]);

    const availableLanguageLabels = useMemo(
        () => availableLanguageTabs.map((tab) => tab.label),
        [availableLanguageTabs]
    );

    useEffect(() => {
        // If the current selected language is not available for this song, fallback to Hindi
        const isCurrentLangAvailable = availableLanguageTabs.some(tab => tab.key === selectedLang);
        if (!isCurrentLangAvailable && availableLanguageTabs.length > 0) {
            setSelectedLang("hindi"); // Default to Hindi
        }
    }, [song.slug, selectedLang, availableLanguageTabs]);

    const languagesText = availableLanguageLabels.join(", ");
    const seoLanguageText = useMemo(() => {
        if (availableLanguageLabels.length === 0) return "Hindi";
        if (availableLanguageLabels.length === 1) return availableLanguageLabels[0];
        if (availableLanguageLabels.length === 2) return `${availableLanguageLabels[0]} & ${availableLanguageLabels[1]}`;
        if (availableLanguageLabels.length === 3) {
            return `${availableLanguageLabels[0]}, ${availableLanguageLabels[1]} & ${availableLanguageLabels[2]}`;
        }
        return `${availableLanguageLabels[0]}, ${availableLanguageLabels[1]} & more`;
    }, [availableLanguageLabels]);
    const seoTitle = `${song.title} Lyrics | ${seoLanguageText}`;

    const relatedSongs = useMemo(() => {
        const stopWords = new Set(["hai", "ho", "ki", "ke", "mein", "main", "mai", "hum", "tera", "teri"]);
        const tokens = plainTitle
            .split(/[^a-z0-9]+/)
            .filter((w) => w.length > 2 && !stopWords.has(w));

        if (tokens.length === 0) return [];

        const ranked = songs
            .filter((s) => s.slug !== song.slug)
            .map((s) => {
                const haystack = `${s.title} ${s.slug} ${s.description}`.toLowerCase();
                let score = 0;
                tokens.forEach((token) => {
                    if (haystack.includes(token)) score += 1;
                });
                return { song: s, score };
            })
            .filter((entry) => entry.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 4)
            .map((entry) => entry.song);

        return ranked;
    }, [plainTitle, song.slug]);

    const relatedSongsToShow = useMemo(() => {
        if (relatedSongs.length > 0) return relatedSongs;
        return songs.filter((s) => s.slug !== song.slug).slice(0, 4);
    }, [relatedSongs, song.slug]);

    const relatedSongsForSlider = useMemo(() => {
        const base = relatedSongsToShow.length ? relatedSongsToShow : songs.filter((s) => s.slug !== song.slug);
        return base.slice(0, 10);
    }, [relatedSongsToShow, song.slug]);

    const allLyricsText = useMemo(() => {
        const hindiText = currentTranslation?.lyrics?.flatMap((section) => section.lines || []).join("\n") || "";
        const englishText = englishTranslation?.lyrics?.flatMap((section) => section.lines || []).join("\n") || "";
        return { hindiText, englishText };
    }, [currentTranslation, englishTranslation]);

    const displaySections = useMemo<LyricSection[]>(() => {
        const sections = (currentTranslation?.lyrics || []) as LyricSection[];
        const hasDevanagari = sections.some((s) => (s.lines || []).some((l) => /[\u0900-\u097f]/.test(l)));

        // 1) Remove Romanized duplicates from Hindi block when Devanagari text exists
        const shouldRunCorruptionFilter = selectedLang === "hindi";

        const cleaned = sections
            .map((section) => ({
                ...section,
                lines: (section.lines || []).filter((line) => {
                    if (shouldRunCorruptionFilter && looksCorruptedLegacyEncoding(line)) return false;
                    if (hasDevanagari && isMostlyRoman(line)) return false;
                    return true;
                }),
            }))
            .filter((section) => section.lines.length > 0);

        // 2) Collapse immediately repeated sections
        const deduped: LyricSection[] = [];
        for (const section of cleaned) {
            const key = (section.lines || []).map(normalizeLineKey).join("|");
            const prev = deduped[deduped.length - 1];
            const prevKey = prev ? (prev.lines || []).map(normalizeLineKey).join("|") : "";
            if (key && key === prevKey) continue;
            deduped.push(section);
        }

        // 3) If a song is fragmented into many single-line sections, merge them into compact stanzas.
        const oneLineCount = deduped.filter((s) => (s.lines || []).length === 1).length;
        const mostlySingleLine = deduped.length >= 8 && oneLineCount / deduped.length >= 0.7;
        if (mostlySingleLine) {
            const mergedSingles: LyricSection[] = [];
            let buffer: string[] = [];

            const flushBuffer = () => {
                if (buffer.length === 0) return;
                mergedSingles.push({ lines: [...buffer] });
                buffer = [];
            };

            for (const section of deduped) {
                const lines = section.lines || [];
                if (lines.length === 1) {
                    buffer.push(lines[0]);
                    if (buffer.length >= 2) flushBuffer();
                } else {
                    flushBuffer();
                    mergedSingles.push(section);
                }
            }
            flushBuffer();
            return mergedSingles;
        }

        if (deduped.length !== 1) return deduped;

        const only = deduped[0];
        const lines = (only?.lines || []).filter(Boolean);
        const looksLikeFlatBlock = lines.length >= 10 && lines.every((l) => l.length <= 48);
        if (!looksLikeFlatBlock) return deduped;

        const grouped: LyricSection[] = [];
        const chordLines = only?.chords || [];
        for (let i = 0; i < lines.length; i += 4) {
            grouped.push({
                verse: String(grouped.length + 1),
                lines: lines.slice(i, i + 4),
                chords: chordLines.length ? chordLines.slice(i, i + 4) : undefined,
            });
        }
        return grouped;
    }, [currentTranslation, selectedLang]);

    const songAliases = useMemo(() => {
        const base = plainTitle;
        return dedupe([
            base,
            base.replace(/\bmein\b/g, "main"),
            base.replace(/\bmain\b/g, "mein"),
            base.replace(/\bmai\b/g, "main"),
            base.replace(/yeshu/g, "jesus"),
            base.replace(/stuti/g, "stutiya"),
            `${base} lyrics`,
            `${base} lyrics in hindi`,
            `${base} chords`,
        ]).slice(0, 10);
    }, [plainTitle]);

    const hasChords = Object.values(song.translations).some(t =>
        t.lyrics.some(l => l.chords && l.chords.length > 0)
    );
    const hasEnglish = !!song.translations['english'];
    const hasMalayalam = !!song.translations['malayalam'];
    const isHolySpiritSong = /pavitr|pavitra|holy spirit/i.test(`${song.title} ${song.description}`);
    const isPrayerSong = /prarthna|prarthana|prayer/i.test(`${song.title} ${song.description}`);
    const topSearchIntent = useMemo(() => {
        const phrases = [
            `${song.title} lyrics`,
            `${song.title} lyrics in Hindi`,
            `${song.title} Hinglish lyrics`,
        ];

        if (hasEnglish) phrases.push(`${song.title} English translation`);
        if (hasMalayalam) phrases.push(`${song.title} Malayalam lyrics`);
        if (hasChords) phrases.push(`${song.title} guitar chords`);
        if (isPrayerSong) phrases.push(`${song.title} prayer meeting song`);
        if (isHolySpiritSong) phrases.push(`${song.title} Holy Spirit worship song`);

        return phrases.slice(0, 6).join(", ");
    }, [song.title, hasEnglish, hasMalayalam, hasChords, isPrayerSong, isHolySpiritSong]);
    const heroSummary = useMemo(() => {
        const languageCopy = hasMalayalam
            ? `${languagesText || "Hindi, Hinglish, English, and Malayalam"}`
            : `${languagesText || "Hindi, Hinglish, and English"}`;
        const chordCopy = hasChords ? " with guitar chords" : "";
        const themeCopy = isHolySpiritSong
            ? "This Holy Spirit worship song is often used in church prayer meetings, personal devotion, and youth fellowship."
            : "This worship song is often used in church prayer meetings, personal devotion, and fellowship worship.";

        return `Read ${song.title} lyrics in ${languageCopy}${chordCopy}, with clear verse flow, transliteration support, and meaning-friendly formatting. ${themeCopy}`;
    }, [song.title, languagesText, hasMalayalam, hasChords, isHolySpiritSong]);

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebPage",
                "name": `${song.title} Lyrics in Hindi`,
                "url": canonicalUrl,
                "description": `Hindi Christian song lyrics, chords, and meaning for ${song.title}.`,
                "inLanguage": ["hi", "en"]
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://biblequizcompetition.com/"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Hindi Songs",
                        "item": "https://biblequizcompetition.com/hindi-songs"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": song.title,
                        "item": canonicalUrl
                    }
                ]
            },
            {
                "@type": "MusicComposition",
                "name": song.title,
                "description": song.description,
                "lyrics": {
                    "@type": "CreativeWork",
                    "text": allLyricsText.hindiText
                },
                "alternateName": songAliases,
                "inLanguage": "hi"
            },
            {
                "@type": "FAQPage",
                "mainEntity": [
                    {
                        "@type": "Question",
                        "name": `${song.title} lyrics कहाँ मिलेंगी?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `इस पेज पर ${song.title} के full Hindi lyrics और worship-friendly format उपलब्ध है।`
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Is ${song.title} available with chords?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": hasChords
                                ? "Yes, available chord lines are displayed above the corresponding lyric lines."
                                : "Chords are being added progressively as verified patterns become available."
                        }
                    },
                    {
                        "@type": "Question",
                        "name": `Can I read ${song.title} meaning in English?`,
                        "acceptedAnswer": {
                            "@type": "Answer",
                            "text": hasEnglish
                                ? "Yes, English meaning lines are available. Toggle the English meaning switch."
                                : "English meaning is being expanded and may be added soon for this song."
                        }
                    }
                ]
            },
            ...(song.videoUrl ? [generateVideoSchema({
                title: `${song.title} - Hindi Christian Song Lyrics & Video`,
                description: `Watch video and read lyrics for the Hindi Christian song "${song.title}".`,
                videoUrl: song.videoUrl,
                thumbnailUrl: thumbnailUrl
            })] : [])
        ]
    };

    const handleShare = async () => {
        try {
            await navigator.share({
                title: song.title,
                text: `${song.title} - Hindi Christian Song Lyrics`,
                url: window.location.href,
            });
        } catch (error) {
            toast({
                title: "Sharing failed",
                description: "You can copy the URL to share instead.",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/30">
            <Helmet>
                <title>{seoTitle}</title>
                <meta
                    name="description"
                    content={`Read full ${song.title} lyrics in ${languagesText || "Hindi"}, understand meaning line by line, and practice worship with${hasChords ? " guitar chords," : ""} transliteration, and Bible-based reflection.`}
                />
                <meta
                    name="keywords"
                    content={dedupe([
                        `${song.title} lyrics`,
                        `${song.title} lyrics in hindi`,
                        `${song.title} lyrics in hinglish`,
                        `${song.title} lyrics in english`,
                        `${song.title} lyrics in malayalam`,
                        `${song.title} meaning`,
                        `${song.title} chords`,
                        "hindi christian songs lyrics",
                        "hinglish christian songs lyrics",
                        "yeshu ke geet",
                        "worship songs hindi",
                        ...songAliases.slice(0, 4),
                    ]).join(", ")}
                />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:type" content="music.song" />
                <meta property="og:title" content={`${song.title} Lyrics in Hindi, Meaning${hasChords ? " & Chords" : ""}`} />
                <meta property="og:description" content={`Explore line-by-line lyrics, meaning, and worship notes for ${song.title}.`} />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>
            <AdSenseTag />

            <Navigation />

            <div className="container mx-auto px-4 py-6">
                <Button
                    variant="ghost"
                    onClick={() =>
                        navigate(backHref, {
                            state: {
                                restoreScrollY: backState?.returnScrollY ?? 0,
                            },
                        })
                    }
                    className="mb-6 hover:bg-white text-gray-600 hover:text-orange-600 transition-all font-bold"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Songs
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Sidebar - Meta & Controls */}
                    <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                            <h1 className="text-3xl md:text-4xl font-bold font-urbanist text-gray-900 mb-2 leading-tight">
                                {song.title}
                            </h1>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-0.5 rounded uppercase tracking-wider">Lyrics</span>
                                {hasChords && <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-wider">Guitar Chords</span>}
                                {hasEnglish && <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded uppercase tracking-wider">English Translation</span>}
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed mb-6 font-medium">
                                {heroSummary}
                            </p>
                            <p className="text-[11px] text-gray-400 leading-relaxed mb-6 font-medium">
                                Popular searches: {topSearchIntent}.
                            </p>

                            <div className="flex items-center gap-3 mb-8">
                                <Button
                                    variant="outline"
                                    onClick={handleShare}
                                    className="flex-grow rounded-xl bg-gray-50 border-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-all font-bold"
                                >
                                    <Share2 className="mr-2 h-4 w-4" />
                                    Share Song
                                </Button>
                            </div>

                        </div>

                        {videoId ? (
                            <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-gray-100">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}`}
                                        className="w-full h-full"
                                        title={song.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        ) : thumbnailUrl ? (
                            <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="aspect-video rounded-2xl overflow-hidden ring-1 ring-gray-100 bg-orange-50">
                                    <img
                                        src={thumbnailUrl}
                                        alt={`${song.title} thumbnail`}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ) : null}

                    </aside>

                    {/* Right Content - Lyrics */}
                    <div className="lg:col-span-8">
                        <Card className="rounded-[2.5rem] border-none shadow-xl shadow-gray-200/50 bg-white overflow-hidden min-h-[600px] relative">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />

                            <CardContent className="p-8 md:p-16">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {availableLanguageTabs.map((tab) => (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() => setSelectedLang(tab.key)}
                                            className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${selectedLang === tab.key
                                                    ? "bg-orange-100 text-orange-700"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                }`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {displaySections.length === 0 ? (
                                    <div className="max-w-2xl mx-auto text-left mt-2">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-urbanist">
                                            Lyrics unavailable
                                        </h2>
                                        {currentTranslation?.lyrics?.length ? (
                                            <p className="text-gray-600 leading-relaxed">
                                                This song entry has corrupted source text. We are re-verifying and will update it with proper Unicode lyrics.
                                            </p>
                                        ) : (
                                            <p className="text-gray-600 leading-relaxed">
                                                This song is not yet available in {selectedLang.charAt(0).toUpperCase() + selectedLang.slice(1)}.
                                                Please switch to another language tab.
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-10 mt-2">
                                        {displaySections.map((section, index) => (
                                            <div key={index} className="relative">
                                                <div className="space-y-3">
                                                    {section.lines.map((line, lineIndex) => (
                                                        <div
                                                            key={lineIndex}
                                                            className={`flex flex-col items-start ${lineIndex > 0 && lineIndex % 2 === 0 ? "mt-5" : ""}`}
                                                        >
                                                            {section.chords && section.chords[lineIndex] && (
                                                                <p className="text-orange-600 font-mono text-sm md:text-base font-black mb-1 tracking-[0.1em] whitespace-pre-wrap bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100 shadow-sm">
                                                                    {section.chords[lineIndex]}
                                                                </p>
                                                            )}
                                                            <p className="font-medium text-gray-900 text-xl md:text-2xl text-left leading-tight font-urbanist">
                                                                {line}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <div className="mt-8 grid grid-cols-1 gap-6">
                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-5">
                                    <h2 className="text-2xl font-bold text-gray-900">Related Hindi Worship Songs</h2>
                                    <p className="text-sm text-gray-600">Explore similar songs with lyrics, chords, and quick details.</p>
                                    <div className="-mx-1 overflow-x-auto pb-1">
                                        <div className="flex gap-4 px-1 snap-x snap-mandatory">
                                            {relatedSongsForSlider.map((related) => {
                                                const relatedThumb = resolveSongThumbnail(related);
                                                const relatedHindiSections = related.translations?.hindi?.lyrics || [];
                                                const relatedLineCount = relatedHindiSections.reduce((sum, sec) => sum + (sec.lines?.length || 0), 0);
                                                const relatedHasChords = relatedHindiSections.some((sec) => sec.chords && sec.chords.length > 0);
                                                return (
                                                    <div
                                                        key={related.slug}
                                                        className="snap-start min-w-[260px] sm:min-w-[300px] max-w-[320px] bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
                                                    >
                                                        {relatedThumb ? (
                                                            <img
                                                                src={relatedThumb}
                                                                alt={`${related.title} thumbnail`}
                                                                className="w-full h-36 object-cover"
                                                                loading="lazy"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-36 bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-semibold">
                                                                No thumbnail
                                                            </div>
                                                        )}
                                                        <div className="p-4 space-y-3">
                                                            <h3 className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[2.5rem]">{related.title}</h3>
                                                            <div className="flex flex-wrap gap-2 text-[11px]">
                                                                <span className="px-2 py-1 rounded-full bg-orange-50 text-orange-700 font-semibold">{relatedLineCount} lines</span>
                                                                <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold">{relatedHasChords ? "Chords" : "Lyrics"}</span>
                                                            </div>
                                                            <Button
                                                                variant="outline"
                                                                className="w-full justify-center font-semibold"
                                                                onClick={() => navigate(`/hindi-songs/${related.slug}`)}
                                                            >
                                                                View Song
                                                            </Button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">About This Song</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong>{song.title}</strong> is a Hindi Christian worship song that people often search for as
                                        <strong> {song.title} lyrics</strong>, <strong>{song.title} lyrics in Hindi</strong>, and
                                        {hasEnglish ? <strong> {song.title} English translation</strong> : <strong> {song.title} meaning</strong>}. This page is designed for readers who want the full lyrics in one place with easy-to-read formatting for worship, devotion, and song practice.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        {isHolySpiritSong
                                            ? `The theme of this song centers on inviting the Holy Spirit, walking in humility, and praying in truth. That makes it especially relevant for Holy Spirit worship sessions, church prayer meetings, revival gatherings, and quiet personal prayer time.`
                                            : `The song is widely suited for church services, family prayer, and personal worship because its language is simple, reverent, and easy to sing together.`}
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        This page currently contains <strong>{stats.sections}</strong> lyric sections and <strong>{stats.lines}</strong> lyric lines.
                                        You can read the song in <strong>{languagesText || "Hindi"}</strong>{hasEnglish ? ", including an English meaning/translation layer" : ""}{hasChords ? ", along with available guitar chord support" : ""}. This helps worship teams, singers, and bilingual congregations prepare the song with better pronunciation, understanding, and flow.
                                    </p>
                                    <p className="text-gray-700 leading-relaxed">
                                        If you are searching for <strong>{song.title} lyrics in Hindi</strong>, <strong>{song.title} Hinglish lyrics</strong>,
                                        {hasMalayalam ? <strong> {song.title} Malayalam lyrics</strong> : <strong> {song.title} devotional lyrics</strong>}, <strong>{song.title} meaning</strong>, or
                                        <strong> {song.title} worship song lyrics</strong>, this page brings those search intents together in one place with readable verse flow and mobile-friendly formatting.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Related Resources</h2>
                                    <p className="text-gray-700 leading-relaxed">
                                        Explore more Christian resources on Bible Quiz Competition including Hindi worship songs, English songs, Malayalam songs, and Bible stories for kids.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a href="/hindi-songs" className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-sm font-semibold hover:bg-orange-100">Hindi Songs</a>
                                        <a href="/english-songs" className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100">English Songs</a>
                                        <a href="/malayalam-songs" className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-semibold hover:bg-emerald-100">Malayalam Songs</a>
                                        <a href="/kids-stories" className="px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 text-sm font-semibold hover:bg-violet-100">Kids Stories</a>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Quick Song Facts</h2>
                                    <ul className="text-gray-700 text-sm space-y-2">
                                        <li><strong>Primary Language:</strong> Hindi</li>
                                        <li><strong>Total Sections:</strong> {stats.sections}</li>
                                        <li><strong>Total Lines:</strong> {stats.lines}</li>
                                        <li><strong>Chords Available:</strong> {hasChords ? "Yes" : "Not yet"}</li>
                                        <li><strong>English Meaning:</strong> {hasEnglish ? "Yes" : "Not yet"}</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Search Variations People Use</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {titleVariants.map((variant) => (
                                            <span
                                                key={variant}
                                                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold"
                                            >
                                                {variant}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">Also Searched As</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {songAliases.map((alias) => (
                                            <span
                                                key={alias}
                                                className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold"
                                            >
                                                {alias}
                                            </span>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-3xl border-gray-100">
                                <CardContent className="p-8 space-y-4">
                                    <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
                                    <div className="space-y-4 text-gray-700">
                                        <div>
                                            <h3 className="font-bold text-gray-900">Can I use this song in church worship?</h3>
                                            <p className="text-sm mt-1">Yes. This song is commonly used for congregational worship, prayer meetings, and devotion time.</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Do you provide guitar chords for this song?</h3>
                                            <p className="text-sm mt-1">{hasChords ? "Yes, available chord lines are shown with the lyrics." : "Not fully yet. We are progressively adding verified chord patterns."}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Is English meaning available?</h3>
                                            <p className="text-sm mt-1">{hasEnglish ? "Yes, enable “English Meaning” using the toggle in the sidebar." : "Meaning notes are being expanded; check this page again for updates."}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HindiSongDetail;