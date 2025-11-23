document.querySelectorAll('.image-slider').forEach(slider => {
    let index = 0;
    const images = slider.querySelectorAll('.slide');
    images[0].classList.add('active');

    let intervalId = null;

    function startSlide() {
        intervalId = setInterval(() => {
            images[index].classList.remove('active');
            index = (index + 1) % images.length;
            images[index].classList.add('active');
        }, 1000);
    }
    function stopSlide() {
        clearInterval(intervalId);

        // quay về ảnh đầu tiên
        images.forEach(img => img.classList.remove("active"));
        index = 0;
        images[0].classList.add("active");
    }

    slider.addEventListener("mouseenter", startSlide);
    slider.addEventListener("mouseleave", stopSlide);
});

window.addEventListener("scroll", function(){
    const h = document.getElementById("header");
    window.scrollY > 80 ? h.classList.add("scrolled") : h.classList.remove("scrolled");
});
