jQuery(document).ready(function ($) {
    let slideWidth = $(".carousel-item").outerWidth(true); // Get correct width including margins
    let totalSlides = $(".carousel-item").length;
    let currentIndex = 0;

    // Initialize the carousel
    function initializeCarousel() {
        $(".carousel-inner").css("width", totalSlides * slideWidth);
        updatePosition();
        startAutoSlide();
    }

    // Update sizes on window resize
    function updateSizes() {
        slideWidth = $(".carousel-item").outerWidth(true);
        $(".carousel-inner").css("width", totalSlides * slideWidth);
        updatePosition();
        resetAutoSlide();

    }

    $(window).on("load resize", updateSizes);
    initializeCarousel();

    // Update the position of the carousel
    function updatePosition() {
        $(".carousel-inner").css("transform", `translateX(${-currentIndex * slideWidth}px)`);
    }

    // Move to the left (previous slide)
    function moveLeft() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Loop to the last slide
        }
        updatePosition();
    }

    // Move to the right (next slide)
    function moveRight() {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop to the first slide
        }
        updatePosition();
        resetAutoSlide();

    }

    // Attach event listeners
    $(".prev").on('click', moveLeft);
    $(".next").on('click', moveRight);

    
    function startAutoSlide(){
        autoSlideTimer = setInterval(function(){
            moveRight();
        }, 3000)
    }

    function resetAutoSlide(){
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }


    initializeCarousel();
});