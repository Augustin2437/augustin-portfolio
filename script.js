/* =====================================================
   AUGUSTIN NAYAGAM — NEON GLASSMORPHISM PORTFOLIO
   Interactive Script: Cursor Glow, 3D Glass Tilt,
   Animated Progress Bars, Drawer Nav & Theme Management
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ========== DYNAMIC CURSOR GLOW ========== */
    const cursorGlow = document.getElementById("cursorGlow");
    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let currentX = mouseX;
        let currentY = mouseY;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const animateCursor = () => {
            currentX += (mouseX - currentX) * 0.15;
            currentY += (mouseY - currentY) * 0.15;
            cursorGlow.style.left = `${currentX}px`;
            cursorGlow.style.top = `${currentY}px`;
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);
    }

    /* ========== MOBILE DRAWER NAVIGATION ========== */
    const burger = document.getElementById("burger");
    const drawer = document.getElementById("drawer");
    const drawerClose = document.getElementById("drawerClose");
    const overlay = document.getElementById("drawer-overlay");

    const toggleDrawer = (open) => {
        const isOpen = typeof open === "boolean" ? open : !drawer.classList.contains("open");
        drawer.classList.toggle("open", isOpen);
        overlay.classList.toggle("open", isOpen);
        burger.classList.toggle("open", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
    };

    if (burger) burger.addEventListener("click", () => toggleDrawer());
    if (drawerClose) drawerClose.addEventListener("click", () => toggleDrawer(false));
    if (overlay) overlay.addEventListener("click", () => toggleDrawer(false));

    document.querySelectorAll(".drawer-link").forEach(link => {
        link.addEventListener("click", () => toggleDrawer(false));
    });

    /* ========== THEME SWITCHER (DARK / LIGHT) ========== */
    const themeBtn = document.getElementById("theme-toggle");
    
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const isLight = document.body.classList.toggle("light-theme");
            localStorage.setItem("theme-mode", isLight ? "light" : "dark");
        });

        // Initialize saved theme preference
        if (localStorage.getItem("theme-mode") === "light") {
            document.body.classList.add("light-theme");
        }
    }

    /* ========== ACTIVE NAVIGATION HIGHLIGHT ========== */
    const navLinks = document.querySelectorAll(".desktop-nav .nav-link, .drawer-link");
    const currentPath = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPath || (currentPath === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });

    const hashLinks = document.querySelectorAll('.desktop-nav .nav-link[href^="#"]');
    if (hashLinks.length > 0) {
        const sections = document.querySelectorAll("section[id]");
        const navObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("id");
                        hashLinks.forEach(link => {
                            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
                        });
                    }
                });
            },
            { threshold: 0.35 }
        );
        sections.forEach(sec => navObserver.observe(sec));
    }

    /* ========== SCROLL REVEAL OBSERVER ========== */
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    reveals.forEach(el => revealObserver.observe(el));

    /* ========== ANIMATED NEON PROGRESS BARS ========== */
    const progressFills = document.querySelectorAll(".neon-progress-fill");

    const progressObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const pct = fill.getAttribute("data-pct");
                    setTimeout(() => {
                        fill.style.width = `${pct}%`;
                    }, 250);
                    progressObserver.unobserve(fill);
                }
            });
        },
        { threshold: 0.4 }
    );

    progressFills.forEach(bar => progressObserver.observe(bar));

    /* ========== 3D SPECULAR TILT ON GLASS CARDS ========== */
    const tiltCards = document.querySelectorAll(".skill-category, .project-glass-card, .edu-glass-card, .contact-card, .fact-card, .cert-glass-card");

    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

    /* ========== SMOOTH SCROLLING FOR INTERNAL LINKS ========== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    /* ========== CERTIFICATE LIGHTBOX MODAL ========== */
    const certModal = document.getElementById("certModal");
    const certModalImg = document.getElementById("modalCertImg");
    const modalCertTitle = document.getElementById("modalCertTitle");
    const modalCertIssuer = document.getElementById("modalCertIssuer");
    const certModalClose = document.getElementById("certModalClose");
    const certModalBackdrop = document.getElementById("certModalBackdrop");

    const openCertModal = (imgSrc, title, issuer, date) => {
        if (!certModal || !certModalImg) return;
        certModalImg.src = imgSrc;
        certModalImg.alt = title || "Certificate Preview";
        if (modalCertTitle) modalCertTitle.textContent = title || "Certificate";
        if (modalCertIssuer) modalCertIssuer.textContent = [issuer, date].filter(Boolean).join(" • ");
        certModal.classList.add("active");
        certModal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const closeCertModal = () => {
        if (!certModal) return;
        certModal.classList.remove("active");
        certModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    document.querySelectorAll(".cert-glass-card").forEach(card => {
        const triggers = card.querySelectorAll(".cert-modal-trigger");
        triggers.forEach(trigger => {
            trigger.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const imgSrc = card.getAttribute("data-cert-img");
                const title = card.getAttribute("data-cert-title");
                const issuer = card.getAttribute("data-cert-issuer");
                const date = card.getAttribute("data-cert-date");
                openCertModal(imgSrc, title, issuer, date);
            });
        });
    });

    if (certModalClose) certModalClose.addEventListener("click", closeCertModal);
    if (certModalBackdrop) certModalBackdrop.addEventListener("click", closeCertModal);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && certModal && certModal.classList.contains("active")) {
            closeCertModal();
        }
    });

    /* ========== COPYRIGHT YEAR ========== */
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});