// Templates
const templates = {
    blank: {
        html: '',
        css: '',
        js: ''
    },
    hello: {
        html: `<div class="container">
  <h1>Привет, мир!</h1>
  <p>Это моя первая веб-страница.</p>
</div>`,
        css: `body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  text-align: center;
  color: white;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

p {
  font-size: 1.2rem;
  opacity: 0.9;
}`,
        js: `// Ваш JavaScript код здесь
console.log('Привет, мир!');`
    },
    button: {
        html: `<div class="container">
  <button class="btn" id="myButton">
    Нажми меня!
  </button>
  <p class="counter">Нажатий: <span id="count">0</span></p>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #1a1a2e;
}

.container {
  text-align: center;
}

.btn {
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 15px rgba(0, 210, 255, 0.4);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 210, 255, 0.6);
}

.btn:active {
  transform: translateY(0);
}

.counter {
  margin-top: 24px;
  color: #8892b0;
  font-size: 18px;
}

#count {
  color: #00d2ff;
  font-weight: 600;
}`,
        js: `let count = 0;
const button = document.getElementById('myButton');
const countSpan = document.getElementById('count');

button.addEventListener('click', () => {
  count++;
  countSpan.textContent = count;
  console.log('Клик! Счётчик:', count);
});`
    },
    card: {
        html: `<div class="card">
  <div class="card-image">
    <span class="emoji">🎨</span>
  </div>
  <div class="card-content">
    <h2 class="card-title">Красивая карточка</h2>
    <p class="card-text">
      Это пример карточки с современным дизайном. 
      Можно использовать для товаров, статей или проектов.
    </p>
    <div class="card-footer">
      <span class="price">$99</span>
      <button class="buy-btn">Купить</button>
    </div>
  </div>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #f0f2f5;
}

.card {
  width: 320px;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.card-image {
  height: 180px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.emoji {
  font-size: 64px;
}

.card-content {
  padding: 24px;
}

.card-title {
  margin: 0 0 12px;
  font-size: 20px;
  color: #1a1a2e;
}

.card-text {
  margin: 0 0 20px;
  color: #666;
  line-height: 1.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: #667eea;
}

.buy-btn {
  padding: 10px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.buy-btn:hover {
  background: #764ba2;
}`,
        js: `const buyBtn = document.querySelector('.buy-btn');

buyBtn.addEventListener('click', () => {
  alert('Товар добавлен в корзину!');
  console.log('Покупка совершена');
});`
    },
    form: {
        html: `<div class="form-container">
  <h1>Вход</h1>
  <form id="loginForm">
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" placeholder="your@email.com" required>
    </div>
    <div class="form-group">
      <label for="password">Пароль</label>
      <input type="password" id="password" placeholder="••••••••" required>
    </div>
    <button type="submit" class="submit-btn">Войти</button>
  </form>
  <p class="signup-link">Нет аккаунта? <a href="#">Регистрация</a></p>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.form-container {
  width: 360px;
  padding: 40px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

h1 {
  margin: 0 0 32px;
  text-align: center;
  color: #1a1a2e;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 16px;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.signup-link {
  margin-top: 24px;
  text-align: center;
  color: #666;
  font-size: 14px;
}

.signup-link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.signup-link a:hover {
  text-decoration: underline;
}`,
        js: `const form = document.getElementById('loginForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  console.log('Вход:', { email, password: '***' });
  alert('Добро пожаловать, ' + email + '!');
});`
    },
    animation: {
        html: `<div class="animation-container">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
  <h1>CSS Анимации</h1>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: #0f0f23;
  overflow: hidden;
}

.animation-container {
  text-align: center;
  position: relative;
}

h1 {
  color: white;
  font-size: 32px;
  position: relative;
  z-index: 10;
  animation: fadeIn 1s ease-out;
}

.circle {
  position: absolute;
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}

.circle:nth-child(1) {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, #667eea 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0s;
}

.circle:nth-child(2) {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #764ba2 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 0.5s;
}

.circle:nth-child(3) {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #f093fb 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 1s;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.4;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
        js: `console.log('Анимация запущена!');

// Можно добавить интерактивность
document.addEventListener('click', () => {
  const h1 = document.querySelector('h1');
  h1.style.animation = 'none';
  setTimeout(() => {
    h1.style.animation = 'fadeIn 1s ease-out';
  }, 10);
  console.log('Анимация перезапущена!');
});`
    },
    flexbox: {
        html: `<div class="flex-container">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
  <div class="box">4</div>
  <div class="box">5</div>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background: #1a1a2e;
  box-sizing: border-box;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 40px);
}

.box {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: white;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.box:hover {
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
}

/* Попробуйте изменить эти свойства! */
/*
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly
align-items: flex-start | flex-end | center | stretch | baseline
flex-direction: row | row-reverse | column | column-reverse
*/`,
        js: `const boxes = document.querySelectorAll('.box');

boxes.forEach((box, index) => {
  box.addEventListener('click', () => {
    console.log('Клик по боксу', index + 1);
    box.style.background = \`hsl(\${Math.random() * 360}, 70%, 50%)\`;
  });
});`
    },
    grid: {
        html: `<div class="grid-container">
  <div class="item header">Header</div>
  <div class="item sidebar">Sidebar</div>
  <div class="item main">Main Content</div>
  <div class="item widget">Widget</div>
  <div class="item footer">Footer</div>
</div>`,
        css: `body {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  background: #0f0f23;
  box-sizing: border-box;
}

.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 80px 1fr 60px;
  grid-template-areas:
    "header header header"
    "sidebar main widget"
    "footer footer footer";
  gap: 16px;
  min-height: calc(100vh - 40px);
}

.item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
  transition: transform 0.2s;
}

.item:hover {
  transform: scale(1.02);
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
.widget { grid-area: widget; }
.footer { grid-area: footer; }

/* Попробуйте изменить grid-template-areas! */`,
        js: `const items = document.querySelectorAll('.item');

items.forEach(item => {
  item.addEventListener('click', () => {
    const name = item.textContent;
    console.log('Клик по:', name);
  });
});

console.log('CSS Grid layout загружен!');
console.log('Попробуйте изменить grid-template-areas в CSS.');`
    }
};

// CodeMirror instances
let htmlEditor, cssEditor, jsEditor;

// DOM Elements
const preview = document.getElementById('preview');
const consoleOutput = document.getElementById('consoleOutput');
const tabs = document.querySelectorAll('.tab');
const editorContainers = document.querySelectorAll('.editor-container');
const mobileTabs = document.querySelectorAll('.mobile-tab');
const downloadBtn = document.getElementById('downloadBtn');
const refreshBtn = document.getElementById('refreshBtn');
const newTabBtn = document.getElementById('newTabBtn');
const resetBtn = document.getElementById('resetBtn');
const clearConsole = document.getElementById('clearConsole');
const dropdown = document.getElementById('templateDropdown');
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownItems = document.querySelectorAll('.dropdown-item');

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    initCodeMirror();
    loadTemplate('hello');
    setupEventListeners();
}

function initCodeMirror() {
    // HTML Editor
    htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
        mode: 'htmlmixed',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: false
    });

    // CSS Editor
    cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
        mode: 'css',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: false
    });

    // JS Editor
    jsEditor = CodeMirror.fromTextArea(document.getElementById('jsCode'), {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: false
    });

    // Update preview on change
    const debounceUpdate = debounce(updatePreview, 400);
    htmlEditor.on('change', debounceUpdate);
    cssEditor.on('change', debounceUpdate);
    jsEditor.on('change', debounceUpdate);

    // Save to storage on change
    const debounceSave = debounce(saveToStorage, 1000);
    htmlEditor.on('change', debounceSave);
    cssEditor.on('change', debounceSave);
    jsEditor.on('change', debounceSave);
}

function setupEventListeners() {
    // Tab switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });

    // Dropdown
    dropdownToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const templateName = item.dataset.template;
            loadTemplate(templateName);
            dropdown.classList.remove('open');
        });
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
        dropdown.classList.remove('open');
    });

    // Buttons
    downloadBtn.addEventListener('click', downloadHTML);
    refreshBtn.addEventListener('click', updatePreview);
    newTabBtn.addEventListener('click', openInNewTab);
    clearConsole.addEventListener('click', () => consoleOutput.innerHTML = '');
    resetBtn.addEventListener('click', () => {
        if (confirm('Сбросить код к шаблону Hello World?')) {
            loadTemplate('hello');
        }
    });

    // Mobile tabs
    mobileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const view = tab.dataset.view;
            mobileTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            if (view === 'preview') {
                document.body.classList.add('show-preview');
            } else {
                document.body.classList.remove('show-preview');
            }
        });
    });

    // Console messages from iframe
    window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'console') {
            const line = document.createElement('div');
            line.className = `console-line console-${e.data.level}`;
            line.textContent = e.data.args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            consoleOutput.appendChild(line);
            consoleOutput.scrollTop = consoleOutput.scrollHeight;
        }
    });

    // Setup resizer
    setupResizer();

    // Load from storage
    loadFromStorage();
}

function switchTab(tabName) {
    tabs.forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tabName);
    });
    
    editorContainers.forEach(c => {
        c.classList.toggle('active', c.id === `${tabName}-editor`);
    });

    // Refresh CodeMirror
    setTimeout(() => {
        if (tabName === 'html') htmlEditor.refresh();
        if (tabName === 'css') cssEditor.refresh();
        if (tabName === 'js') jsEditor.refresh();
    }, 10);
}

function loadTemplate(name) {
    const template = templates[name];
    if (!template) return;

    htmlEditor.setValue(template.html);
    cssEditor.setValue(template.css);
    jsEditor.setValue(template.js);

    updatePreview();
    saveToStorage();
}

function updatePreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const consoleOverride = `
    <script>
        (function() {
            const methods = ['log', 'warn', 'error', 'info'];
            methods.forEach(method => {
                const original = console[method];
                console[method] = function(...args) {
                    parent.postMessage({
                        type: 'console',
                        level: method,
                        args: args
                    }, '*');
                    original.apply(console, args);
                };
            });
            
            window.onerror = function(msg, url, line) {
                parent.postMessage({
                    type: 'console',
                    level: 'error',
                    args: ['Error: ' + msg + ' (line ' + line + ')']
                }, '*');
            };
        })();
    <\/script>`;

    const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css}</style>
    ${consoleOverride}
</head>
<body>
    ${html}
    <script>${js}<\/script>
</body>
</html>`;

    consoleOutput.innerHTML = '';
    preview.srcdoc = fullHTML;
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function saveToStorage() {
    try {
        const data = {
            html: htmlEditor.getValue(),
            css: cssEditor.getValue(),
            js: jsEditor.getValue()
        };
        localStorage.setItem('web-playground-code', JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save to localStorage');
    }
}

function loadFromStorage() {
    try {
        const saved = localStorage.getItem('web-playground-code');
        if (saved) {
            const data = JSON.parse(saved);
            if (data.html !== undefined) {
                htmlEditor.setValue(data.html);
                cssEditor.setValue(data.css);
                jsEditor.setValue(data.js);
                updatePreview();
            }
        }
    } catch (e) {
        console.warn('Could not load from localStorage');
    }
}

function downloadHTML() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const fullHTML = `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <style>
${css}
    </style>
</head>
<body>
    ${html}
    <script>
${js}
    <\/script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
}

function openInNewTab() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const fullHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css}</style>
</head>
<body>
    ${html}
    <script>${js}<\/script>
</body>
</html>`;

    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}

function setupResizer() {
    const resizer = document.getElementById('resizer');
    const editorsPanel = document.querySelector('.editors-panel');
    let isResizing = false;
    let startX, startWidth;

    resizer.addEventListener('mousedown', (e) => {
        isResizing = true;
        startX = e.clientX;
        startWidth = editorsPanel.offsetWidth;
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isResizing) return;
        const diff = e.clientX - startX;
        const newWidth = Math.max(300, Math.min(startWidth + diff, window.innerWidth - 300));
        editorsPanel.style.width = newWidth + 'px';
    });

    document.addEventListener('mouseup', () => {
        if (isResizing) {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            // Refresh CodeMirror after resize
            htmlEditor.refresh();
            cssEditor.refresh();
            jsEditor.refresh();
        }
    });
}
