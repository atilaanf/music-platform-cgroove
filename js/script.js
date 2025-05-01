//An array of objects, where each object is a song. 
// {songs} means destructuring the ojbect from the right.
//Note: the destructing should be key specific. 
//If songs is an key in the object, then only it will get the songs array.
let {songs} = {
    "songs": [
        {
            "name": "Tung Tung Sahur ",
            "artist": "Rude",
            "location": "./assets/tungsahurofc.mp3",
            "image": "./images/content/tungsahur.jpg",
            "liked": true,
            "id": 0
        },
        {
            "name": "Tung Tung Sahur",
            "artist": "Rick Astely",
            "location": "./assets/tungsahurofc.mp3",
            "image": "./images/content/tungsahur.jpg",
            "liked": false,
            "id": 1
        },
        {
            "name": "Tung The Tung",
            "artist": "Tung Tung",
            "location": "./assets/tungsahurofc.mp3",
            "image": "./images/content/tungsahur.jpg",
            "liked": false,
            "id": 2
        },
        {
            "name": "Eye of the Tiger",
            "artist": "Surviour",
            "location": "./assets/tungsahurofc.mp3",
            "image": "./images/content/tungsahur.jpg",
            "liked": false,
            "id": 3
        },
        {
            "name": "Kenny G Collection",
            "artist": "Kenny G",
            "location": "./assets/tungsahurofc.mp3",
            "image": "./images/content/tungsahur.jpg",
            "liked": false,
            "id": 4
        },
        {
            "name": "Noctornal",
            "artist": "The Midnight",
            "location": "./assetstungsahurofc.mp3",
            "image": "./images/content/bombardino.jpg",
            "liked": true,
            "id": 5
        },
        {
            "name": "Unravel",
            "artist": "TK",
            "location": "./assets/tungsahurofc.mp3",
            "image": "./images/content/tungsahur.jpg",
            "liked": false,
            "id": 6
        }
    ]
};


// Getting required elemets, const to not allow reinitialization
// let for reinitialization of that elements to update from DOM.
const playerHead = document.getElementById("player");
let playBtn = document.getElementById("playBtn");
let pauseBtn = document.getElementById("pauseBtn");
let cardCollection = document.querySelectorAll(".card__collection_main");
let currentSong = new Audio();

//Player is hidden by default and is visible only when a song is clicked.
playerHead.style.display = "none";

//Function to create card and add functionality to update player head.
const createCard = (song) => {
    //Takes in the song object as an argument.
    /*
    Create the Structure.
    <div class="card">
        <img src="./images/content/noctornal.jpg" alt="Noctornal">
            <div class="card_info">
                <p class="card_name">Noctornal</p>
                <p class="card_artist">The Midnight</p>
            </div>
    </div>
    */
    const card = document.createElement("div");
    const img = document.createElement("img");
    const cardInfo = document.createElement("div");
    const cardName = document.createElement("p");
    const cardArtist = document.createElement("p");

    //Assigning Classes to the elements created.
    card.className = "card";
    cardInfo.className = "card_info";
    cardName.className = "card_name";
    cardArtist.className = "card_artist";

    //Adding the song details to the card.
    cardName.innerHTML = song.name;
    cardArtist.innerHTML = song.artist;
    img.src = song.image;
    img.alt = song.name;

    //Structuring the card
    cardInfo.append(cardName, cardArtist);
    card.append(img, cardInfo);

    //Adding functionality to the card to update the player head on click
    card.onclick = function(){
        playerHead.style.display = "flex";
        currentSong = updatePlayer(song);
        playPauseFunc(currentSong);



        
    }

    //Return the dynamic card element.
    return card;
}



document.addEventListener("keydown", function(event) {
    // Prevent default scrolling when Space is pressed
    if (event.code === "Space") {
        event.preventDefault();

        if (currentSong.paused) {
            currentSong.play();
            playBtn.style.display = "none";
            pauseBtn.style.display = "inline";
        } else {
            currentSong.pause();
            playBtn.style.display = "inline";
            pauseBtn.style.display = "none";
        }
    }
});



//Adds functionality to the play and pause buttons to play the current song.
const playPauseFunc = (song) => {
    //Reinitialize the buttons.
    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");
  


    //When the play button is clicked, the song is played.
    playBtn.addEventListener("click", () => {
        currentSong.play();
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline";
    });
    
    //When the pause button is clicked, the song is paused.
    pauseBtn.addEventListener("click", () => {
        currentSong.pause();
        playBtn.style.display = "inline";
        pauseBtn.style.display = "none";
    });
}

//Like and unlike the song and update the card collection for liked songs.
const likeSong = (id, likeBtn, songName) => {
    //id - the id of the song, on which the button is clicked for.
    //likeBtn - The acutal element to update the styling.
    //songName - The name of the song for which button is clicked
    //           as we don't have id for every card, only the name is 
    //           is unique, so we use it cross check the songs object.

    //Reinitialize the collection to get the updated collection from DOM.
    cardCollection = document.querySelectorAll(".card__collection_main");
    //Get the current liked songs from the above collection.
    let likedSongs = cardCollection[0].children;
    //Since it returns a HTMLCollection, array functions can not be performed
    //The likedSongs is converted into an array using the Array object
    //converting it to an actual array using Array.from()l
    likedSongs = Array.from(likedSongs);

    //Check if the global song object is liked or not
    //if liked before, then unlike it, change color of like button
    //and remove that song from the liked songs collection.
    if(songs[id].liked){
        songs[id].liked = false;
        likeBtn.style.color = "grey";
        likedSongs.forEach(songCard => {
            const name = songCard.lastChild.firstChild.innerHTML;
            if(name == songName){
                songCard.style.display = "none";
                songCard.remove();
            }
        });
    //If song is not liked, then like the song,
    //change the color of like button
    //and add that song in the liked song collection.
    } else {
        songs[id].liked = true;
        likeBtn.style.color = "red";
        cardCollection[0].append(createCard(songs[id]));
    }
    updateStorage();
}

//update the player head whenever a new song is clicked. 
const updatePlayer = ({name, artist, location, image, liked, id}) => {
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

    playBtn = document.getElementById("playBtn");
    pauseBtn = document.getElementById("pauseBtn");

    //Setting the default to the player head pause and play buttons.
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";

   
    
    //Adding the selected song details in the player head.
    songContainer.innerHTML = name;
    artistContainer.innerHTML = artist;
    artistImage.src = image;
    
    //Assign the id of the song to the button,
    //Check is song is liked and add the color based on song.liked.
    likeBtn.id = id;
    likeBtn.style.color = "grey";
    if(liked){
        likeBtn.style.color = "red";
    }

    //Adding a onclick functionlity to the like button.
    likeBtn.onclick = function () {
        likeSong(likeBtn.id, likeBtn, name);
    }   

    //When the current song is loaded, set it's duration and add it 
    //to the end time element.
    


    currentSong.addEventListener('loadedmetadata', function() {
        startendtime();
    });

    function startendtime (){

            const menit = Math.floor(currentSong.duration/60);
            const detik = Math.floor(currentSong.duration%60); 

            document.getElementById('end_time').textContent = `${menit}:${detik}`;

            console.log(currentSong)
    }

   



    currentSong.addEventListener('timeupdate', updateProgressBar);

    //Return the current song 
    return currentSong;
}

//main function that calls all other functions.
//updates the collection by creating the cards and adding them.
const updateCollection = () => {
    //Reinitalize the collection to get the latest from DOM.
    cardCollection = document.querySelectorAll(".card__collection_main");
    //For all collections, using ForEach, we pass in the songs
    //and create cards for each collection.
    cardCollection.forEach((collection, index) => {
        //First collection is always for liked songs, so put
        //liked songs alone in that collection.
        if(index === 0){
            songs.forEach((song) => {
                if(song.liked){
                    collection.append(createCard(song))
                }
            })
        //all other collections put all songs.
        } else {
            songs.forEach((song) => {
                collection.append(createCard(song));
            });
        }
        //for every odd collection, reverse the order of the collection.
        if(index%2 !== 0){
            collection.classList.toggle("reverse");
        }
    })
}




//Once the document if fully loaded, call the update collection function
//and add the functionlity to the Spotify Clone.
document.addEventListener("DOMContentLoaded", async() => {
    updateCollection();
})


const progressBar = document.getElementById('progressBar');

function updateProgressBar() {
    if (currentSong.duration > 0) {
        const progress = (currentSong.currentTime / currentSong.duration) * 100;
        progressBar.value = progress;
    }

    const menit = Math.floor(currentSong.currentTime/60);
    const detik = Math.floor(currentSong.currentTime%60); 

    document.getElementById('start-time').textContent = `${menit}:${detik}`;

}


function updateAudio() {
    if (currentSong.duration > 0) {
        var seekTime = (progressBar.value / 100) * currentSong.duration;
        currentSong.currentTime = seekTime;
    }
}

// Attach events element.addEventListener("eventType", functionToRun);
progressBar.addEventListener("input", updateAudio);
currentSong.addEventListener("timeupdate", updateProgressBar);