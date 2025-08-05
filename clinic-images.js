// Clinic Images Gallery
const images = {
  1: [
    "clinic1.jpg",
    "clinic2.jpg", 
    "clinic3.jpg",
    "clinic4.jpg",
    "clinic5.jpg",
    "clinic6.jpg",
    "clinic7.jpg",
    "clinic8.jpg"
  ],
  2: [
    "clinic9.jpg",
    "clinic10.jpg",
    "clinic11.jpg", 
    "clinic12.jpg",
    "clinic13.jpg",
    "clinic14.jpg",
    "clinic15.jpg",
    "clinic16.jpg"
  ],
  3: [
    "clinic17.jpg",
    "clinic18.jpg",
    "clinic19.jpg",
    "clinic20.jpg", 
    "clinic21.jpg",
    "clinic22.jpg",
    "clinic23.jpg",
    "clinic24.jpg"
  ]
};

function changePage(pageNumber) {
  const container = document.getElementById('imageContainer');
  if (!container) return;
  
  container.innerHTML = '';
  images[pageNumber].forEach(imageName => {
    const img = document.createElement('img');
    img.src = imageName;
    img.alt = 'Clinic Image';
    img.className = 'clinic-gallery-img';
    container.appendChild(img);
  });

  // Update active button
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach(button => {
    if (parseInt(button.textContent) === pageNumber) {
      button.style.backgroundColor = '#0056b3';
    } else {
      button.style.backgroundColor = '#007BFF';
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing clinic images page');
  
  // Initialize with first page
  changePage(1);
  
  // Initialize people slider if Swiper is available
  if (typeof Swiper !== 'undefined') {
    initializePeopleSlider();
  } else {
    console.log('Swiper not available, waiting...');
    // Wait a bit for Swiper to load
    setTimeout(initializePeopleSlider, 1000);
  }
});

function initializePeopleSlider() {
  const peopleSlider = document.querySelector('.people-slider-wrapper');
  if (!peopleSlider) {
    console.log('People slider not found');
    return;
  }
  
  if (typeof Swiper === 'undefined') {
    console.log('Swiper still not available');
    return;
  }
  
  console.log('Initializing people slider');
  
  // People Slider with Swiper
const swiperpeople = new Swiper('.people-slider-wrapper', {
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
