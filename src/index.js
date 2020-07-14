const videoContainer = document.getElementById("videoContainer");
const videoController = document.getElementById("videPlayer_controls");
const videoPlayer = document.querySelector("video");
const volumeBtn = document.getElementById("volumebutton");
const playBtn = document.getElementById("playbutton");
const wideBtn = document.getElementById("widebutton");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const innner_progress_Btn = document.getElementById("inner_progressbar");

function handleKeyboard(e) {
  if (e.key === " ") {
    handlePlayClick();
  }
}

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fa fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fa fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fa fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fa fa-volume-off"></i>';
  }
}

function handleWideBtn() {
  videoPlayer.requestFullscreen();
  wideBtn.innerHTML = '<i class="fa fa-compress" aria-hidden="true"></i>';
  wideBtn.removeEventListener("click", handleWideBtn);
  wideBtn.addEventListener("click", handleSmallBtn);
}

function handleSmallBtn() {
  wideBtn.innerHTML = '<i class="fa fa-expand" aria-hidden="true"></i>';
  wideBtn.removeEventListener("click", handleSmallBtn);
  wideBtn.addEventListener("click", handleWideBtn);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function handleHover() {
  videoController.style.opacity = 1;
}

function progressUpdate() {
  innner_progress_Btn.style.width =
    (videoPlayer.currentTime / videoPlayer.duration) * 100 + "%";
  if (videoPlayer.currentTime === videoPlayer.duration) {
    handlePlayClick();
  }
}

let timer;

function mouseStopped() {
  videoPlayer.style.cursor = "none";
  videoController.style.display = "none";
}

function init() {
  document.addEventListener("keydown", handleKeyboard);
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  videoContainer.addEventListener("mouseover", handleHover);
  wideBtn.addEventListener("click", handleWideBtn);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", progressUpdate);
  window.addEventListener("mousemove", function() {
    videoController.style.display = "grid";
    videoPlayer.style.cursor = "default";
    clearTimeout(timer);
    timer = setTimeout(mouseStopped, 2000);
  });
}

if (videoContainer) {
  window.onload = init();
}
