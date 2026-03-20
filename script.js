const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const playlistEl = document.getElementById("playlist");
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");

// SAMPLE SONGS (royalty-free)
const songs = [
  {
    title: "Too Many Nights",
    artist: "Metro Boomin",
    src: "/mp3 files/Too many nights.mp3",
    cover: "/image cover/001.jpeg"
  },
  {
    title: "After Hours",
    artist: "The Weeknd",
    src: "/mp3 files/after hours.mp3",
    cover: "https://picsum.photos/300?random=2"
  },
  {
    title: "My eyes",
    artist: "Travis Scott",
    src: "/mp3 files/my eyes.mp3",
    cover: "https://picsum.photos/300?random=3"
  },
  {
    title: "Low Life",
    artist: "Future",
    src: "/mp3 files/low life.mp3",
    cover: "https://picsum.photos/300?random=4"
  },
  {
    title: "Until I Bleed Out",
    artist: "The Weeknd",
    src: "/mp3 files/until i bleed out.mp3",
    cover: "https://picsum.photos/300?random=5"
  }
];


let songIndex = 0;
let isPlaying = false;

// LOAD SONG
function loadSong(index) {
  const song = songs[index];
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;
  audio.src = song.src;

  document.querySelectorAll(".playlist li").forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

// PLAY / PAUSE
function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
}

// NEXT / PREV
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸";
}

// PROGRESS UPDATE
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
});

progressContainer.addEventListener("click", e => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
});

// EVENTS
playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
audio.addEventListener("ended", nextSong);

// PLAYLIST UI
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} – ${song.artist}`;
  li.addEventListener("click", () => {
    songIndex = index;
    loadSong(songIndex);
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸";
  });
  playlistEl.appendChild(li);
});

// INIT
loadSong(songIndex);
