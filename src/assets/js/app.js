// Progressive enhancement script for American Shingle Co. (1-stop-roofing.com)
// 100% lightweight vanilla JavaScript - Zero dependencies (< 3 KB)

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for internal jump links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Mobile Hamburger Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');

  if (mobileMenuBtn && mobileNavDropdown) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenuBtn.classList.toggle('is-active');
      mobileNavDropdown.classList.toggle('is-open');
    });

    // Close when clicking any nav link inside drawer
    mobileNavDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('is-active');
        mobileNavDropdown.classList.remove('is-open');
      });
    });
  }
});
