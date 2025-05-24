
  // Get the genre name and description elements
  const genreName = document.querySelector(".song-title");
  const genreDesc = document.querySelector(".brief-desc");  
  const cardCont = document.querySelector("card__container");
  const cardColl = document.querySelector("card__collection_main")


document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Ambil data genre
        const genreResponse = await fetch('genre.json');
        genreData = await genreResponse.json();
        const genres =genreData;
        



        // Ambil data lagu
        const songResponse = await fetch('songs.json');
        songData = await songResponse.json();
        const songs =songData;

      

        // Set user input for genre id
        const selectedGenreId = parseInt(localStorage.getItem("selectedGenreId"));
        

        // assigning genre by the Id
        function findGenreById(genre) {
            return genre.genreid === selectedGenreId;
          }
          
          
     
          //Find the selected genre by id
          const selectedGenre = genres.find(findGenreById);
          

        // Check if genre is found
        if (selectedGenre) {
            // Set the genre name and description in the DOM
            genreName.textContent = selectedGenre.genretitle;  // Set title
            genreDesc.textContent = selectedGenre.genredesc;   // Set description
        } else {
            genreName.textContent = "Genre not found";
            genreDesc.textContent = "";
        }

        
        //find song by the genre id
        let idtogenre= function  (selectsong){

            if(selectsong==1){
                
                return "pop"

            }else if (selectsong==2){
                return "rnb"


            }else if (selectsong==3){
                return "kpop"


            }else cardC.textContent = "Music not found";
            

        }
       
       
      

        const songsForSelectedGenre = songData.filter(songs => songs.genre === idtogenre(selectedGenreId));

        
        const genreimgcontainer = document.querySelector(".song-img-container")
       const imgcontainerinside=document.createElement('div')

        genreimgcontainer.appendChild(imgcontainerinside)

        const img=document.createElement('img')

        img.src = selectedGenre.imgSrc;

        imgcontainerinside.appendChild(img)


        console.log(selectedGenre.imgSrc)

      // Create card for each song
      const createCard = (song) => {
        const card = document.createElement("div");
        const img = document.createElement("img");
        const cardInfo = document.createElement("div");
        const cardName = document.createElement("p");
        const cardArtist = document.createElement("p");

        // Assigning Classes to the elements created.
        card.className = "card";
        cardInfo.className = "card_info";
        cardName.className = "card_name";
        cardArtist.className = "card_artist";
        

        // Adding the song details to the card.
        cardName.innerHTML = song.name;
        cardArtist.innerHTML = song.artist;
        img.src = song.image;
        img.alt = song.name;

        // Structuring the card
        cardInfo.append(cardName, cardArtist);
        card.append(img, cardInfo);

        // Adding functionality to the card to update the player head on click
        card.onclick = function () {
            playerHead.style.display = "flex";
            currentSong = updatePlayer(song);
            playPauseFunc(currentSong);
        };

        // Return the dynamic card element.
        return card;
    };

    // Append cards to the container
    const cardCollectionMain = document.querySelector(".card__collection_main");
    cardCollectionMain.innerHTML = ''; // Clear previous cards if any

    songsForSelectedGenre.forEach(song => {
        const card = createCard(song);
        cardCollectionMain.appendChild(card); // Append each card to the container
    }); 

        
       
    } catch (error) {
        console.error("Error loading data:", error);
    }
});


