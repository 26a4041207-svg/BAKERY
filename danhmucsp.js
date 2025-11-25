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

window.addEventListener("scroll", function () {
    const h = document.getElementById("header");
    window.scrollY > 80 ? h.classList.add("scrolled") : h.classList.remove("scrolled");
});

/*******************************************************
 * 2. MULTI FILTER: LỌC NHIỀU MỨC GIÁ + NHIỀU TRẠNG THÁI
 *******************************************************/

// Hàm lấy giá mới (giá đầu tiên)
function extractPrice(text) {
    if (!text) return 0;
    const m = text.match(/[\d\.]+/); 
    if (!m) return 0;
    return Number(m[0].replace(/\./g, ""));
}


// Hàm áp dụng bộ lọc
function applyFilters() {
    const checked = document.querySelectorAll(".sidebar input[type='checkbox']:checked");

    let priceFilters = [];
    let statusFilters = [];

    checked.forEach(cb => {
        const label = cb.parentElement.textContent.trim();

        // Nếu là lọc theo giá (vì có ký tự ₫)
        if (label.includes("₫") || label.match(/\d/)) {

    // lấy tất cả số trong label
    let nums = label.match(/[\d\.]+/g) || [];

    // chuyển số + dấu chấm thành số nguyên
    nums = nums.map(n => Number(n.replace(/\./g, "")));

    if (label.includes("trên")) {
        // Trên X
        priceFilters.push({ min: nums[0], max: Infinity });
    }
    else if (label.includes("dưới")) {
        // Dưới X
        priceFilters.push({ min: 0, max: nums[0] });
    }
    else if (nums.length >= 2) {
        // X - Y
        priceFilters.push({ min: nums[0], max: nums[1] });
    }
}

        // Nếu là lọc theo trạng thái (New, Sale, Flash Sale,...)
        else {
            statusFilters.push(label.toLowerCase());
        }
    });

    const products = document.querySelectorAll(".product-card");

    products.forEach(p => {
        const priceText = p.querySelector(".price").textContent;
        const price = extractPrice(priceText);

        const statusLabels = [...p.querySelectorAll(".product-label")];
        const statusList = statusLabels.map(l => l.textContent.trim().toLowerCase());


        // true nếu không chọn gì OR nằm trong ít nhất 1 khoảng giá
        let matchPrice = (priceFilters.length === 0) ||
            priceFilters.some(f => price >= f.min && price <= f.max);

        // true nếu không chọn trạng thái OR sản phẩm có 1 trạng thái được chọn
        let matchStatus =
            statusFilters.length === 0 ||
            statusFilters.some(s => statusList.includes(s));


        // Kết hợp tất cả điều kiện
        p.style.display = (matchPrice && matchStatus) ? "block" : "none";
    });
}

// Lắng nghe sự kiện tick checkbox
document.querySelectorAll(".sidebar input[type='checkbox']")
    .forEach(cb => cb.addEventListener("change", applyFilters));




/*******************************************************
 * 3. SORT BUTTON (Tên A-Z, Giá thấp → cao,…)
 *******************************************************/

function sortProducts(type) {
    let grid = document.querySelector(".product-grid");
    let items = Array.from(grid.querySelectorAll(".product-card"));

    items.sort((a, b) => {
        let nameA = a.querySelector(".product-name").textContent.trim();
        let nameB = b.querySelector(".product-name").textContent.trim();

        let priceA = extractPrice(a.querySelector(".price").textContent);
        let priceB = extractPrice(b.querySelector(".price").textContent);

        switch (type) {
            case "az": return nameA.localeCompare(nameB);
            case "za": return nameB.localeCompare(nameA);
            case "price-low": return priceA - priceB;
            case "price-high": return priceB - priceA;
        }
    });

    // render lại
    items.forEach(i => grid.appendChild(i));
}

// Gán sự kiện cho nút sort
document.querySelector(".sort-btn:nth-child(2)").onclick = () => sortProducts("az");
document.querySelector(".sort-btn:nth-child(3)").onclick = () => sortProducts("za");
document.querySelector(".sort-btn:nth-child(4)").onclick = () => sortProducts("price-low");
document.querySelector(".sort-btn:nth-child(5)").onclick = () => sortProducts("price-high");

