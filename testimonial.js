// ==========================================
// TESTIMONIALS SLIDER - FIXED AND WORKING VERSION
// ==========================================

// YouTube Videos Data
const videos = {
  1: [
    "https://www.youtube.com/embed/mlBxPicGME4?si=PhR5uzHdR8xjOWdx",
    "https://www.youtube.com/embed/py57CE8xJ_g?si=aDxcWd899-DNqxWs",
    "https://www.youtube.com/embed/RJbQMsMXZrc?si=U0EwgQNs5Rbr7vRH",
    "https://www.youtube.com/embed/tN_V-4ZGrbI?si=vJMSl34-1PAMd2h9",
    "https://www.youtube.com/embed/BJ7OtCUs9sE?si=vwEwBoErw7yacQ5y",
    "https://www.youtube.com/embed/xny8znE-obw?si=EMVbWjd6rv0Rp9Wb",
    "https://www.youtube.com/embed/Q2-V6n45AFQ?si=w-PNixXwAHyIsyvN",
    "https://www.youtube.com/embed/T2JCe0TJ6Jk?si=NtFqI5nqn6nI9bOL"
  ],
  2: [
    "https://www.youtube.com/embed/pLpbzwa43Rw?si=tqVZ1Gbd6GCOPbwM",
    "https://www.youtube.com/embed/fS7dMiuiz14?si=3uu6sMjcxoYyqb24",
    "https://www.youtube.com/embed/ZM9F-Ht9BBE?si=kRQ6voE_sX7RUMau",
    "https://www.youtube.com/embed/09PZqvQPtmA?si=J4iJYnQSXd4mqR6x",
    "https://www.youtube.com/embed/hRDJxvumW_U?si=69QOtzQUCtCJo6I9",
    "https://www.youtube.com/embed/HFnvh6Flqp4?si=gUr0MR3RZdW4SCrE",
    "https://www.youtube.com/embed/wnQtHpE5YiM?si=s1vX9CGB_W9iYF9C",
    "https://www.youtube.com/embed/fuEtiXH0L04?si=1Ex_BFIvTUqLIrd-"
  ],
  3: [
    "https://www.youtube.com/embed/zqg682P5wHQ?si=SFzMGwlJsFjXR3rm",
    "https://www.youtube.com/embed/1t0_cr1w8Uk?si=-eIa86-3t2qL5v_C",
    "https://www.youtube.com/embed/bpob8N1az6g?si=maF92RzQiKRCTvAw",
    "https://www.youtube.com/embed/pkPCTh9qUwI?si=V6nIDAXtKPoeoW8N",
    "https://www.youtube.com/embed/AczU5oEOT4Q?si=6Jz3Ajk8ftrw3ApA",
    "https://www.youtube.com/embed/QpkwLdfEtnU?si=ptHirgj8S5fquali",
    "https://www.youtube.com/embed/pv4TR4v0WKI?si=StCUfVbZxqrvGIYP",
    "https://www.youtube.com/embed/bvRIwi-IJcw?si=z4ggX5Gw9Wi_clnx"
  ],
  4: [
    "https://www.youtube.com/embed/qfas8PVlHwg?si=u4YRM7MK1siBOy4v",
    "https://www.youtube.com/embed/e_D9Yt-wgBg?si=GcmqG3zyJxMzoxBG",
    "https://www.youtube.com/embed/zzsfKHtuDMA?si=NXk5wDDqtjEGTDDS",
    "https://www.youtube.com/embed/CqmLk6O7USU?si=NsP54lsMWavIk1vz",
    "https://www.youtube.com/embed/CtRsrWkUzhY?si=4-jF--RRk1qtvykF",
    "https://www.youtube.com/embed/KPkm1Ff-i-Q?si=E-6wPvxC6UVLmu38",
    "https://www.youtube.com/embed/v0C6dA5i4fA?si=sVjRvyFPKwOgqEiI",
    "https://www.youtube.com/embed/Q_JHwvE5hf8?si=ufhRnrxeMqTZ8Ngr"
  ],
  5: [
    "https://www.youtube.com/embed/ILbWMHf6VtM?si=Q8e4juG6a_1bc7oG",
    "https://www.youtube.com/embed/T-nDtCfHAkg?si=ZsY0U3owyBq2IY2m",
    "https://www.youtube.com/embed/ZXgSX1qfgT8?si=qyAk0T3o058JvMZc",
    "https://www.youtube.com/embed/qSU24ifhr20?si=TAZMH-K0wFmqXdrx",
    "https://www.youtube.com/embed/KuMlVuE0W7w?si=Y5-rDZu-7poww7nz",
    "https://www.youtube.com/embed/Dk7We24GC0s?si=HVgKUYV9CV_VxMNc",
    "https://www.youtube.com/embed/YPvI7_Bx-Nc?si=smNHZbSFmqmh8HlG",
    "https://www.youtube.com/embed/CjB-Ixr5uKg?si=MvCRZgPM-zz9wpvT"
  ],
  6: [
    "https://www.youtube.com/embed/WrjS4o9sZno?si=9EMl-gm-fwVD_7jn",
    "https://www.youtube.com/embed/M-C5jTx9QPw?si=xTR9k5dXCwY0l0d9",
    "https://www.youtube.com/embed/9yTNG6OpD6A?si=Z_IuPhPgulB7KNYZ",
    "https://www.youtube.com/embed/ownG_-qIKDQ?si=o_fVP6OyQ76yYl5k",
    "https://www.youtube.com/embed/053QbiAiD4o?si=YRa8okcREP3iuDMH",
    "https://www.youtube.com/embed/aoX73ozQRqw?si=wOE9s0JKC4c4R52n",
    "https://www.youtube.com/embed/ujgAtcFOOzw?si=4zW97OPsGpaXWSh-", 
    "https://www.youtube.com/embed/1nt_wAOkzu4?si=QDVvQv7-P-AWfiA9"
  ]
};

// YouTube Videos Pagination Variables
let currentVideoPage = 1;
const videosPerPage = 8;

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

  // ==========================================
  // YOUTUBE VIDEOS FUNCTIONALITY
  // ==========================================
  
  // Initialize YouTube videos
  initializeYouTubeVideos();
  
  // Add keyboard navigation for YouTube videos
  document.addEventListener('keydown', (e) => {
    // Only handle if we're not in an input field
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key === 'ArrowLeft' && e.ctrlKey) {
      // Ctrl + Left Arrow: Previous video page
      e.preventDefault();
      if (currentVideoPage > 1) {
        changePage(currentVideoPage - 1);
      }
    } else if (e.key === 'ArrowRight' && e.ctrlKey) {
      // Ctrl + Right Arrow: Next video page
      e.preventDefault();
      if (currentVideoPage < 6) {
        changePage(currentVideoPage + 1);
      }
    }
  });
});

// YouTube Videos Functions
function initializeYouTubeVideos() {
  // Load first page of videos
  loadVideoPage(1);
  
  // Add click event listeners to pagination buttons
  const paginationButtons = document.querySelectorAll('.pagination button');
  paginationButtons.forEach(button => {
    button.addEventListener('click', function() {
      const pageNumber = parseInt(this.textContent);
      changePage(pageNumber);
    });
  });
  
  // Add intersection observer for lazy loading optimization
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const iframe = entry.target.querySelector('iframe');
          if (iframe && !iframe.src) {
            iframe.src = iframe.dataset.src;
            iframe.removeAttribute('data-src');
          }
        }
      });
    }, { rootMargin: '50px' });
    
    // Observe video wrappers when they're added
    const observeVideos = () => {
      document.querySelectorAll('.video-wrapper').forEach(wrapper => {
        videoObserver.observe(wrapper);
      });
    };
    
    // Initial observation
    observeVideos();
    
    // Re-observe when new videos are loaded
    const originalLoadVideoPage = loadVideoPage;
    loadVideoPage = function(pageNumber) {
      originalLoadVideoPage(pageNumber);
      setTimeout(observeVideos, 100);
    };
  }
}

function loadVideoPage(pageNumber) {
  const videoContainer = document.getElementById('videoContainer');
  if (!videoContainer) return;
  
  // Clear existing videos
  videoContainer.innerHTML = '';
  
  // Get videos for current page
  const pageVideos = videos[pageNumber];
  if (!pageVideos) return;
  
  // Create video elements
  pageVideos.forEach((videoUrl, index) => {
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.title = `Patient Testimonial Video ${index + 1}`;
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.loading = 'lazy';
    
    // Add responsive wrapper
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';
    videoWrapper.appendChild(iframe);
    
    // Add loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'video-loading';
    loadingDiv.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Loading...';
    videoWrapper.appendChild(loadingDiv);
    
    // Remove loading state when video loads
    iframe.addEventListener('load', () => {
      loadingDiv.remove();
    });
    
    videoContainer.appendChild(videoWrapper);
  });
  
  // Update pagination buttons
  updatePaginationButtons(pageNumber);
  
  // Update current page
  currentVideoPage = pageNumber;
}

function changePage(pageNumber) {
  if (pageNumber < 1 || pageNumber > 6) {
    console.warn('Invalid page number:', pageNumber);
    return;
  }
  
  // Prevent multiple rapid clicks
  if (currentVideoPage === pageNumber) return;
  
  // Add loading effect
  const videoContainer = document.getElementById('videoContainer');
  if (videoContainer) {
    videoContainer.style.opacity = '0.5';
    videoContainer.style.transition = 'opacity 0.3s ease';
  }
  
  // Load new page after short delay for smooth transition
  setTimeout(() => {
    try {
      loadVideoPage(pageNumber);
      if (videoContainer) {
        videoContainer.style.opacity = '1';
      }
    } catch (error) {
      console.error('Error loading video page:', error);
      if (videoContainer) {
        videoContainer.style.opacity = '1';
        videoContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: #8B4513;">Error loading videos. Please try again.</div>';
      }
    }
  }, 150);
}

function updatePaginationButtons(activePage) {
  const paginationButtons = document.querySelectorAll('.pagination button');
  paginationButtons.forEach((button, index) => {
    const pageNumber = index + 1;
    if (pageNumber === activePage) {
      button.classList.add('active');
      button.style.backgroundColor = '#8B4513';
      button.style.color = 'white';
    } else {
      button.classList.remove('active');
      button.style.backgroundColor = '#007BFF';
      button.style.color = 'white';
    }
  });
}

// Make changePage function globally available
window.changePage = changePage;
