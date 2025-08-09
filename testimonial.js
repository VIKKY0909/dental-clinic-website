// ==========================================
// NAVBAR FUNCTIONALITY
// ==========================================

function toggleNavbar() {
  const navbar = document.getElementById('nav-list');
  navbar.classList.toggle('active');
}

// ==========================================
// TESTIMONIALS SLIDER - FIXED AND WORKING VERSION
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content Loaded - Initializing testimonials slider");
    
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        // Get elements specifically from testimonials-section
        const testimonialSlides = document.querySelectorAll('.testimonials-section .testimonial-slide');
        const videos = document.querySelectorAll('.testimonials-section .testimonial-slide video');
        const prevBtn = document.querySelector(".testimonials-section .prev-btn");
        const nextBtn = document.querySelector(".testimonials-section .next-btn");
        const dots = document.querySelectorAll(".testimonials-section .dot");
    
    // Debug: Log what elements we found
    console.log("Testimonial slides found:", testimonialSlides.length);
    console.log("Videos found:", videos.length);
    console.log("Previous button:", prevBtn);
    console.log("Next button:", nextBtn);
    console.log("Dots found:", dots.length);
    
    // State variables (matching index.html approach)
    let counter = 0;
    let totalSlides = testimonialSlides.length;
    let autoSlideInterval;
    let isVideoPlaying = false; // Track if any video is playing
    
    // Check if elements exist with detailed logging
    if (!testimonialSlides.length) {
        console.error("No testimonial slides found! Looking for: .testimonials-section .testimonial-slide");
        return;
    }
    
    if (!prevBtn) {
        console.error("Previous button not found! Looking for: .testimonials-section .prev-btn");
        return;
    }
    
    if (!nextBtn) {
        console.error("Next button not found! Looking for: .testimonials-section .next-btn");
        return;
    }
    
    if (!dots.length) {
        console.error("No dots found! Looking for: .testimonials-section .dot");
  return;
}

    console.log("✅ All testimonials elements found successfully!");
    console.log("✅ Slides:", testimonialSlides.length);
    console.log("✅ Prev button:", prevBtn);
    console.log("✅ Next button:", nextBtn);
    console.log("✅ Dots:", dots.length);
    
    console.log(`Testimonials slider initialized with ${totalSlides} slides`);
    
    // Initialize slides with proper classes and positioning
    function setupSlides() {
        testimonialSlides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === 0) {
                slide.classList.add('active');
            }
        });
        console.log(`${testimonialSlides.length} slides set up with proper classes`);
    }

    // Show specific slide function using class-based approach
    function showSlide(index) {
        if (!isVideoPlaying) {
            console.log(`Showing slide ${index + 1}/${totalSlides}`);
            testimonialSlides.forEach((slide, slideIndex) => {
                slide.classList.remove('active');
                if (slideIndex === index) {
                    slide.classList.add('active');
                    console.log(`Slide ${slideIndex} now active`);
                }
            });
        } else {
            console.log("Video is playing - slide change blocked");
        }
    }

    // Initialize slider
function initializeSlider() {
        console.log(`Initializing ${testimonialSlides.length} slides`);
        counter = 0;
        setupSlides();
        showSlide(counter);
        updateDots();
        updateNavButtons();
        console.log("Testimonials slider initialized with counter=0");
    }
    
    // Update navigation buttons (infinite loop - always enabled)
    function updateNavButtons() {
        if (prevBtn && nextBtn) {
            // In infinite loop mode, buttons are always enabled
            prevBtn.style.opacity = "1";
            nextBtn.style.opacity = "1";
            
            prevBtn.style.pointerEvents = "auto";
            nextBtn.style.pointerEvents = "auto";
            
            console.log(`Navigation buttons updated - Counter: ${counter}/${totalSlides - 1} (infinite loop)`);
        }
    }
    
    // Update dots indicator
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === counter) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        console.log(`Dots updated - Active dot: ${counter + 1}`);
    }
    
    // Function to go to the next slide with infinite loop
    const nextTestimonial = () => {
        if (!isVideoPlaying) { // Prevent slide change if a video is playing
            counter = (counter + 1) % totalSlides; // This creates infinite loop
            showSlide(counter);
            updateDots();
            updateNavButtons();
            console.log(`🎯 Next slide: ${counter + 1}/${totalSlides} (INFINITE AUTOPLAY)`);
        } else {
            console.log("Video is playing - next slide blocked");
        }
    };

    // Function to go to the previous slide with infinite loop
    const prevTestimonial = () => {
        if (!isVideoPlaying) { // Prevent slide change if a video is playing
            counter = (counter - 1 + totalSlides) % totalSlides; // This creates infinite loop
            showSlide(counter);
            updateDots();
            updateNavButtons();
            resetAutoSlide();
            console.log(`Previous slide: ${counter + 1}/${totalSlides} (infinite loop enabled)`);
        } else {
            console.log("Video is playing - previous slide blocked");
        }
    };
    
    // Event listeners with autoplay restart
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("🔄 Previous button clicked - restarting autoplay");
            prevTestimonial();
            // Restart autoplay after user interaction
            setTimeout(() => {
                startAutoSlide();
            }, 100);
        });
        console.log("✅ Previous button event listener attached");
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("🔄 Next button clicked - restarting autoplay");
            nextTestimonial();
            // Restart autoplay after user interaction
            setTimeout(() => {
                startAutoSlide();
            }, 100);
        });
        console.log("✅ Next button event listener attached");
    }
    
    // Dots event listeners with autoplay restart
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isVideoPlaying) {
                console.log(`🔄 Dot ${index + 1} clicked - restarting autoplay`);
                counter = index;
                showSlide(counter);
                updateDots();
                updateNavButtons();
                // Restart autoplay after dot click
                setTimeout(() => {
                    startAutoSlide();
                }, 100);
            }
        });
    });
    
    // Function to start automatic sliding with enhanced infinite loop
    function startAutoSlide() {
        clearInterval(autoSlideInterval); // Clear any existing interval first
        if (!isVideoPlaying) {
            autoSlideInterval = setInterval(() => {
                console.log("🔄 Auto-slide tick - infinite loop");
                nextTestimonial();
            }, 4000); // Change every 4 seconds for better readability
            console.log("✅ Auto-slide started (4 second intervals) - INFINITE LOOP ENABLED");
        } else {
            console.log("❌ Auto-slide blocked - video is playing");
        }
    }

    // Function to stop automatic sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
        console.log("Auto-slide stopped");
    }

    // Function to reset auto-slide when user interacts
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // Detect when user hovers over slides (pause auto-slide) - with guaranteed restart
    testimonialSlides.forEach(element => {
        element.addEventListener('mouseenter', () => {
            console.log("Mouse entered slide - pausing autoplay");
            stopAutoSlide();
        });
        element.addEventListener('mouseleave', () => {
            console.log("Mouse left slide - restarting autoplay");
            setTimeout(() => {
                startAutoSlide();
            }, 100);
        });
    });

    // Handle video interactions (matching index.html approach)
    videos.forEach(video => {
        video.addEventListener('play', () => {
            isVideoPlaying = true; // Mark video as playing
            stopAutoSlide(); // Stop auto-slide
            console.log('Video started playing - auto-slide paused');
        });

        video.addEventListener('pause', () => {
            isVideoPlaying = false; // Mark video as not playing
            startAutoSlide(); // Resume auto-slide
            console.log('Video paused - auto-slide resumed');
        });

        video.addEventListener('ended', () => {
            isVideoPlaying = false; // Mark video as not playing
            startAutoSlide(); // Resume auto-slide
            console.log('Video ended - auto-slide resumed');
        });
    });

    // Handle window resize to recalculate slider positions
    window.addEventListener('resize', () => {
        initializeSlider();
        showSlide(counter);
    });

    // Add touch/swipe support for mobile (simplified from index.html approach)
    let startX = 0;
    let endX = 0;
    let isDragging = false;

    testimonialSlides.forEach(slide => {
        // Touch events
        slide.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
        });

        slide.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        slide.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            endX = e.changedTouches[0].clientX;
            
            const diff = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
    if (diff > 0) {
      // Swipe left - next slide
                    nextTestimonial();
    } else {
      // Swipe right - previous slide
                    prevTestimonial();
                }
            }
            
            isDragging = false;
            startAutoSlide();
        });
    });
    
    // Keyboard navigation (simplified)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            console.log("Left arrow key pressed");
            prevTestimonial();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            console.log("Right arrow key pressed");
            nextTestimonial();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            // Spacebar to play/pause video in current slide
            e.preventDefault();
            const currentSlide = testimonialSlides[counter];
            const currentVideo = currentSlide.querySelector('video');
            if (currentVideo) {
                if (currentVideo.paused) {
                    currentVideo.play();
                    console.log("Spacebar pressed - video playing");
                } else {
                    currentVideo.pause();
                    console.log("Spacebar pressed - video paused");
                }
            }
        }
    });
    
        // Initialize everything
initializeSlider();

        // Start auto-slide immediately with infinite loop
        console.log("🚀 Starting autoplay infinite loop...");
        startAutoSlide();
        
        // Ensure autoplay continues even after user interactions
        setTimeout(() => {
            if (!isVideoPlaying) {
                startAutoSlide(); // Double-check autoplay is running
                console.log("🚀 Auto-slide infinite loop confirmed active");
            }
        }, 1000);
        
        // Global autoplay guardian - ensures slider never stops (every 10 seconds)
        setInterval(() => {
            if (!isVideoPlaying && !autoSlideInterval) {
                console.log("🛡️ Autoplay guardian activated - restarting infinite loop");
                startAutoSlide();
            }
        }, 10000);
        
    }, 500); // Wait 500ms for DOM to be fully ready
});

// ==========================================
// YOUTUBE VIDEOS SECTION
// ==========================================

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
  4:[
      "https://www.youtube.com/embed/qfas8PVlHwg?si=u4YRM7MK1siBOy4v",
      "https://www.youtube.com/embed/e_D9Yt-wgBg?si=GcmqG3zyJxMzoxBG",
      "https://www.youtube.com/embed/zzsfKHtuDMA?si=NXk5wDDqtjEGTDDS",
      "https://www.youtube.com/embed/CqmLk6O7USU?si=NsP54lsMWavIk1vz",
      "https://www.youtube.com/embed/CtRsrWkUzhY?si=4-jF--RRk1qtvykF",
      "https://www.youtube.com/embed/KPkm1Ff-i-Q?si=E-6wPvxC6UVLmu38",
      "https://www.youtube.com/embed/v0C6dA5i4fA?si=sVjRvyFPKwOgqEiI",
      "https://www.youtube.com/embed/Q_JHwvE5hf8?si=ufhRnrxeMqTZ8Ngr"
  ],
  5:[
      "https://www.youtube.com/embed/ILbWMHf6VtM?si=Q8e4juG6a_1bc7oG",
      "https://www.youtube.com/embed/T-nDtCfHAkg?si=ZsY0U3owyBq2IY2m",
      "https://www.youtube.com/embed/ZXgSX1qfgT8?si=qyAk0T3o058JvMZc",
      "https://www.youtube.com/embed/qSU24ifhr20?si=TAZMH-K0wFmqXdrx",
      "https://www.youtube.com/embed/KuMlVuE0W7w?si=Y5-rDZu-7poww7nz",
      "https://www.youtube.com/embed/Dk7We24GC0s?si=HVgKUYV9CV_VxMNc",
      "https://www.youtube.com/embed/YPvI7_Bx-Nc?si=smNHZbSFmqmh8HlG",
      "https://www.youtube.com/embed/CjB-Ixr5uKg?si=MvCRZgPM-zz9wpvT"
  ],
  6:[
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
let currentPage = 1;

function displayVideos(page) {
  const videoContainer = document.getElementById('videoContainer');
  if (!videoContainer) return;

  const pageVideos = videos[page];
  if (!pageVideos) return;
  
  videoContainer.innerHTML = '';
  
  pageVideos.forEach(videoUrl => {
      const iframe = document.createElement('iframe');
      iframe.src = videoUrl;
    iframe.width = "560";
    iframe.height = "315";
    iframe.title = "YouTube video player";
    iframe.frameBorder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      
    videoContainer.appendChild(iframe);
  });
}

function changePage(page) {
  currentPage = page;
  displayVideos(page);
  
  // Update pagination buttons
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach((button, index) => {
    button.classList.toggle('active', index + 1 === page);
  });
}

// Initialize with first page
document.addEventListener('DOMContentLoaded', () => {
  displayVideos(1);
});