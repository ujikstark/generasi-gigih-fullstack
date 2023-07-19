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

exports.getSongById = (req, res) => {
  const id = req.params.id;

  const song = songService.getSongById(id);


  if (!song) {
    return res.status(404).send({ message: "Song not found" });
  }

  return res.status(200).send({ message: "Success", data: song });

}

exports.updateSong = (req, res) => {
  const id = req.params.id;


  // request data
  const persistSongDTO = new PersistSongDTO(req.body);

  // exist data
  const song = songService.getSongById(id);

  if (!song) {
    return res.status(404).send({ message: "Song not found" });
  }
  
  // updated data
  const updatedSong = songService.updateSong(id, song, persistSongDTO);  
  
  if (!updatedSong) {
    return res.status(404).send({ message: "Update fail" });
  }

  return res.status(200).send({ message: "Updated song!", data: updatedSong });

}
