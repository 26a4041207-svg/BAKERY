

    // 1. Chức năng thay đổi hình ảnh chính khi click vào thumbnail
    function changeImage(thumbnailElement) {
        const newImageSrc = thumbnailElement.getAttribute('data-full-image');
        const mainImage = document.getElementById('main-image');
        // set encoded URL to avoid issues with spaces / diacritics
        mainImage.src = encodeURI(newImageSrc);
        mainImage.alt = thumbnailElement.alt;
        document.querySelectorAll('.thumbnail-img').forEach(img => {
            img.classList.remove('active');
        });
        thumbnailElement.classList.add('active');
    }


    // 2. Chức năng Tăng/Giảm số lượng sản phẩm
const quantityInput = document.getElementById('quantity');
const decrementBtn = document.getElementById('decrement-btn');
const incrementBtn = document.getElementById('increment-btn');

if (quantityInput && decrementBtn && incrementBtn) {
    decrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value) || 1;
        if (currentValue > 1) quantityInput.value = currentValue - 1;
    });

    incrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value) || 1;
        quantityInput.value = currentValue + 1;
    });
}


    // 4. Chức năng Thêm vào giỏ hàng
    function addToCart() {
    if (!currentProduct) return;
    const quantity = Number(quantityInput.value) || 1;
    GioHangAdd(currentProduct.id, quantity);
}


    // 5. Chức năng Thêm/Xóa Yêu thích cho sản phẩm chính
    function addToWishlistMain(buttonElement) {
        if (!currentProduct) { showModal('Lỗi', 'Chưa có sản phẩm nào được tải.'); return; }
        const heartIcon = buttonElement.querySelector('#main-product-heart');
        const id = currentProduct.id;


        if (heartIcon.classList.contains('far')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas', 'text-red-600');
            if (window.WishlistAdd) window.WishlistAdd(id);

        } else {
            heartIcon.classList.remove('fas', 'text-red-600');
            heartIcon.classList.add('far');
            if (window.WishlistRemove) window.WishlistRemove(id);
        }
    }

// 7. Chức năng chuyển đổi Tab 
function setupTabSwitching() {
    const allTabContents = document.querySelectorAll(".tab-pane");
    const defaultTab = document.querySelector(".tab-button.active");
    
    allTabContents.forEach(content => {
        content.classList.add("hidden");
    });
    
    if (defaultTab) {
        const defaultTabId = defaultTab.getAttribute("data-tab");
        const defaultContent = document.getElementById(`${defaultTabId}-content`);
        if (defaultContent) {
            defaultContent.classList.remove("hidden");
        }
    }

    document.querySelectorAll(".tab-button").forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-tab");

            document.querySelectorAll(".tab-button").forEach(btn => {
                btn.classList.remove("active"); 
            });

            document.querySelectorAll(".tab-pane").forEach(content => {
                content.classList.add("hidden"); 
            });

            button.classList.add("active");
            
            const targetContent = document.getElementById(`${target}-content`);
            if (targetContent) {
                targetContent.classList.remove("hidden");
            }
        });
    });
}

// 6. Chức năng Thêm/Xóa Yêu thích từ thẻ sản phẩm
function addToWishlistFromCard(event, productName) {
    event.stopPropagation(); 
    event.preventDefault(); 
    
    // Lấy ID sản phẩm từ thuộc tính href của thẻ <a> gần nhất
    const card = event.currentTarget.closest('.product-card');
    const anchor = card.parentElement; 
    let id = null;
    // lấy id từ URL
    if (anchor && anchor.href) {
        const url = new URL(anchor.href);
        id = url.searchParams.get('id');
    }

    if (!id) return;

    // Gọi API từ wishlist.js
    if (window.toggleWishlist) {
        window.toggleWishlist(id);
        
        // Cập nhật giao diện trái tim ngay lập tức
        const heartIcon = event.currentTarget.querySelector('.heart-icon');
        if (heartIcon) {
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
        }
    } else {
        // Fallback nếu chưa nạp kịp wishlist.js
        if (window.WishlistAdd) window.WishlistAdd(id);
        if (window.WishlistOpen) window.WishlistOpen();
    }
}

    // 8. Chức năng Zoom ảnh chính (Magnifier Effect)
    const mainImageWrapper = document.querySelector('.main-image-wrapper');
    const mainImage = document.getElementById('main-image');
    
    const zoomLevel = 1.6;  // Mức độ zoom
    const transitionDuration = 0.2;  // Thời gian chuyển đổi (giây)
    
    mainImage.style.transition = `transform ${transitionDuration}s ease-out`;  

    if (mainImageWrapper) {
        
        mainImageWrapper.addEventListener('mousemove', (e) => {
            const rect = mainImageWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            const translateX = (x - 0.5) * -100 * (zoomLevel - 1); 
            const translateY = (y - 0.5) * -100 * (zoomLevel - 1); 

            mainImage.style.transform = `scale(${zoomLevel}) translate(${translateX}%, ${translateY}%)`;
            mainImage.style.transformOrigin = 'center center'; 
            mainImage.style.cursor = 'crosshair'; 
        });
        // Reset khi chuột rời khỏi ảnh
        mainImageWrapper.addEventListener('mouseleave', () => {
            mainImage.style.transform = 'scale(1)';
            mainImage.style.cursor = 'zoom-in';
        });
    }

// 9. Load sản phẩm khi trang được tải và gắn sự kiện cho nút giỏ hàng + wishlist

document.addEventListener('DOMContentLoaded', () => {
    setupTabSwitching();
    // GỌI HÀM LẤY ID TỪ URL
    const productId = getProductIdFromUrl();
    loadProductDetails(productId);

    // mở giỏ hàng khi nhấn nút
    const cartBtn = document.getElementById('open-cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.GioHangOpen) window.GioHangOpen();
            else window.location.href = 'giohang.html';
        });
    }

    // mở wishlist khi nhấn nút
    const wishBtn = document.getElementById('open-wishlist-btn');
    if (wishBtn) {
        wishBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.WishlistOpen) window.WishlistOpen();
            else window.location.href = 'wishlist.html';
        });
    }
});

// biến toàn cục lưu trữ sản phẩm hiện tại
let currentProduct = null;
// biến toàn cục lưu trữ tất cả sản phẩm từ product.json
let allProducts = [];

// lấy product id từ URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || null;
}

// Định dạng giá tiền với dấu chấm ngăn cách hàng nghìn và thêm ký hiệu ₫
function formatPrice(value) {
    if (typeof value !== 'number') return value;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫';
}

// Tải chi tiết sản phẩm từ product.json 
async function loadProductDetails(productId) {
    try {
        let products = null;

        // Try fetching product.json
        try {
            const res = await fetch('./product.json');
            if (!res.ok) throw new Error('Không thể tải product.json');
            products = await res.json();
        } catch (fetchErr) {
            // fetch failed (often when file://). Try inline fallback in the HTML
            const inline = document.getElementById('product-data');
            if (inline && inline.textContent.trim()) {
                try {
                    products = JSON.parse(inline.textContent);
                } catch (e) {
                    throw new Error('Không thể phân tích product-data inline: ' + e.message);
                }
            } else {
                throw fetchErr; // let outer catch handle it
            }
        }

        // If no productId provided, fallback to first product
        let product = null;
        if (productId) {
            product = products.find(p => p.id === productId);
        }
        if (!product) product = products[0];

        // store current product globally
        currentProduct = product;

        // keep a copy of the full product list for lookups (used by recently viewed)
        allProducts = products;

        // gắn dữ liệu sản phẩm vào các phần tử HTML nếu tồn tại
        const titleEl = document.getElementById('product-name');
        const priceEl = document.getElementById('product-price');
        const categoryEl = document.getElementById('product-category');
        const breadcrumbName = document.getElementById('breadcrumb-product-name');
        const descriptionText = document.getElementById('description-text');
        const ingredientsList = document.getElementById('ingredients-list');
        const nutriCalories = document.getElementById('nutri-calories');
        const nutriFat = document.getElementById('nutri-fat');
        const nutriCarb = document.getElementById('nutri-carb');
        const nutriProtein = document.getElementById('nutri-protein');
        const mainImg = document.getElementById('main-image');
        const thumbnailContainer = document.getElementById('thumbnail-container');

        if (titleEl) titleEl.textContent = product.name;
        if (priceEl) priceEl.textContent = formatPrice(product.price);
        if (categoryEl) categoryEl.textContent = product.category || '';
        if (breadcrumbName) breadcrumbName.textContent = product.name;

        // cập nhật mô tả và thành phần
        if (descriptionText) {
            descriptionText.textContent = product.description || 'Không có mô tả cho sản phẩm này.';
        }
        if (ingredientsList) {
            ingredientsList.innerHTML = '';
            if (product.ingredients && Array.isArray(product.ingredients) && product.ingredients.length > 0) {
                product.ingredients.forEach(ing => {
                    const li = document.createElement('li');
                    li.textContent = ing;
                    ingredientsList.appendChild(li);
                });
            } else {
                const li = document.createElement('li');
                li.textContent = 'Thành phần chưa được cập nhật.';
                ingredientsList.appendChild(li);
            }
        }
        // cập nhật thông tin dinh dưỡng
        if (nutriCalories) nutriCalories.textContent = (product.nutrition && product.nutrition.calories) ? `${product.nutrition.calories} Kcal` : 'N/A';
        if (nutriFat) nutriFat.textContent = (product.nutrition && product.nutrition.fat) ? `${product.nutrition.fat} g` : 'N/A';
        if (nutriCarb) nutriCarb.textContent = (product.nutrition && product.nutrition.carb) ? `${product.nutrition.carb} g` : 'N/A';
        if (nutriProtein) nutriProtein.textContent = (product.nutrition && product.nutrition.protein) ? `${product.nutrition.protein} g` : 'N/A';

        if (mainImg && product.images && product.images.length > 0) {
            // đặt encoded URL để tránh lỗi với dấu cách  
            mainImg.src = encodeURI(product.images[0]);
            mainImg.alt = product.name;
        }

        // xây dựng thumbnails
        if (thumbnailContainer) {
            thumbnailContainer.innerHTML = '';
            (product.images || []).forEach((imgSrc, idx) => {
                const wrapper = document.createElement('div');
                wrapper.className = 'col-3 px-1';

                const img = document.createElement('img');
                img.src = encodeURI(imgSrc);
                img.alt = `${product.name} - ${idx + 1}`;
                img.className = 'thumbnail-img rounded-md' + (idx === 0 ? ' active' : '');
                img.setAttribute('data-full-image', imgSrc);
                img.onclick = function () { changeImage(this); };

                wrapper.appendChild(img);
                thumbnailContainer.appendChild(wrapper);
            });
        }

        // sản phẩm liên quan dựa trên cùng danh mục và chỉ hiển thị tối đa 10 sản phẩm
        const related = products.filter(p => p.category === product.category && p.id !== product.id);
        renderRelatedProducts(related, 10);

        // sản phẩm đã xem gần đây
        const previousProductId = sessionStorage.getItem('currentProductId');
        if (previousProductId && previousProductId !== product.id) {
            addToRecentlyViewed(previousProductId, 10);
        }

        // Render the recently viewed list (show up to 10 items)
        renderRecentlyViewed(10);

        // Save current product id into sessionStorage so next navigation will consider it the "previous"
        sessionStorage.setItem('currentProductId', product.id);

        // đồng bộ trạng thái wishlist của sản phẩm chính
        try {
            const list = JSON.parse(localStorage.getItem('wishlist_ids') || '[]');
            const heart = document.getElementById('main-product-heart');
            if (heart) {
                if (list.includes(product.id)) {
                    heart.classList.remove('far');
                    heart.classList.add('fas', 'text-red-600');
                } else {
                    heart.classList.remove('fas', 'text-red-600');
                    heart.classList.add('far');
                }
            }
        } catch (e) { /* ignore */ }

    } catch (err) {
        console.error('loadProductDetails error', err);
        const isFile = window.location.protocol === 'file:';
        const advice = isFile ? '\nLưu ý: Bạn đang mở trang bằng file:// — fetch() có thể bị chặn. Chạy server cục bộ (ví dụ: Python http.server hoặc Live Server trong VSCode) hoặc đảm bảo <script id="product-data"> có chứa JSON.' : '';
        showModal('Lỗi tải dữ liệu', 'Không thể tải dữ liệu sản phẩm. Vui lòng thử lại sau.' + advice);
    }
}

// 10. hiển thị sản phẩm liên quan
// items -> mảng sản phẩm liên quan 
// limit -> số sản phẩm tối đa để hiển thị
function renderRelatedProducts(items, limit = 10) {
    const container = document.getElementById('related-products');
    if (!container) return;

    container.innerHTML = '';
    if (!items || items.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-gray-600">Không có sản phẩm liên quan.</div>';
        return;
    }

    // Only render up to `limit` items (user can change the limit when calling this function)
    const visible = Array.isArray(items) ? items.slice(0, limit) : [];

    visible.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col';

        // clickable product card
        const anchor = document.createElement('a');
        anchor.href = `product2.html?id=${encodeURIComponent(item.id)}`;
        anchor.className = 'product-link';

        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden p-3 relative h-full';

        const wishlistSpan = document.createElement('span');
        wishlistSpan.className = 'absolute top-2 right-3 cursor-pointer';
        wishlistSpan.onclick = (ev) => addToWishlistFromCard(ev, item.name);
        const heartIcon = document.createElement('i');
        // Reflect current wishlist state on the card's heart
        try {
            const list = JSON.parse(localStorage.getItem('wishlist_ids') || '[]');
            heartIcon.className = list.includes(item.id) ? 'fas fa-heart text-red-500 heart-icon' : 'far fa-heart text-red-500 heart-icon';
        } catch (e) {
            heartIcon.className = 'far fa-heart text-red-500 heart-icon';
        }
        wishlistSpan.appendChild(heartIcon);

        const imgEl = document.createElement('img');
        imgEl.className = 'w-full h-40 object-cover rounded-md mb-2';
        imgEl.alt = item.name;
        imgEl.src = item.images && item.images.length ? encodeURI(item.images[0]) : 'https://placehold.co/200x200/ddd/fff?text=No+Image';

        const nameP = document.createElement('p');
        nameP.className = 'text-sm text-gray-600 truncate mb-1';
        nameP.textContent = item.name;

        const priceP = document.createElement('p');
        priceP.className = 'text-base font-bold text-red-600';
        priceP.textContent = formatPrice(item.price);

        card.appendChild(wishlistSpan);
        card.appendChild(imgEl);
        card.appendChild(nameP);
        card.appendChild(priceP);

        anchor.appendChild(card);
        col.appendChild(anchor);
        container.appendChild(col);
    });
}

// 11. sản phẩm đã xem gần đây (recently viewed) lưu trong localStorage dưới dạng mảng id
const RECENTLY_KEY = 'recentlyViewedIds';

function getRecentlyViewedIds() {
    try {
        const raw = localStorage.getItem(RECENTLY_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        console.warn('Invalid recently viewed data in localStorage, clearing it.', e);
        localStorage.removeItem(RECENTLY_KEY);
        return [];
    }
}

function saveRecentlyViewedIds(arr) {
    localStorage.setItem(RECENTLY_KEY, JSON.stringify(arr));
}

// Add an id to recently viewed (FIFO capped at max). Duplicate ids are moved to the newest position.
function addToRecentlyViewed(productId, max = 10) {
    if (!productId) return;
    // ensure allProducts has the product; if not, skip
    if (!allProducts || !allProducts.find(p => p.id === productId)) return;

    const list = getRecentlyViewedIds();
    const existingIndex = list.indexOf(productId);
    if (existingIndex !== -1) {
        // remove existing so we can re-add as newest
        list.splice(existingIndex, 1);
    }

    list.push(productId); // newest at end

    // Remove oldest items if we exceeded max
    while (list.length > max) list.shift();

    saveRecentlyViewedIds(list);
    renderRecentlyViewed(max);
}

// Render the recently viewed list into #recently-viewed
function renderRecentlyViewed(limit = 10) {
    const container = document.getElementById('recently-viewed');
    if (!container) return;

    container.innerHTML = '';

    const ids = getRecentlyViewedIds();
    if (!ids || ids.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-gray-600">Bạn chưa xem sản phẩm nào.</div>';
        return;
    }

    // We store oldest-first in storage; show newest-first to users
    const visibleIds = ids.slice(-limit).reverse();

    visibleIds.forEach(id => {
        const item = allProducts.find(p => p.id === id);
        if (!item) return; // skip when product not found

        const col = document.createElement('div');
        col.className = 'col';

        const anchor = document.createElement('a');
        anchor.href = `product2.html?id=${encodeURIComponent(item.id)}`;
        anchor.className = 'product-link';

        const card = document.createElement('div');
        card.className = 'product-card bg-white rounded-lg shadow-md overflow-hidden p-3 relative h-full';

        const wishlistSpan = document.createElement('span');
        wishlistSpan.className = 'absolute top-2 right-3 cursor-pointer';
        wishlistSpan.onclick = (ev) => addToWishlistFromCard(ev, item.name);
        const heartIcon = document.createElement('i');
        // Reflect current wishlist state on the card's heart
        try {
            const list = JSON.parse(localStorage.getItem('wishlist_ids') || '[]');
            heartIcon.className = list.includes(item.id) ? 'fas fa-heart text-red-500 heart-icon' : 'far fa-heart text-red-500 heart-icon';
        } catch (e) {
            heartIcon.className = 'far fa-heart text-red-500 heart-icon';
        }
        wishlistSpan.appendChild(heartIcon);

        const imgEl = document.createElement('img');
        imgEl.className = 'w-full h-40 object-cover rounded-md mb-2';
        imgEl.alt = item.name;
        imgEl.src = item.images && item.images.length ? encodeURI(item.images[0]) : 'https://placehold.co/200x200/ddd/fff?text=No+Image';

        const nameP = document.createElement('p');
        nameP.className = 'text-sm text-gray-600 truncate mb-1';
        nameP.textContent = item.name;

        const priceP = document.createElement('p');
        priceP.className = 'text-base font-bold text-red-600';
        priceP.textContent = formatPrice(item.price);

        card.appendChild(wishlistSpan);
        card.appendChild(imgEl);
        card.appendChild(nameP);
        card.appendChild(priceP);

        anchor.appendChild(card);
        col.appendChild(anchor);
        container.appendChild(col);
    });
}
function getProductId() {
  return new URLSearchParams(window.location.search).get("id");
}
