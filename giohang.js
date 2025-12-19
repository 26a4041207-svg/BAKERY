let orderSuccess = false;
(() => {
  const CART_KEY = "gio_hang";
  let products = [];
  let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

  /* =============================
     LOAD DATA
  ============================== */

  fetch("product.json")
    .then(res => res.json())
    .then(data => {
      products = data;
    });

  fetch("giohang.html")
    .then(res => res.text())
    .then(html => {
      document.body.insertAdjacentHTML("beforeend", html);
      bindBaseEvents();
      renderCart();
    });

  /* =============================
     BASE EVENTS
  ============================== */

function bindBaseEvents() {
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", closeCart);

  document
    .querySelector(".cart-checkout")
    .addEventListener("click", showPaymentPopup);

  document
    .getElementById("payment-close-btn")
    .addEventListener("click", closePaymentPopup);

  document
    .getElementById("payment-overlay")
    .addEventListener("click", closePaymentPopup);
}
function showPaymentPopup() {
  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống.");
    return;
  }

  // đảm bảo form đã tồn tại
  const nameInput = document.getElementById("customer-name");
  if (!nameInput) {
    alert("Vui lòng mở giỏ hàng trước khi thanh toán.");
    return;
  }

  if (!validateCheckoutInfo()) return;

  orderSuccess = true;

  document.getElementById("payment-popup").classList.add("active");
  document.getElementById("payment-overlay").classList.add("active");
}



function closePaymentPopup() {
  document.getElementById("payment-popup").classList.remove("active");
  document.getElementById("payment-overlay").classList.remove("active");
  if (orderSuccess) {
    // 1. XÓA GIỎ HÀNG
    cart = [];
    localStorage.removeItem(CART_KEY);
    renderCart();

    // 2. ĐÓNG DRAWER
    closeCart();

    // 3. RESET TRẠNG THÁI
    orderSuccess = false;

    // 4. CHUYỂN VỀ TRANG SẢN PHẨM
    window.location.href = "sanpham.html";
  }
}

  function openCart() {
    document.getElementById("cart-drawer")?.classList.add("active");
    document.getElementById("cart-overlay")?.classList.add("active");
  }

  function closeCart() {
    document.getElementById("cart-drawer")?.classList.remove("active");
    document.getElementById("cart-overlay")?.classList.remove("active");
  }

  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }

  function validateCheckoutInfo() {
  const nameEl = document.getElementById("customer-name");
  const phoneEl = document.getElementById("customer-phone");
  const emailEl = document.getElementById("customer-email");
  const addressEl = document.getElementById("customer-address");

  if (!nameEl || !phoneEl || !emailEl || !addressEl) {
    alert("Form thông tin chưa sẵn sàng. Vui lòng mở giỏ hàng trước.");
    return false;
  }

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();
  const email = emailEl.value.trim();
  const address = addressEl.value.trim();

  if (!name || !phone || !email || !address) {
    alert("Vui lòng nhập đầy đủ thông tin liên hệ trước khi thanh toán.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Email không hợp lệ.");
    return false;
  }

  return true;
}

  /* =============================
     CART LOGIC
  ============================== */

  function addToCart(id) {
    id = String(id); // ÉP ID LUÔN LÀ STRING

    const item = cart.find(i => i.id === id);

    if (item) {
      item.qty++;
    } else {
      const product = products.find(p => p.id === id);
      if (!product) return;

      cart.push({
        ...product,
        qty: 1
      });
    }

    saveCart();
    renderCart();
    openCart();
  }

  function changeQty(id, delta) {
    id = String(id); // ÉP ID LUÔN LÀ STRING

    const item = cart.find(i => i.id === id);
    if (!item) return;

    item.qty += delta;

    if (item.qty <= 0) {
      cart = cart.filter(i => i.id !== id);
    }

    saveCart();
    renderCart();
  }

  /* =============================
     RENDER CART
  ============================== */

  function renderCart() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.images?.[0] || ""}" alt="${item.name}">
      <div class="cart-item-info">
        <div>${item.name}</div>

        <div class="cart-item-price">
          ${item.price.toLocaleString()}₫
        </div>

        <div class="cart-qty">
          <button class="minus">-</button>
          <span>${item.qty}</span>
          <button class="plus">+</button>
        </div>

        <button class="cart-remove">Xóa</button>
      </div>
    `;

    // ➕ ➖
    div.querySelector(".plus").onclick = () => {
      item.qty++;
      saveCart();
      renderCart();
    };

    div.querySelector(".minus").onclick = () => {
      item.qty--;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== item.id);
      }
      saveCart();
      renderCart();
    };

    // ❌ XÓA
    div.querySelector(".cart-remove").onclick = () => {
      cart = cart.filter(i => i.id !== item.id);
      saveCart();
      renderCart();
    };

    container.appendChild(div);
  });

  document.getElementById("cart-total-price").innerText =
    total.toLocaleString() + "₫";
}


  /* =============================
     EXPOSE API
  ============================== */

  window.GioHangAdd = addToCart;
})();
