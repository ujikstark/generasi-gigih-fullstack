const fs = require('fs');
const path = require('path');
const { v4: uuid } = require("uuid");


const dataPath = path.join(__dirname, '../dummy_data/playlists.json');

class Playlist {
    constructor() {
        this.id = uuid();
        this.songs = [];
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getSongs() {
        return this.songs;
    }

    setSongs(songs) {
        this.songs = songs;
    }

}

class PlaylistModel {
    constructor() {
        this.playlists = [];
        this.loadData();
    }

    // retrieve data from json and make a list<playlist>
    loadData() {
        try {
            const jsonData = fs.readFileSync(dataPath);
            const playlistData = JSON.parse(jsonData);

            this.playlists = playlistData.playlists.map(playlist => {
                const currentPlaylist = new Playlist();
                currentPlaylist.setId(playlist.id);
                currentPlaylist.setName(playlist.name);
                currentPlaylist.setSongs(playlist.songs);

                return currentPlaylist;
            });

        } catch (error) {
            throw new Error("Error loading data", error);
        }
    }

    // save data to dummy data json
    saveData() {
        try {
            fs.writeFileSync(dataPath, JSON.stringify({ playlists: this.playlists }, null, 2));
        } catch (error) {
            throw new Error("Error Saving data", error);
        }
    }

    // retrieve all playlists
    getPlaylists() {
        return this.playlists;
    }

    // create a new song
    createPlaylist(newPlaylist) {
        const playlist = new Playlist();
        playlist.setName(newPlaylist.name);

        this.playlists.push(playlist);
        this.saveData();
        return playlist;
    }

    getPlaylistById(id) {
        const playlist = this.playlists.find(playlist => playlist.id === id);

        if (!playlist) throw new Error(`Playlist ${id} not found`);

        return playlist;
    }

    getPlaylistIndex(id) {
        const playlistIndex = this.playlists.findIndex((playlist) => {
            return playlist.id === id;
        });

        if (playlistIndex == -1) throw new Error(`Playlist ${id} not found`);

        return playlistIndex;
    }

    updatePlaylist(id, newPlaylist) {
        const playlistIndex = this.getPlaylistIndex(id);

        this.playlists[playlistIndex] = newPlaylist;
        this.saveData();

        return newPlaylist;
    }

    // add song to playlist 
    addSong(playlistId, songId) {
        const playlistIndex = this.getPlaylistIndex(playlistId);

        // check if song id is exist in playlist
        if (this.playlists[playlistIndex].songs.find(song => song.id === songId)) {
            throw new Error(`song id ${songId} exist!`);
        }

        this.playlists[playlistIndex].songs.push({ id: songId });
        this.saveData();
        return this.playlists[playlistIndex];
    }

    // delete song in playlist
    deleteSong(playlistId, songId) {
        const playlistIndex = this.getPlaylistIndex(playlistId);

        // check if song id is exist in playlist
        const songIndex = this.playlists[playlistIndex].songs.findIndex((song) => {
            return song.id === songId;
        });        
        
        if (songIndex == -1) {
            throw new Error(`Song id ${songId} not found`);
        }

        const song = this.playlists[playlistIndex].songs.splice(songIndex, 1)[0];
        this.saveData();
        return song;
    }

}

module.exports = PlaylistModel;
