// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const navList = document.querySelector(".nav-list");
  const icon = menuIcon ? menuIcon.querySelector("i") : null;

  if (menuIcon && navList && icon) {
      menuIcon.addEventListener("click", function (e) {
          navList.classList.toggle("active");

          if (navList.classList.contains("active")) {
              icon.classList.replace("fa-bars", "fa-times");
          } else {
              icon.classList.replace("fa-times", "fa-bars");
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
          }
      });
  }

  // Active Link Highlighting
  let currentPage = window.location.pathname.split("/").pop().toLowerCase();
  let navLinks = document.querySelectorAll(".nav-list a");

  navLinks.forEach(link => {
      let linkPage = link.getAttribute("href").toLowerCase();
      if (currentPage === linkPage || (currentPage === "" && linkPage === "index.html")) {
          link.classList.add("active");
          link.setAttribute('aria-current', 'page');
      } else {
          link.classList.remove("active");
          link.removeAttribute('aria-current');
      }
  });

  // Close mobile menu after navigation
  navLinks.forEach(link => {
      link.addEventListener("click", function () {
          if (window.innerWidth <= 854 && navList && navList.classList.contains("active")) {
              navList.classList.remove("active");
              if (icon) {
                  icon.classList.replace("fa-times", "fa-bars");
              }
          }
      });
  });

  // Dropdown functionality for mobile
  const dropdown = document.querySelector(".dropdown");
  const dropdownMenu = dropdown ? dropdown.querySelector(".dropdown-menu") : null;
  const dropdownLink = dropdown ? dropdown.querySelector("a") : null;

  if (dropdown && dropdownLink && dropdownMenu) {
      dropdownLink.setAttribute('aria-haspopup', 'true');
      dropdownLink.setAttribute('aria-expanded', 'false');
      dropdownMenu.setAttribute('role', 'menu');
      dropdownMenu.setAttribute('aria-label', 'Treatments submenu');

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
              if (dropdownOpen) {
                  closeDropdown();
              } else {
                  openDropdown();
              }
          }
      });

      document.addEventListener('click', function (e) {
          if (isMobile() && dropdownOpen && !dropdown.contains(e.target)) {
              closeDropdown();
          }
      });

      window.addEventListener('resize', function () {
          if (!isMobile()) {
              closeDropdown();
          }
      });
  }

  // Initialize clinic images slider - Fixed approach
  initClinicImagesSlider();

  // Initialize People Swiper - Wait for DOM to be fully ready
  setTimeout(() => {
      initPeopleSwiper();
  }, 100);
});

// Fixed Clinic Images Slider
function initClinicImagesSlider() {
  const clinicImagesContainer = document.querySelector('.dental-clinic-images-content');
  const clinicImages = document.querySelectorAll('.dental-clinic-images-content img');
  
  if (!clinicImagesContainer || !clinicImages.length) {
      console.log('Clinic images not found');
      return;
  }

  // Duplicate images for seamless loop
  const originalImages = Array.from(clinicImages);
  originalImages.forEach(img => {
      const clone = img.cloneNode(true);
      clinicImagesContainer.appendChild(clone);
  });

  // Ensure the animation is working
  clinicImagesContainer.style.display = 'flex';
  clinicImagesContainer.style.animation = 'scroll 20s linear infinite';

  // Pause animation on hover
  clinicImagesContainer.addEventListener('mouseenter', function() {
      this.style.animationPlayState = 'paused';
  });

  clinicImagesContainer.addEventListener('mouseleave', function() {
      this.style.animationPlayState = 'running';
  });

  console.log('Clinic images slider initialized');
}

// Fixed People Swiper Initialization
function initPeopleSwiper() {
  // Check if Swiper is loaded
  if (typeof Swiper === 'undefined') {
      console.error('Swiper is not loaded');
      return;
  }

  const swiperContainer = document.querySelector('.people-slider-container');
  if (!swiperContainer) {
      console.error('Swiper container not found');
      return;
  }

  // Destroy existing swiper instance if any
  if (swiperContainer.swiper) {
      swiperContainer.swiper.destroy(true, true);
  }

  try {
      const swiperpeople = new Swiper('.people-slider-container', {
          loop: true,
          grabCursor: true,
          spaceBetween: 25,
          autoplay: {
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
          },
          speed: 800,
          effect: 'slide',

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
                  slidesPerView: 1,
                  spaceBetween: 15
              },
              768: {
                  slidesPerView: 2,
                  spaceBetween: 20
              },
              1024: {
                  slidesPerView: 3,
                  spaceBetween: 25
              },
          },

          // Error handling
          on: {
              init: function () {
                  console.log('People Swiper initialized successfully');
              },
              slideChange: function () {
                  // Optional: Add any slide change effects
              }
          }
      });

      // Ensure autoplay starts
      swiperpeople.autoplay.start();

  } catch (error) {
      console.error('Error initializing People Swiper:', error);
  }
}

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
document.querySelectorAll('.dentists-intro-container li, .dentists-clinic-intro-container li, .mission-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Ensure Swiper reinitializes on window resize
window.addEventListener('resize', function() {
  setTimeout(() => {
      const swiperContainer = document.querySelector('.people-slider-container');
      if (swiperContainer && swiperContainer.swiper) {
          swiperContainer.swiper.update();
      }
  }, 100);
});