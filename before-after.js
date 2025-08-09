// Before/After Gallery JavaScript - Using same approach as smile-makeover page
let currentSlideIndex = 0;
let autoPlayInterval;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing before/after page...');
    initializeBeforeAfterSlideshow();
    
    // Initialize people slider if Swiper is available
    if (typeof Swiper !== 'undefined') {
        initializePeopleSlider();
    } else {
        console.log('Swiper not available, waiting...');
        // Wait a bit for Swiper to load
        setTimeout(initializePeopleSlider, 1000);
    }
});

// Initialize the before/after slideshow - same as smile-makeover
function initializeBeforeAfterSlideshow() {
    const beforeSlides = document.querySelectorAll('.before-slide');
    const afterSlides = document.querySelectorAll('.after-slide');
    
    if (beforeSlides.length === 0 || afterSlides.length === 0) {
        console.error('Before/After slides not found');
        return;
    }
    
    console.log(`Found ${beforeSlides.length} before slides and ${afterSlides.length} after slides`);
    
    // Hide all slides first
    beforeSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    afterSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show first slides
    if (beforeSlides[0]) {
        beforeSlides[0].classList.add('active');
    }
    if (afterSlides[0]) {
        afterSlides[0].classList.add('active');
    }
    
    // Start autoplay
    startAutoPlay(beforeSlides, afterSlides);
}

// Start autoplay with consistent timing
function startAutoPlay(beforeSlides, afterSlides) {
    // Clear any existing interval
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
    
    // Start new interval - change images every 1 second
    autoPlayInterval = setInterval(() => {
        nextImages(beforeSlides, afterSlides);
    }, 1000);
    
    console.log('Before/After autoplay started with 1-second intervals');
}

// Move to next images - same logic as smile-makeover
function nextImages(beforeSlides, afterSlides) {
    // Hide current slides
    if (beforeSlides[currentSlideIndex]) {
        beforeSlides[currentSlideIndex].classList.remove('active');
    }
    if (afterSlides[currentSlideIndex]) {
        afterSlides[currentSlideIndex].classList.remove('active');
    }
    
    // Move to next slide
    currentSlideIndex++;
    if (currentSlideIndex >= beforeSlides.length) {
        currentSlideIndex = 0;
    }
    
    // Show new slides
    if (beforeSlides[currentSlideIndex]) {
        beforeSlides[currentSlideIndex].classList.add('active');
    }
    if (afterSlides[currentSlideIndex]) {
        afterSlides[currentSlideIndex].classList.add('active');
    }
    
    console.log(`Showing image pair ${currentSlideIndex + 1}/${beforeSlides.length}`);
}

// Stop autoplay
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        console.log('Before/After autoplay stopped');
    }
}

// Pause autoplay temporarily when user interacts
function pauseAutoPlayTemporarily() {
    stopAutoPlay();
    // Resume after 5 seconds of no interaction
    setTimeout(() => {
        const beforeSlides = document.querySelectorAll('.before-slide');
        const afterSlides = document.querySelectorAll('.after-slide');
        startAutoPlay(beforeSlides, afterSlides);
    }, 5000);
}

// Initialize people slider
function initializePeopleSlider() {
  const peopleSlider = document.querySelector('.people-slider-container');
  if (!peopleSlider) {
    console.log('People slider not found');
    return;
  }
  
  if (typeof Swiper === 'undefined') {
    console.log('Swiper still not available');
    return;
  }
  
  console.log('Initializing people slider');
  
  try {
    // People Slider with Swiper - exact same as dental-implants.js
    new Swiper('.people-slider-container', {
      loop: true,
      grabCursor: true,
      spaceBetween: 25,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 15
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 25
        },
      }
    });

    console.log('People Swiper initialized successfully');
    
  } catch (error) {
    console.error('Error initializing people slider:', error);
  }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoPlay();
    } else {
        const beforeSlides = document.querySelectorAll('.before-slide');
        const afterSlides = document.querySelectorAll('.after-slide');
        startAutoPlay(beforeSlides, afterSlides);
    }
});

// Pause autoplay when user scrolls or interacts
window.addEventListener('scroll', () => {
    pauseAutoPlayTemporarily();
});

// Handle mouse interactions
document.addEventListener('click', () => {
    pauseAutoPlayTemporarily();
});

console.log('Before/After gallery script loaded with autoplay enabled by default');