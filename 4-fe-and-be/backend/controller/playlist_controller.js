const PlaylistService = require('../services/playlist_service');

const playlistService = new PlaylistService();

exports.getPlaylists = (req, res) => {
  const playlists = playlistService.getPlaylists();
  res.status(200).send({ message: "Success", data: playlists });
};

