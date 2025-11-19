/* =========================
   CATEGORY ICONS
========================= */
const categories = [
  { id: 'nuong', label: 'Bánh nướng', icon: '🔥' },
  { id: 'kem', label: 'Bánh kem', icon: '🎂' },
  { id: 'ngot', label: 'Bánh ngọt', icon: '🍰' },
  { id: 'quy', label: 'Bánh quy', icon: '🍪' },
  { id: 'mousse', label: 'Bánh mousse', icon: '🥮' }
];

const categoryBar = document.getElementById("category-bar");
categories.forEach(cat => {
  const div = document.createElement("div");
  div.className = "cat-item";
  div.innerHTML = `<div class="icon">${cat.icon}</div><span>${cat.label}</span>`;
  categoryBar.appendChild(div);
});

/* =========================
   PRODUCT DATA
========================= */
const products = [
  {
    name: "Bánh Kem Dâu",
    price: 250000,
    category: "kem",
    status: "bestseller",
    images: [
      "./YOUR_IMG_1.png",
      "./YOUR_IMG_1B.png"
    ]
  },
  {
    name: "Bánh Quy Bơ",
    price: 80000,
    category: "quy",
    status: "new",
    images: [
      "./YOUR_IMG_2.png",
      "./YOUR_IMG_2B.png"
    ]
  },
  {
    name: "Bánh Mousse Socola",
    price: 320000,
    category: "mousse",
    status: "flash",
    images: [
      "./YOUR_IMG_3.png",
      "./YOUR_IMG_3B.png"
    ]
  }
];

/* =========================
   RENDER PRODUCT CARDS
========================= */
const productList = document.getElementById("product-list");

function renderCards(list) {
  productList.innerHTML = "";

  list.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    // Badge
    let badgeLabel = "";
    if (p.status === "flash") badgeLabel = "-15%";
    if (p.status === "new") badgeLabel = "New";
    if (p.status === "bestseller") badgeLabel = "Best Seller";

    // Card HTML
    card.innerHTML = `
      <div class="img-wrap">
        <img src="${p.images[0]}" class="main-img" />
        ${badgeLabel ? `<div class='badge'>${badgeLabel}</div>` : ""}
      </div>
      <div class="card-info">
        <h3>${p.name}</h3>
        <div class="price">${p.price.toLocaleString()}đ</div>
      </div>
    `;

    // Hover slideshow
    let current = 0;
    let interval;
    card.addEventListener("mouseenter", () => {
      interval = setInterval(() => {
        current = (current + 1) % p.images.length;
        card.querySelector(".main-img").src = p.images[current];
      }, 400);
    });
    card.addEventListener("mouseleave", () => {
      clearInterval(interval);
      current = 0;
      card.querySelector(".main-img").src = p.images[0];
    });

    productList.appendChild(card);
  });
}

renderCards(products);

/* =========================
   SORT BUTTONS
========================= */
const sortBar = document.getElementById("sort-bar");
const sorts = [
  { id: "az", label: "Tên A-Z" },
  { id: "za", label: "Tên Z-A" },
  { id: "new", label: "Hàng mới" },
  { id: "low", label: "Giá thấp - cao" },
  { id: "high", label: "Giá cao - thấp" }
];

sorts.forEach(btn => {
  const el = document.createElement("div");
  el.className = "sort-btn";
  el.textContent = btn.label;

  el.addEventListener("click", () => {
    let sorted = [...products];
    
    if (btn.id === "az") sorted.sort((a,b)=> a.name.localeCompare(b.name));
    if (btn.id === "za") sorted.sort((a,b)=> b.name.localeCompare(a.name));
    if (btn.id === "new") sorted = products.filter(p => p.status === "new");
    if (btn.id === "low") sorted.sort((a,b)=> a.price - b.price);
    if (btn.id === "high") sorted.sort((a,b)=> b.price - a.price);

    renderCards(sorted);
  });

  sortBar.appendChild(el);
});
