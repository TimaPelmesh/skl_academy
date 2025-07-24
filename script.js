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

// Функция для инициализации эффекта печатания
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-effect');
  
  if (typingElement) {
    // Сохраняем оригинальный текст
    const text = typingElement.textContent;
    // Очищаем содержимое
    typingElement.textContent = '';
    
    // Запускаем анимацию печатания с небольшой задержкой
    setTimeout(() => {
      // Показываем элемент и курсор перед началом печатания
      typingElement.classList.add('typing-started');
      
      // Печатаем текст по одному символу с разной скоростью для естественности
      let charIndex = 0;
      
      function typeNextChar() {
        if (charIndex < text.length) {
          typingElement.textContent += text.charAt(charIndex);
          charIndex++;
          
          // Случайная задержка между символами для более естественного эффекта
          const randomDelay = Math.floor(Math.random() * 50) + 70; // 70-120мс
          setTimeout(typeNextChar, randomDelay);
        } else {
          // Плавно скрываем курсор после небольшой паузы
          setTimeout(() => {
            // Добавляем класс для скрытия курсора
            typingElement.classList.add('typing-complete');
            
            // Показываем остальной контент с небольшой задержкой
            setTimeout(() => {
              typingElement.closest('.text-center').classList.add('show-content');
            }, 300);
          }, 600); // Пауза перед скрытием курсора
        }
      }
      
      typeNextChar();
    }, 800);
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  // Создаем звезды на фоне
  addStars(100);
  
  // Инициализируем эффект печатания
  initTypingEffect();
});

// Функция для создания дополнительных звезд
function addStars(count) {
  const container = document.querySelector('.gradient-bg');
  
  if (container) {
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Случайное размещение и размер
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.width = `${Math.random() * 3 + 1}px`;
      star.style.height = star.style.width;
      
      // Случайная задержка анимации
      star.style.animationDelay = `${Math.random() * 2}s`;
      
      container.appendChild(star);
    }
  }
} 