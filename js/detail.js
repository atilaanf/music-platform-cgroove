let songs = null;
let currentSong = new Audio();

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('songs.json');
        songs = await response.json();
        console.log(songs); // Make sure the data is loaded

        initDetailPage(); // call this AFTER songs is ready

    } catch (error) {
        console.error("Error loading songs.json:", error);
    }
});

function initDetailPage() {
    console.log('initDetailPage called');

    let detail = document.querySelector('.detailsong-container');
    let songid = new URLSearchParams(window.location.search).get('id');

    let thisSong = songs.find(value => value.id == songid);

    if (!thisSong) {
        window.location.href = "/";
        return;
    }

    // Populate detail page info
    detail.querySelector('.song-img-container img').src = thisSong.image;
    detail.querySelector('.song-title').innerText = thisSong.name;
    detail.querySelector('.brief-desc').innerText = thisSong.description;

    const authorAnchor = document.querySelector('.song-author a');
    if (authorAnchor) {
        authorAnchor.href = `https://www.google.com/search?q=${encodeURIComponent(thisSong.artist)}`;
        authorAnchor.textContent = thisSong.artist;
    } else {
        console.warn("Author anchor element not found!");
    }

    renderLyrics(thisSong.lyrics);

    // Set up player audio element with the song, but DO NOT autoplay yet
    currentSong = updatePlayer(thisSong);

    // After metadata is loaded, restore playback state and play/pause accordingly
    currentSong.addEventListener('loadedmetadata', () => {
        const playerState = JSON.parse(localStorage.getItem("playerState"));

        if (playerState) {
            currentSong.currentTime = playerState.currentTime || 0;
            currentSong.volume = playerState.volume ?? 1;

            if (playerState.isPlaying) {
                currentSong.play();
                playBtn.style.display = "none";
                pauseBtn.style.display = "inline";
            } else {
                playBtn.style.display = "inline";
                pauseBtn.style.display = "none";
            }
        } else {
            // Default state
            playBtn.style.display = "inline";
            pauseBtn.style.display = "none";
        }
    });

    playPauseFunc(currentSong);
}

function renderLyrics(lyricsData) {
    const lyricsContainer = document.querySelector('.lyrics-container');
    lyricsContainer.innerHTML = '';

    if (!lyricsData || lyricsData.length === 0) {
        lyricsContainer.innerHTML = '<p class="no-lyrics">No lyrics available for this song</p>';
        return;
    }

    lyricsData.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'lyrics-section';

        const sectionTitle = document.createElement('div');
        sectionTitle.className = 'section-title';
        sectionTitle.textContent = `[${section.section}]`;
        sectionDiv.appendChild(sectionTitle);

        section.lines.forEach(line => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'lyrics-line';
            lineDiv.textContent = line;
            sectionDiv.appendChild(lineDiv);
        });

        lyricsContainer.appendChild(sectionDiv);
    });
}

const playPauseFunc = (song) => {
    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    playBtn.onclick = () => {
        song.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    };

    pauseBtn.onclick = () => {
        song.pause();
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    };
}

const updatePlayer = ({ location }) => {
    // Set the new source for the audio but DO NOT autoplay here
    currentSong.src = location;

    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    // Reset play/pause buttons to paused state by default, wait for actual play event
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";

    // Update song duration display when metadata loads
    currentSong.addEventListener('loadedmetadata', () => {
        const menit = Math.floor(currentSong.duration / 60);
        const detik = Math.floor(currentSong.duration % 60);
        document.getElementById('end_time').textContent = `${menit}:${detik}`;
    });

    currentSong.addEventListener('timeupdate', updateProgressBar);

    return currentSong;
}

const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
    if (currentSong.duration > 0) {
        const progress = (currentSong.currentTime / currentSong.duration) * 100;
        progressBar.value = progress;
    }

    const menit = Math.floor(currentSong.currentTime / 60);
    const detik = Math.floor(currentSong.currentTime % 60);
    document.getElementById('start-time').textContent = `${menit}:${detik}`;
}

progressBar.addEventListener('input', (event) => {
    const progressPercentage = event.target.value;
    currentSong.currentTime = (currentSong.duration * progressPercentage) / 100;
});

const isSpace = e =>
    e.code === "Space" ||
    e.key === " " ||
    e.key === "Spacebar" ||
    e.keyCode === 32;

window.addEventListener("keydown", e => {
    if (!isSpace(e)) return;
    e.preventDefault();

    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    if (currentSong.paused) {
        currentSong.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    } else {
        currentSong.pause();
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    }
});
