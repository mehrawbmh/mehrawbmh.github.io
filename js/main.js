(() => {
  'use strict';

  // --- Navbar scroll effect ---
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Mobile menu toggle ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section.section, header.hero');
  const navItems = navLinks.querySelectorAll('a');

  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 100;
    let current = null;

    sections.forEach((section) => {
      if (section.getAttribute('id') && section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach((item) => {
      item.classList.toggle('active', item.getAttribute('href') === `#${current}`);
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // --- Fade-in on scroll (Intersection Observer) ---
  const fadeElements = document.querySelectorAll(
    '.section-title, .about-text, .about-stats, .stat-card, .skill-group, .timeline-item, .contact-container, .hero-content'
  );

  fadeElements.forEach((el) => el.classList.add('fade-in'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  );

  fadeElements.forEach((el) => observer.observe(el));

  // --- Stagger fade-in for grouped elements ---
  document.querySelectorAll('.stat-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 80}ms`;
  });

  document.querySelectorAll('.skill-group').forEach((el, i) => {
    el.style.transitionDelay = `${i * 60}ms`;
  });

  document.querySelectorAll('.timeline-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 100}ms`;
  });
})();
