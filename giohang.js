(() => {
  const CART_KEY = "gio_hang";
  let products = [];
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  /* LOAD DATA */
  fetch("product.json")
    .then(r => r.json())
    .then(d => products = d);

  /* BASE EVENTS */
  document.addEventListener("click", e => {
    if (e.target.id === "cart-icon") openCart();
    if (e.target.id === "cart-close" || e.target.id === "cart-overlay") closeCart();
  });

  function openCart() {
    document.getElementById("cart-drawer").classList.add("active");
    document.getElementById("cart-overlay").classList.add("active");
    renderCart();
  }

  function closeCart() {
    document.getElementById("cart-drawer").classList.remove("active");
    document.getElementById("cart-overlay").classList.remove("active");
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function updateBadge() {
    document.getElementById("cart-count").innerText =
      cart.reduce((s, i) => s + i.qty, 0);
  }

  /* ADD TO CART */
  window.GioHangAdd = function (id) {
    id = String(id);
    const item = cart.find(i => i.id === id);

    if (item) item.qty++;
    else {
      const p = products.find(p => p.id === id);
      if (!p) return;
      cart.push({ ...p, qty: 1 });
    }

    saveCart();
    updateBadge();
  };

  /* RENDER CART */
  function renderCart() {
    const box = document.getElementById("cart-items");
    box.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.qty;

      const el = document.createElement("div");
      el.className = "cart-item";
      el.innerHTML = `
        <img src="${item.images?.[0] || ""}">
        <div class="cart-item-info">
          <div>${item.name}</div>
          <div class="cart-item-price">${item.price.toLocaleString()}₫</div>
          <div class="cart-qty">
            <button class="minus">-</button>
            <span>${item.qty}</span>
            <button class="plus">+</button>
          </div>
          <button class="cart-remove">Xóa</button>
        </div>
      `;

      el.querySelector(".plus").onclick = () => { item.qty++; saveCart(); renderCart(); };
      el.querySelector(".minus").onclick = () => {
        item.qty--;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== item.id);
        saveCart(); renderCart();
      };
      el.querySelector(".cart-remove").onclick = () => {
        cart = cart.filter(i => i.id !== item.id);
        saveCart(); renderCart();
      };

      box.appendChild(el);
    });

    document.getElementById("cart-total-price").innerText =
      total.toLocaleString() + "₫";

    updateBadge();
  }

  updateBadge();
})();
