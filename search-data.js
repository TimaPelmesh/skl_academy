// ========================================
// ДАННЫЕ ДЛЯ ПОИСКОВОЙ СИСТЕМЫ SKL ACADEMY
// ========================================

// Структура данных для поиска по всему сайту
const SEARCH_DATA = {
  // Курсы
  courses: [
    {
      id: 'ai',
      title: 'Введение в AI',
      description: 'Курс про искусственный интеллект: нейросети, LLM (большие языковые модели), движки и алгоритмы, модели прогнозов — CatBoost, LightGBM, XGBoost и другие. Понимание работы ИИ и машинного обучения.',
      url: 'courses/ai/00-about-course.html',
      icon: 'fas fa-brain',
      tags: ['искусственный интеллект', 'нейросети', 'llm', 'машинное обучение', 'catboost', 'lightgbm', 'xgboost', 'градиентный бустинг', 'трансформер', 'nlp', 'ml', 'ai'],
      lessons: [
        { title: 'О курсе', url: 'courses/ai/00-about-course.html', description: 'Обзор курса Введение в AI' },
        { title: '1. Фундамент: математика и логика', url: 'courses/ai/01-math-logic.html', description: 'Линейная алгебра, производные и градиент, вероятность, статистика' },
        { title: '2. Введение в ML и типы задач', url: 'courses/ai/02-ml-intro.html', description: 'Supervised, unsupervised, RL, пайплайн ML' },
        { title: '3. Классические алгоритмы', url: 'courses/ai/03-classical-ml.html', description: 'Линейная и логистическая регрессия, KNN, решающие деревья' },
        { title: '4. Ансамблевые методы', url: 'courses/ai/04-ensembles.html', description: 'Random Forest, градиентный бустинг, CatBoost, LightGBM' },
        { title: '5. Введение в нейросети', url: 'courses/ai/05-neural-intro.html', description: 'Перцептрон, активации, MLP, Forward Pass' },
        { title: '6. Backpropagation и оптимизация', url: 'courses/ai/06-backprop-optimization.html', description: 'Loss, backprop, градиентный спуск, проблемы обучения' },
        { title: '7. RNN и LSTM', url: 'courses/ai/07-rnn-lstm.html', description: 'Последовательные данные, RNN, долгосрочная память, LSTM' },
        { title: '8. Attention и Трансформеры', url: 'courses/ai/08-attention-transformers.html', description: 'Механизм внимания, Transformer, позиционное кодирование' },
        { title: '9. LLM', url: 'courses/ai/09-llm.html', description: 'Токенизация, эмбеддинги, pre-training, температура, контекст' },
        { title: '10. Практикум и MLOps', url: 'courses/ai/10-practice-mlops.html', description: 'Pandas, NumPy, Scikit-learn, PyTorch, TensorFlow, MLOps' }
      ]
    },
    {
      id: 'math',
      title: 'Математика',
      description: 'Справочник и курс по школьной математике: числа, арифметика, алгебра, функции, геометрия, тригонометрия, прогрессии. Подготовка к ОГЭ и ЕГЭ, формулы и разбор заданий.',
      url: 'courses/math/01-part1-baza.html',
      icon: 'fas fa-calculator',
      tags: ['математика', 'алгебра', 'геометрия', 'огэ', 'егэ', 'дроби', 'уравнения', 'функции', 'тригонометрия', 'прогрессии', 'формулы', 'справочник'],
      lessons: [
        { title: 'Часть I: База (числа и арифметика)', url: 'courses/math/01-part1-baza.html', description: 'Числа, дроби, проценты, степени, корни' },
        { title: 'Часть II: Алгебра и преобразования', url: 'courses/math/02-part2-algebra.html', description: 'Многочлены, уравнения, неравенства, системы' },
        { title: 'Часть III: Функции и графики', url: 'courses/math/03-part3-functions.html', description: 'Координаты, функции, линейная, квадратичная, графики' },
        { title: 'Часть IV: Геометрия (планиметрия)', url: 'courses/math/04-part4-geometry.html', description: 'Углы, треугольники, окружность, четырёхугольники, площади' },
        { title: 'Часть V: Тригонометрия и прогрессии', url: 'courses/math/05-part5-trigonometry.html', description: 'Синус, косинус, тангенс, арифметическая и геометрическая прогрессии' },
        { title: 'Часть VI: Задачи и формулы под ОГЭ', url: 'courses/math/06-part6-oge.html', description: 'Структура ОГЭ, разбор заданий по темам' },
        { title: 'Часть VII: Задачи и формулы под ЕГЭ', url: 'courses/math/07-part7-ege.html', description: 'Структура ЕГЭ профиль, разбор заданий' },
        { title: 'Справочные таблицы', url: 'courses/math/08-reference.html', description: 'Все основные формулы: ОГЭ и ЕГЭ' }
      ]
    },
    {
      id: 'networks',
      title: 'Компьютерные сети',
      description: 'Изучите компьютерные сети: от основ до продвинутых технологий. Модель OSI, TCP/IP, IP-адресация, коммутация, маршрутизация, VLAN, протоколы OSPF, BGP, EIGRP, IS-IS, RIP, MPLS, VXLAN, EVPN, QoS, Multicast, VPN, IPSec, firewall, ACL, NAT, IPv4, IPv6, CIDR, VLSM, STP, LACP, DNS, DHCP, HTTP, FTP, SMTP, беспроводные сети Wi-Fi 802.11, WPA, безопасность, Wireshark, Packet Tracer, GNS3, CCNA, SDN, SD-WAN, LTE, 5G, IoT, MQTT, Kubernetes, data center, cloud networking.',
      url: 'courses/networks/01-networks-fundamental.html',
      icon: 'fas fa-network-wired',
      tags: ['сети', 'tcp/ip', 'osi', 'ip-адресация', 'коммутация', 'маршрутизация', 'vlan', 'безопасность', 'cisco', 'ospf', 'bgp', 'eigrp', 'rip', 'is-is', 'mpls', 'vxlan', 'evpn', 'qos', 'multicast', 'vpn', 'ipsec', 'firewall', 'acl', 'nat', 'pat', 'ipv4', 'ipv6', 'cidr', 'vlsm', 'stp', 'rstp', 'mstp', 'lacp', 'etherchannel', 'dns', 'dhcp', 'http', 'https', 'ftp', 'smtp', 'pop3', 'imap', 'tcp', 'udp', 'icmp', 'arp', 'ppp', 'hdlc', 'rsvp', 'ssl', 'tls', 'snmp', 'syslog', 'netflow', 'vtp', 'dtp', 'wireless', '802.11', 'wifi', 'wpa', 'wpa2', 'wpa3', 'wireshark', 'packet tracer', 'gns3', 'eve-ng', 'ccna', 'ccnp', 'sdn', 'sd-wan', 'lte', '5g', 'iot', 'mqtt', 'coap', 'kubernetes', 'docker', 'data center', 'cloud', 'aws', 'azure', 'gcp', 'vpc', 'optics', 'dwdm', 'cwdm', 'подсети', 'суbnetting', 'ids', 'ips', 'campus network'],
      lessons: [
        { title: 'Основы сетей', url: 'courses/networks/01-networks-fundamental.html', description: 'Основы компьютерных сетей и модели OSI' },
        { title: 'Модели OSI и TCP/IP', url: 'courses/networks/02-osi-tcp-ip-models.html', description: 'Архитектурные модели сетей' },
        { title: 'Ethernet и коммутация', url: 'courses/networks/03-ethernet-switching.html', description: 'Технологии Ethernet и коммутаторы' },
        { title: 'IP-адресация', url: 'courses/networks/04-ip-addressing-and-routing.html', description: 'IP-адреса и маршрутизация' },
        { title: 'Маршрутизация', url: 'courses/networks/05-routing.html', description: 'Протоколы маршрутизации OSPF, BGP, EIGRP, IS-IS, RIP' },
        { title: 'Транспортный уровень', url: 'courses/networks/06-transport-layer.html', description: 'TCP и UDP протоколы' },
        { title: 'Прикладные протоколы', url: 'courses/networks/07-application-protocols.html', description: 'HTTP, DNS, DHCP, SMTP, FTP и другие' },
        { title: 'Безопасность сетей', url: 'courses/networks/08-network-security.html', description: 'VPN, IPSec, Firewall, ACL, шифрование' },
        { title: 'Диагностика сетей', url: 'courses/networks/09-diagnostics-and-tools.html', description: 'Wireshark, Packet Tracer, GNS3 и другие инструменты' },
        { title: 'Продвинутые темы', url: 'courses/networks/10-advanced-topics.html', description: 'MPLS, VXLAN, EVPN, SDN, SD-WAN, 5G, IoT, Kubernetes' }
      ]
    },
    {
      id: 'python',
      title: 'Python',
      description: 'Освойте Python - от основ до продвинутых техник программирования. Синтаксис, ООП, работа с файлами, модули, декораторы, асинхронность и многое другое.',
      url: 'courses/python/01-python-basics.html',
      icon: 'fab fa-python',
      tags: ['python', 'программирование', 'синтаксис', 'ооп', 'функции', 'модули', 'декораторы', 'асинхронность'],
      lessons: [
        { title: 'Основы Python', url: 'courses/python/01-python-basics.html', description: 'Установка, синтаксис и переменные' },
        { title: 'Управление потоком', url: 'courses/python/02-control-flow.html', description: 'Условные операторы и циклы' },
        { title: 'Функции', url: 'courses/python/03-functions.html', description: 'Создание и использование функций' },
        { title: 'Структуры данных', url: 'courses/python/04-data-structures.html', description: 'Списки, словари, множества' },
        { title: 'ООП', url: 'courses/python/05-oop.html', description: 'Объектно-ориентированное программирование' },
        { title: 'Работа с файлами', url: 'courses/python/06-file-handling.html', description: 'Чтение и запись файлов' },
        { title: 'Модули и пакеты', url: 'courses/python/07-modules-and-packages.html', description: 'Организация кода' },
        { title: 'Продвинутые темы', url: 'courses/python/08-advanced-topics.html', description: 'Декораторы, генераторы, контекстные менеджеры' },
        { title: 'Типизация и тестирование', url: 'courses/python/09-typing-testing-and-quality.html', description: 'Type hints, pytest, качество кода' },
        { title: 'Производительность и упаковка', url: 'courses/python/10-concurrency-performance-packaging.html', description: 'Многопоточность, оптимизация, pip' }
      ]
    },
    {
      id: 'git',
      title: 'Git',
      description: 'Изучите Git - самую популярную систему контроля версий. Основные команды, ветвление, GitHub, Pull Request, Issues и командная работа.',
      url: 'courses/git/01-git-basics.html',
      icon: 'fab fa-git-alt',
      tags: ['git', 'github', 'версионирование', 'ветвление', 'коммиты', 'pull request', 'issues'],
      lessons: [
        { title: 'Основы Git', url: 'courses/git/01-git-basics.html', description: 'Введение в Git и первые команды' },
        { title: 'Коммиты и история', url: 'courses/git/02-commits-and-history.html', description: 'Работа с коммитами и историей' },
        { title: 'Ветвление', url: 'courses/git/03-branching.html', description: 'Создание и переключение веток' },
        { title: 'Слияние и конфликты', url: 'courses/git/04-merging-and-conflicts.html', description: 'Объединение веток и решение конфликтов' },
        { title: 'Rebase', url: 'courses/git/05-rebase.html', description: 'Перебазирование коммитов' },
        { title: 'Удаленные репозитории', url: 'courses/git/06-remotes.html', description: 'Работа с GitHub и другими удаленными репозиториями' },
        { title: 'Командная работа', url: 'courses/git/07-teamwork-and-practices.html', description: 'Best practices для командной разработки' },
        { title: 'Восстановление и отладка', url: 'courses/git/08-recovery-and-troubleshooting.html', description: 'Исправление ошибок и восстановление данных' },
        { title: 'Инструменты и интеграции', url: 'courses/git/09-tools-and-integrations.html', description: 'GUI клиенты и интеграции с IDE' },
        { title: 'Итоги и лучшие практики', url: 'courses/git/10-summary-best-practices.html', description: 'Резюме и рекомендации' }
      ]
    },
    {
      id: 'web',
      title: 'Веб-разработка',
      description: 'Создавайте современные веб-сайты с помощью HTML и CSS. HTML5, семантическая верстка, CSS3, Flexbox, Grid, анимации и адаптивный дизайн.',
      url: 'courses/web/01-html-basics.html',
      icon: 'fab fa-html5',
      tags: ['html', 'css', 'веб-разработка', 'верстка', 'flexbox', 'grid', 'адаптивный дизайн', 'javascript'],
      lessons: [
        { title: 'Основы HTML', url: 'courses/web/01-html-basics.html', description: 'Структура HTML документа и семантика' },
        { title: 'Основы CSS', url: 'courses/web/02-css-basics.html', description: 'Стилизация и селекторы CSS' },
        { title: 'Основы JavaScript', url: 'courses/web/03-javascript-basics.html', description: 'Основы программирования на JavaScript' }
      ]
    },
    {
      id: 'linux',
      title: 'Linux и Bash',
      description: 'Освойте Linux и Bash - основу современной IT-инфраструктуры. Основы Linux, файловая система, Bash-скрипты, автоматизация и управление процессами.',
      url: 'courses/linux/01-linux-basics.html',
      icon: 'fab fa-linux',
      tags: ['linux', 'bash', 'терминал', 'командная строка', 'файловая система', 'скрипты', 'автоматизация'],
      lessons: [
        { title: 'Основы Linux', url: 'courses/linux/01-linux-basics.html', description: 'Введение в Linux и установка' },
        { title: 'Файловая система', url: 'courses/linux/02-file-system.html', description: 'Структура файловой системы и навигация' },
        { title: 'Операции с файлами', url: 'courses/linux/03-file-operations.html', description: 'Создание, копирование, перемещение файлов' },
        { title: 'Права доступа', url: 'courses/linux/04-permissions.html', description: 'Система прав доступа в Linux' },
        { title: 'Процессы', url: 'courses/linux/05-processes.html', description: 'Управление процессами и сервисами' },
        { title: 'Перенаправление', url: 'courses/linux/06-redirection.html', description: 'Перенаправление ввода и вывода' },
        { title: 'Поиск', url: 'courses/linux/07-search.html', description: 'Поиск файлов и текста' },
        { title: 'Скриптинг', url: 'courses/linux/08-scripting.html', description: 'Написание bash-скриптов' },
        { title: 'Сети', url: 'courses/linux/09-networking.html', description: 'Сетевые возможности Linux' }
      ]
    },
    {
      id: 'windows',
      title: 'Windows и PowerShell',
      description: 'Изучите Windows PowerShell и автоматизацию в экосистеме Microsoft. PowerShell командлеты и модули, управление Windows через CLI и автоматизация.',
      url: 'courses/windows/01-windows-basics.html',
      icon: 'fab fa-windows',
      tags: ['windows', 'powershell', 'автоматизация', 'командлеты', 'модули', 'cli'],
      lessons: [
        { title: 'Основы Windows', url: 'courses/windows/01-windows-basics.html', description: 'Введение в Windows и интерфейс' },
        { title: 'Основы PowerShell', url: 'courses/windows/02-powershell-basics.html', description: 'Командная строка PowerShell' },
        { title: 'Файловая система', url: 'courses/windows/03-file-system.html', description: 'Работа с файлами в Windows' },
        { title: 'Реестр', url: 'courses/windows/04-registry.html', description: 'Системный реестр Windows' },
        { title: 'Службы', url: 'courses/windows/05-services.html', description: 'Управление службами Windows' },
        { title: 'Сети', url: 'courses/windows/06-networking.html', description: 'Сетевые настройки Windows' },
        { title: 'Безопасность', url: 'courses/windows/07-security.html', description: 'Безопасность Windows' },
        { title: 'Автоматизация', url: 'courses/windows/08-automation.html', description: 'Автоматизация задач' },
        { title: 'Устранение неполадок', url: 'courses/windows/09-troubleshooting.html', description: 'Диагностика и исправление проблем' },
        { title: 'Продвинутые темы', url: 'courses/windows/10-advanced-topics.html', description: 'Расширенные возможности Windows' }
      ]
    },
    {
      id: 'unity',
      title: 'Unity',
      description: 'Создавайте 2D и 3D игры с помощью Unity - одного из самых популярных игровых движков. Основы Unity и интерфейс редактора, программирование на C# для Unity, физика, анимация и UI системы.',
      url: '404.html',
      icon: 'fas fa-gamepad',
      tags: ['unity', 'игры', 'csharp', 'физика', 'анимация', 'ui', '2d', '3d'],
      status: 'planned'
    }
  ],

  // Статьи
  articles: [
    {
      id: 'first-python-program',
      title: 'Первая программа на Python: от установки до библиотек',
      description: 'Пошаговое руководство по созданию первой программы на Python с изучением популярной библиотеки. Установка Python, настройка окружения, первая программа и работа с библиотеками.',
      url: 'articles/first-python-program.html',
      icon: 'fab fa-python',
      tags: ['python', 'api', 'requests', 'библиотеки', 'установка', 'первая программа'],
      readTime: '15 мин',
      published: true
    },
    {
      id: 'tkinter-notes-app',
      title: 'Создаем красивое приложение заметок на tkinter',
      description: 'Создаем стильное приложение для заметок с современным интерфейсом на Python tkinter. GUI разработка, создание интерфейса, работа с файлами и сохранение данных.',
      url: 'articles/tkinter-notes-app.html',
      icon: 'fas fa-sticky-note',
      tags: ['tkinter', 'python', 'gui', 'приложение', 'заметки', 'интерфейс'],
      readTime: '20 мин',
      published: true
    },
    {
      id: 'ai-for-beginners',
      title: 'Искусственный интеллект для начинающих: простое объяснение',
      description: 'Простое объяснение искусственного интеллекта для начинающих. Что такое ИИ, как он работает, где применяется и как начать изучать машинное обучение.',
      url: 'articles/ai-for-beginners.html',
      icon: 'fas fa-brain',
      tags: ['искусственный интеллект', 'ии', 'машинное обучение', 'нейронные сети', 'ai', 'ml'],
      readTime: '15 мин',
      published: true
    }
  ]
};

// Функция для поиска по всем данным
function searchContent(query) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results = [];

  // Поиск по курсам
  SEARCH_DATA.courses.forEach(course => {
    let score = 0;
    let matchedFields = [];

    // Проверка названия курса
    if (course.title.toLowerCase().includes(searchTerm)) {
      score += 100;
      matchedFields.push('title');
    }

    // Проверка описания
    if (course.description.toLowerCase().includes(searchTerm)) {
      score += 50;
      matchedFields.push('description');
    }

    // Проверка тегов
    course.tags.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        score += 30;
        matchedFields.push('tags');
      }
    });

    // Проверка уроков
    if (course.lessons) {
      course.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(searchTerm) || 
            lesson.description.toLowerCase().includes(searchTerm)) {
          score += 20;
          matchedFields.push('lessons');
        }
      });
    }

    if (score > 0) {
      results.push({
        type: 'course',
        id: course.id,
        title: course.title,
        description: course.description,
        url: course.url,
        icon: course.icon,
        score: score,
        matchedFields: [...new Set(matchedFields)],
        status: course.status || 'ready'
      });
    }
  });

  // Поиск по статьям
  SEARCH_DATA.articles.forEach(article => {
    let score = 0;
    let matchedFields = [];

    // Проверка названия статьи
    if (article.title.toLowerCase().includes(searchTerm)) {
      score += 100;
      matchedFields.push('title');
    }

    // Проверка описания
    if (article.description.toLowerCase().includes(searchTerm)) {
      score += 50;
      matchedFields.push('description');
    }

    // Проверка тегов
    article.tags.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        score += 30;
        matchedFields.push('tags');
      }
    });

    if (score > 0) {
      results.push({
        type: 'article',
        id: article.id,
        title: article.title,
        description: article.description,
        url: article.url,
        icon: article.icon,
        score: score,
        matchedFields: [...new Set(matchedFields)],
        readTime: article.readTime,
        published: article.published
      });
    }
  });

  // Поиск по урокам (отдельно)
  SEARCH_DATA.courses.forEach(course => {
    if (course.lessons) {
      course.lessons.forEach(lesson => {
        let score = 0;
        let matchedFields = [];

        if (lesson.title.toLowerCase().includes(searchTerm)) {
          score += 80;
          matchedFields.push('title');
        }

        if (lesson.description.toLowerCase().includes(searchTerm)) {
          score += 40;
          matchedFields.push('description');
        }

        if (score > 0) {
          results.push({
            type: 'lesson',
            id: `${course.id}-${lesson.title.toLowerCase().replace(/\s+/g, '-')}`,
            title: lesson.title,
            description: lesson.description,
            url: lesson.url,
            icon: course.icon,
            score: score,
            matchedFields: [...new Set(matchedFields)],
            courseTitle: course.title,
            courseId: course.id
          });
        }
      });
    }
  });

  // Сортировка по релевантности
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, 20); // Ограничиваем до 20 результатов
}

// Функция для получения популярных запросов
function getPopularQueries() {
  return [
    'python основы',
    'git команды',
    'html css',
    'linux команды',
    'powershell',
    'сети tcp/ip',
    'веб-разработка',
    'алгоритмы',
    'базы данных',
    'автоматизация'
  ];
}

// Экспорт для использования в других файлах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SEARCH_DATA, searchContent, getPopularQueries };
}
