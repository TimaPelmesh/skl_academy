// Typing Test — Desktop Logic
// High-clarity code: explicit names, early-returns, readable flow

(function initTypingTest() {
  const textWrapper = document.getElementById('textWrapper');
  const textContainer = document.getElementById('text');
  const hiddenInput = document.getElementById('hiddenInput');
  const appEl = document.querySelector('.app');

  const wpmEl = document.getElementById('wpm');
  const accEl = document.getElementById('accuracy');
  const errorsEl = document.getElementById('errors');
  const timerEl = document.getElementById('timer');

  const restartBtn = document.getElementById('restartBtn');
  const focusToggleBtn = document.getElementById('focusToggle');
  const restartFromModalBtn = document.getElementById('restartFromModal');
  const closeResultBtn = document.getElementById('closeResult');
  const copyResultBtn = document.getElementById('copyResult');
  const themeToggleBtn = document.getElementById('themeToggle');

  const timeButtons = Array.from(document.querySelectorAll('.segmented-btn[data-time]'));
  const timeGroup = document.querySelector('.time-group');
  const difficultyButtons = Array.from(document.querySelectorAll('.segmented-btn[data-difficulty]'));

  const resultModal = document.getElementById('resultModal');
  const resWpm = document.getElementById('resWpm');
  const resAccuracy = document.getElementById('resAccuracy');
  const resErrors = document.getElementById('resErrors');
  const resAverage = document.getElementById('resAverage');
  const chartCanvas = document.getElementById('wpmChart');

  // Predefined Russian quotes (can be extended or fetched)
  const quotes = [
    'Программирование - это искусство выражать решения в виде кода.',
    'Грамотность кода важнее его краткости: пишите так, чтобы вам хотелось читать через год.',
    'Опыт - это имя, которое каждый дает своим ошибкам.',
    'Чистый код - это код, который легко читать, понимать и изменять.',
    'Сложные задачи решаются по частям - маленькими шагами к цели.',
    'Оптимизация преждевременна - сначала сделайте, чтобы работало правильно.',
    'Надежность системы начинается с простоты её компонентов.',
    'Алгоритм - это точная последовательность шагов для достижения результата.',
    'Ошибки - лучший учитель разработчика: важно анализировать и исправлять их.',
    'Тесты - это страховка проекта и уверенность в изменениях.',
    'Называйте переменные так, чтобы смысл был очевиден - это экономит время всем.',
    'Микросервисы - это инструмент, а не цель: сначала подумайте о сложности.',
    'Профилирование производительности - важнее преждевременной оптимизации.',
    'Документация - часть продукта, а не побочный артефакт.',
    'Ревью кода - лучший способ распространять знания внутри команды.',
    'Понятные интерфейсы - фундамент масштабируемой архитектуры.',
    'Автоматизация - ваш друг, когда задачи повторяются.',
    'Состояние системы должно быть явным - скрытая магия ломает предсказуемость.',
    'Логирование - источник правды, когда что-то идет не так.',
    'Чем проще решение - тем надежнее его поддержка.',
    'Версионирование схем данных - ключ к безопасным миграциям.',
    'Кэш - это ускорение, но он приносит свою сложность.',
    'Идемпотентность - важное свойство надежных сервисов.',
    'Консистентность, доступность и устойчивость к разделению - сделайте осознанный выбор.',
    'Производительность - это компромисс между временем, памятью и сложностью.',
    'Код читают чаще, чем пишут - это главный аргумент за чистую архитектуру.',
    'Архитектура - это не диаграмма, а набор осознанных ограничений.',
    'Измеряйте - без метрик вы делаете выводы вслепую.',
    'Инкапсуляция - защита от случайной сложности и ошибок.',
    'Согласованность кода в проекте - ускоритель для всей команды.',
    'Если задачу сложно протестировать - возможно, её стоит разделить.',
    'Итеративная разработка - путь к устойчивому прогрессу.',
    'Технический долг - не враг, если вы управляете им прозрачно.',
    'Выбирайте инструменты под задачу - не наоборот.',
  ];

  // Difficulty helpers
  function classifyQuote(q) {
    const len = q.length;
    const punctuation = (q.match(/[,:;()]/g) || []).length;
    if (len <= 90 && punctuation <= 1) return 'easy';
    if (len >= 180 || punctuation >= 3) return 'hard';
    return 'medium';
  }

  function getQuotesByDifficulty(level) {
    return quotes.filter(q => classifyQuote(q) === level);
  }

  // State
  let targetText = '';
  let characters = [];
  let currentIndex = 0;
  let startedAt = null;
  let started = false;
  let timer = null;
  let mode = 'time'; // единственный режим
  let durationSec = 60; // default for time mode
  let remaining = durationSec;
  let errorCount = 0;
  let correctCount = 0;
  let finished = false;
  let difficulty = 'medium'; // 'easy' | 'medium' | 'hard'
  let wpmSamples = []; // [{tSec, wpm}]

  // Utilities
  function normalizeDashes(s) {
    // Replace em dash, en dash, non-breaking hyphen, minus sign with simple hyphen '-'
    return s.replace(/[–—‑−]/g, '-');
  }
  function normalizeForUniq(s) {
    return normalizeDashes(String(s)).replace(/\s+/g, ' ').trim().toLowerCase();
  }
  function getSelectedTime() {
    const active = timeButtons.find(b => b.classList.contains('is-active'));
    if (!active) return 60;
    const val = active.dataset.time;
    return val === 'none' ? null : Number(val);
  }

  // режим переключать не нужно — только по времени

  // Focus (minimal) mode
  function setFocusMode(enabled) {
    if (enabled) {
      appEl.setAttribute('data-focus', 'true');
    } else {
      appEl.removeAttribute('data-focus');
    }
    if (focusToggleBtn) focusToggleBtn.setAttribute('aria-pressed', String(Boolean(enabled)));
  }
  function toggleFocusMode() {
    const isOn = appEl.getAttribute('data-focus') === 'true';
    setFocusMode(!isOn);
  }

  function setTime(newTimeRaw) {
    timeButtons.forEach(b => b.classList.toggle('is-active', b.dataset.time === String(newTimeRaw)));
    if (String(newTimeRaw) === 'none') {
      durationSec = null;
    } else {
      durationSec = Number(newTimeRaw);
    }
    restartTest();
  }

  function setDifficulty(newLevel) {
    difficulty = newLevel;
    difficultyButtons.forEach(b => b.classList.toggle('is-active', b.dataset.difficulty === newLevel));
    restartTest();
  }

  function pickQuote() {
    const pool = getQuotesByDifficulty(difficulty);
    const i = Math.floor(Math.random() * pool.length);
    return pool[i] || quotes[Math.floor(Math.random() * quotes.length)];
  }

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildCompositeText(minLen, level) {
    const primary = getQuotesByDifficulty(level);
    const allUnique = [];
    const seen = new Set();
    // Add primary first
    primary.forEach(q => { const key = normalizeForUniq(q); if (!seen.has(key)) { seen.add(key); allUnique.push(q); } });
    // Then add the rest to ensure enough length
    quotes.forEach(q => { const key = normalizeForUniq(q); if (!seen.has(key)) { seen.add(key); allUnique.push(q); } });
    const randomized = shuffleArray(allUnique);
    let buf = '';
    for (const q of randomized) {
      if (buf.length >= minLen) break;
      buf += (buf ? ' ' : '') + q;
    }
    return buf;
  }

  function renderText(text) {
    textContainer.innerHTML = '';
    const normalized = normalizeDashes(text);
    characters = normalized.split('').map((ch, i) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch;
      textContainer.appendChild(span);
      return span;
    });
    currentIndex = 0;
    markCurrentChar();
  }

  function markCurrentChar() {
    characters.forEach(c => c.classList.remove('current'));
    if (characters[currentIndex]) characters[currentIndex].classList.add('current');
    // Keep caret roughly in view
    if (characters[currentIndex]) {
      const rect = characters[currentIndex].getBoundingClientRect();
      const parentRect = textWrapper.getBoundingClientRect();
      const overflowBottom = rect.bottom - parentRect.bottom;
      if (overflowBottom > 0) {
        textWrapper.scrollTop += overflowBottom + 24; // gentle scroll
      }
    }
  }

  function resetStats() {
    errorCount = 0; correctCount = 0; finished = false; startedAt = null;
    remaining = durationSec;
    timerEl.textContent = durationSec == null ? '0' : String(remaining);
    updateLiveStats();
    wpmSamples = [];
  }

  function updateLiveStats() {
    const elapsedSec = computeElapsedSeconds();
    const grossWpm = computeWpm(correctCount, elapsedSec);
    const accuracy = computeAccuracy(correctCount, errorCount);
    wpmEl.textContent = String(grossWpm);
    accEl.textContent = String(accuracy);
    errorsEl.textContent = String(errorCount);
  }

  function computeElapsedSeconds() {
    if (!startedAt) return 0;
    return Math.max(0, (Date.now() - startedAt) / 1000);
  }

  function computeWpm(correctChars, elapsedSec) {
    if (elapsedSec <= 0) return 0;
    const words = correctChars / 5; // WPM convention
    return Math.max(0, Math.round((words / elapsedSec) * 60));
  }

  function computeAccuracy(correctChars, errors) {
    const total = correctChars + errors;
    if (total === 0) return 100;
    return Math.max(0, Math.round((correctChars / total) * 100));
  }

  function startTimerIfNeeded() {
    if (startedAt) return;
    startedAt = Date.now();
    if (mode === 'time') {
      timer = setInterval(() => {
        // sample WPM once per second
        const elapsedSec = computeElapsedSeconds();
        const grossWpm = computeWpm(correctCount, elapsedSec);
        wpmSamples.push({ tSec: Math.round(elapsedSec), wpm: grossWpm });
        if (durationSec == null) {
          // unlimited: count up time
          timerEl.textContent = String(Math.round(elapsedSec));
        } else {
          // limited: count down
          remaining -= 1;
          timerEl.textContent = String(Math.max(0, remaining));
          if (remaining <= 0) return finishTest();
        }
        updateLiveStats();
      }, 1000);
    }
  }

  function startTest() {
    if (started) return;
    started = true;
    hiddenInput.focus();
    startTimerIfNeeded();
  }

  function finishTest() {
    if (finished) return;
    finished = true;
    hiddenInput.blur();
    clearInterval(timer);
    timer = null;
    started = false;

    const elapsedSec = computeElapsedSeconds() || (durationSec ?? 0);
    const currentWpm = computeWpm(correctCount, elapsedSec);
    const sampleMax = wpmSamples.length ? Math.max(...wpmSamples.map(s => s.wpm)) : currentWpm;
    const wpm = Math.max(currentWpm, sampleMax);
    const accuracy = computeAccuracy(correctCount, errorCount);
    const avg = computeAverageWpmSamples(wpmSamples, correctCount, elapsedSec);

    // Fill modal
    resWpm.textContent = `${wpm} WPM`;
    resAccuracy.textContent = `${accuracy}%`;
    resErrors.textContent = `${errorCount}`;
    resAverage.textContent = `${avg} WPM`;

    resultModal.classList.add('active');
    resultModal.setAttribute('aria-hidden', 'false');

    // Draw chart
    drawWpmChart();

    // nothing to reset for start button — it was removed
  }

  function restartTest() {
    clearInterval(timer); timer = null;
    hiddenInput.value = '';
    hiddenInput.setAttribute('data-prev', '');
    // Setup text per mode
    if (mode === 'time') {
      // build a composite text from random quotes until long enough
      const minLen = (function getMinLengthForDifficulty(level) {
        if (level === 'easy') return 300;   // короче и проще
        if (level === 'hard') return 900;   // длиннее и требовательнее
        return 600;                         // средняя длина
      })(difficulty);
      let buf = buildCompositeText(minLen, difficulty);
      targetText = normalizeDashes(buf);
      durationSec = getSelectedTime();
      timerEl.textContent = durationSec == null ? '0' : String(durationSec);
    }
    renderText(targetText);
    resetStats();
  }

  function handleInput(valueBefore, valueAfter) {
    // Determine action by comparing strings
    if (valueAfter.length < valueBefore.length) {
      // Backspace
      handleBackspace();
      return valueAfter;
    }
    const newChar = valueAfter[valueAfter.length - 1];
    // Before start: require the first typed char to be correct
    if (!started) {
      const expectedChar = characters[currentIndex] ? characters[currentIndex].textContent : '';
      const expectedNorm = normalizeDashes(expectedChar);
      const typedNorm = normalizeDashes(newChar);
      if (typedNorm !== expectedNorm) {
        // revert input change so мусор не накапливается
        hiddenInput.value = valueBefore;
        return valueBefore;
      }
      startTest();
    }
    typeChar(newChar);
    return valueAfter;
  }

  function handleBackspace() {
    if (finished) return;
    if (currentIndex === 0) return;
    // If previous char was incorrect or correct, revert
    currentIndex -= 1;
    const span = characters[currentIndex];
    if (span.classList.contains('incorrect')) {
      span.classList.remove('incorrect');
      errorCount = Math.max(0, errorCount - 1);
    } else if (span.classList.contains('correct')) {
      span.classList.remove('correct');
      correctCount = Math.max(0, correctCount - 1);
    }
    markCurrentChar();
    updateLiveStats();
  }

  function typeChar(ch) {
    if (finished) return;
    if (!started) startTest();
    // Ignore non-printable
    if (!ch || ch.length !== 1) return;
    if (!characters[currentIndex]) return finishTest();

    const expected = characters[currentIndex].textContent;
    const expectedNorm = normalizeDashes(expected);
    const typedNorm = normalizeDashes(ch);
    if (typedNorm === expectedNorm) {
      characters[currentIndex].classList.add('correct');
      correctCount += 1;
    } else {
      characters[currentIndex].classList.add('incorrect');
      errorCount += 1;
    }
    currentIndex += 1;
    markCurrentChar();
    updateLiveStats();

    // текст может закончиться раньше таймера — завершаем
    if (currentIndex >= characters.length) finishTest();
  }

  function computeAverageWpmSamples(samples, correctChars, elapsedSec) {
    if (samples && samples.length > 2) {
      const values = samples.map(s => s.wpm).filter(v => Number.isFinite(v));
      if (values.length) {
        const sum = values.reduce((a,b)=>a+b,0);
        return Math.round(sum / values.length);
      }
    }
    // fallback to classic average from correct chars
    return computeWpm(correctChars, elapsedSec);
  }

  function drawWpmChart() {
    if (!chartCanvas) return;
    const ctx = chartCanvas.getContext('2d');
    const width = chartCanvas.width = chartCanvas.clientWidth || 680;
    const height = chartCanvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 12, right: 12, bottom: 22, left: 34 };
    const innerW = width - padding.left - padding.right;
    const innerH = height - padding.top - padding.bottom;

    const points = (wpmSamples.length ? wpmSamples : [{tSec:0,wpm:0}]);
    const maxX = Math.max(...points.map(p=>p.tSec), 1);
    const maxY = Math.max(...points.map(p=>p.wpm), 10);

    function xScale(t){ return padding.left + (t / maxX) * innerW; }
    function yScale(v){ return padding.top + innerH - (v / maxY) * innerH; }

    // grid
    ctx.strokeStyle = 'rgba(255,255,255,.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i=0;i<=4;i++) {
      const y = padding.top + (innerH/4)*i;
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
    }
    ctx.stroke();

    // axis labels
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px Inter, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i=0;i<=4;i++) {
      const val = Math.round((maxY/4)*(4-i));
      const y = padding.top + (innerH/4)*i;
      ctx.fillText(String(val), padding.left - 6, y);
    }

    // line
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    points.forEach((p, idx) => {
      const x = xScale(p.tSec);
      const y = yScale(p.wpm);
      if (idx === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // fill under line
    const last = points[points.length-1];
    ctx.lineTo(xScale(last.tSec), yScale(0));
    ctx.lineTo(xScale(points[0].tSec), yScale(0));
    ctx.closePath();
    ctx.fillStyle = 'rgba(99,102,241,.12)';
    ctx.fill();
  }

  // Events
  textWrapper.addEventListener('click', () => { hiddenInput.focus(); });
  document.addEventListener('keydown', (e) => {
    // Focus shortcut
    if (e.key === 'Tab') {
      e.preventDefault();
      hiddenInput.focus();
    }
    // Enter больше не запускает — старт по первому вводу символа
    // Restart shortcut
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'r') {
      e.preventDefault();
      restartTest();
    }
    // Toggle focus mode
    if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFocusMode();
    }
    // Exit focus on Escape
    if (e.key === 'Escape' && appEl.getAttribute('data-focus') === 'true') {
      e.preventDefault();
      setFocusMode(false);
    }
  });

  hiddenInput.addEventListener('beforeinput', (e) => {
    // Prevent IME composition artifacts; we handle text ourselves
    // Allow only insertText and deleteContentBackward
    if (!['insertText', 'deleteContentBackward'].includes(e.inputType)) return;
  });

  hiddenInput.addEventListener('input', (e) => {
    const before = e.target.getAttribute('data-prev') || '';
    const after = e.target.value;
    const newPrev = handleInput(before, after);
    e.target.setAttribute('data-prev', newPrev);
  });

  restartBtn.addEventListener('click', restartTest);
  if (focusToggleBtn) focusToggleBtn.addEventListener('click', toggleFocusMode);
  restartFromModalBtn.addEventListener('click', () => { resultModal.classList.remove('active'); restartTest(); });
  closeResultBtn.addEventListener('click', () => resultModal.classList.remove('active'));

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const next = isLight ? null : 'light';
    if (next) {
      document.documentElement.setAttribute('data-theme', next);
      themeToggleBtn.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.setAttribute('aria-pressed', 'false');
    }
    try { localStorage.setItem('skl-theme', next || 'dark'); } catch {}
  });

  copyResultBtn.addEventListener('click', async () => {
    const pageUrl = 'https://skl-academy.ru/typing-test/';
    const invitation = `Попробуй пройти этот тест скорости печати: ${pageUrl}`;
    const totalSec = Math.round(computeElapsedSeconds() || (durationSec ?? 0));
    const text = `Максимальная: ${resWpm.textContent}, средняя: ${resAverage.textContent}, точность: ${resAccuracy.textContent}, ошибок: ${resErrors.textContent}, время: ${totalSec}с.\n${invitation}`;
    try { await navigator.clipboard.writeText(text); copyResultBtn.textContent = 'Скопировано!'; setTimeout(()=>copyResultBtn.textContent='Скопировать',1500); }
    catch { /* ignore */ }
  });

  timeButtons.forEach(btn => btn.addEventListener('click', () => setTime(Number(btn.dataset.time))));
  difficultyButtons.forEach(btn => btn.addEventListener('click', () => setDifficulty(btn.dataset.difficulty)));

  // выбор текста и селекты удалены

  // Init
  // Theme init
  (function initTheme() {
    try {
      const saved = localStorage.getItem('skl-theme');
      if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggleBtn) themeToggleBtn.setAttribute('aria-pressed', 'true');
      }
    } catch {}
  })();

  restartTest();
})();


