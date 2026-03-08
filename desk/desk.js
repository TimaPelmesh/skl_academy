/**
 * SKL Desk — логика рабочего стола: окна, приложения, панель задач
 */

function initDesk() {
  // Относительный путь к корню сайта (desk/ лежит в корне)
  const root = '..';

  // ── Фон с частицами (концепт рабочего стола) ──
  (function initParticleBackground() {
    var canvas = document.getElementById('desk-bg-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = 'rgba(255, 255, 255, ' + (Math.random() * 0.5) + ')';
    }
    Particle.prototype.update = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    };
    Particle.prototype.draw = function () {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };

    function initParticles() {
      particles = [];
      for (var i = 0; i < 100; i++) particles.push(new Particle());
    }

    function animate() {
      if (!ctx || !canvas.width || !canvas.height) { requestAnimationFrame(animate); return; }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initParticles();
    animate();
  })();

  const APPS = {
    courses: {
      title: 'Курсы',
      icon: 'fas fa-folder-open',
      type: 'folder',
      items: [
        { title: 'Компьютерные сети', url: root + '/courses/networks/01-networks-fundamental.html', icon: 'fas fa-network-wired' },
        { title: 'Python', url: root + '/courses/python/01-python-basics.html', icon: 'fab fa-python' },
        { title: 'Git', url: root + '/courses/git/01-git-basics.html', icon: 'fab fa-git-alt' },
        { title: 'Веб-разработка', url: root + '/courses/web/01-html-basics.html', icon: 'fab fa-html5' },
        { title: 'Linux и Bash', url: root + '/courses/linux/01-linux-basics.html', icon: 'fab fa-linux' },
        { title: 'Windows и PowerShell', url: root + '/courses/windows/01-windows-basics.html', icon: 'fab fa-windows' },
        { title: 'Технический английский', url: root + '/courses/english/01-foundations.html', icon: 'fas fa-language' },
        { title: 'Введение в AI', url: root + '/courses/ai/00-about-course.html', icon: 'fas fa-brain' }
      ]
    },
    tools: {
      title: 'Инструменты',
      icon: 'fas fa-tools',
      items: [
        { title: 'Тренажер печати', desc: 'Скорость и точность', url: root + '/sandbox/typing/index.html', icon: 'fas fa-keyboard' },
        { title: 'Linux команды', desc: 'Интерактивный тренажер', url: root + '/sandbox/linux-commands/index.html', icon: 'fab fa-linux' },
        { title: 'Архитектура ПК', desc: '3D-модель компьютера', url: root + '/sandbox/pc-architecture/index.html', icon: 'fas fa-desktop' },
        { title: 'Веб-песочница', desc: 'HTML, CSS, JS', url: root + '/sandbox/web-playground/index.html', icon: 'fas fa-code' }
      ]
    },
    games: {
      title: 'Игры',
      icon: 'fas fa-gamepad',
      items: [
        { title: '2048', desc: 'Объединяй плитки — залипательная головоломка', url: root + '/desk/games/2048.html', icon: 'fas fa-th' }
      ]
    },
    library: {
      title: 'Библиотека',
      icon: 'fas fa-folder-open',
      type: 'folder',
      items: [
        { title: 'Что происходит при вводе URL', file: 'url-journey.txt', url: root + '/articles/url-journey.html' },
        { title: '5 багов за миллионы долларов', file: 'billion-dollar-bugs.txt', url: root + '/articles/billion-dollar-bugs.html' },
        { title: 'Как читать чужой код', file: 'reading-code.txt', url: root + '/articles/reading-code.html' },
        { title: 'Docker для начинающих', file: 'docker-basics.txt', url: root + '/articles/docker-basics.html' },
        { title: 'ИИ для начинающих', file: 'ai-for-beginners.txt', url: root + '/articles/ai-for-beginners.html' },
        { title: 'Первая программа на Python', file: 'first-python-program.txt', url: root + '/articles/first-python-program.html' },
        { title: 'Приложение заметок на tkinter', file: 'tkinter-notes-app.txt', url: root + '/articles/tkinter-notes-app.html' }
      ]
    },
    about: {
      title: 'О проекте',
      icon: 'fas fa-file-alt',
      type: 'txt',
      filename: 'О проекте SKL Academy.txt'
    },
    settings: {
      title: 'Настройки',
      icon: 'fas fa-cog',
      type: 'settings'
    },
    bash: {
      title: 'Bash',
      icon: 'fab fa-linux',
      type: 'terminal',
      shell: 'bash'
    },
    powershell: {
      title: 'PowerShell',
      icon: 'fab fa-windows',
      type: 'terminal',
      shell: 'ps'
    },
    trash: {
      title: 'Корзина',
      icon: 'fas fa-trash-alt',
      type: 'easteregg'
    }
  };

  var DONATE_URL = 'https://tbank.ru/cf/5WE9u97bUbM';
  var CAT_IMAGE = root + '/images/cat.png';

  const ABOUT_TXT = 'О ПРОЕКТЕ SKL ACADEMY\n' +
    '================================\n\n' +
    'SKL Academy — образовательная платформа, созданная энтузиастом для будущих IT-специалистов.\n\n' +
    'НАША МИССИЯ\n' +
    '------------\n' +
    'Мы верим, что качественные знания в сфере информационных технологий должны быть открыты каждому, независимо от финансовых возможностей или географического положения.\n\n' +
    'ПОДХОД К ОБУЧЕНИЮ\n' +
    '-----------------\n' +
    '• Практическая направленность — реальные примеры и задания\n' +
    '• Актуальность — регулярное обновление контента\n' +
    '• Доступность — все материалы бесплатны и доступны 24/7\n' +
    '• Структурированность — от простого к сложному\n\n' +
    'ПЛАНЫ\n' +
    '-----\n' +
    'Новые курсы, интерактивные тренажеры и расширение платформы.\n\n' +
    'Сайт: ' + (typeof location !== 'undefined' ? (location.origin || '') : '') + '/';

  let windowId = 0;
  const windows = new Map();
  let focusedId = null;
  let dragState = null;
  let resizeState = null;
  let _zCounter = 100;
  let _restoring = false;
  let _pushStateTimer = null;
  var lastDraggedIcon = null;
  var iconDragState = { active: false, el: null, startX: 0, startY: 0, left0: 0, top0: 0 };
  var ICON_POS_KEY = 'desk-icon-positions';
  var ICON_ORDER = ['home', 'trash'];
  var PINNED_APPS = ['courses', 'tools', 'games', 'library', 'about', 'settings', 'bash', 'powershell'];
  var GRID_ORIGIN_X = 24;
  var GRID_ORIGIN_Y = 24;
  var GRID_CELL_W = 130;
  var GRID_CELL_H = 96;
  var GRID_COLS = 2;
  var GRID_ROWS = 1;
  var ICON_DRAG_THRESHOLD = 6;

  const container = document.getElementById('desk-windows');
  const taskbarApps = document.getElementById('desk-taskbar-apps');
  const startBtn = document.getElementById('desk-start');
  const startMenu = document.getElementById('desk-start-menu');
  const welcomeEl = document.getElementById('desk-welcome');

  if (localStorage.getItem('desk-theme') === 'light') {
    document.body.classList.add('light-theme');
  }

  function updateWelcomeVisibility() {
    if (welcomeEl) welcomeEl.classList.toggle('hidden', windows.size > 0);
  }

  const DEFAULT_W = 720;
  const DEFAULT_H = 520;
  const MIN_W = 380;
  const MIN_H = 300;
  const RESIZE_HANDLES_HTML =
    '<div class="desk-window-resize" aria-hidden="true">' +
      '<span class="desk-window-resize-e" data-resize="e"></span>' +
      '<span class="desk-window-resize-s" data-resize="s"></span>' +
      '<span class="desk-window-resize-se" data-resize="se"></span>' +
    '</div>';

  function genId() {
    return 'win-' + (++windowId);
  }

  function parseNum(s, def) {
    const n = parseInt(s, 10);
    return isNaN(n) ? def : n;
  }

  function renderAppGrid(app) {
    const items = app.items.map(function (item) {
      var attrs = '';
      if (item.openApp) {
        attrs = ' data-open-app="' + escapeHtml(item.openApp) + '"';
      } else if (item.url) {
        attrs = ' data-open-url="' + escapeHtml(item.url) + '" data-open-title="' + escapeHtml(item.title) + '"';
      }
      return '<button type="button" class="desk-app-card desk-app-card-btn"' + attrs + '>' +
        '<span class="desk-app-card-icon"><i class="' + item.icon + '"></i></span>' +
        '<span class="desk-app-card-title">' + escapeHtml(item.title) + '</span>' +
        (item.desc ? '<span class="desk-app-card-desc">' + escapeHtml(item.desc) + '</span>' : '') + '</button>';
    }).join('');
    return '<div class="desk-window-content"><h2>' + escapeHtml(app.title) + '</h2><div class="desk-app-grid">' + items + '</div></div>';
  }

  function renderFolderList(app) {
    var list = app.items.map(function (item) {
      var iconClass = item.file ? 'txt' : 'link';
      var file = item.file ? escapeHtml(item.file) : '';
      return '<button type="button" class="desk-folder-item desk-folder-item-btn" data-open-url="' + escapeHtml(item.url) + '" data-open-title="' + escapeHtml(item.title) + '">' +
        '<span class="desk-folder-item-icon ' + iconClass + '"><i class="' + (item.icon || 'fas fa-file-alt') + '"></i></span>' +
        '<span class="desk-folder-item-name">' + escapeHtml(item.title) + '</span>' +
        (file ? '<span class="desk-folder-item-meta">' + file + '</span>' : '') +
        '</button>';
    }).join('');
    return '<div class="desk-folder-content"><div class="desk-folder-title">' + escapeHtml(app.title) + '</div><div class="desk-folder-list">' + list + '</div></div>';
  }

  function renderTxtContent(text) {
    var safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    return '<div class="desk-txt-content">' + safe.replace(/\n/g, '<br>') + '</div>';
  }

  function renderTrashEasterEgg() {
    return '<div class="desk-trash-easteregg">' +
      '<h3 class="desk-trash-easteregg-title">Поддержать проект</h3>' +
      '<img src="' + escapeHtml(CAT_IMAGE) + '" alt="Кот-талисман" class="desk-trash-easteregg-img">' +
      '<p class="desk-trash-easteregg-text">Задонатить на корм котику и хозяину — спасибо, что вы с нами!</p>' +
      '<a href="' + escapeHtml(DONATE_URL) + '" target="_blank" rel="noopener noreferrer" class="desk-trash-easteregg-btn">' +
        '<i class="fas fa-heart"></i> Поддержать' +
      '</a>' +
      '</div>';
  }

  function renderSettingsContent() {
    var host = typeof location !== 'undefined' ? (location.origin || '') : '';
    return '<div class="desk-settings-content">' +
      '<div class="desk-settings-section">' +
        '<div class="desk-settings-section-title">Внешний вид</div>' +
        '<div class="desk-settings-row">' +
          '<span class="desk-settings-label">Светлая тема</span>' +
          '<button type="button" class="desk-settings-toggle" id="desk-theme-toggle" aria-label="Переключить тему"></button>' +
        '</div>' +
      '</div>' +
      '</div>';
  }

  function renderTerminalContent(shell) {
    var isBash = shell === 'bash';
    var isCmd  = shell === 'cmd';
    var initialPrompt = isBash ? 'student@skl:~$ ' : (isCmd ? 'C:\\Users\\SKL> ' : 'PS C:\\Users\\SKL> ');
    return '<div class="desk-terminal-body" data-shell="' + escapeHtml(shell) + '">' +
      '<div class="desk-terminal-output" data-terminal-output></div>' +
      '<div class="desk-terminal-input-row">' +
        '<span class="desk-terminal-prompt-prefix" data-terminal-prompt>' + escapeHtml(initialPrompt) + '</span>' +
        '<input type="text" class="desk-terminal-input" data-terminal-input autocomplete="off" spellcheck="false">' +
      '</div>' +
    '</div>';
  }

  function openUrlInWindow(url, title, bounds) {
    if (!container || !taskbarApps) return;
    // Один экземпляр на пару url+title — если уже открыт, фокусируем
    for (var entry of windows) {
      var w = entry[1];
      if (w.appKey === 'iframe' && w.el.dataset.iframeUrl === url && (w.el.dataset.iframeTitle || '') === (title || '')) {
        w.el.classList.remove('minimized');
        w.el.style.display = '';
        setFocus(w.el.id);
        return w.el.id;
      }
    }
    var isArticle = (url || '').indexOf('/articles/') !== -1;
    var is2048 = (url || '').indexOf('2048.html') !== -1;
    if (!bounds && isArticle) {
      bounds = { w: 960, h: 600 };
    }
    if (!bounds && is2048) {
      bounds = { w: 520, h: 660 };
    }
    const id = genId();
    const win = document.createElement('div');
    win.className = 'desk-window focused';
    win.id = id;
    win.dataset.app = 'iframe';
    win.dataset.iframeUrl = url;
    win.dataset.iframeTitle = title;
    win.innerHTML =
      '<div class="desk-window-titlebar" data-drag>' +
        '<span class="desk-window-title">' + escapeHtml(title) + '</span>' +
        '<div class="desk-window-actions">' +
          '<button type="button" class="desk-window-btn minimize" aria-label="Свернуть"><i class="fas fa-minus"></i></button>' +
          '<button type="button" class="desk-window-btn maximize" aria-label="Развернуть"><i class="fas fa-expand-alt"></i><i class="fas fa-compress-alt" style="display:none"></i></button>' +
          '<button type="button" class="desk-window-btn close" aria-label="Закрыть"><i class="fas fa-times"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="desk-window-body"><iframe src="' + escapeHtml(url) + '" title="' + escapeHtml(title) + '"></iframe></div>' +
      RESIZE_HANDLES_HTML;
    positionWindow(win, bounds);
    if (isArticle && bounds && bounds.w) {
      win.style.width = bounds.w + 'px';
      win.style.height = (bounds.h || DEFAULT_H) + 'px';
    }
    if (is2048 && bounds && bounds.w) {
      win.style.width = bounds.w + 'px';
      win.style.height = (bounds.h || DEFAULT_H) + 'px';
      win.style.minWidth = bounds.w + 'px';
      win.style.maxWidth = bounds.w + 'px';
      win.style.minHeight = bounds.h + 'px';
      win.style.maxHeight = bounds.h + 'px';
      win.classList.add('desk-window--fixed-size');
    }
    container.appendChild(win);
    const taskbarBtn = document.createElement('button');
    taskbarBtn.type = 'button';
    taskbarBtn.className = 'desk-taskbar-app-btn active';
    taskbarBtn.textContent = title;
    taskbarBtn.dataset.windowId = id;
    windows.set(id, { el: win, taskbarBtn, appKey: 'iframe' });
    taskbarApps.appendChild(taskbarBtn);
    setFocus(id);
    taskbarBtn.addEventListener('click', function () {
      const w = windows.get(id);
      if (!w) return;
      if (w.el.classList.contains('minimized')) {
        w.el.classList.remove('minimized');
        w.el.style.display = '';
      }
      setFocus(id);
    });
    win.querySelector('.desk-window-btn.close').addEventListener('click', function () { closeWindow(id); });
    win.querySelector('.desk-window-btn.minimize').addEventListener('click', function () {
      win.classList.add('minimized');
      win.style.display = 'none';
      pushStateDebounced();
    });
    var maxBtn = win.querySelector('.desk-window-btn.maximize');
    if (maxBtn) maxBtn.addEventListener('click', function () { toggleMaximize(win); });
    win.addEventListener('mousedown', function () { setFocus(id); });
    pushStateDebounced();
    updateWelcomeVisibility();
    return id;
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function openApp(appKey, bounds) {
    if (!container || !taskbarApps) return;
    const app = APPS[appKey];
    if (!app) return;

    // Одно окно на приложение — если уже открыто, показываем и фокусируем
    for (var entry of windows) {
      var w = entry[1];
      if (w.appKey === appKey) {
        w.el.classList.remove('minimized');
        w.el.style.display = '';
        setFocus(w.el.id);
        return w.el.id;
      }
    }

    const id = genId();
    var bodyHtml = '';

    if (app.type === 'folder' && app.items) {
      bodyHtml = renderFolderList(app);
    } else if (app.type === 'txt' && app.filename) {
      bodyHtml = renderTxtContent(ABOUT_TXT);
    } else if (app.type === 'settings') {
      bodyHtml = renderSettingsContent();
    } else if (app.type === 'easteregg' && appKey === 'trash') {
      bodyHtml = renderTrashEasterEgg();
    } else if (app.type === 'terminal') {
      bodyHtml = renderTerminalContent(app.shell);
    } else if (app.items) {
      bodyHtml = renderAppGrid(app);
    } else if (app.url) {
      bodyHtml = '<iframe src="' + app.url + '" title="' + escapeHtml(app.title) + '"></iframe>';
    }

    const win = document.createElement('div');
    win.className = 'desk-window focused';
    win.id = id;
    win.dataset.app = appKey;
    win.dataset.appKey = appKey;
    win.innerHTML =
      '<div class="desk-window-titlebar" data-drag>' +
        '<span class="desk-window-title"><i class="' + app.icon + '"></i> ' + escapeHtml(app.filename || app.title) + '</span>' +
        '<div class="desk-window-actions">' +
          '<button type="button" class="desk-window-btn minimize" aria-label="Свернуть"><i class="fas fa-minus"></i></button>' +
          '<button type="button" class="desk-window-btn maximize" aria-label="Развернуть"><i class="fas fa-expand-alt"></i><i class="fas fa-compress-alt" style="display:none"></i></button>' +
          '<button type="button" class="desk-window-btn close" aria-label="Закрыть"><i class="fas fa-times"></i></button>' +
        '</div>' +
      '</div>' +
      '<div class="desk-window-body">' + bodyHtml + '</div>' +
      RESIZE_HANDLES_HTML;

    positionWindow(win, bounds);
    container.appendChild(win);
    if (appKey === 'trash' && !bounds) {
      win.style.width = '400px';
      win.style.height = '420px';
    }

    var taskbarBtn;
    if (PINNED_APPS.indexOf(appKey) >= 0) {
      taskbarBtn = document.querySelector('.desk-taskbar-pinned-btn[data-app="' + appKey + '"]');
    }
    if (!taskbarBtn) {
      taskbarBtn = document.createElement('button');
      taskbarBtn.type = 'button';
      taskbarBtn.className = 'desk-taskbar-app-btn active';
      taskbarBtn.textContent = app.title;
      taskbarBtn.dataset.windowId = id;
      taskbarApps.appendChild(taskbarBtn);
    } else {
      taskbarBtn.classList.add('active');
      taskbarBtn.dataset.windowId = id;
    }

    windows.set(id, { el: win, taskbarBtn, appKey });
    setFocus(id);
    updateWelcomeVisibility();

    if (PINNED_APPS.indexOf(appKey) < 0) {
      taskbarBtn.addEventListener('click', function () {
        const w = windows.get(id);
        if (!w) return;
        if (w.el.classList.contains('minimized')) {
          w.el.classList.remove('minimized');
          w.el.style.display = '';
        }
        setFocus(id);
      });
    }

    win.querySelector('.desk-window-btn.close').addEventListener('click', function () { closeWindow(id); });
    win.querySelector('.desk-window-btn.minimize').addEventListener('click', function () {
      win.classList.add('minimized');
      win.style.display = 'none';
      taskbarBtn.classList.add('active');
      pushStateDebounced();
    });
    var maxBtnApp = win.querySelector('.desk-window-btn.maximize');
    if (maxBtnApp) maxBtnApp.addEventListener('click', function () { toggleMaximize(win); });

    win.addEventListener('mousedown', function () { setFocus(id); });
    if (app.type === 'settings') initSettings(win);
    if (app.type === 'terminal') initTerminal(win, app.shell);
    pushStateDebounced();
    return id;
  }

  function toggleMaximize(win) {
    var isMax = win.classList.toggle('maximized');
    var maxBtn = win.querySelector('.desk-window-btn.maximize');
    if (!maxBtn) return;
    var iconExpand = maxBtn.querySelector('.fa-expand-alt');
    var iconCompress = maxBtn.querySelector('.fa-compress-alt');
    if (isMax) {
      win.dataset.prevLeft = win.style.left || '';
      win.dataset.prevTop = win.style.top || '';
      win.dataset.prevWidth = win.style.width || '';
      win.dataset.prevHeight = win.style.height || '';
      if (iconExpand) iconExpand.style.display = 'none';
      if (iconCompress) iconCompress.style.display = 'inline';
    } else {
      win.style.left = win.dataset.prevLeft || '';
      win.style.top = win.dataset.prevTop || '';
      win.style.width = win.dataset.prevWidth || '';
      win.style.height = win.dataset.prevHeight || '';
      if (iconExpand) iconExpand.style.display = 'inline';
      if (iconCompress) iconCompress.style.display = 'none';
    }
    pushStateDebounced();
  }

  function initSettings(win) {
    var body = document.body;
    var key = 'desk-theme';
    if (localStorage.getItem(key) === 'light') body.classList.add('light-theme');
    var toggle = win.querySelector('#desk-theme-toggle');
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', body.classList.contains('light-theme'));
    toggle.addEventListener('click', function () {
      body.classList.toggle('light-theme');
      localStorage.setItem(key, body.classList.contains('light-theme') ? 'light' : 'dark');
      toggle.setAttribute('aria-pressed', body.classList.contains('light-theme'));
    });
  }

  function initTerminal(win, shell) {
    var output    = win.querySelector('[data-terminal-output]');
    var input     = win.querySelector('[data-terminal-input]');
    var promptEl  = win.querySelector('[data-terminal-prompt]');
    if (!output || !input) return;

    var isBash = shell === 'bash';
    var isCmd  = shell === 'cmd';

    // ── История команд (↑↓) ──
    var histCmds = [];
    var histIdx  = -1;

    // ── Bash: виртуальная файловая система ──
    var bashPath = '/home/skl';
    var FS = {
      '/home/skl':                  { files: ['readme.txt', 'notes.txt', 'scripts/', 'projects/'] },
      '/home/skl/scripts':          { files: ['hello.sh', 'backup.sh'] },
      '/home/skl/projects':         { files: ['webapp/', 'api/'] },
      '/home/skl/projects/webapp':  { files: ['index.html', 'style.css'] },
      '/home/skl/projects/api':     { files: ['server.py', 'requirements.txt'] }
    };
    var FILES = {
      '/home/skl/readme.txt':
        'SKL Academy — Bash Тренажёр\n============================\n\nДобро пожаловать! Это интерактивный bash-тренажёр.\nВведи help для списка доступных команд.\n\nСтруктура файловой системы:\n~/\n├── readme.txt\n├── notes.txt\n├── scripts/\n│   ├── hello.sh\n│   └── backup.sh\n└── projects/\n    ├── webapp/\n    └── api/',
      '/home/skl/notes.txt':
        'Заметки по Linux\n-----------------\n• Linux — основа серверного мира\n• bash — мощнейший инструмент автоматизации\n• Учи: ls, cd, grep, find, chmod, cat, pipe (|)\n• Каждый devops-инженер обязан знать bash',
      '/home/skl/scripts/hello.sh':
        '#!/bin/bash\n# Простой приветственный скрипт\n\nNAME="SKL Student"\necho "Привет, $NAME!"\necho "Дата: $(date)"\necho "Текущий путь: $(pwd)"',
      '/home/skl/scripts/backup.sh':
        '#!/bin/bash\n# Скрипт резервного копирования\n\nSRC="/home/skl/projects"\nDST="/backup"\nDATE=$(date +%Y%m%d)\n\necho "Создаю бэкап $SRC -> $DST/$DATE"\ntar -czf "$DST/backup-$DATE.tar.gz" "$SRC"\necho "Готово!"',
      '/home/skl/projects/webapp/index.html':
        '<!DOCTYPE html>\n<html lang="ru">\n<head>\n  <meta charset="UTF-8">\n  <title>My App</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n  <h1>Привет, мир!</h1>\n</body>\n</html>',
      '/home/skl/projects/webapp/style.css':
        'body {\n  font-family: sans-serif;\n  background: #f8fafc;\n  color: #1a1a2e;\n}\n\nh1 { color: #4338ca; }',
      '/home/skl/projects/api/server.py':
        'from flask import Flask\napp = Flask(__name__)\n\n@app.route("/")\ndef index():\n    return {"status": "ok", "message": "Hello from SKL API"}\n\nif __name__ == "__main__":\n    app.run(debug=True)',
      '/home/skl/projects/api/requirements.txt':
        'flask==3.0.0\ngunicorn==21.2.0\npython-dotenv==1.0.0'
    };

    // ── Путь для PS/CMD ──
    var winPath = 'C:\\Users\\SKL';

    function getPrompt() {
      if (isBash) return 'student@skl:' + bashPath.replace('/home/skl', '~') + '$ ';
      if (isCmd)  return winPath + '> ';
      return 'PS ' + winPath + '> ';
    }

    function updatePromptEl() {
      if (promptEl) promptEl.textContent = getPrompt();
    }

    function out(text, cls) {
      var lines = String(text).split('\n');
      lines.forEach(function(line) {
        var div = document.createElement('div');
        div.className = 'desk-terminal-line' + (cls ? ' ' + cls : '');
        div.textContent = line;
        output.appendChild(div);
      });
    }

    function outBlank() { output.appendChild(document.createElement('div')); }

    // ── Приветствие ──
    if (isBash) {
      out('GNU bash, version 5.2.15(1)-release (x86_64-pc-linux-gnu)', 'info');
      out('SKL Academy — Bash тренажёр. Введи help для справки.', 'info');
    } else if (isCmd) {
      out('Microsoft Windows [Version 10.0.22621.3007]', 'info');
      out('(c) SKL Academy. Тренажёр команд CMD. Введи help.', 'info');
    } else {
      out('Windows PowerShell 7.4.0', 'info');
      out('SKL Academy — PowerShell тренажёр. Введи Get-Help.', 'info');
    }
    outBlank();
    updatePromptEl();

    // ══════════════════════════════════════════
    //  BASH
    // ══════════════════════════════════════════
    function runBash(line) {
      var parts = line.trim().match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
      var cmd   = (parts[0] || '').toLowerCase();
      var args  = parts.slice(1).map(function(a){ return a.replace(/^['"]|['"]$/g, ''); });
      var flags = args.filter(function(a){ return a.startsWith('-'); });
      var rest  = args.join(' ');

      if (cmd === 'clear' || cmd === 'cls') { output.innerHTML = ''; return; }
      if (cmd === 'exit')    { out('Выход: закройте окно.', 'info'); return; }
      if (cmd === 'whoami')  { out('student'); return; }
      if (cmd === 'hostname'){ out('skl-academy'); return; }
      if (cmd === 'date')    { out(new Date().toString()); return; }
      if (cmd === 'uname') {
        if (flags.includes('-a') || flags.includes('-r')) {
          out('Linux skl-academy 5.15.0-skl #1 SMP x86_64 GNU/Linux');
        } else { out('Linux'); }
        return;
      }
      if (cmd === 'pwd') { out(bashPath); return; }
      if (cmd === 'echo') { out(rest.replace(/\$HOME/g, '/home/skl').replace(/\$USER/g, 'student')); return; }
      if (cmd === 'history') {
        histCmds.forEach(function(h, i) { out('  ' + String(i + 1).padStart(3) + '  ' + h); });
        return;
      }
      if (cmd === 'ls') {
        var dir = FS[bashPath];
        if (!dir) { out('ls: не могу получить доступ к \'' + bashPath + '\': Нет такого файла или каталога', 'error'); return; }
        var showHidden = flags.includes('-a') || flags.some(function(f){ return f.includes('a'); });
        var longFmt    = flags.some(function(f){ return f.includes('l'); });
        var items = dir.files.slice();
        if (showHidden) items = ['.', '..', '.bashrc', '.bash_history'].concat(items);
        if (longFmt) {
          out('total ' + (items.length * 4));
          items.forEach(function(f) {
            var isDir  = f.endsWith('/') || f === '.' || f === '..';
            var isHid  = f.startsWith('.');
            var perm   = isDir ? 'drwxr-xr-x' : (isHid ? '-rw-------' : '-rw-r--r--');
            var size   = isDir ? '4096' : String((FILES[bashPath + '/' + f] || '').length || 64);
            out(perm + '  1 student student ' + size.padStart(5) + ' Mar  3 12:00 ' + f, isDir ? 'success' : '');
          });
        } else {
          out(items.join('   '));
        }
        return;
      }
      if (cmd === 'cd') {
        var target = args[0];
        if (!target || target === '~') { bashPath = '/home/skl'; updatePromptEl(); return; }
        if (target === '-') { out('bash: cd: OLDPWD not set', 'error'); return; }
        var newPath;
        if (target === '..') {
          var p = bashPath.split('/');
          p.pop();
          newPath = p.join('/') || '/';
        } else if (target.startsWith('/')) {
          newPath = target.replace(/\/$/, '') || '/';
        } else {
          newPath = bashPath + '/' + target.replace(/\/$/, '');
        }
        if (FS[newPath]) { bashPath = newPath; updatePromptEl(); return; }
        out('bash: cd: ' + target + ': Нет такого файла или каталога', 'error');
        return;
      }
      if (cmd === 'cat') {
        if (!args[0]) { out('cat: нет операнда\nПопробуй: cat readme.txt', 'error'); return; }
        var fp = args[0].startsWith('/') ? args[0] : bashPath + '/' + args[0];
        if (FILES[fp] !== undefined) { out(FILES[fp]); return; }
        if (FS[fp])  { out('cat: ' + args[0] + ': это каталог', 'error'); return; }
        out('cat: ' + args[0] + ': Нет такого файла или каталога', 'error');
        return;
      }
      if (cmd === 'mkdir') {
        if (!args[0]) { out('mkdir: нет операнда', 'error'); return; }
        var nd = bashPath + '/' + args[0];
        if (FS[nd]) { out('mkdir: невозможно создать каталог \'' + args[0] + '\': Файл существует', 'error'); return; }
        FS[nd] = { files: [] };
        if (FS[bashPath]) FS[bashPath].files.push(args[0] + '/');
        out('', 'success');
        return;
      }
      if (cmd === 'touch') {
        if (!args[0]) { out('touch: нет операнда', 'error'); return; }
        var tf = bashPath + '/' + args[0];
        if (FILES[tf] === undefined) {
          FILES[tf] = '';
          if (FS[bashPath]) FS[bashPath].files.push(args[0]);
        }
        return;
      }
      if (cmd === 'rm') {
        if (!args[0]) { out('rm: нет операнда', 'error'); return; }
        var rf = bashPath + '/' + args[0];
        if (FILES[rf] !== undefined) {
          delete FILES[rf];
          if (FS[bashPath]) FS[bashPath].files = FS[bashPath].files.filter(function(f){ return f !== args[0]; });
          return;
        }
        out('rm: невозможно удалить \'' + args[0] + '\': Нет такого файла или каталога', 'error');
        return;
      }
      if (cmd === 'grep') {
        if (args.length < 2) { out('Использование: grep <шаблон> <файл>', 'error'); return; }
        var pattern = args[0], gfile = args[1];
        var gfp = gfile.startsWith('/') ? gfile : bashPath + '/' + gfile;
        if (FILES[gfp] === undefined) { out('grep: ' + gfile + ': Нет такого файла или каталога', 'error'); return; }
        var glines = FILES[gfp].split('\n');
        var found  = glines.filter(function(l){ return l.toLowerCase().includes(pattern.toLowerCase()); });
        if (found.length) found.forEach(function(l){ out(l, 'success'); });
        else out('(совпадений не найдено)');
        return;
      }
      if (cmd === 'find') {
        out(bashPath);
        var allPaths = [bashPath];
        Object.keys(FS).forEach(function(k){
          if (k.startsWith(bashPath + '/')) {
            allPaths.push(k);
            FS[k].files.forEach(function(f){
              if (!f.endsWith('/')) allPaths.push(k + '/' + f);
            });
          }
        });
        FS[bashPath].files.forEach(function(f){
          if (!f.endsWith('/')) allPaths.push(bashPath + '/' + f);
        });
        allPaths.slice(1).forEach(function(p){ out(p); });
        return;
      }
      if (cmd === 'man' || cmd === 'help') {
        out('Доступные команды bash:');
        out('  ls [-la]          список файлов/каталогов');
        out('  cd <dir>          сменить каталог (cd ~ — домой)');
        out('  pwd               текущий каталог');
        out('  cat <file>        содержимое файла');
        out('  mkdir <dir>       создать каталог');
        out('  touch <file>      создать пустой файл');
        out('  rm <file>         удалить файл');
        out('  grep <pat> <f>    поиск в файле');
        out('  find              найти файлы рекурсивно');
        out('  echo <text>       вывести текст');
        out('  whoami            текущий пользователь');
        out('  hostname          имя хоста');
        out('  date              дата и время');
        out('  uname -a          информация о системе');
        out('  history           история команд');
        out('  clear             очистить экран');
        out('');
        out('Совет: используй ↑↓ для навигации по истории', 'info');
        return;
      }
      if (cmd === '') return;
      out('bash: ' + parts[0] + ': команда не найдена', 'error');
      out('Введи help для списка команд', 'info');
    }

    // ══════════════════════════════════════════
    //  CMD
    // ══════════════════════════════════════════
    function runCmd(line) {
      var parts = line.trim().split(/\s+/);
      var cmd   = (parts[0] || '').toUpperCase();
      var rest  = parts.slice(1).join(' ');
      if (cmd === 'CLS')  { output.innerHTML = ''; return; }
      if (cmd === 'EXIT') { out('Закройте окно для выхода.', 'info'); return; }
      if (cmd === 'VER')  { out('Microsoft Windows [Version 10.0.22621.3007]'); return; }
      if (cmd === 'ECHO') { out(rest || 'ECHO включён.'); return; }
      if (cmd === 'CD' || cmd === 'CHDIR') {
        if (!rest || rest === '..') winPath = 'C:\\Users\\SKL';
        else winPath = winPath + '\\' + rest;
        out(winPath); updatePromptEl(); return;
      }
      if (cmd === 'DIR') {
        out(' Том в устройстве C: не имеет метки.');
        out(' Содержимое папки ' + winPath);
        outBlank();
        out('03.03.2026  12:00    <DIR>          .');
        out('03.03.2026  12:00    <DIR>          ..');
        out('03.03.2026  12:00               512  notes.txt');
        out('03.03.2026  12:00    <DIR>          Documents');
        out('03.03.2026  12:00    <DIR>          Downloads');
        outBlank();
        out('               1 файл(ов)             512 байт');
        return;
      }
      if (cmd === 'IPCONFIG') {
        out('Настройка протокола Windows IP');
        outBlank();
        out('Адаптер Ethernet eth0:');
        out('   IPv4-адрес . . . . . . . . . . . : 192.168.1.100');
        out('   Маска подсети . . . . . . . . . . : 255.255.255.0');
        out('   Основной шлюз . . . . . . . . . . : 192.168.1.1');
        return;
      }
      if (cmd === 'PING') {
        var host = rest || 'google.com';
        out('Обмен пакетами с ' + host + ' [8.8.8.8]:');
        out('Ответ от 8.8.8.8: число байт=32 время=12мс TTL=57', 'success');
        out('Ответ от 8.8.8.8: число байт=32 время=11мс TTL=57', 'success');
        out('Ответ от 8.8.8.8: число байт=32 время=13мс TTL=57', 'success');
        outBlank();
        out('Статистика Ping для 8.8.8.8: пакетов: отправлено=3, получено=3, потеряно=0');
        return;
      }
      if (cmd === 'HELP') {
        out('Доступные команды CMD:');
        out('  DIR           список файлов');
        out('  CD <путь>     сменить каталог');
        out('  ECHO <текст>  вывести текст');
        out('  CLS           очистить экран');
        out('  VER           версия Windows');
        out('  IPCONFIG      сетевые настройки');
        out('  PING <хост>   проверить соединение');
        out('  SYSTEMINFO    информация о системе');
        out('  TASKLIST      список процессов');
        out('  EXIT          выход');
        return;
      }
      if (cmd === 'SYSTEMINFO') {
        out('Имя узла:          SKL-ACADEMY');
        out('Имя ОС:            Microsoft Windows 11 Pro');
        out('Версия ОС:         10.0.22621 N/A Build 22621');
        out('Изготовитель ОС:   Microsoft Corporation');
        out('Процессор(ы):      1 процессор, Intel64 Family 6');
        return;
      }
      if (cmd === 'TASKLIST') {
        out('Имя образа          PID   Имя сессии    Использование памяти');
        out('=================== ===== ============= ====================');
        out('System              4     Services        1 028 КБ');
        out('explorer.exe        2156  Console        48 640 КБ', 'success');
        out('code.exe            4832  Console       312 448 КБ', 'success');
        out('chrome.exe          5120  Console       189 312 КБ');
        return;
      }
      if (cmd === '') return;
      out('"' + parts[0] + '" не является внутренней или внешней командой,', 'error');
      out('исполняемой программой или пакетным файлом.', 'error');
    }

    // ══════════════════════════════════════════
    //  POWERSHELL
    // ══════════════════════════════════════════
    function runPs(line) {
      var parts = line.trim().split(/\s+/);
      var cmd   = (parts[0] || '').toLowerCase();
      var rest  = parts.slice(1).join(' ');
      if (cmd === 'clear-host' || cmd === 'clear' || cmd === 'cls') { output.innerHTML = ''; return; }
      if (cmd === 'exit') { out('Закройте окно для выхода.', 'info'); return; }
      if (cmd === 'get-help' || cmd === 'help') {
        out('Доступные командлеты PowerShell:');
        out('  Get-ChildItem (ls, dir)   список элементов');
        out('  Set-Location  (cd)        сменить каталог');
        out('  Get-Location  (pwd)       текущий путь');
        out('  Write-Output  (echo)      вывести');
        out('  Get-Process               список процессов');
        out('  Get-Service               список служб');
        out('  Get-Content               содержимое файла');
        out('  Test-Connection           проверить соединение');
        out('  Get-Date                  дата и время');
        out('  Get-ComputerInfo          информация о системе');
        out('  Clear-Host                очистить экран');
        out('');
        out('Совет: используй ↑↓ для навигации по истории', 'info');
        return;
      }
      if (cmd === 'write-output' || cmd === 'echo') { out(rest || ''); return; }
      if (cmd === 'get-location' || cmd === 'pwd') {
        outBlank();
        out('Path');
        out('----');
        out(winPath);
        outBlank();
        return;
      }
      if (cmd === 'get-date') { out(new Date().toString()); return; }
      if (cmd === 'get-childitem' || cmd === 'dir' || cmd === 'ls' || cmd === 'gci') {
        outBlank();
        out('    Directory: ' + winPath);
        outBlank();
        out('Mode                 LastWriteTime         Length  Name');
        out('----                 -------------         ------  ----');
        out('d----          03.03.2026  12:00                   Documents', 'success');
        out('d----          03.03.2026  12:00                   Downloads', 'success');
        out('-a---          03.03.2026  12:00             512   notes.txt');
        out('-a---          03.03.2026  12:00            1024   profile.ps1');
        outBlank();
        return;
      }
      if (cmd === 'set-location' || cmd === 'cd') {
        if (!rest || rest === '~') winPath = 'C:\\Users\\SKL';
        else if (rest === '..') {
          var parts2 = winPath.split('\\');
          if (parts2.length > 1) parts2.pop();
          winPath = parts2.join('\\') || 'C:\\';
        } else winPath = winPath + '\\' + rest;
        updatePromptEl(); return;
      }
      if (cmd === 'get-process' || cmd === 'ps') {
        out('Handles  NPM(K)    PM(K)      WS(K) CPU(s)     Id  ProcessName');
        out('-------  ------    -----      ----- ------     --  -----------');
        out('    424      28    45212      52316   0.52   4832  Code', 'success');
        out('    892      68   189312     201024   3.14   5120  chrome', 'success');
        out('    156      12     8192       9344   0.05   2156  explorer');
        out('     48       4     1028       1540   0.00      4  System');
        return;
      }
      if (cmd === 'get-service') {
        out('Status   Name               DisplayName');
        out('------   ----               -----------');
        out('Running  WinDefend          Windows Defender Antivirus', 'success');
        out('Running  wuauserv           Windows Update', 'success');
        out('Stopped  Print Spooler      Print Spooler');
        out('Running  AudioSrv           Windows Audio', 'success');
        return;
      }
      if (cmd === 'test-connection') {
        var host = rest || 'google.com';
        out('Source        Destination   IPV4Address    Bytes    Time(ms)');
        out('------        -----------   -----------    -----    --------');
        out('SKL-ACADEMY   ' + host.padEnd(14) + '8.8.8.8        32       12', 'success');
        out('SKL-ACADEMY   ' + host.padEnd(14) + '8.8.8.8        32       11', 'success');
        return;
      }
      if (cmd === 'get-computerinfo') {
        out('WindowsProductName : Windows 11 Pro');
        out('OsArchitecture     : 64-bit');
        out('CsName             : SKL-ACADEMY');
        out('CsProcessors       : {Intel Core i7}');
        out('OsTotalVisibleMemorySize : 16777216');
        return;
      }
      if (cmd === 'get-content' || cmd === 'cat' || cmd === 'type') {
        if (!rest) { out('Get-Content: нет пути', 'error'); return; }
        out('Содержимое файла ' + rest + ':');
        out('# Файл: ' + rest);
        out('# (Содержимое недоступно в тренажёре)');
        return;
      }
      if (cmd === '$psversiontable' || cmd === '$host') {
        out('Name                           Value');
        out('----                           -----');
        out('PSVersion                      7.4.0');
        out('PSEdition                      Core');
        out('OS                             Microsoft Windows 10.0.22621');
        return;
      }
      if (cmd === '') return;
      out("'" + parts[0] + "' не распознано как имя командлета,", 'error');
      out('функции, файла сценария или исполняемой программы.', 'error');
      out('Введи Get-Help для списка команд.', 'info');
    }

    // ── Обработчик ввода ──
    input.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (histIdx < histCmds.length - 1) {
          histIdx++;
          input.value = histCmds[histCmds.length - 1 - histIdx] || '';
          // Ставим курсор в конец
          setTimeout(function(){ input.setSelectionRange(input.value.length, input.value.length); }, 0);
        }
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx > 0) {
          histIdx--;
          input.value = histCmds[histCmds.length - 1 - histIdx] || '';
        } else {
          histIdx = -1;
          input.value = '';
        }
        setTimeout(function(){ input.setSelectionRange(input.value.length, input.value.length); }, 0);
        return;
      }
      if (e.key !== 'Enter') return;
      e.preventDefault();
      var line = input.value;
      input.value = '';
      histIdx = -1;

      // Записываем в историю (непустые команды)
      if (line.trim()) histCmds.push(line);

      // Показываем введённую команду в выводе
      var echoLine = document.createElement('div');
      echoLine.className = 'desk-terminal-line prompt';
      echoLine.textContent = getPrompt() + line;
      output.appendChild(echoLine);

      // Выполняем команду
      if (isBash)       runBash(line);
      else if (isCmd)   runCmd(line);
      else              runPs(line);

      outBlank();
      updatePromptEl();
      output.scrollTop = output.scrollHeight;
      input.focus();
    });

    input.focus();
  }

  function positionWindow(win, bounds) {
    if (bounds && bounds.x != null && bounds.y != null) {
      win.style.left = Math.max(0, bounds.x) + 'px';
      win.style.top = Math.max(0, bounds.y) + 'px';
      win.style.width = (bounds.w || DEFAULT_W) + 'px';
      win.style.height = (bounds.h || DEFAULT_H) + 'px';
      return;
    }
    const step = 28;
    const n = windows.size;
    const x = 80 + (n % 4) * step;
    const y = 60 + Math.floor(n / 4) * step;
    win.style.width = DEFAULT_W + 'px';
    win.style.height = DEFAULT_H + 'px';
    win.style.left = x + 'px';
    win.style.top = y + 'px';
  }

  function closeWindow(id) {
    const w = windows.get(id);
    if (!w) return;
    w.el.remove();
    if (w.taskbarBtn.classList.contains('desk-taskbar-pinned-btn')) {
      w.taskbarBtn.classList.remove('active');
      w.taskbarBtn.removeAttribute('data-window-id');
    } else {
      w.taskbarBtn.remove();
    }
    windows.delete(id);
    if (focusedId === id) {
      const next = Array.from(windows.keys()).pop();
      focusedId = next || null;
      if (next) windows.get(next).el.classList.add('focused');
    }
    pushStateDebounced();
    updateWelcomeVisibility();
  }

  function setFocus(id) {
    var w = windows.get(id);
    // Всегда поднимаем окно на передний план при любом обращении
    if (w) w.el.style.zIndex = ++_zCounter;
    if (focusedId === id) return;
    windows.forEach(function (wd, wid) {
      wd.el.classList.toggle('focused', wid === id);
      wd.taskbarBtn.classList.toggle('active', wid === id);
    });
    focusedId = id;
  }

  function startDrag(win, clientX, clientY) {
    setFocus(win.id);
    if (win.classList.contains('maximized')) {
      win.classList.remove('maximized');
      win.style.left = win.dataset.prevLeft || '80px';
      win.style.top = win.dataset.prevTop || '60px';
      win.style.width = win.dataset.prevWidth || DEFAULT_W + 'px';
      win.style.height = win.dataset.prevHeight || DEFAULT_H + 'px';
      var maxBtn = win.querySelector('.desk-window-btn.maximize');
      if (maxBtn) {
        var ie = maxBtn.querySelector('.fa-expand-alt');
        var ic = maxBtn.querySelector('.fa-compress-alt');
        if (ie) ie.style.display = 'inline';
        if (ic) ic.style.display = 'none';
      }
    }
    var rect = win.getBoundingClientRect();
    dragState = {
      id: win.id,
      startX: clientX - rect.left,
      startY: clientY - rect.top
    };
    var titlebar = win.querySelector('.desk-window-titlebar');
    if (titlebar) titlebar.classList.add('dragging');
    document.addEventListener('mousemove', onDragMove, { passive: true });
    document.addEventListener('mouseup', onDragEnd);
    if (titlebar && titlebar.setPointerCapture) {
      try { titlebar.setPointerCapture(0); } catch (err) {}
    }
  }

  function onDragMove(e) {
    if (!dragState) return;
    var w = windows.get(dragState.id);
    if (!w) return;
    var el = w.el;
    var x = e.clientX - dragState.startX;
    var y = e.clientY - dragState.startY;
    el.style.left = Math.max(0, x) + 'px';
    el.style.top = Math.max(0, y) + 'px';
  }

  function onDragEnd() {
    if (dragState) {
      var w = windows.get(dragState.id);
      if (w) {
        var tb = w.el.querySelector('.desk-window-titlebar');
        if (tb) tb.classList.remove('dragging');
        try { if (tb.releasePointerCapture) tb.releasePointerCapture(0); } catch (err) {}
      }
    }
    dragState = null;
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);
    pushStateDebounced();
  }

  function getMaxWindowSize() {
    var taskbarH = 48;
    return {
      w: Math.floor(window.innerWidth * 0.95),
      h: Math.floor(window.innerHeight - taskbarH - 48)
    };
  }

  function startResize(win, edge, clientX, clientY, handle) {
    if (win.classList.contains('maximized')) return;
    setFocus(win.id);
    var rect = win.getBoundingClientRect();
    var max = getMaxWindowSize();
    resizeState = {
      id: win.id,
      edge: edge,
      handle: handle,
      startX: clientX,
      startY: clientY,
      startW: rect.width,
      startH: rect.height,
      startLeft: rect.left,
      startTop: rect.top,
      maxW: max.w,
      maxH: max.h
    };
    win.classList.add('desk-window-resizing');
    document.addEventListener('pointermove', onResizeMove, { passive: true });
    document.addEventListener('pointerup', onResizeEnd);
    document.addEventListener('pointercancel', onResizeEnd);
  }

  function onResizeMove(e) {
    if (!resizeState) return;
    var w = windows.get(resizeState.id);
    if (!w) return;
    var el = w.el;
    var dx = e.clientX - resizeState.startX;
    var dy = e.clientY - resizeState.startY;
    var edge = resizeState.edge;
    var newW = resizeState.startW;
    var newH = resizeState.startH;
    var newLeft = parseFloat(el.style.left) || resizeState.startLeft;
    var newTop = parseFloat(el.style.top) || resizeState.startTop;
    if (edge === 'e' || edge === 'se') newW = Math.max(MIN_W, Math.min(resizeState.maxW, resizeState.startW + dx));
    if (edge === 's' || edge === 'se') newH = Math.max(MIN_H, Math.min(resizeState.maxH, resizeState.startH + dy));
    el.style.width = newW + 'px';
    el.style.height = newH + 'px';
  }

  function onResizeEnd(e) {
    if (!resizeState) return;
    var w = windows.get(resizeState.id);
    if (w) w.el.classList.remove('desk-window-resizing');
    try { if (resizeState.handle && resizeState.handle.releasePointerCapture) resizeState.handle.releasePointerCapture(e.pointerId); } catch (err) {}
    resizeState = null;
    document.removeEventListener('pointermove', onResizeMove);
    document.removeEventListener('pointerup', onResizeEnd);
    document.removeEventListener('pointercancel', onResizeEnd);
    pushStateDebounced();
  }

  function cellToPixel(col, row) {
    return {
      x: GRID_ORIGIN_X + col * GRID_CELL_W,
      y: GRID_ORIGIN_Y + row * GRID_CELL_H
    };
  }

  function pixelToCell(x, y) {
    var col = Math.round((x - GRID_ORIGIN_X) / GRID_CELL_W);
    var row = Math.round((y - GRID_ORIGIN_Y) / GRID_CELL_H);
    col = Math.max(0, Math.min(GRID_COLS - 1, col));
    row = Math.max(0, Math.min(GRID_ROWS - 1, row));
    return { col: col, row: row };
  }

  function getDefaultIconPositions() {
    var positions = {};
    for (var i = 0; i < ICON_ORDER.length; i++) {
      positions[ICON_ORDER[i]] = { col: i % GRID_COLS, row: Math.floor(i / GRID_COLS) };
    }
    return positions;
  }

  function initDesktopIcons() {
    var pool = document.getElementById('desk-icons');
    if (!pool) return;
    var icons = pool.querySelectorAll('.desk-icon');
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(ICON_POS_KEY) || 'null'); } catch (err) {}
    var iconPositions = {};
    var used = {};
    function claimCell(col, row, appKey) {
      var k = col + ',' + row;
      if (used[k]) return false;
      used[k] = appKey;
      iconPositions[appKey] = { col: col, row: row };
      return true;
    }
    function nextFreeCell() {
      for (var r = 0; r < GRID_ROWS; r++) {
        for (var c = 0; c < GRID_COLS; c++) {
          if (!used[c + ',' + r]) return { col: c, row: r };
        }
      }
      return null;
    }
    ICON_ORDER.forEach(function (appKey) {
      var p = saved && saved[appKey];
      var col, row;
      if (p && typeof p.col === 'number' && typeof p.row === 'number') {
        col = Math.max(0, Math.min(GRID_COLS - 1, p.col));
        row = Math.max(0, Math.min(GRID_ROWS - 1, p.row));
      } else if (p && typeof p.x === 'number' && typeof p.y === 'number') {
        var c = pixelToCell(p.x, p.y);
        col = c.col;
        row = c.row;
      } else {
        var def = getDefaultIconPositions()[appKey];
        col = def.col;
        row = def.row;
      }
      if (!claimCell(col, row, appKey)) {
        var free = nextFreeCell();
        if (free) claimCell(free.col, free.row, appKey);
      }
    });
    function applyIconPositions() {
      icons.forEach(function (el) {
        var app = el.getAttribute('data-app');
        if (!app || !iconPositions[app]) return;
        var px = cellToPixel(iconPositions[app].col, iconPositions[app].row);
        el.style.left = px.x + 'px';
        el.style.top = px.y + 'px';
      });
    }
    function getIconAtCell(col, row) {
      for (var key in iconPositions) {
        if (iconPositions[key].col === col && iconPositions[key].row === row) return key;
      }
      return null;
    }
    function saveIconPositions() {
      try { localStorage.setItem(ICON_POS_KEY, JSON.stringify(iconPositions)); } catch (err) {}
    }
    applyIconPositions();
    pool.addEventListener('pointerdown', iconPointerDown, { capture: true });
    document.addEventListener('pointermove', iconPointerMove, { passive: true });
    document.addEventListener('pointerup', iconPointerUp);
    document.addEventListener('pointercancel', iconPointerUp);
    function iconPointerDown(e) {
      if (e.button !== 0 || e.isPrimary === false) return;
      if (iconDragState.active || dragState) return;
      var icon = e.target.closest('.desk-icon[data-app]');
      if (!icon || !icon.closest('#desk-icons')) return;
      e.preventDefault();
      e.stopPropagation();
      iconDragState.active = true;
      iconDragState.el = icon;
      iconDragState.startX = e.clientX;
      iconDragState.startY = e.clientY;
      iconDragState.left0 = parseInt(icon.style.left, 10) || 0;
      iconDragState.top0 = parseInt(icon.style.top, 10) || 0;
      iconDragState.appKey = icon.getAttribute('data-app');
      icon.classList.add('desk-icon-dragging');
      try { if (icon.setPointerCapture) icon.setPointerCapture(e.pointerId); } catch (err) {}
    }
    function iconPointerMove(e) {
      if (!iconDragState.active || !iconDragState.el) return;
      var x = iconDragState.left0 + (e.clientX - iconDragState.startX);
      var y = iconDragState.top0 + (e.clientY - iconDragState.startY);
      iconDragState.el.style.left = Math.max(0, x) + 'px';
      iconDragState.el.style.top = Math.max(0, y) + 'px';
    }
    function iconPointerUp(e) {
      if (!iconDragState.active) return;
      var icon = iconDragState.el;
      try { if (e && icon && icon.releasePointerCapture) icon.releasePointerCapture(e.pointerId); } catch (err) {}
      var moved = icon && e && (Math.abs(e.clientX - iconDragState.startX) > ICON_DRAG_THRESHOLD || Math.abs(e.clientY - iconDragState.startY) > ICON_DRAG_THRESHOLD);
      if (icon) {
        icon.classList.remove('desk-icon-dragging');
        if (moved) {
          lastDraggedIcon = icon;
          setTimeout(function () { lastDraggedIcon = null; }, 300);
          var left = parseInt(icon.style.left, 10) || 0;
          var top = parseInt(icon.style.top, 10) || 0;
          var newCell = pixelToCell(left, top);
          var appKey = iconDragState.appKey;
          var oldPos = iconPositions[appKey];
          if (oldPos && (oldPos.col !== newCell.col || oldPos.row !== newCell.row)) {
            var other = getIconAtCell(newCell.col, newCell.row);
            if (other && other !== appKey) {
              iconPositions[other] = { col: oldPos.col, row: oldPos.row };
              iconPositions[appKey] = { col: newCell.col, row: newCell.row };
            } else {
              iconPositions[appKey] = { col: newCell.col, row: newCell.row };
            }
          }
        }
        applyIconPositions();
      }
      saveIconPositions();
      iconDragState.active = false;
      iconDragState.el = null;
    }
  }

  function initCalendar() {
    var header = document.getElementById('desk-calendar-header');
    var grid = document.getElementById('desk-calendar-grid');
    if (!header || !grid) return;
    var now = new Date();
    var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    header.textContent = months[now.getMonth()] + ' ' + now.getFullYear();
    var year = now.getFullYear();
    var month = now.getMonth();
    var first = new Date(year, month, 1);
    var last = new Date(year, month + 1, 0);
    var startDay = first.getDay();
    if (startDay === 0) startDay = 7;
    var days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    days.forEach(function (d) {
      var c = document.createElement('div');
      c.className = 'desk-calendar-cell weekday';
      c.textContent = d;
      grid.appendChild(c);
    });
    var empty = startDay - 1;
    var prevMonth = new Date(year, month, 0);
    var prevDays = prevMonth.getDate();
    for (var i = 0; i < empty; i++) {
      var c = document.createElement('div');
      c.className = 'desk-calendar-cell other-month';
      c.textContent = prevDays - empty + 1 + i;
      grid.appendChild(c);
    }
    var today = now.getDate();
    for (var d = 1; d <= last.getDate(); d++) {
      var c = document.createElement('div');
      c.className = 'desk-calendar-cell' + (d === today ? ' today' : '');
      c.textContent = d;
      grid.appendChild(c);
    }
    var total = empty + last.getDate();
    var next = Math.max(0, 35 - total);
    for (var j = 0; j < next; j++) {
      var c = document.createElement('div');
      c.className = 'desk-calendar-cell other-month';
      c.textContent = j + 1;
      grid.appendChild(c);
    }
  }

  // Ресайз окна: захват за края и угол
  document.addEventListener('pointerdown', function (e) {
    if (e.button !== 0 || resizeState || dragState) return;
    var handle = e.target.closest('[data-resize]');
    if (!handle) return;
    var win = handle.closest('.desk-window');
    if (!win || !win.id || !windows.get(win.id)) return;
    e.preventDefault();
    e.stopPropagation();
    var edge = handle.getAttribute('data-resize');
    startResize(win, edge, e.clientX, e.clientY, handle);
    try { if (handle.setPointerCapture) handle.setPointerCapture(e.pointerId); } catch (err) {}
  }, true);

  // Перетаскивание окон: один обработчик на document (делегирование)
  document.addEventListener('mousedown', function (e) {
    if (e.button !== 0 || dragState || resizeState) return;
    if (e.target.closest('.desk-window-btn') || e.target.closest('[data-resize]')) return;
    var titlebar = e.target.closest('.desk-window-titlebar');
    if (!titlebar) return;
    var win = titlebar.closest('.desk-window');
    if (!win || !win.id || !windows.get(win.id)) return;
    e.preventDefault();
    e.stopPropagation();
    startDrag(win, e.clientX, e.clientY);
  }, true);

  function getState() {
    const list = [];
    windows.forEach(function (winData) {
      const el = winData.el;
      const style = el.style;
      const x = parseNum(String(style.left).replace('px', ''), 0);
      const y = parseNum(String(style.top).replace('px', ''), 0);
      const ww = parseNum(String(style.width).replace('px', ''), DEFAULT_W);
      const h = parseNum(String(style.height).replace('px', ''), DEFAULT_H);
      const minimized = el.classList.contains('minimized') ? 1 : 0;
      if (winData.appKey === 'iframe') {
        list.push({
          t: 'iframe',
          u: el.dataset.iframeUrl || '',
          l: el.dataset.iframeTitle || '',
          x: x, y: y, w: ww, h: h, m: minimized
        });
      } else {
        list.push({
          t: 'app',
          k: winData.appKey,
          x: x, y: y, w: ww, h: h, m: minimized
        });
      }
    });
    return { w: list };
  }

  function pushStateDebounced() {
    if (_restoring) return;
    if (_pushStateTimer) clearTimeout(_pushStateTimer);
    _pushStateTimer = setTimeout(function () {
      _pushStateTimer = null;
      const state = getState();
      if (state.w.length === 0) {
        if (window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.hash = '';
        }
        return;
      }
      try {
        const json = JSON.stringify(state);
        const encoded = btoa(unescape(encodeURIComponent(json)));
        const hash = '#s=' + encoded;
        if (window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search + hash);
        } else {
          window.location.hash = hash;
        }
      } catch (e) { /* ignore */ }
    }, 200);
  }

  function restoreState() {
    const hash = window.location.hash;
    if (!hash || hash.indexOf('#s=') !== 0) return;
    const encoded = hash.slice(3);
    try {
      const json = decodeURIComponent(escape(atob(encoded)));
      const state = JSON.parse(json);
      if (!state.w || !Array.isArray(state.w) || state.w.length === 0) return;
      _restoring = true;
      state.w.forEach(function (item) {
        var winId = null;
        if (item.t === 'app' && item.k && APPS[item.k]) {
          winId = openApp(item.k, { x: item.x, y: item.y, w: item.w, h: item.h });
        } else if (item.t === 'iframe' && item.u) {
          winId = openUrlInWindow(item.u, item.l || 'Окно', { x: item.x, y: item.y, w: item.w, h: item.h });
        }
        if (winId) {
          var w = windows.get(winId);
          if (w && item.m) {
            w.el.classList.add('minimized');
            w.el.style.display = 'none';
          }
        }
      });
      var ids = Array.from(windows.keys());
      if (ids.length) setFocus(ids[ids.length - 1]);
      _restoring = false;
      pushStateDebounced();
      updateWelcomeVisibility();
    } catch (e) { /* invalid hash */ }
  }

  function updateClock() {
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var text = hh + ':' + mm;
    var el = document.getElementById('desk-clock');
    if (el) el.textContent = text;
    el = document.getElementById('desk-calendar-time');
    if (el) el.textContent = text;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.desk-app-card-btn');
    if (btn && btn.dataset.openApp) {
      e.preventDefault();
      openApp(btn.dataset.openApp);
      return;
    }
    if (btn && btn.dataset.openUrl) {
      e.preventDefault();
      openUrlInWindow(btn.dataset.openUrl, btn.dataset.openTitle || 'Окно');
      return;
    }
    btn = e.target.closest('.desk-folder-item-btn');
    if (btn && btn.dataset.openUrl) {
      e.preventDefault();
      e.stopPropagation();
      openUrlInWindow(btn.dataset.openUrl, btn.dataset.openTitle || 'Документ');
    }
  });

  // Ярлыки на рабочем столе — клик открывает приложение (если не было перетаскивания)
  document.addEventListener('click', function (e) {
    var icon = e.target.closest('.desk-icon[data-app]');
    if (!icon) return;
    if (lastDraggedIcon === icon) {
      e.preventDefault();
      e.stopPropagation();
      lastDraggedIcon = null;
      return;
    }
    var appKey = icon.getAttribute('data-app');
    if (appKey === 'home') return;
    e.preventDefault();
    e.stopPropagation();
    openApp(appKey);
  });

  initDesktopIcons();
  initCalendar();

  // Меню «Пуск» (кнопка SKL) — открыть/закрыть
  if (startBtn && startMenu) {
    startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      startMenu.hidden = !startMenu.hidden;
    });
    startMenu.addEventListener('click', function (e) {
      e.stopPropagation();
    });
    document.querySelectorAll('.desk-start-menu-item[data-app]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        openApp(btn.getAttribute('data-app'));
        startMenu.hidden = true;
      });
    });
    document.addEventListener('click', function () {
      if (!startMenu.hidden) startMenu.hidden = true;
    });
  }

  // Закреплённые иконки в панели задач (по центру, как Win11)
  document.querySelectorAll('.desk-taskbar-pinned-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var app = btn.getAttribute('data-app');
      if (app) openApp(app);
    });
  });

  // Часы — обновлять сразу и каждую минуту
  updateClock();
  setInterval(updateClock, 60000);

  // Восстановление состояния из хеша при загрузке
  try {
    restoreState();
  } catch (err) {
    window.location.hash = '';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDesk);
} else {
  initDesk();
}
