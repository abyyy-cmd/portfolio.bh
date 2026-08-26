// script.js

// 1. Typewriter Effect Logic for the Hero Section
const roles = [
    "AI Automation Engineer.",
    "Software Developer.",
    "Full-Stack Specialist.",
    "Front-End Architect."
];
const typewriterElement = document.getElementById("typewriter");

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentRole = roles[roleIndex];
    
    // Add or remove characters based on state
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    // Dynamic typing speed
    let typeSpeed = isDeleting ? 40 : 80;

    // Pause at the end of a word
    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } 
    // Move to the next word after deleting
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; 
    }

    setTimeout(typeEffect, typeSpeed);
}

// 2. Intersection Observer to trigger 'fade-up' animations on scroll
document.addEventListener("DOMContentLoaded", () => {
    // Initialize typewriter
    setTimeout(typeEffect, 800);

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Resume the CSS animation when scrolled into view
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Pause animation initially for elements outside the hero section
    const animatedElements = document.querySelectorAll('.fade-up:not(.navbar):not(.hero-content):not(.hero-illustration)');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
});
