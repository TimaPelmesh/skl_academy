// Переключение боковой панели
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
    content.classList.toggle('sidebar-active');
});

// Подсветка синтаксиса (единая инициализация для всех страниц курса)
document.addEventListener('DOMContentLoaded', function() {
    if (window.hljs) {
        document.querySelectorAll('pre code').forEach(function(block) {
            hljs.highlightBlock(block);
        });
    }
});

// ===== Переключение темы и цветовых схем =====
(function themeAndColorSwitcher() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const colorSchemeButtons = document.querySelectorAll('.color-scheme-btn');
    
    // Загружаем сохраненные настройки
    const savedTheme = localStorage.getItem('web-course-theme');
    const savedColorScheme = localStorage.getItem('web-course-color-scheme');
    
    // Применяем сохраненную тему
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    // Применяем сохраненную цветовую схему (только если она была выбрана)
    if (savedColorScheme) {
        body.setAttribute('data-color-scheme', savedColorScheme);
        colorSchemeButtons.forEach(btn => {
            if (btn.getAttribute('data-color') === savedColorScheme) {
                btn.classList.add('active');
            }
        });
    } else {
        // Если цвет не выбран, используем фиолетовый по умолчанию, но не выделяем кнопку
        body.setAttribute('data-color-scheme', 'purple');
    }
    
    // Переключение темы
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('web-course-theme', theme);
        });
    }
    
    // Переключение цветовых схем
    colorSchemeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const colorScheme = btn.getAttribute('data-color');
            
            // Убираем активность со всех кнопок
            colorSchemeButtons.forEach(b => b.classList.remove('active'));
            
            // Добавляем активность к выбранной
            btn.classList.add('active');
            
            // Применяем цветовую схему
            body.setAttribute('data-color-scheme', colorScheme);
            
            // Сохраняем в localStorage
            localStorage.setItem('web-course-color-scheme', colorScheme);
        });
    });
})();

// ===== МОБИЛЬНОЕ МЕНЮ НАСТРОЕК =====
(function() {
    const mobileSettingsTrigger = document.getElementById('mobileSettingsTrigger');
    const mobileSettingsMenu = document.getElementById('mobileSettingsMenu');
    const mobileSettingsClose = document.getElementById('mobileSettingsClose');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const mobileColorSchemeBtns = document.querySelectorAll('.mobile-color-scheme-btn');
    const desktopThemeToggle = document.getElementById('themeToggle');
    const desktopColorSchemeBtns = document.querySelectorAll('.color-scheme-btn');
    
    if (!mobileSettingsTrigger || !mobileSettingsMenu) return;
    
    // Открытие мобильного меню
    mobileSettingsTrigger.addEventListener('click', function() {
        mobileSettingsMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Закрытие мобильного меню
    function closeMobileSettings() {
        mobileSettingsMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileSettingsClose.addEventListener('click', closeMobileSettings);
    
    // Закрытие по клику вне меню
    mobileSettingsMenu.addEventListener('click', function(e) {
        if (e.target === mobileSettingsMenu) {
            closeMobileSettings();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileSettingsMenu.classList.contains('active')) {
            closeMobileSettings();
        }
    });
    
    // Синхронизация темы с десктопной кнопкой
    function syncMobileTheme() {
        const isDark = document.body.classList.contains('dark-theme');
        const themeLabel = mobileThemeToggle.querySelector('.theme-label');
        if (themeLabel) {
            themeLabel.textContent = isDark ? 'Тёмная' : 'Светлая';
        }
    }
    
    // Переключение темы из мобильного меню
    mobileThemeToggle.addEventListener('click', function() {
        if (desktopThemeToggle) {
            desktopThemeToggle.click();
        } else {
            document.body.classList.toggle('dark-theme');
            const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            localStorage.setItem('web-course-theme', theme);
        }
        setTimeout(syncMobileTheme, 100);
    });
    
    // Синхронизация цветовой схемы с десктопными кнопками
    function syncMobileColorScheme() {
        const activeColor = localStorage.getItem('web-course-color-scheme');
        mobileColorSchemeBtns.forEach(btn => {
            // Выделяем только если цвет был реально выбран пользователем
            btn.classList.toggle('active', activeColor && btn.dataset.color === activeColor);
        });
    }
    
    // Переключение цветовой схемы из мобильного меню
    mobileColorSchemeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const color = this.dataset.color;
            
            // Находим соответствующую десктопную кнопку
            desktopColorSchemeBtns.forEach(desktopBtn => {
                if (desktopBtn.dataset.color === color) {
                    desktopBtn.click();
                }
            });
            
            // Обновляем активное состояние
            syncMobileColorScheme();
        });
    });
    
    // Инициализация при загрузке
    syncMobileTheme();
    syncMobileColorScheme();
    
    // Синхронизация при изменении темы/цвета
    const observer = new MutationObserver(function() {
        syncMobileTheme();
        syncMobileColorScheme();
    });
    
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class', 'data-color-scheme']
    });
})();

// Кнопка контакта (i) и карточка – авто-добавление для страниц курса Web
(function contactFabWeb() {
    function initContact() {
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
                '<div class=\"contact-links\">' +
                '<a href=\"https://t.me/tima_pelmeshka\" target=\"_blank\" rel=\"noopener\">Telegram</a>' +
                '<a href=\"mailto:mr.tim.pumpkin@gmail.com\">mr.tim.pumpkin@gmail.com</a>' +
                '</div>';
            frag.appendChild(card);
        }
        if (frag.childNodes.length) document.body.appendChild(frag);

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
        document.addEventListener('DOMContentLoaded', initContact, { once: true });
    } else {
        initContact();
    }
})();

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

// Закрытие сайдбара на мобильных устройствах при клике на любую ссылку меню (включая межстраничные ссылки)
document.querySelectorAll('.subtopic').forEach(link => {
    link.addEventListener('click', function() {
        if (sidebar.classList.contains('active') && window.innerWidth <= 991) {
            menuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            content.classList.remove('sidebar-active');
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

// Прогресс-бар чтения и эффект скролла для header
(function headerEnhancements() {
    const header = document.querySelector('header');
    if (!header) return;
    
    function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollableHeight = documentHeight - windowHeight;
        const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;
        
        // Обновляем прогресс-бар
        header.style.setProperty('--scroll-progress', `${Math.min(progress, 100)}%`);
        
        // Добавляем класс при скролле
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Обновляем при загрузке и скролле
    updateReadingProgress();
    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    window.addEventListener('resize', updateReadingProgress);
})();
