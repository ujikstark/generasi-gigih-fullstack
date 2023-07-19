class AddSongPlaylistDTO {
    constructor(data) {
        this.songId = data.songId;
    }

    validate() {
        if (this.validateSongId())
            return true;
        else
            return false;
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

module.exports = AddSongPlaylistDTO;
