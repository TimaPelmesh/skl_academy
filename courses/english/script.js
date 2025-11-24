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
            file: '02-everyday-life.html',
            title: '2. Повседневная жизнь и окружение',
            sub: [
                { id: 'module1-review', text: 'Повторение: Модуль 1' },
                { id: 'family-relationships', text: 'Семья и отношения' },
                { id: 'home-interior', text: 'Дом и интерьер' },
                { id: 'city-infrastructure', text: 'Городская инфраструктура' },
                { id: 'food-drinks', text: 'Еда и напитки' },
                { id: 'daily-routine', text: 'Распорядок дня' },
                { id: 'hobbies-interests', text: 'Хобби и интересы' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'final-case', text: 'Итоговый кейс' }
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

    // Обработка кликов на кнопки перевода для показа/скрытия перевода
    function initReadingBlocks() {
        document.querySelectorAll('.translation-toggle-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Находим родительский блок (reading-block или practice-card)
                let block = this.closest('.reading-block') || this.closest('.practice-card');
                
                if (block) {
                    block.classList.toggle('active');
                    
                    // Обновляем текст кнопки
                    if (block.classList.contains('active')) {
                        this.textContent = '👆 Скрыть перевод';
                    } else {
                        this.textContent = '👆 Показать перевод';
                    }
                }
            });
        });
    }
    
    // Инициализируем при загрузке страницы
    initReadingBlocks();
    
    // Инициализация игры с карточками
    initFlashcardGame();
});

// ===== ИГРА С КАРТОЧКАМИ (FLASHCARDS) =====

// Структура данных для карточек
const flashcardData = {
    'greetings': [
        { word: 'hello', translation: 'привет, здравствуйте', example: 'Hello! My name is Alex.' },
        { word: 'hi', translation: 'привет (неформальное)', example: 'Hi! How are you?' },
        { word: 'good morning', translation: 'доброе утро', example: 'Good morning! Nice to see you.' },
        { word: 'good afternoon', translation: 'добрый день', example: 'Good afternoon! Welcome to our office.' },
        { word: 'good evening', translation: 'добрый вечер', example: 'Good evening! How was your day?' },
        { word: 'goodbye', translation: 'до свидания', example: 'See you tomorrow! Goodbye!' },
        { word: 'bye', translation: 'пока', example: 'I need to go. Bye!' },
        { word: 'nice to meet you', translation: 'приятно познакомиться', example: 'Hello, I\'m Maria. Nice to meet you!' }
    ],
    'names-countries': [
        { word: 'name', translation: 'имя', example: 'What\'s your name? My name is Alex.' },
        { word: 'country', translation: 'страна', example: 'What country are you from?' },
        { word: 'city', translation: 'город', example: 'What city do you live in?' },
        { word: 'live', translation: 'жить', example: 'I live in Moscow.' },
        { word: 'from', translation: 'из, от', example: 'Where are you from? I\'m from Russia.' },
        { word: 'nationality', translation: 'национальность', example: 'What\'s your nationality?' },
        { word: 'Russia', translation: 'Россия', example: 'I\'m from Russia.' },
        { word: 'Russian', translation: 'русский', example: 'I\'m Russian.' }
    ],
    'professions': [
        { word: 'student', translation: 'студент', example: 'I\'m a student.' },
        { word: 'developer', translation: 'разработчик', example: 'I\'m a developer. I write code.' },
        { word: 'engineer', translation: 'инженер', example: 'She is an engineer.' },
        { word: 'teacher', translation: 'учитель', example: 'He is a teacher.' },
        { word: 'programmer', translation: 'программист', example: 'I\'m a programmer. I work with Python.' },
        { word: 'designer', translation: 'дизайнер', example: 'She is a designer.' },
        { word: 'manager', translation: 'менеджер', example: 'He is a manager.' },
        { word: 'work', translation: 'работать', example: 'Where do you work? I work in an office.' },
        { word: 'job', translation: 'работа, должность', example: 'What\'s your job?' }
    ],
    'basic-nouns': [
        { word: 'person', translation: 'человек', example: 'He is a nice person.' },
        { word: 'man', translation: 'мужчина', example: 'That man is my colleague.' },
        { word: 'woman', translation: 'женщина', example: 'She is a smart woman.' },
        { word: 'child', translation: 'ребёнок', example: 'The child is playing.' },
        { word: 'people', translation: 'люди', example: 'Many people are here today.' },
        { word: 'friend', translation: 'друг', example: 'He is my best friend.' },
        { word: 'colleague', translation: 'коллега', example: 'She is my colleague at work.' }
    ],
    'basic-verbs': [
        { word: 'be (am, is, are)', translation: 'быть', example: 'I am a developer. He is a student. We are colleagues.' },
        { word: 'have', translation: 'иметь', example: 'I have a computer.' },
        { word: 'do', translation: 'делать', example: 'What do you do?' },
        { word: 'say', translation: 'сказать', example: 'What did you say?' },
        { word: 'speak', translation: 'говорить', example: 'I speak English.' },
        { word: 'understand', translation: 'понимать', example: 'Do you understand me?' },
        { word: 'know', translation: 'знать', example: 'I know Python.' },
        { word: 'think', translation: 'думать', example: 'I think it\'s good.' },
        { word: 'see', translation: 'видеть', example: 'I see you tomorrow.' },
        { word: 'go', translation: 'идти, ходить', example: 'I go to work every day.' },
        { word: 'come', translation: 'приходить', example: 'Please come here.' },
        { word: 'want', translation: 'хотеть', example: 'I want to learn English.' },
        { word: 'need', translation: 'нуждаться', example: 'I need help.' },
        { word: 'like', translation: 'нравиться', example: 'I like coding.' },
        { word: 'learn', translation: 'учить', example: 'I learn English every day.' },
        { word: 'study', translation: 'учиться', example: 'I study at university.' },
        { word: 'read', translation: 'читать', example: 'I read technical documentation.' },
        { word: 'write', translation: 'писать', example: 'I write code in Python.' },
        { word: 'listen', translation: 'слушать', example: 'Please listen to me.' },
        { word: 'help', translation: 'помогать', example: 'Can you help me?' },
        { word: 'meet', translation: 'встречать, знакомиться', example: 'Nice to meet you!' },
        { word: 'use', translation: 'использовать', example: 'I use Python for work.' },
        { word: 'make', translation: 'делать, создавать', example: 'I make web applications.' },
        { word: 'get', translation: 'получать', example: 'I get emails every day.' },
        { word: 'take', translation: 'брать, взять', example: 'Please take a seat.' },
        { word: 'give', translation: 'давать', example: 'Can you give me your phone number?' },
        { word: 'find', translation: 'находить', example: 'I can\'t find my keys.' },
        { word: 'look', translation: 'смотреть', example: 'Please look at this code.' },
        { word: 'ask', translation: 'спрашивать', example: 'Can I ask you a question?' },
        { word: 'answer', translation: 'отвечать', example: 'Please answer my question.' }
    ],
    'questions-pronouns': [
        { word: 'what', translation: 'что', example: 'What is your name?' },
        { word: 'where', translation: 'где', example: 'Where are you from?' },
        { word: 'how', translation: 'как', example: 'How are you?' },
        { word: 'who', translation: 'кто', example: 'Who is he?' },
        { word: 'when', translation: 'когда', example: 'When do you work?' },
        { word: 'why', translation: 'почему', example: 'Why do you study English?' },
        { word: 'which', translation: 'какой', example: 'Which language do you use?' },
        { word: 'I, you, he, she', translation: 'я, ты, он, она', example: 'I am a developer. You are a student. He is an engineer. She is a designer.' },
        { word: 'it, we, they', translation: 'это, мы, они', example: 'It is a computer. We are colleagues. They are developers.' },
        { word: 'my, your, his', translation: 'мой, твой, его', example: 'This is my computer. Is this your phone? That is his laptop.' },
        { word: 'her, our, their', translation: 'её, наш, их', example: 'This is her desk. This is our office. That is their project.' }
    ],
    'useful-phrases': [
        { word: 'yes, no', translation: 'да, нет', example: 'Do you speak English? Yes, I do. No, I don\'t.' },
        { word: 'thank you, please', translation: 'спасибо, пожалуйста', example: 'Thank you very much! Please, help me.' },
        { word: 'sorry, excuse me', translation: 'извини, извините', example: 'Sorry, I\'m late. Excuse me, where is the office?' },
        { word: 'OK, sure, of course', translation: 'хорошо, конечно', example: 'Is it okay? OK, let\'s go. Sure, no problem. Of course!' },
        { word: 'maybe, really', translation: 'может быть, действительно', example: 'Will you come? Maybe. Is it true? Really?' },
        { word: 'very, too, also', translation: 'очень, тоже, также', example: 'I like it very much. I like Python too. I also use JavaScript.' },
        { word: 'and, or, but', translation: 'и, или, но', example: 'I like Python and JavaScript. Do you want tea or coffee? I like it, but it\'s difficult.' },
        { word: 'because, so', translation: 'потому что, поэтому', example: 'I study English because I need it for work. I need English, so I study every day.' },
        { word: 'this, that', translation: 'это, то', example: 'This is my computer. That is your laptop.' },
        { word: 'here, there', translation: 'здесь, там', example: 'Come here, please. I work there.' },
        { word: 'now, today, tomorrow, yesterday', translation: 'сейчас, сегодня, завтра, вчера', example: 'I\'m working now. Today I study English. Tomorrow I have a meeting. Yesterday I wrote code.' }
    ],
    'numbers': [
        { word: 'one, two, three', translation: 'один, два, три', example: 'I have one computer. I know two languages. I work three days a week.' },
        { word: 'four, five, six', translation: 'четыре, пять, шесть', example: 'I have four projects. I work five days a week. I know six programming languages.' },
        { word: 'seven, eight, nine', translation: 'семь, восемь, девять', example: 'I have seven colleagues. I work eight hours a day. I have nine tasks today.' },
        { word: 'ten, eleven, twelve', translation: 'десять, одиннадцать, двенадцать', example: 'I study English for ten minutes every day. I have eleven meetings this week. I work twelve hours today.' },
        { word: 'thirteen, fourteen, fifteen', translation: 'тринадцать, четырнадцать, пятнадцать', example: 'I\'m thirteen years old. I have fourteen projects. I\'m fifteen minutes late.' },
        { word: 'sixteen, seventeen, eighteen', translation: 'шестнадцать, семнадцать, восемнадцать', example: 'I have sixteen tasks. I\'m seventeen years old. I have eighteen colleagues.' },
        { word: 'nineteen, twenty', translation: 'девятнадцать, двадцать', example: 'I\'m nineteen years old. I have twenty projects this month.' }
    ],
    'it-professions': [
        { word: 'developer', translation: 'разработчик', example: 'I\'m a developer.' },
        { word: 'programmer', translation: 'программист', example: 'I\'m a programmer.' },
        { word: 'software engineer', translation: 'инженер-программист', example: 'She is a software engineer.' },
        { word: 'web developer', translation: 'веб-разработчик', example: 'I\'m a web developer.' },
        { word: 'frontend developer', translation: 'фронтенд-разработчик', example: 'He is a frontend developer.' },
        { word: 'backend developer', translation: 'бэкенд-разработчик', example: 'She is a backend developer.' },
        { word: 'full-stack developer', translation: 'фулстек-разработчик', example: 'I\'m a full-stack developer.' },
        { word: 'QA engineer', translation: 'тестировщик', example: 'He is a QA engineer.' },
        { word: 'devops engineer', translation: 'DevOps-инженер', example: 'She is a devops engineer.' },
        { word: 'data scientist', translation: 'специалист по данным', example: 'He is a data scientist.' }
    ],
    'it-terms': [
        { word: 'computer', translation: 'компьютер', example: 'I have a computer.' },
        { word: 'program', translation: 'программа', example: 'I write programs.' },
        { word: 'code', translation: 'код', example: 'I write code.' },
        { word: 'software', translation: 'программное обеспечение', example: 'I create software.' },
        { word: 'application', translation: 'приложение', example: 'I make web applications.' },
        { word: 'website', translation: 'веб-сайт', example: 'I create websites.' },
        { word: 'internet', translation: 'интернет', example: 'I use the internet.' },
        { word: 'email', translation: 'электронная почта', example: 'I get emails every day.' },
        { word: 'project', translation: 'проект', example: 'I work on many projects.' },
        { word: 'team', translation: 'команда', example: 'I work in a team.' }
    ],
    'travel': [
        { word: 'passport', translation: 'паспорт', example: 'Your passport, please.' },
        { word: 'hotel', translation: 'отель', example: 'I stay at a hotel.' },
        { word: 'reservation', translation: 'бронирование', example: 'I have a reservation.' },
        { word: 'room', translation: 'комната, номер', example: 'Your room is 205.' },
        { word: 'key', translation: 'ключ', example: 'Here is your key.' },
        { word: 'airport', translation: 'аэропорт', example: 'I\'m at the airport.' },
        { word: 'flight', translation: 'рейс', example: 'What time is your flight?' },
        { word: 'ticket', translation: 'билет', example: 'I have a ticket.' },
        { word: 'luggage', translation: 'багаж', example: 'Where is my luggage?' },
        { word: 'excuse me', translation: 'извините', example: 'Excuse me, where is the office?' }
    ],
    // Модуль 2: Повседневная жизнь и окружение
    'family-relationships': [
        { word: 'parents', translation: 'родители', example: 'My parents live in Moscow.' },
        { word: 'mother / mom', translation: 'мама', example: 'My mother is a teacher.' },
        { word: 'father / dad', translation: 'папа', example: 'My father works in IT.' },
        { word: 'siblings', translation: 'братья и сёстры', example: 'I have two siblings.' },
        { word: 'brother', translation: 'брат', example: 'My brother is older than me.' },
        { word: 'sister', translation: 'сестра', example: 'My sister studies at university.' },
        { word: 'grandmother / grandma', translation: 'бабушка', example: 'My grandmother lives with us.' },
        { word: 'grandfather / grandpa', translation: 'дедушка', example: 'My grandfather is retired.' },
        { word: 'relatives', translation: 'родственники', example: 'I visit my relatives on holidays.' },
        { word: 'uncle', translation: 'дядя', example: 'My uncle is a doctor.' },
        { word: 'aunt', translation: 'тётя', example: 'My aunt lives in another city.' },
        { word: 'cousin', translation: 'двоюродный брат/сестра', example: 'I have three cousins.' },
        { word: 'married', translation: 'женат/замужем', example: 'She is married.' },
        { word: 'single', translation: 'холост/не замужем', example: 'He is single.' },
        { word: 'husband', translation: 'муж', example: 'My husband is a developer.' },
        { word: 'wife', translation: 'жена', example: 'My wife works as a designer.' },
        { word: 'son', translation: 'сын', example: 'My son is ten years old.' },
        { word: 'daughter', translation: 'дочь', example: 'My daughter goes to school.' },
        { word: 'close', translation: 'близкий', example: 'We are very close friends.' },
        { word: 'support', translation: 'поддержка', example: 'My family gives me support.' },
        { word: 'love', translation: 'любовь, любить', example: 'I love my family.' }
    ],
    'home-interior': [
        { word: 'living room', translation: 'гостиная', example: 'We watch TV in the living room.' },
        { word: 'bedroom', translation: 'спальня', example: 'My bedroom is small but cozy.' },
        { word: 'kitchen', translation: 'кухня', example: 'I cook in the kitchen.' },
        { word: 'bathroom', translation: 'ванная комната', example: 'The bathroom is on the second floor.' },
        { word: 'dining room', translation: 'столовая', example: 'We eat in the dining room.' },
        { word: 'study / office', translation: 'кабинет', example: 'I work in my study.' },
        { word: 'sofa / couch', translation: 'диван', example: 'I sit on the sofa.' },
        { word: 'table', translation: 'стол', example: 'The table is in the kitchen.' },
        { word: 'chair', translation: 'стул', example: 'I sit on a chair.' },
        { word: 'bed', translation: 'кровать', example: 'I sleep in my bed.' },
        { word: 'wardrobe / closet', translation: 'шкаф', example: 'My clothes are in the wardrobe.' },
        { word: 'desk', translation: 'письменный стол', example: 'I work at my desk.' },
        { word: 'shelf / shelves', translation: 'полка / полки', example: 'Books are on the shelves.' },
        { word: 'refrigerator / fridge', translation: 'холодильник', example: 'Food is in the refrigerator.' },
        { word: 'microwave', translation: 'микроволновка', example: 'I heat food in the microwave.' },
        { word: 'washing machine', translation: 'стиральная машина', example: 'I wash clothes in the washing machine.' },
        { word: 'TV / television', translation: 'телевизор', example: 'We watch TV in the evening.' },
        { word: 'computer', translation: 'компьютер', example: 'I work on my computer.' }
    ],
    'city-infrastructure': [
        { word: 'bank', translation: 'банк', example: 'I go to the bank to withdraw money.' },
        { word: 'post office', translation: 'почта', example: 'I send a letter at the post office.' },
        { word: 'pharmacy', translation: 'аптека', example: 'I buy medicine at the pharmacy.' },
        { word: 'supermarket', translation: 'супермаркет', example: 'I shop at the supermarket.' },
        { word: 'hospital', translation: 'больница', example: 'My friend works at the hospital.' },
        { word: 'school', translation: 'школа', example: 'My children go to school.' },
        { word: 'university', translation: 'университет', example: 'I study at the university.' },
        { word: 'restaurant', translation: 'ресторан', example: 'We have dinner at a restaurant.' },
        { word: 'cafe', translation: 'кафе', example: 'I meet friends at a cafe.' },
        { word: 'cinema / movie theater', translation: 'кинотеатр', example: 'We watch movies at the cinema.' },
        { word: 'park', translation: 'парк', example: 'I walk in the park.' },
        { word: 'library', translation: 'библиотека', example: 'I borrow books from the library.' },
        { word: 'gym', translation: 'спортзал', example: 'I exercise at the gym.' },
        { word: 'bus stop', translation: 'автобусная остановка', example: 'I wait at the bus stop.' },
        { word: 'subway station / metro station', translation: 'станция метро', example: 'I take the subway to work.' },
        { word: 'taxi', translation: 'такси', example: 'I take a taxi when I\'m late.' },
        { word: 'car', translation: 'машина', example: 'I drive a car to work.' },
        { word: 'bicycle / bike', translation: 'велосипед', example: 'I ride a bicycle in the park.' }
    ],
    'food-drinks': [
        { word: 'fruits', translation: 'фрукты', example: 'I eat fruits every day.' },
        { word: 'apple', translation: 'яблоко', example: 'I eat an apple for breakfast.' },
        { word: 'banana', translation: 'банан', example: 'I like bananas.' },
        { word: 'vegetables', translation: 'овощи', example: 'I cook vegetables for dinner.' },
        { word: 'tomato', translation: 'помидор', example: 'I add tomatoes to the salad.' },
        { word: 'potato', translation: 'картофель', example: 'I cook potatoes for lunch.' },
        { word: 'meat', translation: 'мясо', example: 'I eat meat twice a week.' },
        { word: 'chicken', translation: 'курица', example: 'I cook chicken for dinner.' },
        { word: 'fish', translation: 'рыба', example: 'I like fish.' },
        { word: 'dairy', translation: 'молочные продукты', example: 'I buy dairy products every week.' },
        { word: 'milk', translation: 'молоко', example: 'I drink milk in the morning.' },
        { word: 'cheese', translation: 'сыр', example: 'I add cheese to sandwiches.' },
        { word: 'bread', translation: 'хлеб', example: 'I buy bread every day.' },
        { word: 'rice', translation: 'рис', example: 'I cook rice for lunch.' },
        { word: 'breakfast', translation: 'завтрак', example: 'I have breakfast at 8 AM.' },
        { word: 'lunch', translation: 'обед', example: 'I have lunch at 1 PM.' },
        { word: 'dinner', translation: 'ужин', example: 'I have dinner at 7 PM.' },
        { word: 'coffee', translation: 'кофе', example: 'I drink coffee in the morning.' },
        { word: 'tea', translation: 'чай', example: 'I drink tea in the evening.' },
        { word: 'juice', translation: 'сок', example: 'I drink juice for breakfast.' },
        { word: 'water', translation: 'вода', example: 'I drink water every day.' }
    ],
    'daily-routine': [
        { word: 'wake up', translation: 'просыпаться', example: 'I wake up at 7 AM.' },
        { word: 'get up', translation: 'вставать', example: 'I get up at 7:15 AM.' },
        { word: 'brush teeth', translation: 'чистить зубы', example: 'I brush my teeth every morning.' },
        { word: 'shower', translation: 'душ, принимать душ', example: 'I take a shower in the morning.' },
        { word: 'get dressed', translation: 'одеваться', example: 'I get dressed after shower.' },
        { word: 'have breakfast', translation: 'завтракать', example: 'I have breakfast at 8 AM.' },
        { word: 'commute', translation: 'ехать на работу', example: 'I commute to work by subway.' },
        { word: 'work', translation: 'работать', example: 'I work from 9 AM to 6 PM.' },
        { word: 'meeting', translation: 'встреча', example: 'I have a meeting at 10 AM.' },
        { word: 'lunch break', translation: 'обеденный перерыв', example: 'I have a lunch break at 1 PM.' },
        { word: 'finish work', translation: 'заканчивать работу', example: 'I finish work at 6 PM.' },
        { word: 'relax', translation: 'расслабляться', example: 'I relax after work.' },
        { word: 'watch TV', translation: 'смотреть телевизор', example: 'I watch TV in the evening.' },
        { word: 'read', translation: 'читать', example: 'I read before bed.' },
        { word: 'go to bed', translation: 'ложиться спать', example: 'I go to bed at 11 PM.' },
        { word: 'sleep', translation: 'спать', example: 'I sleep for 8 hours.' }
    ],
    'hobbies-interests': [
        { word: 'football / soccer', translation: 'футбол', example: 'I play football on weekends.' },
        { word: 'swimming', translation: 'плавание', example: 'I go swimming twice a week.' },
        { word: 'running', translation: 'бег', example: 'I go running in the morning.' },
        { word: 'basketball', translation: 'баскетбол', example: 'I play basketball with friends.' },
        { word: 'tennis', translation: 'теннис', example: 'I play tennis on Sundays.' },
        { word: 'cycling', translation: 'велоспорт', example: 'I go cycling in the park.' },
        { word: 'exercise', translation: 'упражнение, заниматься спортом', example: 'I exercise at the gym.' },
        { word: 'music', translation: 'музыка', example: 'I listen to music every day.' },
        { word: 'painting', translation: 'живопись', example: 'I like painting.' },
        { word: 'photography', translation: 'фотография', example: 'I do photography as a hobby.' },
        { word: 'drawing', translation: 'рисование', example: 'I enjoy drawing.' },
        { word: 'singing', translation: 'пение', example: 'I like singing.' },
        { word: 'dancing', translation: 'танцы', example: 'I go dancing on weekends.' },
        { word: 'movies / films', translation: 'фильмы', example: 'I watch movies on weekends.' },
        { word: 'games', translation: 'игры', example: 'I play video games.' },
        { word: 'books', translation: 'книги', example: 'I read books every evening.' },
        { word: 'hobby', translation: 'хобби', example: 'My hobby is photography.' },
        { word: 'interest', translation: 'интерес', example: 'My interests are music and sports.' },
        { word: 'free time', translation: 'свободное время', example: 'I read books in my free time.' },
        { word: 'weekend', translation: 'выходные', example: 'I relax on the weekend.' }
    ]
};

let currentCards = [];
let currentCardIndex = 0;
let isFlipped = false;

function initFlashcardGame() {
    const startBtn = document.getElementById('startFlashcards');
    const categorySelect = document.getElementById('categorySelect');
    const flashcardGame = document.getElementById('flashcardGame');
    const shuffleBtn = document.getElementById('shuffleFlashcards');
    const resetBtn = document.getElementById('resetFlashcards');
    const closeBtn = document.getElementById('closeFlashcards');
    const flipBtn = document.getElementById('flipCard');
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    const flashcard = document.getElementById('flashcard');
    
    if (!startBtn) return;
    
    // Начать игру
    startBtn.addEventListener('click', () => {
        const category = categorySelect.value;
        loadCards(category);
        if (currentCards.length > 0) {
            flashcardGame.style.display = 'block';
            shuffleBtn.style.display = 'inline-block';
            startBtn.textContent = 'Перезапустить';
            currentCardIndex = 0;
            isFlipped = false;
            showCard();
        }
    });
    
    // Перемешать карточки
    shuffleBtn.addEventListener('click', () => {
        shuffleCards();
        currentCardIndex = 0;
        isFlipped = false;
        showCard();
    });
    
    // Начать заново
    resetBtn.addEventListener('click', () => {
        currentCardIndex = 0;
        isFlipped = false;
        showCard();
    });
    
    // Закрыть игру
    closeBtn.addEventListener('click', () => {
        flashcardGame.style.display = 'none';
        startBtn.textContent = 'Начать изучение';
    });
    
    // Перевернуть карточку
    flipBtn.addEventListener('click', () => {
        flipCard();
    });
    
    // Клик по карточке для переворачивания
    if (flashcard) {
        flashcard.addEventListener('click', (e) => {
            if (!e.target.closest('.flashcard-nav') && !e.target.closest('.flashcard-actions')) {
                flipCard();
            }
        });
    }
    
    // Навигация
    prevBtn.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            isFlipped = false;
            showCard();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentCardIndex < currentCards.length - 1) {
            currentCardIndex++;
            isFlipped = false;
            showCard();
        }
    });
    
    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        if (flashcardGame.style.display === 'none') return;
        
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            flipCard();
        }
    });
}

function loadCards(category) {
    currentCards = [];
    
    // Определяем, на какой странице мы находимся
    const currentFile = (location.pathname.split('/').pop() || '').toLowerCase();
    const isModule2 = currentFile.includes('02-everyday-life');
    
    // Категории для модуля 2
    const module2Categories = ['family-relationships', 'home-interior', 'city-infrastructure', 'food-drinks', 'daily-routine', 'hobbies-interests'];
    
    // Категории для модуля 1
    const module1Categories = ['greetings', 'names-countries', 'professions', 'basic-nouns', 'basic-verbs', 'questions-pronouns', 'useful-phrases', 'numbers', 'it-professions', 'it-terms', 'travel'];
    
    if (category === 'all') {
        // Загружаем все карточки из соответствующих категорий модуля
        const categoriesToUse = isModule2 ? module2Categories : module1Categories;
        categoriesToUse.forEach(key => {
            if (flashcardData[key]) {
                currentCards = currentCards.concat(flashcardData[key]);
            }
        });
    } else {
        currentCards = flashcardData[category] || [];
    }
    
    // Перемешиваем карточки при загрузке
    shuffleCards();
}

function shuffleCards() {
    for (let i = currentCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentCards[i], currentCards[j]] = [currentCards[j], currentCards[i]];
    }
}

function showCard() {
    if (currentCards.length === 0) return;
    
    const card = currentCards[currentCardIndex];
    const wordEl = document.getElementById('flashcardWord');
    const translationEl = document.getElementById('flashcardTranslation');
    const exampleEl = document.getElementById('flashcardExample');
    const counterEl = document.getElementById('cardCounter');
    const progressEl = document.getElementById('cardProgress');
    const flashcard = document.getElementById('flashcard');
    
    if (wordEl) wordEl.textContent = card.word;
    if (translationEl) translationEl.textContent = card.translation;
    if (exampleEl) {
        exampleEl.innerHTML = `<strong>Пример:</strong> ${card.example}`;
    }
    if (counterEl) {
        counterEl.textContent = `${currentCardIndex + 1} / ${currentCards.length}`;
    }
    if (progressEl) {
        const progress = Math.round(((currentCardIndex + 1) / currentCards.length) * 100);
        progressEl.textContent = `${progress}%`;
    }
    
    // Сбрасываем переворот карточки
    if (flashcard) {
        flashcard.classList.remove('flipped');
        isFlipped = false;
    }
    
    // Обновляем состояние кнопок навигации
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    if (prevBtn) prevBtn.disabled = currentCardIndex === 0;
    if (nextBtn) nextBtn.disabled = currentCardIndex === currentCards.length - 1;
}

function flipCard() {
    const flashcard = document.getElementById('flashcard');
    if (!flashcard) return;
    
    isFlipped = !isFlipped;
    flashcard.classList.toggle('flipped', isFlipped);
}
