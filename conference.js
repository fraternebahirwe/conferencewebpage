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

    const navigation = document.querySelector(".main-nav");
    const navigationLinks = document.querySelectorAll(
        ".main-nav a[href^='#']"
    );

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const speakerCards = document.querySelectorAll(
        ".speaker-card"
    );

    const table = document.querySelector(
        ".table-responsive"
    );

    const footer = document.querySelector(
        ".main-footer"
    );


    /* =====================================================
       2. NAVIGATION SCROLL EFFECT
       ===================================================== */

    function updateNavigation() {

        if (!navigation) {
            return;
        }

        if (window.scrollY > 30) {

            navigation.classList.add("nav-scrolled");

        } else {

            navigation.classList.remove("nav-scrolled");

        }
    }


    /* =====================================================
       3. ACTIVE NAVIGATION
       ===================================================== */

    function updateActiveNavigation() {

        if (!navigationLinks.length) {
            return;
        }

        const currentPosition =
            window.scrollY + 150;

        let currentSection = "home";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                currentPosition >= sectionTop &&
                currentPosition < sectionBottom
            ) {

                currentSection =
                    section.id;

            }

        });


        navigationLinks.forEach((link) => {

            const target =
                link.getAttribute("href");

            const isActive =
                target === `#${currentSection}`;

            link.classList.toggle(
                "active",
                isActive
            );

        });
    }


    /* =====================================================
       4. SMOOTH NAVIGATION
       ===================================================== */

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const target =
                link.getAttribute("href");

            if (
                !target ||
                target === "#"
            ) {
                return;
            }


            const targetSection =
                document.querySelector(target);

            if (!targetSection) {
                return;
            }


            event.preventDefault();


            const navigationHeight =
                navigation
                    ? navigation.offsetHeight
                    : 0;


            const targetPosition =
                targetSection.offsetTop -
                navigationHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });


            /* Update URL without jumping */

            history.pushState(
                null,
                "",
                target
            );

        });

    });


    /* =====================================================
       5. SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "main section, .speaker-card, .table-responsive"
        );


    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !reducedMotion &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
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
                    threshold: 0.1,

                    rootMargin:
                        "0px 0px -50px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "reveal"
                );

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =====================================================
       6. SPEAKER CARD INTERACTION
       ===================================================== */

    speakerCards.forEach((card) => {

        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "speaker-active"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "speaker-active"
                );

            }
        );

    });


    /* =====================================================
       7. TABLE ROW INTERACTION
       ===================================================== */

    const scheduleRows =
        document.querySelectorAll(
            ".schedule-section tbody tr"
        );


    scheduleRows.forEach((row) => {

        row.addEventListener(
            "mouseenter",
            () => {

                row.classList.add(
                    "schedule-active"
                );

            }
        );


        row.addEventListener(
            "mouseleave",
            () => {

                row.classList.remove(
                    "schedule-active"
                );

            }
        );

    });


    /* =====================================================
       8. CURRENT YEAR
       ===================================================== */

    if (footer) {

        const currentYear =
            new Date().getFullYear();


        const footerText =
            footer.querySelector("p");


        if (footerText) {

            footerText.textContent =
                `© ${currentYear} Fratboy TechCon. All rights reserved.`;

        }

    }


    /* =====================================================
       9. BACK TO TOP BUTTON
       ===================================================== */

    const backToTop =
        document.createElement("button");


    backToTop.type = "button";

    backToTop.className =
        "back-to-top";

    backToTop.setAttribute(
        "aria-label",
        "Back to top"
    );

    backToTop.setAttribute(
        "title",
        "Back to top"
    );

    backToTop.innerHTML = "↑";


    document.body.appendChild(
        backToTop
    );


    /* Show button after scrolling */

    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }


    /* Back to top action */

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    /* =====================================================
       10. SCROLL PROGRESS BAR
       ===================================================== */

    const progressBar =
        document.createElement("div");


    progressBar.className =
        "scroll-progress";


    document.body.appendChild(
        progressBar
    );


    function updateScrollProgress() {

        const pageHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (pageHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }


        const progress =
            (window.scrollY / pageHeight) *
            100;


        progressBar.style.width =
            `${progress}%`;

    }


    /* =====================================================
       11. SCROLL PERFORMANCE
       ===================================================== */

    let scrollTicking = false;


    function handleScroll() {

        if (scrollTicking) {
            return;
        }


        window.requestAnimationFrame(
            () => {

                updateNavigation();

                updateActiveNavigation();

                updateBackToTop();

                updateScrollProgress();


                scrollTicking = false;

            }
        );


        scrollTicking = true;

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       12. RESIZE HANDLING
       ===================================================== */

    let resizeTimer;


    window.addEventListener(
        "resize",
        () => {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(() => {

                    updateActiveNavigation();

                    updateScrollProgress();

                }, 150);

        }
    );


    /* =====================================================
       13. INITIAL STATE
       ===================================================== */

    updateNavigation();

    updateActiveNavigation();

    updateBackToTop();

    updateScrollProgress();


    /* =====================================================
       14. PAGE LOADED
       ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});