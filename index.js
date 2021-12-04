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

const video = document.querySelectorAll('video');

video.forEach((videoPlayer) => {
    const component = videoPlayer.nextElementSibling;
    const playControl = component.getElementsByClassName('play-pause')[0];
    const screenControl = component.getElementsByClassName('screen')[0];
    const nextControl = component.getElementsByClassName('next-video')[0];
    const soundControl = component.getElementsByClassName('sound')[0];

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
    };

    soundControl.onmouseleave = (e) => {
        const slider = soundControl.getElementsByClassName('slider')[0];
        slider.classList.toggle('display-none');
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
        console.log(videoPlayer.requestFullscreen());
    };

    component.onmouseover = (e) => {
        const controlContain =
            component.getElementsByClassName('video-controller')[0];
        component.onmousemove = (e) => {
            component.style.cursor = 'default';
            controlContain.classList.remove('display-none');
        };
        setTimeout(() => {
            controlContain.classList.add('display-none');
            component.style.cursor = 'none';
        }, 2000);
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
});
