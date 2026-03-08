// ===========================
// Scroll-based fade-in
// ===========================
function initAnimations() {
  const targets = document.querySelectorAll(
    '.section-header, .section-label, .section-title, .section-desc, ' +
    '.bento-card, .bento-item, .project, .contact-link, ' +
    '.hero-label, .hero-title, .hero-desc, .hero-actions, .hero-visual, ' +
    '.contact-text, .contact-links'
  );

  targets.forEach((el) => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger siblings
          const parent = entry.target.parentElement;
          const siblings = parent.querySelectorAll('.fade-in');
          const idx = Array.from(siblings).indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

// ===========================
// Header scroll
// ===========================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ===========================
// Active nav link
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-desktop a:not(.nav-cta)');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  },
  { threshold: 0.3, rootMargin: '-100px 0px 0px 0px' }
);

sections.forEach((s) => navObserver.observe(s));

// ===========================
// Mobile menu
// ===========================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuBtn.classList.toggle('active');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===========================
// Smooth scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===========================
// Init
// ===========================
initAnimations();
