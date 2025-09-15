// ========================================
// ПОИСКОВАЯ СИСТЕМА SKL ACADEMY
// ========================================

class SearchSystem {
  constructor() {
    this.searchInput = document.getElementById('search-input');
    this.searchButton = document.getElementById('search-button');
    this.searchResults = document.getElementById('search-results');
    this.clearSearch = document.getElementById('clear-search');
    
    // Мобильные элементы
    this.mobileSearchToggle = document.getElementById('mobile-search-toggle');
    this.mobileSearchInput = document.getElementById('mobile-search-input');
    this.mobileSearchResults = document.getElementById('mobile-search-results');
    this.mobileClearSearch = document.getElementById('mobile-clear-search');
    
    this.debounceTimer = null;
    this.isSearchVisible = false;
    this.currentQuery = '';
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSearchData();
  }

  bindEvents() {
    // Десктопные события
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.handleSearch(e.target.value);
      });

      this.searchInput.addEventListener('focus', () => {
        if (this.currentQuery && this.isSearchVisible) {
          this.showResults();
        }
      });

      this.searchInput.addEventListener('keydown', (e) => {
        this.handleKeydown(e);
      });
    }

    if (this.searchButton) {
      this.searchButton.addEventListener('click', () => {
        this.performSearch();
      });
    }

    if (this.clearSearch) {
      this.clearSearch.addEventListener('click', () => {
        this.clearSearchResults();
      });
    }

    // Мобильные события
    if (this.mobileSearchToggle) {
      this.mobileSearchToggle.addEventListener('click', () => {
        this.toggleMobileSearch();
      });
    }

    if (this.mobileSearchInput) {
      this.mobileSearchInput.addEventListener('input', (e) => {
        this.handleMobileSearch(e.target.value);
      });

      this.mobileSearchInput.addEventListener('keydown', (e) => {
        this.handleMobileKeydown(e);
      });
    }

    if (this.mobileClearSearch) {
      this.mobileClearSearch.addEventListener('click', () => {
        this.closeMobileSearch();
      });
    }

    // Закрытие результатов при клике вне поисковика
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container') && !e.target.closest('.mobile-search-container')) {
        this.hideResults();
      }
    });

    // Обработка клавиши Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hideResults();
      }
    });
  }

  loadSearchData() {
    // Проверяем, загружены ли данные поиска
    if (typeof searchContent === 'undefined') {
      console.warn('Search data not loaded');
    }
  }

  handleSearch(query) {
    this.currentQuery = query;
    
    // Очищаем предыдущий таймер
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    // Устанавливаем новый таймер для дебаунса
    this.debounceTimer = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }

  handleMobileSearch(query) {
    this.currentQuery = query;
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.performMobileSearch(query);
    }, 300);
  }

  performSearch(query = null) {
    const searchQuery = query || this.searchInput.value;
    
    if (!searchQuery || searchQuery.trim().length < 2) {
      this.hideResults();
      return;
    }

    this.showLoadingState();
    
    // Имитация задержки для лучшего UX
    setTimeout(() => {
      const results = this.searchContent(searchQuery);
      this.displayResults(results, searchQuery);
    }, 100);
  }

  performMobileSearch(query = null) {
    const searchQuery = query || this.mobileSearchInput.value;
    
    if (!searchQuery || searchQuery.trim().length < 2) {
      this.hideMobileResults();
      return;
    }

    this.showMobileLoadingState();
    
    setTimeout(() => {
      const results = this.searchContent(searchQuery);
      this.displayMobileResults(results, searchQuery);
    }, 100);
  }

  searchContent(query) {
    if (typeof searchContent === 'undefined') {
      return [];
    }
    return searchContent(query);
  }

  displayResults(results, query) {
    if (!this.searchResults) return;

    const content = this.searchResults.querySelector('.search-results-content');
    if (!content) return;

    if (results.length === 0) {
      content.innerHTML = this.createEmptyState(query);
    } else {
      content.innerHTML = results.map(result => this.createResultItem(result, query)).join('');
    }

    this.showResults();
  }

  displayMobileResults(results, query) {
    if (!this.mobileSearchResults) return;

    const content = this.mobileSearchResults.querySelector('.mobile-search-results-content');
    if (!content) return;

    if (results.length === 0) {
      content.innerHTML = this.createEmptyState(query);
    } else {
      content.innerHTML = results.map(result => this.createResultItem(result, query)).join('');
    }

    this.showMobileResults();
  }

  createResultItem(result, query) {
    const highlightedTitle = this.highlightText(result.title, query);
    const highlightedDescription = this.highlightText(result.description, query);
    
    const typeClass = result.type === 'course' ? 'course' : 
                     result.type === 'article' ? 'article' : 'lesson';
    
    const typeText = result.type === 'course' ? 'КУРС' : 
                    result.type === 'article' ? 'СТАТЬЯ' : 'УРОК';

    let statusBadge = '';
    if (result.status === 'planned') {
      statusBadge = '<span class="search-result-type planned">ПЛАНИРУЕТСЯ</span>';
    } else if (result.status === 'ready') {
      statusBadge = '<span class="search-result-type ready">ГОТОВ</span>';
    }

    let readTimeBadge = '';
    if (result.readTime) {
      readTimeBadge = `<span class="search-result-type readtime">${result.readTime}</span>`;
    }

    let courseInfo = '';
    if (result.courseTitle) {
      courseInfo = `<div class="search-result-course">Курс: ${result.courseTitle}</div>`;
    }

    return `
      <div class="search-result-item" data-url="${result.url}" data-type="${result.type}">
        <div class="search-result-icon">
          <i class="${result.icon}"></i>
        </div>
        <div class="search-result-content">
          <div class="search-result-title">${highlightedTitle}</div>
          <div class="search-result-description">${highlightedDescription}</div>
          ${courseInfo}
        </div>
        <div class="search-result-badges">
          <span class="search-result-type ${typeClass}">${typeText}</span>
          ${statusBadge}
          ${readTimeBadge}
        </div>
      </div>
    `;
  }

  createEmptyState(query) {
    const suggestions = this.getSuggestions(query);
    let suggestionsHtml = '';
    
    if (suggestions.length > 0) {
      suggestionsHtml = `
        <div class="search-suggestions">
          <div class="search-suggestions-title">Возможно, вы искали:</div>
          <div class="search-suggestions-list">
            ${suggestions.map(suggestion => 
              `<span class="search-suggestion" data-suggestion="${suggestion}">${suggestion}</span>`
            ).join('')}
          </div>
        </div>
      `;
    }

    return `
      <div class="search-empty">
        <i class="fas fa-search"></i>
        <div class="search-empty-text">По запросу "${query}" ничего не найдено</div>
        ${suggestionsHtml}
      </div>
    `;
  }

  getSuggestions(query) {
    const popularQueries = getPopularQueries ? getPopularQueries() : [];
    return popularQueries.filter(popular => 
      popular.toLowerCase().includes(query.toLowerCase()) && 
      popular.toLowerCase() !== query.toLowerCase()
    ).slice(0, 3);
  }

  highlightText(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${this.escapeRegExp(query)})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  showLoadingState() {
    if (!this.searchResults) return;
    
    const content = this.searchResults.querySelector('.search-results-content');
    if (content) {
      content.innerHTML = `
        <div class="search-loading">
          <i class="fas fa-spinner"></i>
          <div>Поиск...</div>
        </div>
      `;
    }
    this.showResults();
  }

  showMobileLoadingState() {
    if (!this.mobileSearchResults) return;
    
    const content = this.mobileSearchResults.querySelector('.mobile-search-results-content');
    if (content) {
      content.innerHTML = `
        <div class="search-loading">
          <i class="fas fa-spinner"></i>
          <div>Поиск...</div>
        </div>
      `;
    }
    this.showMobileResults();
  }

  showResults() {
    if (this.searchResults) {
      this.searchResults.classList.remove('hidden');
      this.isSearchVisible = true;
    }
  }

  showMobileResults() {
    if (this.mobileSearchResults) {
      this.mobileSearchResults.classList.remove('hidden');
    }
  }

  hideResults() {
    if (this.searchResults) {
      this.searchResults.classList.add('hidden');
      this.isSearchVisible = false;
    }
  }

  hideMobileResults() {
    if (this.mobileSearchResults) {
      this.mobileSearchResults.classList.add('hidden');
    }
  }

  clearSearchResults() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.currentQuery = '';
    this.hideResults();
  }

  clearMobileSearchResults() {
    if (this.mobileSearchInput) {
      this.mobileSearchInput.value = '';
    }
    this.currentQuery = '';
    this.hideMobileResults();
  }

  toggleMobileSearch() {
    if (this.mobileSearchResults.classList.contains('hidden')) {
      this.openMobileSearch();
    } else {
      this.closeMobileSearch();
    }
  }

  openMobileSearch() {
    if (this.mobileSearchResults) {
      this.mobileSearchResults.classList.remove('hidden');
      this.mobileSearchToggle.classList.add('active');
      document.body.style.overflow = 'hidden'; // Блокируем прокрутку
      
      // Фокусируемся на поле ввода
      setTimeout(() => {
        if (this.mobileSearchInput) {
          this.mobileSearchInput.focus();
        }
      }, 100);
    }
  }

  closeMobileSearch() {
    if (this.mobileSearchResults) {
      this.mobileSearchResults.classList.add('hidden');
      this.mobileSearchToggle.classList.remove('active');
      document.body.style.overflow = ''; // Восстанавливаем прокрутку
      
      // Очищаем поле ввода
      if (this.mobileSearchInput) {
        this.mobileSearchInput.value = '';
      }
      this.currentQuery = '';
    }
  }

  handleKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.performSearch();
    } else if (e.key === 'Escape') {
      this.hideResults();
    }
  }

  handleMobileKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.performMobileSearch();
    } else if (e.key === 'Escape') {
      this.hideMobileResults();
    }
  }
}

// Обработка кликов по результатам поиска
document.addEventListener('click', (e) => {
  const resultItem = e.target.closest('.search-result-item');
  if (resultItem) {
    const url = resultItem.dataset.url;
    const type = resultItem.dataset.type;
    
    if (url && url !== '404.html') {
      // Отправляем аналитику
      if (typeof ym !== 'undefined') {
        ym(102262736, 'reachGoal', 'search_result_click', {
          query: window.searchSystem?.currentQuery || '',
          result_type: type,
          result_url: url
        });
      }
      
      // Переходим на страницу
      window.location.href = url;
    }
  }

  // Обработка кликов по предложениям
  const suggestion = e.target.closest('.search-suggestion');
  if (suggestion) {
    const suggestionText = suggestion.dataset.suggestion;
    const searchInput = document.getElementById('search-input') || document.getElementById('mobile-search-input');
    if (searchInput) {
      searchInput.value = suggestionText;
      searchInput.dispatchEvent(new Event('input'));
    }
  }
});

// Инициализация поисковой системы
document.addEventListener('DOMContentLoaded', () => {
  window.searchSystem = new SearchSystem();
});

// Добавляем стили для подсветки и предложений
const searchStyles = `
  .search-highlight {
    background: #fef3c7;
    color: #92400e;
    padding: 1px 2px;
    border-radius: 2px;
    font-weight: 600;
  }

  .search-suggestions {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid #e5e7eb;
  }

  .search-suggestions-title {
    font-size: 12px;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 8px;
  }

  .search-suggestions-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .search-suggestion {
    font-size: 11px;
    padding: 4px 8px;
    background: #f3f4f6;
    color: #374151;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .search-suggestion:hover {
    background: #e5e7eb;
    color: #111827;
  }

  .search-result-badges {
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: flex-end;
  }

  .search-result-type.planned {
    background: #fee2e2;
    color: #dc2626;
  }

  .search-result-type.ready {
    background: #dcfce7;
    color: #16a34a;
  }

  .search-result-type.readtime {
    background: #e0e7ff;
    color: #3730a3;
  }

  .search-result-course {
    font-size: 11px;
    color: #9ca3af;
    margin-top: 2px;
    font-style: italic;
  }

  .search-results-content::-webkit-scrollbar {
    width: 6px;
  }

  .search-results-content::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  .search-results-content::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .search-results-content::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

// Добавляем стили в head
const styleSheet = document.createElement('style');
styleSheet.textContent = searchStyles;
document.head.appendChild(styleSheet);
