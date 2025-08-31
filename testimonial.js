// ==========================================
// TESTIMONIALS SLIDER - FIXED AND WORKING VERSION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Get elements specifically from testimonials-section
  const testimonialSlides = document.querySelectorAll(
    ".testimonials-section .testimonial-slide"
  );
  const videos = document.querySelectorAll(
    ".testimonials-section .testimonial-slide video"
  );
  const prevBtn = document.querySelector(".testimonials-section .prev-btn");
  const nextBtn = document.querySelector(".testimonials-section .next-btn");
  const dots = document.querySelectorAll(".testimonials-section .dot");

  let currentSlide = 0;
  let autoSlideInterval;
  let isAutoPlaying = true;
  let isVideoPlaying = false;

  // Initialize slider
  if (testimonialSlides.length > 0) {
    initializeSlider();
    startAutoSlide();
  }

  // NEW: Pause all videos function
  function pauseAllVideos() {
    videos.forEach((video) => {
      if (!video.paused) {
        video.pause();
        isVideoPlaying = false;
      }
    });
  }

  // Setup slides
  function setupSlides() {
    testimonialSlides.forEach((slide, index) => {
      slide.style.display = index === 0 ? "block" : "none";
    });
  }

  // Show specific slide
  function showSlide(index) {
    // Pause any playing videos before changing slides
    pauseAllVideos();

    testimonialSlides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
      slide.classList.toggle("active", i === index);
    });

    updateNavButtons();
    updateDots();

    // Check if current slide has a video and pause autoplay if video is playing
    const currentSlideElement = testimonialSlides[index];
    const currentVideo = currentSlideElement.querySelector("video");
    if (currentVideo && !currentVideo.paused) {
      isVideoPlaying = true;
      stopAutoSlide();
    } else {
      isVideoPlaying = false;
      if (isAutoPlaying) {
        startAutoSlide();
      }
    }
  }

  // Initialize slider
  function initializeSlider() {
    setupSlides();
    updateNavButtons();
    updateDots();

    // Add event listeners
    if (prevBtn) prevBtn.addEventListener("click", prevTestimonial);
    if (nextBtn) nextBtn.addEventListener("click", nextTestimonial);

    // Add dot click events
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        // Pause any currently playing video before changing slides
        pauseAllVideos();

        currentSlide = index;
        showSlide(currentSlide);
        resetAutoSlide();
      });
    });

    // Enhanced video event listeners
    videos.forEach((video) => {
      // Stop autoplay when video starts playing
      video.addEventListener("play", () => {
        console.log("Video started playing - stopping autoplay");
        isVideoPlaying = true;
        stopAutoSlide();
      });

      // Resume autoplay when video is paused
      video.addEventListener("pause", () => {
        console.log("Video paused - resuming autoplay");
        isVideoPlaying = false;
        if (isAutoPlaying) {
          startAutoSlide();
        }
      });

      // Resume autoplay when video ends
      video.addEventListener("ended", () => {
        console.log("Video ended - resuming autoplay");
        isVideoPlaying = false;
        if (isAutoPlaying) {
          startAutoSlide();
        }
      });

      // Stop autoplay when video is seeking
      video.addEventListener("seeking", () => {
        console.log("Video seeking - stopping autoplay");
        isVideoPlaying = true;
        stopAutoSlide();
      });

      // Stop autoplay when video is waiting/buffering
      video.addEventListener("waiting", () => {
        console.log("Video waiting - stopping autoplay");
        isVideoPlaying = true;
        stopAutoSlide();
      });
    });

    // Add event listeners for manual navigation to ensure proper autoplay state
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        // Pause any playing videos before navigation
        pauseAllVideos();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        // Pause any playing videos before navigation
        pauseAllVideos();
      });
    }

    // Add touch/swipe support
    let startX = 0;
    let endX = 0;

    const sliderWrapper = document.querySelector(
      ".testimonials-section .testimonials-slider-wrapper"
    );
    if (sliderWrapper) {
      sliderWrapper.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
      });

      sliderWrapper.addEventListener("touchend", (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
      });
    }

    function handleSwipe() {
      const swipeThreshold = 50;
      if (endX - startX > swipeThreshold) {
        // Pause any currently playing video before going to previous slide
        pauseAllVideos();
        prevTestimonial();
      } else if (startX - endX > swipeThreshold) {
        // Pause any currently playing video before going to next slide
        pauseAllVideos();
        nextTestimonial();
      }
    }

    // Add keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        // Pause any currently playing video before going to previous slide
        pauseAllVideos();
        prevTestimonial();
      } else if (e.key === "ArrowRight") {
        // Pause any currently playing video before going to next slide
        pauseAllVideos();
        nextTestimonial();
      }
    });

    // Clean up videos when page is unloaded
    window.addEventListener("beforeunload", () => {
      pauseAllVideos();
    });

    // Handle page visibility changes (user switches tabs, minimizes browser, etc.)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        // Page is hidden - pause videos and stop autoplay
        pauseAllVideos();
        stopAutoSlide();
      } else {
        // Page is visible again - resume autoplay if no video is playing
        if (!isVideoPlaying && isAutoPlaying) {
          startAutoSlide();
        }
      }
    });
  }

  // Update navigation buttons
  function updateNavButtons() {
    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
      prevBtn.style.opacity = currentSlide === 0 ? "0.5" : "1";
    }

    if (nextBtn) {
      nextBtn.disabled = currentSlide === testimonialSlides.length - 1;
      nextBtn.style.opacity =
        currentSlide === testimonialSlides.length - 1 ? "0.5" : "1";
    }
  }

  // Update dots
  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Next testimonial
  function nextTestimonial() {
    // Pause any playing videos before navigation
    pauseAllVideos();

    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showSlide(currentSlide);
    resetAutoSlide();
  }

  // Previous testimonial
  function prevTestimonial() {
    // Pause any playing videos before navigation
    pauseAllVideos();

    currentSlide =
      currentSlide === 0 ? testimonialSlides.length - 1 : currentSlide - 1;
    showSlide(currentSlide);
    resetAutoSlide();
  }

  // Start auto slide
  function startAutoSlide() {
    if (autoSlideInterval || isVideoPlaying) return;

    console.log("Starting autoplay");
    autoSlideInterval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    isAutoPlaying = true;
  }

  // Stop auto slide
  function stopAutoSlide() {
    if (autoSlideInterval) {
      console.log("Stopping autoplay");
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
    isAutoPlaying = false;
  }

  // Reset auto slide
  function resetAutoSlide() {
    stopAutoSlide();
    // Only restart if no video is currently playing
    if (!isVideoPlaying) {
      startAutoSlide();
    }
  }
});
