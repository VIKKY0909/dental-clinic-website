//dental-implants section

// Before/After Image Slideshow for dental implants
var firstIndex = 0;
function automaticSlide() {
  setTimeout(automaticSlide, 2000);
  var pics;
  const img = document.querySelectorAll('.dentalb-img');
  if (img.length === 0) return;
  
  for(pics = 0; pics < img.length; pics++) {
    img[pics].style.display = "none";
  }
  firstIndex++;
  if(firstIndex > img.length) {
    firstIndex = 1;
  }
  if (img[firstIndex - 1]) {
    img[firstIndex - 1].style.display = "block";
  }
}

var firstIdx = 0;
function autoSlide() {
  setTimeout(autoSlide, 2000);
  var photos;
  const imgs = document.querySelectorAll('.dentala-img');
  if (imgs.length === 0) return;
  
  for(photos = 0; photos < imgs.length; photos++) {
    imgs[photos].style.display = "none";
  }
  firstIdx++;
  if(firstIdx > imgs.length) {
    firstIdx = 1;
  }
  if (imgs[firstIdx - 1]) {
    imgs[firstIdx - 1].style.display = "block";
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Start the before/after slideshows
  automaticSlide();
  autoSlide();
  
  // Initialize accordion functionality
  initializeAccordion();
  
  // Initialize Swiper sliders
  initializeSwipers();
});

// Accordion functionality
function initializeAccordion() {
  document.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const toggleBtn = item.querySelector('.toggle-btn');
    
    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = content.classList.contains('open');
        
        // Close all other items
        document.querySelectorAll('.accordion-content').forEach(c => {
          c.classList.remove('open');
        });
        
        document.querySelectorAll('.toggle-btn').forEach(btn => btn.textContent = '+');
        
        // Toggle current item
        if (!isOpen) {
          content.classList.add('open');
          toggleBtn.textContent = 'x';
        } else {
          content.classList.remove('open');
          toggleBtn.textContent = '+';
        }
      });
    }
  });
}

// Initialize all Swiper sliders
function initializeSwipers() {
  // Wait for Swiper to be available
  if (typeof Swiper === 'undefined') {
    console.log('Swiper not available, retrying...');
    setTimeout(initializeSwipers, 100);
    return;
  }

  try {

  // Dental testimonials slider
  const dentalTestimonialsSlider = document.querySelector('.makeover-slider-dentalcontainer');
  if (dentalTestimonialsSlider) {
    new Swiper('.makeover-slider-dentalcontainer', {
      loop: true,
      grabCursor: true,
      spaceBetween: 25,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
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
        480: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 25
        },
      }
    });
  }

  // Basal video testimonials slider
  const basalSlider = document.querySelector('.basal-slider-container');
  if (basalSlider) {
    new Swiper('.basal-slider-container', {
      loop: true,
      grabCursor: true,
      spaceBetween: 25,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
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
        480: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 25
        },
      }
    });
  }

  // People slider
  const peopleSlider = document.querySelector('.people-slider-container');
  if (peopleSlider) {
    new Swiper('.people-slider-container', {
      loop: true,
      grabCursor: true,
      spaceBetween: 25,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
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
        480: {
          slidesPerView: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 25
        },
      }
    });
  }
  } catch (error) {
    console.error('Error initializing Swiper sliders:', error);
  }
}