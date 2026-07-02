// ============================================================
// PAPADEN BAKMI · SCRIPT.JS (FULL UPDATED CODE)
// Premium Restaurant Website · Mixed Layout Edition
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ==========================================================
    // 1. LOADING SCREEN (DENGAN BACKUP ANTI-STUCK)
    // ==========================================================
    const loading = document.getElementById('loading');
    
    // Fungsi utama: Hilangkan loading saat semua aset selesai dimuat
    window.addEventListener('load', function () {
        if (loading && !loading.classList.contains('hide')) {
            loading.classList.add('hide');
        }
    });

    // BACKUP: Jika dalam 3 detik load belum selesai, paksa tutup loading-nya
    setTimeout(() => {
        if (loading && !loading.classList.contains('hide')) {
            loading.classList.add('hide');
            console.warn("Loading screen dipaksa tutup oleh backup timer.");
        }
    }, 3000); 

    // ==========================================================
    // 2. NAVBAR SCROLL & STICKY
    // ==========================================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (navbar) {
            if (currentScroll > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        lastScroll = currentScroll;

        // Back to Top Button Visibility
        const backBtn = document.getElementById('backToTop');
        if (backBtn) {
            if (currentScroll > 400) {
                backBtn.classList.add('show');
            } else {
                backBtn.classList.remove('show');
            }
        }
    });

    // ==========================================================
    // 3. MOBILE MENU (HAMBURGER TOGGLE)
    // ==========================================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
        });

        // Menutup menu otomatis saat salah satu link navigasi diklik
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }

    // ============================================================
    // DATA MENU
    // ============================================================
    const menuData = {
        bakmi: [
            { name: 'Bakmi Klasik', desc: 'Ayam Cincang', price: '18K', img: 'bakmiklasik.jpg' },
            { name: 'Charsiu', desc: 'Ayam Panggang Merah', price: '22K', img: 'bakmicharsiu.png' },
            { name: 'Ayam Panggang', desc: 'Ayam Panggang Kecap', price: '22K', img: 'bakmiayampanggang.jpg' },
            { name: 'Sapi Panggang', desc: 'Sliced Beef Panggang Kecap', price: '25K', img: 'bakmisapipanggang.jpg' }
        ],
        spesial: [
            {
                name: 'Bakmi Kuah Mala',
                desc: 'Gurih pedas dengan sensasi kuah mala.',
                variants: [
                    { label: 'Ayam Panggang', price: '25K' },
                    { label: 'Sapi Panggang', price: '28K' },
                    { label: 'Spesial PAH!', price: '33K' }
                ],
                img: 'bakmikuahmala.jpg'
            },
            {
                name: 'Bakmi Creamy',
                desc: 'Gurih creamy dengan bumbu kaya rasa.',
                variants: [
                    { label: 'Ayam Panggang', price: '27K' },
                    { label: 'Sapi Panggang', price: '30K' },
                    { label: 'Spesial PAH!', price: '35K' }
                ],
                img: 'bakmicreamy.jpg'
            },
            {
                name: 'Bakmi Creamy Mala',
                desc: 'Gurih creamy dengan sensasi kuah mala.',
                variants: [
                    { label: 'Ayam Panggang', price: '27K' },
                    { label: 'Sapi Panggang', price: '30K' },
                    { label: 'Spesial PAH!', price: '35K' }
                ],
                img: 'bakmicreamymala.jpg'
            }
        ],
        nasi: [
            { name: 'Ayam Charsiu', price: '22K', img: 'ayamcharsiu.jpg' },
            { name: 'Ayam Panggang', price: '22K', img: 'ayampanggang.jpg' },
            { name: 'Sapi Panggang', price: '25K', img: 'sapipanggang.png' },
            { name: 'Spesial PAH!', price: '29K', img: 'sapipanggang.png' }
        ],
        perlengkapan: [
            {
                name: 'Kountie',
                variants: [
                    { label: 'ORI', price: '17K' },
                    { label: 'Chili Oil', price: '19K' }
                ],
                img: 'kountie.jpg'
            },
            { name: 'Pangsit Goreng', price: '8K', img: 'pangsitgoreng.jpg' },
            {
                name: 'Wonton Kuah',
                variants: [
                    { label: 'ORI', price: '15K' },
                    { label: 'Chili Oil', price: '17K' }
                ],
                img: 'wontonkuah.jpg'
            },
            { name: 'Lumpiah Kulit Tahu', price: '18K', img: 'lumpiahkulit.jpg' }
        ],
        penutup: [
            {
                name: 'Roti Dingin',
                variants: [
                    { label: 'Strawberry', price: '17K' },
                    { label: 'Matcha', price: '17K' },
                    { label: 'Coklat', price: '17K' }
                ],
                img: 'rotidingin.jpg'
            },
            { name: 'Es Krim Roti Gelas', price: '17K', img: 'eskrimgelas.jpg' }
        ]
    };

    // ============================================================
    // FUNGSI RENDER MENU (DENGAN PEMISAH LAYOUT CUSTOM)
    // ============================================================
    function renderMenu(containerId, items, isSpecial = false) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        
        if (isSpecial) {
            container.className = 'menu-special-grid';
        }

        items.forEach(item => {
            // Logika pemisahan kelas untuk menu Penutup agar ukurannya tidak disamakan
            let useSpecialLayout = isSpecial;
            if (containerId === 'menuPenutup') {
                if (item.name === 'Roti Dingin') {
                    useSpecialLayout = true; // Roti Dingin disamakan dengan kelas bakmi spesial
                } else if (item.name === 'Es Krim Roti Gelas') {
                    useSpecialLayout = false; // Es Krim Gelas dipisahkan memakai kelas biasa
                }
            }

            const card = document.createElement('div');
            card.className = useSpecialLayout ? 'menu-card-special' : 'menu-card';

            const wrap = document.createElement('div');
            wrap.className = useSpecialLayout ? 'menu-card-special-img-wrap' : 'menu-card-img-wrap';
            
            if (item.name === 'Es Krim Roti Gelas') {
                wrap.classList.add('es-krim-gelas');
            }

            const img = document.createElement('img');
            img.className = useSpecialLayout ? 'menu-card-special-img' : 'menu-card-img';
            img.src = item.img || 'placeholder.jpg';
            img.alt = item.name;
            img.loading = 'lazy';
            wrap.appendChild(img);

            if (item.variants && item.variants.length > 0) {
                const badge = document.createElement('span');
                badge.className = 'menu-badge';
                badge.textContent = 'Spesial';
                wrap.appendChild(badge);
            }
            card.appendChild(wrap);

            const body = document.createElement('div');
            body.className = useSpecialLayout ? 'menu-card-special-body' : 'menu-card-body';

            const name = document.createElement('div');
            name.className = useSpecialLayout ? 'menu-card-special-name' : 'menu-card-name';
            name.textContent = item.name;
            body.appendChild(name);

            if (item.desc) {
                const desc = document.createElement('div');
                desc.className = useSpecialLayout ? 'menu-card-special-desc' : 'menu-card-desc';
                desc.textContent = item.desc;
                body.appendChild(desc);
            }

            if (item.price) {
                const priceWrap = document.createElement('div');
                priceWrap.className = 'menu-card-price-wrap';
                const price = document.createElement('span');
                price.className = 'menu-card-price';
                price.textContent = item.price;
                priceWrap.appendChild(price);
                body.appendChild(priceWrap);
            }

            if (item.variants) {
                const variantsDiv = document.createElement('div');
                variantsDiv.className = useSpecialLayout ? 'menu-card-special-variants' : 'menu-card-variants';
                item.variants.forEach(v => {
                    const span = document.createElement('span');
                    span.className = 'var-item';
                    span.innerHTML = `${v.label} <span class="var-price">${v.price}</span>`;
                    variantsDiv.appendChild(span);
                });
                body.appendChild(variantsDiv);
            }

            card.appendChild(body);
            container.appendChild(card);
        });
    }

    // Eksekusi render semua menu ke HTML
    renderMenu('menuBakmi', menuData.bakmi);
    renderMenu('menuSpesial', menuData.spesial, true); 
    renderMenu('menuNasi', menuData.nasi);
    renderMenu('menuPerlengkapan', menuData.perlengkapan);
    renderMenu('menuPenutup', menuData.penutup); // Dibiarkan fleksibel untuk mixed layout

    // ==========================================================
    // 4. BACK TO TOP BUTTON
    // ==========================================================
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==========================================================
    // 5. INTERSECTION OBSERVER (REVEAL ANIMATIONS)
    // ==========================================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealElements.forEach(el => observer.observe(el));

    // ==========================================================
    // 6. LIGHTBOX GALERI
    // ==========================================================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    document.querySelectorAll('.galeri-item').forEach(item => {
        item.addEventListener('click', function () {
            const imgSrc = this.getAttribute('data-image') || this.querySelector('img').src;
            if (lightboxImg) lightboxImg.src = imgSrc;
            if (lightbox) lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    function closeLightbox() {
        if (lightbox) lightbox.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === this) closeLightbox();
        });
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });

    // ==========================================================
    // 7. TESTIMONI SLIDER (AUTOPLAY)
    // ==========================================================
    const track = document.getElementById('testimoniTrack');
    const dotsContainer = document.getElementById('testimoniDots');
    
    if (track && dotsContainer) {
        const items = track.querySelectorAll('.testimoni-item');
        let currentIndex = 0;
        let intervalId = null;

        items.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.setAttribute('data-index', i);
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function () {
                goToSlide(parseInt(this.getAttribute('data-index')));
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('button');

        const goToSlide = (index) => {
            if (index < 0) index = items.length - 1;
            if (index >= items.length) index = 0;
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(d => d.classList.remove('active'));
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        };

        const nextSlide = () => {
            goToSlide(currentIndex + 1);
        };

        const resetInterval = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            intervalId = setInterval(nextSlide, 5000);
        };

        resetInterval();

        const slider = document.querySelector('.testimoni-slider');
        if (slider) {
            slider.addEventListener('mouseenter', function () {
                if (intervalId) {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            });
            slider.addEventListener('mouseleave', function () {
                resetInterval();
            });
        }
    }

    // ==========================================================
    // 8. ANCHOR SMOOTH SCROLL
    // ==========================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

    // ==========================================================
    // 9. LIGHT PARALLAX ON HERO SECTION
    // ==========================================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.15;
            const imageWrapper = hero.querySelector('.hero-img-wrapper');
            if (imageWrapper && scrolled < window.innerHeight) {
                imageWrapper.style.transform = `translateY(${rate * 0.08}px)`;
            }
        });
    }

    // ==========================================================
    // 10. MICRO INTERACTION: BUTTON RIPPLE EFFECT
    // ==========================================================
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                pointer-events: none;
                transform: scale(0);
                animation: rippleAnim 0.6s ease-out forwards;
            `;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });

    if (!document.getElementById('rippleStyle')) {
        const style = document.createElement('style');
        style.id = 'rippleStyle';
        style.textContent = `
            @keyframes rippleAnim {
                to { transform: scale(4); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ==========================================================
    // 11. IMAGE REVEAL LOADING
    // ==========================================================
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0.4';
            img.style.transition = 'opacity 0.6s ease';
        }
    });

    console.log('🍜 Papaden Bakmi · Website Premium Ready with Custom Penutup Layout!');
});
