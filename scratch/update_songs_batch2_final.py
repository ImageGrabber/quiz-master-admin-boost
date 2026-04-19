import json
import os

filepath = '/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json'

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

song_updates = {
    "aao-pavitra-aatma-tere-samukh": {
        "english": "Come Holy Spirit, in Your presence we bow. Your peace and love we seek now.",
        "chords": [["Em", "D", "Em", "D"], ["Am", "D", "Em", "Em"]]
    },
    "hum-gaye-hosanna": {
        "english": "We sing Hosanna, You are the King of kings. Your glory lasts forever.",
        "chords": [["A", "E", "D", "A"], ["A", "E", "D", "A"]]
    },
    "aata-hun-salib-ke-paas": {
        "english": "I come to the Cross, where You shed Your blood for me. Your love set me free.",
        "chords": [["G", "D", "Em", "C"], ["G", "D", "C", "G"]]
    },
    "aap-ki-mahima-aprampaar": {
        "english": "Your glory is infinite, O Lord. Your mercy is over all the earth.",
        "chords": [["D", "G", "A", "D"], ["Bm", "G", "A", "D"]]
    },
    "aao-naache-aur-gaayen-hum": {
        "english": "Let us dance and sing together. For the Lord has done great things.",
        "chords": [["G", "C", "D", "G"], ["G", "C", "D", "G"]]
    }
}

count = 0
for song in data:
    if song['slug'] in song_updates:
        update = song_updates[song['slug']]
        
        # Add English translation (basic version)
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
        print(f"Updated: {song['title']}")

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Successfully updated {count} songs.")
