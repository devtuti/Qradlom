
        // ================= SIDEBAR MENU LOGIC (NEW) =================
        const sidebarMenu = document.getElementById('sidebarMenu');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        const body = document.body;

        function toggleSidebar() {
            const isActive = sidebarMenu.classList.contains('active');
            
            if (isActive) {
                // Bağla
                sidebarMenu.classList.remove('active');
                sidebarOverlay.classList.remove('active');
                body.classList.remove('menu-open');
            } else {
                // Aç
                sidebarMenu.classList.add('active');
                sidebarOverlay.classList.add('active');
                body.classList.add('menu-open');
            }
        }

        // ESC düyməsi ilə bağlama
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
                toggleSidebar();
            }
        });

        // Gallery Filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });

        // Media Modal
        const mediaModal = new bootstrap.Modal(document.getElementById('mediaModal'));
        const modalImage = document.getElementById('modalImage');
        const modalVideo = document.getElementById('modalVideo');
        const modalTitle = document.getElementById('modalTitle');

        function openMedia(element) {
            const type = element.getAttribute('data-type');
            const src = element.getAttribute('data-src');
            const label = element.querySelector('.gallery-label').innerText;
            modalTitle.innerText = label;

            if (type === 'image') {
                modalImage.src = src;
                modalImage.style.display = 'block';
                modalVideo.style.display = 'none';
                modalVideo.pause();
            } else if (type === 'video') {
                modalVideo.querySelector('source').src = src;
                modalVideo.load();
                modalVideo.style.display = 'block';
                modalImage.style.display = 'none';
            }
            mediaModal.show();
        }

        document.getElementById('mediaModal').addEventListener('hidden.bs.modal', function () {
            modalVideo.pause();
            modalVideo.currentTime = 0;
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Active nav state
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-item:not(.call-btn)');
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                if (window.scrollY >= (section.offsetTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });

        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            if (Date.now() - lastTouchEnd <= 300) event.preventDefault();
            lastTouchEnd = Date.now();
        }, false);
  