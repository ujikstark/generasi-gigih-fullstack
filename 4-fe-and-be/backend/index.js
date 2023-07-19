const express = require('express');
const cors = require('cors');

const songController = require('./controller/song_controller');
const playlistController = require('./controller/playlist_controller');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// song api 
app.get('/songs', songController.getSongs);
app.get('/songs/:id', songController.getSongById);
app.post('/songs', songController.createSong);
app.put('/songs/:id', songController.updateSong);
app.get('/songs/sorted/most-played', songController.sortedSongs);


// playlist api 
app.get('/playlists', playlistController.getPlaylists);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})