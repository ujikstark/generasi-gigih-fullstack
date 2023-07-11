const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/songs', (req, res) => {

    var songs = [
        {id: 1, title: 'Songs 1', artist: 'Artist 1', played_count: 2},
        {id: 2, title: 'Songs 2', artist: 'Artist 2', played_count: 5},
        {id: 3, title: 'Songs 3', artist: 'Artist 3', played_count: 10},
    ];

    res.status(200).send({data: songs});
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})