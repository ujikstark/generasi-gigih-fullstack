class PersistPlaylistSongDTO {
    constructor(data) {
        this.songId = data.songId;
    }

    validate() {
        if (this.validateSongId())
            return true;
        else
            throw new Error(`songId ${this.songId} is invalid`)
    }

    validateSongId() {
        if (this.songId == null || this.songId == "") return false;
        return true;
    }

    getSongId() {
        return this.songId;
    }

    setSongId(songId) {
        this.songId = songId;
    }

    
}

module.exports = PersistPlaylistSongDTO;
