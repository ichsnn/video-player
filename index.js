class Timer {
    constructor(duration) {
        let hMod;
        this.hours = Math.floor(duration / 3600);
        hMod = Math.floor(duration % 3600);
        this.minutes = Math.floor(hMod / 60);
        this.seconds = Math.floor(hMod % 60);
    }

    getTime() {
        if (this.hours < 10) {
            this.hours = '0' + this.hours;
        }
        if (this.minutes < 10) {
            this.minutes = '0' + this.minutes;
        }
        if (this.seconds < 10) {
            this.seconds = '0' + this.seconds;
        }
        return `${this.hours}:${this.minutes}:${this.seconds}`;
    }
}

var pointerSleep;
var indicator;

const video = document.querySelectorAll('video');

video.forEach((videoPlayer) => {
    const component = videoPlayer.nextElementSibling;
    const playControl = component.getElementsByClassName('play-pause')[0];
    const screenControl = component.getElementsByClassName('screen')[0];
    const nextControl = component.getElementsByClassName('next-video')[0];
    const soundControl = component.getElementsByClassName('sound')[0];
    const barTrack = component.getElementsByClassName('duration-bar')[0];
    const controller = component.querySelector('.video-controller');

    document.onkeydown = (e) => {
        if (e.keyCode === 39) {
            if (videoPlayer.currentTime <= videoPlayer.duration - 10) {
                videoPlayer.currentTime += 10;
            } else {
                videoPlayer.currentTime = videoPlayer.duration;
            }
        }
        if (e.keyCode === 37) {
            if (videoPlayer.currentTime >= 10) {
                videoPlayer.currentTime -= 10;
            } else {
                videoPlayer.currentTime = 0;
            }
        }
        if (e.keyCode == 32) {
            videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause();
        }
    };

    barTrack.onmousemove = (e) => {
        const track = barTrack.querySelector('.bar-track').style;
        track.setProperty(
            '--left',
            `${(e.offsetX / barTrack.clientWidth) * 100}%`
        );
        track.setProperty('--display', 'block');
    };

    barTrack.onmouseleave = (e) => {
        const track = barTrack.querySelector('.bar-track').style;
        track.setProperty('--display', 'none');
    };

    barTrack.onclick = (e) => {
        let current = videoPlayer.currentTime;
        let duration = videoPlayer.duration;
        let newWidth = (e.offsetX / barTrack.clientWidth) * 100;
        videoPlayer.currentTime = (newWidth * duration) / 100;
        console.log(newWidth * duration);
    };

    videoPlayer.onmousemove = (e) => {
        videoPlayer.style.cursor = 'default';
        controller.classList.remove('display-none');
        clearTimeout(pointerSleep);
        if (!videoPlayer.paused) {
            pointerSleep = setTimeout(() => {
                console.log('hide');
                videoPlayer.style.cursor = 'none';
                controller.classList.add('display-none');
            }, 5000);
        }
    };

    playControl.onclick = (e) => {
        const play = playControl.getElementsByClassName('play')[0];
        const pause = playControl.getElementsByClassName('pause')[0];
        if (videoPlayer.paused) {
            play.classList.toggle('display-none');
            pause.classList.toggle('display-none');
            videoPlayer.play();
        } else {
            play.classList.toggle('display-none');
            pause.classList.toggle('display-none');
            videoPlayer.pause();
        }
    };

    soundControl.onmouseenter = (e) => {
        const slider = soundControl.getElementsByClassName('slider')[0];
        slider.classList.toggle('display-none');
        barTrack.classList.add('display-none');
    };

    soundControl.onmouseleave = (e) => {
        const slider = soundControl.getElementsByClassName('slider')[0];
        slider.classList.toggle('display-none');
        barTrack.classList.remove('display-none');
    };

    soundControl.onclick = (e) => {
        const speaker = soundControl.getElementsByClassName('speaker')[0];
        const speakerMuted =
            soundControl.getElementsByClassName('speakerMuted')[0];

        videoPlayer.muted = !videoPlayer.muted;

        speaker.classList.toggle('display-none');
        speakerMuted.classList.toggle('display-none');
    };

    screenControl.onclick = (e) => {
        const videoContainer = videoPlayer.parentElement;
        const fullScreen =
            screenControl.getElementsByClassName('fullscreen')[0];
        const exitFullscreen =
            screenControl.getElementsByClassName('exitFullscreen')[0];

        if (document.fullscreenElement == null) {
            exitFullscreen.classList.remove('display-none');
            fullScreen.classList.add('display-none');
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.mozRequestFullScreen) {
                videoContainer.mozRequestFullScreen();
            } else if (videoContainer.webkitRequestFullScreen) {
                videoContainer.webkitRequestFullScreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
        } else {
            exitFullscreen.classList.add('display-none');
            fullScreen.classList.remove('display-none');
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    videoPlayer.addEventListener('timeupdate', () => {
        const duration = component.getElementsByClassName('duration')[0];
        const timerDuration = new Timer(videoPlayer.duration);
        duration.innerHTML = timerDuration.getTime();

        const currentTime = component.getElementsByClassName('current-time')[0];

        const timerCurrent = new Timer(videoPlayer.currentTime);
        currentTime.innerHTML = timerCurrent.getTime();

        const bar = component.getElementsByClassName('bar')[0];

        bar.setAttribute('role', 'bar');
        bar.setAttribute('aria-valuemin', 0);
        bar.setAttribute('aria-valuemax', 100);

        function updateBar(percentComplete) {
            bar.setAttribute('aria-valuenow', percentComplete);
        }

        updateBar((videoPlayer.currentTime / videoPlayer.duration) * 100);

        bar.style.width = `${bar.ariaValueNow}%`;
    });

    videoPlayer.onpause = (e) => {
        const play = playControl.getElementsByClassName('play')[0];
        const pause = playControl.getElementsByClassName('pause')[0];
        play.classList.remove('display-none');
        pause.classList.add('display-none');
    };

    videoPlayer.onplay = (e) => {
        const play = playControl.getElementsByClassName('play')[0];
        const pause = playControl.getElementsByClassName('pause')[0];
        play.classList.add('display-none');
        pause.classList.remove('display-none');
    };
});
