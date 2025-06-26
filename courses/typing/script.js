// Тексты для тренировки печати
const texts = {
    easy: [
        "Программирование - это искусство создания компьютерных программ.",
        "Компьютеры выполняют только то, что им говорят делать.",
        "Изучение языков программирования открывает новые возможности.",
        "Алгоритмы - это последовательность шагов для решения задачи.",
        "Разработка веб-сайтов включает HTML, CSS и JavaScript.",
        "Умение быстро печатать повышает эффективность работы.",
        "Информационные технологии развиваются стремительными темпами.",
        "Базы данных хранят структурированную информацию для быстрого доступа.",
        "Операционная система управляет аппаратным обеспечением компьютера.",
        "Сетевые протоколы обеспечивают стандарты для обмена данными.",
        "Интерфейс программы должен быть интуитивно понятным для пользователей.",
        "Искусственный интеллект имитирует когнитивные функции человека.",
        "Компиляторы преобразуют код высокого уровня в машинные инструкции.",
        "Виртуализация позволяет запускать несколько систем на одной машине."
    ],
    medium: [
        "Объектно-ориентированное программирование основано на концепции объектов, которые могут содержать данные и код для работы с этими данными.",
        "Функциональное программирование - это парадигма, где функции являются основными строительными блоками программы и могут передаваться как аргументы.",
        "Рекурсия - это метод решения задач, при котором функция вызывает сама себя с измененными параметрами до достижения базового случая.",
        "Структуры данных, такие как массивы, связанные списки, деревья и графы, используются для эффективного хранения и обработки информации.",
        "Асинхронное программирование позволяет выполнять операции без блокировки основного потока выполнения, что улучшает отзывчивость приложений.",
        "В области компьютерной безопасности шифрование обеспечивает конфиденциальность данных путем преобразования исходного текста в зашифрованный.",
        "Технология блокчейн представляет собой распределенную базу данных, которая поддерживает постоянно растущий список записей, защищенных от подделки.",
        "Машинное обучение - это подраздел искусственного интеллекта, изучающий методы построения алгоритмов, способных обучаться на данных.",
        "Квантовые компьютеры используют квантовые биты или кубиты для выполнения вычислений, что потенциально делает их намного быстрее классических компьютеров.",
        "Интернет вещей объединяет физические устройства, транспортные средства и другие объекты со встроенными сенсорами и программным обеспечением.",
        "Глубокое обучение - это часть методов машинного обучения, основанная на искусственных нейронных сетях с несколькими слоями обработки.",
        "Технология распознавания речи преобразует разговорный язык в текст с помощью алгоритмов, анализирующих звуковые волны и лингвистические паттерны."
    ],
    hard: [
        "В контексте разработки программного обеспечения, архитектурный паттерн MVC (Модель-Представление-Контроллер) разделяет приложение на три взаимосвязанных компонента, обеспечивая модульность и повторное использование кода.",
        "Алгоритмы машинного обучения, такие как нейронные сети, деревья решений и методы кластеризации, позволяют компьютерам обучаться на основе данных без явного программирования каждого отдельного случая.",
        "Контейнеризация с использованием технологий, таких как Docker, обеспечивает изоляцию приложений и их зависимостей, что упрощает развертывание и масштабирование в различных средах выполнения.",
        "Микросервисная архитектура представляет собой подход к разработке приложений, при котором большое приложение строится как набор модульных сервисов, каждый из которых работает в собственном процессе и взаимодействует с другими через легковесные механизмы.",
        "Распределенные системы контроля версий, такие как Git, позволяют нескольким разработчикам эффективно сотрудничать над кодовой базой, отслеживая изменения и управляя конфликтами при слиянии различных версий.",
        "Квантовые алгоритмы, такие как алгоритм Шора для факторизации больших чисел и алгоритм Гровера для поиска в неупорядоченных базах данных, демонстрируют превосходство квантовых вычислений над классическими для определенных задач.",
        "Технология гомоморфного шифрования позволяет выполнять вычисления непосредственно с зашифрованными данными без необходимости предварительной расшифровки, что имеет значительные последствия для конфиденциальности и безопасности в облачных вычислениях.",
        "Нейроморфные вычислительные системы представляют собой компьютерные архитектуры, вдохновленные структурой и функционированием человеческого мозга, с потенциалом для революционного изменения подходов к искусственному интеллекту и обработке сложных данных.",
        "Генеративно-состязательные сети (GAN) представляют собой класс алгоритмов машинного обучения, используемых в обучении без учителя, реализованные как система двух нейронных сетей, соревнующихся друг с другом в рамках игры с нулевой суммой.",
        "Технология пятого поколения мобильной связи (5G) предлагает значительно улучшенную пропускную способность, сверхнизкую задержку и возможность одновременного подключения массивного количества устройств, что создает основу для Интернета вещей и умных городов.",
        "Квантовая криптография использует принципы квантовой механики, такие как принцип неопределенности Гейзенберга и квантовая запутанность, для создания теоретически непреодолимой системы шифрования, где любая попытка перехвата данных неизбежно приводит к нарушению квантового состояния и, следовательно, к обнаружению вторжения.",
        "Биоинформатика объединяет компьютерные алгоритмы, статистические методы и принципы молекулярной биологии для анализа и интерпретации биологических данных, что существенно ускоряет открытия в областях геномики, протеомики и персонализированной медицины."
    ],
    expert: [
        "Метапрограммирование, предполагающее создание программ, которые могут анализировать, генерировать или трансформировать другие программы (или себя) как данные, является мощным инструментом для создания гибких и адаптивных систем, но требует глубокого понимания семантики языка программирования и может существенно усложнить отладку и обслуживание кода.",
        "Гомогенные координаты в компьютерной графике представляют точки в пространстве с использованием одной дополнительной координаты, что позволяет выполнять операции проективной геометрии, включая перспективные проекции и трансформации, в единой математической форме, значительно упрощая вычисления и обеспечивая большую выразительность алгоритмов компьютерного зрения и трехмерной визуализации.",
        "Постквантовая криптография направлена на разработку криптографических алгоритмов, устойчивых к атакам с помощью как классических, так и квантовых компьютеров, и включает такие подходы, как решетчатая криптография, криптография на основе хеш-функций, многомерная полиномиальная криптография и криптосистемы на основе суперсингулярных изогений эллиптических кривых, которые остаются безопасными даже против атак с использованием алгоритма Шора.",
        "Когнитивные архитектуры, такие как ACT-R, SOAR и CLARION, представляют собой вычислительные модели, эмулирующие различные аспекты человеческого познания, включая восприятие, внимание, обучение, память, принятие решений и решение проблем, и служат интегративными фреймворками для понимания сложных когнитивных процессов и создания искусственных агентов, способных к адаптивному, целенаправленному поведению в динамических и неопределенных средах.",
        "Формальная верификация программного обеспечения включает в себя математически строгое доказательство соответствия программы или системы заданной формальной спецификации, используя такие методы, как проверка моделей, дедуктивная верификация, типизированные языки программирования и автоматические доказатели теорем, что особенно критично для систем, где отказы могут иметь катастрофические последствия, например, в медицинских устройствах, авиационных системах или ядерных объектах.",
        "Топологические квантовые компьютеры представляют альтернативный подход к квантовым вычислениям, использующий экзотические квазичастицы, называемые анионами, для выполнения операций через их брейдинг в (2+1)-мерном пространстве-времени, что теоретически обеспечивает внутреннюю устойчивость к декогеренции и ошибкам, представляя потенциально более стабильную платформу для масштабируемых квантовых вычислений по сравнению с традиционными подходами, основанными на кубитах.",
        "Механизмы формальных языков, такие как контекстно-свободные грамматики, регулярные выражения, конечные автоматы и машины Тьюринга, формируют теоретическую основу для разработки компиляторов, интерпретаторов и других инструментов обработки языков, и их понимание необходимо для создания эффективных систем анализа и трансляции в лингвистической и компьютерной областях.",
        "Дифференциальная конфиденциальность представляет собой строгий математический фреймворк для количественной оценки и ограничения риска раскрытия конфиденциальной информации при публикации результатов статистического анализа данных, гарантируя, что добавление или удаление отдельных записей не оказывает существенного влияния на результаты запросов, при этом сохраняя полезность агрегированной информации."
    ]
};

// Элементы DOM
const typingTextElement = document.getElementById('typing-text');
const typingInputElement = document.getElementById('typing-input');
const timeElement = document.getElementById('time');
const restartButton = document.getElementById('restart-btn');
const difficultySelect = document.getElementById('difficulty');
const progressBar = document.getElementById('progress-bar');

// Элементы модального окна результатов
const resultsModal = document.getElementById('results-modal');
const finalSpeedElement = document.getElementById('final-speed');
const finalAccuracyElement = document.getElementById('final-accuracy');
const finalTimeElement = document.getElementById('final-time');
const tryAgainButton = document.getElementById('try-again-btn');
const newTextButton = document.getElementById('new-text-btn');

// Кнопки поделиться
const telegramButton = document.querySelector('.share-btn.telegram');
const vkButton = document.querySelector('.share-btn.vk');
const copyButton = document.querySelector('.share-btn.copy');

// Переменные состояния
let currentText = '';
let currentTextArray = [];
let currentIndex = 0;
let startTime = null;
let endTime = null;
let timer = null;
let totalTyped = 0;
let correctTyped = 0;
let mistakes = 0;
let isFinished = false;
let currentDifficulty = 'medium';
let finalSpeed = 0;
let finalAccuracy = 0;
let lastIndex = -1; // Для отслеживания последней позиции

// Функциональность сворачиваемых блоков
function initCollapsibleSections() {
    const sections = document.querySelectorAll('.collapsible');
    
    sections.forEach(section => {
        const header = section.querySelector('.info-header');
        const content = section.querySelector('.info-content');
        
        header.addEventListener('click', () => {
            // Переключаем класс active для текущего раздела
            section.classList.toggle('active');
            content.classList.toggle('hidden');
        });
    });
}

// Инициализация
function init() {
    // Загрузка текста
    loadRandomText();
    
    // Скрываем поле ввода, но оставляем его для фокуса
    typingInputElement.style.position = 'absolute';
    typingInputElement.style.opacity = '0';
    typingInputElement.style.pointerEvents = 'none';
    
    // Обработчики событий для клавиатуры напрямую
    document.addEventListener('keydown', handleKeyDown);
    
    // Обработчики для элементов управления
    restartButton.addEventListener('click', restart);
    difficultySelect.addEventListener('change', changeDifficulty);
    
    // Предотвращаем перехват клавиатуры при взаимодействии с селектом
    difficultySelect.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    difficultySelect.addEventListener('focus', () => {
        // Временно отключаем обработчик клавиш
        document.removeEventListener('keydown', handleKeyDown);
    });
    
    difficultySelect.addEventListener('blur', () => {
        // Включаем обработчик клавиш обратно
        document.addEventListener('keydown', handleKeyDown);
        // Только после выхода из селекта фокусируемся на поле ввода
        setTimeout(() => {
            typingInputElement.focus();
        }, 200);
    });
    
    // Обработчики для модального окна
    tryAgainButton.addEventListener('click', () => {
        hideResultsModal();
        restart();
    });
    
    newTextButton.addEventListener('click', () => {
        hideResultsModal();
        loadRandomText();
        restart();
    });
    
    // Обработчики для кнопок поделиться
    telegramButton.addEventListener('click', shareToTelegram);
    vkButton.addEventListener('click', shareToVK);
    copyButton.addEventListener('click', copyResult);
    
    // Инициализация сворачиваемых блоков
    initCollapsibleSections();
    
    // Автоматический фокус на скрытое поле ввода при клике в любом месте тренажера
    document.querySelector('.typing-wrapper').addEventListener('click', () => {
        typingInputElement.focus();
    });
    
    // Добавляем обработчик клика вне модального окна для его закрытия
    document.addEventListener('click', (e) => {
        if (e.target === resultsModal) {
            hideResultsModal();
        }
    });
    
    // Добавляем обработчик нажатия клавиш для закрытия модального окна
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resultsModal.classList.contains('show')) {
            hideResultsModal();
        }
    });
    
    // Фокус на скрытом поле ввода при загрузке
    typingInputElement.focus();
}

// Загрузка случайного текста
function loadRandomText() {
    const textArray = texts[currentDifficulty];
    const randomIndex = Math.floor(Math.random() * textArray.length);
    currentText = textArray[randomIndex];
    
    // Разбиваем текст на символы для отображения
    currentTextArray = currentText.split('');
    
    // Отображаем текст
    displayText();
    
    // Сбрасываем прогресс-бар
    updateProgressBar(0);
    
    // Сбрасываем индекс последней правильной позиции
    lastIndex = -1;
}

// Отображение текста
function displayText() {
    typingTextElement.innerHTML = '';
    
    currentTextArray.forEach((char, index) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.classList.add('char');
        
        if (index === currentIndex) {
            charSpan.classList.add('active');
        } else if (index < currentIndex) {
            charSpan.classList.add('correct');
        }
        
        typingTextElement.appendChild(charSpan);
    });
}

// Обработка нажатий клавиш
function handleKeyDown(e) {
    // Если текст завершен или открыто модальное окно, не обрабатываем нажатия
    if (isFinished || resultsModal.classList.contains('show')) {
        return;
    }
    
    // Предотвращаем стандартное поведение для функциональных клавиш
    if (e.key === 'Tab' || e.key === 'Escape') {
        e.preventDefault();
        return;
    }
    
    // Предотвращаем стандартное поведение для клавиши пробела, чтобы избежать скролла страницы
    if (e.key === ' ') {
        e.preventDefault();
    }
    
    // Начинаем отсчет времени при первом нажатии
    if (!startTime && e.key !== 'Shift' && e.key !== 'Control' && e.key !== 'Alt') {
        startTime = new Date();
        startTimer();
    }
    
    // Обработка Backspace
    if (e.key === 'Backspace' && currentIndex > 0) {
        e.preventDefault();
        
        // Удаляем все классы у текущего символа
        const chars = typingTextElement.querySelectorAll('.char');
        currentIndex--;
        
        chars[currentIndex].classList.remove('correct');
        chars[currentIndex].classList.remove('incorrect');
        
        // Устанавливаем активный символ
        updateActiveChar();
        
        // Обновляем прогресс-бар
        updateProgressBar((currentIndex / currentTextArray.length) * 100);
        
        return;
    }
    
    // Пропускаем модификаторы и специальные клавиши
    if (e.key === 'Shift' || e.key === 'Control' || e.key === 'Alt' || 
        e.key === 'CapsLock' || e.key === 'NumLock' || e.key === 'Tab' ||
        e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight' ||
        e.key === 'Home' || e.key === 'End' || e.key === 'PageUp' || e.key === 'PageDown' ||
        e.key === 'Insert' || e.key === 'Delete' || e.key === 'Escape' ||
        e.key === 'Meta' || e.key === 'ContextMenu') {
        return;
    }
    
    // Обработка обычных символов
    if (currentIndex < currentTextArray.length) {
        const expectedChar = currentTextArray[currentIndex];
        
        // Увеличиваем счетчик общего количества введенных символов
        totalTyped++;
        
        // Проверяем правильность ввода
        if (e.key === expectedChar) {
            // Правильный символ
            correctTyped++;
            typingTextElement.children[currentIndex].classList.add('correct');
            currentIndex++;
            
            // Обновляем прогресс-бар
            updateProgressBar((currentIndex / currentTextArray.length) * 100);
            
            // Проверяем, закончен ли текст
            if (currentIndex >= currentTextArray.length) {
                finishTyping();
            } else {
                // Обновляем активный символ
                updateActiveChar();
            }
        } else {
            // Неправильный символ
            mistakes++;
            typingTextElement.children[currentIndex].classList.add('incorrect');
            
            // Добавляем эффект встряски для визуальной обратной связи
            typingTextElement.classList.add('shake');
            setTimeout(() => {
                typingTextElement.classList.remove('shake');
            }, 300);
        }
    }
}

// Обновление активного символа с плавной анимацией
function updateActiveChar() {
    // Удаляем класс active у всех символов
    const chars = typingTextElement.querySelectorAll('.char');
    chars.forEach(char => char.classList.remove('active'));
    
    // Добавляем класс active текущему символу
    if (currentIndex < chars.length) {
        chars[currentIndex].classList.add('active');
        
        // Плавная прокрутка для длинных текстов
        if (currentIndex > 20) {
            // Получаем позицию активного символа
            const activeCharPosition = chars[currentIndex].offsetTop;
            const activeCharLeft = chars[currentIndex].offsetLeft;
            
            // Плавно прокручиваем к активному символу
            typingTextElement.scrollTo({
                top: activeCharPosition > 150 ? activeCharPosition - 150 : 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }
}

// Обновление прогресс-бара
function updateProgressBar(percentage) {
    progressBar.style.width = `${percentage}%`;
    
    // Добавляем визуальный эффект при завершении
    if (percentage === 100) {
        progressBar.classList.add('completed');
    } else {
        progressBar.classList.remove('completed');
    }
}

// Запуск таймера
function startTimer() {
    let seconds = 0;
    
    timer = setInterval(() => {
        seconds++;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Завершение печати
function finishTyping() {
    isFinished = true;
    endTime = new Date();
    
    // Останавливаем таймер
    clearInterval(timer);
    
    // Блокируем ввод
    typingInputElement.disabled = true;
    
    // Рассчитываем результаты
    const timeElapsed = (endTime - startTime) / 1000; // в секундах
    finalSpeed = Math.round((correctTyped / timeElapsed) * 60); // знаков в минуту
    finalAccuracy = Math.round((correctTyped / totalTyped) * 100);
    
    // Показываем модальное окно с результатами
    showResults(finalSpeed, finalAccuracy, timeElement.textContent);
}

// Показ результатов в модальном окне
function showResults(speed, accuracy, time) {
    // Заполняем данные
    finalSpeedElement.textContent = speed;
    finalAccuracyElement.textContent = `${accuracy}%`;
    finalTimeElement.textContent = time;
    
    // Показываем модальное окно с анимацией
    setTimeout(() => {
        resultsModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
    }, 500);
}

// Скрытие модального окна
function hideResultsModal() {
    resultsModal.classList.remove('show');
    document.body.style.overflow = ''; // Возвращаем прокрутку страницы
}

// Функции для кнопок "Поделиться"
function shareToTelegram() {
    const text = `Я напечатал текст со скоростью ${finalSpeed} зн/мин и точностью ${finalAccuracy}% на тренажере печати SKL Academy!`;
    const url = 'https://t.me/share/url?url=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent(text);
    window.open(url, '_blank');
}

function shareToVK() {
    const text = `Я напечатал текст со скоростью ${finalSpeed} зн/мин и точностью ${finalAccuracy}% на тренажере печати SKL Academy!`;
    const url = 'https://vk.com/share.php?url=' + encodeURIComponent(window.location.href) + '&title=' + encodeURIComponent(text);
    window.open(url, '_blank');
}

function copyResult() {
    const text = `Я напечатал текст со скоростью ${finalSpeed} зн/мин и точностью ${finalAccuracy}% на тренажере печати SKL Academy!`;
    
    // Копируем в буфер обмена
    navigator.clipboard.writeText(text).then(() => {
        // Показываем уведомление об успешном копировании
        const copyBtn = document.querySelector('.share-btn.copy');
        const originalIcon = copyBtn.innerHTML;
        
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#32cd32';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
            copyBtn.style.background = '';
        }, 2000);
    });
}

// Перезапуск тренажера
function restart() {
    // Сбрасываем все переменные
    currentIndex = 0;
    startTime = null;
    endTime = null;
    totalTyped = 0;
    correctTyped = 0;
    mistakes = 0;
    isFinished = false;
    lastIndex = -1;
    
    // Останавливаем таймер
    clearInterval(timer);
    
    // Сбрасываем таймер
    timeElement.textContent = '00:00';
    
    // Разблокируем поле ввода
    typingInputElement.disabled = false;
    typingInputElement.value = '';
    
    // Сбрасываем прогресс-бар
    updateProgressBar(0);
    
    // Обновляем отображение текста
    displayText();
    
    // Фокус на поле ввода
    typingInputElement.focus();
}

// Изменение уровня сложности
function changeDifficulty() {
    // Получаем выбранное значение
    const selectedDifficulty = difficultySelect.value;
    
    // Проверяем, изменилась ли сложность
    if (selectedDifficulty !== currentDifficulty) {
        currentDifficulty = selectedDifficulty;
        
        // Загружаем новый текст с выбранной сложностью
        loadRandomText();
        restart();
    }
    
    // Убираем немедленную фокусировку, чтобы не закрывать выпадающий список
    // Фокус будет установлен в обработчике blur селекта
}

// Добавляем эффект анимации для текста
function addTextAnimation() {
    typingTextElement.style.opacity = '0';
    typingTextElement.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        typingTextElement.style.transition = 'all 0.5s ease';
        typingTextElement.style.opacity = '1';
        typingTextElement.style.transform = 'translateY(0)';
    }, 100);
}

// Запускаем тренажер
document.addEventListener('DOMContentLoaded', () => {
    init();
    addTextAnimation();
}); 