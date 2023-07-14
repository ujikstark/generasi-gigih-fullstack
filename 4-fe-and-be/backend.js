const express = require('express');
const cors = require('cors');
const songs = require('./dummy_data/songs');

const app = express();
const port = 3000;

app.use(cors());

app.get('/songs', (req, res) => {

    res.status(200).send({data: songs});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})