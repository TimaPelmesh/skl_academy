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

// Обработка якорных ссылок для плавной прокрутки
document.querySelectorAll('.subtopic').forEach(link => {
    link.addEventListener('click', function(e) {
        // Если ссылка ведет на текущую страницу (якорь)
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            
            // Убираем активный класс у всех ссылок
            document.querySelectorAll('.subtopic').forEach(item => {
                item.classList.remove('active');
            });
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Получаем ID секции для перехода
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Прокручиваем к нужной секции с учетом высоты шапки и мобильных устройств
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offset = headerHeight + 20; // Дополнительный отступ для комфорта
                
                window.scrollTo({
                    top: targetSection.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
            
            // Закрытие сайдбара на мобильных устройствах после клика
            if (sidebar.classList.contains('active') && window.innerWidth <= 991) {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('active');
                content.classList.remove('sidebar-active');
            }
        }
    });
});

// Отслеживание прокрутки для активации ссылок
function setActiveSection() {
    const sections = document.querySelectorAll('.topic-section');
    const subtopics = document.querySelectorAll('.subtopic[href^="#"]'); // Только якорные ссылки
    
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 50; // Добавляем запас
    
    let currentActiveIndex = -1;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentActiveIndex = index;
        }
    });
    
    // Устанавливаем активную ссылку
    if (currentActiveIndex >= 0) {
        subtopics.forEach(link => {
            link.classList.remove('active');
        });
        
        if (subtopics[currentActiveIndex]) {
            subtopics[currentActiveIndex].classList.add('active');
        }
    }
}

// Вызываем функцию при загрузке и при прокрутке
window.addEventListener('scroll', setActiveSection);
document.addEventListener('DOMContentLoaded', setActiveSection);

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
