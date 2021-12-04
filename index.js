const video = document.querySelectorAll('video');

video.forEach((videoPlayer) => {
    videoPlayer.nextElementSibling.onclick = () => {
        if (videoPlayer.paused) videoPlayer.play();
        else videoPlayer.pause();
    };
    videoPlayer.addEventListener('timeupdate', () => {
        const bar = videoPlayer.nextElementSibling.getElementsByClassName('bar')[0]
        bar.style.width = `${(videoPlayer.currentTime / videoPlayer.duration) * 100}%`;
    });
});
