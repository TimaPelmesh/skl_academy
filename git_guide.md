# Руководство по работе с Git

## Основные команды Git

### 1. Первоначальная настройка Git
```bash
# Установка имени пользователя
git config --global user.name "Ваше имя"

# Установка email
git config --global user.email "ваш@email.com"

# Проверка настроек
git config --list
```

### 2. Инициализация репозитория
```bash
# Создание нового репозитория
git init

# Клонирование существующего репозитория
git clone https://github.com/username/repository.git
```

### 3. Основные операции
```bash
# Проверка статуса репозитория
git status

# Добавление файлов в индекс
git add filename.txt        # Добавить конкретный файл
git add .                  # Добавить все файлы
git add *.html            # Добавить все файлы с расширением .html

# Создание коммита
git commit -m "Описание изменений"
git commit -am "Описание" # Добавить все отслеживаемые файлы и создать коммит

# Просмотр истории коммитов
git log
git log --oneline         # Краткий формат
git log --graph          # С визуализацией веток
```

### 4. Работа с удаленным репозиторием
```bash
# Добавление удаленного репозитория
git remote add origin https://github.com/username/repository.git

# Просмотр удаленных репозиториев
git remote -v

# Загрузка изменений в удаленный репозиторий
git push origin main     # Загрузить в ветку main
git push -u origin main  # Установить upstream и загрузить
git push --force        # Принудительная загрузка (использовать осторожно!)

# Получение изменений из удаленного репозитория
git fetch               # Загрузить изменения без слияния
git pull               # Загрузить и слить изменения
git pull origin main   # Получить изменения из конкретной ветки
```

### 5. Работа с ветками
```bash
# Просмотр веток
git branch            # Локальные ветки
git branch -a         # Все ветки (включая удаленные)

# Создание новой ветки
git branch new-feature
git checkout -b new-feature  # Создать и переключиться

# Переключение между ветками
git checkout branch-name
git switch branch-name      # Новый способ (Git 2.23+)

# Слияние веток
git merge branch-name      # Слить указанную ветку в текущую

# Удаление ветки
git branch -d branch-name  # Удалить локальную ветку
git push origin --delete branch-name  # Удалить удаленную ветку
```

### 6. Отмена изменений
```bash
# Отмена изменений в рабочей директории
git checkout -- filename
git restore filename       # Новый способ (Git 2.23+)

# Отмена индексации файла
git reset HEAD filename
git restore --staged filename  # Новый способ

# Отмена последнего коммита (с сохранением изменений)
git reset --soft HEAD^

# Полная отмена последнего коммита
git reset --hard HEAD^

# Создание нового коммита для отмены изменений
git revert commit-hash
```

### 7. Работа со stash
```bash
# Временное сохранение изменений
git stash

# Просмотр списка stash
git stash list

# Применение сохраненных изменений
git stash apply          # Применить последний stash
git stash pop           # Применить и удалить последний stash
git stash apply stash@{n}  # Применить конкретный stash

# Удаление stash
git stash drop          # Удалить последний stash
git stash clear        # Удалить все stash
```

### 8. Полезные команды
```bash
# Просмотр изменений
git diff               # Изменения в рабочей директории
git diff --staged      # Изменения в индексе
git diff branch1..branch2  # Различия между ветками

# Просмотр авторов строк
git blame filename

# Создание и применение патчей
git format-patch -1 HEAD     # Создать патч из последнего коммита
git apply patch-file.patch   # Применить патч
```

## Типичные сценарии использования

### Первая публикация проекта
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repository.git
git push -u origin main
```

### Обновление локального репозитория
```bash
git pull origin main
git add .
git commit -m "Update changes"
git push origin main
```

### Создание новой функциональности
```bash
git checkout -b feature-name
# Внесение изменений
git add .
git commit -m "Add new feature"
git push origin feature-name
# Создание Pull Request через GitHub
```

### Исправление конфликтов
```bash
git pull origin main
# Решение конфликтов вручную
git add .
git commit -m "Resolve merge conflicts"
git push origin main
```

## Рекомендации по работе с Git

1. **Коммиты:**
   - Делайте атомарные коммиты (один коммит = одно логическое изменение)
   - Пишите понятные сообщения коммитов
   - Используйте префиксы: feat:, fix:, docs:, style:, refactor:, test:, chore:

2. **Ветки:**
   - Создавайте отдельные ветки для новых функций
   - Регулярно обновляйте ветки из main
   - Удаляйте неиспользуемые ветки

3. **Безопасность:**
   - Не храните чувствительные данные в репозитории
   - Используйте .gitignore для исключения ненужных файлов
   - Делайте регулярные бэкапы

4. **Командная работа:**
   - Согласуйте правила именования веток и коммитов
   - Используйте Pull Requests для код-ревью
   - Обсуждайте сложные изменения с командой

## Полезные ресурсы

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf) 