       // --- 1. KHỞI TẠO BIẾN DỮ LIỆU ---
        let cakes = []; // Biến chứa dữ liệu bánh sẽ được tải từ JSON

        // --- 2. HÀM TẢI DỮ LIỆU TỪ FILE PRODUCT.JSON ---
        fetch('product.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Không thể tải file product.json");
                }
                return response.json();
            })
            .then(data => {
                cakes = data; // Gán dữ liệu tải được vào biến cakes
                console.log("Đã tải dữ liệu sản phẩm thành công:", cakes);
            })
            .catch(error => {
                console.error("Lỗi:", error);
            });

        // --- HÀM HELPER: FORMAT TIỀN TỆ ---
        function formatCurrency(price) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
        }

        // --- 3. XỬ LÝ SCROLL ĐỔI MÀU HEADER ---
        const header = document.getElementById('mainHeader');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });

        // --- 4. XỬ LÝ TÌM KIẾM THÔNG MINH ---
        const searchInput = document.getElementById('searchInput');
        const btnSearch = document.getElementById('btnSearchAction');
        const suggestionsBox = document.getElementById('searchSuggestions');

        // Hàm chuyển hướng
        function goToSearch(keyword) {
            window.location.href = `search-results.html?q=${encodeURIComponent(keyword)}`;
        }

        // Sự kiện khi gõ phím
        searchInput.addEventListener('input', function() {
            if (cakes.length === 0) return;

            const keyword = this.value.trim().toLowerCase();
            suggestionsBox.innerHTML = ''; 

            if (!keyword) {
                suggestionsBox.style.display = 'none';
                return;
            }

            const matches = cakes.filter(cake => {
                return cake.name.toLowerCase().includes(keyword);
            });

            suggestionsBox.style.display = 'block';
            
            if (matches.length > 0) {
                matches.forEach(cake => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    let imgUrl = (cake.images && cake.images.length > 0) ? cake.images[0] : 'https://via.placeholder.com/50';

                    div.innerHTML = `
                        <img src="${imgUrl}" alt="${cake.name}" onerror="this.src='https://via.placeholder.com/50'">
                        <div class="suggestion-info">
                            <h4>${cake.name}</h4>
                            <p>${formatCurrency(cake.price)}</p>
                        </div>
                    `;

                    div.addEventListener('click', () => {
                        window.location.href = `product2.html?id=${cake.id}`;
                    });
                    
                    suggestionsBox.appendChild(div);
                });
            } else {
                suggestionsBox.innerHTML = '<div class="no-result">Không tìm thấy sản phẩm nào</div>';
            }
        });

        // btnSearch.addEventListener('click', () => {
        //     if (searchInput.value.trim()) goToSearch(searchInput.value.trim());
        // });
        
        // searchInput.addEventListener('keypress', (e) => {
        //     if (e.key === 'Enter' && searchInput.value.trim()) goToSearch(searchInput.value.trim());
        // });

        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.style.display = 'none';
            }
        });

        // --- 5. XỬ LÝ TÀI KHOẢN & ĐĂNG NHẬP/ĐĂNG XUẤT ---
        document.addEventListener('DOMContentLoaded', () => {
            const currentUserJson = localStorage.getItem('currentUser');
            const userBtn = document.getElementById('user-icon-btn');
            const actionContainer = document.querySelector('.user-cart-actions');
            
            if (currentUserJson && userBtn) {
                const sessionUser = JSON.parse(currentUserJson);
                
                if (sessionUser.isLoggedIn) {
                    userBtn.innerHTML = '<i class="fa-solid fa-user-check"></i>'; 
                    userBtn.style.color = '#5d4037';
                    userBtn.title = `Xin chào, ${sessionUser.fullname}`;
                    userBtn.href = "#"; 

                    const onlineDot = document.createElement('div');
                    onlineDot.style.cssText = `position:absolute; top:-2px; right:-2px; width:10px; height:10px; background:#4CAF50; border-radius:50%; border:2px solid #fff; z-index:10; pointer-events:none;`;
                    userBtn.appendChild(onlineDot);

                    // --- LẤY THÔNG TIN EMAIL TỪ LISTACCOUNTS ---
                    const listAccounts = JSON.parse(localStorage.getItem('listAccounts')) || [];
                    const userAccount = listAccounts.find(acc => acc.username === sessionUser.username) || sessionUser;
                    const displayEmail = userAccount.email ? userAccount.email : 'Chưa cập nhật email';

                    const dropdownHTML = `
                        <div class="user-dropdown" id="userDropdown">
                            <div class="user-header">
                                <h3>${sessionUser.fullname}</h3>
                                <p>@${sessionUser.username}</p>
                                <p class="user-email">${displayEmail}</p> </div>
                            <ul class="user-menu-list">
                                <li><a href="#" onclick="openEditModal(event)"><i class="fa-solid fa-user-pen"></i> Chỉnh sửa thông tin</a></li>
                                <li><a href="#" onclick="openChangePassModal(event)"><i class="fa-solid fa-lock"></i> Đổi mật khẩu</a></li>
                            </ul>
                            <button class="logout-btn" onclick="handleLogout()">
                                <i class="fa-solid fa-right-from-bracket"></i> Đăng xuất
                            </button>
                        </div>
                    `;
                    actionContainer.insertAdjacentHTML('beforeend', dropdownHTML);

                    userBtn.addEventListener('click', (e) => {
                        e.preventDefault(); 
                        document.getElementById('userDropdown').classList.toggle('active');
                    });

                    document.addEventListener('click', (e) => {
                        const menu = document.getElementById('userDropdown');
                        if (menu && !userBtn.contains(e.target) && !menu.contains(e.target)) {
                            menu.classList.remove('active');
                        }
                    });
                }
            }
        });

        // --- CÁC HÀM MODAL & UTILS ---
        function showMsg(elementId, text, type) {
            const el = document.getElementById(elementId);
            el.innerText = text; el.style.display = 'block';
            el.className = 'msg-box ' + (type === 'error' ? 'msg-error' : 'msg-success');
        }

        function openEditModal(e) {
            e.preventDefault();
            document.getElementById('userDropdown').classList.remove('active');
            const sessionUser = JSON.parse(localStorage.getItem('currentUser'));
            const listAccounts = JSON.parse(localStorage.getItem('listAccounts')) || [];
            const userAccount = listAccounts.find(acc => acc.username === sessionUser.username);

            document.getElementById('edit-username').value = userAccount.username;
            document.getElementById('edit-fullname').value = userAccount.fullname;
            document.getElementById('edit-email').value = userAccount.email || ""; 
            document.getElementById('edit-msg').style.display = 'none';
            document.getElementById('modal-edit-info').classList.add('open');
        }

        function saveUserInfo() {
            const newName = document.getElementById('edit-fullname').value.trim();
            const newEmail = document.getElementById('edit-email').value.trim();
            const sessionUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if(!newName || !newEmail) { showMsg('edit-msg', 'Vui lòng nhập đầy đủ thông tin', 'error'); return; }

            let listAccounts = JSON.parse(localStorage.getItem('listAccounts')) || [];
            const index = listAccounts.findIndex(acc => acc.username === sessionUser.username);
            
            if(index !== -1) {
                const isEmailExist = listAccounts.some((acc, idx) => acc.email === newEmail && idx !== index);
                if (isEmailExist) { showMsg('edit-msg', 'Email đã được sử dụng!', 'error'); return; }

                listAccounts[index].fullname = newName;
                listAccounts[index].email = newEmail;
                localStorage.setItem('listAccounts', JSON.stringify(listAccounts));
                
                // Cập nhật cả sessionUser
                sessionUser.fullname = newName;
                sessionUser.email = newEmail; 
                localStorage.setItem('currentUser', JSON.stringify(sessionUser));
                
                showMsg('edit-msg', 'Cập nhật thành công! Đang tải lại...', 'success');
                setTimeout(() => window.location.reload(), 1000);
            }
        }

        function openChangePassModal(e) {
            e.preventDefault();
            document.getElementById('userDropdown').classList.remove('active');
            document.getElementById('old-pass').value = '';
            document.getElementById('new-pass').value = '';
            document.getElementById('confirm-pass').value = '';
            document.getElementById('pass-msg').style.display = 'none';
            document.getElementById('modal-change-pass').classList.add('open');
        }

        function saveNewPassword() {
            const oldPass = document.getElementById('old-pass').value;
            const newPass = document.getElementById('new-pass').value;
            const confirmPass = document.getElementById('confirm-pass').value;
            const sessionUser = JSON.parse(localStorage.getItem('currentUser'));
            let listAccounts = JSON.parse(localStorage.getItem('listAccounts')) || [];
            const userAccount = listAccounts.find(acc => acc.username === sessionUser.username);

            if (!oldPass || !newPass || !confirmPass) { showMsg('pass-msg', 'Nhập đầy đủ thông tin', 'error'); return; }
            if (userAccount.password !== oldPass) { showMsg('pass-msg', 'Mật khẩu cũ sai!', 'error'); return; }
            if (newPass.length < 6) { showMsg('pass-msg', 'Mật khẩu quá ngắn', 'error'); return; }
            if (newPass !== confirmPass) { showMsg('pass-msg', 'Mật khẩu không khớp!', 'error'); return; }

            const index = listAccounts.findIndex(acc => acc.username === sessionUser.username);
            listAccounts[index].password = newPass;
            localStorage.setItem('listAccounts', JSON.stringify(listAccounts));
            showMsg('pass-msg', 'Đổi mật khẩu thành công!', 'success');
            setTimeout(() => closeModal('modal-change-pass'), 1500);
        }

        function closeModal(modalId) { document.getElementById(modalId).classList.remove('open'); }
        function handleLogout() { localStorage.removeItem('currentUser'); window.location.reload(); }

        const menuToggle = document.getElementById('mobile-menu-btn');
        const navbar = document.getElementById('navbar');
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });

// ---6. JS CHO HERO SLIDER ---
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        let slideInterval;

        // --- HÀM HIỂN THỊ SLIDE ---
        function showSlide(index) {
            // Xử lý vòng lặp slide
            if (index >= totalSlides) currentSlide = 0;
            else if (index < 0) currentSlide = totalSlides - 1;
            else currentSlide = index;

            // Reset class active
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Set active cho slide và dot hiện tại
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // --- HÀM TỰ ĐỘNG CHẠY ---
        function startAutoSlide() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000); // 5000ms = 5 giây
        }

        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }

        // --- SỰ KIỆN CLICK ---
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        });

        // Click vào dấu chấm (Hàm global để gọi từ HTML)
        window.goToSlide = function(index) {
            showSlide(index);
            resetAutoSlide();
        }

        // Khởi chạy
        startAutoSlide();
        showSlide(currentSlide);
  