import json
import os

filepath = '/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json'

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

song_updates = {
    "parmeshwar-sharansthan-aur-bal": {
        "english": "God is our refuge and strength, a very present help in trouble. Therefore we will not fear.",
        "chords": [["G", "C", "D", "G"], ["G", "Am", "D", "G"]]
    },
    "aaradhna-ho-aaradhna": {
        "english": "Worship, let there be worship. Worship to the Lord Jesus.",
        "chords": [["C", "F", "G", "C"], ["C", "F", "G", "C"]]
    },
    "aao-jag-ke-log-sab-hi-christian-song": {
        "english": "Come, all people of the world, let us praise the Lord together.",
        "chords": [["D", "G", "A", "D"], ["D", "G", "A", "D"]]
    }
}

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

print(f"Successfully updated {count} songs in Batch 5.")
