/**
 * Скрипт для исправления проблем взаимодействия с футером и кнопкой "наверх"
 */

document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы
    const footer = document.querySelector('.new-footer');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Исправляем проблему с перекрытием футером других элементов
    if (footer) {
        // Убираем возможные стили, которые могут блокировать взаимодействие
        footer.style.pointerEvents = 'auto';
        
        // Проверяем, не перекрывает ли футер другие элементы
        const footerSections = footer.querySelectorAll('.footer-section');
        footerSections.forEach(section => {
            section.style.position = 'relative';
            section.style.zIndex = '1';
            section.style.pointerEvents = 'auto';
        });
        
        // Убеждаемся, что текст можно выделять
        const footerText = footer.querySelectorAll('p, h3');
        footerText.forEach(text => {
            text.style.userSelect = 'text';
            text.style.webkitUserSelect = 'text';
            text.style.mozUserSelect = 'text';
            text.style.msUserSelect = 'text';
        });
    }
    
    // Исправляем проблему с кнопкой "наверх"
    if (backToTopBtn) {
        // Гарантируем, что кнопка будет поверх всех элементов
        backToTopBtn.style.zIndex = '9999';
        backToTopBtn.style.position = 'fixed';
        backToTopBtn.style.pointerEvents = 'auto';
        
        // Добавляем яркие стили для лучшей видимости
        backToTopBtn.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
        backToTopBtn.style.justifyContent = 'center';
        backToTopBtn.style.alignItems = 'center';
        backToTopBtn.style.cursor = 'pointer';
        backToTopBtn.style.transition = 'all 0.3s ease';
        
        // Увеличиваем размер иконки
        const icon = backToTopBtn.querySelector('i');
        if (icon) {
            icon.style.fontSize = '1.25rem';
        }
        
        // Улучшенный обработчик событий для кнопки
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Плавная прокрутка наверх
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            return false;
        });
        
        // Немного отодвигаем кнопку от низа на мобильных устройствах
        if (window.innerWidth < 768) {
            backToTopBtn.style.bottom = '80px'; // Отступ от низа на мобильных
        }
    }
    
    // Устраняем возможные конфликты z-index
    document.querySelectorAll('.new-footer *').forEach(el => {
        const currentZIndex = parseInt(window.getComputedStyle(el).zIndex);
        if (currentZIndex > 100) {
            el.style.zIndex = '10'; // Уменьшаем z-index для элементов футера
        }
    });
    
    // Добавляем дополнительную обработку для контактных кнопок
    const contactButtons = document.querySelectorAll('.contact-button');
    contactButtons.forEach(button => {
        // Убеждаемся, что кнопки получают события клика
        button.style.position = 'relative';
        button.style.zIndex = '5';
        button.style.cursor = 'pointer';
        
        // Создаем дополнительный обработчик
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Визуальная обратная связь при клике
            this.style.transform = 'scale(0.97)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                
                // Определяем, какую функцию вызвать
                if (this.classList.contains('gmail')) {
                    window.location.href = 'mailto:mr.tim.pumpkin@gmail.com';
                } else if (this.classList.contains('telegram')) {
                    window.open('https://t.me/tima_pelmeshka', '_blank');
                }
            }, 150);
            
            return false;
        });
    });
}); 