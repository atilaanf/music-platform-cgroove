

let songs = null;
let currentSong = new Audio();

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('songs.json');
        const data = await response.json();
        songs = data;
        console.log(songs); // Make sure the data is loaded
        initDetailPage(); // Only call this after songs is populated
    } catch (error) {
        console.error("Error loading songs.json:", error);
    }
});

function initDetailPage() {

    console.log('test');
    let detail = document.querySelector('.detailsong-container')
    let songid = new URLSearchParams(window.location.search).get('id');

    let thisSong = songs.filter(value => {
        return value.id == songid
    })[0];
    // if there is no song has id= songid=> return to home page
    if (!thisSong) {
        window.location.href = "/"
    }
    //and if has, add data to html
    detail.querySelector('.song-img-container img').src = thisSong.image;
    detail.querySelector('.song-title').innerText = thisSong.name;
    detail.querySelector('.brief-desc').innerText = thisSong.description;

    const authorAnchor = document.querySelector('.song-author a');
    if (authorAnchor) {
        authorAnchor.href = `https://www.google.com/search?q=${encodeURIComponent(thisSong.artist)}`;
        authorAnchor.textContent = thisSong.artist;  // ✅ THIS LINE updates the visible text
    } else {
        console.warn("Author anchor element not found!");
    }
    renderLyrics(thisSong.lyrics);
    currentSong = updatePlayer(thisSong);
    playPauseFunc(thisSong);


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


const playerHead = document.getElementById("player");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");

const playPauseFunc = (song) => {
    //Reinitialize the buttons.
    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    //When the play button is clicked, the song is played.
    playBtn.addEventListener("click", () => {
        song.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    });

    //When the pause button is clicked, the song is paused.
    pauseBtn.addEventListener("click", () => {
        song.pause();
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    });
}
const updatePlayer = ({ id, location }) => {
    //The arugument of the function is a song object
    //We are destructuing it in the arguments directly and using it.

    //Setting the new song for the global song object.
    currentSong.setAttribute("src", location);
    currentSong.play();

    //Getting the required elements from the player head.
    const songContainer = document.querySelector(".song");
    const artistContainer = document.querySelector(".artist");
    const likeBtn = document.querySelector(".likeBtn");
    const artistImage = document.querySelector(".artist_image");
    const endTime = document.getElementById("end_time");

    //change song title into a clickable link
    songContainer.innerHTML = '';
    const songLink = document.createElement('a');
    songLink.href = 'detailSong.html?id=' + id;
    songLink.className = 'player-song-link'
    songLink.textContent = name;
    songContainer.appendChild(songLink);


    artistContainer.innerHTML = artist;
    artistImage.src = image;

    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    //Setting the default to the player head pause and play buttons.
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";

    //Adding the selected song details in the player head.

    artistContainer.innerHTML = artist;
    artistImage.src = image;








    //When the current song is loaded, set it's duration and add it 
    //to the end time element.

    thisSong.addEventListener('loadedmetadata', function () {
        startendtime();
    });

    function startendtime() {

        const menit = Math.floor(currentSong.duration / 60);
        const detik = Math.floor(currentSong.duration % 60);

        document.getElementById('end_time').textContent = `${menit}:${detik}`;

        console.log(thisSong)
    }



    thisSong.addEventListener('timeupdate', updateProgressBar);

    //Return the current song 
    return thisSong;
}
document.addEventListener("DOMContentLoaded", async () => {
    updateCollection();
})


const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
    // Ensure currentSong is the actual audio being played
    if (currentSong.duration > 0) {
        const progress = (currentSong.currentTime / currentSong.duration) * 100;
        progressBar.value = progress;
    }

    const menit = Math.floor(currentSong.currentTime / 60);
    const detik = Math.floor(currentSong.currentTime % 60);

    document.getElementById('start-time').textContent = `${menit}:${detik}`;

}


progressBar.addEventListener('input', (event) => {
    // Get the percentage of the progress bar (between 0 and 100)
    const progressPercentage = event.target.value;

    // Set the audio's current time based on the percentage
    currentSong.currentTime = (currentSong.duration * progressPercentage) / 100;
});

const isSpace = e =>
    e.code === "Space" ||
    e.key === " " ||
    e.key === "Spacebar" ||
    e.keyCode === 32;

window.addEventListener("keydown", e => {
    if (!isSpace(e)) return;    // only care about Space
    e.preventDefault();         // prevent page scroll

    // re‑grab buttons in case they were re‑rendered
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



