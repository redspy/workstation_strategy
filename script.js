document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const pageIndicator = document.getElementById('page-indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const container = document.querySelector('.presentation-container');

    // Initialize
    showSlide(currentSlide);
    handleResize(); // Initial scaling

    // Event Listeners
    window.addEventListener('resize', handleResize);
    prevBtn.addEventListener('click', () => changeSlide(-1));
    nextBtn.addEventListener('click', () => changeSlide(1));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'Space') {
            changeSlide(1);
        } else if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        }
    });

    function showSlide(index) {
        // Hide all slides
        slides.forEach((slide) => {
            slide.classList.remove('active');
        });

        // Show target slide
        slides[index].classList.add('active');

        // Trigger animations for elements in the slide
        animateSlideContent(slides[index]);

        // Specific Logic: ROI Chart
        if (slides[index].querySelector('.chart-container')) {
            animateCharts(slides[index]);
        } else {
            resetCharts();
        }

        updateControls();
    }

    function changeSlide(direction) {
        const newIndex = currentSlide + direction;
        if (newIndex >= 0 && newIndex < slides.length) {
            currentSlide = newIndex;
            showSlide(currentSlide);
        }
    }

    function updateControls() {
        pageIndicator.textContent = `${currentSlide + 1} / ${slides.length}`;
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === slides.length - 1;
    }

    function handleResize() {
        const baseWidth = 1600;
        const baseHeight = 900;
        const padding = 0; // Removed margin to maximize screen usage

        const availableWidth = window.innerWidth - (padding * 2);
        const availableHeight = window.innerHeight - (padding * 2);

        const scaleX = availableWidth / baseWidth;
        const scaleY = availableHeight / baseHeight;

        // Scale to fit within the viewport while maintaining aspect ratio
        let scale = Math.min(scaleX, scaleY);

        // Optionally prevent upscaling if you don't want it to get pixellated on huge screens
        // scale = Math.min(scale, 1); 

        container.style.transform = `scale(${scale})`;
    }

    function animateSlideContent(slideElement) {
        // Staggered animation for list items and cards
        const animateElements = slideElement.querySelectorAll('li, .card, .qa-box');
        animateElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.animation = `simpleFadeIn 0.5s ease forwards ${i * 0.1 + 0.3}s`; // Delay start
        });
    }

    function animateCharts(slideElement) {
        setTimeout(() => {
            const bars = slideElement.querySelectorAll('.bar-fill');
            bars.forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 300); // Slight delay after slide transition
    }

    function resetCharts() {
        const allBars = document.querySelectorAll('.bar-fill');
        allBars.forEach(bar => {
            bar.style.width = '0%';
        });
    }
});
