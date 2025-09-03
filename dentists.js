// Page-specific functionality for Dentists page
document.addEventListener("DOMContentLoaded", function () {
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