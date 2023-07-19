const PlaylistService = require('../services/playlist_service');
const SongService = require('../services/song_service');
const PersistPlaylistDTO = require('../models/persist_playlist_dto');
const PersistPlaylistSongDTO = require('../models/persist_playlist_song_dto');


const playlistService = new PlaylistService();
const songService = new SongService();

exports.getPlaylists = (req, res) => {
    const playlists = playlistService.getPlaylists();
    res.status(200).send({ message: "Success", data: playlists });
};

exports.createPlaylist = (req, res) => {

    // request data
    const persistPlaylistDTO = new PersistPlaylistDTO(req.body);

    try {
        // validate request data
        persistPlaylistDTO.validate();

        // create and save data
        const playlist = playlistService.createPlaylist(persistPlaylistDTO);

        return res.status(201).send({ message: "Created new playlist", data: playlist });
    } catch (err) {
        return res.status(400).send({ message: err.message });

    }
};

exports.getPlaylistById = (req, res) => {
    const id = req.params.id;

    try {
        // exist data
        const playlist = playlistService.getPlaylistById(id);

        return res.status(200).send({ message: "Success", data: playlist });
    } catch (err) {
        return res.status(400).send({ message: err.message });

    }

}

exports.updatePlaylist = (req, res) => {
    const id = req.params.id;

    // request data
    const persistPlaylistDTO = new PersistPlaylistDTO(req.body);

    try {
        // exist data
        const playlist = playlistService.getPlaylistById(id);

        // validate
        playlist.setName(persistPlaylistDTO.validateName() ? persistPlaylistDTO.getName() : playlist.getName());

        // updated data
        const updatedPlaylist = playlistService.updatePlaylist(id, playlist);

        return res.status(200).send({ message: "Updated playlist!", data: updatedPlaylist });

    } catch (err) {
        return res.status(400).send({ message: err.message });
    }


}

exports.addSong = (req, res) => {
    const id = req.params.id;

    // request data
    const addSongPlaylistDTO = new PersistPlaylistSongDTO(req.body);

    try {
        // exist data
        const playlist = playlistService.getPlaylistById(id);

        // validate request data
        addSongPlaylistDTO.validate();
        const songId = addSongPlaylistDTO.getSongId();

        // check song id valid
        const song = songService.getSongById(songId);

        const updatedPlaylist = playlistService.addSong(playlist.id, song.id);

        return res.status(200).send({ message: "Updated playlist!", data: updatedPlaylist });
    } catch (err) {

        return res.status(400).send({ message: err.message });
    }
}

exports.deleteSong = (req, res) => {
    const playlistId = req.params.id;

    // request data
    const deleteSongPlaylistDTO = new PersistPlaylistSongDTO(req.body);

    try {
        // exist data
        const playlist = playlistService.getPlaylistById(playlistId);

        // validate request data
        deleteSongPlaylistDTO.validate();
        const songId = deleteSongPlaylistDTO.getSongId();

        // check song id valid
        const song = songService.getSongById(songId);

        const updatedPlaylist = playlistService.deleteSong(playlist.id, song.id);

        return res.status(200).send({ message: "Updated playlist!", data: updatedPlaylist });
    } catch (err) {
        return res.status(400).send({ message: err.message });
    }
}

