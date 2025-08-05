// Video loading functionality
const videos = {
  1: "https://www.youtube.com/embed/VIDEO_ID_1",
  2: "https://www.youtube.com/embed/VIDEO_ID_2",
  3: "https://www.youtube.com/embed/VIDEO_ID_3",
  4: "https://www.youtube.com/embed/VIDEO_ID_4",
  5: "https://www.youtube.com/embed/VIDEO_ID_5",
  6: "https://www.youtube.com/embed/VIDEO_ID_6"
};

function changePage(pageNumber) {
  const videoFrame = document.getElementById('video-frame');
  if (videoFrame && videos[pageNumber]) {
    videoFrame.src = videos[pageNumber];
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing testimonials videos page');
  
  // Initialize video slider if Swiper is available
  if (typeof Swiper !== 'undefined') {
    initializeVideoSlider();
  } else {
    console.log('Swiper not available, waiting...');
    // Wait a bit for Swiper to load
    setTimeout(initializeVideoSlider, 1000);
  }
});

function initializeVideoSlider() {
  const videoSlider = document.querySelector('.slider-wrapper');
  if (!videoSlider) {
    console.log('Video slider not found');
    return;
  }
  
  if (typeof Swiper === 'undefined') {
    console.log('Swiper still not available');
    return;
  }
  
  console.log('Initializing video slider');
  
  // Video Slider with Swiper
const swiper = new Swiper('.slider-wrapper', {
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