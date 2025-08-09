
// Image Auto Slider for Clinic Images
var firstIndex = 0;
var clinicImages = [];

function initializeClinicSlider() {
  const imgContainer = document.querySelector('.dental-clinic-images-content');
  if (!imgContainer) {
    console.log('❌ Clinic images container not found');
    return;
  }
  
  clinicImages = imgContainer.querySelectorAll('.cli-den-img');
  if (clinicImages.length === 0) {
    console.log('❌ No clinic images found');
    return;
  }
  
  console.log('✅ Found', clinicImages.length, 'clinic images');
  
  // Ensure all images are properly loaded and styled
  clinicImages.forEach((img, index) => {
    // Force image display and positioning
    img.style.display = 'block';
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.8s ease-in-out';
    img.style.borderRadius = '15px';
    img.classList.remove('active');
    
    // Handle image load errors
    img.onerror = function() {
      console.warn(`⚠️ Failed to load image: ${img.src}`);
      img.style.display = 'none';
    };
    
    img.onload = function() {
      console.log(`✅ Loaded image ${index + 1}: ${img.alt}`);
    };
    
    console.log(`🖼️ Image ${index + 1} initialized: ${img.src}`);
  });
  
  // Show first image
  if (clinicImages[0]) {
    clinicImages[0].style.opacity = '1';
    clinicImages[0].classList.add('active');
    clinicImages[0].style.zIndex = '1';
    console.log('✅ First image displayed');
  }
  
  // Start auto slide with delay
  setTimeout(() => {
    automaticSlide();
    console.log('🚀 Auto-slide started for clinic images');
  }, 1000);
}

function automaticSlide() {
  if (clinicImages.length === 0) {
    console.log('❌ No clinic images available for auto-slide');
    return;
  }
  
  // Hide current image
  if (clinicImages[firstIndex]) {
    clinicImages[firstIndex].style.opacity = '0';
    clinicImages[firstIndex].classList.remove('active');
    clinicImages[firstIndex].style.zIndex = '0';
  }
  
  // Move to next image (infinite loop)
  firstIndex++;
  if (firstIndex >= clinicImages.length) {
    firstIndex = 0;
  }
  
  // Show new image
  if (clinicImages[firstIndex]) {
    clinicImages[firstIndex].style.opacity = '1';
    clinicImages[firstIndex].classList.add('active');
    clinicImages[firstIndex].style.zIndex = '1';
    console.log(`🔄 Showing clinic image ${firstIndex + 1}/${clinicImages.length}`);
  }
  
  // Schedule next slide
  setTimeout(automaticSlide, 4000); // 4 seconds for better viewing
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM loaded, initializing dentists page');
  
  // Ensure container has proper height
  const imageContainer = document.querySelector('.dentists-clinic-images-container');
  if (imageContainer) {
    console.log('📐 Setting proper container dimensions');
    imageContainer.style.minHeight = '400px';
    imageContainer.style.display = 'flex';
    imageContainer.style.alignItems = 'center';
    imageContainer.style.justifyContent = 'center';
  }
  
  // Initialize clinic slider with delay to ensure DOM is ready
  setTimeout(() => {
    initializeClinicSlider();
  }, 500);
  
  // Initialize people slider if Swiper is available
  if (typeof Swiper !== 'undefined') {
    initializePeopleSlider();
  } else {
    console.log('Swiper not available, waiting...');
    // Wait a bit for Swiper to load
    setTimeout(initializePeopleSlider, 1000);
  }
  
  // Debug: Check all clinic images after page load
  setTimeout(() => {
    const allImages = document.querySelectorAll('.cli-den-img');
    console.log('🔍 Debug: Total clinic images found:', allImages.length);
    allImages.forEach((img, index) => {
      console.log(`🖼️ Image ${index + 1}: ${img.src} - Loaded: ${img.complete}`);
      if (!img.complete) {
        console.warn(`⚠️ Image ${index + 1} not fully loaded`);
      }
    });
  }, 2000);
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