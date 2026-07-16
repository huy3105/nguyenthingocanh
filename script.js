/* =========================================
   Portfolio Script - Nguyễn Thị Ngọc Anh
========================================= */

// ── THEME TOGGLE ──
const html = document.documentElement;
const body = document.body;
const themeBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
    const isLight = body.classList.contains('light');
    applyTheme(isLight ? 'dark' : 'light');
});

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light');
        themeIcon.className = 'ph ph-moon-stars';
        localStorage.setItem('portfolioTheme', 'light');
    } else {
        body.classList.remove('light');
        themeIcon.className = 'ph ph-sun-horizon';
        localStorage.setItem('portfolioTheme', 'dark');
    }
}

// ── MOBILE HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ── NAVBAR SCROLL ACTIVE SECTION ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.section === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

sections.forEach(section => sectionObserver.observe(section));

// ── REVEAL ON SCROLL ──
const revealElements = document.querySelectorAll('.reveal-up, .reveal-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger cards
            const cards = entry.target.classList.contains('reveal-card');
            if (cards) {
                const siblings = entry.target.parentElement.querySelectorAll('.reveal-card');
                let delay = 0;
                siblings.forEach((sibling, idx) => {
                    if (sibling === entry.target) delay = idx * 80;
                });
                setTimeout(() => entry.target.classList.add('visible'), delay);
            } else {
                entry.target.classList.add('visible');
            }
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ── PARTICLE SYSTEM ──
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['#A855F7', '#EC4899', '#22D3EE', '#8B5CF6', '#C084FC'];
    const count = 20;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
            opacity: 0.4;
        `;
        container.appendChild(particle);
    }
}
createParticles();

// ── PROJECT CARD MOUSE TRACKING (glow follows cursor) ──
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        const glow = card.querySelector('.project-card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(168, 85, 247, 0.12), transparent 60%)`;
        }
    });
});

// ── COUNTER ANIMATION ──
function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        el.textContent = Math.floor(current);
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// ── SMOOTH SCROLL for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
