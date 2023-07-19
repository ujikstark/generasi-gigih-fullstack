const SongService = require('../services/song_service');
const PersistSongDTO = require('../models/persist_song_dto');

const songService = new SongService();

exports.getSongs = (req, res) => {
  const songs = songService.getSongs();
  res.status(200).send({ message: "Success", data: songs });
};

exports.createSong = (req, res) => {
  const persistSongDTO = new PersistSongDTO(req.body);

  if (!(persistSongDTO.validate())) {
    return res.status(400).send({ error: true });
  }


  const song = songService.createSong(persistSongDTO);

  return res.status(201).send({ message: "Created new song", data: song });
};