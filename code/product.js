
    // --- JavaScript cho các tương tác trên trang ---

    // 1. Chức năng thay đổi hình ảnh chính khi click vào thumbnail
    function changeImage(thumbnailElement) {
        // Lấy đường dẫn ảnh lớn từ data attribute
        const newImageSrc = thumbnailElement.getAttribute('data-full-image');
        const mainImage = document.getElementById('main-image');

        // Đặt ảnh mới cho ảnh chính
        mainImage.src = newImageSrc;
        mainImage.alt = thumbnailElement.alt;

        // Xóa class 'active' khỏi tất cả thumbnails
        document.querySelectorAll('.thumbnail-img').forEach(img => {
            img.classList.remove('active');
        });

        // Thêm class 'active' cho thumbnail vừa click
        thumbnailElement.classList.add('active');
    }


    // 2. Chức năng Tăng/Giảm số lượng sản phẩm
    const quantityInput = document.getElementById('quantity');
    const decrementBtn = document.getElementById('decrement-btn');
    const incrementBtn = document.getElementById('increment-btn');

    decrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) { // Giới hạn tối thiểu là 1
            quantityInput.value = currentValue - 1;
        }
    });

    incrementBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        // Có thể thêm giới hạn tối đa ở đây nếu cần
        quantityInput.value = currentValue + 1;
    });


    // 3. Chức năng Modal tùy chỉnh (thay thế alert)
    const customModal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');

    function showModal(title, message) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        customModal.classList.remove('hidden');
        customModal.classList.add('flex');
    }

    function closeModal() {
        customModal.classList.add('hidden');
        customModal.classList.remove('flex');
    }

    // 4. Chức năng Thêm vào giỏ hàng
    function addToCart() {
        const quantity = quantityInput.value;
        showModal('Thêm vào Giỏ hàng', `Đã thêm ${quantity} sản phẩm 'Bánh Mousse Chocolate' vào giỏ hàng.`);
    }

    // 5. Chức năng Thêm/Xóa Yêu thích cho sản phẩm chính (đã được sửa)
    function addToWishlistMain(buttonElement) {
        const heartIcon = buttonElement.querySelector('#main-product-heart');
        if (heartIcon.classList.contains('far')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas', 'text-red-600');
            showModal('Yêu thích', `Sản phẩm 'Bánh Mousse Chocolate' đã được thêm vào danh sách yêu thích của bạn!`);
        } else {
            heartIcon.classList.remove('fas', 'text-red-600');
            heartIcon.classList.add('far');
            showModal('Yêu thích', `Đã xóa sản phẩm 'Bánh Mousse Chocolate' khỏi danh sách yêu thích.`);
        }
    }

// 6. CHỨC NĂNG MỚI: Thêm/Xóa Yêu thích từ thẻ sản phẩm (sản phẩm liên quan/đã xem)
    function addToWishlistFromCard(event, productName) {
        // NGĂN CHẶN LAN TRUYỀN (Event Bubbling): Tuyệt đối cần phải có
        event.stopPropagation(); 

        // NGĂN CHẶN HÀNH VI MẶC ĐỊNH (Link): Đảm bảo trình duyệt không nhảy link (thường không cần nếu dùng stopPropagation() nhưng an toàn hơn)
        event.preventDefault(); 
        
        // SỬA ĐỔI QUAN TRỌNG: Tìm thẻ <i> (icon) bên trong thẻ <span> (currentTarget)
        const heartIcon = event.currentTarget.querySelector('.heart-icon');
        
        if (heartIcon.classList.contains('far')) { // Nếu đang là tim rỗng
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas'); // Chuyển sang tim đặc
            showModal('Yêu thích', `Đã thêm sản phẩm '${productName}' vào danh sách yêu thích.`);
        } else { // Nếu đang là tim đặc
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far'); // Chuyển về tim rỗng
            showModal('Yêu thích', `Đã xóa sản phẩm '${productName}' khỏi danh sách yêu thích.`);
        }
    }

    // 7. Chức năng chuyển đổi Tab (Mô tả sản phẩm / Hướng dẫn mua hàng)
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const tabId = event.currentTarget.getAttribute('data-tab');

            // Xóa active khỏi tất cả buttons và nội dung
            document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.add('hidden'));

            // Thêm active cho button và hiển thị nội dung tương ứng
            event.currentTarget.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.remove('hidden');
        });
    });

    // 8. CHỨC NĂNG MỚI: Zoom ảnh chính theo vị trí chuột (Magnifier Effect)
    const mainImageWrapper = document.querySelector('.main-image-wrapper');
    const mainImage = document.getElementById('main-image');
    
    // Hệ số phóng to
    const zoomLevel = 1.6; // Ảnh sẽ phóng to 160%
    const transitionDuration = 0.2; // Độ mượt của hiệu ứng (0.2 giây)
    
    // Thiết lập transition ban đầu (giữ cho transition mượt mà)
    mainImage.style.transition = `transform ${transitionDuration}s ease-out`;

    if (mainImageWrapper) {
        // Khi di chuột vào khu vực ảnh
        mainImageWrapper.addEventListener('mousemove', (e) => {
            // Lấy kích thước và vị trí của container ảnh
            const rect = mainImageWrapper.getBoundingClientRect();
            
            // Tính toán vị trí chuột tương đối (từ 0 đến 1)
            // e.clientX - rect.left: khoảng cách từ mép trái container đến chuột
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            // Tính toán mức dịch chuyển cần thiết (tâm zoom)
            // Lấy trung tâm của khu vực phóng to
            const translateX = (x - 0.5) * -100 * (zoomLevel - 1); // Dịch chuyển theo X
            const translateY = (y - 0.5) * -100 * (zoomLevel - 1); // Dịch chuyển theo Y

            // Áp dụng phóng to và dịch chuyển
            // scale: phóng to ảnh.
            // translate: dịch chuyển ảnh để phần chuột đang trỏ vào nằm ở giữa khung nhìn.
            mainImage.style.transform = `scale(${zoomLevel}) translate(${translateX}%, ${translateY}%)`;
            mainImage.style.transformOrigin = 'center center'; // Đảm bảo tâm phóng to cố định
            mainImage.style.cursor = 'crosshair'; // Thay đổi con trỏ chuột
        });

        // Khi di chuột ra khỏi khu vực ảnh
        mainImageWrapper.addEventListener('mouseleave', () => {
            // Đưa ảnh về trạng thái ban đầu (scale 1, không dịch chuyển)
            mainImage.style.transform = 'scale(1)';
            mainImage.style.cursor = 'zoom-in';
        });
    }