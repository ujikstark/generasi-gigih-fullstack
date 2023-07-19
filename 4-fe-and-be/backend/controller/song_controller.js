const SongService = require('../services/song_service');
const PersistSongDTO = require('../models/persist_song_dto');

const songService = new SongService();

exports.getSongs = (req, res) => {
  const songs = songService.getSongs();
  res.status(200).send({ message: "Success", data: songs });
};

exports.createSong = (req, res) => {

  // request data
  const persistSongDTO = new PersistSongDTO(req.body);
  try {

    // validate request data
    persistSongDTO.validate()

    // create and save data
    const song = songService.createSong(persistSongDTO);

    return res.status(201).send({ message: "Created new song", data: song });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
};

exports.getSongById = (req, res) => {
  const id = req.params.id;

  try {
    // exist data
    const song = songService.getSongById(id);

    return res.status(200).send({ message: "Success", data: song });
  } catch (err) {

    return res.status(400).send({ message: err.message });
  }
}

exports.updateSong = (req, res) => {
  const id = req.params.id;


  // request data
  const persistSongDTO = new PersistSongDTO(req.body);

  try {
    // exist data
    const song = songService.getSongById(id);

    // validate
    song.setTitle(persistSongDTO.validateTitle() ? persistSongDTO.getTitle() : song.getTitle());
    song.setArtist(persistSongDTO.validateArtist() ? persistSongDTO.getArtist() : song.getArtist());
    song.setPlayedCount(persistSongDTO.validatePlayedCount() ? persistSongDTO.getPlayedCount() : song.getPlayedCount());
    song.setImageUrl(persistSongDTO.validateImageUrl() ? persistSongDTO.getImageUrl() : song.getImageUrl());
    song.setSongUrl(persistSongDTO.validateSongUrl() ? persistSongDTO.getSongUrl() : song.getSongUrl());

    // updated data
    const updatedSong = songService.updateSong(id, song);


    return res.status(200).send({ message: "Updated song!", data: updatedSong });
  } catch (err) {
    return res.status(400).send({ message: err.message });

  }

}

// sorted songs by played count
exports.sortedSongs = (req, res) => {
  const songs = songService.sortedSongs();
  res.status(200).send({ message: "Success", data: songs });
}
