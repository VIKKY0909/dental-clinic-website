// ===========================================================
// DENTAL IMPLANTS PAGE - FIXED VIDEO FUNCTIONALITY
// ===========================================================

// Global variable to track the currently playing video
let currentlyPlayingVideo = null;

// Before/After Image Slideshow for dental implants
function initializeDentalImplantsSlideshows() {
  // Before Image Slideshow
  const beforeImages = document.querySelectorAll(".dentalb-img");
  let beforeIndex = 0;

  // After Image Slideshow
  const afterImages = document.querySelectorAll(".dentala-img");
  let afterIndex = 0;

  // Only initialize if we have images
  if (beforeImages.length > 0) {
    // Show first image initially
    beforeImages[beforeIndex].style.display = "block";

    // Set up interval for automatic slideshow
    setInterval(() => {
      // Hide current image
      beforeImages[beforeIndex].style.display = "none";

      // Move to next image
      beforeIndex = (beforeIndex + 1) % beforeImages.length;

      // Show next image
      beforeImages[beforeIndex].style.display = "block";
    }, 2000);
  }

  if (afterImages.length > 0) {
    // Show first image initially
    afterImages[afterIndex].style.display = "block";

    // Set up interval for automatic slideshow
    setInterval(() => {
      // Hide current image
      afterImages[afterIndex].style.display = "none";

      // Move to next image
      afterIndex = (afterIndex + 1) % afterImages.length;

      // Show next image
      afterImages[afterIndex].style.display = "block";
    }, 2000);
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Start the before/after slideshows
  initializeDentalImplantsSlideshows();

  // Initialize accordion functionality
  initializeAccordion();

  // Initialize Swiper sliders with simplified video handling
  initializeSwipers();
});

// Accordion functionality
function initializeAccordion() {
  document.querySelectorAll(".accordion-item").forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const content = item.querySelector(".accordion-content");
    const toggleBtn = item.querySelector(".toggle-btn");

    if (header && content) {
      header.addEventListener("click", () => {
        const isOpen = content.classList.contains("open");

        // Close all other items
        document.querySelectorAll(".accordion-content").forEach((c) => {
          c.classList.remove("open");
        });

        document
          .querySelectorAll(".toggle-btn")
          .forEach((btn) => (btn.textContent = "+"));

        // Toggle current item
        if (!isOpen) {
          content.classList.add("open");
          toggleBtn.textContent = "x";
        } else {
          content.classList.remove("open");
          toggleBtn.textContent = "+";
        }
      });
    }
  });
}

// Simple Video Slider Controller
class VideoSlider {
  constructor(container) {
    this.slider = null;
    this.container = container;
    this.init();
  }

  init() {
    // Initialize Swiper
    this.slider = new Swiper(this.container, {
      loop: true,
      spaceBetween: 25,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: this.container + " .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: this.container + " .swiper-button-next",
        prevEl: this.container + " .swiper-button-prev",
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      },
      // Prevent clicks on videos from changing slides
      preventClicks: true,
      preventClicksPropagation: true,
    });

    this.setupVideoControls();
    this.setupNavigationEvents();
  }

  setupVideoControls() {
    const videos = document.querySelectorAll(this.container + " video");

    videos.forEach((video) => {
      // Handle video play event
      video.addEventListener("play", () => {
        // Pause any currently playing video
        if (currentlyPlayingVideo && currentlyPlayingVideo !== video) {
          currentlyPlayingVideo.pause();
        }
        // Set current video
        currentlyPlayingVideo = video;
        // Pause slider autoplay
        this.slider.autoplay.stop();
      });

      // Handle video pause event
      video.addEventListener("pause", () => {
        if (currentlyPlayingVideo === video) {
          currentlyPlayingVideo = null;
        }
        // Resume slider autoplay if no video is playing
        if (!currentlyPlayingVideo) {
          this.slider.autoplay.start();
        }
      });

      // Handle video end event
      video.addEventListener("ended", () => {
        if (currentlyPlayingVideo === video) {
          currentlyPlayingVideo = null;
        }
        // Resume slider autoplay
        this.slider.autoplay.start();
      });

      // Prevent click events from propagating to Swiper
      video.addEventListener("click", (e) => {
        e.stopPropagation();
        // Toggle play/pause on video click
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      });
    });
  }

  setupNavigationEvents() {
    // Pause video when navigating with buttons
    const nextBtn = document.querySelector(
      this.container + " .swiper-button-next"
    );
    const prevBtn = document.querySelector(
      this.container + " .swiper-button-prev"
    );
    const pagination = document.querySelector(
      this.container + " .swiper-pagination"
    );

    const pauseCurrentVideo = () => {
      if (currentlyPlayingVideo) {
        currentlyPlayingVideo.pause();
        currentlyPlayingVideo = null;
      }
    };

    if (nextBtn) nextBtn.addEventListener("click", pauseCurrentVideo);
    if (prevBtn) prevBtn.addEventListener("click", pauseCurrentVideo);
    if (pagination) pagination.addEventListener("click", pauseCurrentVideo);

    // Also pause video when swiping
    this.slider.on("slideChange", pauseCurrentVideo);
  }
}

// Initialize people slider independently
function initializePeopleSlider() {
  const peopleSlider = document.querySelector(".people-slider-container");
  if (!peopleSlider) {
    console.log("People slider container not found");
    return;
  }
  
  // Destroy any existing swiper instance
  
  if (peopleSlider.swiper) {
    peopleSlider.swiper.destroy(true, true);
  }
  
  const peopleSwiper = new Swiper(".people-slider-container", {
    loop: true,
    grabCursor: true,
    spaceBetween: 25,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
      reverseDirection: false,
      stopOnLastSlide: false,
    },
    speed: 1000,
    effect: 'slide',
    slidesPerView: 1,
    centeredSlides: false,
    pagination: {
      el: ".people-slider-container .swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".people-slider-container .swiper-button-next",
      prevEl: ".people-slider-container .swiper-button-prev",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
    },
    preventClicks: true,
    preventClicksPropagation: true,
    allowTouchMove: true,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    on: {
      init: function () {
        console.log('People slider initialized successfully');
        setTimeout(() => {
          this.autoplay.start();
        }, 100);
      },
      slideChange: function () {
        console.log('Slide changed to:', this.activeIndex);
      }
    }
  });
  
  // Force autoplay to start
  setTimeout(() => {
    peopleSwiper.autoplay.start();
  }, 500);
  
  // Fallback autoplay mechanism
  let autoplayInterval;
  const startFallbackAutoplay = () => {
    autoplayInterval = setInterval(() => {
      if (peopleSwiper && !peopleSwiper.autoplay.running) {
        peopleSwiper.slideNext();
      }
    }, 5000);
  };
  
  setTimeout(startFallbackAutoplay, 1000);
  
  peopleSwiper.on('touchStart', () => {
    clearInterval(autoplayInterval);
  });
  
  peopleSwiper.on('touchEnd', () => {
    setTimeout(startFallbackAutoplay, 2000);
  });
}

// Initialize all Swiper sliders
function initializeSwipers() {
  // Wait for Swiper to be available
  if (typeof Swiper === "undefined") {
    console.log("Swiper not available, retrying...");
    setTimeout(initializeSwipers, 100);
    return;
  }
  
  // Initialize people slider first and independently
  initializePeopleSlider();

  try {
    // Dental testimonials slider
    const dentalTestimonialsSlider = document.querySelector(
      ".makeover-slider-dentalcontainer"
    );
    if (dentalTestimonialsSlider) {
      new VideoSlider(".makeover-slider-dentalcontainer");
    }

    // Basal video testimonials slider
    const basalSlider = document.querySelector(".basal-slider-container");
    if (basalSlider) {
      const basalSwiper = new Swiper(".basal-slider-container", {
        loop: true,
        grabCursor: true,
        spaceBetween: 25,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
        },
      });

      // Add click event listeners for lazy loading videos
      const videoPlaceholders =
        basalSlider.querySelectorAll(".video-placeholder");
      videoPlaceholders.forEach((placeholder) => {
        placeholder.addEventListener("click", function () {
          const videoId = this.getAttribute("data-video-id");
          const videoTitle = this.getAttribute("data-video-title");

          // Create iframe with the video
          const iframe = document.createElement("iframe");
          iframe.width = "100%";
          iframe.height = "100%";
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
          iframe.title = videoTitle;
          iframe.frameBorder = "0";
          iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
          iframe.referrerPolicy = "strict-origin-when-cross-origin";
          iframe.allowFullscreen = true;

          // Replace placeholder content with iframe
          this.innerHTML = "";
          this.appendChild(iframe);
          this.classList.add("loaded");

          // Pause autoplay when video is loaded
          basalSwiper.autoplay.stop();

          // Resume autoplay after a delay (when user might finish watching)
          setTimeout(() => {
            basalSwiper.autoplay.start();
          }, 10000); // Resume after 10 seconds
        });
      });
    }


  } catch (error) {
    console.error("Error initializing Swiper sliders:", error);
  }
}