const SongModel = require('../models/song');

class SongService {
  constructor() {
    this.songModel = new SongModel();
  }

  getSongs() {
    return this.songModel.getSongs();
  }

  createSong(song) {
    return this.songModel.createSong(song);
  }

  getSongById(id) {
    return this.songModel.getSongById(id);
  }

  updateSong(id, currentSong, newSong) {

    currentSong.setTitle(newSong.validateTitle() ? newSong.getTitle() : currentSong.getTitle());
    currentSong.setArtist(newSong.validateArtist() ? newSong.getArtist() : currentSong.getArtist());
    currentSong.setPlayedCount(newSong.validatePlayedCount() ? newSong.getPlayedCount() : currentSong.getPlayedCount());
    currentSong.setImageUrl(newSong.validateImageUrl() ? newSong.getImageUrl() : currentSong.getImageUrl());
    currentSong.setSongUrl(newSong.validateSongUrl() ? newSong.getSongUrl() : currentSong.getSongUrl());

    return this.songModel.updateSong(id, currentSong);
  }
}

module.exports = SongService;
