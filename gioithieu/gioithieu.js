// hiệu ứng fade-in khi cuộn
const elements = document.querySelectorAll(".about-container p");

function fadeInScroll() {
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", fadeInScroll);
fadeInScroll();

/*
// Slider
let index = 0;
const slider = document.getElementById('reviewSlider');
const dotsContainer = document.getElementById('reviewDots');
const total = slider.children.length;

// Create dots
autoDots();
function autoDots() {
    for (let i = 0; i < total; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
}

function updateSlider() {
    slider.style.transform = `translateX(-${index * 100}%)`;
    const dots = document.querySelectorAll('.dot');
    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
}

function goToSlide(i) {
    index = i;
    updateSlider();
}

setInterval(() => {
    index = (index + 1) % total;
    updateSlider();
}, 4000);
*/
 // hiệu ứng fade-in cho review
const reviewItems = document.querySelectorAll(".review-item");

function fadeInReviews() {
    reviewItems.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            el.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", fadeInReviews);
fadeInReviews();