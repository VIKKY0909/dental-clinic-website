// ==============================================================
// SMILE MAKEOVER PAGE - TESTIMONIALS SLIDER (CONFLICT-FREE VERSION)
// ==============================================================

console.log('🚀 Smile Makeover JS loaded successfully!');

// Create namespace to avoid global conflicts
const SmileMakeover = {
  // Before/After slideshow variables
  currentSlideIndex: 0,
  beforeSlides: [],
  afterSlides: [],
  beforeAfterInitialized: false,
  slideInterval: null,
  
  // People slider variables
  peopleSliderInitialized: false,
  peopleSwiper: null,
  
  // Testimonials slider
  testimonialsSlider: null
};

// ==============================================================
// BEFORE/AFTER IMAGE SLIDESHOW
// ==============================================================

function initializeMakeoverBeforeAfter() {
  if (SmileMakeover.beforeAfterInitialized) return;
  
  console.log('🚀 Initializing makeover before/after slideshow...');
  
  // Get all before and after images
  SmileMakeover.beforeSlides = document.querySelectorAll('.before-slide');
  SmileMakeover.afterSlides = document.querySelectorAll('.after-slide');
  
  if (SmileMakeover.beforeSlides.length === 0 || SmileMakeover.afterSlides.length === 0) {
    console.log('No before/after slides found');
    return;
  }
  
  console.log(`✅ Found ${SmileMakeover.beforeSlides.length} before slides and ${SmileMakeover.afterSlides.length} after slides`);
  
  // Hide all slides initially
  SmileMakeover.beforeSlides.forEach(slide => slide.classList.remove('active'));
  SmileMakeover.afterSlides.forEach(slide => slide.classList.remove('active'));
  
  // Show first slide
  if (SmileMakeover.beforeSlides[0]) SmileMakeover.beforeSlides[0].classList.add('active');
  if (SmileMakeover.afterSlides[0]) SmileMakeover.afterSlides[0].classList.add('active');
  
  // Start the slideshow
  startMakeoverBeforeAfterSlideshow();
  SmileMakeover.beforeAfterInitialized = true;
  
  console.log('✅ Makeover before/after slideshow initialized successfully!');
}

function startMakeoverBeforeAfterSlideshow() {
  // Clear any existing intervals to prevent conflicts
  if (SmileMakeover.slideInterval) {
    clearInterval(SmileMakeover.slideInterval);
    SmileMakeover.slideInterval = null;
  }
  
  SmileMakeover.slideInterval = setInterval(() => {
    // Ensure slides arrays are still valid
    if (SmileMakeover.beforeSlides.length === 0 || SmileMakeover.afterSlides.length === 0) {
      return;
    }
    
    // Calculate next slide index first
    const nextSlideIndex = (SmileMakeover.currentSlideIndex + 1) >= SmileMakeover.beforeSlides.length ? 0 : SmileMakeover.currentSlideIndex + 1;
    
    // Show next slides immediately (before hiding current ones for smooth transition)
    if (SmileMakeover.beforeSlides[nextSlideIndex]) {
      SmileMakeover.beforeSlides[nextSlideIndex].classList.add('active');
    }
    if (SmileMakeover.afterSlides[nextSlideIndex]) {
      SmileMakeover.afterSlides[nextSlideIndex].classList.add('active');
    }
    
    // Small delay to ensure smooth transition, then hide previous slides
    setTimeout(() => {
      if (SmileMakeover.beforeSlides[SmileMakeover.currentSlideIndex]) {
        SmileMakeover.beforeSlides[SmileMakeover.currentSlideIndex].classList.remove('active');
      }
      if (SmileMakeover.afterSlides[SmileMakeover.currentSlideIndex]) {
        SmileMakeover.afterSlides[SmileMakeover.currentSlideIndex].classList.remove('active');
      }
      
      // Update current index
      SmileMakeover.currentSlideIndex = nextSlideIndex;
      
      console.log(`Showing makeover slide pair ${SmileMakeover.currentSlideIndex + 1}/${SmileMakeover.beforeSlides.length}`);
    }, 50); // 50ms delay for smooth transition
    
  }, 3000); // Change slide every 3 seconds
  
  console.log('✅ Makeover before/after autoplay started (3-second intervals)');
}

function stopMakeoverBeforeAfterSlideshow() {
  if (SmileMakeover.slideInterval) {
    clearInterval(SmileMakeover.slideInterval);
    SmileMakeover.slideInterval = null;
    console.log('⏸️ Makeover before/after slideshow stopped');
  }
}

// ==============================================================
// TESTIMONIALS SLIDER
// ==============================================================

function initializeMakeoverTestimonialsSlider() {
  console.log('🚀 Initializing makeover testimonials slider...');
  
  // Get testimonials slider container
  SmileMakeover.testimonialsSlider = document.querySelector('.makeover-slider-dentalcontainer');
  
  if (!SmileMakeover.testimonialsSlider) {
    console.log('⚠️ Makeover testimonials slider container not found');
    return;
  }
  
  console.log('✅ Found makeover testimonials slider container, initializing...');
  
  try {
    // Check if Swiper is available
    if (typeof Swiper === 'undefined') {
      console.error('❌ Swiper library not found! Please include Swiper.js');
      return;
    }
    
    // Initialize Swiper for testimonials
    const testimonialsSwiper = new Swiper('.makeover-slider-dentalcontainer', {
      // Enable loop mode
      loop: true,
      
      // Grab cursor
      grabCursor: true,
      
      // Space between slides
      spaceBetween: 30,
      
      // Slides per view
      slidesPerView: 1,
      
      // Centered slides
      centeredSlides: true,
      
      // Autoplay configuration
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      
      // Pagination configuration
      pagination: {
        el: '.makeover-slider-dentalcontainer .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      
      // Navigation configuration
      navigation: {
        nextEl: '.makeover-slider-dentalcontainer .swiper-button-next',
        prevEl: '.makeover-slider-dentalcontainer .swiper-button-prev',
      },
      
      // Responsive breakpoints
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
          spaceBetween: 30
        },
      },
      
      // Speed
      speed: 600,
      
      // Effects
      effect: 'slide',
      
      // Events
      on: {
        init: function () {
          console.log('✅ Makeover testimonials slider initialized successfully!');
        },
        slideChange: function () {
          // Pause all videos when slide changes
          const allVideos = document.querySelectorAll('.makeover-slider-dentalcontainer .dentaluser-video');
          allVideos.forEach(video => {
            if (!video.paused) {
              video.pause();
              console.log('Video paused on slide change');
            }
          });
        }
      }
    });
    
    // Add video event listeners for better user experience
    const videos = document.querySelectorAll('.makeover-slider-dentalcontainer .dentaluser-video');
    console.log(`Found ${videos.length} testimonial videos`);
    
    videos.forEach((video, index) => {
      // Pause autoplay when video starts playing
      video.addEventListener('play', () => {
        if (testimonialsSwiper.autoplay) {
          testimonialsSwiper.autoplay.stop();
          console.log(`Video ${index + 1} playing - autoplay paused`);
        }
      });
      
      // Resume autoplay when video is paused
      video.addEventListener('pause', () => {
        if (testimonialsSwiper.autoplay) {
          testimonialsSwiper.autoplay.start();
          console.log(`Video ${index + 1} paused - autoplay resumed`);
        }
      });
      
      // Resume autoplay when video ends
      video.addEventListener('ended', () => {
        if (testimonialsSwiper.autoplay) {
          testimonialsSwiper.autoplay.start();
          console.log(`Video ${index + 1} ended - autoplay resumed`);
        }
      });
      
      // Handle video loading
      video.addEventListener('loadstart', () => {
        console.log(`Video ${index + 1} loading started`);
      });
      
      video.addEventListener('canplay', () => {
        console.log(`Video ${index + 1} can start playing`);
      });
      
      // Error handling
      video.addEventListener('error', (e) => {
        console.error(`Video ${index + 1} error:`, e);
      });
    });
    
  } catch (error) {
    console.error('❌ Error initializing makeover testimonials slider:', error);
  }
}

// ==============================================================
// PEOPLE SLIDER - SWIPER.JS IMPLEMENTATION (MATCHES YOUR CSS)
// ==============================================================

function initializeMakeoverPeopleSlider() {
  if (SmileMakeover.peopleSliderInitialized) return;
  
  console.log('🚀 Initializing makeover people slider with Swiper...');
  
  // Check if Swiper is available
  if (typeof Swiper === 'undefined') {
    console.error('❌ Swiper library not found! Please include Swiper.js');
    return;
  }
  
  const peopleSlider = document.querySelector('.people-slider-wrapper');
  const peopleList = document.querySelectorAll('.people-item');
  
  if (!peopleSlider || peopleList.length === 0) {
    console.log('⚠️ Makeover people slider elements not found');
    return;
  }
  
  console.log(`✅ Found ${peopleList.length} people items`);
  
  try {
    // Initialize Swiper for people slider - matches your CSS design
    const peopleSwiper = new Swiper('.people-slider-wrapper', {
      // Enable loop mode
      loop: true,
      
      // Grab cursor
      grabCursor: true,
      
      // Space between slides
      spaceBetween: 25,
      
      // Slides per view
      slidesPerView: 1,
      
      // Centered slides
      centeredSlides: true,
      
      // Direction - ensure forward movement only
      direction: 'horizontal',
      
      // Prevent reverse movement
      allowTouchMove: true,
      resistance: false,
      resistanceRatio: 0,
      
      // Autoplay configuration - FIXED for forward-only movement
      autoplay: {
        delay: 4000, // 4 seconds
        disableOnInteraction: false, // Keep autoplay running after user interaction
        pauseOnMouseEnter: true, // Pause when mouse hovers
        waitForTransition: true, // Wait for transition to complete
        stopOnLastSlide: false, // Don't stop on last slide (loop mode)
        reverseDirection: false, // Ensure forward direction only
      },
      
      // Pagination configuration - matches your CSS
      pagination: {
        el: '.people-slider-wrapper .swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      
      // Navigation configuration - matches your CSS
      navigation: {
        nextEl: '.people-slider-wrapper .swiper-button-next',
        prevEl: '.people-slider-wrapper .swiper-button-prev',
      },
      
      // Responsive breakpoints - optimized for your design
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
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 35
        }
      },
      
      // Speed
      speed: 600,
      
      // Effects
      effect: 'slide',
      
      // Additional options
      watchSlidesProgress: true,
      watchOverflow: true,
      
      // Events
      on: {
        init: function () {
          console.log('✅ Makeover people slider initialized successfully!');
          console.log(`📊 Slider has ${this.slides.length} slides`);
          
          // Store swiper instance
          SmileMakeover.peopleSwiper = this;
          
          // Ensure autoplay starts immediately
          setTimeout(() => {
            if (this.autoplay && !this.autoplay.running) {
              this.autoplay.start();
              console.log('🚀 Autoplay started in init event');
            }
          }, 1000);
        },
        slideChange: function () {
          console.log(`📍 People slider: moved to slide ${this.activeIndex + 1}/${this.slides.length}`);
          
          // Ensure we're moving forward by checking slide index progression
          if (this.previousIndex !== undefined && this.activeIndex !== undefined) {
            const expectedNextIndex = (this.previousIndex + 1) % this.slides.length;
            if (this.activeIndex !== expectedNextIndex) {
              console.log('⚠️ Slide direction issue detected, correcting...');
              // Force move to next slide if direction is wrong
              this.slideTo(expectedNextIndex, 300, false);
            }
          }
        },
        autoplayStart: function () {
          console.log('▶️ People slider autoplay started');
        },
        autoplayStop: function () {
          console.log('⏸️ People slider autoplay stopped');
        },
        touchStart: function () {
          console.log('👆 People slider: touch started');
        },
        touchEnd: function () {
          console.log('👆 People slider: touch ended');
        }
      }
    });
    
    // Store reference for later use
    SmileMakeover.peopleSwiper = peopleSwiper;
    SmileMakeover.peopleSliderInitialized = true;
    
    // Ensure autoplay is running
    if (peopleSwiper.autoplay) {
      peopleSwiper.autoplay.start();
      console.log('▶️ People slider autoplay started after initialization');
      
      // Add custom autoplay handler to ensure forward movement
      const originalAutoplayStart = peopleSwiper.autoplay.start;
      peopleSwiper.autoplay.start = function() {
        originalAutoplayStart.call(this);
        
        // Force forward movement every 4 seconds
        setInterval(() => {
          if (this.autoplay && this.autoplay.running) {
            const currentIndex = this.activeIndex;
            const nextIndex = (currentIndex + 1) % this.slides.length;
            this.slideTo(nextIndex, 600, false);
          }
        }, 4000);
      };
    }
    
    // Add hover pause/resume functionality
    const sliderContainer = document.querySelector('.people-slider-wrapper');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => {
        if (peopleSwiper.autoplay && peopleSwiper.autoplay.running) {
          peopleSwiper.autoplay.stop();
          console.log('🐭 Mouse enter - people slider autoplay paused');
        }
      });
      
      sliderContainer.addEventListener('mouseleave', () => {
        if (peopleSwiper.autoplay && !peopleSwiper.autoplay.running) {
          peopleSwiper.autoplay.start();
          console.log('🐭 Mouse leave - people slider autoplay resumed');
        }
      });
    }
    
    console.log('🎉 Makeover people slider with Swiper initialized successfully!');
    
    // Set up periodic autoplay check to ensure it never stops and moves forward
    setInterval(() => {
      if (SmileMakeover.peopleSwiper && SmileMakeover.peopleSwiper.autoplay && !SmileMakeover.peopleSwiper.autoplay.running) {
        console.log('🔄 Periodic check - restarting people slider autoplay');
        SmileMakeover.peopleSwiper.autoplay.start();
        
        // Ensure we're moving forward by checking current slide
        const currentIndex = SmileMakeover.peopleSwiper.activeIndex;
        const nextIndex = (currentIndex + 1) % SmileMakeover.peopleSwiper.slides.length;
        
        // Force move to next slide to maintain forward progression
        setTimeout(() => {
          SmileMakeover.peopleSwiper.slideTo(nextIndex, 300, false);
        }, 500);
      }
    }, 10000); // Check every 10 seconds
    
  } catch (error) {
    console.error('❌ Error initializing makeover people slider:', error);
  }
}

function stopMakeoverPeopleAutoplay() {
  if (SmileMakeover.peopleSwiper && SmileMakeover.peopleSwiper.autoplay) {
    SmileMakeover.peopleSwiper.autoplay.stop();
    console.log('⏸️ Makeover people slider autoplay stopped');
  }
}

function startMakeoverPeopleAutoplay() {
  if (SmileMakeover.peopleSwiper && SmileMakeover.peopleSwiper.autoplay) {
    SmileMakeover.peopleSwiper.autoplay.start();
    console.log('▶️ Makeover people slider autoplay started');
    
    // Add a fallback check to ensure autoplay keeps running
    setTimeout(() => {
      if (SmileMakeover.peopleSwiper && SmileMakeover.peopleSwiper.autoplay && !SmileMakeover.peopleSwiper.autoplay.running) {
        console.log('🔄 Autoplay check - restarting if needed');
        SmileMakeover.peopleSwiper.autoplay.start();
      }
    }, 5000);
  }
}

function resetMakeoverPeopleAutoplay() {
  stopMakeoverPeopleAutoplay();
  setTimeout(() => {
    startMakeoverPeopleAutoplay();
  }, 100);
}

// ==============================================================
// PAGE VISIBILITY AND USER INTERACTION HANDLING
// ==============================================================

function handlePageVisibilityChange() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Page is hidden - stop all autoplay
      stopMakeoverBeforeAfterSlideshow();
      stopMakeoverPeopleAutoplay();
      console.log('👁️ Page hidden - stopped all makeover autoplay');
    } else {
      // Page is visible - restart autoplay
      if (SmileMakeover.beforeAfterInitialized) {
        startMakeoverBeforeAfterSlideshow();
      }
      if (SmileMakeover.peopleSliderInitialized) {
        startMakeoverPeopleAutoplay();
      }
      console.log('👁️ Page visible - restarted makeover autoplay');
    }
  });
}

// ==============================================================
// INITIALIZATION
// ==============================================================

function initializeAllMakeoverSliders() {
  console.log('🚀 Initializing all makeover sliders...');
  
  try {
    // Initialize before/after slideshow
    initializeMakeoverBeforeAfter();
    
    // Initialize testimonials slider (requires Swiper)
    initializeMakeoverTestimonialsSlider();
    
    // Initialize people slider
    initializeMakeoverPeopleSlider();
    
    // Handle page visibility changes
    handlePageVisibilityChange();
    
    console.log('🎉 All makeover sliders initialization completed!');
    
  } catch (error) {
    console.error('❌ Error during makeover sliders initialization:', error);
  }
}

// ==============================================================
// EVENT LISTENERS
// ==============================================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('📄 DOM Content Loaded - Smile Makeover Page');
  
  // Check if we're on the right page
  const pageIdentifiers = [
    '.makeover-slider-dentalcontainer',
    '.before-slide',
    '.people-slider-wrapper'
  ];
  
  const isCorrectPage = pageIdentifiers.some(selector => 
    document.querySelector(selector) !== null
  );
  
  if (!isCorrectPage) {
    console.log('⚠️ Makeover page elements not found - skipping initialization');
    return;
  }
  
  // Small delay to ensure all elements are ready
  setTimeout(() => {
    initializeAllMakeoverSliders();
  }, 100);
});

// Fallback initialization on window load
window.addEventListener('load', function() {
  console.log('🪟 Window Loaded - Smile Makeover Page');
  
  // Only initialize if not already done
  if (!SmileMakeover.peopleSliderInitialized || !SmileMakeover.beforeAfterInitialized) {
    setTimeout(() => {
      initializeAllMakeoverSliders();
    }, 100);
  }
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
  console.log('🧹 Page unloading - cleaning up makeover sliders');
  
  // Clear all intervals
  stopMakeoverBeforeAfterSlideshow();
  stopMakeoverPeopleAutoplay();
  
  // Destroy Swiper instances
  if (SmileMakeover.peopleSwiper) {
    SmileMakeover.peopleSwiper.destroy(true, true);
    SmileMakeover.peopleSwiper = null;
  }
  
  // Reset state
  SmileMakeover.beforeAfterInitialized = false;
  SmileMakeover.peopleSliderInitialized = false;
});

// Handle window resize
window.addEventListener('resize', function() {
  // Let Swiper handle its own resize
  if (SmileMakeover.peopleSwiper) {
    SmileMakeover.peopleSwiper.update();
  }
});

console.log('✅ Smile Makeover JavaScript fully loaded and ready!');