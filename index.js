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
    videoPlayer.nextElementSibling.onclick = () => {
        if (videoPlayer.paused) videoPlayer.play();
        else videoPlayer.pause();
    };

    videoPlayer.addEventListener('timeupdate', () => {
        const duration =
            videoPlayer.nextElementSibling.getElementsByClassName(
                'duration'
            )[0];
        const timerDuration = new Timer(videoPlayer.duration);
        duration.innerHTML = timerDuration.getTime();

        const currentTime =
            videoPlayer.nextElementSibling.getElementsByClassName(
                'current-time'
            )[0];
        
        const timerCurrent = new Timer(videoPlayer.currentTime);
        currentTime.innerHTML = timerCurrent.getTime();

        const bar =
            videoPlayer.nextElementSibling.getElementsByClassName('bar')[0];

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
