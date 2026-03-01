/**
 * SKL Academy — единый скрипт для всех курсов.
 * Подключать: <script src="../courses.js"></script>
 * На <body> задать data-course="python" | "git" | "web" | "english" | "linux" | "windows" | "networks" | "ai" | "oge"
 */
(function() {
    const COURSE_ID = (document.body && document.body.getAttribute('data-course')) || 'default';

    // Переключение боковой панели
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');

    function initSidebarState() {
        if (!sidebar || !content) return;
        if (window.innerWidth > 991) {
            sidebar.classList.add('active');
            content.classList.add('sidebar-active');
        } else {
            sidebar.classList.remove('active');
            content.classList.remove('sidebar-active');
        }
    }

    if (menuToggle && sidebar && content) {
        initSidebarState();
        window.addEventListener('resize', initSidebarState);
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
            content.classList.toggle('sidebar-active');
        });
    }

    // Раскрытие тем
    function initSidebarInteractions() {
        document.querySelectorAll('.topic-btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.classList.toggle('active');
                var subtopics = this.nextElementSibling;
                if (subtopics && subtopics.classList.contains('subtopics')) {
                    if (subtopics.style.maxHeight && subtopics.style.maxHeight !== '0px' && subtopics.style.maxHeight !== '') {
                        subtopics.style.maxHeight = null;
                    } else {
                        subtopics.style.maxHeight = subtopics.scrollHeight + 'px';
                    }
                }
            });
        });

        document.querySelectorAll('.subtopic').forEach(function(link) {
            link.addEventListener('click', function(e) {
                if ((this.getAttribute('href') || '').indexOf('#') !== 0) return;
                e.preventDefault();
                document.querySelectorAll('.subtopic').forEach(function(item) { item.classList.remove('active'); });
                this.classList.add('active');
                var targetId = this.getAttribute('href').slice(1);
                var targetSection = document.getElementById(targetId);
                if (targetSection) {
                    var header = document.querySelector('header');
                    var offset = (header ? header.offsetHeight : 0) + 20;
                    var scrollTarget = getScrollTargetForSection(targetSection);
                    smoothScrollToElement(scrollTarget, offset);
                }
                if (sidebar && sidebar.classList.contains('active') && window.innerWidth <= 991) {
                    if (menuToggle) menuToggle.classList.remove('active');
                    sidebar.classList.remove('active');
                    if (content) content.classList.remove('sidebar-active');
                }
            });
        });
    }

    /** При переходе на первый блок модуля прокручиваем к заголовку части, чтобы было видно название модуля */
    function getScrollTargetForSection(section) {
        if (!section || !section.classList.contains('topic-section')) return section;
        var main = document.getElementById('content');
        if (!main) return section;
        var firstSection = main.querySelector('.topic-section');
        if (firstSection !== section) return section;
        var wrap = main.querySelector('.part-title-wrap');
        return wrap || section;
    }

    function smoothScrollToElement(element, offset) {
        if (!element) return;
        var targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        var startPosition = window.pageYOffset;
        var distance = targetPosition - startPosition;
        var duration = 800;
        var startTime = null;
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var progress = Math.min(timeElapsed / duration, 1);
            window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        requestAnimationFrame(animation);
    }

    function setActiveSection() {
        var sections = document.querySelectorAll('.topic-section');
        var subtopics = document.querySelectorAll('.subtopic[href^="#"]');
        if (!sections.length || !subtopics.length) return;
        var header = document.querySelector('header');
        var headerHeight = header ? header.offsetHeight : 0;
        var scrollPosition = window.scrollY + headerHeight + 50;
        var currentActiveIndex = -1;
        sections.forEach(function(section, index) {
            var sectionTop = section.offsetTop;
            var sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) currentActiveIndex = index;
        });
        if (currentActiveIndex >= 0) {
            subtopics.forEach(function(link) { link.classList.remove('active'); });
            if (subtopics[currentActiveIndex]) subtopics[currentActiveIndex].classList.add('active');
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            initSidebarInteractions();
            setActiveSection();
            // В курсе «Веб» на каждой странице раскрыты все модули (подпункты видны), как удобная навигация
            if (COURSE_ID === 'web' && sidebar) {
                sidebar.querySelectorAll('.subtopics').forEach(function(el) {
                    el.style.maxHeight = '9999px';
                });
            }
        }, 100);
    });

    window.addEventListener('scroll', setActiveSection);

    document.addEventListener('DOMContentLoaded', function() {
        if (window.location.hash) {
            window.scrollTo(0, 0);
            setTimeout(function() {
                var targetId = window.location.hash.slice(1);
                var targetElement = document.getElementById(targetId);
                if (targetElement) {
                    var header = document.querySelector('header');
                    var scrollTarget = getScrollTargetForSection(targetElement);
                    smoothScrollToElement(scrollTarget, (header ? header.offsetHeight : 0) + 20);
                    var relatedLink = document.querySelector('.subtopic[href="#' + targetId + '"]');
                    if (relatedLink) {
                        document.querySelectorAll('.subtopic').forEach(function(item) { item.classList.remove('active'); });
                        relatedLink.classList.add('active');
                        var parentTopic = relatedLink.closest('.subtopics');
                        if (parentTopic && !parentTopic.style.maxHeight) {
                            var topicBtn = parentTopic.previousElementSibling;
                            if (topicBtn && topicBtn.classList.contains('topic-btn')) topicBtn.click();
                        }
                    }
                }
            }, 100);
        }
    });

    // Подсветка синтаксиса
    document.addEventListener('DOMContentLoaded', function() {
        if (window.hljs) {
            document.querySelectorAll('pre code').forEach(function(block) {
                hljs.highlightBlock(block);
            });
        }
    });

    // Кнопка контакта (i)
    (function initContact() {
        function run() {
            var fab = document.getElementById('contactFab');
            var card = document.getElementById('contactCard');
            var frag = document.createDocumentFragment();
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
                card.innerHTML = '<h4>Есть вопросы — пиши:</h4><div class="contact-links"><a href="https://t.me/tima_pelmeshka" target="_blank" rel="noopener">Telegram</a><a href="mailto:mr.tim.pumpkin@gmail.com">mr.tim.pumpkin@gmail.com</a></div>';
                frag.appendChild(card);
            }
            if (frag.childNodes.length) document.body.appendChild(frag);
            function toggle(force) {
                var willOpen = typeof force === 'boolean' ? force : !card.classList.contains('active');
                card.classList.toggle('active', willOpen);
                card.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
                fab.textContent = willOpen ? '×' : 'i';
                fab.setAttribute('aria-label', willOpen ? 'Закрыть контакты' : 'Открыть контакты');
                fab.setAttribute('title', willOpen ? 'Закрыть' : 'Есть вопросы?');
            }
            fab.addEventListener('click', function(e) { e.preventDefault(); e.stopPropagation(); toggle(); });
            document.addEventListener('click', function(e) {
                if (!card.classList.contains('active')) return;
                var el = e.target;
                if (el === card || el === fab || card.contains(el)) return;
                toggle(false);
            });
        }
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
        else run();
    })();

    // Прогресс-бар чтения и scrolled для header
    (function headerEnhancements() {
        var header = document.querySelector('header');
        if (!header) return;
        function update() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var documentHeight = document.documentElement.scrollHeight;
            var windowHeight = window.innerHeight;
            var progress = (documentHeight - windowHeight) > 0 ? (scrollTop / (documentHeight - windowHeight)) * 100 : 0;
            header.style.setProperty('--scroll-progress', Math.min(progress, 100) + '%');
            header.classList.toggle('scrolled', scrollTop > 50);
        }
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
    })();

    // Тема (светлая/тёмная). Цветовая схема — только фиолетовая (#4f46e5)
    (function themeAndColorSwitcher() {
        var body = document.body;
        var themeKey = 'skl-course-theme';
        var themeToggle = document.getElementById('themeToggle');

        if (localStorage.getItem(themeKey) === 'dark') body.classList.add('dark-theme');
        body.setAttribute('data-color-scheme', 'purple');

        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                body.classList.toggle('dark-theme');
                localStorage.setItem(themeKey, body.classList.contains('dark-theme') ? 'dark' : 'light');
            });
        }
    })();

    // Мобильное меню настроек
    (function mobileSettings() {
        var trigger = document.getElementById('mobileSettingsTrigger');
        var menu = document.getElementById('mobileSettingsMenu');
        var closeBtn = document.getElementById('mobileSettingsClose');
        var mobileTheme = document.getElementById('mobileThemeToggle');
        var desktopTheme = document.getElementById('themeToggle');
        var themeKey = 'skl-course-theme';

        if (!trigger || !menu) return;

        function closeMenu() {
            menu.classList.remove('active');
            document.body.style.overflow = '';
        }
        trigger.addEventListener('click', function() {
            menu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        closeBtn.addEventListener('click', closeMenu);
        menu.addEventListener('click', function(e) { if (e.target === menu) closeMenu(); });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('active')) closeMenu();
        });

        function syncMobileTheme() {
            var label = mobileTheme && mobileTheme.querySelector('.theme-label');
            if (label) label.textContent = document.body.classList.contains('dark-theme') ? 'Тёмная' : 'Светлая';
        }
        if (mobileTheme) {
            mobileTheme.addEventListener('click', function() {
                if (desktopTheme) desktopTheme.click();
                else {
                    document.body.classList.toggle('dark-theme');
                    localStorage.setItem(themeKey, document.body.classList.contains('dark-theme') ? 'dark' : 'light');
                }
                setTimeout(syncMobileTheme, 100);
            });
        }

        syncMobileTheme();
        var obs = new MutationObserver(function() { syncMobileTheme(); });
        obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    })();
})();
