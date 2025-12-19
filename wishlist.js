(function () {
  const W_KEY = 'wishlist_ids';
  let products = [];
  let wishlist = JSON.parse(localStorage.getItem(W_KEY)) || [];

  // Load products list
  fetch('product.json')
    .then(r => r.json())
    .then(data => { products = data; })
    .catch(() => { console.warn('Không thể tải product.json cho wishlist'); });

  // Inject wishlist html into page
  fetch('wishlist.html')
    .then(r => r.text())
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
      bindBaseEvents();
      bindOpenWishlistButtons();
      renderWishlist();
    })
    .catch(err => console.warn('Không thể nạp wishlist.html', err));

  function save() { localStorage.setItem(W_KEY, JSON.stringify(wishlist)); }

  function bindBaseEvents() {
    const overlay = document.getElementById('wishlist-overlay');
    overlay?.addEventListener('click', close);

    document.getElementById('wishlist-close')?.addEventListener('click', close);
    document.getElementById('wishlist-clear')?.addEventListener('click', clearAll);
    document.getElementById('wishlist-add-all-cart')?.addEventListener('click', addAllToCart);
  }

  function bindOpenWishlistButtons() {
    document.querySelectorAll('#open-wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => { e.preventDefault(); open(); });
    });
  }

  function open() {
    document.getElementById('wishlist-drawer')?.classList.add('active');
    document.getElementById('wishlist-overlay')?.classList.add('active');
  }

  function close() {
    document.getElementById('wishlist-drawer')?.classList.remove('active');
    document.getElementById('wishlist-overlay')?.classList.remove('active');
  }

  function addAllToCart() {
    if (!window.GioHangAdd) {
      alert('Chưa nạp module giỏ hàng.');
      return;
    }
    wishlist.slice().forEach(id => {
      window.GioHangAdd(id, 1);
    });
    // Optionally clear wishlist after adding
    wishlist = [];
    save();
    renderWishlist();
    close();
  }

  function clearAll() {
    if (!confirm('Xóa toàn bộ sản phẩm yêu thích?')) return;
    wishlist = [];
    save();
    renderWishlist();
  }

  function renderWishlist() {
    const container = document.getElementById('wishlist-items');
    if (!container) return;

    container.innerHTML = '';
    if (!wishlist || wishlist.length === 0) {
      container.innerHTML = '<div class="empty-msg">Bạn chưa có sản phẩm yêu thích nào.</div>';
      return;
    }

    wishlist.forEach(id => {
      const p = products.find(x => x.id === id) || { name: 'Sản phẩm không tồn tại', price: 0, images: [] };

      const div = document.createElement('div');
      div.className = 'wishlist-item';
      div.innerHTML = `
        <img src="${(p.images && p.images[0]) ? encodeURI(p.images[0]) : 'https://placehold.co/200x200/ddd/fff?text=No+Image'}" alt="${p.name}">
        <div class="meta">
          <div class="name">${p.name}</div>
          <div class="price">${(p.price || 0).toLocaleString()}₫</div>
        </div>
        <div class="wishlist-actions">
          <button class="wishlist-add-to-cart">Thêm vào giỏ</button>
          <button class="wishlist-remove">Xóa</button>
        </div>
      `;

      div.querySelector('.wishlist-remove').addEventListener('click', () => {
        remove(id);
      });

      div.querySelector('.wishlist-add-to-cart').addEventListener('click', () => {
        if (window.GioHangAdd) window.GioHangAdd(id, 1);
        remove(id);
      });

      container.appendChild(div);
    });
  }

  function add(id) {
    id = String(id);
    if (!wishlist.includes(id)) {
      wishlist.push(id);
      save();
      renderWishlist();
      open();
    }
  }

  function remove(id) {
    id = String(id);
    wishlist = wishlist.filter(x => x !== id);
    save();
    renderWishlist();
  }

  // Expose API
  window.WishlistAdd = add;
  window.WishlistRemove = remove;
  window.WishlistOpen = open;
  window.WishlistClose = close;
})();