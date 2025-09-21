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
// Global contact fab auto-inject for all pages (courses, articles, homepage)
(function globalContactFab() {
  function ensureContact() {
    const path = (window.location && window.location.pathname) || '';
    // Показываем только на страницах курсов и статей
    const allowed = /\/(courses|articles)\//.test(path);
    if (!allowed) return;
    let fab = document.getElementById('contactFab');
    let card = document.getElementById('contactCard');
    const frag = document.createDocumentFragment();
    if (!fab) {
      fab = document.createElement('a');
      fab.href = '#';
      fab.id = 'contactFab';
      fab.className = 'contact-fab';
      fab.title = 'Есть вопросы?';
      fab.setAttribute('aria-label', 'Открыть контакты');
      fab.textContent = 'i';
      frag.appendChild(fab);
    }
    if (!card) {
      card = document.createElement('div');
      card.id = 'contactCard';
      card.className = 'contact-card';
      card.setAttribute('aria-live', 'polite');
      card.setAttribute('aria-hidden', 'true');
      card.innerHTML = '<h4>Есть вопросы — пиши:</h4>' +
        '<div class="contact-links">' +
        '<a href="https://t.me/tima_pelmeshka" target="_blank" rel="noopener">Telegram</a>' +
        '<a href="mailto:mr.tim.pumpkin@gmail.com">mr.tim.pumpkin@gmail.com</a>' +
        '</div>';
      frag.appendChild(card);
    }
    if (frag.childNodes.length) document.body.appendChild(frag);

    if (!fab || !card) return;
    function toggle(force) {
      const willOpen = typeof force === 'boolean' ? force : !card.classList.contains('active');
      card.classList.toggle('active', willOpen);
      card.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
      fab.textContent = willOpen ? '×' : 'i';
      fab.setAttribute('aria-label', willOpen ? 'Закрыть контакты' : 'Открыть контакты');
      fab.setAttribute('title', willOpen ? 'Закрыть' : 'Есть вопросы?');
    }
    fab.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); toggle(); });
    document.addEventListener('click', (e) => {
      if (!card.classList.contains('active')) return;
      const el = e.target;
      if (el === card || el === fab || card.contains(el)) return;
      toggle(false);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureContact, { once: true });
  } else {
    ensureContact();
  }
})();

// Parallax effect for hero section removed to keep hero static