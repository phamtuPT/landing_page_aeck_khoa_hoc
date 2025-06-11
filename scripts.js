document.addEventListener('DOMContentLoaded', function() {
    // Khởi tạo menu mobile
    const mobileMenu = document.querySelector('.menu-toggle');
    const navigationLinks = document.querySelector('.nav-links');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            navigationLinks.classList.toggle('active');
            const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
            mobileMenu.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Hiệu ứng gõ chữ nâng cao cho hero section (lặp vô hạn)
    function initializeTypingEffect() {
        const heroText = document.querySelector('.typing-text');
        if (!heroText) return;
        const texts = [
            'Khám phá các khoá học chất lượng, phù hợp với mọi học sinh!',
            'Đăng ký ngay để nhận ưu đãi đặc biệt từ AECK!'
        ];
        let currentText = 0;
        let typingTimeout;

        function typeText(text, cb) {
            heroText.textContent = '';
            let i = 0;
            function typeChar() {
                if (i < text.length) {
                    heroText.textContent += text.charAt(i);
                    i++;
                    typingTimeout = setTimeout(typeChar, 40); // tốc độ gõ 40ms
                } else {
                    heroText.classList.add('typing-complete');
                    if (cb) setTimeout(cb, 2000);
                }
            }
            typeChar();
        }

        function eraseText(cb) {
            heroText.classList.remove('typing-complete');
            let text = heroText.textContent;
            function eraseChar() {
                if (text.length > 0) {
                    text = text.slice(0, -1);
                    heroText.textContent = text;
                    typingTimeout = setTimeout(eraseChar, 40); // tốc độ xoá 40ms
                } else {
                    if (cb) setTimeout(cb, 300);
                }
            }
            eraseChar();
        }

        function loopTyping() {
            typeText(texts[currentText], function() {
                eraseText(function() {
                    currentText = (currentText + 1) % texts.length;
                    loopTyping();
                });
            });
        }
        loopTyping();
    }
    initializeTypingEffect();

    // Scroll animation cho các phần tử
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.value-item, .course-card, .teacher-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        scrollObserver.observe(el);
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    function updateNavbar() {
        const scrollY = window.scrollY;
        if (scrollY > lastScrollY) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        if (scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        lastScrollY = scrollY;
    }
    window.addEventListener('scroll', updateNavbar);

    // Smooth scroll cho navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Đóng menu mobile nếu đang mở
                if (navigationLinks.classList.contains('active')) {
                    navigationLinks.classList.remove('active');
                    if (mobileMenu) mobileMenu.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});