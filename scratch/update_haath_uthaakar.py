import json

filepath = '/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json'

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

song_slug = "haath-uthaakar-gaoonga"

update = {
    "english_translation": {
        "lang": "English",
        "lyrics": [
            {
                "lines": [
                    "Jesus Christ is my trust,",
                    "You are my only support.",
                    "Comfort in difficult times,",
                    "You will be with me forever."
                ]
            },
            {
                "verse": "1",
                "lines": [
                    "Your mercy and goodness",
                    "Will remain on me forever",
                    "Your faithfulness",
                    "I will see all my life"
                ]
            },
            {
                "verse": "2",
                "lines": [
                    "I will lift my hands and sing,",
                    "Jesus, may Your name be lifted high.",
                    "I will lift my hands and sing,",
                    "Jesus, may Your name be lifted high."
                ]
            },
            {
                "verse": "3",
                "lines": [
                    "You saved me from death",
                    "You gave me a new life",
                    "Called me by my name",
                    "Filled me with Your glory"
                ]
            }
        ]
    },
    "chords": [
        ["G", "D", "Am", "G"],
        ["G", "D", "C", "D"],
        ["G", "D", "C", "G"],
        ["G", "D", "C", "G"]
    ]
}

found = False
for song in data:
    if song['slug'] == song_slug:
        # Add English translation
        song['translations']['english'] = update['english_translation']
        
        # Add Chords to Hindi lyrics
        hindi_lyrics = song['translations']['hindi']['lyrics']
        for i, section in enumerate(hindi_lyrics):
            if i < len(update['chords']):
                section['chords'] = update['chords'][i]
        
        found = True
        break

if found:
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Successfully updated {song_slug}")
else:
    print(f"Song {song_slug} not found")
