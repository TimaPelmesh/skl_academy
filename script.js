// Mobile menu toggle с анимацией
document.getElementById('mobile-menu-button').addEventListener('click', function() {
  const menu = document.getElementById('mobile-menu');
  const burgerIcon = this.querySelector('.burger-icon');
  
  // Переключаем активные классы для меню и иконки
  menu.classList.toggle('is-active');
  burgerIcon.classList.toggle('is-active');
  
  // Добавляем/удаляем класс hidden для совместимости
  if (menu.classList.contains('is-active')) {
    menu.classList.remove('hidden');
  } else {
    // Добавляем класс hidden после завершения анимации
    setTimeout(() => {
      menu.classList.add('hidden');
    }, 300);
  }
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