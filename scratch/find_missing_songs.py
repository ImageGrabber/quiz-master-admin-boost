import json
import os

def find_songs_missing_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        songs = json.load(f)
    
    missing_data_songs = []
    generic_thumbnails = [
        "/assets/songs/malayalam_card.png",
        "/assets/songs/hindi_card.png",
        "/assets/songs/english_card.png"
    ]
    
    for song in songs:
        video_url = song.get('videoUrl', '')
        thumbnail_url = song.get('thumbnailUrl', '')
        
        needs_image = False
        if not video_url or video_url.strip() == "":
            needs_image = True
        if not thumbnail_url or thumbnail_url.strip() == "" or thumbnail_url in generic_thumbnails:
            needs_image = True
            
        if needs_image:
            missing_data_songs.append({
                'id': song.get('id'),
                'title': song.get('title'),
                'slug': song.get('slug'),
                'videoUrl': video_url,
                'thumbnailUrl': thumbnail_url,
                'file_path': file_path
            })
            
    return missing_data_songs

hindi_songs = find_songs_missing_data('/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json')
english_songs = find_songs_missing_data('/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/english-songs.json')

all_missing = hindi_songs + english_songs

print(f"Found {len(all_missing)} songs missing video or thumbnail.")
for song in all_missing[:20]: # Print first 20 for a quick look
    print(f"- {song['title']} ({song['slug']}) - Video: '{song['videoUrl']}', Thumb: '{song['thumbnailUrl']}'")

# Save the full list to a file for later use
with open('missing_songs.json', 'w', encoding='utf-8') as f:
    json.dump(all_missing, f, indent=2)
