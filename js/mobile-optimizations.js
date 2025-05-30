/**
 * Мобильные оптимизации и улучшения
 */

document.addEventListener('DOMContentLoaded', function() {
    // Проверка, является ли устройство мобильным
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Добавляем класс для мобильных устройств
        document.body.classList.add('mobile-device');
        
        // Оптимизация рендеринга фона на мобильных
        const particlesBackground = document.querySelector('.particles-background');
        if (particlesBackground) {
            particlesBackground.style.animationDuration = '30s';
            particlesBackground.style.backgroundSize = '300px 300px';
        }
        
        // Улучшение работы элементов с активным состоянием
        const touchElements = document.querySelectorAll('.mobile-menu a, .cta-button, .feature, .card');
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            el.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
                // Небольшая задержка перед удалением класса для лучшего визуального эффекта
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
        
        // Плавный скроллинг для якорных ссылок
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === "#") return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Плавно скроллим до элемента
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Закрываем мобильное меню при клике на ссылку
                    const mobileMenu = document.querySelector('.mobile-menu');
                    const menuBtn = document.querySelector('.mobile-menu-btn');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        menuBtn.classList.remove('active');
                    }
                }
            });
        });
        
        // Оптимизация для больших изображений
        const deferImages = () => {
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.setAttribute('src', img.getAttribute('data-src'));
                img.onload = () => {
                    img.removeAttribute('data-src');
                };
            });
        };
        
        // Загружаем изображения с задержкой
        if ('requestIdleCallback' in window) {
            // Используем requestIdleCallback для низкоприоритетных задач
            requestIdleCallback(deferImages);
        } else {
            // Запасной вариант
            setTimeout(deferImages, 200);
        }
    }
}); 