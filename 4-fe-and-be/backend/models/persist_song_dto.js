class PersistSongDTO {
    constructor(data) {
        this.title = data.title;
        this.artist = data.artist;
        this.imageUrl = data.imageUrl;
        this.songUrl = data.songUrl;
        this.playedCount = data.playedCount;
    }

    validateTitle() {
        if (this.title == null || this.title == "") return false;
        return true;
    }

    validateArtist() {
        if (this.artist == null || this.artist == "") return false;
        return true;
    }

    validateImageUrl() {
        if (this.imageUrl == null || this.imageUrl == "") return false;
        return true;
    }

    validateSongUrl() {
        if (this.songUrl == null || this.songUrl == "") return false;
        return true;
    }

    validatePlayedCount() {
        if (this.playedCount == null || Number.isInteger(this.playedCount) == false) return false;
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
        return this.playedCount;
    }

    setPlayedCount(playedCount) {
        this.playedCount = playedCount;
    }
}

module.exports = PersistSongDTO;
