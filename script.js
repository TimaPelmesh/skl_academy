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

// Hero: минималистичная анимация на Canvas 2D (без Three.js), один скрипт для десктопа и мобильных
window.initHeroWebGL = function initHeroCanvas() {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const container = document.getElementById('hero-webgl');
  if (!container) return;

  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const orbs = [
    { x: 0.78, y: 0.2, r: 0.35, phase: 0, speed: 0.15 },
    { x: 0.2, y: 0.7, r: 0.28, phase: 1.2, speed: 0.12 },
    { x: 0.5, y: 0.5, r: 0.2, phase: 2.1, speed: 0.18 },
    { x: 0.9, y: 0.6, r: 0.22, phase: 0.7, speed: 0.1 },
    { x: 0.15, y: 0.35, r: 0.18, phase: 3, speed: 0.14 }
  ];

  function resize() {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    draw();
  }

  function draw() {
    const w = canvas.width;
    const h = canvas.height;
    const t = Date.now() * 0.001;
    ctx.clearRect(0, 0, w, h);

    orbs.forEach(function (orb) {
      const phase = orb.phase + t * orb.speed;
      const x = (orb.x + Math.sin(phase) * 0.05) * w;
      const y = (orb.y + Math.cos(phase * 0.7) * 0.03) * h;
      const r = orb.r * Math.min(w, h) * (0.92 + Math.sin(phase * 1.5) * 0.08);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, 'rgba(129, 140, 248, 0.35)');
      g.addColorStop(0.5, 'rgba(79, 70, 229, 0.12)');
      g.addColorStop(1, 'rgba(67, 56, 202, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function loop() {
    draw();
    requestAnimationFrame(loop);
  }

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(resize);
    ro.observe(container);
  } else {
    window.addEventListener('resize', resize);
  }
  resize();
  loop();
};