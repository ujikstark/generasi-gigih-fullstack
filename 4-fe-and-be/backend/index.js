const express = require('express');
const cors = require('cors');
const songController = require('./controller/song_controller');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.get('/songs', songController.getSongs);
app.post('/songs', songController.createSong);


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})