// Pure People Slider Logic - Corrected Version
document.addEventListener('DOMContentLoaded', function() {
    // Initialize people slider with retry mechanism
    if (typeof Swiper !== 'undefined') {
        initializePeopleSlider();
    } else {
        console.log('Swiper not available, waiting...');
        setTimeout(initializePeopleSlider, 1000);
    }
  });
  
  function initializePeopleSlider() {
    // Check if Swiper library is loaded
    if (typeof Swiper === 'undefined') {
        console.log('Swiper still not available, retrying...');
        setTimeout(initializePeopleSlider, 2000);
        return;
    }
    
    // Check if slider container exists
    const peopleSlider = document.querySelector('.people-slider-container');
    if (!peopleSlider) {
        console.log('People slider container not found');
        return;
    }
    
    console.log('Initializing people slider...');
    
    try {
        // Destroy any existing Swiper instance
        if (peopleSlider.swiper) {
            peopleSlider.swiper.destroy(true, true);
        }
        
        // Initialize new Swiper instance
        new Swiper('.people-slider-container', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            centeredSlides: false,
            
            // Autoplay settings
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
            
            // Pagination dots
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Responsive breakpoints - CORRECTED TO SHOW FEWER SLIDES
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
                    slidesPerView: 2,  // Shows 2 slides instead of 3
                    spaceBetween: 30
                },
                1200: {
                    slidesPerView: 3,  // Shows 3 slides instead of 4
                    spaceBetween: 30
                }
            },
            
            // Event callbacks
            on: {
                init: function() {
                    console.log('People Swiper initialized successfully');
                },
                error: function(error) {
                    console.error('Swiper initialization error:', error);
                }
            }
        });
        
    } catch (error) {
        console.error('Error creating people slider:', error);
    }
  }