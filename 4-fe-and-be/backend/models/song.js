const fs = require('fs');
const path = require('path');
const { v4: uuid } = require("uuid");


const dataPath = path.join(__dirname, '../dummy_data/songs.json');

class Song {
  constructor() {
    this.id = uuid();
    this.playedCount = 0;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  getTitle() {
    return this.title;
  }

  setTitle(title) {
    this.title = title;
  }

  getArtist() {
    return this.artist;
  }

  setArtist(artist) {
    this.artist = artist;
  }

  getSongUrl() {
    return this.songUrl;
  }

  setSongUrl(songUrl) {
    this.songUrl = songUrl;
  }

  getImageUrl() {
    return this.imageUrl;
  }

  setImageUrl(imageUrl) {
    this.imageUrl = imageUrl;
  }

  getPlayedCount() {
    return this.playedCount;
  }

  setPlayedCount(playedCount) {
    this.playedCount = playedCount;
  }

}

class SongModel {
  constructor() {
    this.songs = [];
    this.loadData();
  }

  // retrieve data from json and make a list<song>
  loadData() {
    try {
      const jsonData = fs.readFileSync(dataPath);
      const songData = JSON.parse(jsonData);

      this.songs = songData.songs.map(song => {
        const currentSong = new Song();
        currentSong.setId(song.id);
        currentSong.setTitle(song.title);
        currentSong.setArtist(song.artist);
        currentSong.setSongUrl(song.songUrl);
        currentSong.setImageUrl(song.imageUrl);
        currentSong.setPlayedCount(song.playedCount);
        return currentSong;
      });

    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  // save data to dummy data json
  saveData() {
    try {
      fs.writeFileSync(dataPath, JSON.stringify({ songs: this.songs }, null, 2));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // retrieve all songs
  getSongs() {
    return this.songs;
  }

  // sorted songs by most played count
  sortedSongs() {
    const songs = this.songs.sort((function (a, b) {
      return b.playedCount - a.playedCount;
    }));

    return songs;

  }

  // create a new song
  createSong(newSong) {
    const song = new Song();
    song.setTitle(newSong.title);
    song.setArtist(newSong.artist);
    song.setSongUrl(newSong.songUrl);
    song.setImageUrl(newSong.imageUrl);
    song.setPlayedCount(newSong.playedCount);
    // console.log(this.data);
    this.songs.push(song);
    this.saveData();
    return song;
  }

  getSongById(id) {
    const song = this.songs.find(song => song.id === id);

    if (!song) throw new Error(`Song with id ${id} not found`);

    return song;
  }

  getSongIndex(id) {
    const songIndex = this.songs.findIndex((song) => {
      return song.id === id;
    });

    return songIndex;
  }

  updateSong(id, newSong) {
    const songIndex = this.getSongIndex(id);
    if (songIndex == -1) throw new Error('Invalid id');

    this.songs[songIndex] = newSong;
    this.saveData();

    return newSong;
  }
}

module.exports = SongModel;
