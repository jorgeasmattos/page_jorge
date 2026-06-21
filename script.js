/* ═══════════════════════════════════════════════════════════
   NAVBAR — efeito de scroll e menu mobile
═══════════════════════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navMenu');

// Adiciona classe .scrolled quando a página rola mais de 50px
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
}, { passive: true });

// Toggle do menu hamburguer
hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Fecha o menu ao clicar em qualquer link
navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Fecha o menu ao clicar fora dele
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

/* ═══════════════════════════════════════════════════════════
   LINK ATIVO NA NAV — destaca a seção visível
═══════════════════════════════════════════════════════════ */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link[href^="#"]');

function updateActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const top    = section.offsetTop;
        const height = section.offsetHeight;
        const id     = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}

/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL — anima elementos ao entrar na viewport
═══════════════════════════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // anima apenas 1 vez
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -48px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   CONTADORES ANIMADOS — +15 anos, +5 anos etc.
═══════════════════════════════════════════════════════════ */
function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1400; // ms
    const start    = performance.now();

    function tick(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Easing cubic-out
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ═══════════════════════════════════════════════════════════
   SMOOTH SCROLL — âncoras internas (fallback para Safari antigo)
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-h'), 10) || 70;

        window.scrollTo({
            top: target.offsetTop - navH,
            behavior: 'smooth'
        });
    });
});

/* ═══════════════════════════════════════════════════════════
   INIT — executa ao carregar
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    updateActiveLink();
});
