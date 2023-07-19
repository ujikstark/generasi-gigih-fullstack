const PlaylistService = require('../services/playlist_service');
const PersistPlaylistDTO = require('../models/persist_playlist_dto');


const playlistService = new PlaylistService();

exports.getPlaylists = (req, res) => {
  const playlists = playlistService.getPlaylists();
  res.status(200).send({ message: "Success", data: playlists });
};

exports.createPlaylist = (req, res) => {

    // request data
    const persistPlaylistDTO = new PersistPlaylistDTO(req.body);
  
    // validate request data
    if (!(persistPlaylistDTO.validate())) {
      return res.status(400).send({ error: true });
    }
  
    // create and save data
    const playlist = playlistService.createPlaylist(persistPlaylistDTO);
  
    return res.status(201).send({ message: "Created new playlist", data: playlist });
  };

