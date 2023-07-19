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

  setId() {
    return this.id;
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
    this.data = [];
    this.loadData();
  }

  loadData() {
    try {
      const jsonData = fs.readFileSync(dataPath);
      this.data = JSON.parse(jsonData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  saveData() {
    try {
      fs.writeFileSync(dataPath, JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  getSongs() {
    return this.data.songs;
  }

  createSong(newSong) {
    const song = new Song();
    song.setTitle(newSong.title);
    song.setArtist(newSong.artist);
    song.setSongUrl(newSong.songUrl);
    song.setImageUrl(newSong.imageUrl);
    song.setPlayedCount(newSong.playedCount);
    // console.log(this.data);
    this.data.songs.push(song);
    this.saveData();
    return song;
  }

  updateSong(index, title, author) {
    if (index >= 0 && index < this.data.length) {
      const book = this.data[index];
      book.setTitle(title);
      book.setAuthor(author);
      this.saveData();
      return book;
    }
    throw new Error('Invalid index');
  }
}

module.exports = SongModel;
