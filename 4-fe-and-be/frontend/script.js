
async function playSong(element) {
  var currentPlayingElement = document.getElementById('current-playing');
  currentPlayingElement.src = element.getAttribute('data-action');

  // update played count 
  const response = await fetch("http://localhost:3000/songs/"+element.id+"/play");
  const responseJson = await response.json();

  console.log(responseJson);

  currentPlayingElement.load();
  currentPlayingElement.play();
}

async function newPlaylist() {
  const response = await fetch("http://localhost:3000/playlists", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "My Playlist" })
  });

  return response.json();
}

// async function savePlaylists() {
//   const response = await fetch("http://localhost:3000/playlists");
//   const responseJson = await response.json();

//   const playlists = responseJson.data.playlists;

//   return playlists;
// }

// const playlists = savePlaylists();


async function getPlaylists() {
  const response = await fetch("http://localhost:3000/playlists");
  const responseJson = await response.json();

  const playlists = responseJson.data.playlists;

  var playlistParent = document.getElementById('my-playlist');
  var contextMenu = document.getElementById('context-list');
  var listElement = document.createElement('li');


  // create all playlist element
  for (var i = 0; i < playlists.length; i++) {
    var cardElement = document.createElement('div');
    cardElement.className = "card-playlist";

    var playlistImage = document.createElement('img');
    playlistImage.src = "img/tulus-monokrom.jpeg";

    var div = document.createElement('div');

    var playlistName = document.createElement('h4');
    playlistName.textContent = playlists[i].name;
    var playlistAuthor = document.createElement('p');
    playlistAuthor.textContent = "Ahmad Fauzi";

    //  create sidebar playlist
    div.appendChild(playlistName);
    div.appendChild(playlistAuthor);

    // var dropDownIcon = document.createElement('i');
    // dropDownIcon.className = "fas fa-caret-down";


    cardElement.appendChild(playlistImage);
    cardElement.appendChild(div);
    // cardElement.appendChild(dropDownIcon)
    playlistParent.appendChild(cardElement);

    // create rightclick playlist
    const playlistRightClick = document.createElement('a');
    playlistRightClick.id = playlists[i].id;

    // id song, idplaylist
    playlistRightClick.onclick = () => {
      addSongToPlaylist(songSelectedId, playlistRightClick.id);
    }
    playlistRightClick.textContent = playlists[i].name;
    listElement.appendChild(playlistRightClick);
  }

  contextMenu.appendChild(listElement);
}


async function addSongToPlaylist(songId, playlistId) {
  const songResponse = await fetch("http://localhost:3000/songs/" + songId);
  const songResponseJson = await songResponse.json();

  const playlistResponse = await fetch("http://localhost:3000/playlists/"+playlistId, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songResponseJson.data)
  });

  console.log(songId);
  console.log(playlistId);
  return playlistResponse.json();
}

getPlaylists();

const contextMenu = document.getElementById('contextMenu');
let songSelectedId = ''; 

document.addEventListener('click', function () {
  contextMenu.style.display = 'none';
});

async function getSongs() {
  const response = await fetch("http://localhost:3000/songs");
  const responseJson = await response.json();

  var songsParent = document.getElementById('all-songs');
  const songs = responseJson.data.songs;

  // create all songs element
  for (var i = 0; i < songs.length; i++) {
    const cardElement = document.createElement('div');
    cardElement.className = "card";
    cardElement.id = songs[i].id;
    cardElement.setAttribute('data-action', songs[i].music);

    cardElement.oncontextmenu = (event) => {
      event.preventDefault();
      songSelectedId = cardElement.id;
      contextMenu.style.display = 'block';
      contextMenu.style.left = event.pageX + 'px';
      contextMenu.style.top = event.pageY + 'px';
    }

    var songIcon = document.createElement('div');
    songIcon.className = "song-icon";

    var songImage = document.createElement('img');
    songImage.src = songs[i].img;
    songImage.className = "song-image";

    var playButton = document.createElement('div');
    playButton.className = "play-button";
    playButton.innerHTML = `<i class="fas fa-play"></i>`;

    playButton.onclick = () => {
      playSong(cardElement);
    }

    songIcon.appendChild(songImage);
    songIcon.appendChild(playButton);

    var songTitle = document.createElement('h3');
    songTitle.className = "song-title";
    songTitle.textContent = songs[i].title;

    var songArtist = document.createElement('p');
    songArtist.className = "song-artist";
    songArtist.textContent = songs[i].artist;


    cardElement.appendChild(songIcon);
    cardElement.appendChild(songTitle);
    cardElement.appendChild(songArtist);
    songsParent.appendChild(cardElement);
  }

  

}

async function sortedSongs() {
  const response = await fetch("http://localhost:3000/songs/sorted/most-played");
  const responseJson = await response.json();

  var songsParent = document.getElementById('most-played');
  const songs = responseJson.data;

  // create all songs element
  for (var i = 0; i < songs.length; i++) {
    const cardElement = document.createElement('div');
    cardElement.className = "card";
    cardElement.id = songs[i].id;
    cardElement.setAttribute('data-action', songs[i].music);

    cardElement.oncontextmenu = (event) => {
      event.preventDefault();
      songSelectedId = cardElement.id;
      contextMenu.style.display = 'block';
      contextMenu.style.left = event.pageX + 'px';
      contextMenu.style.top = event.pageY + 'px';
    }

    var songIcon = document.createElement('div');
    songIcon.className = "song-icon";

    var songImage = document.createElement('img');
    songImage.src = songs[i].img;
    songImage.className = "song-image";

    var playButton = document.createElement('div');
    playButton.className = "play-button";
    playButton.innerHTML = `<i class="fas fa-play"></i>`;

    playButton.onclick = () => {
      playSong(cardElement);
    }

    songIcon.appendChild(songImage);
    songIcon.appendChild(playButton);

    var songTitle = document.createElement('h3');
    songTitle.className = "song-title";
    songTitle.textContent = songs[i].title;

    var songArtist = document.createElement('p');
    songArtist.className = "song-artist";
    songArtist.textContent = songs[i].artist;


    cardElement.appendChild(songIcon);
    cardElement.appendChild(songTitle);
    cardElement.appendChild(songArtist);
    songsParent.appendChild(cardElement);
  }

}

getSongs();

sortedSongs();

