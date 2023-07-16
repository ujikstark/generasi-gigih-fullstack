const express = require('express');
const cors = require('cors');
const fs = require('fs');

const { v4: uuid } = require("uuid");

const app = express();
const port = 3000;

app.use(cors());

app.get('/songs', (req, res) => {

    const songs = getSongs();

    res.status(200).send({data: songs});
})

app.get('/playlists', (req, res) => {
    const playlists = getPlaylists();
    
    res.status(200).send({data: playlists});
})

app.post('/playlists', express.json(), async (req, res) => {
    const playlistData = req.body;

    if (playlistData.name == null) return res.status(401).send({error: true, message: "Playlist data missing"});
    
    const newPlaylist = {
        id: uuid(),
        name: playlistData.name,
    }

    const existPlaylists = getPlaylists();
    existPlaylists.playlists.push(newPlaylist);

    savePlaylists(existPlaylists);


    res.status(201).send({message: "Playlist added successfuly!", data: existPlaylists});
});

// add song to playlist
app.patch('/playlists/:id', express.json(), (req, res) => {
    const id = req.params.id;

    const songData = req.body;
    if (songData.id == null) return res.status(401).send({error: true, message: "Song data missing"});


    // const songData = { "id": "2", "title": "Sial", "artist": "Mahalini", "music": "music/sial-mahalini.mp3", "img": "img/sial-mahalini.jpeg" };

    const existPlaylists = getPlaylists().playlists;

    var playlistIdx = -1;
    for (let i = 0; i < existPlaylists.length; i++) {
        if (existPlaylists[i].id == id) {
            playlistIdx = i;
            break;
        }
    }

    // const findExist = existPlaylists.find(playlist => playlist.id === id);
    const findExist = existPlaylists[playlistIdx];
    if (!findExist) {
        return res.status(409).send({message: `playlist id ${id} not exist`});
    }


    if (findExist.songs === undefined) {
        findExist.songs = [songData];
    } else {
        // check song exists
        for (let i = 0; i < findExist.songs.length; i++) {
            if (findExist.songs[i].id == songData.id) 
                return res.status(409).send({message: `song id ${songData.id} exists!`});
        }

        findExist.songs.push(songData);
    }

    existPlaylists[playlistIdx] = findExist;

    savePlaylists({playlists: existPlaylists});

    res.send({message: "Added song successfuly", data: findExist});

});



const getSongs = () => {
    const jsonData = fs.readFileSync('dummy_data/songs.json');
    return JSON.parse(jsonData);
}

const getPlaylists = () => {
    const jsonData = fs.readFileSync('dummy_data/playlists.json');
    return JSON.parse(jsonData);
}

const savePlaylists = (data) => {
    const stringifyData = JSON.stringify(data, null, 4);
    fs.writeFileSync('dummy_data/playlists.json', stringifyData);
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})