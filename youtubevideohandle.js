// ===========================================================
// YOUTUBE VIDEO HANDLING FOR TESTIMONIALS SLIDER
// ===========================================================

class YouTubeVideoManager {
    constructor() {
        this.iframes = document.querySelectorAll('.testimonial iframe');
        this.init();
    }

    init() {
        if (this.iframes.length === 0) return;
        
        // Set up each iframe with a unique ID for easier control
        this.iframes.forEach((iframe, index) => {
            if (!iframe.id) {
                iframe.id = `youtube-video-${index}`;
            }
        });

        console.log('✅ YouTube Video Manager initialized with', this.iframes.length, 'videos');
    }

    // Pause all YouTube videos
    pauseAllVideos() {
        this.iframes.forEach(iframe => {
            try {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch (e) {
                console.log("Could not pause YouTube video:", e);
            }
        });
    }

    // Play a specific video
    playVideo(videoId) {
        try {
            const iframe = document.getElementById(videoId);
            if (iframe) {
                iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
            }
        } catch (e) {
            console.log("Could not play YouTube video:", e);
        }
    }
}

// Initialize YouTube Video Manager
const youTubeManager = new YouTubeVideoManager();

// ===========================================================
// TESTIMONIALS SLIDER WITH YOUTUBE SUPPORT
// ===========================================================

class TestimonialsSlider {
    constructor() {
        this.slider = null;
        this.init();
    }

    init() {
        // Wait for Swiper to be available
        if (typeof Swiper === 'undefined') {
            setTimeout(() => this.init(), 100);
            return;
        }

        const sliderElement = document.querySelector('.testimonial-section .slider-container');
        if (!sliderElement) return;

        this.slider = new Swiper('.testimonial-section .slider-container', {
            loop: true,
            grabCursor: true,
            spaceBetween: 25,
            pagination: {
                el: '.testimonial-section .swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.testimonial-section .swiper-button-next',
                prevEl: '.testimonial-section .swiper-button-prev',
            },
            breakpoints: {
                400: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
            // Add event listeners for slide changes
            on: {
                init: () => {
                    console.log('✅ Testimonials slider initialized');
                },
                slideChange: () => {
                    // Pause all YouTube videos when slide changes
                    youTubeManager.pauseAllVideos();
                }
            }
        });

        // Add event listeners to navigation buttons
        const nextButton = document.querySelector('.testimonial-section .swiper-button-next');
        const prevButton = document.querySelector('.testimonial-section .swiper-button-prev');
        const pagination = document.querySelector('.testimonial-section .swiper-pagination');

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                youTubeManager.pauseAllVideos();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                youTubeManager.pauseAllVideos();
            });
        }

        if (pagination) {
            pagination.addEventListener('click', () => {
                // Use a small delay to ensure the click is processed by Swiper first
                setTimeout(() => {
                    youTubeManager.pauseAllVideos();
                }, 50);
            });
        }

        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                youTubeManager.pauseAllVideos();
                this.slider.slidePrev();
            } else if (e.key === 'ArrowRight') {
                youTubeManager.pauseAllVideos();
                this.slider.slideNext();
            }
        });
    }
}

// ===========================================================
// INITIALIZATION
// ===========================================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the testimonials slider with YouTube support
    new TestimonialsSlider();
    
    console.log('✅ YouTube video paging functionality initialized');
});

// Enhanced YouTube API handling
function initYouTubeAPI() {
    // This function adds a global function that YouTube API can call when ready
    window.onYouTubeIframeAPIReady = function() {
        console.log('✅ YouTube API is ready');
    };
    
    // Load YouTube IFrame API if not already loaded
    if (!document.getElementById('youtube-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}

// Initialize YouTube API
initYouTubeAPI();