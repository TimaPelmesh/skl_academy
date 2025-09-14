// Переключение боковой панели
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
    content.classList.toggle('sidebar-active');
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

// Функция плавной прокрутки к элементу
function smoothScrollToElement(element, offset) {
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Увеличенная длительность анимации для более плавного эффекта
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    // Функция плавности (кубическая)
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    requestAnimationFrame(animation);
}

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
            
            // Прокручиваем к нужной секции с учетом высоты шапки
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offset = headerHeight + 30; // Увеличенный отступ для лучшей видимости
                
                // Используем нашу функцию плавной прокрутки
                smoothScrollToElement(targetSection, offset);
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

// Обработка якорей при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем наличие хэша в URL
    if (window.location.hash) {
        // Сначала прокручиваем страницу в начало, чтобы избежать обрезки контента
        window.scrollTo(0, 0);
        
        // Небольшая задержка для корректной работы
        setTimeout(function() {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offset = headerHeight + 30; // Увеличенный отступ для лучшей видимости
                
                // Используем нашу функцию плавной прокрутки
                smoothScrollToElement(targetElement, offset);
                
                // Активируем соответствующую ссылку в меню
                const relatedLink = document.querySelector(`.subtopic[href="#${targetId}"]`);
                if (relatedLink) {
                    // Убираем активный класс у всех ссылок
                    document.querySelectorAll('.subtopic').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Добавляем активный класс текущей ссылке
                    relatedLink.classList.add('active');
                    
                    // Раскрываем родительскую тему, если она свернута
                    const parentTopic = relatedLink.closest('.subtopics');
                    if (parentTopic && !parentTopic.style.maxHeight) {
                        const topicBtn = parentTopic.previousElementSibling;
                        if (topicBtn && topicBtn.classList.contains('topic-btn')) {
                            topicBtn.click(); // Имитируем клик для раскрытия
                        }
                    }
                }
            }
        }, 100); // Уменьшенная задержка для более быстрой работы
    }
});
