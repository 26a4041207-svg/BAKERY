/*********************************
 * 1. LOAD SẢN PHẨM TỪ JSON
 *********************************/
const productGrid = document.getElementById("product-grid");
const category = productGrid.dataset.category;

let products = [];
let filteredProducts = [];
let currentPage = 1;
const itemsPerPage = 20;

fetch("product.json")
    .then(res => res.json())
    .then(data => {
        products = category === "all"
    ? data
    : data.filter(p => p.category === category);

        filteredProducts = [...products];
        renderProducts();
        initImageSlider();
        showPage(1);
    })
    .catch(err => console.error(err));


/*********************************
 * 2. RENDER SẢN PHẨM
 *********************************/
function renderProducts() {
    productGrid.innerHTML = "";

    filteredProducts.forEach(p => {
        const card = document.createElement("div");
        card.className = "product-card";

        // LABEL
        let labelHTML = "";
        if (Array.isArray(p.status)) {
            p.status.forEach((s, i) => {
                labelHTML += `<div class="product-label" style="top:${10 + i * 28}px">${s}</div>`;
            });
        } else if (p.status) {
            labelHTML = `<div class="product-label">${p.status}</div>`;
        }

        // IMAGES
        const imagesHTML = p.images
            .map((img, i) => `<img src="${img}" class="slide ${i === 0 ? "active" : ""}">`)
            .join("");

        card.innerHTML = `
        <a href="product2.html?id=${p.id}" class="product-link">
            <div class="product-image-wrapper">
                ${labelHTML}
                <div class="image-slider">
                    ${imagesHTML}
                    <div class="add-to-cart">ADD TO CART</div>
                </div>
            </div>

            <h4 class="product-name">${p.name}</h4>
            <p class="price">
                ${p.price.toLocaleString()}₫
            </p>
        `;

        productGrid.appendChild(card);
    });
}


/*********************************
 * 3. IMAGE SLIDER
 *********************************/
function initImageSlider() {
    document.querySelectorAll(".image-slider").forEach(slider => {
        let index = 0;
        const slides = slider.querySelectorAll(".slide");
        if (slides.length <= 1) return;

        let timer;

        slider.onmouseenter = () => {
            timer = setInterval(() => {
                slides[index].classList.remove("active");
                index = (index + 1) % slides.length;
                slides[index].classList.add("active");
            }, 1000);
        };

        slider.onmouseleave = () => {
            clearInterval(timer);
            slides.forEach(s => s.classList.remove("active"));
            slides[0].classList.add("active");
            index = 0;
        };
    });
}


/*********************************
 * 4. FILTER + SORT
 *********************************/
function parsePrice(str) {
    if (!str) return 0;
    str = str.toLowerCase().replace(/\s|đ|₫|,/g, "");
    let n = parseFloat(str);
    if (str.includes("triệu") || str.includes("tr")) n *= 1_000_000;
    if (str.includes("k")) n *= 1_000;
    return n;
}

function applyFilters() {
    const checked = document.querySelectorAll(".sidebar input[type='checkbox']:checked");

    let priceFilters = [];
    let statusFilters = [];

    checked.forEach(cb => {
        const text = cb.parentElement.textContent.trim().toLowerCase();

        // ===== LỌC TRẠNG THÁI (NEW / SALE / SOLD OUT...) =====
        if (!text.match(/\d/)) {
            statusFilters.push(text);
        }

        // ===== LỌC GIÁ =====
        const nums = text.match(/[\d\.]+/g)?.map(n => Number(n.replace(".", ""))) || [];

        if (text.includes("trên") && nums[0]) {
            priceFilters.push({ min: nums[0], max: Infinity });
        } 
        else if (nums.length === 2) {
            priceFilters.push({ min: nums[0], max: nums[1] });
        }
    });

    filteredProducts = products.filter(p => {
        // ---- GIÁ ----
        const matchPrice =
            priceFilters.length === 0 ||
            priceFilters.some(r => p.price >= r.min && p.price <= r.max);

        // ---- TRẠNG THÁI ----
        const productStatus = Array.isArray(p.status)
            ? p.status.map(s => s.toLowerCase())
            : [String(p.status || "").toLowerCase()];

        const matchStatus =
            statusFilters.length === 0 ||
            statusFilters.some(s => productStatus.includes(s));

        return matchPrice && matchStatus;
    });

    currentPage = 1;
    renderProducts();
    initImageSlider();
    showPage(1);
}


// Gán checkbox
document.querySelectorAll(".sidebar input").forEach(cb =>
    cb.addEventListener("change", applyFilters)
);


/*********************************
 * 5. SORT
 *********************************/
function sortProducts(type) {
    filteredProducts.sort((a, b) => {
        if (type === "az") return a.name.localeCompare(b.name);
        if (type === "za") return b.name.localeCompare(a.name);
        if (type === "price-low") return a.price - b.price;
        if (type === "price-high") return b.price - a.price;
    });

    renderProducts();
    initImageSlider();
    showPage(1);
}

document.querySelector(".sort-btn:nth-child(2)").onclick = () => sortProducts("az");
document.querySelector(".sort-btn:nth-child(3)").onclick = () => sortProducts("za");
document.querySelector(".sort-btn:nth-child(4)").onclick = () => sortProducts("price-low");
document.querySelector(".sort-btn:nth-child(5)").onclick = () => sortProducts("price-high");


/*********************************
 * 6. PAGINATION
 *********************************/
function showPage(page) {
    currentPage = page;

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    document.querySelectorAll(".product-card").forEach((card, i) => {
        card.style.display = i >= start && i < end ? "block" : "none";
    });

    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const container = document.getElementById("pagination");
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => showPage(i);
        container.appendChild(btn);
    }
}
