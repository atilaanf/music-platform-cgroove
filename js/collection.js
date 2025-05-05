



document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Ambil data genre
        const genreResponse = await fetch('genre.json');
        const genreData = await genreResponse.json();
        genres = genreData;

        // Ambil data lagu
        const songResponse = await fetch('songs.json');
        const songData = await songResponse.json();
        songs = songData;

        console.log("Songs:", songs);
        console.log("Genres:", genres);
        
    } catch (error) {
        console.error("Error loading data:", error);
    }
});





