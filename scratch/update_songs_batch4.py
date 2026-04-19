import json
import os

filepath = '/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json'

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

song_updates = {
    "aa-prabhu-yeshu-aa": {
        "english": "Come Lord Jesus come, Your glory be in me. We worship You with all our heart and soul.",
        "chords": [["G", "C", "D", "G"], ["G", "C", "D", "G"]]
    },
    "hallelujah-stuti-gaye-hum": {
        "english": "Hallelujah, let us sing praise. Let us sing praise to Jesus.",
        "chords": [["G", "D", "C", "G"], ["G", "D", "G", "G"]]
    },
    "prashansa-howe-prabhu-ki": {
        "english": "Then sings my soul, my Savior God to Thee; How great Thou art, how great Thou art!",
        "chords": [["G", "C", "D", "G"], ["G", "C", "D", "G"]]
    }
}

# New song data
new_song = {
    "id": "krus_par_bali_dwara",
    "slug": "krus-par-bali-dwara",
    "title": "KRUS PAR BALI DWARA",
    "videoUrl": "https://www.youtube.com/embed/fkK95m5UK5o", # Placeholder video
    "description": "KRUS PAR BALI DWARA - Hindi Christian Devotional Song Lyrics",
    "translations": {
        "hindi": {
            "lang": "Hindi",
            "lyrics": [
                {
                    "lines": [
                        "क्रूस पर बलि द्वारा,",
                        "अपना लहू बहाया - 2",
                        "पाप को हटा कर, साफ़ है किया,",
                        "हमको बचा लिया - 2"
                    ]
                },
                {
                    "verse": "1",
                    "lines": [
                        "हा - हल्लेलूयाह, हल्लेलूयाह, हल्लेलूयाह - 2"
                    ],
                    "chords": ["G", "C", "D", "G"]
                }
            ]
        },
        "english": {
            "lang": "English",
            "lyrics": [
                {
                    "lines": [
                        "Through the sacrifice on the cross,",
                        "He shed His blood - 2",
                        "Removed our sins, made us clean,",
                        "He has saved us - 2"
                    ]
                }
            ]
        }
    }
}

# Check if new song already exists (it shouldn't, but let's be safe)
if not any(s['slug'] == new_song['slug'] for s in data):
    data.append(new_song)

count = 0
for song in data:
    if song['slug'] in song_updates:
        update = song_updates[song['slug']]
        
        # Add English translation
        song['translations']['english'] = {
            "lang": "English",
            "lyrics": [{"lines": [update['english']]}]
        }
        
        # Add Chords
        hindi_lyrics = song['translations']['hindi']['lyrics']
        for i, section in enumerate(hindi_lyrics):
            if i < len(update['chords']):
                section['chords'] = update['chords'][i]
        
        count += 1
        print(f"Updated: {song['title']} ({song['slug']})")

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully updated {count} songs and added 1 new song in Batch 4.")
