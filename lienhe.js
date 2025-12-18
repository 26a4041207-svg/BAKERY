document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".fade-in").classList.add("show");

    const form = document.getElementById("contactForm");

    const fields = {
        name: {
            input: document.getElementById("name"),
            rule: v => v !== "",
            msg: "Vui lòng nhập họ và tên."
        },
        email: {
            input: document.getElementById("email"),
            rule: v => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(v),
            msg: "Email phải có định dạng @gmail.com."
        },
        phone: {
            input: document.getElementById("phone"),
            rule: v => /^[0-9]{10,}$/.test(v),
            msg: "Số điện thoại phải có ít nhất 10 chữ số."
        },
        message: {
            input: document.getElementById("message"),
            rule: v => v !== "",
            msg: "Vui lòng nhập nội dung liên hệ."
        }
    };

    Object.values(fields).forEach(f => {
        f.input.addEventListener("input", () => validate(f));
        f.input.addEventListener("blur", () => validate(f));
    });

    form.addEventListener("submit", e => {
        e.preventDefault();
        let valid = true;

        Object.values(fields).forEach(f => {
            if (!validate(f)) valid = false;
        });

        if (valid) {
            alert("🎉 Gửi thông tin thành công! HONEYQUE sẽ liên hệ sớm.");
            form.reset();
            resetStyle();
        }
    });

    function validate(field) {
        const value = field.input.value.trim();
        const error = field.input.nextElementSibling;

        if (!field.rule(value)) {
            error.textContent = field.msg;
            field.input.classList.add("error-border");
            field.input.classList.remove("success-border");
            return false;
        }

        error.textContent = "";
        field.input.classList.remove("error-border");
        field.input.classList.add("success-border");
        return true;
    }

    function resetStyle() {
        Object.values(fields).forEach(f => {
            f.input.classList.remove("error-border", "success-border");
        });
    }
});
