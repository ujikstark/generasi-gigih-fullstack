class PersistSongDTO {
    constructor(data) {
        this.title = data.title;
        this.artist = data.artist;
        this.imageUrl = data.imageUrl;
        this.songUrl = data.songUrl;
        this.playedCount = data.playedCount;
    }

    validate() {
        if (this.validateTitle() && this.validateArtist() && this.validateImageUrl && this.validateSongUrl())
            return true;
        else
            throw new Error("Invalid request data")
    }

    validateTitle() {
        if (this.title == null || this.title == "") throw new Error("title is invalid");
        return true;
    }

    validateArtist() {
        if (this.artist == null || this.artist == "") throw new Error("artist is invalid");
        return true;
    }

    validateImageUrl() {
        if (this.imageUrl == null || this.imageUrl == "") throw new Error("imageUrl is invalid");
        return true;
    }

    validateSongUrl() {
        if (this.songUrl == null || this.songUrl == "") throw new Error("songUrl is invalid");
        return true;
    }

    validatePlayedCount() {
        if (this.playedCount == null || Number.isInteger(this.playedCount) == false) throw new Error("playedCount is invalid");
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
