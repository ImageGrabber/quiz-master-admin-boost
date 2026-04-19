import json
filepath = '/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json'
output_path = '/Users/stevenmathew/.gemini/antigravity/brain/8fe80fd6-1c9c-456b-8ac3-d394fd3137f1/song_list.txt'

with open(filepath, 'r', encoding='utf-8') as f:
    data = json.load(f)

with open(output_path, 'w', encoding='utf-8') as f:
    for song in data:
        f.write(f"{song['title']} ||| {song['slug']}\n")

print(f"Wrote {len(data)} songs to {output_path}")
