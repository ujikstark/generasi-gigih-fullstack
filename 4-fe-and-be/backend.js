const express = require('express');
const cors = require('cors');
const { v4: uuid } = require("uuid");


const songs = require('./dummy_data/songs');

const app = express();
const port = 3000;

app.use(cors());

app.get('/songs', (req, res) => {

    res.status(200).send({data: songs});
})

app.post('/playlists', express.json(), async (req, res) => {
    const { name } = req.body;

    const newPlaylist = {
        id: uuid(),
        name: name,
    }

    res.status(201).send({message: "Created new playlist!", data: newPlaylist});
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})