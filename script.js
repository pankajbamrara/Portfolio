/* eslint-env browser */

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactiveElements = document.querySelectorAll('a, button');
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;
    window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.opacity = 1;
        cursorOutline.style.opacity = 1;
    });
    const animateCursor = () => {
        dotX = mouseX;
        dotY = mouseY;
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
    interactiveElements.forEach((el) => {
        el.addEventListener('mouseover', () => {
            cursorOutline.classList.add('grow');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('grow');
        });
    });

    // --- Core Functionality & Library Initializations ---
    const header = document.getElementById('header');
    const toTopButton = document.getElementById('to-top-button');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section');

    // Initialize AOS
    AOS.init({
      duration: 800,
      once: false,
    });

    // Initialize TypeIt
    new TypeIt('#typing-name', {
        strings: "Pankaj Kumar",
        speed: 100,
        deleteSpeed: 75,
        loop: true,
        waitUntilVisible: true,
        cursorChar: "|",
    }).go();

    // --- Event Handlers & Observers ---
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    const handleToTopButton = () => {
        if (window.scrollY > 300) {
            toTopButton.style.display = 'block';
        } else {
            toTopButton.style.display = 'none';
        }
    };
    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        handleToTopButton();
    });
    toTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: "-40% 0px -60% 0px" });
    sections.forEach(section => { observer.observe(section); });
});