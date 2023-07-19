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

exports.getPlaylistById = (req, res) => {
    const id = req.params.id;

    // exist data
    const playlist = playlistService.getPlaylistById(id);

    if (!playlist) {
        return res.status(404).send({ message: "Playlist not found" });
    }

    return res.status(200).send({ message: "Success", data: playlist });

}

exports.updatePlaylist = (req, res) => {
    const id = req.params.id;

    // request data
    const persistPlaylistDTO = new PersistPlaylistDTO(req.body);

    // exist data
    const playlist = playlistService.getPlaylistById(id);

    if (!playlist) {
        return res.status(404).send({ message: "Song not found" });
    }

    // validate
    playlist.setName(persistPlaylistDTO.validateName() ? persistPlaylistDTO.getName() : playlist.getName());

    // updated data
    const updatedPlaylist = playlistService.updatePlaylist(id, playlist);

    if (!updatedPlaylist) {
        return res.status(404).send({ message: "Update fail" });
    }

    return res.status(200).send({ message: "Updated playlist!", data: updatedPlaylist });

}
