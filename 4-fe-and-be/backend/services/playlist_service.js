const PlaylistModel = require('../models/playlist');

class PlaylistService {
  constructor() {
    this.playlistModel = new PlaylistModel();
  }

  getPlaylists() {
    return this.playlistModel.getPlaylists();
  }

  createPlaylist(playlist) {
    return this.playlistModel.createPlaylist(playlist);
  }

  getPlaylistById(id) {
    return this.playlistModel.getPlaylistById(id);
  }

  updatePlaylist(id, playlist) {
    return this.playlistModel.updatePlaylist(id, playlist);
  }

  addSong(playlistId, songId) {
    return this.playlistModel.addSong(playlistId, songId);
  }

  deleteSong(playlistId, songId) {
    return this.playlistModel.deleteSong(playlistId, songId);
  }

}

module.exports = PlaylistService;
