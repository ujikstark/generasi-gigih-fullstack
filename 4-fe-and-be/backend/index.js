const express = require('express');
const cors = require('cors');
const songController = require('./controller/song_controller');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/songs', songController.getSongs);
app.get('/songs/:id', songController.getSongById);
app.post('/songs', songController.createSong);
app.put('/songs/:id', songController.updateSong);
app.get('/songs/sorted/most-played', songController.sortedSongs);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})