// Переключение боковой панели
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
    content.classList.toggle('sidebar-active');
});

// Переключение вкладок
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Убрать активный класс со всех вкладок
        document.querySelectorAll('.tab').forEach(item => {
            item.classList.remove('active');
        });
        
        // Убрать активный класс со всех контентов
        document.querySelectorAll('.tab-content').forEach(item => {
            item.classList.remove('active');
        });
        
        // Добавить активный класс выбранной вкладке
        this.classList.add('active');
        
        // Показать соответствующий контент
        const tabId = this.getAttribute('data-tab') + '-content';
        document.getElementById(tabId).classList.add('active');
    });
});

// Раскрытие тем
document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('active');
        const subtopics = this.nextElementSibling;
        
        if (subtopics.style.maxHeight) {
            subtopics.style.maxHeight = null;
        } else {
            subtopics.style.maxHeight = subtopics.scrollHeight + 'px';
        }
    });
});

// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Проверка сохраненной темы в localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    // Если сохранена светлая тема
    if (currentTheme === 'light') {
        body.classList.add('light-theme');
    }
} else {
    // Если ничего не сохранено, устанавливаем тему по предпочтениям системы
    if (!prefersDarkScheme.matches) {
        body.classList.add('light-theme');
    }
}

themeToggle.addEventListener('click', () => {
    // Переключаем класс light-theme у body
    body.classList.toggle('light-theme');
    
    // Сохраняем текущую тему в localStorage
    let theme = 'dark';
    if (body.classList.contains('light-theme')) {
        theme = 'light';
    }
    localStorage.setItem('theme', theme);
});
