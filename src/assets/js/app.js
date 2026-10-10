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
});
