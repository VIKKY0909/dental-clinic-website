/**
 * Dental Clinic Website - Optimized JavaScript
 * Professional, maintainable, and performant code
 */

// ===========================================================
// CONFIGURATION & CONSTANTS
// ===========================================================

const CONFIG = {
  SLIDESHOW_INTERVAL: 5000,
  BEFORE_AFTER_INTERVAL: 3000, // Changed to 3 seconds as requested
  TOUCH_THRESHOLD: {
    MOBILE: 30,
    DESKTOP: 50,
  },
  BREAKPOINTS: {
    MOBILE: 854,
    TABLET: 1024,
  },
};

// ===========================================================
// UTILITY FUNCTIONS
// ===========================================================

const Utils = {
  isMobile: () => window.innerWidth <= CONFIG.BREAKPOINTS.MOBILE,
  isTablet: () => window.innerWidth <= CONFIG.BREAKPOINTS.TABLET,

  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },
};

// ===========================================================
// NAVIGATION MANAGER
// ===========================================================

class NavigationManager {
  constructor() {
    this.menuIcon = document.getElementById("menu-icon");
    this.navList = document.querySelector(".nav-list");
    this.icon = this.menuIcon?.querySelector("i");
    this.dropdown = document.querySelector(".dropdown");
    this.dropdownMenu = this.dropdown?.querySelector(".dropdown-menu");
    this.dropdownLink = this.dropdown?.querySelector("a");

    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupActiveLinks();
    this.setupDropdown();
    this.setupNavigationEvents();
  }

  setupMobileMenu() {
    if (!this.menuIcon || !this.navList || !this.icon) {
      console.warn("❌ Mobile navigation elements not found!");
      return;
    }

    this.menuIcon.addEventListener("click", (e) => {
      this.toggleMobileMenu();
      e.stopPropagation();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen() &&
        !this.navList.contains(e.target) &&
        e.target !== this.menuIcon &&
        !this.menuIcon.contains(e.target)
      ) {
        this.closeMobileMenu();
      }
    });
  }

  setupActiveLinks() {
    const currentPage =
      window.location.pathname.split("/").pop().toLowerCase() || "index.html";
    const navLinks = document.querySelectorAll(".nav-list a");

    navLinks.forEach((link) => {
      const linkPage = link.getAttribute("href").toLowerCase();
      if (
        currentPage === linkPage ||
        (currentPage === "" && linkPage === "index.html")
      ) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }

  setupDropdown() {
    if (!this.dropdown || !this.dropdownLink || !this.dropdownMenu) return;

    // Add ARIA attributes
    this.dropdownLink.setAttribute("aria-haspopup", "true");
    this.dropdownLink.setAttribute("aria-expanded", "false");
    this.dropdownMenu.setAttribute("role", "menu");
    this.dropdownMenu.setAttribute("aria-label", "Treatments submenu");

    this.dropdownLink.addEventListener("click", (e) => {
      if (Utils.isMobile()) {
        e.preventDefault();
        e.stopPropagation();
        this.toggleDropdown();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (
        Utils.isMobile() &&
        this.isDropdownOpen() &&
        !this.dropdown.contains(e.target)
      ) {
        this.closeDropdown();
      }
    });

    // Handle dropdown menu clicks
    this.dropdownMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.tagName === "A" && e.target.closest(".dropdown-menu")) {
        setTimeout(() => {
          if (this.isMenuOpen()) {
            this.closeMobileMenu();
            this.closeDropdown();
          }
        }, 100);
      }
    });

    // Reset dropdown on resize
    window.addEventListener(
      "resize",
      Utils.debounce(() => {
        if (!Utils.isMobile()) {
          this.closeDropdown();
        }
      }, 250)
    );
  }

  setupNavigationEvents() {
    const navLinks = document.querySelectorAll(".nav-list a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (
          Utils.isMobile() &&
          this.isMenuOpen() &&
          !link.closest(".dropdown")
        ) {
          this.closeMobileMenu();
        }
      });
    });
  }

  toggleMobileMenu() {
    this.navList.classList.toggle("active");
    if (this.isMenuOpen()) {
      this.icon.classList.replace("fa-bars", "fa-times");
    } else {
      this.icon.classList.replace("fa-times", "fa-bars");
    }
  }

  closeMobileMenu() {
    this.navList.classList.remove("active");
    this.icon.classList.replace("fa-times", "fa-bars");
  }

  isMenuOpen() {
    return this.navList.classList.contains("active");
  }

  toggleDropdown() {
    const isOpen = this.isDropdownOpen();
    this.dropdownMenu.style.display = isOpen ? "" : "block";
    this.dropdownLink.setAttribute("aria-expanded", !isOpen);
  }

  closeDropdown() {
    this.dropdownMenu.style.display = "";
    this.dropdownLink.setAttribute("aria-expanded", "false");
  }

  isDropdownOpen() {
    return this.dropdownMenu.style.display === "block";
  }
}

// ===========================================================
// CELEBRITY TESTIMONIALS SLIDER - FIXED VERSION
// ===========================================================

class CelebritySlider {
  constructor() {
    this.slides = document.querySelectorAll(".celeb-img-vid-container");
    this.videos = document.querySelectorAll(".celeb-img-vid-container video");
    this.currentSlide = 0;
    this.totalSlides = this.slides.length;
    this.autoSlideInterval = null;
    this.isVideoPlaying = false;
    this.currentPlayingVideo = null;

    if (
      this.slides.length > 0 &&
      !window.location.pathname.includes("Testimonials.html")
    ) {
      this.init();
    }
  }

  init() {
    this.setupSlides();
    this.setupVideoHandling();
    this.setupTouchSupport();
    this.startAutoSlide();
    this.makeNavigationGlobal();
    this.setupResizeHandler();

    console.log(
      "✅ Celebrity slider initialized with",
      this.totalSlides,
      "slides"
    );
  }

  setupSlides() {
    this.slides.forEach((slide, index) => {
      slide.style.left = `${index * 100}%`;
      slide.style.transition = "transform 0.5s ease-in-out";
      slide.style.width = "100%";
      slide.style.height = "100%";
    });

    // Initialize position
    this.updateSlidePosition();
  }

  setupVideoHandling() {
    this.videos.forEach((video) => {
      // Stop any other playing video when this one starts
      video.addEventListener("play", () => {
        this.stopAllOtherVideos(video);
        this.isVideoPlaying = true;
        this.currentPlayingVideo = video;
        this.stopAutoSlide();
        console.log("🎬 Video started playing, auto-slide paused");
      });

      video.addEventListener("pause", () => {
        if (this.currentPlayingVideo === video) {
          this.isVideoPlaying = false;
          this.currentPlayingVideo = null;
          this.startAutoSlide();
          console.log("⏸️ Video paused, auto-slide resumed");
        }
      });

      video.addEventListener("ended", () => {
        if (this.currentPlayingVideo === video) {
          this.isVideoPlaying = false;
          this.currentPlayingVideo = null;
          this.startAutoSlide();
          console.log("🏁 Video ended, auto-slide resumed");
        }
      });
    });
  }

  stopAllOtherVideos(currentVideo) {
    this.videos.forEach((video) => {
      if (video !== currentVideo && !video.paused) {
        video.pause();
        video.currentTime = 0; // Reset to beginning
        console.log("🛑 Stopped other video");
      }
    });
  }

  setupTouchSupport() {
    let startX = 0;
    let isDragging = false;

    this.slides.forEach((slide) => {
      // Touch events
      slide.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        this.stopAutoSlide();
      });

      slide.addEventListener("touchmove", (e) => {
        if (isDragging) e.preventDefault();
      });

      slide.addEventListener("touchend", (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        this.handleSwipe(startX, endX);
        isDragging = false;
        this.startAutoSlide();
      });

      // Mouse events
      slide.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        isDragging = true;
        this.stopAutoSlide();
      });

      slide.addEventListener("mousemove", (e) => {
        if (isDragging) e.preventDefault();
      });

      slide.addEventListener("mouseup", (e) => {
        if (!isDragging) return;
        const endX = e.clientX;
        this.handleSwipe(startX, endX);
        isDragging = false;
        this.startAutoSlide();
      });

      // Pause auto-slide on hover
      slide.addEventListener("mouseenter", () => this.stopAutoSlide());
      slide.addEventListener("mouseleave", () => this.startAutoSlide());
    });
  }

  handleSwipe(startX, endX) {
    const threshold = Utils.isMobile()
      ? CONFIG.TOUCH_THRESHOLD.MOBILE
      : CONFIG.TOUCH_THRESHOLD.DESKTOP;
    const distance = endX - startX;

    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        this.previousSlide();
      } else {
        this.nextSlide();
      }
    }
  }

  nextSlide() {
    console.log("🔄 Next button clicked, current slide:", this.currentSlide);

    // Stop current video if playing
    if (this.currentPlayingVideo && !this.currentPlayingVideo.paused) {
      this.currentPlayingVideo.pause();
      this.currentPlayingVideo.currentTime = 0;
      this.isVideoPlaying = false;
      this.currentPlayingVideo = null;
      console.log("🛑 Stopped current video for slide change");
    }

    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSlidePosition();
    this.resetAutoSlide();

    console.log("✅ Moved to next slide, new slide:", this.currentSlide);
  }

  previousSlide() {
    console.log(
      "🔄 Previous button clicked, current slide:",
      this.currentSlide
    );

    // Stop current video if playing
    if (this.currentPlayingVideo && !this.currentPlayingVideo.paused) {
      this.currentPlayingVideo.pause();
      this.currentPlayingVideo.currentTime = 0;
      this.isVideoPlaying = false;
      this.currentPlayingVideo = null;
      console.log("🛑 Stopped current video for slide change");
    }

    this.currentSlide =
      (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSlidePosition();
    this.resetAutoSlide();

    console.log("✅ Moved to previous slide, new slide:", this.currentSlide);
  }

  updateSlidePosition() {
    this.slides.forEach((slide) => {
      slide.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    });
  }

  startAutoSlide() {
    if (this.autoSlideInterval) return;

    this.autoSlideInterval = setInterval(() => {
      if (!this.isVideoPlaying) {
        this.nextSlide();
      }
    }, CONFIG.SLIDESHOW_INTERVAL);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  makeNavigationGlobal() {
    // Make functions globally accessible
    window.nextbutton = () => this.nextSlide();
    window.prevbutton = () => this.previousSlide();

    // Also add event listeners to the buttons as a fallback
    const leftArrow = document.getElementById("left-arrow");
    const rightArrow = document.getElementById("right-arrow");

    if (leftArrow) {
      leftArrow.addEventListener("click", () => this.previousSlide());
      console.log("✅ Left arrow button event listener added");
    }

    if (rightArrow) {
      rightArrow.addEventListener("click", () => this.nextSlide());
      console.log("✅ Right arrow button event listener added");
    }

    console.log("✅ Navigation functions made globally accessible");
    console.log("✅ nextbutton function:", typeof window.nextbutton);
    console.log("✅ prevbutton function:", typeof window.prevbutton);

    // Test the functions are accessible
    setTimeout(() => {
      if (
        typeof window.nextbutton === "function" &&
        typeof window.prevbutton === "function"
      ) {
        console.log("✅ Navigation functions are properly accessible");
      } else {
        console.error("❌ Navigation functions are not accessible!");
      }
    }, 100);
  }

  setupResizeHandler() {
    window.addEventListener(
      "resize",
      Utils.debounce(() => {
        this.handleResize();
      }, 250)
    );
  }

  // Handle window resize
  handleResize() {
    this.setupSlides();
    this.updateSlidePosition();
  }
}

// ===========================================================
// BEFORE/AFTER SLIDESHOW - FIXED VERSION
// ===========================================================

class BeforeAfterSlideshow {
  constructor() {
    this.beforeSlides = document.querySelectorAll(".before-slide");
    this.afterSlides = document.querySelectorAll(".after-slide");
    this.currentIndex = 0;
    this.autoPlayInterval = null;

    if (this.beforeSlides.length > 0 && this.afterSlides.length > 0) {
      this.init();
    }
  }

  init() {
    this.hideAllSlides();
    this.showCurrentSlides();
    this.startAutoPlay();
    this.setupEventListeners();
    console.log(
      "✅ Before/After slideshow initialized with",
      this.beforeSlides.length,
      "image pairs"
    );
  }

  hideAllSlides() {
    [...this.beforeSlides, ...this.afterSlides].forEach((slide) => {
      slide.classList.remove("active");
    });
  }

  showCurrentSlides() {
    if (this.beforeSlides[this.currentIndex]) {
      this.beforeSlides[this.currentIndex].classList.add("active");
    }
    if (this.afterSlides[this.currentIndex]) {
      this.afterSlides[this.currentIndex].classList.add("active");
    }
  }

  nextImages() {
    const nextIndex = (this.currentIndex + 1) % this.beforeSlides.length;

    // Show next slides
    if (this.beforeSlides[nextIndex]) {
      this.beforeSlides[nextIndex].classList.add("active");
    }
    if (this.afterSlides[nextIndex]) {
      this.afterSlides[nextIndex].classList.add("active");
    }

    // Hide previous slides after brief delay
    setTimeout(() => {
      if (this.beforeSlides[this.currentIndex]) {
        this.beforeSlides[this.currentIndex].classList.remove("active");
      }
      if (this.afterSlides[this.currentIndex]) {
        this.afterSlides[this.currentIndex].classList.remove("active");
      }
      this.currentIndex = nextIndex;
    }, 30);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextImages();
    }, CONFIG.BEFORE_AFTER_INTERVAL);
    console.log(
      "✅ Before/After autoplay started with",
      CONFIG.BEFORE_AFTER_INTERVAL / 1000,
      "second intervals"
    );
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  pauseTemporarily() {
    this.stopAutoPlay();

    if (window.resumeTimeout) {
      clearTimeout(window.resumeTimeout);
    }

    window.resumeTimeout = setTimeout(() => {
      this.startAutoPlay();
    }, 3000);
  }

  setupEventListeners() {
    // Pause on scroll/interaction
    window.addEventListener("scroll", () => this.pauseTemporarily());
    document.addEventListener("click", () => this.pauseTemporarily());

    // Handle page visibility
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.stopAutoPlay();
      } else {
        this.startAutoPlay();
      }
    });
  }
}

// ===========================================================
// SWIPER MANAGER
// ===========================================================

class SwiperManager {
  constructor() {
    if (window.location.pathname.includes("Testimonials.html")) {
      console.log("🚫 Skipping Swiper initialization on testimonials page");
      return;
    }

    this.initSwipers();
  }

  initSwipers() {
    this.initVideoTestimonialsSwiper();
    this.initCelebritiesSwiper();
    this.initPeopleSwiper();
  }

  initVideoTestimonialsSwiper() {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    if (sliderWrapper && typeof Swiper !== "undefined") {
      new Swiper(".slider-wrapper", {
        loop: true,
        grabCursor: true,
        spaceBetween: 25,
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
          400: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
      console.log("✅ Video testimonials Swiper initialized");
    }
  }

  initCelebritiesSwiper() {
    const detailsSlider = document.querySelector(".details-slider-wrapper");
    if (detailsSlider && typeof Swiper !== "undefined") {
      new Swiper(".details-slider-wrapper", {
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
        slidesPerView: "auto",
        centeredSlides: false,
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
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        },
      });
      console.log("✅ Celebrities Swiper initialized");
    }
  }

  initPeopleSwiper() {
    const peopleSlider = document.querySelector(".people-slider-wrapper");
    if (peopleSlider && typeof Swiper !== "undefined") {
      new Swiper(".people-slider-wrapper", {
        loop: true,
        grabCursor: true,
        spaceBetween: 25,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
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
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        },
      });
      console.log("✅ People Swiper initialized");
    }
  }
}

// ===========================================================
// FORM MANAGER
// ===========================================================

class FormManager {
  constructor() {
    this.initWorkForm();
  }

  initWorkForm() {
    const workForm = document.getElementById("work-with-us-form");
    if (workForm) {
      workForm.addEventListener("submit", (event) => {
        event.preventDefault();
        alert("Form submitted successfully!");
      });
    }
  }
}

// ===========================================================
// ANIMATION MANAGER
// ===========================================================

class AnimationManager {
  constructor() {
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    this.init();
  }

  init() {
    this.setupScrollEffects();
    this.setupLoadingAnimation();
    this.observeElements();
  }

  setupScrollEffects() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    let lastScrollTop = 0;

    window.addEventListener(
      "scroll",
      Utils.throttle(() => {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop <= 100) {
          navbar.style.transform = "translateY(0)";
          lastScrollTop = scrollTop;
          return;
        }

        if (scrollTop > lastScrollTop && scrollTop > 100) {
          navbar.style.transform = "translateY(-100%)";
        } else {
          navbar.style.transform = "translateY(0)";
        }
        lastScrollTop = scrollTop;
      }, 100)
    );
  }

  setupLoadingAnimation() {
    window.addEventListener("load", () => {
      document.body.classList.add("loaded");
    });
  }

  observeElements() {
    const elementsToAnimate = document.querySelectorAll(
      ".dentists-intro-container li, .dentists-clinic-intro-container li, .mission-content, .service-item, .treatment-item"
    );

    elementsToAnimate.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }
}

// ===========================================================
// UTILITY FUNCTIONS
// ===========================================================

function makeCall() {
  window.location.href = "tel:+919372816443";
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ===========================================================
// INITIALIZATION
// ===========================================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("✅ DOM Loaded, Initializing components...");

  // Initialize all managers
  new NavigationManager();
  new CelebritySlider();
  new BeforeAfterSlideshow();
  new SwiperManager();
  new FormManager();
  new AnimationManager();

  // Setup utilities
  setupSmoothScrolling();

  // Test navigation functions
  setTimeout(() => {
    console.log("🧪 Testing navigation functions...");
    console.log("nextbutton available:", typeof window.nextbutton);
    console.log("prevbutton available:", typeof window.prevbutton);

    // Test if buttons exist
    const leftBtn = document.getElementById("left-arrow");
    const rightBtn = document.getElementById("right-arrow");
    console.log("Left button found:", !!leftBtn);
    console.log("Right button found:", !!rightBtn);

    if (leftBtn && rightBtn) {
      console.log("✅ Navigation buttons are present in DOM");
    } else {
      console.error("❌ Navigation buttons not found in DOM");
    }
  }, 500);

  console.log("✅ All components initialized successfully!");
});

// ===========================================================
// LEGACY SUPPORT (Keeping for compatibility)
// ===========================================================

// Home page background slideshow
let indexCurrentSlide = 0;
const indexSlides = document.querySelectorAll(".index-slide");

function indexShowSlide(index) {
  indexSlides.forEach((slide) => slide.classList.remove("active"));
  if (indexSlides[index]) {
    indexSlides[index].classList.add("active");
  }
}

function indexStartSlideshow() {
  if (indexSlides.length > 0) {
    setInterval(() => {
      indexCurrentSlide = (indexCurrentSlide + 1) % indexSlides.length;
      indexShowSlide(indexCurrentSlide);
    }, 6000);
  }
}

// Initialize legacy slideshow
if (indexSlides.length > 0) {
  indexShowSlide(indexCurrentSlide);
  indexStartSlideshow();
}

// Legacy before/after functions (keeping for compatibility)
var firstIndex = 0;
function automaticSlide() {
  setTimeout(automaticSlide, 2000);
  const img = document.querySelectorAll(".beautifulb-img");
  if (img.length > 0) {
    for (let pics = 0; pics < img.length; pics++) {
      img[pics].style.display = "none";
    }
    firstIndex++;
    if (firstIndex > img.length) firstIndex = 1;
    if (img[firstIndex - 1]) {
      img[firstIndex - 1].style.display = "block";
    }
  }
}

var firstIdx = 0;
function autoSlide() {
  setTimeout(autoSlide, 2000);
  const imgs = document.querySelectorAll(".beautifula-img");
  if (imgs.length > 0) {
    for (let photos = 0; photos < imgs.length; photos++) {
      imgs[photos].style.display = "none";
    }
    firstIdx++;
    if (firstIdx > imgs.length) firstIdx = 1;
    if (imgs[firstIdx - 1]) {
      imgs[firstIdx - 1].style.display = "block";
    }
  }
}

// Start legacy slideshows if elements exist
if (document.querySelectorAll(".beautifulb-img").length > 0) {
  automaticSlide();
}
if (document.querySelectorAll(".beautifula-img").length > 0) {
  autoSlide();
}
