// ========================================
// ПОИСКОВИК ДЛЯ СТРАНИЦ КУРСОВ
// ========================================

class CourseSearchSystem {
  constructor() {
    this.courseData = null;
    this.searchContainer = null;
    this.init();
  }

  init() {
    this.detectCourse();
    this.createSearchInterface();
    this.bindEvents();
  }

  detectCourse() {
    const path = window.location.pathname;
    const courseMatch = path.match(/\/courses\/([^\/]+)\//);
    
    if (courseMatch) {
      const courseId = courseMatch[1];
      this.courseData = this.getCourseData(courseId);
    }
  }

  getCourseData(courseId) {
    const courseMap = {
      'python': {
        title: 'Python',
        icon: 'fab fa-python',
        color: '#3776ab'
      },
      'networks': {
        title: 'Компьютерные сети',
        icon: 'fas fa-network-wired',
        color: '#3b82f6'
      },
      'git': {
        title: 'Git',
        icon: 'fab fa-git-alt',
        color: '#f05032'
      },
      'web': {
        title: 'Веб-разработка',
        icon: 'fab fa-html5',
        color: '#e34f26'
      },
      'linux': {
        title: 'Linux и Bash',
        icon: 'fab fa-linux',
        color: '#fcc624'
      },
      'windows': {
        title: 'Windows и PowerShell',
        icon: 'fab fa-windows',
        color: '#0078d4'
      }
    };

    return courseMap[courseId] || null;
  }

  createSearchInterface() {
    if (!this.courseData) return;

    // Находим навигацию или создаем контейнер
    const nav = document.querySelector('header nav') || document.querySelector('header');
    if (!nav) return;

    // Создаем поисковый контейнер
    this.searchContainer = document.createElement('div');
    this.searchContainer.className = 'course-search-container';
    this.searchContainer.innerHTML = `
      <div class="course-search-wrapper">
        <div class="course-search-input-wrapper">
          <input type="text" 
                 id="course-search-input" 
                 placeholder="Поиск в курсе ${this.courseData.title}..." 
                 class="course-search-input">
          <button type="button" id="course-search-button" class="course-search-button">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <div id="course-search-results" class="course-search-results hidden">
          <div class="course-search-results-header">
            <span class="course-search-results-title">Результаты поиска</span>
            <button type="button" id="course-clear-search" class="course-clear-search-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="course-search-results-content">
            <!-- Результаты будут вставляться сюда -->
          </div>
        </div>
      </div>
    `;

    // Добавляем стили для поисковика курса
    this.addCourseSearchStyles();

    // Вставляем поисковик в навигацию
    const navContent = nav.querySelector('.flex') || nav.querySelector('div');
    if (navContent) {
      // Находим последний элемент в навигации
      const lastElement = navContent.lastElementChild;
      if (lastElement) {
        navContent.insertBefore(this.searchContainer, lastElement);
      } else {
        navContent.appendChild(this.searchContainer);
      }
    }
  }

  addCourseSearchStyles() {
    const styles = `
      .course-search-container {
        position: relative;
        margin-left: auto;
        margin-right: 16px;
      }

      .course-search-wrapper {
        position: relative;
      }

      .course-search-input-wrapper {
        display: flex;
        align-items: center;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }

      .course-search-input-wrapper:focus-within {
        border-color: rgba(255, 255, 255, 0.4);
        background: rgba(255, 255, 255, 0.15);
      }

      .course-search-input {
        background: transparent;
        border: none;
        outline: none;
        padding: 8px 12px;
        color: white;
        font-size: 14px;
        min-width: 200px;
      }

      .course-search-input::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }

      .course-search-button {
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 8px 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .course-search-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .course-search-results {
        position: absolute;
        top: 100%;
        right: 0;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        max-height: 300px;
        overflow-y: auto;
        z-index: 1000;
        margin-top: 4px;
        min-width: 300px;
      }

      .course-search-results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        background: #f8fafc;
        border-bottom: 1px solid #e5e7eb;
        font-size: 12px;
        font-weight: 600;
        color: #374151;
      }

      .course-clear-search-btn {
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 2px;
        border-radius: 2px;
        font-size: 12px;
      }

      .course-clear-search-btn:hover {
        background: #f3f4f6;
        color: #374151;
      }

      .course-search-results-content {
        padding: 4px 0;
        max-height: 250px;
        overflow-y: auto;
      }

      .course-search-result-item {
        display: flex;
        align-items: center;
        padding: 8px 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        border-bottom: 1px solid #f3f4f6;
      }

      .course-search-result-item:hover {
        background: #f8fafc;
      }

      .course-search-result-item:last-child {
        border-bottom: none;
      }

      .course-search-result-icon {
        width: 24px;
        height: 24px;
        background: #f3f4f6;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        flex-shrink: 0;
      }

      .course-search-result-icon i {
        font-size: 12px;
        color: #6b7280;
      }

      .course-search-result-content {
        flex: 1;
        min-width: 0;
      }

      .course-search-result-title {
        font-size: 13px;
        font-weight: 600;
        color: #111827;
        margin-bottom: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .course-search-result-description {
        font-size: 11px;
        color: #6b7280;
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .course-search-empty {
        padding: 16px 12px;
        text-align: center;
        color: #6b7280;
        font-size: 12px;
      }

      @media (max-width: 768px) {
        .course-search-container {
          margin: 0 8px;
          width: 100%;
        }

        .course-search-input {
          min-width: 120px;
          font-size: 16px;
        }

        .course-search-results {
          right: 8px;
          left: 8px;
          min-width: auto;
        }
      }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  bindEvents() {
    const searchInput = this.searchContainer?.querySelector('#course-search-input');
    const searchButton = this.searchContainer?.querySelector('#course-search-button');
    const clearButton = this.searchContainer?.querySelector('#course-clear-search');
    const resultsContainer = this.searchContainer?.querySelector('#course-search-results');

    if (!searchInput || !resultsContainer) return;

    let debounceTimer = null;

    // Обработка ввода
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        this.performSearch(e.target.value);
      }, 300);
    });

    // Обработка клика по кнопке
    searchButton?.addEventListener('click', () => {
      this.performSearch(searchInput.value);
    });

    // Обработка очистки
    clearButton?.addEventListener('click', () => {
      searchInput.value = '';
      this.hideResults();
    });

    // Обработка клавиш
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.performSearch(searchInput.value);
      } else if (e.key === 'Escape') {
        this.hideResults();
      }
    });

    // Закрытие при клике вне
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.course-search-container')) {
        this.hideResults();
      }
    });
  }

  performSearch(query) {
    if (!query || query.trim().length < 2) {
      this.hideResults();
      return;
    }

    const results = this.searchInCourse(query);
    this.displayResults(results, query);
  }

  searchInCourse(query) {
    const searchTerm = query.toLowerCase().trim();
    const results = [];

    // Поиск по заголовкам
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      if (heading.textContent.toLowerCase().includes(searchTerm)) {
        results.push({
          type: 'heading',
          title: heading.textContent.trim(),
          description: this.getHeadingDescription(heading),
          element: heading,
          icon: 'fas fa-heading'
        });
      }
    });

    // Поиск по коду
    const codeBlocks = document.querySelectorAll('code, pre');
    codeBlocks.forEach(code => {
      if (code.textContent.toLowerCase().includes(searchTerm)) {
        const parentHeading = code.closest('section')?.querySelector('h2, h3, h4');
        results.push({
          type: 'code',
          title: code.textContent.substring(0, 50) + '...',
          description: parentHeading ? `В разделе: ${parentHeading.textContent}` : 'Фрагмент кода',
          element: code,
          icon: 'fas fa-code'
        });
      }
    });

    // Поиск по спискам
    const lists = document.querySelectorAll('ul, ol');
    lists.forEach(list => {
      const items = list.querySelectorAll('li');
      items.forEach(item => {
        if (item.textContent.toLowerCase().includes(searchTerm)) {
          const parentHeading = list.closest('section')?.querySelector('h2, h3, h4');
          results.push({
            type: 'list',
            title: item.textContent.trim().substring(0, 80) + '...',
            description: parentHeading ? `В разделе: ${parentHeading.textContent}` : 'Элемент списка',
            element: item,
            icon: 'fas fa-list'
          });
        }
      });
    });

    return results.slice(0, 10); // Ограничиваем до 10 результатов
  }

  getHeadingDescription(heading) {
    const nextElement = heading.nextElementSibling;
    if (nextElement && nextElement.tagName === 'P') {
      return nextElement.textContent.substring(0, 100) + '...';
    }
    return 'Заголовок раздела';
  }

  displayResults(results, query) {
    const content = this.searchContainer.querySelector('.course-search-results-content');
    if (!content) return;

    if (results.length === 0) {
      content.innerHTML = `
        <div class="course-search-empty">
          <i class="fas fa-search"></i><br>
          По запросу "${query}" ничего не найдено
        </div>
      `;
    } else {
      content.innerHTML = results.map(result => this.createResultItem(result, query)).join('');
    }

    this.showResults();

    // Добавляем обработчики кликов
    content.querySelectorAll('.course-search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        const element = item.dataset.element;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.style.backgroundColor = '#fef3c7';
          setTimeout(() => {
            element.style.backgroundColor = '';
          }, 2000);
        }
        this.hideResults();
      });
    });
  }

  createResultItem(result, query) {
    const highlightedTitle = this.highlightText(result.title, query);
    const highlightedDescription = this.highlightText(result.description, query);

    return `
      <div class="course-search-result-item" data-element="${result.element}">
        <div class="course-search-result-icon">
          <i class="${result.icon}"></i>
        </div>
        <div class="course-search-result-content">
          <div class="course-search-result-title">${highlightedTitle}</div>
          <div class="course-search-result-description">${highlightedDescription}</div>
        </div>
      </div>
    `;
  }

  highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${this.escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  showResults() {
    const resultsContainer = this.searchContainer?.querySelector('#course-search-results');
    if (resultsContainer) {
      resultsContainer.classList.remove('hidden');
    }
  }

  hideResults() {
    const resultsContainer = this.searchContainer?.querySelector('#course-search-results');
    if (resultsContainer) {
      resultsContainer.classList.add('hidden');
    }
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем, что мы на странице курса
  if (window.location.pathname.includes('/courses/')) {
    new CourseSearchSystem();
  }
});
