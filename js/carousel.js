let slideIndex =0;
let autoSlideTimer;

function initSlider(){
    displaySlide(slideIndex);
    startAutoSlide();
}

function moveSlide(n){
    displaySlide(slideIndex +=n);
    resetAutoSlide();
    //nambah inex kalau dia move
}

function displaySlide(n){
    let i;
    let totalSlides = $(".carousel-item");
    console.log(totalSlides);

    if(n > totalSlides.length-1){
        slideIndex = 0;
    }
    if(n < 0){
        slideIndex = totalSlides.length-1;
    }
    
    totalSlides.each(function(){
        $(this).fadeOut(500);
    })

    totalSlides.eq(slideIndex).fadeIn(500);
}

function startAutoSlide(){
    autoSlideTimer = setInterval(function(){
        moveSlide(1);
    }, 3000)
}

function resetAutoSlide(){
    clearInterval(autoSlideTimer);
    startAutoSlide();
}


initSlider();

