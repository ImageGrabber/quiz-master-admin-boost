import json
import os

filepath = '/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json'

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

song_updates = {
    "pavitra-aatma-aa": {
        "english": "Holy Spirit come, fill my heart today. Lead me in Your way.",
        "chords": [["G", "C", "D", "G"], ["G", "C", "D", "G"]]
    },
    "yahowa-charwaha-mera": {
        "english": "The Lord is my Shepherd, I shall not want. He makes me lie down in green pastures.",
        "chords": [["C", "F", "G", "C"], ["C", "F", "G", "C"]]
    },
    "yahowa-ki-stuti-karo": {
        "english": "Praise the Lord, for He is good. His mercy endures forever.",
        "chords": [["D", "G", "A", "D"], ["D", "G", "A", "D"]]
    },
    "hai-mere-man-yehova-ko-dhanya": {
        "english": "Bless the Lord, O my soul. And all that is within me, bless His holy name.",
        "chords": [["E", "A", "B", "E"], ["E", "A", "B", "E"]]
    },
    "aaradhana-teri-aaradhana": {
        "english": "Worship, your worship. O Lord, I worship You with all my heart.",
        "chords": [["Am", "G", "F", "E"], ["Am", "G", "F", "E"]]
    },
    "aanand-aanand-aanand-hai": {
        "english": "Joy, joy, there is joy in the Lord. He has given me a new song.",
        "chords": [["G", "C", "D", "G"], ["G", "C", "D", "G"]]
    },
    "ham-yeshu-masih-ke-chele-hai": {
        "english": "We are the disciples of Jesus Christ. We will follow Him everywhere.",
        "chords": [["A", "D", "E", "A"], ["A", "D", "E", "A"]]
    },
    "apni-rooh-se-bhar-de": {
        "english": "Fill me with Your Spirit, O Lord. Let Your power flow through me.",
        "chords": [["Em", "Am", "B7", "Em"], ["Em", "Am", "B7", "Em"]]
    },
    "aye-khuda-kamal-ke-chashme": {
        "english": "O God, fountain of wonders. You are the source of all life.",
        "chords": [["D", "Bm", "G", "A"], ["D", "Bm", "G", "A"]]
    },
    "abdi-paharon-ko": {
        "english": "I lift my eyes to the eternal mountains. Where does my help come from?",
        "chords": [["F#m", "D", "E", "A"], ["F#m", "D", "E", "A"]]
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

print(f"Successfully updated {count} songs in Batch 3.")
