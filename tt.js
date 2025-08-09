// ==========================================
// AUTO-PLAY FOR TESTIMONIALS-TEXT-SECTION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        const slidesTrack = document.getElementById('slidesTrack');
        const progressFill = document.getElementById('progressFill');
        const sliderDots = document.getElementById('sliderDots');
        
        if (!slidesTrack || !progressFill || !sliderDots) {
            console.log('Testimonials text section elements not found');
            return;
        }

        // Auto-play configuration
        let currentSlide = 0;
        const totalSlides = 5; // You have 5 slides
        const slideInterval = 2000; // 2 seconds per slide
        let autoplayInterval;

        // Update slide position and UI
        function updateSlider() {
            const translateX = -(currentSlide * (100 / totalSlides));
            slidesTrack.style.transform = `translateX(${translateX}%)`;
            
            // Update progress bar
            const progressWidth = ((currentSlide + 1) / totalSlides) * 100;
            progressFill.style.width = `${progressWidth}%`;
        }

        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }

        // Start autoplay
        function startAutoplay() {
            autoplayInterval = setInterval(nextSlide, slideInterval);
        }

        // Stop autoplay
        function stopAutoplay() {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
            }
        }

        // Restart autoplay
        function restartAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        // Pause autoplay on hover
        const testimonialSection = document.querySelector('.testimonials-text-section');
        if (testimonialSection) {
            testimonialSection.addEventListener('mouseenter', stopAutoplay);
            testimonialSection.addEventListener('mouseleave', startAutoplay);
        }

        // Initialize everything
        updateSlider();
        startAutoplay();

        console.log('Testimonials text section auto-play initialized successfully!');
        
    }, 800); // Wait 800ms for DOM to be fully ready
});