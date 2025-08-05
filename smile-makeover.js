// Before/After Image Slideshow
let currentSlideIndex = 0;
let beforeSlides = [];
let afterSlides = [];

function initializeBeforeAfterSlideshow() {
  // Get all before and after images
  beforeSlides = document.querySelectorAll('.before-slide');
  afterSlides = document.querySelectorAll('.after-slide');
  
  if (beforeSlides.length === 0 || afterSlides.length === 0) {
    console.log('No slides found');
    return;
  }
  
  // Hide all slides initially
  beforeSlides.forEach(slide => slide.classList.remove('active'));
  afterSlides.forEach(slide => slide.classList.remove('active'));
  
  // Show first slide
  if (beforeSlides[0]) beforeSlides[0].classList.add('active');
  if (afterSlides[0]) afterSlides[0].classList.add('active');
  
  // Start the slideshow
  startBeforeAfterSlideshow();
}

function startBeforeAfterSlideshow() {
  setInterval(() => {
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
  }, 3000); // Change slide every 3 seconds
}

// Start slideshows when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize before/after slideshow
  initializeBeforeAfterSlideshow();
  
  // Initialize sliders if Swiper is available
  if (typeof Swiper !== 'undefined') {
    initializeSliders();
  } else {
    console.log('Swiper not available, waiting...');
    // Wait a bit for Swiper to load
    setTimeout(initializeSliders, 1000);
  }
});

function initializeSliders() {
  // Initialize makeover testimonials slider
  const makeoverSlider = document.querySelector('.makeover-slider-wrapper');
  if (makeoverSlider && typeof Swiper !== 'undefined') {
    console.log('Initializing makeover testimonials slider');
    
    const makeoverswiper = new Swiper('.makeover-slider-wrapper', {
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
  }
  
  // Initialize people slider
  const peopleSlider = document.querySelector('.people-slider-wrapper');
  if (peopleSlider && typeof Swiper !== 'undefined') {
    console.log('Initializing people slider');
    
    const swiperpeople = new Swiper('.people-slider-wrapper', {
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
  }
}