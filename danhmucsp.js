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
// HÀM ĐỔI CHUỖI GIÁ → SỐ
function parsePrice(text) {
    if (!text) return 0;

    text = text.toLowerCase()
               .replace(/đ|₫|,/g, "")
               .replace(/\s+/g, "")
               .trim();

    // hỗ trợ "1 triệu"
    if (text.includes("triệu")) {
        const n = Number(text.replace("triệu", "").trim());
        return n * 1_000_000;
    }

    // hỗ trợ "1tr"
    if (text.endsWith("tr")) {
        const n = Number(text.replace("tr", ""));
        return n * 1_000_000;
    }

    // hỗ trợ "500k"
    if (text.endsWith("k")) {
        const n = Number(text.replace("k", ""));
        return n * 1000;
    }

    // chuẩn 50.000 -> 50000
    return Number(text.replace(/\./g, ""));
}


// HÀM LẤY GIÁ TỪ SẢN PHẨM
function extractPrice(text) {
    const match = text.match(/[\d\.]+/);
    if (!match) return 0;
    return Number(match[0].replace(/\./g, ""));
}


// ==========================================
//       HÀM LỌC CHUẨN — SẠCH & GỌN
// ==========================================
function applyFilters() {
    const checked = document.querySelectorAll(".sidebar input[type='checkbox']:checked");

    let priceFilters = [];

    checked.forEach(cb => {
        const label = cb.parentElement.textContent.trim().toLowerCase();

        // chỉ cần có số = lọc theo giá
        if (!label.match(/\d/)) return;

        let nums = [];

        // bắt số: "50.000", "1 triệu", "1tr"
        const raw = label.match(/[\d\.]+(?:\s*triệu|tr|k)?/g);

        if (raw) {
            nums = raw.map(v => parsePrice(v));
        }

        if (label.includes("trên")) {
            priceFilters.push({ min: nums[0], max: Infinity });
        }
        else if (nums.length >= 2) {
            priceFilters.push({ min: nums[0], max: nums[1] });
        }
    });

    // Lọc sản phẩm
    const products = document.querySelectorAll(".product-card");

    products.forEach(p => {
        const price = extractPrice(p.querySelector(".price").textContent);

        const matchPrice =
            priceFilters.length === 0 ||
            priceFilters.some(f => price >= f.min && price <= f.max);

        p.style.display = matchPrice ? "block" : "none";
    });
}


// GÁN SỰ KIỆN CHECKBOX
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

/***************************************************
 * PAGINATION – chia sản phẩm thành nhiều trang
 ***************************************************/

// Số sản phẩm tối đa mỗi trang
const ITEMS_PER_PAGE = 20;

// Lấy danh sách sản phẩm
let allProducts = Array.from(document.querySelectorAll(".product-card"));
let filteredProducts = [...allProducts]; // mảng sản phẩm sau khi lọc
let currentPage = 1;


// Hàm hiển thị sản phẩm theo trang
// --- renderPage: ẩn tất cả rồi hiển thị các phần tử của filteredProducts theo trang ---
function renderPage(page) {
    currentPage = page;

    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    // 1) Ẩn tất cả product trước
    allProducts.forEach(p => {
        p.style.display = "none";
    });

    // 2) Hiển thị các product thuộc filteredProducts trong khoảng page
    filteredProducts.forEach((p, index) => {
        if (index >= start && index < end) {
            p.style.display = "block";
        }
    });

    renderPagination();
}


// --- renderPagination: không đổi nhiều, nhưng đảm bảo totalPages >= 1 khi cần ---
function renderPagination() {
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    const container = document.getElementById("pagination");

    container.innerHTML = "";

    if (currentPage > 1) {
        container.innerHTML += `<button class="page-btn" onclick="renderPage(${currentPage - 1})">«</button>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        container.innerHTML += `
            <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="renderPage(${i})">
                ${i}
            </button>
        `;
    }

    if (currentPage < totalPages) {
        container.innerHTML += `<button class="page-btn" onclick="renderPage(${currentPage + 1})">»</button>`;
    }
}


// --- applyFilters: chỉ cập nhật filteredProducts, không set style trực tiếp ---
function applyFilters() {
    const checked = document.querySelectorAll(".sidebar input[type='checkbox']:checked");

    let priceFilters = [];
    let statusFilters = [];

    checked.forEach(cb => {
        const label = cb.parentElement.textContent.trim().toLowerCase();

        if (!label.match(/\d/)) {
            statusFilters.push(label);
        }

        let nums = [];
        const raw = label.match(/[\d\.]+(?:\s*triệu|tr|k)?/g);
        if (raw) nums = raw.map(v => parsePrice(v));

        if (label.includes("trên")) {
            priceFilters.push({ min: nums[0], max: Infinity });
        }
        else if (nums.length >= 2) {
            priceFilters.push({ min: nums[0], max: nums[1] });
        }
    });

    // Cập nhật filteredProducts dựa trên điều kiện
    filteredProducts = allProducts.filter(p => {
        const price = extractPrice(p.querySelector(".price").textContent);
        const statusEl = p.querySelector(".product-label");
        const statusText = statusEl ? statusEl.textContent.trim().toLowerCase() : "";

        const matchPrice =
            priceFilters.length === 0 || priceFilters.some(f => price >= f.min && price <= f.max);

        const matchStatus =
            statusFilters.length === 0 || statusFilters.some(s => statusText.includes(s));

        return matchPrice && matchStatus;
    });

    // Điều chỉnh currentPage nếu vượt quá totalPages (nếu không có item thì đặt 1)
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;
    if (currentPage > totalPages) currentPage = totalPages;

    // Render trang hiện tại
    renderPage(currentPage);
}



