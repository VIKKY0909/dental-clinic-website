// ===========================================================
// NAVIGATION FUNCTIONALITY
// ===========================================================

// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM Loaded, Script Running!");
  
    // --- Mobile Navigation Toggle ---
    const menuIcon = document.getElementById("menu-icon");
    const navList = document.querySelector(".nav-list");
    const icon = menuIcon ? menuIcon.querySelector("i") : null;
  
    if (menuIcon && navList && icon) {
        menuIcon.addEventListener("click", function (e) {
            console.log("🍔 Menu icon clicked!");
            navList.classList.toggle("active");
  
            // Toggle icon between bars (☰) and cross (✖)
            if (navList.classList.contains("active")) {
                icon.classList.replace("fa-bars", "fa-times");
                console.log("📱 Mobile menu opened");
            } else {
                icon.classList.replace("fa-times", "fa-bars");
                console.log("📱 Mobile menu closed");
            }
            e.stopPropagation();
        });
  
        // Close menu when clicking outside
        document.addEventListener("click", function (e) {
            if (navList.classList.contains("active") && 
                !navList.contains(e.target) && 
                e.target !== menuIcon && 
                !menuIcon.contains(e.target)) {
                navList.classList.remove("active");
                icon.classList.replace("fa-times", "fa-bars");
                console.log("📱 Mobile menu closed (outside click)");
            }
        });
    } else {
        console.warn("❌ Mobile navigation elements not found!");
    }
  
    // --- Active Link Highlighting ---
    let currentPage = window.location.pathname.split("/").pop().toLowerCase();
    console.log("📄 Current Page:", currentPage || "index.html");
  
    let navLinks = document.querySelectorAll(".nav-list a");
    console.log("🔗 Found", navLinks.length, "nav links.");
  
    if (navLinks.length === 0) {
        console.warn("❌ No navigation links found! Check your .nav-list selector.");
    }
  
    navLinks.forEach(link => {
        let linkPage = link.getAttribute("href").toLowerCase();
        console.log("🔍 Checking link:", linkPage);
  
        if (currentPage === linkPage || (currentPage === "" && linkPage === "index.html")) {
            console.log("✅ Match found:", linkPage); 
            link.classList.add("active");
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove("active");
            link.removeAttribute('aria-current');
        }
    });
  
    // --- Close mobile menu after navigation ---
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth <= 854 && navList && navList.classList.contains("active")) {
                // Don't close immediately for dropdown links to allow dropdown to work
                if (!link.closest('.dropdown')) {
                    navList.classList.remove("active");
                    if (icon) {
                        icon.classList.replace("fa-times", "fa-bars");
                    }
                    console.log("📱 Mobile menu closed (navigation)");
                }
            }
        });
    });
  
    // --- Dropdown support for tap/click (mobile/tablet) ---
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = dropdown ? dropdown.querySelector(".dropdown-menu") : null;
    const dropdownLink = dropdown ? dropdown.querySelector("a") : null;
  
    if (dropdown && dropdownLink && dropdownMenu) {
        // Add ARIA attributes
        dropdownLink.setAttribute('aria-haspopup', 'true');
        dropdownLink.setAttribute('aria-expanded', 'false');
        dropdownMenu.setAttribute('role', 'menu');
        dropdownMenu.setAttribute('aria-label', 'Treatments submenu');
  
        // Only enable on mobile/tablet
        function isMobile() { return window.innerWidth <= 854; }
        let dropdownOpen = false;
  
        function closeDropdown() {
            dropdownMenu.style.display = '';
            dropdownLink.setAttribute('aria-expanded', 'false');
            dropdownOpen = false;
        }
        
        function openDropdown() {
            dropdownMenu.style.display = 'block';
            dropdownLink.setAttribute('aria-expanded', 'true');
            dropdownOpen = true;
        }
  
        dropdownLink.addEventListener('click', function (e) {
            if (isMobile()) {
                e.preventDefault();
                e.stopPropagation(); // Prevent event from bubbling up
                if (dropdownOpen) {
                    closeDropdown();
                } else {
                    openDropdown();
                }
            }
        });
  
        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (isMobile() && dropdownOpen && !dropdown.contains(e.target)) {
                closeDropdown();
            }
        });
  
        // Prevent clicks inside dropdown from closing mobile menu
        dropdownMenu.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent event from bubbling up to document
            
            // If a dropdown menu item is clicked, close the mobile menu after a short delay
            if (e.target.tagName === 'A' && e.target.closest('.dropdown-menu')) {
                setTimeout(() => {
                    if (navList && navList.classList.contains("active")) {
                        navList.classList.remove("active");
                        if (icon) {
                            icon.classList.replace("fa-times", "fa-bars");
                        }
                        closeDropdown();
                        console.log("📱 Mobile menu closed (dropdown item clicked)");
                    }
                }, 100);
            }
        });
        // On resize, reset dropdown state
        window.addEventListener('resize', function () {
            if (!isMobile()) {
                closeDropdown();
            }
        });
    }
  
    // Initialize Before/After slideshow
    initializeBeforeAfterSlideshow();
  });
  
  // ===========================================================
  // HOME PAGE BACKGROUND SLIDESHOW
  // ===========================================================
  
  let indexCurrentSlide = 0; // Keep track of the current slide
  const indexSlides = document.querySelectorAll('.index-slide'); // Get all slides
  
  function indexShowSlide(index) {
    // Hide all slides
    indexSlides.forEach((slide) => {
        slide.classList.remove('active');
    });
  
    // Show the current slide
    if (indexSlides[index]) {
        indexSlides[index].classList.add('active');
    }
  }
  
  // Automatic slideshow
  function indexStartSlideshow() {
    if (indexSlides.length > 0) {
        setInterval(() => {
            indexCurrentSlide = (indexCurrentSlide + 1) % indexSlides.length; // Loop back to the first slide
            indexShowSlide(indexCurrentSlide);
        }, 6000); // 6-second interval
    }
  }
  
  // Initialize the slideshow
  if (indexSlides.length > 0) {
    indexShowSlide(indexCurrentSlide); // Show the first slide initially
    indexStartSlideshow();
  }
  
  // ===========================================================
  // PHONE CALL FUNCTIONALITY
  // ===========================================================
  
  function makeCall(){
    window.location.href = "tel:+919372816443";
  }
  
  // ===========================================================
  // CELEBRITIES TESTIMONIALS SLIDER
  // ===========================================================
  
  // Only initialize if we're not on the testimonials page and if elements exist
  const isTestimonialsPage = window.location.pathname.includes('Testimonials.html');
  if (!isTestimonialsPage) {
    const celebSlides = document.querySelectorAll('.celeb-img-vid-container');
    const videos = document.querySelectorAll('video'); // Select all video elements
    let counter = 0;
    const totalSlides = celebSlides.length;
    let autoSlideInterval;
    let isVideoPlaying = false; // Track if any video is playing
    
    if (celebSlides.length > 0) {
    // Position slides initially
    celebSlides.forEach((celebSlide, index) => {
        celebSlide.style.left = `${index * 100}%`;
        celebSlide.style.transition = 'transform 0.5s ease-in-out';
        celebSlide.style.width = '100%';
        celebSlide.style.height = '100%';
    });
  
    function slideclip() {
        if (!isVideoPlaying) { // Prevent sliding if a video is playing
            celebSlides.forEach(celebSlide => {
                celebSlide.style.transform = `translateX(-${counter * 100}%)`;
            });
        }
    }
  
    // Initialize slider position
    function initializeSlider() {
        celebSlides.forEach((celebSlide, index) => {
            celebSlide.style.left = `${index * 100}%`;
            celebSlide.style.transform = 'translateX(0%)';
        });
        counter = 0;
    }
  
    // Function to go to the next slide
    const nextbutton = () => {
        console.log('🔄 Next button clicked, counter:', counter);
        if (!isVideoPlaying) { // Prevent slide change if a video is playing
            counter = (counter + 1) % totalSlides;
            slideclip();
            resetAutoSlide();
            console.log('✅ Moved to next slide, new counter:', counter);
        } else {
            console.log('⏸️ Video is playing, slide change prevented');
        }
    };
  
    // Function to go to the previous slide
    const prevbutton = () => {
        console.log('🔄 Previous button clicked, counter:', counter);
        if (!isVideoPlaying) { // Prevent slide change if a video is playing
            counter = (counter - 1 + totalSlides) % totalSlides;
            slideclip();
            resetAutoSlide();
            console.log('✅ Moved to previous slide, new counter:', counter);
        } else {
            console.log('⏸️ Video is playing, slide change prevented');
        }
    };
  
    // Make functions globally accessible for HTML onclick attributes
    window.nextbutton = nextbutton;
    window.prevbutton = prevbutton;
    
    // Add console logging for debugging
    console.log('✅ Navigation functions made globally accessible');
    console.log('✅ nextbutton function:', typeof window.nextbutton);
    console.log('✅ prevbutton function:', typeof window.prevbutton);
  
    // Function to start automatic sliding
    function startAutoSlide() {
        if (!isVideoPlaying) {
            autoSlideInterval = setInterval(() => {
                nextbutton();
            }, 5000); // Change every 5 seconds
        }
    }
  
    // Function to stop automatic sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
  
    // Function to reset auto-slide when user interacts
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
  
    // Detect when user hovers over slides (pause auto-slide)
    celebSlides.forEach(element => {
        element.addEventListener('mouseenter', stopAutoSlide);
        element.addEventListener('mouseleave', startAutoSlide);
    });
  
    // Handle video interactions
    videos.forEach(video => {
        video.addEventListener('play', () => {
            isVideoPlaying = true; // Mark video as playing
            stopAutoSlide(); // Stop auto-slide
        });
  
        video.addEventListener('pause', () => {
            isVideoPlaying = false; // Mark video as not playing
            startAutoSlide(); // Resume auto-slide
        });
  
        video.addEventListener('ended', () => {
            isVideoPlaying = false; // Mark video as not playing
            startAutoSlide(); // Resume auto-slide
        });
    });
  
    // Handle window resize to recalculate slider positions
    window.addEventListener('resize', () => {
        initializeSlider();
        slideclip();
    });
  
    // Add touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    let isDragging = false;
  
    celebSlides.forEach(slide => {
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
            handleSwipe();
            isDragging = false;
            startAutoSlide();
        });
  
        // Mouse events for desktop
        slide.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            isDragging = true;
            stopAutoSlide();
        });
  
        slide.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
  
        slide.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            endX = e.clientX;
            handleSwipe();
            isDragging = false;
            startAutoSlide();
        });
    });
  
    function handleSwipe() {
        const threshold = window.innerWidth < 480 ? 30 : 50; // Lower threshold for mobile
        const distance = endX - startX;
        
        if (Math.abs(distance) > threshold) {
            if (distance > 0) {
                prevbutton(); // Swiped right
            } else {
                nextbutton(); // Swiped left
            }
        }
    }
  
    // Initialize and start auto-slide when the page loads
    console.log('🚀 Initializing celebrity testimonials slider...');
    console.log('📊 Total slides found:', totalSlides);
    console.log('🎬 Videos found:', videos.length);
    
    initializeSlider();
    startAutoSlide();
    
    console.log('✅ Celebrity testimonials slider initialized successfully!');
    }
  }
  
  // ===========================================================
  // BEFORE/AFTER IMAGES (OLD METHOD - KEEPING FOR COMPATIBILITY)
  // ===========================================================
  
  var firstIndex = 0;
  function automaticSlide(){
    setTimeout(automaticSlide, 2000);
    const img = document.querySelectorAll('.beautifulb-img');
    if (img.length > 0) {
        for(let pics = 0; pics < img.length; pics++){
            img[pics].style.display = "none";
        }
        firstIndex++;
        if(firstIndex > img.length){
            firstIndex = 1;
        }
        if (img[firstIndex - 1]) {
            img[firstIndex - 1].style.display = "block";
        }
    }
  }
  
  var firstIdx = 0;
  function autoSlide(){
    setTimeout(autoSlide, 2000);
    const imgs = document.querySelectorAll('.beautifula-img');
    if (imgs.length > 0) {
        for(let photos = 0; photos < imgs.length; photos++){
            imgs[photos].style.display = "none";
        }
        firstIdx++;
        if(firstIdx > imgs.length){
            firstIdx = 1;
        }
        if (imgs[firstIdx - 1]) {
            imgs[firstIdx - 1].style.display = "block";
        }
    }
  }
  
  // Only start these if elements exist
  if (document.querySelectorAll('.beautifulb-img').length > 0) {
    automaticSlide();
  }
  if (document.querySelectorAll('.beautifula-img').length > 0) {
    autoSlide();
  }
  
  // ===========================================================
  // BEFORE/AFTER SLIDESHOW (NEW METHOD)
  // ===========================================================
  
  let currentSlideIndex = 0;
  let autoPlayInterval;
  
  // Initialize the before/after slideshow
  function initializeBeforeAfterSlideshow() {
    const beforeSlides = document.querySelectorAll('.before-slide');
    const afterSlides = document.querySelectorAll('.after-slide');
    
    if (beforeSlides.length === 0 || afterSlides.length === 0) {
        console.log('Before/After slides not found - skipping initialization');
        return;
    }
    
    console.log(`Found ${beforeSlides.length} before slides and ${afterSlides.length} after slides`);
    
    // Hide all slides first
    beforeSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    afterSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show first slides
    if (beforeSlides[0]) {
        beforeSlides[0].classList.add('active');
    }
    if (afterSlides[0]) {
        afterSlides[0].classList.add('active');
    }
    
    // Start autoplay
    startAutoPlay(beforeSlides, afterSlides);
  }
  
  // Start autoplay with consistent timing
 // Replace these functions in your existing JS file:

// Start autoplay with consistent timing - FIXED VERSION
function startAutoPlay(beforeSlides, afterSlides) {
    // Clear any existing interval to prevent conflicts
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
    
    // Validate slides before starting
    if (!beforeSlides || !afterSlides || beforeSlides.length === 0 || afterSlides.length === 0) {
        console.error('Invalid slides for autoplay');
        return;
    }
    
    // Start new interval - change images every 1 second
    autoPlayInterval = setInterval(() => {
        // Double check slides are still available
        if (beforeSlides.length > 0 && afterSlides.length > 0) {
            nextImages(beforeSlides, afterSlides);
        }
    }, 1000);
    
    console.log('Before/After autoplay started with 1-second intervals');
}

// Move to next images - FIXED VERSION with smooth transitions
function nextImages(beforeSlides, afterSlides) {
    // Validate inputs
    if (!beforeSlides || !afterSlides || beforeSlides.length === 0 || afterSlides.length === 0) {
        return;
    }
    
    // Calculate next index first
    const nextSlideIndex = (currentSlideIndex + 1) >= beforeSlides.length ? 0 : currentSlideIndex + 1;
    
    // Show next slides immediately for smooth transition
    if (beforeSlides[nextSlideIndex]) {
        beforeSlides[nextSlideIndex].classList.add('active');
    }
    if (afterSlides[nextSlideIndex]) {
        afterSlides[nextSlideIndex].classList.add('active');
    }
    
    // Brief delay then hide previous slides
    setTimeout(() => {
        if (beforeSlides[currentSlideIndex]) {
            beforeSlides[currentSlideIndex].classList.remove('active');
        }
        if (afterSlides[currentSlideIndex]) {
            afterSlides[currentSlideIndex].classList.remove('active');
        }
        
        // Update current index
        currentSlideIndex = nextSlideIndex;
        
        console.log(`Showing image pair ${currentSlideIndex + 1}/${beforeSlides.length}`);
    }, 30); // Reduced delay for faster transitions since interval is 1 second
}

// Pause autoplay temporarily when user interacts - FIXED VERSION
function pauseAutoPlayTemporarily() {
    stopAutoPlay();
    
    // Clear any existing resume timeout
    if (window.resumeTimeout) {
        clearTimeout(window.resumeTimeout);
    }
    
    // Resume after 3 seconds of no interaction (reduced from 5 seconds for better UX)
    window.resumeTimeout = setTimeout(() => {
        const beforeSlides = document.querySelectorAll('.before-slide');
        const afterSlides = document.querySelectorAll('.after-slide');
        
        // Only restart if slides are still available
        if (beforeSlides.length > 0 && afterSlides.length > 0) {
            startAutoPlay(beforeSlides, afterSlides);
        }
    }, 3000);
}
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        console.log('Before/After autoplay stopped');
    }
  }
  // Handle page visibility changes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoPlay();
    } else {
        const beforeSlides = document.querySelectorAll('.before-slide');
        const afterSlides = document.querySelectorAll('.after-slide');
        if (beforeSlides.length > 0 && afterSlides.length > 0) {
            startAutoPlay(beforeSlides, afterSlides);
        }
    }
  });
  
  // Pause autoplay when user scrolls or interacts
  window.addEventListener('scroll', () => {
    pauseAutoPlayTemporarily();
  });
  
  // Handle mouse interactions
  document.addEventListener('click', () => {
    pauseAutoPlayTemporarily();
  });
  
  // ===========================================================
  // SWIPER SLIDERS INITIALIZATION
  // ===========================================================
  
  // Initialize Swipers when DOM is ready - ONLY on pages that need them
  document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page that needs Swiper (not testimonials page)
    const isTestimonialsPage = window.location.pathname.includes('Testimonials.html');
    
    if (isTestimonialsPage) {
      console.log('🚫 Skipping Swiper initialization on testimonials page');
      return; // Don't initialize Swiper on testimonials page
    }
    // Video testimonials swiper
    if (document.querySelector('.slider-wrapper') && typeof Swiper !== 'undefined') {
        new Swiper('.slider-wrapper', {
            loop: true,
            grabCursor: true,
            spaceBetween: 25,
  
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
                400: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                },
            }
        });
    }
  
    // Celebrities swiper
    if (document.querySelector('.details-slider-wrapper') && typeof Swiper !== 'undefined') {
        new Swiper('.details-slider-wrapper', {
            loop: true, 
            grabCursor: true,
            spaceBetween: 25,
            speed: 2000, 
            autoplay: {
                delay: 0, 
                disableOnInteraction: false, 
            },
            freeMode: true, 
            freeModeMomentum: false, 
  
            slidesPerView: 'auto', 
            centeredSlides: false, 
  
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
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 4
                },
            }
        });
    }
  
    // People slider - UPDATED WITH AUTOPLAY AND NO NAVIGATION ANIMATIONS
    if (document.querySelector('.people-slider-wrapper') && typeof Swiper !== 'undefined') {
        new Swiper('.people-slider-wrapper', {
            loop: true,
            grabCursor: true,
            spaceBetween: 25,
            
            // Enable autoplay
            autoplay: {
                delay: 3000, // 3 seconds delay
                disableOnInteraction: false, // Continue autoplay after user interaction
                pauseOnMouseEnter: true, // Pause when hovering
            },
  
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
  
            // Keep navigation but without animations (will be handled by CSS)
            navigation: {
                nextEl: '.people-slider-wrapper .swiper-button-next',
                prevEl: '.people-slider-wrapper .swiper-button-prev',
            },
  
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                },
            }
        });
    }
  });
  
  // ===========================================================
  // WORK WITH US FORM
  // ===========================================================
  
  document.addEventListener('DOMContentLoaded', function() {
    const workForm = document.getElementById('work-with-us-form');
    if (workForm) {
        workForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Form submitted successfully!');
        });
    }
  });
  
  // ===========================================================
  // ADDITIONAL FUNCTIONALITY
  // ===========================================================
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
  });
  
  // Add scroll effect to navbar
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Always show navbar when at the top
        if (scrollTop <= 100) {
            navbar.style.transform = 'translateY(0)';
            lastScrollTop = scrollTop;
            return;
        }
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
  }
  
  // Add loading animation
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.dentists-intro-container li, .dentists-clinic-intro-container li, .mission-content, .service-item, .treatment-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
  });
  
  console.log('Complete JavaScript loaded successfully!');