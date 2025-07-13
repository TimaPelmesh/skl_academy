// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.gradient-bg');
  if (hero) {
    hero.style.backgroundPositionY = -(scrolled * 0.2) + 'px';
  }
}); 