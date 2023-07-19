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
}

module.exports = SongService;
