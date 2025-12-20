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
            file: '03-work-professional.html',
            title: '3. Работа и профессиональная деятельность',
            sub: [
                { id: 'office-workplace', text: 'Офис и рабочее место' },
                { id: 'work-processes', text: 'Рабочие процессы' },
                { id: 'work-communication', text: 'Коммуникация на работе' },
                { id: 'it-professions-advanced', text: 'IT-профессии углубленно' },
                { id: 'career-development', text: 'Карьера и развитие' },
                { id: 'business-trips', text: 'Деловые поездки' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'final-case', text: 'Итоговый кейс' }
            ]
        },
        {
            index: 4,
            file: '04-technologies-infrastructure.html',
            title: '4. Технологии и IT-инфраструктура',
            sub: [
                { id: 'hardware', text: 'Аппаратное обеспечение' },
                { id: 'software', text: 'Программное обеспечение' },
                { id: 'networks-internet', text: 'Сети и интернет' },
                { id: 'databases', text: 'Базы данных' },
                { id: 'cloud-technologies', text: 'Облачные технологии' },
                { id: 'cybersecurity', text: 'Кибербезопасность' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'final-case', text: 'Итоговый кейс' }
            ]
        },
        {
            index: 5,
            file: '05-travel-transport.html',
            title: '5. Путешествия и транспорт',
            sub: [
                { id: 'airports-flights', text: 'Аэропорты и рейсы' },
                { id: 'accommodation', text: 'Проживание' },
                { id: 'public-transport', text: 'Общественный транспорт' },
                { id: 'taxi-car-rental', text: 'Такси и аренда авто' },
                { id: 'directions-navigation', text: 'Направления и навигация' },
                { id: 'emergencies-problems', text: 'Экстренные ситуации' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'final-case', text: 'Итоговый кейс' }
            ]
        },
        {
            index: 6,
            file: '06-shopping-services.html',
            title: '6. Покупки и сервисы',
            sub: [
                { id: 'shopping', text: 'Покупки' },
                { id: 'restaurants-food', text: 'Рестораны и еда' },
                { id: 'services', text: 'Услуги' },
                { id: 'money-banking', text: 'Деньги и банки' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'final-case', text: 'Итоговый кейс' }
            ]
        },
        {
            index: 7,
            file: '07-housing-utilities.html',
            title: '7. Жильё и коммунальные услуги',
            sub: [
                { id: 'renting', text: 'Аренда жилья' },
                { id: 'utilities', text: 'Коммунальные услуги' },
                { id: 'furniture-appliances', text: 'Мебель и бытовая техника' },
                { id: 'maintenance', text: 'Ремонт и обслуживание' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'final-case', text: 'Итоговый кейс' }
            ]
        },
        {
            index: 8,
            file: '08-health-emergencies.html',
            title: '8. Здоровье и чрезвычайные ситуации',
            sub: [
                { id: 'health-medicine', text: 'Здоровье и медицина' },
                { id: 'insurance', text: 'Страховка' },
                { id: 'safety', text: 'Безопасность' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'final-case', text: 'Итоговый кейс' }
            ]
        },
        {
            index: 9,
            file: '09-professional-content.html',
            title: '9. Профессиональный контент',
            sub: [
                { id: 'presentations-talks', text: 'Доклады и презентации' },
                { id: 'articles-blogs', text: 'Статьи и блоги' },
                { id: 'conferences-networking', text: 'Конференции и нетворкинг' },
                { id: 'tech-news', text: 'Технические новости' },
                { id: 'grammar', text: 'Грамматика' },
                { id: 'dialogues', text: 'Диалоги-ситуации' },
                { id: 'final-case', text: 'Итоговый кейс' }
            ]
        },
        {
            index: 10,
            file: '10-culture-etiquette.html',
            title: '10. Культура, этикет и итоговая проверка',
            sub: [
                { id: 'cultural-differences', text: 'Культурные различия' },
                { id: 'etiquette', text: 'Этикет' },
                { id: 'small-talk', text: 'Small talk' },
                { id: 'final-assessment', text: 'Итоговая проверка' },
                { id: 'resources', text: 'Ресурсы для развития' }
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
        const activeSection = sections[currentActiveIndex];
        const activeSectionId = activeSection ? activeSection.id : null;
        
        subtopics.forEach(link => {
            link.classList.remove('active');
            // Проверяем по ID секции, а не по индексу
            if (activeSectionId && link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
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
                
                // Находим родительский блок (reading-block, practice-card или dialogue-card)
                let block = this.closest('.reading-block') || this.closest('.practice-card') || this.closest('.dialogue-card');
                
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
    ],
    // Модуль 3: Работа и профессиональная деятельность
    'office-workplace': [
        { word: 'desk', translation: 'стол, рабочий стол', example: 'I work at my desk every day.' },
        { word: 'chair', translation: 'стул', example: 'My chair is very comfortable.' },
        { word: 'computer', translation: 'компьютер', example: 'I use my computer for work.' },
        { word: 'printer', translation: 'принтер', example: 'The printer is in the corner.' },
        { word: 'monitor', translation: 'монитор', example: 'I have two monitors on my desk.' },
        { word: 'keyboard', translation: 'клавиатура', example: 'I type on my keyboard.' },
        { word: 'mouse', translation: 'мышь', example: 'I use a wireless mouse.' },
        { word: 'laptop', translation: 'ноутбук', example: 'I take my laptop to meetings.' },
        { word: 'phone', translation: 'телефон', example: 'I answer the phone during work hours.' },
        { word: 'headphones', translation: 'наушники', example: 'I wear headphones during video calls.' },
        { word: 'pen', translation: 'ручка', example: 'I write notes with a pen.' },
        { word: 'paper', translation: 'бумага', example: 'I print documents on paper.' },
        { word: 'folder', translation: 'папка', example: 'I keep documents in a folder.' },
        { word: 'stapler', translation: 'степлер', example: 'I use a stapler to attach papers.' },
        { word: 'notebook', translation: 'блокнот', example: 'I write ideas in my notebook.' },
        { word: 'sticky notes', translation: 'стикеры, заметки', example: 'I use sticky notes for reminders.' },
        { word: 'clipboard', translation: 'планшет для бумаг', example: 'I carry a clipboard to meetings.' },
        { word: 'scissors', translation: 'ножницы', example: 'I cut paper with scissors.' },
        { word: 'tape', translation: 'скотч, лента', example: 'I use tape to seal envelopes.' },
        { word: 'envelope', translation: 'конверт', example: 'I put documents in an envelope.' },
        { word: 'cubicle', translation: 'рабочее место (отгороженное)', example: 'I work in a cubicle.' },
        { word: 'meeting room', translation: 'переговорная, комната для встреч', example: 'We have a meeting in the meeting room.' },
        { word: 'break room', translation: 'комната отдыха', example: 'I have coffee in the break room.' },
        { word: 'conference room', translation: 'конференц-зал', example: 'The presentation is in the conference room.' },
        { word: 'office', translation: 'офис', example: 'I go to the office every day.' },
        { word: 'reception', translation: 'ресепшн, приёмная', example: 'Visitors wait at reception.' },
        { word: 'parking lot', translation: 'парковка', example: 'I park my car in the parking lot.' },
        { word: 'elevator', translation: 'лифт', example: 'I take the elevator to the 5th floor.' },
        { word: 'lobby', translation: 'холл, вестибюль', example: 'I meet clients in the lobby.' },
        { word: 'cafeteria', translation: 'столовая', example: 'I have lunch in the cafeteria.' }
    ],
    'work-processes': [
        { word: 'assign', translation: 'назначать, поручать', example: 'My manager assigns tasks to me.' },
        { word: 'complete', translation: 'завершать, выполнять', example: 'I complete my tasks on time.' },
        { word: 'deadline', translation: 'крайний срок', example: 'The deadline is next Friday.' },
        { word: 'priority', translation: 'приоритет', example: 'This task has high priority.' },
        { word: 'task', translation: 'задача', example: 'I have many tasks today.' },
        { word: 'to-do list', translation: 'список дел', example: 'I check my to-do list every morning.' },
        { word: 'urgent', translation: 'срочный', example: 'This is an urgent matter.' },
        { word: 'postpone', translation: 'откладывать', example: 'We need to postpone the meeting.' },
        { word: 'delay', translation: 'задержка', example: 'There is a delay in the project.' },
        { word: 'schedule', translation: 'расписание, планировать', example: 'I schedule meetings for next week.' },
        { word: 'plan', translation: 'план, планировать', example: 'We plan the project together.' },
        { word: 'execute', translation: 'выполнять, исполнять', example: 'We execute the plan step by step.' },
        { word: 'deliver', translation: 'доставлять, предоставлять', example: 'We deliver the product on time.' },
        { word: 'review', translation: 'проверять, обзор', example: 'I review the code before deployment.' },
        { word: 'project', translation: 'проект', example: 'I work on a new project.' },
        { word: 'milestone', translation: 'веха, этап', example: 'We reached an important milestone.' },
        { word: 'progress', translation: 'прогресс, продвижение', example: 'We make good progress on the project.' },
        { word: 'status', translation: 'статус, состояние', example: 'What is the status of the project?' },
        { word: 'budget', translation: 'бюджет', example: 'We need to stay within budget.' },
        { word: 'scope', translation: 'объём, масштаб', example: 'The scope of the project is large.' },
        { word: 'report', translation: 'отчёт, отчитываться', example: 'I write a weekly report.' },
        { word: 'document', translation: 'документ, документировать', example: 'I document all changes.' },
        { word: 'present', translation: 'представлять, презентовать', example: 'I present my findings to the team.' },
        { word: 'summary', translation: 'резюме, краткое изложение', example: 'I write a summary of the meeting.' },
        { word: 'update', translation: 'обновление, обновлять', example: 'I send a weekly update to my manager.' },
        { word: 'track', translation: 'отслеживать', example: 'I track my tasks in a spreadsheet.' },
        { word: 'submit', translation: 'представлять, отправлять', example: 'I submit my report by Friday.' },
        { word: 'approve', translation: 'одобрять, утверждать', example: 'My manager needs to approve this.' },
        { word: 'reject', translation: 'отклонять', example: 'They reject my proposal.' },
        { word: 'feedback', translation: 'обратная связь', example: 'I ask for feedback on my work.' }
    ],
    'work-communication': [
        { word: 'schedule', translation: 'планировать, расписание', example: 'I schedule a meeting for tomorrow.' },
        { word: 'attend', translation: 'посещать, присутствовать', example: 'I attend weekly team meetings.' },
        { word: 'minutes', translation: 'протокол, минуты', example: 'I take minutes during the meeting.' },
        { word: 'agenda', translation: 'повестка дня', example: 'The agenda includes three topics.' },
        { word: 'meeting', translation: 'встреча, совещание', example: 'We have a meeting at 2 PM.' },
        { word: 'conference call', translation: 'телефонная конференция', example: 'I join the conference call at 10 AM.' },
        { word: 'video call', translation: 'видеозвонок', example: 'We use video calls for remote meetings.' },
        { word: 'participant', translation: 'участник', example: 'All participants are present.' },
        { word: 'discuss', translation: 'обсуждать', example: 'We discuss the project details.' },
        { word: 'decision', translation: 'решение', example: 'We make a decision together.' },
        { word: 'email', translation: 'электронная почта, письмо', example: 'I send an email to my colleague.' },
        { word: 'memo', translation: 'служебная записка', example: 'I write a memo about the changes.' },
        { word: 'attachment', translation: 'вложение', example: 'I send the document as an attachment.' },
        { word: 'forward', translation: 'пересылать', example: 'I forward the email to my manager.' },
        { word: 'reply', translation: 'отвечать', example: 'I reply to emails promptly.' },
        { word: 'cc (carbon copy)', translation: 'копия', example: 'I add my manager in cc.' },
        { word: 'bcc (blind carbon copy)', translation: 'скрытая копия', example: 'I use bcc for privacy.' },
        { word: 'subject', translation: 'тема письма', example: 'I write a clear subject line.' },
        { word: 'inbox', translation: 'входящие', example: 'I check my inbox every morning.' },
        { word: 'outbox', translation: 'исходящие', example: 'I check my outbox for sent emails.' },
        { word: 'slide', translation: 'слайд', example: 'I prepare 20 slides for the presentation.' },
        { word: 'audience', translation: 'аудитория', example: 'The audience asks many questions.' },
        { word: 'Q&A (question and answer)', translation: 'вопросы и ответы', example: 'We have a Q&A session after the presentation.' },
        { word: 'feedback', translation: 'обратная связь', example: 'I receive positive feedback on my presentation.' },
        { word: 'presentation', translation: 'презентация', example: 'I give a presentation to the team.' },
        { word: 'present', translation: 'представлять, презентовать', example: 'I present my ideas clearly.' },
        { word: 'visual', translation: 'визуальный', example: 'I use visual aids in my presentation.' },
        { word: 'chart', translation: 'график, диаграмма', example: 'I show a chart with the data.' },
        { word: 'graph', translation: 'график', example: 'I include a graph in my slides.' },
        { word: 'handout', translation: 'раздаточный материал', example: 'I prepare handouts for the audience.' }
    ],
    'it-professions-advanced': [
        { word: 'frontend', translation: 'фронтенд', example: 'I work as a frontend developer.' },
        { word: 'backend', translation: 'бэкенд', example: 'I specialize in backend development.' },
        { word: 'fullstack', translation: 'фулстек', example: 'I\'m a fullstack developer.' },
        { word: 'mobile', translation: 'мобильный', example: 'I develop mobile applications.' },
        { word: 'devops', translation: 'DevOps', example: 'I work as a devops engineer.' },
        { word: 'data science', translation: 'наука о данных', example: 'I study data science.' },
        { word: 'machine learning', translation: 'машинное обучение', example: 'I work with machine learning.' },
        { word: 'cybersecurity', translation: 'кибербезопасность', example: 'I specialize in cybersecurity.' },
        { word: 'cloud', translation: 'облако', example: 'I work with cloud technologies.' },
        { word: 'blockchain', translation: 'блокчейн', example: 'I develop blockchain solutions.' },
        { word: 'team lead', translation: 'тимлид, руководитель команды', example: 'I work as a team lead.' },
        { word: 'architect', translation: 'архитектор', example: 'I\'m a software architect.' },
        { word: 'analyst', translation: 'аналитик', example: 'I work as a business analyst.' },
        { word: 'tester', translation: 'тестировщик', example: 'I\'m a QA tester.' },
        { word: 'scrum master', translation: 'скрам-мастер', example: 'I work as a scrum master.' },
        { word: 'product manager', translation: 'продакт-менеджер', example: 'I\'m a product manager.' },
        { word: 'project manager', translation: 'проект-менеджер', example: 'I work as a project manager.' },
        { word: 'tech lead', translation: 'техлид', example: 'I\'m a tech lead.' },
        { word: 'mentor', translation: 'ментор, наставник', example: 'I work as a mentor for junior developers.' },
        { word: 'consultant', translation: 'консультант', example: 'I work as an IT consultant.' },
        { word: 'junior', translation: 'джуниор, начинающий', example: 'I\'m a junior developer.' },
        { word: 'middle', translation: 'мидл, средний', example: 'I work as a middle developer.' },
        { word: 'senior', translation: 'сеньор, старший', example: 'I\'m a senior developer.' },
        { word: 'principal', translation: 'принципал, ведущий', example: 'I work as a principal engineer.' },
        { word: 'intern', translation: 'стажёр', example: 'I\'m an intern at the company.' },
        { word: 'trainee', translation: 'стажёр, обучающийся', example: 'I work as a trainee.' },
        { word: 'experienced', translation: 'опытный', example: 'I\'m an experienced developer.' },
        { word: 'entry-level', translation: 'начальный уровень', example: 'This is an entry-level position.' },
        { word: 'expert', translation: 'эксперт', example: 'I\'m an expert in Python.' },
        { word: 'specialist', translation: 'специалист', example: 'I\'m a security specialist.' }
    ],
    'career-development': [
        { word: 'technical', translation: 'технический', example: 'I have strong technical skills.' },
        { word: 'soft skills', translation: 'мягкие навыки', example: 'I develop my soft skills.' },
        { word: 'leadership', translation: 'лидерство', example: 'I show leadership in my team.' },
        { word: 'communication', translation: 'коммуникация', example: 'Good communication is important.' },
        { word: 'teamwork', translation: 'командная работа', example: 'I value teamwork.' },
        { word: 'problem-solving', translation: 'решение проблем', example: 'I\'m good at problem-solving.' },
        { word: 'skill', translation: 'навык', example: 'I learn new skills every day.' },
        { word: 'competence', translation: 'компетенция', example: 'I develop my competence in programming.' },
        { word: 'expertise', translation: 'экспертиза, опыт', example: 'I have expertise in web development.' },
        { word: 'proficiency', translation: 'мастерство, владение', example: 'I have high proficiency in JavaScript.' },
        { word: 'training', translation: 'обучение, тренировка', example: 'I attend training sessions.' },
        { word: 'certification', translation: 'сертификация', example: 'I get a certification in cloud computing.' },
        { word: 'workshop', translation: 'воркшоп, мастер-класс', example: 'I attend a workshop on React.' },
        { word: 'course', translation: 'курс', example: 'I take an online course.' },
        { word: 'seminar', translation: 'семинар', example: 'I participate in a seminar.' },
        { word: 'conference', translation: 'конференция', example: 'I attend a tech conference.' },
        { word: 'webinar', translation: 'вебинар', example: 'I watch a webinar about AI.' },
        { word: 'self-study', translation: 'самообучение', example: 'I do self-study every evening.' },
        { word: 'mentorship', translation: 'менторство', example: 'I receive mentorship from a senior developer.' },
        { word: 'onboarding', translation: 'онбординг, адаптация', example: 'I complete the onboarding process.' },
        { word: 'promotion', translation: 'повышение, продвижение', example: 'I get a promotion to senior developer.' },
        { word: 'salary', translation: 'зарплата', example: 'I negotiate my salary.' },
        { word: 'benefits', translation: 'льготы, преимущества', example: 'The company offers good benefits.' },
        { word: 'raise', translation: 'повышение зарплаты', example: 'I ask for a raise.' },
        { word: 'bonus', translation: 'бонус', example: 'I receive a performance bonus.' },
        { word: 'career path', translation: 'карьерный путь', example: 'I plan my career path.' },
        { word: 'advancement', translation: 'продвижение, развитие', example: 'I seek advancement opportunities.' },
        { word: 'growth', translation: 'рост, развитие', example: 'I focus on professional growth.' },
        { word: 'opportunity', translation: 'возможность', example: 'I look for new opportunities.' },
        { word: 'achievement', translation: 'достижение', example: 'I celebrate my achievements.' }
    ],
    'business-trips': [
        { word: 'business trip', translation: 'деловая поездка, командировка', example: 'I go on a business trip next week.' },
        { word: 'accommodation', translation: 'размещение, жильё', example: 'I book accommodation for the trip.' },
        { word: 'per diem', translation: 'суточные', example: 'I receive per diem for expenses.' },
        { word: 'expense report', translation: 'отчёт о расходах', example: 'I submit an expense report after the trip.' },
        { word: 'itinerary', translation: 'маршрут, расписание поездки', example: 'I check my itinerary before departure.' },
        { word: 'booking', translation: 'бронирование', example: 'I make a booking for the hotel.' },
        { word: 'reservation', translation: 'бронирование', example: 'I confirm my reservation.' },
        { word: 'check-in', translation: 'регистрация, заселение', example: 'I do check-in at the hotel.' },
        { word: 'check-out', translation: 'выезд', example: 'I do check-out at 11 AM.' },
        { word: 'receipt', translation: 'чек, квитанция', example: 'I keep all receipts for expenses.' },
        { word: 'attendee', translation: 'участник', example: 'I\'m an attendee at the conference.' },
        { word: 'speaker', translation: 'докладчик, спикер', example: 'I\'m a speaker at the event.' },
        { word: 'exhibitor', translation: 'экспонент, участник выставки', example: 'Our company is an exhibitor at the trade show.' },
        { word: 'keynote', translation: 'ключевой доклад', example: 'I attend the keynote speech.' },
        { word: 'session', translation: 'сессия, сеанс', example: 'I attend a technical session.' },
        { word: 'booth', translation: 'стенд, павильон', example: 'I work at our company\'s booth.' },
        { word: 'badge', translation: 'бейдж, значок', example: 'I wear a badge with my name.' },
        { word: 'registration', translation: 'регистрация', example: 'I complete the registration online.' },
        { word: 'venue', translation: 'место проведения', example: 'The venue is in the city center.' },
        { word: 'agenda', translation: 'программа, расписание', example: 'I check the conference agenda.' },
        { word: 'network', translation: 'сеть, налаживать связи', example: 'I network with other professionals.' },
        { word: 'contact', translation: 'контакт, связываться', example: 'I exchange contacts with colleagues.' },
        { word: 'follow-up', translation: 'последующее действие', example: 'I send a follow-up email after the meeting.' },
        { word: 'connection', translation: 'связь, знакомство', example: 'I make valuable connections at conferences.' },
        { word: 'relationship', translation: 'отношения, связь', example: 'I build professional relationships.' },
        { word: 'business card', translation: 'визитная карточка', example: 'I exchange business cards.' },
        { word: 'introduction', translation: 'представление, знакомство', example: 'I make an introduction at the event.' },
        { word: 'referral', translation: 'рекомендация, направление', example: 'I get a referral from a colleague.' },
        { word: 'partnership', translation: 'партнёрство', example: 'I explore partnership opportunities.' },
        { word: 'collaboration', translation: 'сотрудничество', example: 'I seek collaboration opportunities.' }
    ],
    
    // Модуль 4: Технологии и IT-инфраструктура
    'hardware': [
        { word: 'CPU', translation: 'процессор', example: 'The CPU processes all instructions.' },
        { word: 'processor', translation: 'процессор', example: 'I need a faster processor for this task.' },
        { word: 'RAM', translation: 'оперативная память', example: 'My computer has 16 GB of RAM.' },
        { word: 'memory', translation: 'память', example: 'I need more memory for this application.' },
        { word: 'motherboard', translation: 'материнская плата', example: 'The motherboard connects all components.' },
        { word: 'GPU', translation: 'видеокарта', example: 'The GPU handles graphics rendering.' },
        { word: 'graphics card', translation: 'видеокарта', example: 'I upgrade my graphics card for gaming.' },
        { word: 'hard drive', translation: 'жёсткий диск', example: 'I store files on the hard drive.' },
        { word: 'SSD', translation: 'твердотельный накопитель', example: 'SSD is faster than HDD.' },
        { word: 'HDD', translation: 'жёсткий диск', example: 'HDD has more storage capacity.' },
        { word: 'storage', translation: 'хранилище, накопитель', example: 'I need more storage space.' },
        { word: 'monitor', translation: 'монитор', example: 'I use two monitors for work.' },
        { word: 'display', translation: 'дисплей, экран', example: 'The display shows high resolution.' },
        { word: 'keyboard', translation: 'клавиатура', example: 'I type on the keyboard.' },
        { word: 'mouse', translation: 'мышь', example: 'I use a wireless mouse.' },
        { word: 'scanner', translation: 'сканер', example: 'I scan documents with the scanner.' },
        { word: 'printer', translation: 'принтер', example: 'The printer prints documents.' },
        { word: 'server', translation: 'сервер', example: 'The server hosts our application.' },
        { word: 'router', translation: 'маршрутизатор', example: 'The router connects devices to the network.' },
        { word: 'switch', translation: 'коммутатор', example: 'The switch manages network traffic.' },
        { word: 'firewall', translation: 'файрвол, межсетевой экран', example: 'The firewall blocks unauthorized access.' },
        { word: 'network device', translation: 'сетевое устройство', example: 'I configure network devices.' },
        { word: 'peripheral', translation: 'периферийное устройство', example: 'I connect peripherals to my computer.' },
        { word: 'device', translation: 'устройство', example: 'I connect the device to the network.' },
        { word: 'component', translation: 'компонент', example: 'I replace a faulty component.' },
        { word: 'hardware', translation: 'аппаратное обеспечение', example: 'I work with hardware configuration.' },
        { word: 'specification', translation: 'спецификация, характеристики', example: 'I check the hardware specifications.' },
        { word: 'performance', translation: 'производительность', example: 'I monitor system performance.' },
        { word: 'upgrade', translation: 'обновление, улучшение', example: 'I upgrade my hardware regularly.' },
        { word: 'compatibility', translation: 'совместимость', example: 'I check hardware compatibility.' }
    ],
    'software': [
        { word: 'operating system', translation: 'операционная система', example: 'I use Windows as my operating system.' },
        { word: 'OS', translation: 'ОС, операционная система', example: 'The OS manages system resources.' },
        { word: 'Windows', translation: 'Windows', example: 'I work on Windows 11.' },
        { word: 'Linux', translation: 'Linux', example: 'I use Linux for development.' },
        { word: 'macOS', translation: 'macOS', example: 'I develop on macOS.' },
        { word: 'Android', translation: 'Android', example: 'I develop Android applications.' },
        { word: 'iOS', translation: 'iOS', example: 'I create iOS apps.' },
        { word: 'application', translation: 'приложение', example: 'I develop a new application.' },
        { word: 'app', translation: 'приложение', example: 'I download a mobile app.' },
        { word: 'browser', translation: 'браузер', example: 'I use Chrome browser.' },
        { word: 'editor', translation: 'редактор', example: 'I write code in a text editor.' },
        { word: 'IDE', translation: 'интегрированная среда разработки', example: 'I use Visual Studio Code IDE.' },
        { word: 'compiler', translation: 'компилятор', example: 'The compiler translates code to machine language.' },
        { word: 'interpreter', translation: 'интерпретатор', example: 'Python uses an interpreter.' },
        { word: 'software', translation: 'программное обеспечение', example: 'I install new software.' },
        { word: 'program', translation: 'программа', example: 'I write a computer program.' },
        { word: 'code', translation: 'код', example: 'I write clean code.' },
        { word: 'source code', translation: 'исходный код', example: 'I review the source code.' },
        { word: 'proprietary', translation: 'проприетарный', example: 'I use proprietary software.' },
        { word: 'open source', translation: 'открытый исходный код', example: 'I contribute to open source projects.' },
        { word: 'freeware', translation: 'бесплатное ПО', example: 'I download freeware applications.' },
        { word: 'shareware', translation: 'условно-бесплатное ПО', example: 'I try shareware before buying.' },
        { word: 'license', translation: 'лицензия', example: 'I check the software license.' },
        { word: 'version', translation: 'версия', example: 'I update to the latest version.' },
        { word: 'update', translation: 'обновление', example: 'I install software updates.' },
        { word: 'patch', translation: 'патч, исправление', example: 'I apply a security patch.' },
        { word: 'bug', translation: 'ошибка, баг', example: 'I fix a bug in the code.' },
        { word: 'feature', translation: 'функция, возможность', example: 'I add a new feature.' },
        { word: 'interface', translation: 'интерфейс', example: 'I design a user interface.' },
        { word: 'API', translation: 'API, интерфейс прикладного программирования', example: 'I use the API for integration.' },
        { word: 'framework', translation: 'фреймворк', example: 'I use React framework.' },
        { word: 'library', translation: 'библиотека', example: 'I import a JavaScript library.' },
        { word: 'package', translation: 'пакет, пакет программ', example: 'I install a npm package.' },
        { word: 'dependency', translation: 'зависимость', example: 'I manage project dependencies.' },
        { word: 'repository', translation: 'репозиторий', example: 'I push code to the repository.' },
        { word: 'deployment', translation: 'развёртывание', example: 'I handle application deployment.' },
        { word: 'installation', translation: 'установка', example: 'I complete software installation.' },
        { word: 'configuration', translation: 'конфигурация', example: 'I change the configuration settings.' },
        { word: 'settings', translation: 'настройки', example: 'I adjust application settings.' },
        { word: 'preferences', translation: 'предпочтения, настройки', example: 'I customize user preferences.' }
    ],
    'networks-internet': [
        { word: 'network', translation: 'сеть', example: 'I configure the network settings.' },
        { word: 'internet', translation: 'интернет', example: 'I connect to the internet.' },
        { word: 'protocol', translation: 'протокол', example: 'I use TCP/IP protocol.' },
        { word: 'TCP/IP', translation: 'TCP/IP', example: 'TCP/IP is the main internet protocol.' },
        { word: 'HTTP', translation: 'HTTP', example: 'I use HTTP for web requests.' },
        { word: 'HTTPS', translation: 'HTTPS', example: 'HTTPS provides secure connections.' },
        { word: 'FTP', translation: 'FTP', example: 'I transfer files via FTP.' },
        { word: 'SSH', translation: 'SSH', example: 'I connect to servers via SSH.' },
        { word: 'bandwidth', translation: 'пропускная способность', example: 'I monitor network bandwidth.' },
        { word: 'latency', translation: 'задержка', example: 'I measure network latency.' },
        { word: 'packet', translation: 'пакет данных', example: 'I analyze network packets.' },
        { word: 'routing', translation: 'маршрутизация', example: 'I configure network routing.' },
        { word: 'router', translation: 'маршрутизатор', example: 'I configure the router settings.' },
        { word: 'switch', translation: 'коммутатор', example: 'I connect devices to the switch.' },
        { word: 'hub', translation: 'концентратор', example: 'I use a network hub.' },
        { word: 'modem', translation: 'модем', example: 'I connect to the internet via modem.' },
        { word: 'Wi-Fi', translation: 'Wi-Fi', example: 'I connect to Wi-Fi network.' },
        { word: 'wireless', translation: 'беспроводной', example: 'I use wireless connection.' },
        { word: 'Ethernet', translation: 'Ethernet', example: 'I use Ethernet cable connection.' },
        { word: 'cable', translation: 'кабель', example: 'I connect devices with a cable.' },
        { word: 'connection', translation: 'соединение, подключение', example: 'I establish a network connection.' },
        { word: 'connect', translation: 'подключать', example: 'I connect to the server.' },
        { word: 'disconnect', translation: 'отключать', example: 'I disconnect from the network.' },
        { word: 'IP address', translation: 'IP-адрес', example: 'I configure the IP address.' },
        { word: 'DNS', translation: 'DNS', example: 'I configure DNS settings.' },
        { word: 'domain', translation: 'домен', example: 'I register a domain name.' },
        { word: 'URL', translation: 'URL, адрес', example: 'I enter the URL in the browser.' },
        { word: 'website', translation: 'веб-сайт', example: 'I visit the website.' },
        { word: 'web page', translation: 'веб-страница', example: 'I load the web page.' },
        { word: 'server', translation: 'сервер', example: 'I deploy the application to the server.' },
        { word: 'client', translation: 'клиент', example: 'The client sends requests to the server.' },
        { word: 'request', translation: 'запрос', example: 'I send an HTTP request.' },
        { word: 'response', translation: 'ответ', example: 'I receive a response from the server.' },
        { word: 'encryption', translation: 'шифрование', example: 'I use encryption for security.' },
        { word: 'VPN', translation: 'VPN', example: 'I connect through VPN.' },
        { word: 'firewall', translation: 'файрвол', example: 'The firewall blocks unauthorized access.' },
        { word: 'proxy', translation: 'прокси', example: 'I configure proxy settings.' },
        { word: 'security', translation: 'безопасность', example: 'I implement network security measures.' },
        { word: 'authentication', translation: 'аутентификация', example: 'I implement user authentication.' },
        { word: 'authorization', translation: 'авторизация', example: 'I check user authorization.' },
        { word: 'access', translation: 'доступ', example: 'I grant access to resources.' },
        { word: 'permission', translation: 'разрешение', example: 'I check user permissions.' }
    ],
    'databases': [
        { word: 'database', translation: 'база данных', example: 'I design a new database.' },
        { word: 'DB', translation: 'БД, база данных', example: 'I connect to the DB.' },
        { word: 'relational database', translation: 'реляционная база данных', example: 'I use a relational database.' },
        { word: 'NoSQL', translation: 'NoSQL', example: 'I choose NoSQL for scalability.' },
        { word: 'graph database', translation: 'графовая база данных', example: 'I use a graph database for relationships.' },
        { word: 'document database', translation: 'документная база данных', example: 'I store documents in a document database.' },
        { word: 'table', translation: 'таблица', example: 'I create a new table.' },
        { word: 'row', translation: 'строка', example: 'I insert a new row.' },
        { word: 'column', translation: 'столбец', example: 'I add a new column.' },
        { word: 'record', translation: 'запись', example: 'I update a record.' },
        { word: 'field', translation: 'поле', example: 'I modify a field value.' },
        { word: 'query', translation: 'запрос', example: 'I write a SQL query.' },
        { word: 'SQL', translation: 'SQL', example: 'I write SQL statements.' },
        { word: 'insert', translation: 'вставлять, добавлять', example: 'I insert new data.' },
        { word: 'update', translation: 'обновлять', example: 'I update existing records.' },
        { word: 'delete', translation: 'удалять', example: 'I delete old records.' },
        { word: 'select', translation: 'выбирать, извлекать', example: 'I select data from the table.' },
        { word: 'index', translation: 'индекс', example: 'I create an index for faster queries.' },
        { word: 'transaction', translation: 'транзакция', example: 'I commit a database transaction.' },
        { word: 'commit', translation: 'подтверждать', example: 'I commit the changes.' },
        { word: 'rollback', translation: 'откат', example: 'I rollback the transaction.' },
        { word: 'backup', translation: 'резервная копия', example: 'I create a database backup.' },
        { word: 'restore', translation: 'восстанавливать', example: 'I restore from backup.' },
        { word: 'replication', translation: 'репликация', example: 'I configure database replication.' },
        { word: 'primary key', translation: 'первичный ключ', example: 'I set a primary key.' },
        { word: 'foreign key', translation: 'внешний ключ', example: 'I create a foreign key relationship.' },
        { word: 'schema', translation: 'схема', example: 'I design the database schema.' },
        { word: 'normalization', translation: 'нормализация', example: 'I normalize the database structure.' },
        { word: 'join', translation: 'соединение', example: 'I perform a table join.' },
        { word: 'constraint', translation: 'ограничение', example: 'I add a constraint to the table.' },
        { word: 'trigger', translation: 'триггер', example: 'I create a database trigger.' },
        { word: 'stored procedure', translation: 'хранимая процедура', example: 'I write a stored procedure.' },
        { word: 'performance', translation: 'производительность', example: 'I optimize database performance.' },
        { word: 'optimization', translation: 'оптимизация', example: 'I perform query optimization.' }
    ],
    'cloud-technologies': [
        { word: 'cloud', translation: 'облако', example: 'I deploy applications to the cloud.' },
        { word: 'cloud computing', translation: 'облачные вычисления', example: 'I use cloud computing services.' },
        { word: 'IaaS', translation: 'IaaS, инфраструктура как услуга', example: 'I use IaaS for infrastructure.' },
        { word: 'PaaS', translation: 'PaaS, платформа как услуга', example: 'I deploy on PaaS platform.' },
        { word: 'SaaS', translation: 'SaaS, программное обеспечение как услуга', example: 'I subscribe to SaaS applications.' },
        { word: 'FaaS', translation: 'FaaS, функции как услуга', example: 'I use FaaS for serverless computing.' },
        { word: 'AWS', translation: 'AWS', example: 'I deploy on AWS cloud.' },
        { word: 'Azure', translation: 'Azure', example: 'I use Microsoft Azure services.' },
        { word: 'Google Cloud', translation: 'Google Cloud', example: 'I host applications on Google Cloud.' },
        { word: 'provider', translation: 'провайдер', example: 'I choose a cloud provider.' },
        { word: 'service', translation: 'сервис, услуга', example: 'I use cloud services.' },
        { word: 'virtualization', translation: 'виртуализация', example: 'I use virtualization technology.' },
        { word: 'virtual machine', translation: 'виртуальная машина', example: 'I create a virtual machine.' },
        { word: 'VM', translation: 'ВМ, виртуальная машина', example: 'I deploy applications on VMs.' },
        { word: 'container', translation: 'контейнер', example: 'I use Docker containers.' },
        { word: 'Docker', translation: 'Docker', example: 'I containerize applications with Docker.' },
        { word: 'orchestration', translation: 'оркестрация', example: 'I use Kubernetes for orchestration.' },
        { word: 'Kubernetes', translation: 'Kubernetes', example: 'I manage containers with Kubernetes.' },
        { word: 'scaling', translation: 'масштабирование', example: 'I configure auto-scaling.' },
        { word: 'scale', translation: 'масштабировать', example: 'I scale the application horizontally.' },
        { word: 'load balancing', translation: 'балансировка нагрузки', example: 'I configure load balancing.' },
        { word: 'deployment', translation: 'развёртывание', example: 'I automate deployment processes.' },
        { word: 'infrastructure', translation: 'инфраструктура', example: 'I manage cloud infrastructure.' },
        { word: 'resource', translation: 'ресурс', example: 'I allocate cloud resources.' },
        { word: 'instance', translation: 'экземпляр', example: 'I launch a new instance.' },
        { word: 'storage', translation: 'хранилище', example: 'I use cloud storage services.' },
        { word: 'backup', translation: 'резервная копия', example: 'I configure automated backups.' },
        { word: 'disaster recovery', translation: 'восстановление после сбоя', example: 'I plan disaster recovery.' },
        { word: 'monitoring', translation: 'мониторинг', example: 'I set up cloud monitoring.' },
        { word: 'logging', translation: 'логирование', example: 'I configure application logging.' },
        { word: 'API', translation: 'API', example: 'I use cloud APIs for integration.' },
        { word: 'SDK', translation: 'SDK, комплект разработки', example: 'I use the cloud SDK.' },
        { word: 'billing', translation: 'биллинг, оплата', example: 'I monitor cloud billing costs.' },
        { word: 'cost', translation: 'стоимость', example: 'I optimize cloud costs.' },
        { word: 'security', translation: 'безопасность', example: 'I implement cloud security measures.' },
        { word: 'compliance', translation: 'соответствие требованиям', example: 'I ensure compliance with regulations.' },
        { word: 'region', translation: 'регион', example: 'I deploy to multiple regions.' },
        { word: 'availability zone', translation: 'зона доступности', example: 'I use multiple availability zones.' },
        { word: 'CDN', translation: 'CDN, сеть доставки контента', example: 'I use CDN for faster content delivery.' },
        { word: 'serverless', translation: 'бессерверный', example: 'I use serverless architecture.' },
        { word: 'microservices', translation: 'микросервисы', example: 'I build microservices architecture.' }
    ],
    'cybersecurity': [
        { word: 'security', translation: 'безопасность', example: 'I implement security measures.' },
        { word: 'cybersecurity', translation: 'кибербезопасность', example: 'I work in cybersecurity field.' },
        { word: 'threat', translation: 'угроза', example: 'I identify security threats.' },
        { word: 'vulnerability', translation: 'уязвимость', example: 'I fix security vulnerabilities.' },
        { word: 'attack', translation: 'атака', example: 'I prevent cyber attacks.' },
        { word: 'malware', translation: 'вредоносное ПО', example: 'I detect and remove malware.' },
        { word: 'virus', translation: 'вирус', example: 'I scan for computer viruses.' },
        { word: 'trojan', translation: 'троян', example: 'I protect against trojan horses.' },
        { word: 'ransomware', translation: 'программа-вымогатель', example: 'I prevent ransomware attacks.' },
        { word: 'phishing', translation: 'фишинг', example: 'I educate users about phishing.' },
        { word: 'DDoS', translation: 'DDoS, распределённая атака', example: 'I mitigate DDoS attacks.' },
        { word: 'breach', translation: 'нарушение, утечка', example: 'I investigate a data breach.' },
        { word: 'data breach', translation: 'утечка данных', example: 'I report a data breach immediately.' },
        { word: 'hack', translation: 'взлом', example: 'I prevent system hacks.' },
        { word: 'hacker', translation: 'хакер', example: 'I defend against hackers.' },
        { word: 'antivirus', translation: 'антивирус', example: 'I install antivirus software.' },
        { word: 'firewall', translation: 'файрвол', example: 'I configure the firewall rules.' },
        { word: 'encryption', translation: 'шифрование', example: 'I use encryption for data protection.' },
        { word: 'decrypt', translation: 'расшифровывать', example: 'I decrypt encrypted data.' },
        { word: '2FA', translation: 'двухфакторная аутентификация', example: 'I enable 2FA for accounts.' },
        { word: 'two-factor authentication', translation: 'двухфакторная аутентификация', example: 'I use two-factor authentication.' },
        { word: 'password', translation: 'пароль', example: 'I create a strong password.' },
        { word: 'authentication', translation: 'аутентификация', example: 'I implement user authentication.' },
        { word: 'authorization', translation: 'авторизация', example: 'I check user authorization.' },
        { word: 'access control', translation: 'контроль доступа', example: 'I implement access control policies.' },
        { word: 'permission', translation: 'разрешение', example: 'I grant user permissions.' },
        { word: 'audit', translation: 'аудит, проверка', example: 'I conduct security audits.' },
        { word: 'compliance', translation: 'соответствие требованиям', example: 'I ensure regulatory compliance.' },
        { word: 'incident response', translation: 'реагирование на инциденты', example: 'I handle incident response procedures.' },
        { word: 'incident', translation: 'инцидент', example: 'I report a security incident.' },
        { word: 'forensics', translation: 'криминалистика', example: 'I perform digital forensics.' },
        { word: 'penetration testing', translation: 'тестирование на проникновение', example: 'I conduct penetration testing.' },
        { word: 'vulnerability assessment', translation: 'оценка уязвимостей', example: 'I perform vulnerability assessments.' },
        { word: 'patch', translation: 'патч, исправление', example: 'I apply security patches.' },
        { word: 'update', translation: 'обновление', example: 'I install security updates.' },
        { word: 'backup', translation: 'резервная копия', example: 'I create regular backups.' },
        { word: 'recovery', translation: 'восстановление', example: 'I plan disaster recovery procedures.' },
        { word: 'policy', translation: 'политика', example: 'I implement security policies.' },
        { word: 'protocol', translation: 'протокол', example: 'I use secure protocols.' },
        { word: 'certificate', translation: 'сертификат', example: 'I install SSL certificates.' },
        { word: 'SSL', translation: 'SSL', example: 'I enable SSL encryption.' },
        { word: 'TLS', translation: 'TLS', example: 'I use TLS for secure connections.' },
        { word: 'VPN', translation: 'VPN', example: 'I connect through VPN for security.' },
        { word: 'proxy', translation: 'прокси', example: 'I use a secure proxy server.' },
        { word: 'intrusion detection', translation: 'обнаружение вторжений', example: 'I deploy intrusion detection systems.' },
        { word: 'monitoring', translation: 'мониторинг', example: 'I monitor security events.' },
        { word: 'log', translation: 'лог, журнал', example: 'I analyze security logs.' },
        { word: 'alert', translation: 'предупреждение', example: 'I receive security alerts.' }
    ],
    
    // Модуль 5: Путешествия и транспорт
    'airports-flights': [
        { word: 'airport', translation: 'аэропорт', example: 'I arrive at the airport two hours early.' },
        { word: 'terminal', translation: 'терминал', example: 'My flight departs from terminal 3.' },
        { word: 'gate', translation: 'выход на посадку', example: 'Boarding starts at gate 12.' },
        { word: 'check-in', translation: 'регистрация', example: 'I do online check-in.' },
        { word: 'boarding pass', translation: 'посадочный талон', example: 'Please show your boarding pass.' },
        { word: 'luggage', translation: 'багаж', example: 'I check my luggage at the counter.' },
        { word: 'baggage claim', translation: 'выдача багажа', example: 'I collect my suitcase at baggage claim.' },
        { word: 'carry-on', translation: 'ручная кладь', example: 'I take a carry-on bag.' },
        { word: 'customs', translation: 'таможня', example: 'I go through customs.' },
        { word: 'immigration', translation: 'иммиграционный контроль', example: 'I pass immigration control.' },
        { word: 'passport', translation: 'паспорт', example: 'Please show your passport.' },
        { word: 'visa', translation: 'виза', example: 'I need a visa for this country.' },
        { word: 'flight', translation: 'рейс', example: 'My flight is delayed.' },
        { word: 'departure', translation: 'вылет, отправление', example: 'The departure time is 10 AM.' },
        { word: 'arrival', translation: 'прибытие', example: 'The arrival time is 3 PM.' },
        { word: 'delay', translation: 'задержка', example: 'There is a two-hour delay.' },
        { word: 'cancel', translation: 'отменять', example: 'They cancelled the flight.' },
        { word: 'boarding', translation: 'посадка', example: 'Boarding starts in 20 minutes.' },
        { word: 'seat', translation: 'место', example: 'My seat is 15A.' },
        { word: 'aisle', translation: 'проход', example: 'I prefer an aisle seat.' },
        { word: 'window', translation: 'окно', example: 'I want a window seat.' },
        { word: 'direct flight', translation: 'прямой рейс', example: 'I book a direct flight.' },
        { word: 'connecting flight', translation: 'рейс с пересадкой', example: 'I have a connecting flight in Paris.' },
        { word: 'layover', translation: 'пересадка', example: 'I have a three-hour layover.' }
    ],
    'accommodation': [
        { word: 'hotel', translation: 'отель', example: 'I book a hotel online.' },
        { word: 'hostel', translation: 'хостел', example: 'I stay at a hostel to save money.' },
        { word: 'apartment', translation: 'квартира', example: 'I rent an apartment for a week.' },
        { word: 'reservation', translation: 'бронирование', example: 'I make a reservation.' },
        { word: 'booking', translation: 'бронирование', example: 'I confirm my booking.' },
        { word: 'reception', translation: 'ресепшн', example: 'I check in at reception.' },
        { word: 'check-in', translation: 'заселение', example: 'Check-in time is 2 PM.' },
        { word: 'check-out', translation: 'выезд', example: 'Check-out time is 11 AM.' },
        { word: 'room', translation: 'номер', example: 'I book a single room.' },
        { word: 'single room', translation: 'одноместный номер', example: 'I need a single room.' },
        { word: 'double room', translation: 'двухместный номер', example: 'We book a double room.' },
        { word: 'suite', translation: 'люкс', example: 'I upgrade to a suite.' },
        { word: 'key', translation: 'ключ', example: 'Here is your room key.' },
        { word: 'key card', translation: 'карта-ключ', example: 'I use a key card to enter.' },
        { word: 'bed', translation: 'кровать', example: 'The bed is very comfortable.' },
        { word: 'bathroom', translation: 'ванная комната', example: 'The bathroom is clean.' },
        { word: 'shower', translation: 'душ', example: 'I take a shower in the morning.' },
        { word: 'towel', translation: 'полотенце', example: 'I need clean towels.' },
        { word: 'Wi-Fi', translation: 'Wi-Fi', example: 'Is there free Wi-Fi?' },
        { word: 'breakfast', translation: 'завтрак', example: 'Breakfast is included.' },
        { word: 'amenities', translation: 'удобства', example: 'The hotel has many amenities.' },
        { word: 'housekeeping', translation: 'уборка номеров', example: 'Housekeeping comes every day.' },
        { word: 'front desk', translation: 'стойка регистрации', example: 'I ask the front desk for help.' },
        { word: 'bill', translation: 'счёт', example: 'Can I see the bill, please?' }
    ],
    'public-transport': [
        { word: 'train', translation: 'поезд', example: 'I take the train to the city.' },
        { word: 'station', translation: 'станция, вокзал', example: 'I wait at the train station.' },
        { word: 'platform', translation: 'платформа', example: 'The train leaves from platform 5.' },
        { word: 'ticket', translation: 'билет', example: 'I buy a ticket online.' },
        { word: 'one-way ticket', translation: 'билет в одну сторону', example: 'I need a one-way ticket.' },
        { word: 'round-trip ticket', translation: 'билет туда-обратно', example: 'I buy a round-trip ticket.' },
        { word: 'fare', translation: 'стоимость проезда', example: 'The fare is 5 dollars.' },
        { word: 'bus', translation: 'автобус', example: 'I take the bus to work.' },
        { word: 'bus stop', translation: 'автобусная остановка', example: 'I wait at the bus stop.' },
        { word: 'subway', translation: 'метро', example: 'The subway is fast.' },
        { word: 'metro', translation: 'метро', example: 'I use the metro every day.' },
        { word: 'line', translation: 'линия', example: 'Take the red line.' },
        { word: 'transfer', translation: 'пересадка', example: 'I transfer at the next station.' },
        { word: 'timetable', translation: 'расписание', example: 'I check the timetable.' },
        { word: 'schedule', translation: 'расписание', example: 'The bus schedule changes on weekends.' },
        { word: 'route', translation: 'маршрут', example: 'What is the best route?' },
        { word: 'stop', translation: 'остановка', example: 'I get off at the next stop.' },
        { word: 'arrive', translation: 'прибывать', example: 'The train arrives at 3 PM.' },
        { word: 'depart', translation: 'отправляться', example: 'The bus departs every 20 minutes.' },
        { word: 'on time', translation: 'вовремя', example: 'The train is on time.' },
        { word: 'late', translation: 'с опозданием', example: 'The bus is 10 minutes late.' },
        { word: 'passenger', translation: 'пассажир', example: 'All passengers must have tickets.' },
        { word: 'conductor', translation: 'кондуктор', example: 'The conductor checks tickets.' },
        { word: 'driver', translation: 'водитель', example: 'I ask the driver for help.' }
    ],
    'taxi-car-rental': [
        { word: 'taxi', translation: 'такси', example: 'I call a taxi.' },
        { word: 'cab', translation: 'такси', example: 'I hail a cab on the street.' },
        { word: 'ride', translation: 'поездка', example: 'The ride costs 20 dollars.' },
        { word: 'driver', translation: 'водитель', example: 'The driver knows the way.' },
        { word: 'fare', translation: 'стоимость поездки', example: 'What is the fare to the airport?' },
        { word: 'meter', translation: 'счётчик', example: 'Please turn on the meter.' },
        { word: 'tip', translation: 'чаевые', example: 'I give a tip to the driver.' },
        { word: 'address', translation: 'адрес', example: 'This is my address.' },
        { word: 'destination', translation: 'пункт назначения', example: 'My destination is the city center.' },
        { word: 'drop off', translation: 'высадить', example: 'Please drop me off here.' },
        { word: 'pick up', translation: 'забрать', example: 'Can you pick me up at 8 AM?' },
        { word: 'car rental', translation: 'прокат автомобилей', example: 'I need a car rental.' },
        { word: 'rent a car', translation: 'арендовать машину', example: 'I want to rent a car.' },
        { word: 'driving license', translation: 'водительские права', example: 'I show my driving license.' },
        { word: 'insurance', translation: 'страховка', example: 'I need full insurance.' },
        { word: 'fuel', translation: 'топливо', example: 'The car has full fuel.' },
        { word: 'gas', translation: 'бензин', example: 'I need to buy gas.' },
        { word: 'gas station', translation: 'заправка', example: 'I stop at a gas station.' },
        { word: 'parking', translation: 'парковка', example: 'Is there free parking?' },
        { word: 'highway', translation: 'шоссе, автострада', example: 'I drive on the highway.' },
        { word: 'traffic', translation: 'дорожное движение', example: 'There is heavy traffic today.' },
        { word: 'accident', translation: 'авария', example: 'There was an accident on the road.' },
        { word: 'speed limit', translation: 'ограничение скорости', example: 'The speed limit is 60 km/h.' },
        { word: 'GPS', translation: 'GPS, навигатор', example: 'I use GPS for navigation.' }
    ],
    'directions-navigation': [
        { word: 'direction', translation: 'направление', example: 'Can you show me the direction?' },
        { word: 'left', translation: 'налево', example: 'Turn left at the traffic light.' },
        { word: 'right', translation: 'направо', example: 'Turn right after the bank.' },
        { word: 'straight', translation: 'прямо', example: 'Go straight for two blocks.' },
        { word: 'turn', translation: 'поворачивать', example: 'Turn at the corner.' },
        { word: 'corner', translation: 'угол', example: 'The shop is on the corner.' },
        { word: 'block', translation: 'квартал', example: 'Walk three blocks.' },
        { word: 'street', translation: 'улица', example: 'I live on Main Street.' },
        { word: 'road', translation: 'дорога', example: 'This road goes to the center.' },
        { word: 'avenue', translation: 'проспект', example: 'The hotel is on Fifth Avenue.' },
        { word: 'intersection', translation: 'перекрёсток', example: 'Turn left at the intersection.' },
        { word: 'traffic light', translation: 'светофор', example: 'Stop at the traffic light.' },
        { word: 'crosswalk', translation: 'пешеходный переход', example: 'Use the crosswalk to cross.' },
        { word: 'sidewalk', translation: 'тротуар', example: 'Walk on the sidewalk.' },
        { word: 'bridge', translation: 'мост', example: 'Cross the bridge.' },
        { word: 'map', translation: 'карта', example: 'I look at the map.' },
        { word: 'location', translation: 'местоположение', example: 'What is your location?' },
        { word: 'nearby', translation: 'рядом, поблизости', example: 'Is there a bank nearby?' },
        { word: 'far', translation: 'далеко', example: 'Is it far from here?' },
        { word: 'close', translation: 'близко', example: 'The station is very close.' },
        { word: 'distance', translation: 'расстояние', example: 'What is the distance to the airport?' },
        { word: 'north', translation: 'север', example: 'Go north.' },
        { word: 'south', translation: 'юг', example: 'The city is to the south.' },
        { word: 'east', translation: 'восток', example: 'Drive east.' },
        { word: 'west', translation: 'запад', example: 'The ocean is to the west.' }
    ],
    'emergencies-problems': [
        { word: 'help', translation: 'помощь', example: 'I need help!' },
        { word: 'emergency', translation: 'чрезвычайная ситуация', example: 'This is an emergency.' },
        { word: 'police', translation: 'полиция', example: 'Call the police!' },
        { word: 'ambulance', translation: 'скорая помощь', example: 'Call an ambulance!' },
        { word: 'fire department', translation: 'пожарная служба', example: 'There is a fire! Call the fire department!' },
        { word: 'accident', translation: 'несчастный случай', example: 'There was an accident.' },
        { word: 'problem', translation: 'проблема', example: 'I have a problem.' },
        { word: 'lost', translation: 'потерянный', example: 'I am lost.' },
        { word: 'stolen', translation: 'украденный', example: 'My wallet was stolen.' },
        { word: 'robbery', translation: 'ограбление', example: 'I want to report a robbery.' },
        { word: 'report', translation: 'сообщать, докладывать', example: 'I need to report a crime.' },
        { word: 'hospital', translation: 'больница', example: 'Where is the nearest hospital?' },
        { word: 'doctor', translation: 'врач', example: 'I need to see a doctor.' },
        { word: 'injured', translation: 'раненый', example: 'Someone is injured.' },
        { word: 'sick', translation: 'больной', example: 'I feel sick.' },
        { word: 'medicine', translation: 'лекарство', example: 'I need medicine.' },
        { word: 'pharmacy', translation: 'аптека', example: 'Where is the pharmacy?' },
        { word: 'insurance', translation: 'страховка', example: 'Do you accept my insurance?' },
        { word: 'embassy', translation: 'посольство', example: 'I need to contact my embassy.' },
        { word: 'consulate', translation: 'консульство', example: 'Where is the consulate?' },
        { word: 'document', translation: 'документ', example: 'I lost my documents.' },
        { word: 'replace', translation: 'заменить', example: 'I need to replace my passport.' },
        { word: 'safe', translation: 'безопасный', example: 'Is this area safe?' },
        { word: 'danger', translation: 'опасность', example: 'There is danger ahead.' }
    ],
    
    // Модуль 6: Покупки и сервисы
    'shopping': [
        { word: 'shop', translation: 'магазин', example: 'I go to the shop to buy groceries.' },
        { word: 'store', translation: 'магазин', example: 'This store has good prices.' },
        { word: 'supermarket', translation: 'супермаркет', example: 'I shop at the supermarket every week.' },
        { word: 'mall', translation: 'торговый центр', example: 'The mall is very large.' },
        { word: 'buy', translation: 'покупать', example: 'I want to buy a new phone.' },
        { word: 'sell', translation: 'продавать', example: 'They sell fresh vegetables.' },
        { word: 'price', translation: 'цена', example: 'What is the price of this item?' },
        { word: 'cost', translation: 'стоить', example: 'How much does it cost?' },
        { word: 'expensive', translation: 'дорогой', example: 'This watch is very expensive.' },
        { word: 'cheap', translation: 'дешёвый', example: 'I found a cheap flight.' },
        { word: 'discount', translation: 'скидка', example: 'There is a 20% discount today.' },
        { word: 'sale', translation: 'распродажа', example: 'Everything is on sale.' },
        { word: 'cash', translation: 'наличные', example: 'Do you accept cash?' },
        { word: 'card', translation: 'карта', example: 'I pay with a credit card.' },
        { word: 'receipt', translation: 'чек', example: 'Can I have a receipt, please?' },
        { word: 'change', translation: 'сдача', example: 'Keep the change.' },
        { word: 'size', translation: 'размер', example: 'What size do you need?' },
        { word: 'try on', translation: 'примерять', example: 'Can I try this on?' },
        { word: 'fit', translation: 'подходить по размеру', example: 'This shirt fits perfectly.' },
        { word: 'return', translation: 'возвращать', example: 'Can I return this item?' },
        { word: 'refund', translation: 'возврат денег', example: 'I want a refund.' }
    ],
    'restaurants-food': [
        { word: 'restaurant', translation: 'ресторан', example: 'We have dinner at a restaurant.' },
        { word: 'cafe', translation: 'кафе', example: 'I meet friends at a cafe.' },
        { word: 'menu', translation: 'меню', example: 'Can I see the menu, please?' },
        { word: 'order', translation: 'заказывать', example: 'I order pizza and salad.' },
        { word: 'waiter', translation: 'официант', example: 'The waiter brings our food.' },
        { word: 'waitress', translation: 'официантка', example: 'The waitress is very friendly.' },
        { word: 'appetizer', translation: 'закуска', example: 'I order an appetizer first.' },
        { word: 'main course', translation: 'основное блюдо', example: 'What is your main course?' },
        { word: 'dessert', translation: 'десерт', example: 'I want chocolate cake for dessert.' },
        { word: 'bill', translation: 'счёт', example: 'Can I have the bill, please?' },
        { word: 'tip', translation: 'чаевые', example: 'I leave a 15% tip.' },
        { word: 'reservation', translation: 'бронирование', example: 'I make a reservation for two.' },
        { word: 'table', translation: 'стол', example: 'A table for two, please.' },
        { word: 'spicy', translation: 'острый', example: 'This food is too spicy for me.' },
        { word: 'sweet', translation: 'сладкий', example: 'I like sweet desserts.' },
        { word: 'salty', translation: 'солёный', example: 'This soup is too salty.' },
        { word: 'delicious', translation: 'вкусный', example: 'The food is delicious!' },
        { word: 'taste', translation: 'вкус', example: 'This tastes great!' },
        { word: 'hungry', translation: 'голодный', example: 'I am very hungry.' },
        { word: 'thirsty', translation: 'жаждущий', example: 'I am thirsty. Can I have water?' }
    ],
    'services': [
        { word: 'service', translation: 'услуга', example: 'The service here is excellent.' },
        { word: 'haircut', translation: 'стрижка', example: 'I need a haircut.' },
        { word: 'hairdresser', translation: 'парикмахер', example: 'I visit the hairdresser monthly.' },
        { word: 'dry cleaning', translation: 'химчистка', example: 'I take my suit to dry cleaning.' },
        { word: 'laundry', translation: 'прачечная', example: 'I do laundry on weekends.' },
        { word: 'repair', translation: 'ремонт', example: 'I need to repair my phone.' },
        { word: 'fix', translation: 'чинить', example: 'Can you fix this computer?' },
        { word: 'post office', translation: 'почта', example: 'I send a package at the post office.' },
        { word: 'mail', translation: 'почта, отправлять', example: 'I mail a letter to my friend.' },
        { word: 'package', translation: 'посылка', example: 'I receive a package today.' },
        { word: 'delivery', translation: 'доставка', example: 'Is home delivery available?' },
        { word: 'appointment', translation: 'встреча, назначение', example: 'I make an appointment with the doctor.' },
        { word: 'available', translation: 'доступный', example: 'Are you available tomorrow?' },
        { word: 'book', translation: 'бронировать', example: 'I book a table for tonight.' },
        { word: 'cancel', translation: 'отменять', example: 'I need to cancel my appointment.' }
    ],
    'money-banking': [
        { word: 'bank', translation: 'банк', example: 'I go to the bank to withdraw money.' },
        { word: 'ATM', translation: 'банкомат', example: 'I withdraw cash from the ATM.' },
        { word: 'account', translation: 'счёт', example: 'I open a bank account.' },
        { word: 'balance', translation: 'баланс', example: 'What is my account balance?' },
        { word: 'deposit', translation: 'вклад, депозит', example: 'I deposit money into my account.' },
        { word: 'withdraw', translation: 'снимать', example: 'I withdraw 100 dollars.' },
        { word: 'credit card', translation: 'кредитная карта', example: 'I pay with a credit card.' },
        { word: 'debit card', translation: 'дебетовая карта', example: 'I use my debit card for purchases.' },
        { word: 'PIN', translation: 'PIN-код', example: 'Enter your PIN, please.' },
        { word: 'currency', translation: 'валюта', example: 'What currency do you accept?' },
        { word: 'exchange rate', translation: 'курс обмена', example: 'What is the exchange rate today?' },
        { word: 'exchange', translation: 'обменивать', example: 'I exchange dollars for euros.' },
        { word: 'loan', translation: 'заём', example: 'I apply for a loan.' },
        { word: 'interest', translation: 'процент', example: 'What is the interest rate?' },
        { word: 'payment', translation: 'платёж', example: 'I make a monthly payment.' },
        { word: 'bill', translation: 'счёт, квитанция', example: 'I pay my electricity bill.' },
        { word: 'invoice', translation: 'счёт-фактура', example: 'I receive an invoice for services.' },
        { word: 'owe', translation: 'быть должным', example: 'I owe 50 dollars.' },
        { word: 'debt', translation: 'долг', example: 'I have no debt.' },
        { word: 'save', translation: 'копить', example: 'I save money every month.' }
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
    const isModule3 = currentFile.includes('03-work-professional');
    const isModule4 = currentFile.includes('04-technologies-infrastructure');
    const isModule5 = currentFile.includes('05-travel-transport');
    const isModule6 = currentFile.includes('06-shopping-services');
    const isModule7 = currentFile.includes('07-housing-utilities');
    const isModule8 = currentFile.includes('08-health-emergencies');
    const isModule9 = currentFile.includes('09-professional-content');
    const isModule10 = currentFile.includes('10-culture-etiquette');
    
    // Категории для модулей
    const module10Categories = []; // Будет добавлено позже
    const module9Categories = []; // Будет добавлено позже
    const module8Categories = []; // Будет добавлено позже
    const module7Categories = []; // Будет добавлено позже
    const module6Categories = ['shopping', 'restaurants-food', 'services', 'money-banking'];
    const module5Categories = ['airports-flights', 'accommodation', 'public-transport', 'taxi-car-rental', 'directions-navigation', 'emergencies-problems'];
    const module4Categories = ['hardware', 'software', 'networks-internet', 'databases', 'cloud-technologies', 'cybersecurity'];
    const module3Categories = ['office-workplace', 'work-processes', 'work-communication', 'it-professions-advanced', 'career-development', 'business-trips'];
    const module2Categories = ['family-relationships', 'home-interior', 'city-infrastructure', 'food-drinks', 'daily-routine', 'hobbies-interests'];
    const module1Categories = ['greetings', 'names-countries', 'professions', 'basic-nouns', 'basic-verbs', 'questions-pronouns', 'useful-phrases', 'numbers', 'it-professions', 'it-terms', 'travel'];
    
    if (category === 'all') {
        // Загружаем все карточки из соответствующих категорий модуля
        let categoriesToUse;
        if (isModule10) {
            categoriesToUse = module10Categories;
        } else if (isModule9) {
            categoriesToUse = module9Categories;
        } else if (isModule8) {
            categoriesToUse = module8Categories;
        } else if (isModule7) {
            categoriesToUse = module7Categories;
        } else if (isModule6) {
            categoriesToUse = module6Categories;
        } else if (isModule5) {
            categoriesToUse = module5Categories;
        } else if (isModule4) {
            categoriesToUse = module4Categories;
        } else if (isModule3) {
            categoriesToUse = module3Categories;
        } else if (isModule2) {
            categoriesToUse = module2Categories;
        } else {
            categoriesToUse = module1Categories;
        }
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
    
    // Если карточка была перевернута, сначала переворачиваем её обратно перед обновлением содержимого
    // Это предотвращает показ старого содержимого при переходе к следующей карточке
    if (flashcard && (flashcard.classList.contains('flipped') || isFlipped)) {
        flashcard.classList.remove('flipped');
        isFlipped = false;
    }
    
    // Обновляем содержимое карточки
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

// ===== Переключение темы и цветовых схем =====
(function themeAndColorSwitcher() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const colorSchemeButtons = document.querySelectorAll('.color-scheme-btn');
    
    // Загружаем сохраненные настройки
    const savedTheme = localStorage.getItem('english-course-theme');
    const savedColorScheme = localStorage.getItem('english-course-color-scheme');
    
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
            localStorage.setItem('english-course-theme', theme);
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
            localStorage.setItem('english-course-color-scheme', colorScheme);
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
            localStorage.setItem('english-course-theme', theme);
        }
        setTimeout(syncMobileTheme, 100);
    });
    
    // Синхронизация цветовой схемы с десктопными кнопками
    function syncMobileColorScheme() {
        const activeColor = localStorage.getItem('english-course-color-scheme');
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
