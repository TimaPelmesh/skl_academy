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

// Построение единого сайдбара для всех страниц Git-курса
function buildGitSidebar() {
    const structureContainer = document.querySelector('#sidebar .course-structure');
    if (!structureContainer) return;

    const currentFile = (location.pathname.split('/').pop() || '').toLowerCase();

    const modules = [
        {
            index: 1,
            file: '01-git-basics.html',
            title: '1. Философия и основы Git',
            sub: [
                { id: 'vcs-intro', text: '1.1 Что такое VCS и зачем Git' },
                { id: 'git-advantages', text: '1.2 Преимущества Git' },
                { id: 'key-concepts', text: '1.3 Репозиторий, коммит, SHA‑1' },
                { id: 'file-states', text: '1.4 modified/staged/committed' },
                { id: 'git-architecture', text: '1.5 Рабочая папка, index, .git' },
                { id: 'first-steps', text: '1.6 Первые шаги: init → add → commit → log' },
                { id: 'object-model', text: '1.7 Объектная модель Git' },
                { id: 'hashing', text: '1.8 Хеширование: SHA‑1 → SHA‑256' },
                { id: 'porcelain-vs-plumbing', text: '1.9 Porcelain vs Plumbing' },
                { id: 'index-deep-dive', text: '1.10 Индекс (staging) в деталях' },
                { id: 'snapshots-vs-diffs', text: '1.11 Снимки vs диффы' }
            ]
        },
        {
            index: 2,
            file: '02-commits-and-history.html',
            title: '2. Коммиты и история',
            sub: [
                { id: 'log-pro', text: '2.1 git log — продвинуто' },
                { id: 'git-show', text: '2.2 git show' },
                { id: 'amend', text: '2.3 git commit --amend' },
                { id: 'add-patch', text: '2.4 git add -p' },
                { id: 'gitignore', text: '2.5 .gitignore' },
                { id: 'commit-anatomy', text: '2.6 Анатомия коммита' },
                { id: 'author-committer', text: '2.7 Author vs Committer' },
                { id: 'messages-trailers', text: '2.8 Сообщения и трейлеры' },
                { id: 'ranges-selectors', text: '2.9 Диапазоны и селекторы' },
                { id: 'advanced-diff', text: '2.10 Продв. diff/log опции' },
                { id: 'pickaxe-pathspec', text: '2.11 Pickaxe и pathspec' },
                { id: 'pretty-formats', text: '2.12 Форматы вывода' }
            ]
        },
        {
            index: 3,
            file: '03-branching.html',
            title: '3. Ветвление',
            sub: [
                { id: 'branch-basics', text: '3.1 Что такое ветка, HEAD' },
                { id: 'create-switch', text: '3.2 Создание и переключение' },
                { id: 'list-delete', text: '3.3 Список и удаление' },
                { id: 'compare', text: '3.4 Сравнение веток' },
                { id: 'workflow', text: '3.5 Практика: feature‑ветка' },
                { id: 'detached', text: '3.6 Detached HEAD' },
                { id: 'upstream', text: '3.7 Upstream и tracking' },
                { id: 'remote-tracking', text: '3.8 Remote‑tracking ветки' },
                { id: 'refs-symrefs', text: '3.9 Refs и symrefs' },
                { id: 'naming', text: '3.10 Именование веток' }
            ]
        },
        {
            index: 4,
            file: '04-merging-and-conflicts.html',
            title: '4. Слияние и конфликты',
            sub: [
                { id: 'ff-vs-merge', text: '4.1 FF vs 3‑way' },
                { id: 'conflicts', text: '4.2 Почему конфликты' },
                { id: 'markers', text: '4.3 Маркеры конфликтов' },
                { id: 'resolve', text: '4.4 Разрешение' },
                { id: 'tools', text: '4.5 Инструменты' },
                { id: 'strategies', text: '4.6 Стратегии и опции merge' },
                { id: 'ort-recursive', text: '4.7 Алгоритмы ort/recursive' },
                { id: 'rename-whitespace', text: '4.8 Переименования и whitespace' },
                { id: 'rerere', text: '4.9 rerere: запоминание решений' },
                { id: 'squash-history', text: '4.10 Squash merge и история' }
            ]
        },
        {
            index: 5,
            file: '05-rebase.html',
            title: '5. Rebase',
            sub: [
                { id: 'rebase-vs-merge', text: '5.1 Rebase vs Merge' },
                { id: 'interactive', text: '5.2 Интерактивный rebase' },
                { id: 'conflicts', text: '5.3 Конфликты при rebase' },
                { id: 'rules', text: '5.4 Правила и безопасность' },
                { id: 'cleanup', text: '5.5 Практика: «чистим» историю' },
                { id: 'autosquash', text: '5.6 autosquash и --fixup' },
                { id: 'rebase-merges', text: '5.7 --rebase-merges' },
                { id: 'update-refs', text: '5.8 --update-refs' },
                { id: 'public-history', text: '5.9 Публичная история и reflog' },
                { id: 'monorepo', text: '5.10 Rebase в монорепо' }
            ]
        },
        {
            index: 6,
            file: '06-remotes.html',
            title: '6. Удалённые репозитории',
            sub: [
                { id: 'clone', text: '6.1 Клонирование' },
                { id: 'remotes', text: '6.2 Remotes' },
                { id: 'fetch-pull', text: '6.3 fetch/pull' },
                { id: 'push', text: '6.4 push/upstream' },
                { id: 'protocols', text: '6.5 SSH/HTTPS' },
                { id: 'tracking', text: '6.6 Tracking‑ветки' },
                { id: 'refspec', text: '6.7 Refspec' },
                { id: 'push-default', text: '6.8 push.default' },
                { id: 'prune', text: '6.9 Prune и housekeeping' },
                { id: 'shallow-partial', text: '6.10 Shallow/Partial clone' },
                { id: 'credentials', text: '6.11 URL и credential helpers' }
            ]
        },
        {
            index: 7,
            file: '07-teamwork-and-practices.html',
            title: '7. Командная работа',
            sub: [
                { id: 'pr', text: '7.1 Pull/Merge Request' },
                { id: 'review', text: '7.2 Code Review' },
                { id: 'tags', text: '7.3 Теги и релизы' },
                { id: 'stash', text: '7.4 git stash' },
                { id: 'cherry', text: '7.5 git cherry-pick' },
                { id: 'workflows', text: '7.6 Модели ветвления' },
                { id: 'protected', text: '7.7 Protected branches' },
                { id: 'signing', text: '7.8 Подпись коммитов' },
                { id: 'dco', text: '7.9 DCO и требования к PR' },
                { id: 'semver', text: '7.10 Семантическое версионирование' }
            ]
        },
        {
            index: 8,
            file: '08-recovery-and-troubleshooting.html',
            title: '8. Спасение и откаты',
            sub: [
                { id: 'restore', text: '8.1 restore/checkout' },
                { id: 'restore-source', text: '8.2 Вытаскивание из коммита' },
                { id: 'reset-revert', text: '8.3 reset vs revert' },
                { id: 'reflog', text: '8.4 reflog' },
                { id: 'algorithm', text: '8.5 Алгоритм спасения' },
                { id: 'reflog-retention', text: '8.6 Сроки хранения reflog' },
                { id: 'gc-pack', text: '8.7 Garbage collection и packfiles' },
                { id: 'fsck', text: '8.8 Проверка целостности: git fsck' },
                { id: 'revert-merge', text: '8.9 Revert merge‑коммита' },
                { id: 'reset-deep', text: '8.10 Глубже про reset' }
            ]
        },
        {
            index: 9,
            file: '09-tools-and-integrations.html',
            title: '9. Инструменты и интеграции',
            sub: [
                { id: 'gui', text: '9.1 GUI‑клиенты' },
                { id: 'ssh', text: '9.2 SSH‑ключи' },
                { id: 'hooks', text: '9.3 Git hooks (pre-commit)' },
                { id: 'ci', text: '9.4 CI/CD (GitHub Actions)' },
                { id: 'modern', text: '9.5 switch/restore' },
                { id: 'worktree', text: '9.6 worktree' },
                { id: 'submodule', text: '9.7 submodule' },
                { id: 'subtree', text: '9.8 subtree' },
                { id: 'lfs', text: '9.9 Git LFS' },
                { id: 'sparse', text: '9.10 sparse-checkout' },
                { id: 'bisect', text: '9.11 git bisect' },
                { id: 'blame', text: '9.12 git blame' },
                { id: 'attributes', text: '9.13 .gitattributes' },
                { id: 'filters', text: '9.14 clean/smudge фильтры' },
                { id: 'config-scopes', text: '9.15 Скоупы конфигурации' },
                { id: 'sign-commits', text: '9.16 Подписанные коммиты (GPG/SSH)' }
            ]
        },
        {
            index: 10,
            file: '10-summary-best-practices.html',
            title: '10. Сводная практика',
            sub: [
                { id: 'end-to-end', text: '10.1 Сквозной пример' },
                { id: 'best', text: '10.2 Лучшие практики' },
                { id: 'commit-style', text: '10.3 Стиль коммитов' },
                { id: 'history-hygiene', text: '10.4 Гигиена истории' },
                { id: 'repo-health', text: '10.5 Здоровье репозитория' },
                { id: 'security', text: '10.6 Безопасность секретов' }
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
        subtopics.forEach(link => {
            link.classList.remove('active');
        });
        
        if (subtopics[currentActiveIndex]) {
            subtopics[currentActiveIndex].classList.add('active');
        }
    }
}

// Вызываем генерацию и инициализацию при загрузке
document.addEventListener('DOMContentLoaded', function() {
    buildGitSidebar();
    initSidebarInteractions();
    setActiveSection();
});

// Кнопка контакта (i) и карточка – авто-добавление для страниц курса Git
(function contactFabGit() {
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

// ===== Переключение темы и цветовых схем =====
(function themeAndColorSwitcher() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const colorSchemeButtons = document.querySelectorAll('.color-scheme-btn');
    
    // Загружаем сохраненные настройки
    const savedTheme = localStorage.getItem('git-course-theme');
    const savedColorScheme = localStorage.getItem('git-course-color-scheme');
    
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
            localStorage.setItem('git-course-theme', theme);
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
            localStorage.setItem('git-course-color-scheme', colorScheme);
        });
    });
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
            toggleTheme();
        }
        setTimeout(syncMobileTheme, 100);
    });
    
    // Синхронизация цветовой схемы с десктопными кнопками
    function syncMobileColorScheme() {
        const activeColor = localStorage.getItem('git-course-color-scheme');
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
        attributeFilter: ['class']
    });
})();
