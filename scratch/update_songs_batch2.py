import json
import os

filepath = '/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json'

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

song_updates = {
    "aa-pavitra-atma-mere-dil-mai-aa": {
        "english_lyrics": [
            {
                "lines": [
                    "Come Holy Spirit, come into my heart",
                    "Come Holy Spirit, come into my heart"
                ]
            },
            {
                "verse": "1",
                "lines": [
                    "Wipe away my tears, give me your peace",
                    "Wipe away my tears, give me your peace"
                ]
            },
            {
                "verse": "2",
                "lines": [
                    "Show me the path, be my light",
                    "Show me the path, be my light"
                ]
            }
        ],
        "chords": [
            ["Em", "Am", "D", "Em"],
            ["Em", "Am", "D", "Em"],
            ["Em", "D", "C", "Em"],
            ["Em", "D", "C", "Em"],
            ["Em", "G", "D", "Em"],
            ["Em", "G", "D", "Em"]
        ]
    },
    "hum-gaye-hosanna": {
        "english_lyrics": [
            {
                "lines": [
                    "We sing Hosanna",
                    "You are the King of kings",
                    "Your glory be forever",
                    "You are Lord, our God"
                ]
            },
            {
                "verse": "1",
                "lines": [
                    "Jesus Messiah, there is no one like You",
                    "Jesus Messiah, there is no one like You",
                    "In Your names, we find salvation",
                    "In Your names, we find salvation"
                ]
            }
        ],
        "chords": [
            ["A", "E", "D", "A"],
            ["A", "E", "D", "A"],
            ["E", "Bm", "E", "A"],
            ["E", "Bm", "E", "A"],
            ["A", "F#m", "D", "E"],
            ["A", "F#m", "D", "E"],
            ["D", "E", "A", "A"]
        ]
    },
    "gao-hallelujah-gao-hallelujah": {
        "english_lyrics": [
            {
                "lines": [
                    "Jesus has delivered us from the net of sins",
                    "Jesus has delivered us from the net of sins",
                    "Jesus has saved us from the tricks of Satan",
                    "Jesus has saved us from the tricks of Satan"
                ]
            },
            {
                "lines": [
                    "So sing Hallelujah",
                    "So sing Hallelujah",
                    "So sing Hallelujah",
                    "So sing Hallelujah"
                ]
            }
        ],
        "chords": [
            ["G", "C", "D", "G"],
            ["G", "C", "D", "G"],
            ["G", "C", "D", "G"],
            ["G", "C", "D", "G"],
            ["G", "D", "G", "G"],
            ["G", "D", "G", "G"],
            ["C", "D", "G", "G"],
            ["C", "D", "G", "G"]
        ]
    },
    "sirf-tere-liye-yeshu": {
        "english_lyrics": [
            {
                "lines": [
                    "Only for You Jesus, for You",
                    "Only for You Jesus, for You",
                    "I lift my hands",
                    "Kneeling down, bowing my head",
                    "Lifting my hands for You"
                ]
            }
        ],
        "chords": [
            ["G", "C", "G", "G"],
            ["Am", "D", "G", "G"],
            ["G", "C", "G", "G"],
            ["G", "D", "G", "G"],
            ["D", "G", "G", "G"]
        ]
    },
    "mahima-ho-teri-yeshu-teri-mahima": {
        "english_lyrics": [
            {
                "lines": [
                    "Glory glory be to You",
                    "Glory glory be to You",
                    "Jesus Your glory",
                    "I will do forever"
                ]
            }
        ],
        "chords": [
            ["Am", "G", "F", "Am"],
            ["Am", "G", "F", "Am"],
            ["Am", "G", "F", "Am"],
            ["Am", "G", "F", "Am"]
        ]
    }
}

count = 0
for song in data:
    if song['slug'] in song_updates:
        update = song_updates[song['slug']]
        
        # Add English translation
        song['translations']['english'] = {
            "lang": "English",
            "lyrics": update['english_lyrics']
        }
        
        # Add Chords to Hindi lyrics
        hindi_sections = song['translations']['hindi']['lyrics']
        chords_data = update['chords']
        
        for i, section in enumerate(hindi_sections):
            if i < len(chords_data):
                section['chords'] = chords_data[i]
        
        count += 1

with open(filepath, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Updated {count} songs successfully.")
