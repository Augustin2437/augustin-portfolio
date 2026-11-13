/**
 * Augustin Nayagam - Portfolio Script
 * Neon cyber-gaming client script with interactive mouse pointer spotlight,
 * dynamic 3D card tilt & spotlight reaction, catalog filters, and secure lightbox.
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ========== SAFE STORAGE UTILITY & INITIAL THEME RESTORATION ========== */
    const safeGetStorage = (key) => {
        try {
            return localStorage.getItem(key);
        } catch {
            return null;
        }
    };
    const safeSetStorage = (key, value) => {
        try {
            localStorage.setItem(key, value);
        } catch {
            // Storage access restricted; fail gracefully
        }
    };

    if (safeGetStorage('theme-mode') === 'light') {
        document.body.classList.add('light-theme');
    }

    /* ========== PAGE-SPECIFIC STATIC HIGH-DEFINITION VECTOR BACKGROUND ARTWORK ========== */
    // Determine active page identifier
    let page = 'index';
    const rawPath = window.location.pathname.split('/').pop().toLowerCase();
    if (rawPath.includes('about')) page = 'about';
    else if (rawPath.includes('skills')) page = 'skills';
    else if (rawPath.includes('projects')) page = 'projects';
    else if (rawPath.includes('experience')) page = 'experience';
    else if (rawPath.includes('education')) page = 'education';
    else if (rawPath.includes('certificates')) page = 'certificates';
    else if (rawPath.includes('contact')) page = 'contact';
    else page = 'index';

    // Ensure body has the active page class
    if (!document.body.classList.contains(`page-${page}`)) {
        document.body.classList.add(`page-${page}`);
    }

    // Mathematical geometric polygon point generators
    const makePentagon = (cx, cy, r) => {
        const pts = [];
        for (let i = 0; i < 5; i++) {
            const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
            pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
        }
        return pts.join(' ');
    };

    const makeDiamond = (cx, cy, w, h) => {
        return `${cx},${cy - h / 2} ${cx + w / 2},${cy} ${cx},${cy + h / 2} ${cx - w / 2},${cy}`;
    };

    const getPageArtwork = (pageName) => {
        switch (pageName) {
            case 'about':
                return `
                <svg class="bg-art-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <!-- SHAPE 1: FULL CIRCLE 1 (Vivid Emerald Green) -->
                    <g class="full-shape">
                        <circle cx="200" cy="310" r="130" fill="#10b981" stroke="#10b981" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="200" cy="310" r="95" stroke="#10b981" class="shape-inner-accent"/>
                        <circle cx="200" cy="310" r="8" fill="#10b981"/>
                    </g>

                    <!-- SHAPE 2: FULL RECTANGLE (Aquamarine Teal, angled) -->
                    <g class="full-shape" transform="rotate(8 1125 180)">
                        <rect x="980" y="110" width="290" height="140" rx="20" fill="#0d9488" stroke="#0d9488" class="shape-fill-glass shape-stroke-bold"/>
                        <rect x="1000" y="130" width="250" height="100" rx="12" stroke="#0d9488" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 3: FULL CIRCLE 2 (Electric Lime) -->
                    <g class="full-shape">
                        <circle cx="1260" cy="620" r="105" fill="#84cc16" stroke="#84cc16" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="1260" cy="620" r="75" stroke="#84cc16" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 4: FULL PENTAGON (Cyber Mint) -->
                    <g class="full-shape">
                        <polygon points="${makePentagon(890, 420, 100)}" fill="#00f5a0" stroke="#00f5a0" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makePentagon(890, 420, 70)}" stroke="#00f5a0" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 5: FULL DIAMOND (Deep Sapphire Blue) -->
                    <g class="full-shape">
                        <polygon points="${makeDiamond(340, 730, 180, 150)}" fill="#0284c7" stroke="#0284c7" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makeDiamond(340, 730, 130, 105)}" stroke="#0284c7" class="shape-inner-accent"/>
                    </g>

                    <!-- Page Identity HUD -->
                    <text x="60" y="70" fill="#10b981" class="art-text-label">// PAGE_THEME: BIO_EMERALD // 5_FULL_SHAPES</text>
                </svg>`;

            case 'skills':
                return `
                <svg class="bg-art-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <!-- SHAPE 1: FULL CIRCLE 1 (Cyber Tangerine Orange) -->
                    <g class="full-shape">
                        <circle cx="1180" cy="580" r="150" fill="#f97316" stroke="#f97316" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="1180" cy="580" r="110" stroke="#f97316" class="shape-inner-accent"/>
                        <circle cx="1180" cy="580" r="12" fill="#f97316"/>
                    </g>

                    <!-- SHAPE 2: FULL RECTANGLE (Electric Amber) -->
                    <g class="full-shape">
                        <rect x="90" y="130" width="250" height="140" rx="18" fill="#f59e0b" stroke="#f59e0b" class="shape-fill-glass shape-stroke-bold"/>
                        <rect x="110" y="150" width="210" height="100" rx="10" stroke="#f59e0b" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 3: FULL CIRCLE 2 (Solar Topaz Gold) -->
                    <g class="full-shape">
                        <circle cx="1100" cy="180" r="85" fill="#facc15" stroke="#facc15" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="1100" cy="180" r="55" stroke="#facc15" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 4: FULL PENTAGON (Intense Crimson Coral) -->
                    <g class="full-shape">
                        <polygon points="${makePentagon(220, 670, 100)}" fill="#ef4444" stroke="#ef4444" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makePentagon(220, 670, 70)}" stroke="#ef4444" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 5: FULL DIAMOND (Neon Amber Topaz) -->
                    <g class="full-shape">
                        <polygon points="${makeDiamond(780, 360, 160, 180)}" fill="#eab308" stroke="#eab308" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makeDiamond(780, 360, 115, 130)}" stroke="#eab308" class="shape-inner-accent"/>
                    </g>

                    <!-- Page Identity HUD -->
                    <text x="60" y="70" fill="#f59e0b" class="art-text-label">// PAGE_THEME: ARC_PLASMA // 5_FULL_SHAPES</text>
                </svg>`;

            case 'projects':
                return `
                <svg class="bg-art-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <!-- SHAPE 1: FULL RECTANGLE (Hyper Neon Pink, angled) -->
                    <g class="full-shape" transform="rotate(-6 1175 165)">
                        <rect x="1020" y="80" width="310" height="170" rx="16" fill="#ec4899" stroke="#ec4899" class="shape-fill-glass shape-stroke-bold"/>
                        <rect x="1045" y="105" width="260" height="120" rx="10" stroke="#ec4899" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 2: FULL CIRCLE 1 (Electric Cyan) -->
                    <g class="full-shape">
                        <circle cx="170" cy="230" r="115" fill="#00f2fe" stroke="#00f2fe" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="170" cy="230" r="80" stroke="#00f2fe" class="shape-inner-accent"/>
                        <circle cx="170" cy="230" r="8" fill="#00f2fe"/>
                    </g>

                    <!-- SHAPE 3: FULL DIAMOND (Deep Electric Violet) -->
                    <g class="full-shape">
                        <polygon points="${makeDiamond(1180, 680, 190, 190)}" fill="#8b5cf6" stroke="#8b5cf6" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makeDiamond(1180, 680, 135, 135)}" stroke="#8b5cf6" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 4: FULL PENTAGON (Vivid Emerald Green) -->
                    <g class="full-shape">
                        <polygon points="${makePentagon(310, 660, 95)}" fill="#10b981" stroke="#10b981" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makePentagon(310, 660, 65)}" stroke="#10b981" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 5: FULL CIRCLE 2 (Bright Orchid Lavender) -->
                    <g class="full-shape">
                        <circle cx="700" cy="130" r="75" fill="#c084fc" stroke="#c084fc" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="700" cy="130" r="50" stroke="#c084fc" class="shape-inner-accent"/>
                    </g>

                    <!-- Page Identity HUD -->
                    <text x="60" y="70" fill="#ec4899" class="art-text-label">// PAGE_THEME: BLUEPRINT_FUSION // 5_FULL_SHAPES</text>
                </svg>`;

            case 'experience':
                return `
                <svg class="bg-art-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <!-- SHAPE 1: FULL DIAMOND (Royal Cobalt Blue) -->
                    <g class="full-shape">
                        <polygon points="${makeDiamond(220, 160, 170, 170)}" fill="#2563eb" stroke="#2563eb" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makeDiamond(220, 160, 120, 120)}" stroke="#2563eb" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 2: FULL CIRCLE 1 (Electric Sky Azure) -->
                    <g class="full-shape">
                        <circle cx="1140" cy="290" r="130" fill="#38bdf8" stroke="#38bdf8" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="1140" cy="290" r="95" stroke="#38bdf8" class="shape-inner-accent"/>
                        <circle cx="1140" cy="290" r="8" fill="#38bdf8"/>
                    </g>

                    <!-- SHAPE 3: FULL RECTANGLE (Deep Royal Indigo, capsule angle) -->
                    <g class="full-shape" transform="rotate(-7 280 650)">
                        <rect x="120" y="590" width="320" height="120" rx="30" fill="#6366f1" stroke="#6366f1" class="shape-fill-glass shape-stroke-bold"/>
                        <rect x="145" y="610" width="270" height="80" rx="18" stroke="#6366f1" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 4: FULL PENTAGON (Neon Cyan) -->
                    <g class="full-shape">
                        <polygon points="${makePentagon(1260, 660, 95)}" fill="#00f2fe" stroke="#00f2fe" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makePentagon(1260, 660, 65)}" stroke="#00f2fe" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 5: FULL CIRCLE 2 (Amethyst Purple) -->
                    <g class="full-shape">
                        <circle cx="490" cy="380" r="75" fill="#a855f7" stroke="#a855f7" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="490" cy="380" r="50" stroke="#a855f7" class="shape-inner-accent"/>
                    </g>

                    <!-- Page Identity HUD -->
                    <text x="60" y="70" fill="#38bdf8" class="art-text-label">// PAGE_THEME: COSMIC_VELOCITY // 5_FULL_SHAPES</text>
                </svg>`;

            case 'education':
                return `
                <svg class="bg-art-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <!-- SHAPE 1: FULL PENTAGON (Electric Violet) -->
                    <g class="full-shape">
                        <polygon points="${makePentagon(1180, 190, 110)}" fill="#8b5cf6" stroke="#8b5cf6" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makePentagon(1180, 190, 75)}" stroke="#8b5cf6" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 2: FULL CIRCLE 1 (Neon Orchid Magenta) -->
                    <g class="full-shape">
                        <circle cx="1110" cy="640" r="125" fill="#d946ef" stroke="#d946ef" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="1110" cy="640" r="90" stroke="#d946ef" class="shape-inner-accent"/>
                        <circle cx="1110" cy="640" r="8" fill="#d946ef"/>
                    </g>

                    <!-- SHAPE 3: FULL RECTANGLE (Deep Amethyst, vertical pillar) -->
                    <g class="full-shape" transform="rotate(10 215 435)">
                        <rect x="120" y="310" width="190" height="250" rx="18" fill="#7c3aed" stroke="#7c3aed" class="shape-fill-glass shape-stroke-bold"/>
                        <rect x="140" y="330" width="150" height="210" rx="10" stroke="#7c3aed" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 4: FULL DIAMOND (Imperial Gold) -->
                    <g class="full-shape">
                        <polygon points="${makeDiamond(280, 140, 150, 150)}" fill="#eab308" stroke="#eab308" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makeDiamond(280, 140, 105, 105)}" stroke="#eab308" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 5: FULL CIRCLE 2 (Bright Turquoise) -->
                    <g class="full-shape">
                        <circle cx="420" cy="730" r="80" fill="#06b6d4" stroke="#06b6d4" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="420" cy="730" r="55" stroke="#06b6d4" class="shape-inner-accent"/>
                    </g>

                    <!-- Page Identity HUD -->
                    <text x="60" y="70" fill="#8b5cf6" class="art-text-label">// PAGE_THEME: CRYSTAL_PRISM // 5_FULL_SHAPES</text>
                </svg>`;

            case 'certificates':
                return `
                <svg class="bg-art-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <!-- SHAPE 1: FULL CIRCLE 1 (Imperial Gold Seal) -->
                    <g class="full-shape">
                        <circle cx="1160" cy="380" r="145" fill="#eab308" stroke="#eab308" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="1160" cy="380" r="110" stroke="#eab308" class="shape-inner-accent"/>
                        <circle cx="1160" cy="380" r="14" fill="#eab308"/>
                    </g>

                    <!-- SHAPE 2: FULL DIAMOND (Laser Amber) -->
                    <g class="full-shape">
                        <polygon points="${makeDiamond(180, 170, 160, 160)}" fill="#f59e0b" stroke="#f59e0b" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makeDiamond(180, 170, 115, 115)}" stroke="#f59e0b" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 3: FULL PENTAGON (Emerald Green) -->
                    <g class="full-shape">
                        <polygon points="${makePentagon(960, 690, 95)}" fill="#10b981" stroke="#10b981" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makePentagon(960, 690, 65)}" stroke="#10b981" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 4: FULL RECTANGLE (Rich Bronze Ochre, credential plaque) -->
                    <g class="full-shape" transform="rotate(-6 255 645)">
                        <rect x="110" y="570" width="290" height="150" rx="18" fill="#d97706" stroke="#d97706" class="shape-fill-glass shape-stroke-bold"/>
                        <rect x="135" y="590" width="240" height="110" rx="10" stroke="#d97706" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 5: FULL CIRCLE 2 (Ruby Crimson) -->
                    <g class="full-shape">
                        <circle cx="930" cy="140" r="85" fill="#f43f5e" stroke="#f43f5e" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="930" cy="140" r="55" stroke="#f43f5e" class="shape-inner-accent"/>
                    </g>

                    <!-- Page Identity HUD -->
                    <text x="60" y="70" fill="#eab308" class="art-text-label">// PAGE_THEME: GOLD_TROPHY // 5_FULL_SHAPES</text>
                </svg>`;

            case 'contact':
                return `
                <svg class="bg-art-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <!-- SHAPE 1: FULL CIRCLE 1 (Radiant Coral Crimson) -->
                    <g class="full-shape">
                        <circle cx="1280" cy="160" r="135" fill="#ff4757" stroke="#ff4757" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="1280" cy="160" r="95" stroke="#ff4757" class="shape-inner-accent"/>
                        <circle cx="1280" cy="160" r="12" fill="#ff4757"/>
                    </g>

                    <!-- SHAPE 2: FULL PENTAGON (Neon Turquoise) -->
                    <g class="full-shape">
                        <polygon points="${makePentagon(230, 350, 105)}" fill="#00f2fe" stroke="#00f2fe" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makePentagon(230, 350, 75)}" stroke="#00f2fe" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 3: FULL RECTANGLE (Electric Violet, terminal card) -->
                    <g class="full-shape" transform="rotate(8 1115 600)">
                        <rect x="970" y="530" width="290" height="140" rx="22" fill="#a855f7" stroke="#a855f7" class="shape-fill-glass shape-stroke-bold"/>
                        <rect x="995" y="550" width="240" height="100" rx="12" stroke="#a855f7" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 4: FULL DIAMOND (Sunset Amber) -->
                    <g class="full-shape">
                        <polygon points="${makeDiamond(330, 710, 170, 170)}" fill="#f59e0b" stroke="#f59e0b" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makeDiamond(330, 710, 120, 120)}" stroke="#f59e0b" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 5: FULL CIRCLE 2 (Hot Neon Pink) -->
                    <g class="full-shape">
                        <circle cx="670" cy="130" r="80" fill="#ec4899" stroke="#ec4899" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="670" cy="130" r="55" stroke="#ec4899" class="shape-inner-accent"/>
                    </g>

                    <!-- Page Identity HUD -->
                    <text x="60" y="70" fill="#ff4757" class="art-text-label">// PAGE_THEME: NEURAL_SATELLITE // 5_FULL_SHAPES</text>
                </svg>`;

            default: // index (Cyber Nexus)
                return `
                <svg class="bg-art-svg" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <!-- SHAPE 1: FULL CIRCLE 1 (Electric Cyan) -->
                    <g class="full-shape">
                        <circle cx="1220" cy="200" r="130" fill="#00f2fe" stroke="#00f2fe" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="1220" cy="200" r="95" stroke="#00f2fe" class="shape-inner-accent"/>
                        <circle cx="1220" cy="200" r="10" fill="#00f2fe"/>
                    </g>

                    <!-- SHAPE 2: FULL RECTANGLE (Royal Purple / Violet, angled) -->
                    <g class="full-shape" transform="rotate(-12 1100 595)">
                        <rect x="960" y="520" width="280" height="150" rx="20" fill="#8b5cf6" stroke="#8b5cf6" class="shape-fill-glass shape-stroke-bold"/>
                        <rect x="985" y="545" width="230" height="100" rx="12" stroke="#8b5cf6" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 3: FULL CIRCLE 2 (Hot Neon Pink / Magenta) -->
                    <g class="full-shape">
                        <circle cx="180" cy="520" r="85" fill="#ec4899" stroke="#ec4899" class="shape-fill-glass shape-stroke-bold"/>
                        <circle cx="180" cy="520" r="55" stroke="#ec4899" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 4: FULL PENTAGON (Cyber Emerald Mint) -->
                    <g class="full-shape">
                        <polygon points="${makePentagon(260, 170, 85)}" fill="#00f5a0" stroke="#00f5a0" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makePentagon(260, 170, 58)}" stroke="#00f5a0" class="shape-inner-accent"/>
                    </g>

                    <!-- SHAPE 5: FULL DIAMOND (Solar Amber Gold) -->
                    <g class="full-shape">
                        <polygon points="${makeDiamond(420, 730, 160, 160)}" fill="#facc15" stroke="#facc15" class="shape-fill-glass shape-stroke-bold"/>
                        <polygon points="${makeDiamond(420, 730, 110, 110)}" stroke="#facc15" class="shape-inner-accent"/>
                    </g>

                    <!-- Page Identity HUD -->
                    <text x="60" y="70" fill="#00f2fe" class="art-text-label">// PAGE_THEME: QUANTUM_NEXUS // 5_FULL_SHAPES</text>
                </svg>`;
        }
    };

    // Inject vector artwork layer
    let bgLayer = document.querySelector('.bg-shapes-layer');
    if (!bgLayer) {
        bgLayer = document.createElement('div');
        bgLayer.className = 'bg-shapes-layer';
        bgLayer.setAttribute('aria-hidden', 'true');
        document.body.prepend(bgLayer);
    }
    bgLayer.innerHTML = getPageArtwork(page);

    /* ========== 3D CARD HOVER PERSPECTIVE TILT ========== */
    const reactiveCards = document.querySelectorAll('.glass-card:not(.header-inner):not(.footer-content)');
    if (window.matchMedia('(pointer: fine)').matches) {
        reactiveCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // 3D perspective tilt
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -6;
                const rotateY = ((x - centerX) / centerX) * 6;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px) scale(1.01)`;
            }, { passive: true });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    /* ========== THEME SWITCHER (DARK / LIGHT) ========== */
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            safeSetStorage('theme-mode', isLight ? 'light' : 'dark');
        });
    }

    /* ========== MOBILE DRAWER NAVIGATION ========== */
    const burger = document.getElementById('burger');
    const drawer = document.getElementById('drawer');
    const drawerClose = document.getElementById('drawerClose');
    const overlay = document.getElementById('drawer-overlay');

    const toggleDrawer = (open) => {
        if (!drawer || !overlay) return;
        const isOpen = typeof open === 'boolean' ? open : !drawer.classList.contains('open');
        drawer.classList.toggle('open', isOpen);
        overlay.classList.toggle('open', isOpen);
        if (burger) burger.classList.toggle('open', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (burger) burger.addEventListener('click', () => toggleDrawer());
    if (drawerClose) drawerClose.addEventListener('click', () => toggleDrawer(false));
    if (overlay) overlay.addEventListener('click', () => toggleDrawer(false));

    document.querySelectorAll('.drawer-link').forEach(link => {
        link.addEventListener('click', () => toggleDrawer(false));
    });

    /* ========== ACTIVE NAVIGATION HIGHLIGHT ========== */
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .drawer-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    /* ========== SCROLL REVEAL OBSERVER ========== */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );
        reveals.forEach(el => revealObserver.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('show'));
    }

    /* ========== PROGRESS BARS ========== */
    const progressFills = document.querySelectorAll('.neon-progress-fill');
    if ('IntersectionObserver' in window && progressFills.length > 0) {
        const progressObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const fill = entry.target;
                        const pct = parseFloat(fill.getAttribute('data-pct'));
                        if (!isNaN(pct) && pct >= 0 && pct <= 100) {
                            fill.style.width = `${pct}%`;
                        }
                        progressObserver.unobserve(fill);
                    }
                });
            },
            { threshold: 0.3 }
        );
        progressFills.forEach(bar => progressObserver.observe(bar));
    } else {
        progressFills.forEach(fill => {
            const pct = parseFloat(fill.getAttribute('data-pct'));
            if (!isNaN(pct)) fill.style.width = `${pct}%`;
        });
    }

    /* ========== CATALOG LIVE SEARCH & CATEGORY FILTER ========== */
    const initCatalogFilter = () => {
        const toolbar = document.querySelector('.catalog-toolbar');
        if (!toolbar) return;

        const searchInput = toolbar.querySelector('.catalog-search-input');
        const filterBtns = toolbar.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.catalog-item');
        const noResults = document.querySelector('.no-results-msg');

        let activeFilter = 'all';
        let searchQuery = '';

        const applyFilter = () => {
            let visibleCount = 0;
            const query = searchQuery.toLowerCase().trim();

            items.forEach(item => {
                const category = (item.getAttribute('data-category') || '').toLowerCase();
                const text = (item.textContent || '').toLowerCase();

                const matchesFilter = (activeFilter === 'all') || category.includes(activeFilter.toLowerCase());
                const matchesSearch = !query || text.includes(query);

                if (matchesFilter && matchesSearch) {
                    item.classList.remove('is-hidden');
                    visibleCount++;
                } else {
                    item.classList.add('is-hidden');
                }
            });

            if (noResults) {
                noResults.style.display = (visibleCount === 0) ? 'block' : 'none';
            }
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeFilter = btn.getAttribute('data-filter') || 'all';
                applyFilter();
            });
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value;
                applyFilter();
            });
        }
    };
    initCatalogFilter();

    /* ========== CERTIFICATE LIGHTBOX MODAL ========== */
    const certModal = document.getElementById('certModal');
    const certModalImg = document.getElementById('modalCertImg');
    const modalCertTitle = document.getElementById('modalCertTitle');
    const modalCertIssuer = document.getElementById('modalCertIssuer');
    const certModalClose = document.getElementById('certModalClose');
    const certModalBackdrop = document.getElementById('certModalBackdrop');

    const SAFE_IMG_REGEX = /^[a-zA-Z0-9_\-\./]+\.(png|jpg|jpeg|webp|svg)$/i;

    const openCertModal = (imgSrc, title, issuer, date) => {
        if (!certModal || !certModalImg) return;

        if (typeof imgSrc === 'string' && SAFE_IMG_REGEX.test(imgSrc.trim()) && !imgSrc.includes('://') && !imgSrc.startsWith('//')) {
            certModalImg.src = imgSrc.trim();
        } else {
            certModalImg.src = '';
        }

        certModalImg.alt = title ? String(title) : 'Certificate Preview';
        if (modalCertTitle) modalCertTitle.textContent = title || 'Certificate';
        if (modalCertIssuer) {
            modalCertIssuer.textContent = [issuer, date].filter(Boolean).join(' • ');
        }

        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeCertModal = () => {
        if (!certModal) return;
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (certModalImg) certModalImg.src = '';
    };

    document.querySelectorAll('.cert-glass-card').forEach(card => {
        const triggers = card.querySelectorAll('.cert-modal-trigger');
        triggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const imgSrc = card.getAttribute('data-cert-img');
                const title = card.getAttribute('data-cert-title');
                const issuer = card.getAttribute('data-cert-issuer');
                const date = card.getAttribute('data-cert-date');
                openCertModal(imgSrc, title, issuer, date);
            });
        });
    });

    if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
    if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (certModal && certModal.classList.contains('active')) {
                closeCertModal();
            }
            if (drawer && drawer.classList.contains('open')) {
                toggleDrawer(false);
            }
            const searchInput = document.querySelector('.catalog-search-input');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        }
    });

    /* ========== COPYRIGHT YEAR ========== */
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }
});
