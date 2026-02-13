# Чеклист готовности к деплою — SKL Academy

## Проверено и готово

- **SEO**: главная с meta description, keywords, Open Graph, Twitter Card, canonical, schema.org (EducationalOrganization, WebSite).
- **Индексация**: `robots.txt` (Allow /, Sitemap, Host), `sitemap.xml` с актуальными URL и lastmod.
- **Безопасность**: внутренние ссылки без `http://`; у внешних ссылок с `target="_blank"` добавлен `rel="noopener noreferrer"` где нужно.
- **Страница 404**: есть в корне (`404.html`), стили и навигация подключены.
- **Домен**: файл `CNAME` с `skl-academy.ru` (для GitHub Pages).
- **Аналитика**: счётчик Яндекс.Метрики в head, верификация в meta.
- **Внешние ресурсы**: только HTTPS (Tailwind CDN, Font Awesome, Google Fonts, Метрика).

## Что проверить перед выкладкой

1. **Папка `images/`**  
   Убедиться, что в корне есть:
   - `images/icon.ico`
   - `images/apple-touch-icon.png`
   - `images/favicon-32x32.png`
   - `images/favicon-16x16.png`  
   Иначе иконки и favicon не загрузятся.

2. **Корневая страница**  
   Сервер должен отдавать `index.html` по запросу `/` (часто настраивается в хостинге или через `index` в конфиге).

3. **Обработка 404**  
   Настроить сервер так, чтобы при любом несуществующем URL возвращалась страница `404.html` (например, в GitHub Pages это делается автоматически, если файл лежит в корне).

4. **Проверка после деплоя**  
   - Открыть https://skl-academy.ru/ — главная загружается.
   - Проверить разделы: Курсы, Библиотека, Контакты, О проекте.
   - Открыть несуществующий URL — показывается ваша 404.
   - Проверить мобильную версию и поиск по сайту.

## Структура (статический сайт)

- Корень: `index.html`, `about.html`, `library.html`, `404.html`, `styles.css`, `script.js`, `search.js`, `search-data.js`, `robots.txt`, `sitemap.xml`, `CNAME`.
- Подкаталоги: `articles/`, `courses/`, `sandbox/`, `images/` (обязательно добавить в репозиторий/деплой).

Всё готово к деплою после проверки пунктов выше.
