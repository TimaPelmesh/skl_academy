// Тексты для тренировки печати
const texts = {
    easy: [
        "Программирование - это искусство создания компьютерных программ.",
        "Компьютеры выполняют только то, что им говорят делать.",
        "Изучение языков программирования открывает новые возможности.",
        "Алгоритмы - это последовательность шагов для решения задачи.",
        "Разработка веб-сайтов включает HTML, CSS и JavaScript."
    ],
    medium: [
        "Объектно-ориентированное программирование основано на концепции объектов, которые могут содержать данные и код для работы с этими данными.",
        "Функциональное программирование - это парадигма, где функции являются основными строительными блоками программы и могут передаваться как аргументы.",
        "Рекурсия - это метод решения задач, при котором функция вызывает сама себя с измененными параметрами до достижения базового случая.",
        "Структуры данных, такие как массивы, связанные списки, деревья и графы, используются для эффективного хранения и обработки информации.",
        "Асинхронное программирование позволяет выполнять операции без блокировки основного потока выполнения, что улучшает отзывчивость приложений."
    ],
    hard: [
        "В контексте разработки программного обеспечения, архитектурный паттерн MVC (Модель-Представление-Контроллер) разделяет приложение на три взаимосвязанных компонента, обеспечивая модульность и повторное использование кода.",
        "Алгоритмы машинного обучения, такие как нейронные сети, деревья решений и методы кластеризации, позволяют компьютерам обучаться на основе данных без явного программирования каждого отдельного случая.",
        "Контейнеризация с использованием технологий, таких как Docker, обеспечивает изоляцию приложений и их зависимостей, что упрощает развертывание и масштабирование в различных средах выполнения.",
        "Микросервисная архитектура представляет собой подход к разработке приложений, при котором большое приложение строится как набор модульных сервисов, каждый из которых работает в собственном процессе и взаимодействует с другими через легковесные механизмы.",
        "Распределенные системы контроля версий, такие как Git, позволяют нескольким разработчикам эффективно сотрудничать над кодовой базой, отслеживая изменения и управляя конфликтами при слиянии различных версий."
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
let lastCorrectIndex = -1; // Для отслеживания последней правильной позиции для Backspace

// Инициализация
function init() {
    // Загрузка текста
    loadRandomText();
    
    // Обработчики событий
    typingInputElement.addEventListener('input', handleInput);
    typingInputElement.addEventListener('keydown', handleKeyDown);
    restartButton.addEventListener('click', restart);
    difficultySelect.addEventListener('change', changeDifficulty);
    
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
    
    // Фокус на поле ввода
    typingInputElement.focus();
    
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
    
    // Добавляем обработчик для фокуса на поле ввода при клике в любом месте тренажера
    document.querySelector('.typing-wrapper').addEventListener('click', () => {
        typingInputElement.focus();
    });
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
    lastCorrectIndex = -1;
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

// Обработка нажатия клавиш
function handleKeyDown(e) {
    // Обработка Backspace
    if (e.key === 'Backspace' && currentIndex > 0) {
        e.preventDefault(); // Предотвращаем стандартное поведение Backspace
        
        // Удаляем класс correct у предыдущего символа
        const chars = typingTextElement.querySelectorAll('.char');
        chars[currentIndex - 1].classList.remove('correct');
        chars[currentIndex - 1].classList.remove('incorrect');
        
        // Уменьшаем индекс
        currentIndex--;
        
        // Обновляем активный символ
        updateActiveChar();
        
        // Обновляем прогресс-бар
        updateProgressBar((currentIndex / currentTextArray.length) * 100);
    }
}

// Обработка ввода
function handleInput(e) {
    const inputChar = e.target.value;
    
    // Если поле пустое (например, после нажатия Backspace), не обрабатываем
    if (inputChar === '') return;
    
    // Начинаем отсчет времени при первом вводе
    if (!startTime && inputChar) {
        startTime = new Date();
        startTimer();
    }
    
    // Проверка введенного символа
    if (inputChar && !isFinished) {
        const expectedChar = currentTextArray[currentIndex];
        
        // Увеличиваем счетчик общего количества введенных символов
        totalTyped++;
        
        // Проверяем правильность ввода
        if (inputChar === expectedChar) {
            // Правильный символ
            correctTyped++;
            typingTextElement.children[currentIndex].classList.add('correct');
            lastCorrectIndex = currentIndex; // Запоминаем последнюю правильную позицию
            currentIndex++;
            
            // Обновляем прогресс-бар
            updateProgressBar((currentIndex / currentTextArray.length) * 100);
            
            // Очищаем поле ввода
            typingInputElement.value = '';
            
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
            
            // Добавляем эффект встряски
            typingTextElement.classList.add('shake');
            setTimeout(() => {
                typingTextElement.classList.remove('shake');
            }, 300);
            
            // Очищаем поле ввода через небольшую задержку
            setTimeout(() => {
                typingInputElement.value = '';
            }, 100);
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
                top: activeCharPosition - 100,
                left: activeCharLeft - typingTextElement.offsetWidth / 2,
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
    lastCorrectIndex = -1;
    
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

// Изменение сложности
function changeDifficulty() {
    currentDifficulty = difficultySelect.value;
    restart();
    loadRandomText();
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