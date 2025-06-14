/**
 * Дополнительные скрипты для сайта
 */

document.addEventListener('DOMContentLoaded', function() {
    // Добавление активного класса для текущего раздела в меню
    const sections = document.querySelectorAll('.tech-section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    // Функция для определения видимого раздела при скроллинге
    const onScroll = () => {
        const scrollPos = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', onScroll);
});