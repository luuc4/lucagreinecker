// ===========================
// Helpers
// ===========================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollBehavior = () => (reduceMotion.matches ? 'auto' : 'smooth');

// ===========================
// Scroll-based fade-in
// ===========================
function initAnimations() {
  if (reduceMotion.matches || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.section-header, .bento-card, .bento-item, .project-featured, .project-card, ' +
    '.hero-label, .hero-title, .hero-desc, .hero-actions, .hero-visual, ' +
    '.step, .contact-form, .contact-sidebar'
  );

  targets.forEach((el) => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const parent = entry.target.parentElement;
          const siblings = parent.querySelectorAll(':scope > .fade-in');
          const idx = Array.from(siblings).indexOf(entry.target);

          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.max(idx, 0) * 80);

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
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', y > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });
}

// ===========================
// Active nav link
// ===========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-desktop a:not(.nav-cta)');

if (navLinks.length && sections.length && 'IntersectionObserver' in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
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
  const setMenu = (open) => {
    mobileMenu.classList.toggle('open', open);
    menuBtn.classList.toggle('active', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) {
      const firstLink = mobileMenu.querySelector('a');
      if (firstLink) firstLink.focus();
    } else {
      menuBtn.focus();
    }
  };

  menuBtn.addEventListener('click', () => {
    setMenu(!mobileMenu.classList.contains('open'));
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      // Menü schließen, aber Fokus nicht zurück auf den Button ziehen
      mobileMenu.classList.remove('open');
      menuBtn.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Menü öffnen');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setMenu(false);
    }
  });

  // Menü schließen, wenn das Fenster auf Desktop-Breite wächst
  const desktopQuery = window.matchMedia('(min-width: 641px)');
  desktopQuery.addEventListener('change', (e) => {
    if (e.matches && mobileMenu.classList.contains('open')) setMenu(false);
  });
}

// ===========================
// Smooth scroll
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');

    // Logo (href="#") scrollt nach oben
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: scrollBehavior() });
      // Fokus mitnehmen, damit Tastatur- und Screenreader-Nutzer an der richtigen Stelle sind
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      history.replaceState(null, '', href);
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
        status.textContent = 'Danke, deine Nachricht ist angekommen. Ich melde mich.';
        status.classList.add('success');
        contactForm.reset();
      } else {
        let message = 'Es gab ein Problem. Bitte versuch es erneut oder schreib mir direkt per E-Mail.';
        try {
          const json = await response.json();
          if (json.errors) message = json.errors.map((err) => err.message).join(', ');
        } catch {
          // Antwort war kein JSON, Standardtext bleibt
        }
        status.textContent = message;
        status.classList.add('error');
      }
    } catch {
      status.textContent = 'Es gab ein Problem. Bitte versuch es erneut oder schreib mir direkt per E-Mail.';
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
