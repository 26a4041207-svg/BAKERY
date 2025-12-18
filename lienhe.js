document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".fade-in").classList.add("show");

    const form = document.getElementById("contactForm");
    const error = document.getElementById("error");

    form.addEventListener("submit", e => {
        e.preventDefault();

        const name = nameValue();
        const email = emailValue();
        const phone = phoneValue();
        const message = messageValue();

        if (name && email && phone && message) {
            alert("🎉 Gửi thông tin thành công! HONEYQUE sẽ liên hệ sớm.");
            form.reset();
        }
    });

    function nameValue() {
        const name = document.getElementById("name").value.trim();
        if (name.length < 2) return showError("Vui lòng nhập họ tên hợp lệ.");
        return true;
    }

    function emailValue() {
        const email = document.getElementById("email").value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return showError("Email không đúng định dạng.");
        return true;
    }

    function phoneValue() {
        const phone = document.getElementById("phone").value.trim();
        if (!/^[0-9]{9,11}$/.test(phone))
            return showError("Số điện thoại phải 9–11 chữ số.");
        return true;
    }

    function messageValue() {
        const message = document.getElementById("message").value.trim();
        if (message.length < 10)
            return showError("Nội dung phải ít nhất 10 ký tự.");
        return true;
    }

    function showError(msg) {
        error.textContent = msg;
        return false;
    }
});
