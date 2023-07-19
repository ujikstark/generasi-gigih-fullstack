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
}

module.exports = SongService;
