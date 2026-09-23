/* ============================================
   HUGO ACADEMIC STYLE - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Set current year in footer ---
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Career card toggle (expand/collapse on click) ---
    document.querySelectorAll('.career-logo').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.career-card');
            const detail = card.querySelector('.career-detail');
            const isOpen = card.classList.contains('is-open');

            // Close all other cards in same row
            const row = card.closest('.career-row');
            if (row) {
                row.querySelectorAll('.career-card.is-open').forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.classList.remove('is-open');
                        otherCard.querySelector('.career-detail').hidden = true;
                        otherCard.querySelector('.career-logo').setAttribute('aria-expanded', 'false');
                    }
                });
            }

            // Toggle this card
            if (isOpen) {
                card.classList.remove('is-open');
                detail.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
            } else {
                card.classList.add('is-open');
                detail.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // --- Research gallery lightbox ---
    const galleryLightbox = document.getElementById('gallery-lightbox');
    const galleryImage = document.getElementById('gallery-lightbox-image');
    const galleryCaption = document.getElementById('gallery-lightbox-caption');
    const galleryClose = document.querySelector('.gallery-lightbox-close');

    const closeGallery = () => {
        if (!galleryLightbox) return;
        galleryLightbox.hidden = true;
        document.body.classList.remove('gallery-open');
        if (galleryImage) galleryImage.src = '';
    };

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            if (!galleryLightbox || !galleryImage) return;
            galleryImage.src = item.dataset.gallerySrc;
            galleryImage.alt = item.dataset.galleryCaption || '';
            if (galleryCaption) galleryCaption.textContent = item.dataset.galleryCaption || '';
            galleryLightbox.hidden = false;
            document.body.classList.add('gallery-open');
            galleryClose?.focus();
        });
    });

    galleryClose?.addEventListener('click', closeGallery);
    galleryLightbox?.addEventListener('click', event => {
        if (event.target === galleryLightbox) closeGallery();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && galleryLightbox && !galleryLightbox.hidden) {
            closeGallery();
        }
    });

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 70; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            // Close mobile nav after click
            const navCollapse = document.getElementById('navbar-collapse-1');
            if (navCollapse) navCollapse.classList.remove('in');
        });
    });

    // --- Close mobile nav on outside click ---
    document.addEventListener('click', (e) => {
        const navbar = document.getElementById('navbar-main');
        const navCollapse = document.getElementById('navbar-collapse-1');
        if (navbar && navCollapse && !navbar.contains(e.target)) {
            navCollapse.classList.remove('in');
        }
    });

    // --- Active nav highlighting on scroll ---
    const sections = document.querySelectorAll('.home-section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        let currentId = '';

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                currentId = section.id;
            }
        });

        navLinks.forEach(link => {
            link.style.fontWeight = '400';
            if (link.getAttribute('href') === '#' + currentId) {
                link.style.fontWeight = '700';
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

});
