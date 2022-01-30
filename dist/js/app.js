"use strict"
class MusicPlayer {
    constructor() {
        this.favBtn = document.querySelector("#favorite-button");
        this.wrapper = document.querySelector(".player");
        this.musicImg = document.querySelector(".player__image img");
        this.progressArea = document.querySelector(".progress-area");
        this.musicName = document.querySelector(".player__details-song");
        this.musicArtist = document.querySelector(".player__details-artist");
        this.playPauseBtn = document.querySelector(".play-pause");
        this.prevBtn = document.querySelector("#prev");
        this.nextBtn = document.querySelector("#next");
        this.progressBar = document.querySelector(".player__progress-bar");
        this.playAudio = document.querySelector(".main-audio");
        this.restartSong = document.querySelector("#restart-music");
        this.messageAlert = document.querySelector(".message");
        this.repeatBtn = document.querySelector("#repeat-plist");
        this.progressBarActive = document.querySelector(
            ".player__progress-bar-active"
        );
        this.musicIndex = Math.floor(Math.random() * allContent.length + 1);
        this.isPausedMusic = true;
    }
    loadMusic() {
        this.musicName.textContent = allContent[this.musicIndex - 1].name;
        this.musicArtist.textContent = allContent[this.musicIndex - 1].artist;
        this.musicImg.src = allContent[this.musicIndex - 1].iconSrc;
        document.body.style.backgroundImage = `url(${
        allContent[this.musicIndex - 1].bgcSrc
      })`;
        this.playAudio.src = allContent[this.musicIndex - 1].audio;
    }
    playMusic() {
        this.wrapper.classList.add("paused");
        this.playPauseBtn.querySelector("i").textContent = "pause";
        this.playAudio.play();
    }
    pauseMusic() {
        this.wrapper.classList.remove("paused");
        this.playPauseBtn.querySelector("i").textContent = "play_arrow";
        this.playAudio.pause();
    }
    prevMusic() {
        this.musicIndex--;
        this.musicIndex < 1 ?
            (this.musicIndex = allContent.length) :
            (this.musicIndex = this.musicIndex);
        player.loadMusic(this.musicIndex);
        player.playMusic();
    }
    nextMusic() {
        this.musicIndex++;
        this.musicIndex > allContent.length ?
            (this.musicIndex = 1) :
            (this.musicIndex = this.musicIndex);
        player.loadMusic(this.musicIndex);
        player.playMusic();
    }
    addActive(element, message) {
        element.classList.add("active");
        element.textContent = "favorite";
        message.textContent = "Added to Liked Songs!";
        message.classList.add("add");
        setTimeout(() => {
            message.classList.remove("add");
        }, 1000);
    }
    removeElement(element, message) {
        element.classList.remove("active");
        element.textContent = "favorite_border";
        message.textContent = "Removed to Liked Songs!";
        message.classList.add("add");
        setTimeout(() => {
            message.classList.remove("add");
        }, 1000);
    }
    timeUpdate() {
        const currentTime = event.target.currentTime;
        const duration = event.target.duration;
        let progressWidth = (currentTime / duration) * 100;
        player.progressBarActive.style.width = `${progressWidth}%`;
        let musicCurrentTime = document.querySelector(".song-current");
        let musicDuration = document.querySelector(".song-end");
        player.playAudio.addEventListener("loadeddata", (event) => {
            event.preventDefault();
            let mainAnDuration = player.playAudio.duration;
            let totalMin = Math.floor(mainAnDuration / 60);
            let totalSec = Math.floor(mainAnDuration % 60);
            if (totalSec < 10) {
                totalSec = `0${totalMin}`;
            }
            musicDuration.textContent = `${totalMin}:${totalSec}`;
        });
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) {
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.textContent = `${currentMin}:${currentSec}`;
    }
    toggleMessage() {
        if (!player.favBtn.classList.contains("active")) {
            player.addActive(player.favBtn, player.messageAlert);
        } else {
            player.removeElement(player.favBtn, player.messageAlert);
        }
    }
    listeninigModes() {
        let getText = player.repeatBtn.textContent;
        switch (getText) {
            case "repeat":
                player.repeatBtn.textContent = "repeat_one";
                player.repeatBtn.setAttribute("title", "Song Looped");
                break;
            case "repeat_one":
                player.repeatBtn.textContent = "shuffle";
                player.repeatBtn.setAttribute("title", "Playback Shuffled");
                break;
            case "shuffle":
                player.repeatBtn.textContent = "repeat";
                player.repeatBtn.setAttribute("title", "Playlist Looped");
                break;
        }
    }
    endOfSong() {
        let getText = player.repeatBtn.textContent;
        switch (getText) {
            case "repeat":
                player.nextMusic();
                break;
            case "repeat_one":
                player.playAudio.currentTime = 0;
                player.loadMusic(player.musicIndex);
                player.playMusic();
                break;
            case "shuffle":
                let randomIndex = Math.floor(Math.random() * allContent.length + 1);
                do {
                    randomIndex = Math.floor(Math.random() * allContent.length + 1);
                } while (player.musicIndex === randomIndex); {
                    player.musicIndex = randomIndex;
                    player.loadMusic(player.musicIndex);
                    player.playMusic();
                    break;
                }
        }
    }
}
let player = new MusicPlayer();
window.addEventListener("DOMContentLoaded", () => {
    player.loadMusic(this.musicIndex);
});
player.playPauseBtn.addEventListener("click", () => {
    if (player.wrapper.classList.contains("paused")) {
        player.pauseMusic();
    } else {
        player.playMusic();
    }
});
player.prevBtn.addEventListener("click", () => {
    player.prevMusic();
});
player.nextBtn.addEventListener("click", () => {
    player.nextMusic();
});
player.restartSong.addEventListener("click", () => {
    player.loadMusic(this.musicIndex);
    player.playMusic();
});
player.playAudio.addEventListener("timeupdate", (event) => {
    event.preventDefault();
    player.timeUpdate();
});
player.favBtn.addEventListener("click", () => {
    player.toggleMessage();
});
player.progressBar.addEventListener("click", (e) => {
    let progressWidth = player.progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = player.playAudio.duration;
    player.playAudio.currentTime =
        (clickedOffsetX / progressWidth) * songDuration;
    player.playMusic();
});
player.repeatBtn.addEventListener("click", () => {
    player.listeninigModes();
});
player.playAudio.addEventListener("ended", () => {
    player.endOfSong();
});