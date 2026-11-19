document.addEventListener('DOMContentLoaded', function() {
    
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');
    const resetBtn = document.getElementById('resetEmailBtn');
    const scrollBtn = document.getElementById('scrollToTopBtn');

    // --- 1. XỬ LÝ FORM EMAIL ---
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        // Ẩn form, Hiện thông báo
        emailForm.style.display = 'none';
        successMessage.style.display = 'block';
    });

    // --- 2. XỬ LÝ NÚT RESET ---
    resetBtn.addEventListener('click', function() {
        // Ẩn thông báo, Hiện lại form
        successMessage.style.display = 'none';
        emailForm.style.display = 'block';
        // Reset dữ liệu và focus
        emailInput.value = '';
        emailInput.focus();
    });

    // --- 3. XỬ LÝ SCROLL TO TOP ---
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', function() {
        const duration = 1500; // 1.5 giây
        const start = window.scrollY;
        const startTime = performance.now();

        function scroll(time) {
            const timeElapsed = time - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Công thức Ease-Out Cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, start * (1 - ease));

            if (timeElapsed < duration) requestAnimationFrame(scroll);
        }
        requestAnimationFrame(scroll);
    });
});