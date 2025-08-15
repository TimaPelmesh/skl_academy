(function initTrainer() {
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));

  const textWrapper = qs('#tWrapper');
  const textContainer = qs('#tText');
  const input = qs('#tInput');
  const startBtn = qs('#startBtn');
  const restartBtn = qs('#restartBtn');
  const shareBtn = qs('#shareBtn');

  const timeButtons = qsa('.time-group .segmented-btn');
  const lengthButtons = qsa('.length-group .segmented-btn');
  const setButtons = qsa('.set-group .segmented-btn');
  const customCharsInput = qs('#customChars');
  const applyCharsBtn = qs('#applyChars');

  const wpmEl = qs('#tWpm');
  const accEl = qs('#tAcc');
  const errEl = qs('#tErr');
  const timerEl = qs('#tTimer');

  // State
  let durationSec = 60;
  let textLength = 500;
  let currentChars = 'фываолдже';
  let characters = [];
  let currentIndex = 0;
  let startedAt = null;
  let started = false;
  let timer = null;
  let errorCount = 0;
  let correctCount = 0;
  let finished = false;

  // URL params support
  (function applyUrlParams() {
    try {
      const url = new URL(window.location.href);
      const pTime = url.searchParams.get('time');
      const pLength = url.searchParams.get('length');
      const pChars = url.searchParams.get('chars');
      if (pTime) durationSec = clampInt(Number(pTime), 10, 600) || 60;
      if (pLength) textLength = clampInt(Number(pLength), 100, 2000) || 500;
      if (pChars) currentChars = String(pChars);
    } catch {}
  })();

  function clampInt(n, min, max) {
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, Math.round(n)));
  }

  // Generators
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Словарь осмысленных комбинаций и предложений
  const TYPING_COMBINATIONS = {
    // Парные комбинации по рядам клавиатуры
    'home_row': [
      'фы', 'ва', 'ол', 'дж', 'ые', 
      'фа', 'вл', 'од', 'же', 'ыд'
    ],
    'top_row': [
      'йц', 'ук', 'ен', 'гш', 'щз', 
      'йу', 'цк', 'ен', 'гш', 'щз'
    ],
    'bottom_row': [
      'яч', 'см', 'ит', 'ьб', 'ю,', 
      'яс', 'чм', 'ит', 'ьб', 'ю.'
    ],
    
    // Осмысленные предложения для разных уровней
    'sentences': [
      // Простые предложения для начинающих
      'Мама мыла раму.',
      'Папа ест суп.',
      'Дети играют.',
      'Кот спит дома.',
      'Я люблю учиться.',
      
      // Более сложные предложения
      'В лесу растут высокие деревья.',
      'Солнце светит ярко над горизонтом.',
      'Птицы поют свои весенние песни.',
      'Река течет между зелеными холмами.',
      'Книга лежит на столе около окна.'
    ]
  };

  // Функция для генерации текста с осмысленными комбинациями
  function generateMeaningfulText(chars, length, mode = 'default') {
    const letters = String(chars).split('').filter(Boolean);
    const buf = [];
    
    if (mode === 'pairs') {
      // Режим парных комбинаций
      const combinations = TYPING_COMBINATIONS['home_row']
        .concat(TYPING_COMBINATIONS['top_row'])
        .concat(TYPING_COMBINATIONS['bottom_row']);
      
      while (buf.length < length) {
        const pair = combinations[randInt(0, combinations.length - 1)];
        buf.push(pair);
      }
      return buf.join(' ');
    } else if (mode === 'sentences') {
      // Режим предложений
      const sentences = TYPING_COMBINATIONS['sentences'];
      while (buf.length < length) {
        const sentence = sentences[randInt(0, sentences.length - 1)];
        buf.push(sentence);
      }
      return buf.join(' ');
    } else {
      // Стандартный режим генерации
      let nextSpaceAt = randInt(4, 8);
      for (let i = 0; i < length; i += 1) {
        if (i > 0 && i % nextSpaceAt === 0) {
          buf.push(' ');
          nextSpaceAt = randInt(4, 8);
        } else {
          buf.push(letters[randInt(0, letters.length - 1)]);
        }
      }
      return buf.join('');
    }
  }

  // Обновляем существующие функции генерации текста
  function generateText(chars, length) {
    return generateMeaningfulText(chars, length);
  }

  function renderText(text) {
    textContainer.innerHTML = '';
    characters = text.split('').map(ch => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch;
      textContainer.appendChild(span);
      return span;
    });
    currentIndex = 0;
    markCurrent();
  }

  function markCurrent() {
    characters.forEach(c => c.classList.remove('current'));
    if (characters[currentIndex]) {
      characters[currentIndex].classList.add('current');
      
      // Прокрутка к курсору (как в Stamina)
      const rect = characters[currentIndex].getBoundingClientRect();
      const parentRect = textWrapper.getBoundingClientRect();
      
      // Проверяем режим отображения
      const displayMode = document.getElementById('displayMode')?.value || 'scroll';
      
      if (displayMode === 'scroll') {
        // Прокручиваем к текущему символу
        const overflowBottom = rect.bottom - parentRect.bottom;
        const overflowTop = parentRect.top - rect.top;
        
        if (overflowBottom > 0) {
          textWrapper.scrollTop += overflowBottom + 24;
        } else if (overflowTop > 0) {
          textWrapper.scrollTop -= overflowTop + 24;
        }
      }
      // В режиме 'full' прокрутка не нужна - весь текст виден
    }
  }

  function computeElapsedSeconds() {
    if (!startedAt) return 0;
    return Math.max(0, (Date.now() - startedAt) / 1000);
  }

  function computeWpm(correctChars, elapsedSec) {
    if (elapsedSec <= 0) return 0;
    const words = correctChars / 5;
    return Math.max(0, Math.round((words / elapsedSec) * 60));
  }

  function computeAccuracy(correctChars, errors) {
    const total = correctChars + errors;
    if (total === 0) return 100;
    return Math.max(0, Math.round((correctChars / total) * 100));
  }

  function updateStats() {
    const elapsed = computeElapsedSeconds();
    const wpm = computeWpm(correctCount, elapsed);
    const acc = computeAccuracy(correctCount, errorCount);
    wpmEl.textContent = String(wpm);
    accEl.textContent = String(acc);
    errEl.textContent = String(errorCount);
  }

  // Добавляем новые константы для уровней и прогрессии
  const LEVELS = {
    1: { chars: 'фываолдже', name: 'Домашний ряд', minWpm: 10, maxErrors: 5 },
    2: { chars: 'йцукенгшщзхъ', name: 'Верхний ряд', minWpm: 20, maxErrors: 4 },
    3: { chars: 'ячсмитьбю,.', name: 'Нижний ряд', minWpm: 30, maxErrors: 3 },
    4: { chars: 'фываолджейцукенгшщзхъячсмитьбю', name: 'Смешанные комбинации', minWpm: 40, maxErrors: 2 },
    5: { chars: null, name: 'Полная клавиатура', minWpm: 50, maxErrors: 1 }
  };

  let currentLevel = 1;
  let totalLevelCompletions = 0;

  function checkLevelCompletion(wpm, errors) {
    const levelConfig = LEVELS[currentLevel];
    if (wpm >= levelConfig.minWpm && errors <= levelConfig.maxErrors) {
      totalLevelCompletions += 1;
      if (totalLevelCompletions >= 3) {  // Нужно 3 успешных прохождения для перехода
        currentLevel = Math.min(currentLevel + 1, Object.keys(LEVELS).length);
        totalLevelCompletions = 0;
        updateLevelUI();
      }
    }
  }

  function updateLevelUI() {
    const levelDisplay = document.getElementById('currentLevel');
    if (levelDisplay) {
      levelDisplay.textContent = `Уровень ${currentLevel}: ${LEVELS[currentLevel].name}`;
    }
  }

  // Модифицируем функцию finish для проверки уровня
  function finish() {
    if (finished) return;
    finished = true;
    clearInterval(timer); timer = null;
    input.blur();
    updateStats();
    
    const wpm = Number(wpmEl.textContent);
    const errors = Number(errEl.textContent);
    checkLevelCompletion(wpm, errors);
  }

  // Улучшенная функция генерации текста с возможностью прокрутки
  function generateScrollingText(chars, length) {
    return generateMeaningfulText(chars, length);
  }

  // Режим прокрутки текста
  let scrollMode = false;
  let scrollText = '';
  let scrollIndex = 0;

  function toggleScrollMode() {
    scrollMode = !scrollMode;
    if (scrollMode) {
      scrollText = generateScrollingText(currentChars, textLength);
      scrollIndex = 0;
      renderScrollingText();
    } else {
      renderText(scrollText);
    }
  }

  function renderScrollingText() {
    textContainer.innerHTML = '';
    const visibleLength = 30; // Количество видимых символов
    
    // Создаем видимую часть текста
    const visiblePart = scrollText.slice(scrollIndex, scrollIndex + visibleLength);
    const characters = visiblePart.split('').map(ch => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch;
      textContainer.appendChild(span);
      return span;
    });

    // Добавляем кнопку показа всего текста
    const showAllBtn = document.createElement('button');
    showAllBtn.textContent = 'Показать весь текст';
    showAllBtn.className = 'show-all-btn';
    showAllBtn.addEventListener('click', () => {
      renderText(scrollText);
      scrollMode = false;
    });
    textContainer.appendChild(showAllBtn);

    currentIndex = 0;
    markCurrent();
  }

  function advanceScrollText() {
    if (scrollMode && scrollIndex + 30 < scrollText.length) {
      scrollIndex += 1;
      renderScrollingText();
    }
  }

  // Модифицируем существующие функции
  function reset() {
    clearInterval(timer); timer = null;
    started = false; finished = false; startedAt = null;
    errorCount = 0; correctCount = 0; currentIndex = 0;
    timerEl.textContent = durationSec === 0 ? '∞' : String(durationSec);
    input.value = '';
    input.setAttribute('data-prev', '');
    
    let generatedText;
    if (currentChars === 'pairs') {
      generatedText = generateMeaningfulText('', textLength, 'pairs');
    } else if (currentChars === 'sentences') {
      generatedText = generateMeaningfulText('', textLength, 'sentences');
    } else if (currentChars.includes('-')) {
      // Обработка конкретных комбинаций букв с дефисами
      const combinations = currentChars.split('-');
      generatedText = generateCombinationText(combinations, textLength);
    } else {
      const levelChars = LEVELS[currentLevel].chars || 'фываолджейцукенгшщзхъячсмитьбю,.1234567890';
      generatedText = generateMeaningfulText(currentChars || levelChars, textLength);
    }
    
    renderText(generatedText);
    
    updateStats();
    updateLevelUI();
  }

  // Добавляем функцию генерации текста с парными комбинациями
  function generatePairText(chars, length) {
    const letters = String(chars).split('').filter(Boolean);
    const pairs = [];
    for (let i = 0; i < letters.length; i++) {
      for (let j = 0; j < letters.length; j++) {
        pairs.push(letters[i] + letters[j]);
      }
    }
    
    const buf = [];
    let nextSpaceAt = randInt(4, 8);
    for (let i = 0; i < length; i += 1) {
      if (i > 0 && i % nextSpaceAt === 0) {
        buf.push(' ');
        nextSpaceAt = randInt(4, 8);
      } else {
        buf.push(pairs[randInt(0, pairs.length - 1)]);
      }
    }
    return buf.join('');
  }

  // Функция для генерации текста с конкретными комбинациями букв
  function generateCombinationText(combinations, length) {
    const buf = [];
    let nextSpaceAt = randInt(4, 8);
    
    for (let i = 0; i < length; i += 1) {
      if (i > 0 && i % nextSpaceAt === 0) {
        buf.push(' ');
        nextSpaceAt = randInt(4, 8);
      } else {
        // Выбираем случайную комбинацию
        const combination = combinations[randInt(0, combinations.length - 1)];
        buf.push(combination);
      }
    }
    return buf.join('');
  }

  // Опциональный режим тренировки парных комбинаций
  function togglePairMode() {
    const pairModeCheckbox = document.getElementById('pairModeCheckbox');
    if (pairModeCheckbox && pairModeCheckbox.checked) {
      renderText(generatePairText(currentChars, textLength));
    } else {
      renderText(generateText(currentChars, textLength));
    }
  }

  function handleBackspace() {
    if (finished) return;
    if (currentIndex === 0) return;
    currentIndex -= 1;
    const span = characters[currentIndex];
    if (span.classList.contains('incorrect')) {
      span.classList.remove('incorrect');
      errorCount = Math.max(0, errorCount - 1);
    } else if (span.classList.contains('correct')) {
      span.classList.remove('correct');
      correctCount = Math.max(0, correctCount - 1);
    }
    markCurrent();
    updateStats();
  }

  function typeChar(ch) {
    if (finished) return;
    if (!started) startIfNeeded();
    if (!ch || ch.length !== 1) return;
    if (!characters[currentIndex]) return finish();

    const expected = characters[currentIndex].textContent;
    if (ch === expected) {
      characters[currentIndex].classList.add('correct');
      correctCount += 1;
    } else {
      characters[currentIndex].classList.add('incorrect');
      errorCount += 1;
    }
    currentIndex += 1;
    if (currentIndex >= characters.length) finish();
    markCurrent();
    updateStats();
  }

  // Events
  textWrapper.addEventListener('click', () => input.focus());
  startBtn.addEventListener('click', () => { input.focus(); startIfNeeded(); });
  restartBtn.addEventListener('click', reset);
  shareBtn.addEventListener('click', async () => {
    const elapsed = Math.round(computeElapsedSeconds());
    const wpm = wpmEl.textContent;
    const acc = accEl.textContent;
    const err = errEl.textContent;
    const pageUrl = window.location.href.split('#')[0];
    const text = `Тренажёр печати (рус): ${wpm} WPM, точность ${acc}%, ошибок ${err}, время ${elapsed}с.\n${pageUrl}`;
    try { await navigator.clipboard.writeText(text); shareBtn.textContent = 'Скопировано!'; setTimeout(()=>shareBtn.textContent='Скопировать результат',1500); } catch {}
  });

  input.addEventListener('input', (e) => {
    const before = e.target.getAttribute('data-prev') || '';
    const after = e.target.value;
    if (after.length < before.length) {
      handleBackspace();
      e.target.setAttribute('data-prev', after);
      return;
    }
    const newChar = after[after.length - 1];
    if (!started) {
      const expectedFirst = characters[currentIndex] ? characters[currentIndex].textContent : '';
      if (newChar !== expectedFirst) {
        e.target.value = before;
        return;
      }
    }
    typeChar(newChar);
    e.target.setAttribute('data-prev', after);
  });

  timeButtons.forEach(btn => btn.addEventListener('click', () => {
    timeButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    durationSec = Number(btn.getAttribute('data-time')) || 60;
    reset();
  }));

  lengthButtons.forEach(btn => btn.addEventListener('click', () => {
    lengthButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    textLength = Number(btn.getAttribute('data-length')) || 500;
    reset();
  }));

  setButtons.forEach(btn => btn.addEventListener('click', () => {
    setButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    currentChars = String(btn.getAttribute('data-chars') || currentChars);
    reset();
  }));

  applyCharsBtn.addEventListener('click', () => {
    const val = (customCharsInput.value || '').trim();
    if (!val) return;
    setButtons.forEach(b => b.classList.remove('is-active'));
    currentChars = val;
    reset();
  });

  // Добавляем обработчик для чекбокса режима парных комбинаций
  const pairModeCheckbox = document.getElementById('pairModeCheckbox');
  if (pairModeCheckbox) {
    pairModeCheckbox.addEventListener('change', () => {
      reset();  // Перегенерируем текст при изменении режима
    });
  }

  // Обработчики для новых элементов управления
  const symbolSelect = document.getElementById('symbolSelect');
  const customSymbolInput = document.getElementById('customSymbolInput');
  const customChars = document.getElementById('customChars');

  // Обработчик выбора символов
  symbolSelect.addEventListener('change', () => {
    const selectedValue = symbolSelect.value;
    
    if (selectedValue === 'custom') {
      customSymbolInput.style.display = 'flex';
      currentChars = '';
    } else if (selectedValue === 'pairs') {
      // Режим парных комбинаций
      customSymbolInput.style.display = 'none';
      currentChars = 'pairs';
      reset();
    } else if (selectedValue === 'sentences') {
      // Режим осмысленных предложений
      customSymbolInput.style.display = 'none';
      currentChars = 'sentences';
      reset();
    } else {
      customSymbolInput.style.display = 'none';
      currentChars = selectedValue;
      reset();
    }
  });

  // Обработчик ввода пользовательских символов
  customChars.addEventListener('input', () => {
    const val = customChars.value.trim();
    if (val) {
      currentChars = val;
      reset();
    }
  });

  // Обработчик изменения режима отображения
  const displayMode = document.getElementById('displayMode');
  if (displayMode) {
    displayMode.addEventListener('change', () => {
      const mode = displayMode.value;
      const textWrapper = document.getElementById('tWrapper');
      
      if (mode === 'full') {
        textWrapper.classList.add('full-mode');
      } else {
        textWrapper.classList.remove('full-mode');
      }
      
      // При изменении режима отображения обновляем прокрутку
      if (characters[currentIndex]) {
        markCurrent();
      }
    });
  }

  // Добавляем кнопку переключения режима прокрутки
  const scrollModeBtn = document.createElement('button');
  scrollModeBtn.textContent = 'Режим прокрутки';
  scrollModeBtn.className = 'scroll-mode-btn';
  scrollModeBtn.addEventListener('click', toggleScrollMode);
  
  // Находим контейнер для кнопок и добавляем новую кнопку
  const trainerActions = document.querySelector('.trainer-actions');
  if (trainerActions) {
    trainerActions.appendChild(scrollModeBtn);
  }

  // Инициализация текста при загрузке страницы
  function initializeText() {
    // Убираем ограничение по времени - делаем тренажер без времени
    durationSec = 0;
    timerEl.textContent = '∞';
    
    // Генерируем начальный текст
    let generatedText;
    if (currentChars === 'pairs') {
      generatedText = generateMeaningfulText('', textLength, 'pairs');
    } else if (currentChars === 'sentences') {
      generatedText = generateMeaningfulText('', textLength, 'sentences');
    } else if (currentChars.includes('-')) {
      // Обработка конкретных комбинаций букв с дефисами
      const combinations = currentChars.split('-');
      generatedText = generateCombinationText(combinations, textLength);
    } else {
      const levelChars = LEVELS[currentLevel].chars || 'фываолджейцукенгшщзхъячсмитьбю,.1234567890';
      generatedText = generateText(levelChars, textLength);
    }
    
    renderText(generatedText);
    
    // Обновляем UI
    updateStats();
    updateLevelUI();
  }

  // Вызываем инициализацию текста при загрузке
  document.addEventListener('DOMContentLoaded', initializeText);

  // Init - убираем вызов reset(), так как текст уже инициализирован
  // activate buttons per URL/default state (если они есть)
  const tBtn = timeButtons.find(b => Number(b.getAttribute('data-time')) === durationSec);
  const lBtn = lengthButtons.find(b => Number(b.getAttribute('data-length')) === textLength);
  if (tBtn) { timeButtons.forEach(b=>b.classList.remove('is-active')); tBtn.classList.add('is-active'); }
  if (lBtn) { lengthButtons.forEach(b=>b.classList.remove('is-active')); lBtn.classList.add('is-active'); }
})();


