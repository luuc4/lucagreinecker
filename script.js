// ===========================
// Scroll-based fade-in
// ===========================
function initAnimations() {
  const targets = document.querySelectorAll(
    '.section-header, .bento-card, .bento-item, .project-card, ' +
    '.hero-label, .hero-title, .hero-desc, .hero-actions, .hero-visual, .availability, ' +
    '.contact-form, .contact-sidebar'
  );

  targets.forEach((el) => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
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
// Header scroll + Scroll-to-Top
// ===========================
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scrollTop');

if (header || scrollTopBtn) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 500);
  }, { passive: true });
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===========================
// Active nav link
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-desktop a:not(.nav-cta)');

if (navLinks.length) {
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
}

// ===========================
// Mobile menu
// ===========================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuBtn.classList.toggle('active');
    menuBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ===========================
// Smooth scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');

    // Handle logo click (href="#") — scroll to top
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===========================
// Contact form (Formspree AJAX)
// ===========================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit');
    const data = new FormData(contactForm);

    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet...';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' },
      });

      if (response.ok) {
        status.textContent = 'Nachricht erfolgreich gesendet!';
        status.classList.add('success');
        contactForm.reset();
      } else {
        const json = await response.json();
        if (json.errors) {
          status.textContent = json.errors.map((err) => err.message).join(', ');
        } else {
          status.textContent = 'Es gab ein Problem. Bitte versuch es erneut.';
        }
        status.classList.add('error');
      }
    } catch {
      status.textContent = 'Es gab ein Problem. Bitte versuch es erneut.';
      status.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Nachricht senden';
    }
  });
}

// ===========================
// Init
// ===========================
initAnimations();
