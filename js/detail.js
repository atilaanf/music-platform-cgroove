

let songs = null;

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