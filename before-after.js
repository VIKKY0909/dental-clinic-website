// Before/After Image Slideshow
var firstIndex = 0;
var beautifulImages = [];

function automaticSlide() {
  const imgContainer = document.querySelector('.beautiful-img-content');
  if (!imgContainer) return;
  
  beautifulImages = imgContainer.querySelectorAll('.beautifulb-img');
  if (beautifulImages.length === 0) return;
  
  // Hide all images
  beautifulImages.forEach(img => {
    img.style.display = 'none';
  });
  
  // Show current image
  if (beautifulImages[firstIndex]) {
    beautifulImages[firstIndex].style.display = 'block';
  }
  
  // Move to next image
  firstIndex++;
  if (firstIndex >= beautifulImages.length) {
    firstIndex = 0;
  }
  
  // Schedule next slide
  setTimeout(automaticSlide, 3000);
}

// Auto slide for beautiful images
function autoSlide() {
  const imgContainer = document.querySelector('.beautiful-img-content');
  if (!imgContainer) return;
  
  beautifulImages = imgContainer.querySelectorAll('.beautifula-img');
  if (beautifulImages.length === 0) return;
  
  // Hide all images
  beautifulImages.forEach(img => {
    img.style.display = 'none';
  });
  
  // Show current image
  if (beautifulImages[firstIndex]) {
    beautifulImages[firstIndex].style.display = 'block';
  }
  
  // Move to next image
  firstIndex++;
  if (firstIndex >= beautifulImages.length) {
    firstIndex = 0;
  }
  
  // Schedule next slide
  setTimeout(autoSlide, 3000);
}

// Start slideshows when page loads
document.addEventListener('DOMContentLoaded', function() {
  automaticSlide();
  autoSlide();
  
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