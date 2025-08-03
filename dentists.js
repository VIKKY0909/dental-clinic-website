
// Image Auto Slider for Clinic Images
var firstIndex = 0;
var clinicImages = [];

function initializeClinicSlider() {
  const imgContainer = document.querySelector('.dental-clinic-images-content');
  if (!imgContainer) {
    console.log('Clinic images container not found');
    return;
  }
  
  clinicImages = imgContainer.querySelectorAll('.cli-den-img');
  if (clinicImages.length === 0) {
    console.log('No clinic images found');
    return;
  }
  
  console.log('Found', clinicImages.length, 'clinic images');
  
  // Hide all images initially
  clinicImages.forEach(img => {
    img.style.opacity = '0';
    img.style.display = 'block';
    img.style.transition = 'opacity 0.5s ease-in-out';
  });
  
  // Show first image
  if (clinicImages[0]) {
    clinicImages[0].style.opacity = '1';
    clinicImages[0].classList.add('active');
  }
  
  // Start auto slide
automaticSlide();
}

function automaticSlide() {
  if (clinicImages.length === 0) return;
  
  // Hide current image
  if (clinicImages[firstIndex]) {
    clinicImages[firstIndex].style.opacity = '0';
    clinicImages[firstIndex].classList.remove('active');
  }
  
  // Move to next image
  firstIndex++;
  if (firstIndex >= clinicImages.length) {
    firstIndex = 0;
  }
  
  // Show new image
  if (clinicImages[firstIndex]) {
    clinicImages[firstIndex].style.opacity = '1';
    clinicImages[firstIndex].classList.add('active');
  }
  
  // Schedule next slide
  setTimeout(automaticSlide, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing dentists page');
  
  // Initialize clinic slider
  initializeClinicSlider();
  
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

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  //responsive breakpoints
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