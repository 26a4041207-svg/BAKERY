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