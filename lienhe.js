document.addEventListener("DOMContentLoaded", () => {

    setTimeout(() => {
        document.querySelector(".fade-in").classList.add("show");
    }, 100);

    const form = document.getElementById("contactForm");

    const fields = {
        name: {
            el: document.getElementById("name"),
            rule: v => v !== "",
            msg: "Vui lòng nhập họ và tên."
        },
        email: {
            el: document.getElementById("email"),
            rule: v => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(v),
            msg: "Email phải có định dạng @gmail.com."
        },
        phone: {
            el: document.getElementById("phone"),
            rule: v => /^[0-9]{10,}$/.test(v),
            msg: "Số điện thoại phải có ít nhất 10 chữ số."
        },
        message: {
            el: document.getElementById("message"),
            rule: v => v !== "",
            msg: "Vui lòng nhập nội dung."
        }
    };

    Object.values(fields).forEach(f => {
        f.el.addEventListener("input", () => validate(f));
        f.el.addEventListener("blur", () => validate(f));
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        let ok = true;

        Object.values(fields).forEach(f => {
            if (!validate(f)) ok = false;
        });

        if (ok) {
            alert("🎉 Gửi thông tin thành công! HONEYQUE sẽ liên hệ sớm.");
            form.reset();
            reset();
        }
    });

    function validate(field) {
        const value = field.el.value.trim();
        const error = field.el.nextElementSibling;

        if (!field.rule(value)) {
            error.textContent = field.msg;
            field.el.classList.add("error-border");
            field.el.classList.remove("success-border");
            return false;
        }

        error.textContent = "";
        field.el.classList.remove("error-border");
        field.el.classList.add("success-border");
        return true;
    }

    function reset() {
        Object.values(fields).forEach(f => {
            f.el.classList.remove("error-border", "success-border");
        });
    }
});
