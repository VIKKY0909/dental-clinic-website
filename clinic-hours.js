// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing clinic hours page');
  
  // Initialize people slider if Swiper is available
  if (typeof Swiper !== 'undefined') {
    initializePeopleSlider();
  } else {
    console.log('Swiper not available, waiting...');
    // Wait a bit for Swiper to load
    setTimeout(initializePeopleSlider, 1000);
  }
});

function initializePeopleSlider() {
  const peopleSlider = document.querySelector('.people-slider-wrapper');
  if (!peopleSlider) {
    console.log('People slider not found');
    return;
  }
  
  if (typeof Swiper === 'undefined') {
    console.log('Swiper still not available');
    return;
  }
  
  console.log('Initializing people slider');
  
  // People Slider with Swiper
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