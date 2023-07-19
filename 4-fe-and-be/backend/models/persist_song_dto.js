class PersistSongDTO {
    constructor(data) {
        this.title = data.title;
        this.artist = data.artist;
        this.imageUrl = data.imageUrl;
        this.songUrl = data.songUrl;
        this.playedCount = data.playedCount;
    }

    validate() {
        if (this.title == null || this.title == "") return false;
        if (this.artist == null || this.artist == "") return false;
        if (this.imageUrl == null || this.imageUrl == "") return false;
        if (this.songUrl == null || this.songUrl == "") return false;
        if (this.playedCount == null) return false;

        return true;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getArtist() {
        return this.artist;
    }

    setArtist(artist) {
        this.artist = artist;
    }

    getSongUrl() {
        return this.songUrl;
    }

    setSongUrl(songUrl) {
        this.songUrl = songUrl;
    }

    getImageUrl() {
        return this.imageUrl;
    }

    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    }

    getPlayedCount() {
        return this.played_count;
    }

    setPlayedCount(playedCount) {
        this.played_count = playedCount;
    }
}

module.exports = PersistSongDTO;
