// Get song data from localStorage
const songs = JSON.parse(localStorage.getItem("songs")) || [];

// Function to render lyrics
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

// Function to update all song details
function updateDetailPage(song) {
    if (!song) return;

    // Update basic info
    document.title = `${song.name} - ${song.artist} | C'groove`;
    document.querySelector('.song-title').textContent = song.name;
    document.querySelector('.song-author a').textContent = song.artist;
    document.querySelector('.song-author a').href = `https://www.google.com/search?q=${encodeURIComponent(song.artist)}`;

    // Update description if available
    const descElement = document.querySelector('.brief-desc');
    if (song.description) {
        descElement.textContent = song.description;
    } else {
        descElement.style.display = 'none';
    }

    // Update image
    const imgContainer = document.querySelector('.song-img-container');
    imgContainer.innerHTML = '';
    const img = document.createElement('img');
    img.src = song.image;
    img.alt = `${song.name} by ${song.artist}`;
    imgContainer.appendChild(img);

    // Update lyrics
    renderLyrics(song.lyrics);
}

// Initialize detail page
function initDetailPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const songId = parseInt(urlParams.get('id'));
    const song = songs.find(s => s.id === songId);

    if (song) {
        updateDetailPage(song);
    } else {
        document.querySelector('main').innerHTML = `
            <div class="error-message">
                <h2>Song not found</h2>
                <a href="index.html">Return to home</a>
            </div>
        `;
    }
}

// When page loads
document.addEventListener('DOMContentLoaded', initDetailPage);