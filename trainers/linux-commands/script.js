// Виртуальная файловая система
class VirtualFileSystem {
  constructor() {
    this.root = {
      type: 'directory',
      name: '/',
      children: {
        home: {
          type: 'directory',
          name: 'home',
          children: {
            user: {
              type: 'directory',
              name: 'user',
              children: {
                documents: {
                  type: 'directory',
                  name: 'documents',
                  children: {
                    'readme.txt': { type: 'file', name: 'readme.txt', content: 'Добро пожаловать!' },
                    'notes.txt': { type: 'file', name: 'notes.txt', content: 'Важные заметки' }
                  }
                },
                downloads: {
                  type: 'directory',
                  name: 'downloads',
                  children: {
                    'file1.zip': { type: 'file', name: 'file1.zip' },
                    'image.jpg': { type: 'file', name: 'image.jpg' }
                  }
                },
                'test.txt': { type: 'file', name: 'test.txt', content: 'Тестовый файл' }
              }
            }
          }
        },
        etc: {
          type: 'directory',
          name: 'etc',
          children: {
            'config.conf': { type: 'file', name: 'config.conf', content: 'config data' }
          }
        },
        tmp: {
          type: 'directory',
          name: 'tmp',
          children: {}
        }
      }
    };
    this.currentPath = ['home', 'user'];
  }

  getCurrentDir() {
    let dir = this.root;
    for (const part of this.currentPath) {
      dir = dir.children[part];
    }
    return dir;
  }

  getPath() {
    if (this.currentPath.length === 0) return '/';
    return '/' + this.currentPath.join('/');
  }

  navigate(path) {
    if (path === '/' || path === '') {
      this.currentPath = [];
      return true;
    }
    if (path === '~' || path.startsWith('~/')) {
      this.currentPath = ['home', 'user'];
      if (path.startsWith('~/')) {
        const parts = path.slice(2).split('/').filter(p => p);
        return this.navigateRelative(parts);
      }
      return true;
    }
    if (path.startsWith('/')) {
      this.currentPath = [];
      const parts = path.slice(1).split('/').filter(p => p);
      return this.navigateRelative(parts);
    }
    const parts = path.split('/').filter(p => p);
    return this.navigateRelative(parts);
  }

  navigateRelative(parts) {
    let dir = this.getCurrentDir();
    for (const part of parts) {
      if (part === '..') {
        if (this.currentPath.length > 0) {
          this.currentPath.pop();
        }
        dir = this.getCurrentDir();
      } else if (part === '.') {
        continue;
      } else {
        if (dir.children && dir.children[part]) {
          if (dir.children[part].type === 'directory') {
            this.currentPath.push(part);
            dir = dir.children[part];
          } else {
            return false;
          }
        } else {
            return false;
        }
      }
    }
    return true;
  }

  list(path = null) {
    const targetDir = path ? this.resolvePath(path) : this.getCurrentDir();
    if (!targetDir || !targetDir.children) return [];
    return Object.values(targetDir.children);
  }

  resolvePath(path) {
    if (!path) return this.getCurrentDir();
    if (path === '/') return this.root;
    if (path === '~' || path === '~/') {
      return this.root.children.home?.children.user || null;
    }
    
    const parts = path.startsWith('/') 
      ? path.slice(1).split('/').filter(p => p)
      : path.split('/').filter(p => p);
    
    let dir = path.startsWith('/') ? this.root : this.getCurrentDir();
    for (const part of parts) {
      if (part === '..') {
        dir = this.getParent(dir);
        if (!dir) return null;
      } else if (part === '.') {
        continue;
      } else {
        if (dir.children && dir.children[part]) {
          dir = dir.children[part];
        } else {
          return null;
        }
      }
    }
    return dir;
  }

  getParent(dir) {
    // Упрощенная реализация
    if (this.currentPath.length === 0) return this.root;
    const parentPath = [...this.currentPath];
    parentPath.pop();
    let parent = this.root;
    for (const part of parentPath) {
      parent = parent.children[part];
    }
    return parent;
  }

  createFile(path, name) {
    const dir = this.resolvePath(path);
    if (dir && dir.type === 'directory') {
      if (!dir.children) dir.children = {};
      dir.children[name] = { type: 'file', name, content: '' };
      return true;
    }
    return false;
  }

  createDirectory(path, name) {
    const dir = this.resolvePath(path);
    if (dir && dir.type === 'directory') {
      if (!dir.children) dir.children = {};
      dir.children[name] = { type: 'directory', name, children: {} };
      return true;
    }
    return false;
  }

  remove(path, name) {
    const dir = this.resolvePath(path);
    if (dir && dir.children && dir.children[name]) {
      delete dir.children[name];
      return true;
    }
    return false;
  }
}

// Команды и упражнения
const commands = {
  cd: {
    name: 'cd',
    description: 'Изменение текущей директории',
    syntax: 'cd [путь]',
    examples: ['cd documents', 'cd ..', 'cd /home/user', 'cd ~'],
    detailedHelp: 'Команда cd (change directory) позволяет перейти в указанную директорию. Если путь не указан, переходит в домашнюю директорию.',
    exercises: [
      {
        description: 'Перейдите в директорию documents',
        command: 'cd documents',
        hint: 'Используйте: cd documents'
      },
      {
        description: 'Вернитесь в родительскую директорию',
        command: 'cd ..',
        hint: 'Используйте: cd .. для перехода на уровень выше'
      },
      {
        description: 'Перейдите в домашнюю директорию (~)',
        command: 'cd ~',
        hint: 'Используйте: cd ~ или просто cd'
      }
    ]
  },
  ls: {
    name: 'ls',
    description: 'Просмотр содержимого директории',
    syntax: 'ls [опции] [путь]',
    examples: ['ls', 'ls -l', 'ls -a', 'ls documents'],
    detailedHelp: 'Команда ls (list) выводит список файлов и директорий. Опции: -l (подробный список), -a (включая скрытые файлы), -h (человекочитаемый размер).',
    exercises: [
      {
        description: 'Выведите список файлов в текущей директории',
        command: 'ls',
        hint: 'Просто введите: ls'
      },
      {
        description: 'Просмотрите содержимое директории documents',
        command: 'ls documents',
        hint: 'Используйте: ls documents'
      }
    ]
  },
  pwd: {
    name: 'pwd',
    description: 'Показать текущий путь',
    syntax: 'pwd',
    examples: ['pwd'],
    detailedHelp: 'Команда pwd (print working directory) выводит полный путь к текущей директории.',
    exercises: [
      {
        description: 'Узнайте текущий путь',
        command: 'pwd',
        hint: 'Введите: pwd'
      }
    ]
  },
  mkdir: {
    name: 'mkdir',
    description: 'Создание новой директории',
    syntax: 'mkdir [опции] имя_директории',
    examples: ['mkdir new_folder', 'mkdir -p path/to/dir'],
    detailedHelp: 'Команда mkdir (make directory) создает новую директорию. Опция -p создает все промежуточные директории.',
    exercises: [
      {
        description: 'Создайте директорию с именем "projects"',
        command: 'mkdir projects',
        hint: 'Используйте: mkdir projects'
      },
      {
        description: 'Создайте директорию "test"',
        command: 'mkdir test',
        hint: 'Используйте: mkdir test'
      }
    ]
  },
  touch: {
    name: 'touch',
    description: 'Создание пустого файла или обновление времени модификации',
    syntax: 'touch имя_файла',
    examples: ['touch file.txt', 'touch new_file'],
    detailedHelp: 'Команда touch создает пустой файл или обновляет время последнего доступа и модификации существующего файла.',
    exercises: [
      {
        description: 'Создайте файл "hello.txt"',
        command: 'touch hello.txt',
        hint: 'Используйте: touch hello.txt'
      },
      {
        description: 'Создайте файл "script.sh"',
        command: 'touch script.sh',
        hint: 'Используйте: touch script.sh'
      }
    ]
  },
  rm: {
    name: 'rm',
    description: 'Удаление файлов и директорий',
    syntax: 'rm [опции] файл',
    examples: ['rm file.txt', 'rm -r directory', 'rm -f file'],
    detailedHelp: 'Команда rm (remove) удаляет файлы. Опции: -r (рекурсивно, для директорий), -f (принудительно, без подтверждения).',
    exercises: [
      {
        description: 'Удалите файл "test.txt"',
        command: 'rm test.txt',
        hint: 'Используйте: rm test.txt'
      }
    ]
  },
  cat: {
    name: 'cat',
    description: 'Вывод содержимого файла',
    syntax: 'cat [опции] файл',
    examples: ['cat file.txt', 'cat readme.txt'],
    detailedHelp: 'Команда cat (concatenate) выводит содержимое файла на экран. Можно использовать для просмотра нескольких файлов подряд.',
    exercises: [
      {
        description: 'Выведите содержимое файла "readme.txt"',
        command: 'cat readme.txt',
        hint: 'Используйте: cat readme.txt'
      }
    ]
  },
  grep: {
    name: 'grep',
    description: 'Поиск текста в файлах',
    syntax: 'grep [опции] шаблон файл',
    examples: ['grep "text" file.txt', 'grep -i "error" log.txt'],
    detailedHelp: 'Команда grep ищет строки, содержащие указанный шаблон. Опции: -i (без учета регистра), -n (номер строки), -r (рекурсивно).',
    exercises: [
      {
        description: 'Найдите строку "Добро" в файле readme.txt',
        command: 'grep "Добро" readme.txt',
        hint: 'Используйте: grep "Добро" readme.txt'
      }
    ]
  }
};

// Тренажер
class LinuxTrainer {
  constructor() {
    this.fs = new VirtualFileSystem();
    this.currentCommand = null;
    this.currentExercise = 0;
    this.completedExercises = new Set();
    this.learnedCommands = new Set();
    this.commandHistory = [];
    this.mode = null; // 'sandbox' or 'trainer'
    
    this.init();
  }

  init() {
    this.setupModeSelection();
    this.setupEventListeners();
  }

  setupModeSelection() {
    const modeCards = document.querySelectorAll('.mode-card');
    modeCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const mode = card.dataset.mode;
        this.startMode(mode);
      });
    });
  }

  startMode(mode) {
    this.mode = mode;
    document.getElementById('mode-selection').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';
    
    this.renderCommandsList();
    this.updateFileSystem();
    this.updateProgress();
    this.updateModeBadge();
    
    if (mode === 'sandbox') {
      this.initSandboxMode();
    } else {
      this.initTrainerMode();
    }
    
    this.addTerminalLine(`Режим "${mode === 'sandbox' ? 'Песочница' : 'Тренажер'}" активирован. Введите 'help' для справки.`);
  }

  initSandboxMode() {
    document.getElementById('exercise-panel').style.display = 'none';
    document.getElementById('progress-section').style.display = 'none';
    document.getElementById('command-info').querySelector('#command-description').textContent = 
      'Свободная практика. Выберите команду из списка для справки или начните вводить команды.';
  }

  initTrainerMode() {
    document.getElementById('exercise-panel').style.display = 'none';
    document.getElementById('progress-section').style.display = 'block';
    document.getElementById('command-info').querySelector('#command-description').textContent = 
      'Выберите команду из списка слева, чтобы начать обучение с упражнениями.';
  }

  updateModeBadge() {
    const badge = document.getElementById('mode-badge');
    if (this.mode === 'sandbox') {
      badge.textContent = '🏖️ Песочница';
      badge.className = 'mode-badge mode-badge-sandbox';
    } else {
      badge.textContent = '🎯 Тренажер';
      badge.className = 'mode-badge mode-badge-trainer';
    }
  }

  renderCommandsList() {
    const list = document.getElementById('commands-list');
    list.innerHTML = '';
    
    Object.values(commands).forEach(cmd => {
      const item = document.createElement('div');
      item.className = `command-item ${this.learnedCommands.has(cmd.name) ? 'learned' : ''}`;
      item.innerHTML = `
        <span class="command-icon">${this.learnedCommands.has(cmd.name) ? '✓' : '○'}</span>
        <span class="command-name">${cmd.name}</span>
      `;
      item.addEventListener('click', () => this.selectCommand(cmd.name));
      list.appendChild(item);
    });
  }

  selectCommand(commandName) {
    this.currentCommand = commands[commandName];
    this.currentExercise = 0;
    this.learnedCommands.add(commandName);
    
    document.getElementById('command-name').textContent = this.currentCommand.name;
    document.getElementById('command-description').textContent = this.currentCommand.description;
    
    // Показываем синтаксис и примеры
    const syntaxEl = document.getElementById('command-syntax');
    const examplesEl = document.getElementById('command-examples');
    syntaxEl.style.display = 'block';
    document.getElementById('syntax-text').textContent = this.currentCommand.syntax;
    
    examplesEl.style.display = 'block';
    const examplesList = document.getElementById('examples-list');
    examplesList.innerHTML = '';
    this.currentCommand.examples.forEach(ex => {
      const li = document.createElement('li');
      li.innerHTML = `<code>${ex}</code>`;
      examplesList.appendChild(li);
    });
    
    document.getElementById('command-help-btn').style.display = 'block';
    document.getElementById('reset-btn').style.display = 'block';
    
    this.renderCommandsList();
    
    if (this.mode === 'trainer' && this.currentCommand.exercises.length > 0) {
      this.showExercise(0);
    } else {
      this.hideExercise();
    }
    
    this.addTerminalLine(`Команда "${commandName}" выбрана. ${this.mode === 'sandbox' ? 'Начните практиковать!' : 'Начните выполнять упражнения.'}`);
  }

  showExercise(index) {
    if (!this.currentCommand || index >= this.currentCommand.exercises.length) {
      if (this.currentCommand && index >= this.currentCommand.exercises.length) {
        this.addTerminalLine('Все упражнения по этой команде выполнены! Выберите другую команду.');
      }
      this.hideExercise();
      return;
    }
    
    this.currentExercise = index;
    const exercise = this.currentCommand.exercises[index];
    const exerciseId = `${this.currentCommand.name}-${index}`;
    
    if (this.completedExercises.has(exerciseId)) {
      this.showExercise(index + 1);
      return;
    }
    
    document.getElementById('exercise-panel').style.display = 'block';
    document.getElementById('exercise-description').textContent = exercise.description;
    document.getElementById('exercise-number').textContent = `${index + 1}/${this.currentCommand.exercises.length}`;
    document.getElementById('exercise-hint').style.display = 'none';
    document.getElementById('hint-text').textContent = exercise.hint;
    
    this.updateProgress();
  }

  hideExercise() {
    document.getElementById('exercise-panel').style.display = 'none';
  }

  setupEventListeners() {
    const input = document.getElementById('terminal-input');
    const hintBtn = document.getElementById('hint-btn');
    const skipBtn = document.getElementById('skip-btn');
    const resetBtn = document.getElementById('reset-btn');
    const helpBtn = document.getElementById('help-btn');
    const commandHelpBtn = document.getElementById('command-help-btn');
    const switchModeBtn = document.getElementById('switch-mode-btn');
    const helpModal = document.getElementById('help-modal');
    const helpModalClose = document.getElementById('help-modal-close');
    const helpModalBackdrop = document.getElementById('help-modal-backdrop');
    
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.executeCommand(input.value.trim());
        input.value = '';
      }
    });
    
    // Автодополнение при вводе
    input.addEventListener('input', (e) => {
      this.showCommandSuggestions(e.target.value);
    });
    
    hintBtn?.addEventListener('click', () => {
      document.getElementById('exercise-hint').style.display = 'flex';
    });
    
    skipBtn?.addEventListener('click', () => {
      this.showExercise(this.currentExercise + 1);
    });
    
    resetBtn?.addEventListener('click', () => {
      this.resetCommand();
    });
    
    helpBtn?.addEventListener('click', () => {
      this.showHelpModal();
    });
    
    commandHelpBtn?.addEventListener('click', () => {
      if (this.currentCommand) {
        this.showCommandHelp(this.currentCommand);
      }
    });
    
    switchModeBtn?.addEventListener('click', () => {
      if (confirm('Вы уверены, что хотите сменить режим? Весь прогресс будет сохранен.')) {
        this.switchMode();
      }
    });
    
    helpModalClose?.addEventListener('click', () => {
      helpModal.style.display = 'none';
    });
    
    helpModalBackdrop?.addEventListener('click', () => {
      helpModal.style.display = 'none';
    });
  }

  showCommandSuggestions(input) {
    // Можно добавить автодополнение команд
  }

  executeCommand(cmd) {
    if (!cmd) return;
    
    this.commandHistory.push(cmd);
    this.addTerminalLine(`$ ${cmd}`);
    
    const parts = cmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);
    
    // Проверка упражнения (только в режиме тренажера)
    if (this.mode === 'trainer' && this.currentCommand && this.currentCommand.exercises[this.currentExercise]) {
      const exercise = this.currentCommand.exercises[this.currentExercise];
      if (cmd === exercise.command) {
        this.completeExercise();
        return;
      }
    }
    
    // Выполнение команды
    switch (command) {
      case 'cd':
        this.handleCd(args.join(' '));
        break;
      case 'ls':
        this.handleLs(args);
        break;
      case 'pwd':
        this.handlePwd();
        break;
      case 'mkdir':
        this.handleMkdir(args);
        break;
      case 'touch':
        this.handleTouch(args);
        break;
      case 'rm':
        this.handleRm(args);
        break;
      case 'cat':
        this.handleCat(args);
        break;
      case 'grep':
        this.handleGrep(args);
        break;
      case 'clear':
        this.clearTerminal();
        break;
      case 'help':
        this.handleHelp();
        break;
      default:
        this.addTerminalLine(`bash: ${command}: команда не найдена`);
        if (this.mode === 'sandbox') {
          this.addTerminalLine(`Введите 'help' для списка доступных команд или выберите команду из списка слева.`);
        }
    }
  }

  completeExercise() {
    const exerciseId = `${this.currentCommand.name}-${this.currentExercise}`;
    this.completedExercises.add(exerciseId);
    this.addTerminalLine('✓ Упражнение выполнено!');
    this.updateProgress();
    
    setTimeout(() => {
      this.showExercise(this.currentExercise + 1);
    }, 1000);
  }

  handleCd(path) {
    if (!path) {
      this.fs.navigate('~');
    } else {
      const success = this.fs.navigate(path);
      if (!success) {
        this.addTerminalLine(`bash: cd: ${path}: Нет такого файла или каталога`);
      }
    }
    this.updateFileSystem();
  }

  handleLs(args) {
    const path = args.length > 0 && !args[0].startsWith('-') ? args[0] : null;
    const items = this.fs.list(path);
    
    if (items.length === 0) {
      this.addTerminalLine('');
      return;
    }
    
    const output = items.map(item => {
      const icon = item.type === 'directory' ? '📁' : '📄';
      return `${icon} ${item.name}`;
    }).join('\n');
    
    this.addTerminalLine(output);
  }

  handlePwd() {
    const path = this.fs.getPath();
    this.addTerminalLine(path || '/');
  }

  handleMkdir(args) {
    if (args.length === 0) {
      this.addTerminalLine('mkdir: отсутствует операнд');
      return;
    }
    
    const dirName = args[0];
    const success = this.fs.createDirectory(null, dirName);
    if (success) {
      this.addTerminalLine('');
      this.updateFileSystem();
    } else {
      this.addTerminalLine(`mkdir: невозможно создать каталог "${dirName}"`);
    }
  }

  handleTouch(args) {
    if (args.length === 0) {
      this.addTerminalLine('touch: отсутствует операнд');
      return;
    }
    
    const fileName = args[0];
    const success = this.fs.createFile(null, fileName);
    if (success) {
      this.addTerminalLine('');
      this.updateFileSystem();
    } else {
      this.addTerminalLine(`touch: невозможно создать файл "${fileName}"`);
    }
  }

  handleRm(args) {
    if (args.length === 0) {
      this.addTerminalLine('rm: отсутствует операнд');
      return;
    }
    
    const fileName = args[0];
    const success = this.fs.remove(null, fileName);
    if (success) {
      this.addTerminalLine('');
      this.updateFileSystem();
    } else {
      this.addTerminalLine(`rm: невозможно удалить "${fileName}": Нет такого файла или каталога`);
    }
  }

  handleCat(args) {
    if (args.length === 0) {
      this.addTerminalLine('cat: отсутствует операнд');
      return;
    }
    
    const fileName = args[0];
    const dir = this.fs.getCurrentDir();
    if (dir.children && dir.children[fileName] && dir.children[fileName].type === 'file') {
      const content = dir.children[fileName].content || '(пустой файл)';
      this.addTerminalLine(content);
    } else {
      this.addTerminalLine(`cat: ${fileName}: Нет такого файла или каталога`);
    }
  }

  handleGrep(args) {
    if (args.length < 2) {
      this.addTerminalLine('grep: недостаточно аргументов');
      return;
    }
    
    const pattern = args[0].replace(/"/g, '');
    const fileName = args[1];
    const dir = this.fs.getCurrentDir();
    
    if (dir.children && dir.children[fileName] && dir.children[fileName].type === 'file') {
      const content = dir.children[fileName].content || '';
      const lines = content.split('\n');
      const matches = lines.filter(line => line.includes(pattern));
      
      if (matches.length > 0) {
        matches.forEach(line => this.addTerminalLine(line));
      } else {
        this.addTerminalLine('');
      }
    } else {
      this.addTerminalLine(`grep: ${fileName}: Нет такого файла или каталога`);
    }
  }

  handleHelp() {
    const helpText = `
Доступные команды:
  cd [путь]     - изменить директорию
  ls [путь]     - список файлов
  pwd           - текущий путь
  mkdir [имя]   - создать директорию
  touch [имя]   - создать файл
  rm [имя]      - удалить файл
  cat [файл]    - показать содержимое
  grep [текст] [файл] - поиск в файле
  clear         - очистить терминал
  help          - эта справка

Для подробной справки по команде выберите её из списка слева или нажмите кнопку "Помощь по командам".
    `.trim();
    this.addTerminalLine(helpText);
  }

  showHelpModal() {
    const modal = document.getElementById('help-modal');
    const body = document.getElementById('help-modal-body');
    
    body.innerHTML = '<div class="help-commands-list">';
    Object.values(commands).forEach(cmd => {
      const cmdDiv = document.createElement('div');
      cmdDiv.className = 'help-command-item';
      cmdDiv.innerHTML = `
        <h4>${cmd.name}</h4>
        <p>${cmd.description}</p>
        <code>${cmd.syntax}</code>
        <div class="help-examples">
          <strong>Примеры:</strong>
          <ul>
            ${cmd.examples.map(ex => `<li><code>${ex}</code></li>`).join('')}
          </ul>
        </div>
      `;
      cmdDiv.addEventListener('click', () => {
        this.selectCommand(cmd.name);
        modal.style.display = 'none';
      });
      body.appendChild(cmdDiv);
    });
    body.innerHTML += '</div>';
    
    modal.style.display = 'block';
  }

  showCommandHelp(cmd) {
    const modal = document.getElementById('help-modal');
    const body = document.getElementById('help-modal-body');
    
    body.innerHTML = `
      <div class="help-command-detail">
        <h3>${cmd.name}</h3>
        <p class="help-description">${cmd.description}</p>
        <div class="help-syntax">
          <strong>Синтаксис:</strong>
          <code>${cmd.syntax}</code>
        </div>
        <div class="help-detailed">
          <strong>Описание:</strong>
          <p>${cmd.detailedHelp}</p>
        </div>
        <div class="help-examples">
          <strong>Примеры:</strong>
          <ul>
            ${cmd.examples.map(ex => `<li><code>${ex}</code></li>`).join('')}
          </ul>
        </div>
      </div>
    `;
    
    modal.style.display = 'block';
  }

  addTerminalLine(text) {
    const terminal = document.getElementById('terminal');
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }

  clearTerminal() {
    const terminal = document.getElementById('terminal');
    terminal.innerHTML = '<div class="terminal-line"><span class="terminal-prompt">user@linux:~$</span><span class="terminal-cursor" id="cursor">█</span></div>';
  }

  updateFileSystem() {
    const fsView = document.getElementById('filesystem-content');
    const currentPath = document.getElementById('current-path');
    
    currentPath.textContent = this.fs.getPath() || '~';
    
    const dir = this.fs.getCurrentDir();
    fsView.innerHTML = '';
    
    if (dir.children) {
      Object.values(dir.children).forEach(item => {
        const itemEl = document.createElement('div');
        itemEl.className = `fs-item fs-${item.type}`;
        itemEl.innerHTML = `
          <span class="fs-icon">${item.type === 'directory' ? '📁' : '📄'}</span>
          <span class="fs-name">${item.name}</span>
        `;
        fsView.appendChild(itemEl);
      });
    }
  }

  updateProgress() {
    document.getElementById('learned-count').textContent = this.learnedCommands.size;
    document.getElementById('completed-count').textContent = this.completedExercises.size;
  }

  resetCommand() {
    if (this.currentCommand) {
      this.currentExercise = 0;
      if (this.mode === 'trainer') {
        this.showExercise(0);
      }
      this.clearTerminal();
      this.addTerminalLine(`Команда "${this.currentCommand.name}" сброшена.`);
    }
  }

  switchMode() {
    const newMode = this.mode === 'sandbox' ? 'trainer' : 'sandbox';
    this.mode = newMode;
    this.updateModeBadge();
    
    if (newMode === 'sandbox') {
      this.initSandboxMode();
    } else {
      this.initTrainerMode();
    }
    
    this.addTerminalLine(`Режим изменен на "${newMode === 'sandbox' ? 'Песочница' : 'Тренажер'}".`);
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  new LinuxTrainer();
});
