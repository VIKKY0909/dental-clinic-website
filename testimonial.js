//toggle icon navbar

let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.nav-list')

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x')
  navbar.classList.toggle('active')

}


// testimonial-clients section 

document.addEventListener("DOMContentLoaded", () => {

const patientSlider = document.querySelector(".patients-testimonials-slider");
const patientSlides = document.querySelectorAll(".patients-testimonials-slide");
const leftArrow = document.querySelector(".testimonials-controls i:nth-child(1)");
const rightArrow = document.querySelector(".testimonials-controls i:nth-child(2)");

let slideIndex = 0;

// Check if elements exist before proceeding
if (!patientSlider || !leftArrow || !rightArrow || patientSlides.length === 0) {
  console.warn("Patient testimonials slider elements not found");
  return;
}

// Responsive slide movement based on screen size
function getSlideMovement() {
  // Always use -100% for full slide movement to show one slide at a time
  return -100;
}

// Initialize slider position
function initializeSlider() {
  const movement = getSlideMovement();
  patientSlider.style.transform = `translateX(${slideIndex * movement}%)`;
}

// Update slider position
function updateSliderPosition() {
  const movement = getSlideMovement();
  const transformValue = `${slideIndex * movement}%`;
  patientSlider.style.transform = `translateX(${transformValue})`;
  console.log(`Slide ${slideIndex + 1}/${patientSlides.length}, Transform: ${transformValue}`);
  
  // Update navigation button states
  const leftArrow = document.querySelector(".testimonials-controls i:nth-child(1)");
  const rightArrow = document.querySelector(".testimonials-controls i:nth-child(2)");
  
  if (leftArrow) {
    leftArrow.style.opacity = slideIndex === 0 ? "0.5" : "1";
    leftArrow.style.pointerEvents = slideIndex === 0 ? "none" : "auto";
  }
  
  if (rightArrow) {
    rightArrow.style.opacity = slideIndex === patientSlides.length - 1 ? "0.5" : "1";
    rightArrow.style.pointerEvents = slideIndex === patientSlides.length - 1 ? "none" : "auto";
  }
}

leftArrow.addEventListener("click", () => {
  slideIndex = slideIndex > 0 ? slideIndex - 1 : 0;
  updateSliderPosition();
});

rightArrow.addEventListener("click", () => {
  slideIndex = slideIndex < patientSlides.length - 1 ? slideIndex + 1 : patientSlides.length - 1;
  updateSliderPosition();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
  updateSliderPosition();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    slideIndex = slideIndex > 0 ? slideIndex - 1 : 0;
    updateSliderPosition();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    slideIndex = slideIndex < patientSlides.length - 1 ? slideIndex + 1 : patientSlides.length - 1;
    updateSliderPosition();
  }
});

// Add touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

patientSlider.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

patientSlider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - next slide
      slideIndex = slideIndex < patientSlides.length - 1 ? slideIndex + 1 : patientSlides.length - 1;
    } else {
      // Swipe right - previous slide
      slideIndex = slideIndex > 0 ? slideIndex - 1 : 0;
    }
    updateSliderPosition();
  }
}

// Initialize the slider
initializeSlider();

});



//   for you-tube videos section

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

function changePage(pageNumber) {
  const container = document.getElementById('videoContainer');
  container.innerHTML = '';
  
  // Responsive video layout based on screen size
  const isMobile = window.innerWidth <= 854;
  const isSmallMobile = window.innerWidth <= 500;
  
  videos[pageNumber].forEach(videoUrl => {
      const iframe = document.createElement('iframe');
      iframe.src = videoUrl;
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      
      // Add responsive classes
      if (isSmallMobile) {
          iframe.style.width = '100%';
          iframe.style.height = '150px';
      } else if (isMobile) {
          iframe.style.width = '100%';
          iframe.style.height = '200px';
      } else {
          iframe.style.width = '300px';
          iframe.style.height = '200px';
      }
      
      container.appendChild(iframe);
  });

  // Change the color of the active button
  const buttons = document.querySelectorAll('.pagination button');
  buttons.forEach(button => {
      if (parseInt(button.textContent) === pageNumber) {
          button.style.backgroundColor = '#0056b3';
      } else {
          button.style.backgroundColor = '#007BFF';
      }
  });

}

// Initialize with the first page
changePage(1);

// Handle window resize for video container
window.addEventListener('resize', () => {
  // Re-apply responsive video sizing when window is resized
  const container = document.getElementById('videoContainer');
  if (container && container.children.length > 0) {
    const iframes = container.querySelectorAll('iframe');
    const isMobile = window.innerWidth <= 854;
    const isSmallMobile = window.innerWidth <= 500;
    
    iframes.forEach(iframe => {
      if (isSmallMobile) {
        iframe.style.width = '100%';
        iframe.style.height = '150px';
      } else if (isMobile) {
        iframe.style.width = '100%';
        iframe.style.height = '200px';
      } else {
        iframe.style.width = '300px';
        iframe.style.height = '200px';
      }
    });
  }
});



  // -----------------------------------------------------------------textual testimonial--------------------------------------------------

  // smile-makeover-testimonials


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1, // Always show 1 slide at a time
  spaceBetween: 20,
  autoplay:{
    delay: 4000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  // Mobile-first responsive breakpoints
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 1,
      spaceBetween: 30,
    }
  }
});