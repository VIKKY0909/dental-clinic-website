/* =====================================================================
   VIDEO TESTIMONIALS PAGE JAVASCRIPT
   ===================================================================== */

/* =====================================================================
   SECTION 1: SWIPER INITIALIZATION
   ===================================================================== */

   document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper for video testimonials
    const swiper = new Swiper('.video-testimonial-main-section-slider-container', {
        // Basic settings
                    loop: true,
                    autoplay: {
            delay: 5000,
                        disableOnInteraction: false,
                    },
                    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination dots
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                        dynamicBullets: true,
                    },
                    
        // Responsive breakpoints
                    breakpoints: {
                        320: {
                            slidesPerView: 1,
                spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        }
                    },
                    
        // Effects
        effect: 'slide',
        speed: 600,
        
        // Accessibility
        a11y: {
            prevSlideMessage: 'Previous video',
            nextSlideMessage: 'Next video',
        },
        
        // Keyboard control
        keyboard: {
            enabled: true,
        },
        
        // Mouse wheel control - DISABLED to allow page scrolling
        mousewheel: {
            enabled: false,
        },
        
        // Prevent interference with page scrolling
        allowTouchMove: true,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
        
        // Disable grab cursor to avoid confusion
        grabCursor: false
    });

    // Function to pause all videos
    function pauseAllVideos() {
        const videos = document.querySelectorAll('.video-testimonial-main-section-user-video');
        videos.forEach(video => {
            if (!video.paused) {
                video.pause();
                console.log('Video paused due to slide change');
            }
        });
    }

    // Function to reset all videos to beginning
    function resetAllVideos() {
        const videos = document.querySelectorAll('.video-testimonial-main-section-user-video');
        videos.forEach(video => {
            video.currentTime = 0;
            video.pause();
        });
    }

    // Pause autoplay when video is playing
    const videos = document.querySelectorAll('.video-testimonial-main-section-user-video');
    videos.forEach(video => {
        video.addEventListener('play', () => {
            swiper.autoplay.stop();
            console.log('Autoplay stopped - video playing');
        });
        
        video.addEventListener('pause', () => {
            swiper.autoplay.start();
            console.log('Autoplay started - video paused');
        });
        
        video.addEventListener('ended', () => {
            swiper.autoplay.start();
            console.log('Autoplay started - video ended');
        });
    });

    // Pause all videos when slide changes
    swiper.on('slideChange', function () {
        pauseAllVideos();
        console.log('Slide changed - all videos paused');
    });

    // Pause and reset all videos when slide change transition starts
    swiper.on('slideChangeTransitionStart', function () {
        pauseAllVideos();
        resetAllVideos();
        console.log('Slide transition started - all videos paused and reset');
    });

    // Pause all videos when using navigation buttons
    swiper.on('navigationNext', function () {
        pauseAllVideos();
        console.log('Next button clicked - all videos paused');
    });

    swiper.on('navigationPrev', function () {
        pauseAllVideos();
        console.log('Previous button clicked - all videos paused');
    });

    // Pause all videos when using pagination
    swiper.on('paginationClick', function () {
        pauseAllVideos();
        console.log('Pagination clicked - all videos paused');
    });

    // Pause all videos when touch/swipe starts
    swiper.on('touchStart', function () {
        pauseAllVideos();
        console.log('Touch started - all videos paused');
    });



    // Pause all videos when keyboard navigation is used
    swiper.on('keyPress', function () {
        pauseAllVideos();
        console.log('Keyboard navigation used - all videos paused');
    });

    // Global event listener for any slide container interactions
    const slideContainer = document.querySelector('.video-testimonial-main-section-slider-container');
    if (slideContainer) {
        slideContainer.addEventListener('click', function(e) {
            // If clicking on navigation buttons or pagination, pause videos
            if (e.target.closest('.swiper-button-next') || 
                e.target.closest('.swiper-button-prev') || 
                e.target.closest('.swiper-pagination-bullet')) {
                pauseAllVideos();
                console.log('Container interaction - all videos paused');
            }
        });
    }

    // Pause videos when page becomes hidden (tab switch, minimize, etc.)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            pauseAllVideos();
            console.log('Page hidden - all videos paused');
        }
    });
});

/* =====================================================================
   SECTION 2: YOUTUBE VIDEOS DATA & PAGINATION
   ===================================================================== */

// YouTube Videos Data (Replace with actual video IDs and information)
const youtubeVideos = [
    // Page 1 (Videos 1-6)
    
        { "id": "mlBxPicGME4?si=PhR5uzHdR8xjOWdx" },
        { "id": "py57CE8xJ_g?si=aDxcWd899-DNqxWs" },
        { "id": "RJbQMsMXZrc?si=U0EwgQNs5Rbr7vRH" },
        { "id": "tN_V-4ZGrbI?si=vJMSl34-1PAMd2h9" },
        { "id": "BJ7OtCUs9sE?si=vwEwBoErw7yacQ5y" },
        { "id": "xny8znE-obw?si=EMVbWjd6rv0Rp9Wb" },
        { "id": "Q2-V6n45AFQ?si=w-PNixXwAHyIsyvN" },
        { "id": "T2JCe0TJ6Jk?si=NtFqI5nqn6nI9bOL" },
        { "id": "pLpbzwa43Rw?si=tqVZ1Gbd6GCOPbwM" },
        { "id": "fS7dMiuiz14?si=3uu6sMjcxoYyqb24" },
        { "id": "ZM9F-Ht9BBE?si=kRQ6voE_sX7RUMau" },
        { "id": "09PZqvQPtmA?si=J4iJYnQSXd4mqR6x" },
        { "id": "hRDJxvumW_U?si=69QOtzQUCtCJo6I9" },
        { "id": "HFnvh6Flqp4?si=gUr0MR3RZdW4SCrE" },
        { "id": "wnQtHpE5YiM?si=s1vX9CGB_W9iYF9C" },
        { "id": "fuEtiXH0L04?si=1Ex_BFIvTUqLIrd-" },
        { "id": "zqg682P5wHQ?si=SFzMGwlJsFjXR3rm" },
        { "id": "1t0_cr1w8Uk?si=-eIa86-3t2qL5v_C" },
        { "id": "bpob8N1az6g?si=maF92RzQiKRCTvAw" },
        { "id": "pkPCTh9qUwI?si=V6nIDAXtKPoeoW8N" },
        { "id": "AczU5oEOT4Q?si=6Jz3Ajk8ftrw3ApA" },
        { "id": "QpkwLdfEtnU?si=ptHirgj8S5fquali" },
        { "id": "pv4TR4v0WKI?si=StCUfVbZxqrvGIYP" },
        { "id": "bvRIwi-IJcw?si=z4ggX5Gw9Wi_clnx" },
        { "id": "qfas8PVlHwg?si=u4YRM7MK1siBOy4v" },
        { "id": "e_D9Yt-wgBg?si=GcmqG3zyJxMzoxBG" },
        { "id": "zzsfKHtuDMA?si=NXk5wDDqtjEGTDDS" },
        { "id": "CqmLk6O7USU?si=NsP54lsMWavIk1vz" },
        { "id": "CtRsrWkUzhY?si=4-jF--RRk1qtvykF" },
        { "id": "KPkm1Ff-i-Q?si=E-6wPvxC6UVLmu38" },
        { "id": "v0C6dA5i4fA?si=sVjRvyFPKwOgqEiI" },
        { "id": "Q_JHwvE5hf8?si=ufhRnrxeMqTZ8Ngr" },
        { "id": "ILbWMHf6VtM?si=Q8e4juG6a_1bc7oG" },
        { "id": "T-nDtCfHAkg?si=ZsY0U3owyBq2IY2m" },
        { "id": "ZXgSX1qfgT8?si=qyAk0T3o058JvMZc" },
        { "id": "qSU24ifhr20?si=TAZMH-K0wFmqXdrx" },
        { "id": "KuMlVuE0W7w?si=Y5-rDZu-7poww7nz" },
        { "id": "Dk7We24GC0s?si=HVgKUYV9CV_VxMNc" },
        { "id": "YPvI7_Bx-Nc?si=smNHZbSFmqmh8HlG" },
        { "id": "CjB-Ixr5uKg?si=MvCRZgPM-zz9wpvT" },
        { "id": "WrjS4o9sZno?si=9EMl-gm-fwVD_7jn" },
        { "id": "M-C5jTx9QPw?si=xTR9k5dXCwY0l0d9" },
        { "id": "9yTNG6OpD6A?si=Z_IuPhPgulB7KNYZ" },
        { "id": "ownG_-qIKDQ?si=o_fVP6OyQ76yYl5k" },
        { "id": "053QbiAiD4o?si=YRa8okcREP3iuDMH" },
        { "id": "aoX73ozQRqw?si=wOE9s0JKC4c4R52n" },
        { "id": "ujgAtcFOOzw?si=4zW97OPsGpaXWSh-" },
        { "id": "1nt_wAOkzu4?si=QDVvQv7-P-AWfiA9" }
    
    
];

// Pagination variables
let currentPage = 1;
const videosPerPage = 8;
const totalPages = Math.ceil(youtubeVideos.length / videosPerPage);

/* =====================================================================
   SECTION 3: VIDEO RENDERING FUNCTIONS
   ===================================================================== */

// Function to create video HTML
function createVideoHTML(video) {
    return `
        <div class="video-item" data-video-id="${video.id}">
            <iframe 
                src="https://www.youtube.com/embed/${video.id}" 
                title="${video.title}"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                loading="lazy">
            </iframe>
           
        </div>
    `;
}

// Function to render videos for current page
function renderVideos(page) {
    const startIndex = (page - 1) * videosPerPage;
    const endIndex = startIndex + videosPerPage;
    const videosToShow = youtubeVideos.slice(startIndex, endIndex);
    
    const videoContainer = document.getElementById('videoContainer');
    
    // Show loading state
    videoContainer.innerHTML = '<div class="video-loading">Loading videos...</div>';
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        if (videosToShow.length === 0) {
            videoContainer.innerHTML = '<div class="video-loading">No videos available</div>';
            return;
        }
        
        videoContainer.innerHTML = videosToShow.map(video => createVideoHTML(video)).join('');
        
        // Add fade-in animation to video items
        const videoItems = document.querySelectorAll('.video-item');
        videoItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
    }, 300);
}

// Function to update pagination buttons
function updatePagination(activePage) {
    const buttons = document.querySelectorAll('.pagination button');
    
    buttons.forEach((button, index) => {
        const pageNumber = index + 1;
        button.classList.toggle('active', pageNumber === activePage);
        
        // Update button text to show current state
        if (pageNumber === activePage) {
            button.setAttribute('aria-current', 'page');
        } else {
            button.removeAttribute('aria-current');
        }
    });
}

/* =====================================================================
   SECTION 4: PAGE NAVIGATION FUNCTION
   ===================================================================== */

// Function to change page
function changePage(page) {
    if (page < 1 || page > totalPages) {
        console.warn(`Invalid page number: ${page}. Must be between 1 and ${totalPages}`);
        return;
    }
    
    if (page === currentPage) {
        return; // No change needed
    }
    
    currentPage = page;
    
    // Scroll to videos section smoothly
    const videoSection = document.querySelector('.you-tube-videos-main-section');
    if (videoSection) {
        videoSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }
    
    // Update pagination and render new videos
    updatePagination(currentPage);
    renderVideos(currentPage);
    
    // Update URL hash for better navigation
    window.history.replaceState(null, null, `#page-${currentPage}`);
}

/* =====================================================================
   SECTION 5: UTILITY FUNCTIONS
   ===================================================================== */

// Function to handle video errors
function handleVideoError(videoElement) {
    console.error('Video failed to load:', videoElement.src);
    const container = videoElement.closest('.video-item');
    if (container) {
        container.innerHTML = `
            <div class="video-error">
                <i class="fa-solid fa-exclamation-triangle"></i>
                <p>Video temporarily unavailable</p>
            </div>
        `;
    }
}

// Function to lazy load videos when they come into view
function setupLazyLoading() {
    const videoItems = document.querySelectorAll('.video-item');
    
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target.querySelector('iframe');
                    if (iframe && !iframe.src) {
                        const videoId = entry.target.getAttribute('data-video-id');
                        iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
                    }
                    videoObserver.unobserve(entry.target);
                }
            });
        });
        
        videoItems.forEach(item => {
            videoObserver.observe(item);
        });
    }
}

/* =====================================================================
   SECTION 6: INITIALIZATION AND EVENT LISTENERS
   ===================================================================== */

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a page hash in URL
    const hash = window.location.hash;
    if (hash.startsWith('#page-')) {
        const pageNumber = parseInt(hash.replace('#page-', ''));
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            currentPage = pageNumber;
        }
    }
    
    // Initial render
    updatePagination(currentPage);
    renderVideos(currentPage);
    
    // Add keyboard navigation for pagination
    document.addEventListener('keydown', function(e) {
        if (e.target.closest('.pagination')) {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    if (currentPage > 1) {
                        changePage(currentPage - 1);
                    }
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    if (currentPage < totalPages) {
                        changePage(currentPage + 1);
                    }
                    break;
            }
        }
    });
    
    // Add click event listeners to pagination buttons
    const paginationButtons = document.querySelectorAll('.pagination button');
    paginationButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            changePage(index + 1);
        });
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const hash = window.location.hash;
    if (hash.startsWith('#page-')) {
        const pageNumber = parseInt(hash.replace('#page-', ''));
        if (pageNumber >= 1 && pageNumber <= totalPages && pageNumber !== currentPage) {
            currentPage = pageNumber;
            updatePagination(currentPage);
            renderVideos(currentPage);
        }
    }
});

/* =====================================================================
   SECTION 7: PERFORMANCE OPTIMIZATION
   ===================================================================== */

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* =====================================================================
   SECTION 8: ACCESSIBILITY ENHANCEMENTS
   ===================================================================== */

// Add ARIA labels and improve accessibility
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels to pagination
    const paginationContainer = document.querySelector('.pagination');
    if (paginationContainer) {
        paginationContainer.setAttribute('role', 'navigation');
        paginationContainer.setAttribute('aria-label', 'Video pages navigation');
    }
    
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#videoContainer';
    skipLink.textContent = 'Skip to video content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        z-index: 999;
        padding: 8px 16px;
        background: #d4a373;
        color: white;
        text-decoration: none;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.left = '10px';
        this.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.left = '-9999px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

/* =====================================================================
   SECTION 9: ERROR HANDLING AND FALLBACKS
   ===================================================================== */

// Global error handler for JavaScript errors
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ff6b6b;
        color: white;
        padding: 12px 16px;
        border-radius: 4px;
        z-index: 1000;
        font-size: 14px;
    `;
    errorDiv.textContent = 'Something went wrong. Please refresh the page.';
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
});

// Network connectivity check
window.addEventListener('online', function() {
    console.log('Connection restored');
    // Re-render current page if needed
    if (document.querySelectorAll('.video-item').length === 0) {
        renderVideos(currentPage);
    }
});

window.addEventListener('offline', function() {
    console.log('Connection lost');
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        videoContainer.innerHTML = `
            <div class="video-loading">
                <i class="fa-solid fa-wifi-slash"></i>
                <p>No internet connection. Please check your connection and try again.</p>
            </div>
        `;
    }
});

/* =====================================================================
   SECTION 10: ANALYTICS AND TRACKING (Optional)
   ===================================================================== */

// Track video interactions for analytics
function trackVideoInteraction(action, videoId, page) {
    // This is where you would send data to your analytics service
    console.log(`Video ${action}:`, {
        videoId: videoId,
        page: page,
        timestamp: new Date().toISOString()
    });
    
    // Example: Google Analytics 4 event
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: 'Video',
            event_label: videoId,
            custom_parameter_page: page
        });
    }
}

// Track page changes
function trackPageChange(page) {
    trackVideoInteraction('page_view', null, page);
}