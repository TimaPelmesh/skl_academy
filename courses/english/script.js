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
function initSidebarInteractions() {
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

    // Обработка якорных ссылок для плавной прокрутки (только для текущей страницы)
    document.querySelectorAll('.subtopic').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                document.querySelectorAll('.subtopic').forEach(item => {
                    item.classList.remove('active');
                });
                
                this.classList.add('active');
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const offset = headerHeight + 30;
                    smoothScrollToElement(targetSection, offset);
                }
                
                if (sidebar.classList.contains('active') && window.innerWidth <= 991) {
                    menuToggle.classList.remove('active');
                    sidebar.classList.remove('active');
                    content.classList.remove('sidebar-active');
                }
            }
        });
    });
}

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

// Построение бокового меню для Technical English
function buildEnglishSidebar() {
    const structureContainer = document.querySelector('#sidebar .course-structure');
    if (!structureContainer) return;

    const currentFile = (location.pathname.split('/').pop() || '').toLowerCase();

    const modules = [
        {
            index: 1,
            file: '01-foundations.html',
            title: '1. Представление и базовый диалог',
            sub: [
                { id: 'vocabulary', text: 'Базовый словарь' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'it-focus', text: 'IT-фокус' },
                { id: 'travel', text: 'Путешествия' },
                { id: 'interview', text: 'Собеседование' },
                { id: 'pronunciation', text: 'Произношение' },
                { id: 'final-case', text: 'Итоговый кейс' },
                { id: 'final-text', text: 'Итоговый текст' }
            ]
        },
        {
            index: 2,
            file: '02-core-vocabulary.html',
            title: '2. Базовый словарь',
            sub: [
                { id: 'verbs-actions', text: '2.1 Ключевые глаголы' },
                { id: 'nouns-concepts', text: '2.2 Существительные и термины' },
                { id: 'grammar-foundations', text: '2.3 Грамматические опоры' },
                { id: 'practice-cards', text: '2.4 Практика и карточки' }
            ]
        },
        {
            index: 3,
            file: '03-development-workflow.html',
            title: '3. Development workflow',
            sub: [
                { id: 'sdlc-vocab', text: '3.1 Этапы SDLC' },
                { id: 'tickets-templates', text: '3.2 Тикеты и шаблоны' },
                { id: 'code-review-lang', text: '3.3 Язык code review' },
                { id: 'retro-language', text: '3.4 Ретроспективы' }
            ]
        },
        {
            index: 4,
            file: '04-infrastructure-operations.html',
            title: '4. Infrastructure & operations',
            sub: [
                { id: 'infra-core', text: '4.1 Компоненты инфраструктуры' },
                { id: 'monitoring-alerts', text: '4.2 Мониторинг и алёрты' },
                { id: 'incident-phrases', text: '4.3 Инциденты и статус' },
                { id: 'automation-scripts', text: '4.4 Автоматизация и пайплайны' }
            ]
        },
        {
            index: 5,
            file: '05-data-analytics.html',
            title: '5. Data & analytics',
            sub: [
                { id: 'etl-pipeline', text: '5.1 Data pipeline' },
                { id: 'analysis-language', text: '5.2 Аналитика и выводы' },
                { id: 'visualization-phrases', text: '5.3 Визуализация' },
                { id: 'ml-vocabulary', text: '5.4 ML и эксперименты' }
            ]
        },
        {
            index: 6,
            file: '06-security-compliance.html',
            title: '6. Security & compliance',
            sub: [
                { id: 'security-basics', text: '6.1 Базовые понятия' },
                { id: 'access-control', text: '6.2 Identity & access' },
                { id: 'compliance-terms', text: '6.3 Compliance и нормативы' },
                { id: 'incident-comms', text: '6.4 Коммуникация по инцидентам' }
            ]
        },
        {
            index: 7,
            file: '07-communication-docs.html',
            title: '7. Communication & docs',
            sub: [
                { id: 'email-templates', text: '7.1 Письма' },
                { id: 'chat-etiquette', text: '7.2 Чаты и мессенджеры' },
                { id: 'docs-structure', text: '7.3 Документация' },
                { id: 'presentation-language', text: '7.4 Презентации' }
            ]
        },
        {
            index: 8,
            file: '08-project-collaboration.html',
            title: '8. Project collaboration',
            sub: [
                { id: 'meetings-language', text: '8.1 Митинги и синхроны' },
                { id: 'feedback-formulas', text: '8.2 Обратная связь' },
                { id: 'conflict-resolution', text: '8.3 Решение конфликтов' },
                { id: 'culture-nuances', text: '8.4 Культурные нюансы' }
            ]
        },
        {
            index: 9,
            file: '09-interviews-growth.html',
            title: '9. Interviews & growth',
            sub: [
                { id: 'interview-answers', text: '9.1 Ответы на вопросы' },
                { id: 'achievement-story', text: '9.2 Истории и достижения' },
                { id: 'offer-negotiation', text: '9.3 Обсуждение оффера' },
                { id: 'review-prep', text: '9.4 Performance review' }
            ]
        },
        {
            index: 10,
            file: '10-b2-progress-check.html',
            title: '10. B2 progress check',
            sub: [
                { id: 'self-assessment', text: '10.1 Самопроверка' },
                { id: 'b2-checklist', text: '10.2 Чек-лист B2' },
                { id: 'next-steps', text: '10.3 Следующие шаги' },
                { id: 'resources-trackers', text: '10.4 Ресурсы и трекеры' }
            ]
        }
    ];

    let html = '';
    modules.forEach(m => {
        const isCurrent = currentFile === m.file.toLowerCase();
        html += '\n                <div class="topic">\n';
        html += `                    <button class="topic-btn${isCurrent ? ' active' : ''}">${m.title}</button>\n`;
        html += `                    <div class="subtopics"${isCurrent ? ' style="max-height: 1000px;"' : ''}>\n`;
        m.sub.forEach((s, idx) => {
            const href = isCurrent ? `#${s.id}` : `${m.file}#${s.id}`;
            const activeClass = isCurrent && idx === 0 ? ' active' : '';
            html += `                        <a href="${href}" class="subtopic${activeClass}">${s.text}</a>\n`;
        });
        html += '                    </div>\n';
        html += '                </div>\n';
    });

    structureContainer.innerHTML = html;
}

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

// Вызываем генерацию и инициализацию при загрузке
document.addEventListener('DOMContentLoaded', function() {
    buildEnglishSidebar();
    initSidebarInteractions();
    setActiveSection();
});

// Кнопка контакта (i) и карточка – авто-добавление для страниц Technical English
(function contactFabEnglish() {
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
                '<div class="contact-links">' +
                '<a href="https://t.me/tima_pelmeshka" target="_blank" rel="noopener">Telegram</a>' +
                '<a href="mailto:mr.tim.pumpkin@gmail.com">mr.tim.pumpkin@gmail.com</a>' +
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

// Вызываем функцию при прокрутке
window.addEventListener('scroll', setActiveSection);

// Обработка якорей при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash) {
        window.scrollTo(0, 0);
        setTimeout(function() {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const offset = headerHeight + 30; // Увеличенный отступ для лучшей видимости
                smoothScrollToElement(targetElement, offset);
                const relatedLink = document.querySelector(`.subtopic[href="#${targetId}"]`);
                if (relatedLink) {
                    document.querySelectorAll('.subtopic').forEach(item => {
                        item.classList.remove('active');
                    });
                    relatedLink.classList.add('active');
                    const parentTopic = relatedLink.closest('.subtopics');
                    if (parentTopic && !parentTopic.style.maxHeight) {
                        const topicBtn = parentTopic.previousElementSibling;
                        if (topicBtn && topicBtn.classList.contains('topic-btn')) {
                            topicBtn.click();
                        }
                    }
                }
            }
        }, 100);
    }

    // Обработка кликов на reading-block для показа/скрытия перевода
    function initReadingBlocks() {
        document.querySelectorAll('.reading-block').forEach(block => {
            block.addEventListener('click', function(e) {
                // Не обрабатываем клики на ссылки и другие интерактивные элементы
                if (e.target.tagName === 'A' || e.target.closest('a')) {
                    return;
                }
                this.classList.toggle('active');
            });
        });
    }
    
    // Инициализируем при загрузке страницы
    initReadingBlocks();
});
