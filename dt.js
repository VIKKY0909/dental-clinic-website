
// Automatic slideshow for tourism places images
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
  const images = document.querySelectorAll('.tourism-places-img');
  if (images.length === 0) return;
  
  // Hide all images
  images.forEach(img => {
    img.style.display = 'none';
  });
  
  // Show current image
  if (images[index]) {
    images[index].style.display = 'block';
  }
}

function nextSlide() {
  const images = document.querySelectorAll('.tourism-places-img');
  if (images.length === 0) return;
  
  currentSlide = (currentSlide + 1) % images.length;
  showSlide(currentSlide);
}

function startSlideshow() {
  // Show first image initially
  showSlide(0);
  
  // Start automatic slideshow
  slideInterval = setInterval(nextSlide, 3000);
}

function stopSlideshow() {
  clearInterval(slideInterval);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Start automatic slideshow
  startSlideshow();
  
  // Pause on hover for better UX
  const imageContainer = document.querySelector('.dental-tourism-images-content');
  if (imageContainer) {
    imageContainer.addEventListener('mouseenter', stopSlideshow);
    imageContainer.addEventListener('mouseleave', startSlideshow);
  }
});

// Tourism Images Auto Slider
var currentIndex = 0;
var tourismImages = [];

function automaticSlide() {
  const imgContainer = document.querySelector('.dental-tourism-images-content');
  if (!imgContainer) return;
  
  tourismImages = imgContainer.querySelectorAll('.tourism-places-img');
  if (tourismImages.length === 0) return;
  
  // Hide all images
  tourismImages.forEach(img => {
    img.style.display = 'none';
  });
  
  // Show current image
  if (tourismImages[currentIndex]) {
    tourismImages[currentIndex].style.display = 'block';
  }
  
  // Move to next image
  currentIndex++;
  if (currentIndex >= tourismImages.length) {
    currentIndex = 0;
  }
  
  // Schedule next slide
  setTimeout(automaticSlide, 3000);
}

// Start auto slide when page loads
document.addEventListener('DOMContentLoaded', function() {
  automaticSlide();
  
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