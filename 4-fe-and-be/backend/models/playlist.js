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
            console.error('Error loading data:', error);
        }
    }

    // save data to dummy data json
    saveData() {
        try {
            fs.writeFileSync(dataPath, JSON.stringify({ playlists: this.playlists }, null, 2));
        } catch (error) {
            console.error('Error saving data:', error);
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

        return playlist;
    }

    getPlaylistIndex(id) {
        const playlistIndex = this.playlists.findIndex((playlist) => {
          return playlist.id === id;
        });
    
        return playlistIndex;
      }
    
      updatePlaylist(id, newPlaylist) {
        const playlistIndex = this.getPlaylistIndex(id);
        if (playlistIndex == -1) throw new Error('Invalid id');
    
        this.playlists[playlistIndex] = newPlaylist;
        this.saveData();
    
        return newPlaylist;
      }
}

module.exports = PlaylistModel;
