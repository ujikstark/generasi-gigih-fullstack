const express = require('express');
const cors = require('cors');
const fs = require('fs');

const { v4: uuid } = require("uuid");

const app = express();
const port = 3000;

app.use(cors());

app.get('/songs', (req, res) => {

    const songs = getSongs();

    res.status(200).send({message:"Success", data: songs});
});

app.get('/songs/:id', (req, res) => {

    const id = req.params.id;

    const songs = getSongs().songs;


    const songExist = songs.find(song => song.id === id);

    if (!songExist) {
        return res.status(404).send({message: "Song not found"});
    }

    return res.status(200).send({message: "Success", data: songExist});

});

// update played count endpoint
app.get('/songs/play/:id', express.json(), (req, res) => {
    const id = req.params.id;

    // const songData = { "id": "2", "title": "Sial", "artist": "Mahalini", "music": "music/sial-mahalini.mp3", "img": "img/sial-mahalini.jpeg" };

    const existSongs = getSongs().songs;

    var songIdx = -1;
    for (let i = 0; i < existSongs.length; i++) {
        if (existSongs[i].id == id) {
            songIdx = i;
            break;
        }
    }

    // const findExist = existPlaylists.find(playlist => playlist.id === id);
    if (songIdx == -1) {
        return res.status(409).send({message: `song id ${id} not exist`});
    }

    const findExist = existSongs[songIdx];

    findExist.played_count += 1;

    existSongs[songIdx] = findExist;

    saveSongs({songs: existSongs});

    res.send({message: "Updated song successfuly", data: findExist});

});

// api return sorted songs by most played
app.get('/songs/sorted/most-played', (req, res) => {

    const songs = getSongs().songs.sort((function (a, b) {
        return b.played_count - a.played_count; 
    }));

    res.status(200).send({message:"Success", data: songs});
});


app.get('/playlists', (req, res) => {
    const playlists = getPlaylists();
    
    res.status(200).send({data: playlists});
})

app.post('/playlists', express.json(), async (req, res) => {
    // const playlistData = req.body;

    // if (playlistData.name == null) return res.status(401).send({error: true, message: "Playlist data missing"});
    
    const playlistLength = getPlaylists().playlists.length;

    const newPlaylist = {
        id: uuid(),
        name: "My Playlist #"+(playlistLength+1),
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

const saveSongs = (data) => {
    const stringifyData = JSON.stringify(data, null, 4);
    fs.writeFileSync('dummy_data/songs.json', stringifyData);    
}


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})