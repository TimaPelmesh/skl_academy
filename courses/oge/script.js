// Переключение боковой панели
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
    const isOpening = !sidebar.classList.contains('active');
    menuToggle.classList.toggle('active');
    sidebar.classList.toggle('active');
    content.classList.toggle('sidebar-active');
    if (overlay) overlay.classList.toggle('active', isOpening);
    document.body.classList.toggle('no-scroll', isOpening && window.innerWidth <= 991);
});

// Закрытие сайдбара по клику на оверлей
if (overlay) {
    overlay.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        sidebar.classList.remove('active');
        content.classList.remove('sidebar-active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
}

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

// Жёсткое удаление всех эмодзи/значков из текста по всему документу (кроме кода/скриптов)
(function stripEmojisFromContent() {
    try {
        const emojiRegex = /[\p{Extended_Pictographic}\uFE0F\u200D]/gu;
        const SKIP_TAGS = new Set(['SCRIPT','STYLE','CODE','PRE','TEXTAREA','SVG']);

        function hasSkippedAncestor(node) {
            let p = node.parentNode;
            while (p) {
                if (p.nodeType === 1 && SKIP_TAGS.has(p.tagName)) return true;
                p = p.parentNode;
            }
            return false;
        }

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
            acceptNode(node) {
                if (!node.nodeValue || !node.nodeValue.match(emojiRegex)) return NodeFilter.FILTER_REJECT;
                if (hasSkippedAncestor(node)) return NodeFilter.FILTER_REJECT;
                return NodeFilter.FILTER_ACCEPT;
            }
        });

        const toClean = [];
        let n = walker.nextNode();
        while (n) { toClean.push(n); n = walker.nextNode(); }
        toClean.forEach(t => {
            t.nodeValue = t.nodeValue.replace(emojiRegex, '').replace(/\s{2,}/g, ' ');
        });
    } catch (e) { /* noop */ }
})();

// Унификация вывода: "Верно/Неверно" для всех мини‑проверок и квизов
(function unifyCheckOutputs() {
    // Помощник: вывести Верно/Неверно в ближайший result
    function setResult(btn, ok) {
        const root = btn.closest('.practice') || btn.closest('.topic-section') || document;
        // Ищем локальный result рядом с кнопкой
        const local = root.querySelector('[id$="-result"]');
        if (local) {
            local.textContent = ok ? 'Верно' : 'Неверно';
            local.style.color = ok ? '#28a745' : '#dc3545';
        }
    }

    // Оборачиваем существующие обработчики квизов в统一 формат
    function wrapQuizCheck(buttonId, answersMap, quizPrefix, resultId) {
        const btn = document.getElementById(buttonId);
        if (!btn) return;
        btn.addEventListener('click', (e) => {
            e.stopImmediatePropagation?.();
            let ok = true;
            for (const q in answersMap) {
                const expected = answersMap[q];
                const checked = document.querySelector(`input[name="${q}"]:checked`);
                if (!checked || checked.value !== expected) { ok = false; break; }
            }
            const resEl = document.getElementById(resultId) || btn.parentElement.querySelector(`#${resultId}`);
            if (resEl) {
                resEl.textContent = ok ? 'Верно' : 'Неверно';
                resEl.style.color = ok ? '#28a745' : '#dc3545';
            } else {
                setResult(btn, ok);
            }
        }, { capture: true, once: false });
    }

    // Переинициализация известных квизов с кратким выводом
    wrapQuizCheck('quiz13-check', { 'quiz13-q1': 'b', 'quiz13-q2': 'b' }, 'quiz-13', 'quiz13-result');
    wrapQuizCheck('quiz14-check', { 'quiz14-q1': 'b', 'quiz14-q2': 'b' }, 'quiz-14', 'quiz14-result');
    wrapQuizCheck('quiz15-check', { 'quiz15-q1': 'b', 'quiz15-q2': 'c' }, 'quiz-15', 'quiz15-result');
    wrapQuizCheck('quiz16-check', { 'quiz16-q1': 'b', 'quiz16-q2': 'a' }, 'quiz-16', 'quiz16-result');
    wrapQuizCheck('intro-check', { 'intro-q1': 'c', 'intro-q2': 'b' }, 'intro-quiz', 'intro-result');
    wrapQuizCheck('intro2-check', { 'intro2-q1': 'b', 'intro2-q2': 'b' }, 'intro-quiz-part2', 'intro2-result');
})();

// Тоггл карточки контакта (инициализация после загрузки DOM)
(function contactFabToggle() {
    function init() {
        const fab = document.getElementById('contactFab');
        const card = document.getElementById('contactCard');
        if (!fab || !card) return; // элементы отсутствуют на этой странице
        function toggle(force) {
            const willOpen = typeof force === 'boolean' ? force : !card.classList.contains('active');
            card.classList.toggle('active', willOpen);
            card.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
            // Переключаем символ на кнопке: i ↔ ×
            fab.textContent = willOpen ? '×' : 'i';
            fab.setAttribute('aria-label', willOpen ? 'Закрыть контакты' : 'Открыть контакты');
            fab.setAttribute('title', willOpen ? 'Закрыть' : 'Есть вопросы?');
        }
        fab.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggle();
        });
        document.addEventListener('click', (e) => {
            if (!card.classList.contains('active')) return;
            const el = e.target;
            if (el === card || el === fab || card.contains(el)) return;
            toggle(false);
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();

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
                if (overlay) overlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
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

// Мини‑практика: Задание 1 — перевод битов в байты
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('q1-bytes-input');
    const btn = document.getElementById('q1-bytes-check');
    const res = document.getElementById('q1-bytes-result');
    if (input && btn && res) {
        btn.addEventListener('click', () => {
            const val = Number(input.value);
            if (!Number.isFinite(val)) {
                res.textContent = 'Введите число';
                res.style.color = '#f87171';
                return;
            }
            const answer = 2048 / 8;
            if (val === answer) {
                res.textContent = 'Верно! 2048 бит = 256 байт.';
                res.style.color = '#34d399';
            } else {
                res.textContent = 'Почти! Подумай про 8 бит в 1 байте.';
                res.style.color = '#fbbf24';
            }
        });
    }
});

// Мини‑практика: Задание 13 — принципы оформления
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('q13-check');
    const res = document.getElementById('q13-result');
    if (btn && res) {
        btn.addEventListener('click', () => {
            const checked = document.querySelector('input[name="q13"]:checked');
            if (!checked) {
                res.textContent = 'Выбери вариант ответа';
                res.style.color = '#f87171';
                return;
            }
            if (checked.value === 'b') {
                res.textContent = 'Отлично! Единый стиль и правило 6×6 — best practice.';
                res.style.color = '#34d399';
            } else {
                res.textContent = 'Не совсем. Подумай про читабельность и минимализм.';
                res.style.color = '#fbbf24';
            }
        });
    }
});

// Введение: тренировочный тест
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('intro-check');
    const res = document.getElementById('intro-result');
    if (btn && res) {
        btn.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="intro-q1"]:checked');
            const q2 = document.querySelector('input[name="intro-q2"]:checked');
            
            if (!q1 || !q2) {
                res.textContent = 'Ответьте на все вопросы';
                res.style.color = '#f87171';
                return;
            }
            
            let correct = 0;
            if (q1.value === 'c') correct++;
            if (q2.value === 'b') correct++;
            
            if (correct === 2) {
                res.textContent = 'Отлично! Вы готовы к изучению ОГЭ.';
                res.style.color = '#34d399';
            } else if (correct === 1) {
                res.textContent = 'Хорошо! Один правильный ответ. Продолжайте изучение.';
                res.style.color = '#fbbf24';
            } else {
                res.textContent = 'Не переживайте! Изучите материал и попробуйте снова.';
                res.style.color = '#f87171';
            }
        });
    }
});

// Калькулятор единиц измерения
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('calc-input');
    const from = document.getElementById('calc-from');
    const to = document.getElementById('calc-to');
    const btn = document.getElementById('calc-convert');
    const res = document.getElementById('calc-result');
    
    if (input && from && to && btn && res) {
        btn.addEventListener('click', () => {
            const value = parseFloat(input.value);
            if (isNaN(value)) {
                res.textContent = 'Введите корректное число';
                res.style.color = '#f87171';
                return;
            }
            
            // Конвертируем в биты
            let bits = value;
            switch (from.value) {
                case 'bit': bits = value; break;
                case 'byte': bits = value * 8; break;
                case 'kb': bits = value * 1024 * 8; break;
                case 'mb': bits = value * 1024 * 1024 * 8; break;
                case 'gb': bits = value * 1024 * 1024 * 1024 * 8; break;
            }
            
            // Конвертируем из битов в нужную единицу
            let result = bits;
            switch (to.value) {
                case 'bit': result = bits; break;
                case 'byte': result = bits / 8; break;
                case 'kb': result = bits / (1024 * 8); break;
                case 'mb': result = bits / (1024 * 1024 * 8); break;
                case 'gb': result = bits / (1024 * 1024 * 1024 * 8); break;
            }
            
            res.textContent = `${value} ${from.options[from.selectedIndex].text} = ${result.toFixed(2)} ${to.options[to.selectedIndex].text}`;
            res.style.color = '#28a745';
        });
    }
});

// Калькулятор систем счисления
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('num-input');
    const from = document.getElementById('num-from');
    const to = document.getElementById('num-to');
    const btn = document.getElementById('num-convert');
    const res = document.getElementById('num-result');
    
    if (input && from && to && btn && res) {
        btn.addEventListener('click', () => {
            const value = input.value.trim();
            if (!value) {
                res.textContent = 'Введите число';
                res.style.color = '#f87171';
                return;
            }
            
            try {
                // Конвертируем в десятичную
                let decimal = parseInt(value, parseInt(from.value));
                if (isNaN(decimal)) {
                    res.textContent = 'Некорректное число для данной системы счисления';
                    res.style.color = '#f87171';
                    return;
                }
                
                // Конвертируем в нужную систему
                let result = decimal.toString(parseInt(to.value));
                
                // Для шестнадцатеричной системы делаем заглавные буквы
                if (to.value === '16') {
                    result = result.toUpperCase();
                }
                
                res.textContent = `${value} (${from.value}) = ${result} (${to.value})`;
                res.style.color = '#28a745';
            } catch (e) {
                res.textContent = 'Ошибка при конвертации';
                res.style.color = '#f87171';
            }
        });
    }
});

// Калькулятор логических выражений
document.addEventListener('DOMContentLoaded', () => {
    const expr = document.getElementById('logic-expr');
    const a = document.getElementById('logic-a');
    const b = document.getElementById('logic-b');
    const c = document.getElementById('logic-c');
    const btn = document.getElementById('logic-calc');
    const res = document.getElementById('logic-result');
    
    if (expr && a && b && c && btn && res) {
        btn.addEventListener('click', () => {
            const expression = expr.value.trim();
            if (!expression) {
                res.textContent = 'Введите выражение';
                res.style.color = '#f87171';
                return;
            }
            
            try {
                // Заменяем переменные на значения
                let evalExpr = expression
                    .replace(/A/g, a.checked ? '1' : '0')
                    .replace(/B/g, b.checked ? '1' : '0')
                    .replace(/C/g, c.checked ? '1' : '0')
                    .replace(/∧/g, '&&')
                    .replace(/∨/g, '||')
                    .replace(/¬/g, '!')
                    .replace(/!/g, '!');
                
                // Простая проверка безопасности
                if (!/^[01&|!() ]+$/.test(evalExpr)) {
                    res.textContent = 'Некорректное выражение';
                    res.style.color = '#f87171';
                    return;
                }
                
                const result = eval(evalExpr) ? 1 : 0;
                res.textContent = `Результат: ${result}`;
                res.style.color = '#28a745';
            } catch (e) {
                res.textContent = 'Ошибка в выражении';
                res.style.color = '#f87171';
            }
        });
    }
});

// Задачи по заданию 1
document.addEventListener('DOMContentLoaded', () => {
    // Задача 1.1
    const q1_1_input = document.getElementById('q1-1-input');
    const q1_1_btn = document.getElementById('q1-1-check');
    const q1_1_res = document.getElementById('q1-1-result');
    if (q1_1_input && q1_1_btn && q1_1_res) {
        q1_1_btn.addEventListener('click', () => {
            const val = Number(q1_1_input.value);
            if (val === 256) {
                q1_1_res.textContent = 'Правильно!';
                q1_1_res.style.color = '#34d399';
            } else {
                q1_1_res.textContent = 'Неверно. 2048 ÷ 8 = 256';
                q1_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 1.2
    const q1_2_input = document.getElementById('q1-2-input');
    const q1_2_btn = document.getElementById('q1-2-check');
    const q1_2_res = document.getElementById('q1-2-result');
    if (q1_2_input && q1_2_btn && q1_2_res) {
        q1_2_btn.addEventListener('click', () => {
            const val = Number(q1_2_input.value);
            if (val === 1000) {
                q1_2_res.textContent = 'Правильно!';
                q1_2_res.style.color = '#34d399';
            } else {
                q1_2_res.textContent = 'Неверно. 500 × 16 ÷ 8 = 1000';
                q1_2_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 1.3
    const q1_3_input = document.getElementById('q1-3-input');
    const q1_3_btn = document.getElementById('q1-3-check');
    const q1_3_res = document.getElementById('q1-3-result');
    if (q1_3_input && q1_3_btn && q1_3_res) {
        q1_3_btn.addEventListener('click', () => {
            const val = Number(q1_3_input.value);
            if (val === 20) {
                q1_3_res.textContent = 'Правильно!';
                q1_3_res.style.color = '#34d399';
            } else {
                q1_3_res.textContent = 'Неверно. 625 × 1024 × 8 ÷ 256000 = 20';
                q1_3_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 1.4
    const q1_4_input = document.getElementById('q1-4-input');
    const q1_4_btn = document.getElementById('q1-4-check');
    const q1_4_res = document.getElementById('q1-4-result');
    if (q1_4_input && q1_4_btn && q1_4_res) {
        q1_4_btn.addEventListener('click', () => {
            const val = Number(q1_4_input.value);
            if (val === 128) {
                q1_4_res.textContent = 'Правильно!';
                q1_4_res.style.color = '#34d399';
            } else {
                q1_4_res.textContent = 'Неверно. 2⁷ = 128';
                q1_4_res.style.color = '#f87171';
            }
        });
    }
});

// Задачи по заданию 2
document.addEventListener('DOMContentLoaded', () => {
    // Задача 2.1
    const q2_1_input = document.getElementById('q2-1-input');
    const q2_1_btn = document.getElementById('q2-1-check');
    const q2_1_res = document.getElementById('q2-1-result');
    if (q2_1_input && q2_1_btn && q2_1_res) {
        q2_1_btn.addEventListener('click', () => {
            const val = Number(q2_1_input.value);
            if (val === 11) {
                q2_1_res.textContent = 'Правильно!';
                q2_1_res.style.color = '#34d399';
            } else {
                q2_1_res.textContent = 'Неверно. 1×8 + 0×4 + 1×2 + 1×1 = 11';
                q2_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 2.2
    const q2_2_input = document.getElementById('q2-2-input');
    const q2_2_btn = document.getElementById('q2-2-check');
    const q2_2_res = document.getElementById('q2-2-result');
    if (q2_2_input && q2_2_btn && q2_2_res) {
        q2_2_btn.addEventListener('click', () => {
            const val = Number(q2_2_input.value);
            if (val === 64) {
                q2_2_res.textContent = 'Правильно!';
                q2_2_res.style.color = '#34d399';
            } else {
                q2_2_res.textContent = 'Неверно. 2⁶ = 64';
                q2_2_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 2.3
    const q2_3_input = document.getElementById('q2-3-input');
    const q2_3_btn = document.getElementById('q2-3-check');
    const q2_3_res = document.getElementById('q2-3-result');
    if (q2_3_input && q2_3_btn && q2_3_res) {
        q2_3_btn.addEventListener('click', () => {
            const val = Number(q2_3_input.value);
            if (val === 3) {
                q2_3_res.textContent = 'Правильно!';
                q2_3_res.style.color = '#34d399';
            } else {
                q2_3_res.textContent = 'Неверно. 3 × 8 ÷ 8 = 3';
                q2_3_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 2.4
    const q2_4_input = document.getElementById('q2-4-input');
    const q2_4_btn = document.getElementById('q2-4-check');
    const q2_4_res = document.getElementById('q2-4-result');
    if (q2_4_input && q2_4_btn && q2_4_res) {
        q2_4_btn.addEventListener('click', () => {
            const val = q2_4_input.value.trim();
            if (val === '11011000') {
                q2_4_res.textContent = 'Правильно!';
                q2_4_res.style.color = '#34d399';
            } else {
                q2_4_res.textContent = 'Неверно. Г→11, Б→01, В→10, А→00';
                q2_4_res.style.color = '#f87171';
            }
        });
    }
});

// Задачи по заданию 3
document.addEventListener('DOMContentLoaded', () => {
    // Задача 3.1
    const q3_1_input = document.getElementById('q3-1-input');
    const q3_1_btn = document.getElementById('q3-1-check');
    const q3_1_res = document.getElementById('q3-1-result');
    if (q3_1_input && q3_1_btn && q3_1_res) {
        q3_1_btn.addEventListener('click', () => {
            const val = Number(q3_1_input.value);
            if (val === 0) {
                q3_1_res.textContent = 'Правильно!';
                q3_1_res.style.color = '#34d399';
            } else {
                q3_1_res.textContent = 'Неверно. 1 ∧ 0 = 0';
                q3_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 3.2
    const q3_2_input = document.getElementById('q3-2-input');
    const q3_2_btn = document.getElementById('q3-2-check');
    const q3_2_res = document.getElementById('q3-2-result');
    if (q3_2_input && q3_2_btn && q3_2_res) {
        q3_2_btn.addEventListener('click', () => {
            const val = Number(q3_2_input.value);
            if (val === 1) {
                q3_2_res.textContent = 'Правильно!';
                q3_2_res.style.color = '#34d399';
            } else {
                q3_2_res.textContent = 'Неверно. (1 ∨ 0) ∧ 1 = 1';
                q3_2_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 3.3
    const q3_3_input = document.getElementById('q3-3-input');
    const q3_3_btn = document.getElementById('q3-3-check');
    const q3_3_res = document.getElementById('q3-3-result');
    if (q3_3_input && q3_3_btn && q3_3_res) {
        q3_3_btn.addEventListener('click', () => {
            const val = Number(q3_3_input.value);
            if (val === 1) {
                q3_3_res.textContent = 'Правильно!';
                q3_3_res.style.color = '#34d399';
            } else {
                q3_3_res.textContent = 'Неверно. 0 → 1 = 1';
                q3_3_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 3.4
    const q3_4_input = document.getElementById('q3-4-input');
    const q3_4_btn = document.getElementById('q3-4-check');
    const q3_4_res = document.getElementById('q3-4-result');
    if (q3_4_input && q3_4_btn && q3_4_res) {
        q3_4_btn.addEventListener('click', () => {
            const val = Number(q3_4_input.value);
            if (val === 0) {
                q3_4_res.textContent = 'Правильно!';
                q3_4_res.style.color = '#34d399';
            } else {
                q3_4_res.textContent = 'Неверно. (1 ∧ 0) ∨ (¬1 ∧ 1) = 0';
                q3_4_res.style.color = '#f87171';
            }
        });
    }
});

// Задачи по заданию 4
document.addEventListener('DOMContentLoaded', () => {
    // Задача 4.1
    const q4_1_input = document.getElementById('q4-1-input');
    const q4_1_btn = document.getElementById('q4-1-check');
    const q4_1_res = document.getElementById('q4-1-result');
    if (q4_1_input && q4_1_btn && q4_1_res) {
        q4_1_btn.addEventListener('click', () => {
            const val = Number(q4_1_input.value);
            if (val === 2) {
                q4_1_res.textContent = 'Правильно!';
                q4_1_res.style.color = '#34d399';
            } else {
                q4_1_res.textContent = 'Неверно. Toyota и Audi красные';
                q4_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 4.2
    const q4_2_input = document.getElementById('q4-2-input');
    const q4_2_btn = document.getElementById('q4-2-check');
    const q4_2_res = document.getElementById('q4-2-result');
    if (q4_2_input && q4_2_btn && q4_2_res) {
        q4_2_btn.addEventListener('click', () => {
            const val = q4_2_input.value.trim().toUpperCase();
            if (val === 'B') {
                q4_2_res.textContent = 'Правильно!';
                q4_2_res.style.color = '#34d399';
            } else {
                q4_2_res.textContent = 'Неверно. A → B → C';
                q4_2_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 4.3
    const q4_3_input = document.getElementById('q4-3-input');
    const q4_3_btn = document.getElementById('q4-3-check');
    const q4_3_res = document.getElementById('q4-3-result');
    if (q4_3_input && q4_3_btn && q4_3_res) {
        q4_3_btn.addEventListener('click', () => {
            const val = q4_3_input.value.trim();
            if (val === 'нет решения' || val === 'не существует' || val === 'нет') {
                q4_3_res.textContent = 'Правильно!';
                q4_3_res.style.color = '#34d399';
            } else {
                q4_3_res.textContent = 'Неверно. Такого X не существует';
                q4_3_res.style.color = '#f87171';
            }
        });
    }
});

// Задачи по заданию 5
document.addEventListener('DOMContentLoaded', () => {
    // Задача 5.1
    const q5_1_input = document.getElementById('q5-1-input');
    const q5_1_btn = document.getElementById('q5-1-check');
    const q5_1_res = document.getElementById('q5-1-result');
    if (q5_1_input && q5_1_btn && q5_1_res) {
        q5_1_btn.addEventListener('click', () => {
            const val = q5_1_input.value.trim();
            if (val === '(3,3)' || val === '3,3' || val === '3 3') {
                q5_1_res.textContent = 'Правильно!';
                q5_1_res.style.color = '#34d399';
            } else {
                q5_1_res.textContent = 'Неверно. (2,3)→(2,4)→(3,4)→(3,3)';
                q5_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 5.2
    const q5_2_input = document.getElementById('q5-2-input');
    const q5_2_btn = document.getElementById('q5-2-check');
    const q5_2_res = document.getElementById('q5-2-result');
    if (q5_2_input && q5_2_btn && q5_2_res) {
        q5_2_btn.addEventListener('click', () => {
            const val = q5_2_input.value.trim();
            if (val === '(3,2)' || val === '3,2' || val === '3 2') {
                q5_2_res.textContent = 'Правильно!';
                q5_2_res.style.color = '#34d399';
            } else {
                q5_2_res.textContent = 'Неверно. (0,0)→(3,0)→(3,2)';
                q5_2_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 5.3
    const q5_3_input = document.getElementById('q5-3-input');
    const q5_3_btn = document.getElementById('q5-3-check');
    const q5_3_res = document.getElementById('q5-3-result');
    if (q5_3_input && q5_3_btn && q5_3_res) {
        q5_3_btn.addEventListener('click', () => {
            const val = q5_3_input.value.trim();
            if (val === '1') {
                q5_3_res.textContent = 'Правильно!';
                q5_3_res.style.color = '#34d399';
            } else {
                q5_3_res.textContent = 'Неверно. 1 [1] 0 0 1';
                q5_3_res.style.color = '#f87171';
            }
        });
    }
});

// Квизы
document.addEventListener('DOMContentLoaded', () => {
    // Квиз 1
    const quiz1_btn = document.getElementById('quiz1-check');
    const quiz1_res = document.getElementById('quiz1-result');
    if (quiz1_btn && quiz1_res) {
        quiz1_btn.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="quiz1-q1"]:checked');
            const q2 = document.querySelector('input[name="quiz1-q2"]:checked');
            
            if (!q1 || !q2) {
                quiz1_res.textContent = 'Ответьте на все вопросы';
                quiz1_res.style.color = '#f87171';
                return;
            }
            
            let correct = 0;
            if (q1.value === 'b') correct++;
            if (q2.value === 'c') correct++;
            
            quiz1_res.textContent = `Правильно: ${correct}/2`;
            quiz1_res.style.color = correct === 2 ? '#34d399' : correct === 1 ? '#fbbf24' : '#f87171';
        });
    }
    
    // Квиз 2
    const quiz2_btn = document.getElementById('quiz2-check');
    const quiz2_res = document.getElementById('quiz2-result');
    if (quiz2_btn && quiz2_res) {
        quiz2_btn.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="quiz2-q1"]:checked');
            const q2 = document.querySelector('input[name="quiz2-q2"]:checked');
            
            if (!q1 || !q2) {
                quiz2_res.textContent = 'Ответьте на все вопросы';
                quiz2_res.style.color = '#f87171';
                return;
            }
            
            let correct = 0;
            if (q1.value === 'b') correct++;
            if (q2.value === 'b') correct++;
            
            quiz2_res.textContent = `Правильно: ${correct}/2`;
            quiz2_res.style.color = correct === 2 ? '#34d399' : correct === 1 ? '#fbbf24' : '#f87171';
        });
    }
    
    // Квиз 3
    const quiz3_btn = document.getElementById('quiz3-check');
    const quiz3_res = document.getElementById('quiz3-result');
    if (quiz3_btn && quiz3_res) {
        quiz3_btn.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="quiz3-q1"]:checked');
            const q2 = document.querySelector('input[name="quiz3-q2"]:checked');
            
            if (!q1 || !q2) {
                quiz3_res.textContent = 'Ответьте на все вопросы';
                quiz3_res.style.color = '#f87171';
                return;
            }
            
            let correct = 0;
            if (q1.value === 'b') correct++;
            if (q2.value === 'c') correct++;
            
            quiz3_res.textContent = `Правильно: ${correct}/2`;
            quiz3_res.style.color = correct === 2 ? '#34d399' : correct === 1 ? '#fbbf24' : '#f87171';
        });
    }
    
    // Квиз 4
    const quiz4_btn = document.getElementById('quiz4-check');
    const quiz4_res = document.getElementById('quiz4-result');
    if (quiz4_btn && quiz4_res) {
        quiz4_btn.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="quiz4-q1"]:checked');
            const q2 = document.querySelector('input[name="quiz4-q2"]:checked');
            
            if (!q1 || !q2) {
                quiz4_res.textContent = 'Ответьте на все вопросы';
                quiz4_res.style.color = '#f87171';
                return;
            }
            
            let correct = 0;
            if (q1.value === 'b') correct++;
            if (q2.value === 'b') correct++;
            
            quiz4_res.textContent = `Правильно: ${correct}/2`;
            quiz4_res.style.color = correct === 2 ? '#34d399' : correct === 1 ? '#fbbf24' : '#f87171';
        });
    }
    
    // Квиз 5
    const quiz5_btn = document.getElementById('quiz5-check');
    const quiz5_res = document.getElementById('quiz5-result');
    if (quiz5_btn && quiz5_res) {
        quiz5_btn.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="quiz5-q1"]:checked');
            const q2 = document.querySelector('input[name="quiz5-q2"]:checked');
            
            if (!q1 || !q2) {
                quiz5_res.textContent = 'Ответьте на все вопросы';
                quiz5_res.style.color = '#f87171';
                return;
            }
            
            let correct = 0;
            if (q1.value === 'c') correct++;
            if (q2.value === 'c') correct++;
            
            quiz5_res.textContent = `Правильно: ${correct}/2`;
            quiz5_res.style.color = correct === 2 ? '#34d399' : correct === 1 ? '#fbbf24' : '#f87171';
        });
    }
});

// Задачи по заданию 6
document.addEventListener('DOMContentLoaded', () => {
    // Задача 6.1
    const q6_1_input = document.getElementById('q6-1-input');
    const q6_1_btn = document.getElementById('q6-1-check');
    const q6_1_res = document.getElementById('q6-1-result');
    if (q6_1_input && q6_1_btn && q6_1_res) {
        q6_1_btn.addEventListener('click', () => {
            const val = Number(q6_1_input.value);
            if (val === 8) {
                q6_1_res.textContent = 'Правильно!';
                q6_1_res.style.color = '#34d399';
            } else {
                q6_1_res.textContent = 'Неверно. 7 > 5 = true, y = 7 + 1 = 8';
                q6_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 6.2
    const q6_2_input = document.getElementById('q6-2-input');
    const q6_2_btn = document.getElementById('q6-2-check');
    const q6_2_res = document.getElementById('q6-2-result');
    if (q6_2_input && q6_2_btn && q6_2_res) {
        q6_2_btn.addEventListener('click', () => {
            const val = Number(q6_2_input.value);
            if (val === 15) {
                q6_2_res.textContent = 'Правильно!';
                q6_2_res.style.color = '#34d399';
            } else {
                q6_2_res.textContent = 'Неверно. 12 >= 10 && 3 < 5 = true, c = 12 + 3 = 15';
                q6_2_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 6.3
    const q6_3_input = document.getElementById('q6-3-input');
    const q6_3_btn = document.getElementById('q6-3-check');
    const q6_3_res = document.getElementById('q6-3-result');
    if (q6_3_input && q6_3_btn && q6_3_res) {
        q6_3_btn.addEventListener('click', () => {
            const val = Number(q6_3_input.value);
            if (val === 16) {
                q6_3_res.textContent = 'Правильно!';
                q6_3_res.style.color = '#34d399';
            } else {
                q6_3_res.textContent = 'Неверно. 8 % 2 == 0 = true, 8 > 10 = false, y = 8 * 2 = 16';
                q6_3_res.style.color = '#f87171';
            }
        });
    }
});

// Квиз 6
document.addEventListener('DOMContentLoaded', () => {
    const quiz6_btn = document.getElementById('quiz6-check');
    const quiz6_res = document.getElementById('quiz6-result');
    if (quiz6_btn && quiz6_res) {
        quiz6_btn.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="quiz6-q1"]:checked');
            const q2 = document.querySelector('input[name="quiz6-q2"]:checked');
            
            if (!q1 || !q2) {
                quiz6_res.textContent = 'Ответьте на все вопросы';
                quiz6_res.style.color = '#f87171';
                return;
            }
            
            let correct = 0;
            if (q1.value === 'b') correct++;
            if (q2.value === 'c') correct++;
            
            quiz6_res.textContent = `Правильно: ${correct}/2`;
            quiz6_res.style.color = correct === 2 ? '#34d399' : correct === 1 ? '#fbbf24' : '#f87171';
        });
    }
});

// Задачи по заданиям 7-12
document.addEventListener('DOMContentLoaded', () => {
    // Задача 7.1
    const q7_1_input = document.getElementById('q7-1-input');
    const q7_1_btn = document.getElementById('q7-1-check');
    const q7_1_res = document.getElementById('q7-1-result');
    if (q7_1_input && q7_1_btn && q7_1_res) {
        q7_1_btn.addEventListener('click', () => {
            const val = q7_1_input.value;
            if (val === 'docx') {
                q7_1_res.textContent = 'Правильно!';
                q7_1_res.style.color = '#34d399';
            } else {
                q7_1_res.textContent = 'Неверно. DOCX поддерживает форматирование';
                q7_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 7.2
    const q7_2_input = document.getElementById('q7-2-input');
    const q7_2_btn = document.getElementById('q7-2-check');
    const q7_2_res = document.getElementById('q7-2-result');
    if (q7_2_input && q7_2_btn && q7_2_res) {
        q7_2_btn.addEventListener('click', () => {
            const val = q7_2_input.value;
            if (val === 'phishing') {
                q7_2_res.textContent = 'Правильно!';
                q7_2_res.style.color = '#34d399';
            } else {
                q7_2_res.textContent = 'Неверно. Фишинг — мошенничество через поддельные сайты';
                q7_2_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 8.1
    const q8_1_input = document.getElementById('q8-1-input');
    const q8_1_btn = document.getElementById('q8-1-check');
    const q8_1_res = document.getElementById('q8-1-result');
    if (q8_1_input && q8_1_btn && q8_1_res) {
        q8_1_btn.addEventListener('click', () => {
            const val = q8_1_input.value;
            if (val === 'b') {
                q8_1_res.textContent = 'Правильно!';
                q8_1_res.style.color = '#34d399';
            } else {
                q8_1_res.textContent = 'Неверно. Оператор - исключает слово';
                q8_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 9.1
    const q9_1_input = document.getElementById('q9-1-input');
    const q9_1_btn = document.getElementById('q9-1-check');
    const q9_1_res = document.getElementById('q9-1-result');
    if (q9_1_input && q9_1_btn && q9_1_res) {
        q9_1_btn.addEventListener('click', () => {
            const val = q9_1_input.value;
            if (val === 'condition') {
                q9_1_res.textContent = 'Правильно!';
                q9_1_res.style.color = '#34d399';
            } else {
                q9_1_res.textContent = 'Неверно. Ромб обозначает условие';
                q9_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 10.1
    const q10_1_input = document.getElementById('q10-1-input');
    const q10_1_btn = document.getElementById('q10-1-check');
    const q10_1_res = document.getElementById('q10-1-result');
    if (q10_1_input && q10_1_btn && q10_1_res) {
        q10_1_btn.addEventListener('click', () => {
            const val = q10_1_input.value;
            if (val === '12') {
                q10_1_res.textContent = 'Правильно!';
                q10_1_res.style.color = '#34d399';
            } else {
                q10_1_res.textContent = 'Неверно. 1011₂ = 11₁₀ < 12₁₀';
                q10_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 11.1
    const q11_1_input = document.getElementById('q11-1-input');
    const q11_1_btn = document.getElementById('q11-1-check');
    const q11_1_res = document.getElementById('q11-1-result');
    if (q11_1_input && q11_1_btn && q11_1_res) {
        q11_1_btn.addEventListener('click', () => {
            const val = q11_1_input.value;
            if (val === '*.txt') {
                q11_1_res.textContent = 'Правильно!';
                q11_1_res.style.color = '#34d399';
            } else {
                q11_1_res.textContent = 'Неверно. * означает любое имя файла';
                q11_1_res.style.color = '#f87171';
            }
        });
    }
    
    // Задача 12.1
    const q12_1_input = document.getElementById('q12-1-input');
    const q12_1_btn = document.getElementById('q12-1-check');
    const q12_1_res = document.getElementById('q12-1-result');
    if (q12_1_input && q12_1_btn && q12_1_res) {
        q12_1_btn.addEventListener('click', () => {
            const val = q12_1_input.value;
            if (val === 'date') {
                q12_1_res.textContent = 'Правильно!';
                q12_1_res.style.color = '#34d399';
            } else {
                q12_1_res.textContent = 'Неверно. По дате создания';
                q12_1_res.style.color = '#f87171';
            }
        });
    }

    // Task 16 - Programming
    const q16_1_check = document.getElementById('q16-1-check');
    if (q16_1_check) {
        q16_1_check.addEventListener('click', function() {
            const input = document.getElementById('q16-1-input').value.trim();
            const result = document.getElementById('q16-1-result');
            
            const ok = input.includes('sum') && input.includes('range') && input.includes('print');
            result.textContent = ok ? 'Верно' : 'Неверно';
            result.style.color = ok ? '#28a745' : '#dc3545';
        });
    }

    const q16_2_check = document.getElementById('q16-2-check');
    if (q16_2_check) {
        q16_2_check.addEventListener('click', function() {
            const input = document.getElementById('q16-2-input').value.trim();
            const result = document.getElementById('q16-2-result');
            
            const ok = input.includes('% 2 == 0') && input.includes('count') && input.includes('for');
            result.textContent = ok ? 'Верно' : 'Неверно';
            result.style.color = ok ? '#28a745' : '#dc3545';
        });
    }

    const q16_3_check = document.getElementById('q16-3-check');
    if (q16_3_check) {
        q16_3_check.addEventListener('click', function() {
            const input = document.getElementById('q16-3-input').value.trim();
            const result = document.getElementById('q16-3-result');
            
            const ok = input.includes('while') && input.includes('%') && input.includes('a, b = b, a');
            result.textContent = ok ? 'Верно' : 'Неверно';
            result.style.color = ok ? '#28a745' : '#dc3545';
        });
    }

    // Quiz 16
    const quiz16Check = document.getElementById('quiz16-check');
    if (quiz16Check) {
        quiz16Check.addEventListener('click', function() {
            const answers = {
                'quiz16-q1': 'b',
                'quiz16-q2': 'a'
            };
            checkQuiz('quiz16', answers, 'quiz16-result');
        });
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

// Переключение темы и цветовой схемы
(function themeAndColorSwitcher() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const colorSchemeButtons = document.querySelectorAll('.color-scheme-btn');
    
    // Загрузка сохраненных настроек
    const savedTheme = localStorage.getItem('oge-course-theme');
    const savedColorScheme = localStorage.getItem('oge-course-color-scheme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    if (savedColorScheme) {
        body.setAttribute('data-color-scheme', savedColorScheme);
        colorSchemeButtons.forEach(btn => {
            if (btn.getAttribute('data-color') === savedColorScheme) {
                btn.classList.add('active');
            }
        });
    } else {
        // По умолчанию фиолетовая схема
        const purpleBtn = document.querySelector('.color-scheme-btn[data-color="purple"]');
        if (purpleBtn) purpleBtn.classList.add('active');
    }
    
    // Обновление метки темы в мобильном меню
    function updateThemeLabel() {
        const mobileThemeLabel = document.querySelector('.mobile-theme-toggle-btn .theme-label');
        if (mobileThemeLabel) {
            mobileThemeLabel.textContent = body.classList.contains('dark-theme') ? 'Темная' : 'Светлая';
        }
    }
    
    // Переключение темы
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            const isDark = body.classList.contains('dark-theme');
            localStorage.setItem('oge-course-theme', isDark ? 'dark' : 'light');
            updateThemeLabel();
        });
    }
    
    // Переключение цветовой схемы
    colorSchemeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.getAttribute('data-color');
            body.setAttribute('data-color-scheme', color);
            localStorage.setItem('oge-course-color-scheme', color);
            
            colorSchemeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Синхронизация с мобильным меню
            const mobileBtn = document.querySelector(`.mobile-color-scheme-btn[data-color="${color}"]`);
            if (mobileBtn) {
                document.querySelectorAll('.mobile-color-scheme-btn').forEach(b => b.classList.remove('active'));
                mobileBtn.classList.add('active');
            }
        });
    });
    
    updateThemeLabel();
})();

// Мобильное меню настроек
(function() {
    const mobileSettingsTrigger = document.getElementById('mobileSettingsTrigger');
    const mobileSettingsMenu = document.getElementById('mobileSettingsMenu');
    const mobileSettingsClose = document.getElementById('mobileSettingsClose');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const mobileColorSchemeBtns = document.querySelectorAll('.mobile-color-scheme-btn');
    const desktopThemeToggle = document.getElementById('themeToggle');
    const desktopColorSchemeBtns = document.querySelectorAll('.color-scheme-btn');
    
    if (!mobileSettingsTrigger || !mobileSettingsMenu) return;
    
    // Открытие меню
    mobileSettingsTrigger.addEventListener('click', () => {
        mobileSettingsMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Закрытие меню
    const closeMenu = () => {
        mobileSettingsMenu.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (mobileSettingsClose) {
        mobileSettingsClose.addEventListener('click', closeMenu);
    }
    
    // Закрытие по клику вне меню
    mobileSettingsMenu.addEventListener('click', (e) => {
        if (e.target === mobileSettingsMenu) {
            closeMenu();
        }
    });
    
    // Синхронизация темы между десктопом и мобильным меню
    if (mobileThemeToggle && desktopThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            desktopThemeToggle.click();
        });
    }
    
    // Синхронизация цветовой схемы между десктопом и мобильным меню
    mobileColorSchemeBtns.forEach(mobileBtn => {
        mobileBtn.addEventListener('click', () => {
            const color = mobileBtn.getAttribute('data-color');
            const desktopBtn = document.querySelector(`.color-scheme-btn[data-color="${color}"]`);
            if (desktopBtn) {
                desktopBtn.click();
            }
        });
    });
    
    // Обновление активного состояния мобильных кнопок при загрузке
    const activeColor = document.body.getAttribute('data-color-scheme') || 'purple';
    mobileColorSchemeBtns.forEach(btn => {
        if (btn.getAttribute('data-color') === activeColor) {
            btn.classList.add('active');
        }
    });
})();
