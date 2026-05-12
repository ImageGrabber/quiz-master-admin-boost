import json

def update_song_thumbnails(file_path, updates):
    with open(file_path, 'r', encoding='utf-8') as f:
        songs = json.load(f)
    
    updated_count = 0
    for song in songs:
        slug = song.get('slug')
        if slug in updates:
            song['thumbnailUrl'] = updates[slug]
            updated_count += 1
            
    if updated_count > 0:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(songs, f, indent=2, ensure_ascii=False)
        print(f"Updated {updated_count} songs in {file_path}")
    else:
        print(f"No songs updated in {file_path}")

# Example usage for the first song
updates = {
    "aakha-jag-toh-yeshu-ko-jaan": "/assets/songs/thumbnails/aakha-jag-toh-yeshu-ko-jaan.png",
    "aaradhana-teri-aaradhana": "/assets/songs/thumbnails/aaradhana-teri-aaradhana.png",
    "apni-rooh-se-bhar-de": "/assets/songs/thumbnails/apni-rooh-se-bhar-de.png",
    "aye-khuda-kamal-ke-chashme": "/assets/songs/thumbnails/aye-khuda-kamal-ke-chashme.png",
    "aazmaaya-jo-jaave": "/assets/songs/thumbnails/aazmaaya-jo-jaave.png",
    "abdi-paharon-ko": "/assets/songs/thumbnails/abdi-paharon-ko.png"
}

update_song_thumbnails('/Users/stevenmathew/Downloads/Projects/BibleQuizCompetition/quiz-master-admin-boost/src/data/hindi-songs.json', updates)
