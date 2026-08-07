/*
 * =========================================================
 * FRATBOY TECHCON 2026
 * Main JavaScript
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. DOM ELEMENTS
       ===================================================== */

    const nav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("main section[id]");

    const revealElements = document.querySelectorAll(
        ".section, .event-info-item, .speaker-card, .table-responsive"
    );

    const copyright = document.querySelector(".copyright");


    /* =====================================================
       2. NAVIGATION SHADOW ON SCROLL
       ===================================================== */

    function handleNavigationScroll() {

        if (!nav) return;

        if (window.scrollY > 20) {
            nav.classList.add("nav-scrolled");
        } else {
            nav.classList.remove("nav-scrolled");
        }
    }


    /* =====================================================
       3. ACTIVE NAVIGATION LINK
       ===================================================== */

    function updateActiveNavigation() {

        if (!navLinks.length) return;

        // Home is active at the top of the page
        if (window.scrollY < 250) {

            navLinks.forEach((link) => {

                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#home"
                );

            });

            return;
        }

        const scrollPosition = window.scrollY + 160;

        let activeSectionId = null;

        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                activeSectionId = section.id;
            }

        });


        navLinks.forEach((link) => {

            const target = link.getAttribute("href");

            if (target === `#${activeSectionId}`) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }

        });
    }


    /* =====================================================
       4. NAVIGATION CLICK
       ===================================================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

        });

    });


    /* =====================================================
       5. SCROLL REVEAL ANIMATION
       ===================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("revealed");

        });

    }


    /* =====================================================
       6. CURRENT YEAR
       ===================================================== */

    if (copyright) {

        const currentYear =
            new Date().getFullYear();

        copyright.textContent =
            `© ${currentYear} Fratboy TechCon. All rights reserved.`;
    }


    /* =====================================================
       7. EMPTY HASH LINKS
       ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();

                }
            );

        });


    /* =====================================================
       8. INITIALIZE
       ===================================================== */

    handleNavigationScroll();
    updateActiveNavigation();


    /* =====================================================
       9. SCROLL EVENT
       ===================================================== */

    let ticking = false;

    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(() => {

                    handleNavigationScroll();
                    updateActiveNavigation();

                    ticking = false;

                });

                ticking = true;
            }

        },
        {
            passive: true
        }
    );

});