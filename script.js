const musicContainer = document.querySelector('.music-player');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.querySelector('title');


const showDurationEl = document.querySelector('.show-duration');


// Song titles
const songs = ['Queen', 'Rhcp', 'Iggy'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = 'example title';
  audio.src = `music/${song}.mp3`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(event) {
  const { duration, currentTime } = event.target;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);


audio.addEventListener('timeupdate', function() {

  const totalSeconds = audio.duration - (audio.currentTime);
  const time = new Date(null);
  time.setSeconds(totalSeconds);
  let hours = null;


  if(totalSeconds >= 3600) {
    hours = (time.getHours().toString()).padStart(2, '0');
  }

     let minutes = (time.getMinutes().toString()) | 0;
     let seconds = (time.getSeconds().toString()) | 0;
     if(seconds < 10) {
       seconds = "0" + seconds;
     }

     showDurationEl.textContent = `${hours ? hours : '00'}:${minutes ? minutes : '00'}:${seconds ? seconds: '00'}`;

});







