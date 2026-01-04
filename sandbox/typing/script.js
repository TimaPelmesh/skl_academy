// Словарь реальных слов для каждого ряда клавиатуры (только из разрешенных букв)
const wordDictionary = {
  // Базовый ряд левой руки (ФЫВА) - только эти 4 буквы: ф, ы, в, а
  'фыва': ['фыва', 'ваф', 'фыв', 'авы', 'ыва', 'ваф', 'фыв', 'авы', 'ыва', 'фыва', 'ваф', 'фыв', 'авы', 'ыва'],
  // Базовый ряд правой руки (ОЛДЖ) - только эти 4 буквы: о, л, д, ж
  'олдж': ['долг', 'ложь', 'ложа', 'долг', 'ложь', 'ложа', 'долг', 'ложь', 'ложа', 'долг', 'ложь', 'ложа'],
  // Базовый ряд полный (ФЫВАОЛДЖ) - все 8 букв: ф, ы, в, а, о, л, д, ж
  'фываолдж': ['вафля', 'долг', 'ложь', 'долго', 'вафли', 'ложа', 'долги', 'ваф', 'ложь', 'долг', 'вафля', 'ложа', 'долго', 'ложа'],
  // Верхний ряд левой руки (ЙЦУК) - только эти 4 буквы: й, ц, у, к
  'йцук': ['йцук', 'куц', 'йцу', 'цук', 'куц', 'йцу', 'цук', 'куц', 'йцук', 'куц', 'йцу', 'цук'],
  // Верхний ряд правой руки (ЕНГШ) - только эти 4 буквы: е, н, г, ш
  'енгш': ['шнек', 'шнеки', 'енг', 'нгш', 'шнек', 'шнеки', 'енг', 'нгш', 'шнек', 'шнеки', 'енг', 'нгш'],
  // Верхний ряд полный (ЙЦУКЕНГШ) - все 8 букв
  'йцукенгш': ['куцый', 'шнек', 'шнеки', 'йцу', 'шнек', 'куц', 'шнеки', 'цук', 'шнек', 'куцый'],
  // Нижний ряд левой руки (ЯЧСМ) - только эти 4 буквы: я, ч, с, м
  'ячсм': ['часы', 'часов', 'ячс', 'чсм', 'часы', 'часов', 'ячс', 'чсм', 'часы', 'часов', 'ячс', 'чсм'],
  // Нижний ряд правой руки (ИТЬБ) - только эти 4 буквы: и, т, ь, б
  'итьб': ['бить', 'битье', 'ить', 'тьб', 'бить', 'битье', 'ить', 'тьб', 'бить', 'битье', 'ить', 'тьб'],
  // Нижний ряд полный (ЯЧСМИТЬБ) - все 8 букв
  'ячсмитьб': ['часы', 'бить', 'битье', 'ячс', 'бить', 'часов', 'битье', 'чсм', 'бить', 'часы'],
  // Все ряды
  'все': ['вафля', 'долг', 'куцый', 'шнек', 'часы', 'бить', 'ложь', 'шнеки', 'часов', 'битье', 'долго', 'ложа', 'интернет']
};

// Функция для проверки, что слово содержит только разрешенные буквы
function wordContainsOnlyLetters(word, allowedLetters) {
  const allowedSet = new Set(allowedLetters);
  for (const char of word.toLowerCase()) {
    if (!allowedSet.has(char)) {
      return false;
    }
  }
  return true;
}

// Функция для генерации связных слов из букв
function generateVariedText(letters, targetLength = 250) {
  if (letters.length === 0) return '';
  
  // Определяем, какие слова использовать на основе букв
  let availableWords = [];
  const letterSet = new Set(letters);
  
  // Базовый ряд левой руки (ФЫВА)
  if (letterSet.has('ф') && letterSet.has('ы') && letterSet.has('в') && letterSet.has('а') && letters.length === 4) {
    availableWords = wordDictionary['фыва'];
  }
  // Базовый ряд правой руки (ОЛДЖ)
  else if (letterSet.has('о') && letterSet.has('л') && letterSet.has('д') && letterSet.has('ж') && letters.length === 4) {
    availableWords = wordDictionary['олдж'];
  }
  // Базовый ряд полный
  else if (letterSet.has('ф') && letterSet.has('ы') && letterSet.has('в') && letterSet.has('а') && 
           letterSet.has('о') && letterSet.has('л') && letterSet.has('д') && letterSet.has('ж') && letters.length === 8) {
    availableWords = wordDictionary['фываолдж'];
  }
  // Верхний ряд левой руки (ЙЦУК)
  else if (letterSet.has('й') && letterSet.has('ц') && letterSet.has('у') && letterSet.has('к') && letters.length === 4) {
    availableWords = wordDictionary['йцук'];
  }
  // Верхний ряд правой руки (ЕНГШ)
  else if (letterSet.has('е') && letterSet.has('н') && letterSet.has('г') && letterSet.has('ш') && letters.length === 4) {
    availableWords = wordDictionary['енгш'];
  }
  // Верхний ряд полный
  else if (letterSet.has('й') && letterSet.has('ц') && letterSet.has('у') && letterSet.has('к') && 
           letterSet.has('е') && letterSet.has('н') && letterSet.has('г') && letterSet.has('ш') && letters.length === 8) {
    availableWords = wordDictionary['йцукенгш'];
  }
  // Нижний ряд левой руки (ЯЧСМ)
  else if (letterSet.has('я') && letterSet.has('ч') && letterSet.has('с') && letterSet.has('м') && letters.length === 4) {
    availableWords = wordDictionary['ячсм'];
  }
  // Нижний ряд правой руки (ИТЬБ)
  else if (letterSet.has('и') && letterSet.has('т') && letterSet.has('ь') && letterSet.has('б') && letters.length === 4) {
    availableWords = wordDictionary['итьб'];
  }
  // Нижний ряд полный
  else if (letterSet.has('я') && letterSet.has('ч') && letterSet.has('с') && letterSet.has('м') && 
           letterSet.has('и') && letterSet.has('т') && letterSet.has('ь') && letterSet.has('б') && letters.length === 8) {
    availableWords = wordDictionary['ячсмитьб'];
  }
  // Все ряды
  else if (letters.length >= 20) {
    availableWords = wordDictionary['все'];
  }
  
  // Фильтруем слова, оставляя только те, что содержат ТОЛЬКО разрешенные буквы
  let filteredWords = [];
  if (availableWords.length > 0) {
    filteredWords = availableWords.filter(word => wordContainsOnlyLetters(word, letters));
  }
  
  // Если не нашли подходящих слов, генерируем простые слова из букв
  if (filteredWords.length === 0) {
    availableWords = generateSimpleWords(letters);
  } else {
    availableWords = filteredWords;
  }
  
  // Если после фильтрации все еще нет слов, генерируем простые слова
  if (availableWords.length === 0) {
    availableWords = generateSimpleWords(letters);
  }
  
  // Если и после этого нет слов, создаем простые комбинации напрямую
  if (availableWords.length === 0) {
    for (let i = 0; i < 20; i++) {
      let word = '';
      const wordLength = Math.floor(Math.random() * 3) + 2; // 2-4 буквы
      for (let j = 0; j < wordLength; j++) {
        word += letters[Math.floor(Math.random() * letters.length)];
      }
      availableWords.push(word);
    }
  }
  
  const words = [];
  let currentLength = 0;
  let wordIndex = 0;
  let attempts = 0;
  const maxAttempts = Math.max(availableWords.length * 10, 100); // Защита от бесконечного цикла
  
  // Перемешиваем слова для разнообразия
  const shuffledWords = [...availableWords].sort(() => Math.random() - 0.5);
  
  while (currentLength < targetLength && attempts < maxAttempts && shuffledWords.length > 0) {
    attempts++;
    const word = shuffledWords[wordIndex % shuffledWords.length];
    // Дополнительная проверка перед добавлением
    if (!wordContainsOnlyLetters(word, letters)) {
      wordIndex++;
      if (wordIndex >= shuffledWords.length) wordIndex = 0;
      continue;
    }
    
    const wordWithSpace = words.length > 0 ? ' ' + word : word;
    
    if (currentLength + wordWithSpace.length > targetLength) {
      break;
    }
    
    words.push(word);
    currentLength += wordWithSpace.length;
    wordIndex++;
    if (wordIndex >= shuffledWords.length) wordIndex = 0;
  }
  
  // Если не удалось сгенерировать текст, возвращаем хотя бы одно слово или комбинацию букв
  if (words.length === 0) {
    if (availableWords.length > 0) {
      words.push(availableWords[0]);
    } else {
      // Создаем простую комбинацию из букв
      const simpleWord = letters.slice(0, Math.min(4, letters.length)).join('');
      words.push(simpleWord);
    }
  }
  
  return words.join(' ');
}

// Генерация простых слов из букв, если нет готовых
function generateSimpleWords(letters) {
  const commonWords = [];
  const letterSet = new Set(letters);
  
  // Для базового ряда левой руки (только ФЫВА)
  if (letterSet.has('ф') && letterSet.has('ы') && letterSet.has('в') && letterSet.has('а') && letters.length === 4) {
    commonWords.push('фыва', 'ваф', 'фыв', 'авы', 'ыва');
  }
  // Для базового ряда правой руки (только ОЛДЖ)
  else if (letterSet.has('о') && letterSet.has('л') && letterSet.has('д') && letterSet.has('ж') && letters.length === 4) {
    commonWords.push('долг', 'ложь', 'ложа');
  }
  // Для верхнего ряда левой руки (только ЙЦУК)
  else if (letterSet.has('й') && letterSet.has('ц') && letterSet.has('у') && letterSet.has('к') && letters.length === 4) {
    commonWords.push('йцук', 'куц', 'йцу', 'цук');
  }
  // Для верхнего ряда правой руки (только ЕНГШ)
  else if (letterSet.has('е') && letterSet.has('н') && letterSet.has('г') && letterSet.has('ш') && letters.length === 4) {
    commonWords.push('шнек', 'шнеки', 'енг', 'нгш');
  }
  // Для нижнего ряда левой руки (только ЯЧСМ)
  else if (letterSet.has('я') && letterSet.has('ч') && letterSet.has('с') && letterSet.has('м') && letters.length === 4) {
    commonWords.push('часы', 'часов', 'ячс', 'чсм');
  }
  // Для нижнего ряда правой руки (только ИТЬБ)
  else if (letterSet.has('и') && letterSet.has('т') && letterSet.has('ь') && letterSet.has('б') && letters.length === 4) {
    commonWords.push('бить', 'битье', 'ить', 'тьб');
  }
  
  // Если ничего не нашли, создаем простые комбинации ТОЛЬКО из разрешенных букв
  if (commonWords.length === 0) {
    for (let i = 0; i < 15; i++) {
      let word = '';
      const wordLength = Math.floor(Math.random() * 3) + 2; // 2-4 буквы
      for (let j = 0; j < wordLength; j++) {
        word += letters[Math.floor(Math.random() * letters.length)];
      }
      commonWords.push(word);
    }
  }
  
  // Фильтруем, чтобы все слова содержали только разрешенные буквы
  const filtered = commonWords.filter(word => wordContainsOnlyLetters(word, letters));
  
  // Если после фильтрации нет слов, создаем простые комбинации
  if (filtered.length === 0) {
    for (let i = 0; i < 15; i++) {
      let word = '';
      const wordLength = Math.floor(Math.random() * 3) + 2; // 2-4 буквы
      for (let j = 0; j < wordLength; j++) {
        word += letters[Math.floor(Math.random() * letters.length)];
      }
      filtered.push(word);
    }
  }
  
  return filtered;
}

// Функция для генерации текста из готовых слов (для продвинутых уроков)
function generateTextFromWords(wordList, targetLength = 300) {
  let result = [];
  let currentLength = 0;
  let usedIndices = new Set();
  let sentenceStart = true;
  let sentenceLength = 0;
  let maxSentenceLength = 8 + Math.floor(Math.random() * 5); // 8-12 слов в предложении
  
  while (currentLength < targetLength) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * wordList.length);
    } while (usedIndices.size < wordList.length && usedIndices.has(randomIndex));
    
    usedIndices.add(randomIndex);
    if (usedIndices.size >= wordList.length) {
      usedIndices.clear();
    }
    
    let word = wordList[randomIndex];
    
    // Делаем первую букву заглавной в начале предложения
    if (sentenceStart) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
      sentenceStart = false;
    }
    
    const wordWithSpace = result.length > 0 ? ' ' + word : word;
    
    if (currentLength + wordWithSpace.length > targetLength) {
      // Добавляем точку в конце, если её нет
      if (result.length > 0 && !result[result.length - 1].endsWith('.')) {
        result[result.length - 1] += '.';
      }
      break;
    }
    
    result.push(word);
    currentLength += wordWithSpace.length;
    sentenceLength++;
    
    // Завершаем предложение
    if (sentenceLength >= maxSentenceLength) {
      result[result.length - 1] += '.';
      currentLength += 1; // точка
      sentenceStart = true;
      sentenceLength = 0;
      maxSentenceLength = 8 + Math.floor(Math.random() * 5); // новое случайное значение для следующего предложения
    }
  }
  
  // Убеждаемся, что последнее предложение заканчивается точкой
  if (result.length > 0 && !result[result.length - 1].endsWith('.')) {
    result[result.length - 1] += '.';
  }
  
  return result.join(' ');
}

// Уроки для обучения слепой печати
const lessons = [
  {
    id: 1,
    name: 'Урок 1: Базовый ряд (ФЫВА)',
    description: 'Изучите базовый ряд левой руки: Ф, Ы, В, А',
    text: generateVariedText(['ф', 'ы', 'в', 'а'], 250),
    keys: ['ф', 'ы', 'в', 'а']
  },
  {
    id: 2,
    name: 'Урок 2: Базовый ряд (ОЛДЖ)',
    description: 'Изучите базовый ряд правой руки: О, Л, Д, Ж',
    text: generateVariedText(['о', 'л', 'д', 'ж'], 250),
    keys: ['о', 'л', 'д', 'ж']
  },
  {
    id: 3,
    name: 'Урок 3: Базовый ряд (полный)',
    description: 'Объедините оба базовых ряда',
    text: generateVariedText(['ф', 'ы', 'в', 'а', 'о', 'л', 'д', 'ж'], 280),
    keys: ['ф', 'ы', 'в', 'а', 'о', 'л', 'д', 'ж']
  },
  {
    id: 4,
    name: 'Урок 4: Верхний ряд (ЙЦУК)',
    description: 'Изучите верхний ряд левой руки: Й, Ц, У, К',
    text: generateVariedText(['й', 'ц', 'у', 'к'], 250),
    keys: ['й', 'ц', 'у', 'к']
  },
  {
    id: 5,
    name: 'Урок 5: Верхний ряд (ЕНГШ)',
    description: 'Изучите верхний ряд правой руки: Е, Н, Г, Ш',
    text: generateVariedText(['е', 'н', 'г', 'ш'], 250),
    keys: ['е', 'н', 'г', 'ш']
  },
  {
    id: 6,
    name: 'Урок 6: Верхний ряд (полный)',
    description: 'Объедините оба верхних ряда',
    text: generateVariedText(['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш'], 280),
    keys: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш']
  },
  {
    id: 7,
    name: 'Урок 7: Нижний ряд (ЯЧСМ)',
    description: 'Изучите нижний ряд левой руки: Я, Ч, С, М',
    text: generateVariedText(['я', 'ч', 'с', 'м'], 250),
    keys: ['я', 'ч', 'с', 'м']
  },
  {
    id: 8,
    name: 'Урок 8: Нижний ряд (ИТЬБ)',
    description: 'Изучите нижний ряд правой руки: И, Т, Ь, Б',
    text: generateVariedText(['и', 'т', 'ь', 'б'], 250),
    keys: ['и', 'т', 'ь', 'б']
  },
  {
    id: 9,
    name: 'Урок 9: Нижний ряд (полный)',
    description: 'Объедините оба нижних ряда',
    text: generateVariedText(['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б'], 280),
    keys: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б']
  },
  {
    id: 10,
    name: 'Урок 10: Все ряды',
    description: 'Объедините все три ряда',
    text: generateVariedText(['ф', 'ы', 'в', 'а', 'о', 'л', 'д', 'ж', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б'], 320),
    keys: ['ф', 'ы', 'в', 'а', 'о', 'л', 'д', 'ж', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б']
  },
  {
    id: 11,
    name: 'Урок 11: Цифры',
    description: 'Изучите цифры: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0',
    text: generateVariedText(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'], 280),
    keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
  },
  {
    id: 12,
    name: 'Урок 12: Простые слова',
    description: 'Практика на простых словах',
    text: generateTextFromWords(['мама', 'папа', 'дом', 'сад', 'кот', 'собака', 'книга', 'стол', 'стул', 'окно', 'дверь', 'комната', 'кухня', 'спальня', 'окно', 'пол', 'стена', 'крыша', 'окно', 'двор', 'дерево', 'цветок', 'трава', 'небо'], 300),
    keys: []
  },
  {
    id: 13,
    name: 'Урок 13: Предложения',
    description: 'Практика на предложениях',
    text: generateTextFromWords(['мама', 'мыла', 'раму', 'папа', 'читал', 'книгу', 'кот', 'спал', 'на', 'стуле', 'дети', 'играли', 'во', 'дворе', 'солнце', 'светило', 'ярко', 'птицы', 'пели', 'в', 'саду', 'книга', 'лежала', 'на', 'столе', 'вода', 'текла', 'в', 'реке', 'мальчик', 'бежал', 'по', 'дороге', 'девочка', 'читала', 'сказку'], 350),
    keys: []
  },
  {
    id: 14,
    name: 'Урок 14: Текст',
    description: 'Практика на связном тексте',
    text: generateTextFromWords(['в', 'саду', 'растут', 'яблони', 'и', 'груши', 'дети', 'играют', 'на', 'траве', 'солнце', 'светит', 'ярко', 'птицы', 'поют', 'красивые', 'песни', 'мама', 'готовит', 'обед', 'на', 'кухне', 'папа', 'читает', 'газету', 'в', 'гостиной', 'бабушка', 'вяжет', 'теплый', 'шарф', 'дедушка', 'поливает', 'цветы', 'в', 'саду', 'собака', 'бегает', 'по', 'двору', 'кот', 'лежит', 'на', 'крыше'], 400),
    keys: []
  },
  {
    id: 15,
    name: 'Урок 15: Сложный текст',
    description: 'Практика на сложном тексте',
    text: generateTextFromWords(['программирование', 'это', 'искусство', 'создания', 'программ', 'разработчики', 'пишут', 'код', 'на', 'разных', 'языках', 'каждый', 'язык', 'имеет', 'свои', 'особенности', 'и', 'применение', 'современные', 'технологии', 'позволяют', 'создавать', 'сложные', 'приложения', 'алгоритмы', 'помогают', 'решать', 'различные', 'задачи', 'базы', 'данных', 'хранят', 'информацию', 'сети', 'соединяют', 'компьютеры', 'по', 'всему', 'миру', 'интернет', 'объединяет', 'миллионы', 'пользователей', 'каждый', 'день'], 450),
    keys: []
  }
];

// Раскладка клавиатуры (русская)
const keyboardLayout = [
  { keys: ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ'], startOffset: 0 },
  { keys: ['ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э'], startOffset: 0.5 },
  { keys: ['я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'], startOffset: 1.5 }
];

// Состояние приложения
let state = {
  currentLesson: null,
  currentText: '',
  typedText: '',
  currentIndex: 0,
  errors: 0,
  startTime: null,
  isActive: false,
  stats: {
    speed: 0,
    accuracy: 100,
    time: 0
  },
  history: [],
  progress: {}
};

// Загрузка данных из localStorage
function loadData() {
  const saved = localStorage.getItem('typingTrainerData');
  if (saved) {
    const data = JSON.parse(saved);
    state.history = data.history || [];
    state.progress = data.progress || {};
  }
  updateStats();
}

// Сохранение данных в localStorage
function saveData() {
  const data = {
    history: state.history,
    progress: state.progress
  };
  localStorage.setItem('typingTrainerData', JSON.stringify(data));
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderLessons();
  renderKeyboard();
  setupEventListeners();
  updateStats();
});

// Рендеринг списка уроков
function renderLessons() {
  const container = document.getElementById('lessons-list');
  if (!container) {
    console.error('Lessons container not found!');
    return;
  }
  
  if (!lessons || lessons.length === 0) {
    console.error('Lessons array is empty!');
    container.innerHTML = '<div class="lesson-item">Уроки не загружены</div>';
    return;
  }
  
  container.innerHTML = '';

  lessons.forEach(lesson => {
    // Убеждаемся, что у урока есть текст
    if (!lesson.text || lesson.text.trim() === '') {
      console.warn(`Lesson ${lesson.id} has empty text, regenerating...`);
      // Регенерируем текст для урока
      if (lesson.keys && lesson.keys.length > 0) {
        lesson.text = generateVariedText(lesson.keys, 250);
      }
    }
    const item = document.createElement('div');
    item.className = 'lesson-item';
    if (state.currentLesson?.id === lesson.id) {
      item.classList.add('active');
    }
    if (state.progress[lesson.id]?.completed) {
      item.classList.add('completed');
    }

    const progress = state.progress[lesson.id];
    const progressText = progress ? `${progress.bestSpeed} зн/мин` : '';

    item.innerHTML = `
      <div>
        <div class="lesson-name">${lesson.name}</div>
        ${progressText ? `<div class="lesson-progress">${progressText}</div>` : ''}
      </div>
    `;

    item.addEventListener('click', () => selectLesson(lesson));
    container.appendChild(item);
  });
}

// Выбор урока
function selectLesson(lesson) {
  if (lesson) {
    state.currentLesson = lesson;
    state.currentText = lesson.text;
  } else {
    state.currentLesson = null;
    state.currentText = '';
  }
  
  state.typedText = '';
  state.currentIndex = 0;
  state.errors = 0;
  state.isActive = false;
  state.startTime = null;

  // Полностью скрываем поле ввода при выборе урока
  const inputArea = document.getElementById('input-area');
  inputArea.classList.remove('active');
  
  const input = document.getElementById('typing-input');
  input.value = '';
  input.blur();

  renderLessons();
  renderText();
  updateControls();
  updateKeyboard();
}

// Рендеринг текста
function renderText() {
  const container = document.getElementById('text-display');
  const lessonInfo = document.getElementById('lesson-info');

  if (!state.currentLesson) {
    container.innerHTML = '<span class="text-placeholder">Выберите урок для начала тренировки</span>';
    lessonInfo.innerHTML = `
      <h3 class="lesson-title">Выберите урок для начала</h3>
      <p class="lesson-description">Выберите урок из списка слева, чтобы начать обучение слепой печати.</p>
    `;
    return;
  }

  lessonInfo.innerHTML = `
    <h3 class="lesson-title">${state.currentLesson.name}</h3>
    <p class="lesson-description">${state.currentLesson.description}</p>
  `;

  container.innerHTML = '';

  // Показываем весь текст
  state.currentText.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.className = 'text-char';
    span.textContent = char === ' ' ? '\u00A0' : char;

    if (index < state.currentIndex) {
      if (state.typedText[index] === char) {
        span.classList.add('correct');
      } else {
        span.classList.add('error');
      }
    } else if (index === state.currentIndex) {
      span.classList.add('current');
    }

    container.appendChild(span);
  });

  updateProgress();
}

// Рендеринг клавиатуры
function renderKeyboard() {
  const container = document.getElementById('keyboard');
  container.innerHTML = '';

  keyboardLayout.forEach((rowData, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';

    // Добавляем Tab для первого ряда
    if (rowIndex === 0) {
      const tabKey = document.createElement('div');
      tabKey.className = 'key tab-key';
      tabKey.dataset.key = 'Tab';
      tabKey.textContent = 'Tab';
      rowDiv.appendChild(tabKey);
    }

    // Добавляем отступ для второго и третьего ряда
    if (rowIndex > 0) {
      const spacer = document.createElement('div');
      spacer.className = 'key-spacer';
      spacer.style.width = `${rowData.startOffset * 44}px`;
      rowDiv.appendChild(spacer);
    }

    rowData.keys.forEach(key => {
      const keyDiv = document.createElement('div');
      keyDiv.className = 'key';
      keyDiv.dataset.key = key;
      keyDiv.textContent = key.toUpperCase();
      rowDiv.appendChild(keyDiv);
    });

    // Добавляем Backspace для первого ряда
    if (rowIndex === 0) {
      const backspaceKey = document.createElement('div');
      backspaceKey.className = 'key backspace-key';
      backspaceKey.dataset.key = 'Backspace';
      backspaceKey.textContent = '⌫';
      rowDiv.appendChild(backspaceKey);
    }

    // Добавляем Enter для второго ряда
    if (rowIndex === 1) {
      const enterKey = document.createElement('div');
      enterKey.className = 'key enter-key';
      enterKey.dataset.key = 'Enter';
      enterKey.textContent = 'Enter';
      rowDiv.appendChild(enterKey);
    }

    // Добавляем Shift для третьего ряда
    if (rowIndex === 2) {
      const shiftKey = document.createElement('div');
      shiftKey.className = 'key shift-key';
      shiftKey.dataset.key = 'Shift';
      shiftKey.textContent = 'Shift';
      rowDiv.appendChild(shiftKey);
    }

    container.appendChild(rowDiv);
  });

  // Добавляем ряд с пробелом
  const spaceRow = document.createElement('div');
  spaceRow.className = 'keyboard-row';
  const spaceKey = document.createElement('div');
  spaceKey.className = 'key space';
  spaceKey.dataset.key = ' ';
  spaceKey.textContent = 'SPACE';
  spaceRow.appendChild(spaceKey);
  container.appendChild(spaceRow);
}

// Обновление подсветки клавиатуры (только текущая клавиша)
function updateKeyboard() {
  // Убираем все подсветки
  document.querySelectorAll('.key').forEach(key => {
    key.classList.remove('active', 'error', 'correct', 'pressed');
  });

  // Подсвечиваем только текущую клавишу
  if (state.currentIndex < state.currentText.length && state.isActive) {
    const currentChar = state.currentText[state.currentIndex].toLowerCase();
    const keyElement = document.querySelector(`.key[data-key="${currentChar}"]`);
    
    if (keyElement) {
      keyElement.classList.add('active');
    }
  }
}

// Временная подсветка нажатой клавиши
let pressedKeyTimeout = null;
function highlightPressedKey(key) {
  // Убираем предыдущую подсветку
  if (pressedKeyTimeout) {
    clearTimeout(pressedKeyTimeout);
  }

  const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  if (keyElement) {
    keyElement.classList.add('pressed');
    pressedKeyTimeout = setTimeout(() => {
      keyElement.classList.remove('pressed');
    }, 150);
  }
}

// Настройка обработчиков событий
function setupEventListeners() {
  const input = document.getElementById('typing-input');
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');
  const statsBtn = document.getElementById('stats-btn');
  const closeStatsBtn = document.getElementById('close-stats-modal');
  const statsModal = document.getElementById('stats-modal');
  const tabBtns = document.querySelectorAll('.tab-btn');

  input.addEventListener('input', handleInput);
  input.addEventListener('keydown', handleKeyDown);
  startBtn.addEventListener('click', startTraining);
  resetBtn.addEventListener('click', resetTraining);
  statsBtn.addEventListener('click', () => {
    statsModal.classList.add('active');
    renderCharts();
  });
  closeStatsBtn.addEventListener('click', () => {
    statsModal.classList.remove('active');
  });

  // Закрытие модального окна по клику на фон
  statsModal.addEventListener('click', (e) => {
    if (e.target === statsModal || e.target.classList.contains('modal-backdrop')) {
      statsModal.classList.remove('active');
    }
  });

  // Переключение вкладок
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${tab}`).classList.add('active');
      if (tab === 'progress') {
        renderCharts();
      }
    });
  });

  // Сброс прогресса
  const resetProgressBtn = document.getElementById('reset-progress-btn');
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener('click', resetAllProgress);
  }

}

// Сброс всего прогресса
function resetAllProgress() {
  if (!confirm('Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.')) {
    return;
  }

  // Очищаем localStorage
  localStorage.removeItem('typingTrainerData');

  // Сбрасываем состояние
  state.history = [];
  state.progress = {};

  // Сбрасываем текущую тренировку
  resetTraining();
  selectLesson(null);

  // Обновляем интерфейс
  renderLessons();
  updateStats();
  renderHistory();
  renderCharts();

  alert('Весь прогресс успешно сброшен!');
}

// Обработка ввода
function handleInput(e) {
  if (!state.currentLesson || !state.isActive) return;

  const value = e.target.value;
  const newLength = value.length;
  const oldLength = state.typedText.length;

  if (newLength > oldLength) {
    // Добавление символов
    const newChar = value[newLength - 1];
    const expectedChar = state.currentText[state.currentIndex];

    // Подсвечиваем нажатую клавишу
    highlightPressedKey(newChar.toLowerCase());

    if (newChar !== expectedChar) {
      state.errors++;
    }

    state.typedText = value;
    state.currentIndex = newLength;
  } else if (newLength < oldLength) {
    // Удаление символов (backspace)
    highlightPressedKey('Backspace');
    state.typedText = value;
    state.currentIndex = newLength;
  }

  updateStats();
  renderText();
  updateKeyboard();
  checkCompletion();
}

// Обработка нажатий клавиш
function handleKeyDown(e) {
  if (!state.currentLesson || !state.isActive) return;

  // Предотвращаем стандартное поведение для некоторых клавиш
  if (e.key === 'Backspace' && state.currentIndex === 0) {
    e.preventDefault();
  }
}

// Начало тренировки
function startTraining() {
  if (!state.currentLesson) return;

  state.isActive = true;
  state.startTime = Date.now();
  state.typedText = '';
  state.currentIndex = 0;
  state.errors = 0;

  // Активируем поле ввода (оно невидимо, но функционально)
  const inputArea = document.getElementById('input-area');
  inputArea.classList.add('active');
  
  const input = document.getElementById('typing-input');
  input.value = '';
  // Фокусируемся с небольшой задержкой
  setTimeout(() => {
    input.focus();
  }, 100);
  
  updateControls();
  updateKeyboard();
  renderText();
}

// Сброс тренировки
function resetTraining() {
  state.isActive = false;
  state.startTime = null;
  state.typedText = '';
  state.currentIndex = 0;
  state.errors = 0;

  // Скрываем поле ввода
  const inputArea = document.getElementById('input-area');
  inputArea.classList.remove('active');
  
  const input = document.getElementById('typing-input');
  input.value = '';
  input.blur();
  
  renderText();
  updateKeyboard();
  updateControls();
  updateStats();
}

// Проверка завершения
function checkCompletion() {
  if (state.currentIndex >= state.currentText.length) {
    state.isActive = false;
    const timeSpent = (Date.now() - state.startTime) / 1000 / 60; // минуты
    const speed = Math.round(state.currentText.length / timeSpent);
    const accuracy = Math.round(((state.currentText.length - state.errors) / state.currentText.length) * 100);

    // Сохранение результата
    const result = {
      lessonId: state.currentLesson.id,
      lessonName: state.currentLesson.name,
      speed,
      accuracy,
      errors: state.errors,
      time: Math.round(timeSpent * 60), // секунды
      date: new Date().toISOString()
    };

    state.history.push(result);
    state.history.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (state.history.length > 100) {
      state.history = state.history.slice(0, 100);
    }

    // Обновление прогресса
    if (!state.progress[state.currentLesson.id] || state.progress[state.currentLesson.id].bestSpeed < speed) {
      state.progress[state.currentLesson.id] = {
        completed: true,
        bestSpeed: speed,
        bestAccuracy: accuracy,
        lastDate: new Date().toISOString()
      };
    }

    saveData();
    renderLessons();
    updateStats();

    // Скрываем поле ввода после завершения
    const inputArea = document.getElementById('input-area');
    inputArea.classList.remove('active');
    const input = document.getElementById('typing-input');
    input.blur();

    // Показ результата
    setTimeout(() => {
      alert(`Урок завершен!\nСкорость: ${speed} зн/мин\nТочность: ${accuracy}%\nОшибок: ${state.errors}`);
    }, 100);
  }
}

// Обновление статистики
function updateStats() {
  const timeSpent = state.startTime ? (Date.now() - state.startTime) / 1000 / 60 : 0;
  
  if (state.isActive && state.currentIndex > 0) {
    state.stats.speed = Math.round(state.currentIndex / timeSpent) || 0;
    state.stats.accuracy = state.currentIndex > 0 
      ? Math.round(((state.currentIndex - state.errors) / state.currentIndex) * 100) 
      : 100;
    state.stats.time = Math.round(timeSpent * 60);
  } else {
    state.stats.speed = 0;
    state.stats.accuracy = 100;
    state.stats.time = 0;
  }

  // Обновление общей статистики
  const avgSpeed = calculateAverageSpeed();
  const avgAccuracy = calculateAverageAccuracy();
  const totalTime = calculateTotalTime();
  const completedLessons = Object.keys(state.progress).filter(id => state.progress[id].completed).length;

  document.getElementById('avg-speed').textContent = avgSpeed;
  document.getElementById('avg-accuracy').textContent = avgAccuracy + '%';
  document.getElementById('total-time').textContent = Math.round(totalTime);
  document.getElementById('lessons-completed').textContent = completedLessons;
}

// Вычисление средней скорости
function calculateAverageSpeed() {
  if (state.history.length === 0) return 0;
  const sum = state.history.reduce((acc, item) => acc + item.speed, 0);
  return Math.round(sum / state.history.length);
}

// Вычисление средней точности
function calculateAverageAccuracy() {
  if (state.history.length === 0) return 0;
  const sum = state.history.reduce((acc, item) => acc + item.accuracy, 0);
  return Math.round(sum / state.history.length);
}

// Вычисление общего времени
function calculateTotalTime() {
  return state.history.reduce((acc, item) => acc + item.time, 0) / 60;
}

// Форматирование времени
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Обновление прогресса
function updateProgress() {
  const progress = state.currentIndex / state.currentText.length * 100;
  document.getElementById('progress-fill').style.width = progress + '%';
  document.getElementById('progress-text').textContent = Math.round(progress) + '%';
}

// Обновление кнопок управления
function updateControls() {
  const startBtn = document.getElementById('start-btn');
  const resetBtn = document.getElementById('reset-btn');

  startBtn.disabled = !state.currentLesson || state.isActive;
  resetBtn.disabled = !state.currentLesson || !state.isActive;

  if (state.isActive) {
    startBtn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
  } else {
    startBtn.innerHTML = '<i class="fas fa-play"></i> Начать';
  }
}

// Рендеринг графиков
function renderCharts() {
  // Простая реализация графиков без внешних библиотек
  renderProgressChart();
  renderAccuracyChart();
  renderHistory();
}

// График прогресса (скорость)
function renderProgressChart() {
  const canvas = document.getElementById('progress-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = 300;

  // Группировка по урокам
  const lessonData = {};
  state.history.forEach(item => {
    if (!lessonData[item.lessonId]) {
      lessonData[item.lessonId] = [];
    }
    lessonData[item.lessonId].push(item.speed);
  });

  const lessonIds = Object.keys(lessonData).sort((a, b) => a - b);
  if (lessonIds.length === 0) {
    ctx.fillStyle = '#9ca3af';
    ctx.font = '16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('Нет данных', width / 2, height / 2);
    return;
  }

  const maxSpeed = Math.max(...state.history.map(h => h.speed), 100);
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const barWidth = chartWidth / lessonIds.length;

  // Очистка
  ctx.clearRect(0, 0, width, height);

  // Оси
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Подписи осей
  ctx.fillStyle = '#6b7280';
  ctx.font = '12px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText('Урок', width / 2, height - 10);
  ctx.save();
  ctx.translate(15, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Скорость (зн/мин)', 0, 0);
  ctx.restore();

  // Столбцы
  lessonIds.forEach((lessonId, index) => {
    const speeds = lessonData[lessonId];
    const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
    const barHeight = (avgSpeed / maxSpeed) * chartHeight;
    const x = padding + index * barWidth + barWidth / 4;
    const y = height - padding - barHeight;

    // Градиент
    const gradient = ctx.createLinearGradient(0, y, 0, height - padding);
    gradient.addColorStop(0, '#4f46e5');
    gradient.addColorStop(1, '#7c3aed');
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth / 2, barHeight);

    // Подпись
    ctx.fillStyle = '#111827';
    ctx.font = '10px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText(lessonId, x + barWidth / 4, height - padding + 15);
    ctx.fillText(Math.round(avgSpeed), x + barWidth / 4, y - 5);
  });
}

// График точности
function renderAccuracyChart() {
  const canvas = document.getElementById('accuracy-chart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = 300;

  if (state.history.length === 0) {
    ctx.fillStyle = '#9ca3af';
    ctx.font = '16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('Нет данных', width / 2, height / 2);
    return;
  }

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const pointSpacing = chartWidth / Math.max(state.history.length - 1, 1);

  // Очистка
  ctx.clearRect(0, 0, width, height);

  // Оси
  ctx.strokeStyle = '#e2e8f0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  // Линия графика
  ctx.strokeStyle = '#4f46e5';
  ctx.lineWidth = 2;
  ctx.beginPath();

  state.history.slice(-20).forEach((item, index) => {
    const x = padding + index * pointSpacing;
    const y = height - padding - (item.accuracy / 100) * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  // Точки
  ctx.fillStyle = '#4f46e5';
  state.history.slice(-20).forEach((item, index) => {
    const x = padding + index * pointSpacing;
    const y = height - padding - (item.accuracy / 100) * chartHeight;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Подписи
  ctx.fillStyle = '#6b7280';
  ctx.font = '12px Montserrat';
  ctx.textAlign = 'center';
  ctx.fillText('Последние попытки', width / 2, height - 10);
  ctx.save();
  ctx.translate(15, height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('Точность (%)', 0, 0);
  ctx.restore();
}

// Рендеринг истории
function renderHistory() {
  const container = document.getElementById('history-list');
  container.innerHTML = '';

  if (state.history.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #6b7280; padding: 2rem;">История пуста</p>';
    return;
  }

  state.history.slice(0, 20).forEach(item => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div class="history-item-info">
        <div class="history-item-title">${item.lessonName}</div>
        <div class="history-item-meta">${new Date(item.date).toLocaleString('ru-RU')}</div>
      </div>
      <div class="history-item-stats">
        <div class="history-stat">
          <div class="history-stat-value">${item.speed}</div>
          <div class="history-stat-label">зн/мин</div>
        </div>
        <div class="history-stat">
          <div class="history-stat-value">${item.accuracy}%</div>
          <div class="history-stat-label">точность</div>
        </div>
        <div class="history-stat">
          <div class="history-stat-value">${item.errors}</div>
          <div class="history-stat-label">ошибок</div>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

// Обновление статистики каждую секунду
setInterval(() => {
  if (state.isActive) {
    updateStats();
  }
}, 1000);

