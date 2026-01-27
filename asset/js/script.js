document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('div[id]');

    // 1. SMOOTH GLIDE ON CLICK
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Stop instant jump
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Offset = block-4 (30px) + block-2 (50px) + 20px gap
                    const offset = 100; 
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Update URL hash without jumping
                    history.pushState(null, null, targetId);
                }
            }
        });
    });

    // 2. ACTIVE HIGHLIGHT ON SCROLL
    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -75% 0px", // Detect section near top of viewport
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${entry.target.id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    // Default to first link at very top
    window.addEventListener("scroll", () => {
        if (window.scrollY < 50) {
            navLinks.forEach(l => l.classList.remove("active"));
            navLinks[0].classList.add("active");
        }
    });
});