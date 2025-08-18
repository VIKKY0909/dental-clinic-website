// ==========================================
// TESTIMONIALS PAGE - FIXED AND WORKING VERSION
// =========================================
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
    // Get elements specifically from testimonials-section
    const testimonialSlides = document.querySelectorAll('.testimonials-section .testimonial-slide');
    const videos = document.querySelectorAll('.testimonials-section .testimonial-slide video');
    const prevBtn = document.querySelector(".testimonials-section .prev-btn");
    const nextBtn = document.querySelector(".testimonials-section .next-btn");
    const dots = document.querySelectorAll(".testimonials-section .dot");
    
    let currentSlide = 0;
    let autoSlideInterval;
    let isAutoPlaying = true;
    
    // Initialize slider
    if (testimonialSlides.length > 0) {
        initializeSlider();
        startAutoSlide();
    }
    
    // Setup slides
    function setupSlides() {
        testimonialSlides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
        });
    }
    
    // Show specific slide
    function showSlide(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
            slide.classList.toggle('active', i === index);
        });
        
        updateNavButtons();
        updateDots();
    }
    
    // Initialize slider
    function initializeSlider() {
        setupSlides();
        updateNavButtons();
        updateDots();
        
        // Add event listeners
        if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
        if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
        
        // Add dot click events
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
                resetAutoSlide();
            });
        });
        
        // Add video event listeners
        videos.forEach(video => {
            video.addEventListener('play', stopAutoSlide);
            video.addEventListener('pause', startAutoSlide);
            video.addEventListener('ended', startAutoSlide);
        });
        
        // Add touch/swipe support
        let startX = 0;
        let endX = 0;
        
        const sliderWrapper = document.querySelector('.testimonials-section .testimonials-slider-wrapper');
        if (sliderWrapper) {
            sliderWrapper.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            sliderWrapper.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
        }
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (endX - startX > swipeThreshold) {
                prevTestimonial();
            } else if (startX - endX > swipeThreshold) {
                nextTestimonial();
            }
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevTestimonial();
            } else if (e.key === 'ArrowRight') {
                nextTestimonial();
            }
        });
    }
    
    // Update navigation buttons
    function updateNavButtons() {
        if (prevBtn) {
            prevBtn.disabled = currentSlide === 0;
            prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
        }
        
        if (nextBtn) {
            nextBtn.disabled = currentSlide === testimonialSlides.length - 1;
            nextBtn.style.opacity = currentSlide === testimonialSlides.length - 1 ? '0.5' : '1';
        }
    }
    
    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next testimonial
    function nextTestimonial() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
        resetAutoSlide();
    }
    
    // Previous testimonial
    function prevTestimonial() {
        currentSlide = currentSlide === 0 ? testimonialSlides.length - 1 : currentSlide - 1;
        showSlide(currentSlide);
        resetAutoSlide();
    }
    
    // Start auto slide
    function startAutoSlide() {
        if (autoSlideInterval) return;
        
        autoSlideInterval = setInterval(() => {
            nextTestimonial();
        }, 5000);
        
        isAutoPlaying = true;
    }
    
    // Stop auto slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
        isAutoPlaying = false;
    }
    
    // Reset auto slide
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
});

// ==========================================
// YOUTUBE VIDEOS SECTION
// ==========================================

const testimonialVideos = {
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

  const pageVideos = testimonialVideos[page];
  if (!pageVideos) return;
  
  videoContainer.innerHTML = '';
  
  pageVideos.forEach(videoUrl => {
    const videoWrapper = document.createElement('div');
    videoWrapper.className = 'video-wrapper';
    
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.title = 'YouTube video player';
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    videoWrapper.appendChild(iframe);
    videoContainer.appendChild(videoWrapper);
  });
}

function changePage(page) {
  currentPage = page;
  displayVideos(currentPage);
  
  // Update active page indicator
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[onclick="changePage(${page})"]`).classList.add('active');
}

// Initialize first page
document.addEventListener('DOMContentLoaded', () => {
  displayVideos(currentPage);
});